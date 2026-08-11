export type MetricKey =
  | "revenue"
  | "grossProfit"
  | "grossMargin"
  | "operatingIncome"
  | "netIncome"
  | "eps"
  | "operatingCashFlow"
  | "capitalExpenditures"
  | "freeCashFlow";

export type Confidence = "Verified" | "Supported" | "AI Interpretation";
export type Importance = "High" | "Medium" | "Monitor";
export type ComparisonMode = "qoq" | "yoy";

export interface SourceExcerpt {
  id: string;
  kind: "filing" | "transcript";
  title: string;
  speaker?: string;
  excerpt: string;
}

export interface FinancialPeriod {
  id: string;
  label: string;
  fiscalYear: number;
  fiscalQuarter: number;
  ended: string;
  metrics: Record<MetricKey, number | null>;
  segments: Record<string, number>;
  kpis: Record<string, { value: number; unit: string }>;
  sources: SourceExcerpt[];
}

export interface CompanyData {
  ticker: string;
  name: string;
  exchange: string;
  sector: string;
  periods: FinancialPeriod[];
  prices: { date: string; close: number }[];
}

export interface ChangeValue {
  current: number | null;
  comparison: number | null;
  absolute: number | null;
  percent: number | null;
  percentagePoints: number | null;
}

export interface EvidenceItem {
  id: string;
  kind: "structured" | "commentary" | "interpretation";
  label: string;
  detail: string;
  source?: SourceExcerpt;
}

export interface Insight {
  id: string;
  title: string;
  summary: string;
  importance: Importance;
  confidence: Confidence;
  score: number;
  supportingMetrics: string[];
  evidence: EvidenceItem[];
}

export interface MetricSnapshot {
  key: MetricKey;
  label: string;
  current: number | null;
  qoq: ChangeValue;
  yoy: ChangeValue;
  direction: "favorable" | "unfavorable" | "neutral";
}

export interface TrendPoint {
  period: string;
  revenue: number | null;
  grossMargin: number | null;
  freeCashFlow: number | null;
}

export interface ResearchAnalysis {
  company: Pick<CompanyData, "ticker" | "name" | "exchange" | "sector">;
  currentPeriod: Pick<FinancialPeriod, "id" | "label" | "ended">;
  comparisonPeriod: Pick<FinancialPeriod, "id" | "label" | "ended">;
  mode: ComparisonMode;
  snapshot: MetricSnapshot[];
  trend: TrendPoint[];
  insights: Insight[];
}
