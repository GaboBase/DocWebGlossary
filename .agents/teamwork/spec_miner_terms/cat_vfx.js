module.exports = {
  "animacion-2d-3d": {
    denomination: "Animación 2D / 3D",
    synonyms: ["Animación Digital", "Computer Generated Animation (CGA)", "Motion Design"],
    original_def: "Generación de secuencias visuales sintéticas en movimiento creadas mediante dibujo vectorial bidimensional o modelado, rigging e iluminación de mallas poligonales en entornos tridimensionales virtuales, prescindiendo del rodaje físico en set.",
    context_of_use: "Comerciales explicativos de producto, visualización arquitectónica, contenido educativo, branding animado y películas animadas.",
    example: "Modelado tridimensional de un teléfono inteligente desensamblándose en el aire para mostrar sus componentes internos en un comercial de tecnología.",
    visual_notes: "Vistas de visor 3D (wireframe, shading, viewport render) con curvas de animación Bezier sobre la línea de tiempo.",
    llm_prompt_guidance: "Palabras clave: '3D CGI animation, photorealistic render, keyframed motion, spline curve interpolation, octane render, stylized 2D vector animation'.",
    inferred_relations: { "se_utiliza_para": ["motion-graphics", "vfx"], "requiere": ["keyframe", "renderizado"] }
  },
  "chroma-key": {
    denomination: "Chroma Key (Incrustación por Croma / Pantalla Verde o Azul)",
    synonyms: ["Pantalla Verde / Pantalla Azul", "Chroma Keying", "Color Keying", "Incrustación por Color"],
    original_def: "Técnica de postproducción y efectos visuales que consiste en filmar a un sujeto frente a un fondo monocromático rigurosamente uniforme (típicamente verde brillante Pantone 354C o azul cobalto) para aislar mediante software ese rango de color y tornarlo completamente transparente (generando un canal alfa), permitiendo insertar detrás cualquier otro fondo real, digital o sintético.",
    context_of_use: "Noticieros de televisión (mapa del clima), producciones de ciencia ficción, comerciales con escenarios virtuales y transmisiones de videojuegos.",
    example: "Filmar al actor sentado en una caja verde en estudio para luego integrarlo en el asiento del piloto de una nave espacial navegando entre asteroides en 3D.",
    visual_notes: "Sujeto iluminado limpiamente frente a una pared de ciclorama verde brillante tensada sin arrugas ni sombras proyectadas.",
    llm_prompt_guidance: "Palabras clave: 'clean green screen background, chroma key studio setup, even green illumination, subject isolated for compositing'.",
    inferred_relations: { "genera": ["canal-alfa"], "se_integra_en": ["composicion", "vfx"], "es_alternativa_a": ["volumen-led"] }
  },
  "keyframe": {
    denomination: "Keyframe (Fotograma Clave)",
    synonyms: ["Fotograma Clave", "Punto Clave de Animación", "Animation Keyframe"],
    original_def: "Punto de anclaje temporal en una línea de tiempo digital donde el creador fija un valor paramétrico específico para una propiedad de un objeto (posición X/Y/Z, escala, rotación, opacidad, ganancia de volumen o color). El software interpola automáticamente mediante curvas matemáticas (splines) los fotogramas intermedios (in-betweens) entre dos fotogramas clave sucesivos.",
    context_of_use: "Universal en animación 2D/3D, motion graphics, etalonaje dinámico y automatización de volumen de audio en cualquier software NLE/VFX.",
    example: "Fijar un keyframe de posición en el segundo 0 a la izquierda de la pantalla y otro en el segundo 2 a la derecha para que el logotipo cruce la pantalla de forma fluida.",
    visual_notes: "Iconos en forma de diamante o rombo sobre las pistas de propiedades en After Effects o Premiere Pro conectados por curvas Bezier.",
    llm_prompt_guidance: "Palabras clave: 'keyframe interpolation, smooth Bezier ease-in ease-out, automated property curve, animation diamond marker'.",
    inferred_relations: { "es_la_unidad_de": ["animacion-2d-3d", "motion-graphics"], "modula": ["renderizado"] }
  },
  "matte-painting": {
    denomination: "Matte Painting (Pintura de Fondos Digitales)",
    synonyms: ["Pintura Matte", "Fondo Digital Cinematográfico", "Digital Matte Painting (DMP)"],
    original_def: "Técnica artística y de efectos visuales que consiste en crear representaciones pictóricas fotorrealistas de paisajes monumentales, ciudades futuristas o entornos fantásticos imposibles o prohibitivamente caros de construir o filmar en la realidad, combinando pintura digital, fotocomposición de alta resolución y modelos 3D proyectados sobre geometrías espaciales.",
    context_of_use: "Cine histórico, ciencia ficción, publicidad épica y ampliación de sets (set extensions) en postproducción.",
    example: "Pintar una metrópolis cyberpunk futurista con rascacielos colosales y naves voladoras para sustituir el horizonte de una toma grabada en un descampado.",
    visual_notes: "Composición por capas separadas de primer término, término medio y fondo con efectos atmosféricos de neblina y profundidad de color.",
    llm_prompt_guidance: "Palabras clave: 'photorealistic digital matte painting, cinematic fantasy landscape, epic set extension, detailed architectural concept art'.",
    inferred_relations: { "es_un_tipo_de": ["vfx"], "se_integra_con": ["camera-tracking", "chroma-key"] }
  },
  "motion-graphics": {
    denomination: "Motion Graphics (Grafismo en Movimiento)",
    synonyms: ["Diseño Gráfico en Movimiento", "Animación Gráfica", "Mograph"],
    original_def: "Disciplina del diseño audiovisual que combina tipografía, formas geométricas vectoriales, logotipos, iconografía e ilustraciones animadas con sonido y música, creando piezas dinámicas concebidas primordialmente para explicar conceptos abstractos, comunicar datos estadísticos o fortalecer la identidad visual de marca.",
    context_of_use: "Videos corporativos explicativos (explainer videos), cabeceras de programas de televisión, reels promocionales, infografías animadas y publicidad en redes.",
    example: "Animar los gráficos de barras y porcentajes que crecen al compás de la música mientras iconos estilizados ilustran los hitos de crecimiento de una empresa fintech.",
    visual_notes: "Paletas de colores corporativos vibrantes, tipografías animadas con transiciones cinéticas elásticas y vectores limpios sobre fondos degradados.",
    llm_prompt_guidance: "Palabras clave: 'clean corporate motion graphics, dynamic kinetic typography, 2D vector animation explainer, sleek UI motion design'.",
    inferred_relations: { "es_un_tipo_de": ["animacion-2d-3d"], "requiere": ["keyframe"], "se_diseña_en": ["after-effects"] }
  },
  "rotoscopia": {
    denomination: "Rotoscopia (Rotoscoping Tradicional / Silueteado)",
    synonyms: ["Recorte por Máscara", "Silueteado Manual", "Roto Painting"],
    original_def: "Técnica de efectos visuales que consiste en trazar manualmente máscaras vectoriales spline fotograma a fotograma alrededor de un elemento o personaje en movimiento filmado en imagen real, con el fin de recortarlo con precisión de su entorno original para aislarlo, colocarlo sobre un fondo distinto o insertar elementos gráficos por detrás de él.",
    context_of_use: "Postproducción de VFX cuando el rodaje no se realizó frente a pantalla verde (chroma key) o para eliminar cables y elementos no deseados del set.",
    example: "El artista de roto dibuja 150 máscaras consecutivas siguiendo el contorno del pelo y extremidades del bailarín para insertar texto luminoso que pase por detrás de su espalda.",
    visual_notes: "Máscaras vectoriales de colores con múltiples puntos Bezier ajustándose minuciosamente sobre la silueta del sujeto en cada cuadro individual.",
    llm_prompt_guidance: "Palabras clave: 'meticulous rotoscoping spline mask, manual actor silhouette cutout, frame-by-frame alpha matte tracing'.",
    inferred_relations: { "es_la_base_de": ["rotoscopia-automatica"], "genera": ["canal-alfa"], "es_parte_de": ["vfx"] }
  },
  "sfx": {
    denomination: "SFX (Efectos Especiales Prácticos / de Set)",
    synonyms: ["Efectos Físicos de Set", "Efectos Mecánicos y Pirotécnicos", "Practical Effects"],
    original_def: "Efectos visuales e ilusiones físicas generadas directamente en el set de rodaje durante la filmación frente a la lente de la cámara, sin recurrir a la computación digital. Incluyen pirotecnia controlada, explosiones, chispas, lluvia y niebla artificial, prótesis de maquillaje prostético, disparos con balas de fogueo y plataformas mecánicas con cables (wirework).",
    context_of_use: "Rodaje de escenas de acción, terror, ciencia ficción y secuencias donde la interacción física con los actores resulta primordial.",
    example: "El equipo de SFX acciona dos cañones de aire con chispas y humo de pólvora detrás del actor al detonar una pared falsa de corcho prensado.",
    visual_notes: "Plétora de humo denso en el set, lluvia artificial cayendo desde tuberías perforadas cenitales y reflectores iluminando las gotas en suspensión.",
    llm_prompt_guidance: "Palabras clave: 'practical special effects in-camera, real pyrotechnic spark explosion, physical set rain machine, authentic practical creature makeup'.",
    inferred_relations: { "se_opone_a": ["vfx"], "se_combina_con": ["live-action"], "opera_en": ["rodaje"] }
  },
  "stop-motion": {
    denomination: "Stop Motion (Animación Fotograma a Fotograma)",
    synonyms: ["Animación en Volumen", "Cuadro a Cuadro Físico", "Claymation / Puppet Animation"],
    original_def: "Técnica artesanal de animación que consiste en manipular físicamente objetos tridimensionales tangibles (marionetas articuladas con esqueletos de alambre, figuras de plastilina, recortes de papel) milímetro a milímetro entre cada disparo fotográfico individual estático. Al reproducir la serie de fotografías a 12 o 24 fps, se genera la ilusión mágica y táctil de vida autónoma.",
    context_of_use: "Cortometrajes y largometrajes autorales de animación (como las obras de Aardman o Tim Burton), comerciales artísticos y spots de producto.",
    example: "Un animador mueve un brazo de una figura de plastilina dos milímetros, toma una fotografía con la cámara, vuelve a moverlo dos milímetros más y dispara de nuevo, completando 24 fotos para lograr un solo segundo de video.",
    visual_notes: "Texturas táctiles palpables en los personajes (marcas microscópicas de huellas dactilares sobre la arcilla, telas bordadas reales) e iluminación constante de estudio.",
    llm_prompt_guidance: "Palabras clave: 'tactile stop-motion animation, handcrafted claymation puppet, charming frame-by-frame miniature set, textured physical lighting'.",
    inferred_relations: { "es_un_tipo_de": ["animacion-2d-3d"], "requiere": ["rodaje"], "prescinde_de": ["cgi"] }
  },
  "vfx": {
    denomination: "VFX (Efectos Visuales Digitales)",
    synonyms: ["Efectos Digitales de Postproducción", "Visual Effects", "CGI y Composición Digital"],
    original_def: "Amplia disciplina de la postproducción audiovisual que engloba todos los procesos mediante los cuales se crean, manipulan o combinan imágenes que no pudieron ser capturadas durante el rodaje físico de imagen real. Abarca la integración de criaturas y escenarios 3D por computadora (CGI), matte painting digital, rotoscopia, borrado de cables, seguimiento de cámara 3D (matchmoving) y composición digital multicapa.",
    context_of_use: "Superproducciones de cine, comerciales publicitarios con alto impacto visual, videoclips y series de televisión.",
    example: "Insertar una flota de naves espaciales digitales sobre una toma grabada en un desierto, ajustando la luz, la atmósfera de polvo y la sombra en el suelo para lograr fotorrealismo indetectable.",
    visual_notes: "Árbol de nodos en software de composición (Nuke o Fusion) conectando pases de render 3D (diffuse, specular, ambient occlusion, depth) con el metraje de cámara.",
    llm_prompt_guidance: "Palabras clave: 'photorealistic visual effects, seamless CGI integration, cinematic digital composite, professional VFX render pass blend'.",
    inferred_relations: { "supervisado_por": ["vfx-supervisor"], "se_opone_a": ["sfx"], "integra": ["chroma-key", "camera-tracking", "matte-painting"] }
  },
  "video-mapping": {
    denomination: "Video Mapping (Proyección Monumental Mapeada)",
    synonyms: ["Projection Mapping", "Mapeo de Video 3D", "Proyección Arquitectónica"],
    original_def: "Técnica de proyección audiovisual espacial que utiliza proyectores de alta luminosidad (20.000 a 50.000 lúmenes ANSI) combinados con software de deformación geométrica y servidores de medios para proyectar animaciones de video exactamente adaptadas sobre superficies tridimensionales complejas del mundo real (fachadas de catedrales, carrocerías de automóviles, escenarios esculturales), transformando su apariencia estática en estructuras vivas que parecen deformarse, abrirse o rotar.",
    context_of_use: "Eventos de lanzamiento de marcas, festivales de luz y arte urbano, conciertos multitudinarios y exhibiciones museísticas interactivas.",
    example: "Proyectar sobre la fachada de un palacio histórico una animación donde las columnas parecen desmoronarse y transformarse en cascadas de agua al ritmo de la música.",
    visual_notes: "Estructura arquitectónica real cobrando vida en la oscuridad de la noche mediante haces lumínicos calibrados que coinciden exactamente con cada moldura y ventana del edificio.",
    llm_prompt_guidance: "Palabras clave: 'spectacular architectural video projection mapping, building facade animated light show, 3D illusion mapped projection'.",
    inferred_relations: { "es_un_tipo_de": ["proyeccion"], "utiliza": ["animacion-2d-3d", "vfx"], "opera_en": ["eventos"] }
  }
};
