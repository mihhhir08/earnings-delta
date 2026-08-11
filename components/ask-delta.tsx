"use client";

import { FormEvent, useState } from "react";
import type { AskDeltaResponse } from "@/lib/schemas";
import type { ComparisonMode } from "@/lib/types";

const prompts = ["What drove revenue growth?", "Why did gross margin change?", "Did free cash flow improve?"];

function SendIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m3 4 14 6-14 6 2-6-2-6Zm2 6h12" /></svg>;
}

export function AskDelta({ ticker, mode }: { ticker: string; mode: ComparisonMode }) {
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
        <div><span className="ask-mark">Δ?</span><h2 id="ask-heading">Ask the Delta</h2></div>
        <span className="no-key-state">Deterministic mode · no AI key</span>
      </div>
      <form onSubmit={submit}>
        <label className="sr-only" htmlFor="delta-question">Ask about this quarter</label>
        <input id="delta-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about this quarter..." maxLength={240} />
        <button disabled={status === "loading" || question.trim().length < 3} aria-label="Submit question"><SendIcon /></button>
      </form>
      {!response && status !== "loading" && (
        <div className="suggested-prompts">
          {prompts.map((prompt) => <button key={prompt} onClick={(event) => submit(event, prompt)}>{prompt}</button>)}
        </div>
      )}
      {status === "loading" && <div className="ask-status" role="status"><span /> Checking the active evidence set…</div>}
      {status === "error" && <div className="ask-error" role="alert">The research endpoint did not respond. Try the question again.</div>}
      {response && (
        <div className="ask-response">
          <div className="answer-line"><span className={`confidence confidence-${response.confidence.toLowerCase().replace(" ", "-")}`}>{response.confidence}</span><p>{response.answer}</p></div>
          {response.evidence.length > 0 && <div className="answer-evidence">{response.evidence.map((item) => <span key={item.label}><strong>{item.label}</strong>{item.detail}</span>)}</div>}
        </div>
      )}
    </section>
  );
}
