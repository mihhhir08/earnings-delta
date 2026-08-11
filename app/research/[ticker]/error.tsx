"use client";

export default function ResearchError({ reset }: { reset: () => void }) {
  return (
    <main className="state-page">
      <span className="state-code">Research unavailable</span>
      <h1>The research record could not be assembled.</h1>
      <p>No partial figures were displayed. Try rebuilding the evidence trail.</p>
      <button className="primary-action" onClick={reset}>Try again</button>
    </main>
  );
}
