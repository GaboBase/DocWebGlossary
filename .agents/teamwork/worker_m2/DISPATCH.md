# Task Assignment: Milestone 2 Implementation (Semantic Relationship Engine & Schema.org JSON-LD)

**Agent**: worker_m2
**Role**: Ontology & Semantic Engine Worker
**Archetype**: teamwork_worker
**Working Directory**: D:\DocWebGlosary\.agents\teamwork\worker_m2\
**Original Request**: D:\DocWebGlosary\.agents\teamwork\ORIGINAL_REQUEST.md
**Project Specification**: D:\DocWebGlosary\.agents\teamwork\PROJECT.md

## Exclusive Write Ownership
You exclusively own and may modify only:
- `app/js/semantic-engine.js`

DO NOT modify `index.html`, `app/js/app.js`, `app/js/storage.js`, `app/css/app.css`, or any data files in `AudiovisualProduction/`, `Render-3D-Animations/`, or `VideoImage/`.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Objective
Update `app/js/semantic-engine.js` to implement the full 15-pair bidirectional ontology model, Schema.org DefinedTerm / DefinedTermSet JSON-LD generator, and robust contextual SVG graph rendering:

1. **Full 15-Pair Bidirectional Relationship Model**:
   Expand `relationInverseMap` to include all 15 bidirectional pairs and human-readable inverse labels:
   - `isTypeOf` ⇄ `hasSubtype` ("Tiene como subtipo / técnica")
   - `isPartOf` ⇄ `composedOf` ("Se compone de")
   - `contains` ⇄ `containedIn` ("Está contenido en")
   - `specializesIn` ⇄ `moreGeneralThan` ("Es más general que / engloba")
   - `dependsOn` ⇄ `dependencyOf` ("Es dependencia para")
   - `requires` ⇄ `requiredBy` ("Es requerido por")
   - `precedes` ⇄ `succeeds` ("Sucede cronológicamente a")
   - `produces` ⇄ `producedBy` ("Es producido por")
   - `usedFor` ⇄ `uses` ("Es empleado por")
   - `compatibleWith` ⇄ `compatibleWith` ("Es compatible con")
   - `alternativeTo` ⇄ `alternativeTo` ("Es alternativa recíproca a")
   - `differsFrom` ⇄ `differsFrom` ("Se diferencia recíprocamente de")
   - `relatedTo` ⇄ `relatedTo` ("Está relacionado con")
   - `hasInput` ⇄ `isInputTo` ("Es parámetro de entrada para")
   - `hasOutput` ⇄ `isOutputOf` ("Es resultado u output de")

2. **Schema.org DefinedTerm & DefinedTermSet JSON-LD**:
   Ensure `generateJsonLd(term)` generates compliant JSON-LD:
   - `@context`: `"https://schema.org"`
   - `@type`: `"DefinedTerm"`
   - `@id`: canonical URN (`term.id`)
   - `name`: `term.title`
   - `description`: `term.definition`
   - `disambiguatingDescription`: `term.extendedDefinition` (if present)
   - `inDefinedTermSet`: {
       `@type`: `"DefinedTermSet"`,
       `@id`: `glossary.id`,
       `name`: `glossary.title`
     }
   - `alternateName`: `term.synonyms`
   - Zero syntax errors, zero network calls.

3. **Contextual SVG Relational Graph**:
   Ensure `generateContextualDiagramSvg(term)` supports all 15 relationship types, handles direct (blue), inverse (green), and cross-glossary (purple dashed) connections, escapes titles/labels properly, and preserves `window.DocWebApp.navigateToTerm(...)` on node clicks.

4. **Verification**:
   - Run `node tools/test_semantic_integrity.js` to verify all 15 pairs and 0 broken links (should pass 29/29).
   - Run `node tools/test_jsonld_schema.js` to verify Schema.org compliance.
   - Run `node audit_autonomy.js` and `node tools/test_autonomy.js` to ensure 100% offline compliance.
   - Run `node tools/run_all_tests.js`.

Write report in `report.md` and `handoff.md`. Notify orchestrator via `send_message`.

## 2026-11-01T02:58:25Z
You are worker_m2, role: Ontology & Semantic Engine Worker.
Working Directory: D:\DocWebGlosary\.agents\teamwork\worker_m2\
Original Request: D:\DocWebGlosary\.agents\teamwork\ORIGINAL_REQUEST.md
Read D:\DocWebGlosary\.agents\teamwork\worker_m2\DISPATCH.md and D:\DocWebGlosary\.agents\teamwork\PROJECT.md before doing anything else.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your exclusive write file:
- app/js/semantic-engine.js

Your mission:
Update app/js/semantic-engine.js:
1. Complete the 15-pair bidirectional relationship model in relationInverseMap and inverse label generation, adding specializesIn ⇄ moreGeneralThan and precedes ⇄ succeeds.
2. Complete Schema.org DefinedTerm & DefinedTermSet JSON-LD generator.
3. Verify contextual SVG graph rendering across all 15 relation types and cross-glossary links.
4. Run tests with Node.js:
   - node tools/test_semantic_integrity.js (must pass 29/29)
   - node tools/test_jsonld_schema.js
   - node audit_autonomy.js
   - node tools/run_all_tests.js
Document findings in report.md and handoff.md.
When finished, notify me with send_message.
