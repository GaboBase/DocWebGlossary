module.exports = {
  "avatar-digital": {
    denomination: "Avatar Digital (Synthespian / Metahumano)",
    synonyms: ["Metahumano", "Doble Digital", "Synthespian", "Virtual Human"],
    original_def: "Representación virtual tridimensional fotorrealista o estilizada de una persona humana, sintetizada mediante algoritmos de inteligencia artificial generativa o motores de render en tiempo real (Unreal Engine / MetaHuman), animada mediante captura de movimiento (mocap) o clonación vocal con sincronización labial automática.",
    context_of_use: "Presentadores virtuales de noticias corporativas, dobles digitales en escenas de riesgo de cine, interfaces conversacionales interactivas y experiencias en mundos virtuales.",
    example: "Generación de un avatar del embajador de marca que reproduce discursos corporativos en 12 idiomas diferentes sin necesidad de rodar físicamente en cada país.",
    visual_notes: "Rostro tridimensional con mapas de texturas dérmicas 8K y puntos de tracking de deformación facial facial FACS.",
    llm_prompt_guidance: "Palabras clave: 'photorealistic digital avatar, MetaHuman mesh, accurate facial lip-sync, sub-surface skin scattering, natural eye micro-movements'.",
    inferred_relations: { "se_utiliza_para": ["produccion-virtual"], "se_integra_con": ["clonacion-de-voz", "motion-capture", "video-generativo"] }
  },
  "clonacion-de-voz": {
    denomination: "Clonación de Voz (Voice Cloning / Síntesis Neuronal TTS)",
    synonyms: ["Clonación Vocal por IA", "Voice Synthesis", "Voice Cloning", "Voz Neuronal Generativa"],
    original_def: "Tecnología de inteligencia artificial basada en redes neuronales profundas que analiza un archivo de muestra de audio de la voz real de una persona (típicamente de 1 a 10 minutos de habla limpia) para extraer y modelar su timbre tímbrico, acento, entonación, formantes vocales y cadencia respiratoria, permitiendo sintetizar cualquier texto nuevo reproduciendo la voz idéntica de ese individuo con sincronización emocional.",
    context_of_use: "Localización multilingüe de videos corporativos, doblaje con la voz original del actor en otros idiomas, corrección de diálogos y accesibilidad.",
    example: "Clonar la voz del fundador de la empresa en inglés para generar automáticamente la versión en español de su presentación institucional preservando su tono y calidez vocal única.",
    visual_notes: "Espectrograma de frecuencias vocales comparando la onda original humana con la onda sintética neuronal mostrando concordancia de armónicos superior al 95%.",
    llm_prompt_guidance: "Palabras clave: 'high fidelity voice cloning, neural voice synthesis ElevenLabs style, natural emotional voice inflections, accurate vocal timbre preservation'.",
    inferred_relations: { "es_un_tipo_de": ["modelo-de-ia"], "se_combina_con": ["avatar-digital", "doblaje"], "requiere": ["disclosure-de-contenido-ia"] }
  },
  "deepfake": {
    denomination: "Deepfake (Reemplazo Facial Sintético por IA)",
    synonyms: ["Face-Swapping por IA", "Manipulación Sintética Facial", "Sustitución Facial Neuronal"],
    original_def: "Técnica avanzada de visión por computadora y aprendizaje profundo (redes neuronales generativas antagónicas - GANs y modelos de difusión) que mapea e injerta de forma hiperrealista los rasgos faciales, expresiones y sincronía labial de una persona sobre el cuerpo y rostro de otro individuo en un video preexistente.",
    context_of_use: "Rejuvenecimiento (de-aging) de actores veteranos en cine de Hollywood, sustitución de dobles en escenas de riesgo peligrosas, parodias autorizadas y generación de contenido sintético.",
    example: "Rejuvenecer digitalmente el rostro de un actor consagrado 40 años para una escena de flashback en un drama histórico mediante redes neuronales entrenadas con sus películas de juventud.",
    visual_notes: "Malla de puntos faciales (landmarks) calculando vectores de movimiento de cejas, boca y ojos para fusionar los bordes cutáneos sin líneas de costura visibles.",
    llm_prompt_guidance: "Palabras clave: 'photorealistic deepfake face swap, seamless edge blending, temporal facial consistency, natural skin tone integration'.",
    inferred_relations: { "es_un_tipo_de": ["modelo-de-ia"], "exige": ["disclosure-de-contenido-ia"], "se_aplica_en": ["vfx"] }
  },
  "disclosure-de-contenido-ia": {
    denomination: "Disclosure de Contenido IA (Etiquetado y Transparencia Sintética)",
    synonyms: ["Etiquetado de IA", "AI Content Transparency", "Declaración de Contenido Sintético", "Watermarking C2PA"],
    original_def: "Práctica ética, contractual y regulatoria (mandatoria según directivas como la AI Act europea y las políticas de plataformas como YouTube, TikTok y Meta) que consiste en declarar explícita y transparentemente a la audiencia y en los metadatos del archivo (estándar C2PA / Content Credentials) que un video, imagen o pista de voz fue generado, manipulado o alterado significativamente mediante algoritmos de inteligencia artificial.",
    context_of_use: "Publicación de comerciales, documentales, noticias corporativas y campañas políticas que contienen metraje o voces sintéticas.",
    example: "Añadir una insignia visual en pantalla y una etiqueta en los metadatos XMP de YouTube que indique: 'Contenido alterado o sintético: el audio y partes del video fueron generados con IA'.",
    visual_notes: "Insignia o marca de agua sutil con el icono de Content Credentials (CR) en la esquina superior y metadatos criptográficos incrustados en la cabecera del archivo.",
    llm_prompt_guidance: "Palabras clave: 'C2PA cryptographic watermark, AI content disclosure badge, transparent synthetic media labeling'.",
    inferred_relations: { "regula": ["video-generativo", "deepfake", "clonacion-de-voz"], "es_un_requisito_de": ["distribucion"] }
  },
  "edicion-asistida-por-ia": {
    denomination: "Edición Asistida por IA (AI-Powered Editing)",
    synonyms: ["Montaje Asistido por Inteligencia Artificial", "Smart Editing", "Copiloto de Edición"],
    original_def: "Conjunto de herramientas algorítmicas integradas en suites de montaje profesional que automatizan tareas repetitivas mediante modelos de visión y lenguaje: detección automática de silencios y palabras de relleno (eh, umm), edición basada en texto a través de transcripciones, selección automática de las mejores tomas, reencuadre inteligente para video vertical y eliminación de fondos sin pantalla verde.",
    context_of_use: "Optimización radical de tiempos de postproducción en productoras, agencias de marketing y creadores de contenido intensivo.",
    example: "El editor elimina todas las pausas de más de 1 segundo de una entrevista de una hora en un solo clic seleccionando 'Eliminar silencios' en el editor de texto de Premiere Pro.",
    visual_notes: "Ventana de transcripción interactiva donde tachar una frase en el procesador de texto recorta automáticamente los fotogramas correspondientes en la línea de tiempo de video.",
    llm_prompt_guidance: "Palabras clave: 'AI text-based editing, smart scene edit detection, automated pause removal, intelligent reframe timeline'.",
    inferred_relations: { "acelera_el": ["montaje"], "incorpora": ["transcripcion-automatica", "rotoscopia-automatica"] }
  },
  "modelo-de-ia": {
    denomination: "Modelo de IA (Foundational AI Video/Audio Model)",
    synonyms: ["Modelo Fundacional", "Red Neuronal Generativa", "AI Foundation Engine"],
    original_def: "Red neuronal profunda de gran escala (arquitecturas Transformer, Modelos de Difusión o Diffusion Transformers / DiT) entrenada con cientos de miles de horas de video, audio y descripciones textuales para aprender las leyes físicas de la luz, el movimiento tridimensional, la coherencia temporal y la gramática del lenguaje audiovisual, permitiendo generar o modificar contenido a partir de instrucciones textuales.",
    context_of_use: "Infraestructura matemática y algorítmica subyacente que alimenta plataformas como Runway Gen-3, Sora de OpenAI, Kling, Midjourney o ElevenLabs.",
    example: "Un modelo de difusión espacial y temporal que predice y genera fotograma a fotograma el movimiento coherente de un automóvil derrapando sobre una carretera mojada.",
    visual_notes: "Diagrama de arquitectura de red neuronal mostrando capas convolucionales y de atención (Self-Attention) procesando tensores de píxeles latentes.",
    llm_prompt_guidance: "Palabras clave: 'diffusion transformer DiT architecture, foundational video generation model, spatial-temporal latent model'.",
    inferred_relations: { "es_la_base_de": ["video-generativo", "clonacion-de-voz", "prompt"] }
  },
  "produccion-virtual": {
    denomination: "Producción Virtual (Virtual Production / In-Camera VFX)",
    synonyms: ["Producción Virtual en Set", "ICVFX (In-Camera VFX)", "StageCraft"],
    original_def: "Metodología revolucionaria de cinematografía que fusiona el rodaje de imagen real física con entornos tridimensionales digitales generados en tiempo real por motores de videojuegos (Unreal Engine). Los fondos se proyectan sobre colosales pantallas LED curvas (volúmenes LED) sincronizadas con el movimiento de la cámara física mediante rastreo espacial (camera tracking), logrando que la perspectiva y la iluminación sobre los actores coincidan a la perfección en cámara.",
    context_of_use: "Largometrajes de gran escala (como The Mandalorian), comerciales automotrices y series dramáticas de ciencia ficción y época.",
    example: "Filmar a los actores en una nave espacial: el volumen LED proyecta el planeta Marte con luz rojiza real rebotando en los cascos de los actores sin usar pantallas verdes ni postproducción de croma.",
    visual_notes: "Pared envolvente de paneles LED gigantes mostrando un paisaje desértico con la cámara en grúa equipada con sensores de tracking en el techo del estudio.",
    llm_prompt_guidance: "Palabras clave: 'virtual production stage, LED volume wall Unreal Engine background, in-camera visual effects ICVFX, real-time parallax tracking'.",
    inferred_relations: { "integra": ["volumen-led", "render-en-tiempo-real", "camera-tracking"], "sustituye_a": ["chroma-key"] }
  },
  "prompt": {
    denomination: "Prompt (Consigna Textual de Generación por IA)",
    synonyms: ["Consigna Textual", "Instrucción de Prompting", "Text Prompt"],
    original_def: "Cadena estructurada de texto natural, parámetros técnicos, palabras clave estilísticas y condicionantes formales suministrada a un modelo de inteligencia artificial generativa para guiar con precisión la síntesis de una imagen, un clip de video, una locución o una pista musical, especificando plano, lente, iluminación, movimiento y acción dramática.",
    context_of_use: "Herramienta operativa principal en flujos de trabajo de creación audiovisual generativa con IA (Runway, Sora, Midjourney, Pika).",
    example: "'Cinematic wide shot, 35mm lens, f/2.8, slow dolly forward, golden hour lighting, a lone astronaut walking across Martian red dunes, photorealistic 8k, 24fps'.",
    visual_notes: "Cuadro de texto de entrada con la consigna tipiada acompañada de selectores de semilla (seed), relación de aspecto (16:9) y fuerza de movimiento (motion brush).",
    llm_prompt_guidance: "Palabras clave: 'structured technical prompt, camera cues prompt engineering, lighting and focal length descriptors, negative prompt constraints'.",
    inferred_relations: { "guia_al": ["video-generativo", "modelo-de-ia"], "determina_la": ["calidad-de-imagen"] }
  },
  "reduccion-de-ruido-por-ia": {
    denomination: "Reducción de Ruido por IA (AI Noise Reduction / Voice Isolation)",
    synonyms: ["Aislamiento de Voz por IA", "Voice Isolation", "AI Audio Denoising"],
    original_def: "Algoritmo de procesamiento digital de señales entrenado mediante aprendizaje profundo para separar y aislar con extrema pulcritud las frecuencias de la voz humana de cualquier ruido ambiental de fondo (tráfico, aire acondicionado, viento, murmullo de cafetería o eco de habitación), reconstruyendo armónicos vocales perdidos sin generar los artefactos metálicos acuosos de los filtros tradicionales.",
    context_of_use: "Limpieza de sonido directo en documentales, entrevistas en exteriores ruidosos y rescate de pistas de audio deficientes en postproducción.",
    example: "Activar 'Voice Isolation' en DaVinci Resolve para eliminar completamente el rugido de los motores de avión en una entrevista grabada junto a una pista de aterrizaje.",
    visual_notes: "Deslizador de porcentaje (0% a 100%) en el panel de pista de audio de la NLE; la forma de onda del ruido continuo desaparece dejando solo los pulsos de la voz.",
    llm_prompt_guidance: "Palabras clave: 'AI voice isolation clean speech, neural audio denoising, removal of background street noise, studio-quality speech extraction'.",
    inferred_relations: { "es_un_tipo_de": ["edicion-asistida-por-ia"], "mejora_el": ["audio-directo"], "previene_el": ["adr"] }
  },
  "render-en-tiempo-real": {
    denomination: "Render en Tiempo Real (Real-Time Rendering)",
    synonyms: ["Renderizado en Vivo", "Motor de Render en Tiempo Real (Unreal Engine / Unity)", "Real-Time GPU Compute"],
    original_def: "Capacidad computacional gráfica de procesar, iluminar y calcular fotogramas visuales complejos a una velocidad igual o superior a la tasa de reproducción interactiva (a 24, 60 o 120 fps constantes sin demoras de procesamiento previo), utilizando tarjetas gráficas de última generación con trazado de rayos por hardware (Ray Tracing / Path Tracing).",
    context_of_use: "Producción virtual en volúmenes LED, transmisiones de televisión con realidad aumentada (AR) y experiencias inmersivas interactivas.",
    example: "Unreal Engine 5 recalculando la iluminación y el reflejo de las paredes del castillo en tiempo real a 60 fps mientras la cámara del set se mueve libremente.",
    visual_notes: "Visualizador de viewport 3D ejecutándose a 60 FPS estables con cálculo dinámico de iluminación global Lumen y sombras suaves instantáneas.",
    llm_prompt_guidance: "Palabras clave: 'Unreal Engine real-time rendering, hardware ray tracing 60fps, Lumen global illumination, instantaneous frame computation'.",
    inferred_relations: { "habilita_la": ["produccion-virtual"], "sustenta_al": ["volumen-led"] }
  },
  "rotoscopia-automatica": {
    denomination: "Rotoscopia Automática (AI Magic Mask / Neural Rotoscoping)",
    synonyms: ["Máscara Mágica por IA", "Roto Neuronal", "AI Background Removal"],
    original_def: "Herramienta de postproducción de video basada en redes neuronales de segmentación semántica que aísla y recorta automáticamente a una persona u objeto en movimiento a lo largo de un plano con solo trazar una pincelada sobre el sujeto, rastreando su silueta con precisión de cabello y ropa sin requerir máscaras manuales fotograma por fotograma.",
    context_of_use: "Aplicación selectiva de etalonaje solo en el personaje, inserción de títulos detrás de personas y eliminación de fondos en segundos.",
    example: "El colorista pasa un trazo con la Magic Mask de DaVinci sobre el rostro del protagonista y en 5 segundos tiene una máscara perfecta que sigue su rostro durante toda la toma de 20 segundos.",
    visual_notes: "Superposición de máscara de color rojo semitransparente cubriendo milimétricamente al personaje mientras este se desplaza y gira.",
    llm_prompt_guidance: "Palabras clave: 'AI magic mask rotoscoping, neural semantic segmentation mask, automatic person cutout video'.",
    inferred_relations: { "evoluciona_de": ["rotoscopia"], "es_un_tipo_de": ["edicion-asistida-por-ia"], "genera": ["canal-alfa"] }
  },
  "transcripcion-automatica": {
    denomination: "Transcripción Automática (Speech-to-Text por IA)",
    synonyms: ["Transcripción Neuronal", "Reconocimiento de Voz por IA", "Speech-to-Text (STT)"],
    original_def: "Tecnología de procesamiento del lenguaje natural y reconocimiento automático del habla basada en modelos neuronales (como Whisper de OpenAI) que convierte la pista vocal de un archivo de video en texto mecanografiado con código de tiempo de entrada y salida preciso por palabra, permitiendo generar subtítulos instantáneos y montar video a través de la edición del texto transcrito.",
    context_of_use: "Generación automática de subtítulos para accesibilidad, búsqueda de parlamentos en entrevistas de horas de duración y edición basada en texto.",
    example: "Convertir una entrevista de 45 minutos en un guion transcrito con marcas de tiempo en menos de 2 minutos, con más del 98% de precisión en los términos técnicos.",
    visual_notes: "Columna de texto sincronizada junto a la ventana de visualización donde cada palabra se resalta en azul al ser pronunciada en el video.",
    llm_prompt_guidance: "Palabras clave: 'Whisper AI speech to text transcription, precise word-level timecode sync, automated caption generation'.",
    inferred_relations: { "produce": ["srt", "subtitulos-quemados"], "alimenta_la": ["edicion-asistida-por-ia"] }
  },
  "upscaling-por-ia": {
    denomination: "Upscaling por IA (Superresolución Neuronal)",
    synonyms: ["Superresolución por IA", "AI Video Upscaler", "Restauración y Escalado Neuronal"],
    original_def: "Proceso algorítmico que utiliza redes neuronales convolucionales o modelos generativos entrenados para incrementar la resolución espacial de un video (por ejemplo, escalar de 1080p a 4K o de 4K a 8K), no simplemente duplicando píxeles o interpolando linealmente, sino inventando y sintetizando detalles microtexturales fotorrealistas coherentes con el contenido.",
    context_of_use: "Restauración de películas y material de archivo antiguo, mejora de tomas de archivo en baja resolución y masterización a gran formato.",
    example: "Procesar con Topaz Video AI un metraje de archivo de 1970 grabado en 480p para convertirlo en una toma limpia y nítida en 4K apta para proyectarse en pantallas gigantes.",
    visual_notes: "Comparativa en pantalla dividida: a la izquierda, la imagen escalada por bicúbico muestra bordes borrosos; a la derecha, la versión con IA muestra pestañas individuales y poros en la piel.",
    llm_prompt_guidance: "Palabras clave: 'AI video upscaling, neural super-resolution detail enhancement, photorealistic texture hallucination Topaz style'.",
    inferred_relations: { "es_un_tipo_de": ["modelo-de-ia"], "incrementa_la": ["resolucion"], "mejora_la": ["calidad-de-imagen"] }
  },
  "video-generativo": {
    denomination: "Video Generativo (Text-to-Video / Image-to-Video)",
    synonyms: ["Generación de Video por IA", "Text-to-Video (T2V)", "Metraje Sintético Generativo"],
    original_def: "Disciplina de la inteligencia artificial generativa en la que modelos multimodales avanzados sintetizan secuencias continuas de video fotorrealista o estilizado a partir de instrucciones textuales (prompts), imágenes de referencia fija (Image-to-Video) o condicionantes de cámara, calculando la coherencia física, lumínica y temporal entre fotogramas sin necesidad de filmar en un set.",
    context_of_use: "Creación de conceptos visuales rápidos en preproducción, planos de recurso imposibles de rodar físicamente, efectos de ciencia ficción y publicidad experimental.",
    example: "Generar un clip cinematográfico de 5 segundos de una ballena luminiscente volando sobre los rascacielos de Tokio en una noche lluviosa mediante una consigna de texto en Runway Gen-3.",
    visual_notes: "Diagrama mostrando el flujo Prompt de Texto -> Espacio Latente Neuronal -> Difusión Temporal -> Fotogramas de Video Coherentes.",
    llm_prompt_guidance: "Palabras clave: 'Runway Gen-3 photorealistic video, Sora hyper-realistic physics, text-to-video coherent motion, high frame consistency video generation'.",
    inferred_relations: { "se_alimenta_de": ["prompt", "modelo-de-ia"], "requiere": ["disclosure-de-contenido-ia"], "se_opone_a": ["live-action"] }
  },
  "volumen-led": {
    denomination: "Volumen LED (LED Volume / Paredes LED para Producción Virtual)",
    synonyms: ["Pared LED Curva", "Cueva LED Virtual", "StageCraft LED Studio"],
    original_def: "Instalación física compuesta por una gigantesca pared semicircular cóncava y un techo continuo de paneles de micro-LED de alta resolución y alto brillo, controlados por procesadores de video dedicados. Muestran escenarios tridimensionales en tiempo real que envuelven el set de rodaje, proyectando una luz ambiental fotorrealista perfecta sobre los actores y objetos reales.",
    context_of_use: "Platós de producción virtual de última generación para cine, series y comerciales automovilísticos.",
    example: "Un estudio con un volumen LED de 25 metros de diámetro y 6 metros de altura donde se filman escenas de un viaje en tren mientras el paisaje exterior pasa a 100 km/h por las ventanas.",
    visual_notes: "Estructura colosal semicircular de pantallas LED iluminadas con un cielo atardecer reflejándose orgánicamente en la carrocería brillante de un coche situado en el centro.",
    llm_prompt_guidance: "Palabras clave: 'giant LED volume wall cinema set, curved Micro-LED stage, realistic in-camera lighting reflections on actors'.",
    inferred_relations: { "es_la_infraestructura_de": ["produccion-virtual"], "sustenta_el": ["render-en-tiempo-real"] }
  },
  "vr": {
    denomination: "VR (Virtual Reality / Realidad Virtual Audiovisual)",
    synonyms: ["Realidad Virtual", "Video 360 Grados", "Inmersión VR"],
    original_def: "Medio y tecnología audiovisual inmersiva que sustituye completamente el campo visual y auditivo del usuario mediante un visor estereoscópico montado en la cabeza (HMD) con seguimiento de posición de seis grados de libertad (6DoF) y audio espacial binaural, situándolo dentro de un entorno esférico de 360 grados filmado con rigs multicámara esféricos o sintetizado en 3D.",
    context_of_use: "Experiencias de entretenimiento interactivo, simulaciones de entrenamiento corporativo y médico, y cortometrajes inmersivos.",
    example: "Un documental en video 360° estereoscópico que sitúa al espectador en la cima del monte Everest permitiéndole mirar en cualquier dirección libremente.",
    visual_notes: "Usuario con visor VR Meta Quest y auriculares cerrados interactuando con las manos en un entorno espacial esférico.",
    llm_prompt_guidance: "Palabras clave: 'immersive 360 VR experience, stereoscopic virtual reality headset view, 6DoF spatial environment'.",
    inferred_relations: { "es_un_tipo_de": ["xr"], "requiere": ["audio-inmersivo"] }
  },
  "xr": {
    denomination: "XR (Extended Reality / Realidad Extendida)",
    synonyms: ["Realidad Extendida", "Ecosistema Inmersivo XR", "Realidad Mixta y Aumentada"],
    original_def: "Término paraguas que engloba el espectro completo de tecnologías que combinan elementos reales y virtuales: Realidad Virtual (VR, inmersión total), Realidad Aumentada (AR, superposición de gráficos digitales sobre el mundo real) y Realidad Mixta (MR, interacción física de elementos digitales con objetos reales del entorno tangible).",
    context_of_use: "Producción audiovisual de vanguardia, escenografías interactivas para programas en directo y conciertos masivos con gráficos flotantes.",
    example: "Un noticiero de televisión donde el presentador camina alrededor de un holograma tridimensional interactivo de un huracán que gira en el centro del plató.",
    visual_notes: "Superposición de interfaces gráficas tridimensionales flotando en el espacio físico real de un set de televisión.",
    llm_prompt_guidance: "Palabras clave: 'extended reality XR studio, mixed reality holographic display, broadcast augmented reality overlay'.",
    inferred_relations: { "engloba": ["vr", "produccion-virtual"], "emplea": ["render-en-tiempo-real"] }
  }
};
