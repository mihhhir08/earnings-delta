"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AskDelta } from "@/components/ask-delta";
import { EvidencePanel } from "@/components/evidence-panel";
import { FinancialTrend } from "@/components/financial-trend";
import { formatFinancialValue } from "@/lib/finance/analysis";
import type { ComparisonMode, Insight, ResearchAnalysis } from "@/lib/types";

function SearchIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="9" cy="9" r="5" /><path d="m13 13 4 4" /></svg>;
}

function EvidenceIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 3h8l3 3v11H5V3Z" /><path d="M13 3v4h3M8 10h5M8 13h5" /></svg>;
}

function formatDelta(value: number | null, margin = false) {
  if (value === null) return "n/m";
  return `${value >= 0 ? "+" : "−"}${Math.abs(value).toFixed(1)}${margin ? " pp" : "%"}`;
}

export function ResearchWorkspace({ analyses, companies }: { analyses: Record<ComparisonMode, ResearchAnalysis>; companies: { ticker: string; name: string }[] }) {
  const router = useRouter();
  const [mode, setMode] = useState<ComparisonMode>("qoq");
  const [selectedId, setSelectedId] = useState<string | null>(analyses.qoq.insights[0]?.id ?? null);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const analysis = analyses[mode];
  const selected = useMemo(() => analysis.insights.find((insight) => insight.id === selectedId) ?? null, [analysis, selectedId]);

  function changeMode(nextMode: ComparisonMode) {
    setMode(nextMode);
    setSelectedId(analyses[nextMode].insights[0]?.id ?? null);
    setEvidenceOpen(false);
  }

  function selectInsight(insight: Insight) {
    setSelectedId(insight.id);
    setEvidenceOpen(true);
  }

  function renderInsight(insight: Insight, index: number) {
    return (
      <article className={`change-row ${selected?.id === insight.id ? "selected" : ""}`} key={insight.id}>
        <button className="change-hit" onClick={() => selectInsight(insight)} aria-label={`View evidence for ${insight.title}`}>
          <span className="change-number">{String(index + 1).padStart(2, "0")}</span>
          <div className="change-content">
            <div className="change-meta"><span className={`importance importance-${insight.importance.toLowerCase()}`}><i />{insight.importance}</span><span className={`confidence confidence-${insight.confidence.toLowerCase().replace(" ", "-")}`}>{insight.confidence}</span></div>
            <h3>{insight.title}</h3>
            <p>{insight.summary}</p>
            <div className="supporting-metrics">{insight.supportingMetrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
          </div>
          <span className="view-evidence"><EvidenceIcon /> Inspect evidence</span>
        </button>
      </article>
    );
  }

  return (
    <main className="research-shell">
      <div className="workspace-ambient" aria-hidden="true" />
      <header className="terminal-header">
        <Link className="wordmark" href="/"><span className="delta-mark">Δ</span> Earnings Delta</Link>
        <div className="company-search">
          <SearchIcon />
          <label className="sr-only" htmlFor="company-selector">Select company</label>
          <select id="company-selector" value={analysis.company.ticker} onChange={(event) => router.push(`/research/${event.target.value}`)}>
            {companies.map((company) => <option key={company.ticker} value={company.ticker}>{company.ticker} · {company.name}</option>)}
          </select>
        </div>
      </header>

      <details className="dataset-disclosure">
        <summary>
          <strong>Representative dataset</strong>
          <span className="dataset-summary-copy">Illustrative financials and commentary for period comparison</span>
          <span className="dataset-action">About the data</span>
        </summary>
        <div className="dataset-methodology">
          <p>Figures are representative records used to demonstrate period comparison and evidence workflows. Selecting a company or comparison updates calculations and findings from that record.</p>
          <p><strong>Label guide.</strong> Verified means calculated from structured values. Supported adds matching representative commentary. Interpretation marks a calculated pattern without a confirmed cause. Materiality reflects financial magnitude and company relevance. Commentary is representative and is not presented as verbatim company disclosure.</p>
        </div>
      </details>

      <section className="issuer-band">
        <div className="issuer-identity">
          <span className="ticker-block">{analysis.company.ticker}</span>
          <div><h1>{analysis.company.name}</h1><p>{analysis.company.exchange} · {analysis.company.sector} · Period ended {analysis.currentPeriod.ended}</p></div>
        </div>
        <div className="period-control">
          <span>Compare {analysis.currentPeriod.label}</span>
          <div role="group" aria-label="Comparison period">
            <button className={mode === "qoq" ? "active" : ""} onClick={() => changeMode("qoq")} aria-pressed={mode === "qoq"}><span>Previous quarter</span><small>{analyses.qoq.comparisonPeriod.label}</small></button>
            <button className={mode === "yoy" ? "active" : ""} onClick={() => changeMode("yoy")} aria-pressed={mode === "yoy"}><span>Prior year</span><small>{analyses.yoy.comparisonPeriod.label}</small></button>
          </div>
        </div>
      </section>

      <section className="snapshot" aria-labelledby="snapshot-title">
        <div className="section-heading"><h2 id="snapshot-title">Financial condition</h2><span>USD millions, except per-share data</span></div>
        <div className="snapshot-grid">
          {analysis.snapshot.map((metric) => (
            <article className="metric-cell" key={metric.key}>
              <span>{metric.label}</span>
              <strong>{formatFinancialValue(metric.key, metric.current)}</strong>
              <div className="metric-deltas">
                <span className={mode === "qoq" ? metric.direction : ""}>QoQ {formatDelta(metric.key === "grossMargin" ? metric.qoq.percentagePoints : metric.qoq.percent, metric.key === "grossMargin")}</span>
                <span className={mode === "yoy" ? metric.direction : ""}>YoY {formatDelta(metric.key === "grossMargin" ? metric.yoy.percentagePoints : metric.yoy.percent, metric.key === "grossMargin")}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FinancialTrend points={analysis.trend} />

      <div className="research-main">
        <section className="changes-pane" aria-labelledby="changes-title">
          <div className="section-heading changes-heading">
            <div><h2 id="changes-title">What changed</h2><p aria-live="polite">{analysis.currentPeriod.label} versus {analysis.comparisonPeriod.label}; ranked by financial magnitude and relevance.</p></div>
            <span>{analysis.insights.length} material observations</span>
          </div>
          <div className="change-list change-list-primary">{analysis.insights.slice(0, 1).map(renderInsight)}</div>
          <AskDelta key={`${analysis.company.ticker}-${mode}`} ticker={analysis.company.ticker} mode={mode} currentPeriod={analysis.currentPeriod.label} comparisonPeriod={analysis.comparisonPeriod.label} />
          <div className="change-list change-list-rest">{analysis.insights.slice(1).map((insight, index) => renderInsight(insight, index + 1))}</div>
        </section>
        <EvidencePanel insight={selected} open={evidenceOpen} onClose={() => setEvidenceOpen(false)} />
      </div>

      {evidenceOpen && <button className="mobile-scrim" onClick={() => setEvidenceOpen(false)} aria-label="Close evidence overlay" />}
      <footer className="terminal-footer"><span>{analysis.currentPeriod.label} compared with {analysis.comparisonPeriod.label}</span><span>Structured calculations · representative commentary</span></footer>
    </main>
  );
}
