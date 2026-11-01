# E2E Test Infra: DOCWEB MULTIGLOSSARY — Audiovisual Production

## Test Philosophy
- Opaque-box, requirement-driven. No dependency on implementation design.
- Strictly offline: zero external URLs, zero network calls.
- Methodology: Category-Partition + Boundary Value Analysis + Pairwise Combinatorial Testing + Real-World Workload Testing across Tiers 1 to 4.

## Feature Inventory Coverage (25 Features)
| # | Feature | Source (Requirement) | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---|---------|----------------------|:------:|:------:|:------:|:------:|
| 1 | Non-invasive Codebase Preservation | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 2 | 100% Offline Autonomy Guarantee | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 3 | 177 Primary Terms Integration | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 4 | Discrepancy & Duplicate Reconciliation | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 5 | Original Rigorous Technical Definitions | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 6 | Non-navigable Metadata Provenance | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 7 | Expanded AI/LLM Generative Video Terms | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 8 | Multi-glossary Catalog Registration | ORIGINAL_REQUEST §R7 | 5 | 5 | ✓ | ✓ |
| 9 | Cross-Glossary Interconnection | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |
| 10 | 15-Pair Bidirectional Relationship Model | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |
| 11 | Schema.org JSON-LD DefinedTerm Integration | ORIGINAL_REQUEST §R5 | 5 | 5 | ✓ | ✓ |
| 12 | Semantic HTML5 DOM Rendering | ORIGINAL_REQUEST §R5 | 5 | 5 | ✓ | ✓ |
| 13 | Real-time Search & Multi-field Indexing | ORIGINAL_REQUEST §R6 | 5 | 5 | ✓ | ✓ |
| 14 | A-Z Navigation & Category Filters | ORIGINAL_REQUEST §R6 | 5 | 5 | ✓ | ✓ |
| 15 | Contextual SVG Graph Diagram | ORIGINAL_REQUEST §R6 | 5 | 5 | ✓ | ✓ |
| 16 | Audiovisual Product Taxonomy (14 products) | ORIGINAL_REQUEST §R6 | 5 | 5 | ✓ | ✓ |
| 17 | Determinant Production Attributes (11 attributes) | ORIGINAL_REQUEST §R6 | 5 | 5 | ✓ | ✓ |
| 18 | AI Prompt Intention Orientator Module | ORIGINAL_REQUEST §R6 | 5 | 5 | ✓ | ✓ |
| 19 | Term Linkage in AI Prompt Orientator | ORIGINAL_REQUEST §R6 | 5 | 5 | ✓ | ✓ |
| 20 | IndexedDB Custom Term Persistence | ORIGINAL_REQUEST §R7 | 5 | 5 | ✓ | ✓ |
| 21 | SHA-256 Web Crypto Integrity Hash | ORIGINAL_REQUEST §R7 | 5 | 5 | ✓ | ✓ |
| 22 | JSON Capsule Import / Export | ORIGINAL_REQUEST §R7 | 5 | 5 | ✓ | ✓ |
| 23 | Decoupled Shared Multi-glossary Architecture | ORIGINAL_REQUEST §R7 | 5 | 5 | ✓ | ✓ |
| 24 | Complete E2E Automated Verification | Verification Resources | 5 | 5 | ✓ | ✓ |
| 25 | Adversarial Coverage Hardening | Dual Track Phase 2 | 5 | 5 | ✓ | ✓ |

## Test Architecture
- **Test Runner Location**: `tools/run_all_tests.js` (executed via `node tools/run_all_tests.js`)
- **Pass/Fail Semantics**: Process exits with code `0` on 100% pass; non-zero on any failure with structured error reporting.
- **Test Case Scripts**:
  1. `tools/test_autonomy.js`: Tier 1 & 2 tests for offline compliance (regex checking for `http:`, `https:`, CDN domains, remote imports across entire repository).
  2. `tools/test_catalog_and_terms.js`: Tier 1 & 2 tests for catalog registration, 177 terms presence, non-empty definitions, metadata provenance, and duplicate reconciliation.
  3. `tools/test_semantic_integrity.js`: Tier 1, 2 & 3 tests verifying all 15 bidirectional relationship pairs, inverse symmetry, and 100% resolution of target URNs across all glossaries (0 broken links).
  4. `tools/test_jsonld_schema.js`: Tier 1 & 2 tests validating Schema.org `DefinedTermSet` and `DefinedTerm` structure, required properties, and absence of syntax errors.
  5. `tools/test_prompt_orientator.js`: Tier 1, 3 & 4 tests validating all 14 audiovisual products, 11 attributes, prompt generation output, and term hyperlinking.
  6. `tools/test_storage_capsule.js`: Tier 1, 2 & 4 tests validating SHA-256 hash calculation, capsule structure, and roundtrip data fidelity.

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Production Studio Trailer Prompt Spec | F7, F10, F16, F17, F18, F19 (Trailer product + 2.39:1 + cinematic anamorphic lighting + Sora/Runway prompt tokens) | High |
| 2 | Corporate Explainer Multi-Glossary Cross-Reference | F3, F9, F13, F14, F15 (Corporate video term + cross-link to VideoImage codec + SVG diagram traversal) | High |
| 3 | Offline Field Filmmaking Capsule Export & Restore | F2, F20, F21, F22, F23 (Air-gapped laptop, custom term creation, capsule export with SHA-256, wipe, restore) | High |
| 4 | Search and A-Z Exploration of Editing Grammar | F3, F5, F13, F14 (A-Z filtering 'C', search 'corte', expand definition, verify subconcepts and examples) | Medium |
| 5 | Multimodal AI Storyboard Specification | F7, F16, F17, F18 (Storyboard product + Midjourney/Flux prompt with camera motion and lens directives) | High |

## Coverage Thresholds
- Tier 1: ≥5 per feature
- Tier 2: ≥5 per feature
- Tier 3: Pairwise coverage of major feature interactions
- Tier 4: ≥5 realistic application scenarios
- **Acceptance Criterion**: 100% pass across all test scripts (`exit 0`).
