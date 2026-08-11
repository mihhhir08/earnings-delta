"use client";

import { FormEvent, useState } from "react";
import type { AskDeltaResponse } from "@/lib/schemas";
import type { ComparisonMode } from "@/lib/types";

const prompts = ["What drove the revenue change?", "Why did gross margin move?", "How did cash conversion change?"];

function SendIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m3 4 14 6-14 6 2-6-2-6Zm2 6h12" /></svg>;
}

export function AskDelta({ ticker, mode, currentPeriod, comparisonPeriod }: { ticker: string; mode: ComparisonMode; currentPeriod: string; comparisonPeriod: string }) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<AskDeltaResponse | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function submit(event: FormEvent, suggested?: string) {
    event.preventDefault();
    const nextQuestion = suggested ?? question;
    if (nextQuestion.trim().length < 3) return;
    setQuestion(nextQuestion);
    setStatus("loading");
    setResponse(null);
    try {
      const result = await fetch("/api/ask", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ticker, mode, question: nextQuestion }) });
      if (!result.ok) throw new Error("request failed");
      setResponse(await result.json() as AskDeltaResponse);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="ask-delta" aria-labelledby="ask-heading">
      <div className="ask-title">
        <div><span className="ask-mark">Δ?</span><div><h2 id="ask-heading">Ask this comparison</h2><p id="ask-scope">Ask about revenue, gross margin, income, EPS, segments, or free cash flow. Answers use only this representative record.</p></div></div>
        <span className="grounding-state">{ticker} · {currentPeriod} vs {comparisonPeriod}</span>
      </div>
      <form onSubmit={submit}>
        <label className="sr-only" htmlFor="delta-question">Question about the selected comparison</label>
        <input id="delta-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="e.g. How did EPS change?" maxLength={240} aria-describedby="ask-scope" enterKeyHint="send" autoComplete="off" />
        <button type="submit" disabled={status === "loading" || question.trim().length < 3} aria-label="Answer question"><SendIcon /></button>
      </form>
      {!response && status !== "loading" && (
        <div className="suggested-prompts">
          {prompts.map((prompt) => <button type="button" key={prompt} onClick={(event) => submit(event, prompt)}>{prompt}</button>)}
        </div>
      )}
      {status === "loading" && <div className="ask-status" role="status"><span /> Calculating from the selected record…</div>}
      {status === "error" && <div className="ask-error" role="alert">We could not complete that question. Please try again.</div>}
      {response && (
        <div className="ask-response" aria-live="polite">
          <div className="answer-line"><span className={`confidence confidence-${response.limited && response.evidence.length === 0 ? "ai-interpretation" : response.confidence.toLowerCase().replace(" ", "-")}`}>{response.limited && response.evidence.length === 0 ? "Scope limit" : response.confidence}</span><p>{response.answer}</p></div>
          {response.evidence.length > 0 && <div className="answer-evidence">{response.evidence.map((item) => <span key={item.label}><strong>{item.label}</strong>{item.detail}</span>)}</div>}
        </div>
      )}
    </section>
  );
}
