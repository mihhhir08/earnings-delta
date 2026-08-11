import { analyzeCompany, formatFinancialValue } from "@/lib/finance/analysis";
import type { AskDeltaResponse } from "@/lib/schemas";
import type { CompanyData, ComparisonMode } from "@/lib/types";

export function answerGroundedQuestion(company: CompanyData, mode: ComparisonMode, question: string): AskDeltaResponse {
  const analysis = analyzeCompany(company, mode);
  if (!analysis) {
    return { answer: "The selected comparison period is not available.", confidence: "Verified", evidence: [], limited: true };
  }

  const normalized = question.toLowerCase();
  const findMetric = (label: string) => analysis.snapshot.find((metric) => metric.label === label);
  const selectInsight = (id: string) => analysis.insights.find((insight) => insight.id === id);
  const insight = normalized.includes("margin") ? selectInsight("margin-change")
    : normalized.includes("segment") || normalized.includes("drove") || normalized.includes("driver") ? selectInsight("segment-driver")
    : normalized.includes("cash") ? selectInsight("cash-flow-divergence")
    : normalized.includes("revenue") || normalized.includes("growth") ? selectInsight("revenue-change")
    : normalized.includes("operating") ? selectInsight("operating-leverage")
    : undefined;

  if (insight) {
    return {
      answer: insight.summary,
      confidence: insight.confidence,
      evidence: insight.evidence.slice(0, 3).map(({ label, detail }) => ({ label, detail })),
      limited: insight.confidence === "AI Interpretation",
    };
  }

  if (normalized.includes("free cash flow") || normalized.includes("fcf")) {
    const metric = findMetric("Free cash flow");
    const change = mode === "qoq" ? metric?.qoq : metric?.yoy;
    if (metric && change) {
      return {
        answer: `Free cash flow was ${formatFinancialValue("freeCashFlow", metric.current)}, a ${change.percent === null ? "not meaningful" : `${Math.abs(change.percent).toFixed(1)}% ${change.percent >= 0 ? "increase" : "decrease"}`} versus ${analysis.comparisonPeriod.label}.`,
        confidence: "Verified",
        evidence: [{ label: "Structured financials", detail: `${formatFinancialValue("freeCashFlow", change.current)} versus ${formatFinancialValue("freeCashFlow", change.comparison)}.` }],
        limited: false,
      };
    }
  }

  return {
    answer: "The available company context does not support a reliable answer to that question. Try asking about revenue, gross margin, segments, operating leverage, or free cash flow.",
    confidence: "Verified",
    evidence: [],
    limited: true,
  };
}
