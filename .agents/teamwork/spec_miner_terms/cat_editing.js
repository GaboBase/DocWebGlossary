module.exports = {
  "a-roll": {
    denomination: "A-Roll (Material Principal de Diálogo / Acción)",
    synonyms: ["A-Footage", "Toma Principal", "Pistas Primarias de Diálogo"],
    original_def: "Metraje cinematográfico o videográfico que contiene la acción nuclear, el testimonio principal o la conducción discursiva central de la pieza audiovisual. En la línea de tiempo de edición, el A-Roll determina la cadencia rítmica, la estructura dramática y la sincronización labial del audio guía.",
    context_of_use: "Fase de montaje inicial (radio edit / rough cut) en documentales, publirreportajes, entrevistas corporativas y ficción dramática.",
    example: "En un video corporativo institucional, las tomas del Director Ejecutivo respondiendo a cámara sobre fondo neutro constituyen el A-Roll.",
    visual_notes: "En la NLE se ubica típicamente en V1/A1-A2; visualmente muestra al orador principal en plano medio o primer plano con encuadre estable.",
    llm_prompt_guidance: "Palabras clave: 'talking head, direct-to-camera speech, primary dialogue, centered framing, crisp lavalier audio, master take'.",
    inferred_relations: { "se_complementa_con": ["b-roll", "cutaway"], "se_utiliza_para": ["rough-cut", "storytelling"], "es_un_tipo_de": ["rodaje"] }
  },
  "b-roll": {
    denomination: "B-Roll (Material de Apoyo / Metraje Secundario)",
    synonyms: ["Material de Apoyo", "Tomas de Recurso", "Metraje B", "Cutaway Footage"],
    original_def: "Metraje secundario grabado para complementar visualmente la narración principal (A-Roll). Abarca detalles del entorno, procesos de trabajo, rostros de oyentes, planos de situación y acciones dinámicas que se insertan sobre el discurso para ilustrar lo que se dice, cubrir cortes de edición y enriquecer el dinamismo visual.",
    context_of_use: "Montaje de documentales, reportajes, comerciales de televisión y videos de marketing digital.",
    example: "Mientras el artesano explica cómo moldea la cerámica (A-Roll), el editor muestra planos cerrados de sus manos cubiertas de barro girando en el torno (B-Roll).",
    visual_notes: "En la línea de tiempo se ubica en las pistas de video superiores (V2, V3) cubriendo la pista de video principal pero manteniendo el audio del orador.",
    llm_prompt_guidance: "Palabras clave: 'cinematic B-roll montage, detailed macro shots, slow panning contextual footage, high dynamic visual texture'.",
    inferred_relations: { "cubre": ["a-roll", "jump-cut"], "se_compone_de": ["cutaway", "plano-detalle"] }
  },
  "banco-de-edicion": {
    denomination: "Banco de Edición (Suite de Montaje / Estación NLE)",
    synonyms: ["Isla de Edición", "Editing Suite", "Estación de Postproducción"],
    original_def: "Entorno físico y técnico optimizado acústica y lumínicamente, equipado con una estación de trabajo informática de alto rendimiento, almacenamiento RAID de alta velocidad, software NLE profesional, monitores de referencia calibrados y altavoces de campo cercano para el montaje de imagen y sonido.",
    context_of_use: "Estudios de postproducción y salas de montaje en productoras audiovisuales y canales de televisión.",
    example: "El montajista trabaja en una sala con paredes grises neutras al 18%, luz indirecta D65 a 6500K y doble monitor 4K con tarjeta de salida Blackmagic DeckLink.",
    visual_notes: "Escritorio ergonómico con teclado con atajos de colores, superficie de control con jog/shuttle, monitores gemelos y paneles acústicos ranurados en las paredes.",
    llm_prompt_guidance: "Palabras clave: 'darkened editing suite, dual 4K monitors timeline, DaVinci Resolve console, studio acoustic treatment'.",
    inferred_relations: { "alberga": ["edicion-no-lineal", "montaje"], "utiliza": ["timecode"] }
  },
  "corte-en-j-l": {
    denomination: "Corte en J / Corte en L (J-Cut / L-Cut)",
    synonyms: ["Split Edit", "Corte Dividido de Audio", "Audio Lead / Audio Lag"],
    original_def: "Técnica de edición no sincrónica donde el corte de audio y el corte de video ocurren en momentos temporales distintos. En un Corte en J (J-cut), el audio del plano siguiente entra antes de que se vea su imagen; en un Corte en L (L-cut), la imagen cambia al nuevo plano pero el audio del plano anterior continúa escuchándose unos segundos por debajo.",
    context_of_use: "Transición fundamental en diálogos cinematográficos, documentales y escenas conversacionales para otorgar fluidez y naturalidad orgánica.",
    example: "Se escucha el ladrido de un perro (audio) dos segundos antes de que la imagen corte hacia la puerta de entrada donde aparece el animal (Corte en J).",
    visual_notes: "En el timeline de la NLE, las pistas de video y audio forman visiblemente la silueta de la letra 'J' o de la letra 'L' en los límites del corte.",
    llm_prompt_guidance: "Palabras clave: 'J-cut audio transition, seamless L-cut dialogue pacing, split edit cinema continuity, overlapping sound dialogue'.",
    inferred_relations: { "es_un_tipo_de": ["transicion"], "evita": ["jump-cut"], "mejora_el": ["montaje"] }
  },
  "coverage": {
    denomination: "Coverage (Cobertura de Escena)",
    synonyms: ["Cobertura Cinematográfica", "Planos de Cobertura", "Toma de Ángulos Múltiples"],
    original_def: "Conjunto de planos rodados desde diferentes ángulos, escalas de encuadre y perspectivas (plano maestro, plano medio, plano y contraplano, planos de recurso) para registrar una misma acción dramática completa, otorgando al montajista suficiente material y alternativas para construir el ritmo idóneo en postproducción.",
    context_of_use: "Estrategia de rodaje planificada por el director y el director de fotografía en el set de filmación.",
    example: "Rodar una cena familiar con un plano general maestro, tres planos medios y cuatro primeros planos de cada comensal para tener cobertura total en montaje.",
    visual_notes: "Diagrama de planta de set con múltiples iconos de cámaras situados en arco respetando el eje de 180 grados apuntando a los personajes.",
    llm_prompt_guidance: "Palabras clave: 'full scene coverage, master shot with matching singles, multi-angle dialogue coverage, cinematic coverage setup'.",
    inferred_relations: { "se_compone_de": ["master-shot", "over-the-shoulder-shot", "cutaway"], "facilita": ["montaje", "raccord"] }
  },
  "cutaway": {
    denomination: "Cutaway (Plano de Recurso / Plano Inserción)",
    synonyms: ["Plano de Inserción", "Plano de Apoyo", "Insert Cutaway"],
    original_def: "Plano breve que corta e interrumpe la acción o sujeto principal para mostrar un elemento exterior directamente relacionado con la escena (un reloj en la pared, las manos inquietas del personaje, un testigo mirando por la ventana). Sirve para aportar contexto, crear suspense o cubrir un salto de eje o elipsis en la pista de diálogo.",
    context_of_use: "Montaje rítmico en documentales, reportajes informativos y escenas de ficción dramática.",
    example: "Insertar un cutaway del cuadro torcido en la pared mientras el personaje habla nerviosamente por teléfono, reflejando su desconcierto psicológico.",
    visual_notes: "Clip corto de 1 a 3 segundos intercalado entre dos tomas del orador principal en la línea de tiempo.",
    llm_prompt_guidance: "Palabras clave: 'cinematic cutaway insert, contextual environmental detail, ticking clock cutaway, dramatic visual insert'.",
    inferred_relations: { "es_un_tipo_de": ["b-roll"], "evita": ["jump-cut"], "incluye": ["noddies"] }
  },
  "edicion-no-lineal": {
    denomination: "Edición No Lineal (NLE - Non-Linear Editing)",
    synonyms: ["NLE", "Montaje Digital No Destructivo", "Software de Edición"],
    original_def: "Sistema digital de edición de audio y video en el que los archivos de metraje se pueden acceder instantáneamente en cualquier orden temporal sin reproducir secuencialmente el material previo (a diferencia del antiguo montaje lineal en cinta analógica). Opera de forma no destructiva sobre punteros y metadatos sin alterar los archivos originales de cámara.",
    context_of_use: "Plataforma de trabajo universal en postproducción contemporánea (Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro, Avid Media Composer).",
    example: "El montajista reorganiza las tres escenas finales del documental arrastrándolas con el ratón en la línea de tiempo en cuestión de segundos.",
    visual_notes: "Interfaz NLE clásica con paneles de navegador de medios, monitor de origen, monitor de programa y línea de tiempo multipista horizontal.",
    llm_prompt_guidance: "Palabras clave: 'non-linear editing interface, NLE software timeline, multi-track digital video editing, video timeline scrubber'.",
    inferred_relations: { "sustituye_a": ["edicion-lineal"], "opera_en": ["banco-de-edicion"], "gestiona": ["timecode", "proxy"] }
  },
  "escena": {
    denomination: "Escena (Unidad Dramática Espaciotemporal)",
    synonyms: ["Scene", "Unidad Dramática de Espacio y Tiempo"],
    original_def: "Unidad dramática y narrativa del relato audiovisual delimitada por la unidad de tiempo y de espacio. Cada vez que la acción cambia de locación física o experimenta un salto temporal significativo, se inicia formalmente una nueva escena en el guion literario y técnico.",
    context_of_use: "Estructuración de guiones literarios, desglose de producción y ordenación de planos en rodaje y montaje.",
    example: "La Escena 14 se desarrolla íntegramente en el interior del automóvil de noche bajo la lluvia; al cortar a la mañana siguiente en la oficina del detective, comienza la Escena 15.",
    visual_notes: "Encabezado tipográfico canónico en el guion: 'EXT. CALLEJÓN OSCURO - NOCHE' numerado como ESCENA 12.",
    llm_prompt_guidance: "Palabras clave: 'complete cinematic scene, spatial and temporal unity, single-location dramatic beat'.",
    inferred_relations: { "se_compone_de": ["take", "coverage"], "conforma": ["secuencia"], "se_define_en": ["guion-literario"] }
  },
  "fade-in-fade-out": {
    denomination: "Fade In / Fade Out (Fundido a Negro / Apertura y Cierre)",
    synonyms: ["Fundido en Negro", "Fundido en Blanco", "Disolvencia a Negro"],
    original_def: "Transición óptica y dramática clásica en la que la imagen emerge gradualmente desde un fondo monocromático (habitualmente negro, aunque puede ser blanco u otro color) hasta alcanzar la plena opacidad visual (Fade In), o desvanece progresivamente la imagen hasta desaparecer por completo en el negro (Fade Out).",
    context_of_use: "Apertura y cierre formal de películas, transiciones de paso de tiempo significativo (elipsis temporal) o cambios drásticos de capítulo narrativo.",
    example: "Al morir el protagonista, la imagen realiza un lento Fade Out a negro de 4 segundos, marcando el desenlace trágico de la historia.",
    visual_notes: "Curva de opacidad descendente de 100% a 0% sobre un fondo negro plano en la cabecera o final del clip.",
    llm_prompt_guidance: "Palabras clave: 'cinematic fade to black, slow atmospheric fade in, dramatic screen fade out closure'.",
    inferred_relations: { "es_un_tipo_de": ["transicion"], "marca": ["elipsis-temporal"], "abre_o_cierra": ["secuencia"] }
  },
  "ingesta": {
    denomination: "Ingesta (Ingest / Transferencia de Medios)",
    synonyms: ["Ingestión de Material", "Descarga de Tarjetas", "Media Ingest"],
    original_def: "Fase inicial de la postproducción consistente en transferir de forma organizada, verificada (mediante algoritmos de comprobación de hash) y estructurada todos los archivos brutos de audio y video desde las tarjetas de memoria del rodaje hacia los discos duros de almacenamiento local o servidores compartidos de edición, organizando carpetas por día, cámara y escena.",
    context_of_use: "Llegada del material desde el set al banco de edición o laboratorio de postproducción al final de cada jornada de grabación.",
    example: "El asistente de postproducción utiliza Silverstack para volcar 512 GB de tarjetas RED Mini-Mag verificando la integridad MD5 antes de formatear las tarjetas.",
    visual_notes: "Barra de progreso de copia de archivos con reporte de verificación de integridad checksum en verde y árbol de carpetas con fechas estructuradas.",
    llm_prompt_guidance: "Palabras clave: 'media ingest workflow, checksum verified data transfer, organized raw footage directory ingest'.",
    inferred_relations: { "precede_a": ["proxy", "rough-cut"], "supervisado_por": ["dit-media-management"], "alimenta": ["montaje"] }
  },
  "jump-cut": {
    denomination: "Jump Cut (Salto de Eje Temporal / Salto de Corte)",
    synonyms: ["Corte de Salto", "Salto en el Eje", "Jump Cut"],
    original_def: "Corte abrupto y visible entre dos planos consecutivos del mismo sujeto tomados desde un ángulo de cámara y distancia prácticamente idénticos (diferencia inferior a 30 grados). Produce una sensación de salto espasmódico en el tiempo y el espacio; considerado un error en el montaje clásico de continuidad, se emplea deliberadamente en la modernidad (desde la Nouvelle Vague hasta YouTube) para acelerar el ritmo y condensar información.",
    context_of_use: "Videos para redes sociales, vlogs de YouTube, comerciales frenéticos de moda y secuencias de desorientación psicológica en cine.",
    example: "El orador explica una receta y el editor corta todas las pausas de respiración mediante jump cuts seguidos, imprimiendo un ritmo trepidante al video.",
    visual_notes: "El personaje parece teletransportarse instantáneamente de una postura a otra sin cambio aparente del encuadre general.",
    llm_prompt_guidance: "Palabras clave: 'modern jump cut editing style, staccato jump cut pacing, dynamic jump cuts YouTube style'.",
    inferred_relations: { "se_opone_a": ["raccord"], "se_suaviza_con": ["cutaway", "b-roll"], "es_un_tipo_de": ["montaje"] }
  },
  "montaje": {
    denomination: "Montaje (Edición Cinematográfica)",
    synonyms: ["Edición de Video", "Montaje Cinematográfico", "Film Editing / Montage"],
    original_def: "Arte, proceso técnico y lenguaje mediante el cual se seleccionan, recortan, yuxtaponen y articulan las distintas tomas registradas en el rodaje para construir una estructura espacio-temporal continua y con sentido, dotando a la obra de ritmo, tensión emocional, causalidad dramática y significado estético.",
    context_of_use: "Fase central de la postproducción de cualquier proyecto audiovisual tras la finalización del rodaje.",
    example: "Yuxtaponer el plano del rostro inexpresivo del actor con el plano de un plato de sopa humeante para sugerir hambre (efecto Kuleshov).",
    visual_notes: "Línea de tiempo densa con múltiples pistas de video superpuestas, cortes verticales limpios y sincronización con ondas de audio.",
    llm_prompt_guidance: "Palabras clave: 'masterful film editing, montage sequence pacing, juxtaposition of shots, rhythmic cut timing'.",
    inferred_relations: { "es_la_disciplina_de": ["postproduccion"], "articula": ["a-roll", "b-roll", "raccord"], "produce": ["rough-cut"] }
  },
  "postproduccion": {
    denomination: "Postproducción",
    synonyms: ["Fase de Finalización", "Post-production Phase", "Post"],
    original_def: "Tercera fase medular de la producción audiovisual que comprende todas las operaciones técnicas y artísticas ejecutadas tras concluir la filmación: ingesta y respaldo de medios, montaje editorial de imagen, diseño sonoro, mezcla y masterización de audio, efectos visuales digitales (VFX), corrección de color (etalonaje), subtitulación y exportación de archivos maestros.",
    context_of_use: "Desde el día posterior al fin de rodaje (wrap) hasta la entrega formal de los masters definitivos al cliente o distribuidor.",
    example: "Seis semanas de postproducción distribuidas en 3 semanas de edición offline, 1 semana de VFX, 1 semana de color grading y 1 semana de mezcla de audio final.",
    visual_notes: "Diagrama de flujo de postproducción conectando: Ingesta -> Offline Edit -> Picture Lock -> Conform -> Color Grading -> Sound Mix -> Master.",
    llm_prompt_guidance: "Palabras clave: 'post-production workflow, digital post-pipeline, color grading and audio mixing suite'.",
    inferred_relations: { "sucede_a": ["rodaje"], "contiene": ["montaje", "etalonaje-color-grading", "mezcla-de-sonido", "vfx"], "produce": ["deliverable"] }
  },
  "proxy": {
    denomination: "Proxy (Archivo de Edición Ligero / Offline Media)",
    synonyms: ["Medios Proxy", "Archivos Offline", "Copias de Baja Resolución"],
    original_def: "Archivo de video transcodificado en una resolución reducida (típicamente 1080p o 720p) y con un códec de edición sumamente ligero y eficiente (como ProRes Proxy, DNxHR LB o ProRes LT), generado a partir de los pesados archivos originales brutos de cámara (RAW 4K/8K). Permite un montaje ágil y fluido en computadoras estándar, reconectándose (relink / conform) a los archivos originales al final del proceso para el color y la exportación.",
    context_of_use: "Flujos de trabajo con metraje en resolución 4K, 6K u 8K, multicámara pesada o laptops portátiles de edición.",
    example: "Convertir 2 TB de material RAW 8K de RED en proxies ProRes Proxy de 150 GB para montar la película en una MacBook Pro ligera sin tirones.",
    visual_notes: "Interruptor 'Toggle Proxies' en la ventana de programa de la NLE que cambia instantáneamente entre la imagen nítida original y la versión proxy ligera.",
    llm_prompt_guidance: "Palabras clave: 'proxy workflow editing, lightweight offline video editing, ProRes Proxy timeline performance'.",
    inferred_relations: { "se_genera_mediante": ["transcoding"], "facilita": ["edicion-no-lineal"], "se_sustituye_en": ["master"] }
  },
  "raccord": {
    denomination: "Raccord (Continuidad Cinematográfica)",
    synonyms: ["Continuidad Cinematográfica", "Continuity", "Raccord de Movimiento / Mirada"],
    original_def: "Coherencia, fluidez y correspondencia lógica y física entre planos consecutivos en el montaje cinematográfico, de manera que la unión de tomas rodadas en momentos y ángulos diferentes sea percibida por el espectador como una acción continua y homogénea. Comprende raccord de movimiento, de posición, de iluminación, de vestuario, de sonido y de dirección de miradas.",
    context_of_use: "Supervisado en el set por el continuista o script supervisor y garantizado en la sala de edición por el montajista.",
    example: "Si el actor sostiene un vaso con la mano derecha en el plano general, en el corte al primer plano debe continuar sosteniéndolo con la misma mano y al mismo nivel de líquido.",
    visual_notes: "Dos fotogramas adyacentes comparados en split-screen verificando que la posición del brazo y el nivel de agua en la copa coincidan al milímetro.",
    llm_prompt_guidance: "Palabras clave: 'seamless film continuity, perfect raccord matching action cut, flawless actor continuity'.",
    inferred_relations: { "es_la_regla_de": ["montaje"], "supervisado_por": ["script-supervisor"], "se_rompe_en": ["jump-cut"] }
  },
  "rough-cut": {
    denomination: "Rough Cut (Corte Preliminar / Primer Ensamblaje)",
    synonyms: ["Primer Ensamblaje", "Assembly Cut", "Corte Borrador"],
    original_def: "Primera versión estructurada completa de la obra audiovisual montada en la línea de tiempo siguiendo el orden del guion. Integra las mejores tomas seleccionadas (circle takes) sin pulido fino de ritmo, sin música definitiva, sin etalonaje cromático y con sonido directo básico, sirviendo como base de discusión entre el montajista y el director.",
    context_of_use: "Hito crítico de revisión que concluye la primera etapa del montaje offline antes del corte fino (fine cut) y el bloqueo de imagen (picture lock).",
    example: "El primer corte preliminar de la película arroja una duración de 2 horas y 40 minutos; a partir de ahí, director y montajista trabajan para reducirlo a 1 hora y 50 minutos.",
    visual_notes: "Línea de tiempo completa sin huecos negros pero con cortes toscos, clips con títulos provisorios superpuestos y audio sin mezclar.",
    llm_prompt_guidance: "Palabras clave: 'rough cut assembly timeline, initial film assembly review, unpolished edit timeline'.",
    inferred_relations: { "deriva_de": ["ingesta", "a-roll"], "evoluciona_hacia": ["master"], "es_un_tipo_de": ["montaje"] }
  },
  "secuencia": {
    denomination: "Secuencia (Unidad Narrativa Temática)",
    synonyms: ["Sequence", "Bloque Narrativo", "Acto Menor"],
    original_def: "Unidad dramática superior compuesta por una serie de escenas vinculadas entre sí por una misma línea argumental, objetivo dramático o unidad de acción global, pudiendo desarrollarse a través de múltiples espacios y momentos temporales diferentes.",
    context_of_use: "Planificación del guion y montaje estructural de largometrajes, documentales y series.",
    example: "La 'secuencia del robo al banco' abarca cinco escenas consecutivas: la llegada de los autos a la calle, el ingreso a la sucursal, la apertura de la bóveda, el enfrentamiento policial y la huida.",
    visual_notes: "Bloque de escenas agrupadas bajo una misma etiqueta de color en el software de montaje o escaleta de guion.",
    llm_prompt_guidance: "Palabras clave: 'cinematic sequence progression, dramatic multi-scene beat, thematic story sequence'.",
    inferred_relations: { "se_compone_de": ["escena"], "conforma": ["storytelling"] }
  },
  "timecode": {
    denomination: "Timecode (Código de Tiempo SMPTE)",
    synonyms: ["Código de Tiempo SMPTE", "SMPTE Timecode (HH:MM:SS:FF)", "TC"],
    original_def: "Estándar temporal universal de señal de reloj digital (norma SMPTE 12M) que asigna una dirección numérica única e irrepetible a cada fotograma individual de una grabación audiovisual, expresada con el formato de ocho dígitos: Horas : Minutos : Segundos : Fotogramas (HH:MM:SS:FF).",
    context_of_use: "Sincronización multicámara, enlace de audio de doble sistema en set, conformación de edición offline a online y generación de subtítulos.",
    example: "Localizar exactamente la caída del actor en el fotograma codificado como 01:23:45:18 para aplicar un efecto de sonido en esa posición precisa.",
    visual_notes: "Display digital de 8 dígitos en color naranja o blanco en la esquina inferior del monitor o visor de cámara avanzando cuadro a cuadro.",
    llm_prompt_guidance: "Palabras clave: 'SMPTE timecode display, HH MM SS FF numbers overlay, precise frame timecode counter'.",
    inferred_relations: { "sincroniza": ["sync-sound", "clapperboard"], "estructura": ["edicion-no-lineal", "srt"] }
  },
  "transcoding": {
    denomination: "Transcoding (Transcodificación de Video)",
    synonyms: ["Conversión de Códec", "Re-encoding de Video", "Format Conversion"],
    original_def: "Proceso computacional que convierte un flujo de datos de audio o video de un formato de codificación, resolución o compresión determinado a otro diferente (por ejemplo, transcodificar material comprimido H.264 de cámara lenta a ProRes 422 para edición, o masterizar ProRes 4444 a MP4 para streaming web).",
    context_of_use: "Preparación de medios en ingesta, generación de proxies, exportación de copias para revisión y compresión final de distribución.",
    example: "Utilizar Adobe Media Encoder para transcodificar por lotes 50 clips de cámara H.265 en códec de edición intermedio Apple ProRes 422.",
    visual_notes: "Cola de procesamiento por lotes con dos columnas mostrando el códec de entrada (Source) y el perfil de salida (Preset Destination).",
    llm_prompt_guidance: "Palabras clave: 'batch video transcoding, format conversion queue, video encoder processing'.",
    inferred_relations: { "genera": ["proxy"], "transforma": ["codec"], "prepara_para": ["montaje", "masterizacion-de-entrega"] }
  },
  "transicion": {
    denomination: "Transición (Efecto de Paso Entre Planos)",
    synonyms: ["Transición Visual", "Efecto de Corte / Disolvencia", "Video Transition"],
    original_def: "Mecanismo óptico o digital que conecta visualmente el final de un plano con el comienzo del plano siguiente en el montaje. Abarca desde el corte directo (cut, el más común y transparente) hasta disolvencias cruzadas (cross dissolve), barridos por movimiento (whip pan), fundidos en negro (fade) o transiciones estilizadas por máscara y zoom.",
    context_of_use: "Herramienta narrativa del montajista para modular el flujo del tiempo, la relación espacial o el choque emocional entre ideas.",
    example: "Una disolvencia cruzada de 2 segundos entre el rostro juvenil del personaje y su rostro envejecido 30 años después para expresar el paso de toda una vida.",
    visual_notes: "Rectángulo de transición superpuesto sobre el punto de unión de dos clips contiguos en el timeline de la NLE.",
    llm_prompt_guidance: "Palabras clave: 'seamless cross dissolve, dynamic whip pan transition, match cut visual transition'.",
    inferred_relations: { "incluye": ["fade-in-fade-out", "corte-en-j-l"], "articula": ["montaje"] }
  },
  "upcut": {
    denomination: "Upcut (Corte Prematuro / Salto Rítmico de Acción)",
    synonyms: ["Corte Adelantado", "Traspaso Rítmico Prematuro", "Up-cutting"],
    original_def: "Corte de montaje realizado fracciones de segundo antes de que concluya naturalmente la acción física de un personaje o el sonido de una frase, o corte que adelanta un evento para acelerar el dinamismo de la narración y forzar la atención expectante del espectador hacia la consecuencia inmediata.",
    context_of_use: "Edición de secuencias de combate, trailers publicitarios de ritmo frenético y montaje cómico de réplicas rápidas.",
    example: "Cortar el plano justo cuando el boxeador lanza el puñetazo antes de ver el impacto, mostrando directamente en el plano siguiente al oponente cayendo a la lona.",
    visual_notes: "El clip de origen se recorta drásticamente en el frame previo a la culminación física del movimiento.",
    llm_prompt_guidance: "Palabras clave: 'dynamic upcut editing, accelerated action cut, snappy comedic cut timing'.",
    inferred_relations: { "es_un_tipo_de": ["montaje"], "acelera_el": ["ritmo-narrativo"] }
  }
};
