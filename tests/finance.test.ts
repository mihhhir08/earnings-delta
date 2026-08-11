import { describe, expect, it } from "vitest";
import { companyData } from "../lib/data/companies";
import { analyzeCompany, calculateChange, materialityScore, segmentContribution } from "../lib/finance/analysis";

describe("financial change calculations", () => {
  it("calculates absolute and percentage change", () => {
    expect(calculateChange(125, 100)).toMatchObject({ absolute: 25, percent: 25 });
  });

  it("uses absolute denominator for negative comparison values", () => {
    expect(calculateChange(-50, -100)).toMatchObject({ absolute: 50, percent: 50 });
  });

  it("returns no percentage for a zero denominator", () => {
    expect(calculateChange(10, 0)).toMatchObject({ absolute: 10, percent: null });
  });

  it("returns no derived values when either period is missing", () => {
    expect(calculateChange(null, 10)).toMatchObject({ absolute: null, percent: null });
  });

  it("calculates margin movement in percentage points", () => {
    expect(calculateChange(72.4, 74.1, true).percentagePoints).toBeCloseTo(-1.7);
  });
});

describe("materiality", () => {
  it("combines magnitude, relevance, and evidence with a 100 point cap", () => {
    expect(materialityScore(10, 20, true)).toBe(65);
    expect(materialityScore(50, 25, true)).toBe(100);
  });

  it("calculates segment contribution", () => {
    expect(segmentContribution(150, 100, 100)).toBe(50);
    expect(segmentContribution(150, 100, 0)).toBeNull();
  });
});

describe("representative research demo", () => {
  it.each(companyData)("keeps $ticker financial statements internally consistent", (company) => {
    for (const period of company.periods) {
      const { revenue, grossProfit, grossMargin, operatingCashFlow, capitalExpenditures, freeCashFlow } = period.metrics;
      expect(revenue).not.toBeNull();
      expect(grossProfit).not.toBeNull();
      expect(Math.abs(grossMargin! - (grossProfit! / revenue!) * 100)).toBeLessThan(0.15);
      expect(freeCashFlow).toBe(operatingCashFlow! - capitalExpenditures!);
      expect(Math.abs(Object.values(period.segments).reduce((sum, value) => sum + value, 0) - revenue!) / revenue!).toBeLessThan(0.01);
    }
  });

  it("recalculates NVDA findings for the selected comparison", () => {
    const company = companyData.find(({ ticker }) => ticker === "NVDA")!;
    const qoq = analyzeCompany(company, "qoq")!;
    const yoy = analyzeCompany(company, "yoy")!;

    expect(qoq.comparisonPeriod.label).toBe("FY 2025 Q3");
    expect(yoy.comparisonPeriod.label).toBe("FY 2024 Q4");
    expect(qoq.snapshot.find(({ key }) => key === "revenue")?.qoq.percent).toBeCloseTo(12.1, 1);
    expect(yoy.snapshot.find(({ key }) => key === "revenue")?.yoy.percent).toBeCloseTo(78, 0);
    expect(qoq.insights.find(({ id }) => id === "segment-driver")?.summary).toContain("offset");
    expect(qoq.insights.map(({ summary }) => summary)).not.toEqual(yoy.insights.map(({ summary }) => summary));
  });

  it("only labels a finding Supported when commentary names its subject", () => {
    for (const company of companyData) {
      for (const mode of ["qoq", "yoy"] as const) {
        for (const insight of analyzeCompany(company, mode)!.insights) {
          if (insight.confidence === "Supported") {
            expect(insight.evidence.some(({ kind }) => kind === "commentary")).toBe(true);
            if (insight.id === "margin-change") {
              expect(insight.evidence.find(({ kind }) => kind === "commentary")?.detail).toMatch(/gross margin/i);
            }
          }
        }
      }
    }
  });
});
