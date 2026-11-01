# Empirical Adversarial Challenge Report: SVG Graph Rendering & Traversal

**Agent**: `challenger_m2_2`  
**Role**: Empirical Adversarial Challenger (critic, specialist)  
**Milestone**: Milestone 2 — Semantic Relationship Engine & Schema.org JSON-LD  
**Target File**: `app/js/semantic-engine.js`  
**Test Suite**: `tools/test_m2_adversarial_challenger2.js`  
**Execution Timestamp**: 2026-11-01T03:15:00Z  

---

## 1. Challenge Summary

- **Overall Risk Assessment**: **MEDIUM-HIGH**
- **Test Results**: 69 total assertions executed; 66 passed, 3 failed (95.7% pass rate).
- **Canonical Corpus Status**: All 205 canonical terms from the 3 collections generate strictly well-formed XML in 40ms total (0.20ms per diagram) with zero broken targets and zero XML parsing errors.
- **Verdict**: **REQUEST_CHANGES**
  While worker_m2's implementation of `generateContextualDiagramSvg` demonstrates outstanding geometric calculation, high layout scalability (tested up to 100 simultaneous nodes), and robust XML entity escaping for term titles/labels, empirical stress testing has revealed **three concrete defects** in edge cases and malformed input handling that must be surgically resolved before proceeding to UI integration (Milestone 3) and user persistence (Milestone 5).

---

## 2. Identified Vulnerabilities & Challenges

### [High] Challenge 1: Unhandled `TypeError` in `computeInverseRelations` on Null/Undefined Relation Entries
- **Assumption Challenged**: Assumed all items in `term.relations` arrays are well-formed objects with a defined `target` property.
- **Attack Scenario**:
  A term with a malformed relation entry (e.g. `relations: [null]` or `relations: [{ type: 'relatedTo' }]` lacking a target) is loaded from IndexedDB (Milestone 5 custom user terms) or imported via knowledge capsule.
- **Direct Observation**:
  In `app/js/semantic-engine.js:126-127`:
  ```javascript
  for (const rel of term.relations) {
    if (!rel.target) continue;
  ```
  When `rel` is `null` or `undefined`, attempting to access `rel.target` throws an unhandled `TypeError: Cannot read properties of null (reading 'target')`.
- **Blast Radius**:
  `computeInverseRelations()` is called during engine startup (`loadAll()`). An unhandled TypeError here aborts the startup lifecycle, preventing the entire application from loading terms.
- **Mitigation**:
  Change line 126 in `app/js/semantic-engine.js`:
  ```javascript
  for (const rel of term.relations) {
    if (!rel || !rel.target) continue;
  ```

---

### [High] Challenge 2: Unhandled `TypeError` in `generateContextualDiagramSvg` on Incomplete Relation Targets
- **Assumption Challenged**: Assumed every entry in `directRels` has a non-null string `target` property.
- **Attack Scenario**:
  A user views a term whose relations array contains `{ type: 'relatedTo', target: null }`, `{}` or `null`.
- **Direct Observation**:
  In `app/js/semantic-engine.js:272-274`:
  ```javascript
  directRels.forEach((rel, idx) => {
    const targetTerm = this.getTerm(rel.target);
    const targetTitle = targetTerm ? targetTerm.title : rel.target.split(':').pop();
  ```
  When `rel` is `null` or `rel.target` is `null` or `undefined`, calling `rel.target.split(':')` throws an unhandled `TypeError: Cannot read properties of null (reading 'split')`.
- **Blast Radius**:
  The contextual diagram container crashes, causing the entire term detail view to fail rendering.
- **Mitigation**:
  Add an explicit guard at the beginning of the `directRels.forEach` callback in `app/js/semantic-engine.js:272`:
  ```javascript
  directRels.forEach((rel, idx) => {
    if (!rel || !rel.target) return;
    const targetTerm = this.getTerm(rel.target);
    const targetTitle = targetTerm ? targetTerm.title : (typeof rel.target === 'string' ? rel.target.split(':').pop() : 'Destino');
  ```

---

### [Medium] Challenge 3: Double-Escaping Bug in `escapeJsAttr`
- **Assumption Challenged**: Assumed `.replace(/"/g, '&quot;')` followed by `.replace(/&/g, '&amp;')` correctly escapes strings for inline JavaScript event attributes in XML.
- **Attack Scenario**:
  A term ID or URN contains a double quote character (`"`), e.g. `urn:term:test:foo"bar`.
- **Direct Observation**:
  In `app/js/semantic-engine.js:388-397`:
  ```javascript
  escapeJsAttr(text) {
    if (text == null) return '';
    return String(text)
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/"/g, '&quot;')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
  ```
  Line 393 replaces `"` with `&quot;`. Then Line 394 immediately replaces the newly introduced `&` with `&amp;`, resulting in `&amp;quot;`.
  When the SVG markup is embedded into the DOM:
  `<g onclick="window.DocWebApp.navigateToTerm('urn:term:test:foo&amp;quot;bar')">`
  The browser DOM parser decodes `&amp;` to `&`, leaving:
  `window.DocWebApp.navigateToTerm('urn:term:test:foo&quot;bar')`
  When clicked, JavaScript executes with the literal argument `'urn:term:test:foo&quot;bar'` instead of `'urn:term:test:foo"bar'`.
- **Blast Radius**:
  Any term ID containing double quotes breaks navigation round-trip integrity, leading to unresolvable lookup queries.
- **Mitigation**:
  Place the `/&/g, '&amp;'` replacement **before** entity-introducing replacements (`"`, `<`, `>`), matching the correct design already implemented in `escapeXml`:
  ```javascript
  escapeJsAttr(text) {
    if (text == null) return '';
    return String(text)
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/&/g, '&amp;') // not needed
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
  ```
  Specifically:
  ```javascript
  escapeJsAttr(text) {
    if (text == null) return '';
    return String(text)
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
  ```

---

## 3. Stress Test Results Breakdown

### Section 1: SVG XML Injection & Special Character Escaping (27 Assertions — 27 Passed)
- **`escapeXml` Entity Verification**: Verified that `<`, `>`, `&`, `"`, `'` are correctly translated to `&lt;`, `&gt;`, `&amp;`, `&quot;`, `&apos;` without double-escaping ampersands.
- **Malicious Payload Defense**:
  - `<script>alert("XSS")</script>`: Safely escaped into `&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;`. Zero executable script tags.
  - `"><svg onload=alert(1)>`: Safely escaped into `&quot;&gt;&lt;svg onload=alert(1)&gt;`. No unescaped event handler tags.
  - `Editing & Color Grading & Sound`: Naked ampersands safely encoded to `&amp;`.
  - `Aspect Ratio < 16:9 & > 4:3`: Math operators preserved as text, zero XML parsing collisions.
  - `Standard ]]> <script>evil()</script>`: CDATA termination sequence safely neutralized.
  - `<!-- comment -->`: XML comment breakout safely neutralized.
  - Accented Latin characters (`ÁÉÍÓÚñ`): 100% preserved and rendered without character corruption.
  - Emojis (`🎬`, `🎥`, `🚀`, `💡`): Full UTF-16 surrogate pair and multi-byte safety confirmed.
  - Non-Latin scripts (`映像制作`, `Кинематограф`, `إنتاج الفيديو`): Correctly passed to SVG text nodes without encoding loss.
  - Long strings (500 characters): Truncated cleanly to 24 characters (`title…`) for central node and 22 characters for relation nodes.

### Section 2: High Graph Density Layout & Geometry Bounding (11 Assertions — 11 Passed)
- **Zero Relations**: Height bounded to minimum 360px (`viewBox="0 0 800 360"`).
- **Moderate Density (5 direct, 5 inverse)**: Height dynamically scaled to 445px.
- **High Density (12 direct, 14 inverse, 26 total)**: Height dynamically scaled to 1030px.
- **Extreme Load (50 direct, 50 inverse, 100 total nodes)**:
  - Height scaled to 3370px.
  - Calculated vertical spacing: `(3370 - 120) / 49 = 66.32px`. With 50px card height, inter-card margin is exactly `16.32px` — **zero card overlap**.
  - Generation execution time: **1ms** (far below 50ms performance threshold).
  - Coordinates: Zero `NaN`, `Infinity`, or `undefined` values detected.
- **Cross-Glossary Representation**:
  - Inter-glossary direct and inverse cards properly adorned with `Inter-Glosario ⤻` and `Origen Inter-Glosario ⤻` badges and `#8b5cf6` stroke styling.
  - Bezier connector lines properly styled with `stroke-dasharray="4 3"`.

### Section 3: Interactive Navigation Binding & JS Injection Defense (23 Assertions — 22 Passed, 1 Failed)
- **Single-Quote JS Breakout Defense**:
  - `urn:term:test:foo'); alert(1); //` -> Escaped to `urn:term:test:foo\'); alert(1); //`.
  - DOM-decoded JavaScript compiles cleanly in Node.js VM AST.
  - In-sandbox execution confirmed `alert()` was **NOT** invoked.
- **Double-Quote HTML Breakout Defense**:
  - `urn:term:test:foo" onclick="alert(1)` -> Does not break XML attribute boundaries.
- **Double-Escaping Bug**:
  - `urn:term:test:foo"bar` -> Escaped to `urn:term:test:foo&amp;quot;bar` instead of `foo&quot;bar`. **FAIL**.

### Section 4: Graph Traversal & Engine Resilience (5 Assertions — 3 Passed, 2 Failed)
- **Cyclic Relations (A ⇄ B)**: Engine resolves mutual bidirectional edges without recursion or stack overflow.
- **Self-Referential Loops (A -> A)**: Engine handles self-pointing relations cleanly without coordinate calculation anomalies.
- **Missing / Orphan Targets**: Engine falls back gracefully to `rel.target.split(':').pop()`.
- **Null Relation Array Items**: Throws unhandled TypeError at line 126. **FAIL**.
- **Null Relation Target Properties**: Throws unhandled TypeError at line 274. **FAIL**.

### Section 5: Full Canonical Corpus SVG Validation (3 Assertions — 3 Passed)
- All 205 canonical terms across `audiovisual-production`, `render-3d-animations`, and `video-image` tested.
- 100% (205/205) SVG diagrams generated without error.
- XML parser validated all 205 SVG outputs as strictly well-formed XML.
- Total processing time: **40ms** across 205 terms (**0.20ms per diagram**).

---

## 4. Unchallenged Areas

- **Browser CSS Reflow Performance**: SVG rendering was stress-tested in Node.js via DOM and XML AST validation. GPU composition and CSS reflow under extreme heights (3370px) inside Chrome DevTools MCP will be evaluated during Milestone 3 UI integration.
- **IndexedDB Asynchronous Hydration**: Storage interaction is mocked in Node.js tests; live IndexedDB persistence will be hardened in Milestone 5.
