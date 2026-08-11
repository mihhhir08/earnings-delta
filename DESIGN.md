---
name: Earnings Delta
description: A chain-of-custody research ledger for material financial change.
colors:
  cobalt-action: "#1649d8"
  cobalt-deep: "#0f3295"
  signal-yellow: "#f1d94b"
  favorable-teal: "#147d6f"
  unfavorable-rust: "#a7482d"
  interpretation-violet: "#6944a8"
  cool-paper: "#f4f6f8"
  paper-white: "#ffffff"
  graphite-ink: "#111820"
  muted-graphite: "#5f6c78"
  ledger-rule: "#cbd2d9"
  ledger-rule-dark: "#9ba6b1"
  focus-blue: "#006de5"
typography:
  display:
    fontFamily: "Barlow, Aptos, sans-serif"
    fontSize: "clamp(23px, 2.2vw, 32px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Barlow, Aptos, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.018em"
  body:
    fontFamily: "Aptos, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "9px"
    fontWeight: 750
    lineHeight: 1.2
    letterSpacing: "0.045em"
  value:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "clamp(18px, 2.1vw, 27px)"
    fontWeight: 720
    lineHeight: 1
    letterSpacing: "-0.04em"
rounded:
  square: "0"
  status-dot: "50%"
spacing:
  xs: "6px"
  sm: "8px"
  md: "14px"
  lg: "18px"
  xl: "22px"
  2xl: "28px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt-action}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.square}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-deep}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.square}"
  input-command:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.square}"
    padding: "0 15px"
    height: "50px"
  chip-importance-high:
    backgroundColor: "{colors.signal-yellow}"
    textColor: "{colors.graphite-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0 7px"
    height: "20px"
  card-ledger:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.square}"
    padding: "21px 26px"
---

# Design System: Earnings Delta

## Overview

**Creative North Star: "The Chain-of-Custody Ledger"**

Earnings Delta feels like a modern research record assembled for scrutiny. Cool paper, graphite ink, ruled divisions, squared controls, and dense tabular values make financial changes feel inspectable rather than decorative. Cobalt identifies actions and the active analytical path; signal yellow behaves like an evidence tab attached to the record.

The interface is compact, sober, and deliberately unlike a generic stock-dashboard grid. Information is sequenced as a chain: issuer, comparable period, metric delta, ranked observation, linked evidence, then grounded follow-up. Expressive moments come from strict contrast and editorial composition, not soft cards or ornamental data visualization.

**Key Characteristics:**

- Chain-of-custody information hierarchy from claim to source.
- Cool paper and ruled white ledgers instead of floating dashboard cards.
- Cobalt actions and signal-yellow evidence markers used with restraint.
- Squared controls, tight labels, and monospaced financial values.
- Dense desktop comparison that collapses into a legible mobile record.

## Colors

The palette reads as annotated research paper: restrained neutrals carry the record, cobalt directs action, and evidence colors classify meaning without becoming decoration.

### Primary

- **Cobalt Action:** The sole action and selection color, used for active comparison controls, ranked record markers, links, submit controls, and selected-row rails.
- **Cobalt Deep:** The pressed or hover continuation of the primary action color.

### Secondary

- **Signal Yellow:** A physical evidence-marker color for ticker blocks, high-importance labels, status lights, evidence summaries, and the Delta question mark.

### Tertiary

- **Favorable Teal:** Positive financial direction and verified evidence states.
- **Unfavorable Rust:** Negative financial direction and error-adjacent meaning.
- **Interpretation Violet:** Neutral analytical movement and explicitly interpretive evidence.

### Neutral

- **Cool Paper:** The workspace canvas and quietest structural surface.
- **Paper White:** Metric cells, issuer records, ledger rows, and fields.
- **Graphite Ink:** Primary text, command bars, and the Ask surface.
- **Muted Graphite:** Secondary copy, metadata, and inactive values.
- **Ledger Rule / Ledger Rule Dark:** Fine cell divisions and stronger section boundaries.

### Named Rules

**The Evidence Ink Rule.** Yellow marks evidence, importance, or system status; it is never a general-purpose decorative accent.

**The One Action Color Rule.** Cobalt alone carries interactivity and active selection. Semantic teal, rust, and violet classify data rather than invite clicks.

## Typography

**Display Font:** Barlow (with Aptos and sans-serif fallbacks)  
**Body Font:** Aptos (with Segoe UI and sans-serif fallbacks)  
**Label/Mono Font:** UI Monospace (with SFMono-Regular, Menlo, and monospace fallbacks)

**Character:** Barlow gives issuer names and claims a compact editorial authority. Aptos stays highly readable in explanatory text, while the monospaced face makes values, ranks, evidence IDs, and classifications behave like auditable records.

### Hierarchy

- **Display** (700, fluid 23–32px, 1): Issuer identity and principal record headings.
- **Headline** (700, 18px, 1.2): Ranked material-change claims.
- **Title** (700, 12–14px): Uppercase section labels and compact module headings.
- **Body** (400, 15px, 1.45): Default interface copy; analytical summaries tighten to 13px and remain within roughly 72 characters per line.
- **Label** (750, 9px, 0.045em, uppercase): Evidence IDs, confidence, importance, dates, units, and other chain-of-custody metadata.
- **Value** (720, fluid 18–27px, 1): Financial values with tight tracking and tabular alignment.

### Named Rules

**The Audit Trail Rule.** Anything a reviewer may compare—amounts, ranks, dates, periods, scores, IDs, or classifications—uses the monospaced voice.

**The Compression Rule.** Small type is reserved for concise metadata; explanatory copy never adopts the label treatment.

## Layout

The workspace uses edge-to-edge ledger bands rather than a centered card grid. A sticky 58px command header leads into a 130px issuer record, a 46px section rail, and a six-column metric ledger. The analysis body is a two-pane grid: the ranked changes pane receives roughly two-thirds of the width and the sticky evidence pane the remainder, with a practical 360px minimum.

Spacing follows a compact 6–28px rhythm. Ledger rows typically use 18–28px internal padding; hairline rules replace large gaps as the primary grouping device. At 1050px, the metric ledger becomes three columns and evidence becomes a right-side overlay. At 760px, the header compacts, metrics become two columns, the period control spans the width, change rows reduce to two columns, and the question bar moves after the ranked list.

**The First-Viewport Rule.** On a research route, the command header, issuer record, six-value snapshot, ranked delta, evidence workspace, and question entry should read as one continuous workflow—not separate dashboard modules.

## Elevation & Depth

The research ledger is flat by default. Depth comes from tonal layering, sticky positioning, border strength, and the contrast between cool paper, white records, and graphite command surfaces. Shadows are reserved for temporary or promotional lift: the desktop landing preview, primary marketing action, Ask panel, and responsive evidence drawer.

### Shadow Vocabulary

- **Action Lift** (`0 8px 20px rgba(22, 73, 216, .2)`): Primary marketing action only.
- **Ask Lift** (`0 10px 30px rgba(20, 32, 45, .13)`): Separates the grounded question surface from ranked records.
- **Drawer Lift** (`-18px 0 50px rgba(17, 24, 32, .22)`): Signals evidence moving above the document on tablet and mobile.

### Named Rules

**The Flat Record Rule.** Ledger cells and evidence items remain shadowless; borders and surface tones establish their hierarchy.

## Shapes

The system is overwhelmingly rectilinear. Buttons, selectors, fields, chips, cards, and panels use square corners. One-pixel rules and mitered, square-capped icons reinforce the instrument-like character. Circles are exceptional and semantic: the live status dot and the empty-evidence crosshair.

**The Squared Control Rule.** Do not soften operational controls with generic medium or pill radii; squared silhouettes are part of the product’s research-terminal identity.

## Components

### Buttons

- **Shape:** Squared and compact, with no border radius.
- **Primary:** Cobalt with white text, 48px high for primary actions; embedded send controls use a square 50px target.
- **Hover / Focus:** Hover deepens to cobalt deep. Keyboard focus uses a 3px translucent focus-blue outline with a 3px offset.
- **Secondary / Ghost:** Period controls are white ledger segments with a ruled border; the active segment fills cobalt. Suggested questions are transparent graphite controls with a cool-gray border.

### Chips

- **Style:** Compact, square, monospaced uppercase labels at 9px. High importance fills signal yellow; medium and monitor importance use quiet tonal fills. Confidence remains outlined so it reads as evidence classification rather than emphasis.
- **State:** Meaning is always repeated in text. Color never stands alone.

### Cards / Containers

- **Corner Style:** Square.
- **Background:** White for ledger records, cool gray for structural bands, graphite for command and question surfaces, and pale evidence-specific tones for commentary or interpretation.
- **Shadow Strategy:** Flat records; only overlays and the Ask surface lift.
- **Border:** One-pixel ledger rules define rows, columns, and evidence boundaries.
- **Internal Padding:** Compact 18–28px spacing, reduced to 13–19px on mobile.

### Inputs / Fields

- **Style:** Square white fields nested in graphite command surfaces. The company selector uses a darker inset field with a cool-gray stroke; the question field is a 50px white strip paired with a cobalt submit square.
- **Focus:** The shared focus-blue outline remains visible outside the control. Question carets use cobalt.
- **Error / Disabled:** Disabled submission shifts to cool gray; errors remain inside the graphite panel with pale rust text.

### Navigation

The research command header is a sticky graphite strip. The Delta mark becomes signal yellow in the research context, the company selector owns the center, and demo status sits at the far edge. On mobile the wordmark collapses to the Delta square, while the company selector remains reachable and the decorative status copy is removed.

### Metric Ledger

Each metric occupies a ruled white cell with an uppercase label, one dominant monospaced value, and both QoQ and YoY context. Only the active comparison receives semantic direction color, preventing competing signals.

### Ranked Change Record

Rows combine a cobalt rank, evidence classifications, an editorial claim, supporting metric tags, and an explicit “View evidence” action. Selection adds a 3px cobalt rail and a near-white blue wash; hover uses a neutral cool-paper wash.

### Evidence Record

The evidence pane uses a graphite record header, signal-yellow claim summary, numbered evidence entries, and a closing coverage tally. Structured evidence stays neutral; commentary and interpretation use distinct pale surfaces so provenance remains visible even before reading.

## Do's and Don'ts

### Do:

- **Do** sequence every material claim toward its calculation, classification, and source.
- **Do** use rules, aligned values, and surface tone to organize dense information.
- **Do** reserve cobalt for action and active state, and signal yellow for evidence or status.
- **Do** keep comparison values, labels, ranks, and evidence IDs monospaced.
- **Do** preserve the full evidence workflow when adapting the layout to smaller screens.

### Don't:

- **Don't** turn the product into a mosaic of floating KPI cards or interchangeable stock-dashboard widgets.
- **Don't** add soft rounded cards, pill controls, gradients, glass effects, or ornamental charts.
- **Don't** use semantic teal, rust, or violet as action colors.
- **Don't** rely on color alone for direction, importance, confidence, or evidence type.
- **Don't** let decorative whitespace break the continuous chain from issuer to evidence.
