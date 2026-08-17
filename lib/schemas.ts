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

export const thesisResearchRequestSchema = z.object({
  ticker: z.enum(["NVDA", "AAPL", "MSFT"]),
  mode: z.enum(["qoq", "yoy"]),
  thesis: z.string().trim().min(8).max(320),
});

export const thesisResearchResponseSchema = z.object({
  thesis: z.string(),
  scope: z.string(),
  verdict: z.enum(["Supported", "Mixed", "Challenged", "Insufficient"]),
  confidence: z.enum(["Verified", "Supported", "Interpretation"]),
  summary: z.string(),
  steps: z.array(z.object({ id: z.string(), label: z.string(), detail: z.string() })).min(4).max(5),
  evidence: z.array(z.object({
    id: z.string(),
    label: z.string(),
    value: z.string(),
    detail: z.string(),
    stance: z.enum(["supports", "challenges", "context"]),
  })).max(6),
  limitation: z.string(),
});

export type ThesisResearchResponse = z.infer<typeof thesisResearchResponseSchema>;
