import { companyData } from "@/lib/data/companies";
import type { CompanyData } from "@/lib/types";

export interface FinancialDataProvider {
  listCompanies(): Promise<Pick<CompanyData, "ticker" | "name">[]>;
  getCompany(ticker: string): Promise<CompanyData | null>;
}

export class RepresentativeFinancialDataProvider implements FinancialDataProvider {
  async listCompanies() {
    return companyData.map(({ ticker, name }) => ({ ticker, name }));
  }

  async getCompany(ticker: string) {
    return companyData.find((company) => company.ticker === ticker.toUpperCase()) ?? null;
  }
}

export const financialDataProvider: FinancialDataProvider = new RepresentativeFinancialDataProvider();
