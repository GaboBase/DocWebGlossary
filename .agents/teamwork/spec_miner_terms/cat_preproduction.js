module.exports = {
  "animatic": {
    denomination: "Animatic",
    synonyms: ["Storyboard animado", "Leica reel", "Previsualización 2D"],
    original_def: "Maqueta audiovisual secuencial generada a partir de las viñetas del storyboard montadas en una línea de tiempo con su duración exacta, acompañada de una banda de sonido preliminar (diálogos de referencia o scratch tracks, efectos temporales y música guía). Permite calibrar el ritmo dramático, la articulación de planos y la comprensión temporal antes de movilizar los recursos de rodaje o animación definitiva.",
    context_of_use: "Fase de preproducción en comerciales publicitarios, cortometrajes de ficción y proyectos de animación 2D/3D.",
    example: "El director monta los bocetos del comercial de 30 segundos en Premiere Pro con música temp para verificar que el remate del chiste funcione dentro del tiempo límite de transmisión.",
    visual_notes: "Cuadros dibujados en escala de grises con transiciones de corte directo o disolvencias simples y códigos de tiempo superpuestos.",
    llm_prompt_guidance: "Palabras clave: 'animatic sequence, rough storyboard timed motion, timed draft panels, scratch track sync, pacing previsualization'.",
    inferred_relations: { "es_un_tipo_de": ["previsualizacion"], "se_compone_de": ["storyboard", "voice-over"], "precede_a": ["rodaje", "rough-cut"] }
  },
  "call-sheet": {
    denomination: "Call Sheet (Orden del Día)",
    synonyms: ["Orden de Citación", "Plan de Trabajo Diario", "Citación de Rodaje"],
    original_def: "Documento operativo maestro emitido diariamente por el equipo de dirección (típicamente el primer o segundo asistente de dirección) que establece el cronograma riguroso de una jornada de rodaje: hora y lugar exactos de citación para cada miembro del elenco y del equipo técnico, escenas a filmar, requerimientos específicos de vestuario y utilería, condiciones climáticas previstas y contactos de emergencia.",
    context_of_use: "Emitida al finalizar cada jornada de preproducción y rodaje para coordinar la logística del día siguiente en producciones de cualquier escala.",
    example: "La orden del día para el Día 3 estipula citación de luces y cámara a las 06:00 AM, maquillaje a las 06:30 AM y primer plano de rodaje a las 08:00 AM en locación campestre.",
    visual_notes: "Hoja tabular estandarizada con logotipo de producción, encabezado de locación meteorológica, tabla de horarios de actores y desglose de escenas por páginas de guion.",
    llm_prompt_guidance: "Palabras clave: 'film call sheet document, daily shoot schedule, crew call time table, production logistics breakdown'.",
    inferred_relations: { "es_un_tipo_de": ["documento-de-produccion"], "es_producido_por": ["asistente-de-direccion"], "organiza": ["rodaje"] }
  },
  "casting": {
    denomination: "Casting (Selección de Reparto)",
    synonyms: ["Audición", "Selección de Actores", "Talent Audition"],
    original_def: "Proceso sistemático de búsqueda, evaluación y selección de actores, locutores o modelos para encarnar los personajes o roles requeridos por el guion. Implica pruebas de cámara, lectura de fragmentos de guion (separatas) y evaluación de química actoral bajo la supervisión del director de casting y el director general.",
    context_of_use: "Fase de preproducción tras la aprobación del guion literario y la definición de perfiles de personajes.",
    example: "Se convocan a diez actrices para audicionar con una escena dramática de confrontación, evaluando su expresividad en primeros planos frente a cámara.",
    visual_notes: "Tomas de prueba de actores con pizarra identificativa con nombre, agencia y perfil de tres cuartos ante fondo neutro gris.",
    llm_prompt_guidance: "Palabras clave: 'actor audition headshot, casting call screen test, neutral background slate test, dramatic audition tape'.",
    inferred_relations: { "es_parte_de": ["preproduccion"], "depende_de": ["guion-literario"], "precede_a": ["rodaje"] }
  },
  "guion-literario": {
    denomination: "Guion Literario",
    synonyms: ["Screenplay", "Libreto", "Script"],
    original_def: "Texto narrativo estructurado bajo un formato industrial estandarizado (tipografía Courier de 12 puntos, encabezados de escena INT./EXT., descripciones de acción en presente y bloques centrados de diálogos con acotaciones) que describe detalladamente la historia audiovisual exclusivamente en términos de lo que puede ser visto y oído.",
    context_of_use: "Punto de partida conceptual y contractual de cualquier obra audiovisual, utilizado para desgloses presupuestarios, búsqueda de financiación y dirección actoral.",
    example: "Un guion de cortometraje de 15 páginas donde cada página equivale aproximadamente a un minuto de tiempo en pantalla cinematográfica.",
    visual_notes: "Página mecanografiada clásica con encabezado de escena en mayúsculas negritas: 'INT. OFICINA DE PRODUCCIÓN - DÍA' seguido de bloque descriptivo y diálogo centrado.",
    llm_prompt_guidance: "Palabras clave: 'screenplay format, Courier 12pt font, scene slugline INT/EXT, character dialogue block, formatted dramatic script'.",
    inferred_relations: { "es_la_base_de": ["guion-tecnico", "storyboard"], "define": ["storytelling"], "es_un_tipo_de": ["preproduccion"] }
  },
  "guion-tecnico": {
    denomination: "Guion Técnico",
    synonyms: ["Shooting Script", "Plan de Tomas", "Desglose Técnico"],
    original_def: "Documento de planificación visual y acústica en el que el director y el director de fotografía traducen las secuencias del guion literario en especificaciones concretas de cámara y sonido: número de escena y plano, escala de encuadre, ángulo de cámara, óptica sugerida, movimiento de cámara, iluminación, sonido directo y notas de continuidad.",
    context_of_use: "Etapa final de la preproducción antes de pisar el set de grabación.",
    example: "La escena 4 se desglosa en: Plano 1 (Plano General fijo con lente 24mm), Plano 2 (Plano Medio en travelling con 50mm) y Plano 3 (Primer Plano de reacción con 85mm).",
    visual_notes: "Formato matricial en columnas: N° Plano | Encuadre | Movimiento | Óptica | Descripción de Acción | Diálogo / Sonido.",
    llm_prompt_guidance: "Palabras clave: 'shooting script layout, shot-by-shot technical breakdown, focal length camera cues, camera angle instructions'.",
    inferred_relations: { "deriva_de": ["guion-literario"], "origina": ["shot-list", "storyboard"], "guia": ["rodaje"] }
  },
  "narrativa-visual": {
    denomination: "Narrativa Visual",
    synonyms: ["Visual Storytelling", "Discurso Visual", "Gramática Cinematográfica"],
    original_def: "Metodología y lenguaje mediante los cuales se construye sentido, emoción y arco dramático utilizando exclusivamente recursos de la imagen en movimiento: composición de encuadre, relaciones de aspecto, psicología del color, escala de planos, ritmo de corte y articulación de luz y sombras, sin depender de la exposición verbal de los personajes.",
    context_of_use: "Diseño conceptual por parte del director y director de fotografía a lo largo de todas las etapas creativas del proyecto.",
    example: "Uso de planos progresivamente más cerrados y una paleta cromática cada vez más fría para manifestar visualmente el aislamiento psicológico de un personaje.",
    visual_notes: "Secuencia comparativa de fotogramas donde la evolución cromática y el encuadre cuentan la historia sin subtítulos ni diálogos.",
    llm_prompt_guidance: "Palabras clave: 'visual storytelling, symbolic color framing, dramatic subtext composition, visual metaphor cinema, expressive shot design'.",
    inferred_relations: { "es_un_tipo_de": ["lenguaje-audiovisual"], "se_manifiesta_en": ["direccion-de-fotografia", "montaje"] }
  },
  "nda": {
    denomination: "NDA (Non-Disclosure Agreement)",
    synonyms: ["Acuerdo de Confidencialidad", "Pacto de Secreto Profesional", "Contrato de Reserva"],
    original_def: "Instrumento legal vinculante suscrito entre la casa productora, el cliente, los actores y el equipo técnico mediante el cual las partes se comprometen formalmente a no divulgar guiones, imágenes de rodaje, diseños de producto, fechas de lanzamiento ni material confidencial antes de su estreno o publicación autorizada.",
    context_of_use: "Fase de preproducción antes de compartir guiones comerciales, dossiers de proyectos o admitir personal externo al set.",
    example: "Todos los técnicos de un rodaje comercial firman un NDA para no filtrar en redes sociales el diseño del nuevo automóvil antes del evento de lanzamiento oficial.",
    visual_notes: "Documento contractual legal firmado con sellos notariales y cláusulas explícitas de penalización económica por revelación de material.",
    llm_prompt_guidance: "Palabras clave: 'legal NDA agreement, non-disclosure contract document, film confidentiality agreement'.",
    inferred_relations: { "es_un_tipo_de": ["documento-legal"], "protege": ["preproduccion", "rodaje"] }
  },
  "preproduccion": {
    denomination: "Preproducción",
    synonyms: ["Etapa de Preparación", "Pre-production Phase", "Planificación Audiovisual"],
    original_def: "Primera fase medular del ciclo de vida de una producción audiovisual, dedicada a la concepción, planificación estratégica, desarrollo de guiones, confección de presupuestos, selección de locaciones (scouting), casting, contratación de equipo técnico y calendarización logística antes del inicio del rodaje.",
    context_of_use: "Fase fundacional que precede a cualquier gasto operativo masivo en set.",
    example: "Cuatro semanas invertidas en afinar el guion técnico, tramitar permisos municipales de filmación y construir la utilería para un rodaje de dos días.",
    visual_notes: "Diagrama de flujo temporal donde la Preproducción conecta los hitos de Guion -> Presupuesto -> Scouting -> Casting -> Rodaje.",
    llm_prompt_guidance: "Palabras clave: 'pre-production planning, film development schedule, budget breakdown board, location scouting preparation'.",
    inferred_relations: { "precede_a": ["produccion-de-video", "rodaje"], "contiene": ["guion-literario", "casting", "scouting", "call-sheet"] }
  },
  "scouting": {
    denomination: "Scouting (Exploración de Locaciones)",
    synonyms: ["Búsqueda de Locaciones", "Recorrido Técnico de Locación", "Location Scouting / Recce"],
    original_def: "Inspección sistemática sobre el terreno de posibles escenarios para el rodaje, evaluando tanto su valor estético y narrativo como su viabilidad técnica: orientación solar, acústica ambiental, accesibilidad para vehículos pesados, potencia y suministro eléctrico, y permisos de filmación requeridos.",
    context_of_use: "Fase intermedia de preproducción encabezada por el productor de locaciones, director y director de fotografía.",
    example: "El equipo visita tres naves industriales para medir el eco reverberante, confirmar que las tomas de corriente soporten luces HMI de 4kW y verificar la luz solar a las 17:00.",
    visual_notes: "Fotografías panorámicas de la locación con brújula solar anotada, plano de planta acotado y tomas de los cuadros eléctricos disponibles.",
    llm_prompt_guidance: "Palabras clave: 'location scouting photo, technical site survey, architectural film location assessment, sun path diagram'.",
    inferred_relations: { "es_parte_de": ["preproduccion"], "condiciona": ["iluminacion-de-tres-puntos", "rodaje", "audio-directo"] }
  },
  "shot-list": {
    denomination: "Shot List (Lista de Planos)",
    synonyms: ["Desglose de Planos", "Lista de Tomas Planificadas", "Planilla de Cámara"],
    original_def: "Inventario secuencial y cronológico de todos los planos específicos que deben capturarse durante una jornada de filmación, ordenados no necesariamente según el orden narrativo del guion, sino agrupados por criterios de eficiencia técnica (mismo emplazamiento de luces, misma lente o misma dirección de mirada).",
    context_of_use: "Herramienta operativa indispensable del primer asistente de dirección y del director de fotografía en el set de rodaje.",
    example: "Se agrupan en la lista de planos todas las tomas mirando hacia la pared norte de la habitación para grabarlas en un solo bloque sin mover las luces principales.",
    visual_notes: "Tabla con casillas de verificación (check-boxes) numeradas con plano, lente, descripción de ángulo y columna de estado (Grabado / Pendiente).",
    llm_prompt_guidance: "Palabras clave: 'shot list checklist, daily camera shot schedule, scene coverage checklist, production shot breakdown'.",
    inferred_relations: { "deriva_de": ["guion-tecnico"], "organiza": ["rodaje"], "se_vincula_con": ["coverage"] }
  },
  "storyboard": {
    denomination: "Storyboard (Guion Gráfico)",
    synonyms: ["Guion Gráfico", "Pauta Visual", "Visual Script Board"],
    original_def: "Representación gráfica secuencial viñeta por viñeta de los planos que compondrán la película o video, ilustrando el encuadre exacto, la disposición de los actores, la dirección de miradas, los movimientos de cámara mediante flechas direccionales y los textos explicativos de acción o diálogo correspondientes.",
    context_of_use: "Fase de preproducción para alinear la visión estética y espacial entre el director, el director de fotografía, el director de arte y el cliente.",
    example: "Dibujo de un plano holandés con flechas curvas indicando que la cámara gira 45 grados mientras el personaje retrocede asustado hacia una puerta.",
    visual_notes: "Cuadrícula de viñetas rectangulares en formato 16:9 con espacio inferior para notas técnicas de plano, lente, movimiento y diálogo.",
    llm_prompt_guidance: "Palabras clave: 'film storyboard panels, comic-strip style shot breakdown, 16:9 sketched visual frames, camera motion arrows'.",
    inferred_relations: { "es_la_base_de": ["animatic"], "traduce": ["guion-tecnico"], "es_un_tipo_de": ["previsualizacion"] }
  },
  "storytelling": {
    denomination: "Storytelling (Narrativa Audiovisual)",
    synonyms: ["Estructura Narrativa", "Arte de Contar Historias", "Arco Dramático"],
    original_def: "Estructura arquitectónica y dramática que articula la premisa, los personajes, los conflictos, el clímax y la resolución de una obra audiovisual, conectando emocional e intelectualmente con la audiencia mediante la manipulación del tiempo, la información y el punto de vista.",
    context_of_use: "Fase conceptual y de desarrollo de guion, aplicable tanto al cine como a la publicidad corporativa y el contenido para redes.",
    example: "Estructurar un video de testimonio de un cliente en tres actos: 1) el problema frustrante inicial, 2) el viaje de descubrimiento, y 3) la transformación exitosa alcanzada.",
    visual_notes: "Gráfico de curva de tensión dramática clásica (introducción, detonante, conflicto ascendente, clímax y desenlace).",
    llm_prompt_guidance: "Palabras clave: 'dramatic three-act story structure, cinematic narrative arc, emotional tension curve, storytelling beats'.",
    inferred_relations: { "es_el_fundamento_de": ["guion-literario", "narrativa-visual"], "guia": ["montaje"] }
  }
};
