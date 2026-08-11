import { analyzeCompany, formatFinancialValue } from "../finance/analysis";
import type { AskDeltaResponse } from "@/lib/schemas";
import type { CompanyData, ComparisonMode, MetricKey } from "@/lib/types";

const metricQuestions: { key: MetricKey; label: string; terms: string[] }[] = [
  { key: "grossMargin", label: "Gross margin", terms: ["gross margin", "margin"] },
  { key: "operatingIncome", label: "Operating income", terms: ["operating income", "operating profit"] },
  { key: "netIncome", label: "Net income", terms: ["net income", "net profit", "income"] },
  { key: "eps", label: "Diluted EPS", terms: ["eps", "earnings per share"] },
  { key: "freeCashFlow", label: "Free cash flow", terms: ["free cash flow", "cash flow", "fcf"] },
  { key: "revenue", label: "Revenue", terms: ["revenue", "sales"] },
];

export function answerGroundedQuestion(company: CompanyData, mode: ComparisonMode, question: string): AskDeltaResponse {
  const analysis = analyzeCompany(company, mode);
  if (!analysis) {
    return { answer: "The selected comparison period is not available.", confidence: "Verified", evidence: [], limited: true };
  }

  const normalized = question.toLowerCase();
  const asksWhy = /\b(why|cause|caused)\b/.test(normalized);
  const findMetric = (label: string) => analysis.snapshot.find((metric) => metric.label === label);
  const selectInsight = (id: string) => analysis.insights.find((insight) => insight.id === id);
  const metricQuestion = metricQuestions.find(({ terms }) => terms.some((term) => normalized.includes(term)));
  const insight = normalized.includes("segment") || normalized.includes("driver") || normalized.includes("drove") ? selectInsight("segment-driver")
    : normalized.includes("cash conversion") ? selectInsight("cash-flow-divergence")
    : normalized.includes("operating leverage") ? selectInsight("operating-leverage")
    : metricQuestion?.key === "grossMargin" ? selectInsight("margin-change")
    : metricQuestion?.key === "revenue" || normalized.includes("growth") ? selectInsight("revenue-change")
    : undefined;

  if (insight) {
    const causeLimited = asksWhy && !insight.evidence.some(({ kind }) => kind === "commentary");
    return {
      answer: `${insight.summary}${causeLimited ? " The available record verifies the change but does not establish a separate cause." : ""}`,
      confidence: insight.confidence,
      evidence: insight.evidence.slice(0, 3).map(({ label, detail }) => ({ label, detail })),
      limited: insight.confidence === "AI Interpretation" || causeLimited,
    };
  }

  if (metricQuestion) {
    const metric = findMetric(metricQuestion.label);
    const change = mode === "qoq" ? metric?.qoq : metric?.yoy;
    if (metric && change) {
      const margin = metricQuestion.key === "grossMargin";
      const movement = margin ? change.percentagePoints : change.percent;
      const movementText = movement === null
        ? "with no meaningful percentage comparison"
        : `${Math.abs(movement).toFixed(1)}${margin ? " percentage points" : "%"} ${movement >= 0 ? "higher" : "lower"}`;
      return {
        answer: `${metricQuestion.label} was ${formatFinancialValue(metricQuestion.key, metric.current)} in ${analysis.currentPeriod.label}, ${movementText} than ${formatFinancialValue(metricQuestion.key, change.comparison)} in ${analysis.comparisonPeriod.label}.${asksWhy ? " The available record verifies the change but does not establish a separate cause." : ""}`,
        confidence: "Verified",
        evidence: [{ label: `${metricQuestion.label} calculation`, detail: `${formatFinancialValue(metricQuestion.key, change.current)} versus ${formatFinancialValue(metricQuestion.key, change.comparison)}; ${movementText}.` }],
        limited: asksWhy,
      };
    }
  }

  return {
    answer: "This MVP record cannot support that question reliably. Try revenue, gross margin, operating income, net income, EPS, segments, operating leverage, or free cash flow.",
    confidence: "Verified",
    evidence: [],
    limited: true,
  };
}
