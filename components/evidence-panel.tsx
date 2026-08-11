import type { Insight } from "@/lib/types";

function CloseIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5 5 15" /></svg>;
}

export function EvidencePanel({ insight, open, onClose }: { insight: Insight | null; open: boolean; onClose: () => void }) {
  return (
    <aside className={`evidence-panel ${open ? "is-open" : ""}`} aria-label="Insight evidence" aria-hidden={!insight}>
      {insight ? (
        <>
          <header className="evidence-header">
            <div>
              <span className="panel-id">Evidence record · {insight.id.replaceAll("-", " ")}</span>
              <h2>{insight.title}</h2>
            </div>
            <button className="icon-button" onClick={onClose} aria-label="Close evidence"><CloseIcon /></button>
          </header>
          <div className="evidence-summary">
            <span className={`confidence confidence-${insight.confidence.toLowerCase().replace(" ", "-")}`}>{insight.confidence}</span>
            <p>{insight.summary}</p>
          </div>
          <div className="evidence-list">
            {insight.evidence.map((item, index) => (
              <article className={`evidence-item evidence-${item.kind}`} key={item.id}>
                <div className="evidence-index">E{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <span className="evidence-kind">{item.kind === "structured" ? "Structured financial evidence" : item.kind === "commentary" ? "Management commentary" : "Interpretation boundary"}</span>
                  <h3>{item.label}</h3>
                  {item.source ? <blockquote>“{item.detail}”</blockquote> : <p>{item.detail}</p>}
                  {item.source && <small>{item.source.title}{item.source.speaker ? ` · ${item.source.speaker}` : ""}</small>}
                </div>
              </article>
            ))}
          </div>
          <footer className="evidence-footer">
            <span>Evidence coverage</span>
            <strong>{insight.evidence.length} linked records</strong>
          </footer>
        </>
      ) : (
        <div className="evidence-empty">
          <span className="empty-crosshair" aria-hidden="true" />
          <h2>Select a material change</h2>
          <p>Its calculations, source excerpts, and interpretation boundary will appear here.</p>
        </div>
      )}
    </aside>
  );
}
