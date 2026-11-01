## 2026-11-01T03:48:25Z
You are worker_m4 (teamwork_worker).
Your Working Directory is: D:\DocWebGlosary\.agents\teamwork\worker_m4\

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

BEFORE STARTING:
1. Read ORIGINAL_REQUEST.md at: D:\DocWebGlosary\.agents\teamwork\ORIGINAL_REQUEST.md
2. Read PROJECT.md at: D:\DocWebGlosary\.agents\teamwork\PROJECT.md
3. Read TEST_INFRA.md at: D:\DocWebGlosary\.agents\teamwork\TEST_INFRA.md
4. Read tools/test_prompt_orientator.js at: D:\DocWebGlosary\tools\test_prompt_orientator.js

YOUR EXCLUSIVE WRITE OWNERSHIP:
- app/js/prompt-orientator.js (NEW file to create)
- index.html
- app/js/app.js
- app/css/app.css
- Your working directory: D:\DocWebGlosary\.agents\teamwork\worker_m4\

OBJECTIVES FOR MILESTONE 4 (Audiovisual Product Intention Guidance Module):
1. Build `app/js/prompt-orientator.js`:
   - Dual runtime compatibility: Browser (exposes `window.DocWebPromptOrientator` and `window.PromptOrientator`) AND Node.js / CommonJS (`if (typeof module !== 'undefined' && module.exports) module.exports = ...;`).
   - Define authoritative 14 audiovisual products taxonomy (with IDs: 'trailer', 'teaser', 'reel', 'corporate-video', 'explainer', 'storyboard', 'animatic', 'shot-list', 'take', 'shot', 'sequence', 'scene', 'montage', 'export-formats').
     Provide both object dictionary `products` keyed by ID and/or array of product definitions.
   - Define 11 determinant production attributes:
     ['duration', 'aspectRatio', 'resolution', 'targetAudience', 'intent', 'platform', 'style', 'audio', 'subtitles', 'pacing', 'camera'].
   - Implement `buildSpecification(productId, attributes)`:
     - Robust against adversarial inputs: sanitize raw HTML tags (e.g. `<script>alert(1)</script>`) from input strings so they never appear unescaped in prompts.
     - Never throw unhandled exceptions on extreme or unexpected values (prompt injection, oversized duration, unknown aspects).
     - Return structured specification object:
       {
         product: string,
         attributes: object,
         positivePrompt: string, // must embed key parameters (e.g. aspect ratio like '2.39:1', style tokens, positive modifiers)
         negativePrompt: string, // anti-artifact modifiers, motion degradation pitfalls
         cameraDirectives: string, // camera movement vectors, optics/lenses
         lightingAndColorDirectives: string, // lighting scheme, color temperature, palette
         referencedGlossaryTerms: Array<{ id: string, title: string }> // canonical URNs (e.g. 'urn:term:audiovisual-production:montaje') linking relevant terms
       }
   - Implement key product term linkages (e.g. trailer -> montaje, teaser -> jump-cut, reel -> video-vertical, corporate-video -> produccion-de-video, explainer -> a-roll, storyboard -> plano-secuencia).

2. Integrate UI in `index.html`:
   - Include `<script src="./app/js/prompt-orientator.js"></script>` in `index.html` (before `app.js`).
   - Add an accessible button in the header/navigation toolbar: `<button id="btn-orientator" class="btn btn-secondary">🎬 Orientador Audiovisual IA</button>`.
   - Add a modal dialog or interactive panel `#orientator-modal` (accessible, hidden by default, keyboard navigatable with Escape key to close, aria-modal="true", role="dialog", aria-labelledby).
   - In the modal:
     - Dropdown / selector for the 14 products.
     - Form inputs / selects for determinant attributes (duration, aspect ratio, resolution, target audience, intent/goal, platform, visual style, audio, subtitles, pacing, camera).
     - Action button "Generar Especificación IA".
     - Results view container showing Positive Prompt (with "Copiar" button), Negative Prompt (with "Copiar" button), Camera & Lighting Directives, and a list of clickable badges for referenced canonical glossary terms (which navigate or open the corresponding term in DocWeb).

3. Integrate in `app/js/app.js`:
   - Bind event listeners for opening/closing the Orientador modal (`#btn-orientator`, close button, backdrop click, Escape key).
   - Bind form submission to invoke `DocWebPromptOrientator.buildSpecification(...)`.
   - Render results and hook clicking on referenced term badges to trigger `navigateToTerm(urn)` or term detail view.

4. Style in `app/css/app.css`:
   - Responsive, modern modal and card styling consistent with existing aesthetic.
   - Dark/Light mode support using existing CSS variables (`--bg-primary`, `--text-primary`, `--accent`, `--border`, etc.).
   - Full WCAG AA contrast compliance.

5. VERIFICATION REQUIREMENTS (You MUST execute these and include outputs in your handoff):
   - Run: `node tools/test_prompt_orientator.js` (All 34 assertions MUST PASS, 0 failed, 0 pending).
   - Run: `node tools/run_all_tests.js` (All 216 assertions across Tiers 1-4 MUST PASS, 100%).
   - Run: `node audit_autonomy.js` (Must pass with exit code 0, 100% offline).

6. COMPLETION & HANDOFF:
   - Write comprehensive report to: D:\DocWebGlosary\.agents\teamwork\worker_m4\report.md
   - Write 5-component handoff (Observation, Logic Chain, Caveats, Conclusion, Verification) to: D:\DocWebGlosary\.agents\teamwork\worker_m4\handoff.md
   - Send completion message to parent via send_message.

## 2026-11-01T03:55:06Z
**Context**: Milestone 4 Implementation (Priority Directive Alignment)
**Content**: Please be advised of the priority user directive:
1. `D:\DocWebGlosary\.agents\teamwork\PROJECT.md` is the SINGLE AUTHORITATIVE MASTER SPECIFICATION. Do not refer to any competing drafts or secondary plans.
2. Deduplication Policy: Milestones 1, 2, and 3 are FROZEN and FULLY VERIFIED. Do not re-execute, alter, or re-explore prior milestone scopes.
3. Focus exclusively on Milestone 4 deliverables: `app/js/prompt-orientator.js`, UI integration in `index.html`, `app/js/app.js`, and `app/css/app.css`. Run tests and deliver report/handoff.
**Action**: Continue execution with strict focus on Milestone 4.
