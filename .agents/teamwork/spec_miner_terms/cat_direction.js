module.exports = {
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
  "clapperboard": {
    denomination: "Clapperboard (Claqueta)",
    synonyms: ["Claqueta de Rodaje", "Pizarra de Sincronización", "Slate"],
    original_def: "Dispositivo tradicional de madera, acrílico o digital con código de tiempo TC que muestra los datos de identificación de la toma (título de la producción, director, DF, número de escena, plano y toma). Su brazo articulado genera un sonido percusivo nítido y un contacto visual unívoco para sincronizar con precisión de fotograma la imagen con la pista de audio independiente en postproducción.",
    context_of_use: "Inicio (o final en 'claqueta invertida') de cada toma grabada con sonido sincrónico en sistema de doble banda (cámara y grabador separados).",
    example: "El segundo asistente de cámara coloca la claqueta frente al lente a 1 metro de distancia, canta 'Escena 12, plano 3, toma 1' y baja la barra con un golpe seco.",
    visual_notes: "Claqueta electrónica con display LED rojo de código de tiempo SMPTE iluminado y barras diagonales blancas y negras en la bisagra.",
    llm_prompt_guidance: "Palabras clave: 'film clapperboard slate, smart slate timecode display, scene take marker, production sync slate'.",
    inferred_relations: { "se_utiliza_para": ["sync-sound"], "facilita": ["ingesta", "montaje"], "identifica": ["take"] }
  },
  "direccion-de-fotografia": {
    denomination: "Dirección de Fotografía (Cinematografía / DP)",
    synonyms: ["Director de Fotografía", "DP / DoP", "Cinematographer"],
    original_def: "Máxima jefatura técnica y artística responsable de la creación estética de la imagen cinematográfica. Diseña y supervisa la iluminación, la selección y configuración de cámaras, la óptica, los filtros, los movimientos de cámara, la exposición fotométrica y el aspecto cromático general de la obra en estrecha colaboración con el director.",
    context_of_use: "Desde el diseño conceptual en preproducción hasta la supervisión final del etalonaje y corrección de color en postproducción.",
    example: "El DP decide usar lentes anamórficas antiguas con aperturas T1.5 y luces LED bicolor difusas con grandes telas para darle un look suave y nostálgico al largometraje.",
    visual_notes: "Fotómetro digital en mano, visor de director colgado al cuello e inspección de monitor calibrado con falso color.",
    llm_prompt_guidance: "Palabras clave: 'cinematography masterclass, ARRI Alexa LF look, anamorphic lens flare, stylized chiaroscuro lighting, master director of photography framing'.",
    inferred_relations: { "supervisa": ["gaffer", "escala-de-planos", "iluminacion-de-tres-puntos"], "colabora_con": ["asistente-de-direccion", "etalonaje-color-grading"] }
  },
  "dit-media-management": {
    denomination: "DIT (Digital Imaging Technician) / Media Management",
    synonyms: ["Técnico de Imagen Digital", "Data Manager", "Gestor de Medios"],
    original_def: "Especialista técnico en el set encargado del control de calidad de la señal digital de video, la aplicación y calibración de LUTs de visualización en monitores de referencia, la verificación de exposición y ruido mediante osciloscopios, y la ingesta, verificación checksum (MD5/xxHash) y respaldo redundante de los archivos brutos de las tarjetas de cámara.",
    context_of_use: "Producciones profesionales de cine, series y comerciales rodados en formatos RAW o ProRes de alto flujo de datos.",
    example: "El DIT descarga las tarjetas CFexpress de la cámara en un carro móvil con matrices RAID RAID-5, genera proxies H.264 para el director y aplica la LUT técnica para el monitor del cliente.",
    visual_notes: "Estación de trabajo DIT móvil montada en carrito Inovativ con monitores OLED calibrados, lectores de tarjetas de alta velocidad y DaVinci Resolve abierto.",
    llm_prompt_guidance: "Palabras clave: 'DIT cart workstation, on-set live grading, secure checksum data backup, calibrated Flanders monitor, digital imaging technician'.",
    inferred_relations: { "gestiona": ["raw", "proxy", "lut"], "asegura": ["ingesta", "rodaje"] }
  },
  "gaffer": {
    denomination: "Gaffer (Jefe de Iluminación)",
    synonyms: ["Jefe de Eléctricos", "Chief Lighting Technician (CLT)", "Técnico Jefe de Iluminación"],
    original_def: "Jefe técnico del departamento eléctrico que ejecuta el esquema de iluminación concebido por el Director de Fotografía. Coordina la distribución de potencia eléctrica, la selección, montaje y direccionamiento de luminarias (HMI, tungsteno, LED), y supervisa directamente al equipo de eléctricos y al best boy electric.",
    context_of_use: "Presente durante el reconocimiento técnico de locaciones (recce) y liderando el montaje de luces en el set durante el rodaje.",
    example: "El gaffer calcula que se requieren tres generadores insonorizados de 50kVA para alimentar las luces de tungsteno Maxi-Brute en la escena nocturna en el bosque.",
    visual_notes: "Técnico con guantes de cuero de protección térmica, cinta métrica, multímetro y walkie-talkie coordinando el izado de un proyector Skypanel en trípode Combo.",
    llm_prompt_guidance: "Palabras clave: 'film set gaffer, chief lighting technician adjusting HMI light, electrical rig on movie set, lighting crew'.",
    inferred_relations: { "ejecuta": ["iluminacion-de-tres-puntos", "key-light", "backlight"], "responde_a": ["direccion-de-fotografia"] }
  },
  "on-location": {
    denomination: "On Location (Rodaje en Locación)",
    synonyms: ["Grabación en Exteriores / Interiores Reales", "Rodaje en Terreno", "Location Shooting"],
    original_def: "Modalidad de producción cinematográfica o videográfica que se lleva a cabo en escenarios e inmuebles del mundo real en lugar de un plató o estudio cerrado insonorizado. Exige gestionar contingencias externas como variaciones de luz natural, ruido ambiental, tráfico y logística de traslado.",
    context_of_use: "Documentales, reportajes de noticias, largometrajes con estética realista y spots grabados en oficinas o calles auténticas.",
    example: "Filmar una escena de persecución a pie en el mercado central de una ciudad, requiriendo aislamiento de multitudes y permisos de vía pública.",
    visual_notes: "Camiones de producción aparcados en la acera, carpas de descanso, reflectores con banderas protegiendo la cámara del sol directo en plena calle.",
    llm_prompt_guidance: "Palabras clave: 'on-location film shoot, authentic city street backdrop, live urban movie set, realistic exterior production'.",
    inferred_relations: { "se_opone_a": ["produccion-virtual"], "requiere": ["scouting", "call-sheet"], "afecta": ["audio-directo"] }
  },
  "playback": {
    denomination: "Playback (Video Assist / Reproducción en Set)",
    synonyms: ["Video Assist", "Reproducción Inmediata", "Comprobación de Toma"],
    original_def: "Sistema y procedimiento que permite reproducir instantáneamente en los monitores del set la toma recién capturada por la cámara, permitiendo al director, los actores y los jefes de departamento evaluar la solidez de la interpretación actoral, la precisión del enfoque y la ausencia de anomalías técnicas.",
    context_of_use: "Rutina inmediata tras dar la orden de 'corte' en el set de filmación profesional.",
    example: "El director reúne a los dos actores alrededor del monitor SmallHD de 17 pulgadas para revisar la toma 2 y ajustar el timing de una réplica cómica.",
    visual_notes: "Pánel de control de video assist QTake con timeline mostrando marcas de entrada y salida y división de pantalla multicámara.",
    llm_prompt_guidance: "Palabras clave: 'director video assist monitor, on-set instant playback, QTake video replay review, reviewing take on set'.",
    inferred_relations: { "evalua": ["take"], "asiste_a": ["rodaje", "asistente-de-direccion"] }
  },
  "produccion-de-video": {
    denomination: "Producción de Video (Proceso Audiovisual Integral)",
    synonyms: ["Producción Audiovisual", "Ciclo de Creación de Video", "Video Production Workflow"],
    original_def: "Disciplina y proceso industrial integral que abarca desde la formulación conceptual inicial de una idea hasta la entrega de la pieza terminada, articulado canónicamente en tres fases correlativas: Preproducción (concepción y planificación), Producción (rodaje y captación) y Postproducción (montaje, sonido, color y masterización).",
    context_of_use: "Marco metodológico estándar para películas, publicidad comercial, videos corporativos, videoclips y contenido digital.",
    example: "Un proyecto corporativo de 8 semanas que dedica 3 semanas a preproducción, 3 días a rodaje, y 4 semanas a edición, color y entrega de versiones para redes.",
    visual_notes: "Infografía tripartita con flechas cronológicas conectando las etapas: Preproducción -> Producción / Rodaje -> Postproducción -> Distribución.",
    llm_prompt_guidance: "Palabras clave: 'professional video production workflow, 3-phase audiovisual process, full production pipeline chart'.",
    inferred_relations: { "se_compone_de": ["preproduccion", "rodaje", "postproduccion"], "conduce_a": ["deliverable"] }
  },
  "produccion-remota": {
    denomination: "Producción Remota (REMI)",
    synonyms: ["REMI (Remote Integration Model)", "Transmisión Centralizada Remota", "Producción Descentralizada"],
    original_def: "Modelo operativo de producción televisiva o de streaming en el que las señales de las cámaras y micrófonos situados físicamente en el lugar del evento se transportan mediante redes IP de ultra baja latencia (fibra oscura, 5G o protocolos SRT/NDI) hacia un centro de control o galería de realización ubicado a cientos de kilómetros, donde se realiza la mezcla, grafismo y emisión.",
    context_of_use: "Transmisiones de grandes eventos deportivos, conciertos multitudinarios, convenciones corporativas globales y cobertura de elecciones.",
    example: "Seis cámaras transmiten señales IP en 1080p50 desde el estadio de fútbol en Medellín a la sala de realizadores en Bogotá vía fibra óptica dedicada con menos de 100ms de retardo.",
    visual_notes: "Diagrama de red conectando encoders portátiles en el estadio a través de enlaces IP redundantes hacia un switcher central en el centro de control.",
    llm_prompt_guidance: "Palabras clave: 'REMI remote production, IP broadcast architecture, low latency sports remote feed, cloud video switching'.",
    inferred_relations: { "emplea": ["ndi", "latencia", "switcher-de-video"], "es_un_tipo_de": ["broadcasting"] }
  },
  "rodaje": {
    denomination: "Rodaje (Shooting / Principal Photography)",
    synonyms: ["Fase de Grabación", "Fotografía Principal", "Shooting Phase"],
    original_def: "Fase de ejecución práctica en el set o locación donde se captura físicamente el material visual y sonoro (tomas) estipulado en el guion técnico, movilizando simultáneamente a actores, dirección, cámara, luces, sonido, arte, maquillaje y producción bajo estrictas pautas de tiempo.",
    context_of_use: "Núcleo del proceso de producción audiovisual, habitualmente la etapa más costosa por jornada de trabajo.",
    example: "Una jornada de rodaje de 10 horas en la que se ejecutan 18 configuraciones de cámara para completar las 3 páginas de guion programadas para el día.",
    visual_notes: "Set activo con dolly montado sobre rieles, reflector principal iluminando a los actores, caña de sonido suspendida y director atento al monitor de campo.",
    llm_prompt_guidance: "Palabras clave: 'active film set shooting, cinema camera on dolly tracks, actors in dramatic scene, full movie production set'.",
    inferred_relations: { "sucede_a": ["preproduccion"], "precede_a": ["postproduccion"], "genera": ["a-roll", "b-roll", "audio-directo"] }
  },
  "take": {
    denomination: "Take (Toma)",
    synonyms: ["Toma de Cámara", "Registro Individual", "Shot Take"],
    original_def: "Registro continuo e ininterrumpido de imagen y sonido comprendido entre la orden de '¡Acción!' y la orden de '¡Corte!'. Para un mismo plano del guion técnico suelen filmarse múltiples tomas hasta lograr la conjunción óptima de actuación, foco, movimiento de cámara e iluminación.",
    context_of_use: "Unidad operativa fundamental de registro durante las jornadas de filmación.",
    example: "El director solicita la 'Toma 4' del primer plano del protagonista debido a que en la toma anterior hubo un leve desenfoque al girar la cabeza.",
    visual_notes: "Claqueta marcando 'Plano 5 - Toma 3' antes de iniciar la acción; reporte de cámara (camera report) anotando 'Toma 3: Buena (Circle Take)'.",
    llm_prompt_guidance: "Palabras clave: 'film take slate numbering, multiple take filming, circle take notation, camera roll slate'.",
    inferred_relations: { "es_la_unidad_de": ["rodaje"], "se_selecciona_en": ["rough-cut"], "se_vincula_con": ["clapperboard"] }
  },
  "vfx-supervisor": {
    denomination: "VFX Supervisor (Supervisor de Efectos Visuales)",
    synonyms: ["Supervisor de Efectos Digitales", "Jefe de Efectos Visuales", "Visual Effects Supervisor"],
    original_def: "Jefe de departamento técnico y creativo que planifica, supervisa y garantiza la correcta captura de datos en el set de rodaje (medición de distancias con láser, capturas HDR de iluminación en esfera cromada/gris, puntos de tracking y pantallas de croma) para asegurar una integración fotorrealista y eficiente de los elementos generados por computadora en postproducción.",
    context_of_use: "Desde el diseño conceptual de secuencias en preproducción hasta la aprobación de planos finales con CGI en el estudio de VFX.",
    example: "En un plano donde un actor interactuará con una criatura 3D, el supervisor de VFX toma una fotografía 360° con esfera gris/espejada para reconstruir la luz exacta del set en el motor de render.",
    visual_notes: "Técnico en set sosteniendo una esfera mitad cromo y mitad gris neutro de 18% para capturar el mapa de luz HDRI en el lugar exacto del sujeto.",
    llm_prompt_guidance: "Palabras clave: 'VFX supervisor holding chrome ball, tracking markers on green screen, on-set data acquisition for CGI'.",
    inferred_relations: { "supervisa": ["vfx", "camera-tracking", "chroma-key"], "colabora_con": ["direccion-de-fotografia"] }
  },
  "wrap": {
    denomination: "Wrap (Fin de Rodaje / Finalización)",
    synonyms: ["Cierre de Rodaje", "That's a Wrap", "Final de Jornada"],
    original_def: "Declaración formal emitida por el director o primer asistente de dirección que indica la finalización oficial del rodaje de una jornada de filmación ('daily wrap') o de la totalidad del plan de rodaje de una producción ('picture wrap'), dando inicio al desmontaje de equipos y la entrega de medios al laboratorio o DIT.",
    context_of_use: "Momento culminante de cada jornada de set y celebración final del cierre de la fotografía principal de una película.",
    example: "El 1st AD grita '¡Es un wrap para el elenco principal!', desatando aplausos en el set tras finalizar 25 días consecutivos de filmación.",
    visual_notes: "Técnicos enrollando cables BNC, guardando ópticas en sus maletines Pelican acolchados y desmontando trípodes pesados.",
    llm_prompt_guidance: "Palabras clave: 'film set wrap, wrapping up production day, packing cinema equipment into flight cases'.",
    inferred_relations: { "concluye": ["rodaje"], "da_paso_a": ["postproduccion"] }
  }
};
