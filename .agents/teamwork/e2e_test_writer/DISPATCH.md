# Task Assignment: E2E Test Suite Development (Dual Track)

**Agent**: e2e_test_writer
**Role**: E2E Test Writer
**Archetype**: teamwork_test_writer
**Working Directory**: D:\DocWebGlosary\.agents\teamwork\e2e_test_writer\
**Original Request**: D:\DocWebGlosary\.agents\teamwork\ORIGINAL_REQUEST.md
**Project Specification**: D:\DocWebGlosary\.agents\teamwork\PROJECT.md
**Test Infrastructure Document**: D:\DocWebGlosary\.agents\teamwork\TEST_INFRA.md

## Objective
Design and implement the complete opaque-box E2E automated test suite in `D:\DocWebGlosary\tools\` according to `TEST_INFRA.md` and `PROJECT.md`.
The test suite must derive strictly from user requirements and test all 25 features across Tiers 1-4.

### Test Files to Create in `tools/`:
1. `tools/test_autonomy.js`:
   - Recursively inspect all files in `D:\DocWebGlosary` (excluding `.git` and `.agents`).
   - Validate zero external URLs (`http://`, `https://`), zero CDNs, zero remote script/link tags.
   - Return exit code 0 on clean pass.
2. `tools/test_catalog_and_terms.js`:
   - Validate `app/data/catalog.json` contains `audiovisual-production`, `render-3d-animations`, and `video-image`.
   - Validate `AudiovisualProduction/data/glossary.json` has required metadata and 13 categories.
   - Validate `AudiovisualProduction/data/terms.json` contains all 177 terms from mouseinteractivo.com plus AI video expansions.
   - Verify non-empty definitions, unique slugs, metadata provenance, and duplicate reconciliation (#18/#132, #51/#145).
3. `tools/test_semantic_integrity.js`:
   - Load `semantic-engine.js` and validate in Node.js.
   - Validate all 15 bidirectional relationship pairs and their exact inverse mappings.
   - Validate that every relationship target URN in all 3 glossaries resolves to an existing term (0 broken links).
   - Test cycle detection and contextual SVG diagram generation.
4. `tools/test_jsonld_schema.js`:
   - Validate Schema.org `DefinedTermSet` and `DefinedTerm` structure.
   - Verify presence of `@context`, `@type`, `@id`, `name`, `description`, `inDefinedTermSet`.
5. `tools/test_prompt_orientator.js`:
   - Validate `app/js/prompt-orientator.js`.
   - Test all 14 audiovisual products and 11 determinant attributes.
   - Validate positive/negative prompt generation, camera motion tokens, lighting/LUT directives, and glossary term links.
6. `tools/test_storage_capsule.js`:
   - Validate `storage.js` SHA-256 calculation and fallback.
   - Validate export capsule structure and schema integrity.
7. `tools/run_all_tests.js`:
   - Master runner that executes all test scripts sequentially.
   - Outputs structured pass/fail report for each tier and feature.
   - Returns exit code 0 if and only if all tests pass.

### Deliverables:
- Implement all scripts in `D:\DocWebGlosary\tools\`.
- Execute tests using `run_command` (Node.js) to verify runner behavior.
- Publish `D:\DocWebGlosary\TEST_READY.md` and `D:\DocWebGlosary\.agents\teamwork\TEST_READY.md`.
- Write detailed report in `report.md` and `handoff.md`.
- Notify parent orchestrator with `send_message`.


## 2026-11-01T02:39:57Z
You are e2e_test_writer, role: E2E Test Writer.
Working Directory: D:\DocWebGlosary\.agents\teamwork\e2e_test_writer\
Original Request: D:\DocWebGlosary\.agents\teamwork\ORIGINAL_REQUEST.md
Read D:\DocWebGlosary\.agents\teamwork\e2e_test_writer\DISPATCH.md, D:\DocWebGlosary\.agents\teamwork\PROJECT.md, and D:\DocWebGlosary\.agents\teamwork\TEST_INFRA.md before doing anything else.

Your mission:
Implement the complete opaque-box E2E automated test suite in D:\DocWebGlosary\tools\ covering Tiers 1-4 across all 25 features.
Create:
1. tools/test_autonomy.js
2. tools/test_catalog_and_terms.js
3. tools/test_semantic_integrity.js
4. tools/test_jsonld_schema.js
5. tools/test_prompt_orientator.js
6. tools/test_storage_capsule.js
7. tools/run_all_tests.js

Run the test suite with Node.js to verify test runner execution and structure.
When the test infrastructure is built and verified, publish TEST_READY.md at project root (and in .agents/teamwork/TEST_READY.md).
Write report.md and handoff.md in your working directory.
When finished, notify me with send_message.
