import { analyzeCompany } from "../finance/analysis";
import type {
  ChangeValue,
  CompanyData,
  ComparisonMode,
  MetricKey,
  ResearchAnalysis,
  ThesisEvidence,
  ThesisEvidenceStance,
  ThesisResearchEvent,
  ThesisResearchRun,
  ThesisVerdict,
} from "@/lib/types";

type Topic = "quality" | "revenue" | "margin" | "operating" | "cash" | "segments" | "unknown";

const negativeTerms = /\b(weakened|weaker|deteriorated|declined|compressed|worse|slowed|fell|lower|less)\b/;

function signed(value: number, suffix = "%") {
  return `${value >= 0 ? "+" : "−"}${Math.abs(value).toFixed(1)}${suffix}`;
}

function topicFor(thesis: string): Topic {
  const text = thesis.toLowerCase();
  if (/growth quality|earnings quality|quality of growth|across the business/.test(text)) return "quality";
  if (/operating leverage|operating income|operating profit/.test(text)) return "operating";
  if (/free cash flow|cash generation|cash conversion|\bfcf\b/.test(text)) return "cash";
  if (/gross margin|margin/.test(text)) return "margin";
  if (/segment|concentrat|diversif/.test(text)) return "segments";
  if (/revenue|sales|top.?line|growth/.test(text)) return "revenue";
  return "unknown";
}

function stanceFor(assertionHolds: boolean | null, negativeClaim: boolean): ThesisEvidenceStance {
  if (assertionHolds === null) return "context";
  return assertionHolds !== negativeClaim ? "supports" : "challenges";
}

function selectedChange(analysis: ResearchAnalysis, key: MetricKey): ChangeValue | null {
  const metric = analysis.snapshot.find((item) => item.key === key);
  if (!metric) return null;
  return analysis.mode === "qoq" ? metric.qoq : metric.yoy;
}

function evidence(
  id: string,
  label: string,
  value: string,
  detail: string,
  assertionHolds: boolean | null,
  negativeClaim: boolean,
): ThesisEvidence {
  return { id, label, value, detail, stance: stanceFor(assertionHolds, negativeClaim) };
}

function revenueCheck(analysis: ResearchAnalysis, negative: boolean) {
  const change = selectedChange(analysis, "revenue");
  const percent = change?.percent ?? null;
  return evidence(
    "revenue-growth",
    "Revenue growth",
    percent === null ? "n/m" : signed(percent),
    `${analysis.currentPeriod.label} revenue compared with ${analysis.comparisonPeriod.label}.`,
    percent === null || Math.abs(percent) < 0.5 ? null : percent > 0,
    negative,
  );
}

function marginCheck(analysis: ResearchAnalysis, negative: boolean) {
  const change = selectedChange(analysis, "grossMargin");
  const points = change?.percentagePoints ?? null;
  return evidence(
    "gross-margin",
    "Gross-margin movement",
    points === null ? "n/m" : signed(points, " pp"),
    `${analysis.currentPeriod.label} gross margin compared with ${analysis.comparisonPeriod.label}.`,
    points === null || Math.abs(points) < 0.2 ? null : points > 0,
    negative,
  );
}

function operatingCheck(analysis: ResearchAnalysis, negative: boolean) {
  const operating = selectedChange(analysis, "operatingIncome")?.percent ?? null;
  const revenue = selectedChange(analysis, "revenue")?.percent ?? null;
  const gap = operating === null || revenue === null ? null : operating - revenue;
  return evidence(
    "operating-leverage",
    "Operating leverage",
    gap === null ? "n/m" : signed(gap, " pts"),
    gap === null ? "The comparison lacks a meaningful growth gap." : `Operating income changed ${signed(operating!)} versus revenue at ${signed(revenue!)}.`,
    gap === null || Math.abs(gap) < 1 ? null : gap > 0,
    negative,
  );
}

function cashCheck(analysis: ResearchAnalysis, negative: boolean) {
  const cash = selectedChange(analysis, "freeCashFlow")?.percent ?? null;
  const revenue = selectedChange(analysis, "revenue")?.percent ?? null;
  const gap = cash === null || revenue === null ? null : cash - revenue;
  return evidence(
    "cash-conversion",
    "Cash conversion",
    gap === null ? "n/m" : signed(gap, " pts"),
    gap === null ? "The comparison lacks a meaningful cash-growth gap." : `Free cash flow changed ${signed(cash!)} versus revenue at ${signed(revenue!)}.`,
    gap === null || Math.abs(gap) < 2 ? null : gap > 0,
    negative,
  );
}

function segmentCheck(analysis: ResearchAnalysis, negative: boolean) {
  const insight = analysis.insights.find((item) => item.id === "segment-revenue-movement");
  const match = insight?.summary.match(/represented ([\d.]+)%/);
  const contribution = match ? Number(match[1]) : null;
  return evidence(
    "segment-concentration",
    "Segment concentration",
    contribution === null ? "n/m" : `${contribution.toFixed(0)}%`,
    insight?.summary ?? "No leading-segment contribution could be established.",
    contribution === null || Math.abs(contribution - 50) < 5 ? null : contribution > 50,
    negative,
  );
}

function checksFor(topic: Topic, analysis: ResearchAnalysis, negative: boolean): ThesisEvidence[] {
  if (topic === "quality") return [revenueCheck(analysis, negative), marginCheck(analysis, negative), operatingCheck(analysis, negative), cashCheck(analysis, negative)];
  if (topic === "revenue") return [revenueCheck(analysis, negative), segmentCheck(analysis, false)];
  if (topic === "margin") return [marginCheck(analysis, negative), revenueCheck(analysis, false)];
  if (topic === "operating") return [operatingCheck(analysis, negative), marginCheck(analysis, false)];
  if (topic === "cash") return [cashCheck(analysis, negative), revenueCheck(analysis, false)];
  if (topic === "segments") return [segmentCheck(analysis, negative), revenueCheck(analysis, false)];
  return [];
}

function verdictFor(evidenceRows: ThesisEvidence[]): ThesisVerdict {
  if (evidenceRows.length === 0 || evidenceRows.every(({ stance }) => stance === "context")) return "Insufficient";
  const supports = evidenceRows.filter(({ stance }) => stance === "supports").length;
  const challenges = evidenceRows.filter(({ stance }) => stance === "challenges").length;
  if (supports > 0 && challenges === 0) return "Supported";
  if (challenges > supports) return "Challenged";
  return "Mixed";
}

const topicLabels: Record<Topic, string> = {
  quality: "growth quality across revenue, margin, operating leverage, and cash conversion",
  revenue: "revenue direction and the segment contribution behind it",
  margin: "gross-margin direction with revenue as operating context",
  operating: "operating-income growth relative to revenue and margin",
  cash: "free-cash-flow growth relative to revenue",
  segments: "leading-segment contribution to the revenue movement",
  unknown: "the active financial comparison",
};

export async function runThesisStressTest(
  company: CompanyData,
  mode: ComparisonMode,
  thesis: string,
  onEvent?: (event: ThesisResearchEvent) => void | Promise<void>,
): Promise<ThesisResearchRun> {
  const analysis = analyzeCompany(company, mode);
  if (!analysis) throw new Error("Comparison unavailable");

  const topic = topicFor(thesis);
  const normalized = thesis.toLowerCase();
  const negative = negativeTerms.test(normalized) || /diversif|broader|less concentrat/.test(normalized);
  const recognized = topic !== "unknown";
  const scopeStep = {
    id: "scope",
    label: "Scope the claim",
    detail: recognized ? `Mapped the thesis to ${topicLabels[topic]}.` : "No supported financial theme was detected.",
  };
  await onEvent?.({ type: "stage", step: scopeStep });

  const plannedChecks = topic === "quality" ? 4 : recognized ? 2 : 0;
  const planStep = {
    id: "plan",
    label: "Plan checks",
    detail: recognized ? `Selected ${plannedChecks} comparison checks.` : "No reliable checks were scheduled.",
  };
  await onEvent?.({ type: "stage", step: planStep });

  const evidenceRows = checksFor(topic, analysis, negative);
  const calculationStep = {
    id: "calculate",
    label: "Run calculations",
    detail: recognized ? `Compared structured values for ${analysis.currentPeriod.label} and ${analysis.comparisonPeriod.label}.` : "Skipped because the thesis was outside the supported scope.",
  };
  await onEvent?.({ type: "stage", step: calculationStep });

  const verdict = verdictFor(evidenceRows);
  const supports = evidenceRows.filter(({ stance }) => stance === "supports").length;
  const challenges = evidenceRows.filter(({ stance }) => stance === "challenges").length;
  const context = evidenceRows.filter(({ stance }) => stance === "context").length;
  const challengeStep = {
    id: "challenge",
    label: "Seek contradictions",
    detail: recognized ? `Found ${challenges} contradictory and ${context} inconclusive signal${challenges + context === 1 ? "" : "s"}.` : "No evidence set was available to challenge.",
  };
  await onEvent?.({ type: "stage", step: challengeStep });

  const summary = verdict === "Supported"
    ? `The active comparison supports the thesis across ${supports} selected check${supports === 1 ? "" : "s"}; none of those checks contradict it.`
    : verdict === "Challenged"
      ? `${challenges} selected check${challenges === 1 ? "" : "s"} contradict the thesis, outweighing the ${supports} supporting signal${supports === 1 ? "" : "s"}.`
      : verdict === "Mixed"
        ? `The thesis is mixed: ${supports} check${supports === 1 ? "" : "s"} support it and ${challenges} challenge it${context ? `, with ${context} inconclusive` : ""}.`
        : "The thesis could not be mapped to a reliable check in the active record.";

  const synthesisStep = {
    id: "synthesize",
    label: "Bound the verdict",
    detail: `${verdict}. The result does not infer causation or recommend an investment action.`,
  };
  await onEvent?.({ type: "stage", step: synthesisStep });

  return {
    thesis,
    scope: `${analysis.company.ticker} · ${analysis.currentPeriod.label} vs ${analysis.comparisonPeriod.label} · ${topicLabels[topic]}`,
    verdict,
    confidence: recognized ? "Verified" : "Interpretation",
    summary,
    steps: [scopeStep, planStep, calculationStep, challengeStep, synthesisStep],
    evidence: evidenceRows,
    limitation: recognized
      ? "This stress test evaluates only the selected representative comparison. It does not establish causation, valuation, or future performance."
      : "Try a thesis about growth quality, revenue, gross margin, operating leverage, cash generation, or segment concentration.",
  };
}
