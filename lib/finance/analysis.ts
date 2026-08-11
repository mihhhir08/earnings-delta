import type {
  ChangeValue,
  CompanyData,
  ComparisonMode,
  EvidenceItem,
  FinancialPeriod,
  Importance,
  Insight,
  MetricKey,
  MetricSnapshot,
  ResearchAnalysis,
} from "@/lib/types";

const metricLabels: Record<MetricKey, string> = {
  revenue: "Revenue",
  grossProfit: "Gross profit",
  grossMargin: "Gross margin",
  operatingIncome: "Operating income",
  netIncome: "Net income",
  eps: "Diluted EPS",
  operatingCashFlow: "Operating cash flow",
  capitalExpenditures: "Capital expenditures",
  freeCashFlow: "Free cash flow",
};

const snapshotMetrics: MetricKey[] = [
  "revenue",
  "grossMargin",
  "operatingIncome",
  "netIncome",
  "eps",
  "freeCashFlow",
];

export function calculateChange(current: number | null, comparison: number | null, margin = false): ChangeValue {
  if (current === null || comparison === null) {
    return { current, comparison, absolute: null, percent: null, percentagePoints: null };
  }

  const absolute = current - comparison;
  return {
    current,
    comparison,
    absolute,
    percent: comparison === 0 ? null : (absolute / Math.abs(comparison)) * 100,
    percentagePoints: margin ? absolute : null,
  };
}

export function segmentContribution(current: number, comparison: number, revenueDelta: number): number | null {
  return revenueDelta === 0 ? null : ((current - comparison) / revenueDelta) * 100;
}

export function materialityScore(magnitude: number, relevance: number, hasEvidence: boolean): number {
  const magnitudePoints = Math.min(60, Math.max(0, magnitude) * 3);
  const relevancePoints = Math.min(25, Math.max(0, relevance));
  return Math.round(Math.min(100, magnitudePoints + relevancePoints + (hasEvidence ? 15 : 0)));
}

function importance(score: number): Importance {
  return score >= 75 ? "High" : score >= 45 ? "Medium" : "Monitor";
}

function signed(value: number, suffix = "%") {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}${suffix}`;
}

export function formatFinancialValue(key: MetricKey, value: number | null): string {
  if (value === null) return "n/a";
  if (key === "grossMargin") return `${value.toFixed(1)}%`;
  if (key === "eps") return `${value < 0 ? "−" : ""}$${Math.abs(value).toFixed(2)}`;
  const absolute = Math.abs(value);
  const formatted = absolute >= 1000 ? `$${(absolute / 1000).toFixed(absolute >= 10000 ? 1 : 2)}B` : `$${absolute.toFixed(0)}M`;
  return value < 0 ? `−${formatted}` : formatted;
}

function structuredEvidence(key: MetricKey, change: ChangeValue, current: FinancialPeriod, comparison: FinancialPeriod): EvidenceItem {
  const delta = key === "grossMargin"
    ? `${signed(change.percentagePoints ?? 0, " pp")}`
    : `${formatFinancialValue(key, change.absolute)}`;
  return {
    id: `${key}-calculation`,
    kind: "structured",
    label: `${metricLabels[key]} calculation`,
    detail: `${formatFinancialValue(key, change.current)} in ${current.label} versus ${formatFinancialValue(key, change.comparison)} in ${comparison.label}; change ${delta}.`,
  };
}

function sourceEvidence(period: FinancialPeriod, index = 0): EvidenceItem {
  const source = period.sources[index] ?? period.sources[0];
  return {
    id: source.id,
    kind: "commentary",
    label: source.kind === "filing" ? "Representative filing commentary" : "Representative transcript commentary",
    detail: source.excerpt,
    source,
  };
}

function matchingSourceEvidence(period: FinancialPeriod, subject: string): EvidenceItem | null {
  const normalized = subject.toLowerCase();
  const index = period.sources.findIndex((source) => source.excerpt.toLowerCase().includes(normalized));
  return index === -1 ? null : sourceEvidence(period, index);
}

function makeInsight(input: Omit<Insight, "importance">): Insight {
  return { ...input, importance: importance(input.score) };
}

export function generateInsights(company: CompanyData, current: FinancialPeriod, comparison: FinancialPeriod, mode: ComparisonMode): Insight[] {
  const revenue = calculateChange(current.metrics.revenue, comparison.metrics.revenue);
  const grossMargin = calculateChange(current.metrics.grossMargin, comparison.metrics.grossMargin, true);
  const operatingIncome = calculateChange(current.metrics.operatingIncome, comparison.metrics.operatingIncome);
  const freeCashFlow = calculateChange(current.metrics.freeCashFlow, comparison.metrics.freeCashFlow);
  const revenueGrowth = revenue.percent ?? 0;
  const label = mode === "qoq" ? "sequentially" : "year over year";
  const insights: Insight[] = [];

  if (revenue.percent !== null) {
    const score = materialityScore(Math.abs(revenue.percent), 23, true);
    insights.push(makeInsight({
      id: "revenue-change",
      title: revenue.percent >= 0 ? "Top-line expansion" : "Revenue contraction",
      summary: `Revenue ${revenue.percent >= 0 ? "grew" : "declined"} ${Math.abs(revenue.percent).toFixed(1)}% ${label}, a ${formatFinancialValue("revenue", Math.abs(revenue.absolute ?? 0))} ${revenue.percent >= 0 ? "increase" : "decrease"}.`,
      score,
      confidence: "Verified",
      supportingMetrics: ["Revenue", `${mode.toUpperCase()} growth`, "Absolute change"],
      evidence: [structuredEvidence("revenue", revenue, current, comparison)],
    }));
  }

  const revenueDelta = revenue.absolute ?? 0;
  const segmentDeltas = Object.entries(current.segments)
    .map(([name, value]) => ({ name, value, prior: comparison.segments[name] ?? 0, delta: value - (comparison.segments[name] ?? 0) }))
    .filter(({ delta }) => revenueDelta === 0 || Math.sign(delta) === Math.sign(revenueDelta))
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  const lead = segmentDeltas[0];
  if (lead) {
    const contribution = segmentContribution(lead.value, lead.prior, revenueDelta);
    const source = matchingSourceEvidence(current, lead.name);
    const offset = contribution !== null && contribution > 100
      ? ` Other segments offset ${formatFinancialValue("revenue", Math.abs(lead.delta) - Math.abs(revenueDelta))} of that movement.`
      : "";
    const score = materialityScore(Math.abs(contribution ?? 0) / 4, 25, true);
    insights.push(makeInsight({
      id: "segment-driver",
      title: `${lead.name} drove the change`,
      summary: `${lead.name} changed by ${formatFinancialValue("revenue", lead.delta)} and represented ${contribution === null ? "an unmeasurable share" : `${Math.abs(contribution).toFixed(0)}%`} of the net revenue movement.${offset}`,
      score,
      confidence: source ? "Supported" : "Verified",
      supportingMetrics: [`${lead.name} revenue`, "Total revenue", "Segment contribution"],
      evidence: [
        { id: "segment-calculation", kind: "structured", label: "Segment contribution", detail: `${formatFinancialValue("revenue", lead.value)} − ${formatFinancialValue("revenue", lead.prior)} = ${formatFinancialValue("revenue", lead.delta)}; divided by the ${formatFinancialValue("revenue", revenueDelta)} company revenue change = ${contribution === null ? "not meaningful" : `${Math.abs(contribution).toFixed(0)}%`}.` },
        ...(source ? [source] : []),
      ],
    }));
  }

  if (grossMargin.percentagePoints !== null && Math.abs(grossMargin.percentagePoints) >= 0.4) {
    const falling = grossMargin.percentagePoints < 0;
    const source = matchingSourceEvidence(current, "gross margin");
    const score = materialityScore(Math.abs(grossMargin.percentagePoints) * 5, 22, true);
    insights.push(makeInsight({
      id: "margin-change",
      title: falling ? "Gross margin compressed" : "Gross margin expanded",
      summary: `Gross margin moved ${signed(grossMargin.percentagePoints, " percentage points")} ${label}${falling && revenueGrowth > 0 ? " even as revenue increased" : ""}.`,
      score,
      confidence: source ? "Supported" : "Verified",
      supportingMetrics: ["Gross margin", "Gross profit", "Revenue"],
      evidence: [structuredEvidence("grossMargin", grossMargin, current, comparison), ...(source ? [source] : [])],
    }));
  }

  if (operatingIncome.percent !== null && revenue.percent !== null && Math.abs(operatingIncome.percent - revenue.percent) >= 4) {
    const leverage = operatingIncome.percent > revenue.percent;
    const score = materialityScore(Math.abs(operatingIncome.percent - revenue.percent), 20, false);
    insights.push(makeInsight({
      id: "operating-leverage",
      title: leverage ? "Operating leverage improved" : "Operating leverage weakened",
      summary: `Operating income changed ${signed(operatingIncome.percent)} versus revenue at ${signed(revenue.percent)}, a ${Math.abs(operatingIncome.percent - revenue.percent).toFixed(1)}-point growth gap.`,
      score,
      confidence: "Verified",
      supportingMetrics: ["Operating income", "Revenue", "Growth gap"],
      evidence: [structuredEvidence("operatingIncome", operatingIncome, current, comparison), structuredEvidence("revenue", revenue, current, comparison)],
    }));
  }

  if (freeCashFlow.percent !== null && revenue.percent !== null && Math.abs(freeCashFlow.percent - revenue.percent) >= 12) {
    const improving = freeCashFlow.percent > revenue.percent;
    const score = materialityScore(Math.abs(freeCashFlow.percent - revenue.percent) / 2, 24, false);
    insights.push(makeInsight({
      id: "cash-flow-divergence",
      title: `Cash conversion ${improving ? "outpaced" : "lagged"} growth`,
      summary: `Free cash flow changed ${signed(freeCashFlow.percent)} while revenue changed ${signed(revenue.percent)}. The ${Math.abs(freeCashFlow.percent - revenue.percent).toFixed(1)}-point divergence merits follow-up.`,
      score,
      confidence: "AI Interpretation",
      supportingMetrics: ["Free cash flow", "Operating cash flow", "Revenue"],
      evidence: [
        structuredEvidence("freeCashFlow", freeCashFlow, current, comparison),
        { id: "cash-interpretation", kind: "interpretation", label: "Interpretation boundary", detail: "The divergence is calculated, but its cause is not directly established by the available source excerpts." },
      ],
    }));
  }

  return insights.sort((a, b) => b.score - a.score).slice(0, 5);
}

function movementDirection(key: MetricKey, change: ChangeValue): MetricSnapshot["direction"] {
  const delta = key === "grossMargin" ? change.percentagePoints : change.percent;
  if (delta === null || Math.abs(delta) < 0.05) return "neutral";
  if (key === "capitalExpenditures") return "neutral";
  return delta > 0 ? "favorable" : "unfavorable";
}

function findComparison(periods: FinancialPeriod[], current: FinancialPeriod, mode: ComparisonMode) {
  return periods.find((period) => mode === "qoq"
    ? period.fiscalYear * 4 + period.fiscalQuarter === current.fiscalYear * 4 + current.fiscalQuarter - 1
    : period.fiscalYear === current.fiscalYear - 1 && period.fiscalQuarter === current.fiscalQuarter);
}

export function analyzeCompany(company: CompanyData, mode: ComparisonMode): ResearchAnalysis | null {
  const current = company.periods[0];
  const qoqPeriod = findComparison(company.periods, current, "qoq");
  const yoyPeriod = findComparison(company.periods, current, "yoy");
  const comparison = mode === "qoq" ? qoqPeriod : yoyPeriod;
  if (!current || !comparison || !qoqPeriod || !yoyPeriod) return null;

  const snapshot = snapshotMetrics.map((key) => {
    const qoq = calculateChange(current.metrics[key], qoqPeriod.metrics[key], key === "grossMargin");
    const yoy = calculateChange(current.metrics[key], yoyPeriod.metrics[key], key === "grossMargin");
    return {
      key,
      label: metricLabels[key],
      current: current.metrics[key],
      qoq,
      yoy,
      direction: movementDirection(key, mode === "qoq" ? qoq : yoy),
    };
  });

  return {
    company: { ticker: company.ticker, name: company.name, exchange: company.exchange, sector: company.sector },
    currentPeriod: { id: current.id, label: current.label, ended: current.ended },
    comparisonPeriod: { id: comparison.id, label: comparison.label, ended: comparison.ended },
    mode,
    snapshot,
    trend: company.periods.toReversed().map((period) => ({
      period: period.label,
      revenue: period.metrics.revenue,
      grossMargin: period.metrics.grossMargin,
      freeCashFlow: period.metrics.freeCashFlow,
    })),
    insights: generateInsights(company, current, comparison, mode),
  };
}
