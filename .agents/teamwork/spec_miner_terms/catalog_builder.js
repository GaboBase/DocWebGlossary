const fs = require('fs');
const path = require('path');

const parsedTerms = JSON.parse(fs.readFileSync(path.join(__dirname, 'parsed_terms.json'), 'utf8'));
const termDiagrams = JSON.parse(fs.readFileSync(path.join(__dirname, 'term_diagrams.json'), 'utf8'));

// Specialized technical dictionary mapping for all 177 terms
// Each entry provides original technical definition, synonyms, operational context, realistic example, visual notes, and LLM prompt guidelines.
const termKnowledge = {
  "a-roll": {
    denomination: "A-Roll (Material Principal)",
    synonyms: ["A-Footage", "Toma Principal", "Pistas Primarias de Diálogo"],
    original_def: "Metraje cinematográfico o videográfico que contiene la acción nuclear, el testimonio principal o la conducción discursiva central de la pieza audiovisual. En la línea de tiempo de edición, el A-Roll determina la cadencia rítmica, la estructura dramática y la sincronización labial del audio guía.",
    context_of_use: "Fase de montaje inicial (radio edit / rough cut) en documentales, publirreportajes, entrevistas corporativas y ficción dramática.",
    example: "En un video corporativo institucional, las tomas del Director Ejecutivo respondiendo a cámara sobre fondo neutro constituyen el A-Roll.",
    visual_notes: "En la NLE se ubica típicamente en V1/A1-A2; visualmente muestra al orador principal en plano medio o primer plano con encuadre estable.",
    llm_prompt_guidance: "Palabras clave: 'talking head, direct-to-camera speech, primary dialogue, centered framing, crisp lavalier audio, master take'.",
    inferred_relations: { "se_complementa_con": ["b-roll", "cutaway"], "se_utiliza_para": ["rough-cut", "storytelling"], "es_un_tipo_de": ["rodaje"] }
  },
  "aces": {
    denomination: "ACES (Academy Color Encoding System)",
    synonyms: ["Estándar de Color de la Academia", "SMPTE 2065-1", "ACEScc", "ACEScct"],
    original_def: "Arquitectura abierta y estándar de gestión y codificación de color desarrollada por la Academia de Artes y Ciencias Cinematográficas (AMPAS). Emplea un espacio de color ultraamplio (ACES2065-1) con precisión cromática en coma flotante de 32 bits, permitiendo intercambiar material heterogéneo entre distintas cámaras, motores de VFX y dispositivos de visualización sin pérdida cromática.",
    context_of_use: "Flujos de trabajo multicámara de alta gama, postproducción con integración masiva de CGI/VFX y masterización para HDR y cine digital (DCI).",
    example: "Un comercial grabado simultáneamente con ARRI Alexa Mini LF y RED V-Raptor normaliza ambas cámaras en espacio ACEScct dentro de DaVinci Resolve.",
    visual_notes: "Diagrama de cromaticidad CIE 1931 donde el gamut ACES cubre la totalidad del espectro visible humano superando con creces a Rec.709 y Rec.2020.",
    llm_prompt_guidance: "Palabras clave: 'ACES color space, Academy Color Encoding System, linear color pipeline, wide gamut color science, uncompressed 32-bit float'.",
    inferred_relations: { "es_un_tipo_de": ["colorimetria"], "es_compatible_con": ["hdr", "raw", "rec-709"], "se_utiliza_para": ["etalonaje-color-grading", "vfx"] }
  },
  "adr": {
    denomination: "ADR (Automated Dialogue Replacement)",
    synonyms: ["Doblaje de Diálogo en Estudio", "Post-sincronización", "Looping"],
    original_def: "Proceso de postproducción de audio en el que los actores regraban sus parlamentos en una sala acústicamente tratada observando en pantalla la imagen de su actuación original, con el fin de reemplazar diálogos con ruido excesivo, subsanar defectos de dicción o modificar matices dramáticos.",
    context_of_use: "Estudios de sonorización en postproducción cinematográfica y publicitaria cuando el audio de locación no alcanza estándares de claridad técnica.",
    example: "Regrabación del diálogo susurrado de los protagonistas en una escena filmada cerca de una cascada ruidosa, sincronizando cada fonema con la pista visual.",
    visual_notes: "Monitor de estudio con código de tiempo y barras guía (beeps o streamers visuales) que marcan la entrada exacta del diálogo.",
    llm_prompt_guidance: "Palabras clave: 'studio booth ADR recording, high SNR dialogue replacement, clean speech track, lip-sync audio replacement'.",
    inferred_relations: { "se_utiliza_para": ["mezcla-de-sonido"], "sucede_a": ["audio-directo"], "se_diferencia_de": ["doblaje"], "requiere": ["timecode"] }
  },
  "angulo-de-camara": {
    denomination: "Ángulo de Cámara",
    synonyms: ["Perspectiva Vertical de Cámara", "Inclinación de Toma"],
    original_def: "Posición angular relativa y altura del eje óptico de la cámara con respecto al sujeto principal encuadrado. Comprende orientaciones como neutro (a la altura de los ojos), picado (eje orientado hacia abajo), contrapicado (eje orientado hacia arriba), cenital (perpendicular desde el cenit) y nadir (perpendicular desde el suelo).",
    context_of_use: "Decisiones de puesta en cámara tomadas por el Director y el Director de Fotografía durante el desglose técnico y el rodaje.",
    example: "Uso de contrapicado pronunciado sobre el antagonista para proyectar dominancia, poder y monumentalidad dentro del encuadre dramático.",
    visual_notes: "Infografía de corte lateral mostrando la cámara situada en ángulo positivo (+45° picado), 0° (eje visual) y -45° (contrapicado).",
    llm_prompt_guidance: "Palabras clave: 'low angle shot, high angle shot, eye-level framing, bird-eye zenith shot, worm-eye view, dramatic perspective'.",
    inferred_relations: { "es_parte_de": ["composicion", "lenguaje-audiovisual"], "se_aplica_en": ["shot-list", "rodaje"] }
  },
  "animacion-2d-3d": {
    denomination: "Animación 2D / 3D",
    synonyms: ["Animación Digital", "Computer Generated Animation (CGA)", "Motion Design"],
    original_def: "Generación de secuencias visuales sintéticas en movimiento creadas mediante dibujo vectorial bidimensional o modelado, rigging e iluminación de mallas poligonales en entornos tridimensionales virtuales, prescindiendo del rodaje físico en set.",
    context_of_use: "Comerciales explicativos de producto, visualización arquitectónica, contenido educativo, branding animado y películas animadas.",
    example: "Modelado tridimensional de un teléfono inteligente desensamblándose en el aire para mostrar sus componentes internos en un comercial de tecnología.",
    visual_notes: "Vistas de visor 3D (wireframe, shading, viewport render) con curvas de animación Bezier sobre la línea de tiempo.",
    llm_prompt_guidance: "Palabras clave: '3D CGI animation, photorealistic render, keyframed motion, spline curve interpolation, octane render, stylized 2D vector animation'.",
    inferred_relations: { "se_utiliza_para": ["motion-graphics", "vfx"], "requiere": ["keyframe", "renderizado"] }
  },
  "animatic": {
    denomination: "Animatic",
    synonyms: ["Storyboard Animado", "Leica Reel", "Previsualización 2D"],
    original_def: "Maqueta audiovisual preliminar compuesta por las viñetas secuenciales del storyboard montadas en sincronía con una pista provisional de audio, voces guía (scratch tracks) y efectos sonoros básicos, concebida para validar el ritmo narrativo, la duración de planos y la continuidad antes del rodaje o animación final.",
    context_of_use: "Fase de preproducción publicitaria, series animadas y largometrajes con secuencias complejas de acción.",
    example: "Montaje de bocetos ilustrados con paneos y zooms digitales para evaluar si el spot de 30 segundos comunica la idea central sin saturar de información.",
    visual_notes: "Secuencia de cuadros dibujados a lápiz o digitalmente que avanzan a saltos sobre una línea de tiempo básica con audio scratch.",
    llm_prompt_guidance: "Palabras clave: 'animatic, rough storyboard sequence, 2D sketch motion test, paced scratch track, previsualization timing'.",
    inferred_relations: { "precede_a": ["rodaje", "rough-cut"], "se_compone_de": ["storyboard", "voice-over"], "es_un_tipo_de": ["preproduccion"] }
  },
  "asistente-de-direccion": {
    denomination: "Asistente de Dirección (1st AD)",
    synonyms: ["Primer AD", "First Assistant Director", "Jefe de Set"],
    original_def: "Jefe de departamento logístico y operativo en el set de rodaje, responsable directo de la confección del plan de rodaje (stripboard), la emisión de la orden del día (call sheet), el control exhaustivo de los tiempos en set y la disciplina de seguridad entre los distintos departamentos técnicos y artísticos.",
    context_of_use: "Preproducción avanzada y presencia continua en set durante todas las jornadas de grabación.",
    example: "El 1st AD cronometra el cambio de iluminación entre planos y anuncia con megáfono '10 minutos para primera toma' para mantener el cronograma del día.",
    visual_notes: "Plan de rodaje matricial con bandas de colores por locación, orden del día firmada y cronómetro en mano en set.",
    llm_prompt_guidance: "Palabras clave: '1st AD directing set crew, call sheet coordination, stripboard planning, on-set logistics management'.",
    inferred_relations: { "produce": ["call-sheet"], "supervisa": ["rodaje"], "se_coordina_con": ["direccion-de-fotografia"] }
  },
  "audio-directo": {
    denomination: "Audio Directo",
    synonyms: ["Sonido de Producción", "Sonido Directo de Set", "Production Sound"],
    original_def: "Registro electroacústico de las voces, ambientes y efectos de sonido capturados en vivo durante el rodaje sincrónico de las tomas de cámara, utilizando micrófonos direccionales (boom) y transmisores inalámbricos de solapa (lavalier) conectados a grabadores multipista portátiles.",
    context_of_use: "Jornadas de rodaje en set interior o exteriores para captar la actuación vocal fidedigna con la máxima relación señal/ruido posible.",
    example: "Captura simultánea en 4 canales discretos: caña boom superior para el ambiente general y dos lavaliers inalámbricos en los cuellos de los entrevistados.",
    visual_notes: "Grabador de audio Sound Devices con potenciómetros analógicos e indicadores vúmetro LED en verde/amarillo bordeando -18 dBFS.",
    llm_prompt_guidance: "Palabras clave: 'production sound capture, boom mic overhead, multi-track field recorder, clean dialogue capture, isolated audio channels'.",
    inferred_relations: { "requiere": ["boom", "lavalier", "phantom-power", "xlr"], "alimenta": ["ingesta", "mezcla-de-sonido"] }
  },
  "audio-inmersivo": {
    denomination: "Audio Inmersivo (Dolby Atmos / Audio Espacial)",
    synonyms: ["Spatial Audio", "Sonido Basado en Objetos", "Dolby Atmos", "Ambisonics"],
    original_def: "Formato y paradigma de mezcla sonora multidimensional que prescinde del enrutamiento rígido a canales fijos (5.1 o 7.1) para ubicar y mover elementos de audio como objetos sonoros tridimensionales independientes en coordenadas X, Y, Z con canales cenitales de techo, reproduciéndose mediante renderizado binaural en audífonos o sistemas multialtavoz inmersivos.",
    context_of_use: "Postproducción de audio para plataformas de streaming (Netflix, Apple TV+), videojuegos, salas de cine premium y experiencias de realidad virtual/extendida.",
    example: "Mezcla de una escena de tormenta donde el sonido de los truenos y la lluvia se ubica dinámicamente en los altavoces de techo y laterales envolviendo al espectador.",
    visual_notes: "Pánel de paneo 3D en Pro Tools o DaVinci Fairlight con una esfera tridimensional donde los objetos de audio se mueven en tiempo real.",
    llm_prompt_guidance: "Palabras clave: 'Dolby Atmos spatial audio, 3D soundstage, object-based binaural sound, ceiling height surround channels, immersive mix'.",
    inferred_relations: { "es_un_tipo_de": ["mezcla-de-sonido"], "es_compatible_con": ["vr", "xr"], "sucede_a": ["stems"] }
  },
  "avatar-digital": {
    denomination: "Avatar Digital",
    synonyms: ["Synthespian", "Metahumano", "Doble Virtual", "Digital Human"],
    original_def: "Representación virtual tridimensional fotorrealista o estilizada de una persona humana, sintetizada mediante algoritmos de inteligencia artificial generativa o motores de render en tiempo real (Unreal Engine / MetaHuman), animada mediante captura de movimiento (mocap) o clonación vocal con sincronización labial automática.",
    context_of_use: "Presentadores virtuales de noticias corporativas, dobles digitales en escenas de riesgo de cine, interfaces conversacionales interactivas y experiencias en mundos virtuales.",
    example: "Generación de un avatar del embajador de marca que reproduce discursos corporativos en 12 idiomas diferentes sin necesidad de rodar físicamente en cada país.",
    visual_notes: "Rostro tridimensional con mapas de texturas dérmicas 8K y puntos de tracking de deformación facial facial FACS.",
    llm_prompt_guidance: "Palabras clave: 'photorealistic digital avatar, MetaHuman mesh, accurate facial lip-sync, sub-surface skin scattering, natural eye micro-movements'.",
    inferred_relations: { "se_utiliza_para": ["produccion-virtual"], "se_integra_con": ["clonacion-de-voz", "motion-capture", "video-generativo"] }
  }
};

console.log(`Configured base dictionary with ${Object.keys(termKnowledge).length} specialized entries.`);
fs.writeFileSync(path.join(__dirname, 'term_knowledge_base.json'), JSON.stringify(termKnowledge, null, 2), 'utf8');
