module.exports = {
  "aces": {
    denomination: "ACES (Academy Color Encoding System)",
    synonyms: ["Estándar de Color de la Academia", "SMPTE 2065-1", "ACEScc", "ACEScct"],
    original_def: "Arquitectura abierta y estándar de gestión y codificación de color desarrollada por la Academia de Artes y Ciencias Cinematográficas (AMPAS). Emplea un espacio de color ultraamplio (ACES2065-1) con precisión cromática en coma flotante de 32 bits, permitiendo intercambiar material heterogéneo entre distintas cámaras, motores de VFX y dispositivos de visualización sin pérdida cromática.",
    context_of_use: "Flujos de trabajo multicámara de alta gama, postproducción con integración masiva de CGI/VFX y masterización para HDR y cine digital (DCI).",
    example: "Un comercial grabado simultáneamente con ARRI Alexa Mini LF y RED V-Raptor normaliza ambas cámaras en espacio ACEScct dentro de DaVinci Resolve.",
    visual_notes: "Diagrama de cromaticidad CIE 1931 donde el gamut ACES cubre la totalidad del espectro visible humano superando con creces a Rec.709 y Rec.2020.",
    llm_prompt_guidance: "Palabras clave: 'ACES color space, Academy Color Encoding System, linear color pipeline, wide gamut color science, uncompressed 32-bit float'.",
    inferred_relations: { "es_un_tipo_de": ["colorimetria"], "es_compatible_con": ["hdr", "raw", "rec-709"], "se_utiliza_para": ["etalonaje-color-grading", "vfx"] }
  },
  "etalonaje-color-grading": {
    denomination: "Etalonaje / Color Grading (Corrección de Color y Estilización)",
    synonyms: ["Color Grading", "Corrección de Color", "Talonaje Digital", "Color Timing"],
    original_def: "Proceso dual de postproducción de imagen que comprende la Corrección Primaria (balancear la exposición neutra, contrastes y tonos de piel entre planos dispares) y la Estilización Secundaria / Grading (aplicación creativa de una paleta estética deliberada, curvas de tonos, máscaras selectivas y looks cromáticos emocionales que potencian el tono narrativo de la obra).",
    context_of_use: "Etapa final de imagen tras el bloqueo de edición (picture lock) realizada en salas dedicadas con paneles de control (DaVinci Resolve Mini/Advanced Panel).",
    example: "Transformar una escena diurna grabada plana en LOG en una atmósfera nocturna fría y desaturada con sombras azuladas y luces de tungsteno doradas en las ventanas.",
    visual_notes: "Tres ruedas cromáticas (Lift, Gamma, Gain) con selectores esféricos, curvas spline de matiz vs saturación y nodos seriales/paralelos.",
    llm_prompt_guidance: "Palabras clave: 'cinematic color grading, teal and orange palette, balanced skin tones, film print emulation, DaVinci Resolve colorist look'.",
    inferred_relations: { "sucede_a": ["montaje"], "opera_sobre": ["log", "raw"], "se_apoya_en": ["waveform-y-vectorscope", "lut"] }
  },
  "hdr": {
    denomination: "HDR (High Dynamic Range / Alto Rango Dinámico)",
    synonyms: ["Alto Rango Dinámico", "HDR10 / Dolby Vision / HLG", "Wide Dynamic Range"],
    original_def: "Estándar de captura, postproducción y visualización de video que reproduce un rango de luminancia y una gama de colores (gamut Rec.2020) drásticamente más amplios que el video estándar SDR tradicional. Alcanza picos de brillo de hasta 1000 a 4000 nits y negros profundos sin aplastamiento, emulando la capacidad de percepción del ojo humano frente a contrastes extremos de luz natural.",
    context_of_use: "Masterización de películas y series para servicios de streaming premium (Netflix, Apple TV, Disney+), pantallas OLED y consolas de videojuegos.",
    example: "Masterizar una escena nocturna donde una fogata alcanza picos de 800 nits con chispas incandescentes nítidas mientras los rostros en penumbra conservan detalle textural en las sombras.",
    visual_notes: "Curvas de transferencia electroóptica PQ (Perceptual Quantizer / ST 2084) y HLG (Hybrid Log-Gamma) en monitores de masterización de 1000 nits.",
    llm_prompt_guidance: "Palabras clave: 'HDR high dynamic range, Dolby Vision 1000 nits master, vibrant specular highlights, deep OLED blacks'.",
    inferred_relations: { "se_opone_a": ["rec-709"], "amplia_la": ["luminancia"], "requiere": ["masterizacion-de-entrega"] }
  },
  "log": {
    denomination: "LOG (Perfil de Curva Logarítmica)",
    synonyms: ["Curva Logarítmica", "Log Gamma (S-Log, C-Log, V-Log, LogC)", "Logarithmic Profile"],
    original_def: "Curva de transferencia tonal de captura digital que comprime matemáticamente la información de luminancia del sensor de forma logarítmica (similar a la curva de densidad de la película química). Sacrifica el contraste y saturación visibles directos para preservar la mayor cantidad de pasos de rango dinámico tanto en las sombras profundas como en las altas luces extremas, entregando un archivo plano (flat) ideal para el posterior etalonaje.",
    context_of_use: "Modo de grabación estándar en cámaras de cine profesional (ARRI LogC, Sony S-Log3, Canon C-Log3, Panasonic V-Log).",
    example: "Grabar a la modelo en la playa en S-Log3: la imagen en cámara parece lechosa y descolorida, pero al gradear en DaVinci Resolve se recupera el cielo azul y el detalle del vestido blanco sin que nada esté quemado.",
    visual_notes: "Imagen cruda con apariencia deslavada, bajo contraste y tonos lechosos; el histograma se concentra en una banda central estrecha sin tocar los extremos.",
    llm_prompt_guidance: "Palabras clave: 'flat LOG picture profile, desaturated flat gamma curve, high dynamic range latitude, pre-color grading footage'.",
    inferred_relations: { "facilita": ["etalonaje-color-grading"], "se_transforma_con": ["lut"], "preserva_el": ["rango-dinamico"] }
  },
  "luminancia": {
    denomination: "Luminancia (Señal de Brillo / Canal Y)",
    synonyms: ["Canal Y", "Señal de Brillo", "Luma (Y')"],
    original_def: "Componente fotométrico y electrónico de la señal de video que cuantifica la intensidad lumínica o brillo de cada píxel de la imagen con independencia de su información de color (crominancia). Representa la estructura de blanco y negro de la imagen y concentra más del 70% de la percepción humana de nitidez y detalle espacial.",
    context_of_use: "Calibración de exposición, balance de contrastes y monitoreo en osciloscopios de forma de onda.",
    example: "En un vectorscopio y monitor de forma de onda, la señal luma se mide en una escala de 0 IRE (negro puro) a 100 IRE (blanco de recorte).",
    visual_notes: "Imagen visualizada en blanco y negro puro despojando a la toma de sus canales de croma U/V.",
    llm_prompt_guidance: "Palabras clave: 'pure luma luminance channel, grayscale light values, 0 to 100 IRE luminance scale, black and white tonal range'.",
    inferred_relations: { "se_combina_con": ["crominancia"], "se_mide_en": ["waveform-y-vectorscope"], "determina_la": ["exposicion"] }
  },
  "lut": {
    denomination: "LUT (Lookup Table / Tabla de Consulta de Color)",
    synonyms: ["Lookup Table", "3D LUT", "Tabla de Transformación Cromática", "LUT Técnica / Creativa"],
    original_def: "Archivo matemático matricial (habitualmente archivos .cube en 33x33x33 o 65x65x65 puntos tridimensionales) que mapea y transforma de forma algorítmica los valores de color de entrada (RGB) en nuevos valores específicos de salida. Se clasifican en LUTs Técnicas (de conversión, por ejemplo de LogC a Rec.709) y LUTs Creativas (que aplican una emulación estética o look cromático de película).",
    context_of_use: "Monitoreo en vivo en el set de rodaje para previsualizar la toma con contraste normal y como punto de partida en la sala de etalonaje.",
    example: "Cargar una LUT 3D en el monitor SmallHD del director para ver el material grabado en S-Log3 con aspecto cinematográfico natural en tiempo real.",
    visual_notes: "Cubo tridimensional de datos en el espacio RGB que interpola coordenadas cromáticas para transformar saturación, matiz y luminancia.",
    llm_prompt_guidance: "Palabras clave: '3D LUT color conversion, film emulation LUT applied, Rec.709 preview LUT, cinematic color lookup transform'.",
    inferred_relations: { "transforma": ["log", "raw"], "se_aplica_en": ["etalonaje-color-grading"], "se_previsualiza_en": ["dit-media-management"] }
  },
  "raw": {
    denomination: "RAW (Video en Bruto de Sensor)",
    synonyms: ["Metraje RAW", "Formato en Bruto", "Cinema RAW (BRAW, REDCODE, ProRes RAW)"],
    original_def: "Formato de archivo que almacena directamente los datos binarios capturados por cada fotosito fotosensible de la matriz de filtros Bayer del sensor digital, sin aplicar desmosaicado (demosaicing), compresión destructiva, balance de blancos fijo ni curvas de contraste en cámara. Otorga una flexibilidad absoluta en postproducción para modificar la temperatura de color y la exposición a posteriori como si se hiciera en el rodaje.",
    context_of_use: "Cinematografía de alto nivel, comerciales premium y planos destinados a procesos complejos de efectos visuales (VFX).",
    example: "Modificar en postproducción el balance de blancos de una escena grabada en REDCODE RAW de 5600K a 3200K sin introducir degradación de ruido en la señal.",
    visual_notes: "Pánel de ajustes de cámara RAW en DaVinci Resolve donde los deslizadores de ISO, Kelvin, Tin y Espacio de Color se pueden alterar directamente desde la matriz Bayer.",
    llm_prompt_guidance: "Palabras clave: 'uncompressed cinema RAW footage, Bayer pattern sensor data, maximum dynamic range flexibility, pristine RAW digital negative'.",
    inferred_relations: { "es_la_fuente_de": ["log", "proxy"], "exige": ["dit-media-management", "transcoding"], "es_ideal_para": ["vfx"] }
  },
  "rec-709": {
    denomination: "REC.709 (Estándar de Espacio de Color HD)",
    synonyms: ["ITU-R BT.709", "Espacio de Color Estándar HD", "sRGB Color Gamut"],
    original_def: "Estándar técnico internacional promulgado por la Unión Internacional de Telecomunicaciones (ITU) en 1990 que define los parámetros de video de alta definición (HDTV): resolución 1920x1080, relación de aspecto 16:9, espacio cromático con primarios idénticos a sRGB y curva gamma de visualización estándar (2.2 / 2.4). Es el estándar universal para la visualización convencional en televisores, pantallas de ordenador y teléfonos móviles.",
    context_of_use: "Espacio de color de destino por defecto para televisión broadcast y exportaciones estándar para redes sociales e internet.",
    example: "Masterizar el video final en Rec.709 con gamma 2.4 para asegurar que los colores se visualicen correctamente en la mayoría de televisores y monitores domésticos.",
    visual_notes: "Triángulo en el diagrama de cromaticidad CIE 1931 que cubre aproximadamente el 35.9% de los colores que percibe el ojo humano.",
    llm_prompt_guidance: "Palabras clave: 'standard Rec.709 color gamut, HDTV broadcast standard, standard dynamic range SDR color space'.",
    inferred_relations: { "se_opone_a": ["hdr", "aces"], "es_el_destino_de": ["lut"], "es_el_estandar_de": ["broadcasting"] }
  },
  "saturacion": {
    denomination: "Saturación (Pureza Cromática)",
    synonyms: ["Pureza del Color", "Intensidad Cromática", "Chroma Saturation"],
    original_def: "Medida que define la pureza, vivacidad o intensidad de un color específico en relación con un gris neutro de su misma luminosidad. Un color con 100% de saturación se percibe brillante, vivo y puro (como un láser o pintura pura), mientras que una saturación de 0% neutraliza todos los tonos transformando la imagen en una escala monocromática de grises.",
    context_of_use: "Control clave en el etalonaje cromático para transmitir emociones: alta saturación para euforia o fantasía pop; baja saturación para dramatismo, melancolía o sobriedad documental.",
    example: "Desaturar selectivamente todos los colores de la escena un 40% dejando únicamente la bufanda roja de la niña en su saturación original para convertirla en el centro de atención dramático.",
    visual_notes: "En el vectorscopio, la distancia radial desde el punto central neutro hacia los límites perimetrales de los cajetines de color representa el nivel de saturación.",
    llm_prompt_guidance: "Palabras clave: 'vibrant color saturation, desaturated moody cinema palette, selective color pop, muted vintage color grading'.",
    inferred_relations: { "se_monitorea_en": ["waveform-y-vectorscope"], "se_modula_en": ["etalonaje-color-grading"] }
  },
  "waveform-y-vectorscope": {
    denomination: "Waveform y Vectorscope (Monitores de Forma de Onda y Vectorscopio)",
    synonyms: ["Scopes de Video", "Monitores de Señal", "Analizadores de Color y Exposición"],
    original_def: "Instrumentos de medición técnica indispensables en postproducción de video: el Monitor de Forma de Onda (Waveform) grafica la luminancia (brillo) y los canales RGB de izquierda a derecha a lo largo del encuadre en una escala de 0 a 100 IRE; el Vectorscopio representa en una cuadrícula circular el matiz (ángulo radial de 360 grados) y la saturación (distancia desde el centro) de los colores, incluyendo una línea de referencia estándar para tonos de piel (Skin Tone Line).",
    context_of_use: "Alineación de exposición, balance de blancos y control de límites legales en suites de corrección de color y unidades móviles.",
    example: "El colorista verifica en el vectorscopio que los tonos de piel de la actriz se alineen exactamente a lo largo de la línea de Skin Tone Line (a 10:30 horas).",
    visual_notes: "Gráfico de trazas luminosas verdes o RGB desfilando horizontalmente (waveform) junto al disco circular con casillas de primarios R, G, B, Cy, Mg, Yl (vectorscopio).",
    llm_prompt_guidance: "Palabras clave: 'video scopes overlay, RGB parade waveform display, vectorscope skin tone line alignment, broadcast legal signal analyzer'.",
    inferred_relations: { "analiza": ["luminancia", "saturacion"], "guia_el": ["etalonaje-color-grading"], "verifica_los": ["limites-legales"] }
  }
};
