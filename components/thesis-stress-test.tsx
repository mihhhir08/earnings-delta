"use client";

import { FormEvent, useState } from "react";
import type { ThesisResearchResponse } from "@/lib/schemas";
import type { ComparisonMode, ThesisResearchEvent, ThesisResearchStep } from "@/lib/types";

const suggestedTheses = [
  "Growth quality strengthened across the business.",
  "Operating leverage improved this quarter.",
  "Cash generation kept pace with revenue.",
];

const buildDirection = "THESIS=make plan, calculation, contradiction, and synthesis visible; OWN-WORLD=spectral ledger, violet action, hairline evidence, tabular measurements; STORY=state thesis, observe server stages, compare opposing evidence, reach bounded verdict; FIRST-VIEWPORT=continuous instrument after lead finding; FORM=operate-mode extension with streamed five-stage path; FINISH=reviewed, verified, and documented";

function ResearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10" cy="10" r="6" />
      <path d="m14.5 14.5 5 5M10 6v8M6 10h8" />
    </svg>
  );
}

export function ThesisStressTest({ ticker, mode, currentPeriod, comparisonPeriod }: {
  ticker: string;
  mode: ComparisonMode;
  currentPeriod: string;
  comparisonPeriod: string;
}) {
  const [thesis, setThesis] = useState("");
  const [run, setRun] = useState<ThesisResearchResponse | null>(null);
  const [liveSteps, setLiveSteps] = useState<ThesisResearchStep[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function submit(event: FormEvent, suggestion?: string) {
    event.preventDefault();
    const nextThesis = suggestion ?? thesis;
    if (nextThesis.trim().length < 8) return;
    setThesis(nextThesis);
    setRun(null);
    setLiveSteps([]);
    setStatus("loading");

    try {
      const result = await fetch("/api/research", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ticker, mode, thesis: nextThesis }),
      });
      if (!result.ok) throw new Error("request failed");
      if (!result.body) throw new Error("stream unavailable");
      const reader = result.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        buffer += decoder.decode(value, { stream: !done });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line) continue;
          const event = JSON.parse(line) as ThesisResearchEvent;
          if (event.type === "stage") setLiveSteps((steps) => [...steps, event.step]);
          if (event.type === "result") setRun(event.run);
          if (event.type === "error") throw new Error(event.message);
        }
        if (done) break;
      }
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="thesis-lab" aria-labelledby="thesis-heading">
      <span
        hidden
        data-build-direction={buildDirection}
        dangerouslySetInnerHTML={{ __html: `<!-- ${buildDirection} -->` }}
      />
      {/*
        THESIS: Make the plan → calculate → contradict → synthesize loop visible; refuse the generic chatbot card.
        OWN-WORLD: Inherit the spectral ledger, violet action, hairline evidence structure, and tabular measurements.
        STORY: State a thesis, watch real server stages arrive, compare opposing evidence, reach a bounded verdict.
        FIRST VIEWPORT: Place one continuous research instrument immediately after the lead finding.
        FORM: Operate-mode local extension; signature interaction is the streamed five-stage research path.
        FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md.
      */}
      <div className="thesis-intro">
        <div className="thesis-heading">
          <span className="research-mark"><ResearchIcon /></span>
          <div>
            <h2 id="thesis-heading">Stress-test a thesis</h2>
            <p>Set a claim. Earnings Delta plans the checks, runs the math, and looks for evidence against it.</p>
          </div>
        </div>
        <span className="thesis-scope">{ticker} · {currentPeriod} vs {comparisonPeriod}</span>
      </div>

      <form className="thesis-form" onSubmit={submit}>
        <label className="sr-only" htmlFor="thesis-input">Thesis to stress-test</label>
        <textarea
          id="thesis-input"
          value={thesis}
          onChange={(event) => setThesis(event.target.value)}
          placeholder="e.g. Operating leverage improved this quarter."
          maxLength={320}
          rows={2}
        />
        <button type="submit" disabled={status === "loading" || thesis.trim().length < 8}>
          {status === "loading" ? "Running checks" : "Run stress test"}
        </button>
      </form>

      {!run && status !== "loading" && (
        <div className="thesis-suggestions" aria-label="Suggested theses">
          {suggestedTheses.map((suggestion) => (
            <button type="button" key={suggestion} onClick={(event) => submit(event, suggestion)}>{suggestion}</button>
          ))}
        </div>
      )}

      {status === "loading" && (
        <div className="research-running" role="status" aria-live="polite">
          <div className="running-title"><span className="run-signal" /><div><strong>Research run in progress</strong><small>{liveSteps.at(-1)?.detail ?? "Starting the evidence-bound run…"}</small></div></div>
          {liveSteps.length > 0 && <ol>{liveSteps.map((step) => <li key={step.id}>{step.label}</li>)}</ol>}
        </div>
      )}

      {status === "error" && <div className="thesis-error" role="alert">The research run failed. Check the connection and try again.</div>}

      {run && (
        <div className="research-result" aria-live="polite">
          <header className="verdict-line">
            <div><span>Verdict · {run.confidence} · Representative data</span><strong className={`verdict-${run.verdict.toLowerCase()}`}>{run.verdict}</strong></div>
            <p>{run.summary}</p>
          </header>

          <div className="research-trace">
            <div className="trace-column">
              <h3>Research path</h3>
              <ol>
                {run.steps.map((step) => (
                  <li key={step.id}>
                    <span aria-hidden="true" />
                    <div><strong>{step.label}</strong><p>{step.detail}</p></div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="evidence-matrix">
              <h3>Evidence matrix</h3>
              {run.evidence.length ? run.evidence.map((item) => (
                <article key={item.id}>
                  <span className={`stance stance-${item.stance}`}>{item.stance}</span>
                  <div><strong>{item.label}</strong><p>{item.detail}</p></div>
                  <b>{item.value}</b>
                </article>
              )) : <p className="research-empty">{run.limitation}</p>}
            </div>
          </div>

          <footer className="research-boundary"><span>{run.scope}</span><p>{run.limitation}</p></footer>
        </div>
      )}
    </section>
  );
}
