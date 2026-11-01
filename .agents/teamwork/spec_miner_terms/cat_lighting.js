module.exports = {
  "backlight": {
    denomination: "Backlight (Luz de Contraluz / Luz de Recorte)",
    synonyms: ["Luz de Recorte", "Rim Light", "Hair Light", "Contraluz"],
    original_def: "Fuente de iluminación ubicada detrás del sujeto y orientada hacia la cámara (habitualmente desde un ángulo elevado y fuera de cuadro) que ilumina los hombros, contornos y cabello del personaje. Crea un fino halo luminoso brillante que separa visualmente al sujeto de fondos oscuros, aportando tridimensionalidad y volumen al encuadre.",
    context_of_use: "Tercer componente del esquema clásico de iluminación de tres puntos en sets de entrevistas, ficción y televisión.",
    example: "Un proyector LED Fresnel suave de 300W colocado en lo alto detrás del entrevistado perfila su silueta separándola limpiamente de la pared azul marina del fondo.",
    visual_notes: "Fina línea luminosa que bordea la cabeza y hombros del sujeto contrastando fuertemente con el fondo oscuro.",
    llm_prompt_guidance: "Palabras clave: 'cinematic rim light, hair backlight separation, crisp edge lighting, rim illumination on subject'.",
    inferred_relations: { "es_parte_de": ["iluminacion-de-tres-puntos"], "se_combina_con": ["key-light"], "separa_del": ["fondo"] }
  },
  "iluminacion-de-tres-puntos": {
    denomination: "Iluminación de Tres Puntos (Three-Point Lighting)",
    synonyms: ["Esquema Clásico de Tres Luces", "Triángulo de Iluminación", "Three-Point Rig"],
    original_def: "Configuración clásica y metodológica fundamental de iluminación cinematográfica compuesta por tres fuentes lumínicas coordinadas: 1) Luz Principal (Key Light), que define la forma y exposición básica; 2) Luz de Relleno (Fill Light), ubicada en el lado opuesto para suavizar las sombras y controlar el contraste; y 3) Luz de Contraluz (Backlight/Rim Light), que perfila al sujeto por detrás para separarlo del fondo.",
    context_of_use: "Estándar de partida para iluminación en estudios de televisión, entrevistas corporativas, retratos dramáticos y fotografía publicitaria.",
    example: "Se emplaza una luz principal a 45° a la izquierda del sujeto, un panel difuso a 45° a la derecha a mitad de potencia para relleno, y un foco cenital posterior para recorte.",
    visual_notes: "Plano de planta cenital mostrando el triángulo de 45° formado por la cámara, las dos luces frontales y el contraluz trasero.",
    llm_prompt_guidance: "Palabras clave: 'three-point lighting setup, key light 45 degrees, soft fill light, rim light backlight, studio portrait lighting'.",
    inferred_relations: { "se_compone_de": ["key-light", "backlight"], "modula": ["intensidad-luminosa", "temperatura-de-color"] }
  },
  "intensidad-luminosa": {
    denomination: "Intensidad Luminosa (Luminancia / Flujo Luminoso)",
    synonyms: ["Potencia Lumínica", "Nivel de Iluminación", "Luminous Intensity"],
    original_def: "Cantidad física de energía luminosa emitida por una fuente de luz o incidente sobre una superficie, cuantificada técnicamente en luxes, candelas o foot-candles. En el set de rodaje se mide con un fotómetro o exposímetro incidente para determinar el contraste lumínico (lighting ratio) entre zonas de luces y sombras.",
    context_of_use: "Calibración fotométrica realizada por el Director de Fotografía y el Gaffer para ajustar las potencias de cada proyector.",
    example: "Medir con fotómetro incidente 800 lux en el rostro del personaje para fijar una relación de contraste 4:1 con respecto a las sombras de 200 lux.",
    visual_notes: "Cúpula difusora blanca del exposímetro Sekonic colocada frente al sujeto apuntando hacia la fuente de luz con lectura digital en Lux o EV.",
    llm_prompt_guidance: "Palabras clave: 'dramatic lighting ratio 4 to 1, high key bright illumination, low key chiaroscuro illumination, measured photometric light'.",
    inferred_relations: { "se_mide_con": ["fotometro"], "influye_en": ["iso", "f-stop"], "es_controlado_por": ["gaffer"] }
  },
  "iso": {
    denomination: "ISO (Sensibilidad del Sensor)",
    synonyms: ["Sensibilidad ISO", "Índice de Exposición (EI)", "Sensor Gain"],
    original_def: "Escala estandarizada internacionalmente que cuantifica la amplificación electrónica de la señal generada por el sensor digital de la cámara ante la luz incidente. Valores bajos (ISO 100-400) entregan máxima fidelidad cromática, menor ruido y mayor rango dinámico; valores elevados (ISO 3200-12800) permiten rodar con luz muy escasa a costa de introducir grano digital (ruido térmico y de cuantificación).",
    context_of_use: "Ajuste básico de cámara adaptado a las condiciones lumínicas de la locación y el look deseado.",
    example: "Fijar la cámara en su ISO Nativo Dual (Base ISO 800 para exteriores de día, Base ISO 3200 para escenas nocturnas en interiores).",
    visual_notes: "Comparativa de fotogramas donde a ISO 100 las sombras son negras y limpias y a ISO 12800 se aprecia un moteado visible de píxeles de color (ruido de crominancia).",
    llm_prompt_guidance: "Palabras clave: 'clean low ISO grain-free image, native ISO 800 film texture, high ISO low-light digital noise'.",
    inferred_relations: { "forma_parte_de": ["triangulo-de-exposicion"], "genera": ["ruido-digital"], "interactua_con": ["velocidad-de-obturacion", "diafragma"] }
  },
  "key-light": {
    denomination: "Key Light (Luz Principal)",
    synonyms: ["Luz Guía", "Luz de Ataque", "Primary Key Light"],
    original_def: "Fuente de luz primaria, dominante y más potente que incide sobre el sujeto en una escena. Establece la dirección aparente de la luz (motivación lumínica), define la exposición base del sujeto y modela el volumen tridimensional del rostro mediante el dibujo característico de sus sombras.",
    context_of_use: "Punto de partida ineludible en el diseño de cualquier esquema de iluminación en rodaje.",
    example: "Un domo difusor Aputure de 120cm con panal (grid) colocado a 45 grados de la entrevistada actuando como luz principal suave y halagadora para la piel.",
    visual_notes: "Sombra suave triangular (iluminación Rembrandt) dibujada bajo la nariz y en la mejilla opuesta del personaje.",
    llm_prompt_guidance: "Palabras clave: 'Rembrandt key light, soft large diffused key light, 45 degree key lighting, dominant cinematic key source'.",
    inferred_relations: { "es_la_base_de": ["iluminacion-de-tres-puntos"], "se_equilibra_con": ["fill-light", "backlight"] }
  },
  "temperatura-de-color": {
    denomination: "Temperatura de Color (Kelvin / CCT)",
    synonyms: ["CCT (Correlated Color Temperature)", "Grados Kelvin", "Cálido / Frío"],
    original_def: "Propiedad física del espectro electromagnético de una fuente de luz cuantificada en grados Kelvin (K), basada en el color de la radiación emitida por un cuerpo negro teórico al calentarse. Valores bajos (2700K - 3200K) corresponden a luces cálidas anaranjadas (fuego, lámparas de tungsteno); valores intermedios (5600K) representan la luz solar blanca neutral (Daylight); y valores altos (6500K - 10000K) corresponden a sombras frías y cielos nublados.",
    context_of_use: "Configuración de luminarias y ajuste de balance de blancos para garantizar tonos de piel precisos o crear contrastes estéticos deliberados.",
    example: "Mezclar una luz principal fría de 5600K que simula luz de luna entrando por la ventana con una lámpara práctica de mesa cálida de 2700K para generar contraste cromático.",
    visual_notes: "Barra de gradiente espectral que va desde el naranja dorado a 2000K pasando por el blanco puro a 5500K hasta el azul cobalto a 9000K.",
    llm_prompt_guidance: "Palabras clave: '5600K daylight balanced light, warm 3200K tungsten interior lighting, cinematic orange and teal color temperature contrast'.",
    inferred_relations: { "calibra_el": ["white-balance"], "se_mide_en": ["kelvin"], "condiciona_el": ["etalonaje-color-grading"] }
  },
  "velocidad-de-obturacion": {
    denomination: "Velocidad de Obturación (Shutter Speed / Shutter Angle)",
    synonyms: ["Tiempo de Exposición", "Shutter Speed (1/s)", "Ángulo de Obturación (180°)"],
    original_def: "Duración de tiempo exacta durante la cual el sensor permanece expuesto a la luz para registrar un único fotograma (por ejemplo, 1/50 de segundo). En cinematografía, la regla estándar de los 180 grados estipula que la velocidad de obturación debe ser exactamente el doble del frame rate (1/48s para 24 fps) para producir un desenfoque de movimiento (motion blur) natural y orgánico para el ojo humano.",
    context_of_use: "Ajuste básico de cámara vinculado al frame rate y a la cantidad de movimiento borroso deseado en la acción.",
    example: "Ajustar la obturación a 1/1000s en una escena de combate para eliminar el motion blur, produciendo un movimiento hipernítido, entrecortado y visceral (efecto 'Salvando al soldado Ryan').",
    visual_notes: "Comparativa entre dos fotogramas de una mano en movimiento: con obturación 1/50s la mano se ve difuminada suavemente; con 1/1000s cada dedo aparece congelado como foto fija.",
    llm_prompt_guidance: "Palabras clave: '180 degree shutter angle motion blur, fast shutter 1/1000s staccato action, natural cinematic motion blur'.",
    inferred_relations: { "forma_parte_de": ["triangulo-de-exposicion"], "depende_de": ["tasa-de-fotogramas", "fps-frame-rate"] }
  },
  "white-balance": {
    denomination: "White Balance (Balance de Blancos)",
    synonyms: ["Equilibrio de Blancos", "Calibración de Blancos", "WB"],
    original_def: "Ajuste electrónico del procesador de cámara mediante el cual se le indica qué temperatura de color específica debe interpretarse como blanco químicamente neutro (R=G=B). Elimina las dominantes de color indeseadas (como tonos amarillentos bajo bombillas incandescentes o azulados en sombra abierta), logrando que los colores y tonos de piel se reproduzcan con fidelidad natural.",
    context_of_use: "Calibración obligatoria previa a la grabación cada vez que cambia la fuente de iluminación o locación.",
    example: "Colocar una carta gris neutro de 18% frente al rostro del actor e iniciar la calibración de balance de blancos personalizado (Custom WB) de la cámara.",
    visual_notes: "Carta de calibración X-Rite ColorChecker con sus parches de blanco, grises y colores primarios sostenida frente al lente.",
    llm_prompt_guidance: "Palabras clave: 'accurate neutral white balance, calibrated skin tones, no unwanted color cast, true color temperature fidelity'.",
    inferred_relations: { "depende_de": ["temperatura-de-color"], "asegura_la": ["fidelidad-cromatica"], "facilita": ["etalonaje-color-grading"] }
  }
};
