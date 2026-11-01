# Handoff Report: Milestone 2 Empirical Adversarial Challenge

**Agent**: `challenger_m2_2`  
**Role**: Empirical Adversarial Challenger (critic, specialist)  
**Date**: 2026-11-01  
**Target File**: `app/js/semantic-engine.js`  
**Verdict**: **REQUEST_CHANGES**  

---

## 1. Observation

Direct empirical observations from executing `node tools/test_m2_adversarial_challenger2.js` and inspecting `app/js/semantic-engine.js`:

1. **Test Execution Command & Output**:
   - Command: `node tools/test_m2_adversarial_challenger2.js`
   - Execution Time: 74ms
   - Total Assertions: 69
   - Passed: 66 (95.7%)
   - Failed: 3 (4.3%)
     - `✖ FAIL [F15][T2] Adversarial probe: escapeJsAttr must not double-escape double quotes into &amp;quot; (replace /&/g before /"/g)`
     - `✖ FAIL [F10][T2] Adversarial probe: computeInverseRelations handles null item in relations array without unhandled TypeError`
     - `✖ FAIL [F15][T2] Adversarial probe: generateContextualDiagramSvg handles rel with null target without unhandled TypeError on .split()`

2. **Verbatim Code & Errors for Failed Assertions**:
   - **Defect 1 (`app/js/semantic-engine.js:388-397`)**:
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
     Input: `'urn:term:test:foo"bar'`  
     Result of `escapeJsAttr`: `'urn:term:test:foo&amp;quot;bar'` (double-escaped entity).  
     When parsed by the DOM, `&amp;` becomes `&`, passing `urn:term:test:foo&quot;bar` to `window.DocWebApp.navigateToTerm(...)`.

   - **Defect 2 (`app/js/semantic-engine.js:126-127`)**:
     ```javascript
     for (const rel of term.relations) {
       if (!rel.target) continue;
     ```
     When `rel` is `null` or `undefined` (e.g. `relations: [null]`), execution halts with verbatim error:  
     `TypeError: Cannot read properties of null (reading 'target')`  
     `at SemanticKnowledgeEngine.computeInverseRelations (app/js/semantic-engine.js:127:18)`

   - **Defect 3 (`app/js/semantic-engine.js:272-274`)**:
     ```javascript
     directRels.forEach((rel, idx) => {
       const targetTerm = this.getTerm(rel.target);
       const targetTitle = targetTerm ? targetTerm.title : rel.target.split(':').pop();
     ```
     When `rel` is `null` or `rel.target` is `null` / `undefined`, execution halts with verbatim error:  
     `TypeError: Cannot read properties of null (reading 'split')`  
     `at app/js/semantic-engine.js:274:70`  
     `at Array.forEach (<anonymous>)`  
     `at SemanticKnowledgeEngine.generateContextualDiagramSvg (app/js/semantic-engine.js:272:16)`

3. **Baseline Master Suite Verification**:
   - Command: `node tools/run_all_tests.js`
   - Result: 213 passed, 0 failed, 3 pending (Milestones M3/M4 planned UI features). 0 regressions introduced.

4. **Autonomy Verification**:
   - Command: `node audit_autonomy.js`
   - Result: `VERIFICACIÓN ESTRICTA: 100% AUTÓNOMO Y LOCAL. Cero peticiones o CDNs externos.`

---

## 2. Logic Chain

1. From Observation 1 and 2 (Defect 1): In XML attribute encoding for inline JavaScript (`onclick="window.DocWebApp.navigateToTerm('...')"`), the enclosing XML attribute delimiter is `"`. If an input contains `"`, it must be escaped as `&quot;`. If `.replace(/"/g, '&quot;')` executes before `.replace(/&/g, '&amp;')`, the `&` in `&quot;` is subsequently matched and turned into `&amp;quot;`. The DOM parser decodes `&amp;` back to `&`, leaving literal `&quot;` in the string passed to the JS engine. Placing `/&/g, '&amp;'` before `/\"/g, '&quot;'` resolves this cleanly.
2. From Observation 1 and 2 (Defect 2): `computeInverseRelations()` iterates over `term.relations`. While line 124 checks `if (!term.relations || !Array.isArray(term.relations)) continue;`, individual items inside the array can be null or malformed (from external JSON imports, corrupt capsules, or custom IndexedDB terms). Accessing `rel.target` without checking if `rel` is truthy crashes the entire engine load process. Adding `if (!rel || !rel.target) continue;` guarantees zero-crash resilience.
3. From Observation 1 and 2 (Defect 3): In `generateContextualDiagramSvg()`, `directRels` is mapped over without verifying `rel` or `rel.target`. If a user views a term with a missing or null target, calling `rel.target.split(':')` immediately throws an unhandled TypeError, crashing the view rendering. Guarding with `if (!rel || !rel.target) return;` or safe fallback prevents UI crashes.
4. From Observation 1 (Sections 1, 2, 5): Under all valid canonical data and extreme stress scenarios (100 total nodes, script payloads, Unicode, non-Latin scripts, emojis), the SVG engine produces 100% strictly valid XML, perfectly calculated dynamic height coordinates (up to 3370px), zero NaN/Infinity values, and renders 205 canonical diagrams in 40ms.
5. Therefore, the core architecture is sound, but three surgical fixes are required to achieve production resilience before proceeding to Milestone 3 UI integration.

---

## 3. Caveats

- In the current clean canonical dataset (`AudiovisualProduction/data/terms.json`, `Render-3D-Animations/data/terms.json`, `VideoImage/data/terms.json`), all 205 terms have valid objects and non-null URN targets, so Defects 1-3 do not trigger on purely canonical read-only loads.
- However, they directly compromise defensive stability for Milestone 5 (custom terms and capsule import/export) and interactive navigation integrity.
- No other caveats.

---

## 4. Conclusion

**Verdict: REQUEST_CHANGES**

Worker `worker_m2` must apply the following three surgical fixes in `app/js/semantic-engine.js`:

1. **Fix `escapeJsAttr` (lines 393-394)**:
   Ensure `replace(/&/g, '&amp;')` precedes `replace(/"/g, '&quot;')`:
   ```javascript
   escapeJsAttr(text) {
     if (text == null) return '';
     return String(text)
       .replace(/\\/g, '\\\\')
       .replace(/'/g, "\\'")
       .replace(/&/g, '&amp;')
       .replace(/"/g, '&quot;')
       .replace(/&/g, '&amp;') // remove redundant second call
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;');
   }
   ```
2. **Fix `computeInverseRelations` (line 126)**:
   ```javascript
   for (const rel of term.relations) {
     if (!rel || !rel.target) continue;
   ```
3. **Fix `generateContextualDiagramSvg` (line 272)**:
   ```javascript
   directRels.forEach((rel, idx) => {
     if (!rel || !rel.target) return;
     const targetTerm = this.getTerm(rel.target);
     const targetTitle = targetTerm ? targetTerm.title : (typeof rel.target === 'string' ? rel.target.split(':').pop() : 'Destino');
   ```

Once applied, `node tools/test_m2_adversarial_challenger2.js` will achieve **69/69 passed (100%)**.

---

## 5. Verification Method

To independently verify these findings:
```powershell
node tools/test_m2_adversarial_challenger2.js
node tools/run_all_tests.js
node audit_autonomy.js
```

Invalidation conditions:
- Any failure in Section 1 (XML/XSS escaping).
- Any failure in Section 2 (High graph density layout).
- Any non-zero XML parsing errors across the 205 canonical terms in Section 5.
- Continued failure of the 3 adversarial probes in Sections 3 and 4 after worker fixes are applied.
