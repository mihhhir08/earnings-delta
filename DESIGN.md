---
name: Earnings Delta — Spectral Ledger
description: A dark evidence-first financial research system built from spectral contrast, ledger hairlines, and tabular measurements.
colors:
  void: "#050505"
  ink: "#09090a"
  panel: "#101011"
  panel-raised: "#171719"
  panel-bright: "#1d1d20"
  text: "#f5f5f2"
  text-soft: "#cacac5"
  muted: "#92928d"
  line: "#29292c"
  line-bright: "#424247"
  spectral: "#ffffff"
  spectral-dim: "#68686d"
  cyan: "#b8c7dc"
  violet: "#91a3ff"
  amber: "#e2b76d"
  negative: "#ff766d"
  focus: "#aebcff"
  workspace-void: "#101011"
  workspace-ink: "#121214"
  workspace-panel: "#171719"
  workspace-panel-raised: "#1d1d20"
  workspace-panel-bright: "#232327"
  workspace-text: "#d7d7d2"
  workspace-text-soft: "#b4b4ae"
  workspace-muted: "#8b8b86"
  workspace-line: "#333337"
  workspace-line-bright: "#48484e"
  workspace-spectral: "#e2e2dd"
  workspace-spectral-dim: "#707075"
typography:
  display:
    fontFamily: "Barlow, Aptos, sans-serif"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.038em"
  body:
    fontFamily: "Aptos, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "9px"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.05em"
rounded:
  lead-index: "8px"
  control: "9px"
  action: "10px"
  identity: "12px"
  conversational: "14px"
  glass: "16px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "22px"
  lg: "28px"
components:
  primary-action:
    backgroundColor: "{colors.spectral}"
    textColor: "{colors.void}"
    typography: "{typography.label}"
    rounded: "{rounded.action}"
    padding: "0 20px"
    height: "48px"
  thesis-action:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.void}"
    typography: "{typography.label}"
    rounded: "0"
    padding: "0 22px"
  active-tab:
    backgroundColor: "{colors.workspace-spectral}"
    textColor: "{colors.workspace-void}"
    typography: "{typography.label}"
    rounded: "0"
---

# Design System: Earnings Delta — Spectral Ledger

## Overview

**Creative North Star: "The Spectral Ledger"**

Earnings Delta is a dark analytical instrument, not a finance dashboard assembled from generic cards. Near-black planes, white spectral signals, fine evidence rules, and tabular measurements make the interface feel exacting and inspectable. The experience is dense but controlled: hierarchy comes from contrast, sequence, and containment rather than decoration.

The landing surface introduces the system with atmospheric beams and a translucent analysis prism. The research workspace then becomes flatter and more operational. The thesis stress test extends that workspace as one continuous instrument immediately after the lead finding: state a claim, watch a five-stage server path resolve, inspect supporting and challenging evidence side by side, and finish on a bounded verdict and limitation.

**Key Characteristics:**

- Spectral white on layered near-black surfaces.
- Violet reserved for operate-mode actions, active research signals, and interpretation states.
- One-pixel hairlines structure evidence more often than cards or shadows.
- Barlow headlines pair with Aptos body copy and monospaced labels and numbers.
- Tabular numerals, uppercase micro-labels, and explicit confidence language support fast analysis.
- Contradictory evidence remains visible at the same hierarchy as supporting evidence.

## Colors

The palette is nearly monochrome, with restrained semantic signals. Root tokens serve the landing experience; the research shell locally softens whites and lifts the black floor for longer analytical sessions.

### Primary

- **Spectral White** (`spectral` / `workspace-spectral`): Primary contrast, active selections, key identifiers, chart lines, and decisive controls. In the workspace it is intentionally softened rather than pure white.
- **Operate Violet** (`violet`): Thesis submission, grounded-question controls, active run signals, neutral calculated deltas, and interpretation labels.

### Secondary

- **Material Amber** (`amber`): High importance, supported confidence, mixed verdicts, and bounded warning states.
- **Analytical Cyan** (`cyan`): Medium-importance information.

### Tertiary

- **Support Green** (`#9dd6ae` / `#b9dcc4`): Completed research stages, supporting evidence, and supported verdicts. It appears only in the research result path.
- **Contradiction Coral** (`negative`): Unfavorable movement, challenging evidence, challenged verdicts, and error-adjacent emphasis.

### Neutral

- **Void / Ink:** The deepest page and foreground-inversion blacks.
- **Panel / Raised / Bright:** A narrow sequence of near-black surfaces used to separate sections without visual bulk.
- **Text / Soft / Muted:** Three explicit reading levels for conclusions, explanation, and metadata.
- **Line / Bright Line:** Hairline dividers and stronger section boundaries.
- **Spectral Dim:** Low-intensity structural white for rules and outlined confidence states.

### Named Rules

**The Violet Means Operate Rule.** Use violet for research actions, progress, focus, and interpretation—not as ambient decoration.

**The Evidence Is Not Color Alone Rule.** Every importance, confidence, stance, direction, and verdict state includes a textual label or value in addition to its hue.

**The Near-Black Ladder Rule.** Separate analytical layers with the established near-black surfaces and hairlines; do not introduce unrelated colored panels.

## Typography

**Display Font:** Barlow, locally loaded at weights 400, 600, 700, and 800, with Aptos and sans-serif fallbacks.

**Body Font:** Aptos with Segoe UI and sans-serif fallbacks.

**Label/Mono Font:** `ui-monospace`, SFMono-Regular, Menlo, monospace.

**Character:** Barlow carries the product's direct, engineered voice in headings and actions. Aptos keeps explanations readable, while the monospaced layer turns periods, values, confidence, evidence IDs, stages, and scopes into ledger data.

### Hierarchy

- **Display** (700, `clamp(4.25rem, 7.5vw, 5.5rem)`, 0.9): Landing thesis only; tightly tracked and balanced across two lines.
- **Workspace headline** (`clamp(26px, 2.5vw, 38px)`, 1): Issuer identity and major research context.
- **Lead finding title** (`clamp(24px, 2.2vw, 30px)`, 1.2): The highest-priority analytical observation.
- **Panel title** (17–22px): Evidence and thesis-instrument headings.
- **Body** (11–15px, 1.5–1.65): Explanations become larger on narrow screens where reading distance and density change.
- **Label** (7–11px, uppercase, tracked): Periods, confidence, evidence kinds, stage scope, axis labels, and footer metadata.
- **Measurement** (13–29px, monospaced, tabular numerals): Financial values, deltas, chart readouts, and evidence-matrix values.

**The Measurement Voice Rule.** Financial values and comparison metadata always use the monospaced stack with tabular numerals.

**The Microcopy Has a Job Rule.** Uppercase tracked labels identify data roles and states; they do not replace explanatory prose.

## Layout

The landing page is cinematic and centered: a full-viewport hero, floating glass navigation, two-line claim, and a wide analysis prism. Proof then moves into ruled editorial sections. At 920px, multi-column story and proof structures simplify; at 760px the navigation compresses, actions stack, and proof becomes a single flow.

The research workspace is a vertical ledger with a sticky 60px terminal header, dataset disclosure, issuer band, six-cell financial snapshot, trend panel, and a two-column main region. On wide screens the changes pane occupies roughly two-thirds while the evidence panel remains sticky on the right. The content order is deliberate: lead finding → thesis stress test → bounded question tool → remaining findings. This keeps the contradiction-first instrument in the first working viewport without severing it from the ranked evidence list.

The thesis result uses two linked columns: a narrower five-stage research trace and a wider evidence matrix. Matrix rows lead with stance, then evidence detail, then a right-aligned tabular value. The verdict spans both columns above; scope and limitation span both below.

At 1180px the evidence panel becomes a right-side modal drawer with a scrim, trapped focus, Escape dismissal, and focus restoration. The six-metric snapshot becomes three columns. At 760px, the snapshot becomes two columns, workspace sections stack, the thesis textarea and action stack, suggestions become full-width rows, and the research trace precedes the evidence matrix. Matrix values move beneath their details without changing semantic order. At 480px, only the landing typography and footer compress further. Safe-area insets are honored throughout mobile headers, drawers, and footers.

**The Continuous Instrument Rule.** Keep the thesis form, live stages, verdict, trace, matrix, and research boundary inside one ruled surface.

**The Lead-Finding Adjacency Rule.** The stress test stays immediately after the first ranked finding and before conversational follow-up or lower-ranked observations.

## Elevation & Depth

The workspace is flat by default. One-pixel borders, near-black tonal steps, and selected-row fills establish hierarchy; this is the evidence-ledgers' core depth language. The landing navigation and analysis prism are the exception, using translucent black, backdrop blur, and large ambient shadows to suggest a spectral instrument emerging from darkness.

The mobile evidence drawer uses a strong left-cast shadow (`-20px 0 60px rgba(0,0,0,.5)`) because it temporarily sits above the workspace. Focus is structural and bright: a two-pixel focus outline or violet inset ring, never a soft decorative glow.

**The Flat-at-Work Rule.** Analytical content uses hairlines and tonal separation; reserve ambient shadows for the landing spectacle and true overlay elevation.

## Shapes

The operate-mode ledger is predominantly square: the thesis instrument, form, action, suggestion rows, verdict, research trace, evidence matrix, and boundary align as one rectilinear system. One-pixel rules create the repeated horizontal and vertical cadence.

Rounded forms are reserved for compact identities and conventional controls: lead-finding index (8px), search control (9px), primary actions (10px), ticker block (12px), Ask Delta card (14px), and glass landing containers (16px). Circular geometry appears only in tiny importance dots, research-path nodes, and the evidence-panel empty-state crosshair.

**The Instrument Stays Square Rule.** Do not round the thesis stress test into a chatbot card; its edges belong to the ledger grid.

## Components

### Spectral actions

Primary actions invert to spectral white on void, use compact uppercase Barlow, and maintain a 48px minimum height. Hover lifts the control by 2px and softens white slightly. Secondary landing actions use translucent black, an inset white hairline, and blur. The thesis action instead uses operate violet, remains square, and stretches with the light thesis-entry field.

### Tabs and segmented controls

Company tabs, period controls, and trend tabs are compact, ruled, and label-forward. Resting states are muted; hover lifts the text and surface; active states invert to spectral on void. `aria-pressed` carries selection semantics.

### Financial snapshot and trend

Metric cells use hairline separators, muted uppercase labels, large monospaced tabular values, and smaller QoQ/YoY deltas. The trend chart continues the same language with spectral strokes, void points, fine gridlines, and aligned monospaced readouts. Horizontal overflow preserves the chart's measurement density on narrow screens.

### Ranked findings

Each finding is a full-width button with numeric index, importance and confidence labels, a concise claim, supporting metrics, and an explicit “Inspect evidence” action. The lead finding receives more vertical space, a spectral index block, and a stronger lower rule. Selection adds a one-pixel spectral edge and a lifted near-black surface.

### Evidence panel

The evidence panel presents claim → calculation → commentary → confidence as a visible route. Evidence rows combine an `E01`-style index, evidence-kind label, title, explanation, and source boundary. Commentary and interpretation use barely shifted background tones. On smaller screens the panel becomes an accessible modal drawer; its close control expands to a 44px target.

### Thesis stress test

The thesis stress test is the signature operate-mode component. Its header pairs a square spectral research mark with a violet period scope. A light text-entry plane creates decisive contrast against the dark ledger, while the violet action makes the primary operation unmistakable.

Idle state shows three ruled thesis suggestions. Loading state streams the five-stage research path into an `aria-live` status, using a pulsing violet signal and green completed-stage markers. Error state uses explicit coral copy. Result state opens with a labeled verdict, then presents the research path beside an evidence matrix ordered to make supporting, challenging, and contextual evidence directly comparable. The final boundary states scope and limitation rather than implying advice.

### Confidence, importance, stance, and verdict states

Confidence labels are outlined and text-named: Verified is spectral, Supported is amber, and Interpretation is violet. Importance uses a small dot plus High, Medium, or Monitor copy. Evidence stance uses Supports, Challenges, or Context. Verdicts use Supported, Mixed, Challenged, or Insufficient. These vocabularies stay distinct because they answer different analytical questions.

### Empty, loading, disabled, and error states

Evidence empty state uses a ruled crosshair and direct instruction. Loading pages use a spectral delta block and one-pixel progress line. Disabled research actions become neutral gray with a not-allowed cursor. Errors remain short, explicit, and visually differentiated without breaking the surrounding ledger.

## Do's and Don'ts

### Do:

- **Do** keep calculations, evidence, confidence, stance, verdict, scope, and limitations visibly distinct.
- **Do** preserve the lead finding → stress test → bounded question → remaining findings hierarchy.
- **Do** use one-pixel evidence hairlines and near-black tonal steps as the default structural language.
- **Do** reserve violet for actions, focus, active research signals, and interpretation.
- **Do** use tabular monospaced numerals for financial values and preserve values when responsive layouts stack.
- **Do** search for and display challenging evidence at equal visual status to supporting evidence.
- **Do** keep controls keyboard accessible, maintain visible focus, honor reduced motion, and preserve 44px coarse-pointer targets.

### Don't:

- **Don't** turn the thesis workflow into a generic chat bubble, floating assistant, or rounded card.
- **Don't** use color as the only carrier of confidence, stance, movement, or verdict.
- **Don't** add decorative stock imagery, market-ticker tropes, gradients, or unrelated accent colors.
- **Don't** use shadows to separate ordinary analytical rows or panels.
- **Don't** collapse contradiction, uncertainty, or research limitations into a single confidence score.
- **Don't** imply live filings, predictive power, investment advice, or certainty the representative dataset cannot support.
