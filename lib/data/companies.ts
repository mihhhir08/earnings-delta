import type { CompanyData, FinancialPeriod, MetricKey } from "@/lib/types";

type PeriodInput = [
  id: string,
  label: string,
  fiscalYear: number,
  fiscalQuarter: number,
  ended: string,
  values: number[],
  segments: Record<string, number>,
  filing: string,
  transcript: string,
];

const metricKeys: MetricKey[] = [
  "revenue",
  "grossProfit",
  "grossMargin",
  "operatingIncome",
  "netIncome",
  "eps",
  "operatingCashFlow",
  "capitalExpenditures",
  "freeCashFlow",
];

function period([id, label, fiscalYear, fiscalQuarter, ended, values, segments, filing, transcript]: PeriodInput): FinancialPeriod {
  const metrics = Object.fromEntries(metricKeys.map((key, index) => [key, values[index] ?? null])) as Record<MetricKey, number | null>;
  return {
    id,
    label,
    fiscalYear,
    fiscalQuarter,
    ended,
    metrics,
    segments,
    commentary: [
      { id: `${id}-filing`, kind: "filing", title: `${label} representative filing commentary`, text: filing },
      { id: `${id}-call`, kind: "transcript", title: `${label} representative transcript commentary`, speaker: "Management", text: transcript },
    ],
  };
}

const companies: CompanyData[] = [
  {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    exchange: "NASDAQ",
    sector: "Semiconductors",
    periods: [
      period(["nvda-25q4", "FY 2025 Q4", 2025, 4, "2025-01-26", [39331, 28900, 73.5, 24100, 22091, 0.89, 16600, 1100, 15500], { "Data Center": 35600, Gaming: 2500, "Pro Visualization": 520, Automotive: 490 }, "Revenue increased as accelerated computing demand expanded across cloud, consumer internet and enterprise customers.", "Data Center growth was led by demand for the Blackwell platform. Gross margin reflected the transition to newer, more complex systems." ]),
      period(["nvda-25q3", "FY 2025 Q3", 2025, 3, "2024-10-27", [35082, 26156, 74.6, 21869, 19309, 0.78, 17630, 900, 16730], { "Data Center": 30771, Gaming: 3279, "Pro Visualization": 486, Automotive: 449 }, "Data Center revenue reached a record as compute demand remained broad across customer types.", "Blackwell production shipments began during the quarter while Hopper demand remained strong." ]),
      period(["nvda-25q2", "FY 2025 Q2", 2025, 2, "2024-07-28", [30040, 22700, 75.6, 18642, 16599, 0.68, 14500, 850, 13650], { "Data Center": 26300, Gaming: 2880, "Pro Visualization": 454, Automotive: 346 }, "Revenue growth was driven primarily by Data Center compute platform demand.", "Demand exceeded supply for several accelerated computing products throughout the quarter." ]),
      period(["nvda-25q1", "FY 2025 Q1", 2025, 1, "2024-04-28", [26044, 20400, 78.4, 16909, 14881, 0.61, 15345, 690, 14655], { "Data Center": 22600, Gaming: 2647, "Pro Visualization": 427, Automotive: 329 }, "Data Center revenue growth reflected higher shipments of the Hopper GPU computing platform.", "Customers are building AI factories to train and operate generative AI applications." ]),
      period(["nvda-24q4", "FY 2024 Q4", 2024, 4, "2024-01-28", [22103, 16800, 76.0, 13615, 12285, 0.49, 11499, 550, 10949], { "Data Center": 18404, Gaming: 2865, "Pro Visualization": 463, Automotive: 281 }, "Record quarterly revenue was driven by Data Center demand across cloud and enterprise customers.", "Accelerated computing and generative AI reached an inflection point with broad global demand." ]),
    ],
  },
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    exchange: "NASDAQ",
    sector: "Consumer Technology",
    periods: [
      period(["aapl-25q1", "FY 2025 Q1", 2025, 1, "2024-12-28", [124300, 58275, 46.9, 42832, 36330, 2.40, 29900, 2940, 26960], { iPhone: 69138, Services: 26340, Mac: 8987, iPad: 8088, Wearables: 11747 }, "Quarterly revenue reached a record, with all-time records in Services and in several geographic segments.", "Services momentum and the active device installed base supported gross margin, while foreign exchange remained a headwind." ]),
      period(["aapl-24q4", "FY 2024 Q4", 2024, 4, "2024-09-28", [94930, 43879, 46.2, 29591, 14736, 0.97, 26811, 2910, 23901], { iPhone: 46222, Services: 24972, Mac: 7744, iPad: 6950, Wearables: 9042 }, "Revenue grew year over year with records in Services and total company revenue for a September quarter.", "We saw strength in Services and improving product mix across the quarter." ]),
      period(["aapl-24q3", "FY 2024 Q3", 2024, 3, "2024-06-29", [85777, 39678, 46.3, 25352, 21448, 1.40, 28858, 2150, 26708], { iPhone: 39296, Services: 24213, Mac: 7010, iPad: 7162, Wearables: 8097 }, "Services revenue set an all-time record while total company revenue grew year over year.", "The installed base reached a new high and drove continued engagement with Services." ]),
      period(["aapl-24q2", "FY 2024 Q2", 2024, 2, "2024-03-30", [90753, 42271, 46.6, 27900, 23636, 1.53, 22690, 1996, 20694], { iPhone: 45963, Services: 23867, Mac: 7451, iPad: 5559, Wearables: 7913 }, "Services achieved an all-time revenue record and the installed base reached a new high.", "Comparisons were affected by prior-year supply replenishment in iPhone." ]),
      period(["aapl-24q1", "FY 2024 Q1", 2024, 1, "2023-12-30", [119575, 54855, 45.9, 40373, 33916, 2.18, 39895, 2392, 37503], { iPhone: 69702, Services: 23117, Mac: 7780, iPad: 7023, Wearables: 11953 }, "Quarterly revenue grew with an all-time revenue record in Services.", "The active device installed base reached an all-time high across products and geographic segments." ]),
    ],
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    exchange: "NASDAQ",
    sector: "Software & Cloud",
    periods: [
      period(["msft-25q2", "FY 2025 Q2", 2025, 2, "2024-12-31", [69632, 47000, 67.5, 31653, 24108, 3.23, 22600, 15800, 6800], { "Intelligent Cloud": 25544, "Productivity and Business Processes": 29437, "More Personal Computing": 14651 }, "Revenue increased across the Microsoft Cloud, with continued investment in cloud and AI infrastructure.", "Demand for AI services continued to exceed available capacity in portions of our cloud infrastructure." ]),
      period(["msft-25q1", "FY 2025 Q1", 2025, 1, "2024-09-30", [65585, 45300, 69.1, 30552, 24667, 3.30, 34180, 14900, 19280], { "Intelligent Cloud": 24092, "Productivity and Business Processes": 28317, "More Personal Computing": 13176 }, "Microsoft Cloud revenue increased, led by Azure and productivity services.", "Cloud and AI demand remained strong as infrastructure investment increased." ]),
      period(["msft-24q4", "FY 2024 Q4", 2024, 4, "2024-06-30", [64727, 44700, 69.1, 27925, 22036, 2.95, 37200, 13870, 23330], { "Intelligent Cloud": 28515, "Productivity and Business Processes": 20317, "More Personal Computing": 15900 }, "Revenue grew across each reporting segment and Microsoft Cloud revenue increased.", "AI services contributed to Azure growth while capacity constraints limited further upside." ]),
      period(["msft-24q3", "FY 2024 Q3", 2024, 3, "2024-03-31", [61858, 43350, 70.1, 27581, 21939, 2.94, 31900, 10952, 20948], { "Intelligent Cloud": 26708, "Productivity and Business Processes": 19570, "More Personal Computing": 15580 }, "Microsoft Cloud revenue grew, with Azure demand and adoption of AI services contributing to growth.", "Near-term AI demand remained ahead of available capacity." ]),
      period(["msft-24q2", "FY 2024 Q2", 2024, 2, "2023-12-31", [62020, 42397, 68.4, 27032, 21870, 2.93, 18853, 9735, 9118], { "Intelligent Cloud": 25880, "Productivity and Business Processes": 19249, "More Personal Computing": 16891 }, "Revenue increased across cloud and productivity offerings.", "Azure growth included contribution from AI services as customer migrations continued." ]),
    ],
  },
];

export const companyData = companies;
