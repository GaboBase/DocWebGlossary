module.exports = {
  "composicion": {
    denomination: "Composición (Encuadre Cinematográfico)",
    synonyms: ["Composición Visual", "Diseño de Encuadre", "Frame Composition"],
    original_def: "Organización deliberada y armónica de los elementos visuales (sujetos, líneas de fuerza, volúmenes, luces, sombras y colores) dentro de los límites físicos del marco rectangular de la imagen cinematográfica, guiando la mirada del espectador y comunicando relaciones de jerarquía y emoción.",
    context_of_use: "Decisión constante del director y director de fotografía al emplazar la cámara y disponer la escenografía y los actores.",
    example: "Uso de líneas arquitectónicas convergentes del pasillo para forzar la mirada del espectador directamente hacia la figura solitaria al final del corredor.",
    visual_notes: "Cuadrícula geométrica superpuesta con puntos nodales áureos, líneas diagonales de tensión y equilibrio de pesos visuales laterales.",
    llm_prompt_guidance: "Palabras clave: 'golden ratio cinematic composition, leading lines framing, balanced visual weight, harmonious cinema mise-en-scene'.",
    inferred_relations: { "incorpora": ["regla-de-los-tercios", "headroom"], "se_expresa_en": ["direccion-de-fotografia"] }
  },
  "diafragma": {
    denomination: "Diafragma (Apertura / Iris)",
    synonyms: ["Apertura de Lente", "Iris Mecánico", "Aperture Iris"],
    original_def: "Mecanismo óptico compuesto por un conjunto de láminas metálicas superpuestas ubicado en el interior del objetivo que se abre o cierra para regular la cantidad física de luz que atraviesa el lente y alcanza el sensor o emulsión, controlando de forma directa la profundidad de campo resultante.",
    context_of_use: "Ajuste fundamental de exposición y estética fotográfica en la cámara antes de rodar cualquier plano.",
    example: "Abrir el diafragma a f/1.4 para dejar entrar suficiente luz en una escena nocturna con velas y lograr que sólo los ojos del sujeto queden en foco.",
    visual_notes: "Círculo poligonal de palas metálicas que se ensancha (apertura amplia, ej. f/1.4) o se contrae a un pequeño orificio (apertura cerrada, ej. f/16).",
    llm_prompt_guidance: "Palabras clave: 'wide lens aperture f1.4, shallow depth of field iris, circular bokeh blades, optical diaphragm control'.",
    inferred_relations: { "se_mide_en": ["f-stop"], "determina": ["profundidad-de-campo"], "conforma": ["triangulo-de-exposicion"] }
  },
  "distancia-focal": {
    denomination: "Distancia Focal (Focal Length)",
    synonyms: ["Longitud Focal", "Focal Length (mm)", "Milimetraje Óptico"],
    original_def: "Distancia física medida en milímetros comprendida entre el centro óptico del objetivo (punto nodal posterior) y el plano focal del sensor cuando el lente está enfocado a infinito. Determina el ángulo de visión aparente (campo visual) y el grado de compresión espacial entre los planos de la escena.",
    context_of_use: "Selección del lente idóneo (fijo o zoom) para cada toma según la distancia al sujeto y la estética deseada.",
    example: "Elegir un lente de 85mm para comprimir el fondo detrás del personaje frente a un lente de 24mm que exagera la profundidad y abre el ángulo de visión.",
    visual_notes: "Escala graduada de milímetros (18mm, 35mm, 50mm, 85mm, 135mm) grabada en el anillo metálico exterior del cilindro del lente de cine.",
    llm_prompt_guidance: "Palabras clave: '50mm prime lens perspective, 85mm portrait telephoto compression, 24mm wide angle perspective distortion'.",
    inferred_relations: { "clasifica": ["lente-gran-angular", "lente-telefoto"], "influye_en": ["profundidad-de-campo", "zoom-in-zoom-out"] }
  },
  "f-stop": {
    denomination: "F-stop (Número f / Apertura Numérica)",
    synonyms: ["Número f", "Apertura Relativa", "f-number"],
    original_def: "Cociente adimensional resultante de dividir la distancia focal del objetivo entre el diámetro de la pupila de entrada del diafragma (f = F / D). La progresión geométrica estándar (f/1.4, f/2, f/2.8, f/4, f/5.6, f/8, f/11, f/16) indica que cada salto hacia arriba reduce exactamente a la mitad la luz que entra al sensor.",
    context_of_use: "Parámetro técnico fijado en el anillo de diafragmas de la cámara para calibrar la exposición y la profundidad de campo.",
    example: "Cerrar dos pasos de diafragma de f/2.8 a f/5.6 para que tanto el orador en primer plano como el producto en la mesa detrás queden nítidos.",
    visual_notes: "Escala numérica grabada en el objetivo con valores estandarizados f/1.4, f/2, f/2.8 con marcas para tercios de paso (1/3 stop).",
    llm_prompt_guidance: "Palabras clave: 'aperture f/2.8, sharp focal plane at f/5.6, razor-thin focal slice at f/1.2, calibrated f-stop depth'.",
    inferred_relations: { "es_la_medida_de": ["diafragma"], "condiciona": ["profundidad-de-campo", "intensidad-luminosa"] }
  },
  "focus-peaking": {
    denomination: "Focus Peaking (Resalte de Enfoque)",
    synonyms: ["Ayuda de Enfoque por Contorno", "Asistente de Foco por Borde", "Peaking"],
    original_def: "Herramienta digital de asistencia visual incorporada en monitores de cámara y visores electrónicos (EVF) que detecta las áreas de mayor contraste de alta frecuencia (bordes nítidos) y las resalta en tiempo real con un contorno coloreado brillante (verde, rojo, blanco o azul) para confirmar qué elementos están en foco exacto.",
    context_of_use: "Foco manual durante tomas rápidas con cámara al hombro, gimbals o lentes cinematográficas sin autofoco.",
    example: "El foquista (1st AC) observa cómo las pestañas del actor se tiñen de rojo en el monitor del visor al girar el follow focus, confirmando el foco perfecto.",
    visual_notes: "Bordes del rostro y contornos de vestuario delineados con líneas brillantes en color magenta o cian fluorescente sobre el visor.",
    llm_prompt_guidance: "Palabras clave: 'focus peaking visual aid, high contrast edge highlighting, camera monitor focus assist overlay'.",
    inferred_relations: { "asiste_a": ["profundidad-de-campo"], "es_una_herramienta_de": ["rodaje", "direccion-de-fotografia"] }
  },
  "headroom": {
    denomination: "Headroom (Aire Superior / Margen Superior)",
    synonyms: ["Aire Sobre la Cabeza", "Margen Superior de Encuadre", "Head Space"],
    original_def: "Espacio visual intencional dejado entre el extremo superior de la cabeza del sujeto encuadrado y el borde superior del marco de la imagen. Un headroom adecuado evita la sensación de ahogo o aplastamiento (si es muy escaso) o de vacío compositivo desbalanceado (si es excesivo).",
    context_of_use: "Regla clásica de encuadre en entrevistas, noticieros, ficción dramática y retratos corporativos.",
    example: "Ajustar la inclinación de la cámara para dejar dos dedos de aire entre el cabello del entrevistado y el límite superior de la pantalla de 16:9.",
    visual_notes: "Distancia vertical equilibrada en el tercio superior del encuadre, manteniendo la línea de los ojos en la línea superior de la regla de tercios.",
    llm_prompt_guidance: "Palabras clave: 'proper headroom framing, balanced head space, rule of thirds eye-line composition, professional portrait framing'.",
    inferred_relations: { "es_parte_de": ["composicion"], "se_aplica_en": ["primer-plano", "plano-americano"] }
  },
  "lente-gran-angular": {
    denomination: "Lente Gran Angular (Wide Angle Lens)",
    synonyms: ["Objetivo Gran Angular", "Lente Abierto", "Wide Angle Optics"],
    original_def: "Objetivo óptico cuya distancia focal es significativamente más corta que la diagonal del sensor (típicamente por debajo de 35mm en formato Full Frame de 35mm), ofreciendo un amplio ángulo de visión (más de 60 grados), gran profundidad de campo inherente y una exageración de la perspectiva espacial que aleja los planos de fondo.",
    context_of_use: "Planos generales de paisajes, arquitectura de interiores reducidos, tomas de acción envolventes y planos dinámicos con gimbals.",
    example: "Uso de un lente de 16mm para filmar el interior de un automóvil pequeño, permitiendo abarcar al conductor y al copiloto en el mismo plano.",
    visual_notes: "Perspectiva dinámica con líneas de fuga pronunciadas hacia los bordes y leve distorsión de barril en los extremos del marco.",
    llm_prompt_guidance: "Palabras clave: '16mm wide angle lens, expansive perspective, exaggerated architectural depth, deep depth of field'.",
    inferred_relations: { "es_un_tipo_de": ["distancia-focal"], "se_opone_a": ["lente-telefoto"], "facilita": ["establishing-shot"] }
  },
  "lente-telefoto": {
    denomination: "Lente Telefoto (Telephoto Lens)",
    synonyms: ["Teleobjetivo", "Lente Largo", "Long Lens"],
    original_def: "Objetivo óptico de distancia focal larga (típicamente superior a 70mm o 85mm en formato Full Frame de 35mm) que proporciona un ángulo de visión estrecho, una notable compresión de la distancia espacial aparente entre el sujeto y el fondo, y una profundidad de campo sumamente reducida que aísla al motivo con un pronunciado desenfoque suave (bokeh).",
    context_of_use: "Retratos cinematográficos cerrados, filmación de fauna silvestre, eventos deportivos y planos íntimos rodados a gran distancia.",
    example: "Un lente de 200mm filmando a un personaje caminando por una calle concurrida: los edificios y transeúntes del fondo parecen estar pegados inmediatamente detrás de él.",
    visual_notes: "Sujeto nítido con fondo completamente cremoso y comprimido en capas pictóricas bidimensionales.",
    llm_prompt_guidance: "Palabras clave: '200mm telephoto lens, compressed background perspective, creamy bokeh background separation, cinematic subject isolation'.",
    inferred_relations: { "es_un_tipo_de": ["distancia-focal"], "se_opone_a": ["lente-gran-angular"], "reduce": ["profundidad-de-campo"] }
  },
  "profundidad-de-campo": {
    denomination: "Profundidad de Campo (Depth of Field / DoF)",
    synonyms: ["Depth of Field (DoF)", "Zona de Nitidez Aceptable", "DoF"],
    original_def: "Distancia por delante y por detrás del punto exacto enfocado en la que los elementos de la escena se perciben con nitidez aceptable para el ojo humano. Depende de cuatro variables físicas: la apertura del diafragma (a mayor apertura f/1.4, menor DoF), la distancia focal del lente (a mayor milimetraje, menor DoF), la distancia física al sujeto (más cerca, menor DoF) y el tamaño físico del sensor.",
    context_of_use: "Principal recurso óptico para jerarquizar elementos en la imagen aislando al sujeto del fondo en cine de ficción y comerciales.",
    example: "Lograr una profundidad de campo de apenas 2 centímetros para que solo la pupila del actor esté nítida y el resto del entorno se disuelva en un desenfoque pictórico.",
    visual_notes: "Plano focal nítido con degradación progresiva hacia adelante y atrás hacia discos de confusión desenfocados (bokeh).",
    llm_prompt_guidance: "Palabras clave: 'shallow depth of field, f/1.4 bokeh blur background, razor thin focus plane, subject separation cinema look'.",
    inferred_relations: { "depende_de": ["diafragma", "distancia-focal"], "determina": ["bokeh", "primer-plano"] }
  },
  "regla-de-los-tercios": {
    denomination: "Regla de los Tercios",
    synonyms: ["Cuadrícula de Tercios", "Composición en Tercios", "Rule of Thirds"],
    original_def: "Directriz clásica de composición visual que divide el marco en una cuadrícula imaginaria de 3x3 mediante dos líneas horizontales y dos verticales equidistantes. Establece que ubicar los puntos de interés principal (como los ojos del actor o la línea del horizonte) a lo largo de estas líneas o en sus cuatro intersecciones nodales produce una imagen mucho más dinámica y equilibrada que una composición rígidamente centrada.",
    context_of_use: "Encuadre fundamental enseñado en cinematografía y fotografía para guiar la disposición de personajes y paisajes.",
    example: "Colocar al orador en la línea vertical del tercio derecho, dejando los dos tercios izquierdos abiertos hacia donde dirige su mirada.",
    visual_notes: "Líneas guía punteadas dividiendo la pantalla en 9 rectángulos iguales con cuatro círculos en las intersecciones clave.",
    llm_prompt_guidance: "Palabras clave: 'rule of thirds alignment, offset dynamic framing, subject placed on third line intersection, professional photographic balance'.",
    inferred_relations: { "es_parte_de": ["composicion"], "se_combina_con": ["headroom"] }
  },
  "rolling-shutter": {
    denomination: "Rolling Shutter (Obturador Electrónico Progresivo)",
    synonyms: ["Efecto Gelatina", "Jello Effect", "Obturador Rodante"],
    original_def: "Método de lectura electrónica empleado por la gran mayoría de sensores CMOS modernos en el que la imagen no se captura en un solo instante global simultáneo, sino que se escanea progresivamente línea por línea desde la parte superior hasta la inferior. En movimientos de cámara muy bruscos o giros de hélices, genera distorsiones geométricas características (inclinaciones oblicuas o efecto gelatina).",
    context_of_use: "Consideración técnica al operar cámaras en tomas de acción rápida, montajes en vehículos con vibración o helicópteros.",
    example: "Al pasar rápidamente un tren frente a la cámara, los postes verticales de luz parecen inclinarse en diagonal debido al tiempo de lectura del sensor.",
    visual_notes: "Líneas verticales que se comban como paralelogramos o hélices de avión que adoptan formas curvas distorsionadas en cuadros individuales.",
    llm_prompt_guidance: "Palabras clave: 'rolling shutter artifact, jello effect distortion, horizontal sensor scan line skewing'.",
    inferred_relations: { "es_un_defecto_de": ["sensor-cmos"], "se_opone_a": ["global-shutter"], "afecta": ["velocidad-de-obturacion"] }
  },
  "zebra": {
    denomination: "Zebra (Patrón de Rayas de Cebra)",
    synonyms: ["Líneas de Cebra", "Asistente de Exposición Cebra", "Zebra Stripes"],
    original_def: "Herramienta de monitorización y exposición electrónica que superpone un patrón dinámico de rayas diagonales animadas en blanco y negro sobre las áreas de la imagen que alcanzan o superan un nivel de luminosidad IRE predeterminado (por ejemplo, 70% IRE para calibrar tonos de piel caucásica o 100% IRE para detectar zonas quemadas de sobreexposición irreversible).",
    context_of_use: "Ajuste rápido y seguro de diafragma en rodajes documentales, eventos en vivo y exteriores con luz cambiante.",
    example: "El operador ajusta el anillo de diafragma hasta que el patrón de cebra al 70% apenas empieza a aparecer en los pómulos iluminados del presentador.",
    visual_notes: "Rayas diagonales a 45 grados superpuestas sobre las altas luces en la pantalla LCD de la cámara sin grabarse en el archivo final.",
    llm_prompt_guidance: "Palabras clave: 'zebra stripes exposure overlay, 70 IRE zebra skin tone calibration, camera exposure zebra pattern'.",
    inferred_relations: { "es_una_herramienta_de": ["exposicion"], "previene": ["sobreexposicion"], "se_complementa_con": ["waveform-y-vectorscope"] }
  }
};
