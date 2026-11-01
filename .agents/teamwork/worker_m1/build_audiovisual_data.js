/**
 * Data Builder for Milestone 1: Audiovisual Knowledge Package & Catalog Registration
 * Generates:
 * 1. AudiovisualProduction/data/glossary.json
 * 2. AudiovisualProduction/data/terms.json
 * 3. Updates app/data/catalog.json
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../../../');
const SOURCE_FILE = path.join(ROOT_DIR, '.agents/teamwork/spec_miner_terms/catalog_177_enriched.json');
const TARGET_GLOSSARY = path.join(ROOT_DIR, 'AudiovisualProduction/data/glossary.json');
const TARGET_TERMS = path.join(ROOT_DIR, 'AudiovisualProduction/data/terms.json');
const TARGET_CATALOG = path.join(ROOT_DIR, 'app/data/catalog.json');

// Existing glossaries for cross-relation validation
const VIDEO_IMAGE_TERMS = path.join(ROOT_DIR, 'VideoImage/data/terms.json');
const RENDER_3D_TERMS = path.join(ROOT_DIR, 'Render-3D-Animations/data/terms.json');

const videoImageIds = new Set(JSON.parse(fs.readFileSync(VIDEO_IMAGE_TERMS, 'utf8')).canonicalTerms.map(t => t.id));
const render3DIds = new Set(JSON.parse(fs.readFileSync(RENDER_3D_TERMS, 'utf8')).canonicalTerms.map(t => t.id));

console.log(`Loaded ${videoImageIds.size} VideoImage IDs and ${render3DIds.size} Render3D IDs.`);

const rawTerms = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'));
console.log(`Loaded ${rawTerms.length} raw terms from catalog_177_enriched.json.`);

// 13 Canonical categories mapping
const categoryMapping = {
  'Preproducción & Planificación': 'preproduccion',
  'Dirección, Rodaje & Gestión de Set': 'direccion-narrativa',
  'Cámara, Encuadre & Movimiento': 'camara-movimiento',
  'Óptica, Enfoque & Composición': 'optica-lentes',
  'Iluminación, Exposición & Fotometría': 'iluminacion',
  'Audio Directo & Microfonía': 'audio-directo',
  'Montaje & Edición de Video': 'edicion-montaje',
  'Colorimetría, Espacios de Color & Monitoreo': 'color-etalonaje',
  'Postproducción de Sonido & Acústica': 'audio-postproduccion',
  'Efectos Visuales (VFX), Animación & Motion Graphics': 'vfx-composicion',
  'Entrega, Formatos Digitales & Distribución': 'distribucion-formatos',
  'Tecnología de Video, Señal & Códecs': 'tecnologia-infraestructura',
  'Inteligencia Artificial Audiovisual & Producción Virtual': 'ia-generacion-audiovisual'
};

const categoryLabels = {
  'preproduccion': 'Preproducción & Planificación',
  'direccion-narrativa': 'Dirección, Rodaje & Gestión de Set',
  'camara-movimiento': 'Cámara, Encuadre & Movimiento',
  'optica-lentes': 'Óptica, Enfoque & Composición',
  'iluminacion': 'Iluminación, Exposición & Fotometría',
  'audio-directo': 'Audio Directo & Microfonía',
  'edicion-montaje': 'Montaje & Edición de Video',
  'color-etalonaje': 'Colorimetría, Espacios de Color & Monitoreo',
  'audio-postproduccion': 'Postproducción de Sonido & Acústica',
  'vfx-composicion': 'Efectos Visuales (VFX) & Composición',
  'distribucion-formatos': 'Entrega, Formatos Digitales & Distribución',
  'tecnologia-infraestructura': 'Tecnología de Video, Señal & Códecs',
  'ia-generacion-audiovisual': 'Inteligencia Artificial Audiovisual & Generación'
};

// 8 Expanded AI Generative Video Terms (Feature 7)
const expandedAiTerms = [
  {
    id: 'conditioning',
    slug: 'conditioning',
    denomination: 'Acondicionamiento Multimodal (Conditioning en Video Generativo)',
    source_title: 'Conditioning Multimodal',
    category: 'ia-generacion-audiovisual',
    original_definition: 'Mecanismo que guía el proceso de desruidizado en modelos de difusión audiovisual mediante señales latentes derivadas de texto (T2V), imágenes fijas (I2V) o video de referencia (V2V).',
    extended_definition: 'El acondicionamiento opera proyectando representaciones semánticas multimodales (generadas por codificadores como CLIP o T5) en las capas de atención cruzada (cross-attention) del modelo de difusión. Define las restricciones semánticas, de composición espacial y de cadencia temporal para sintetizar fotogramas coherentes respetando la intención creativa.',
    components: [
      'Embeddings de texto (T5 / CLIP Text Encoders)',
      'Mapas de atención cruzada espaciotemporales (Cross-Attention)',
      'Proyección de tensores latentes (Latent Feature Projection)',
      'Multi-Motion Brushes con máscaras de segmentación'
    ],
    applications: [
      'Síntesis directa Text-to-Video (T2V) en alta resolución',
      'Animación guiada por imagen de referencia Image-to-Video (I2V)',
      'Restilizado y transferencia de movimiento Video-to-Video (V2V)'
    ],
    examples: [
      'Uso de un fotograma clave de alta resolución como condicionamiento inicial en Runway Gen-3 Alpha para preservar la apariencia facial del personaje durante un paneo de cámara.'
    ],
    synonyms: ['Conditioning', 'Condicionamiento Multimodal', 'Cross-Attention Guidance', 'Inyección Latente'],
    attributes: {
      'paradigma': 'Latent Diffusion Models (LDM / DiT)',
      'modos': 'T2V, I2V, V2V, Segment Inpainting',
      'capaOperativa': 'Cross-Attention y Convoluciones Espaciotemporales'
    },
    llm_prompt_guidance: "Palabras clave: 'multimodal conditioning, text-to-video guidance, image conditioning, first-frame reference, cross-attention latents'.",
    metadata: {
      source: 'ai_video_taxonomy_expansion',
      sourceIndex: 178,
      originalTitle: 'Conditioning Multimodal',
      curationStatus: 'original_editorial_smpte_ebu',
      verified: true
    },
    relations: [
      { type: 'specializesIn', target: 'urn:term:audiovisual-production:video-generativo', label: 'Especializa el mecanismo de' },
      { type: 'requires', target: 'urn:term:audiovisual-production:prompt', label: 'Requiere directivas de' },
      { type: 'dependsOn', target: 'urn:term:audiovisual-production:modelo-de-ia', label: 'Depende de la arquitectura de' },
      { type: 'compatibleWith', target: 'urn:term:video-image:color-gamut', label: 'Proyecta tensores compatibles con' }
    ]
  },
  {
    id: 'motion-vectors-ia',
    slug: 'motion-vectors-ia',
    denomination: 'Vectores de Movimiento en Video Generativo (Motion Vectors)',
    source_title: 'Motion Vectors IA',
    category: 'ia-generacion-audiovisual',
    original_definition: 'Representación matemática de la trayectoria, velocidad y desplazamiento de píxeles o parches latentes entre fotogramas sucesivos sintetizados por redes neuronales.',
    extended_definition: 'En arquitecturas como Sora o Runway Gen-3, los vectores de movimiento coordinan la traslación de la cámara virtual (pan, tilt, zoom, dolly) y el movimiento intrínseco de los sujetos, mitigando deformaciones plásticas y preservando la rigidez física de los objetos tridimensionales a lo largo de la toma.',
    components: [
      'Desplazamiento delta tridimensional (dx, dy, dz)',
      'Control de escala de movimiento (Motion Scale 1-10)',
      'Campo de flujo óptico bidireccional',
      'Segmentación por máscaras dinámicas de trayectoria'
    ],
    applications: [
      'Control cinematográfico de cámara en Director Mode',
      'Animación selectiva de elementos secundarios con pincel de movimiento',
      'Estabilización de trayectorias sintéticas y supresión de trepidación'
    ],
    examples: [
      'Asignación de un vector de movimiento lateral derecho (+3.5 dx) a un automóvil en movimiento mientras la cámara realiza un tracking paralelo a velocidad constante.'
    ],
    synonyms: ['Motion Vectors', 'Vectores de Movimiento', 'Flujo Óptico Latente', 'Motion Brush Controls'],
    attributes: {
      'representacion': 'Coordenadas vectoriales [dx, dy, dz] y magnitud escalar',
      'modelosCompatibles': 'Runway Gen-3, Pika 2.0, SVD Motion Bucket',
      'rangoTuning': 'Escala 1-10 o Motion Bucket 1-255'
    },
    llm_prompt_guidance: "Palabras clave: 'motion vectors, camera motion path, directional motion scale, optical flow tracking, smooth lateral vector'.",
    metadata: {
      source: 'ai_video_taxonomy_expansion',
      sourceIndex: 179,
      originalTitle: 'Motion Vectors IA',
      curationStatus: 'original_editorial_smpte_ebu',
      verified: true
    },
    relations: [
      { type: 'usedFor', target: 'urn:term:audiovisual-production:dolly-shot', label: 'Modela numéricamente el' },
      { type: 'usedFor', target: 'urn:term:audiovisual-production:tracking-shot', label: 'Controla el desplazamiento en' },
      { type: 'isPartOf', target: 'urn:term:audiovisual-production:video-generativo', label: 'Es componente dinámico de' },
      { type: 'dependsOn', target: 'urn:term:video-image:framerate', label: 'Se cuantifica en función de' }
    ]
  },
  {
    id: 'controlnet-video',
    slug: 'controlnet-video',
    denomination: 'ControlNet y Guiado Espaciotemporal (ControlNet Video)',
    source_title: 'ControlNet Video',
    category: 'ia-generacion-audiovisual',
    original_definition: 'Red neuronal complementaria que inyecta restricciones geométricas deterministas (mapas de profundidad, poses esqueléticas o bordes Canny) en modelos de difusión para video.',
    extended_definition: 'Desarrollado para condicionar la síntesis generativa preservando la pose de actores (OpenPose), la geometría de la escena (MiDaS/DPT Depth) o la coherencia de líneas arquitectónicas, evitando deformaciones corporales y manteniendo la continuidad espacial a lo largo de la secuencia.',
    components: [
      'Detector OpenPose (cinemática esquelética articular)',
      'Mapas de profundidad DPT / MiDaS',
      'Extractor de bordes Canny / LineArt',
      'Capas de convolución cero (Zero-Convolutions)'
    ],
    applications: [
      'Preservación de coreografías humanas y gesticulación',
      'Generación de fondos arquitectónicos controlados geométricamente',
      'Transferencia de movimiento de actor real hacia personaje sintético'
    ],
    examples: [
      'Extracción de la pose de un bailarín mediante OpenPose para guiar la generación de un androide en Kling AI sin perder la sincronización con el tempo musical.'
    ],
    synonyms: ['ControlNet', 'Guiado Estructural', 'Spatial Conditioning Backbone', 'ControlNet Temporal'],
    attributes: {
      'modalidades': 'OpenPose, Depth, Canny, Normal Map, SoftEdge',
      'implementacion': 'ComfyUI, Automatic1111, AnimateDiff',
      'pesoGuia': 'Valores normalizados de 0.0 a 2.0 (Guidance Scale)'
    },
    llm_prompt_guidance: "Palabras clave: 'ControlNet video guidance, OpenPose skeletal tracking, depth map conditioning, geometric edge retention'.",
    metadata: {
      source: 'ai_video_taxonomy_expansion',
      sourceIndex: 180,
      originalTitle: 'ControlNet Video',
      curationStatus: 'original_editorial_smpte_ebu',
      verified: true
    },
    relations: [
      { type: 'compatibleWith', target: 'urn:term:audiovisual-production:motion-capture', label: 'Se complementa con datos de' },
      { type: 'alternativeTo', target: 'urn:term:audiovisual-production:rotoscopia-automatica', label: 'Automatiza el enmascaramiento frente a' },
      { type: 'uses', target: 'urn:term:render-3d-animations:skeletal-animation', label: 'Alinea sus predicciones con el esqueleto de' }
    ]
  },
  {
    id: 'temporal-coherence',
    slug: 'temporal-coherence',
    denomination: 'Coherencia Temporal y Mitigación de Flicker (Temporal Coherence)',
    source_title: 'Temporal Coherence',
    category: 'ia-generacion-audiovisual',
    original_definition: 'Propiedad de un video generado por IA donde las texturas, iluminación, geometría y rasgos de identidad se mantienen estables entre fotogramas consecutivos sin oscilación ni parpadeo.',
    extended_definition: 'La coherencia temporal es el mayor reto en modelos de difusión de video. Técnicas como FreeInit (filtrado de ruido en el dominio frecuencial), atención espaciotemporal tridimensional y regularización de flujo óptico evitan el parpadeo de texturas (flicker) y la degradación acumulada (latent drift).',
    components: [
      'Atención cruzada temporal (Temporal Cross-Attention)',
      'Filtro de ruido en frecuencia FreeInit',
      'Estimación de flujo óptico bidireccional RIFE/FILM',
      'Invarianza de latentes y estabilización de varianza'
    ],
    applications: [
      'Producción cinematográfica y spots de alta gama sin artefactos de morphing',
      'Animación publicitaria de producto preservando logotipos y tipografía',
      'Planos secuencia generativos de larga duración'
    ],
    examples: [
      'Aplicación de FreeInit en AnimateDiff con 4 iteraciones para eliminar por completo el parpadeo de textura en el tejido del traje de un actor virtual.'
    ],
    synonyms: ['Temporal Coherence', 'Coherencia Temporal', 'Estabilidad Intercuadro', 'Flicker Mitigation'],
    attributes: {
      'metricaEvaluacion': 'Warping Error, Fréchet Video Distance (FVD)',
      'metodosMitigacion': 'FreeInit, Temporal Attention Layers, Latent Smoothing',
      'artefactosEvitados': 'Flicker, limb morphing, texture bubbling'
    },
    llm_prompt_guidance: "Palabras clave: 'temporal coherence, zero flicker, temporally stable video, consistent lighting and texture, FreeInit filter'.",
    metadata: {
      source: 'ai_video_taxonomy_expansion',
      sourceIndex: 181,
      originalTitle: 'Temporal Coherence',
      curationStatus: 'original_editorial_smpte_ebu',
      verified: true
    },
    relations: [
      { type: 'requires', target: 'urn:term:audiovisual-production:video-generativo', label: 'Es requisito de calidad en' },
      { type: 'dependsOn', target: 'urn:term:audiovisual-production:fps-frame-rate', label: 'Se evalúa en base a la tasa de' },
      { type: 'compatibleWith', target: 'urn:term:video-image:framerate', label: 'Armoniza con la frecuencia de' }
    ]
  },
  {
    id: 'seed-reproducibilidad',
    slug: 'seed-reproducibilidad',
    denomination: 'Semilla Determinista y Latent Walk (Seed & Latent Walking)',
    source_title: 'Seed & Latent Walk',
    category: 'ia-generacion-audiovisual',
    original_definition: 'Valor numérico entero que inicializa el generador de números pseudoaleatorios para fijar el patrón de ruido gaussiano base en la síntesis generativa.',
    extended_definition: 'Fijar la semilla permite reproducir exactamente una toma generada o realizar variaciones controladas alterando únicamente parámetros secundarios. El latent walk o interpolación esférica (Slerp) entre dos semillas permite transiciones morfológicas continuas y sin saltos abruptos entre escenas.',
    components: [
      'Generador pseudoaleatorio determinista (PRNG)',
      'Matriz de ruido gaussiano inicial de alta dimensionalidad',
      'Interpolación esférica de latentes (Slerp)',
      'Muestreo por descenso de gradiente (Euler, DPM++ 2M)'
    ],
    applications: [
      'Iteración técnica controlada modificando palabras clave individuales',
      'Storyboards consistentes con encuadres e iluminación idénticos',
      'Transiciones conceptuales fluidas en videoclips y visuales en directo'
    ],
    examples: [
      'Fijar seed: 84920412 en ComfyUI variando únicamente el valor de obturación del prompt para comprobar cambios en el desenfoque de movimiento.'
    ],
    synonyms: ['Seed', 'Semilla Determinista', 'Latent Walk', 'Slerp Interpolation'],
    attributes: {
      'tipoDato': 'Entero de 64 bits (0 a 18446744073709551615)',
      'algoritmoInterpolacion': 'Spherical Linear Interpolation (SLERP)',
      'proposito': 'Determinismo experimental y control estocástico'
    },
    llm_prompt_guidance: "Palabras clave: 'deterministic seed, reproducible latent noise, latent walk transition, slerp interpolation, seed travel'.",
    metadata: {
      source: 'ai_video_taxonomy_expansion',
      sourceIndex: 182,
      originalTitle: 'Seed & Latent Walk',
      curationStatus: 'original_editorial_smpte_ebu',
      verified: true
    },
    relations: [
      { type: 'usedFor', target: 'urn:term:audiovisual-production:prompt', label: 'Garantiza la reproducibilidad de' },
      { type: 'isPartOf', target: 'urn:term:audiovisual-production:video-generativo', label: 'Inicializa el espacio latente de' },
      { type: 'compatibleWith', target: 'urn:term:render-3d-animations:keyframe', label: 'Permite fijar estados clave análogos a' }
    ]
  },
  {
    id: 'diffusion-transformer-video',
    slug: 'diffusion-transformer-video',
    denomination: 'Diffusion Transformer para Video (DiT Spatiotemporal)',
    source_title: 'Diffusion Transformer Video',
    category: 'ia-generacion-audiovisual',
    original_definition: 'Arquitectura de aprendizaje profundo que sustituye la red UNet tradicional por bloques Transformer que operan sobre parches espaciotemporales tridimensionales de video latente.',
    extended_definition: 'Pionera en OpenAI Sora y adoptada en modelos como Wan 2.1 y CogVideoX, esta arquitectura tokeniza el volumen de video en pequeños cubos espaciotemporales, permitiendo escalar el cómputo y modelar interacciones físicas complejas, iluminación volumétrica y cinemática realista con mayor fidelidad.',
    components: [
      'Parches tridimensionales latentes (3D Latent Patches)',
      'Bloques Self-Attention y Cross-Attention espaciotemporales',
      'Autoencoder Variacional temporal (Spatiotemporal VAE)',
      'Embeddings posicionales rotacionales 3D (RoPE)'
    ],
    applications: [
      'Generación de video nativo en resolución Full HD y 4K',
      'Simulaciones físicas fotorrealistas de fluidos, telas y gravedad',
      'Secuencias continuas de plano largo de hasta 60 segundos'
    ],
    examples: [
      'Procesamiento de un plano de 5 segundos a 1080p descompuesto en parches latentes analizados concurrentemente por capas de atención transformer en Sora.'
    ],
    synonyms: ['DiT', 'Diffusion Transformer', 'Spatiotemporal Video Transformer', 'Transformer de Difusión'],
    attributes: {
      'arquitectura': 'Transformer Backbone reemplazando 2D/3D UNet',
      'escalabilidad': 'Leyes de escalado directo (Scaling Laws) proporcionales a FLOPs',
      'resolucionSoportada': 'Resolución y aspect ratio arbitrario nativo'
    },
    llm_prompt_guidance: "Palabras clave: 'Diffusion Transformer DiT, spatiotemporal patch attention, neural video rendering, physical world simulation'.",
    metadata: {
      source: 'ai_video_taxonomy_expansion',
      sourceIndex: 183,
      originalTitle: 'Diffusion Transformer Video',
      curationStatus: 'original_editorial_smpte_ebu',
      verified: true
    },
    relations: [
      { type: 'specializesIn', target: 'urn:term:audiovisual-production:modelo-de-ia', label: 'Es arquitectura avanzada de' },
      { type: 'produces', target: 'urn:term:audiovisual-production:video-generativo', label: 'Sintetiza tomas de' },
      { type: 'produces', target: 'urn:term:video-image:pixel', label: 'Genera matrices continuas de' }
    ]
  },
  {
    id: 'frame-interpolation-ia',
    slug: 'frame-interpolation-ia',
    denomination: 'Interpolación Temporal de Cuadros por IA (RIFE / FILM)',
    source_title: 'Interpolación por IA',
    category: 'ia-generacion-audiovisual',
    original_definition: 'Síntesis neuronal de fotogramas intermedios entre dos cuadros consecutivos mediante la estimación bidireccional de flujo óptico y extracción multiescala de características.',
    extended_definition: 'Modelos como RIFE (Real-Time Intermediate Flow Estimation) y FILM (Frame Interpolation for Large Motion) permiten elevar metrajes generados a 12 o 24 fps hasta 60 o 120 fps con fluidez cinematográfica, resolviendo grandes desplazamientos de objetos y oclusiones complejas sin crear halos ni artefactos de doble silueta.',
    components: [
      'Red de flujo óptico bidireccional en tiempo real',
      'Módulo de síntesis y refinamiento de contexto visual',
      'Malla de deformación de características (Feature Warping)',
      'Detector y supresor de artefactos de oclusión y borde'
    ],
    applications: [
      'Conversión de tomas estándar a cámara lenta hiperfluida en postproducción',
      'Elevación de fluidez en animaciones generativas con frame rate nativo bajo',
      'Remasterización y restauración de material de archivo histórico'
    ],
    examples: [
      'Interpolación de un clip generado por Runway a 16 fps hacia 60 fps usando RIFE v4.6 para integrarlo en una línea de tiempo broadcast de 59.94p sin saltos.'
    ],
    synonyms: ['Frame Interpolation', 'RIFE', 'FILM', 'Interpolación Neuronal de Cuadros'],
    attributes: {
      'modelosLideres': 'RIFE v4.6, FILM (Google Research), IFRNet',
      'factorMultiplicador': '2x, 4x, 8x de velocidad de cuadros',
      'latencia': 'Aceleración TensorRT en tiempo real para 1080p'
    },
    llm_prompt_guidance: "Palabras clave: 'AI frame interpolation, RIFE 60fps smoothing, motion compensated frame rate conversion, fluid 120fps motion'.",
    metadata: {
      source: 'ai_video_taxonomy_expansion',
      sourceIndex: 184,
      originalTitle: 'Interpolación por IA',
      curationStatus: 'original_editorial_smpte_ebu',
      verified: true
    },
    relations: [
      { type: 'usedFor', target: 'urn:term:audiovisual-production:camara-lenta', label: 'Genera cuadros intermedios para' },
      { type: 'usedFor', target: 'urn:term:audiovisual-production:slow-motion', label: 'Aumenta la fluidez en' },
      { type: 'compatibleWith', target: 'urn:term:video-image:framerate', label: 'Multiplica la tasa de cuadros de' }
    ]
  },
  {
    id: 'ip-adapter-video',
    slug: 'ip-adapter-video',
    denomination: 'IP-Adapter y Consistencia de Identidad (IP-Adapter Video)',
    source_title: 'IP-Adapter Video',
    category: 'ia-generacion-audiovisual',
    original_definition: 'Mecanismo desacoplado de atención cruzada que proyecta características visuales extraídas de imágenes de referencia hacia el modelo de difusión sin reentrenar sus pesos base.',
    extended_definition: 'En flujos de trabajo de video como AnimateDiff o ComfyUI, IP-Adapter (y variantes como FaceID) permite fijar la vestimenta, fisionomía facial o identidad de marca de un personaje a partir de una única fotografía, garantizando que el actor mantenga sus rasgos inalterados en planos generales, primeros planos y distintos ángulos de cámara.',
    components: [
      'Codificador visual multiescala (CLIP Vision / InsightFace)',
      'Capas de proyección desacopladas de atención cruzada',
      'Atención cruzada especializada para imágenes (Image Cross-Attention)',
      'Ponderador adaptativo de influencia (Weight Scale 0.0 - 1.5)'
    ],
    applications: [
      'Continuidad dramática de personajes a través de múltiples tomas y escenas',
      'Inserción de productos de marca exactos en videos publicitarios generados',
      'Puesta en escena virtual con actores recurrentes y coherencia de estilismo'
    ],
    examples: [
      'Condicionamiento de una secuencia de 10 planos con IP-Adapter FaceID para asegurar que la protagonista mantenga sus rasgos faciales exactos en cada toma.'
    ],
    synonyms: ['IP-Adapter', 'Image Prompt Adapter', 'Consistencia de Personaje', 'FaceID'],
    attributes: {
      'arquitectura': 'Decoupled Cross-Attention Mechanism',
      'encodersCompatibles': 'OpenCLIP-ViT-H/14, InsightFace antelopev2',
      'ventajaClave': 'Cero fine-tuning sobre los pesos fundamentales del modelo'
    },
    llm_prompt_guidance: "Palabras clave: 'IP-Adapter identity consistency, character continuity across shots, decoupled cross-attention reference, visual prompt adherence'.",
    metadata: {
      source: 'ai_video_taxonomy_expansion',
      sourceIndex: 185,
      originalTitle: 'IP-Adapter Video',
      curationStatus: 'original_editorial_smpte_ebu',
      verified: true
    },
    relations: [
      { type: 'usedFor', target: 'urn:term:audiovisual-production:casting', label: 'Fija la apariencia del actor en el' },
      { type: 'compatibleWith', target: 'urn:term:audiovisual-production:avatar-digital', label: 'Garantiza la coherencia visual de' },
      { type: 'compatibleWith', target: 'urn:term:render-3d-animations:pbr', label: 'Alinea los mapas de reflectancia con' }
    ]
  }
];

// All valid audiovisual slugs
const allAudiovisualSlugs = new Set([
  ...rawTerms.map(t => t.id),
  ...expandedAiTerms.map(t => t.slug)
]);

console.log(`Total canonical audiovisual slugs registered: ${allAudiovisualSlugs.size}`);

// Helper to extract clean prompt tokens from llm_prompt_guidance string
function extractPromptTokens(guidanceStr) {
  if (!guidanceStr) return [];
  const match = guidanceStr.match(/'([^']+)'/);
  if (match && match[1]) {
    return match[1].split(',').map(s => s.trim()).filter(Boolean);
  }
  return [];
}

// Category-based negative tokens for artifact suppression in video/audio generation
function getNegativeTokens(category) {
  const common = ['low quality', 'watermark', 'jpeg artifacts', 'blurry', 'compression noise'];
  switch (category) {
    case 'camara-movimiento':
      return [...common, 'shaky camera', 'unintentional tilt', 'frame jitter', 'motion blur artifacts', 'abrupt camera jump'];
    case 'optica-lentes':
      return [...common, 'severe chromatic aberration', 'distorted perspective', 'uncontrolled barrel distortion', 'muddy bokeh'];
    case 'iluminacion':
      return [...common, 'blown out highlights', 'crushed shadows', 'harsh clipping', 'uneven flicker', 'color cast'];
    case 'audio-directo':
    case 'audio-postproduccion':
      return ['audio clipping', 'distortion', 'background hum', 'muffled speech', 'reverb mud', 'phase cancellation'];
    case 'color-etalonaje':
      return [...common, 'color banding', 'posterization', 'oversaturated skin tones', 'clipped gamuts', 'noise floor'];
    case 'edicion-montaje':
      return [...common, 'jump cut', 'bad timing', 'raccord break', 'frame stutter', 'inconsistent pacing'];
    case 'vfx-composicion':
      return [...common, 'green spill', 'halo edges', 'matte line', 'bad tracking slip', 'alpha fringing'];
    case 'ia-generacion-audiovisual':
      return [...common, 'temporal flicker', 'limb morphing', 'floating limbs', 'deformed anatomy', 'latent drift', 'face distortion'];
    default:
      return [...common, 'inconsistent lighting', 'temporal warping', 'unwanted text overlay'];
  }
}

// Semantic relations mapper for inferred_semantic keys in catalog_177_enriched.json
function mapInferredRelationType(key) {
  const k = key.toLowerCase().trim();
  if (k === 'es_un_tipo_de' || k === 'es_una_variante_de') return 'isTypeOf';
  if (k === 'se_compone_de' || k === 'incluye' || k === 'incorpora') return 'composedOf';
  if (k === 'es_parte_de' || k === 'forma_parte_de') return 'isPartOf';
  if (k === 'contiene' || k === 'alberga') return 'contains';
  if (k === 'depende_de' || k === 'deriva_de') return 'dependsOn';
  if (k === 'requiere' || k === 'exige' || k === 'es_un_requisito_de') return 'requires';
  if (k === 'precede_a' || k === 'inicia_el') return 'precedes';
  if (k === 'sucede_a' || k === 'sigue_a') return 'succeeds';
  if (k === 'produce' || k === 'genera' || k === 'origina') return 'produces';
  if (k === 'es_producido_por') return 'producedBy';
  if (k === 'se_utiliza_para' || k === 'se_aplica_en' || k === 'permite' || k === 'facilita') return 'usedFor';
  if (k === 'utiliza' || k === 'emplea') return 'uses';
  if (k === 'es_compatible_con' || k === 'se_integra_con' || k === 'se_combina_con' || k === 'se_conecta_con') return 'compatibleWith';
  if (k === 'es_alternativa_a' || k === 'sustituye_a' || k === 'es_equivalente_a') return 'alternativeTo';
  if (k === 'se_diferencia_de' || k === 'se_opone_a') return 'differsFrom';
  return 'relatedTo';
}

// Specific Cross-Glossary Relations to VideoImage and Render-3D-Animations
const crossGlossaryMap = {
  'codec': [
    { type: 'specializesIn', target: 'urn:term:video-image:video-codec', label: 'Especialización del estándar' }
  ],
  'prores-h-264-h-265': [
    { type: 'isTypeOf', target: 'urn:term:video-image:video-codec', label: 'Implementación de códec' }
  ],
  'fps-frame-rate': [
    { type: 'specializesIn', target: 'urn:term:video-image:framerate', label: 'Frecuencia temporal base' }
  ],
  'tasa-de-fotogramas': [
    { type: 'relatedTo', target: 'urn:term:video-image:framerate', label: 'Correspondencia conceptual con' }
  ],
  'hdr': [
    { type: 'specializesIn', target: 'urn:term:video-image:hdr-image', label: 'Implementa el formato' }
  ],
  'resolucion': [
    { type: 'composedOf', target: 'urn:term:video-image:pixel', label: 'Se cuantifica en píxeles' }
  ],
  'uhd-4k-vs-dci-4k': [
    { type: 'dependsOn', target: 'urn:term:video-image:pixel', label: 'Define su densidad en' }
  ],
  'rec-709': [
    { type: 'specializesIn', target: 'urn:term:video-image:color-gamut', label: 'Especifica la gama cromática' }
  ],
  'aces': [
    { type: 'specializesIn', target: 'urn:term:video-image:color-space', label: 'Estándar de espacio de color' }
  ],
  'raw': [
    { type: 'dependsOn', target: 'urn:term:video-image:bayer-filter', label: 'Procede directamente del sensor con' }
  ],
  'etalonaje-color-grading': [
    { type: 'uses', target: 'urn:term:video-image:color-space', label: 'Transforma coordenadas cromáticas en' }
  ],
  'renderizado': [
    { type: 'isTypeOf', target: 'urn:term:render-3d-animations:rendering-pipeline', label: 'Fase central del pipeline' }
  ],
  'animacion-2d-3d': [
    { type: 'uses', target: 'urn:term:render-3d-animations:rasterization', label: 'Rasterización y síntesis gráfica' }
  ],
  'volumen-led': [
    { type: 'requires', target: 'urn:term:render-3d-animations:ray-tracing', label: 'Requiere trazado de rayos en tiempo real' }
  ],
  'produccion-virtual': [
    { type: 'uses', target: 'urn:term:render-3d-animations:rendering-pipeline', label: 'Pipeline de renderizado en vivo' }
  ],
  'render-en-tiempo-real': [
    { type: 'uses', target: 'urn:term:render-3d-animations:shader', label: 'Computa sombreado dinámico con' }
  ],
  'motion-capture': [
    { type: 'usedFor', target: 'urn:term:render-3d-animations:skeletal-animation', label: 'Alimenta datos para' }
  ],
  'vfx': [
    { type: 'uses', target: 'urn:term:render-3d-animations:rendering-pipeline', label: 'Se integra en el pipeline de' }
  ],
  'keyframe': [
    { type: 'relatedTo', target: 'urn:term:render-3d-animations:keyframe', label: 'Cuadro clave homólogo en 3D' }
  ],
  'rotoscopia': [
    { type: 'uses', target: 'urn:term:video-image:convolution-filter', label: 'Aplica filtros de convolución y bordes' }
  ]
};

// Process all 177 terms from raw data
const processedTerms = rawTerms.map(raw => {
  const slug = raw.id;
  const canonicalCategory = categoryMapping[raw.category] || 'tecnologia-infraestructura';
  const categoryLabel = categoryLabels[canonicalCategory] || raw.category;

  // Build rigorous definitions
  const def = raw.original_definition;
  const visualDesc = raw.visual_specification && raw.visual_specification.visual_description ? ` ${raw.visual_specification.visual_description}` : '';
  const extendedDef = `${def} ${raw.context_of_use}.${visualDesc}`;

  // Structured components derivation
  const components = [];
  if (raw.synonyms && raw.synonyms.length > 0) {
    components.push(`Denominaciones técnicas alternativas: ${raw.synonyms.join(', ')}`);
  }
  if (raw.phases && raw.phases.length > 0) {
    components.push(`Fases operativas de producción: ${raw.phases.join(', ')}`);
  }
  if (raw.context_of_use) {
    components.push(`Entorno de aplicación técnica: ${raw.context_of_use}`);
  }

  // Practical applications
  const applications = [];
  if (raw.context_of_use) applications.push(raw.context_of_use);
  applications.push(`Integración en flujo de trabajo de ${categoryLabel.toLowerCase()}`);

  // Concrete examples
  const examples = [];
  if (raw.illustrative_example) examples.push(raw.illustrative_example);

  // Synonyms
  const synonyms = Array.isArray(raw.synonyms) ? [...raw.synonyms] : [];
  if (raw.source_title && !synonyms.includes(raw.source_title)) {
    synonyms.push(raw.source_title);
  }

  // Relations processing
  const relations = [];
  const seenTargets = new Set();

  function addRelation(type, target, label, note = '') {
    if (!target) return;
    if (target === `urn:term:audiovisual-production:${slug}`) return; // prevent self-loop
    const key = `${type}:${target}`;
    if (!seenTargets.has(key)) {
      seenTargets.add(key);
      relations.push({ type, target, label: label || 'Relación semántica', note });
    }
  }

  // 1. Explicit source relations
  if (raw.relationships && Array.isArray(raw.relationships.explicit_source)) {
    for (const rel of raw.relationships.explicit_source) {
      if (rel.slug && allAudiovisualSlugs.has(rel.slug)) {
        addRelation('relatedTo', `urn:term:audiovisual-production:${rel.slug}`, rel.name || 'Término relacionado en fuente', 'Referencia documentada en el glosario profesional');
      }
    }
  }

  // 2. Inferred semantic relations
  if (raw.relationships && raw.relationships.inferred_semantic) {
    for (const [infKey, targetSlugs] of Object.entries(raw.relationships.inferred_semantic)) {
      if (Array.isArray(targetSlugs)) {
        const mappedType = mapInferredRelationType(infKey);
        for (const tSlug of targetSlugs) {
          if (allAudiovisualSlugs.has(tSlug)) {
            addRelation(mappedType, `urn:term:audiovisual-production:${tSlug}`, infKey.replace(/_/g, ' '), 'Relación semántica inferida por ontología');
          }
        }
      }
    }
  }

  // 3. Cross-glossary relations
  if (crossGlossaryMap[slug]) {
    for (const cr of crossGlossaryMap[slug]) {
      addRelation(cr.type, cr.target, cr.label, 'Enlace transversal inter-glosario');
    }
  }

  // Prompt engineering guidance
  const promptTokens = extractPromptTokens(raw.llm_prompt_guidance);
  const negativeTokens = getNegativeTokens(canonicalCategory);

  return {
    id: `urn:term:audiovisual-production:${slug}`,
    slug: slug,
    title: raw.denomination || raw.source_title,
    category: canonicalCategory,
    categoryLabel: categoryLabel,
    definition: def,
    shortDefinition: def,
    extendedDefinition: extendedDef,
    fullDefinition: extendedDef,
    components: components,
    applications: applications,
    examples: examples,
    synonyms: synonyms,
    attributes: {
      'faseProduccion': (raw.phases || ['General']).join(', '),
      'categoriaCanon': categoryLabel,
      'fuenteIndice': `Entrada #${raw.index} de 177`
    },
    level: 'professional',
    status: 'canonical',
    aiPromptGuidance: {
      relevance: 'Término aplicable a especificaciones de rodaje, montaje y generación con IA multimodal.',
      promptTokens: promptTokens,
      negativeTokens: negativeTokens,
      modelCompatibility: ['Runway Gen-3', 'OpenAI Sora', 'Kling AI', 'Luma Dream Machine', 'Midjourney v6']
    },
    metadata: {
      source: 'mouseinteractivo',
      sourceIndex: raw.index,
      originalTitle: raw.source_title,
      curationStatus: 'original_editorial_smpte_ebu',
      verified: true
    },
    relations: relations
  };
});

// Process expanded AI terms
const processedExpandedAiTerms = expandedAiTerms.map(ai => {
  const slug = ai.slug;
  const canonicalCategory = ai.category;
  const categoryLabel = categoryLabels[canonicalCategory];
  const promptTokens = extractPromptTokens(ai.llm_prompt_guidance);
  const negativeTokens = getNegativeTokens(canonicalCategory);

  const relations = [];
  const seenTargets = new Set();

  function addRelation(type, target, label, note = '') {
    if (!target) return;
    if (target === `urn:term:audiovisual-production:${slug}`) return;
    const key = `${type}:${target}`;
    if (!seenTargets.has(key)) {
      seenTargets.add(key);
      relations.push({ type, target, label: label || 'Relación semántica', note });
    }
  }

  for (const rel of ai.relations) {
    addRelation(rel.type, rel.target, rel.label, 'Expansión taxonómica de IA audiovisual');
  }

  return {
    id: `urn:term:audiovisual-production:${slug}`,
    slug: slug,
    title: ai.denomination,
    category: canonicalCategory,
    categoryLabel: categoryLabel,
    definition: ai.original_definition,
    shortDefinition: ai.original_definition,
    extendedDefinition: ai.extended_definition,
    fullDefinition: ai.extended_definition,
    components: ai.components,
    applications: ai.applications,
    examples: ai.examples,
    synonyms: ai.synonyms,
    attributes: ai.attributes,
    level: 'professional',
    status: 'canonical',
    aiPromptGuidance: {
      relevance: 'Término nuclear para el direccionamiento y acondicionamiento de modelos generativos de video/audio.',
      promptTokens: promptTokens,
      negativeTokens: negativeTokens,
      modelCompatibility: ['Runway Gen-3', 'OpenAI Sora', 'Kling AI', 'Luma Dream Machine', 'ComfyUI']
    },
    metadata: ai.metadata,
    relations: relations
  };
});

// Final list of all terms
const allTermsList = [...processedTerms, ...processedExpandedAiTerms];
console.log(`Total final terms compiled: ${allTermsList.length} (177 base + ${processedExpandedAiTerms.length} expanded)`);

// 1. Build AudiovisualProduction/data/glossary.json
const glossaryJson = {
  id: 'audiovisual-production',
  slug: 'audiovisual-production',
  title: 'Producción Audiovisual & Terminología de Video',
  version: '1.0.0',
  description: 'Glosario canónico profesional de producción audiovisual, dirección cinematográfica, iluminación, sonido directo y postproducción, montaje, etalonaje y generación con inteligencia artificial multimodal.',
  created: '2026-11-01T02:00:00Z',
  updated: '2026-11-01T02:00:00Z',
  license: 'Local Knowledge Base - Internal Project Use',
  author: 'DocWeb Knowledge Engineering Team',
  domain: 'Audiovisual Production, Cinematography, Sound Engineering, Video Postproduction, Multimodal AI',
  termCount: allTermsList.length,
  categories: Object.values(categoryMapping).filter((v, i, a) => a.indexOf(v) === i),
  categoryDetails: {
    'preproduccion': {
      name: 'Preproducción & Planificación',
      description: 'Fase analítica y estratégica previa al rodaje: guion literario y técnico, desglose, presupuesto, casting y cronograma.'
    },
    'direccion-narrativa': {
      name: 'Dirección, Rodaje & Gestión de Set',
      description: 'Puesta en escena dramática, coordinación del set, manejo de actores, orden de rodaje y autoridad cinematográfica.'
    },
    'camara-movimiento': {
      name: 'Cámara, Encuadre & Movimiento',
      description: 'Gramática del lenguaje cinematográfico visual, escala de planos, trayectorias espaciales, dolly, grúa y steadicam.'
    },
    'optica-lentes': {
      name: 'Óptica, Enfoque & Composición',
      description: 'Distancia focal, campo de visión, profundidad de campo, enfoque selectivo, bokeh y principios de composición geométrica.'
    },
    'iluminacion': {
      name: 'Iluminación, Exposición & Fotometría',
      description: 'Modelado volumétrico de luz, ratio de contraste, iluminación de tres puntos, fotometría y triángulo de exposición.'
    },
    'audio-directo': {
      name: 'Audio Directo & Microfonía',
      description: 'Captura acústica en set, micrófonos de caña y solapa, preamplificación, código de tiempo y sincronización fónica.'
    },
    'edicion-montaje': {
      name: 'Edición, Montaje & Flujo Editorial',
      description: 'Corte de metraje, continuidad espaciotemporal (raccord), ritmo narrativo, NLE y sincronización de material A-Roll/B-Roll.'
    },
    'color-etalonaje': {
      name: 'Colorimetría, Espacios de Color & Etalonaje',
      description: 'Gradación de color, curvas tonales, tablas de consulta (LUT), curvas Log y espacios amplios (ACES, Rec.709, Rec.2020).'
    },
    'audio-postproduccion': {
      name: 'Postproducción de Sonido & Acústica',
      description: 'Diseño sonoro, efectos de sala (Foley), regrabación de diálogo (ADR), mezclas multicanal inmersivas y estándares LUFS.'
    },
    'vfx-composicion': {
      name: 'Efectos Visuales (VFX) & Composición',
      description: 'Integración fotográfica de elementos CGI y acción real, rotoscopia, chroma key, tracking 3D y pintura mate digital.'
    },
    'distribucion-formatos': {
      name: 'Entrega, Formatos Digitales & Distribución',
      description: 'Paquetes finales de entrega (deliverables), especificaciones técnicas para streaming, accesibilidad y formatos verticales.'
    },
    'tecnologia-infraestructura': {
      name: 'Tecnología de Video, Señal & Códecs',
      description: 'Estructuras de compresión intra/intercuadro, tasa de bits, contenedores multimedia, transporte de video y muestreo cromático.'
    },
    'ia-generacion-audiovisual': {
      name: 'Inteligencia Artificial Audiovisual & Generación',
      description: 'Diffusion Transformers, condicionamiento multimodal, vectores de movimiento, interpolación neuronal y modelos generativos.'
    }
  }
};

// 2. Build AudiovisualProduction/data/terms.json
const termsData = {
  id: 'audiovisual-production',
  title: 'Producción Audiovisual & Terminología de Video',
  slug: 'audiovisual-production',
  version: '1.0.0',
  description: 'Glosario canónico profesional de producción audiovisual, cinematografía, iluminación, sonido directo y postproducción, montaje, etalonaje y generación con inteligencia artificial multimodal.',
  language: 'es',
  license: 'Local Knowledge Base - Internal Project Use',
  canonicalTerms: allTermsList
};

// 3. Update app/data/catalog.json preserving existing entries
const currentCatalog = JSON.parse(fs.readFileSync(TARGET_CATALOG, 'utf8'));
const existingGlossaries = currentCatalog.canonicalGlossaries.filter(g => g.id !== 'audiovisual-production');

const audiovisualCatalogEntry = {
  id: 'audiovisual-production',
  slug: 'audiovisual-production',
  title: 'Producción Audiovisual & Terminología de Video',
  description: 'Glosario canónico profesional de producción audiovisual, cinematografía, iluminación, sonido directo y postproducción, montaje, etalonaje y generación con inteligencia artificial multimodal.',
  dataPath: './AudiovisualProduction/data/terms.json',
  metadataPath: './AudiovisualProduction/data/glossary.json',
  domain: 'Audiovisual Production, Cinematography, Sound Engineering, Video Postproduction, Multimodal AI',
  termCount: allTermsList.length,
  categories: glossaryJson.categories
};

currentCatalog.canonicalGlossaries = [...existingGlossaries, audiovisualCatalogEntry];

// Ensure target directory exists
fs.mkdirSync(path.dirname(TARGET_GLOSSARY), { recursive: true });

// Write files
fs.writeFileSync(TARGET_GLOSSARY, JSON.stringify(glossaryJson, null, 2), 'utf8');
console.log(`Saved: ${TARGET_GLOSSARY}`);

fs.writeFileSync(TARGET_TERMS, JSON.stringify(termsData, null, 2), 'utf8');
console.log(`Saved: ${TARGET_TERMS}`);

fs.writeFileSync(TARGET_CATALOG, JSON.stringify(currentCatalog, null, 2), 'utf8');
console.log(`Saved: ${TARGET_CATALOG}`);

// Self-verification
console.log('\n--- VERIFICATION AUDIT ---');
let allKnownIds = new Set([
  ...allTermsList.map(t => t.id),
  ...videoImageIds,
  ...render3DIds
]);

let brokenLinks = 0;
let totalRelations = 0;
let crossRelations = 0;

for (const term of allTermsList) {
  for (const rel of term.relations) {
    totalRelations++;
    if (!allKnownIds.has(rel.target)) {
      console.error(`BROKEN LINK: Term ${term.id} points to missing target: ${rel.target}`);
      brokenLinks++;
    }
    if (rel.target.startsWith('urn:term:video-image:') || rel.target.startsWith('urn:term:render-3d-animations:')) {
      crossRelations++;
    }
  }
}

console.log(`Total Terms Checked: ${allTermsList.length}`);
console.log(`Total Relations Checked: ${totalRelations}`);
console.log(`Total Cross-Glossary Relations: ${crossRelations}`);
console.log(`Broken Links: ${brokenLinks}`);

if (brokenLinks === 0) {
  console.log('SUCCESS: All relations resolve cleanly to valid entities.');
} else {
  console.error(`FAILURE: Found ${brokenLinks} broken links.`);
  process.exit(1);
}
