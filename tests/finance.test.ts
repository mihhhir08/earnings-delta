import { describe, expect, it } from "vitest";
import { answerGroundedQuestion } from "../lib/research/answer";
import { companyData } from "../lib/data/companies";
import { analyzeCompany, calculateChange, materialityScore, segmentContribution } from "../lib/finance/analysis";
import { runThesisStressTest } from "../lib/research/stress-test";

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
  it("combines magnitude and relevance with a 100 point cap", () => {
    expect(materialityScore(10, 20)).toBe(50);
    expect(materialityScore(50, 25)).toBe(100);
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
    expect(qoq.insights.find(({ id }) => id === "segment-revenue-movement")?.summary).toContain("offset");
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

  it("answers typed metric questions from the active comparison", () => {
    const company = companyData.find(({ ticker }) => ticker === "NVDA")!;
    const answer = answerGroundedQuestion(company, "qoq", "How did EPS change?");

    expect(answer.answer).toContain("$0.89");
    expect(answer.answer).toContain("$0.78");
    expect(answer.answer).toContain("14.1% higher");
    expect(answer.evidence).toHaveLength(1);
    expect(answer.limited).toBe(false);
  });

  it("returns an explicit scope limit for unsupported questions", () => {
    const company = companyData.find(({ ticker }) => ticker === "NVDA")!;
    const answer = answerGroundedQuestion(company, "qoq", "What will the stock price be next year?");

    expect(answer.limited).toBe(true);
    expect(answer.evidence).toHaveLength(0);
    expect(answer.answer).toContain("does not contain enough evidence");
  });

  it("does not invent a cause when commentary does not establish one", () => {
    const company = companyData.find(({ ticker }) => ticker === "MSFT")!;
    const answer = answerGroundedQuestion(company, "qoq", "Why did gross margin move?");

    expect(answer.limited).toBe(true);
    expect(answer.answer).toContain("does not establish a separate cause");
  });

  it("stress-tests a thesis with supporting and contradictory checks", async () => {
    const company = companyData.find(({ ticker }) => ticker === "NVDA")!;
    const run = await runThesisStressTest(company, "qoq", "Growth quality strengthened across the business.");

    expect(run.steps.map(({ id }) => id)).toEqual(["scope", "plan", "calculate", "challenge", "synthesize"]);
    expect(run.evidence.length).toBe(4);
    expect(run.evidence.some(({ stance }) => stance === "supports")).toBe(true);
    expect(run.evidence.some(({ stance }) => stance === "challenges")).toBe(true);
    expect(run.verdict).toBe("Challenged");
  });

  it("returns a bounded result for an unsupported thesis", async () => {
    const company = companyData.find(({ ticker }) => ticker === "AAPL")!;
    const run = await runThesisStressTest(company, "yoy", "The stock will outperform next year.");

    expect(run.verdict).toBe("Insufficient");
    expect(run.evidence).toHaveLength(0);
    expect(run.limitation).toContain("Try a thesis about");
  });

  it.each([
    "Growth quality strengthened across the business.",
    "Revenue grew this quarter.",
    "Gross margin expanded.",
    "Operating leverage improved.",
    "Cash generation improved.",
    "Revenue became more concentrated by segment.",
  ])("maps each supported thesis topic: %s", async (thesis) => {
    const company = companyData.find(({ ticker }) => ticker === "NVDA")!;
    const run = await runThesisStressTest(company, "qoq", thesis);

    expect(run.verdict).not.toBe("Insufficient");
    expect(run.evidence.length).toBeGreaterThan(0);
  });

  it("inverts evidence classification for a negative thesis", async () => {
    const company = companyData.find(({ ticker }) => ticker === "NVDA")!;
    const run = await runThesisStressTest(company, "qoq", "Gross margin weakened this quarter.");

    expect(run.evidence[0]).toMatchObject({ id: "gross-margin", stance: "supports" });
  });

  it("treats movements below the margin threshold as context", async () => {
    const company = structuredClone(companyData.find(({ ticker }) => ticker === "NVDA")!);
    company.periods[0].metrics.grossMargin = company.periods[1].metrics.grossMargin! + 0.1;
    const run = await runThesisStressTest(company, "qoq", "Gross margin expanded.");

    expect(run.evidence[0]).toMatchObject({ id: "gross-margin", stance: "context" });
  });

  it("keeps shared-metric checks distinct and counted once", async () => {
    const company = companyData.find(({ ticker }) => ticker === "NVDA")!;
    const run = await runThesisStressTest(company, "qoq", "Growth quality strengthened across the business.");

    expect(new Set(run.evidence.map(({ id }) => id)).size).toBe(run.evidence.length);
    expect(run.steps.find(({ id }) => id === "plan")?.detail).toBe("Selected 4 comparison checks.");
  });
});
