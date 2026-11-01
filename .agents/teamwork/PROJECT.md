# Project: DOCWEB MULTIGLOSSARY — Audiovisual Production & AI Prompting Semantic Knowledge Base

> **SINGLE AUTHORITATIVE MASTER SPECIFICATION (VERSIÓN ÚNICA CANÓNICA)**  
> This document consolidates all requirements (R1–R7), feature inventory (F1–F25), interface contracts, and milestone definitions. Any other drafts or redundant plans are formally discarded.  
> **DEDUPLICATION POLICY**: Completed milestones (Survey, M1, M2, M3) are FROZEN and VERIFIED. Subagents MUST NOT re-explore, re-implement, or re-verify completed milestones. Subagents operate strictly on their single assigned milestone.

## Architecture
The system is a fully local, 100% offline, privacy-first Single Page Application (SPA) semantic knowledge graph.
- **Data Layer (`AudiovisualProduction/data/`, `app/data/catalog.json`)**:
  - `AudiovisualProduction/data/glossary.json`: Domain metadata, 13 technical categories, versioning, authoring, and license.
  - `AudiovisualProduction/data/terms.json`: 177 canonical terms from MouseInteractivo + AI generative video expansion. Each term contains stable URN identifier (`urn:term:audiovisual-production:<slug>`), normalized title, original rigorous SMPTE/EBU/ITU compliant definition, extended disambiguation, components/subconcepts, practical examples, operational context, typed bidirectional relationships, and multimodal AI prompt engineering guidance.
  - `app/data/catalog.json`: Multi-glossary registry declaring all active collections (`render-3d-animations`, `video-image`, and `audiovisual-production`) with file paths and metadata.
- **Ontology & Semantic Engine Layer (`app/js/semantic-engine.js`)**:
  - `SemanticKnowledgeEngine` manages in-memory graph index of all terms across all glossaries.
  - Complete 15-pair bidirectional typed relationship model (transitive, symmetric, and inverse mappings).
  - Graph integrity validation (no broken targets, no orphan references).
  - Autonomous dynamic SVG contextual graph generation with interactive node traversal.
  - Schema.org `DefinedTerm` and `DefinedTermSet` JSON-LD injection into DOM.
- **Presentation & Navigation Layer (`index.html`, `app/js/app.js`, `app/css/app.css`)**:
  - Semantic HTML5 structure (`<article>`, `<section>`, `<dfn>`, `<dl>`, `<dt>`, `<dd>`, `data-*` attributes, microdata).
  - Reactive search with debouncing across titles, definitions, synonyms, and subconcepts.
  - A-Z alphabetic filter bar and category chip selector.
  - High-contrast accessible design (WCAG 2.2 AA) supporting dark and light themes.
- **AI Product Intention Guidance Layer (`app/js/prompt-orientator.js`)**:
  - Dedicated decoupled module for converting high-level creative intentions into structured technical specifications for generative AI video/audio models.
  - 14 audiovisual products (trailer, teaser, reel, corporate video, explainer, storyboard, animatic, shot list, take, shot, sequence, scene, montage, export formats).
  - 11 determinant production attributes (duration, format, resolution, aspect ratio, target audience, intent/goal, platform, visual style, audio/voiceover, subtitles, pacing/rhythm).
  - Automated structured prompt builder outputting prompt tokens, negative prompts, camera motion vectors, and lighting/LUT directives with hyperlinks to canonical glossary terms.
- **Persistence & Audit Layer (`app/js/storage.js`)**:
  - `IndexedDB` (`DocWebMultiGlossaryDB`) for storing local custom terms, user edits, and full immutable revision log.
  - Native Web Crypto API SHA-256 integrity calculation.
  - Import/Export of atomic knowledge capsules (`DOCWEB_MULTIGLOSSARY_CAPSULE`).
  - Zero network calls: 100% offline verified.

---

## Feature Inventory
Every feature extracted during the survey phase from `ORIGINAL_REQUEST.md` (R1-R7), `mouseinteractivo.com` mining, and AI generative taxonomy research is accounted for below:

| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Non-invasive Codebase Preservation | Preserve `index.html`, existing layout, `Render-3D-Animations`, and `VideoImage` without regression | M1 | R1, Codebase Survey |
| 2 | 100% Offline Autonomy Guarantee | Zero external URLs, zero CDNs, zero remote fonts/scripts/APIs at runtime | M1, M5 | R1, Codebase Survey |
| 3 | 177 Primary Terms Integration | Incorporate all 177 terms from mouseinteractivo.com with stable URN IDs | M1 | R2, Spec Miner |
| 4 | Discrepancy & Duplicate Reconciliation | Document and handle 2 duplicate pairs (#18/#132 and #51/#145), yielding 175 unique entities | M1 | R2, Spec Miner |
| 5 | Original Rigorous Technical Definitions | Original SMPTE/EBU/ITU compliant technical definitions in Spanish without copyright copying | M1 | R2, Spec Miner |
| 6 | Non-navigable Metadata Provenance | Embed source attribution, verified additions, and inferred relations in local term metadata | M1 | R2, Spec Miner |
| 7 | Expanded AI/LLM Generative Video Terms | Add terms for AI video (conditioning, motion vectors, controlnets, temporal coherence, seed, etc.) | M1 | R3, AI Taxonomy Survey |
| 8 | Multi-glossary Catalog Registration | Register `audiovisual-production` in `app/data/catalog.json` with domain and metadata | M1 | R7, Codebase Survey |
| 9 | Cross-Glossary Interconnection | Bidirectional links between Audiovisual, VideoImage, and Render-3D-Animations terms | M1, M2 | R4, Codebase Survey |
| 10 | 15-Pair Bidirectional Relationship Model | Implement the full 15 typed relationship pairs with inverse mapping in `semantic-engine.js` | M2 | R4, AI Taxonomy Survey |
| 11 | Schema.org JSON-LD DefinedTerm Integration | Generate compliant `DefinedTerm` and `DefinedTermSet` JSON-LD with real-time DOM injection | M2 | R5, AI Taxonomy Survey |
| 12 | Semantic HTML5 DOM Rendering | Render term views using `<article>`, `<section>`, `<dfn>`, `<dl>`, `<dt>`, `<dd>`, and `data-*` | M3 | R5, Codebase Survey |
| 13 | Real-time Search & Multi-field Indexing | Debounced search across titles, definitions, synonyms, and subconcepts across collections | M3 | R6, Codebase Survey |
| 14 | A-Z Navigation & Category Filters | Alphabetical bar (A-Z) and category chip filters matching 13 production categories | M3 | R6, Spec Miner |
| 15 | Contextual SVG Graph Diagram | Autonomous SVG relational graph showing direct, inverse, and cross-glossary connections | M2, M3 | R6, Codebase Survey |
| 16 | Audiovisual Product Taxonomy (14 products) | Model 14 products (trailer, teaser, reel, corporate, explainer, storyboard, animatic, etc.) | M4 | R6, AI Taxonomy Survey |
| 17 | Determinant Production Attributes (11 attributes) | Model 11 attributes (duration, aspect ratio, resolution, platform, style, pacing, etc.) | M4 | R6, AI Taxonomy Survey |
| 18 | AI Prompt Intention Orientator Module | Interactive UI to convert informal intentions into structured AI prompt specifications | M4 | R6, AI Taxonomy Survey |
| 19 | Term Linkage in AI Prompt Orientator | Direct hyperlinks from generated prompt tokens to defining glossary terms | M4 | R6, AI Taxonomy Survey |
| 20 | IndexedDB Custom Term Persistence | Persist custom additions, term modifications, and deletions in `DocWebMultiGlossaryDB` | M5 | R7, Codebase Survey |
| 21 | SHA-256 Web Crypto Integrity Hash | Hash verification of term contents and capsules using Web Crypto API | M5 | R7, Codebase Survey |
| 22 | JSON Capsule Import / Export | Export and import knowledge capsules with full revision history | M5 | R7, Codebase Survey |
| 23 | Decoupled Shared Multi-glossary Architecture | Generic modular engine supporting future glossaries (marketing, image, ontology, software) | M5 | R7, Codebase Survey |
| 24 | Complete E2E Automated Verification | Opaque-box test suite (Tiers 1-4) verifying offline status, URN links, JSON-LD, search, and storage | M6 | Verification Resources |
| 25 | Adversarial Coverage Hardening | White-box stress testing and boundary validation (Tier 5) | M6 | Dual Track Phase 2 |

---

## Milestones

| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Audiovisual Knowledge Package & Catalog Registration | Create `AudiovisualProduction/data/glossary.json` and `terms.json` (177 terms + AI expansion + cross-links); update `app/data/catalog.json` | None | DONE |
| M2 | Semantic Relationship Engine & Schema.org JSON-LD | Implement full 15-pair bidirectional ontology and JSON-LD DefinedTerm/DefinedTermSet generator in `app/js/semantic-engine.js` | M1 | DONE |
| M3 | Semantic HTML5 UI Integration & Navigation | Update `app/js/app.js`, `index.html`, and `app/css/app.css` to render semantic HTML5 tags (`article`, `dfn`, `dl`, `dt`, `dd`), A-Z bar, category filters | M2 | DONE |
| M4 | Audiovisual Product Intention Guidance Module | Build `app/js/prompt-orientator.js` and UI controls in `index.html` for 14 audiovisual products, 11 attributes, and AI prompt generation | M3 | DONE |
| M5 | Persistence, Capsule Backup & Decoupled Architecture | Verify and harden `storage.js` IndexedDB persistence, SHA-256 hash, and capsule export/import for new glossary | M4 | DONE |
| M6 | Final Milestone: 100% E2E Pass (Tiers 1-4) & Coverage Hardening (Tier 5) | Execute full automated test suite from E2E Testing Track until 100% pass; run adversarial coverage hardening | M5, TEST_READY.md | DONE |

---

## Dual Track: E2E Testing Track
Runs in parallel with the implementation track:
- **Scope**: Requirement-driven, opaque-box test suite (Tiers 1-4).
- **Deliverables**:
  - `tools/test_autonomy.js`: Strictly checks zero external network URLs or CDNs across all project files.
  - `tools/test_catalog_and_terms.js`: Validates all 177 terms, unique slugs, non-empty definitions, metadata provenance.
  - `tools/test_semantic_integrity.js`: Validates all 15 relationship pairs, inverse consistency, and zero broken URN target references across all 3 glossaries.
  - `tools/test_jsonld_schema.js`: Validates Schema.org `DefinedTermSet` and `DefinedTerm` structure.
  - `tools/test_prompt_orientator.js`: Validates all 14 audiovisual products, 11 attributes, and prompt output generation.
  - `tools/test_storage_capsule.js`: Validates SHA-256 calculation, capsule export/import structure.
  - `tools/run_all_tests.js`: Master test runner returning exit code 0 on complete suite success.
  - Publishes `D:\DocWebGlosary\.agents\teamwork\TEST_READY.md`.

---

## Interface Contracts

### 1. Data Contract (`AudiovisualProduction/data/terms.json` ↔ `semantic-engine.js`)
Each term in `terms.json` conforms to:
```typescript
interface TermDefinition {
  id: string; // "urn:term:audiovisual-production:<slug>"
  slug: string;
  title: string;
  category: string; // One of the 13 canonical categories
  definition: string; // Concise, rigorous definition (1-3 sentences)
  extendedDefinition: string; // Comprehensive explanation with context and standard citations
  components?: string[]; // Subconcepts, parts, technical parameters
  applications?: string[]; // Practical production applications
  examples?: string[]; // Real-world concrete production examples
  synonyms?: string[]; // Aliases, abbreviations, English equivalents
  aiPromptGuidance?: {
    relevance: string; // Role in AI generative video
    promptTokens: string[]; // Keywords to include in prompts
    negativeTokens?: string[]; // Pitfalls / unwanted artifacts
    modelCompatibility?: string[]; // Runway Gen-3, Sora, Kling, Midjourney, etc.
  };
  metadata?: {
    source: "mouseinteractivo";
    sourceIndex: number;
    originalTitle: string;
    curationStatus: "original_editorial_smpte_ebu";
    verified: true;
  };
  relations: Array<{
    type: string; // One of 15 canonical relationship types
    target: string; // Valid URN ("urn:term:audiovisual-production:..." or cross-glossary)
    label?: string; // Descriptive human-readable label
  }>;
}
```

### 2. 15-Pair Bidirectional Relationship Contract (`semantic-engine.js`)
The 15 canonical forward-to-inverse type mappings:
1. `isTypeOf` ⇄ `hasSubtype`
2. `isPartOf` ⇄ `composedOf`
3. `contains` ⇄ `containedIn`
4. `specializesIn` ⇄ `moreGeneralThan`
5. `dependsOn` ⇄ `dependencyOf`
6. `requires` ⇄ `requiredBy`
7. `precedes` ⇄ `succeeds`
8. `produces` ⇄ `producedBy`
9. `usedFor` ⇄ `uses`
10. `compatibleWith` ⇄ `compatibleWith`
11. `alternativeTo` ⇄ `alternativeTo`
12. `differsFrom` ⇄ `differsFrom`
13. `relatedTo` ⇄ `relatedTo`
14. `hasInput` ⇄ `isInputTo`
15. `hasOutput` ⇄ `isOutputOf`

### 3. Audiovisual Product Intention Guidance Contract (`prompt-orientator.js` ↔ `app.js`)
```typescript
interface AudiovisualProduct {
  id: string; // "trailer", "teaser", "reel", "corporate-video", etc.
  name: string;
  description: string;
  targetDuration: string;
  recommendedAspectRatios: string[];
  defaultAttributes: Record<string, string>;
  keyGlossaryTerms: string[]; // Array of URNs
}

interface PromptSpecificationResult {
  product: string;
  attributes: Record<string, string>;
  positivePrompt: string;
  negativePrompt: string;
  cameraDirectives: string;
  lightingAndColorDirectives: string;
  referencedGlossaryTerms: Array<{ id: string; title: string }>;
}
```

---

## Code Layout

```
D:\DocWebGlosary\
├── index.html                                 # Single SPA entry point (HTML5 semantic tags)
├── audit_autonomy.js                          # Preexisting autonomy auditor (preserved)
├── app/
│   ├── css/
│   │   └── app.css                            # CSS variables, layout, responsive design, dark mode
│   ├── data/
│   │   └── catalog.json                       # Catalog index registering all 3 glossaries
│   └── js/
│       ├── app.js                             # UI controller, routing, search, rendering
│       ├── semantic-engine.js                 # 15-pair ontology, SVG graph, JSON-LD generator
│       ├── storage.js                         # IndexedDB, SHA-256 hash, capsule manager
│       └── prompt-orientator.js               # Audiovisual intention & AI prompt guidance module
├── Render-3D-Animations/data/                 # Preserved 3D glossary
│   ├── glossary.json
│   └── terms.json
├── VideoImage/data/                           # Preserved Video & Image glossary
│   ├── glossary.json
│   └── terms.json
├── AudiovisualProduction/data/                # New Audiovisual & AI Video Knowledge Package
│   ├── glossary.json                          # Metadata, 13 categories, version
│   └── terms.json                             # 177 terms + AI generative terms + relations
└── tools/                                     # E2E test suite (Dual Track)
    ├── test_autonomy.js                       # Recursive 100% offline validator
    ├── test_catalog_and_terms.js              # 177 terms & catalog integrity validator
    ├── test_semantic_integrity.js             # 15-pair ontology & zero-broken-links validator
    ├── test_jsonld_schema.js                  # Schema.org DefinedTerm validator
    ├── test_prompt_orientator.js              # Prompt generator & product taxonomy validator
    ├── test_storage_capsule.js                # Persistence & capsule integrity validator
    └── run_all_tests.js                       # Master test suite runner
```
