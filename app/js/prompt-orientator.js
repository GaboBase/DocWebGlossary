/**
 * DOCWEB MULTIGLOSSARY — Módulo Orientador de Intenciones Audiovisuales para IA
 * Milestone 4 & Extensión Multiglosario Adaptativa:
 * - Conversión de intenciones creativas en especificaciones técnicas estructuradas.
 * - Soporte dinámico adaptado al Glosario Activo (AudiovisualProduction, Render-3D, VideoImage).
 * - Atributos Determinantes de Producción específicos y adaptativos por cada Producto Objetivo.
 * - Verbos de acción como directivas imperativas para modelos generativos.
 * - Tareas y actividades secuenciales por fases de trabajo (Preproducción, Producción, Postproducción).
 * - Cero dependencias externas. 100% autónomo y compatible con navegador y Node.js.
 */

(function () {
  'use strict';

  // -------------------------------------------------------------
  // Catálogo Completo de Productos por Glosario
  // -------------------------------------------------------------
  const PRODUCTS = {
    // =========================================================
    // GLOSARIO: Producción Audiovisual & Terminología de Video
    // =========================================================
    'trailer': {
      id: 'trailer',
      name: 'Trailer Cinematográfico',
      glossaryId: 'audiovisual-production',
      description: 'Pieza promocional de alta intensidad narrativa que condensa el arco dramático y los momentos cumbre sin desvelar el desenlace.',
      targetDuration: '90s - 150s (1.5 - 2.5 min)',
      recommendedAspectRatios: ['2.39:1 (Anamorphic CinemaScope)', '16:9 (1.78:1 Widescreen)', '2.00:1 (Univisium)'],
      recommendedResolutions: ['4K DCI (4096x2160)', 'UHD (3840x2160)', '2K CinemaScope (2048x858)'],
      determinantAttributes: [
        { key: 'duration', label: 'Duración Prevista', placeholder: 'Ej. 2 minutos, 120s' },
        { key: 'aspectRatio', label: 'Relación de Aspecto', options: ['2.39:1', '16:9', '2.00:1 (Univisium)'] },
        { key: 'resolution', label: 'Resolución y Formato Master', options: ['4K DCI (4096x2160)', 'UHD 3840x2160', '2K CinemaScope'] },
        { key: 'pacing', label: 'Ritmo y Estructura de Montaje', placeholder: 'Ej. Escalada en 3 actos, cortes rápidos en clímax' },
        { key: 'audio', label: 'Diseño Sonoro y Música', placeholder: 'Ej. Híbrido orquestal con braams épicos y subgraves' },
        { key: 'camera', label: 'Movimientos de Cámara y Ópticas', placeholder: 'Ej. Óptica anamórfica 35mm con destellos horizontales' },
        { key: 'style', label: 'Estilo Visual y Estética', placeholder: 'Ej. Cinematic teal & orange, grano fílmico 35mm' },
        { key: 'targetAudience', label: 'Audiencia Objetivo', placeholder: 'Ej. Audiencia general de cine y streaming' },
        { key: 'intent', label: 'Finalidad / Intención Creativa', placeholder: 'Ej. Generar máxima expectación e intriga' },
        { key: 'platform', label: 'Plataforma de Distribución', options: ['Cine / Salas comerciales', 'YouTube 4K', 'OTT Streaming'] }
      ],
      defaultAttributes: {
        duration: '2 minutos',
        aspectRatio: '2.39:1',
        resolution: '4K DCI',
        targetAudience: 'Audiencia general de cine y plataformas streaming',
        intent: 'Generar máxima expectación, intriga y anticipación comercial',
        platform: 'Cine / Salas comerciales, YouTube 4K, Carteleras Digitales',
        style: 'Cinematográfico anamórfico 35mm con destellos horizontales y grano fílmico orgánico',
        audio: 'Banda sonora híbrida orquestal-electrónica con impactos braam profundos y diseño sonoro envolvente',
        subtitles: 'Sin subtítulos o subtítulos cinemáticos en caja inferior con tipografía sans-serif',
        pacing: 'Estructura en 3 actos: planteamiento intrigante, escalada rítmica y clímax acelerado con cortes de impacto',
        camera: 'Planos generales épicos, travellings dinámicos con grúa y planos detalle dramáticos de personajes'
      },
      actionVerbs: [
        'Encuadrar con dramatismo anamórfico',
        'Modular el arco de tensión ascendente',
        'Acelerar la cadencia de corte hacia el clímax',
        'Yuxtaponer momentos cumbre con cortes de impacto',
        'Sincronizar acentos visuales con golpes de braam sonoro',
        'Contrastar planos generales épicos con primeros planos intensos'
      ],
      actionDirectives: [
        'Encuadrar sujetos principales utilizando lentes anamórficas de 35mm y 50mm con relación de aspecto 2.39:1.',
        'Modular el ritmo de montaje comenzando con planos pausados de situación (establishing shots) y escalando hacia cortes sincopados a negro.',
        'Sincronizar los cortes de mayor impacto visual con transiciones sonoras y subgraves orquestales híbridos.',
        'Aplicar etalonaje cinematográfico con separación tonal complementaria y textura orgánica de emulsión fílmica.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Diseño del Arco Dramático en 3 Actos', description: 'Definir planteamiento intrigante, desarrollo con revelaciones parciales y clímax acelerado.', termId: 'urn:term:audiovisual-production:montaje', termTitle: 'Montaje' },
          { name: 'Selección de Ganchos Visuales y Soundbites', description: 'Inventariar las frases y planos de mayor magnetismo dramático de la obra.', termId: 'urn:term:audiovisual-production:a-roll', termTitle: 'A-Roll' }
        ],
        production: [
          { name: 'Rodaje de Planos Maestros de Cobertura', description: 'Captura con óptica anamórfica y grúa de las secuencias icónicas.', termId: 'urn:term:audiovisual-production:master-shot', termTitle: 'Master Shot' },
          { name: 'Grabación de Tomas Macro y Reacciones', description: 'Planos detalle de personajes clave para generar empatía y tensión.', termId: 'urn:term:audiovisual-production:primer-plano', termTitle: 'Primer Plano' }
        ],
        postproduction: [
          { name: 'Edición Rítmica y Sincopada', description: 'Ajuste de tiempos milimétricos al compás musical con cortes a negro repentinos.', termId: 'urn:term:audiovisual-production:montaje', termTitle: 'Montaje' },
          { name: 'Etalonaje y Masterización EBU R128', description: 'Gradación de color HDR/DCI y mezcla sonora a -24 LUFS en formato envolvente.', termId: 'urn:term:audiovisual-production:master', termTitle: 'Master' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:audiovisual-production:montaje', title: 'Montaje (Edición Cinematográfica)' },
        { id: 'urn:term:audiovisual-production:master', title: 'Master (Archivo Maestro de Máxima Calidad)' },
        { id: 'urn:term:audiovisual-production:renderizado', title: 'Renderizado (Rendering / Exportación y Cómputo)' }
      ]
    },

    'teaser': {
      id: 'teaser',
      name: 'Teaser Promocional',
      glossaryId: 'audiovisual-production',
      description: 'Campaña de intriga ultracorta orientada a captar atención inmediata mediante destellos y preguntas no resueltas.',
      targetDuration: '15s - 45s',
      recommendedAspectRatios: ['16:9', '2.39:1', '9:16 (Vertical Story)'],
      recommendedResolutions: ['4K DCI', 'UHD 3840x2160', '1080x1920 Vertical'],
      determinantAttributes: [
        { key: 'duration', label: 'Duración Ultracorta', placeholder: 'Ej. 30 segundos, 15s' },
        { key: 'aspectRatio', label: 'Relación de Aspecto', options: ['2.39:1', '16:9', '9:16'] },
        { key: 'resolution', label: 'Resolución de Salida', options: ['4K DCI', 'UHD 3840x2160', '1080x1920 Vertical'] },
        { key: 'pacing', label: 'Ritmo Temporal', placeholder: 'Ej. Sincopado con jump-cuts repentinos' },
        { key: 'audio', label: 'Diseño Sonoro', placeholder: 'Ej. Pulso ascendente y remate de impacto súbito' },
        { key: 'style', label: 'Atmósfera y Contraste', placeholder: 'Ej. Claroscuro, siluetas e iluminación volumétrica' },
        { key: 'camera', label: 'Tiros de Cámara', placeholder: 'Ej. Planos detalle macro y zooms vertiginosos' },
        { key: 'targetAudience', label: 'Público Destinatario', placeholder: 'Ej. Fans y primeros adoptantes en redes' },
        { key: 'intent', label: 'Intención Creativa', placeholder: 'Ej. Sembrar misterio y viralizar fecha clave' }
      ],
      defaultAttributes: {
        duration: '30 segundos',
        aspectRatio: '2.39:1',
        resolution: '4K DCI',
        targetAudience: 'Comunidad de fans y primeros adoptantes en redes sociales',
        intent: 'Sembrar misterio y viralizar una fecha o concepto clave',
        platform: 'Redes sociales, Pre-roll de YouTube, Pantallas urbanas',
        style: 'Atmósfera enigmática de alto contraste (claroscuro, siluetas e iluminación volumétrica)',
        audio: 'Pulso sonoro ascendente, susurros, efectos de distorsión y remate de impacto súbito al corte a negro',
        subtitles: 'Textos de impacto tipográfico cinemático intercalados',
        pacing: 'Frenético o misterioso con jump-cuts repentinos y cortes sincopados a negro',
        camera: 'Planos detalle macro, zooms rápidos (crash zoom) y movimientos vertiginosos de cámara'
      },
      actionVerbs: [
        'Intercalar destellos sin resolver',
        'Distorsionar la percepción temporal',
        'Sugerir siluetas en claroscuro',
        'Cortar repentinamente a negro',
        'Acentuar frecuencias sonoras graves',
        'Despertar curiosidad inmediata'
      ],
      actionDirectives: [
        'Generar planos detalle macro de alto impacto con claroscuro pronunciado.',
        'Intercalar jump-cuts súbitos manteniendo la incógnita sobre la trama central.',
        'Finalizar con remate sonoro seco sobre corte a negro y logotipo revelado en tipografía cinemática.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Definición del Enigma Visual Central', description: 'Aislar el concepto o fecha nuclear a revelar.', termId: 'urn:term:audiovisual-production:jump-cut', termTitle: 'Jump Cut' }
        ],
        production: [
          { name: 'Captura de Siluetas e Iluminación Volumétrica', description: 'Rodaje con humo o niebla para resaltar haces lumínicos sin mostrar rostros completos.', termId: 'urn:term:audiovisual-production:cutaway', termTitle: 'Cutaway' }
        ],
        postproduction: [
          { name: 'Montaje de Alta Velocidad y Remate a Negro', description: 'Edición de 15 a 30 segundos con impacto sónico al corte.', termId: 'urn:term:audiovisual-production:montaje', termTitle: 'Montaje' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:audiovisual-production:jump-cut', title: 'Jump Cut (Salto de Eje Temporal / Salto de Corte)' },
        { id: 'urn:term:audiovisual-production:cutaway', title: 'Cutaway (Plano de Recurso / Plano Inserción)' }
      ]
    },

    'reel': {
      id: 'reel',
      name: 'Reel / Short Vertical',
      glossaryId: 'audiovisual-production',
      description: 'Contenido vertical inmersivo optimizado para retención móvil de alta velocidad y dinamismo en los primeros 3 segundos.',
      targetDuration: '15s - 60s',
      recommendedAspectRatios: ['9:16 (Vertical Smartphone)', '4:5 (Instagram Feed)'],
      recommendedResolutions: ['1080x1920 (FHD Vertical)', '2160x3840 (4K Vertical)'],
      determinantAttributes: [
        { key: 'duration', label: 'Duración Vertical', placeholder: 'Ej. 30 segundos, 15-60s' },
        { key: 'aspectRatio', label: 'Relación de Aspecto Vertical', options: ['9:16', '4:5'] },
        { key: 'resolution', label: 'Resolución Vertical', options: ['1080x1920 (FHD Vertical)', '2160x3840 (4K Vertical)'] },
        { key: 'hookIntro', label: 'Gancho de Entrada (Primeros 2s)', placeholder: 'Ej. Pregunta impactante o movimiento vertiginoso' },
        { key: 'pacing', label: 'Cadencia de Transición', placeholder: 'Ej. Cortes cada 1.5s sincronizados con música' },
        { key: 'subtitles', label: 'Subtitulado Dinámico', options: ['Subtítulos quemados dinámicos palabra por palabra', 'Subtítulos limpios', 'Sin subtítulos'] },
        { key: 'style', label: 'Color y Estética de Pantalla', placeholder: 'Ej. Tonos vibrantes saturados para pantalla OLED móvil' },
        { key: 'platform', label: 'Plataforma Móvil', options: ['Instagram Reels', 'TikTok', 'YouTube Shorts'] }
      ],
      defaultAttributes: {
        duration: '30 segundos',
        aspectRatio: '9:16',
        resolution: '1080x1920',
        targetAudience: 'Usuarios móviles en plataformas de video corto (Instagram, TikTok, YouTube Shorts)',
        intent: 'Captar el gancho en los primeros 2 segundos y mantener retención hasta el final (loopable)',
        platform: 'Instagram Reels, TikTok, YouTube Shorts',
        style: 'Color vibrante, iluminación clara, nitidez nítida y estética contemporánea para pantalla OLED',
        audio: 'Pista de tendencia rítmica con transiciones alineadas al beat y voz clara en primer plano',
        subtitles: 'Subtítulos dinámicos palabra por palabra animados con resaltado de color (estilo TikTok)',
        pacing: 'Hiperdinámico, con cortes cada 1-2 segundos, whip pans y transiciones creativas continuas',
        camera: 'Encuadre vertical centrado, cámara en mano estabilizada con gimbal o tracking frontal dinámico'
      },
      actionVerbs: [
        'Enganchar en los primeros 2 segundos',
        'Dinamizar con transiciones whip pan',
        'Sincronizar cortes con el beat musical',
        'Animar subtítulos palabra por palabra',
        'Centrar sujetos en encuadre vertical 9:16',
        'Cerrar en bucle continuo (loop seamless)'
      ],
      actionDirectives: [
        'Componer la acción principal en el tercio central del encuadre vertical 9:16 para evitar solapamientos de interfaz móvil.',
        'Introducir un gancho visual o textual en los primeros 1.5 segundos para maximizar retención.',
        'Sincronizar cortes de ritmo acelerado cada 1 a 2 segundos con transiciones fluidas de cámara.',
        'Integrar subtítulos quemados de alta legibilidad con tipografía bold animada por tokens.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Diseño del Gancho y Estructura Retentiva', description: 'Estructurar hook inicial, cuerpo ágil y remate circular loopable.', termId: 'urn:term:audiovisual-production:reel-short', termTitle: 'Reel / Short' }
        ],
        production: [
          { name: 'Grabación Vertical Nativa 9:16 con Gimbal', description: 'Encuadre de cámara girada 90° con iluminación high-key frontal limpia.', termId: 'urn:term:audiovisual-production:video-vertical', termTitle: 'Video Vertical' }
        ],
        postproduction: [
          { name: 'Generación de Subtítulos Animados y Transiciones', description: 'Transcripción automática sincronizada y transiciones de impacto rítmico.', termId: 'urn:term:audiovisual-production:transcripcion-automatica', termTitle: 'Transcripción Automática' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:audiovisual-production:video-vertical', title: 'Video Vertical (Formato 9:16 para Smartphones)' },
        { id: 'urn:term:audiovisual-production:reel-short', title: 'Reel / Short (Formato de Video Corto Vertical)' }
      ]
    },

    'corporate-video': {
      id: 'corporate-video',
      name: 'Video Corporativo',
      glossaryId: 'audiovisual-production',
      description: 'Comunicación audiovisual institucional orientada a transmitir confianza, valores de marca, procesos o cultura de empresa.',
      targetDuration: '2 - 4 minutos',
      recommendedAspectRatios: ['16:9 Widescreen'],
      recommendedResolutions: ['UHD 3840x2160', '1080p Full HD'],
      determinantAttributes: [
        { key: 'duration', label: 'Duración Institucional', placeholder: 'Ej. 3 minutos' },
        { key: 'aspectRatio', label: 'Aspect Ratio', options: ['16:9'] },
        { key: 'resolution', label: 'Resolución Master', options: ['UHD 3840x2160', '1080p Full HD'] },
        { key: 'brollRatio', label: 'Proporción A-Roll / B-Roll', placeholder: 'Ej. 40% testimonio, 60% B-roll de instalaciones' },
        { key: 'style', label: 'Tratamiento Estético y Luz', placeholder: 'Ej. Elegante, luz natural suave, paleta institucional fiel' },
        { key: 'audio', label: 'Paisaje Acústico', placeholder: 'Ej. Voz en off cálida, música acústica-tecnológica inspiradora' },
        { key: 'camera', label: 'Soportes de Cámara', placeholder: 'Ej. Trípode estable, travellings con slider y tomas aéreas' },
        { key: 'targetAudience', label: 'Audiencia Corporativa', placeholder: 'Ej. Inversores B2B, clientes estratégicos y talento' }
      ],
      defaultAttributes: {
        duration: '3 minutos',
        aspectRatio: '16:9',
        resolution: 'UHD 3840x2160',
        targetAudience: 'Inversores, clientes B2B, socios estratégicos y talento corporativo',
        intent: 'Consolidar reputación, autoridad de mercado y propuesta de valor de la compañía',
        platform: 'Sitio web corporativo, LinkedIn, presentaciones comerciales y ferias sectoriales',
        style: 'Elegante, minimalista, luz limpia natural equilibrada y etalonaje de tonos corporativos fieles',
        audio: 'Voz en off institucional cálida y autoritativa, fondo musical acústico o ambient tecnológico positivo',
        subtitles: 'Subtítulos limpios opcionales con estilo corporativo neutro',
        pacing: 'Equilibrado y seguro; alterna testimonios A-roll pausados con secuencias dinámicas de B-roll',
        camera: 'Planos medios estables con trípode, travellings suaves con slider y tomas aéreas de instalaciones'
      },
      actionVerbs: [
        'Testificar con autenticidad y solvencia',
        'Equilibrar testimonio A-roll y metraje B-roll',
        'Transmitir valores de marca y confianza',
        'Iluminar con naturalidad difusa de tres puntos',
        'Integrar grafismo corporativo no invasivo'
      ],
      actionDirectives: [
        'Encuadrar al portavoz principal en plano medio corto con iluminación de tres puntos y fondo desenfocado.',
        'Alternar secuencias de testimonio con insertos de B-roll que muestren procesos reales de trabajo.',
        'Aplicar etalonaje respetuoso con la guía de estilo de color institucional.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Guionización de Preguntas y Scouting de Espacios', description: 'Definir mensajes clave y planificar locaciones con luz controlada.', termId: 'urn:term:audiovisual-production:produccion-de-video', termTitle: 'Producción de Video' }
        ],
        production: [
          { name: 'Filmación a Dos Cámaras y Microfonía Lavalier', description: 'Registro de A-roll en trípode y toma de B-roll con slider motorizado.', termId: 'urn:term:audiovisual-production:a-roll', termTitle: 'A-Roll' }
        ],
        postproduction: [
          { name: 'Montaje Intercalado y Grafismo Institucional', description: 'Edición con rótulos lower thirds y mezcla sonora con locución al frente.', termId: 'urn:term:audiovisual-production:b-roll', termTitle: 'B-Roll' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:audiovisual-production:produccion-de-video', title: 'Producción de Video (Proceso Audiovisual Integral)' },
        { id: 'urn:term:audiovisual-production:a-roll', title: 'A-Roll (Material Principal de Diálogo / Acción)' }
      ]
    },

    'explainer': {
      id: 'explainer',
      name: 'Video Explicativo',
      glossaryId: 'audiovisual-production',
      description: 'Formato didáctico y directo diseñado para descomponer conceptos complejos, productos de software o metodologías.',
      targetDuration: '60s - 120s',
      recommendedAspectRatios: ['16:9', '1:1 (Square)', '9:16'],
      recommendedResolutions: ['1080p Full HD', 'UHD 3840x2160'],
      determinantAttributes: [
        { key: 'duration', label: 'Duración Explicativa', placeholder: 'Ej. 90 segundos' },
        { key: 'aspectRatio', label: 'Aspect Ratio', options: ['16:9', '1:1', '9:16'] },
        { key: 'resolution', label: 'Resolución', options: ['1080p Full HD', 'UHD 3840x2160'] },
        { key: 'pedagogicalStructure', label: 'Estructura Pedagógica', placeholder: 'Ej. Problema -> Solución -> Cómo funciona -> Beneficios -> CTA' },
        { key: 'graphicStyle', label: 'Estilo Gráfico / Motion', placeholder: 'Ej. Motion graphics vectoriales limpios y animaciones de UI' },
        { key: 'audio', label: 'Locución Didáctica', placeholder: 'Ej. Locutor empático y dinámico sincronizado a gráficos' },
        { key: 'subtitles', label: 'Estrategia Subtítulos', options: ['Subtítulos completos perfectamente sincronizados', 'Sin subtítulos'] }
      ],
      defaultAttributes: {
        duration: '90 segundos',
        aspectRatio: '16:9',
        resolution: '1080p Full HD',
        targetAudience: 'Usuarios finales, estudiantes o potenciales clientes que buscan resolver un problema',
        intent: 'Educar, simplificar un proceso y guiar hacia una llamada a la acción clara',
        platform: 'YouTube, Landing Pages, Cursos en línea y Redes Sociales',
        style: 'Gráficos limpios en movimiento, tipografía clara e ilustraciones o grabaciones con llamadas de atención visual',
        audio: 'Locución didáctica y empática sincronizada al milímetro con los elementos visuales',
        subtitles: 'Subtítulos completos perfectamente sincronizados para visualización sin audio',
        pacing: 'Estructurado pedagógicamente: Problema → Solución → Cómo funciona → Beneficios → CTA',
        camera: 'Plano frontal directo al presentador (talking head A-roll) combinado con inserciones gráficas'
      },
      actionVerbs: [
        'Descomponer conceptos complejos',
        'Sintetizar la solución en pasos lógicos',
        'Animar motion graphics explicativos',
        'Sincronizar grafismos con la locución',
        'Guiar la atención hacia la llamada a la acción'
      ],
      actionDirectives: [
        'Construir un flujo visual claro siguiendo la secuencia Problema -> Solución -> Mecanismo.',
        'Sincronizar cada aparición gráfica con el concepto verbal expresado en la locución.',
        'Mantener una interfaz limpia sin elementos superfluos que compitan por la atención cognitiva.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Redacción del Guion Pedagógico a Dos Columnas', description: 'Definir texto de locución y descripción visual sincronizada.', termId: 'urn:term:audiovisual-production:storyboard', termTitle: 'Storyboard' }
        ],
        production: [
          { name: 'Grabación de Locución Maestra y Capturas', description: 'Registro de voz en off profesional y capturas de pantalla de interfaz.', termId: 'urn:term:audiovisual-production:a-roll', termTitle: 'A-Roll' }
        ],
        postproduction: [
          { name: 'Animación de Elementos y Subtitulado Accesible', description: 'Integración en After Effects y sincronización de subtítulos cerrados.', termId: 'urn:term:audiovisual-production:transcripcion-automatica', termTitle: 'Transcripción Automática' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:audiovisual-production:a-roll', title: 'A-Roll (Material Principal de Diálogo / Acción)' },
        { id: 'urn:term:audiovisual-production:transcripcion-automatica', title: 'Transcripción Automática (Speech-to-Text por IA)' }
      ]
    },

    'storyboard': {
      id: 'storyboard',
      name: 'Storyboard Ilustrado',
      glossaryId: 'audiovisual-production',
      description: 'Guion gráfico visual plano a plano que define composición, encuadres, posiciones de cámara y directivas de rodaje.',
      targetDuration: 'N/A (Preproducción gráfica estática)',
      recommendedAspectRatios: ['16:9', '2.39:1', '1.85:1'],
      recommendedResolutions: ['4K Canvas (3840x2160)', 'Print 300 DPI'],
      determinantAttributes: [
        { key: 'panelCount', label: 'Cantidad de Viñetas / Paneles', placeholder: 'Ej. 24 viñetas desglosadas por escena' },
        { key: 'aspectRatio', label: 'Relación de Aspecto de Cuadro', options: ['16:9', '2.39:1', '1.85:1'] },
        { key: 'focalOptics', label: 'Ópticas y Lentes Anotadas', placeholder: 'Ej. 24mm gran angular, 50mm normal, 85mm retrato' },
        { key: 'compositionAxes', label: 'Reglas de Composición', placeholder: 'Ej. Regla de tercios, líneas de fuga, eje de 180°' },
        { key: 'cameraVectors', label: 'Vectores de Movimiento de Cámara', placeholder: 'Ej. Flechas de paneo, travelling in y grúa ascendente' },
        { key: 'visualStyle', label: 'Estilo de Ilustración', placeholder: 'Ej. Dibujo entintado claroscuro noir con sombreado tonal' }
      ],
      defaultAttributes: {
        duration: 'Secuencia completa',
        aspectRatio: '16:9',
        resolution: '4K Canvas',
        targetAudience: 'Director, director de fotografía, equipo de producción y animadores',
        intent: 'Planificar la continuidad visual, blocking de actores y ejes de cámara antes de la filmación',
        platform: 'Documento técnico de preproducción / Software de storyboard',
        style: 'Ilustración secuencial o cómic noir con sombreado de valores tonales y flechas de vector de cámara',
        audio: 'Indicaciones escritas de SFX, música y líneas de diálogo por viñeta',
        subtitles: 'Descripciones de acción y diálogo bajo cada panel',
        pacing: 'Desglose visual plano a plano respetando la regla de 180 grados y continuidad espacial',
        camera: 'Anotaciones precisas de lentes (e.g. 35mm, 50mm, 85mm), ángulos (contrapicado, cenital) y movimientos'
      },
      actionVerbs: [
        'Encuadrar la composición espacial de cada plano',
        'Bloquear las posiciones de personajes y cámara',
        'Trazar vectores de desplazamiento y flechas de paneo',
        'Garantizar la regla de 180 grados y el raccord de mirada',
        'Anotar ópticas recomendadas y alturas de trípode'
      ],
      actionDirectives: [
        'Generar ilustraciones secuenciales en relación de aspecto 16:9 con sombreado de tres valores tonales.',
        'Indicar explícitamente vectores de movimiento de cámara con flechas direccionales.',
        'Anotar bajo cada viñeta la escala del plano (PG, PM, PP) y la distancia focal sugerida.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Desglose de Guion Técnico por Escenas', description: 'Enumerar los planos necesarios para cubrir la acción dramática.', termId: 'urn:term:audiovisual-production:shot-list', termTitle: 'Shot List' },
          { name: 'Dibujo de Viñetas Clave y Composición', description: 'Trazado de encuadres respetando continuidad espacial y óptica.', termId: 'urn:term:audiovisual-production:storyboard', termTitle: 'Storyboard' }
        ],
        production: [
          { name: 'Consulta en Set y Validación de Cobertura', description: 'Uso del guion gráfico como oráculo visual durante el rodaje.', termId: 'urn:term:audiovisual-production:plano-secuencia', termTitle: 'Plano Secuencia' }
        ],
        postproduction: [
          { name: 'Verificación de Raccord en Montaje', description: 'Comprobación de correspondencia entre planos rodados y planificados.', termId: 'urn:term:audiovisual-production:montaje', termTitle: 'Montaje' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:audiovisual-production:plano-secuencia', title: 'Plano Secuencia (Long Take)' },
        { id: 'urn:term:audiovisual-production:storyboard', title: 'Storyboard (Guion Gráfico)' },
        { id: 'urn:term:audiovisual-production:shot-list', title: 'Shot List (Lista de Planos)' }
      ]
    },

    'animatic': {
      id: 'animatic',
      name: 'Animatic con Timing',
      glossaryId: 'audiovisual-production',
      description: 'Montaje preliminar de viñetas de storyboard sincronizadas con audio provisional para evaluar ritmo y duración exacta.',
      targetDuration: 'Duración idéntica a la pieza final',
      recommendedAspectRatios: ['16:9', '2.39:1'],
      recommendedResolutions: ['1080p Full HD'],
      determinantAttributes: [
        { key: 'targetDuration', label: 'Duración Prevista', placeholder: 'Ej. 120 segundos' },
        { key: 'frameRate', label: 'Cadencia de Fotogramas', options: ['24 fps', '25 fps', '23.976 fps'] },
        { key: 'scratchAudio', label: 'Pista de Audio Guía (Scratch)', placeholder: 'Ej. Scratch track con diálogo temporal y música maqueta' },
        { key: 'panAndZoomTransitions', label: 'Efectos de Cámara 2.5D', placeholder: 'Ej. Ken Burns effect, zooms digitales sutiles' },
        { key: 'timecodeBurnIn', label: 'Marcado de Código de Tiempo', options: ['Timecode burn-in visible en pantalla', 'Sin marcas'] }
      ],
      defaultAttributes: {
        duration: '1 a 3 minutos según proyecto',
        aspectRatio: '16:9',
        resolution: '1080p Full HD',
        targetAudience: 'Equipo creativo, montador y clientes para aprobación de ritmo',
        intent: 'Validar el flujo temporal y la comprensión narrativa antes de invertir en animación o rodaje',
        platform: 'Línea de tiempo NLE interna (Premiere / DaVinci Resolve)',
        style: 'Paneles de storyboard en movimiento con efecto 2.5D (Ken Burns), zooms suaves y disolvencias',
        audio: 'Locución de referencia (scratch track), efectos de sonido temporales y maqueta musical',
        subtitles: 'Timecode visual en pantalla (burn-in timecode) con numeración de escena y plano',
        pacing: 'Timing preciso a 24 fps calibrando la duración exacta en segundos de cada viñeta',
        camera: 'Simulación de movimientos de cámara (paneos y zooms digitales sobre el lienzo 2D)'
      },
      actionVerbs: [
        'Temporizar la duración exacta de cada plano',
        'Sincronizar paneles con la pista de audio temporal',
        'Simular paneos y zooms en 2.5D',
        'Evaluar la inteligibilidad del arco narrativo',
        'Ajustar la cadencia rítmica antes de la producción definitiva'
      ],
      actionDirectives: [
        'Montar las viñetas del storyboard en línea de tiempo calibrando cada duración a 24 fps.',
        'Sincronizar los cortes de cambio de plano con la locución scratch de referencia.',
        'Incrustar marcas de código de tiempo SMPTE (burn-in timecode) para revisión colegiada.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Grabación de Scratch Track de Diálogo', description: 'Registro de voz provisional para fijar duraciones de líneas.', termId: 'urn:term:audiovisual-production:animatic', termTitle: 'Animatic' },
          { name: 'Montaje de Viñetas en NLE a 24 fps', description: 'Inserción de imágenes estáticas con animación de encuadre.', termId: 'urn:term:audiovisual-production:montaje', termTitle: 'Montaje' }
        ],
        production: [
          { name: 'Aprobación del Ritmo por Dirección', description: 'Validación definitiva de cortes antes de la inversión en rodaje/animación.', termId: 'urn:term:audiovisual-production:storyboard', termTitle: 'Storyboard' }
        ],
        postproduction: [
          { name: 'Conformado Final hacia Master', description: 'Sustitución de paneles provisionales por metraje o renders finales.', termId: 'urn:term:audiovisual-production:master', termTitle: 'Master' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:audiovisual-production:animatic', title: 'Animatic' },
        { id: 'urn:term:audiovisual-production:storyboard', title: 'Storyboard (Guion Gráfico)' }
      ]
    },

    'shot-list': {
      id: 'shot-list',
      name: 'Lista de Planos (Shot List)',
      glossaryId: 'audiovisual-production',
      description: 'Inventario técnico exhaustivo de todos los planos que deben registrarse durante el rodaje por escena y locación.',
      targetDuration: 'N/A (Documentación técnica de rodaje)',
      recommendedAspectRatios: ['16:9', '2.39:1'],
      recommendedResolutions: ['Datos tabulares / 4K metadata'],
      determinantAttributes: [
        { key: 'totalShots', label: 'Total de Planos Listados', placeholder: 'Ej. 48 planos clasificados por escena' },
        { key: 'cameraSetups', label: 'Configuraciones de Cámara', placeholder: 'Ej. Trípode, grúa jib, gimbal, cámara en mano' },
        { key: 'focalDistribution', label: 'Reparto de Ópticas Focales', placeholder: 'Ej. 35mm para cobertura, 85mm para detalles' },
        { key: 'locationGrouping', label: 'Agrupación por Locación', placeholder: 'Ej. Interior estudio noche, exterior parque amanecer' },
        { key: 'soundRequirements', label: 'Requerimientos de Sonido Directo', placeholder: 'Ej. Boom pértiga y dos corbateros inalámbricos' }
      ],
      defaultAttributes: {
        duration: 'Total de tomas del plan de rodaje',
        aspectRatio: '16:9',
        resolution: '4K DCI',
        targetAudience: '1st AD, Director de Fotografía, Script Supervisor / Continuista',
        intent: 'Organizar la logística de filmación y asegurar cobertura completa de planos requeridos',
        platform: 'Plan de rodaje / Desglose de producción',
        style: 'Riguroso, técnico, estandarizado con nomenclatura universal (Escena-Plano-Toma)',
        audio: 'Especificación de pistas requeridas (boom, lavaliers inalámbricos, sonido ambiental)',
        subtitles: 'N/A (Metadatos de claqueta)',
        pacing: 'Agrupación por locación, iluminación y tamaño de lente para optimizar tiempos en set',
        camera: 'Especificación de plano (PG, PM, PP, PD), óptica focal, altura de trípode y soporte'
      },
      actionVerbs: [
        'Inventariar la totalidad de tiros requeridos',
        'Clasificar por ejes de iluminación y locación',
        'Priorizar planos complejos que requieren mayor tiempo de set',
        'Asignar nomenclatura normalizada Escena-Plano-Toma',
        'Garantizar cobertura para el montaje en sala'
      ],
      actionDirectives: [
        'Desglosar cada plano con identificación unívoca (e.g. Escena 14, Plano 3, Toma 1).',
        'Especificar tamaño de encuadre, objetivo focal, altura de cámara y soporte mecánico.',
        'Agrupar planos según dirección de luz para minimizar cambios de set durante el rodaje.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Cruce de Guion Literario y Storyboard', description: 'Extracción de requerimientos visuales indispensables.', termId: 'urn:term:audiovisual-production:shot-list', termTitle: 'Shot List' },
          { name: 'Ordenación Logística del Plan de Rodaje', description: 'Optimización de tiempos de iluminación y emplazamiento.', termId: 'urn:term:audiovisual-production:escala-de-planos', termTitle: 'Escala de Planos' }
        ],
        production: [
          { name: 'Chequeo Continuo por Script Supervisor', description: 'Control de tomas buenas, falsas y descartes en claqueta.', termId: 'urn:term:audiovisual-production:take', termTitle: 'Take' }
        ],
        postproduction: [
          { name: 'Conformado de Partes de Cámara en NLE', description: 'Ingesta ordenada de metraje según nomenclatura del shot list.', termId: 'urn:term:audiovisual-production:montaje', termTitle: 'Montaje' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:audiovisual-production:shot-list', title: 'Shot List (Lista de Planos)' },
        { id: 'urn:term:audiovisual-production:escala-de-planos', title: 'Escala de Planos' }
      ]
    },

    'take': {
      id: 'take',
      name: 'Toma / Registro Único',
      glossaryId: 'audiovisual-production',
      description: 'Grabación continua e ininterrumpida de un plano desde que se inicia la cámara hasta que se da la orden de corte.',
      targetDuration: 'Segundos a varios minutos por registro',
      recommendedAspectRatios: ['2.39:1', '16:9'],
      recommendedResolutions: ['Sensor RAW nativo (4K / 6K / 8K)'],
      determinantAttributes: [
        { key: 'takeNumber', label: 'Identificador de Toma', placeholder: 'Ej. Escena 4, Plano 2, Toma 3' },
        { key: 'frameRate', label: 'Cadencia de Grabación', options: ['24.000 fps', '23.976 fps', '60 fps (Cámara lenta)', '120 fps'] },
        { key: 'sensorFormat', label: 'Formato de Sensor y Grabación', options: ['4K RAW sin compresión', 'ProRes 422 HQ', 'Log Gamma 10-bit'] },
        { key: 'audioSync', label: 'Sincronización de Audio y Claqueta', placeholder: 'Ej. Timecode SMPTE lineal y claqueta con tono sonoro' },
        { key: 'focusTracking', label: 'Seguimiento de Enfoque', placeholder: 'Ej. Focus puller con medición láser y marcas de suelo' }
      ],
      defaultAttributes: {
        duration: 'Registro individual continuo',
        aspectRatio: '2.39:1',
        resolution: '4K RAW',
        targetAudience: 'Director, montador y colorista',
        intent: 'Obtener la mejor interpretación dramática y perfección técnica del plano',
        platform: 'Almacenamiento de cámara / Medios RAID de rodaje',
        style: 'Material en bruto (Log / RAW sin compresión destructiva) con amplio rango dinámico',
        audio: 'Pistas multicanal sincronizadas con timecode lineal SMPTE con claqueta audible',
        subtitles: 'N/A (Metadatos de archivo de cámara)',
        pacing: 'Flujo temporal continuo en tiempo real a 24.000 fps o 23.976 fps',
        camera: 'Operación de cámara en vivo con seguimiento de foco continuo (focus pulling)'
      },
      actionVerbs: [
        'Iniciar grabación y cantar claqueta',
        'Mantener foco continuo sobre el actor en movimiento',
        'Estabilizar el vector de desplazamiento de cámara',
        'Monitorear niveles en monitor con false-color y zebras',
        'Verificar raccord y dar orden de corte'
      ],
      actionDirectives: [
        'Verificar que el timecode SMPTE esté sincronizado entre cámara y grabador multipista de sonido.',
        'Mantener encuadre y seguimiento de foco con diafragma abierto para profundidad de campo cinematográfica.',
        'Registrar tomas completas con margen de cola (head & tail) de al menos 3 segundos antes y después de la acción.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Marcado de Actores y Calibración de Foco', description: 'Fijar posiciones espaciales de los personajes y distancias de lente.', termId: 'urn:term:audiovisual-production:take', termTitle: 'Take' }
        ],
        production: [
          { name: 'Grabación de la Toma con Claqueta Sincronizada', description: 'Registro continuo de imagen y audio multicanal.', termId: 'urn:term:audiovisual-production:take', termTitle: 'Take' }
        ],
        postproduction: [
          { name: 'Clasificación de Tomas Útiles y Descartes (Outtakes)', description: 'Marcado de tomas buenas en el reporte de cámara para el montador.', termId: 'urn:term:audiovisual-production:outtake', termTitle: 'Outtake' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:audiovisual-production:take', title: 'Take (Toma)' },
        { id: 'urn:term:audiovisual-production:outtake', title: 'Outtake (Toma Descartada / Blooper)' }
      ]
    },

    'shot': {
      id: 'shot',
      name: 'Plano Cinematográfico',
      glossaryId: 'audiovisual-production',
      description: 'Unidad visual mínima dotada de sentido dramático y espacial definida por el encuadre y ángulo de toma.',
      targetDuration: '2s - 15s',
      recommendedAspectRatios: ['2.39:1', '1.85:1', '16:9'],
      recommendedResolutions: ['4K DCI', 'UHD 3840x2160'],
      determinantAttributes: [
        { key: 'shotScale', label: 'Escala de Plano', options: ['Plano General (PG)', 'Plano Medio (PM)', 'Primer Plano (PP)', 'Plano Detalle (PD)'] },
        { key: 'cameraAngle', label: 'Ángulo y Altura de Cámara', options: ['Frontal a nivel de ojos', 'Contrapicado dramático', 'Cenital', 'Picado'] },
        { key: 'depthOfField', label: 'Profundidad de Campo', placeholder: 'Ej. Reducida con diafragma f/1.8 y bokeh suave' },
        { key: 'cameraMovement', label: 'Movimiento de Cámara', placeholder: 'Ej. Travelling push-in suave hacia el rostro' },
        { key: 'lightingContrast', label: 'Contraste Lumínico', placeholder: 'Ej. Relación de contraste 4:1 con luz principal motivada' }
      ],
      defaultAttributes: {
        duration: '5 segundos',
        aspectRatio: '2.39:1',
        resolution: '4K DCI',
        targetAudience: 'Espectador final en sala de cine o pantalla de alta definición',
        intent: 'Transmitir emoción específica o información compositiva a través del encuadre',
        platform: 'Master cinematográfico / Transmisión digital',
        style: 'Composición cinematográfica basada en regla de los tercios, líneas guía y profundidad de campo selectiva',
        audio: 'Sonido directo focalizado y foley diegético espacializado',
        subtitles: 'Subtítulos según idioma',
        pacing: 'Respiración interna del plano acorde a la acción de los personajes',
        camera: 'Encuadre calibrado con lente fija de 35mm o 50mm, bokeh suave en segundo término'
      },
      actionVerbs: [
        'Encuadrar según la regla de los tercios',
        'Aislar el sujeto mediante bokeh y diafragma abierto',
        'Desplazar la cámara con dolly o grúa estable',
        'Componer profundidad visual con capas de fondo y primer término',
        'Sostener el tiempo dramático del encuadre'
      ],
      actionDirectives: [
        'Componer el plano empleando diagonales de fuga y planos de profundidad superpuestos.',
        'Alinear el eje de mirada del personaje para asegurar correspondencia con el contraplano.',
        'Ajustar la iluminación motivada para destacar la volumetría del rostro.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Determinación de la Escala de Plano en Guion', description: 'Selección del tiro de cámara óptimo para el clímax emocional.', termId: 'urn:term:audiovisual-production:escala-de-planos', termTitle: 'Escala de Planos' }
        ],
        production: [
          { name: 'Emplazamiento de Óptica y Calibración de Composición', description: 'Ajuste milimétrico de lente y tiro en set.', termId: 'urn:term:audiovisual-production:master-shot', termTitle: 'Master Shot' }
        ],
        postproduction: [
          { name: 'Corte y Acople en Secuencia', description: 'Inserción del plano respetando continuidad de movimiento y luz.', termId: 'urn:term:audiovisual-production:montaje', termTitle: 'Montaje' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:audiovisual-production:master-shot', title: 'Master Shot (Plano Maestro)' },
        { id: 'urn:term:audiovisual-production:plano-general', title: 'Plano General (Wide Shot / Long Shot)' },
        { id: 'urn:term:audiovisual-production:primer-plano', title: 'Primer Plano (Close-Up)' }
      ]
    },

    'sequence': {
      id: 'sequence',
      name: 'Secuencia Narrativa',
      glossaryId: 'audiovisual-production',
      description: 'Conjunto coordinado de escenas que conforman una unidad dramática completa con planteamiento, nudo y desenlace propios.',
      targetDuration: '3 - 10 minutos',
      recommendedAspectRatios: ['2.39:1', '16:9'],
      recommendedResolutions: ['4K DCI', 'UHD 3840x2160'],
      determinantAttributes: [
        { key: 'duration', label: 'Duración de Secuencia', placeholder: 'Ej. 5 minutos' },
        { key: 'sceneCount', label: 'Número de Escenas Agrupadas', placeholder: 'Ej. 3 escenas correlativas' },
        { key: 'dramaticArc', label: 'Arco Dramático del Bloque', placeholder: 'Ej. De calma aparente a confrontación abierta' },
        { key: 'soundtrackLeitmotif', label: 'Leitmotiv Musical', placeholder: 'Ej. Tema orquestal que evoluciona armónicamente' },
        { key: 'lightingContinuity', label: 'Continuidad Lumínica', placeholder: 'Ej. Progresión de luz diurna a atardecer dorado' }
      ],
      defaultAttributes: {
        duration: '5 minutos',
        aspectRatio: '2.39:1',
        resolution: '4K DCI',
        targetAudience: 'Público general inmerso en la trama del largometraje o serie',
        intent: 'Hacer progresar un objetivo dramático mayor o transformar el estado emocional del protagonista',
        platform: 'Largometraje, Serie de televisión, Documental',
        style: 'Continuidad lumínica y estética armónica entre todos los entornos que componen el bloque',
        audio: 'Diseño sonoro cohesivo con leitmotiv musical que acompaña la evolución del arco',
        subtitles: 'Subtitulado normalizado',
        pacing: 'Curva dramática modulada que acumula tensión hacia el punto de giro de la secuencia',
        camera: 'Variedad de tiros de cámara complementarios manteniendo el eje de acción en todo momento'
      },
      actionVerbs: [
        'Articular escenas en un arco continuo',
        'Modular la tensión dramática hacia el punto de giro',
        'Vincular entornos mediante continuidad lumínica y sonora',
        'Sostener el leitmotiv musical',
        'Transformar el estado emocional de los personajes'
      ],
      actionDirectives: [
        'Vincular las transiciones entre escenas de la secuencia mediante raccord temático o sonoro.',
        'Mantener coherencia en la curva tonal de color a lo largo de todas las locaciones del bloque.',
        'Hacer converger el clímax de la secuencia en un plano de máxima elocuencia visual.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Estructuración del Arco Secuencial', description: 'Diseño de la unidad temática en el tratamiento literario.', termId: 'urn:term:audiovisual-production:secuencia', termTitle: 'Secuencia' }
        ],
        production: [
          { name: 'Rodaje de Escenas Correlativas', description: 'Filmación respetando la progresión de estados emocionales.', termId: 'urn:term:audiovisual-production:escena', termTitle: 'Escena' }
        ],
        postproduction: [
          { name: 'Ensamblaje y Mezcla de Sonido Cohesiva', description: 'Alineación de la música y foley para amarrar la secuencia.', termId: 'urn:term:audiovisual-production:montaje', termTitle: 'Montaje' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:audiovisual-production:secuencia', title: 'Secuencia (Unidad Narrativa Temática)' },
        { id: 'urn:term:audiovisual-production:escena', title: 'Escena (Unidad Dramática Espaciotemporal)' }
      ]
    },

    'scene': {
      id: 'scene',
      name: 'Escena Dramática',
      glossaryId: 'audiovisual-production',
      description: 'Unidad de acción narrativa continua que transcurre en un mismo espacio físico y en un mismo tiempo ininterrumpido.',
      targetDuration: '1 - 3 minutos',
      recommendedAspectRatios: ['2.39:1', '1.85:1', '16:9'],
      recommendedResolutions: ['4K DCI', 'UHD 3840x2160'],
      determinantAttributes: [
        { key: 'duration', label: 'Duración Estimada', placeholder: 'Ej. 2 minutos' },
        { key: 'locationSetting', label: 'Espacio Físico / Entorno', placeholder: 'Ej. Interior salón victoriano noche' },
        { key: 'dramaticConflict', label: 'Conflicto Dramático Nuclear', placeholder: 'Ej. Revelación de un secreto entre dos personajes' },
        { key: 'cameraCoverage', label: 'Cobertura de Cámara Planeada', placeholder: 'Ej. Master shot amplio + plano/contraplano + plano detalle' },
        { key: 'motivatedLighting', label: 'Fuentes de Luz Motivadas', placeholder: 'Ej. Chimenea a la izquierda, lámpara de mesa suave' }
      ],
      defaultAttributes: {
        duration: '2 minutos',
        aspectRatio: '2.39:1',
        resolution: '4K DCI',
        targetAudience: 'Audiencia general',
        intent: 'Desarrollar un conflicto específico entre personajes en un entorno concreto',
        platform: 'Ficción, Streaming, Cine',
        style: 'Iluminación motivada por fuentes diegéticas del espacio (ventanas, lámparas prácticas)',
        audio: 'Diálogo naturalista, ambiente sonoro de sala (room tone) y efectos de foley precisos',
        subtitles: 'Opcionales / Formato estándar',
        pacing: 'Ritmo conversacional y pausas dramáticas marcadas por las réplicas de los personajes',
        camera: 'Plano de situación (establishing shot) seguido de plano/contraplano y planos de detalle'
      },
      actionVerbs: [
        'Establecer el espacio físico mediante plano de situación',
        'Bloquear actores en función de la tensión dramática',
        'Motivar iluminación desde fuentes diegéticas visibles',
        'Resolver el plano/contraplano respetando el eje',
        'Capturar sonido ambiente (room tone) para sala de mezclas'
      ],
      actionDirectives: [
        'Iniciar la escena con un plano de situación (establishing shot) que ubique las coordenadas espaciales.',
        'Planificar la cobertura de plano y contraplano respetando estrictamente el eje de miradas.',
        'Iluminar motivando las fuentes desde ventanas o lámparas prácticas presentes en la puesta en escena.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Desglose de Escena y Blocking de Actores', description: 'Definir entradas, salidas y marcas de suelo.', termId: 'urn:term:audiovisual-production:escena', termTitle: 'Escena' }
        ],
        production: [
          { name: 'Rodaje de Master Shot y Cobertura Cerrada', description: 'Filmación del plano amplio y posteriores aproximaciones.', termId: 'urn:term:audiovisual-production:establishing-shot', termTitle: 'Establishing Shot' }
        ],
        postproduction: [
          { name: 'Edición Dialogada y Micro-Raccord', description: 'Montaje de réplicas manteniendo fluidez conversacional.', termId: 'urn:term:audiovisual-production:montaje', termTitle: 'Montaje' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:audiovisual-production:escena', title: 'Escena (Unidad Dramática Espaciotemporal)' },
        { id: 'urn:term:audiovisual-production:establishing-shot', title: 'Establishing Shot (Plano de Situación / Establecimiento)' }
      ]
    },

    'montage': {
      id: 'montage',
      name: 'Montaje / Secuencia de Enlace',
      glossaryId: 'audiovisual-production',
      description: 'Articulación yuxtapuesta de planos para sintetizar el paso del tiempo, condensar procesos o contrastar ideas simbólicas.',
      targetDuration: '45s - 120s',
      recommendedAspectRatios: ['2.39:1', '16:9', '4:3'],
      recommendedResolutions: ['4K DCI', 'UHD 3840x2160'],
      determinantAttributes: [
        { key: 'duration', label: 'Duración Condensada', placeholder: 'Ej. 90 segundos' },
        { key: 'temporalCompression', label: 'Factor de Compresión Temporal', placeholder: 'Ej. Condensar 6 meses de entrenamiento en 90 segundos' },
        { key: 'juxtapositionTheory', label: 'Tipo de Montaje Teórico', options: ['Montaje Métrico rítmico', 'Montaje Intelectual / Simbólico', 'Montaje Paralelo'] },
        { key: 'soundtrackDriver', label: 'Conductor Musical', placeholder: 'Ej. Pista rítmica contundente que unifica planos dispares' },
        { key: 'transitionGrammar', label: 'Gramática de Transiciones', placeholder: 'Ej. Cortes limpios al golpe, match cuts y whip pans' }
      ],
      defaultAttributes: {
        duration: '90 segundos',
        aspectRatio: '2.39:1',
        resolution: '4K DCI',
        targetAudience: 'Audiencia de cine y series',
        intent: 'Comprimir meses de entrenamiento, viajes o evolución temporal en pocos minutos elocuentes',
        platform: 'Cine, Televisión, Ficción narrativa',
        style: 'Yuxtaposición dinámica, ritmo métrico o tonal basado en las teorías clásicas del montaje',
        audio: 'Canción o tema musical dominante que amarra y otorga cohesión a fragmentos temporales dispares',
        subtitles: 'Generalmente sin subtítulos de diálogo al priorizar la música y la acción visual',
        pacing: 'Acelerado, rítmico, guiado por cortes sincopados al compás musical',
        camera: 'Tiros variados, movimientos de cámara en direcciones complementarias para acentuar el dinamismo'
      },
      actionVerbs: [
        'Yuxtaponer fragmentos visuales dispares',
        'Condensar el transcurso temporal en minutos elocuentes',
        'Sincronizar cortes métricos al pulso de la música',
        'Construir sentido dialéctico entre planos adyacentes',
        'Ejecutar match-cuts que conecten formas y vectores'
      ],
      actionDirectives: [
        'Utilizar transiciones por corte al compás musical, recurriendo a match cuts visuales para empalmar acciones.',
        'Variar la escala de planos de manera alternada (plano general -> detalle -> medio) para mantener alta estimulación visual.',
        'Sostener la coherencia tonal mediante la música como hilo conductor indivisible.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Diseño del Esquema de Yuxtaposición', description: 'Selección de acciones representativas del proceso a comprimir.', termId: 'urn:term:audiovisual-production:montaje', termTitle: 'Montaje' }
        ],
        production: [
          { name: 'Rodaje de Tomas Variadas con Vectores Complementarios', description: 'Captura de tiros con movimientos en direcciones alternadas.', termId: 'urn:term:audiovisual-production:transicion', termTitle: 'Transición' }
        ],
        postproduction: [
          { name: 'Edición Métrica y Ajuste de Micro-Cortes', description: 'Corte fino al milisegundo sincronizado con la pista musical.', termId: 'urn:term:audiovisual-production:jump-cut', termTitle: 'Jump Cut' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:audiovisual-production:montaje', title: 'Montaje (Edición Cinematográfica)' },
        { id: 'urn:term:audiovisual-production:transicion', title: 'Transición (Efecto de Paso Entre Planos)' }
      ]
    },

    'export-formats': {
      id: 'export-formats',
      name: 'Formatos de Exportación y Master',
      glossaryId: 'audiovisual-production',
      description: 'Estandarización de archivos finales de entrega según códecs, contenedores, tasas de bits y especificaciones de emisión.',
      targetDuration: 'Variable según producto',
      recommendedAspectRatios: ['2.39:1', '16:9', '9:16', '1:1'],
      recommendedResolutions: ['ProRes 4444 XQ / DNxHR HQX', 'DCI DCP SMPTE', 'H.265 / HEVC 10-bit', 'H.264 Web'],
      determinantAttributes: [
        { key: 'targetCodec', label: 'Códec de Masterización', options: ['ProRes 4444 XQ', 'ProRes 422 HQ', 'DNxHR HQX', 'JPEG 2000 DCP', 'H.265/HEVC 10-bit'] },
        { key: 'wrapperContainer', label: 'Formato Contenedor', options: ['QuickTime (.mov)', 'MXF OP1a', 'DCP SMPTE Package', 'MP4'] },
        { key: 'colorSpaceStandards', label: 'Espacio de Color y Curva Gamma', options: ['Rec.709 / Gamma 2.4', 'DCI-P3 / Gamma 2.6', 'Rec.2020 / PQ ST 2084 (HDR)', 'ACEScc'] },
        { key: 'audioLoudnessStandard', label: 'Norma de Sonoridad Acústica', options: ['-24 LUFS / LKFS (EBU R128 / ITU-R BS.1770)', '-23 LUFS (EBU Estándar)', '-14 LUFS (YouTube / Spotify)'] },
        { key: 'bitrateEncoding', label: 'Tasa de Bits y Perfil', placeholder: 'Ej. VBR 2-pass 45 Mbps o Apple ProRes intraframe' }
      ],
      defaultAttributes: {
        duration: 'Según producto final',
        aspectRatio: '16:9',
        resolution: 'UHD 3840x2160 / ProRes 422 HQ',
        targetAudience: 'Distribuidoras, plataformas OTT (Netflix, Prime), festivales y redes sociales',
        intent: 'Garantizar la máxima fidelidad cromática, resolución y compatibilidad de reproducción',
        platform: 'DCP para cines, OTT Streaming IMF Packages, Web Delivery',
        style: 'Espacio de color estandarizado Rec.709, DCI-P3 o Rec.2020 con curvas gamma específicas',
        audio: 'Mezcla masterizada a -24 LKFS/LUFS (EBU R128) en 5.1 / 7.1 / Estéreo 24-bit 48kHz',
        subtitles: 'Archivos sidecar .SRT, .VTT o subtítulos cerrados EIA-608 / CEA-708',
        pacing: 'Cadencia constante de cuadros por segundo (24.00 fps, 25.00 fps o 29.97 fps sin drop-frames)',
        camera: 'Resolución de renderizado pixel-a-pixel sin reescalados bilinear degradantes'
      },
      actionVerbs: [
        'Codificar en compresión intraframe sin pérdidas visibles',
        'Normalizar la sonoridad acústica a la norma EBU R128',
        'Incrustar metadatos de espacio de color y timecode SMPTE',
        'Empaquetar en contenedor estándar MXF o QuickTime',
        'Verificar integridad de cuadros sin pérdida de sincronía'
      ],
      actionDirectives: [
        'Configurar el motor de renderizado con render a máxima profundidad de bits (10-bit o 12-bit).',
        'Calibrar la mezcla sonora a -24 LUFS con pico verdadero (True Peak) limitado a -1 dBTP.',
        'Exportar paquetes IMF o DCP con validación de hashes criptográficos de integridad.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Revisión de Especificaciones Técnicas del Cliente / OTT', description: 'Verificar especificaciones de entrega de distribuidora.', termId: 'urn:term:audiovisual-production:master', termTitle: 'Master' }
        ],
        production: [
          { name: 'Grabación en Códec Intermedio de Alta Gama', description: 'Uso de formatos con amplio rango para evitar degradación previa.', termId: 'urn:term:audiovisual-production:renderizado', termTitle: 'Renderizado' }
        ],
        postproduction: [
          { name: 'Renderizado de Archivo Maestro y Perfiles Derivados', description: 'Exportación de master de archivo y versiones de difusión.', termId: 'urn:term:audiovisual-production:contenedor', termTitle: 'Contenedor' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:audiovisual-production:master', title: 'Master (Archivo Maestro de Máxima Calidad)' },
        { id: 'urn:term:audiovisual-production:contenedor', title: 'Contenedor (Formato Envoltorio / Wrapper)' },
        { id: 'urn:term:audiovisual-production:renderizado', title: 'Renderizado (Rendering / Exportación y Cómputo)' }
      ]
    },

    // =========================================================
    // GLOSARIO: Render & Animación 3D (render-3d-animations)
    // =========================================================
    '3d-character-asset': {
      id: '3d-character-asset',
      name: 'Asset de Personaje 3D (Rigged Character)',
      glossaryId: 'render-3d-animations',
      description: 'Modelo tridimensional completo con topología optimizada, esqueleto de deformación (rig), mapas PBR y articulación cinemática.',
      targetDuration: 'N/A (Asset Tridimensional / Animación en Tiempo Real)',
      recommendedAspectRatios: ['16:9', '1:1', 'Libre en motor 3D'],
      recommendedResolutions: ['Texturas 4K/8K UDIM', 'Malla Subdivision Surface'],
      determinantAttributes: [
        { key: 'polyCountBudget', label: 'Presupuesto de Polígonos', placeholder: 'Ej. 80.000 polígonos (Game ready) o Cinema High-Poly' },
        { key: 'topologyType', label: 'Tipo de Topología', options: ['Quads puros con edge loops anatómicos', 'Malla subdivisible', 'Triangulada optimizada'] },
        { key: 'riggingFramework', label: 'Estructura de Rigging', placeholder: 'Ej. Esqueleto con cinemática inversa (IK/FK) y blendshapes faciales' },
        { key: 'texturingPBRWorkflow', label: 'Flujo Texturizado PBR', options: ['Metálico/Rugosidad (Metallic/Roughness)', 'Especular/Brillo (Specular/Glossiness)', 'UDIM Multi-tile'] },
        { key: 'shadingModel', label: 'Modelo de Sombreado', placeholder: 'Ej. BRDF con dispersión subsuperficial (SSS) para piel humana' },
        { key: 'targetEngine', label: 'Motor o Software Destino', options: ['Unreal Engine 5 (Nanite/Lumen)', 'Unity HDRP', 'Blender Cycles', 'Maya / Arnold'] }
      ],
      defaultAttributes: {
        duration: 'N/A (Asset interactivo o secuencias de animación)',
        aspectRatio: '16:9',
        resolution: 'Texturas 4K PBR',
        targetAudience: 'Directores de animación, animadores de personajes y desarrolladores 3D',
        intent: 'Crear un personaje 3D versátil con deformación anatómica verosímil y fidelidad material física',
        platform: 'Unreal Engine 5, Maya, Blender, Unity',
        style: 'Fotorrealismo estilizado con dispersión de luz subsuperficial en dermis y micro-rugosidad epidérmica',
        audio: 'N/A (Metadatos de lipsync para fonemas de audio)',
        subtitles: 'N/A',
        pacing: 'Deformación fluida a 60 fps o 24 fps para secuencias cinemáticas',
        camera: 'Cámara orbital de inspección turntable 360° con lentes virtuales de 50mm y 85mm'
      },
      actionVerbs: [
        'Esculpir volumen anatómico de alta resolución',
        'Retopologizar con bucles cuadriláteros limpios (edge-loops)',
        'Desplegar coordenadas UV sin distorsión ni solapes',
        'Hornear mapas de normales, curvatura y oclusión ambiental',
        'Riggear esqueleto con cinemática inversa (IK) y controladoras',
        'Pintar pesos de influencia de piel (skin weighting)'
      ],
      actionDirectives: [
        'Construir geometría cuadrilátera pura siguiendo las líneas de deformación muscular facial y corporal.',
        'Mapear coordenadas UV agrupadas en cuadrantes UDIM para garantizar densidad de texels homogénea.',
        'Configurar sombreadores basados en BRDF con mapa de dispersión subsuperficial (Subsurface Scattering) para realismo dérmico.',
        'Implementar controles de rig facial basados en el sistema FACS (Facial Action Coding System).'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Modelado y Esculpido Digital Conceptual', description: 'Bloqueo anatómico y microdetalle en ZBrush o Blender.', termId: 'urn:term:render-3d-animations:rendering-pipeline', termTitle: 'Pipeline de Renderizado' }
        ],
        production: [
          { name: 'Retopología y Despliegue de Coordenadas UV', description: 'Conversión a malla ligera y optimizada con flujo de bucles limpios.', termId: 'urn:term:render-3d-animations:brdf', termTitle: 'Modelo BRDF' },
          { name: 'Rigging y Deformación de Esqueleto', description: 'Construcción de huesos, cinemática IK/FK y pesado de vértices.', termId: 'urn:term:render-3d-animations:character-rigging', termTitle: 'Rigging de Personajes' }
        ],
        postproduction: [
          { name: 'Pintado de Texturas PBR y Ensamblaje en Motor', description: 'Creación de mapas Albedo, Roughness, Normal y prueba de renderizado fotorrealista.', termId: 'urn:term:render-3d-animations:ray-tracing', termTitle: 'Trazado de Rayos' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:render-3d-animations:character-rigging', title: 'Rigging de Personajes (Character Rigging)' },
        { id: 'urn:term:render-3d-animations:brdf', title: 'Modelo BRDF (Función de Reflectancia Bidireccional)' },
        { id: 'urn:term:render-3d-animations:rendering-pipeline', title: 'Pipeline de Renderizado (Rendering Pipeline)' }
      ]
    },

    'environment-scene-3d': {
      id: 'environment-scene-3d',
      name: 'Entorno y Escena 3D Tridimensional',
      glossaryId: 'render-3d-animations',
      description: 'Escenario tridimensional completo que integra geometrías complejas, vegetación instanciada, iluminación global e interacción física.',
      targetDuration: 'Variable según secuencia',
      recommendedAspectRatios: ['16:9', '2.39:1'],
      recommendedResolutions: ['UHD 3840x2160', 'Tiempo Real 60+ FPS'],
      determinantAttributes: [
        { key: 'sceneScaleDimensions', label: 'Escala y Extensión', placeholder: 'Ej. 2 km² de paisaje montañoso con poblado medieval' },
        { key: 'lightingEnvironment', label: 'Modelo de Iluminación Global', options: ['Trazado de rayos por trayectoria (Path Tracing)', 'Lumen / Realtime GI', 'Iluminación basada en imagen HDRI'] },
        { key: 'assetDensity', label: 'Densidad y Malla de Instanciación', placeholder: 'Ej. Instanciación procedimental de follaje y rocas' },
        { key: 'lodSystem', label: 'Estructura de Aceleración y LOD', options: ['Jerarquías BVH + LOD 0-4', 'Nanite Geometría Virtualizada'] },
        { key: 'renderEngine', label: 'Motor de Render', options: ['Unreal Engine 5', 'Cycles', 'Arnold', 'Octane'] }
      ],
      defaultAttributes: {
        duration: 'Secuencia cinemática o exploración abierta',
        aspectRatio: '2.39:1',
        resolution: 'UHD 3840x2160',
        targetAudience: 'Directores de arte, jugadores y diseñadores de entornos',
        intent: 'Construir una atmósfera inmersiva con profundidad espacial y coherencia lumínica física',
        platform: 'Motores 3D, VFX cinematográfico y videojuegos',
        style: 'Iluminación naturalista con niebla volumétrica y rebotes de luz indirecta de alta fidelidad',
        audio: 'Paisaje sonoro espacializado 3D con atenuación por distancia',
        subtitles: 'N/A',
        pacing: 'Exploración fluida o barridos cinemáticos de cámara aérea',
        camera: 'Cine Camera Actor con distancia focal de 28mm a 50mm y simulación de diafragma físico'
      },
      actionVerbs: [
        'Poblar la escena con geometría instanciada',
        'Construir jerarquías de volúmenes envolventes (BVH)',
        'Calcular transporte de luz con trazado de rayos',
        'Simular niebla volumétrica y dispersión atmosférica',
        'Optimizar niveles de detalle (LOD) para aceleración computacional'
      ],
      actionDirectives: [
        'Configurar mapa de radiancia HDRI para capturar la temperatura lumínica ambiental precisa.',
        'Emplear estructuras de aceleración BVH para optimizar las intersecciones de rayos sobre mallas densas.',
        'Integrar dispersión anisotrópica en los medios volumétricos para recrear haces de luz solar tangibles.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Diseño de Silueta y Composición de Escena', description: 'Bloqueo volumétrico de masas geográficas y líneas guía visuales.', termId: 'urn:term:render-3d-animations:rendering-pipeline', termTitle: 'Pipeline de Renderizado' }
        ],
        production: [
          { name: 'Dispersión de Assets y Configuración de Materiales', description: 'Aplicación de texturas PBR y optimización de mallas en BVH.', termId: 'urn:term:render-3d-animations:bvh', termTitle: 'Estructuras BVH' }
        ],
        postproduction: [
          { name: 'Cálculo de Iluminación Global y Denoiser por IA', description: 'Renderizado de fotogramas finales con eliminación de ruido estocástico.', termId: 'urn:term:render-3d-animations:ray-tracing', termTitle: 'Trazado de Rayos' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:render-3d-animations:ray-tracing', title: 'Trazado de Rayos (Ray Tracing)' },
        { id: 'urn:term:render-3d-animations:bvh', title: 'Estructura de Aceleración BVH' },
        { id: 'urn:term:render-3d-animations:global-illumination', title: 'Iluminación Global (Global Illumination)' }
      ]
    },

    'vfx-simulation-pass': {
      id: 'vfx-simulation-pass',
      name: 'Simulación VFX (Fluidos, Fuego, Dinámicas)',
      glossaryId: 'render-3d-animations',
      description: 'Cálculo físico de fenómenos complejos (humo, fuego, explosiones, agua o destrucción rígida) exportado en pases para composición.',
      targetDuration: '2s - 10s por efecto',
      recommendedAspectRatios: ['2.39:1', '16:9'],
      recommendedResolutions: ['4K DCI', 'UHD 3840x2160'],
      determinantAttributes: [
        { key: 'simulationSolver', label: 'Algoritmo Solucionador', options: ['Navier-Stokes para fluidos incompresibles', 'Partículas SPH (Smoothed Particle Hydrodynamics)', 'Dinámicas de cuerpos rígidos (RBD)'] },
        { key: 'voxelResolution', label: 'Resolución de Grilla / Vóxeles', placeholder: 'Ej. Vóxeles de 0.5 cm, grilla OpenVDB de 40 millones de celdas' },
        { key: 'substepAccuracy', label: 'Substepping Temporal', placeholder: 'Ej. 4 a 8 sub-pasos por fotograma para evitar inestabilidad' },
        { key: 'aovPassExport', label: 'Pases de Salida AOVs', placeholder: 'Ej. Emisión, Densidad, Profundidad Z, Vector de Movimiento' },
        { key: 'renderEngine', label: 'Motor de Cómputo de Sombreado', options: ['Houdini Mantra / Karma', 'Blender Mantaflow / Cycles', 'Arnold'] }
      ],
      defaultAttributes: {
        duration: '5 segundos',
        aspectRatio: '2.39:1',
        resolution: '4K DCI',
        targetAudience: 'Compositores de VFX, directores de efectos visuales y supervisores de postproducción',
        intent: 'Integrar simulaciones dinámicas físicamente exactas en tomas rodadas o escenas 3D',
        platform: 'Software de composición (Nuke / Fusion) y motores de render 3D',
        style: 'Comportamiento físico realista con turbulencia micro-escala y disipación natural',
        audio: 'Efectos foley y diseño de sonido de impacto físico asociado',
        subtitles: 'N/A',
        pacing: 'Cadencia a 24 fps con desenfoque de movimiento (motion blur) preciso derivado de vectores',
        camera: 'Cámara 3D sincronizada por tracking espacial con el metraje de rodaje'
      },
      actionVerbs: [
        'Discretizar el volumen espacial en celdas de vóxeles',
        'Resolver ecuaciones hidrodinámicas de Navier-Stokes',
        'Calcular colisiones dinámicas con geometría colindante',
        'Cachear secuencias volumétricas en formato OpenVDB',
        'Exportar pases de densidad y vectores de velocidad'
      ],
      actionDirectives: [
        'Configurar el solucionador dinámico con sub-pasos temporales suficientes para prevenir fugas de fluido.',
        'Exportar pases de densidad volumétrica, emisión de temperatura y vectores de velocidad en formato EXR de 32 bits.',
        'Aplicar desenfoque de movimiento físico basado en los vectores de flujo calculados.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Diseño de Fuerzas y Geometría Colisionadora', description: 'Definir gravedad, viscosidad y obstáculos en la escena.', termId: 'urn:term:render-3d-animations:rendering-pipeline', termTitle: 'Pipeline de Renderizado' }
        ],
        production: [
          { name: 'Cálculo de Simulación y Horneado en VDB', description: 'Inferencia física intensiva y guardado en disco sin compresión destructiva.', termId: 'urn:term:render-3d-animations:ray-tracing', termTitle: 'Trazado de Rayos' }
        ],
        postproduction: [
          { name: 'Composición de Pases Multi-Canal (AOVs)', description: 'Integración en metraje real equilibrando luminosidad y sombras de contacto.', termId: 'urn:term:audiovisual-production:vfx-composicion', termTitle: 'VFX & Composición' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:render-3d-animations:rendering-pipeline', title: 'Pipeline de Renderizado (Rendering Pipeline)' },
        { id: 'urn:term:render-3d-animations:ray-tracing', title: 'Trazado de Rayos (Ray Tracing)' }
      ]
    },

    'architectural-viz': {
      id: 'architectural-viz',
      name: 'Visualización Arquitectónica ArchViz / Recorrido',
      glossaryId: 'render-3d-animations',
      description: 'Representación tridimensional hiperrealista de proyectos edilicios e interiores, con fidelidad lumínica natural y óptica arquitectónica.',
      targetDuration: '60s - 180s (recorrido) o renders estáticos 8K',
      recommendedAspectRatios: ['16:9', '2.39:1', '4:3'],
      recommendedResolutions: ['4K DCI (4096x2160)', '8K Ultra High Definition (7680x4320)'],
      determinantAttributes: [
        { key: 'projectScale', label: 'Tipología del Proyecto', options: ['Diseño de Interiores Residencial', 'Complejo Edilicio Urbano', 'Espacio Comercial'] },
        { key: 'sunlightSimulation', label: 'Simulación Solar y Horaria', placeholder: 'Ej. Sol cenital de media tarde o luz suave crepuscular' },
        { key: 'lensShiftTilt', label: 'Corrección de Fuga Vertical', options: ['Corrección de perspectiva vertical a dos puntos (Shift Tilt)', 'Perspectiva natural libre'] },
        { key: 'materialsRealism', label: 'Fidelidad de Materiales', placeholder: 'Ej. Mármol pulido con IOR 1.54, hormigón visto y maderas nobles' },
        { key: 'renderEngine', label: 'Motor de Síntesis', options: ['Unreal Engine 5 ArchViz', 'Corona Renderer', 'V-Ray', 'Blender Cycles'] }
      ],
      defaultAttributes: {
        duration: '90 segundos de recorrido',
        aspectRatio: '16:9',
        resolution: 'UHD 3840x2160',
        targetAudience: 'Inversionistas inmobiliarios, arquitectos, clientes y compradores finales',
        intent: 'Mostrar con absoluta fidelidad los materiales, proporciones espaciales y luz de la edificación',
        platform: 'Sitios web inmobiliarios, pantallas de showroom y videos promocionales',
        style: 'Minimalista, ordenado, iluminación hiperrealista con exposición equilibrada interior-exterior',
        audio: 'Música ambiental contemporánea elegante y sonidos discretos de la naturaleza exterior',
        subtitles: 'Rótulos elegantes con dimensiones y materiales del proyecto',
        pacing: 'Pausado, contemplativo, con travellings en línea recta y desaceleración bezier',
        camera: 'Cámara con corrección de verticales (dos puntos de fuga) y altura fija a 1.60m del suelo'
      },
      actionVerbs: [
        'Nivelar la cámara corrigiendo fugas verticales a dos puntos',
        'Simular la trayectoria solar geográfica y temperatura Kelvin',
        'Aplicar coeficientes de reflectancia física (IOR) a vidrios y metales',
        'Eliminar ruido de render mediante algoritmos denoiser neuronales',
        'Recorrer los ambientes a velocidad de caminata pausada'
      ],
      actionDirectives: [
        'Alinear la perspectiva de cámara a dos puntos de fuga manteniendo las líneas verticales paralelas.',
        'Calibrar la iluminación interior motivada por la luz natural procedente de ventanales.',
        'Generar reflejos nítidos y refracciones acústicamente amortiguadas sobre superficies vítreas.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Importación de Planos BIM / CAD a Escala 1:1', description: 'Levantamiento geométrico milimétrico de muros y aberturas.', termId: 'urn:term:render-3d-animations:rendering-pipeline', termTitle: 'Pipeline de Renderizado' }
        ],
        production: [
          { name: 'Asignación de Materiales PBR y Estudio Solar', description: 'Configuración de BRDF para maderas, mármol y cristales.', termId: 'urn:term:render-3d-animations:brdf', termTitle: 'Modelo BRDF' }
        ],
        postproduction: [
          { name: 'Renderizado en Alta Resolución y Desruido por IA', description: 'Procesamiento con denoiser y pase de coloración sutil.', termId: 'urn:term:render-3d-animations:ray-tracing', termTitle: 'Trazado de Rayos' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:render-3d-animations:ray-tracing', title: 'Trazado de Rayos (Ray Tracing)' },
        { id: 'urn:term:render-3d-animations:brdf', title: 'Modelo BRDF (Función de Reflectancia Bidireccional)' }
      ]
    },

    'product-commercial-3d': {
      id: 'product-commercial-3d',
      name: 'Visualizador de Producto 3D & Publicidad',
      glossaryId: 'render-3d-animations',
      description: 'Animación publicitaria hiperdetallada de productos físicos (tecnología, calzado, cosmética) destacando manufactura y microtexturas.',
      targetDuration: '15s - 45s',
      recommendedAspectRatios: ['16:9', '9:16', '1:1'],
      recommendedResolutions: ['4K DCI', 'UHD 3840x2160'],
      determinantAttributes: [
        { key: 'productCategory', label: 'Categoría del Producto', options: ['Electrónica y Gadgets', 'Cosmética y Fragancias', 'Automoción', 'Moda y Calzado'] },
        { key: 'macroLightingStudio', label: 'Esquema de Estudio Virtual', placeholder: 'Ej. Softbox alargadas para destacar aristas biseladas y luz de contra (rim)' },
        { key: 'cameraTurntable', label: 'Coreografía de Cámara', placeholder: 'Ej. Órbita turntable en espiral con aproximación macro al conector' },
        { key: 'explodedView', label: 'Despiece Mecánico (Exploded View)', options: ['Despiece animado de componentes internos', 'Pieza ensamblada única'] },
        { key: 'renderEngine', label: 'Motor de Render', options: ['Octane', 'Redshift', 'Cycles', 'Unreal Engine'] }
      ],
      defaultAttributes: {
        duration: '30 segundos',
        aspectRatio: '16:9',
        resolution: '4K DCI',
        targetAudience: 'Consumidores de productos premium y campañas comerciales de marca',
        intent: 'Resaltar la calidad artesanal, sofisticación tecnológica y diseño industrial del objeto',
        platform: 'Televisión comercial, YouTube preroll, redes sociales y escaparates digitales',
        style: 'Iluminación de estudio de alto contraste sobre fondo neutro oscuro o gradiente sutil',
        audio: 'Banda sonora electrónica sofisticada con efectos sonoros táctiles foley mecánicos',
        subtitles: 'Tipografía de diseño con características técnicas del producto',
        pacing: 'Fluido, rítmico, alternando desaceleraciones suaves en giros con explosión de piezas',
        camera: 'Tomas macro con lentes de 90mm o 100mm, poca profundidad de campo y giros orbitales precisos'
      },
      actionVerbs: [
        'Delinear aristas mediante luces de recorte (rim lights)',
        'Resaltar microtexturas de superficies pulidas y rugosas',
        'Despiezar componentes internos en animación sincronizada',
        'Rotar el objeto en 360 grados con desaceleración bezier',
        'Enfocar detalles milimétricos mediante desenfoque selectivo'
      ],
      actionDirectives: [
        'Modelar softboxes virtuales alargadas para generar reflejos especulares continuos a lo largo del chasis.',
        'Separar el producto del fondo mediante una luz de contra con temperatura de color fría.',
        'Sincronizar el despiece de componentes con transiciones rítmicas de la música.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Modelado CAD y Reconstrucción en Malla Poligonal', description: 'Conversión de archivos de ingeniería a mallas optimizadas.', termId: 'urn:term:render-3d-animations:rendering-pipeline', termTitle: 'Pipeline de Renderizado' }
        ],
        production: [
          { name: 'Animación de Cámaras Turntable y Despiece', description: 'Curvas de interpolación suaves para movimiento fluido.', termId: 'urn:term:render-3d-animations:rasterization', termTitle: 'Rasterización' }
        ],
        postproduction: [
          { name: 'Pases de Composición Cryptomatte y Grano Fílmico', description: 'Ajuste de destellos en altas luces y reflejos metálicos.', termId: 'urn:term:render-3d-animations:brdf', termTitle: 'Modelo BRDF' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:render-3d-animations:rasterization', title: 'Rasterización (Rasterization)' },
        { id: 'urn:term:render-3d-animations:brdf', title: 'Modelo BRDF (Función de Reflectancia Bidireccional)' }
      ]
    },

    'cinematic-game-cutscene': {
      id: 'cinematic-game-cutscene',
      name: 'Cinemática de Videojuego en Tiempo Real',
      glossaryId: 'render-3d-animations',
      description: 'Secuencia narrativa generada directamente dentro del motor de juego a 60 fps con interacción de personajes y entorno dinámico.',
      targetDuration: '60s - 180s',
      recommendedAspectRatios: ['16:9', '2.39:1 (Ultrawide)'],
      recommendedResolutions: ['4K UHD (3840x2160)', '1440p QHD'],
      determinantAttributes: [
        { key: 'targetFrameRate', label: 'Cadencia de Fotogramas en Vivo', options: ['60 FPS constantes', '30 FPS fijos', '120 FPS alta tasa'] },
        { key: 'motionCaptureIntegration', label: 'Datos de Animación Mocap', placeholder: 'Ej. Captura corporal óptica Vicon y captura facial LiveLink' },
        { key: 'realtimeGIEngine', label: 'Iluminación en Tiempo Real', options: ['Lumen Software Ray Tracing', 'Hardware Ray Tracing RT Cores'] },
        { key: 'postProcessVolume', label: 'Post-Procesado en Motor', placeholder: 'Ej. Exposición automática, bloom físico, desenfoque de movimiento' },
        { key: 'targetEngine', label: 'Motor de Videojuego', options: ['Unreal Engine 5 (Sequencer)', 'Unity HDRP'] }
      ],
      defaultAttributes: {
        duration: '90 segundos',
        aspectRatio: '2.39:1',
        resolution: 'UHD 3840x2160 a 60 FPS',
        targetAudience: 'Jugadores de consola y PC de última generación',
        intent: 'Hacer progresar la trama dramática del juego sin interrumpir la inmersión del motor',
        platform: 'PlayStation 5, Xbox Series X, PC Gaming',
        style: 'Fotorrealismo cinematográfico con partículas dinámicas y físicas de tela activas',
        audio: 'Audio espacializado 3D integrado con el motor de sonido (Wwise / FMOD)',
        subtitles: 'Subtítulos configurables con color por interlocutor',
        pacing: 'Dinámico, alternando planos de diálogo con secuencias de acción trepidante',
        camera: 'Cine Camera Actor con emulación de sensor Super 35 y ópticas prime cinemáticas'
      },
      actionVerbs: [
        'Secuenciar pistas de animación y cámara en línea de tiempo',
        'Vincular datos de captura de movimiento (mocap) al esqueleto',
        'Modular la iluminación global en tiempo real',
        'Disparar eventos sonoros e hilos de partículas en fotogramas clave',
        'Sincronizar el lipsync facial con los fonemas de voz'
      ],
      actionDirectives: [
        'Configurar el Sequencer del motor para orquestar la animación de personajes y cámaras virtuales.',
        'Activar iluminación Lumen con rebotes de ray tracing para integración realista entre actores y decorado.',
        'Ajustar el volumen de post-procesado para controlar profundidad de campo y aberración cromática.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Sesión de Captura de Movimiento Facial y Corporal', description: 'Registro de actores en estudio de mocap.', termId: 'urn:term:render-3d-animations:character-rigging', termTitle: 'Rigging de Personajes' }
        ],
        production: [
          { name: 'Integración en Sequencer e Iluminación en Vivo', description: 'Disposición de actores en escena virtual y montaje de tiros.', termId: 'urn:term:render-3d-animations:rasterization', termTitle: 'Rasterización' }
        ],
        postproduction: [
          { name: 'Pulido de Físicas y Renderizado o Horneado', description: 'Ajuste de penetraciones de tela y optimización para tasa de 60 fps.', termId: 'urn:term:render-3d-animations:rendering-pipeline', termTitle: 'Pipeline de Renderizado' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:render-3d-animations:rasterization', title: 'Rasterización (Rasterization)' },
        { id: 'urn:term:render-3d-animations:character-rigging', title: 'Rigging de Personajes (Character Rigging)' }
      ]
    },

    // =========================================================
    // GLOSARIO: Video, Imagen & Gráficos Digitales (video-image)
    // =========================================================
    'color-grading-showreel': {
      id: 'color-grading-showreel',
      name: 'Showreel de Etalonaje & Colorimetría',
      glossaryId: 'video-image',
      description: 'Muestra profesional de graduación cromática que demuestra transformaciones de espacios de color, corrección primaria y looks estilizados.',
      targetDuration: '60s - 120s',
      recommendedAspectRatios: ['2.39:1', '16:9'],
      recommendedResolutions: ['4K DCI (4096x2160)', 'UHD 3840x2160'],
      determinantAttributes: [
        { key: 'colorSpaceInput', label: 'Espacio de Color Origen', options: ['Log de Cámara (ARRI LogC, REDWideGamut, Sony S-Log3)', 'RAW Sensor', 'Rec.709'] },
        { key: 'colorSpaceOutput', label: 'Espacio de Color Destino', options: ['ACEScc / ACEScg', 'Rec.709 / Gamma 2.4', 'DCI-P3', 'Rec.2020 PQ'] },
        { key: 'filmEmulationLUT', label: 'Emulación de Emulsión Fílmica', placeholder: 'Ej. Kodak 2383 / Fujifilm 3513 Print LUT' },
        { key: 'splitScreenBeforeAfter', label: 'Modo Comparativo', options: ['Pantalla dividida (Split-Screen) Antes/Después', 'Wipe de transición gradual'] },
        { key: 'vectorscopeCalibration', label: 'Control en Scopes', placeholder: 'Ej. Alineación estricta de vector de tonos de piel en vectorscopio' }
      ],
      defaultAttributes: {
        duration: '90 segundos',
        aspectRatio: '2.39:1',
        resolution: '4K DCI',
        targetAudience: 'Directores de fotografía, directores de cine, productores de color y marcas',
        intent: 'Evidenciar la destreza en etalonaje dramático, balance primario y creación de atmósferas cromáticas',
        platform: 'Vimeo Staff Picks, DaVinci Resolve Showcase, Web de Portafolio Profesional',
        style: 'Looks variados que van desde drama cinematográfico cálido hasta ciencia ficción contrastada fría',
        audio: 'Pista rítmica estilizada con transiciones sonoras al cambio de plano o wipe comparativo',
        subtitles: 'Indicaciones breves en pantalla del espacio de color y cámara de origen',
        pacing: 'Cadencia dinámica de 2 a 4 segundos por plano permitiendo apreciar la gradación',
        camera: 'Material rodado con sensores de gran formato en RAW con amplio rango de latitud'
      },
      actionVerbs: [
        'Balancear el balance de blancos y exposición primaria',
        'Normalizar la curva Log en el espacio de trabajo ACES',
        'Aislar los tonos de piel con máscaras HSL secundarias',
        'Aplicar tablas de conversión cromática (LUTs) de emulación fílmica',
        'Monitorear los niveles legales mediante vectorscopio y parade RGB'
      ],
      actionDirectives: [
        'Transformar el material origen utilizando el espacio de color unificado ACEScc.',
        'Alinear el vector de tonos de piel en la línea indicadora del vectorscopio antes de aplicar el look creativo.',
        'Presentar comparaciones visuales limpias (antes Log / después graduado) para evidenciar el rango dinámico rescatado.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Conformado de Línea de Tiempo y Gestión de Color', description: 'Importación de XML / AAF y configuración del flujo ACES.', termId: 'urn:term:video-image:aces-color-system', termTitle: 'Sistema de Color ACES' }
        ],
        production: [
          { name: 'Corrección Primaria y Balance de Rango Dinámico', description: 'Ajuste de negros, altas luces y compensación de exposición.', termId: 'urn:term:video-image:hdr-image', termTitle: 'Imagen de Alto Rango Dinámico (HDR)' }
        ],
        postproduction: [
          { name: 'Corrección Secundaria y Creación de Look', description: 'Aplicación de LUTs filmicas y exportación master en ProRes 4444.', termId: 'urn:term:video-image:color-gamut', termTitle: 'Gama de Color (Color Gamut)' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:video-image:aces-color-system', title: 'Sistema de Color ACES (Academy Color Encoding System)' },
        { id: 'urn:term:video-image:hdr-image', title: 'Imagen de Alto Rango Dinámico (HDR)' },
        { id: 'urn:term:video-image:color-gamut', title: 'Gama de Color (Color Gamut)' }
      ]
    },

    'hdr-master-delivery': {
      id: 'hdr-master-delivery',
      name: 'Master HDR (Dolby Vision / DCI-P3)',
      glossaryId: 'video-image',
      description: 'Archivo maestro de ultra alto rango dinámico con brillo de hasta 1000 nits, curva de cuantización perceptual PQ y metadatos dinámicos.',
      targetDuration: 'Duración de la obra final',
      recommendedAspectRatios: ['2.39:1', '16:9'],
      recommendedResolutions: ['4K DCI (4096x2160)', 'UHD 3840x2160'],
      determinantAttributes: [
        { key: 'peakBrightnessNits', label: 'Brillo Pico Máximo (Nits)', options: ['1000 nits (Estándar OTT Master)', '4000 nits (Pabellón Máximo)', '600 nits (HDR10)'] },
        { key: 'eotfCurve', label: 'Curva Electro-Óptica (EOTF)', options: ['SMPTE ST 2084 (PQ - Perceptual Quantizer)', 'HLG (Hybrid Log-Gamma)'] },
        { key: 'colorGamutTarget', label: 'Gama Cromática Objetivo', options: ['P3-D65 (Espacio DCI en contenedor Rec.2020)', 'Rec.2020 Nativo'] },
        { key: 'dynamicMetadataFormat', label: 'Metadatos Dinámicos', options: ['Dolby Vision XML (CM v2.9 o v4.0)', 'HDR10+ Estático'] },
        { key: 'masterCodecContainer', label: 'Códec y Envoltorio', options: ['ProRes 4444 XQ / QuickTime', 'IMF JPEG 2000 / MXF'] }
      ],
      defaultAttributes: {
        duration: 'Según la pieza a masterizar',
        aspectRatio: '16:9',
        resolution: 'UHD 3840x2160 a 1000 nits',
        targetAudience: 'Plataformas de streaming premium (Netflix, Apple TV, Prime), salas HDR y distribuidores',
        intent: 'Entregar la máxima fidelidad de contraste con negros absolutos y detalles brillantes especulares',
        platform: 'Dispositivos OLED HDR, Smart TVs compatibles con Dolby Vision y salas especializadas',
        style: 'Contraste amplio sin aplastamiento de sombras y altas luces especulares limpias hasta 1000 nits',
        audio: 'Dolby Atmos o audio PCM lineal 5.1/7.1 a 24 bits 48kHz',
        subtitles: 'Subtítulos con luminancia limitada a 100 nits para evitar deslumbramientos',
        pacing: 'Cadencia cinematográfica nativa a 24.000 fps',
        camera: 'Metraje capturado en sensores de 16+ pasos de rango dinámico real'
      },
      actionVerbs: [
        'Mapear la señal luminosa mediante la curva perceptual PQ (ST 2084)',
        'Calibrar el monitor de masterizado a 1000 nits con sonda espectral',
        'Analizar fotograma a fotograma para generar metadatos Dolby Vision',
        'Limitar la luminancia de textos y subtítulos a 100 nits',
        'Empaquetar el archivo master en contenedor IMF o ProRes 4444 XQ'
      ],
      actionDirectives: [
        'Graduar el material sobre un monitor de masterizado calibrado con cobertura mínima del 99% de P3-D65.',
        'Evitar que elementos gráficos o subtítulos superen los 100 nits para evitar deslumbramiento en visualización oscura.',
        'Generar el archivo XML de metadatos Dolby Vision realizando los pases de recorte para pantallas SDR y HDR estándar.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Configuración del Entorno de Masterización HDR', description: 'Calibración de monitor a 1000 nits y espacio P3-D65.', termId: 'urn:term:video-image:hdr-image', termTitle: 'Imagen de Alto Rango Dinámico (HDR)' }
        ],
        production: [
          { name: 'Gradación Tonal con Curva PQ ST 2084', description: 'Ajuste de sombras y altas luces sin clipping.', termId: 'urn:term:video-image:color-gamut', termTitle: 'Gama de Color (Color Gamut)' }
        ],
        postproduction: [
          { name: 'Análisis de Metadatos Dinámicos y Empaquetado IMF', description: 'Generación de metadatos Dolby Vision y control de calidad.', termId: 'urn:term:video-image:aces-color-system', termTitle: 'Sistema de Color ACES' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:video-image:hdr-image', title: 'Imagen de Alto Rango Dinámico (HDR)' },
        { id: 'urn:term:video-image:color-gamut', title: 'Gama de Color (Color Gamut)' }
      ]
    },

    'generative-ai-video': {
      id: 'generative-ai-video',
      name: 'Secuencia Generativa de Video IA',
      glossaryId: 'video-image',
      description: 'Secuencia de video sintetizada mediante modelos de difusión o transformadores autorregresivos (Text-to-Video, Image-to-Video).',
      targetDuration: '5s - 15s por clip / secuencias concatenadas',
      recommendedAspectRatios: ['16:9', '9:16', '2.39:1'],
      recommendedResolutions: ['1080p (1920x1080)', '4K Upscaled'],
      determinantAttributes: [
        { key: 'diffusionModel', label: 'Familia del Modelo Generativo', options: ['OpenAI Sora', 'Runway Gen-3 Alpha', 'Kling AI', 'Luma Dream Machine', 'Diffusion Transformer (DiT)'] },
        { key: 'temporalCoherenceWeight', label: 'Peso de Coherencia Temporal', placeholder: 'Ej. Control de estabilidad inter-frame para evitar morfing y parpadeo' },
        { key: 'conditioningMethod', label: 'Método de Condicionamiento', options: ['Text-to-Video con prompt semántico', 'First-Frame Image Conditioning', 'First & Last Frame Interpolation', 'ControlNet Motion Vectors'] },
        { key: 'motionScale', label: 'Escala de Intensidad de Movimiento', placeholder: 'Ej. Movimiento fluido cinemático moderado (Motion Bucket: 5)' },
        { key: 'postUpscaleMethod', label: 'Reescalado y Desentrelazado IA', options: ['Interpolación de cuadros por flujo óptico a 60fps', 'Reescalado neural 4K'] }
      ],
      defaultAttributes: {
        duration: '10 segundos',
        aspectRatio: '16:9',
        resolution: '1080p nativo con reescalado 4K neural',
        targetAudience: 'Creadores audiovisuales, publicistas y directores de arte experimental',
        intent: 'Generar tomas fotorrealistas con coherencia física que emulen cinematografía analógica de alta gama',
        platform: 'Redes sociales, cortometrajes generativos y comerciales de televisión',
        style: 'Cinematografía de 35mm con iluminación naturalista, textura táctil y ausencia de artefactos sintéticos',
        audio: 'Diseño de sonido foley y banda sonora sintetizada sincronizada',
        subtitles: 'Opcionales',
        pacing: 'Cadencia cinematográfica fluida y consistente a 24 fps',
        camera: 'Paneo lateral continuo con lente 50mm f/1.8 y seguimiento de perspectiva estable'
      },
      actionVerbs: [
        'Condicionar la inferencia con fotograma inicial guía',
        'Preservar la coherencia temporal entre cuadros sucesivos',
        'Guiar el desplazamiento de cámara con vectores de movimiento',
        'Eliminar parpadeo temporal (temporal flicker) y morfing no deseado',
        'Interpolar fotogramas intermedios mediante flujo óptico',
        'Reescalar texturas a resolución 4K fotorrealista'
      ],
      actionDirectives: [
        'Inyectar directivas explícitas de lente (35mm prime) e iluminación (difusa 5600K) en el prompt positivo.',
        'Utilizar condicionamiento por imagen inicial (First-Frame Conditioning) para mantener consistencia del protagonista.',
        'Aplicar filtros negativos específicos contra deformaciones anatómicas, plastic skin y frame jitter.',
        'Refinar la salida mediante algoritmos de interpolación temporal para garantizar cadencia a 24 fps.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Generación de Fotograma Semilla (Concept Frame)', description: 'Creación del plano estático de referencia en Midjourney / Flux.', termId: 'urn:term:audiovisual-production:conditioning', termTitle: 'Conditioning (Condicionamiento)' }
        ],
        production: [
          { name: 'Inferencia de Video con Vectores de Movimiento', description: 'Ejecución del modelo generativo guiado por prompt y vectores.', termId: 'urn:term:audiovisual-production:motion-vectors-ia', termTitle: 'Vectores de Movimiento IA' }
        ],
        postproduction: [
          { name: 'Estabilización Temporal y Reescalado Neural', description: 'Eliminación de artefactos y conformación en NLE a 4K.', termId: 'urn:term:audiovisual-production:temporal-coherence', termTitle: 'Coherencia Temporal' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:audiovisual-production:conditioning', title: 'Conditioning (Condicionamiento de Modelos Generativos)' },
        { id: 'urn:term:audiovisual-production:temporal-coherence', title: 'Coherencia Temporal (Temporal Coherence)' },
        { id: 'urn:term:audiovisual-production:motion-vectors-ia', title: 'Vectores de Movimiento en Video Generativo' }
      ]
    },

    'codec-transcode-profile': {
      id: 'codec-transcode-profile',
      name: 'Perfil de Transcodificación & Streaming Multi-Bitrate',
      glossaryId: 'video-image',
      description: 'Estandarización de perfiles de compresión para distribución web, redes de entrega de contenido (CDN) y compatibilidad multi-dispositivo.',
      targetDuration: 'Variable según contenido',
      recommendedAspectRatios: ['16:9', '9:16', '1:1'],
      recommendedResolutions: ['Ladder ABR: 1080p, 720p, 480p, 360p'],
      determinantAttributes: [
        { key: 'compressionCodec', label: 'Estándar de Compresión', options: ['H.264 / AVC (Máxima compatibilidad)', 'H.265 / HEVC (Alta eficiencia 4K)', 'AV1 (Eficiencia de nueva generación)', 'VP9'] },
        { key: 'rateControlMode', label: 'Modo de Control de Tasa', options: ['CRF (Calidad Constante)', 'VBR 2-Pass con tasa objetivo', 'CBR para transmisión en vivo'] },
        { key: 'chromaSubsampling', label: 'Submuestreo de Croma', options: ['4:2:0 para distribución web masiva', '4:2:2 para archivo de producción', '4:4:4 para master de post'] },
        { key: 'gopStructure', label: 'Estructura GOP (Group of Pictures)', placeholder: 'Ej. Longitud de 48 cuadros (2s a 24fps) con keyframes cerrados' },
        { key: 'targetBitrateLadder', label: 'Escalera de Tasas (Bitrate Ladder)', placeholder: 'Ej. 1080p a 4500 kbps, 720p a 2200 kbps, 480p a 1000 kbps' }
      ],
      defaultAttributes: {
        duration: 'Según archivo fuente',
        aspectRatio: '16:9',
        resolution: 'Escalera Multi-bitrate Adaptativa (ABR)',
        targetAudience: 'Usuarios de navegadores web, dispositivos móviles y televisores inteligentes',
        intent: 'Minimizar consumo de ancho de banda manteniendo alta fidelidad visual perceptual (VMAF > 93)',
        platform: 'Plataformas de streaming HLS / DASH, YouTube, servidores web locales',
        style: 'Compresión sin artefactos perceptibles de macrobloques ni bandas en gradientes',
        audio: 'AAC-LC estéreo a 192 kbps 48kHz o Dolby Digital Plus',
        subtitles: 'Pistas WebVTT sincronizadas',
        pacing: 'Cadencia continua sin congelación de fotogramas (buffer stalls)',
        camera: 'N/A'
      },
      actionVerbs: [
        'Comprimir el flujo visual con transformada de coseno discreta (DCT)',
        'Submuestrear el croma a 4:2:0 para reducir ancho de banda',
        'Fijar la longitud del GOP para permitir conmutación adaptativa HLS',
        'Optimizar la tasa de bits mediante codificación en dos pasadas (2-pass)',
        'Verificar el índice de calidad perceptual VMAF frente al master original'
      ],
      actionDirectives: [
        'Configurar keyframes cerrados con una periodicidad fija idéntica a la duración de los segmentos HLS/DASH.',
        'Emplear filtros de desentrelazado si la fuente presenta campos intercalados.',
        'Realizar control de calidad auditando métricas PSNR y VMAF para asegurar ausencia de macrobloques.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Análisis de Complejidad Espaciotemporal del Master', description: 'Evaluación del metraje para calcular tasas de bits óptimas.', termId: 'urn:term:video-image:video-compression', termTitle: 'Compresión de Video' }
        ],
        production: [
          { name: 'Codificación Multi-Resolución con FFMPEG o Hardware', description: 'Transcodificación paralela de los perfiles de la escalera.', termId: 'urn:term:video-image:discrete-cosine-transform', termTitle: 'Transformada de Coseno Discreta' }
        ],
        postproduction: [
          { name: 'Generación de Manifiestos HLS / DASH y Verificación', description: 'Creación de archivos .m3u8 / .mpd para reproducción adaptativa.', termId: 'urn:term:video-image:color-gamut', termTitle: 'Gama de Color (Color Gamut)' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:video-image:video-compression', title: 'Compresión de Video (Video Compression)' },
        { id: 'urn:term:video-image:discrete-cosine-transform', title: 'Transformada de Coseno Discreta (DCT)' }
      ]
    },

    'retouch-editorial-image': {
      id: 'retouch-editorial-image',
      name: 'Imagen Editorial & Clean Plate',
      glossaryId: 'video-image',
      description: 'Retoque fotográfico de alta fidelidad y extracción de fondos limpios para publicidad, moda o efectos visuales cinematográficos.',
      targetDuration: 'Fotograma estático / Placa limpia (Clean Plate)',
      recommendedAspectRatios: ['4:5', '16:9', '1:1', '2:3'],
      recommendedResolutions: ['Full RAW 50+ Megapíxeles', '8K Master'],
      determinantAttributes: [
        { key: 'bitDepthPrecision', label: 'Profundidad de Bits', options: ['16 bits por canal (ProPhoto RGB)', '32 bits coma flotante (EXR)', '8 bits sRGB'] },
        { key: 'frequencySeparation', label: 'Separación de Frecuencias', placeholder: 'Ej. Separación de textura de alta frecuencia y tono cromático de baja frecuencia' },
        { key: 'maskingType', label: 'Tipo de Máscaras Alfa', options: ['Máscara de luminancia y canal alfa limpio', 'Máscara vectorial de contorno'] },
        { key: 'colorSpaceWorkflow', label: 'Gestión de Color de Trabajo', options: ['ProPhoto RGB a 16-bit', 'Adobe RGB (1998)', 'ACEScg'] },
        { key: 'outputPurpose', label: 'Finalidad de Entrega', options: ['Impresión editorial en papel cuché a 300 DPI', 'Clean Plate para inserción de VFX en cine'] }
      ],
      defaultAttributes: {
        duration: 'Placa estática o fotograma de fondo',
        aspectRatio: '4:5',
        resolution: '50 MP / 300 DPI',
        targetAudience: 'Editores de revistas, directores de arte publicitario y artistas de composición VFX',
        intent: 'Eliminar imperfecciones indeseadas preservando la textura orgánica real y micro-poros',
        platform: 'Publicaciones impresas de alta gama, cartelería exterior y composición en Nuke',
        style: 'Perfección orgánica naturalista sin efecto plástico ni desenfoques gaussianos destructivos',
        audio: 'N/A',
        subtitles: 'N/A',
        pacing: 'N/A',
        camera: 'Sensor de formato medio con lente fija de 100mm macro e iluminación calibrada'
      },
      actionVerbs: [
        'Separar información de alta frecuencia textural de la baja frecuencia cromática',
        'Retocar imperfecciones sin destruir la estructura de grano orgánico',
        'Extraer placas limpias (clean plates) mediante clonado respetuoso con el ruido',
        'Calibrar perfiles ICC de salida para concordancia con papel de imprenta',
        'Preservar micro-contrastes y bordes de pelo en canal alfa'
      ],
      actionDirectives: [
        'Trabajar el archivo revelado a 16 bits por canal para evitar bandas (banding) en gradientes sutiles.',
        'Emplear capas de separación de frecuencias para tratar el color sin afectar la textura dérmica.',
        'Verificar la máscara alfa sobre fondos contrastados (blanco y negro puro) para validar ausencia de halos.'
      ],
      workflowTasks: {
        preproduction: [
          { name: 'Revelado Digital RAW sin Pérdidas', description: 'Ajuste de exposición y aberración cromática óptica.', termId: 'urn:term:video-image:hdr-image', termTitle: 'Imagen de Alto Rango Dinámico (HDR)' }
        ],
        production: [
          { name: 'Retoque de Frecuencias y Limpieza de Placa', description: 'Eliminación quirúrgica de artefactos respetando el grano.', termId: 'urn:term:video-image:color-gamut', termTitle: 'Gama de Color (Color Gamut)' }
        ],
        postproduction: [
          { name: 'Conversión de Perfil de Color y Entrega', description: 'Incrustación de perfiles ICC o exportación EXR para VFX.', termId: 'urn:term:video-image:discrete-cosine-transform', termTitle: 'Transformada de Coseno Discreta' }
        ]
      },
      keyGlossaryTerms: [
        { id: 'urn:term:video-image:hdr-image', title: 'Imagen de Alto Rango Dinámico (HDR)' },
        { id: 'urn:term:video-image:color-gamut', title: 'Gama de Color (Color Gamut)' }
      ]
    }
  };

  // -------------------------------------------------------------
  // Lista autorizada de los 11 Atributos Base (F17 Compatibilidad)
  // -------------------------------------------------------------
  const ATTRIBUTES = [
    'duration',
    'aspectRatio',
    'resolution',
    'targetAudience',
    'intent',
    'platform',
    'style',
    'audio',
    'subtitles',
    'pacing',
    'camera'
  ];

  // Metadatos globales de fallback para atributos genéricos
  const ATTRIBUTE_DEFINITIONS = {
    duration: { key: 'duration', label: 'Duración Prevista', placeholder: 'Ej. 2 minutos, 30 segundos' },
    aspectRatio: { key: 'aspectRatio', label: 'Relación de Aspecto', options: ['2.39:1', '16:9', '9:16', '1:1', '4:3', '2.00:1 (Univisium)', '1.85:1'] },
    resolution: { key: 'resolution', label: 'Resolución y Formato', options: ['4K DCI (4096x2160)', 'UHD 3840x2160', '1080p Full HD', '1080x1920 (Vertical FHD)', '8K DCI'] },
    targetAudience: { key: 'targetAudience', label: 'Audiencia Objetivo', placeholder: 'Ej. Audiencia general de cine, inversores B2B, usuarios en redes' },
    intent: { key: 'intent', label: 'Finalidad / Intención Creativa', placeholder: 'Ej. Generar expectación épica, educar en 3 pasos, entretener en loop' },
    platform: { key: 'platform', label: 'Plataforma de Distribución', options: ['Cine / Salas comerciales', 'YouTube 4K', 'Instagram / TikTok Reels', 'Web Corporativa', 'OTT Streaming'] },
    style: { key: 'style', label: 'Estilo Visual y Estética', placeholder: 'Ej. Cinematic anamorphic 35mm, noir contrastado, minimalista limpio' },
    audio: { key: 'audio', label: 'Diseño Sonoro y Música', placeholder: 'Ej. Híbrido orquestal con braams épicos, locución cálida en off' },
    subtitles: { key: 'subtitles', label: 'Estrategia de Subtitulado', options: ['Sin subtítulos', 'Subtítulos quemados dinámicos', 'Subtítulos cinemáticos inferiores', 'Subtítulos cerrados CC'] },
    pacing: { key: 'pacing', label: 'Ritmo y Estructura de Montaje', placeholder: 'Ej. Escalada rítmica en 3 actos, cortes rápidos en el beat' },
    camera: { key: 'camera', label: 'Movimientos de Cámara y Ópticas', placeholder: 'Ej. Low-angle dutch tilt con lente 35mm prime, travelling con grúa' }
  };

  // -------------------------------------------------------------
  // Funciones Defensivas y Sanitización (F18 Robustness)
  // -------------------------------------------------------------
  function sanitizeString(val) {
    if (val === null || val === undefined) return '';
    let str = String(val);
    str = str.replace(/<[^>]*>/g, '');
    str = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    return str.trim();
  }

  // -------------------------------------------------------------
  // Constructor de Especificaciones y Prompts de IA
  // -------------------------------------------------------------
  function buildSpecification(productId, userAttributes) {
    try {
      const cleanProdId = sanitizeString(productId).toLowerCase() || 'trailer';
      const productDef = PRODUCTS[cleanProdId] || PRODUCTS['trailer'];
      const inputAttrs = (userAttributes && typeof userAttributes === 'object') ? userAttributes : {};

      // 1. Resolver atributos específicos del producto (Determinant Attributes)
      const determinantAttrsDef = productDef.determinantAttributes || [];
      const attrs = {};

      // Primero, poblar atributos específicos
      for (const attrDef of determinantAttrsDef) {
        const k = attrDef.key;
        if (inputAttrs[k] !== undefined && inputAttrs[k] !== null) {
          attrs[k] = sanitizeString(inputAttrs[k]);
        } else if (productDef.defaultAttributes && productDef.defaultAttributes[k] !== undefined) {
          attrs[k] = sanitizeString(productDef.defaultAttributes[k]);
        } else {
          attrs[k] = '';
        }
      }

      // También asegurar que los 11 atributos estándar tengan valor para retrocompatibilidad
      for (const k of ATTRIBUTES) {
        if (attrs[k] === undefined) {
          if (inputAttrs[k] !== undefined && inputAttrs[k] !== null) {
            attrs[k] = sanitizeString(inputAttrs[k]);
          } else if (productDef.defaultAttributes && productDef.defaultAttributes[k] !== undefined) {
            attrs[k] = sanitizeString(productDef.defaultAttributes[k]);
          } else {
            attrs[k] = '';
          }
        }
      }

      // Añadir cualquier atributo adicional suministrado por el usuario
      for (const [k, v] of Object.entries(inputAttrs)) {
        if (attrs[k] === undefined) {
          attrs[k] = sanitizeString(v);
        }
      }

      // 2. Directivas de Cámara y Óptica / Visualizador
      let cameraDirectives = '';
      if (attrs.camera) {
        cameraDirectives = `Camera Movement & Optics: ${attrs.camera}; calibrated focal lengths, optical stabilization, smooth motion vectors, controlled depth of field, anamorphic/prime lens characteristics.`;
      } else if (attrs.cameraVectors || attrs.focalOptics) {
        cameraDirectives = `Camera Movement & Optics: ${attrs.cameraVectors || ''}; ${attrs.focalOptics || ''}; calibrated framing, composition axes.`;
      } else if (productDef.glossaryId === 'render-3d-animations') {
        cameraDirectives = `Camera & Viewport: Virtual 3D Cine Camera, physical aperture f/2.8, focal length 50mm, perspective distortion corrected, orbital smooth turntable vectors.`;
      } else {
        cameraDirectives = `Camera Movement & Optics: cinematic 35mm prime lens framing, stabilized tracking push-in motion vector, balanced rule-of-thirds composition, shallow depth of field with organic background bokeh.`;
      }

      // 3. Directivas de Iluminación y Colorimetría
      let lightingAndColorDirectives = '';
      if (attrs.style && attrs.style.toLowerCase().includes('noir')) {
        lightingAndColorDirectives = 'Lighting & Color Scheme: High-contrast low-key chiaroscuro lighting, deep stylized shadows, crisp rim highlights, monochromatic palette with subtle warm accents, 3200K key light, cinematic film grain.';
      } else if (attrs.aspectRatio === '2.39:1' || (attrs.style && attrs.style.toLowerCase().includes('anamorphic'))) {
        lightingAndColorDirectives = 'Lighting & Color Scheme: Three-point cinematic lighting, 5600K balanced daylight with warm 3200K tungsten fill, anamorphic horizontal streak lens flares, teal and orange complementary color separation, Kodak 2383 film print LUT simulation.';
      } else if (attrs.aspectRatio === '9:16' || cleanProdId === 'reel') {
        lightingAndColorDirectives = 'Lighting & Color Scheme: High-key luminous commercial lighting, soft diffuse beauty ring/panel fill, punchy saturated RGB grading calibrated for mobile OLED displays, crisp edge contrast.';
      } else if (productDef.glossaryId === 'render-3d-animations') {
        lightingAndColorDirectives = 'Lighting & Shading: Physically Based Rendering (PBR), HDRI ambient radiance map, ray-traced Global Illumination (GI) with multiple diffuse bounces, subsurface scattering (SSS) on translucent elements, calibrated metallic-roughness BRDF.';
      } else if (productDef.glossaryId === 'video-image') {
        lightingAndColorDirectives = 'Color Science & Tone Mapping: ACEScc unified wide color gamut workflow, SMPTE ST 2084 PQ electro-optical transfer function up to 1000 nits peak, P3-D65 gamut containment, vectorscope calibrated skin tone alignment.';
      } else {
        lightingAndColorDirectives = 'Lighting & Color Scheme: Naturalistic motivated illumination, soft diffuse source lighting, balanced neutral color grading, calibrated skin tone vector alignment, pristine dynamic range highlights.';
      }

      // 4. Verbos de Acción y Directivas Imperativas para IA Generativa
      const actionVerbs = productDef.actionVerbs || [
        'Encuadrar con precisión',
        'Componer con iluminación balanceada',
        'Modular el ritmo y cadencia',
        'Preservar la coherencia temporal'
      ];
      const actionDirectives = productDef.actionDirectives || actionVerbs.map(v => `${v}.`);

      // 5. Positive Prompt Multimodal
      const positiveTokens = [];
      positiveTokens.push(`[${productDef.name}]`);

      if (attrs.aspectRatio) {
        positiveTokens.push(`aspect ratio: ${attrs.aspectRatio}`);
        positiveTokens.push(`--ar ${attrs.aspectRatio.replace(/\s+/g, '')}`);
      }
      if (attrs.resolution) {
        positiveTokens.push(`${attrs.resolution} master quality`);
      }
      if (attrs.style) {
        positiveTokens.push(`${attrs.style}`);
      }
      if (attrs.camera) {
        positiveTokens.push(`camera: ${attrs.camera}`);
      }
      if (attrs.pacing) {
        positiveTokens.push(`pacing: ${attrs.pacing}`);
      }
      if (attrs.audio) {
        positiveTokens.push(`soundscape: ${attrs.audio}`);
      }
      if (attrs.intent) {
        positiveTokens.push(`creative intent: ${attrs.intent}`);
      }
      if (attrs.platform) {
        positiveTokens.push(`optimized for ${attrs.platform}`);
      }

      // Incluir verbos de acción directamente en el prompt para guiar la inferencia
      positiveTokens.push(`action directives: ${actionVerbs.slice(0, 4).join(', ')}`);

      // Modificadores de fidelidad y estabilidad
      if (productDef.glossaryId === 'render-3d-animations') {
        positiveTokens.push('physically based rendering, octane render style, ray tracing reflections, ambient occlusion, clean quad mesh topology, 8k textures, photorealistic materials, subsurface scattering');
      } else if (productDef.glossaryId === 'video-image') {
        positiveTokens.push('professional color grading, ACES color science, pristine dynamic range, high fidelity bit-depth, crisp spatial frequency, film print emulation, VMAF 95+ master fidelity');
      } else {
        positiveTokens.push('photorealistic cinematography, 35mm film scan, natural motion cadence 24fps, high dynamic range, crisp texture rendering, Sora and Runway Gen-3 coherent spatiotemporal stability, cinematic color grading, masterwork quality, 8k resolution textures');
      }

      const positivePrompt = positiveTokens.join(', ');

      // 6. Negative Prompt Anti-Artefactos
      let negativePrompt = 'blurry, low resolution, plastic skin, uncanny valley, temporal flicker, frame jitter, morphing artifacts, distorted anatomy, extra limbs, floating objects, warped geometry, macroblocking, excessive motion blur, text artifacts, watermark, low quality CGI, oversaturated color bleed, jerky camera movement, glitch, compression artifacts, amateur rendering, blown-out highlights, crushed blacks';
      if (productDef.glossaryId === 'render-3d-animations') {
        negativePrompt += ', non-manifold geometry, inverted normals, pinching polygons, texture seams, low polygon count, baking artifacts';
      } else if (productDef.glossaryId === 'video-image') {
        negativePrompt += ', color banding, chroma noise, gamut clipping, posterization, ringing artifacts, interlace comb lines';
      }

      // 7. Enlace con Términos Canónicos del Glosario
      const referencedTermsMap = new Map();
      if (Array.isArray(productDef.keyGlossaryTerms)) {
        for (const t of productDef.keyGlossaryTerms) {
          referencedTermsMap.set(t.id, t);
        }
      }

      // Enlaces dinámicos según atributos
      if (attrs.aspectRatio && attrs.aspectRatio.includes('9:16')) {
        referencedTermsMap.set('urn:term:audiovisual-production:video-vertical', {
          id: 'urn:term:audiovisual-production:video-vertical',
          title: 'Video Vertical (Formato 9:16 para Smartphones)'
        });
      }
      if (attrs.audio && (attrs.audio.toLowerCase().includes('voz') || attrs.audio.toLowerCase().includes('voice'))) {
        referencedTermsMap.set('urn:term:audiovisual-production:voice-over', {
          id: 'urn:term:audiovisual-production:voice-over',
          title: 'Voice-over (Voz en Off / Locución)'
        });
      }
      if (attrs.camera && (attrs.camera.toLowerCase().includes('plano') || attrs.camera.toLowerCase().includes('shot'))) {
        referencedTermsMap.set('urn:term:audiovisual-production:escala-de-planos', {
          id: 'urn:term:audiovisual-production:escala-de-planos',
          title: 'Escala de Planos'
        });
      }
      if (attrs.pacing && (attrs.pacing.toLowerCase().includes('corte') || attrs.pacing.toLowerCase().includes('escalada'))) {
        referencedTermsMap.set('urn:term:audiovisual-production:montaje', {
          id: 'urn:term:audiovisual-production:montaje',
          title: 'Montaje (Edición Cinematográfica)'
        });
      }

      const referencedGlossaryTerms = Array.from(referencedTermsMap.values());

      return {
        product: cleanProdId,
        productName: productDef.name,
        glossaryId: productDef.glossaryId || 'audiovisual-production',
        attributes: attrs,
        determinantAttributes: determinantAttrsDef,
        actionVerbs: actionVerbs,
        actionDirectives: actionDirectives,
        workflowTasks: productDef.workflowTasks || { preproduction: [], production: [], postproduction: [] },
        positivePrompt: positivePrompt,
        negativePrompt: negativePrompt,
        cameraDirectives: cameraDirectives,
        lightingAndColorDirectives: lightingAndColorDirectives,
        referencedGlossaryTerms: referencedGlossaryTerms
      };
    } catch (err) {
      return {
        product: 'trailer',
        productName: 'Trailer Cinematográfico',
        glossaryId: 'audiovisual-production',
        attributes: {},
        determinantAttributes: [],
        actionVerbs: ['Encuadrar', 'Modular', 'Sincronizar'],
        actionDirectives: ['Encuadrar con lente de 35mm.', 'Modular el arco de tensión.'],
        workflowTasks: { preproduction: [], production: [], postproduction: [] },
        positivePrompt: 'Cinematic masterwork, photorealistic 4K DCI, high dynamic range, temporal stability',
        negativePrompt: 'blurry, low resolution, artifacts, jitter, flickering',
        cameraDirectives: 'Cinematic 35mm prime camera framing with smooth tracking vectors',
        lightingAndColorDirectives: 'Cinematic three-point lighting with calibrated color temperature',
        referencedGlossaryTerms: [
          { id: 'urn:term:audiovisual-production:montaje', title: 'Montaje (Edición Cinematográfica)' }
        ]
      };
    }
  }

  // -------------------------------------------------------------
  // Objeto Público del Módulo DocWebPromptOrientator
  // -------------------------------------------------------------
  const DocWebPromptOrientator = {
    products: PRODUCTS,
    attributes: ATTRIBUTES,
    attributeDefinitions: ATTRIBUTE_DEFINITIONS,
    buildSpecification: buildSpecification,

    // Métodos de utilidad adaptados al Glosario Activo
    getProductList: function (glossaryId = null) {
      const all = Object.values(PRODUCTS);
      if (!glossaryId || glossaryId === 'all') return all;
      const filtered = all.filter(p => p.glossaryId === glossaryId);
      return filtered.length > 0 ? filtered : all;
    },

    getProductsByGlossary: function (glossaryId) {
      return this.getProductList(glossaryId);
    },

    getProduct: function (productId) {
      const clean = sanitizeString(productId).toLowerCase();
      return PRODUCTS[clean] || null;
    },

    getProductAttributes: function (productId) {
      const prod = this.getProduct(productId);
      if (prod && Array.isArray(prod.determinantAttributes) && prod.determinantAttributes.length > 0) {
        return prod.determinantAttributes;
      }
      return [...ATTRIBUTES];
    },

    getAttributeList: function (productId = null) {
      if (productId) {
        const prod = this.getProduct(productId);
        if (prod && Array.isArray(prod.determinantAttributes)) {
          return prod.determinantAttributes.map(a => a.key);
        }
      }
      return [...ATTRIBUTES];
    }
  };

  // -------------------------------------------------------------
  // Exportación Dual y Registro en Entornos (Browser, VM, CommonJS)
  // -------------------------------------------------------------
  if (typeof window !== 'undefined') {
    window.DocWebPromptOrientator = DocWebPromptOrientator;
    window.PromptOrientator = DocWebPromptOrientator;
  }
  if (typeof globalThis !== 'undefined') {
    globalThis.DocWebPromptOrientator = DocWebPromptOrientator;
    globalThis.PromptOrientator = DocWebPromptOrientator;
  }
  if (typeof global !== 'undefined') {
    global.DocWebPromptOrientator = DocWebPromptOrientator;
    global.PromptOrientator = DocWebPromptOrientator;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = DocWebPromptOrientator;
  }

})();
