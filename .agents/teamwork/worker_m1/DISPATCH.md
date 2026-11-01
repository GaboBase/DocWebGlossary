# Task Assignment: Milestone 1 Implementation (Audiovisual Knowledge Package & Catalog Registration)

**Agent**: worker_m1
**Role**: Knowledge Engineer Worker
**Archetype**: teamwork_worker
**Working Directory**: D:\DocWebGlosary\.agents\teamwork\worker_m1\
**Original Request**: D:\DocWebGlosary\.agents\teamwork\ORIGINAL_REQUEST.md
**Project Specification**: D:\DocWebGlosary\.agents\teamwork\PROJECT.md

## Exclusive Write Ownership
You exclusively own and may create/modify only:
- `AudiovisualProduction/data/glossary.json`
- `AudiovisualProduction/data/terms.json`
- `app/data/catalog.json`

DO NOT touch `index.html`, `app/js/app.js`, `app/js/semantic-engine.js`, `app/js/storage.js`, or the existing files in `Render-3D-Animations/` or `VideoImage/`.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Objective
Build and register the canonical Audiovisual Production & Video Terminology knowledge package:

1. **Input Artifacts to Leverage**:
   - `D:\DocWebGlosary\.agents\teamwork\spec_miner_terms\catalog_177_enriched.json`: Complete dataset of 177 terms from mouseinteractivo.com with original technical definitions, categories, and attributes.
   - `D:\DocWebGlosary\.agents\teamwork\spec_miner_terms\report.md`: Master survey report.
   - `D:\DocWebGlosary\.agents\teamwork\explorer_survey_ai_taxonomy\report.md`: Research report on AI video variables, prompt engineering tokens, and 15-pair relationship models.

2. **File 1: `AudiovisualProduction/data/glossary.json`**:
   - `id`: `"audiovisual-production"`
   - `title`: `"Producción Audiovisual & Terminología de Video"`
   - `version`: `"1.0.0"`
   - `description`: Comprehensive overview
   - `categories`: The 13 canonical production categories:
     `preproduccion`, `direccion-narrativa`, `camara-movimiento`, `optica-lentes`, `iluminacion`, `audio-directo`, `edicion-montaje`, `color-etalonaje`, `audio-postproduccion`, `vfx-composicion`, `distribucion-formatos`, `tecnologia-infraestructura`, `ia-generacion-audiovisual`.

3. **File 2: `AudiovisualProduction/data/terms.json`**:
   - Array containing all 177 canonical terms from MouseInteractivo plus expanded AI generative video terms.
   - Each term must include:
     * `id`: `"urn:term:audiovisual-production:<slug>"`
     * `slug`: unique URL-safe slug
     * `title`: Normalized technical title
     * `category`: One of the 13 categories above
     * `definition`: Rigorous, original technical definition in Spanish (SMPTE/EBU/ITU standard aligned, zero verbatim plagiarism)
     * `extendedDefinition`: In-depth explanation, operational significance, industry context
     * `components`: Array of subconcepts/parameters/technical components
     * `applications`: Array of practical production applications
     * `examples`: Real-world concrete production examples
     * `synonyms`: Array of aliases, abbreviations, English equivalents
     * `aiPromptGuidance`: Object with `relevance`, `promptTokens`, `negativeTokens`, `modelCompatibility`
     * `metadata`: Source provenance (`mouseinteractivo`, index, original title, `curationStatus: "original_editorial_smpte_ebu"`, `verified: true`)
     * `relations`: Array of typed relations (`type`, `target`, `label`).
       Include intra-glossary relations AND cross-glossary relations to:
       - `VideoImage`: e.g. `urn:term:video-image:codec`, `urn:term:video-image:framerate`, `urn:term:video-image:hdr-image`, `urn:term:video-image:pixel`, `urn:term:video-image:chroma-subsampling`, `urn:term:video-image:bit-depth`, `urn:term:video-image:aspect-ratio`
       - `Render-3D-Animations`: e.g. `urn:term:render-3d-animations:rendering-pipeline`, `urn:term:render-3d-animations:shader`, `urn:term:render-3d-animations:ray-tracing`, `urn:term:render-3d-animations:rigging`, `urn:term:render-3d-animations:uv-mapping`

4. **File 3: `app/data/catalog.json`**:
   - Register the new glossary `audiovisual-production` alongside `render-3d-animations` and `video-image` in `canonicalGlossaries`.
   - Preserve existing entries exactly.

5. **Verification**:
   - Verify that all JSON files parse cleanly with valid syntax.
   - Run `node audit_autonomy.js` to ensure zero external URLs or network calls.
   - Run a validation script in Node.js to ensure all 177 terms exist, have non-empty definitions, unique IDs, and valid categories.

Write your report in `report.md` and `handoff.md`. Notify orchestrator via `send_message`.
