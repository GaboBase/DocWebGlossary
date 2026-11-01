const fs = require('fs');
const path = require('path');

const termsPath = path.join(__dirname, '..', 'AudiovisualProduction', 'data', 'terms.json');
const glossaryPath = path.join(__dirname, '..', 'AudiovisualProduction', 'data', 'glossary.json');

const termsData = JSON.parse(fs.readFileSync(termsPath, 'utf8'));
const glossaryData = JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));

const newTerms = [
  {
    id: "urn:term:audiovisual-production:anamorphic-lens",
    slug: "anamorphic-lens",
    title: "Óptica Anamórfica y Descompresión (Anamorphic Lens & De-squeeze)",
    category: "optica-lentes",
    categoryLabel: "Óptica, Enfoque & Composición",
    definition: "Sistema óptico que incorpora elementos cilíndricos para comprimir horizontalmente un campo visual panorámico sobre un sensor o negativo estándar (típicamente con factores de compresión de 1.33x, 1.5x, 1.8x o 2.0x). En posproducción requiere un proceso de descompresión geométrica (de-squeeze), produciendo un característico bokeh ovalado, destellos horizontales (flares) y una estética cinematográfica distintiva.",
    shortDefinition: "Lente cinematográfica que comprime horizontalmente el encuadre para registrar mayor campo visual panorámico en el sensor, produciendo bokeh elíptico y destellos horizontales.",
    extendedDefinition: "La óptica anamórfica maximiza la resolución horizontal capturando una relación de aspecto ultra-ancha (como 2.39:1) sobre sensores 4:3 o Open Gate. Requiere desanamorfización en monitores de rodaje y software de edición/etalonaje para recuperar la geometría natural del sujeto sin distorsión anatómica.",
    fullDefinition: "Sistema óptico cinematográfico que utiliza lentes con elementos cilíndricos para comprimir ópticamente la imagen en el eje horizontal. Al desanamorfizar la imagen en posproducción, se obtiene una relación de aspecto panorámica envolvente con características ópticas únicas: desenfoque elíptico, compresión de perspectiva tridimensional y dispersión cromática horizontal.",
    components: [
      "Elementos cilíndricos frontales o traseros",
      "Factor de compresión óptica (Squeeze factor 1.33x a 2.0x)",
      "Proceso digital de desanamorfización (De-squeeze)"
    ],
    applications: [
      "Cinematografía de largometrajes y publicidad de alta gama",
      "Formatos panorámicos teatrales DCI Scope 2.39:1"
    ],
    examples: [
      "Rodaje con lentes anamórficas 2x en sensor Full Frame Open Gate para obtener una estética de superproducción con destellos azulados horizontales."
    ],
    synonyms: ["Lente Anamórfica", "Anamorphic Prime", "Anamorphic Glass", "De-squeeze"],
    attributes: {
      faseProduccion: "Rodaje",
      categoriaCanon: "Óptica, Enfoque & Composición",
      fuenteIndice: "Expansión Técnica DocWeb #1"
    },
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Directiva óptica fundamental para emular estética de cine panorámico en modelos de IA generativa.",
      promptTokens: ["anamorphic lens", "2.39:1 aspect ratio", "horizontal blue streak lens flare", "oval bokeh", "cinematic wide scope", "anamorphic squeeze"],
      negativeTokens: ["spherical distortion", "circular bokeh", "flat lighting", "vertical stretching"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora", "Kling AI", "Midjourney v6"]
    },
    metadata: {
      source: "verified_cinematography_standards",
      sourceIndex: 186,
      originalTitle: "Anamorphic Lens & De-squeeze",
      curationStatus: "original_editorial_smpte_ebu",
      verified: true
    },
    relations: [
      { type: "relatedTo", target: "urn:term:audiovisual-production:profundidad-de-campo", label: "se relaciona con", note: "Afecta el bokeh y la percepción de profundidad" },
      { type: "relatedTo", target: "urn:term:audiovisual-production:relacion-de-aspecto", label: "se relaciona con", note: "Determina el formato final ultra-panorámico 2.39:1" },
      { type: "isTypeOf", target: "urn:term:audiovisual-production:lente-gran-angular", label: "es un tipo de", note: "Especialización de lente cinematográfica" }
    ]
  },
  {
    id: "urn:term:audiovisual-production:dual-native-iso",
    slug: "dual-native-iso",
    title: "Doble ISO Nativo y Rango Dinámico (Dual Native ISO)",
    category: "camara-movimiento",
    categoryLabel: "Cámara, Encuadre & Movimiento",
    definition: "Arquitectura de sensor digital cinematográfico que incorpora dos circuitos analógicos de amplificación independientes por cada fotodiodo (por ejemplo, ISO base 800 e ISO alto 3200). Permite conmutar a una segunda sensibilidad nativa sin introducir la ganancia digital y el ruido de crominancia característicos de la amplificación forzada, maximizando la latitud en condiciones de baja luminosidad.",
    shortDefinition: "Tecnología de sensor de cámara con dos niveles de sensibilidad base sin ganancia digital de ruido.",
    extendedDefinition: "A diferencia de los sensores tradicionales donde aumentar el ISO eleva progresivamente el ruido analógico, el sensor con doble ISO nativo reconfigura la capacitancia de conversión del fotodiodo a nivel hardware, ofreciendo una relación señal/ruido limpia tanto a plena luz de día como en escenas nocturnas.",
    fullDefinition: "Diseño circuital en sensores CMOS de cine donde cada píxel cuenta con dos rutas de lectura con diferente ganancia de conversión. Proporciona dos valores nominales de exposición óptima donde el sensor preserva el máximo rango dinámico (stops) con niveles mínimos de piso de ruido térmico.",
    components: [
      "Circuito de ganancia de conversión dual (Dual Conversion Gain)",
      "Paso de lectura para baja y alta iluminancia",
      "Procesamiento RAW en sensor"
    ],
    applications: [
      "Rodajes en locaciones nocturnas o con luz disponible",
      "Producciones cinematográficas con esquemas de iluminación mínimos"
    ],
    examples: [
      "Configurar la cámara en ISO 3200 nativo para rodar una escena nocturna exterior con luz de velas conservando 14 stops de rango dinámico."
    ],
    synonyms: ["Doble ISO Base", "Dual Base ISO", "Dual Gain Architecture"],
    attributes: {
      faseProduccion: "Rodaje",
      categoriaCanon: "Cámara, Encuadre & Movimiento",
      fuenteIndice: "Expansión Técnica DocWeb #2"
    },
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Parámetro para especificar realismo fotométrico y control de grano en escenas oscuras generadas con IA.",
      promptTokens: ["dual native ISO", "clean low-light capture", "film sensor dynamic range", "natural candle-lit night scene", "zero digital noise"],
      negativeTokens: ["digital grain", "sensor chroma noise", "blown-out highlights", "crushed blacks"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora", "Kling AI", "Midjourney v6"]
    },
    metadata: {
      source: "verified_cinematography_standards",
      sourceIndex: 187,
      originalTitle: "Dual Native ISO",
      curationStatus: "original_editorial_smpte_ebu",
      verified: true
    },
    relations: [
      { type: "specializesIn", target: "urn:term:audiovisual-production:iso", label: "se especializa en", note: "Evolución tecnológica del estándar de sensibilidad" },
      { type: "relatedTo", target: "urn:term:audiovisual-production:raw", label: "se relaciona con", note: "Determina la captura de datos brutos del sensor" },
      { type: "usedFor", target: "urn:term:audiovisual-production:hdr", label: "se utiliza para", note: "Preserva rango dinámico para masterización HDR" }
    ]
  },
  {
    id: "urn:term:audiovisual-production:global-shutter",
    slug: "global-shutter",
    title: "Obturador Global y Captura Simultánea (Global Shutter)",
    category: "camara-movimiento",
    categoryLabel: "Cámara, Encuadre & Movimiento",
    definition: "Mecanismo de captura electrónica en el cual todos los fotodiodos del sensor se exponen y leen exactamente en el mismo instante temporal. Elimina por completo las deformaciones de inclinación (skew), el efecto gelatina (jello) y los artefactos de bandas provocados por destellos estroboscópicos asociados a los sensores con obturador rodante (rolling shutter).",
    shortDefinition: "Exposición instantánea y simultánea de todos los píxeles del sensor, eliminando la distorsión de movimiento.",
    extendedDefinition: "Esencial en tomas de alta velocidad, filmación desde drones o vehículos en movimiento rápido y producciones virtuales con sincronización de pantallas LED, donde cualquier desfase de lectura línea por línea arruina la integración geométrica.",
    fullDefinition: "Arquitectura de sensor donde cada píxel almacena analógicamente la carga acumulada antes de la lectura secuencial. Garantiza una coherencia espacial absoluta en presencia de desplazamientos panorámicos rápidos (whips) y objetos en rotación acelerada como hélices o ruedas.",
    components: [
      "Circuito de muestreo y retención por píxel (Sample-and-Hold)",
      "Lectura sincronizada global",
      "Control de temporización de exposición uniforme"
    ],
    applications: [
      "Filmación de deportes y vehículos a alta velocidad",
      "Tomas aéreas con dron y tracking de cámara en VFX y producción virtual"
    ],
    examples: [
      "Registrar el despegue de un dron en barrido rápido panorámico con líneas arquitectónicas perfectamente rectas y sin inclinación."
    ],
    synonyms: ["Obturador Global", "Electronic Global Shutter", "Simultaneous Exposure"],
    attributes: {
      faseProduccion: "Rodaje",
      categoriaCanon: "Cámara, Encuadre & Movimiento",
      fuenteIndice: "Expansión Técnica DocWeb #3"
    },
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Directiva técnica para evitar artefactos de gelatina o deformaciones curvilíneas en movimientos de cámara generados por IA.",
      promptTokens: ["global shutter capture", "zero rolling shutter artifact", "crisp high-speed motion", "perfect vertical geometry on fast pan"],
      negativeTokens: ["jello effect", "rolling shutter skew", "rubber bending", "wobbly horizon"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora", "Kling AI"]
    },
    metadata: {
      source: "verified_cinematography_standards",
      sourceIndex: 188,
      originalTitle: "Global Shutter",
      curationStatus: "original_editorial_smpte_ebu",
      verified: true
    },
    relations: [
      { type: "differsFrom", target: "urn:term:audiovisual-production:rolling-shutter", label: "se diferencia de", note: "Opuesto técnico al escaneo progresivo línea por línea" },
      { type: "relatedTo", target: "urn:term:audiovisual-production:velocidad-de-obturacion", label: "se relaciona con", note: "Gobierna la duración del tiempo de exposición" },
      { type: "usedFor", target: "urn:term:audiovisual-production:vfx", label: "se utiliza para", note: "Facilita el rastreo de cámara sin distorsión temporal" }
    ]
  },
  {
    id: "urn:term:audiovisual-production:false-color",
    slug: "false-color",
    title: "Medición por Falso Color (False Color Exposure Tool)",
    category: "iluminacion",
    categoryLabel: "Iluminación, Exposición & Fotometría",
    definition: "Herramienta de análisis de exposición en monitores de producción que sustituye los valores de luminancia de la señal por una escala discreta de colores estandarizados en unidades IRE. Permite evaluar de manera inmediata y objetiva los tonos de piel (típicamente entre 50 y 70 IRE), el punto medio de gris del 18% (aprox. 38-42 IRE), el recorte de altas luces (rosa/rojo a 100 IRE) y la subexposición profunda (morado/azul a 0-10 IRE).",
    shortDefinition: "Mapa cromático que asigna colores visuales a niveles IRE para clavar la exposición técnica.",
    extendedDefinition: "A diferencia del monitorado a simple vista o los zebras binarios, el falso color ofrece un mapa continuo y zonificado del contraste de la escena, garantizando consistencia fotométrica entre diferentes planos y jornadas de rodaje.",
    fullDefinition: "Algoritmo de visualización de fotometría que mapea el rango dinámico del sensor en rangos térmicos coloreados. Es la referencia estándar para directores de fotografía y operadores de DIT para fijar la exposición exacta de rostros y evitar la pérdida irrecuperable de detalle en sombras o luces altas.",
    components: [
      "Escala de gradiente IRE calibrada",
      "Zona de tonos de piel (Skin tones 50-70 IRE)",
      "Punto de recorte de altas luces (Clipping 100+ IRE)"
    ],
    applications: [
      "Control de exposición en set durante el rodaje de ficción y comerciales",
      "Calibración de iluminación de tres puntos y balance de fondo"
    ],
    examples: [
      "Ajustar el diafragma hasta que el rostro del actor marque verde claro y rosa suave en falso color, asegurando un contraste perfecto en piel."
    ],
    synonyms: ["Falso Color", "False Color Overlay", "Exposure Heatmap"],
    attributes: {
      faseProduccion: "Rodaje",
      categoriaCanon: "Iluminación, Exposición & Fotometría",
      fuenteIndice: "Expansión Técnica DocWeb #4"
    },
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Parámetro conceptual para describir una exposición cinematográfica equilibrada y tonos de piel exactos.",
      promptTokens: ["cinematic exposure", "balanced IRE skin tones", "unclipped highlights", "rich shadow detail", "calibrated false color lighting"],
      negativeTokens: ["overexposed faces", "clipped white sky", "crushed murky shadows", "harsh uncalibrated exposure"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora", "Kling AI", "Midjourney v6"]
    },
    metadata: {
      source: "verified_cinematography_standards",
      sourceIndex: 189,
      originalTitle: "False Color Exposure Tool",
      curationStatus: "original_editorial_smpte_ebu",
      verified: true
    },
    relations: [
      { type: "relatedTo", target: "urn:term:audiovisual-production:waveform-y-vectorscope", label: "se relaciona con", note: "Herramienta complementaria de monitoreo técnico" },
      { type: "relatedTo", target: "urn:term:audiovisual-production:zebra", label: "se relaciona con", note: "Alternativa más avanzada a los patrones binarios de cebra" },
      { type: "usedFor", target: "urn:term:audiovisual-production:log", label: "se utiliza para", note: "Garantiza exponer correctamente perfiles logarítmicos" }
    ]
  },
  {
    id: "urn:term:audiovisual-production:match-cut",
    slug: "match-cut",
    title: "Corte por Coincidencia Gráfica o Temática (Match Cut)",
    category: "edicion-montaje",
    categoryLabel: "Montaje & Edición de Video",
    definition: "Técnica de montaje cinematográfico que une dos planos consecutivos mediante una similitud visual, geométrica, sonora o temática evidente entre el final de la primera toma y el inicio de la segunda. Crea una transición fluida y un puente metafórico entre dos espacios, tiempos o conceptos narrativos totalmente dispares.",
    shortDefinition: "Transición de montaje que enlaza dos escenas mediante una coincidencia de forma visual, movimiento o sonido.",
    extendedDefinition: "El match cut es uno de los recursos narrativos más potentes del cine de autor y la publicidad. Puede ser gráfico (una rueda girando que corta a un reloj), cinético (un personaje saltando que cae en otra era) o sonoro (un silbato de tren que se transforma en el grito de un actor).",
    fullDefinition: "Figura de estilo en el montaje que explota la memoria icónica del espectador para establecer continuidad semántica sin necesidad de encadenados ópticos. Genera asociaciones cognitivas profundas mientras preserva la ilusión de continuidad de movimiento o forma en el eje visual central.",
    components: [
      "Correspondencia geométrica o compositiva entre planos",
      "Alineación en la cuadrícula de encuadre",
      "Vector de movimiento sincronizado"
    ],
    applications: [
      "Transiciones temporales o elipsis en cine y series",
      "Montaje rítmico en comerciales y videos musicales"
    ],
    examples: [
      "El legendario corte en '2001: Odisea del Espacio' de Stanley Kubrick donde un hueso lanzado al aire corta directamente a una nave espacial orbital."
    ],
    synonyms: ["Corte Gráfico", "Graphic Match Cut", "Match Transition"],
    attributes: {
      faseProduccion: "Postproducción",
      categoriaCanon: "Montaje & Edición de Video",
      fuenteIndice: "Expansión Técnica DocWeb #5"
    },
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Instrucción de montaje fundamental para guiar transiciones y coherencia visual en generación de video IA turn-by-turn.",
      promptTokens: ["graphic match cut transition", "seamless visual shape morph", "cinematic continuity cut", "aligned composition cut"],
      negativeTokens: ["abrupt jump cut", "jarring axis jump", "misaligned transition", "disorienting cut"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora", "Kling AI", "Luma Dream Machine"]
    },
    metadata: {
      source: "verified_cinematography_standards",
      sourceIndex: 190,
      originalTitle: "Match Cut",
      curationStatus: "original_editorial_smpte_ebu",
      verified: true
    },
    relations: [
      { type: "isTypeOf", target: "urn:term:audiovisual-production:transicion", label: "es un tipo de", note: "Transición de montaje invisible" },
      { type: "relatedTo", target: "urn:term:audiovisual-production:montaje", label: "se relaciona con", note: "Pilar central de la gramática de montaje" },
      { type: "differsFrom", target: "urn:term:audiovisual-production:jump-cut", label: "se diferencia de", note: "Busca continuidad armónica en vez de fractura temporal deliberada" }
    ]
  },
  {
    id: "urn:term:audiovisual-production:ebu-r128",
    slug: "ebu-r128",
    title: "Normalización de Sonoridad EBU R128 (Loudness Standard)",
    category: "audio-postproduccion",
    categoryLabel: "Posproducción de Audio & Mezcla",
    definition: "Recomendación técnica internacional emitida por la Unión Europea de Radiodifusión que normaliza la sonoridad en el audio broadcast y digital basándose en la percepción auditiva humana (medida en LUFS/LKFS) en lugar de picos de muestra analógicos. Establece un objetivo integrado de -23 LUFS (±0.5 LU) para televisión y -14 a -16 LUFS para plataformas de streaming digital, con un techo de pico verdadero (True Peak) de -1 dBTP.",
    shortDefinition: "Estándar de medición y normalización de sonoridad para televisión y plataformas de streaming.",
    extendedDefinition: "EBU R128 introdujo el descriptor LRA (Loudness Range), que mide la dinámica estadística de la pieza, asegurando que los diálogos sean perfectamente comprensibles sin saltos agresivos de volumen entre programas y cortes publicitarios.",
    fullDefinition: "Marco regulatorio de posproducción sonora que utiliza el algoritmo ITU-R BS.1770 con filtros de ponderación K-weighting. Reemplazó la 'guerra del volumen' por un modelo psicoacústico equitativo donde todo el contenido se mezcla con headroom dinámico controlado.",
    components: [
      "Sonoridad Integrada (Integrated Loudness en LUFS)",
      "Sonoridad a Corto Plazo (Short-Term 3s) y Momentánea (400ms)",
      "Límite de Pico Verdadero (Maximum True Peak en dBTP)",
      "Rango de Sonoridad (Loudness Range - LRA)"
    ],
    applications: [
      "Masterización de audio para televisión, Netflix, Amazon Prime y cines",
      "Distribución de video en plataformas de streaming (YouTube, Spotify)"
    ],
    examples: [
      "Masterizar el audio de un documental corporativo a -14 LUFS con True Peak a -1 dBTP para distribución óptima en YouTube sin penalización del compresor de la plataforma."
    ],
    synonyms: ["EBU R128", "ITU-R BS.1770", "Loudness Normalization", "True Peak Limiting"],
    attributes: {
      faseProduccion: "Postproducción",
      categoriaCanon: "Posproducción de Audio & Mezcla",
      fuenteIndice: "Expansión Técnica DocWeb #6"
    },
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Parámetro técnico para controlar niveles de audio, inteligibilidad de voces y rango dinámico en bandas sonoras IA.",
      promptTokens: ["EBU R128 broadcast sound", "-14 LUFS integrated", "pristine dialogue clarity", "wide dynamic range", "-1 dBTP true peak limiter"],
      negativeTokens: ["audio clipping", "distorted waveform", "harsh loudness war compression", "inaudible whispers"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora", "ElevenLabs"]
    },
    metadata: {
      source: "verified_cinematography_standards",
      sourceIndex: 191,
      originalTitle: "EBU R128 Loudness Standard",
      curationStatus: "original_editorial_smpte_ebu",
      verified: true
    },
    relations: [
      { type: "specializesIn", target: "urn:term:audiovisual-production:lufs-loudness", label: "se especializa en", note: "Norma formal de implementación de LUFS" },
      { type: "usedFor", target: "urn:term:audiovisual-production:mezcla-de-sonido", label: "se utiliza para", note: "Guía de control en la etapa final de mezcla" },
      { type: "relatedTo", target: "urn:term:audiovisual-production:broadcasting", label: "se relaciona con", note: "Obligatorio en radiodifusión televisiva" }
    ]
  },
  {
    id: "urn:term:audiovisual-production:genlock",
    slug: "genlock",
    title: "Sincronización Genlock (Generator Locking)",
    category: "tecnologia-infraestructura",
    categoryLabel: "Formatos, Códecs & Infraestructura",
    definition: "Mecanismo de sincronización por hardware mediante el cual una señal de referencia común (Blackburst o Tri-Level Sync) bloquea la tasa de refresco y el inicio de cada fotograma entre múltiples cámaras, procesadores LED, trackers y servidores de render. Evita el desfasaje temporal inter-cuadro y la aparición de líneas de escaneo o parpadeos en grabaciones multicámara y entornos de producción virtual.",
    shortDefinition: "Sincronización electrónica precisa por pulsos para coordinar cámaras y pantallas al mismo instante de fotograma.",
    extendedDefinition: "En producción virtual con paneles LED (ICVFX), el genlock sincroniza el disparador del obturador de la cámara cinematográfica con la tasa de refresco de los muros LED y el render en tiempo real de Unreal Engine, garantizando que el sensor nunca capture la fase de transición de los LEDs.",
    fullDefinition: "Técnica de sincronismo a nivel de señal de reloj donde todos los dispositivos de la cadena de video coinciden exactamente en el barrido horizontal y vertical de cada cuadro. Esencial para producciones broadcast multicámara en vivo y rodajes virtuales.",
    components: [
      "Generador de sincronismo maestro (Sync Pulse Generator)",
      "Señal Tri-Level Sync (para HD/UHD) o Blackburst (SD)",
      "Entradas BNC Genlock en cámaras y procesadores"
    ],
    applications: [
      "Producción virtual con pantallas LED (ICVFX)",
      "Unidades móviles de televisión y retransmisiones multicámara en directo"
    ],
    examples: [
      "Bloquear con Tri-Level Genlock a 24.000 fps la cámara ARRI Alexa con el procesador Brompton de la pared LED para evitar líneas de barrido."
    ],
    synonyms: ["Genlock", "Tri-Level Sync", "Frame Sync", "Generator Locking"],
    attributes: {
      faseProduccion: "Rodaje",
      categoriaCanon: "Formatos, Códecs & Infraestructura",
      fuenteIndice: "Expansión Técnica DocWeb #7"
    },
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Concepto de sincronía absoluta entre elementos de fondo y personajes en video sintetizado.",
      promptTokens: ["genlock frame synchronization", "locked refresh rate", "zero tearing", "flawless camera tracking sync"],
      negativeTokens: ["screen tearing", "flickering background", "phase mismatch", "motion jitter"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora"]
    },
    metadata: {
      source: "verified_cinematography_standards",
      sourceIndex: 192,
      originalTitle: "Genlock Synchronization",
      curationStatus: "original_editorial_smpte_ebu",
      verified: true
    },
    relations: [
      { type: "relatedTo", target: "urn:term:audiovisual-production:timecode", label: "se relaciona con", note: "Complementa el timecode proporcionando sincronía a nivel de microsegundo" },
      { type: "usedFor", target: "urn:term:audiovisual-production:produccion-virtual", label: "se utiliza para", note: "Pilar técnico indispensable en rodaje con volúmenes LED" },
      { type: "relatedTo", target: "urn:term:audiovisual-production:volumen-led", label: "se relaciona con", note: "Sincroniza procesadores de paneles LED" }
    ]
  },
  {
    id: "urn:term:audiovisual-production:first-frame-conditioning",
    slug: "first-frame-conditioning",
    title: "Acondicionamiento por Primer Fotograma (First-Frame I2V Conditioning)",
    category: "ia-generacion-audiovisual",
    categoryLabel: "Generación de Video con IA & Difusión",
    definition: "Técnica de generación de video generativo (Image-to-Video o I2V) donde una imagen estática de alta resolución se inyecta como estado inicial fijo (latent anchor) en la primera posición temporal del modelo de difusión de video. El modelo calcula el flujo de movimiento, la animación de personajes y la trayectoria de cámara a partir de dicha referencia preservando fidelidad de estilo y rostros.",
    shortDefinition: "Generación de video con IA a partir de una imagen fija que actúa como fotograma inicial de la escena.",
    extendedDefinition: "Permite un control estético total sobre el inicio del plano, permitiendo diseñar el encuadre exacto con herramientas como Midjourney o fotografía real antes de delegar la simulación física de movimiento al modelo de video.",
    fullDefinition: "Método de acondicionamiento temporal donde el tensor latente del primer fotograma no se somete a difusión de ruido inverso, sino que se mantiene como restricción de contorno para guiar la evolución temporal de la secuencia en los pasos de denoising subsiguientes.",
    components: [
      "Imagen ancla inicial (Keyframe source)",
      "Proyección latente de entrada",
      "Control de coherencia temporal auto-regresiva"
    ],
    applications: [
      "Animación de storyboards y conceptos fotográficos fijos",
      "Control de continuidad en planos de ficción generados con IA"
    ],
    examples: [
      "Tomar una fotografía de un producto comercial en estudio y utilizarla como primer fotograma para generar un travelling circular con movimiento de cámara continuo."
    ],
    synonyms: ["I2V First Frame", "Start Frame Conditioning", "Keyframe-to-Video"],
    attributes: {
      faseProduccion: "Postproducción",
      categoriaCanon: "Generación de Video con IA & Difusión",
      fuenteIndice: "Expansión Técnica DocWeb #8"
    },
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Parámetro fundamental para controlar la fidelidad visual al iniciar cualquier generación en modelos de video generativo.",
      promptTokens: ["first-frame conditioned video", "start from anchor image", "consistent character likeness", "cinematic camera motion from initial frame"],
      negativeTokens: ["style drift from start", "face morphing", "dissolving geometry", "uncontrolled camera snap"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora", "Kling AI", "Luma Dream Machine"]
    },
    metadata: {
      source: "verified_cinematography_standards",
      sourceIndex: 193,
      originalTitle: "First-Frame I2V Conditioning",
      curationStatus: "original_editorial_smpte_ebu",
      verified: true
    },
    relations: [
      { type: "specializesIn", target: "urn:term:audiovisual-production:conditioning", label: "se especializa en", note: "Especialización de acondicionamiento multimodal" },
      { type: "usedFor", target: "urn:term:audiovisual-production:video-generativo", label: "se utiliza para", note: "Modalidad clave de síntesis audiovisual" },
      { type: "relatedTo", target: "urn:term:audiovisual-production:prompt", label: "se relaciona con", note: "Complementa el prompt de texto guiando el inicio visual" }
    ]
  },
  {
    id: "urn:term:audiovisual-production:start-end-frame-interpolation",
    slug: "start-end-frame-interpolation",
    title: "Interpolación de Fotograma Inicial y Final (Start/End Frame Keyframing)",
    category: "ia-generacion-audiovisual",
    categoryLabel: "Generación de Video con IA & Difusión",
    definition: "Capacidad de modelos generativos de video para recibir dos imágenes de referencia estáticas: una como fotograma inicial (start frame) y otra como fotograma de cierre (end frame). El modelo genera de manera autónoma los fotogramas intermedios respetando la continuidad morfológica, la cinemática de los sujetos y las transiciones de perspectiva entre ambos extremos.",
    shortDefinition: "Generación de video con IA que conecta fluidamente una imagen inicial y una imagen final fija.",
    extendedDefinition: "Es la evolución contemporánea de la animación intermedia (in-betweening) tradicional. Resuelve el problema de la deriva temporal garantizando que la acción termine con precisión en el encuadre y composición deseados.",
    fullDefinition: "Técnica de acondicionamiento temporal birrefidencial que define las condiciones de frontera inicial y terminal en el espacio latente del transformador de difusión de video. Permite enlazar planos complejos con exactitud de guion técnico.",
    components: [
      "Fotograma de inicio (Start frame)",
      "Fotograma de destino (End frame)",
      "Interpolación cinemática latente guiada por prompt"
    ],
    applications: [
      "Transiciones complejas de escena a escena",
      "Animación precisa de coreografías y movimientos de cámara de punto A a punto B"
    ],
    examples: [
      "Definir una imagen del héroe desenfundando la espada como fotograma inicial y una imagen del héroe clavando la espada como fotograma final, generando la trayectoria completa."
    ],
    synonyms: ["Start/End Keyframing", "Two-Point Interpolation", "In-betweening AI"],
    attributes: {
      faseProduccion: "Postproducción",
      categoriaCanon: "Generación de Video con IA & Difusión",
      fuenteIndice: "Expansión Técnica DocWeb #9"
    },
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Comando para estructurar secuencias de acción y transiciones precisas de punto a punto en modelos generativos.",
      promptTokens: ["start and end frame interpolation", "two-point keyframing", "seamless camera arc between keyframes", "anatomical trajectory preservation"],
      negativeTokens: ["abrupt mid-sequence jump", "morphing glitches", "limbs duplication", "loss of end frame target"],
      modelCompatibility: ["Runway Gen-3", "Luma Dream Machine", "Kling AI"]
    },
    metadata: {
      source: "verified_cinematography_standards",
      sourceIndex: 194,
      originalTitle: "Start/End Frame Keyframing",
      curationStatus: "original_editorial_smpte_ebu",
      verified: true
    },
    relations: [
      { type: "specializesIn", target: "urn:term:audiovisual-production:frame-interpolation-ia", label: "se especializa en", note: "Evolución generativa de la interpolación de cuadros" },
      { type: "usedFor", target: "urn:term:audiovisual-production:video-generativo", label: "se utiliza para", note: "Control de inicio y fin de secuencias" },
      { type: "relatedTo", target: "urn:term:audiovisual-production:storyboard", label: "se relaciona con", note: "Convierte viñetas de storyboard en tomas animadas" }
    ]
  },
  {
    id: "urn:term:audiovisual-production:lora-camera-motion",
    slug: "lora-camera-motion",
    title: "Adaptadores LoRA de Movimiento de Cámara (Camera Motion LoRA)",
    category: "ia-generacion-audiovisual",
    categoryLabel: "Generación de Video con IA & Difusión",
    definition: "Módulos de adaptación de bajo rango (Low-Rank Adaptation) entrenados específicamente con secuencias de video emparejadas con matrices de trayectoria de cámara 3D (pan, tilt, pedestal, orbit, zoom, dolly). Permiten inyectar movimientos cinemáticos de cámara matemáticamente controlados en modelos de difusión sin alterar los pesos base del modelo generativo.",
    shortDefinition: "Micro-modelos LoRA especializados en gobernar trayectorias de cámara precisas en video con IA.",
    extendedDefinition: "A diferencia de las descripciones textuales vagas que a menudo son ignoradas por el modelo, un LoRA de cámara impone una función de transformación espacial estricta sobre el fondo y los objetos, emulando grúas, travellings sobre rieles y planos secuencia virtuosos.",
    fullDefinition: "Técnica de parametrización eficiente de pesos neuronales aplicada a capas de atención cruzada temporal para condicionar las dinámicas de cámara en seis grados de libertad (6DoF) en síntesis de video.",
    components: [
      "Matrices de bajo rango para capas temporales",
      "Ponderación de fuerza del LoRA (Weight multiplier 0.1 a 1.5)",
      "Vectores de coordenadas de cámara calibrados"
    ],
    applications: [
      "Producción de planos cinemáticos con movimientos de cámara milimétricos",
      "Emulación de operadores de cámara legendarios o técnicas complejas de steadicam"
    ],
    examples: [
      "Aplicar un LoRA de 'Orbit 360 clockwise' con peso 0.8 sobre un plano de un actor para lograr un travelling circular envolvente con paralaje realista."
    ],
    synonyms: ["Camera Motion LoRA", "6DoF LoRA", "Cinematic Motion Adapter"],
    attributes: {
      faseProduccion: "Postproducción",
      categoriaCanon: "Generación de Video con IA & Difusión",
      fuenteIndice: "Expansión Técnica DocWeb #10"
    },
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Instrucción de control espacial imprescindible para forzar movimientos de cámara específicos en prompts para IA.",
      promptTokens: ["camera motion LoRA", "smooth 360 degree orbit", "precise dolly-in push", "constant parallax", "steadicam tracking feel"],
      negativeTokens: ["static tripod shot", "handheld camera shake", "erratic jitter", "unmotivated zoom"],
      modelCompatibility: ["Runway Gen-3", "Kling AI", "AnimateDiff", "ComfyUI"]
    },
    metadata: {
      source: "verified_cinematography_standards",
      sourceIndex: 195,
      originalTitle: "Camera Motion LoRA",
      curationStatus: "original_editorial_smpte_ebu",
      verified: true
    },
    relations: [
      { type: "specializesIn", target: "urn:term:audiovisual-production:motion-vectors-ia", label: "se especializa en", note: "Especialización de control de vectores de movimiento" },
      { type: "compatibleWith", target: "urn:term:audiovisual-production:controlnet-video", label: "es compatible con", note: "Se combina frecuentemente con esqueletos de pose y mapas de profundidad" },
      { type: "usedFor", target: "urn:term:audiovisual-production:dolly-shot", label: "se utiliza para", note: "Emula digitalmente movimientos físicos de dolly" }
    ]
  },
  {
    id: "urn:term:audiovisual-production:ndisplay",
    slug: "ndisplay",
    title: "Renderizado Sincronizado para Pantallas LED (nDisplay Multi-display)",
    category: "tecnologia-infraestructura",
    categoryLabel: "Formatos, Códecs & Infraestructura",
    definition: "Tecnología de renderizado distribuido en tiempo real (desarrollada originalmente en Unreal Engine) que sincroniza múltiples nodos de computación para proyectar un entorno 3D continuo sobre complejas configuraciones de pantallas LED, paredes curvas, techos y pisos de producción virtual con cero latencia perceptible y alineación de perspectiva frustum vinculada a la cámara física.",
    shortDefinition: "Sistema que divide y sincroniza el render 3D en tiempo real entre múltiples servidores para muros LED gigantes.",
    extendedDefinition: "nDisplay calcula en cada cuadro el 'frustum interno' (la porción visible por el lente de la cámara a máxima resolución y con paralaje exacto) y el 'frustum externo' (la iluminación ambiental proyectada por el resto del volumen LED hacia los actores y el set físico).",
    fullDefinition: "Arquitectura cliente-servidor para proyección de gráficos 3D en clúster. Utiliza sincronización por red de ultra-baja latencia y Genlock para garantizar que cada procesador de video pinte los píxeles de su respectivo panel LED sin desalineaciones de borde.",
    components: [
      "Clúster de nodos de render GPU",
      "Cálculo dinámico de Frustum de cámara",
      "Protocolo de sincronización de cuadros por red"
    ],
    applications: [
      "Volúmenes LED para cine y televisión (The Mandalorian, House of the Dragon)",
      "Escenarios virtuales broadcast y eventos inmersivos en vivo"
    ],
    examples: [
      "Configurar un clúster de 8 estaciones de trabajo con nDisplay para renderizar un desierto alienígena a 60 fps en un muro LED semicircular de 20 metros."
    ],
    synonyms: ["nDisplay", "Multi-node Cluster Rendering", "Virtual Production Renderer"],
    attributes: {
      faseProduccion: "Rodaje",
      categoriaCanon: "Formatos, Códecs & Infraestructura",
      fuenteIndice: "Expansión Técnica DocWeb #11"
    },
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Concepto de integración entre fondos 3D hiperrealistas e iluminación física en producción virtual.",
      promptTokens: ["nDisplay LED volume rendering", "real-time in-camera background", "accurate camera parallax on LED wall", "realistic interactive lighting on actors"],
      negativeTokens: ["green screen spill", "flat background projection", "perspective mismatch", "jittering LED seams"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora"]
    },
    metadata: {
      source: "verified_cinematography_standards",
      sourceIndex: 196,
      originalTitle: "nDisplay Multi-display",
      curationStatus: "original_editorial_smpte_ebu",
      verified: true
    },
    relations: [
      { type: "isPartOf", target: "urn:term:audiovisual-production:volumen-led", label: "es parte de", note: "Cerebro de software del muro LED" },
      { type: "usedFor", target: "urn:term:audiovisual-production:produccion-virtual", label: "se utiliza para", note: "Tecnología habilitadora de rodaje virtual" },
      { type: "relatedTo", target: "urn:term:audiovisual-production:render-en-tiempo-real", label: "se relaciona con", note: "Basado en motores de juego en tiempo real" }
    ]
  },
  {
    id: "urn:term:audiovisual-production:optical-flow",
    slug: "optical-flow",
    title: "Flujo Óptico y Vectores de Movimiento (Optical Flow Analysis)",
    category: "vfx-composicion",
    categoryLabel: "Efectos Visuales & Acabados (VFX)",
    definition: "Algoritmo de visión artificial y posproducción que calcula el patrón de movimiento aparente de los píxeles y texturas entre fotogramas consecutivos de una secuencia de video. Genera mapas de vectores de velocidad 2D utilizados para re-temporización (slow motion extremo), interpolación de cuadros perdidos, seguimiento de objetos y transferencia de movimiento.",
    shortDefinition: "Análisis matemático del desplazamiento de píxeles entre cuadros para generar cámara lenta fluida y tracking.",
    extendedDefinition: "El flujo óptico permite pasar un plano de 24 fps a 1000 fps sintetizando fotogramas intermedios realistas. Requiere algoritmos de resolución de oclusiones para evitar artefactos de 'fantasmas' cuando un objeto cruza por delante de otro.",
    fullDefinition: "Método diferencial de estimación de campos vectoriales basado en la hipótesis de constancia de brillo. En flujos de trabajo de VFX y etalonaje, permite pegar máscaras complejas a la superficie deformada de un rostro o tejido sin necesidad de tracking por puntos manual.",
    components: [
      "Cálculo de gradientes espacio-temporales",
      "Mapa de vectores bidimensionales de velocidad por píxel",
      "Mecanismo de detección de oclusiones y desgarros"
    ],
    applications: [
      "Cámara lenta de ultra-alta calidad en software como DaVinci Resolve o Twixtor",
      "Estabilización avanzada de planos y morphing de transiciones en VFX"
    ],
    examples: [
      "Aplicar interpolación por flujo óptico a un plano a 24 fps para ralentizarlo al 20% de su velocidad sin saltos ni duplicación de fotogramas."
    ],
    synonyms: ["Flujo Óptico", "Optical Flow", "Pixel Motion Vectors", "Speed Warp"],
    attributes: {
      faseProduccion: "Postproducción",
      categoriaCanon: "Efectos Visuales & Acabados (VFX)",
      fuenteIndice: "Expansión Técnica DocWeb #12"
    },
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Parámetro para describir suavidad de movimiento e interpolación temporal fluida sin artefactos.",
      promptTokens: ["smooth optical flow motion", "fluid sub-frame interpolation", "clean motion blur vectors", "artifact-free slow motion"],
      negativeTokens: ["frame blending ghosts", "choppy playback", "edge tearing", "stuttering cadence"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora", "Kling AI"]
    },
    metadata: {
      source: "verified_cinematography_standards",
      sourceIndex: 197,
      originalTitle: "Optical Flow Analysis",
      curationStatus: "original_editorial_smpte_ebu",
      verified: true
    },
    relations: [
      { type: "usedFor", target: "urn:term:audiovisual-production:frame-interpolation-ia", label: "se utiliza para", note: "Base matemática para la interpolación neuronal" },
      { type: "relatedTo", target: "urn:term:audiovisual-production:tracking-shot", label: "se relaciona con", note: "Facilita el rastreo de movimiento" },
      { type: "isPartOf", target: "urn:term:audiovisual-production:vfx", label: "es parte de", note: "Herramienta clave en composición visual" }
    ]
  },
  {
    id: "urn:term:audiovisual-production:in-camera-visual-effects",
    slug: "in-camera-visual-effects",
    title: "Efectos Visuales en Cámara (ICVFX / In-Camera Visual Effects)",
    category: "vfx-composicion",
    categoryLabel: "Efectos Visuales & Acabados (VFX)",
    definition: "Metodología cinematográfica en la que los fondos y efectos visuales generados por ordenador se renderizan en tiempo real sobre pantallas LED gigantes dispuestas directamente en el set de rodaje, capturando el plano final integrado con la cámara física en una única toma, eliminando la necesidad de croma verde y composición pesada en posproducción.",
    shortDefinition: "Captura de actores y fondos digitales 3D en una sola toma mediante volúmenes LED sincronizados.",
    extendedDefinition: "La gran ventaja de los ICVFX reside en la iluminación interactiva natural: las pantallas LED bañan a los actores y objetos físicos con los reflejos cromáticos exactos del entorno digital, solucionando el derrame de verde (green spill) típico del croma.",
    fullDefinition: "Técnica híbrida que fusiona escenografía física con entornos fotorrealistas virtuales. Requiere seguimiento de cámara milimétrico con latencia ultrabaja para que la perspectiva de las pantallas LED responda al movimiento físico del operador de cámara sin desfase.",
    components: [
      "Volumen LED envolvente",
      "Sistema de seguimiento óptico de cámara (Optical camera tracking)",
      "Motor 3D en tiempo real (Unreal Engine)",
      "Escenografía física integrada en set"
    ],
    applications: [
      "Grandes producciones cinematográficas de ciencia ficción y época",
      "Publicidad automotriz y series de televisión de alto presupuesto"
    ],
    examples: [
      "Rodar la cabina de una nave espacial en movimiento dentro de un volumen LED con el reflejo de las estrellas bañando el casco de los trajes espaciales en vivo."
    ],
    synonyms: ["ICVFX", "In-Camera VFX", "Producción Virtual en Set"],
    attributes: {
      faseProduccion: "Rodaje",
      categoriaCanon: "Efectos Visuales & Acabados (VFX)",
      fuenteIndice: "Expansión Técnica DocWeb #13"
    },
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Estilo visual que describe integración hiperrealista entre personajes en primer término y fondos fotorrealistas.",
      promptTokens: ["in-camera visual effects", "ICVFX lighting match", "photorealistic LED volume background", "natural interactive bounce light on actors"],
      negativeTokens: ["green screen halo", "artificial compositing edge", "mismatched lighting angle", "flat backdrop"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora", "Midjourney v6"]
    },
    metadata: {
      source: "verified_cinematography_standards",
      sourceIndex: 198,
      originalTitle: "In-Camera Visual Effects (ICVFX)",
      curationStatus: "original_editorial_smpte_ebu",
      verified: true
    },
    relations: [
      { type: "specializesIn", target: "urn:term:audiovisual-production:produccion-virtual", label: "se especializa en", note: "Máxima expresión de la producción virtual" },
      { type: "uses", target: "urn:term:audiovisual-production:volumen-led", label: "se compone de", note: "Requiere muros y techos de pantallas LED" },
      { type: "uses", target: "urn:term:audiovisual-production:camera-tracking", label: "depende de", note: "Depende del seguimiento espacial de la cámara" }
    ]
  },
  {
    id: "urn:term:audiovisual-production:color-space-transform",
    slug: "color-space-transform",
    title: "Transformación de Espacio de Color (Color Space Transform / CST)",
    category: "color-etalonaje",
    categoryLabel: "Corrección de Color & Etalonaje",
    definition: "Operación matemática algorítmica utilizada en posproducción (por ejemplo, en DaVinci Resolve) para convertir con precisión fotométrica los datos de imagen desde el espacio de color y curva gamma de captura de la cámara (como Sony S-Gamut3.Cine/S-Log3 o ARRI LogC4) hacia un espacio de trabajo intermedio amplio (como ACEScc o DaVinci Wide Gamut) o hacia el espacio de entrega final (como Rec.709 o DCI-P3).",
    shortDefinition: "Conversión matemática exacta entre diferentes gamuts de color y curvas gamma en etalonaje.",
    extendedDefinition: "A diferencia de las LUTs de visualización que pueden recortar o distorsionar los datos en altas luces, el CST realiza un mapeo tonal y cromático continuo en coma flotante de 32 bits, preservando la latitud original del sensor.",
    fullDefinition: "Transformación cromática matricial y de curva de transferencia electro-óptica (EOTF). Es la piedra angular de los flujos de trabajo de gestión de color (Color Managed Workflows) que garantizan homogeneidad visual al mezclar metraje de múltiples fabricantes de cámaras.",
    components: [
      "Espacio de color de entrada (Input Color Space / Gamut)",
      "Gamma de entrada (Input Gamma / Log curve)",
      "Mapeo de tonos y gamuts (Tone mapping / Gamut compression)",
      "Espacio y gamma de salida (Output Color Space & Gamma)"
    ],
    applications: [
      "Flujos de trabajo con gestión de color en DaVinci Resolve y Nuke",
      "Normalización de planos multicámara de diferentes marcas en una misma línea de tiempo"
    ],
    examples: [
      "Aplicar un nodo CST para transformar metraje RED IPP2 Wide Gamut a Rec.709 manteniendo la gradación tonal natural sin saturación excesiva."
    ],
    synonyms: ["CST", "Color Space Transform", "Gamut Mapping", "Color Managed Pipeline"],
    attributes: {
      faseProduccion: "Postproducción",
      categoriaCanon: "Corrección de Color & Etalonaje",
      fuenteIndice: "Expansión Técnica DocWeb #14"
    },
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Parámetro para especificar perfiles de color cinemáticos y armonización de tonos de múltiples fuentes en prompts generativos.",
      promptTokens: ["color space transformed", "DaVinci Wide Gamut grading", "smooth tone compression", "film emulation Rec.709 delivery"],
      negativeTokens: ["clipped color saturation", "blown-out skin highlights", "harsh video contrast", "gamut banding"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora", "Midjourney v6"]
    },
    metadata: {
      source: "verified_cinematography_standards",
      sourceIndex: 199,
      originalTitle: "Color Space Transform (CST)",
      curationStatus: "original_editorial_smpte_ebu",
      verified: true
    },
    relations: [
      { type: "usedFor", target: "urn:term:audiovisual-production:aces", label: "se utiliza para", note: "Operación nuclear en transformaciones IDT/ODT en ACES" },
      { type: "relatedTo", target: "urn:term:audiovisual-production:lut", label: "se relaciona con", note: "Alternativa matemática superior a las LUTs 3D estáticas" },
      { type: "relatedTo", target: "urn:term:audiovisual-production:rec-709", label: "se relaciona con", note: "Espacio de destino estándar para televisión y web" }
    ]
  },
  {
    id: "urn:term:audiovisual-production:dynamic-range-latitude",
    slug: "dynamic-range-latitude",
    title: "Rango Dinámico y Latitud de Exposición (Dynamic Range & Latitude)",
    category: "camara-movimiento",
    categoryLabel: "Cámara, Encuadre & Movimiento",
    definition: "Capacidad de un sensor de captura cinematográfica para registrar simultáneamente detalles útiles en las zonas más oscuras (sombras por encima del piso de ruido) y en las zonas más brillantes (altas luces por debajo del punto de recorte o saturación), expresada en pasos de diafragma o 'stops' (típicamente entre 13 y 17 stops en cámaras de cine profesional). La latitud define el margen de sobreexposición o subexposición permisible que puede recuperarse con fidelidad en etalonaje.",
    shortDefinition: "Medida en stops de la capacidad del sensor para capturar detalles en sombras y luces extremas a la vez.",
    extendedDefinition: "Una alta latitud permite a los directores de fotografía trabajar con contrastes naturales extremos (como una ventana soleada en una habitación en penumbra) sin recurrir a iluminación artificial forzada ni perder información en los extremos tonales.",
    fullDefinition: "Relación logarítmica entre la máxima luminancia registrable sin saturación y la mínima señal discernible sobre el ruido térmico del sensor. Es la especificación técnica más crítica que distingue a una cámara cinematográfica de una cámara de consumo.",
    components: [
      "Rango total en pasos de diafragma (Stops of dynamic range)",
      "Distribución de stops por encima y por debajo del gris medio 18%",
      "Piso de ruido (Noise floor) y punto de recorte (Clipping point)"
    ],
    applications: [
      "Captura para masterización HDR (High Dynamic Range)",
      "Rodajes en exteriores con luz solar directa y sombras densas"
    ],
    examples: [
      "Rodar con un sensor de 16 stops de rango dinámico para conservar los detalles de las nubes en el cielo y la textura del rostro en sombra sin quemar la escena."
    ],
    synonyms: ["Rango Dinámico", "Exposure Latitude", "Dynamic Range Stops"],
    attributes: {
      faseProduccion: "Rodaje",
      categoriaCanon: "Cámara, Encuadre & Movimiento",
      fuenteIndice: "Expansión Técnica DocWeb #15"
    },
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Directiva indispensable para exigir iluminación cinematográfica rica en contrastes sin artefactos de recorte en IA generativa.",
      promptTokens: ["16 stops of dynamic range", "filmic highlight rolloff", "deep textured shadows", "wide exposure latitude", "HDR master quality"],
      negativeTokens: ["clipped white sky", "crushed pitch-black shadows", "posterization", "flat video look"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora", "Kling AI", "Midjourney v6"]
    },
    metadata: {
      source: "verified_cinematography_standards",
      sourceIndex: 200,
      originalTitle: "Dynamic Range & Latitude",
      curationStatus: "original_editorial_smpte_ebu",
      verified: true
    },
    relations: [
      { type: "relatedTo", target: "urn:term:audiovisual-production:hdr", label: "se relaciona con", note: "Requisito técnico para masterización de alto rango dinámico" },
      { type: "relatedTo", target: "urn:term:audiovisual-production:raw", label: "se relaciona con", note: "La captura RAW preserva la totalidad del rango dinámico" },
      { type: "relatedTo", target: "urn:term:audiovisual-production:log", label: "se relaciona con", note: "Las curvas logarítmicas empaquetan el rango dinámico del sensor" }
    ]
  }
];

// Append new terms ensuring no duplicates
const existingSlugs = new Set(termsData.canonicalTerms.map(t => t.slug));
let added = 0;

for (const term of newTerms) {
  if (!existingSlugs.has(term.slug)) {
    termsData.canonicalTerms.push(term);
    existingSlugs.add(term.slug);
    added++;
  }
}

// Update terms count in glossary
glossaryData.termCount = termsData.canonicalTerms.length;

fs.writeFileSync(termsPath, JSON.stringify(termsData, null, 2), 'utf8');
fs.writeFileSync(glossaryPath, JSON.stringify(glossaryData, null, 2), 'utf8');

console.log(`Successfully added ${added} new terms. Total canonical terms in AudiovisualProduction: ${termsData.canonicalTerms.length}`);
