import { notFound } from "next/navigation";
import { ResearchWorkspace } from "@/components/research-workspace";
import { analyzeCompany } from "@/lib/finance/analysis";
import { financialDataProvider } from "@/lib/providers/financial";

export function generateStaticParams() {
  return [{ ticker: "NVDA" }, { ticker: "AAPL" }, { ticker: "MSFT" }];
}

export default async function ResearchPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params;
  const [company, companies] = await Promise.all([
    financialDataProvider.getCompany(ticker),
    financialDataProvider.listCompanies(),
  ]);

  if (!company) notFound();
  const qoq = analyzeCompany(company, "qoq");
  const yoy = analyzeCompany(company, "yoy");
  if (!qoq || !yoy) notFound();

  return <ResearchWorkspace analyses={{ qoq, yoy }} companies={companies} />;
}
