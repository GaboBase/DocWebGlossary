const fs = require('fs');
const path = require('path');

const termsPath = path.join(__dirname, '..', 'AudiovisualProduction', 'data', 'terms.json');
const glossaryPath = path.join(__dirname, '..', 'AudiovisualProduction', 'data', 'glossary.json');

const termsData = JSON.parse(fs.readFileSync(termsPath, 'utf8'));
const glossaryData = JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));

const lostTerms = [
  {
    id: "urn:term:audiovisual-production:claqueta",
    slug: "claqueta",
    title: "Claqueta Cinematográfica (Clapperboard / Slate)",
    category: "camara-movimiento",
    categoryLabel: "Cámara, Encuadre & Movimiento",
    definition: "Dispositivo tradicional o electrónico provisto de una barra articulada que produce un sonido seco y visible (golpe de claqueta) para sincronizar con precisión milimétrica la pista de imagen registrada por la cámara con la pista de audio capturada por la grabadora de sonido independiente (sistema de doble banda). Muestra además metadatos esenciales de rodaje: producción, director, director de fotografía, escena, plano, toma, fecha y código de tiempo SMPTE.",
    shortDefinition: "Dispositivo de rodaje con barra articulada que emite un golpe acústico y visual para sincronizar imagen y sonido de doble banda, registrando metadatos de escena, plano y toma.",
    extendedDefinition: "En rodajes digitales modernos se emplean claquetas inteligentes con pantallas LED sincronizadas mediante código de tiempo inalámbrico (Timecode Slate). El fotograma exacto donde la barra contacta con la base corresponde al pico acústico transitorio en la forma de onda de audio, sirviendo de ancla de sincronización en salas de montaje NLE.",
    fullDefinition: "Herramienta operativa indispensable del rodaje cinematográfico y publicitario que garantiza la identificación normalizada de cada archivo digital y la sincronización de audio y video. Portadora de metadatos estandarizados de claqueta que alimentan los informes de script y el conformado en la suite de edición.",
    components: [
      "Barra articulada de impacto (Clapper sticks con patrón contrastado)",
      "Pizarra de metadatos (Producción, Escena, Plano, Toma, Rollo)",
      "Módulo de código de tiempo LED sincronizado por RF (en claquetas electrónicas)",
      "Generador de tono de sincronismo"
    ],
    applications: [
      "Rodajes cinematográficos con sistema de grabación sonora en doble banda",
      "Sincronización multi-cámara en set y conciertos en vivo",
      "Organización y catalogación de material en ingesta y sóftware NLE"
    ],
    examples: [
      "El segundo asistente de cámara (2nd AC) coloca la claqueta en foco frente al lente, 'canta' escena 14, plano 2, toma 3 y percute la barra antes de la orden de acción."
    ],
    synonyms: ["Clapperboard", "Slate", "Pizarra de rodaje", "Clap"],
    attributes: {
      faseProduccion: "Rodaje",
      categoriaCanon: "Cámara, Encuadre & Movimiento",
      fuenteIndice: "Recuperación Canónica Misión 001"
    },
    relations: [
      { type: "synchronizes_with", target: "urn:term:audiovisual-production:timecode", note: "Sincroniza visualmente la marca temporal con el generador de código SMPTE" },
      { type: "precedes", target: "urn:term:audiovisual-production:sync-sound", note: "La claqueta se acciona para garantizar el sincronismo sonoro de la toma" },
      { type: "usedFor", target: "urn:term:audiovisual-production:montaje", note: "Facilita la sincronización automática y manual en la suite de edición" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Icono semántico representativo del inicio de rodaje y escenas detrás de cámaras en producción cinematográfica.",
      promptTokens: ["wooden clapperboard", "film slate in set", "timecode display", "cinematographer marking take", "movie set clapperboard"],
      negativeTokens: ["digital clock", "smartphone screen", "blurry numbers"],
      modelCompatibility: ["Midjourney v6", "Runway Gen-3", "OpenAI Sora"]
    },
    metadata: {
      source: "mouseinteractivo_canonical_recovery",
      sourceIndex: 201,
      originalTitle: "Claqueta (Clapperboard)"
    }
  },
  {
    id: "urn:term:audiovisual-production:continuidad-cinematografica",
    slug: "continuidad-cinematografica",
    title: "Continuidad Cinematográfica y Raccord (Script Supervisor / Continuity)",
    category: "direccion-narrativa",
    categoryLabel: "Guion, Planificación & Dirección Narrativa",
    definition: "Principio gramatical y metodológico del lenguaje audiovisual que asegura la coherencia lógica, espacial, temporal, cromática y de acción entre planos consecutivos filmados en momentos o días distintos. Supervisado en set por el continuista o script supervisor para evitar saltos perceptivos anómalos en el montaje final.",
    shortDefinition: "Coherencia perceptual, temporal, física y de movimiento entre planos sucesivos rodados en tiempos discontinuos para que formen una unidad dramática fluida.",
    extendedDefinition: "El raccord abarca el raccord de mirada (dirección del ojo del actor), raccord de movimiento (velocidad y sentido de desplazamiento), raccord de vestuario/maquillaje, raccord de iluminación y raccord de sonido ambiente. Su violación involuntaria genera desconexión diegética en el espectador.",
    fullDefinition: "Eje estructurador de la gramática del cine clásico y moderno que permite al espectador percibir un flujo espacio-temporal ininterrumpido a partir de fragmentos discontinuos rodados fuera de orden cronológico. Su registro meticuloso mediante partes de script previene refilmaciones costosas.",
    components: [
      "Raccord de mirada (Eyeline match)",
      "Raccord de movimiento y dirección de pantalla (Screen direction)",
      "Raccord de posición corporal y atrezzo",
      "Raccord lumínico y meteorológico",
      "Partes de script e informes de continuidad"
    ],
    applications: [
      "Dirección y supervisión de script en todo tipo de rodajes de ficción",
      "Montaje invisible y edición narrativa continua",
      "Entrenamiento de modelos generativos de video para evitar metamorfosis de objetos entre tomas"
    ],
    examples: [
      "Asegurar que un actor que sostiene una copa con la mano derecha en el plano general no aparezca con la copa en la izquierda en el plano contraplano siguiente."
    ],
    synonyms: ["Raccord", "Continuity", "Supervisión de script", "Coherencia de raccord"],
    attributes: {
      faseProduccion: "Rodaje / Montaje",
      categoriaCanon: "Guion, Planificación & Dirección Narrativa",
      fuenteIndice: "Recuperación Canónica Misión 001"
    },
    relations: [
      { type: "requires", target: "urn:term:audiovisual-production:regla-180-grados", note: "La regla del eje es el fundamento geométrico de la continuidad espacial" },
      { type: "usedFor", target: "urn:term:audiovisual-production:montaje", note: "Garantiza un corte fluido e imperceptible en la sala de edición" },
      { type: "dependsOn", target: "urn:term:audiovisual-production:guion-tecnico", note: "Monitoreado en rodaje a partir de la planificación del guion técnico" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Directiva crítica para evitar incoherencias físicas y de vestuario en generaciones de video de planos múltiples.",
      promptTokens: ["seamless continuity", "consistent actor wardrobe", "eyeline match", "coherent lighting", "flawless screen direction"],
      negativeTokens: ["teleporting objects", "switching hands", "costume change", "direction flip"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora", "Kling AI"]
    },
    metadata: {
      source: "mouseinteractivo_canonical_recovery",
      sourceIndex: 202,
      originalTitle: "Continuidad / Raccord"
    }
  },
  {
    id: "urn:term:audiovisual-production:regla-180-grados",
    slug: "regla-180-grados",
    title: "Regla de los 180 Grados (180-Degree Rule / Eje de Acción)",
    category: "camara-movimiento",
    categoryLabel: "Cámara, Encuadre & Movimiento",
    definition: "Convención geométrica fundamental del lenguaje cinematográfico que establece una línea imaginaria (eje de acción) entre dos personajes interactuando o a lo largo de la trayectoria de un sujeto. Las cámaras deben posicionarse siempre en un mismo lado del semicírculo de 180° para mantener constante la orientación izquierda/derecha de las miradas y evitar desorientación espacial en el espectador al alternar entre planos.",
    shortDefinition: "Norma geométrica que prohíbe cruzar el eje de acción imaginario entre personajes para mantener constante la dirección de miradas y posiciones espaciales relativas.",
    extendedDefinition: "Cruzar el eje de acción sin un movimiento de cámara visible que lo justifique o sin un plano neutro intermedio (como un plano cenital o plano detalle frontal) produce el llamado 'salto de eje', haciendo que dos interlocutores parezcan mirar en la misma dirección en vez de enfrentarse mutuamente.",
    fullDefinition: "Ley angular de la cinematografía narrativa que prescribe la preservación de la orientación espacial mediante la delimitación de un plano semicircular de 180 grados. Asegura que el personaje situado a la izquierda del encuadre mantenga su mirada hacia la derecha en sus planos individuales y viceversa.",
    components: [
      "Eje de acción imaginario (Action axis vector)",
      "Semicírculo de emplazamiento de cámara (180-degree arc)",
      "Línea de mirada (Eyeline vector)",
      "Recursos de transición de eje (Plano neutro, travelling de cruce)"
    ],
    applications: [
      "Planificación y bloqueo de tiro de cámara en diálogos dramáticos",
      "Dirección de escenas de acción, persecuciones vehiculares y deportes",
      "Composición de secuencias multicámara y videojuegos narrativos"
    ],
    examples: [
      "En una conversación en una mesa de café, mantener las cámaras del plano y contraplano del lado este de la mesa para que el personaje A siempre mire hacia la derecha y el B hacia la izquierda."
    ],
    synonyms: ["Eje de acción", "180-degree rule", "Línea de acción", "Eje cinematográfico"],
    attributes: {
      faseProduccion: "Rodaje / Preproducción",
      categoriaCanon: "Cámara, Encuadre & Movimiento",
      fuenteIndice: "Recuperación Canónica Misión 001"
    },
    relations: [
      { type: "isTypeOf", target: "urn:term:audiovisual-production:angulo-de-camara", note: "Regla de restricción angular para emplazamientos de cámara" },
      { type: "enables", target: "urn:term:audiovisual-production:plano-contraplano", note: "Posibilita la coherencia espacial del sistema plano/contraplano" },
      { type: "requires", target: "urn:term:audiovisual-production:continuidad-cinematografica", note: "Subyace a la continuidad espacial de raccord" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Instrucción de control espacial para prompts de diálogo secuencial en video generativo.",
      promptTokens: ["180-degree rule respected", "consistent eyeline match", "coherent spatial axis", "dialogue coverage", "left-to-right eye gaze"],
      negativeTokens: ["axis jump", "reversed screen direction", "crossed axis disorientation", "looking same direction"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora", "Kling AI", "Midjourney v6"]
    },
    metadata: {
      source: "mouseinteractivo_canonical_recovery",
      sourceIndex: 203,
      originalTitle: "Regla de 180 Grados"
    }
  },
  {
    id: "urn:term:audiovisual-production:plano-contraplano",
    slug: "plano-contraplano",
    title: "Plano y Contraplano (Shot / Reverse Shot)",
    category: "camara-movimiento",
    categoryLabel: "Cámara, Encuadre & Movimiento",
    definition: "Técnica cinematográfica de cobertura y montaje consistente en alternar el encuadre entre dos personajes que dialogan o interactúan, filmando a uno de frente (plano) y luego al otro desde el ángulo complementario inverso (contraplano), habitualmente mediante encuadres sobre el hombro (Over-The-Shoulder / OTS) o primeros planos emparejados en distancia focal y ángulo.",
    shortDefinition: "Técnica de alternancia de tiro de cámara entre dos sujetos enfrentados, respetando el eje de acción y la equivalencia de encuadres y miradas.",
    extendedDefinition: "El plano/contraplano es el bloque constructivo primordial del cine dramático. Requiere rigurosa concordancia de altura de cámara, distancia focal del lente (típicamente 50mm a 85mm para evitar distorsión facial) e iluminación complementaria.",
    fullDefinition: "Estructura sintáctica estándar del cine que yuxtapone tomas alternadas de interlocutores para construir intimidad dramática y dinamismo en conversaciones. Su ejecución rigurosa mantiene la inmersión sin revelar el artificio del rodaje.",
    components: [
      "Plano directo del primer sujeto",
      "Contraplano inverso simétrico del segundo sujeto",
      "Encuadre sobre el hombro (OTS - Over The Shoulder)",
      "Concordancia de plano y escala focal"
    ],
    applications: [
      "Escenas de diálogo dramático, entrevistas corporativas y careos",
      "Narrativa televisiva y series de streaming"
    ],
    examples: [
      "En una confrontación policial, alternar entre el primer plano del detective y el contraplano del sospechoso con lentes de 85mm a f/2.8 para aislar el fondo."
    ],
    synonyms: ["Shot-reverse-shot", "Contraplano", "Campo-contracampo", "Reverse shot"],
    attributes: {
      faseProduccion: "Rodaje / Montaje",
      categoriaCanon: "Cámara, Encuadre & Movimiento",
      fuenteIndice: "Recuperación Canónica Misión 001"
    },
    relations: [
      { type: "dependsOn", target: "urn:term:audiovisual-production:regla-180-grados", note: "Requiere imperativamente respetar la regla de los 180 grados" },
      { type: "composedOf", target: "urn:term:audiovisual-production:primer-plano", note: "Frecuentemente estructurado mediante primeros planos cruzados" },
      { type: "usedFor", target: "urn:term:audiovisual-production:montaje", note: "Patrón clásico de alternancia en sala de montaje" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Estructura clave para secuencias de conversación cinemática en modelos generativos de video.",
      promptTokens: ["shot reverse shot dialogue", "over the shoulder framing", "cinematic conversation", "shallow depth of field portrait", "paired 85mm prime lens"],
      negativeTokens: ["awkward axis crossing", "mismatched lens focal length", "inconsistent head size"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora", "Kling AI"]
    },
    metadata: {
      source: "mouseinteractivo_canonical_recovery",
      sourceIndex: 204,
      originalTitle: "Plano / Contraplano"
    }
  },
  {
    id: "urn:term:audiovisual-production:travelling",
    slug: "travelling",
    title: "Travelling Cinematográfico (Dolly Shot / Tracking Shot)",
    category: "camara-movimiento",
    categoryLabel: "Cámara, Encuadre & Movimiento",
    definition: "Movimiento de cámara en el que el soporte físico completo de la cámara se desplaza por el espacio físico tridimensional, habitualmente montado sobre vías de rieles (dolly tracks), ruedas neumáticas o vehículos motorizados. A diferencia del paneo (que solo rota sobre su propio eje), el travelling altera dinámicamente las relaciones de perspectiva y paralaje entre los objetos en primer término y el fondo.",
    shortDefinition: "Desplazamiento físico y continuo de la cámara sobre rieles o ruedas que modifica dinámicamente la perspectiva y el efecto de paralaje visual.",
    extendedDefinition: "Se clasifican según su dirección: travelling in (acercamiento psicológico), travelling out (distanciamiento / revelación de contexto), travelling lateral (acompañamiento de desplazamiento del sujeto) y travelling circular (órbita envolvente alrededor de los personajes).",
    fullDefinition: "Técnica cinética mayor del cine que introduce tridimensionalidad y volumen mediante la traslación continua del punto de vista. El cambio en la velocidad relativa de desplazamiento de los planos espaciales (paralaje) produce una inmersión visual superior a la de un zoom óptico.",
    components: [
      "Vías de rieles o piso nivelado (Dolly tracks)",
      "Carro de travelling con operador y foquista (Dolly cart)",
      "Columna telescópica hidráulica o brazo de jib",
      "Control de arrastre y freno de precisión"
    ],
    applications: [
      "Acompañamiento fluido de personajes en movimiento por pasillos o exteriores",
      "Revelación progresiva de elementos escenográficos o giros argumentales",
      "Generación de tensión dramática mediante acercamiento lento a velocidad constante"
    ],
    examples: [
      "Un travelling in lento hacia el rostro de un protagonista en el momento exacto en que descubre la pista crucial del misterio."
    ],
    synonyms: ["Dolly shot", "Tracking shot", "Travelling in", "Travelling out", "Cámara sobre rieles"],
    attributes: {
      faseProduccion: "Rodaje",
      categoriaCanon: "Cámara, Encuadre & Movimiento",
      fuenteIndice: "Recuperación Canónica Misión 001"
    },
    relations: [
      { type: "isTypeOf", target: "urn:term:audiovisual-production:dolly-shot", note: "Variante especializada de traslación cinemática sobre dolly" },
      { type: "differentiatesFrom", target: "urn:term:audiovisual-production:paneo", note: "El travelling traslada la posición en el espacio, mientras que el paneo solo rota sobre su propio eje" },
      { type: "relatesTo", target: "urn:term:audiovisual-production:tracking-shot", note: "Comparte principios dinámicos de encuadre en movimiento" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Instrucción de vector de cámara fundamental para video generativo con movimiento espacial fluido.",
      promptTokens: ["smooth tracking shot", "dolly in cinematic camera vector", "motion parallax", "fluid forward push in", "mechanical rail camera move"],
      negativeTokens: ["handheld jitter", "optical zoom distortion", "static frame", "steppy motion"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora", "Kling AI", "Luma Dream Machine"]
    },
    metadata: {
      source: "mouseinteractivo_canonical_recovery",
      sourceIndex: 205,
      originalTitle: "Travelling (Tracking Shot)"
    }
  },
  {
    id: "urn:term:audiovisual-production:paneo",
    slug: "paneo",
    title: "Paneo o Panorámica Horizontal (Pan Shot / Panning)",
    category: "camara-movimiento",
    categoryLabel: "Cámara, Encuadre & Movimiento",
    definition: "Movimiento de cámara en el que el cuerpo del equipo rota horizontalmente de izquierda a derecha (pan right) o de derecha a izquierda (pan left) sobre su propio eje vertical, manteniéndose el trípode o soporte en una posición espacial fija. Utilizado para describir paisajes amplios, seguir la trayectoria de un sujeto o conectar dos centros de atención dramática.",
    shortDefinition: "Rotación horizontal de la cámara sobre su eje vertical desde un punto fijo para explorar el entorno o seguir el movimiento de un personaje.",
    extendedDefinition: "Para evitar el efecto de estroboscópico o judder en cinematografía a 24 fps, la velocidad del paneo debe calcularse según la distancia focal del lente y el ángulo de obturación (regla de los 5 segundos por ancho de pantalla en lentes normales). El 'whip pan' o barrido rápido se utiliza como técnica de transición dinámica.",
    fullDefinition: "Movimiento rotacional básico de la cámara sobre su rótula fluida de trípode. Su ejecución requiere control milimétrico de la fricción hidráulica para asegurar aceleración y frenado suaves.",
    components: [
      "Rótula fluida de trípode con control de fricción panorámica (Fluid pan head)",
      "Brazo telescópico de paneo",
      "Nivel de burbuja calibrado para eje horizontal puro"
    ],
    applications: [
      "Presentación panorámica de localizaciones escénicas y paisajes",
      "Seguimiento visual de personajes caminando o vehículos en desplazamiento",
      "Transiciones de barrido rápido (Whip pan) entre escenas"
    ],
    examples: [
      "La cámara realiza una suave panorámica horizontal de izquierda a derecha para revelar un campamento oculto tras una colina rocosa."
    ],
    synonyms: ["Pan", "Panorámica", "Pan shot", "Panning", "Barrido"],
    attributes: {
      faseProduccion: "Rodaje",
      categoriaCanon: "Cámara, Encuadre & Movimiento",
      fuenteIndice: "Recuperación Canónica Misión 001"
    },
    relations: [
      { type: "isTypeOf", target: "urn:term:audiovisual-production:angulo-de-camara", note: "Movimiento angular sobre el eje vertical" },
      { type: "differentiatesFrom", target: "urn:term:audiovisual-production:tilt", note: "El paneo rota en el plano horizontal, mientras que el tilt rota en el plano vertical" },
      { type: "usedFor", target: "urn:term:audiovisual-production:transicion", note: "En su variante whip pan funciona como corte de transición por velocidad" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Comando de dirección de cámara básico para barridos de paisaje y seguimiento en IA de video.",
      promptTokens: ["smooth camera pan right", "horizontal panning shot", "fluid head tripod pan", "panoramic reveal", "steady horizontal rotation"],
      negativeTokens: ["vertical tilt", "camera shake", "forward zoom", "erratic movement"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora", "Kling AI", "Luma Dream Machine"]
    },
    metadata: {
      source: "mouseinteractivo_canonical_recovery",
      sourceIndex: 206,
      originalTitle: "Paneo (Pan)"
    }
  },
  {
    id: "urn:term:audiovisual-production:rack-focus",
    slug: "rack-focus",
    title: "Cambio de Foco Selectivo (Rack Focus / Focus Pull)",
    category: "optica-lentes",
    categoryLabel: "Óptica, Enfoque & Composición",
    definition: "Técnica óptica y narrativa en la que el foquista (1st AC) desplaza deliberadamente el plano focal del lente desde un sujeto en primer término hacia otro situado en segundo término (o viceversa) durante una misma toma continua, valiéndose de una profundidad de campo reducida. Guía la atención cognitiva del espectador de un personaje o pista hacia otro sin necesidad de cortar la toma.",
    shortDefinition: "Transición óptica suave que traslada el punto de foco nítido entre dos planos de profundidad distintos dentro de una misma toma continua.",
    extendedDefinition: "Requiere lentes de alta gama con mínima aberración de respiración de foco (focus breathing) para evitar que el tamaño del encuadre cambie visiblemente al girar el anillo de enfoque. Se ejecuta con mandos de foco manuales o sistemas inalámbricos de control remoto (Wireless Follow Focus).",
    fullDefinition: "Dispositivo cinematográfico fundamental que opera como sustituto del corte de montaje dentro del plano. Al desdibujar el primer término y enfocar el fondo (o viceversa), reconfigura la jerarquía de significado de la imagen en tiempo real.",
    components: [
      "Mecanismo de control de foco (Follow Focus manual o inalámbrico)",
      "Marcas de distancia calibradas en anillo de lente (Focus rings en pies o metros)",
      "Óptica de cine con supresión de respiración de foco (Zero breathing cine prime)",
      "Monitor de foco con visualización de peaking o mapa de distancias LiDAR"
    ],
    applications: [
      "Revelación de reacciones emocionales en personajes situados a diferentes profundidades",
      "Descubrimiento de amenazas, objetos o giros narrativos en el fondo del encuadre",
      "Dirección de la mirada en planos secuencia de diálogo complejo"
    ],
    examples: [
      "El arma sobre la mesa en primer plano está nítida mientras la puerta al fondo está desenfocada; cuando la puerta se abre, el foquista traslada el foco hacia el intruso, desenfocando el arma."
    ],
    synonyms: ["Focus pull", "Paso de foco", "Cambio de foco", "Rack focus"],
    attributes: {
      faseProduccion: "Rodaje",
      categoriaCanon: "Óptica, Enfoque & Composición",
      fuenteIndice: "Recuperación Canónica Misión 001"
    },
    relations: [
      { type: "dependsOn", target: "urn:term:audiovisual-production:profundidad-de-campo", note: "Requiere una profundidad de campo reducida para un efecto visible" },
      { type: "requires", target: "urn:term:audiovisual-production:diafragma", note: "Diafragmas abiertos (f/1.4 - f/2.8) maximizan el contraste focal" },
      { type: "usedFor", target: "urn:term:audiovisual-production:narrativa-visual", note: "Orienta selectivamente la atención del espectador en el cuadro" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Instrucción óptica avanzada para emular transiciones de atención focal en video generativo.",
      promptTokens: ["rack focus transition", "smooth focus pull from foreground to background", "cinematic shallow depth of field", "bokeh blur shift", "85mm prime lens focus pull"],
      negativeTokens: ["deep focus", "everything in focus", "sharp background and foreground simultaneously", "harsh focus jump"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora", "Kling AI", "Luma Dream Machine"]
    },
    metadata: {
      source: "mouseinteractivo_canonical_recovery",
      sourceIndex: 207,
      originalTitle: "Rack Focus / Focus Pull"
    }
  },
  {
    id: "urn:term:audiovisual-production:luz-de-relleno-fill-light",
    slug: "luz-de-relleno-fill-light",
    title: "Luz de Relleno (Fill Light)",
    category: "iluminacion",
    categoryLabel: "Iluminación, Exposición & Grip",
    definition: "Fuente lumínica secundaria en el esquema clásico de tres puntos, situada habitualmente en el lado opuesto de la cámara respecto a la luz principal (key light). Su función es atenuar y suavizar las sombras pronunciadas generadas por la luz principal, controlando el ratio de contraste general de la escena sin proyectar sombras secundarias conflictivas ni alterar la dirección primaria de iluminación.",
    shortDefinition: "Fuente de luz difusa orientada a suavizar las sombras producidas por la luz principal, determinando el ratio de contraste dramático de la escena.",
    extendedDefinition: "La intensidad de la luz de relleno define el estilo de la imagen: un ratio 2:1 o 3:1 produce un look brillante comercial (high-key), mientras que un ratio 8:1 o superior genera un marcado claroscuro dramático o tenebrista (low-key). Puede provenir de luminarias suaves, paneles LED difusos o simples pantallas reflectoras blancas/plateadas.",
    fullDefinition: "Elemento modulador del volumen lumínico en el set cinematográfico. Al elevar el piso de luminancia en las zonas no impactadas directamente por la luz principal, garantiza que los detalles de penumbra se mantengan dentro del rango dinámico del sensor digital o del negativo fotográfico.",
    components: [
      "Fuente de luz difusa (Paneles LED difusores, softboxes, chimera)",
      "Superficies reflectoras pasivas (Polyboards, telas blancas, reflectores flex)",
      "Control de atenuación (Dimmers, redes de scrims)",
      "Moduladores de dispersión (Grid / panal de abeja)"
    ],
    applications: [
      "Iluminación de retrato y diálogos en ficción y entrevistas",
      "Control de latitud y prevención de sombras empastadas en el sensor",
      "Creación de atmósferas visuales mediante la graduación del contraste"
    ],
    examples: [
      "Colocar un panel de rebote blanco de 2x1 metros en el lateral derecho del actor para devolver el 30% de la luz principal y revelar el detalle de su ojo en sombra."
    ],
    synonyms: ["Fill light", "Luz de relleno", "Luz secundaria", "Rebote de relleno"],
    attributes: {
      faseProduccion: "Rodaje",
      categoriaCanon: "Iluminación, Exposición & Grip",
      fuenteIndice: "Recuperación Canónica Misión 001"
    },
    relations: [
      { type: "isPartOf", target: "urn:term:audiovisual-production:iluminacion-de-tres-puntos", note: "Componente esencial del esquema clásico junto a la luz principal y el contraluz" },
      { type: "complements", target: "urn:term:audiovisual-production:key-light", note: "Equilibra y suaviza las sombras proyectadas por la luz principal" },
      { type: "relatesTo", target: "urn:term:audiovisual-production:dynamic-range-latitude", note: "Permite contener las sombras dentro del rango dinámico capturable" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Parámetro de iluminación fundamental para modular sombras duras o suaves en render e IA de imagen.",
      promptTokens: ["soft fill lighting", "controlled shadow contrast ratio", "three-point lighting setup", "diffused ambient fill", "balanced skin tones"],
      negativeTokens: ["harsh pitch black shadows", "uncontrolled contrast", "flat wash lighting", "double shadows"],
      modelCompatibility: ["Midjourney v6", "Flux.1", "Runway Gen-3", "OpenAI Sora"]
    },
    metadata: {
      source: "mouseinteractivo_canonical_recovery",
      sourceIndex: 208,
      originalTitle: "Luz de Relleno (Fill Light)"
    }
  },
  {
    id: "urn:term:audiovisual-production:temperatura-de-color-kelvin",
    slug: "temperatura-de-color-kelvin",
    title: "Temperatura de Color y Escala Kelvin (Color Temperature / Kelvin Scale)",
    category: "iluminacion",
    categoryLabel: "Iluminación, Exposición & Grip",
    definition: "Medida física expresada en grados Kelvin (K) que describe la tonalidad espectral cromática de una fuente de luz visible, basada en el calentamiento de un cuerpo negro emisor teórico. Los valores bajos (2000K - 3200K) corresponden a luces cálidas ámbar/tungsteno, mientras que los valores altos (5600K - 7000K) representan la luz fría de día (Daylight) o cielos nublados.",
    shortDefinition: "Escala física en grados Kelvin que clasifica la calidez o frialdad espectral de la luz, desde tonos cálidos de tungsteno (3200K) hasta luz día fría (5600K).",
    extendedDefinition: "En el rodaje cinematográfico digital, la concordancia entre la temperatura de color de las luminarias y el balance de blancos programado en el sensor de cámara evita dominantes cromáticas indeseadas y preserva la fidelidad tonal de las pieles en el espacio de color de trabajo.",
    fullDefinition: "Propiedad fotométrica cardinal para la cinematografía y la colorimetría. La mezcla intencionada de fuentes con distintas temperaturas de color (como un interior de tungsteno a 3200K con luz de ventana de 5600K) se utiliza para crear contraste cromático dramático y profundidad visual.",
    components: [
      "Escala termodinámica de Kelvin (1800K a 10000K)",
      "Estándar Tungsteno (3200K para interiores clásicos)",
      "Estándar Daylight (5600K para exteriores día DCI/SMPTE)",
      "Filtros de conversión cromática CTO (Color Temperature Orange) y CTB (Color Temperature Blue)"
    ],
    applications: [
      "Calibración de balance de blancos en sensores de cámara digital",
      "Mezcla de fuentes de luz mixtas en set cinematográfico",
      "Modelado de paleta de color dramática en preproducción y etalonaje"
    ],
    examples: [
      "Ajustar las luminarias LED de set a 3200K con filtros CTO suaves para recrear el resplandor íntimo del fuego de una chimenea en una escena nocturna."
    ],
    synonyms: ["Kelvin", "Color temperature", "Grados Kelvin", "Temperatura de color"],
    attributes: {
      faseProduccion: "Rodaje / Etalonaje",
      categoriaCanon: "Iluminación, Exposición & Grip",
      fuenteIndice: "Recuperación Canónica Misión 001"
    },
    relations: [
      { type: "regulates", target: "urn:term:audiovisual-production:balance-de-blancos-white-balance", note: "Determina el punto blanco de referencia para la calibración del sensor" },
      { type: "influences", target: "urn:term:audiovisual-production:etalonaje-color-grading", note: "Condiciona las decisiones cromáticas de la imagen en postproducción" },
      { type: "usedFor", target: "urn:term:audiovisual-production:iluminacion-de-tres-puntos", note: "Eje de selección y concordancia de temperatura cromática en luminarias" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Parámetro crítico para controlar la paleta cálida o fría en modelos de render y generación multimodal.",
      promptTokens: ["3200K warm tungsten lighting", "5600K crisp daylight", "calibrated color temperature", "golden hour 2800K glow", "cinematic dual color temperature"],
      negativeTokens: ["uncalibrated green tint", "clashing white balance", "muddy color cast"],
      modelCompatibility: ["Midjourney v6", "Flux.1", "Runway Gen-3", "OpenAI Sora"]
    },
    metadata: {
      source: "mouseinteractivo_canonical_recovery",
      sourceIndex: 209,
      originalTitle: "Temperatura de Color (Kelvin)"
    }
  },
  {
    id: "urn:term:audiovisual-production:balance-de-blancos-white-balance",
    slug: "balance-de-blancos-white-balance",
    title: "Balance de Blancos (White Balance / WB)",
    category: "camara-movimiento",
    categoryLabel: "Cámara, Encuadre & Movimiento",
    definition: "Ajuste electrónico del procesador de imagen de la cámara que calibra las ganancias relativas de los canales rojo, verde y azul (RGB) para que una superficie blanca o gris neutra iluminada por una fuente lumínica específica se registre con valores cromáticos equilibrados ($R=G=B$), eliminando dominantes o tintes de color indeseados producidos por la temperatura de color de la luz.",
    shortDefinition: "Calibración del sensor de cámara que neutraliza las dominantes de color causadas por la fuente de luz para que los blancos y tonos de piel se reproduzcan fieles.",
    extendedDefinition: "Al rodar en formatos comprimidos (ProRes, H.264), el balance de blancos queda fijado en los píxeles (baked in), por lo que un error es difícil de corregir sin degradar la señal. Al rodar en formatos RAW (CinemaDNG, REDCODE RAW, ARRI RAW), el balance de blancos es un metadato no destructivo ajustable libremente en postproducción.",
    fullDefinition: "Proceso electroóptico fundamental en la captación de imágenes digitales que establece el punto neutro de referencia espectral en concordancia con la iluminación de la escena. Su ajuste preciso garantiza la representación fidedigna de los tonos de piel humanos (skintones) sobre la línea de vectorscopio.",
    components: [
      "Canales de ganancia cromática analógica y digital (Red, Green, Blue gains)",
      "Carta de gris neutro del 18% (Neutral 18% Grey Card) o carta de color",
      "Compensación de tinte verde/magenta (Tint / CC Offset)",
      "Metadatos de balance de blancos en archivos RAW"
    ],
    applications: [
      "Calibración de cámara previa al rodaje bajo luz de tungsteno, fluorescente o exterior día",
      "Preservación de tonos de piel naturales en retratos cinematográficos",
      "Consistencia colorimétrica entre distintas cámaras en rodajes multicámara"
    ],
    examples: [
      "Colocar una carta de gris al 18% frente al actor bajo el sol directo y realizar un balance de blancos personalizado a 5600K con tinte cero en la cámara digital."
    ],
    synonyms: ["White balance", "WB", "Balance de blanco", "Calibración de punto blanco"],
    attributes: {
      faseProduccion: "Rodaje",
      categoriaCanon: "Cámara, Encuadre & Movimiento",
      fuenteIndice: "Recuperación Canónica Misión 001"
    },
    relations: [
      { type: "dependsOn", target: "urn:term:audiovisual-production:temperatura-de-color-kelvin", note: "Se ajusta en correspondencia exacta con la temperatura de color ambiental" },
      { type: "controls", target: "urn:term:audiovisual-production:etalonaje-color-grading", note: "Proporciona la base neutra indispensable para el posterior etalonaje creativo" },
      { type: "appliesTo", target: "urn:term:video-image:bayer-filter", note: "Modifica la amplificación y balance de la matriz Bayer en el sensor" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Instrucción de neutralidad cromática para evitar sesgos de tinte no deseados en imágenes y video IA.",
      promptTokens: ["accurate white balance", "true neutral gray calibration", "natural skin tones", "flawless color fidelity", "color chart balanced"],
      negativeTokens: ["color cast", "yellow tint", "greenish skin", "cyan spill", "miscalibrated white balance"],
      modelCompatibility: ["Midjourney v6", "Flux.1", "Runway Gen-3", "OpenAI Sora"]
    },
    metadata: {
      source: "mouseinteractivo_canonical_recovery",
      sourceIndex: 210,
      originalTitle: "Balance de Blancos (White Balance)"
    }
  },
  {
    id: "urn:term:audiovisual-production:microfono-shotgun-canon",
    slug: "microfono-shotgun-canon",
    title: "Micrófono de Cañón o Shotgun (Shotgun Microphone / Boom Mic)",
    category: "audio-directo",
    categoryLabel: "Captura de Audio, Microfonía & Acústica",
    definition: "Micrófono acústico direccional de condensador que utiliza un tubo de interferencia ranurado frente a la cápsula para lograr un patrón polar hipercardioide o lobular sumamente estrecho. Las ondas sonoras frontales ingresan en fase y se suman con claridad, mientras que los sonidos laterales e incidentes sufren cancelación por desfase destructivo a lo largo del tubo, permitiendo capturar diálogos nítidos a cierta distancia del actor montado sobre una pértiga (boom pole).",
    shortDefinition: "Micrófono altamente direccional con tubo de interferencia que aísla diálogos frontales atenuando ruidos laterales indeseados en el set.",
    extendedDefinition: "Es la herramienta estándar del sonidista de cine y TV para captar sonido directo sin que el micrófono entre en el encuadre. Requiere protección contra el viento mediante suspensión elástica antivibratoria, antiviento de pelo (deadcat / zeppelin) y operadores de boom entrenados para mantener la cápsula apuntada a la boca del intérprete.",
    fullDefinition: "Transductor electroacústico especializado para el registro de sonido directo en producción cinematográfica y broadcast. Su arquitectura física aprovecha la física de interferencia acústica para maximizar la relación señal/ruido del diálogo respecto a la reverberación del recinto.",
    components: [
      "Tubo de interferencia acústico con ranuras canceladoras de fase",
      "Cápsula de condensador con diafragma de alta sensibilidad",
      "Suspensión elástica antigolpes (Pistol grip / Shockmount)",
      "Sistema de protección contra ráfagas de viento (Zeppelin / Windjammer)",
      "Pértiga telescópica de fibra de carbono (Boom pole)"
    ],
    applications: [
      "Grabación de diálogos principales en set de rodaje y exteriores",
      "Producción de documentales, reportajes televisivos y sonido ENG",
      "Captura de efectos sonoros y foley en entornos controlados"
    ],
    examples: [
      "El microfonista sostiene el boom a 45 grados por encima de la cabeza de la actriz, situando el shotgun a 40 centímetros fuera del borde superior del encuadre."
    ],
    synonyms: ["Shotgun mic", "Micrófono de cañón", "Boom mic", "Micrófono de interferencia"],
    attributes: {
      faseProduccion: "Rodaje",
      categoriaCanon: "Captura de Audio, Microfonía & Acústica",
      fuenteIndice: "Recuperación Canónica Misión 001"
    },
    relations: [
      { type: "isTypeOf", target: "urn:term:audiovisual-production:audio-directo", note: "Transductor electroacústico primordial para audio directo" },
      { type: "complements", target: "urn:term:audiovisual-production:lavalier", note: "Se combina con micrófonos inalámbricos de solapa para respaldo en rodaje" },
      { type: "produces", target: "urn:term:audiovisual-production:sync-sound", note: "Genera el registro sonoro síncrono principal en set" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Elemento de utilería y producción para escenas de rodaje de cine o diseño de sonido.",
      promptTokens: ["shotgun microphone on boom pole", "boom operator on set", "audio recording gear", "sound blimp zeppelin", "high end audio capture"],
      negativeTokens: ["mic visible in cinematic shot", "tinny sound", "distorted audio"],
      modelCompatibility: ["Midjourney v6", "Runway Gen-3"]
    },
    metadata: {
      source: "mouseinteractivo_canonical_recovery",
      sourceIndex: 211,
      originalTitle: "Micrófono de Cañón (Shotgun Mic)"
    }
  },
  {
    id: "urn:term:audiovisual-production:contenedor-mxf-material-exchange-format",
    slug: "contenedor-mxf-material-exchange-format",
    title: "Contenedor MXF (Material Exchange Format / SMPTE 377M)",
    category: "distribucion-formatos",
    categoryLabel: "Masterización, Entrega & Formatos de Exportación",
    definition: "Formato contenedor de archivos multimedia estandarizado por SMPTE (norma SMPTE 377M) diseñado específicamente para el intercambio profesional de esencia de video, audio multicanal y ricos metadatos descriptivos, estructurales y temporales entre diferentes sistemas de producción, cámaras de broadcast (Sony XDCAM, Panasonic P2, Canon XF) y suites de postproducción no lineal (NLE).",
    shortDefinition: "Estándar profesional abierto SMPTE para encapsular video, audio multicanal no comprimido y metadatos completos para broadcast y cine digital.",
    extendedDefinition: "A diferencia de contenedores comerciales orientados al usuario final como MP4 o MKV, el archivo MXF preserva código de tiempo ininterrumpido en cada cuadro, múltiples pistas de audio aisladas sin mezclar (stems de 24 bits a 48 kHz), información de sensor y perfiles operativos como OP1a (archivo único con video y audio entrelazados) u OP-Atom (pistas separadas en archivos individuales, empleado en Avid).",
    fullDefinition: "Infraestructura de encapsulamiento digital universal en la industria broadcast y del cine profesional. Es el estándar obligatorio de entrega para paquetes de cine digital (DCP), paquetes de masterizado interoperable (IMF) y transmisiones de cadenas de televisión internacionales.",
    components: [
      "Header Partition con metadatos descriptivos y diccionario estructural",
      "Essence Containers (Flujos de video ProRes, DNxHD/HR, AVC-Intra o JPEG2000 y audio PCM)",
      "Pista de código de tiempo SMPTE continua",
      "Footer Partition con tabla de índices de fotogramas para acceso aleatorio rápido"
    ],
    applications: [
      "Grabación interna de cámaras de cine digital y broadcast profesional",
      "Flujos de trabajo colaborativos en suites Avid Media Composer y DaVinci Resolve",
      "Generación de paquetes DCP para salas comerciales y másteres IMF para plataformas de streaming (Netflix, HBO, Amazon)"
    ],
    examples: [
      "Exportar el master final de un largometraje documental en contenedor MXF OP1a codificado en Apple ProRes 422 HQ con 8 canales discretos de audio envolvente 5.1 más mezcla estéreo."
    ],
    synonyms: ["MXF", "Material Exchange Format", "SMPTE 377M", "MXF OP1a", "MXF OP-Atom"],
    attributes: {
      faseProduccion: "Postproducción / Masterización",
      categoriaCanon: "Masterización, Entrega & Formatos de Exportación",
      fuenteIndice: "Recuperación Canónica Misión 001"
    },
    relations: [
      { type: "isTypeOf", target: "urn:term:audiovisual-production:contenedor", note: "Contenedor digital profesional estandarizado por SMPTE" },
      { type: "contains", target: "urn:term:audiovisual-production:prores-h-264-h-265", note: "Encapsula flujos de compresión ProRes y DNxHR para masterización" },
      { type: "usedFor", target: "urn:term:audiovisual-production:master", note: "Contenedor estándar para entrega de archivos maestros de difusión" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Parámetro técnico de exportación profesional para pipelines de entrega broadcast.",
      promptTokens: ["MXF OP1a container", "broadcast master file", "uncompressed multi-channel audio", "SMPTE standardized delivery"],
      negativeTokens: ["compressed MP4", "lossy web video", "baked stereo"],
      modelCompatibility: ["Technical Workflow Engines"]
    },
    metadata: {
      source: "mouseinteractivo_canonical_recovery",
      sourceIndex: 212,
      originalTitle: "Contenedor MXF (SMPTE 377M)"
    }
  }
];

// Actualizar o agregar términos
let added = 0;
let updated = 0;
lostTerms.forEach(term => {
  const idx = termsData.canonicalTerms.findIndex(t => t.id === term.id);
  if (idx !== -1) {
    termsData.canonicalTerms[idx] = term;
    updated++;
  } else {
    termsData.canonicalTerms.push(term);
    added++;
  }
});

glossaryData.termCount = termsData.canonicalTerms.length;

fs.writeFileSync(termsPath, JSON.stringify(termsData, null, 2), 'utf8');
fs.writeFileSync(glossaryPath, JSON.stringify(glossaryData, null, 2), 'utf8');

console.log(`Reincorporación completada. Se añadieron ${added} términos y se actualizaron ${updated}.`);
console.log(`Nuevo total en AudiovisualProduction: ${termsData.canonicalTerms.length} términos.`);
