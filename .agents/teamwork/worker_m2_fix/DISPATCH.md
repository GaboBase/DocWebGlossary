# Task Assignment: Milestone 2 Remediation (Semantic Relationship Engine Fixes)

**Agent**: worker_m2_fix
**Role**: Ontology & Semantic Engine Worker
**Archetype**: teamwork_worker
**Working Directory**: D:\DocWebGlosary\.agents\teamwork\worker_m2_fix\
**Original Request**: D:\DocWebGlosary\.agents\teamwork\ORIGINAL_REQUEST.md
**Project Specification**: D:\DocWebGlosary\.agents\teamwork\PROJECT.md
**Challenger 2 Report**: D:\DocWebGlosary\.agents\teamwork\challenger_m2_2\report.md

## Exclusive Write Ownership
You exclusively own and may modify only:
- `app/js/semantic-engine.js`

DO NOT modify any other files.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Objective
Apply the 3 defensive boundary fixes in `app/js/semantic-engine.js` identified by `challenger_m2_2`:

1. **Fix 1: `escapeJsAttr(str)` replacement order** (lines 392-397):
   `&` MUST be replaced with `&amp;` FIRST before replacing `"` with `&quot;`, `'` with `&#39;`, and `\` with `\\\\`.
   Currently, replacing `"` first and then replacing `&` turns `&quot;` into `&amp;quot;` (double escaping).
   ```javascript
   escapeJsAttr(str) {
     if (!str) return '';
     return String(str)
       .replace(/\\/g, '\\\\')
       .replace(/&/g, '&amp;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#39;');
   }
   ```

2. **Fix 2: Null check in `computeInverseRelations()`** (around line 126):
   Add guard for null/undefined relation items:
   ```javascript
   for (const rel of term.relations) {
     if (!rel || !rel.target || typeof rel.target !== 'string') continue;
   ```

3. **Fix 3: Null check in `generateContextualDiagramSvg(term)`** (around line 274):
   Add guard for null/undefined relation items:
   ```javascript
   for (const rel of (term.relations || [])) {
     if (!rel || !rel.target || typeof rel.target !== 'string') continue;
   ```

4. **Verification**:
   Execute:
   - `node tools/test_m2_adversarial_challenger2.js` (MUST pass 69/69 assertions, 100%)
   - `node tools/stress_semantic_engine.js` (MUST pass 66/66 assertions)
   - `node tools/test_semantic_integrity.js` (MUST pass 29/29 assertions)
   - `node tools/test_jsonld_schema.js`
   - `node audit_autonomy.js`
   - `node tools/run_all_tests.js`

Write your findings to `report.md` and `handoff.md`. Notify orchestrator via `send_message`.


## 2026-11-01T03:18:26Z
You are worker_m2_fix, role: Ontology & Semantic Engine Worker.
Working Directory: D:\DocWebGlosary\.agents\teamwork\worker_m2_fix\
Original Request: D:\DocWebGlosary\.agents\teamwork\ORIGINAL_REQUEST.md
Read D:\DocWebGlosary\.agents\teamwork\worker_m2_fix\DISPATCH.md and D:\DocWebGlosary\.agents\teamwork\challenger_m2_2\report.md before doing anything else.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your exclusive write file:
- app/js/semantic-engine.js

Your mission:
Apply the 3 defensive boundary fixes in app/js/semantic-engine.js:
1. Fix escapeJsAttr replacement order so & is escaped before " and '.
2. Add null/undefined relation item guards in computeInverseRelations().
3. Add null/undefined relation item guards in generateContextualDiagramSvg().

Run verification:
- node tools/test_m2_adversarial_challenger2.js (all 69 assertions must pass)
- node tools/stress_semantic_engine.js
- node tools/test_semantic_integrity.js
- node audit_autonomy.js
- node tools/run_all_tests.js

Document results in report.md and handoff.md.
When finished, notify me with send_message.
