module.exports = {
  "deliverable": {
    denomination: "Deliverable (Entregable Audiovisual)",
    synonyms: ["Entregable Final", "Paquete de Entrega", "Master Deliverable"],
    original_def: "Conjunto formal de archivos definitivos especificados en el contrato que la casa productora debe suministrar al cliente o distribuidor al concluir el proyecto. Abarca los masters de alta resolución, versiones adaptadas por relación de aspecto (16:9, 9:16, 1:1), versiones cortas para redes (cutdowns), pistas de audio stems (M&E) y archivos de subtítulos.",
    context_of_use: "Hito contractual culminante y firma de acta de conformidad del proyecto audiovisual.",
    example: "El paquete de entregables de la campaña incluye: 1 master ProRes 4444 en 16:9, 3 adaptaciones en H.264 vertical 9:16 para Instagram Reels, y 2 archivos SRT de subtítulos en español e inglés.",
    visual_notes: "Diagrama con una caja central de entregables ramificándose en archivos de video master, carpetas de adaptaciones para redes y pistas de audio stems.",
    llm_prompt_guidance: "Palabras clave: 'client video deliverable package, multi-format delivery assets, final ProRes master and social cutdowns'.",
    inferred_relations: { "concluye_la": ["produccion-de-video"], "se_compone_de": ["master", "stems", "srt"] }
  },
  "entrega-subida": {
    denomination: "Entrega / Subida (Upload y Distribución en Plataformas)",
    synonyms: ["Carga de Archivo", "Upload de Video", "Publicación en Servidor"],
    original_def: "Proceso técnico y logístico de transferir los archivos finales de video terminados hacia servidores de almacenamiento en la nube, plataformas de revisión con clientes (Frame.io) o servidores de distribución pública (YouTube, Vimeo, Meta, TikTok), verificando la integridad de subida y el procesamiento posterior de transcodificación del servidor.",
    context_of_use: "Fase final de distribución y difusión de la obra audiovisual.",
    example: "Subir el video masterizado a Frame.io para que el departamento legal del cliente deje comentarios con código de tiempo antes de la publicación definitiva.",
    visual_notes: "Ventana de navegador con barra de subida porcentual al 100% y estado 'Procesando versión 4K en servidor'.",
    llm_prompt_guidance: "Palabras clave: 'cloud video upload progress, Frame.io client review platform, seamless high speed upload'.",
    inferred_relations: { "sigue_a": ["deliverable", "masterizacion-de-entrega"], "inicia_el": ["streaming"] }
  },
  "hook": {
    denomination: "Hook (Gancho Inicial de Retención)",
    synonyms: ["Gancho Audiovisual", "Hook de Entrada", "Primeros 3 Segundos"],
    original_def: "Estrategia narrativa, visual y auditiva concentrada en los primeros 3 a 5 segundos de un video (especialmente en formatos cortos para redes sociales) diseñada para detener inmediatamente el deslizamiento del pulgar del usuario (scroll stopping), despertar curiosidad imperiosa o plantear una pregunta intrigante que garantice la retención de la audiencia.",
    context_of_use: "Creación de Reels, TikToks, Shorts de YouTube y comerciales digitales de respuesta directa.",
    example: "Comenzar el video con el plano del automóvil en llamas y la frase 'Esto es lo que nadie te dice antes de comprar tu primer deportivo' para enganchar a la audiencia.",
    visual_notes: "Gráfico de retención de audiencia mostrando una caída pronunciada en el segundo 3 si no hay hook frente a una línea horizontal estable cuando el gancho es efectivo.",
    llm_prompt_guidance: "Palabras clave: 'scroll stopping hook, high energy video intro, immediate visual intrigue, viral short hook framing'.",
    inferred_relations: { "maximiza_la": ["tasa-de-retencion"], "es_esencial_en": ["reel-short", "video-vertical"] }
  },
  "master": {
    denomination: "Master (Archivo Maestro de Máxima Calidad)",
    synonyms: ["Archivo Maestro", "Master de Conservación", "Mezzanine File / Golden Master"],
    original_def: "Archivo digital definitivo exportado en la máxima resolución y profundidad de color posibles, empleando un códec de compresión visualmente sin pérdidas de estándar industrial (como Apple ProRes 4444 XQ o Avid DNxHR HQX). Sirve como matriz histórica de archivo y preservación a partir de la cual se derivan todas las copias comprimidas de distribución comercial.",
    context_of_use: "Almacenamiento de conservación en bóvedas de datos (LTO tape / Cloud Cold Storage) y entrega a distribuidores cinematográficos.",
    example: "El master definitivo de la película se exporta en ProRes 4444 XQ en resolución DCI 4K con audio PCM a 24-bit/48kHz de 180 GB de peso.",
    visual_notes: "Ficha técnica de metadatos del archivo en MediaInfo mostrando códec ProRes 4444, 12 bits de profundidad de color y tasa de bits de 500 Mbps.",
    llm_prompt_guidance: "Palabras clave: 'golden master video archive, uncompressed ProRes 4444 XQ master, pristine quality preservation file'.",
    inferred_relations: { "culmina_la": ["postproduccion"], "da_origen_a": ["deliverable"], "requiere": ["masterizacion-de-entrega"] }
  },
  "masterizacion-de-entrega": {
    denomination: "Masterización de Entrega (Conformado y Mastering)",
    synonyms: ["Mastering Final", "Conformado Técnico de Entrega", "QC and Mastering"],
    original_def: "Fase técnica exhaustiva de control de calidad (Quality Control - QC) y preparación final del archivo audiovisual para asegurar el cumplimiento milimétrico de las directrices técnicas del cliente o difusor: normalización de volumen (LUFS), verificación de niveles legales de video (Broadcast Safe), incrustación de metadatos, barras y tonos de calibración, y sincronía labial.",
    context_of_use: "Último paso antes de la entrega definitiva del material audiovisual.",
    example: "Pasar el video por un analizador automatizado de QC para certificar que ningún fotograma sobrepase los 100 IRE de blanco ni baje de 0 IRE de negro.",
    visual_notes: "Monitor de forma de onda mostrando la señal de video confinada estrictamente entre las líneas de corte legal de 0% y 100% sin desbordamientos.",
    llm_prompt_guidance: "Palabras clave: 'broadcast legal mastering, strict QC compliance check, loudness normalization mastering, professional delivery conform'.",
    inferred_relations: { "garantiza": ["lufs-loudness", "safe-zones"], "produce_el": ["master", "deliverable"] }
  },
  "reel-short": {
    denomination: "Reel / Short (Formato de Video Corto Vertical)",
    synonyms: ["Video Corto", "Short-Form Video", "TikTok / Instagram Reel / YouTube Short"],
    original_def: "Formato audiovisual vertical (9:16) de consumo rápido con duración típicamente comprendida entre 15 y 90 segundos, caracterizado por un ritmo de montaje vertiginoso, subtítulos dinámicos llamativos en pantalla, diseño sonoro contundente y un gancho inicial hiperconcentrado optimizado para el consumo móvil.",
    context_of_use: "Estrategias de contenido orgánico y publicidad de captación en TikTok, Instagram y YouTube.",
    example: "Un tutorial de cocina de 30 segundos en formato vertical con 40 cortes dinámicos, efectos de sonido y subtítulos animados en el centro.",
    visual_notes: "Pantalla vertical de smartphone ocupada al 100% por la imagen con iconos interactivos de me gusta y comentarios superpuestos en el margen derecho.",
    llm_prompt_guidance: "Palabras clave: 'dynamic TikTok reel style, fast-paced vertical video, punchy kinetic captions, viral short mobile cinematography'.",
    inferred_relations: { "utiliza": ["video-vertical", "hook"], "mide_su_exito_con": ["tasa-de-retencion"] }
  },
  "safe-zones": {
    denomination: "Safe Zones (Zonas Seguras de Visualización)",
    synonyms: ["Márgenes de Seguridad", "Action Safe / Title Safe", "Zonas Seguras de Títulos"],
    original_def: "Líneas guía estandarizadas superpuestas en el monitor de edición que delimitan los márgenes perimetrales seguros del encuadre: la Zona Segura de Acción (Action Safe, 90% interior del marco) garantiza que ningún elemento visual esencial quede recortado por biseles de televisores; la Zona Segura de Títulos (Title Safe, 80% interior) asegura que los textos, gráficos y logotipos se lean con claridad sin ser tapados por interfaces de usuario de redes sociales (botones de TikTok, subtítulos automáticos o avatares).",
    context_of_use: "Composición de encuadre en cámara y diseño de grafismos y títulos en la suite de postproducción.",
    example: "Verificar que el logotipo del cliente no quede oculto detrás de la barra de descripción y el botón de compartir de Instagram Reels ubicándolo en la zona segura central.",
    visual_notes: "Dos rectángulos concéntricos punteados superpuestos sobre el encuadre delimitando el 90% (Action Safe) y el 80% (Title Safe).",
    llm_prompt_guidance: "Palabras clave: 'broadcast title safe guides, action safe margin overlay, clean text placement within safe zones'.",
    inferred_relations: { "protege": ["composicion", "subtitulos-quemados"], "se_adapta_a": ["video-vertical"] }
  },
  "srt": {
    denomination: "SRT (SubRip Subtitle Format / Archivo de Subtítulos)",
    synonyms: ["Archivo .SRT", "SubRip Text", "Pista de Subtítulos Externa"],
    original_def: "Formato de archivo de texto plano universalmente estandarizado para almacenar subtítulos temporizados. Cada bloque contiene cuatro líneas de información: 1) Número secuencial del subtítulo; 2) Código de tiempo exacto de inicio y fin (HH:MM:SS,mmm); 3) Una o dos líneas de texto del parlamento; y 4) Una línea en blanco de separación.",
    context_of_use: "Suministro de subtítulos opcionales multilingües para plataformas web (YouTube, LinkedIn) y reproductores multimedia.",
    example: "Un archivo 'video_espanol.srt' que se sube a YouTube junto con el video para que el usuario pueda activar o desactivar los subtítulos a voluntad.",
    visual_notes: "Bloque de texto formateado: '1 \n 00:00:01,500 --> 00:00:04,200 \n Bienvenidos a nuestro informe anual.'",
    llm_prompt_guidance: "Palabras clave: 'clean SubRip SRT text file format, millisecond accurate subtitle timecodes, plain text closed captions'.",
    inferred_relations: { "es_un_tipo_de": ["subtitulos-vs-closed-captions"], "se_genera_con": ["transcripcion-automatica"] }
  },
  "streaming": {
    denomination: "Streaming (Transmisión Continua de Medios)",
    synonyms: ["Transmisión en Flujo", "Emisión en Directo / OTT", "Video Streaming (HLS / DASH)"],
    original_def: "Tecnología de distribución digital que permite enviar flujos de video y audio fragmentados en pequeños paquetes de datos a través de redes IP a demanda (VOD) o en vivo (Live Streaming), permitiendo al usuario final reproducir el contenido de forma instantánea a medida que se descarga sin necesidad de almacenar el archivo completo en su dispositivo local.",
    context_of_use: "Plataformas de video bajo demanda (Netflix, YouTube) y transmisiones en vivo (Twitch, Kick, Zoom).",
    example: "Transmisión de un concierto en vivo a 100.000 espectadores simultáneos adaptando automáticamente la calidad de 4K a 720p según la velocidad de conexión de cada usuario (Adaptive Bitrate Streaming HLS).",
    visual_notes: "Línea de tiempo de reproducción en el navegador web con una barra de búfer gris claro avanzando unos segundos por delante del cursor de reproducción rojo.",
    llm_prompt_guidance: "Palabras clave: 'live internet video streaming, adaptive bitrate HLS delivery, real-time live video broadcast buffer'.",
    inferred_relations: { "se_opone_a": ["broadcasting"], "requiere": ["bitrate", "codec"], "se_distribuye_mediante": ["entrega-subida"] }
  },
  "subtitulos-quemados": {
    denomination: "Subtítulos Quemados (Burned-in Subtitles / Open Captions)",
    synonyms: ["Subtítulos Incrustados", "Open Captions (OC)", "Subtítulos Hardcoded"],
    original_def: "Textos de subtítulos o transcripciones que se renderizan y graban de forma permanente e irreversible sobre los píxeles de la propia imagen de video durante la exportación. No pueden ser desactivados ni modificados por el espectador, garantizando que el diseño tipográfico, la posición exacta, el color y las animaciones se muestren exactamente como el creador concibió.",
    context_of_use: "Videos para redes sociales móviles (Instagram, TikTok, LinkedIn) donde más del 80% de los usuarios consume contenido con el audio apagado.",
    example: "Incrustar subtítulos con tipografía moderna en negrita amarilla con fondo negro semitransparente quemados en el video vertical para captar la atención sin sonido.",
    visual_notes: "Texto en tipografía sans-serif con contorno negro nítido situado en el tercio inferior del fotograma perfectamente visible sobre fondos claros y oscuros.",
    llm_prompt_guidance: "Palabras clave: 'burned-in open captions, bold kinetic text overlay, permanent subtitles on video, mobile friendly caption styling'.",
    inferred_relations: { "se_diferencia_de": ["subtitulos-vs-closed-captions"], "se_aplica_en": ["video-vertical", "reel-short"] }
  },
  "subtitulos-vs-closed-captions": {
    denomination: "Subtítulos vs Closed Captions (Subtítulos de Idioma vs Accesibilidad)",
    synonyms: ["Subtítulos vs CC", "Subtítulos de Traducción vs Subtítulos para Sordos", "Subtitles vs Closed Captions"],
    original_def: "Distinción funcional crítica entre dos modalidades de texto sincronizado: 1) Subtítulos (Subtitles): concebidos para espectadores que escuchan pero no dominan el idioma original, transcribiendo exclusivamente los diálogos hablados; frente a 2) Closed Captions (CC): diseñados para personas con discapacidad auditiva o entornos en silencio, transcribiendo no solo los diálogos sino también identificando al orador, describiendo efectos sonoros cruciales ([trueno lejano], [música melancólica]) y modulaciones tonales.",
    context_of_use: "Cumplimiento de leyes de accesibilidad universal en televisión broadcast y plataformas de streaming.",
    example: "El archivo CC indica en pantalla '[música de suspenso in crescendo]' y '[jadeo ahogado de María]' para transmitir el clima dramático a personas sordas.",
    visual_notes: "Texto blanco sobre recuadro negro opaco con el icono internacional '[CC]' en la esquina del reproductor.",
    llm_prompt_guidance: "Palabras clave: 'closed captions for hearing impaired, accessible sound descriptions in brackets, CC subtitle overlay'.",
    inferred_relations: { "engloba": ["srt"], "promueve_la": ["accesibilidad"], "se_diferencia_de": ["subtitulos-quemados"] }
  },
  "tasa-de-retencion": {
    denomination: "Tasa de Retención (Retention Rate / Audiencia Sostenida)",
    synonyms: ["Curva de Retención de Audiencia", "Audience Retention Graph", "Porcentaje Medio de Reproducción"],
    original_def: "Métrica analítica cuantitativa que mide el porcentaje promedio de un video que los espectadores miran antes de abandonar la reproducción, visualizada como una curva temporal continua. Permite diagnosticar con exactitud qué momentos causaron aburrimiento (caídas abruptas en la curva) o qué segmentos resultaron fascinantes (mesetas o picos de repetición).",
    context_of_use: "Optimización del montaje editorial en canales de YouTube y evaluación del rendimiento de campañas publicitarias en redes.",
    example: "Un video con un 65% de retención en el minuto 10 que el algoritmo de YouTube recomienda masivamente al identificar un enganche excepcional de la audiencia.",
    visual_notes: "Gráfico de línea descendente suave en YouTube Studio que compara la retención del video frente al rendimiento típico de videos similares.",
    llm_prompt_guidance: "Palabras clave: 'audience retention graph analysis, high retention pacing, YouTube studio analytics retention curve'.",
    inferred_relations: { "depende_de": ["hook", "montaje"], "evalua_el": ["reel-short"] }
  },
  "teleprompter": {
    denomination: "Teleprompter (Apuntador Óptico Electrónico)",
    synonyms: ["Prompter", "Autocue", "Apuntador de Cámara"],
    original_def: "Dispositivo óptico compuesto por una pantalla plana horizontal y un espejo divisor de haz (beam splitter) inclinado a 45 grados colocado directamente frente al objetivo de la cámara. Refleja el texto del guion en scroll hacia los ojos del orador mientras permite que la lente de la cámara grabe a través del cristal sin registrar las letras, logrando que el presentador lea su discurso mirando fijamente a los ojos del espectador.",
    context_of_use: "Noticieros de televisión, discursos presidenciales, cursos online masivos y grabaciones de oradores corporativos.",
    example: "El director ejecutivo lee fluidamente un discurso complejo de 10 minutos sin titubear ni desviar la mirada del centro exacto del lente de cámara.",
    visual_notes: "Cristal semirreflectante transparente montado en el parasol de la cámara con letras blancas desplazándose suavemente sobre el cristal.",
    llm_prompt_guidance: "Palabras clave: 'teleprompter camera rig, news anchor reading glass prompter, beam splitter glass setup'.",
    inferred_relations: { "asiste_a": ["a-roll"], "opera_en": ["rodaje", "broadcasting"] }
  },
  "ugc": {
    denomination: "UGC (User-Generated Content / Contenido Generado por el Usuario)",
    synonyms: ["Contenido Creado por Usuarios", "UGC Video", "Formato Testimonial Orgánico"],
    original_def: "Estilo y formato audiovisual caracterizado por una estética deliberadamente espontánea, casera y sin pulido técnico excesivo (grabado con teléfonos inteligentes, luz ambiental natural, audio directo y encuadre vertical en primera persona), creado por clientes o creadores de contenido para transmitir autenticidad, confianza y cercanía en campañas de marketing digital.",
    context_of_use: "Comerciales en TikTok y Meta Ads con alta tasa de conversión publicitaria y marketing de influencers.",
    example: "Una clienta grabándose en el espejo de su baño con el móvil mientras prueba una crema facial y comparte sus impresiones sinceras.",
    visual_notes: "Plano grabado con cámara frontal de smartphone en mano con leve temblor orgánico, luz doméstica de ventana y subtítulos llamativos al centro.",
    llm_prompt_guidance: "Palabras clave: 'authentic UGC video style, smartphone selfie camera review, natural organic handheld framing, real customer testimonial'.",
    inferred_relations: { "se_opone_a": ["cinematografia-tradicional"], "se_distribuye_en": ["reel-short", "video-vertical"] }
  },
  "video-podcast": {
    denomination: "Video Podcast (Vodcast / Podcast Audiovisual)",
    synonyms: ["Vodcast", "Podcast con Video", "Videocast"],
    original_def: "Formato audiovisual híbrido que combina la intimidad conversacional y la profundidad temática del podcasting tradicional de audio con la grabación multicámara en vivo en un estudio decorado, habitualmente con planos y contraplanos automáticos o conmutados por switcher y micrófonos de estudio prominentes en cuadro.",
    context_of_use: "Contenido de larga duración para YouTube y Spotify, debates corporativos de liderazgo y entrevistas especializadas.",
    example: "Tres cámaras 4K y micrófonos Shure SM7B grabando una conversación de dos horas entre dos expertos en tecnología en un estudio con luces de neón decorativas.",
    visual_notes: "Mesa redonda de estudio con micrófonos de brazo articulado, auriculares en los participantes y fondo con iluminación cálida estilizada.",
    llm_prompt_guidance: "Palabras clave: 'studio video podcast setup, multi-camera talk show framing, Shure SM7B on boom arm, moody studio neon lighting'.",
    inferred_relations: { "combina": ["audio-directo", "coverage"], "se_distribuye_en": ["streaming", "reel-short"] }
  },
  "video-vertical": {
    denomination: "Video Vertical (Formato 9:16 para Smartphones)",
    synonyms: ["Formato 9:16", "Vertical Video", "Mobile-First Video"],
    original_def: "Estándar de composición y aspecto audiovisual concebido específicamente para la orientación natural de los teléfonos inteligentes (relación de aspecto 9:16 o 1080x1920 píxeles). Exige una reformulación de la gramática visual clásica: los encuadres privilegian planos medios y primeros planos verticales, manteniendo la acción y los textos confinados en la zona segura central para no ser solapados por la interfaz de las aplicaciones móviles.",
    context_of_use: "Formato hegemónico para TikTok, Instagram Reels, YouTube Shorts y publicidad móvil.",
    example: "Diseñar el encuadre de una modelo caminando por la pasarela de moda para que llene de pies a cabeza la pantalla vertical del teléfono de 9:16.",
    visual_notes: "Marco rectangular esbelto orientado verticalmente con el sujeto ocupando la franja vertical central y márgenes superior e inferior despejados.",
    llm_prompt_guidance: "Palabras clave: 'vertical video 9:16 composition, full screen smartphone framing, mobile first portrait cinematography'.",
    inferred_relations: { "es_un_tipo_de": ["relacion-de-aspecto"], "es_la_base_de": ["reel-short", "ugc"], "respeta": ["safe-zones"] }
  }
};
