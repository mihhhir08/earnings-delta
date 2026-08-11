import { z } from "zod";

export const askDeltaRequestSchema = z.object({
  ticker: z.enum(["NVDA", "AAPL", "MSFT"]),
  mode: z.enum(["qoq", "yoy"]),
  question: z.string().trim().min(3).max(240),
});

export const askDeltaResponseSchema = z.object({
  answer: z.string(),
  confidence: z.enum(["Verified", "Supported", "Interpretation"]),
  evidence: z.array(z.object({ label: z.string(), detail: z.string() })).max(4),
  limited: z.boolean(),
});

export type AskDeltaResponse = z.infer<typeof askDeltaResponseSchema>;
