module.exports = {
  "angulo-de-camara": {
    denomination: "Ángulo de Cámara",
    synonyms: ["Perspectiva Vertical de Cámara", "Inclinación de Toma", "Camera Angle"],
    original_def: "Inclinación y altura del eje óptico de la cámara en relación con el sujeto encuadrado. Varía desde el ángulo normal (a la altura de los ojos, neutro) hasta el picado (desde arriba hacia abajo, sugiriendo vulnerabilidad o pequeñez), el contrapicado (desde abajo hacia arriba, sugiriendo poder o grandeza), el cenital (visión de pájaro perpendicular) y el nadir (visión desde el suelo hacia el cenit).",
    context_of_use: "Planificación de puesta en escena y lenguaje visual en rodajes cinematográficos y publicitarios.",
    example: "Uso de ángulo contrapicado pronunciado sobre el atleta vencedor en el podio para magnificar su triunfo ante el espectador.",
    visual_notes: "Diagrama mostrando el eje de cámara apuntando en +45° (picado), 0° (normal) y -45° (contrapicado) frente al rostro del personaje.",
    llm_prompt_guidance: "Palabras clave: 'low angle hero shot, steep high angle shot, eye-level framing, zenith bird-eye perspective, dramatic camera tilt'.",
    inferred_relations: { "es_un_tipo_de": ["encuadre"], "influye_en": ["narrativa-visual"], "se_combina_con": ["escala-de-planos"] }
  },
  "camara-lenta": {
    denomination: "Cámara Lenta (Slow Motion)",
    synonyms: ["Slow Motion", "Ralentización de Imagen", "Overcranking"],
    original_def: "Efecto cinematográfico en el que el movimiento visible se reproduce a una velocidad significativamente inferior a la real. Se obtiene rodando a una frecuencia de captura superior al estándar de reproducción (por ejemplo 120 fps proyectados a 24 fps, logrando una ralentización de 5x sin interpolación). Revela microexpresiones, enfatiza la gravedad dramática y descompone fenómenos físicos imperceptibles a simple vista.",
    context_of_use: "Tomas de acción deportiva, comerciales de bebidas y alimentos (tabletop), secuencias líricas y dramatización de emociones.",
    example: "Captura a 240 fps del impacto de una gota de agua sobre una superficie líquida, permitiendo observar la corona simétrica que se forma al rebotar.",
    visual_notes: "Reproducción hiperfluida y desgranada en el tiempo sin artefactos de movimiento borroso ni cortes entre cuadros.",
    llm_prompt_guidance: "Palabras clave: 'ultra slow motion 240fps, overcranked high speed camera, Phantom Flex crystal clear slow-mo, smooth fluid action deceleration'.",
    inferred_relations: { "es_equivalente_a": ["slow-motion"], "requiere": ["fps-frame-rate", "velocidad-de-obturacion"], "se_opone_a": ["timelapse"] }
  },
  "camera-tracking": {
    denomination: "Camera Tracking (Seguimiento de Cámara / Matchmoving)",
    synonyms: ["Matchmoving", "Reconstrucción 3D de Cámara", "Rastreo de Movimiento"],
    original_def: "Técnica digital que analiza computacionalmente los cambios de perspectiva de un plano de rodaje en vivo para deducir con exactitud milimétrica la posición tridimensional, la rotación espacial, la distancia focal y la distorsión óptica de la cámara física a lo largo del tiempo, recreando una cámara virtual idéntica en el software de 3D/VFX.",
    context_of_use: "Postproducción de efectos visuales cuando se insertan elementos CGI (edificios, criaturas, vehículos, textos 3D) en tomas con cámara en movimiento.",
    example: "Rastreo de una toma en movimiento sobre una calle vacía para insertar edificios futuristas tridimensionales que mantengan un anclaje perfecto al pavimento.",
    visual_notes: "Nube de puntos de anclaje (feature points) en verde/amarillo proyectados sobre la imagen real con una rejilla de suelo 3D calibrada.",
    llm_prompt_guidance: "Palabras clave: '3D camera matchmoving, point cloud tracking markers, perspective calibrated camera solve, VFX tracking grid'.",
    inferred_relations: { "es_un_tipo_de": ["vfx"], "permite": ["composicion", "matte-painting"], "requiere": ["distancia-focal"] }
  },
  "dolly-shot": {
    denomination: "Dolly Shot (Travelling sobre Rieles)",
    synonyms: ["Travelling In / Out", "Dolly In / Dolly Out", "Plano en Carro"],
    original_def: "Movimiento de cámara en el que la cámara física montada sobre un soporte con ruedas especiales se desplaza suavemente por el espacio tridimensional a lo largo de rieles metálicos nivelados (o ruedas de goma neumática sobre suelo liso), acercándose (dolly in), alejándose (dolly out) o acompañando lateralmente al sujeto.",
    context_of_use: "Planos cinematográficos que exigen absoluta fluidez y sensación física de inmersión tridimensional en el espacio del set.",
    example: "Un sutil dolly in frontal hacia el rostro del detective mientras une las pistas del misterio en su mente, aumentando la tensión dramática.",
    visual_notes: "Vía de rieles metálicos rectos o curvos extendidos por el set con el carro Chapman o Fisher montado y el operador sentado en el brazo hidráulico.",
    llm_prompt_guidance: "Palabras clave: 'smooth dolly in shot, cinematic tracking rails, slow push in camera movement, physical dolly camera move'.",
    inferred_relations: { "es_un_tipo_de": ["tracking-shot"], "se_diferencia_de": ["zoom-in-zoom-out"], "emplea": ["rodaje"] }
  },
  "drone": {
    denomination: "Drone (UAV / Cinematografía Aérea)",
    synonyms: ["Vuelo Aéreo", "UAV Camera", "Toma Aérea con Cuadricóptero"],
    original_def: "Aeronave pilotada por control remoto equipada con un sistema de estabilización giroscópica de tres ejes y cámara cinematográfica de alta resolución, capaz de realizar tomas aéreas a baja, media y gran altura con trayectorias fluidas e inaccesibles para grúas convencionales o helicópteros tripulados.",
    context_of_use: "Tomas de establecimiento paisajístico, seguimiento de vehículos a alta velocidad, inspección arquitectónica y planos cenitales espectaculares.",
    example: "Un plano secuencia aéreo que sobrevuela las olas del océano y desciende suavemente hasta quedar a ras de la arena filmando a un surfista.",
    visual_notes: "Perspectiva cenital o panorámica a 50 metros de altura con horizonte curvo suave y sombras proyectadas desde el aire.",
    llm_prompt_guidance: "Palabras clave: 'cinematic FPV drone shot, sweeping aerial landscape, smooth drone fly-over, high altitude bird-eye tracking'.",
    inferred_relations: { "proporciona": ["establishing-shot", "plano-general"], "es_un_tipo_de": ["camara-y-movimiento"] }
  },
  "escala-de-planos": {
    denomination: "Escala de Planos",
    synonyms: ["Tipos de Plano", "Gradación de Encuadres", "Shot Scale / Framing Scale"],
    original_def: "Sistema canónico de clasificación que categoriza la proporción que ocupa la figura humana o el objeto principal dentro del marco rectangular de la imagen. Abarca desde el Gran Plano General (énfasis en el entorno cósmico o geográfico) hasta el Plano Detalle (énfasis en un elemento minúsculo), pasando por Plano General, Plano Americano, Plano Medio y Primer Plano.",
    context_of_use: "Planificación de guiones técnicos, listas de planos y montaje rítmico en cualquier producción audiovisual.",
    example: "El paso secuencial de un plano general del desierto a un primerísimo primer plano de los ojos sudorosos del protagonista para crear intimidad psicológica.",
    visual_notes: "Infografía pedagógica mostrando una misma figura humana dividida por líneas horizontales con las etiquetas de cada corte de plano.",
    llm_prompt_guidance: "Palabras clave: 'framing scale progression, master wide to extreme close-up, human proportion scale cinema framing'.",
    inferred_relations: { "contiene": ["plano-general", "plano-americano", "primer-plano", "plano-detalle"], "articula": ["montaje"] }
  },
  "establishing-shot": {
    denomination: "Establishing Shot (Plano de Situación / Establecimiento)",
    synonyms: ["Plano de Situación", "Toma de Establecimiento", "Plano Establecedor"],
    original_def: "Plano abierto o panorámico colocado habitualmente al inicio de una escena o secuencia para contextualizar geográficamente al espectador, informándole dónde transcurrirá la acción, la hora del día, la atmósfera climática y la escala física de los elementos antes de pasar a planos más cerrados.",
    context_of_use: "Apertura de secuencias en ficción, transiciones entre locaciones en series de televisión y cabeceras de reportajes.",
    example: "Plano general crepuscular de la fachada iluminada de un hospital seguido de un corte directo a la sala de emergencias interior.",
    visual_notes: "Vista abierta de la arquitectura o paisaje con iluminación ambiental marcada y ritmo pausado para permitir la lectura del entorno.",
    llm_prompt_guidance: "Palabras clave: 'establishing shot, wide contextual city exterior, atmospheric scene opener, location establishing frame'.",
    inferred_relations: { "es_un_tipo_de": ["plano-general"], "precede_a": ["master-shot", "primer-plano"], "orienta_al": ["storytelling"] }
  },
  "gimbal": {
    denomination: "Gimbal (Estabilizador Motorizado de 3 Ejes)",
    synonyms: ["Estabilizador Electrónico", "Gimbal Motorizado", "3-Axis Motorized Rig"],
    original_def: "Soporte electromecánico equipado con sensores giroscópicos y motores brushless en los tres ejes espaciales (pan, tilt y roll) que compensa activamente las vibraciones, sacudidas y balanceos provocados por el operador al caminar o correr, produciendo movimientos de cámara perfectamente fluidos y flotantes.",
    context_of_use: "Rodajes dinámicos donde se requiere libertad de desplazamiento sin el peso y la infraestructura de rieles de dolly (bodas, documentales, eventos, comerciales urbanos).",
    example: "El operador corre detrás de un atleta en una pista de atletismo sujetando un DJI Ronin RS3 Pro sin que la toma presente trepidaciones bruscas.",
    visual_notes: "Estructura metálica ligera con tres aros motorizados rodeando el cuerpo de la cámara y mango ergonómico con batería.",
    llm_prompt_guidance: "Palabras clave: 'smooth motorized gimbal shot, Ronin stabilized camera movement, floating fluid handheld motion'.",
    inferred_relations: { "es_un_tipo_de": ["soporte-de-camara"], "es_alternativa_a": ["steadicam", "dolly-shot"] }
  },
  "hyperlapse": {
    denomination: "Hyperlapse (Timelapse en Movimiento)",
    synonyms: ["Timelapse Espacial", "Moving Timelapse", "Walklapse"],
    original_def: "Variante avanzada del timelapse en la que la cámara física se desplaza físicamente distancias considerables a lo largo del espacio entre cada disparo fotográfico sucesivo, manteniendo un punto de anclaje visual fijo en el encuadre mediante estabilización técnica y matemática.",
    context_of_use: "Videos de promoción turística, reels de viajes, transiciones estilizadas en videos musicales y apertura de videos corporativos modernos.",
    example: "Recorrido acelerado de 500 metros por una avenida comercial donde los peatones y nubes pasan a toda velocidad mientras un monumento al fondo permanece inmóvil.",
    visual_notes: "Perspectiva de avance rápido hiperfluido con estelas de luz en los vehículos nocturnos y rigurosa estabilidad en el punto focal central.",
    llm_prompt_guidance: "Palabras clave: 'hyperlapse moving camera forward, dynamic high speed urban walklapse, stabilized motion blur timelapse'.",
    inferred_relations: { "es_una_variante_de": ["timelapse"], "combina": ["tracking-shot", "fps-frame-rate"] }
  },
  "live-action": {
    denomination: "Live Action (Imagen Real / Acción Real)",
    synonyms: ["Acción Real", "Filmación con Personas Reales", "Real-World Footage"],
    original_def: "Término empleado para designar la captura audiovisual realizada en el mundo tangible con actores humanos de carne y hueso, escenarios reales o sets físicos iluminados convencionalmente, en contraposición directa a la animación gráfica, los gráficos generados por computadora (CGI) o las simulaciones virtuales.",
    context_of_use: "Delimitación conceptual en producciones mixtas (híbridas) que combinan actores reales con animación o entornos de fantasía digital.",
    example: "Una película que combina actores filmados en live action con un personaje animado en 3D que interactúa con ellos sobre una mesa.",
    visual_notes: "Imagen cinematográfica con texturas orgánicas reales, grano de sensor natural, reflejos físicos auténticos y respiración humana visible.",
    llm_prompt_guidance: "Palabras clave: 'photorealistic live action, real actors authentic set, practical in-camera lighting, tangible organic textures'.",
    inferred_relations: { "se_opone_a": ["animacion-2d-3d", "video-generativo"], "se_integra_con": ["vfx"] }
  },
  "master-shot": {
    denomination: "Master Shot (Plano Maestro)",
    synonyms: ["Toma Maestra", "Master de Escena", "Plano Protector Integral"],
    original_def: "Registro continuo y completo en un solo plano relativamente abierto que abarca la totalidad de una escena dramática de principio a fin, registrando a todos los personajes participantes y sus acciones clave. Sirve como anclaje espacial de referencia y garantiza cobertura de respaldo si falla el montaje de planos cortos.",
    context_of_use: "Primer plano que se rueda al abordar una nueva escena dramática en rodajes tradicionales de cine y televisión.",
    example: "Filmar los 3 minutos de discusión de una pareja alrededor de la mesa del comedor en un plano general antes de acercarse a grabar los planos y contraplanos individuales.",
    visual_notes: "Encuadre amplio y equilibrado donde se visualiza la geografía completa de la habitación, las puertas, ventanas y la posición relativa de ambos actores.",
    llm_prompt_guidance: "Palabras clave: 'master shot scene coverage, continuous wide dramatic take, full room geography camera framing'.",
    inferred_relations: { "articula": ["coverage"], "precede_a": ["over-the-shoulder-shot", "primer-plano"], "facilita": ["raccord"] }
  },
  "motion-capture": {
    denomination: "Motion Capture (Mocap / Captura de Movimiento)",
    synonyms: ["Mocap", "Performance Capture", "Captura de Movimiento Digital"],
    original_def: "Tecnología de registro cinemático que rastrea y digitaliza en tiempo real los movimientos corporales y gesticulaciones de un actor mediante trajes con marcadores reflectantes pasivos o sensores inerciales activos leídos por cámaras infrarrojas, transfiriendo esos datos a un esqueleto digital (rig) de un personaje tridimensional sintético.",
    context_of_use: "Producción de largometrajes con personajes fantásticos digitales fotorrealistas, videojuegos AAA y animación 3D de alta gama.",
    example: "Un actor viste un traje de neopreno con 60 bolitas reflectantes y realiza piruetas marciales para dar vida al monstruo gigante en una película de ciencia ficción.",
    visual_notes: "Plató negro rodeado de 24 cámaras infrarrojas en rig perimetral con el actor vistiendo traje gris y marcadores luminosos en cada articulación.",
    llm_prompt_guidance: "Palabras clave: 'motion capture mocap suit, optical marker tracking volume, digital rig performance capture, character animation mocap'.",
    inferred_relations: { "alimenta": ["animacion-2d-3d", "vfx"], "es_parte_de": ["produccion-virtual"] }
  },
  "noddies": {
    denomination: "Noddies (Planos de Asentimiento del Entrevistador)",
    synonyms: ["Reacciones del Entrevistador", "Cutaway de Escucha", "Reaction Shots"],
    original_def: "Planos cortos de recurso (cutaways) rodados habitualmente tras concluir una entrevista formal, en los que se filma al periodista o entrevistador escuchando en silencio, asintiendo con la cabeza o mostrando atención respetuosa hacia el espacio donde se encontraba el entrevistado.",
    context_of_use: "Periodismo televisivo, documental y videos corporativos testimoniales para disimular cortes en la edición de los parlamentos.",
    example: "El editor inserta un 'noddy' de 2 segundos del periodista asintiendo para cortar una frase repetitiva del entrevistado sin que se perciba un jump cut brusco.",
    visual_notes: "Plano medio o primer plano del entrevistador mirando ligeramente fuera de eje con expresión de escucha atenta y asintiendo despacio.",
    llm_prompt_guidance: "Palabras clave: 'interviewer nodding reaction cutaway, attentive listening reaction shot, documentary cutaway nod'.",
    inferred_relations: { "es_un_tipo_de": ["cutaway"], "evita": ["jump-cut"], "se_utiliza_en": ["a-roll"] }
  },
  "outtake": {
    denomination: "Outtake (Toma Descartada / Blooper)",
    synonyms: ["Toma Descartada", "Blooper", "Material Inédito"],
    original_def: "Registro de rodaje que no se utiliza en el corte final de la obra audiovisual, ya sea por equivocaciones del actor (ataque de risa, olvido de parlamento), fallos técnicos (desenfoque, sombra de boom imprevista) o decisiones editoriales de ritmo narrativo.",
    context_of_use: "Archivo de producción, bobinas de bloopers promocionales para redes sociales o créditos finales de comedia.",
    example: "En la toma 5 el protagonista olvida su texto a mitad de la frase y hace una broma a la cámara; se cataloga como outtake y se aparta del rough cut.",
    visual_notes: "Tomas marcadas con etiqueta roja en el software de edición o carpetas separadas tituladas 'Bloopers / Descartes'.",
    llm_prompt_guidance: "Palabras clave: 'funny film outtake, actor laughing blooper on set, blooper reel cut'.",
    inferred_relations: { "se_opone_a": ["rough-cut"], "deriva_de": ["take"] }
  },
  "over-the-shoulder-shot": {
    denomination: "Over-the-Shoulder Shot (Plano Sobre el Hombro / OTS)",
    synonyms: ["Plano Esgrafiado", "Plano Dorsal", "OTS Shot"],
    original_def: "Encuadre cinematográfico clásico de diálogo donde la cámara enfoca el rostro del sujeto en plano medio mientras incluye en primer término, desenfocado, el hombro y la nuca de su interlocutor, estableciendo con nitidez la distancia física, el eje de miradas y la conexión relacional entre ambos.",
    context_of_use: "Planos y contraplanos en conversaciones dramáticas de cine, televisión y entrevistas de dos personajes.",
    example: "Corte alternado entre planos OTS del detective y del sospechoso a ambos lados de la mesa de interrogatorio, reforzando la tensión entre ellos.",
    visual_notes: "Borde inferior o lateral ocupado por la silueta oscura desenfocada del hombro del interlocutor y el sujeto principal perfectamente nítido en el tercio opuesto.",
    llm_prompt_guidance: "Palabras clave: 'cinematic over-the-shoulder OTS shot, dialogue framing, shallow depth of field shoulder foreground, intense conversation angle'.",
    inferred_relations: { "es_un_tipo_de": ["escala-de-planos"], "respeta": ["raccord"], "se_utiliza_para": ["coverage"] }
  },
  "plano-americano": {
    denomination: "Plano Americano (Plano Tres Cuartos)",
    synonyms: ["Plano Tres Cuartos", "Cowboy Shot", "American Shot"],
    original_def: "Encuadre cinematográfico que corta la figura humana aproximadamente por las rodillas o la mitad superior de los muslos. Nació formalmente en el cine western para permitir ver simultáneamente las expresiones faciales del actor y las cartucheras con las pistolas desenfundables a la cintura.",
    context_of_use: "Escenas dramáticas donde es crucial observar la gesticulación corporal de los brazos y manos junto a la expresión facial y el vestuario.",
    example: "Un orador corporativo exponiendo en un escenario mostrando la postura de sus manos al hablar y el movimiento seguro de sus pasos.",
    visual_notes: "Línea de corte situada justo por encima o debajo de la articulación de la rodilla, nunca cortando directamente sobre la rótula por convención estética.",
    llm_prompt_guidance: "Palabras clave: 'cowboy shot, american shot knee-level cut, mid-thigh cinema framing, dynamic posture framing'.",
    inferred_relations: { "es_un_tipo_de": ["escala-de-planos"], "se_situa_entre": ["plano-general", "primer-plano"] }
  },
  "plano-detalle": {
    denomination: "Plano Detalle (Extreme Close-Up / Insert)",
    synonyms: ["Insert Shot", "Plano de Inserción", "Plano Detallado"],
    original_def: "Encuadre muy cerrado que aísla visualmente un objeto minúsculo o una parte anatómica muy concreta del personaje (los ojos humedecidos, un dedo presionando un detonador, la manecilla de un reloj avanzando), confiriéndole máxima carga dramática o revelando información narrativa decisiva.",
    context_of_use: "Planos de recurso e inserciones dramáticas para dirigir la atención forzosa del espectador hacia una pista clave del relato.",
    example: "Un plano detalle de la pantalla de un teléfono inteligente vibrando con un mensaje anónimo de advertencia.",
    visual_notes: "Profundidad de campo muy reducida (foco crítico) con el objeto ocupando el 90% del encuadre y desenfoque suave anterior y posterior.",
    llm_prompt_guidance: "Palabras clave: 'extreme close-up insert shot, macro cinema lens detail, razor-thin depth of field, dramatic object focus'.",
    inferred_relations: { "es_un_tipo_de": ["escala-de-planos"], "funciona_como": ["cutaway"], "enfatiza": ["narrativa-visual"] }
  },
  "plano-general": {
    denomination: "Plano General (Wide Shot / Long Shot)",
    synonyms: ["Wide Shot", "Plano Abierto", "Plano de Conjunto"],
    original_def: "Encuadre cinematográfico amplio en el que el sujeto humano aparece de cuerpo entero ocupando una fracción moderada del marco, privilegiando la lectura de su interacción física con el entorno arquitectónico o natural circundante.",
    context_of_use: "Presentación de espacios, coreografías grupales, persecuciones y descripción del entorno vital de los personajes.",
    example: "El protagonista caminando solo por un andén desierto de estación ferroviaria a medianoche bajo la luz mortecina de una farola.",
    visual_notes: "Sujeto visible con suficiente aire por encima de la cabeza y por debajo de los pies, con horizonte y elementos de escenografía integrados.",
    llm_prompt_guidance: "Palabras clave: 'cinematic wide shot, full body framing in expansive environment, spatial relationship cinema framing'.",
    inferred_relations: { "es_un_tipo_de": ["escala-de-planos"], "se_combina_con": ["establishing-shot"] }
  },
  "plano-secuencia": {
    denomination: "Plano Secuencia (Long Take)",
    synonyms: ["Long Take", "Toma Única Continua", "Secuencia Sin Cortes"],
    original_def: "Toma cinematográfica continua y de duración considerable que resuelve una escena o secuencia completa sin un solo corte de montaje, coordinando de forma virtuosa el movimiento coreografiado de la cámara con el desplazamiento de los actores y las modulaciones de iluminación.",
    context_of_use: "Momentos culminantes de tensión dramática en largometrajes autorales, comerciales de alta dificultad técnica y aperturas emblemáticas.",
    example: "Una cámara en Steadicam sigue a un chef ingresando por la puerta trasera del restaurante, cruzando la cocina en pleno caos y saliendo al salón principal en un solo plano fluido de 3 minutos.",
    visual_notes: "Transiciones naturales entre planos generales, medios y primeros planos logradas exclusivamente acercando o alejando la cámara físicamente sin cortes.",
    llm_prompt_guidance: "Palabras clave: 'unbroken long take, choreographed continuous plan-sequence, fluid seamless moving camera single take'.",
    inferred_relations: { "prescinde_de": ["montaje"], "requiere": ["steadicam", "gimbal", "raccord"] }
  },
  "primer-plano": {
    denomination: "Primer Plano (Close-Up)",
    synonyms: ["Close-Up (CU)", "Plano Cerrado", "Encuadre de Busto / Rostro"],
    original_def: "Encuadre que abarca la figura humana desde los hombros o la base del cuello hasta la parte superior de la cabeza. Su propósito primordial es transmitir con máxima intimidad las emociones, miradas y sutilezas expresivas del personaje, eliminando casi todo elemento distractor del fondo.",
    context_of_use: "Clímax de diálogos emocionales, testimonios sinceros en documentales y planos de oradores principales en piezas corporativas.",
    example: "El rostro de la protagonista llenando la pantalla mientras sus ojos se llenan de lágrimas al recibir una noticia desgarradora.",
    visual_notes: "Rostro humano centrado o en tercio, con enfoque impecable en el iris del ojo más cercano a la cámara y bokeh suave en el fondo.",
    llm_prompt_guidance: "Palabras clave: 'cinematic close-up portrait, emotional face framing, sharp focus on eyes, 85mm portrait bokeh background'.",
    inferred_relations: { "es_un_tipo_de": ["escala-de-planos"], "se_asocia_con": ["a-roll", "headroom"] }
  },
  "slow-motion": {
    denomination: "Slow Motion (Cámara Lenta Técnica)",
    synonyms: ["Cámara Lenta", "High Frame Rate Shooting", "Ralentí"],
    original_def: "Técnica de grabación cinematográfica a alta tasa de cuadros (60, 120, 240 fps o superior) reproducida al ritmo de base del proyecto (24 o 25 fps) para desacelerar analíticamente el tiempo real. Exige una iluminación fotométrica proporcionalmente mayor debido a que la velocidad de obturación es muy alta (por ejemplo 1/480s a 240 fps según la regla de los 180 grados).",
    context_of_use: "Cinematografía publicitaria de líquidos, planos dramáticos de impacto y análisis de alto rendimiento.",
    example: "Filmación de una tostada cayendo al suelo a 120 fps para transmitir una sensación angustiosa y cómica de inevitabilidad en un comercial.",
    visual_notes: "Fluidez absoluta de cada fotograma individual sin trepidación ni desenfoque sintético generado por interpolación óptica de software.",
    llm_prompt_guidance: "Palabras clave: 'high-speed camera slow motion, crisp 120fps physics action, hyper-smooth deceleration cinematography'.",
    inferred_relations: { "es_equivalente_a": ["camara-lenta"], "depende_de": ["tasa-de-fotogramas", "velocidad-de-obturacion"] }
  },
  "steadicam": {
    denomination: "Steadicam (Estabilizador Mecánico Pasivo)",
    synonyms: ["Estabilizador Inercial", "Chaleco y Brazo Isoelástico", "Steadicam Rig"],
    original_def: "Sistema mecánico de estabilización de cámara inventado por Garrett Brown compuesto por un chaleco acolchado que distribuye el peso sobre el torso del operador, un brazo isoelástico articulado con resortes calibrados y un poste (sled) con gimbal libre de fricción y contrapesos. Aísla mecánicamente los pasos del operador mediante inercia física pura sin motores eléctricos.",
    context_of_use: "Rodaje de planos secuencia complejos, persecuciones por escaleras o terrenos irregulares donde se requiere un movimiento orgánico y fluido con cámaras pesadas de cine.",
    example: "El operador de Steadicam sube corriendo una empinada escalera de caracol siguiendo los talones del actor sin que la toma oscile.",
    visual_notes: "Operador con chaleco y brazo metálico de resortes dobles conectado al mástil inferior con monitor y batería haciendo contrapeso.",
    llm_prompt_guidance: "Palabras clave: 'operator wearing Steadicam sled and vest, smooth organic floating camera move, cinema Steadicam rig'.",
    inferred_relations: { "es_un_tipo_de": ["soporte-de-camara"], "permite": ["plano-secuencia"], "se_compara_con": ["gimbal"] }
  },
  "tilt": {
    denomination: "Tilt (Movimiento Vertical de Cámara)",
    synonyms: ["Tilt Up / Tilt Down", "Basculación Vertical", "Paneo Vertical"],
    original_def: "Movimiento de cámara en el que la cámara permanece fija en su emplazamiento espacial pero gira sobre su eje transversal horizontal, apuntando el objetivo hacia arriba (tilt up) o hacia abajo (tilt down).",
    context_of_use: "Descubrimiento vertical de personajes (de los pies a la cabeza), revelación de edificios monumentales o conexión visual entre dos alturas.",
    example: "Un tilt up que comienza en las botas desgastadas del aventurero y asciende revelando su rostro curtido hasta mostrar la cima de la montaña que se propone escalar.",
    visual_notes: "Rotación suave hacia arriba o abajo en la rótula de fricción fluida del trípode manteniendo el eje de roll perfectamente nivelado a 0°.",
    llm_prompt_guidance: "Palabras clave: 'smooth cinematic tilt up, revealing vertical camera movement, slow tilt down establishing frame'.",
    inferred_relations: { "es_un_tipo_de": ["movimiento-de-camara"], "se_combina_con": ["tracking-shot"] }
  },
  "timelapse": {
    denomination: "Timelapse (Cámara Rápida por Intervalos)",
    synonyms: ["Intervalometría", "Lapso de Tiempo", "Aceleración Temporal"],
    original_def: "Técnica fotográfica y videográfica en la que se capturan imágenes a intervalos temporales regulares mucho más espaciados de lo normal (por ejemplo, una fotografía cada 5 segundos) y luego se reproducen a velocidad estándar (24 fps), provocando la ilusión de que el tiempo transcurre a una velocidad vertiginosa.",
    context_of_use: "Visualización del movimiento de estrellas en el cielo nocturno, tráfico vehicular, floración de plantas y construcción de edificios.",
    example: "La construcción de un rascacielos de 40 pisos resumida en un clip dinámico de 30 segundos grabado durante dos años de trabajo.",
    visual_notes: "Luces de automóviles trazando líneas continuas aceleradas y sombras solares cruzando vertiginosamente las fachadas arquitectónicas.",
    llm_prompt_guidance: "Palabras clave: 'cinematic day-to-night timelapse, moving cloud shadows, fast forward real-world time compression'.",
    inferred_relations: { "se_opone_a": ["camara-lenta", "slow-motion"], "se_desarrolla_en": ["hyperlapse"] }
  },
  "tracking-shot": {
    denomination: "Tracking Shot (Plano de Seguimiento)",
    synonyms: ["Travelling de Seguimiento", "Follow Shot", "Plano en Movimiento"],
    original_def: "Cualquier plano en el que la cámara se desplaza físicamente por el entorno acompañando el movimiento del sujeto (adelante, atrás o paralelamente a él), manteniendo constante la distancia relativa y la composición del encuadre mediante rieles, vehículos, grúas, Steadicam o gimbals.",
    context_of_use: "Secuencias de marcha, paseos dialogados de personajes (walk and talk) y persecuciones enérgicas.",
    example: "Dos médicos caminando rápidamente por los pasillos de un hospital mientras debaten el diagnóstico, con la cámara retrocediendo frente a ellos al mismo compás.",
    visual_notes: "Fondo que se desplaza lateralmente con notable sensación de paralaje y perspectiva tridimensional mientras el sujeto se mantiene estable en el encuadre.",
    llm_prompt_guidance: "Palabras clave: 'dynamic tracking shot, camera moving parallel with subject, walk-and-talk smooth tracking movement'.",
    inferred_relations: { "es_un_tipo_de": ["movimiento-de-camara"], "incluye": ["dolly-shot"] }
  },
  "zoom-in-zoom-out": {
    denomination: "Zoom In / Zoom Out (Zoom Óptico)",
    synonyms: ["Acercamiento Óptico", "Zoom Óptico", "Variación Focal Continua"],
    original_def: "Alteración continua de la distancia focal de un objetivo zoom mientras la cámara permanece fija en su emplazamiento, provocando el acercamiento óptico (zoom in) o alejamiento óptico (zoom out) del sujeto. Modifica la compresión de planos y el campo visual aparente sin alterar la perspectiva espacial ni generar efecto de paralaje.",
    context_of_use: "Transmisiones deportivas en vivo, reportajes de noticias, estética retro de los años 70 y reencuadres rápidos sin cortar la toma.",
    example: "Un rápido zoom in hacia los ojos sorprendidos del personaje (crash zoom / snap zoom) al ver llegar al villano inesperadamente.",
    visual_notes: "El sujeto crece o decrece en el cuadro mientras el fondo se agranda o empequeñece proporcionalmente sin que la cámara se mueva un centímetro del suelo.",
    llm_prompt_guidance: "Palabras clave: 'optical zoom in, crash zoom onto face, 70s cinema snap zoom, variable focal length movement'.",
    inferred_relations: { "se_diferencia_de": ["dolly-shot"], "opera_mediante": ["distancia-focal"] }
  }
};
