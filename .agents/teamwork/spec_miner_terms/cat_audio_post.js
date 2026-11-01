module.exports = {
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
  "doblaje": {
    denomination: "Doblaje (Dubbing / Voice Localization)",
    synonyms: ["Doblaje de Idioma", "Localización de Voz", "Voice Dubbing"],
    original_def: "Proceso de traducción, adaptación lingüística, sincronización labial (lip-sync) y regrabación de las pistas de diálogo de una obra audiovisual a un idioma distinto del idioma original en el que fue filmada, sustituyendo la pista vocal original pero manteniendo intactos los efectos sonoros, ambientes (M&E) y la banda sonora musical.",
    context_of_use: "Distribución internacional de películas, series de televisión, animaciones y videojuegos para mercados de idiomas específicos.",
    example: "Un largometraje rodado en inglés es doblado al español neutro latinoamericano en un estudio de doblaje en Bogotá, sincronizando los fonemas con los labios de los actores.",
    visual_notes: "Atril de locutor con guion pautado con marcas de respiración y código de tiempo, micrófono Neumann U87 y monitor de video al frente.",
    llm_prompt_guidance: "Palabras clave: 'voice dubbing booth, foreign language voiceover track, lip-sync translation dub, foreign audio track'.",
    inferred_relations: { "se_diferencia_de": ["adr"], "requiere": ["stems"], "es_parte_de": ["distribucion"] }
  },
  "foley": {
    denomination: "Foley (Efectos de Sala / Foley Art)",
    synonyms: ["Efectos de Sala", "Foley Sound", "Sonorización Manual"],
    original_def: "Arte y técnica de postproducción de sonido que consiste en recrear y grabar sincrónicamente en un estudio especializado todos los ruidos y efectos físicos producidos por la interacción de los personajes con su entorno (pisadas sobre grava, crujido de chaquetas de cuero, choque de copas, desenvainar espadas), dotando de textura, cercanía y realismo táctil a la imagen.",
    context_of_use: "Indispensable en toda postproducción cinematográfica para reemplazar los ruidos perdidos al limpiar los diálogos o al crear la pista M&E (Música y Efectos).",
    example: "El artista de foley pisa con botas de tacón sobre una bandeja llena de arena mientras mira en pantalla al protagonista caminando por una playa en silencio.",
    visual_notes: "Estudio de foley con distintos cajones de superficies (madera, baldosas, gravilla, cemento) y cajas llenas de objetos heterogéneos (vajilla, cadenas, telas).",
    llm_prompt_guidance: "Palabras clave: 'foley artist studio pit, custom physical sound effects recording, Foley footsteps recording, tactile audio design'.",
    inferred_relations: { "alimenta": ["mezcla-de-sonido"], "es_indispensable_en": ["stems"], "se_combina_con": ["sfx"] }
  },
  "lufs-loudness": {
    denomination: "LUFS / Loudness (Loudness Units Full Scale)",
    synonyms: ["Loudness Units", "LKFS", "Volumen Normalizado", "Normalización EBU R128 / ITU-R BS.1770"],
    original_def: "Unidad estándar internacional de medición que cuantifica la sonoridad subjetiva (intensidad percibida por el oído humano en función de la curva psicoacústica de frecuencias a lo largo del tiempo), sustituyendo a los antiguos medidores de picos. Las plataformas imponen estándares rigurosos de sonoridad integrada: -14 LUFS para Spotify y YouTube, -16 LUFS para Apple Podcasts, y -23 o -24 LUFS para televisión broadcast.",
    context_of_use: "Fase final de masterización de audio para garantizar que el contenido no suene saturado ni excesivamente débil en comparación con el resto del catálogo de la plataforma.",
    example: "El ingeniero de audio ajusta un limitador multibanda para que la mezcla final del video comercial marque exactamente -14 LUFS integrados y un True Peak de -1.0 dBFS.",
    visual_notes: "Gráfico de barras horizontales de Youlean Loudness Meter mostrando valores numéricos de Integrated Loudness, Short Term y True Peak en decibelios.",
    llm_prompt_guidance: "Palabras clave: 'loudness normalization -14 LUFS, EBU R128 compliance, integrated loudness meter, broadcast audio standard'.",
    inferred_relations: { "regula": ["masterizacion-de-entrega"], "es_un_parametro_de": ["mezcla-de-sonido"], "evita": ["distorsion"] }
  },
  "mezcla-de-sonido": {
    denomination: "Mezcla de Sonido (Sound Mix / Re-recording Mixing)",
    synonyms: ["Re-recording Mixing", "Mixaje de Audio", "Final Sound Mix"],
    original_def: "Proceso artístico y técnico en el que se combinan, balancean, ecualizan, procesan dinámicamente y sitúan espacialmente en el panorama estéreo o envolvente todas las pistas sonoras independientes de la obra: diálogos directos, ADR, efectos de sala (Foley), efectos especiales de sonido (SFX), ambientes naturales y la banda sonora musical.",
    context_of_use: "Etapa culminante de la postproducción de audio antes de la exportación del master de entrega.",
    example: "Atenuar automáticamente (sidechain ducking) la música de fondo 4 dB cada vez que el narrador habla para garantizar inteligibilidad absoluta de la voz.",
    visual_notes: "Consola de mezclas Avid S6 con decenas de faders motorizados, pantalla con Pro Tools y analizador de espectro de frecuencias por canal.",
    llm_prompt_guidance: "Palabras clave: 're-recording mixing console, balanced film sound mix, audio ducking music and speech, 5.1 surround sound mix stage'.",
    inferred_relations: { "integra": ["audio-directo", "adr", "foley", "underscore"], "produce": ["stems", "lufs-loudness"] }
  },
  "stems": {
    denomination: "Stems (Pistas de Audio Separadas / Submezclas)",
    synonyms: ["Submezclas de Audio", "Buss Stems", "M&E Tracks"],
    original_def: "Archivos de audio de submezclas discretas que agrupan los elementos sonoros de una producción en categorías independientes: pista de Diálogos (DX), pista de Música (MX), pista de Efectos y Foley (FX) y pista de Ambientes (AMB). Permiten comercializar la obra a distribuidores internacionales que necesitan cambiar el idioma conservando intacta la pista de Música y Efectos (M&E).",
    context_of_use: "Entregables contractuales obligatorios para productoras ante plataformas como Netflix, canales de televisión o agentes de ventas internacionales.",
    example: "Exportar el archivo maestro junto a cuatro archivos WAV a 24-bit/48kHz sincronizados: DX, MX, FX y la pista internacional combinada M&E.",
    visual_notes: "Cuatro carpetas de pistas de audio coloreadas en el timeline (amarillo diálogos, verde música, azul efectos y morado ambientes).",
    llm_prompt_guidance: "Palabras clave: 'audio stems export, DX MX FX stems, M&E mix deliverable, multitrack audio submixes'.",
    inferred_relations: { "es_un_tipo_de": ["deliverable"], "deriva_de": ["mezcla-de-sonido"], "habilita": ["doblaje"] }
  },
  "underscore": {
    denomination: "Underscore (Música Incidental / Música de Fondo)",
    synonyms: ["Música de Acompañamiento", "Banda Sonora Incidental", "Background Score"],
    original_def: "Composición musical instrumental diseñada para sonar por debajo de los diálogos y efectos de una escena sin restarles protagonismo ni competir por las mismas frecuencias medias de la voz humana, modulando sutilmente el tono emocional, la expectación o la tensión del espectador.",
    context_of_use: "Postproducción de sonido en escenas dramáticas, videos corporativos emotivos y documentales.",
    example: "Un suave arreglo de piano y cuerdas a bajo volumen que comienza justo cuando el entrevistado rememora un recuerdo de su infancia.",
    visual_notes: "Pistas estéreo de música instrumental ecualizadas con un ligero corte de frecuencias (dip) en la banda media de 1kHz a 3kHz para despejar el espacio espectral de la voz.",
    llm_prompt_guidance: "Palabras clave: 'subtle emotional underscore, background cinematic music, warm strings and piano score, non-intrusive dialogue music bed'.",
    inferred_relations: { "es_un_tipo_de": ["musica"], "se_integra_en": ["mezcla-de-sonido"], "apoya_al": ["storytelling"] }
  },
  "voice-over": {
    denomination: "Voice-over (Voz en Off / Locución)",
    synonyms: ["Voz en Off", "Voz Superpuesta", "Locución de Narrador"],
    original_def: "Pista vocal grabada en estudio de un narrador, presentador o personaje que se reproduce sobre la imagen sin que el emisor de la voz aparezca físicamente en pantalla hablando, funcionando como hilo conductor explicativo, comentario reflexivo o monólogo interior.",
    context_of_use: "Videos corporativos institucionales, comerciales de televisión, documentales de naturaleza y narración en primera persona en cine.",
    example: "La voz profunda y cálida del locutor explicando los valores de innovación de la compañía mientras en pantalla se suceden tomas de B-Roll de los laboratorios.",
    visual_notes: "Locutor con filtro antipop frente al micrófono en cabina insonorizada leyendo el texto sincronizado con el código de tiempo de la imagen.",
    llm_prompt_guidance: "Palabras clave: 'corporate voice-over narration, deep resonant narrator speech, studio voice track over B-roll, documentary voiceover'.",
    inferred_relations: { "se_combina_con": ["b-roll"], "guia_el": ["a-roll"], "se_integra_en": ["mezcla-de-sonido"] }
  }
};
