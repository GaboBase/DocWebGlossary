# Task Assignment: Milestone 3 Implementation (Semantic HTML5 UI Integration & Navigation)

**Agent**: worker_m3
**Role**: Frontend UI & HTML5 Semantic Engineer Worker
**Archetype**: teamwork_worker
**Working Directory**: D:\DocWebGlosary\.agents\teamwork\worker_m3\
**Original Request**: D:\DocWebGlosary\.agents\teamwork\ORIGINAL_REQUEST.md
**Project Specification**: D:\DocWebGlosary\.agents\teamwork\PROJECT.md

## Exclusive Write Ownership
You exclusively own and may modify only:
- `index.html`
- `app/js/app.js`
- `app/css/app.css`

DO NOT modify `app/js/semantic-engine.js`, `app/js/storage.js`, or any files in `AudiovisualProduction/`, `Render-3D-Animations/`, or `VideoImage/`.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Objective
Implement Semantic HTML5 DOM rendering, A-Z navigation, enhanced search, and category filtering while strictly preserving visual identity, dark/light themes, and 100% offline autonomy:

1. **Semantic HTML5 Markup in `app.js` (`renderTermView`)**:
   - Wrap the main term card in `<article class="content-card" itemscope itemtype="https://schema.org/DefinedTerm" data-term-id="..." data-glossary-id="..." data-category="...">`.
   - Render the term title inside `<header class="term-header-view"><dfn class="term-title-large" itemprop="name">...`.
   - Render definitions inside `<section class="term-definition-section"><p class="definition-lead" itemprop="description">...`.
   - Render components, applications, and examples using semantic description lists: `<dl class="info-grid"><dt class="info-block-title">...</dt><dd class="info-block-content">...</dd></dl>`.
   - Render sections using `<section>` with proper `aria-label` or headings.
   - Maintain all pre-existing CSS classes (`content-card`, `term-title-large`, `info-grid`, `info-block`, etc.) so styles are completely preserved without visual breakage.

2. **A-Z Navigation Bar in `index.html` & `app.js`**:
   - Add an accessible A-Z filter bar (`<nav class="az-nav" aria-label="Navegación alfabética">`) above or below the search input in the sidebar or top of terms list.
   - Letters A–Z plus "TODOS". Clicking a letter filters the terms list reactively.
   - Add styling in `app.css` matching existing CSS variables (`--primary`, `--card`, `--border`, etc.).

3. **Search & Multi-field Indexing in `app.js`**:
   - Ensure search filters across term titles, short definitions, extended definitions, synonyms, and components.
   - Add defensive guard in search loop for non-string synonym entries (`typeof s === 'string'`).

4. **Category Filtering**:
   - Ensure clicking category chips filters terms seamlessly across all 13 categories for `audiovisual-production` and categories for legacy glossaries.

5. **Preservation & Autonomy**:
   - Zero external CDNs, fonts, or scripts.
   - Dark/light mode compatibility preserved.

6. **Verification**:
   - Run `node tools/test_jsonld_schema.js` (must pass 49/49 assertions, 100%).
   - Run `node audit_autonomy.js` (must pass 100% offline).
   - Run `node tools/run_all_tests.js` (must pass 214/216, 0 failures).

Write your findings to `report.md` and `handoff.md`. Notify orchestrator via `send_message`.


## 2026-11-01T03:24:40Z
You are worker_m3, role: Frontend UI & HTML5 Semantic Engineer Worker.
Working Directory: D:\DocWebGlosary\.agents\teamwork\worker_m3\
Original Request: D:\DocWebGlosary\.agents\teamwork\ORIGINAL_REQUEST.md
Read D:\DocWebGlosary\.agents\teamwork\worker_m3\DISPATCH.md and D:\DocWebGlosary\.agents\teamwork\PROJECT.md before doing anything else.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your exclusive write files:
- index.html
- app/js/app.js
- app/css/app.css

Your mission:
Implement Semantic HTML5 DOM rendering, A-Z navigation bar, and multi-field search while strictly preserving visual identity, responsive styling, and 100% offline autonomy.
1. In app/js/app.js renderTermView:
   - Use <article class="content-card" itemscope itemtype="https://schema.org/DefinedTerm" data-term-id="..." data-glossary-id="..." data-category="...">
   - Use <header class="term-header-view"><dfn class="term-title-large" itemprop="name">...
   - Use <section class="term-definition-section"><p class="definition-lead" itemprop="description">...
   - Use <dl class="info-grid"><dt class="info-block-title">...</dt><dd class="info-block-content">...</dd></dl>
   - Preserve all existing CSS class names.
2. Add an accessible A-Z navigation bar in index.html and app.js with styles in app.css.
3. Enhance search and category filtering with defensive string checks.
4. Run tests:
   - node tools/test_jsonld_schema.js (must pass 49/49)
   - node audit_autonomy.js (100% offline)
   - node tools/run_all_tests.js (214/216 passing)

Document your changes in report.md and handoff.md.
When finished, notify me with send_message.
