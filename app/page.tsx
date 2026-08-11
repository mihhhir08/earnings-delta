import { LandingExperience, type LandingPreview } from "@/components/landing-experience";
import { analyzeCompany, formatFinancialValue } from "@/lib/finance/analysis";
import { financialDataProvider } from "@/lib/providers/financial";

function formatChange(value: number | null, margin = false) {
  if (value === null) return "Not meaningful";
  return `${value >= 0 ? "+" : "−"}${Math.abs(value).toFixed(1)}${margin ? " pp" : "%"} QoQ`;
}

export default async function HomePage() {
  const companies = await financialDataProvider.listCompanies();
  const previewData: (LandingPreview | null)[] = await Promise.all(companies.map(async ({ ticker }) => {
    const company = await financialDataProvider.getCompany(ticker);
    if (!company) return null;
    const analysis = analyzeCompany(company, "qoq");
    if (!analysis || !analysis.insights[0]) return null;

    const selectedMetrics = analysis.snapshot.filter((metric) => ["revenue", "grossMargin", "freeCashFlow"].includes(metric.key));
    const topInsight = analysis.insights[0];

    return {
      ticker: company.ticker,
      period: analysis.currentPeriod.label,
      comparison: `vs. ${analysis.comparisonPeriod.label}`,
      metrics: selectedMetrics.map((metric) => ({
        label: metric.label,
        value: formatFinancialValue(metric.key, metric.current),
        change: formatChange(metric.key === "grossMargin" ? metric.qoq.percentagePoints : metric.qoq.percent, metric.key === "grossMargin"),
        direction: metric.direction,
      })),
      insight: {
        title: topInsight.title,
        summary: topInsight.summary,
        confidence: topInsight.confidence,
        score: topInsight.score,
      },
      href: `/research/${company.ticker}`,
    };
  }));

  return <LandingExperience previews={previewData.filter((preview): preview is LandingPreview => preview !== null)} />;
}
