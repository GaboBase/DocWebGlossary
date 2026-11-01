module.exports = {
  "bitrate": {
    denomination: "Bitrate (Tasa de Bits / Flujo de Datos)",
    synonyms: ["Tasa de Bits", "Flujo de Datos", "Data Rate (Mbps / kbps)"],
    original_def: "Cantidad de datos digitales binarios transferidos o procesados por unidad de tiempo para representar la señal de video o audio, expresada habitualmente en megabits por segundo (Mbps) o kilobits por segundo (kbps). Un bitrate elevado preserva texturas sutiles, grano y ausencia de artefactos de compresión a costa de generar archivos más pesados; un bitrate bajo comprime drásticamente el archivo facilitando su transmisión por internet pero introduciendo bandas de degradación (color banding) y pixelación.",
    context_of_use: "Configuración de exportación para streaming, masterización de emisión televisiva y selección de perfiles de compresión de cámara.",
    example: "Exportar un master de alta calidad en ProRes a 220 Mbps frente a un archivo optimizado para redes sociales en H.264 a 15 Mbps en resolución 4K.",
    visual_notes: "Comparativa entre dos recortes de un cielo degradado: a 5 Mbps se observan escalones visibles y bloques de compresión; a 50 Mbps el gradiente es continuo y sedoso.",
    llm_prompt_guidance: "Palabras clave: 'high bitrate clean video, uncompressed texture clarity, pristine high-bitrate encoding, no compression banding'.",
    inferred_relations: { "determina_la": ["calidad-de-imagen"], "se_vincula_con": ["codec", "resolucion"] }
  },
  "broadcasting": {
    denomination: "Broadcasting (Radiodifusión Televisiva Tradicional)",
    synonyms: ["Emisión de Televisión", "Transmisión Broadcast", "Teledifusión"],
    original_def: "Distribución unidireccional masiva de señales de audio y video dirigidas al público general a través del espectro radioeléctrico terrestre (TDT), satelital o redes de cable coaxial/fibra bajo normativas técnicas y estándares sumamente estrictos de ingeniería (SMPTE, EBU, ATSC, DVB) en cuanto a límites legales de señal, sincronismos y código de tiempo.",
    context_of_use: "Cadenas de televisión públicas y comerciales, unidades móviles y coberturas informativas en directo.",
    example: "Transmisión en vivo de un partido del torneo nacional emitida por señal abierta terrestre bajo el estándar DVB-T2 a 1080i50.",
    visual_notes: "Torre de telecomunicaciones emitiendo ondas hertzianas hacia antenas receptoras domésticas, o sala de control central (MCR - Master Control Room) con paredes de monitores con señal al aire.",
    llm_prompt_guidance: "Palabras clave: 'broadcast television studio control, live broadcast master control room MCR, on-air broadcast television feed'.",
    inferred_relations: { "se_opone_a": ["streaming"], "exige": ["rec-709", "lufs-loudness"], "emplea": ["switcher-de-video"] }
  },
  "codec": {
    denomination: "Códec (Codificador / Decodificador de Video)",
    synonyms: ["Algoritmo de Compresión", "Codificador-Decodificador", "Compression Algorithm"],
    original_def: "Algoritmo computacional matemático que codifica (comprime) una señal de audio o video digital bruto para su almacenamiento o transmisión eficiente reduciendo redundancias espaciales y temporales, y la decodifica (descomprime) posteriormente para su reproducción o edición fluida. Se diferencian en códecs con pérdidas (lossy) o sin pérdidas perceptibles (visually lossless), y en códecs de adquisición (intraframe como ProRes) o de entrega (interframe como H.264/H.265).",
    context_of_use: "Elección estratégica en cámaras, líneas de tiempo de edición y plataformas de exportación.",
    example: "Usar Apple ProRes 422 HQ como códec intermedio durante el montaje para evitar que la CPU sufra decodificando la compleja compresión temporal de H.264.",
    visual_notes: "Diagrama explicativo ilustrando la diferencia entre un archivo de video bruto gigante que se comprime mediante el algoritmo códec y se empaqueta dentro de un contenedor MP4.",
    llm_prompt_guidance: "Palabras clave: 'efficient video codec compression, Apple ProRes encoding, advanced video compression pipeline'.",
    inferred_relations: { "se_empaqueta_en": ["contenedor"], "determina_el": ["bitrate"], "se_ejemplifica_en": ["prores-h-264-h-265"] }
  },
  "contenedor": {
    denomination: "Contenedor (Formato Envoltorio / Wrapper)",
    synonyms: ["Formato Envoltorio", "Wrapper de Archivo", "Container Format (.mov, .mp4, .mkv)"],
    original_def: "Estructura de formato de archivo binario que funciona como un 'paquete' o caja estandarizada identificada por una extensión (.mov, .mp4, .mxf, .mkv) que almacena conjuntamente una o más pistas de video codificadas, pistas de audio multipista, pistas de subtítulos sincronizados, metadatos de código de tiempo y menús de navegación.",
    context_of_use: "Manipulación de archivos en cualquier etapa del flujo de trabajo audiovisual digital.",
    example: "Un archivo con extensión .MOV (contenedor QuickTime) que alberga en su interior una pista de video codificada en ProRes 4444, cuatro canales de audio PCM sin compresión y metadatos SMPTE.",
    visual_notes: "Ilustración de una caja etiquetada como '.MP4' dentro de la cual viajan ordenados un rollo de película (códec de video H.264), una cinta de audio (códec AAC) y una tarjeta de texto (subtítulo SRT).",
    llm_prompt_guidance: "Palabras clave: 'video container wrapper diagram, MP4 and MOV multimedia file packaging, audio video multiplexing'.",
    inferred_relations: { "alberga": ["codec", "timecode", "srt"], "es_un_tipo_de": ["deliverable"] }
  },
  "fps-frame-rate": {
    denomination: "FPS / Frame Rate (Cuadros por Segundo)",
    synonyms: ["Frame Rate", "Frecuencia de Cuadro", "Tasa de Refresco Temporal"],
    original_def: "Cantidad de imágenes estáticas individuales (fotogramas o cuadros) que se capturan, transmiten y reproducen sucesivamente en cada segundo de tiempo para engañar al sistema visual humano mediante el fenómeno de persistencia retiniana y movimiento aparente (efecto Phi). Los estándares mundiales son: 24 fps (estándar canónico del cine internacional), 25 fps (estándar PAL de Europa y Colombia), 30 fps (estándar digital y NTSC) y 50/60 fps (fluidez para deportes, videojuegos y cámara lenta).",
    context_of_use: "Configuración fundacional que debe definirse unívocamente en la preproducción antes de encender las cámaras y crear la secuencia de edición.",
    example: "Configurar el proyecto en 24 fps para otorgarle la cadencia y textura temporal cinematográfica característica frente al look hiperrealista o de telenovela de 60 fps.",
    visual_notes: "Tira de celuloide o secuencia gráfica mostrando 24 fotogramas numerados correlativamente que equivalen a exactamente un segundo de tiempo en el reloj.",
    llm_prompt_guidance: "Palabras clave: '24fps cinematic motion cadence, 60fps ultra-smooth video motion, natural 24 frames per second cinema standard'.",
    inferred_relations: { "es_equivalente_a": ["tasa-de-fotogramas"], "condiciona_la": ["velocidad-de-obturacion"], "permite": ["camara-lenta"] }
  },
  "latencia": {
    denomination: "Latencia (Retardo de Señal / Delay)",
    synonyms: ["Retardo de Transmisión", "Delay de Señal", "Buffer Lag"],
    original_def: "Tiempo de demora o retardo temporal imperceptible o perceptible (medido en milisegundos) que transcurre desde el instante en que un acontecimiento físico ocurre frente al lente de la cámara o micrófono hasta que es procesado, codificado, transmitido y visualizado en la pantalla o monitor de destino.",
    context_of_use: "Factor crítico en transmisiones en vivo, producción remota (REMI), monitoreo inalámbrico en set (Teradek) y teleprompters interactivos.",
    example: "Un enlace de video inalámbrico de set que presume de latencia cero (< 1 ms), permitiendo al foquista enfocar tomas rápidas en tiempo real sin desfase.",
    visual_notes: "Línea temporal comparativa mostrando el fotograma capturado en T=0ms y reproducido en el monitor del director en T=150ms.",
    llm_prompt_guidance: "Palabras clave: 'ultra-low latency wireless video feed, zero latency field monitoring, live sync delay'.",
    inferred_relations: { "afecta_a": ["produccion-remota", "streaming"], "se_reduce_con": ["ndi"] }
  },
  "minidv": {
    denomination: "MiniDV (Formato de Cinta Digital Histórico)",
    synonyms: ["Cinta MiniDV", "Digital Video Cassette", "Formato DV"],
    original_def: "Formato icónico de grabación digital en cinta magnética de 6,35 mm introducido en 1995 que democratizó la producción independiente. Grababa video en definición estándar (SD: 720x480 NTSC / 720x576 PAL) con compresión DV intraframe a 25 Mbps y muestreo de color 4:1:1 o 4:2:0, capturado a la computadora mediante cables FireWire (IEEE 1394).",
    context_of_use: "Hito fundacional en la historia del video digital, hoy objeto de culto y emulación nostálgica estética ('look Y2K / camcorder').",
    example: "Un videoclip musical contemporáneo que se rueda deliberadamente con una videocámara Sony DCR-VX1000 de cinta MiniDV para lograr texturas entrelazadas nostálgicas de los 90.",
    visual_notes: "Pequeño casete magnético rectangular con ventana transparente central y logotipo 'MiniDV' dorado junto al conector FireWire 400 de 4 pines.",
    llm_prompt_guidance: "Palabras clave: 'vintage MiniDV camcorder aesthetic, retro Y2K digital video tape artifacts, authentic interlaced SD video texture'.",
    inferred_relations: { "es_un_ancestro_de": ["prores-h-264-h-265"], "es_un_tipo_de": ["tecnologia-de-video"] }
  },
  "ndi": {
    denomination: "NDI (Network Device Interface)",
    synonyms: ["Protocolo de Video por IP", "Network Device Interface (NewTek)", "Video sobre Red Local"],
    original_def: "Protocolo estándar de comunicación bidireccional desarrollado por NewTek que permite transmitir flujos de video de ultra alta definición (4K/HD), múltiples canales de audio multicanal y señales de control y tally a través de redes locales Ethernet convencionales (Gigabit LAN) con latencia prácticamente nula y sin necesidad de cableado SDI o HDMI dedicado.",
    context_of_use: "Estudios de televisión modernos, producción virtual, centros de emisión remota, eventos en vivo y streaming multicámara corporativo.",
    example: "Conectar tres cámaras PTZ en un auditorio a un switch de red mediante cables de red Cat6 y mezclarlas en el software vMix mediante fuentes NDI sin capturadoras dedicadas.",
    visual_notes: "Diagrama de red informática mostrando múltiples cámaras y ordenadores conectados a un switch Ethernet Gigabit intercambiando streams NDI en tiempo real.",
    llm_prompt_guidance: "Palabras clave: 'NDI network device interface, video over IP local network broadcast, low latency Ethernet video stream'.",
    inferred_relations: { "transporta": ["codec", "timecode"], "se_utiliza_en": ["produccion-remota", "switcher-de-video"] }
  },
  "prores-h-264-h-265": {
    denomination: "ProRes / H.264 / H.265 (Códecs Maestros de la Industria)",
    synonyms: ["Trinidad de Códecs", "Apple ProRes, AVC, HEVC", "Códecs de Edición y Distribución"],
    original_def: "Los tres estándares de compresión dominantes del ecosistema audiovisual digital: 1) Apple ProRes: códec intraframe (cada fotograma se comprime independientemente) de 10/12 bits diseñado para máxima fidelidad y rendimiento en edición; 2) H.264 (AVC): códec interframe universal estándar de distribución web y streaming; 3) H.265 (HEVC): sucesor de H.264 que ofrece el doble de eficiencia de compresión, ideal para video 4K/8K HDR en anchos de banda reducidos.",
    context_of_use: "ProRes para edición y archivo master; H.264 para compatibilidad universal en web; H.265 para dispositivos móviles modernos y streaming 4K eficiente.",
    example: "La productora edita en Apple ProRes 422, exporta el master final en ProRes 4444 para archivo, y codifica una copia en H.264 para subir a YouTube y otra en H.265 para la app móvil.",
    visual_notes: "Tabla comparativa de compresión mostrando tasas de bits relativas: ProRes (220 Mbps), H.264 (25 Mbps), H.265 (12 Mbps) con idéntica resolución percibida.",
    llm_prompt_guidance: "Palabras clave: 'Apple ProRes 422 HQ intraframe codec, H.264 AVC universal web encoding, efficient H.265 HEVC 4K master'.",
    inferred_relations: { "son_variantes_de": ["codec"], "se_empaquetan_en": ["contenedor"], "determinan_el": ["bitrate"] }
  },
  "relacion-de-aspecto": {
    denomination: "Relación de Aspecto (Aspect Ratio)",
    synonyms: ["Proporción de Pantalla", "Aspect Ratio", "Formato de Cuadro"],
    original_def: "Proporción matemática dimensional existente entre la anchura y la altura del marco rectangular de la imagen (Ancho : Alto). Los formatos estandarizados abarcan: 16:9 (1.78:1, estándar global de televisores, ordenadores y YouTube horizontal); 9:16 (0.56:1, video vertical para Reels, TikTok y Shorts); 1:1 (cuadrado); 4:5 (vertical optimizado para feeds de Instagram); y 2.39:1 / 2.35:1 (formato panorámico anamórfico de cine).",
    context_of_use: "Planificación de encuadre en preproducción según la plataforma y pantalla de destino del contenido.",
    example: "Rodar un spot en 16:9 con encuadre protegido (guías seguras) para poder extraer un reencuadre vertical 9:16 para redes sociales sin cortar la cabeza del modelo.",
    visual_notes: "Infografía geométrica comparativa superponiendo los rectángulos de 16:9 (horizontal ancho), 9:16 (vertical estilizado) y 2.39:1 (cinemascope apaisado).",
    llm_prompt_guidance: "Palabras clave: '16:9 cinematic widescreen, 9:16 vertical smartphone aspect ratio, 2.39:1 anamorphic cinema framing, 1:1 square video frame'.",
    inferred_relations: { "condiciona_la": ["composicion"], "se_aplica_en": ["video-vertical", "safe-zones"] }
  },
  "renderizado": {
    denomination: "Renderizado (Rendering / Exportación y Cómputo)",
    synonyms: ["Render", "Procesamiento de Cuadros", "Baking de Efectos"],
    original_def: "Proceso computacional intensivo en el que la CPU y la GPU del ordenador calculan matemáticamente y sintetizan en un único archivo de video unificado todos los elementos superpuestos en la línea de tiempo: decodificación de códecs de cámara, transiciones, etalonaje de color, gráficos vectoriales, efectos de composición digital y mezcla multipista de audio.",
    context_of_use: "Render de previsualización temporal en la línea de tiempo para reproducción fluida y render de exportación final del proyecto.",
    example: "Hacer render de previsualización en DaVinci Resolve para reproducir a 24 fps estables una escena compleja que combina 4 capas de video 4K con reducción de ruido temporal.",
    visual_notes: "Barra de estado de render que pasa de rojo (no computado) a verde (computado y listo para reproducción en tiempo real).",
    llm_prompt_guidance: "Palabras clave: 'GPU accelerated video rendering, timeline render caching, export render progress bar, computational frame synthesis'.",
    inferred_relations: { "es_la_ejecucion_de": ["montaje", "vfx"], "produce_el": ["deliverable", "master"] }
  },
  "resolucion": {
    denomination: "Resolución de Video (Densidad de Píxeles)",
    synonyms: ["Resolución Espacial", "Dimensiones en Píxeles", "Pixel Resolution (1080p, 4K, 8K)"],
    original_def: "Medida técnica que define la cantidad física total de píxeles que componen cada fotograma individual de video, expresada como el producto del número de columnas horizontales por el número de filas verticales. Abarca estándares como Full HD (1920x1080 = 2.07 megapíxeles), UHD 4K (3840x2160 = 8.29 megapíxeles), DCI 4K (4096x2160 = 8.84 megapíxeles) y 8K (7680x4320 = 33.17 megapíxeles).",
    context_of_use: "Configuración de sensor en cámara, resolución de proyecto en la NLE y especificación técnica de entrega.",
    example: "Grabar la entrevista en resolución 4K para una entrega final en 1080p, permitiendo al editor hacer reencuadres digitales y zooms de hasta 200% sin pérdida perceptible de calidad.",
    visual_notes: "Diagrama de recuadros anidados concéntricos mostrando cómo cuatro pantallas Full HD 1080p caben exactamente dentro de una sola imagen UHD 4K.",
    llm_prompt_guidance: "Palabras clave: 'crisp UHD 4K 3840x2160 resolution, sharp 8K ultra high definition detail, pixel perfect high resolution clarity'.",
    inferred_relations: { "determina_el": ["bitrate"], "se_compara_en": ["uhd-4k-vs-dci-4k"], "se_ajusta_en": ["relacion-de-aspecto"] }
  },
  "switcher-de-video": {
    denomination: "Switcher de Video (Mezclador de Video en Vivo / Vision Mixer)",
    synonyms: ["Mesa de Realización", "Mezclador de Video en Vivo", "Vision Mixer"],
    original_def: "Dispositivo físico electrónico o aplicación de software especializada que conmuta, corta, mezcla e incrusta en tiempo real múltiples señales de video entrantes (cámaras de set, repeticiones instantáneas, gráficos computarizados, enlaces remotos), enrutando la señal seleccionada hacia el canal de emisión en vivo (Program / PGM) y a los monitores de previsualización (Preview / PVW).",
    context_of_use: "Emisiones de televisión en directo, streaming multicámara en vivo, conciertos y eventos corporativos híbridos.",
    example: "El realizador presiona el botón 'Cámara 2' en el switcher Blackmagic ATEM Constellation justo cuando el cantante principal toma el micrófono en el escenario.",
    visual_notes: "Pánel con filas dobles de botones retroiluminados en rojo (PGM) y verde (PVW), palanca manual T-Bar para transiciones suaves y joystick para DVE.",
    llm_prompt_guidance: "Palabras clave: 'broadcast vision switcher console, Blackmagic ATEM control surface, illuminated bus buttons and T-bar fader, live TV control panel'.",
    inferred_relations: { "opera_en": ["broadcasting", "streaming"], "procesa": ["ndi"], "conmuta": ["take"] }
  },
  "tasa-de-fotogramas": {
    denomination: "Tasa de Fotogramas (Frame Rate / Frecuencia Temporal)",
    synonyms: ["Frecuencia de Cuadros", "Frame Rate (fps)", "Velocidad de Fotogramas"],
    original_def: "Parámetro temporal fundamental que mide el número de cuadros o fotogramas enteros registrados y reproducidos por unidad de tiempo de un segundo (medido en fps). Establece la cadencia rítmica, la fluidez visual del movimiento y condiciona la velocidad mínima de obturación para respetar la regla cinematográfica de los 180 grados.",
    context_of_use: "Configuración obligatoria previa a la grabación de cualquier toma y pauta maestra de la línea de tiempo de postproducción.",
    example: "Ajustar la cámara a 50 fps en Europa para evitar el parpadeo de las luces de corriente alterna a 50Hz, permitiendo además ralentizar la toma a la mitad en una secuencia a 25 fps.",
    visual_notes: "Esfera de reloj giratoria descompuesta en 24, 30 y 60 marcas correlativas alrededor del cuadrante de un segundo.",
    llm_prompt_guidance: "Palabras clave: 'precise frame rate calibration, 24fps cinematic aesthetic, 50fps broadcast fluid movement'.",
    inferred_relations: { "es_equivalente_a": ["fps-frame-rate"], "permite": ["slow-motion", "camara-lenta"] }
  },
  "uhd-4k-vs-dci-4k": {
    denomination: "UHD 4K vs DCI 4K (Resolución de Consumo vs Cine Digital)",
    synonyms: ["Ultra Alta Definición vs Cine 4K", "3840x2160 vs 4096x2160", "UHD vs DCI"],
    original_def: "Distinción técnica rigurosa entre los dos estándares mundiales de resolución denominados coloquialmente '4K': 1) UHD 4K (Ultra High Definition / 3840x2160 píxeles), con relación de aspecto exacta de 16:9, diseñado para televisión doméstica, pantallas de consumo y plataformas de streaming; frente a 2) DCI 4K (Digital Cinema Initiatives / 4096x2160 píxeles), con relación de aspecto nativa de 1.90:1 (o 17:9), estándar internacional de la industria cinematográfica para salas de cine y proyectores DCI.",
    context_of_use: "Determinación de la resolución de captura en rodaje cinematográfico y selección de especificaciones de masterización para salas comerciales frente a streaming casero.",
    example: "Rodar en DCI 4K para la versión de estreno en salas cinematográficas y recortar lateralmente 128 píxeles en cada borde para obtener el master UHD 4K destinado a Netflix.",
    visual_notes: "Diagrama comparativo donde el rectángulo DCI 4K (4096 píxeles de base) sobresale ligeramente por los dos laterales del rectángulo UHD 4K (3840 píxeles de base).",
    llm_prompt_guidance: "Palabras clave: 'DCI 4K 4096x2160 cinematic frame, UHD 4K 3840x2160 16:9 consumer standard, aspect ratio comparison chart'.",
    inferred_relations: { "son_especificaciones_de": ["resolucion"], "definen_la": ["relacion-de-aspecto"], "se_destinan_a": ["masterizacion-de-entrega"] }
  }
};
