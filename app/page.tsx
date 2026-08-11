import Link from "next/link";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function DeltaMark() {
  return <span className="delta-mark" aria-hidden="true">Δ</span>;
}

export default function HomePage() {
  return (
    <main className="landing-shell">
      <nav className="landing-nav" aria-label="Primary navigation">
        <Link className="wordmark" href="/"><DeltaMark /> Earnings Delta</Link>
        <Link className="text-link" href="/research/NVDA">Open research <ArrowIcon /></Link>
      </nav>

      <section className="landing-hero">
        <div className="hero-copy">
          <h1>See what changed.<br />Understand why.<br /><span>Verify the evidence.</span></h1>
          <p>Compare reporting periods, detect material financial changes, and trace each conclusion back to the underlying numbers or management commentary.</p>
          <div className="hero-actions">
            <Link className="primary-action" href="/research/NVDA">Open Demo <ArrowIcon /></Link>
            <span className="demo-inline"><strong>Demo data</strong> · No signup or API key</span>
          </div>
        </div>

        <div className="hero-proof" aria-label="Product preview">
          <div className="preview-topline">
            <span className="preview-ticker">NVDA</span>
            <span>FY 2025 Q4</span>
            <span className="preview-mode">vs. Q3</span>
          </div>
          <div className="preview-metrics">
            <div><span>Revenue</span><strong>$39.3B</strong><small>+12.1% QoQ</small></div>
            <div><span>Gross margin</span><strong>73.5%</strong><small>−1.1 pp QoQ</small></div>
            <div><span>Free cash flow</span><strong>$15.5B</strong><small>−7.4% QoQ</small></div>
          </div>
          <div className="preview-case">
            <div className="case-rank">01</div>
            <div>
              <div className="preview-label"><span>High importance</span><span>Supported</span></div>
              <h2>Data Center drove the change</h2>
              <p>Segment growth represented the majority of incremental revenue.</p>
              <div className="evidence-chain">
                <span>Calculation verified</span><i /> <span>Management source linked</span>
              </div>
            </div>
          </div>
          <div className="preview-footer"><span>Every conclusion has a trail.</span><span>View evidence →</span></div>
        </div>
      </section>

      <section className="landing-principle">
        <p>Financial statements tell you what happened.</p>
        <h2>Earnings Delta isolates what matters, ranks it, and keeps the reasoning auditable.</h2>
        <div className="principle-flow" aria-label="Analysis process">
          <span>Normalize</span><i />
          <span>Calculate</span><i />
          <span>Rank</span><i />
          <span>Ground</span><i />
          <span>Explain</span>
        </div>
      </section>

      <footer className="landing-footer">
        <span>Earnings Delta</span>
        <span>This public demo uses representative financial data.</span>
      </footer>
    </main>
  );
}
