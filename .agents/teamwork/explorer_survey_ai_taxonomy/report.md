# Deep Technical Research & Model Specification: AI Audiovisual Taxonomy, Semantic Relationships & Product Intention Guidance

**Document**: `report.md`  
**Agent**: `explorer_survey_ai_taxonomy` (Audiovisual AI Taxonomy Explorer)  
**Date**: 2026-11-01  
**Project**: DOCWEB MULTIGLOSSARY — Knowledge System (`D:\DocWebGlosary`)  
**Scope**: Fulfilling Requirements R3, R4, R5, R6, R7  

---

## 1. Executive Summary & Epistemic Scope

The rapid convergence of classical cinematography, post-production engineering, and generative artificial intelligence (Diffusion Transformers, Neural Rendering, Multimodal LLMs, Spatial Conditioning) demands a unified semantic framework. Traditional film vocabularies (e.g. shot sizes, camera motion, shutter angles, lighting contrast ratios) now serve as the deterministic conditioning tokens for generative models such as **OpenAI Sora, Runway Gen-2/Gen-3, Pika, Kling AI, Luma Dream Machine, Stable Video Diffusion (SVD), ComfyUI/AnimateDiff, Midjourney v6 / Flux.1, ElevenLabs, and Suno/Udio**.

This research report establishes:
1. **A comprehensive AI Video & Audiovisual Generation Taxonomy**: Categorizing conditioning variables, prompt syntax, negative tokens, camera movement vectors, optics, lighting styles, color science, temporal coherence controls, frame dynamics, and multimodal audio-visual synchronization.
2. **An Audiovisual Product Intention Guidance Model**: Formalizing 14 fundamental audiovisual products, their 11 determinant production attributes, and a deterministic 5-stage translation pipeline converting informal creative intents into structured, model-specific prompt specifications.
3. **A Rigorous Semantic Relationship Model**: Formally specifying the 15 bidirectional typed relationships mandated by R4, including algebraic graph properties, domain constraints, inverse mapping functions, and verification rules.
4. **A Schema.org & Decoupled Multi-Glossary Architecture**: Engineering the JSON-LD `DefinedTermSet` / `DefinedTerm` representation and a scalable multi-glossary federation model for DOCWEB MULTIGLOSSARY, ensuring zero external network calls, cryptographic integrity, and persistent local storage.

---

## 2. Pillar 1: AI Video & Audiovisual Generation Terminology & Prompt Engineering Taxonomy

### 2.1 State-of-the-Art Generative Architectures & Ecosystem

Modern generative audiovisual pipelines operate on distinct conditioning paradigms:

| Model / Framework | Core Architecture & Paradigm | Primary Conditioning Modes | Native Strengths & Specific Tokens |
|---|---|---|---|
| **OpenAI Sora** | Spatiotemporal Diffusion Transformer (DiT) operating on 3D latent patches | Text-to-Video (T2V), Image-to-Video (I2V), Video-to-Video (V2V), Loop synthesis | High temporal consistency, complex physical simulations, dynamic multi-camera tracking, 1080p native resolution. |
| **Runway Gen-2 & Gen-3 Alpha** | Latent Diffusion with Motion Control layers & Director Mode | T2V, I2V, Multi-Motion Brush (up to 5 independent brushes), Camera Path Controls | Explicit camera motion tokens (`pan`, `tilt`, `zoom`, `truck`, `pedestal`), `motion_scale` (1-10), Act-One facial performance capture. |
| **Pika (Pika 1.0 / 2.0)** | Diffusion-based video synthesis with localized motion modification | T2V, I2V, V2V, Region Modify (Inpainting/Outpainting), Lip Sync | Built-in sound effects (Audio-native), frame expansion (`expand_canvas`), Pikaffects physics morphing. |
| **Kling AI (Kling 1.0 / 1.5)** | 3D VAE with Spatiotemporal Attention Backbone | T2V, I2V (Start Frame & End Frame Keyframing), Camera trajectory controls | Exceptional prompt adherence, realistic physical simulations of cloth/fluid/gravity, 1080p cinematic output, shot duration up to 10s. |
| **Luma Dream Machine (Ray 1 / Ray 2)** | Large-scale generative video transformer trained directly on video latents | T2V, I2V, Start-and-End Frame Keyframing, Infinite Loop generation | Smooth natural camera moves, high-speed action tracking, photorealistic lighting interactions, rapid inference speeds. |
| **Stable Video Diffusion (SVD / SVD-XT)** | Latent Video Diffusion Model (14-frame SVD, 25-frame SVD-XT) | Image-to-Video (I2V), Latent Interpolation | Open weights, micro-parameter tuning: `motion_bucket_id` (1-255), `fps_id` (5-30), `augmentation_level` (noise injection). |
| **ComfyUI Advanced Video Ecosystem** | Node-based modular execution graph | AnimateDiff (v1, v2, v3, Evolved), SparseCtrl, ControlNet, IP-Adapter, CogVideoX, HunyuanVideo, Wan 2.1 | Custom motion modules, FreeInit noise filtering, frame interpolation (RIFE/FILM), localized LoRA conditioning, identity preservation. |
| **Midjourney v6 / Flux.1 (Schnell/Dev/Pro)** | High-fidelity Autoregressive / Rectified Flow Transformers | Text-to-Image (T2I), Character Turnarounds, Keyframe Storyboards | Baseline visual keyframe generation, concept art, style guide generation, reference conditioning for I2V video models. |
| **ElevenLabs** | Deep neural text-to-speech (TTS), Voice Cloning, Speech-to-Speech (STS) | Phoneme & prosody conditioning, emotion steering, audio native SFX | Sub-second latency, voice cloning from 1-minute audio, contextual nuance, localized accent synthesis, synchronous sound effects. |
| **Suno (v3 / v3.5) & Udio (v1.5)** | Hierarchical audio diffusion & autoregressive music transformers | Structural genre tags, BPM tokens, instrument specifications, stem separation | Full-length song synthesis (up to 4 minutes), verse-chorus-bridge progression, dynamic mixing, vocal stem extraction. |

---

### 2.2 Technical Variable Matrix & Token Taxonomy

The following matrix standardizes the generative parameters and cinematography conditioning variables across the audiovisual glossary:

#### A. Conditioning Variables & Input Modes
1. **Text-to-Video (T2V)**: Direct generative synthesis from natural language tokens into spatiotemporal latents.
2. **Image-to-Video (I2V)**: Conditioning initial latent states with a high-resolution reference frame (First Frame Conditioning).
3. **First-and-Last Frame Keyframing (Interpolation)**: Bounding the generative trajectory between two explicit visual states, enabling deterministic camera travels and scene transitions.
4. **Video-to-Video (V2V) / Neural Restyling**: Temporal latent injection from source footage, preserving underlying motion vectors while altering surface textures, lighting, and rendering style.
5. **Multi-Motion Brush (Segment Masking)**: Spatially isolating discrete image regions (e.g., character, background foliage, vehicle) and assigning independent velocity and directional vectors (`[dx, dy, dz]`).
6. **ControlNet Spatial Guidance**: Imposing geometric constraints using preprocessing detectors:
   - `OpenPose`: Human skeletal kinematics tracking.
   - `MiDaS / DPT Depth`: Scene depth maps for volumetric camera movement.
   - `Canny / LineArt`: Strict edge retention.
   - `Tile`: Super-resolution hallucination preserving macro composition.
7. **IP-Adapter / FaceID**: Cross-attention feature projection from reference images, enforcing actor identity consistency across diverse shots.

#### B. Prompt Weighting & Negative Prompts
1. **Attention Weighting Syntax**:
   - Compel / Standard notation: `(term:weight)` (e.g. `(anamorphic lens flare:1.25)`).
   - Slash notation: `term::weight` (Midjourney/Runway style, e.g. `cinematic lighting::2 photorealistic::1`).
2. **Negative Prompting Tokens (Artifact Suppression)**:
   - Universal Anti-Artifact Set: `temporal flicker, limb morphing, floating limbs, jitter, stutter, frame stutter, frame blending artifacts, ghosting, plastic skin, oversaturated, deformed hands, face mutation, watermark, text overlay, subtitle burn-in, low resolution, JPEG compression artifacts, temporal warping, abrupt cut`.
3. **Temporal Prompt Chaining**:
   - Segmented sequential prompting: `[0.0s-2.0s: wide establishing shot, slow push in] -> [2.0s-4.0s: medium shot, character looks towards camera]`.

#### C. Camera Motion Tokens & Cinematographic Controls
Generative video models interpret specific cinematographic vocabulary as physical 3D camera transforms in world coordinates:

| Token / Term | Physical Camera Action | Mathematical Vector / Axis | Prompt Template Example |
|---|---|---|---|
| **Pan (Left / Right)** | Rotational yaw around the vertical camera axis | Yaw rotation ($\theta_y$) | `Slow cinematic pan left across the futuristic skyline, smooth movement` |
| **Tilt (Up / Down)** | Rotational pitch around the lateral horizontal axis | Pitch rotation ($\theta_x$) | `Dramatic tilt up from subject's leather boots to their intense facial expression` |
| **Roll (Barrel Roll)** | Rotational roll around the optical lens axis (Dutch Angle) | Roll rotation ($\theta_z$) | `Disorienting slow 15-degree roll right, vertigo aesthetic, Dutch angle` |
| **Zoom (In / Out)** | Optical focal length transition (changing FOV) | Field of view $\Delta\text{FOV}$ | `Smooth optical zoom in on the antique clockwork mechanism, high magnification` |
| **Truck / Track (Left / Right)** | Lateral linear translation along the camera track | Translation $\Delta X$ | `Trucking shot right following the running protagonist parallel to the brick wall` |
| **Pedestal / Boom (Up / Down)** | Vertical linear translation of the camera rig | Translation $\Delta Y$ | `Pedestal up revealing the vast desert landscape behind the sand dune` |
| **Dolly (In / Out / Push / Pull)** | Physical linear translation towards or away from subject | Translation $\Delta Z$ | `Slow dolly push in on the detective seated at the mahogany desk` |
| **Dolly Zoom (Vertigo Effect / Zolly)** | Forward dolly translation synchronized with optical zoom out | $\Delta Z > 0 \land \Delta\text{FOV} > 0$ | `In-camera vertigo dolly zoom, background warps while subject size remains constant` |
| **Orbit / Arc (360° Tracking)** | Circular camera path maintaining radial focus on target | Cylindrical coordinates $(r, \theta)$ | `Smooth 180-degree orbit shot around the violinist on stage, circular dolly track` |
| **Crane / Jib Shot** | Sweeping high-elevation translation on mechanical arm | Translation in $Y$ and $Z$ with pitch | `High crane shot descending smoothly into the crowded Victorian marketplace` |
| **Steadicam / Handheld** | Stabilized walking inertia vs organic human shake | Damped Brownian motion / Spring damper | `Steadicam tracking shot following the chef through the bustling kitchen` |
| **FPV Drone Maneuver** | Unconstrained 6-DOF high-velocity flight path | Full 6-DOF rigid body trajectory | `Fast dynamic FPV drone dive through the concrete arches of the abandoned bridge` |

#### D. Optics, Lenses & Depth of Field (DoF)
1. **Focal Lengths**:
   - *Ultra-wide (14mm - 20mm)*: Barrel distortion, deep spatial perspective, dynamic velocity accentuation.
   - *Wide (24mm - 35mm)*: Standard documentary and architectural framing, natural environmental context.
   - *Normal / Standard (50mm)*: Neutral human eye perspective, zero geometric distortion.
   - *Portrait / Telephoto (85mm - 135mm)*: Spatial compression, facial flattening, background separation.
   - *Super-Telephoto (200mm - 400mm)*: Extreme planar compression, atmospheric heat haze, flattened perspective.
2. **Anamorphic Optics**:
   - `2.0x / 1.33x anamorphic squeeze, oval bokeh, horizontal blue streak flares, subtle chromatic aberration at frame edges, cylindrical lens characteristics`.
3. **Aperture & Depth of Field (DoF)**:
   - *Shallow DoF*: `f/1.2, f/1.4, f/1.8`, razor-thin focal plane, creamy bokeh circles, subject isolation.
   - *Deep Focus*: `f/11, f/16, hyperfocal distance`, foreground, midground, and background simultaneously sharp.
   - *Rack Focus (Focus Pull)*: Intentional transition of the focal plane from foreground object to background character.
4. **Shutter Speed & Shutter Angle**:
   - *180-Degree Shutter Rule*: Exposure duration equals $1 / (2 \times \text{FPS})$ (e.g. 1/48s at 24fps), delivering natural cinematic motion blur.
   - *Narrow Shutter (45° - 90°, 1/200s+)*: Staccato, crisp action sequences (Saving Private Ryan / Gladiator effect), eliminating motion blur.
   - *Slow Shutter (360°, 1/12s)*: Dreamlike motion trails, light streaks, intoxicated perception.

#### E. Lighting Styles & Photometric Atmosphere
1. **Chiaroscuro**: Extreme tonal contrast between deep blacks and intense highlights, high drama, heavy shadow casting.
2. **Rembrandt Lighting**: Studio portrait setup creating a characteristic small illuminated triangle on the shadow-side cheek (Key light at 45° elevation and 45° offset).
3. **Volumetric Lighting / Crepuscular Rays**: Tyndall effect through atmospheric particulates (dust, fog, haze, steam), visible light shafts.
4. **Golden Hour**: Low solar elevation ($< 6^\circ$), warm amber chromaticity ($2800\text{K} - 3200\text{K}$), elongated soft shadows.
5. **Blue Hour**: Nautical dusk/dawn, deep cyan and indigo ambient fill ($9000\text{K} - 12000\text{K}$), cool contemplative mood.
6. **Neon Noir / Dual Split Lighting**: Contrast between high-saturation complementary neon light sources (e.g. Cyan key and Magenta rim).
7. **Rim Light / Kicker / Hair Light**: Positioned behind the subject to create a thin outline of highlight, physically separating subject from dark backdrop.
8. **High Key**: Bright, uniform illumination, minimal shadows, low contrast ratio (1:1 or 2:1), upbeat commercial tone.
9. **Low Key**: Predominantly dark tones, high contrast ratio (8:1 to 16:1), deep shadows, mystery, suspense.

#### F. Color Science, Film Stocks & Look-Up Tables (LUTs)
1. **Color Gamuts & Profiles**:
   - *Rec.709*: Standard HDTV SDR color space (gamma 2.4).
   - *DCI-P3*: Theatrical digital cinema standard with expanded green and red gamut.
   - *Rec.2020 / HDR10*: Wide Color Gamut (WCG) supporting high dynamic range (PQ / ST.2084 or HLG).
   - *ACES (Academy Color Encoding System)*: Ultra-wide colorimetric interchange framework (`ACEScg`, `ACEScc`).
   - *Log Profiles*: `Arri LogC3 / LogC4, Sony S-Log3, Canon C-Log3, RED Log3G10`.
2. **Film Emulation & Stocks**:
   - `Kodak Vision3 500T 5219`: Tungsten-balanced cinematic motion picture stock, rich shadow detail, warm halation around specular highlights.
   - `Kodak Tri-X 400`: Classic high-contrast black-and-white, punchy silver grain, deep tonal gradients.
   - `Fujifilm Eterna 250D`: Daylight stock, subtle pastel roll-off, desaturated greens, soft highlight compression.
   - Film Artifacts: `35mm photochemical grain structure, gate weave, halation, lens bloom, color breathing`.
3. **Color Grading Palettes**:
   - `Teal and Orange`: Complementary color scheme pushing skin tones to orange/gold ($580\text{nm}$) and shadows/midtones to teal ($490\text{nm}$).
   - `Bleach Bypass (Skip Bleach)`: Retained silver emulsion, high contrast, desaturated chroma, gritty documentary realism.
   - `Technicolor 3-Strip`: Ultra-saturated primary dyes, vivid red and emerald green palettes of golden-era cinema.

#### G. Temporal Coherence, Motion Scale & Latent Management
1. **Temporal Coherence**: Preservation of spatial geometry, textures, lighting, and semantic identity across consecutive video frames without morphing or flicker.
2. **Latent Drift**: Progressive degradation or hallucination of visual features as autoregressive or iterative video diffusion steps accumulate.
3. **FreeInit (Frequency-domain Latent Initialization)**: Iterative spatial-temporal filtering technique resetting low-frequency noise components, dramatically stabilizing background consistency and camera trajectories.
4. **Motion Scale / Motion Magnitude**: Integer or floating-point multiplier (e.g., Runway Motion 1-10, SVD Motion Bucket 1-255) controlling the displacement velocity of vectors between frames:
   - Low motion (1-3): Micro-movements, breathing, subtle hair flutter, maximum structural stability.
   - Medium motion (4-6): Natural walking, moderate panning, dialog gestures.
   - High motion (7-10): Fast action, vehicle chases, explosive transitions (heightened risk of temporal morphing).

#### H. Technical Output Parameters
1. **Frame Rates (FPS)**:
   - `24 fps`: Standard cinematic aesthetic (cadence of theatrical projection).
   - `25 fps / 30 fps`: Broadcast PAL / NTSC television and digital web streaming.
   - `60 fps`: High frame rate (HFR), hyper-smooth sports/gaming, target capture for slow-motion re-timing.
2. **Temporal Frame Interpolation**:
   - `RIFE (Real-Time Intermediate Flow Estimation)`: Deep neural network estimating bi-directional optical flow to synthesize intermediate frames (e.g., 24fps to 60fps or 120fps).
   - `FILM (Frame Interpolation for Large Motion)`: Multi-scale feature extractor handling large pixel displacements without tear artifacts.
3. **Aspect Ratios**:
   - `16:9` ($1.78:1$ / $1920\times1080$, $3840\times2160$): Universal widescreen standard (YouTube, Desktop, Television).
   - `9:16` ($0.5625:1$ / $1080\times1920$): Vertical mobile viewport (TikTok, Instagram Reels, YouTube Shorts).
   - `2.39:1` / `2.35:1` ($3840\times1606$): Theatrical Anamorphic Panavision widescreen.
   - `1:1` ($1080\times1080$): Square social media feed standard.
   - `4:3` ($1.33:1$ / $1440\times1080$): Academy ratio, vintage television, retro aesthetic.
4. **Deterministic Seeds & Seed Travel**:
   - `seed: <integer>`: Fixing pseudorandom Gaussian noise distribution for reproducible generation.
   - `Seed interpolation / Latent walking`: Slerp (Spherical Linear Interpolation) between two latent noise vectors $\mathbf{z}_1$ and $\mathbf{z}_2$ to generate continuous seamless morphs.

#### I. Audio-Visual Synchronization & Sound Design
1. **Lip Sync & Neural Talking Heads**:
   - `Wav2Lip / SadTalker / LivePortrait`: Neural speech-to-video alignment synchronizing phoneme audio features with mouth visemes, micro-expressions, and head pose.
2. **Foley & Diegetic Sound Tokens**:
   - `Diegetic audio`: Sound originating from within the narrative world (footsteps on wet asphalt, engine revs, door creaks).
   - `Non-diegetic audio`: External score, orchestral swells, narration voiceover.
3. **Sound Design Impact Tokens**:
   - `Whooshes, Risers, Sub-bass drops (Braam / Inception Horn), Hit/Impact transients, Atmospheric ambient drone beds`.
4. **Transient Cut-on-Action Timing**:
   - Temporal synchronization aligning visual scene cuts or camera impact moments with the acoustic beat transient ($\pm 1\text{ frame} \approx 41.6\text{ms}$).

---

## 3. Pillar 2: Audiovisual Product Intention Guidance Model

### 3.1 Taxonomy of Core Audiovisual Products

The intention model formalizes 14 fundamental audiovisual products and production artifacts:

```
                          ┌────────────────────────┐
                          │  Audiovisual Products  │
                          └───────────┬────────────┘
         ┌────────────────────────────┼───────────────────────────┐
         ▼                            ▼                           ▼
┌──────────────────┐        ┌──────────────────┐        ┌───────────────────┐
│Narrative Products│        │Structural Grammar│        │Technical Artifacts│
├──────────────────┤        ├──────────────────┤        ├───────────────────┤
│• Tráiler         │        │• Secuencia       │        │• Storyboard       │
│• Teaser          │        │• Escena          │        │• Animatic         │
│• Reel / TikTok   │        │• Plano (Shot)    │        │• Shot List        │
│• Video Corporat. │        │• Toma (Take)     │        │• Format. Export.  │
│• Video Explicat. │        │• Montaje         │        │                   │
└──────────────────┘        └──────────────────┘        └───────────────────┘
```

1. **Tráiler (Theatrical Trailer)**: Promotional narrative packaging of a film, series, or game (typically 90s to 150s), structured across a multi-act arc with crescendo pacing, dramatic music hits, sound bites, and title cards.
2. **Teaser**: Compact micro-promotional preview (15s to 45s) engineered to generate mystery, anticipation, and hype without revealing full plot mechanics.
3. **Reel / Short / TikTok**: Vertical short-form narrative or promotional video (15s to 60s) designed for high user engagement, immediate hook in the opening 3 seconds, dynamic pacing, punchy typography, and algorithmic retention.
4. **Video Corporativo (Corporate Showcase)**: Institutional communication artifact (60s to 180s) communicating company vision, culture, infrastructure, or brand value proposition with high-key lighting, polished color grade, professional voiceover, and confident pacing.
5. **Video Explicativo / Explainer Video**: Pedagogical or commercial presentation (60s to 120s) simplifying complex concepts, software platforms, or services through problem-solution structure, kinetic typography, motion graphics, or structured live action.
6. **Storyboard**: Sequential illustrative representation of keyframes outlining planned shot compositions, camera vectors, actor choreography, and accompanying dialogue before production begins.
7. **Animatic**: Synchronized audiovisual prototype of the storyboard, edited to scratch audio, temp sound effects, and musical score, verifying pacing, scene transitions, and timing before final render.
8. **Shot List / Desglose de Planos**: Comprehensive tabular operational plan detailing shot numbers, camera setups, lens focal lengths, camera motion, frame rates, subject action, audio requirements, and estimated durations.
9. **Toma (Take)**: Continuous uninterrupted recording event by the camera from trigger activation to cutoff, providing raw variations of a specific shot.
10. **Plano (Shot)**: Minimal semantic syntactic unit of visual film grammar, defined by framing scale (Gran Plano General, Plano General, Plano Medio, Primer Plano, Plano Detalle) and temporal duration.
11. **Secuencia (Sequence)**: Macro narrative unit consisting of a series of related scenes linked by a single dramatic idea, action, or character objective, forming a complete narrative chapter.
12. **Escena (Scene)**: Unit of dramatic action unified by spatial continuity (same location) and temporal continuity (uninterrupted elapsed time).
13. **Montaje (Montage / Film Editing)**: The syntactical assembly of disparate shots into a coherent temporal continuum, governing rhythm, metric cutting, tonal resonance, intellectual juxtaposition (Kuleshov effect), and spatial continuity.
14. **Formatos de Exportación (Mastering & Delivery Formats)**: Technical specifications and container/codec profiles (ProRes 422 HQ, DNxHR, H.264, H.265, AV1, MP4, MOV) optimized for archival, theatrical DCP projection, broadcast television, or web CDN streaming.

---

### 3.2 Determinant Production Attributes Matrix

Each audiovisual product is characterized by 11 determinant production attributes:

| Audiovisual Product | Target Audience | Primary Intent | Delivery Platform | Target Duration | Resolution & Aspect Ratio | Visual Style & Aesthetic | Pacing & Cutting Rhythm | Narrative Structure | Audio & Voiceover | Subtitles & Typography |
|---|---|---|---|---|---|---|---|---|---|---|
| **Tráiler** | General public / Cinema patrons | Commercial conversion, excitement, anticipation | Theatrical, YouTube, Broadcast TV | 90s - 150s | 4K UHD (3840x2160) / 2.39:1 widescreen | Cinematic blockbuster, high contrast, anamorphic flares | Crescendo: slow atmospheric intro to rapid montage climax | 3-Act Mini Arc: World building -> Conflict -> Climax cliffhanger | Full orchestral score, sub-bass hits, dialogue soundbites, SFX | Minimal dialogue subs; stylized title cards / motion graphics |
| **Teaser** | Fanbase, early adopters | Intrigue, brand awareness, virality | Social media, Theatrical, Web | 15s - 45s | 4K / 1080p, 16:9 or 2.39:1 | Atmospheric, mysterious, high chiaroscuro, cryptic imagery | Hypnotic, deliberate, sudden cut-to-black impact | Single thematic question or enigmatic visual hook | Ambient drone, isolated iconic dialogue line, final audio sting | Release date text, title logo reveal only |
| **Reel / TikTok** | Mobile social media users (18-35) | Retention, viral sharing, algorithm reach | Instagram Reels, TikTok, Shorts | 15s - 60s (sweet spot 20-30s) | Full HD (1080x1920) / 9:16 vertical | Vibrant, punchy, high saturation, trendy, hyper-dynamic | Frenetic / High-tempo, cut every 1.5 - 2.5s, zero dead air | Hook (0-3s) -> Retain/Escalate (3-20s) -> Payoff/CTA (20-30s) | Trending commercial audio, punchy voiceover, sync beat hits | Dynamic open captions (karaoke style animated typography) |
| **Video Corporativo** | B2B clients, investors, recruits | Trust, authority, institutional prestige | Website, LinkedIn, Expos, Internal | 60s - 180s | 4K / 1080p, 16:9 widescreen | Clean, minimal, high-key commercial lighting, Rec.709 | Balanced, rhythmic, professional, smooth steady dolly moves | Executive hook -> Company values -> Innovation -> Global impact | Inspiring corporate ambient music, warm authoritative voiceover | Clean lower thirds for executive names, optional closed captions |
| **Video Explicativo** | Prospective SaaS buyers, students | Education, product clarity, conversion | Landing page, YouTube, Onboarding | 60s - 120s | 1080p, 16:9 widescreen | Isometric 3D, motion design, clean flat art, or crisp live action | Steady, explanatory, synchronized precisely with vocal explanation | Problem statement -> The Pain -> The Solution -> Benefit -> CTA | Upbeat background bed, friendly approachable voiceover, UI SFX | Kinetic text highlighting key metrics and value props |
| **Storyboard** | Director, DP, VFX artists, client | Visual pre-planning, shot composition | Pre-production docs, PDF, web wiki | N/A (Static sequential) | Variable ratio matching target project (16:9 or 2.39:1) | Conceptual line art, digital ink & wash, tonal grayscale | Conceptual sequence | Sequential shot progression | Written audio notes and dialogue cues per panel | Shot number, camera move arrows, lens mm, duration tags |
| **Animatic** | Production team, agency, editor | Timing validation, rhythm testing | Internal review video, NLE timeline | Same as final cut (e.g. 30s - 90s) | 1080p matching target project ratio | 2D/3D moving storyboards, 2.5D parallax camera moves | Matches intended final editing pace frame-for-frame | 1:1 match with script narrative | Scratch voiceover track, temp music, placeholder foley | Subtitles burned in matching script lines for timing check |
| **Shot List** | 1st AD, Camera operator, Gaffer | On-set technical execution, schedule planning | Tabular documentation, call sheet | N/A (Technical matrix) | Technical data | Data visualization / reference stills | Production schedule order (grouped by camera setup) | Scene/Shot breakdown | Audio recording channel designations (boom, lavalier) | Technical callouts: lens, frame rate, filter, gimbal/tripod |
| **Plano (Shot)** | Audience of specific scene | Emotional resonance, information delivery | Scene component | 0.5s - 30s+ (average 3-5s) | Project target resolution & aspect ratio | Driven by scene cinematography (e.g. shallow DoF close-up) | Intra-shot velocity (camera move speed vs stillness) | Dramatic beat within scene | Synchronous location sound, dialog, or silence | N/A |
| **Montaje** | Narrative audience | Narrative synthesis, pacing, emotional impact | Complete film / sequence | Project duration | Project target | Montage rhythm, continuity, or associative montage | Metric, rhythmic, tonal, or intellectual cutting | Story rhythm governor | Audio cross-fades, J-cuts, L-cuts, sound bridges, mixing | Standard dialogue subtitles as required by release |
| **Formatos Export.** | Technical QC, CDN, Projection | Lossless archiving, streaming bandwidth | OTT, Broadcast, Web, Cinema | File artifact | Varies: 4K Master to 720p Proxy | Color space preservation, Rec.709, Rec.2020, DCI-P3 | Playback frame rate: 23.976, 24.0, 25.0, 29.97, 50, 59.94 fps | Codec container structure | Uncompressed PCM 24-bit 48kHz / 96kHz or AAC-LC 320kbps | Embedded CEA-608/708 or sidecar SRT/VTT subtitle streams |

---

### 3.3 Informal-to-Structured Prompt Guidance Pipeline

To bridge the gap between creative layman intent and deterministic model execution, the Intention Guidance Model implements a 5-Stage Transformation Architecture:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        STAGE 1: INTENT PARSER                          │
│ Input: "Quiero un video moderno y rápido para vender zapatillas en     │
│         TikTok con un look nocturno y urbano"                          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│              STAGE 2: ARCHETYPE & ATTRIBUTE MAPPING                    │
│ • Product: Reel / TikTok                                               │
│ • Aspect Ratio: 9:16 (1080x1920) | Duration: 20 seconds | FPS: 30     │
│ • Rhythm: High-tempo (cut every 2.0s) | Narrative: Hook-Story-Offer    │
│ • Aesthetic: Cyberpunk / Neon Noir | Lighting: Cyan & Magenta split     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               STAGE 3: SHOT LIST & CINEMATOGRAPHY PLAN                 │
│ • Shot 1 (0-3s): FPV drone dive onto protagonist wearing sneakers      │
│ • Shot 2 (3-6s): Low-angle tracking shot, puddles reflecting neon      │
│ • Shot 3 (6-10s): Extreme close-up on shoe fabric, shallow DoF f/1.4   │
│ • Shot 4 (10-15s): Dynamic slow-motion jump, 60fps, 360 orbit camera   │
│ • Shot 5 (15-20s): Product hero freeze-frame with call-to-action       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│            STAGE 4: GENERATIVE MODEL PROMPT COMPILER                   │
│ Translates cinematography tokens into Runway Gen-3 / Kling / Midjourney│
│ prompt syntax with negative constraints, seeds, and motion scale       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│             STAGE 5: AUDIO, VOICE & TIMING COMPILER                    │
│ • ElevenLabs: Energetic urban voiceover script, punchy delivery         │
│ • Suno/Udio: Bass-heavy dark trap, 130 BPM, 808 slides, synth drops    │
│ • Audio Sync: Transient beat-matching on cuts at 3.0s, 6.0s, 10.0s     │
└────────────────────────────────────────────────────────────────────────┘
```

#### Detailed Compilation Example:
**Compiled Video Prompts (Runway Gen-3 / Kling AI syntax)**:
- *Shot 1 (Hook)*:
  `Dynamic low-angle FPV camera dive through rain-slicked Tokyo alley, neon cyan and magenta reflections, stopping abruptly at futuristic high-top sneakers, fast motion blur, volumetric street steam, 35mm lens, f/2.8, cinematic film grain, photorealistic, 4k resolution --ar 9:16 --motion 8`
  *Negative Prompt*: `daylight, blurry, slow camera, plastic textures, watermark, extra legs, distorted anatomy, text`
- *Shot 3 (Macro Feature)*:
  `Extreme close-up macro shot of sneaker synthetic mesh and luminescent reflective stitching, rack focus from heel pull-tab to glowing laces, shallow depth of field f/1.4, creamy oval bokeh, anamorphic lens flare, studio rim light --ar 9:16 --motion 3`

---

## 4. Pillar 3: Semantic Relationship Model (15 Typed Bidirectional Pairs)

### 4.1 Formal Specification of 15 Bidirectional Relationship Pairs

To fulfill Requirement R4, every relationship in the knowledge base is modeled as a strongly-typed, bidirectional semantic edge connecting source term $u$ and target term $v$.

```
                       Direct Relation: type
             Term u ─────────────────────────────► Term v
                    ◄─────────────────────────────
                      Inverse Relation: invType
```

Below is the complete formal specification of the 15 bidirectional pairs:

| # | Direct Relationship (`type`) | Direct Label (ES) | Inverse Relationship (`invType`) | Inverse Label (ES) | Algebraic & Graph Properties | Semantic Domain / Entity Restrictions |
|---|---|---|---|---|---|---|
| **1** | `isTypeOf` | es un tipo de | `hasSubtype` | tiene como subtipo | Asymmetric, Transitive, Anti-reflexive | Taxonomy: Subconcept to Superconcept |
| **2** | `isPartOf` | es parte de | `composedOf` | se compone de | Asymmetric, Transitive, Anti-reflexive (Mereology) | Structural Composition: Component to System |
| **3** | `contains` | contiene | `containedIn` | está contenido en | Asymmetric, Transitive, Anti-reflexive | Spatial / Container Membership |
| **4** | `specializesIn` | se especializa en | `moreGeneralThan` | es más general que | Asymmetric, Transitive, Anti-reflexive | Technical Specialty / Domain Subfield |
| **5** | `dependsOn` | depende de | `dependencyOf` | es dependencia de | Asymmetric, Transitive, Anti-reflexive (DAG) | Functional Requirement / Execution Constraint |
| **6** | `requires` | requiere | `requiredBy` | es requerido por | Asymmetric, Transitive, Anti-reflexive | Operational Necessity / Hardware or Parameter Prerequisite |
| **7** | `precedes` | precede a | `succeeds` | sucede a | Asymmetric, Transitive, Anti-reflexive (Temporal DAG) | Workflow / Temporal Sequence in Pipeline |
| **8** | `produces` | produce | `producedBy` | es producido por | Asymmetric, Non-transitive, Anti-reflexive | Generative / Causality: Process to Artifact |
| **9** | `usedFor` | se utiliza para | `uses` | utiliza | Asymmetric, Non-transitive, Anti-reflexive | Teleology / Functional Purpose: Tool to Application |
| **10** | `compatibleWith` | es compatible con | `compatibleWith` | es compatible con | **Symmetric**, Non-transitive, Reflexive | Interoperability: Standard to Format / Tool |
| **11** | `alternativeTo` | es una alternativa a | `alternativeTo` | tiene como alternativa | **Symmetric**, Non-transitive, Anti-reflexive | Equivalence: Mutually exclusive options |
| **12** | `differsFrom` | se diferencia de | `differsFrom` | se diferencia de | **Symmetric**, Non-transitive, Anti-reflexive | Conceptual Distinction / Contrasting terms |
| **13** | `relatedTo` | se relaciona con | `relatedTo` | se relaciona con | **Symmetric**, Non-transitive, Reflexive | General Associative Semantic Link |
| **14** | `hasInput` | tiene como entrada | `isInputTo` | es entrada de | Asymmetric, Non-transitive, Anti-reflexive | Dataflow: Process consumes Artifact / Parameter |
| **15** | `hasOutput` | tiene como resultado | `isOutputOf` | es resultado de | Asymmetric, Non-transitive, Anti-reflexive | Dataflow: Process outputs Artifact / Metric |

---

### 4.2 Mathematical Graph Constraints & DAG Validation

To ensure structural soundness across the entire knowledge graph:
1. **Acyclicity Enforcement (DAG)**:
   - Relationships representing hierarchical order (`isTypeOf`, `isPartOf`), dependency (`dependsOn`, `requires`), and temporal order (`precedes`) **must be Directed Acyclic Graphs**. Cycles (e.g. $A \text{ precedes } B \land B \text{ precedes } A$) constitute fatal semantic errors and are caught by cycle detection algorithms (Tarjan's strongly connected components or DFS back-edge detection).
2. **Symmetry Consistency**:
   - For symmetric relations (`compatibleWith`, `alternativeTo`, `differsFrom`, `relatedTo`), asserting $u \xrightarrow{R} v$ implies $v \xrightarrow{R} u$ with identical semantics.
3. **Dual Closure (Bi-directional Invertibility)**:
   - For every directed relation $u \xrightarrow{\text{type}} v$, there exists a mandatory deterministic inverse relation $v \xrightarrow{\text{invType}} u$. If $u$ is loaded into the engine, $v$'s inverse inspector automatically renders $u$.

---

### 4.3 Engine Integration Implementation (Code-Level Blueprint)

The existing `SemanticKnowledgeEngine` in `D:\DocWebGlosary\app\js\semantic-engine.js` currently defines a 14-item partial mapping. To fully satisfy R4 with all 15 bidirectional pairs, the engine's `computeInverseRelations()` dictionary is upgraded to the canonical 15-pair matrix:

```javascript
// Canonical 15-Pair Bidirectional Relationship Map for SemanticKnowledgeEngine
const CANONICAL_RELATION_INVERSE_MAP = {
  // 1. Tipo / Subtipo
  'isTypeOf':        { type: 'hasSubtype',       label: 'Tiene como subtipo / técnica' },
  'hasSubtype':       { type: 'isTypeOf',         label: 'Es un tipo de' },
  // 2. Composición / Mereología
  'isPartOf':        { type: 'composedOf',       label: 'Se compone de' },
  'composedOf':       { type: 'isPartOf',         label: 'Es parte de' },
  // 3. Contención Espacial
  'contains':        { type: 'containedIn',      label: 'Está contenido en' },
  'containedIn':     { type: 'contains',         label: 'Contiene' },
  // 4. Especialización
  'specializesIn':   { type: 'moreGeneralThan',  label: 'Es más general que' },
  'moreGeneralThan': { type: 'specializesIn',    label: 'Se especializa en' },
  // 5. Dependencia
  'dependsOn':       { type: 'dependencyOf',     label: 'Es dependencia para' },
  'dependencyOf':    { type: 'dependsOn',        label: 'Depende de' },
  // 6. Requerimiento
  'requires':        { type: 'requiredBy',       label: 'Es requerido por' },
  'requiredBy':      { type: 'requires',         label: 'Requiere' },
  // 7. Secuencia Temporal
  'precedes':        { type: 'succeeds',         label: 'Sucede a / Viene después de' },
  'succeeds':        { type: 'precedes',         label: 'Precede a / Va antes de' },
  // 8. Producción / Causalidad
  'produces':        { type: 'producedBy',       label: 'Es producido por' },
  'producedBy':      { type: 'produces',         label: 'Produce' },
  // 9. Propósito / Uso
  'usedFor':         { type: 'uses',             label: 'Es empleado por' },
  'uses':            { type: 'usedFor',          label: 'Se utiliza para' },
  // 10. Compatibilidad (Simétrica)
  'compatibleWith':  { type: 'compatibleWith',   label: 'Es compatible recíprocamente con' },
  // 11. Alternativa (Simétrica)
  'alternativeTo':   { type: 'alternativeTo',    label: 'Es alternativa recíproca a' },
  // 12. Diferenciación (Simétrica)
  'differsFrom':     { type: 'differsFrom',      label: 'Se diferencia recíprocamente de' },
  // 13. Relación Asociativa (Simétrica)
  'relatedTo':       { type: 'relatedTo',        label: 'Está relacionado con' },
  // 14. Flujo de Datos - Entrada
  'hasInput':        { type: 'isInputTo',        label: 'Es parámetro de entrada para' },
  'isInputTo':       { type: 'hasInput',         label: 'Tiene como entrada' },
  // 15. Flujo de Datos - Salida
  'hasOutput':       { type: 'isOutputOf',       label: 'Es resultado u output de' },
  'isOutputOf':      { type: 'hasOutput',        label: 'Tiene como resultado' }
};
```

---

## 5. Pillar 4: Schema.org & Decoupled Multi-Glossary Architecture

### 5.1 Schema.org DefinedTermSet & DefinedTerm Structural Specification

The application integrates structured linked data matching Schema.org vocabulary without relying on remote network fetch operations. Every term renders an inline JSON-LD block and semantic HTML microdata.

#### Standard Schema.org JSON-LD Model:
```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "@id": "urn:term:audiovisual-production:profundidad-de-campo",
  "name": "Profundidad de Campo (Depth of Field)",
  "termCode": "profundidad-de-campo",
  "identifier": "urn:term:audiovisual-production:profundidad-de-campo",
  "url": "#/term/profundidad-de-campo",
  "inLanguage": "es",
  "description": "Zona del espacio por delante y por detrás del plano enfocado que se reproduce con nitidez aceptable en la imagen.",
  "disambiguatingDescription": "En cinematografía e imagen generativa con IA, la profundidad de campo (DoF) está gobernada por la apertura del diafragma (número f), la distancia focal del objetivo y la distancia física al sujeto. En modelos generativos de video (Sora, Runway Gen-3, Kling), se controla mediante tokens como 'shallow depth of field', 'f/1.4', 'creamy bokeh' o 'deep focus f/16'.",
  "alternateName": [
    "Depth of Field",
    "DoF",
    "Nitidez en profundidad"
  ],
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "@id": "urn:glossary:audiovisual-production",
    "name": "Glosario Semántico Canónico de Producción Audiovisual y Video con IA",
    "description": "Vocabulario formal, taxonomía de producción audiovisual, cinematografía y tokens de condicionamiento para modelos de video generativo.",
    "url": "./AudiovisualProduction/data/glossary.json"
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "category",
      "value": "Óptica y Cinematografía"
    },
    {
      "@type": "PropertyValue",
      "name": "level",
      "value": "fundamental"
    },
    {
      "@type": "PropertyValue",
      "name": "promptToken",
      "value": "shallow depth of field, f/1.4, rack focus, bokeh"
    }
  ],
  "subjectOf": [
    {
      "@type": "WebPageElement",
      "name": "Relaciones Semánticas Bidireccionales",
      "description": "Enlaces tipados resueltos en el grafo local de conocimiento."
    }
  ]
}
```

---

### 5.2 Decoupled Multi-Glossary Federation Architecture

To fulfill Requirement R7, the system decouples the core UI, search, relationship resolution, and storage engine from any single glossary dataset.

```
D:\DocWebGlosary\
├── app\
│   ├── css\
│   │   └── app.css                   (Universal WCAG 2.2 AA Stylesheet)
│   ├── data\
│   │   └── catalog.json              (Multi-Glossary Master Manifest)
│   └── js\
│       ├── app.js                    (Controller & UI Event Orchestrator)
│       ├── semantic-engine.js        (Graph Traversal & Inverse Computing)
│       └── storage.js                (Local Persistence, Revisions & Crypto)
├── AudiovisualProduction\             <-- NEW CANONICAL GLOSSARY
│   └── data\
│       ├── glossary.json             (Metadata, Categories, Schema)
│       └── terms.json                (Canonical Terms & Bidirectional Graph)
├── VideoImage\                       (Preexisting Digital Imaging Glossary)
│   └── data\
│       ├── glossary.json
│       └── terms.json
└── Render-3D-Animations\             (Preexisting 3D Graphics Glossary)
    └── data\
        ├── glossary.json
        └── terms.json
```

#### Multi-Glossary Master Manifest (`app/data/catalog.json` Extension):
```json
{
  "$schema": "./schema/glossaries-manifest.json",
  "version": "1.1.0",
  "systemTitle": "DOCWEB MULTIGLOSSARY",
  "description": "Sistema multiglosario semántico, local, persistente y extensible para consulta, exploración e investigación técnica.",
  "canonicalGlossaries": [
    {
      "id": "audiovisual-production",
      "slug": "audiovisual-production",
      "title": "Producción Audiovisual & Video con IA",
      "description": "Terminología integral de producción cinematográfica, lenguaje audiovisual, dirección de fotografía, montaje y tokens de ingeniería de prompts para modelos generativos de video.",
      "dataPath": "./AudiovisualProduction/data/terms.json",
      "metadataPath": "./AudiovisualProduction/data/glossary.json",
      "domain": "Audiovisual Production, Cinematography, Film Editing, AI Video Generation",
      "termCount": 185,
      "categories": [
        "Lenguaje Audiovisual y Planificación",
        "Óptica y Cinematografía",
        "Iluminación y Atmósfera",
        "Montaje y Postproducción",
        "Formatos y Tecnologías de Exportación",
        "Generación con IA y Prompts Cinemáticos",
        "Sonido y Sincronización Audiovisual"
      ]
    },
    {
      "id": "render-3d-animations",
      "slug": "render-3d-animations",
      "title": "Render & Animación 3D",
      "dataPath": "./Render-3D-Animations/data/terms.json",
      "metadataPath": "./Render-3D-Animations/data/glossary.json"
    },
    {
      "id": "video-image",
      "slug": "video-image",
      "title": "Video, Imagen & Gráficos Digitales",
      "dataPath": "./VideoImage/data/terms.json",
      "metadataPath": "./VideoImage/data/glossary.json"
    }
  ]
}
```

#### Cross-Glossary Federation Protocol:
- **Canonical URN Namespaces**: `urn:term:<glossary-id>:<term-slug>`.
- **Inter-Glossary Linking**: A term in `audiovisual-production` (e.g. `profundidad-de-campo`) links seamlessly to `urn:term:video-image:pixel` or `urn:term:render-3d-animations:shader`.
- **Automatic Namespace Resolution**: The `SemanticKnowledgeEngine` resolves cross-glossary targets automatically. When viewing a term in one glossary, inverse links originating from other glossaries are highlighted with a distinct badge (`badge-cross-glossary`), enabling knowledge discovery across domains.

---

### 5.3 Deterministic Local Persistence & Cryptographic Integrity

1. **Storage Subsystems**:
   - Primary: Static canonical JSON (`terms.json` per glossary) shipped locally for offline runtime reliability.
   - Secondary / Mutation Layer: Client-side `IndexedDB` (`DocWebMultiGlossaryDB`) managing user-added terms, editorial revisions, and product intention templates.
2. **Cryptographic Checksumming (SHA-256)**:
   - Every term mutation and capsule export generates a native SHA-256 digest via `window.crypto.subtle`.
   - On capsule import, the system recalculates and verifies all SHA-256 hashes, rejecting tampered or corrupted payloads.
3. **Zero Network Call Guarantee**:
   - Audited by `audit_autonomy.js`: No external URLs, CDN fonts, remote telemetry, or web service dependencies. All graph layouts, SVG diagrams, and JSON-LD payloads compute locally on the client CPU.

---

## 6. Implementation Blueprint & Actionable Deliverables

### 6.1 Downstream Agent Recommendations

| Agent / Subagent | Recommended Actions Based on This Research |
|---|---|
| **`spec_miner_terms`** | Mine the primary source (`mouseinteractivo.com`) and apply the 7 categories and 15-pair relationship schema defined herein. Integrate the expanded AI generative video terms into the unified list. |
| **`coder` / Implementer** | 1. Upgrade `semantic-engine.js` with the full 15-pair `CANONICAL_RELATION_INVERSE_MAP`.<br>2. Register `audiovisual-production` in `app/data/catalog.json`.<br>3. Implement the Audiovisual Product Intention Guidance tab/module in `app.js` and `index.html`.<br>4. Generate `AudiovisualProduction/data/glossary.json` and `terms.json`. |
| **`sentinel` / Verifier** | 1. Run `audit_autonomy.js` to verify zero network requests.<br>2. Run graph integrity test checking that every `rel.target` resolves to a real term ID without broken links.<br>3. Verify bidirectional inverse closure across all 15 relationship types.<br>4. Validate JSON-LD structures against Schema.org specs. |

---

## 7. Verification Method

To verify the findings and specifications in this report:
1. **Codebase Structural Consistency**:
   - Inspect `D:\DocWebGlosary\app\js\semantic-engine.js` lines 65-80 to verify preexisting 14 inverse relation pairs and confirm compatibility with the expanded 15 canonical pairs.
2. **Multi-Glossary Isolation**:
   - Verify `D:\DocWebGlosary\app\data\catalog.json` schema and validate that adding a new glossary node requires zero code changes to core rendering logic.
3. **Autonomy Audit Execution**:
   - Execute `node audit_autonomy.js` in `D:\DocWebGlosary` to confirm 100% offline compliance.
