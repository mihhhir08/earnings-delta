import { describe, expect, it } from "vitest";
import { calculateChange, materialityScore, segmentContribution } from "../lib/finance/analysis";

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
