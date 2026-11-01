module.exports = {
  "audio-directo": {
    denomination: "Audio Directo (Sonido de Producción)",
    synonyms: ["Sonido de Producción", "Sonido Directo de Set", "Production Sound"],
    original_def: "Registro electroacústico de las voces, ambientes y efectos de sonido capturados en vivo durante el rodaje sincrónico de las tomas de cámara, utilizando micrófonos direccionales (boom) y transmisores inalámbricos de solapa (lavalier) conectados a grabadores multipista portátiles.",
    context_of_use: "Jornadas de rodaje en set interior o exteriores para captar la actuación vocal fidedigna con la máxima relación señal/ruido posible.",
    example: "Captura simultánea en 4 canales discretos: caña boom superior para el ambiente general y dos lavaliers inalámbricos en los cuellos de los entrevistados.",
    visual_notes: "Grabador de audio Sound Devices con potenciómetros analógicos e indicadores vúmetro LED en verde/amarillo bordeando -18 dBFS.",
    llm_prompt_guidance: "Palabras clave: 'production sound capture, boom mic overhead, multi-track field recorder, clean dialogue capture, isolated audio channels'.",
    inferred_relations: { "requiere": ["boom", "lavalier", "phantom-power", "xlr"], "alimenta": ["ingesta", "mezcla-de-sonido"] }
  },
  "boom": {
    denomination: "Boom (Micrófono de Caña / Shotgun)",
    synonyms: ["Micrófono Shotgun", "Pértiga de Sonido", "Caña de Sonido"],
    original_def: "Sistema de captación acústica compuesto por una pértiga telescópica extensible de fibra de carbono y un micrófono direccional de tubo de interferencia (shotgun con patrón polar hipercardioide o supercardioide). Permite posicionar la cápsula a escasos centímetros por encima de las cabezas de los actores, justo fuera del límite superior del encuadre, captando un diálogo rico, corpóreo y sin reverberaciones indeseadas.",
    context_of_use: "Grabación principal de diálogos en escenas de ficción, cine, entrevistas sentadas y series de televisión.",
    example: "El operador de boom sostiene la pértiga a 3 metros de altura con una suspensión antivibratoria y un cortavientos (zeppelin/deadcat) para neutralizar el viento en la playa.",
    visual_notes: "Pértiga de 4 metros extendida sobre los actores con cápsula apuntando hacia la boca a 45 grados y cable XLR enrollado a lo largo del mástil.",
    llm_prompt_guidance: "Palabras clave: 'boom pole overhead microphone, shotgun mic with deadcat windshield, cinema boom operator capturing dialogue'.",
    inferred_relations: { "es_un_tipo_de": ["microfono"], "alimenta": ["audio-directo"], "se_conecta_con": ["xlr"] }
  },
  "lavalier": {
    denomination: "Lavalier (Micrófono de Solapa / Corbatero)",
    synonyms: ["Micrófono de Corbata", "Lavalier Inalámbrico", "Lapel Mic"],
    original_def: "Micrófono electrodinámico o de condensador miniatura con cápsula omnidireccional diseñado para ser prendido de forma discreta en la ropa del sujeto (solapa, corbata, cuello) o completamente oculto bajo el vestuario mediante adhesivos médicos especiales. Conectado a una petaca transmisora inalámbrica UHF/digital, asegura una relación señal/ruido constante sin importar el movimiento del actor en el set.",
    context_of_use: "Entrevistas en movimiento, conferencias corporativas, reality shows y planos generales de ficción donde una caña boom entraría en cuadro.",
    example: "Instalación de una cápsula Sanken COS-11D oculta bajo el cuello de la camisa del director ejecutivo para grabar su ponencia mientras camina por el auditorio.",
    visual_notes: "Cápsula diminuta de 4mm con clip metálico y cable fino conectado al transmisor inalámbrico sujeto al cinturón trasero del orador.",
    llm_prompt_guidance: "Palabras clave: 'discreet lavalier lapel microphone, wireless transmitter beltpack, clean close-mic speech capture'.",
    inferred_relations: { "es_un_tipo_de": ["microfono"], "proporciona": ["audio-directo"], "se_complementa_con": ["boom"] }
  },
  "mixer": {
    denomination: "Mixer (Mesa de Mezclas de Audio / Grabador Portátil)",
    synonyms: ["Consola de Sonido de Campo", "Mezclador Multipista", "Field Audio Recorder / Mixer"],
    original_def: "Dispositivo electrónico especializado que recibe múltiples señales de micrófonos simultáneas a través de preamplificadores de bajo ruido analógicos, permitiendo ecualizar, filtrar frecuencias graves indeseadas (paso alto / low cut), ajustar ganancias individuales, enrutar envíos auxiliares y mezclar en vivo una pista estéreo o registrar cada canal de forma aislada (tracks ISO) en tarjetas de memoria de estado sólido.",
    context_of_use: "Estación de trabajo del sonidista jefe (production sound mixer) en el carrito de sonido o bolso de campo durante el rodaje.",
    example: "El sonidista monitorea con audífonos cerrados Sennheiser HD25, ajustando el fader del canal 1 (boom) y balanceando los canales 2 y 3 (lavaliers) mientras graba a 24-bit / 48kHz.",
    visual_notes: "Carcasa de aluminio con potenciómetros rotatorios con protección metálica, pantalla OLED de lectura de picos y puertos XLR en los laterales.",
    llm_prompt_guidance: "Palabras clave: 'Sound Devices field mixer recorder, multi-track audio console, professional audio mixer dials and meters'.",
    inferred_relations: { "procesa": ["audio-directo"], "proporciona": ["phantom-power"], "entrega": ["stems"] }
  },
  "phantom-power": {
    denomination: "Phantom Power (+48V / Alimentación Fantasma)",
    synonyms: ["Alimentación +48V", "Phantom Powering", "P48"],
    original_def: "Método estandarizado (norma IEC 61938) para suministrar corriente continua (+48 voltios) a través de los mismos conductores balanceados de un cable XLR estándar que transmiten la señal de audio, utilizado para polarizar las placas del condensador y alimentar los circuitos preamplificadores internos de micrófonos de condensador profesionales sin necesidad de baterías externas.",
    context_of_use: "Activado mediante un interruptor físico en grabadoras, mezcladores e interfaces de audio cada vez que se conecta un micrófono de condensador o caña boom.",
    example: "El sonidista activa el botón '+48V' en la grabadora portátil para hacer funcionar el micrófono shotgun Sennheiser MKH416 en el set.",
    visual_notes: "Interruptor serigrafiado con '+48V' o indicador LED rojo iluminado junto a la entrada hembra XLR de la consola.",
    llm_prompt_guidance: "Palabras clave: 'phantom power +48V switch, balanced audio power delivery, professional studio condenser mic powering'.",
    inferred_relations: { "alimenta": ["boom"], "se_transmite_por": ["xlr"], "es_suministrado_por": ["mixer"] }
  },
  "room-tone": {
    denomination: "Room Tone (Tono de Sala / Ruido de Fondo de Locación)",
    synonyms: ["Sonido Ambiente de Sala", "Presence Track", "Ambiente Neutro de Set"],
    original_def: "Grabación continua de audio ambiental de 30 a 60 segundos realizada en riguroso silencio absoluto por parte de todo el equipo en la locación exacta donde se filmaron las escenas. Registra las propiedades acústicas específicas del espacio (zumbidos de aire acondicionado inaudibles, resonancias de paredes, eco natural), utilizándose en postproducción para rellenar huecos entre cortes de diálogo y garantizar una transición acústica imperceptible.",
    context_of_use: "Grabado religiosamente al concluir el rodaje en cada locación o set antes de desmontar los micrófonos.",
    example: "El 1st AD pide '¡Silencio absoluto en set para tono de sala, un minuto!', mientras el sonidista graba el aire estático del aula vacía.",
    visual_notes: "Forma de onda de audio continua, suave y de baja amplitud en la línea de tiempo de Pro Tools sirviendo como base homogénea bajo los clips de diálogo.",
    llm_prompt_guidance: "Palabras clave: 'room tone audio recording, silent film set ambient presence, acoustic floor room tone track'.",
    inferred_relations: { "es_un_tipo_de": ["audio-directo"], "facilita": ["mezcla-de-sonido", "adr"], "evita": ["cortes-acusticos"] }
  },
  "sync-sound": {
    denomination: "Sync Sound (Sonido Sincrónico / Audio Sincronizado)",
    synonyms: ["Sonido Sincronizado", "Audio en Fase", "Double-System Sound Sync"],
    original_def: "Procedimiento y condición en la que la pista de audio registrada coincide con una precisión matemática absoluta (a nivel de submili-segundo y de fotograma) con el movimiento labial de los actores y los acontecimientos físicos visibles en el plano de video, lograda mediante código de tiempo SMPTE compartido vía inalámbrica (Tentacle Sync) o el golpe de la claqueta.",
    context_of_use: "Fase de rodaje con sistema de doble banda (cámara y grabador independientes) y primera fase de ingesta en el software de montaje.",
    example: "Sincronización automática de 200 clips de video con sus pistas de audio WAV multipista correspondientes en DaVinci Resolve utilizando el código de tiempo incrustado.",
    visual_notes: "Pico agudo transitorio en la forma de onda de audio alineado exactamente con el fotograma de video donde las dos barras de la claqueta hacen contacto físico.",
    llm_prompt_guidance: "Palabras clave: 'sync sound waveform alignment, frame-accurate lip sync, audio timecode synchronization'.",
    inferred_relations: { "se_logra_con": ["clapperboard", "timecode"], "es_requisito_de": ["montaje", "a-roll"] }
  },
  "xlr": {
    denomination: "XLR (Conector de Audio Balanceado Cannon)",
    synonyms: ["Conector Cannon", "Cable de Audio Balanceado de 3 Pines", "XLR-3"],
    original_def: "Estándar industrial de conexión eléctrica circular y balanceada de tres clavijas (Pin 1: masa/chasis; Pin 2: polo positivo/fase; Pin 3: polo negativo/contrafase). Su circuito balanceado cancela pasivamente las interferencias electromagnéticas y ruidos de radiofrecuencia a lo largo de cables de decenas de metros, convirtiéndolo en el estándar indiscutible para microfonía y señales de nivel de línea profesional.",
    context_of_use: "Conexión de micrófonos, consolas, altavoces activos y enlaces de audio en sets de rodaje, estudios y unidades móviles.",
    example: "Tirar una línea de cable XLR de 30 metros desde el mástil del boom en la playa hasta la carpa del sonidista sin sufrir zumbidos eléctricos inducidos.",
    visual_notes: "Conector metálico cilíndrico robusto Neutrik con pestillo de seguridad retráctil y tres pines dorados internos.",
    llm_prompt_guidance: "Palabras clave: 'Neutrik XLR 3-pin connector, balanced shielded audio cable, professional stage audio jack'.",
    inferred_relations: { "conecta": ["boom", "mixer"], "transporta": ["phantom-power", "audio-directo"] }
  }
};
