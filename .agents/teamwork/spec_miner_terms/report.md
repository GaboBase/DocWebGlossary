# Informe Técnico de Minado de Especificaciones: Terminología de Producción Audiovisual y Video

**Agente**: `spec_miner_terms` (Terminology Spec Miner)  
**Fuente Primaria Autorizada**: [Mouse Interactivo - Terminología de producción de video: glosario profesional A–Z](https://mouseinteractivo.com/terminologia-produccion-video/)  
**Fecha de Extracción y Auditoría**: 2026-11-01  
**Directorio de Trabajo**: `D:\DocWebGlosary\.agents\teamwork\spec_miner_terms\`  
**Destino del Reporte**: `D:\DocWebGlosary\.agents\teamwork\spec_miner_terms\report.md`  

---

## 1. Resumen Ejecutivo y Trazabilidad del Minado

El presente informe documenta la inspección exhaustiva, extracción no invasiva, verificación cuantitativa y enriquecimiento conceptual del glosario profesional de producción audiovisual publicado por **Mouse Interactivo**.

La investigación contrastó de manera rigurosa la totalidad de los contenidos de la fuente frente a los **177 términos declarados** en el encabezado de la publicación original, analizando su estructuración léxica, integridad de hipervínculos, duplicidades semánticas, activos visuales (infografías y diagramas técnicos) y su aplicabilidad directa para la formulación de requerimientos técnicos e ingeniería de prompts hacia modelos de inteligencia artificial multimodal (Runway Gen-3, Sora, Kling, Midjourney, ElevenLabs).

## 2. Contabilización Rigurosa y Análisis de Discrepancias

### 2.1 Balance Cuantitativo de Términos
- **Términos declarados en la publicación**: **177 términos**.
- **Entradas físicas de términos extraídas (`### Heading` con ancla)**: **177 términos exactos** (100% de correspondencia numérica ordinal).
- **Entidades conceptuales únicas efectivas**: **175 conceptos únicos**.

### 2.2 Duplicidades Conceptuales y Discrepancias Identificadas
A pesar de que existen físicamente 177 encabezados numerados del 1 al 177, el análisis de contenido detectó **dos casos de duplicación conceptual explícita con inversión bilingüe español/inglés**, lo que reduce el número de conceptos netos a 175:

1. **Duplicado 1: Cámara Lenta / Slow Motion**
   - **Entrada #18**: `### Cámara Lenta (Slow Motion)` (Slug: `#camara-lenta`).
     - *Definición fuente*: Efecto de reproducir a menor velocidad grabando a tasa de cuadros más alta (120 o 240 fps); señala la necesidad de mayor luz y advierte contra la ralentización por software en edición.
     - *Relacionados*: FPS / Frame Rate, Timelapse, Bitrate.
   - **Entrada #132**: `### SLOW MOTION (Cámara lenta)` (Slug: `#slow-motion`).
     - *Definición fuente*: Efecto de reproducir más lento grabando a frame rate alto (60, 120, 240 fps) y reproduciendo a 24/25 fps; reitera la alta velocidad de obturación y la luz requerida.
     - *Relacionados*: Tasa de fotogramas, Velocidad de obturación, Hyperlapse.
   - *Veredicto Técnico*: Duplicación redundante en la fuente donde el mismo principio físico y técnico fue redactado dos veces para cubrir tanto la búsqueda por la letra C (español) como por la letra S (inglés).

2. **Duplicado 2: FPS / Tasa de Fotogramas**
   - **Entrada #51**: `### FPS / Frame Rate` (Slug: `#fps-frame-rate`).
     - *Definición fuente*: Tasa de cuadros por segundo para crear movimiento; detalla estándares de 24 fps (cine), 25/30 fps (TV/web) y 50/60 fps (fluidez/cámara lenta).
     - *Relacionados*: Cámara Lenta, Bitrate, Broadcasting.
   - **Entrada #145**: `### TASA DE FOTOGRAMAS (Frame rate)` (Slug: `#tasa-de-fotogramas`).
     - *Definición fuente*: Número de imágenes por segundo en fps; repite estándares de 24 fps (cine), 25 fps (PAL Colombia/Europa), 30 fps (digital) y 50/60 fps (cámara lenta 2.5x).
     - *Relacionados*: Slow motion, Velocidad de obturación, Timelapse.
   - *Veredicto Técnico*: Duplicación conceptual idéntica indexada en la letra F por acrónimo inglés y en la letra T por traducción al castellano.

### 2.3 Inconsistencias Tipográficas y de Formato en Títulos
Se identificó una marcada irregularidad en las convenciones de titulación de la publicación original:
- **32 títulos con palabras clave en MAYÚSCULAS sostenidas** y traducción/alias entre paréntesis (ejemplos: `AUDIO INMERSIVO (Dolby Atmos)`, `BACKLIGHT (Contraluz)`, `BITRATE (Tasa de bits)`, `BOOM (Micrófono de caña)`, `CALL SHEET (Orden del día)`, `COVERAGE (Cobertura)`, `CUTAWAY (Plano de recurso)`, `DELIVERABLE (Entregable)`, `DIAFRAGMA (Apertura)`, `DOBLAJE (Dubbing)`, `HOOK (Gancho)`, `LAVALIER (Micrófono de solapa)`, `MASTER (Archivo maestro)`, `MEZCLA DE SONIDO (Sound Mix)`, `MIXER (Mesa de mezclas)`, `PHANTOM POWER (Alimentación fantasma)`, `PLANO GENERAL (Wide shot)`, `RELACIÓN DE ASPECTO (Aspect Ratio)`, `RODAJE (Shooting)`, `ROOM TONE (Tono de sala)`, `ROUGH CUT (Corte preliminar)`, `SATURACIÓN (Saturation)`, `SCOUTING (Exploración de locaciones)`, `SHOT LIST (Lista de planos)`, `SLOW MOTION (Cámara lenta)`, `SUBTÍTULOS QUEMADOS (Burned-in)`, `SUBTÍTULOS vs CLOSED CAPTIONS`, `SWITCHER DE VIDEO (Mezclador)`, `TASA DE FOTOGRAMAS (Frame rate)`, `VIDEO GENERATIVO (Text-to-Video)`, `VOLUMEN LED (LED Volume)`, `WHITE BALANCE (Balance de blancos)`).
- **145 títulos en Formato Título / Mixto** (`Ángulo De Cámara`, `Animación 2D/3D`, `Asistente De Dirección (AD)`, `Clapperboard (Claqueta)`, `Cámara Lenta (Slow Motion)`).
- *Normalización adoptada*: Para la arquitectura del glosario semántico se preserva el registro del título original de la fuente en metadatos no navegables, pero se normaliza la denominación técnica principal a formato estándar de ingeniería audiovisual.

### 2.4 Distribución Alfabética y Letras Ausentes
El índice alfabético A–Z de la fuente presenta la siguiente distribución:
```json
{
  "A": 10,
  "B": 6,
  "C": 13,
  "D": 10,
  "E": 7,
  "F": 5,
  "G": 4,
  "H": 4,
  "I": 4,
  "J": 1,
  "K": 2,
  "L": 9,
  "M": 11,
  "N": 4,
  "O": 3,
  "P": 16,
  "R": 16,
  "S": 18,
  "T": 12,
  "U": 5,
  "V": 10,
  "W": 3,
  "X": 2,
  "Z": 2
}
```
- **Letras no representadas (ausentes)**: **Q** e **Y** no contienen ningún término en la fuente (por ejemplo, términos clásicos como *QuickTime*, *Quad split*, *YCbCr* o *Yaw* no fueron incluidos).

### 2.5 Auditoría de Hipervínculos Cruzados Internos
- **Total de hipervínculos cruzados en la sección 'Relacionados'**: **409 enlaces**.
- **Enlaces rotos identificados**: **0 enlaces rotos** (100% de los 409 enlaces resuelven unívocamente a un slug de ancla existente dentro de los 177 términos).

### 2.6 Catálogo de Diagramas Técnicos e Infografías
La inspección del código fuente HTML reveló que la publicación cuenta con **18 infografías técnicas propietarias de alta resolución** (formatos WebP de 1200 píxeles de base) reutilizadas estratégicamente en **39 términos**:

| # | Nombre de Archivo Infográfico | Dimensiones | Términos Donde Aparece en la Fuente | Descripción del Diagrama |
|---|-------------------------------|-------------|------------------------------------|--------------------------|
| 1 | `glosario-angulo-de-camara-1.webp` | 1200x782 | Ángulo De Cámara | Ángulos de cámara en video: picado, normal y contrapicado vistos de perfil |
| 2 | `glosario-cadena-de-audio.webp` | 1200x1152 | Audio Directo, BOOM, LAVALIER, MEZCLA DE SONIDO, MIXER | Cadena de audio completa: micrófono, preamplificador, grabadora, mezcla y master |
| 3 | `glosario-b-roll-1.webp` | 1200x526 | B-Roll | Relación entre A-Roll y B-Roll en la línea de tiempo de montaje |
| 4 | `glosario-iluminacion-de-tres-puntos-1.webp` | 1200x1120 | BACKLIGHT, Iluminación De Tres Puntos, Key Light | Esquema cenital de iluminación de tres puntos: principal, relleno y contraluz |
| 5 | `glosario-codec-1.webp` | 1200x602 | Códec | Diagrama de códec y contenedor: compresión de datos y empaquetado |
| 6 | `glosario-composicion.webp` | 1200x908 | Composición, Headroom, Regla De Los Tercios | Composición de encuadre: regla de tercios, aire superior y aire de mirada |
| 7 | `glosario-deliverable-1.webp` | 1200x530 | DELIVERABLE | Desglose de entregables finales de un proyecto audiovisual |
| 8 | `glosario-exposicion.webp` | 1200x1474 | DIAFRAGMA, F-stop, ISO, Profundidad De Campo, Velocidad De Obturación | Triángulo de exposición: relación entre apertura, obturación e ISO |
| 9 | `glosario-movimientos-de-camara.webp` | 1200x1900 | Dolly Shot, Tilt, Tracking Shot, Zoom In / Zoom Out | Familias de movimiento: paneo/tilt, travelling/grúa y zoom óptico |
| 10 | `glosario-escala-de-planos-1.webp` | 1200x2220 | Escala De Planos, Plano Americano, PLANO GENERAL, Primer Plano | Escala canónica de encuadres sobre la figura humana |
| 11 | `glosario-etalonaje-color-grading-1.webp` | 1200x526 | Etalonaje / Color Grading | Flujo de corrección primaria y estilización secundaria de color |
| 12 | `glosario-postproduccion.webp` | 1200x550 | Ingesta, Montaje, Postproducción | Flujo de postproducción: ingesta, montaje, corte, color, sonido y master |
| 13 | `glosario-lufs-loudness-1.webp` | 1200x842 | LUFS / Loudness | Niveles de sonoridad integrada normalizados por plataforma |
| 14 | `glosario-produccion-de-video-1.webp` | 1200x636 | Preproducción, Producción De Video | Las tres fases de producción audiovisual y sus actividades clave |
| 15 | `glosario-eje-de-accion.webp` | 1188x1186 | Raccord | Ley de los 180 grados, línea imaginaria del eje de acción y salto de eje |
| 16 | `glosario-relacion-de-aspecto-1.webp` | 1200x1946 | RELACIÓN DE ASPECTO | Comparativa gráfica de relaciones de aspecto (1:1, 4:5, 9:16, 16:9, 2.39:1) |
| 17 | `glosario-video-generativo-1.webp` | 1200x654 | VIDEO GENERATIVO | Pipeline de síntesis de video mediante inteligencia artificial |
| 18 | `glosario-video-vertical-1.webp` | 1200x852 | Video Vertical (9:16) | Encuadre móvil 9:16 y zonas seguras para interfaces de redes sociales |

## 3. Tablas Estándar de Minado de Especificaciones

### Features Discovered
| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Preproducción & Planificación | Colección de 12 términos de Preproducción & Planificación | Especificaciones técnicas, operativas y semánticas de preproducción & planificación (animatic, call-sheet, casting...) | Parámetros técnicos de rodaje, edición, audio y metadatos | Entidades semánticas modeladas, definiciones originales y prompt guidance | Términos con doble registro bilingüe o mayúsculas sostenidas identificados y normalizados | Inspección de encabezados H3 y contenido de mouseinteractivo.com |
| 2 | Dirección, Rodaje & Gestión de Set | Colección de 13 términos de Dirección, Rodaje & Gestión de Set | Especificaciones técnicas, operativas y semánticas de dirección, rodaje & gestión de set (asistente-de-direccion, clapperboard, direccion-de-fotografia...) | Parámetros técnicos de rodaje, edición, audio y metadatos | Entidades semánticas modeladas, definiciones originales y prompt guidance | Términos con doble registro bilingüe o mayúsculas sostenidas identificados y normalizados | Inspección de encabezados H3 y contenido de mouseinteractivo.com |
| 3 | Cámara, Encuadre & Movimiento | Colección de 26 términos de Cámara, Encuadre & Movimiento | Especificaciones técnicas, operativas y semánticas de cámara, encuadre & movimiento (angulo-de-camara, camara-lenta, camera-tracking...) | Parámetros técnicos de rodaje, edición, audio y metadatos | Entidades semánticas modeladas, definiciones originales y prompt guidance | Términos con doble registro bilingüe o mayúsculas sostenidas identificados y normalizados | Inspección de encabezados H3 y contenido de mouseinteractivo.com |
| 4 | Óptica, Enfoque & Composición | Colección de 12 términos de Óptica, Enfoque & Composición | Especificaciones técnicas, operativas y semánticas de óptica, enfoque & composición (composicion, diafragma, distancia-focal...) | Parámetros técnicos de rodaje, edición, audio y metadatos | Entidades semánticas modeladas, definiciones originales y prompt guidance | Términos con doble registro bilingüe o mayúsculas sostenidas identificados y normalizados | Inspección de encabezados H3 y contenido de mouseinteractivo.com |
| 5 | Iluminación, Exposición & Fotometría | Colección de 8 términos de Iluminación, Exposición & Fotometría | Especificaciones técnicas, operativas y semánticas de iluminación, exposición & fotometría (backlight, iluminacion-de-tres-puntos, intensidad-luminosa...) | Parámetros técnicos de rodaje, edición, audio y metadatos | Entidades semánticas modeladas, definiciones originales y prompt guidance | Términos con doble registro bilingüe o mayúsculas sostenidas identificados y normalizados | Inspección de encabezados H3 y contenido de mouseinteractivo.com |
| 6 | Audio Directo & Microfonía | Colección de 8 términos de Audio Directo & Microfonía | Especificaciones técnicas, operativas y semánticas de audio directo & microfonía (audio-directo, boom, lavalier...) | Parámetros técnicos de rodaje, edición, audio y metadatos | Entidades semánticas modeladas, definiciones originales y prompt guidance | Términos con doble registro bilingüe o mayúsculas sostenidas identificados y normalizados | Inspección de encabezados H3 y contenido de mouseinteractivo.com |
| 7 | Postproducción de Sonido & Acústica | Colección de 9 términos de Postproducción de Sonido & Acústica | Especificaciones técnicas, operativas y semánticas de postproducción de sonido & acústica (adr, audio-inmersivo, doblaje...) | Parámetros técnicos de rodaje, edición, audio y metadatos | Entidades semánticas modeladas, definiciones originales y prompt guidance | Términos con doble registro bilingüe o mayúsculas sostenidas identificados y normalizados | Inspección de encabezados H3 y contenido de mouseinteractivo.com |
| 8 | Montaje & Edición de Video | Colección de 21 términos de Montaje & Edición de Video | Especificaciones técnicas, operativas y semánticas de montaje & edición de video (a-roll, b-roll, banco-de-edicion...) | Parámetros técnicos de rodaje, edición, audio y metadatos | Entidades semánticas modeladas, definiciones originales y prompt guidance | Términos con doble registro bilingüe o mayúsculas sostenidas identificados y normalizados | Inspección de encabezados H3 y contenido de mouseinteractivo.com |
| 9 | Colorimetría, Espacios de Color & Monitoreo | Colección de 10 términos de Colorimetría, Espacios de Color & Monitoreo | Especificaciones técnicas, operativas y semánticas de colorimetría, espacios de color & monitoreo (aces, etalonaje-color-grading, hdr...) | Parámetros técnicos de rodaje, edición, audio y metadatos | Entidades semánticas modeladas, definiciones originales y prompt guidance | Términos con doble registro bilingüe o mayúsculas sostenidas identificados y normalizados | Inspección de encabezados H3 y contenido de mouseinteractivo.com |
| 10 | Efectos Visuales (VFX), Animación & Motion Graphics | Colección de 10 términos de Efectos Visuales (VFX), Animación & Motion Graphics | Especificaciones técnicas, operativas y semánticas de efectos visuales (vfx), animación & motion graphics (animacion-2d-3d, chroma-key, keyframe...) | Parámetros técnicos de rodaje, edición, audio y metadatos | Entidades semánticas modeladas, definiciones originales y prompt guidance | Términos con doble registro bilingüe o mayúsculas sostenidas identificados y normalizados | Inspección de encabezados H3 y contenido de mouseinteractivo.com |
| 11 | Tecnología de Video, Señal & Códecs | Colección de 15 términos de Tecnología de Video, Señal & Códecs | Especificaciones técnicas, operativas y semánticas de tecnología de video, señal & códecs (bitrate, broadcasting, codec...) | Parámetros técnicos de rodaje, edición, audio y metadatos | Entidades semánticas modeladas, definiciones originales y prompt guidance | Términos con doble registro bilingüe o mayúsculas sostenidas identificados y normalizados | Inspección de encabezados H3 y contenido de mouseinteractivo.com |
| 12 | Inteligencia Artificial Audiovisual & Producción Virtual | Colección de 17 términos de Inteligencia Artificial Audiovisual & Producción Virtual | Especificaciones técnicas, operativas y semánticas de inteligencia artificial audiovisual & producción virtual (avatar-digital, clonacion-de-voz, deepfake...) | Parámetros técnicos de rodaje, edición, audio y metadatos | Entidades semánticas modeladas, definiciones originales y prompt guidance | Términos con doble registro bilingüe o mayúsculas sostenidas identificados y normalizados | Inspección de encabezados H3 y contenido de mouseinteractivo.com |
| 13 | Entrega, Formatos Digitales & Distribución | Colección de 16 términos de Entrega, Formatos Digitales & Distribución | Especificaciones técnicas, operativas y semánticas de entrega, formatos digitales & distribución (deliverable, entrega-subida, hook...) | Parámetros técnicos de rodaje, edición, audio y metadatos | Entidades semánticas modeladas, definiciones originales y prompt guidance | Términos con doble registro bilingüe o mayúsculas sostenidas identificados y normalizados | Inspección de encabezados H3 y contenido de mouseinteractivo.com |

### Edge Cases
| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | Duplicado Bilingüe | Búsqueda de 'camara-lenta' vs 'slow-motion' | Entradas #18 y #132 definen exactamente el mismo concepto con ligeras variaciones de redacción. Solución: vincular como sinónimos bidireccionales canónicos manteniendo ambos slugs como alias navegables. |
| 2 | Duplicado Conceptual | Búsqueda de 'fps-frame-rate' vs 'tasa-de-fotogramas' | Entradas #51 y #145 repiten los mismos estándares de cuadros por segundo (24, 25, 30, 60 fps). Solución: unificar la entidad semántica subyacente y referenciar ambos puntos de entrada. |
| 3 | Tipografía Mayúscula | Títulos como 'AUDIO INMERSIVO', 'BITRATE', 'CALL SHEET' | 32 títulos aparecen en versales completas en la fuente. Solución: almacenar el string exacto en metadatos no navegables y normalizar la denominación para accesibilidad y visualización DOM. |
| 4 | Letras Vacías en A-Z | Navegación por letras 'Q' e 'Y' | La fuente omite por completo términos bajo las letras Q e Y. Solución: la interfaz A-Z debe deshabilitar visualmente o marcar como sin contenido dichas letras para evitar estados vacíos confusos. |
| 5 | Ausencia de Diagrama | Términos sin infografía propia (138 términos) | La fuente cuenta con 18 infografías para 39 términos; los restantes 138 carecen de imagen. Solución: incorporar especificaciones de visualización textual y monitorización (waveforms, grillas, encuadres) para cada término sin imagen. |
| 6 | Ambigüedad 4K | Uso indistinto de '4K' para TV y Cine | Término #157 diferencia rigurosamente UHD 4K (3840x2160, 16:9) de DCI 4K (4096x2160, 17:9). Solución: incorporar reglas de desambiguación en el recomendador de prompts LLM. |
| 7 | Parámetros de Loudness | Entrega de audio para streaming web vs Broadcast | Término #73 (LUFS) establece -14 LUFS para YouTube/Spotify frente a -24 LUFS para TV (EBU R128). Solución: parametrizar los presets de entrega en el orientador de productos. |

## 4. Catálogo Completo Enriquecido de los 177 Términos

A continuación se detallan exhaustivamente los **177 términos** del glosario profesional, estructurados en sus 13 categorías técnicas. Cada término incluye su denominación, procedencia original, definición técnica rigurosa y original (sin reproducción masiva de derechos de autor), sinónimos, contexto operativo, ejemplo práctico, relaciones semánticas, activos visuales y guía de formulación para modelos de IA.

### Categoría: Preproducción & Planificación (12 Términos)

#### 6. [Animatic](#animatic)
- **Identificador Único (Slug)**: `animatic`
- **Título Original en Fuente**: `Animatic`
- **Fases del Proceso**: Preproducción
- **Sinónimos y Alias**: Storyboard animado, Leica reel, Previsualización 2D
- **Definición Técnica Original**: Maqueta audiovisual secuencial generada a partir de las viñetas del storyboard montadas en una línea de tiempo con su duración exacta, acompañada de una banda de sonido preliminar (diálogos de referencia o scratch tracks, efectos temporales y música guía). Permite calibrar el ritmo dramático, la articulación de planos y la comprensión temporal antes de movilizar los recursos de rodaje o animación definitiva.
- **Contexto de Uso Operativo**: Fase de preproducción en comerciales publicitarios, cortometrajes de ficción y proyectos de animación 2D/3D.
- **Ejemplo Práctico de Producción**: El director monta los bocetos del comercial de 30 segundos en Premiere Pro con música temp para verificar que el remate del chiste funcione dentro del tiempo límite de transmisión.
- **Especificación Visual / Diagrama**: Cuadros dibujados en escala de grises con transiciones de corte directo o disolvencias simples y códigos de tiempo superpuestos.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'animatic sequence, rough storyboard timed motion, timed draft panels, scratch track sync, pacing previsualization'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `previsualizacion`
  - *se_compone_de*: `storyboard`, `voice-over`
  - *precede_a*: `rodaje`, `rough-cut`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#animatic) | *Relacionados originales*: Storyboard, Guion técnico, Animación 2D/3D

#### 17. [Call Sheet (Orden del Día)](#call-sheet)
- **Identificador Único (Slug)**: `call-sheet`
- **Título Original en Fuente**: `CALL SHEET (Orden del día)`
- **Fases del Proceso**: Preproducción
- **Sinónimos y Alias**: Orden de Citación, Plan de Trabajo Diario, Citación de Rodaje
- **Definición Técnica Original**: Documento operativo maestro emitido diariamente por el equipo de dirección (típicamente el primer o segundo asistente de dirección) que establece el cronograma riguroso de una jornada de rodaje: hora y lugar exactos de citación para cada miembro del elenco y del equipo técnico, escenas a filmar, requerimientos específicos de vestuario y utilería, condiciones climáticas previstas y contactos de emergencia.
- **Contexto de Uso Operativo**: Emitida al finalizar cada jornada de preproducción y rodaje para coordinar la logística del día siguiente en producciones de cualquier escala.
- **Ejemplo Práctico de Producción**: La orden del día para el Día 3 estipula citación de luces y cámara a las 06:00 AM, maquillaje a las 06:30 AM y primer plano de rodaje a las 08:00 AM en locación campestre.
- **Especificación Visual / Diagrama**: Hoja tabular estandarizada con logotipo de producción, encabezado de locación meteorológica, tabla de horarios de actores y desglose de escenas por páginas de guion.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'film call sheet document, daily shoot schedule, crew call time table, production logistics breakdown'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `documento-de-produccion`
  - *es_producido_por*: `asistente-de-direccion`
  - *organiza*: `rodaje`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#call-sheet) | *Relacionados originales*: Preproducción, Shot list, Scouting

#### 20. [Casting (Selección de Reparto)](#casting)
- **Identificador Único (Slug)**: `casting`
- **Título Original en Fuente**: `Casting`
- **Fases del Proceso**: Preproducción
- **Sinónimos y Alias**: Audición, Selección de Actores, Talent Audition
- **Definición Técnica Original**: Proceso sistemático de búsqueda, evaluación y selección de actores, locutores o modelos para encarnar los personajes o roles requeridos por el guion. Implica pruebas de cámara, lectura de fragmentos de guion (separatas) y evaluación de química actoral bajo la supervisión del director de casting y el director general.
- **Contexto de Uso Operativo**: Fase de preproducción tras la aprobación del guion literario y la definición de perfiles de personajes.
- **Ejemplo Práctico de Producción**: Se convocan a diez actrices para audicionar con una escena dramática de confrontación, evaluando su expresividad en primeros planos frente a cámara.
- **Especificación Visual / Diagrama**: Tomas de prueba de actores con pizarra identificativa con nombre, agencia y perfil de tres cuartos ante fondo neutro gris.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'actor audition headshot, casting call screen test, neutral background slate test, dramatic audition tape'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_parte_de*: `preproduccion`
  - *depende_de*: `guion-literario`
  - *precede_a*: `rodaje`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#casting) | *Relacionados originales*: 

#### 54. [Guion Literario](#guion-literario)
- **Identificador Único (Slug)**: `guion-literario`
- **Título Original en Fuente**: `Guion Literario`
- **Fases del Proceso**: Preproducción
- **Sinónimos y Alias**: Screenplay, Libreto, Script
- **Definición Técnica Original**: Texto narrativo estructurado bajo un formato industrial estandarizado (tipografía Courier de 12 puntos, encabezados de escena INT./EXT., descripciones de acción en presente y bloques centrados de diálogos con acotaciones) que describe detalladamente la historia audiovisual exclusivamente en términos de lo que puede ser visto y oído.
- **Contexto de Uso Operativo**: Punto de partida conceptual y contractual de cualquier obra audiovisual, utilizado para desgloses presupuestarios, búsqueda de financiación y dirección actoral.
- **Ejemplo Práctico de Producción**: Un guion de cortometraje de 15 páginas donde cada página equivale aproximadamente a un minuto de tiempo en pantalla cinematográfica.
- **Especificación Visual / Diagrama**: Página mecanografiada clásica con encabezado de escena en mayúsculas negritas: 'INT. OFICINA DE PRODUCCIÓN - DÍA' seguido de bloque descriptivo y diálogo centrado.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'screenplay format, Courier 12pt font, scene slugline INT/EXT, character dialogue block, formatted dramatic script'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_la_base_de*: `guion-tecnico`, `storyboard`
  - *define*: `storytelling`
  - *es_un_tipo_de*: `preproduccion`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#guion-literario) | *Relacionados originales*: Guion técnico, Storytelling, Escena

#### 55. [Guion Técnico](#guion-tecnico)
- **Identificador Único (Slug)**: `guion-tecnico`
- **Título Original en Fuente**: `Guion Técnico`
- **Fases del Proceso**: Preproducción
- **Sinónimos y Alias**: Shooting Script, Plan de Tomas, Desglose Técnico
- **Definición Técnica Original**: Documento de planificación visual y acústica en el que el director y el director de fotografía traducen las secuencias del guion literario en especificaciones concretas de cámara y sonido: número de escena y plano, escala de encuadre, ángulo de cámara, óptica sugerida, movimiento de cámara, iluminación, sonido directo y notas de continuidad.
- **Contexto de Uso Operativo**: Etapa final de la preproducción antes de pisar el set de grabación.
- **Ejemplo Práctico de Producción**: La escena 4 se desglosa en: Plano 1 (Plano General fijo con lente 24mm), Plano 2 (Plano Medio en travelling con 50mm) y Plano 3 (Primer Plano de reacción con 85mm).
- **Especificación Visual / Diagrama**: Formato matricial en columnas: N° Plano | Encuadre | Movimiento | Óptica | Descripción de Acción | Diálogo / Sonido.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'shooting script layout, shot-by-shot technical breakdown, focal length camera cues, camera angle instructions'.`
- **Relaciones Semánticas Inferidas**: 
  - *deriva_de*: `guion-literario`
  - *origina*: `shot-list`, `storyboard`
  - *guia*: `rodaje`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#guion-tecnico) | *Relacionados originales*: Storyboard, Shot list

#### 87. [Narrativa Visual](#narrativa-visual)
- **Identificador Único (Slug)**: `narrativa-visual`
- **Título Original en Fuente**: `Narrativa Visual`
- **Fases del Proceso**: Preproducción
- **Sinónimos y Alias**: Visual Storytelling, Discurso Visual, Gramática Cinematográfica
- **Definición Técnica Original**: Metodología y lenguaje mediante los cuales se construye sentido, emoción y arco dramático utilizando exclusivamente recursos de la imagen en movimiento: composición de encuadre, relaciones de aspecto, psicología del color, escala de planos, ritmo de corte y articulación de luz y sombras, sin depender de la exposición verbal de los personajes.
- **Contexto de Uso Operativo**: Diseño conceptual por parte del director y director de fotografía a lo largo de todas las etapas creativas del proyecto.
- **Ejemplo Práctico de Producción**: Uso de planos progresivamente más cerrados y una paleta cromática cada vez más fría para manifestar visualmente el aislamiento psicológico de un personaje.
- **Especificación Visual / Diagrama**: Secuencia comparativa de fotogramas donde la evolución cromática y el encuadre cuentan la historia sin subtítulos ni diálogos.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'visual storytelling, symbolic color framing, dramatic subtext composition, visual metaphor cinema, expressive shot design'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `lenguaje-audiovisual`
  - *se_manifiesta_en*: `direccion-de-fotografia`, `montaje`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#narrativa-visual) | *Relacionados originales*: Composición

#### 88. [NDA (Non-Disclosure Agreement)](#nda)
- **Identificador Único (Slug)**: `nda`
- **Título Original en Fuente**: `NDA (Non-Disclosure Agreement)`
- **Fases del Proceso**: Preproducción
- **Sinónimos y Alias**: Acuerdo de Confidencialidad, Pacto de Secreto Profesional, Contrato de Reserva
- **Definición Técnica Original**: Instrumento legal vinculante suscrito entre la casa productora, el cliente, los actores y el equipo técnico mediante el cual las partes se comprometen formalmente a no divulgar guiones, imágenes de rodaje, diseños de producto, fechas de lanzamiento ni material confidencial antes de su estreno o publicación autorizada.
- **Contexto de Uso Operativo**: Fase de preproducción antes de compartir guiones comerciales, dossiers de proyectos o admitir personal externo al set.
- **Ejemplo Práctico de Producción**: Todos los técnicos de un rodaje comercial firman un NDA para no filtrar en redes sociales el diseño del nuevo automóvil antes del evento de lanzamiento oficial.
- **Especificación Visual / Diagrama**: Documento contractual legal firmado con sellos notariales y cláusulas explícitas de penalización económica por revelación de material.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'legal NDA agreement, non-disclosure contract document, film confidentiality agreement'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `documento-legal`
  - *protege*: `preproduccion`, `rodaje`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#nda) | *Relacionados originales*: 

#### 101. [Preproducción](#preproduccion)
- **Identificador Único (Slug)**: `preproduccion`
- **Título Original en Fuente**: `Preproducción`
- **Fases del Proceso**: Preproducción
- **Sinónimos y Alias**: Etapa de Preparación, Pre-production Phase, Planificación Audiovisual
- **Definición Técnica Original**: Primera fase medular del ciclo de vida de una producción audiovisual, dedicada a la concepción, planificación estratégica, desarrollo de guiones, confección de presupuestos, selección de locaciones (scouting), casting, contratación de equipo técnico y calendarización logística antes del inicio del rodaje.
- **Contexto de Uso Operativo**: Fase fundacional que precede a cualquier gasto operativo masivo en set.
- **Ejemplo Práctico de Producción**: Cuatro semanas invertidas en afinar el guion técnico, tramitar permisos municipales de filmación y construir la utilería para un rodaje de dos días.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-produccion-de-video-1.webp` (1200x636) - "Diagrama de las tres fases de la produccion de video: preproduccion, produccion y postproduccion, con sus actividades". Diagrama de flujo temporal donde la Preproducción conecta los hitos de Guion -> Presupuesto -> Scouting -> Casting -> Rodaje.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'pre-production planning, film development schedule, budget breakdown board, location scouting preparation'.`
- **Relaciones Semánticas Inferidas**: 
  - *precede_a*: `produccion-de-video`, `rodaje`
  - *contiene*: `guion-literario`, `casting`, `scouting`, `call-sheet`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#preproduccion) | *Relacionados originales*: Guion técnico, Storyboard, Call sheet, Scouting

#### 128. [Scouting (Exploración de Locaciones)](#scouting)
- **Identificador Único (Slug)**: `scouting`
- **Título Original en Fuente**: `SCOUTING (Exploración de locaciones)`
- **Fases del Proceso**: Preproducción
- **Sinónimos y Alias**: Búsqueda de Locaciones, Recorrido Técnico de Locación, Location Scouting / Recce
- **Definición Técnica Original**: Inspección sistemática sobre el terreno de posibles escenarios para el rodaje, evaluando tanto su valor estético y narrativo como su viabilidad técnica: orientación solar, acústica ambiental, accesibilidad para vehículos pesados, potencia y suministro eléctrico, y permisos de filmación requeridos.
- **Contexto de Uso Operativo**: Fase intermedia de preproducción encabezada por el productor de locaciones, director y director de fotografía.
- **Ejemplo Práctico de Producción**: El equipo visita tres naves industriales para medir el eco reverberante, confirmar que las tomas de corriente soporten luces HMI de 4kW y verificar la luz solar a las 17:00.
- **Especificación Visual / Diagrama**: Fotografías panorámicas de la locación con brújula solar anotada, plano de planta acotado y tomas de los cuadros eléctricos disponibles.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'location scouting photo, technical site survey, architectural film location assessment, sun path diagram'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_parte_de*: `preproduccion`
  - *condiciona*: `iluminacion-de-tres-puntos`, `rodaje`, `audio-directo`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#scouting) | *Relacionados originales*: On location, Call sheet, Preproducción

#### 131. [Shot List (Lista de Planos)](#shot-list)
- **Identificador Único (Slug)**: `shot-list`
- **Título Original en Fuente**: `SHOT LIST (Lista de planos)`
- **Fases del Proceso**: Preproducción
- **Sinónimos y Alias**: Desglose de Planos, Lista de Tomas Planificadas, Planilla de Cámara
- **Definición Técnica Original**: Inventario secuencial y cronológico de todos los planos específicos que deben capturarse durante una jornada de filmación, ordenados no necesariamente según el orden narrativo del guion, sino agrupados por criterios de eficiencia técnica (mismo emplazamiento de luces, misma lente o misma dirección de mirada).
- **Contexto de Uso Operativo**: Herramienta operativa indispensable del primer asistente de dirección y del director de fotografía en el set de rodaje.
- **Ejemplo Práctico de Producción**: Se agrupan en la lista de planos todas las tomas mirando hacia la pared norte de la habitación para grabarlas en un solo bloque sin mover las luces principales.
- **Especificación Visual / Diagrama**: Tabla con casillas de verificación (check-boxes) numeradas con plano, lente, descripción de ángulo y columna de estado (Grabado / Pendiente).
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'shot list checklist, daily camera shot schedule, scene coverage checklist, production shot breakdown'.`
- **Relaciones Semánticas Inferidas**: 
  - *deriva_de*: `guion-tecnico`
  - *organiza*: `rodaje`
  - *se_vincula_con*: `coverage`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#shot-list) | *Relacionados originales*: Guion técnico, Storyboard, Coverage

#### 137. [Storyboard (Guion Gráfico)](#storyboard)
- **Identificador Único (Slug)**: `storyboard`
- **Título Original en Fuente**: `Storyboard`
- **Fases del Proceso**: Preproducción
- **Sinónimos y Alias**: Guion Gráfico, Pauta Visual, Visual Script Board
- **Definición Técnica Original**: Representación gráfica secuencial viñeta por viñeta de los planos que compondrán la película o video, ilustrando el encuadre exacto, la disposición de los actores, la dirección de miradas, los movimientos de cámara mediante flechas direccionales y los textos explicativos de acción o diálogo correspondientes.
- **Contexto de Uso Operativo**: Fase de preproducción para alinear la visión estética y espacial entre el director, el director de fotografía, el director de arte y el cliente.
- **Ejemplo Práctico de Producción**: Dibujo de un plano holandés con flechas curvas indicando que la cámara gira 45 grados mientras el personaje retrocede asustado hacia una puerta.
- **Especificación Visual / Diagrama**: Cuadrícula de viñetas rectangulares en formato 16:9 con espacio inferior para notas técnicas de plano, lente, movimiento y diálogo.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'film storyboard panels, comic-strip style shot breakdown, 16:9 sketched visual frames, camera motion arrows'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_la_base_de*: `animatic`
  - *traduce*: `guion-tecnico`
  - *es_un_tipo_de*: `previsualizacion`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#storyboard) | *Relacionados originales*: Guion técnico, Shot list

#### 138. [Storytelling (Narrativa Audiovisual)](#storytelling)
- **Identificador Único (Slug)**: `storytelling`
- **Título Original en Fuente**: `Storytelling`
- **Fases del Proceso**: Preproducción
- **Sinónimos y Alias**: Estructura Narrativa, Arte de Contar Historias, Arco Dramático
- **Definición Técnica Original**: Estructura arquitectónica y dramática que articula la premisa, los personajes, los conflictos, el clímax y la resolución de una obra audiovisual, conectando emocional e intelectualmente con la audiencia mediante la manipulación del tiempo, la información y el punto de vista.
- **Contexto de Uso Operativo**: Fase conceptual y de desarrollo de guion, aplicable tanto al cine como a la publicidad corporativa y el contenido para redes.
- **Ejemplo Práctico de Producción**: Estructurar un video de testimonio de un cliente en tres actos: 1) el problema frustrante inicial, 2) el viaje de descubrimiento, y 3) la transformación exitosa alcanzada.
- **Especificación Visual / Diagrama**: Gráfico de curva de tensión dramática clásica (introducción, detonante, conflicto ascendente, clímax y desenlace).
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'dramatic three-act story structure, cinematic narrative arc, emotional tension curve, storytelling beats'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_el_fundamento_de*: `guion-literario`, `narrativa-visual`
  - *guia*: `montaje`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#storytelling) | *Relacionados originales*: Guion literario, Escena, Narrativa visual

### Categoría: Dirección, Rodaje & Gestión de Set (13 Términos)

#### 7. [Asistente de Dirección (1st AD)](#asistente-de-direccion)
- **Identificador Único (Slug)**: `asistente-de-direccion`
- **Título Original en Fuente**: `Asistente De Dirección (AD)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Primer AD, First Assistant Director, Jefe de Set
- **Definición Técnica Original**: Jefe de departamento logístico y operativo en el set de rodaje, responsable directo de la confección del plan de rodaje (stripboard), la emisión de la orden del día (call sheet), el control exhaustivo de los tiempos en set y la disciplina de seguridad entre los distintos departamentos técnicos y artísticos.
- **Contexto de Uso Operativo**: Preproducción avanzada y presencia continua en set durante todas las jornadas de grabación.
- **Ejemplo Práctico de Producción**: El 1st AD cronometra el cambio de iluminación entre planos y anuncia con megáfono '10 minutos para primera toma' para mantener el cronograma del día.
- **Especificación Visual / Diagrama**: Plan de rodaje matricial con bandas de colores por locación, orden del día firmada y cronómetro en mano en set.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: '1st AD directing set crew, call sheet coordination, stripboard planning, on-set logistics management'.`
- **Relaciones Semánticas Inferidas**: 
  - *produce*: `call-sheet`
  - *supervisa*: `rodaje`
  - *se_coordina_con*: `direccion-de-fotografia`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#asistente-de-direccion) | *Relacionados originales*: Call sheet, Dirección de Fotografía, Rodaje

#### 22. [Clapperboard (Claqueta)](#clapperboard)
- **Identificador Único (Slug)**: `clapperboard`
- **Título Original en Fuente**: `Clapperboard (Claqueta)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Claqueta de Rodaje, Pizarra de Sincronización, Slate
- **Definición Técnica Original**: Dispositivo tradicional de madera, acrílico o digital con código de tiempo TC que muestra los datos de identificación de la toma (título de la producción, director, DF, número de escena, plano y toma). Su brazo articulado genera un sonido percusivo nítido y un contacto visual unívoco para sincronizar con precisión de fotograma la imagen con la pista de audio independiente en postproducción.
- **Contexto de Uso Operativo**: Inicio (o final en 'claqueta invertida') de cada toma grabada con sonido sincrónico en sistema de doble banda (cámara y grabador separados).
- **Ejemplo Práctico de Producción**: El segundo asistente de cámara coloca la claqueta frente al lente a 1 metro de distancia, canta 'Escena 12, plano 3, toma 1' y baja la barra con un golpe seco.
- **Especificación Visual / Diagrama**: Claqueta electrónica con display LED rojo de código de tiempo SMPTE iluminado y barras diagonales blancas y negras en la bisagra.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'film clapperboard slate, smart slate timecode display, scene take marker, production sync slate'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_utiliza_para*: `sync-sound`
  - *facilita*: `ingesta`, `montaje`
  - *identifica*: `take`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#clapperboard) | *Relacionados originales*: 

#### 33. [Dirección de Fotografía (Cinematografía / DP)](#direccion-de-fotografia)
- **Identificador Único (Slug)**: `direccion-de-fotografia`
- **Título Original en Fuente**: `Dirección De Fotografía (DP)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Director de Fotografía, DP / DoP, Cinematographer
- **Definición Técnica Original**: Máxima jefatura técnica y artística responsable de la creación estética de la imagen cinematográfica. Diseña y supervisa la iluminación, la selección y configuración de cámaras, la óptica, los filtros, los movimientos de cámara, la exposición fotométrica y el aspecto cromático general de la obra en estrecha colaboración con el director.
- **Contexto de Uso Operativo**: Desde el diseño conceptual en preproducción hasta la supervisión final del etalonaje y corrección de color en postproducción.
- **Ejemplo Práctico de Producción**: El DP decide usar lentes anamórficas antiguas con aperturas T1.5 y luces LED bicolor difusas con grandes telas para darle un look suave y nostálgico al largometraje.
- **Especificación Visual / Diagrama**: Fotómetro digital en mano, visor de director colgado al cuello e inspección de monitor calibrado con falso color.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'cinematography masterclass, ARRI Alexa LF look, anamorphic lens flare, stylized chiaroscuro lighting, master director of photography framing'.`
- **Relaciones Semánticas Inferidas**: 
  - *supervisa*: `gaffer`, `escala-de-planos`, `iluminacion-de-tres-puntos`
  - *colabora_con*: `asistente-de-direccion`, `etalonaje-color-grading`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#direccion-de-fotografia) | *Relacionados originales*: Gaffer, Iluminación de tres puntos, F-stop

#### 36. [DIT (Digital Imaging Technician) / Media Management](#dit-media-management)
- **Identificador Único (Slug)**: `dit-media-management`
- **Título Original en Fuente**: `DIT / Media Management`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Técnico de Imagen Digital, Data Manager, Gestor de Medios
- **Definición Técnica Original**: Especialista técnico en el set encargado del control de calidad de la señal digital de video, la aplicación y calibración de LUTs de visualización en monitores de referencia, la verificación de exposición y ruido mediante osciloscopios, y la ingesta, verificación checksum (MD5/xxHash) y respaldo redundante de los archivos brutos de las tarjetas de cámara.
- **Contexto de Uso Operativo**: Producciones profesionales de cine, series y comerciales rodados en formatos RAW o ProRes de alto flujo de datos.
- **Ejemplo Práctico de Producción**: El DIT descarga las tarjetas CFexpress de la cámara en un carro móvil con matrices RAID RAID-5, genera proxies H.264 para el director y aplica la LUT técnica para el monitor del cliente.
- **Especificación Visual / Diagrama**: Estación de trabajo DIT móvil montada en carrito Inovativ con monitores OLED calibrados, lectores de tarjetas de alta velocidad y DaVinci Resolve abierto.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'DIT cart workstation, on-set live grading, secure checksum data backup, calibrated Flanders monitor, digital imaging technician'.`
- **Relaciones Semánticas Inferidas**: 
  - *gestiona*: `raw`, `proxy`, `lut`
  - *asegura*: `ingesta`, `rodaje`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#dit-media-management) | *Relacionados originales*: Ingesta, Proxy, RAW

#### 52. [Gaffer (Jefe de Iluminación)](#gaffer)
- **Identificador Único (Slug)**: `gaffer`
- **Título Original en Fuente**: `Gaffer`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Jefe de Eléctricos, Chief Lighting Technician (CLT), Técnico Jefe de Iluminación
- **Definición Técnica Original**: Jefe técnico del departamento eléctrico que ejecuta el esquema de iluminación concebido por el Director de Fotografía. Coordina la distribución de potencia eléctrica, la selección, montaje y direccionamiento de luminarias (HMI, tungsteno, LED), y supervisa directamente al equipo de eléctricos y al best boy electric.
- **Contexto de Uso Operativo**: Presente durante el reconocimiento técnico de locaciones (recce) y liderando el montaje de luces en el set durante el rodaje.
- **Ejemplo Práctico de Producción**: El gaffer calcula que se requieren tres generadores insonorizados de 50kVA para alimentar las luces de tungsteno Maxi-Brute en la escena nocturna en el bosque.
- **Especificación Visual / Diagrama**: Técnico con guantes de cuero de protección térmica, cinta métrica, multímetro y walkie-talkie coordinando el izado de un proyector Skypanel en trípode Combo.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'film set gaffer, chief lighting technician adjusting HMI light, electrical rig on movie set, lighting crew'.`
- **Relaciones Semánticas Inferidas**: 
  - *ejecuta*: `iluminacion-de-tres-puntos`, `key-light`, `backlight`
  - *responde_a*: `direccion-de-fotografia`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#gaffer) | *Relacionados originales*: 

#### 91. [On Location (Rodaje en Locación)](#on-location)
- **Identificador Único (Slug)**: `on-location`
- **Título Original en Fuente**: `On Location`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Grabación en Exteriores / Interiores Reales, Rodaje en Terreno, Location Shooting
- **Definición Técnica Original**: Modalidad de producción cinematográfica o videográfica que se lleva a cabo en escenarios e inmuebles del mundo real en lugar de un plató o estudio cerrado insonorizado. Exige gestionar contingencias externas como variaciones de luz natural, ruido ambiental, tráfico y logística de traslado.
- **Contexto de Uso Operativo**: Documentales, reportajes de noticias, largometrajes con estética realista y spots grabados en oficinas o calles auténticas.
- **Ejemplo Práctico de Producción**: Filmar una escena de persecución a pie en el mercado central de una ciudad, requiriendo aislamiento de multitudes y permisos de vía pública.
- **Especificación Visual / Diagrama**: Camiones de producción aparcados en la acera, carpas de descanso, reflectores con banderas protegiendo la cámara del sol directo en plena calle.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'on-location film shoot, authentic city street backdrop, live urban movie set, realistic exterior production'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_opone_a*: `produccion-virtual`
  - *requiere*: `scouting`, `call-sheet`
  - *afecta*: `audio-directo`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#on-location) | *Relacionados originales*: 

#### 99. [Playback (Video Assist / Reproducción en Set)](#playback)
- **Identificador Único (Slug)**: `playback`
- **Título Original en Fuente**: `Playback`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Video Assist, Reproducción Inmediata, Comprobación de Toma
- **Definición Técnica Original**: Sistema y procedimiento que permite reproducir instantáneamente en los monitores del set la toma recién capturada por la cámara, permitiendo al director, los actores y los jefes de departamento evaluar la solidez de la interpretación actoral, la precisión del enfoque y la ausencia de anomalías técnicas.
- **Contexto de Uso Operativo**: Rutina inmediata tras dar la orden de 'corte' en el set de filmación profesional.
- **Ejemplo Práctico de Producción**: El director reúne a los dos actores alrededor del monitor SmallHD de 17 pulgadas para revisar la toma 2 y ajustar el timing de una réplica cómica.
- **Especificación Visual / Diagrama**: Pánel de control de video assist QTake con timeline mostrando marcas de entrada y salida y división de pantalla multicámara.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'director video assist monitor, on-set instant playback, QTake video replay review, reviewing take on set'.`
- **Relaciones Semánticas Inferidas**: 
  - *evalua*: `take`
  - *asiste_a*: `rodaje`, `asistente-de-direccion`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#playback) | *Relacionados originales*: Take, Sync sound

#### 103. [Producción de Video (Proceso Audiovisual Integral)](#produccion-de-video)
- **Identificador Único (Slug)**: `produccion-de-video`
- **Título Original en Fuente**: `Producción De Video`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Producción Audiovisual, Ciclo de Creación de Video, Video Production Workflow
- **Definición Técnica Original**: Disciplina y proceso industrial integral que abarca desde la formulación conceptual inicial de una idea hasta la entrega de la pieza terminada, articulado canónicamente en tres fases correlativas: Preproducción (concepción y planificación), Producción (rodaje y captación) y Postproducción (montaje, sonido, color y masterización).
- **Contexto de Uso Operativo**: Marco metodológico estándar para películas, publicidad comercial, videos corporativos, videoclips y contenido digital.
- **Ejemplo Práctico de Producción**: Un proyecto corporativo de 8 semanas que dedica 3 semanas a preproducción, 3 días a rodaje, y 4 semanas a edición, color y entrega de versiones para redes.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-produccion-de-video-1.webp` (1200x636) - "Diagrama de las tres fases de la produccion de video: preproduccion, produccion y postproduccion, con sus actividades". Infografía tripartita con flechas cronológicas conectando las etapas: Preproducción -> Producción / Rodaje -> Postproducción -> Distribución.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'professional video production workflow, 3-phase audiovisual process, full production pipeline chart'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_compone_de*: `preproduccion`, `rodaje`, `postproduccion`
  - *conduce_a*: `deliverable`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#produccion-de-video) | *Relacionados originales*: Preproducción, Rodaje, Postproducción

#### 104. [Producción Remota (REMI)](#produccion-remota)
- **Identificador Único (Slug)**: `produccion-remota`
- **Título Original en Fuente**: `Producción Remota (REMI)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: REMI (Remote Integration Model), Transmisión Centralizada Remota, Producción Descentralizada
- **Definición Técnica Original**: Modelo operativo de producción televisiva o de streaming en el que las señales de las cámaras y micrófonos situados físicamente en el lugar del evento se transportan mediante redes IP de ultra baja latencia (fibra oscura, 5G o protocolos SRT/NDI) hacia un centro de control o galería de realización ubicado a cientos de kilómetros, donde se realiza la mezcla, grafismo y emisión.
- **Contexto de Uso Operativo**: Transmisiones de grandes eventos deportivos, conciertos multitudinarios, convenciones corporativas globales y cobertura de elecciones.
- **Ejemplo Práctico de Producción**: Seis cámaras transmiten señales IP en 1080p50 desde el estadio de fútbol en Medellín a la sala de realizadores en Bogotá vía fibra óptica dedicada con menos de 100ms de retardo.
- **Especificación Visual / Diagrama**: Diagrama de red conectando encoders portátiles en el estadio a través de enlaces IP redundantes hacia un switcher central en el centro de control.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'REMI remote production, IP broadcast architecture, low latency sports remote feed, cloud video switching'.`
- **Relaciones Semánticas Inferidas**: 
  - *emplea*: `ndi`, `latencia`, `switcher-de-video`
  - *es_un_tipo_de*: `broadcasting`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#produccion-remota) | *Relacionados originales*: SRT, NDI, Latencia

#### 120. [Rodaje (Shooting / Principal Photography)](#rodaje)
- **Identificador Único (Slug)**: `rodaje`
- **Título Original en Fuente**: `RODAJE (Shooting)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Fase de Grabación, Fotografía Principal, Shooting Phase
- **Definición Técnica Original**: Fase de ejecución práctica en el set o locación donde se captura físicamente el material visual y sonoro (tomas) estipulado en el guion técnico, movilizando simultáneamente a actores, dirección, cámara, luces, sonido, arte, maquillaje y producción bajo estrictas pautas de tiempo.
- **Contexto de Uso Operativo**: Núcleo del proceso de producción audiovisual, habitualmente la etapa más costosa por jornada de trabajo.
- **Ejemplo Práctico de Producción**: Una jornada de rodaje de 10 horas en la que se ejecutan 18 configuraciones de cámara para completar las 3 páginas de guion programadas para el día.
- **Especificación Visual / Diagrama**: Set activo con dolly montado sobre rieles, reflector principal iluminando a los actores, caña de sonido suspendida y director atento al monitor de campo.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'active film set shooting, cinema camera on dolly tracks, actors in dramatic scene, full movie production set'.`
- **Relaciones Semánticas Inferidas**: 
  - *sucede_a*: `preproduccion`
  - *precede_a*: `postproduccion`
  - *genera*: `a-roll`, `b-roll`, `audio-directo`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#rodaje) | *Relacionados originales*: Producción de video, Call sheet, Coverage

#### 144. [Take (Toma)](#take)
- **Identificador Único (Slug)**: `take`
- **Título Original en Fuente**: `Take (Toma)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Toma de Cámara, Registro Individual, Shot Take
- **Definición Técnica Original**: Registro continuo e ininterrumpido de imagen y sonido comprendido entre la orden de '¡Acción!' y la orden de '¡Corte!'. Para un mismo plano del guion técnico suelen filmarse múltiples tomas hasta lograr la conjunción óptima de actuación, foco, movimiento de cámara e iluminación.
- **Contexto de Uso Operativo**: Unidad operativa fundamental de registro durante las jornadas de filmación.
- **Ejemplo Práctico de Producción**: El director solicita la 'Toma 4' del primer plano del protagonista debido a que en la toma anterior hubo un leve desenfoque al girar la cabeza.
- **Especificación Visual / Diagrama**: Claqueta marcando 'Plano 5 - Toma 3' antes de iniciar la acción; reporte de cámara (camera report) anotando 'Toma 3: Buena (Circle Take)'.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'film take slate numbering, multiple take filming, circle take notation, camera roll slate'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_la_unidad_de*: `rodaje`
  - *se_selecciona_en*: `rough-cut`
  - *se_vincula_con*: `clapperboard`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#take) | *Relacionados originales*: 

#### 163. [VFX Supervisor (Supervisor de Efectos Visuales)](#vfx-supervisor)
- **Identificador Único (Slug)**: `vfx-supervisor`
- **Título Original en Fuente**: `VFX Supervisor`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Supervisor de Efectos Digitales, Jefe de Efectos Visuales, Visual Effects Supervisor
- **Definición Técnica Original**: Jefe de departamento técnico y creativo que planifica, supervisa y garantiza la correcta captura de datos en el set de rodaje (medición de distancias con láser, capturas HDR de iluminación en esfera cromada/gris, puntos de tracking y pantallas de croma) para asegurar una integración fotorrealista y eficiente de los elementos generados por computadora en postproducción.
- **Contexto de Uso Operativo**: Desde el diseño conceptual de secuencias en preproducción hasta la aprobación de planos finales con CGI en el estudio de VFX.
- **Ejemplo Práctico de Producción**: En un plano donde un actor interactuará con una criatura 3D, el supervisor de VFX toma una fotografía 360° con esfera gris/espejada para reconstruir la luz exacta del set en el motor de render.
- **Especificación Visual / Diagrama**: Técnico en set sosteniendo una esfera mitad cromo y mitad gris neutro de 18% para capturar el mapa de luz HDRI en el lugar exacto del sujeto.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'VFX supervisor holding chrome ball, tracking markers on green screen, on-set data acquisition for CGI'.`
- **Relaciones Semánticas Inferidas**: 
  - *supervisa*: `vfx`, `camera-tracking`, `chroma-key`
  - *colabora_con*: `direccion-de-fotografia`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#vfx-supervisor) | *Relacionados originales*: 

#### 173. [Wrap (Fin de Rodaje / Finalización)](#wrap)
- **Identificador Único (Slug)**: `wrap`
- **Título Original en Fuente**: `Wrap`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Cierre de Rodaje, That's a Wrap, Final de Jornada
- **Definición Técnica Original**: Declaración formal emitida por el director o primer asistente de dirección que indica la finalización oficial del rodaje de una jornada de filmación ('daily wrap') o de la totalidad del plan de rodaje de una producción ('picture wrap'), dando inicio al desmontaje de equipos y la entrega de medios al laboratorio o DIT.
- **Contexto de Uso Operativo**: Momento culminante de cada jornada de set y celebración final del cierre de la fotografía principal de una película.
- **Ejemplo Práctico de Producción**: El 1st AD grita '¡Es un wrap para el elenco principal!', desatando aplausos en el set tras finalizar 25 días consecutivos de filmación.
- **Especificación Visual / Diagrama**: Técnicos enrollando cables BNC, guardando ópticas en sus maletines Pelican acolchados y desmontando trípodes pesados.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'film set wrap, wrapping up production day, packing cinema equipment into flight cases'.`
- **Relaciones Semánticas Inferidas**: 
  - *concluye*: `rodaje`
  - *da_paso_a*: `postproduccion`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#wrap) | *Relacionados originales*: 

### Categoría: Cámara, Encuadre & Movimiento (26 Términos)

#### 4. [Ángulo de Cámara](#angulo-de-camara)
- **Identificador Único (Slug)**: `angulo-de-camara`
- **Título Original en Fuente**: `Ángulo De Cámara`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Perspectiva Vertical de Cámara, Inclinación de Toma, Camera Angle
- **Definición Técnica Original**: Inclinación y altura del eje óptico de la cámara en relación con el sujeto encuadrado. Varía desde el ángulo normal (a la altura de los ojos, neutro) hasta el picado (desde arriba hacia abajo, sugiriendo vulnerabilidad o pequeñez), el contrapicado (desde abajo hacia arriba, sugiriendo poder o grandeza), el cenital (visión de pájaro perpendicular) y el nadir (visión desde el suelo hacia el cenit).
- **Contexto de Uso Operativo**: Planificación de puesta en escena y lenguaje visual en rodajes cinematográficos y publicitarios.
- **Ejemplo Práctico de Producción**: Uso de ángulo contrapicado pronunciado sobre el atleta vencedor en el podio para magnificar su triunfo ante el espectador.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-angulo-de-camara-1.webp` (1200x782) - "Angulos de camara en video: picado, normal y contrapicado vistos de perfil". Diagrama mostrando el eje de cámara apuntando en +45° (picado), 0° (normal) y -45° (contrapicado) frente al rostro del personaje.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'low angle hero shot, steep high angle shot, eye-level framing, zenith bird-eye perspective, dramatic camera tilt'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `encuadre`
  - *influye_en*: `narrativa-visual`
  - *se_combina_con*: `escala-de-planos`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#angulo-de-camara) | *Relacionados originales*: Composición, Plano Americano, Headroom

#### 18. [Cámara Lenta (Slow Motion)](#camara-lenta)
- **Identificador Único (Slug)**: `camara-lenta`
- **Título Original en Fuente**: `Cámara Lenta (Slow Motion)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Slow Motion, Ralentización de Imagen, Overcranking
- **Definición Técnica Original**: Efecto cinematográfico en el que el movimiento visible se reproduce a una velocidad significativamente inferior a la real. Se obtiene rodando a una frecuencia de captura superior al estándar de reproducción (por ejemplo 120 fps proyectados a 24 fps, logrando una ralentización de 5x sin interpolación). Revela microexpresiones, enfatiza la gravedad dramática y descompone fenómenos físicos imperceptibles a simple vista.
- **Contexto de Uso Operativo**: Tomas de acción deportiva, comerciales de bebidas y alimentos (tabletop), secuencias líricas y dramatización de emociones.
- **Ejemplo Práctico de Producción**: Captura a 240 fps del impacto de una gota de agua sobre una superficie líquida, permitiendo observar la corona simétrica que se forma al rebotar.
- **Especificación Visual / Diagrama**: Reproducción hiperfluida y desgranada en el tiempo sin artefactos de movimiento borroso ni cortes entre cuadros.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'ultra slow motion 240fps, overcranked high speed camera, Phantom Flex crystal clear slow-mo, smooth fluid action deceleration'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_equivalente_a*: `slow-motion`
  - *requiere*: `fps-frame-rate`, `velocidad-de-obturacion`
  - *se_opone_a*: `timelapse`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#camara-lenta) | *Relacionados originales*: FPS / Frame Rate, Timelapse, Bitrate

#### 19. [Camera Tracking (Seguimiento de Cámara / Matchmoving)](#camera-tracking)
- **Identificador Único (Slug)**: `camera-tracking`
- **Título Original en Fuente**: `Camera Tracking`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Matchmoving, Reconstrucción 3D de Cámara, Rastreo de Movimiento
- **Definición Técnica Original**: Técnica digital que analiza computacionalmente los cambios de perspectiva de un plano de rodaje en vivo para deducir con exactitud milimétrica la posición tridimensional, la rotación espacial, la distancia focal y la distorsión óptica de la cámara física a lo largo del tiempo, recreando una cámara virtual idéntica en el software de 3D/VFX.
- **Contexto de Uso Operativo**: Postproducción de efectos visuales cuando se insertan elementos CGI (edificios, criaturas, vehículos, textos 3D) en tomas con cámara en movimiento.
- **Ejemplo Práctico de Producción**: Rastreo de una toma en movimiento sobre una calle vacía para insertar edificios futuristas tridimensionales que mantengan un anclaje perfecto al pavimento.
- **Especificación Visual / Diagrama**: Nube de puntos de anclaje (feature points) en verde/amarillo proyectados sobre la imagen real con una rejilla de suelo 3D calibrada.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: '3D camera matchmoving, point cloud tracking markers, perspective calibrated camera solve, VFX tracking grid'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `vfx`
  - *permite*: `composicion`, `matte-painting`
  - *requiere*: `distancia-focal`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#camera-tracking) | *Relacionados originales*: Producción virtual, Volumen LED, VFX

#### 38. [Dolly Shot (Travelling sobre Rieles)](#dolly-shot)
- **Identificador Único (Slug)**: `dolly-shot`
- **Título Original en Fuente**: `Dolly Shot`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Travelling In / Out, Dolly In / Dolly Out, Plano en Carro
- **Definición Técnica Original**: Movimiento de cámara en el que la cámara física montada sobre un soporte con ruedas especiales se desplaza suavemente por el espacio tridimensional a lo largo de rieles metálicos nivelados (o ruedas de goma neumática sobre suelo liso), acercándose (dolly in), alejándose (dolly out) o acompañando lateralmente al sujeto.
- **Contexto de Uso Operativo**: Planos cinematográficos que exigen absoluta fluidez y sensación física de inmersión tridimensional en el espacio del set.
- **Ejemplo Práctico de Producción**: Un sutil dolly in frontal hacia el rostro del detective mientras une las pistas del misterio en su mente, aumentando la tensión dramática.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-movimientos-de-camara.webp` (1200x1900) - "Movimientos de camara agrupados en tres familias: paneo y tilt, travelling dolly y grua, y zoom". Vía de rieles metálicos rectos o curvos extendidos por el set con el carro Chapman o Fisher montado y el operador sentado en el brazo hidráulico.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'smooth dolly in shot, cinematic tracking rails, slow push in camera movement, physical dolly camera move'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `tracking-shot`
  - *se_diferencia_de*: `zoom-in-zoom-out`
  - *emplea*: `rodaje`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#dolly-shot) | *Relacionados originales*: Tracking shot, Zoom, Steadicam

#### 39. [Drone (UAV / Cinematografía Aérea)](#drone)
- **Identificador Único (Slug)**: `drone`
- **Título Original en Fuente**: `Drone`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Vuelo Aéreo, UAV Camera, Toma Aérea con Cuadricóptero
- **Definición Técnica Original**: Aeronave pilotada por control remoto equipada con un sistema de estabilización giroscópica de tres ejes y cámara cinematográfica de alta resolución, capaz de realizar tomas aéreas a baja, media y gran altura con trayectorias fluidas e inaccesibles para grúas convencionales o helicópteros tripulados.
- **Contexto de Uso Operativo**: Tomas de establecimiento paisajístico, seguimiento de vehículos a alta velocidad, inspección arquitectónica y planos cenitales espectaculares.
- **Ejemplo Práctico de Producción**: Un plano secuencia aéreo que sobrevuela las olas del océano y desciende suavemente hasta quedar a ras de la arena filmando a un surfista.
- **Especificación Visual / Diagrama**: Perspectiva cenital o panorámica a 50 metros de altura con horizonte curvo suave y sombras proyectadas desde el aire.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'cinematic FPV drone shot, sweeping aerial landscape, smooth drone fly-over, high altitude bird-eye tracking'.`
- **Relaciones Semánticas Inferidas**: 
  - *proporciona*: `establishing-shot`, `plano-general`
  - *es_un_tipo_de*: `camara-y-movimiento`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#drone) | *Relacionados originales*: 

#### 43. [Escala de Planos](#escala-de-planos)
- **Identificador Único (Slug)**: `escala-de-planos`
- **Título Original en Fuente**: `Escala De Planos`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Tipos de Plano, Gradación de Encuadres, Shot Scale / Framing Scale
- **Definición Técnica Original**: Sistema canónico de clasificación que categoriza la proporción que ocupa la figura humana o el objeto principal dentro del marco rectangular de la imagen. Abarca desde el Gran Plano General (énfasis en el entorno cósmico o geográfico) hasta el Plano Detalle (énfasis en un elemento minúsculo), pasando por Plano General, Plano Americano, Plano Medio y Primer Plano.
- **Contexto de Uso Operativo**: Planificación de guiones técnicos, listas de planos y montaje rítmico en cualquier producción audiovisual.
- **Ejemplo Práctico de Producción**: El paso secuencial de un plano general del desierto a un primerísimo primer plano de los ojos sudorosos del protagonista para crear intimidad psicológica.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-escala-de-planos-1.webp` (1200x2220) - "Escala de planos en video: del plano general al primerisimo primer plano sobre un mismo sujeto". Infografía pedagógica mostrando una misma figura humana dividida por líneas horizontales con las etiquetas de cada corte de plano.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'framing scale progression, master wide to extreme close-up, human proportion scale cinema framing'.`
- **Relaciones Semánticas Inferidas**: 
  - *contiene*: `plano-general`, `plano-americano`, `primer-plano`, `plano-detalle`
  - *articula*: `montaje`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#escala-de-planos) | *Relacionados originales*: Plano Americano, Plano Detalle, Composición

#### 45. [Establishing Shot (Plano de Situación / Establecimiento)](#establishing-shot)
- **Identificador Único (Slug)**: `establishing-shot`
- **Título Original en Fuente**: `Establishing Shot`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Plano de Situación, Toma de Establecimiento, Plano Establecedor
- **Definición Técnica Original**: Plano abierto o panorámico colocado habitualmente al inicio de una escena o secuencia para contextualizar geográficamente al espectador, informándole dónde transcurrirá la acción, la hora del día, la atmósfera climática y la escala física de los elementos antes de pasar a planos más cerrados.
- **Contexto de Uso Operativo**: Apertura de secuencias en ficción, transiciones entre locaciones en series de televisión y cabeceras de reportajes.
- **Ejemplo Práctico de Producción**: Plano general crepuscular de la fachada iluminada de un hospital seguido de un corte directo a la sala de emergencias interior.
- **Especificación Visual / Diagrama**: Vista abierta de la arquitectura o paisaje con iluminación ambiental marcada y ritmo pausado para permitir la lectura del entorno.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'establishing shot, wide contextual city exterior, atmospheric scene opener, location establishing frame'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `plano-general`
  - *precede_a*: `master-shot`, `primer-plano`
  - *orienta_al*: `storytelling`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#establishing-shot) | *Relacionados originales*: Composición, Master shot, Coverage

#### 53. [Gimbal (Estabilizador Motorizado de 3 Ejes)](#gimbal)
- **Identificador Único (Slug)**: `gimbal`
- **Título Original en Fuente**: `Gimbal`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Estabilizador Electrónico, Gimbal Motorizado, 3-Axis Motorized Rig
- **Definición Técnica Original**: Soporte electromecánico equipado con sensores giroscópicos y motores brushless en los tres ejes espaciales (pan, tilt y roll) que compensa activamente las vibraciones, sacudidas y balanceos provocados por el operador al caminar o correr, produciendo movimientos de cámara perfectamente fluidos y flotantes.
- **Contexto de Uso Operativo**: Rodajes dinámicos donde se requiere libertad de desplazamiento sin el peso y la infraestructura de rieles de dolly (bodas, documentales, eventos, comerciales urbanos).
- **Ejemplo Práctico de Producción**: El operador corre detrás de un atleta en una pista de atletismo sujetando un DJI Ronin RS3 Pro sin que la toma presente trepidaciones bruscas.
- **Especificación Visual / Diagrama**: Estructura metálica ligera con tres aros motorizados rodeando el cuerpo de la cámara y mango ergonómico con batería.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'smooth motorized gimbal shot, Ronin stabilized camera movement, floating fluid handheld motion'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `soporte-de-camara`
  - *es_alternativa_a*: `steadicam`, `dolly-shot`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#gimbal) | *Relacionados originales*: Steadicam, Dolly Shot, Tracking shot

#### 59. [Hyperlapse (Timelapse en Movimiento)](#hyperlapse)
- **Identificador Único (Slug)**: `hyperlapse`
- **Título Original en Fuente**: `Hyperlapse`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Timelapse Espacial, Moving Timelapse, Walklapse
- **Definición Técnica Original**: Variante avanzada del timelapse en la que la cámara física se desplaza físicamente distancias considerables a lo largo del espacio entre cada disparo fotográfico sucesivo, manteniendo un punto de anclaje visual fijo en el encuadre mediante estabilización técnica y matemática.
- **Contexto de Uso Operativo**: Videos de promoción turística, reels de viajes, transiciones estilizadas en videos musicales y apertura de videos corporativos modernos.
- **Ejemplo Práctico de Producción**: Recorrido acelerado de 500 metros por una avenida comercial donde los peatones y nubes pasan a toda velocidad mientras un monumento al fondo permanece inmóvil.
- **Especificación Visual / Diagrama**: Perspectiva de avance rápido hiperfluido con estelas de luz en los vehículos nocturnos y rigurosa estabilidad en el punto focal central.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'hyperlapse moving camera forward, dynamic high speed urban walklapse, stabilized motion blur timelapse'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_una_variante_de*: `timelapse`
  - *combina*: `tracking-shot`, `fps-frame-rate`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#hyperlapse) | *Relacionados originales*: 

#### 71. [Live Action (Imagen Real / Acción Real)](#live-action)
- **Identificador Único (Slug)**: `live-action`
- **Título Original en Fuente**: `Live Action`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Acción Real, Filmación con Personas Reales, Real-World Footage
- **Definición Técnica Original**: Término empleado para designar la captura audiovisual realizada en el mundo tangible con actores humanos de carne y hueso, escenarios reales o sets físicos iluminados convencionalmente, en contraposición directa a la animación gráfica, los gráficos generados por computadora (CGI) o las simulaciones virtuales.
- **Contexto de Uso Operativo**: Delimitación conceptual en producciones mixtas (híbridas) que combinan actores reales con animación o entornos de fantasía digital.
- **Ejemplo Práctico de Producción**: Una película que combina actores filmados en live action con un personaje animado en 3D que interactúa con ellos sobre una mesa.
- **Especificación Visual / Diagrama**: Imagen cinematográfica con texturas orgánicas reales, grano de sensor natural, reflejos físicos auténticos y respiración humana visible.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'photorealistic live action, real actors authentic set, practical in-camera lighting, tangible organic textures'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_opone_a*: `animacion-2d-3d`, `video-generativo`
  - *se_integra_con*: `vfx`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#live-action) | *Relacionados originales*: Animación 2D/3D, VFX, Chroma Key

#### 77. [Master Shot (Plano Maestro)](#master-shot)
- **Identificador Único (Slug)**: `master-shot`
- **Título Original en Fuente**: `Master Shot`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Toma Maestra, Master de Escena, Plano Protector Integral
- **Definición Técnica Original**: Registro continuo y completo en un solo plano relativamente abierto que abarca la totalidad de una escena dramática de principio a fin, registrando a todos los personajes participantes y sus acciones clave. Sirve como anclaje espacial de referencia y garantiza cobertura de respaldo si falla el montaje de planos cortos.
- **Contexto de Uso Operativo**: Primer plano que se rueda al abordar una nueva escena dramática en rodajes tradicionales de cine y televisión.
- **Ejemplo Práctico de Producción**: Filmar los 3 minutos de discusión de una pareja alrededor de la mesa del comedor en un plano general antes de acercarse a grabar los planos y contraplanos individuales.
- **Especificación Visual / Diagrama**: Encuadre amplio y equilibrado donde se visualiza la geografía completa de la habitación, las puertas, ventanas y la posición relativa de ambos actores.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'master shot scene coverage, continuous wide dramatic take, full room geography camera framing'.`
- **Relaciones Semánticas Inferidas**: 
  - *articula*: `coverage`
  - *precede_a*: `over-the-shoulder-shot`, `primer-plano`
  - *facilita*: `raccord`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#master-shot) | *Relacionados originales*: 

#### 85. [Motion Capture (Mocap / Captura de Movimiento)](#motion-capture)
- **Identificador Único (Slug)**: `motion-capture`
- **Título Original en Fuente**: `Motion Capture (Mocap)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Mocap, Performance Capture, Captura de Movimiento Digital
- **Definición Técnica Original**: Tecnología de registro cinemático que rastrea y digitaliza en tiempo real los movimientos corporales y gesticulaciones de un actor mediante trajes con marcadores reflectantes pasivos o sensores inerciales activos leídos por cámaras infrarrojas, transfiriendo esos datos a un esqueleto digital (rig) de un personaje tridimensional sintético.
- **Contexto de Uso Operativo**: Producción de largometrajes con personajes fantásticos digitales fotorrealistas, videojuegos AAA y animación 3D de alta gama.
- **Ejemplo Práctico de Producción**: Un actor viste un traje de neopreno con 60 bolitas reflectantes y realiza piruetas marciales para dar vida al monstruo gigante en una película de ciencia ficción.
- **Especificación Visual / Diagrama**: Plató negro rodeado de 24 cámaras infrarrojas en rig perimetral con el actor vistiendo traje gris y marcadores luminosos en cada articulación.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'motion capture mocap suit, optical marker tracking volume, digital rig performance capture, character animation mocap'.`
- **Relaciones Semánticas Inferidas**: 
  - *alimenta*: `animacion-2d-3d`, `vfx`
  - *es_parte_de*: `produccion-virtual`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#motion-capture) | *Relacionados originales*: Animación 2D/3D, Camera Tracking, VFX

#### 90. [Noddies (Planos de Asentimiento del Entrevistador)](#noddies)
- **Identificador Único (Slug)**: `noddies`
- **Título Original en Fuente**: `Noddies`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Reacciones del Entrevistador, Cutaway de Escucha, Reaction Shots
- **Definición Técnica Original**: Planos cortos de recurso (cutaways) rodados habitualmente tras concluir una entrevista formal, en los que se filma al periodista o entrevistador escuchando en silencio, asintiendo con la cabeza o mostrando atención respetuosa hacia el espacio donde se encontraba el entrevistado.
- **Contexto de Uso Operativo**: Periodismo televisivo, documental y videos corporativos testimoniales para disimular cortes en la edición de los parlamentos.
- **Ejemplo Práctico de Producción**: El editor inserta un 'noddy' de 2 segundos del periodista asintiendo para cortar una frase repetitiva del entrevistado sin que se perciba un jump cut brusco.
- **Especificación Visual / Diagrama**: Plano medio o primer plano del entrevistador mirando ligeramente fuera de eje con expresión de escucha atenta y asintiendo despacio.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'interviewer nodding reaction cutaway, attentive listening reaction shot, documentary cutaway nod'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `cutaway`
  - *evita*: `jump-cut`
  - *se_utiliza_en*: `a-roll`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#noddies) | *Relacionados originales*: 

#### 92. [Outtake (Toma Descartada / Blooper)](#outtake)
- **Identificador Único (Slug)**: `outtake`
- **Título Original en Fuente**: `Outtake`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Toma Descartada, Blooper, Material Inédito
- **Definición Técnica Original**: Registro de rodaje que no se utiliza en el corte final de la obra audiovisual, ya sea por equivocaciones del actor (ataque de risa, olvido de parlamento), fallos técnicos (desenfoque, sombra de boom imprevista) o decisiones editoriales de ritmo narrativo.
- **Contexto de Uso Operativo**: Archivo de producción, bobinas de bloopers promocionales para redes sociales o créditos finales de comedia.
- **Ejemplo Práctico de Producción**: En la toma 5 el protagonista olvida su texto a mitad de la frase y hace una broma a la cámara; se cataloga como outtake y se aparta del rough cut.
- **Especificación Visual / Diagrama**: Tomas marcadas con etiqueta roja en el software de edición o carpetas separadas tituladas 'Bloopers / Descartes'.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'funny film outtake, actor laughing blooper on set, blooper reel cut'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_opone_a*: `rough-cut`
  - *deriva_de*: `take`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#outtake) | *Relacionados originales*: 

#### 93. [Over-the-Shoulder Shot (Plano Sobre el Hombro / OTS)](#over-the-shoulder-shot)
- **Identificador Único (Slug)**: `over-the-shoulder-shot`
- **Título Original en Fuente**: `Over-the-Shoulder Shot`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Plano Esgrafiado, Plano Dorsal, OTS Shot
- **Definición Técnica Original**: Encuadre cinematográfico clásico de diálogo donde la cámara enfoca el rostro del sujeto en plano medio mientras incluye en primer término, desenfocado, el hombro y la nuca de su interlocutor, estableciendo con nitidez la distancia física, el eje de miradas y la conexión relacional entre ambos.
- **Contexto de Uso Operativo**: Planos y contraplanos en conversaciones dramáticas de cine, televisión y entrevistas de dos personajes.
- **Ejemplo Práctico de Producción**: Corte alternado entre planos OTS del detective y del sospechoso a ambos lados de la mesa de interrogatorio, reforzando la tensión entre ellos.
- **Especificación Visual / Diagrama**: Borde inferior o lateral ocupado por la silueta oscura desenfocada del hombro del interlocutor y el sujeto principal perfectamente nítido en el tercio opuesto.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'cinematic over-the-shoulder OTS shot, dialogue framing, shallow depth of field shoulder foreground, intense conversation angle'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `escala-de-planos`
  - *respeta*: `raccord`
  - *se_utiliza_para*: `coverage`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#over-the-shoulder-shot) | *Relacionados originales*: 

#### 95. [Plano Americano (Plano Tres Cuartos)](#plano-americano)
- **Identificador Único (Slug)**: `plano-americano`
- **Título Original en Fuente**: `Plano Americano`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Plano Tres Cuartos, Cowboy Shot, American Shot
- **Definición Técnica Original**: Encuadre cinematográfico que corta la figura humana aproximadamente por las rodillas o la mitad superior de los muslos. Nació formalmente en el cine western para permitir ver simultáneamente las expresiones faciales del actor y las cartucheras con las pistolas desenfundables a la cintura.
- **Contexto de Uso Operativo**: Escenas dramáticas donde es crucial observar la gesticulación corporal de los brazos y manos junto a la expresión facial y el vestuario.
- **Ejemplo Práctico de Producción**: Un orador corporativo exponiendo en un escenario mostrando la postura de sus manos al hablar y el movimiento seguro de sus pasos.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-escala-de-planos-1.webp` (1200x2220) - "Escala de planos en video: del plano general al primerisimo primer plano sobre un mismo sujeto". Línea de corte situada justo por encima o debajo de la articulación de la rodilla, nunca cortando directamente sobre la rótula por convención estética.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'cowboy shot, american shot knee-level cut, mid-thigh cinema framing, dynamic posture framing'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `escala-de-planos`
  - *se_situa_entre*: `plano-general`, `primer-plano`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#plano-americano) | *Relacionados originales*: Primer plano, Wide shot

#### 96. [Plano Detalle (Extreme Close-Up / Insert)](#plano-detalle)
- **Identificador Único (Slug)**: `plano-detalle`
- **Título Original en Fuente**: `Plano Detalle`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Insert Shot, Plano de Inserción, Plano Detallado
- **Definición Técnica Original**: Encuadre muy cerrado que aísla visualmente un objeto minúsculo o una parte anatómica muy concreta del personaje (los ojos humedecidos, un dedo presionando un detonador, la manecilla de un reloj avanzando), confiriéndole máxima carga dramática o revelando información narrativa decisiva.
- **Contexto de Uso Operativo**: Planos de recurso e inserciones dramáticas para dirigir la atención forzosa del espectador hacia una pista clave del relato.
- **Ejemplo Práctico de Producción**: Un plano detalle de la pantalla de un teléfono inteligente vibrando con un mensaje anónimo de advertencia.
- **Especificación Visual / Diagrama**: Profundidad de campo muy reducida (foco crítico) con el objeto ocupando el 90% del encuadre y desenfoque suave anterior y posterior.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'extreme close-up insert shot, macro cinema lens detail, razor-thin depth of field, dramatic object focus'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `escala-de-planos`
  - *funciona_como*: `cutaway`
  - *enfatiza*: `narrativa-visual`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#plano-detalle) | *Relacionados originales*: Escala de Planos, Cutaway, Composición

#### 97. [Plano General (Wide Shot / Long Shot)](#plano-general)
- **Identificador Único (Slug)**: `plano-general`
- **Título Original en Fuente**: `PLANO GENERAL (Wide shot)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Wide Shot, Plano Abierto, Plano de Conjunto
- **Definición Técnica Original**: Encuadre cinematográfico amplio en el que el sujeto humano aparece de cuerpo entero ocupando una fracción moderada del marco, privilegiando la lectura de su interacción física con el entorno arquitectónico o natural circundante.
- **Contexto de Uso Operativo**: Presentación de espacios, coreografías grupales, persecuciones y descripción del entorno vital de los personajes.
- **Ejemplo Práctico de Producción**: El protagonista caminando solo por un andén desierto de estación ferroviaria a medianoche bajo la luz mortecina de una farola.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-escala-de-planos-1.webp` (1200x2220) - "Escala de planos en video: del plano general al primerisimo primer plano sobre un mismo sujeto". Sujeto visible con suficiente aire por encima de la cabeza y por debajo de los pies, con horizonte y elementos de escenografía integrados.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'cinematic wide shot, full body framing in expansive environment, spatial relationship cinema framing'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `escala-de-planos`
  - *se_combina_con*: `establishing-shot`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#plano-general) | *Relacionados originales*: Plano Americano, Primer plano

#### 98. [Plano Secuencia (Long Take)](#plano-secuencia)
- **Identificador Único (Slug)**: `plano-secuencia`
- **Título Original en Fuente**: `Plano Secuencia`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Long Take, Toma Única Continua, Secuencia Sin Cortes
- **Definición Técnica Original**: Toma cinematográfica continua y de duración considerable que resuelve una escena o secuencia completa sin un solo corte de montaje, coordinando de forma virtuosa el movimiento coreografiado de la cámara con el desplazamiento de los actores y las modulaciones de iluminación.
- **Contexto de Uso Operativo**: Momentos culminantes de tensión dramática en largometrajes autorales, comerciales de alta dificultad técnica y aperturas emblemáticas.
- **Ejemplo Práctico de Producción**: Una cámara en Steadicam sigue a un chef ingresando por la puerta trasera del restaurante, cruzando la cocina en pleno caos y saliendo al salón principal en un solo plano fluido de 3 minutos.
- **Especificación Visual / Diagrama**: Transiciones naturales entre planos generales, medios y primeros planos logradas exclusivamente acercando o alejando la cámara físicamente sin cortes.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'unbroken long take, choreographed continuous plan-sequence, fluid seamless moving camera single take'.`
- **Relaciones Semánticas Inferidas**: 
  - *prescinde_de*: `montaje`
  - *requiere*: `steadicam`, `gimbal`, `raccord`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#plano-secuencia) | *Relacionados originales*: Coverage, Steadicam, Master shot, Dolly Shot

#### 102. [Primer Plano (Close-Up)](#primer-plano)
- **Identificador Único (Slug)**: `primer-plano`
- **Título Original en Fuente**: `Primer Plano`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Close-Up (CU), Plano Cerrado, Encuadre de Busto / Rostro
- **Definición Técnica Original**: Encuadre que abarca la figura humana desde los hombros o la base del cuello hasta la parte superior de la cabeza. Su propósito primordial es transmitir con máxima intimidad las emociones, miradas y sutilezas expresivas del personaje, eliminando casi todo elemento distractor del fondo.
- **Contexto de Uso Operativo**: Clímax de diálogos emocionales, testimonios sinceros en documentales y planos de oradores principales en piezas corporativas.
- **Ejemplo Práctico de Producción**: El rostro de la protagonista llenando la pantalla mientras sus ojos se llenan de lágrimas al recibir una noticia desgarradora.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-escala-de-planos-1.webp` (1200x2220) - "Escala de planos en video: del plano general al primerisimo primer plano sobre un mismo sujeto". Rostro humano centrado o en tercio, con enfoque impecable en el iris del ojo más cercano a la cámara y bokeh suave en el fondo.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'cinematic close-up portrait, emotional face framing, sharp focus on eyes, 85mm portrait bokeh background'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `escala-de-planos`
  - *se_asocia_con*: `a-roll`, `headroom`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#primer-plano) | *Relacionados originales*: Plano Americano, Over-the-Shoulder Shot

#### 132. [Slow Motion (Cámara Lenta Técnica)](#slow-motion)
- **Identificador Único (Slug)**: `slow-motion`
- **Título Original en Fuente**: `SLOW MOTION (Cámara lenta)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Cámara Lenta, High Frame Rate Shooting, Ralentí
- **Definición Técnica Original**: Técnica de grabación cinematográfica a alta tasa de cuadros (60, 120, 240 fps o superior) reproducida al ritmo de base del proyecto (24 o 25 fps) para desacelerar analíticamente el tiempo real. Exige una iluminación fotométrica proporcionalmente mayor debido a que la velocidad de obturación es muy alta (por ejemplo 1/480s a 240 fps según la regla de los 180 grados).
- **Contexto de Uso Operativo**: Cinematografía publicitaria de líquidos, planos dramáticos de impacto y análisis de alto rendimiento.
- **Ejemplo Práctico de Producción**: Filmación de una tostada cayendo al suelo a 120 fps para transmitir una sensación angustiosa y cómica de inevitabilidad en un comercial.
- **Especificación Visual / Diagrama**: Fluidez absoluta de cada fotograma individual sin trepidación ni desenfoque sintético generado por interpolación óptica de software.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'high-speed camera slow motion, crisp 120fps physics action, hyper-smooth deceleration cinematography'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_equivalente_a*: `camara-lenta`
  - *depende_de*: `tasa-de-fotogramas`, `velocidad-de-obturacion`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#slow-motion) | *Relacionados originales*: Tasa de fotogramas, Velocidad de obturación, Hyperlapse

#### 134. [Steadicam (Estabilizador Mecánico Pasivo)](#steadicam)
- **Identificador Único (Slug)**: `steadicam`
- **Título Original en Fuente**: `Steadicam`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Estabilizador Inercial, Chaleco y Brazo Isoelástico, Steadicam Rig
- **Definición Técnica Original**: Sistema mecánico de estabilización de cámara inventado por Garrett Brown compuesto por un chaleco acolchado que distribuye el peso sobre el torso del operador, un brazo isoelástico articulado con resortes calibrados y un poste (sled) con gimbal libre de fricción y contrapesos. Aísla mecánicamente los pasos del operador mediante inercia física pura sin motores eléctricos.
- **Contexto de Uso Operativo**: Rodaje de planos secuencia complejos, persecuciones por escaleras o terrenos irregulares donde se requiere un movimiento orgánico y fluido con cámaras pesadas de cine.
- **Ejemplo Práctico de Producción**: El operador de Steadicam sube corriendo una empinada escalera de caracol siguiendo los talones del actor sin que la toma oscile.
- **Especificación Visual / Diagrama**: Operador con chaleco y brazo metálico de resortes dobles conectado al mástil inferior con monitor y batería haciendo contrapeso.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'operator wearing Steadicam sled and vest, smooth organic floating camera move, cinema Steadicam rig'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `soporte-de-camara`
  - *permite*: `plano-secuencia`
  - *se_compara_con*: `gimbal`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#steadicam) | *Relacionados originales*: 

#### 149. [Tilt (Movimiento Vertical de Cámara)](#tilt)
- **Identificador Único (Slug)**: `tilt`
- **Título Original en Fuente**: `Tilt`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Tilt Up / Tilt Down, Basculación Vertical, Paneo Vertical
- **Definición Técnica Original**: Movimiento de cámara en el que la cámara permanece fija en su emplazamiento espacial pero gira sobre su eje transversal horizontal, apuntando el objetivo hacia arriba (tilt up) o hacia abajo (tilt down).
- **Contexto de Uso Operativo**: Descubrimiento vertical de personajes (de los pies a la cabeza), revelación de edificios monumentales o conexión visual entre dos alturas.
- **Ejemplo Práctico de Producción**: Un tilt up que comienza en las botas desgastadas del aventurero y asciende revelando su rostro curtido hasta mostrar la cima de la montaña que se propone escalar.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-movimientos-de-camara.webp` (1200x1900) - "Movimientos de camara agrupados en tres familias: paneo y tilt, travelling dolly y grua, y zoom". Rotación suave hacia arriba o abajo en la rótula de fricción fluida del trípode manteniendo el eje de roll perfectamente nivelado a 0°.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'smooth cinematic tilt up, revealing vertical camera movement, slow tilt down establishing frame'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `movimiento-de-camara`
  - *se_combina_con*: `tracking-shot`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#tilt) | *Relacionados originales*: 

#### 151. [Timelapse (Cámara Rápida por Intervalos)](#timelapse)
- **Identificador Único (Slug)**: `timelapse`
- **Título Original en Fuente**: `Timelapse`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Intervalometría, Lapso de Tiempo, Aceleración Temporal
- **Definición Técnica Original**: Técnica fotográfica y videográfica en la que se capturan imágenes a intervalos temporales regulares mucho más espaciados de lo normal (por ejemplo, una fotografía cada 5 segundos) y luego se reproducen a velocidad estándar (24 fps), provocando la ilusión de que el tiempo transcurre a una velocidad vertiginosa.
- **Contexto de Uso Operativo**: Visualización del movimiento de estrellas en el cielo nocturno, tráfico vehicular, floración de plantas y construcción de edificios.
- **Ejemplo Práctico de Producción**: La construcción de un rascacielos de 40 pisos resumida en un clip dinámico de 30 segundos grabado durante dos años de trabajo.
- **Especificación Visual / Diagrama**: Luces de automóviles trazando líneas continuas aceleradas y sombras solares cruzando vertiginosamente las fachadas arquitectónicas.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'cinematic day-to-night timelapse, moving cloud shadows, fast forward real-world time compression'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_opone_a*: `camara-lenta`, `slow-motion`
  - *se_desarrolla_en*: `hyperlapse`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#timelapse) | *Relacionados originales*: 

#### 152. [Tracking Shot (Plano de Seguimiento)](#tracking-shot)
- **Identificador Único (Slug)**: `tracking-shot`
- **Título Original en Fuente**: `Tracking Shot`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Travelling de Seguimiento, Follow Shot, Plano en Movimiento
- **Definición Técnica Original**: Cualquier plano en el que la cámara se desplaza físicamente por el entorno acompañando el movimiento del sujeto (adelante, atrás o paralelamente a él), manteniendo constante la distancia relativa y la composición del encuadre mediante rieles, vehículos, grúas, Steadicam o gimbals.
- **Contexto de Uso Operativo**: Secuencias de marcha, paseos dialogados de personajes (walk and talk) y persecuciones enérgicas.
- **Ejemplo Práctico de Producción**: Dos médicos caminando rápidamente por los pasillos de un hospital mientras debaten el diagnóstico, con la cámara retrocediendo frente a ellos al mismo compás.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-movimientos-de-camara.webp` (1200x1900) - "Movimientos de camara agrupados en tres familias: paneo y tilt, travelling dolly y grua, y zoom". Fondo que se desplaza lateralmente con notable sensación de paralaje y perspectiva tridimensional mientras el sujeto se mantiene estable en el encuadre.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'dynamic tracking shot, camera moving parallel with subject, walk-and-talk smooth tracking movement'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `movimiento-de-camara`
  - *incluye*: `dolly-shot`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#tracking-shot) | *Relacionados originales*: 

#### 177. [Zoom In / Zoom Out (Zoom Óptico)](#zoom-in-zoom-out)
- **Identificador Único (Slug)**: `zoom-in-zoom-out`
- **Título Original en Fuente**: `Zoom In / Zoom Out`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Acercamiento Óptico, Zoom Óptico, Variación Focal Continua
- **Definición Técnica Original**: Alteración continua de la distancia focal de un objetivo zoom mientras la cámara permanece fija en su emplazamiento, provocando el acercamiento óptico (zoom in) o alejamiento óptico (zoom out) del sujeto. Modifica la compresión de planos y el campo visual aparente sin alterar la perspectiva espacial ni generar efecto de paralaje.
- **Contexto de Uso Operativo**: Transmisiones deportivas en vivo, reportajes de noticias, estética retro de los años 70 y reencuadres rápidos sin cortar la toma.
- **Ejemplo Práctico de Producción**: Un rápido zoom in hacia los ojos sorprendidos del personaje (crash zoom / snap zoom) al ver llegar al villano inesperadamente.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-movimientos-de-camara.webp` (1200x1900) - "Movimientos de camara agrupados en tres familias: paneo y tilt, travelling dolly y grua, y zoom". El sujeto crece o decrece en el cuadro mientras el fondo se agranda o empequeñece proporcionalmente sin que la cámara se mueva un centímetro del suelo.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'optical zoom in, crash zoom onto face, 70s cinema snap zoom, variable focal length movement'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_diferencia_de*: `dolly-shot`
  - *opera_mediante*: `distancia-focal`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#zoom-in-zoom-out) | *Relacionados originales*: 

### Categoría: Óptica, Enfoque & Composición (12 Términos)

#### 25. [Composición (Encuadre Cinematográfico)](#composicion)
- **Identificador Único (Slug)**: `composicion`
- **Título Original en Fuente**: `Composición`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Composición Visual, Diseño de Encuadre, Frame Composition
- **Definición Técnica Original**: Organización deliberada y armónica de los elementos visuales (sujetos, líneas de fuerza, volúmenes, luces, sombras y colores) dentro de los límites físicos del marco rectangular de la imagen cinematográfica, guiando la mirada del espectador y comunicando relaciones de jerarquía y emoción.
- **Contexto de Uso Operativo**: Decisión constante del director y director de fotografía al emplazar la cámara y disponer la escenografía y los actores.
- **Ejemplo Práctico de Producción**: Uso de líneas arquitectónicas convergentes del pasillo para forzar la mirada del espectador directamente hacia la figura solitaria al final del corredor.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-composicion.webp` (1200x908) - "Composicion del encuadre: regla de tercios, aire sobre la cabeza y aire de mirada". Cuadrícula geométrica superpuesta con puntos nodales áureos, líneas diagonales de tensión y equilibrio de pesos visuales laterales.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'golden ratio cinematic composition, leading lines framing, balanced visual weight, harmonious cinema mise-en-scene'.`
- **Relaciones Semánticas Inferidas**: 
  - *incorpora*: `regla-de-los-tercios`, `headroom`
  - *se_expresa_en*: `direccion-de-fotografia`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#composicion) | *Relacionados originales*: Ángulo de cámara, Headroom

#### 32. [Diafragma (Apertura / Iris)](#diafragma)
- **Identificador Único (Slug)**: `diafragma`
- **Título Original en Fuente**: `DIAFRAGMA (Apertura)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Apertura de Lente, Iris Mecánico, Aperture Iris
- **Definición Técnica Original**: Mecanismo óptico compuesto por un conjunto de láminas metálicas superpuestas ubicado en el interior del objetivo que se abre o cierra para regular la cantidad física de luz que atraviesa el lente y alcanza el sensor o emulsión, controlando de forma directa la profundidad de campo resultante.
- **Contexto de Uso Operativo**: Ajuste fundamental de exposición y estética fotográfica en la cámara antes de rodar cualquier plano.
- **Ejemplo Práctico de Producción**: Abrir el diafragma a f/1.4 para dejar entrar suficiente luz en una escena nocturna con velas y lograr que sólo los ojos del sujeto queden en foco.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-exposicion.webp` (1200x1474) - "Triangulo de exposicion: diafragma, velocidad de obturacion e ISO y el efecto de cada uno". Círculo poligonal de palas metálicas que se ensancha (apertura amplia, ej. f/1.4) o se contrae a un pequeño orificio (apertura cerrada, ej. f/16).
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'wide lens aperture f1.4, shallow depth of field iris, circular bokeh blades, optical diaphragm control'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_mide_en*: `f-stop`
  - *determina*: `profundidad-de-campo`
  - *conforma*: `triangulo-de-exposicion`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#diafragma) | *Relacionados originales*: F-stop, Profundidad de campo, ISO

#### 35. [Distancia Focal (Focal Length)](#distancia-focal)
- **Identificador Único (Slug)**: `distancia-focal`
- **Título Original en Fuente**: `Distancia Focal`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Longitud Focal, Focal Length (mm), Milimetraje Óptico
- **Definición Técnica Original**: Distancia física medida en milímetros comprendida entre el centro óptico del objetivo (punto nodal posterior) y el plano focal del sensor cuando el lente está enfocado a infinito. Determina el ángulo de visión aparente (campo visual) y el grado de compresión espacial entre los planos de la escena.
- **Contexto de Uso Operativo**: Selección del lente idóneo (fijo o zoom) para cada toma según la distancia al sujeto y la estética deseada.
- **Ejemplo Práctico de Producción**: Elegir un lente de 85mm para comprimir el fondo detrás del personaje frente a un lente de 24mm que exagera la profundidad y abre el ángulo de visión.
- **Especificación Visual / Diagrama**: Escala graduada de milímetros (18mm, 35mm, 50mm, 85mm, 135mm) grabada en el anillo metálico exterior del cilindro del lente de cine.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: '50mm prime lens perspective, 85mm portrait telephoto compression, 24mm wide angle perspective distortion'.`
- **Relaciones Semánticas Inferidas**: 
  - *clasifica*: `lente-gran-angular`, `lente-telefoto`
  - *influye_en*: `profundidad-de-campo`, `zoom-in-zoom-out`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#distancia-focal) | *Relacionados originales*: Lente gran angular, Lente telefoto, Profundidad de campo

#### 47. [F-stop (Número f / Apertura Numérica)](#f-stop)
- **Identificador Único (Slug)**: `f-stop`
- **Título Original en Fuente**: `F-stop`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Número f, Apertura Relativa, f-number
- **Definición Técnica Original**: Cociente adimensional resultante de dividir la distancia focal del objetivo entre el diámetro de la pupila de entrada del diafragma (f = F / D). La progresión geométrica estándar (f/1.4, f/2, f/2.8, f/4, f/5.6, f/8, f/11, f/16) indica que cada salto hacia arriba reduce exactamente a la mitad la luz que entra al sensor.
- **Contexto de Uso Operativo**: Parámetro técnico fijado en el anillo de diafragmas de la cámara para calibrar la exposición y la profundidad de campo.
- **Ejemplo Práctico de Producción**: Cerrar dos pasos de diafragma de f/2.8 a f/5.6 para que tanto el orador en primer plano como el producto en la mesa detrás queden nítidos.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-exposicion.webp` (1200x1474) - "Triangulo de exposicion: diafragma, velocidad de obturacion e ISO y el efecto de cada uno". Escala numérica grabada en el objetivo con valores estandarizados f/1.4, f/2, f/2.8 con marcas para tercios de paso (1/3 stop).
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'aperture f/2.8, sharp focal plane at f/5.6, razor-thin focal slice at f/1.2, calibrated f-stop depth'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_la_medida_de*: `diafragma`
  - *condiciona*: `profundidad-de-campo`, `intensidad-luminosa`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#f-stop) | *Relacionados originales*: Diafragma, Profundidad de campo, ISO

#### 49. [Focus Peaking (Resalte de Enfoque)](#focus-peaking)
- **Identificador Único (Slug)**: `focus-peaking`
- **Título Original en Fuente**: `Focus Peaking`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Ayuda de Enfoque por Contorno, Asistente de Foco por Borde, Peaking
- **Definición Técnica Original**: Herramienta digital de asistencia visual incorporada en monitores de cámara y visores electrónicos (EVF) que detecta las áreas de mayor contraste de alta frecuencia (bordes nítidos) y las resalta en tiempo real con un contorno coloreado brillante (verde, rojo, blanco o azul) para confirmar qué elementos están en foco exacto.
- **Contexto de Uso Operativo**: Foco manual durante tomas rápidas con cámara al hombro, gimbals o lentes cinematográficas sin autofoco.
- **Ejemplo Práctico de Producción**: El foquista (1st AC) observa cómo las pestañas del actor se tiñen de rojo en el monitor del visor al girar el follow focus, confirmando el foco perfecto.
- **Especificación Visual / Diagrama**: Bordes del rostro y contornos de vestuario delineados con líneas brillantes en color magenta o cian fluorescente sobre el visor.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'focus peaking visual aid, high contrast edge highlighting, camera monitor focus assist overlay'.`
- **Relaciones Semánticas Inferidas**: 
  - *asiste_a*: `profundidad-de-campo`
  - *es_una_herramienta_de*: `rodaje`, `direccion-de-fotografia`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#focus-peaking) | *Relacionados originales*: Zebra, Profundidad de campo

#### 57. [Headroom (Aire Superior / Margen Superior)](#headroom)
- **Identificador Único (Slug)**: `headroom`
- **Título Original en Fuente**: `Headroom`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Aire Sobre la Cabeza, Margen Superior de Encuadre, Head Space
- **Definición Técnica Original**: Espacio visual intencional dejado entre el extremo superior de la cabeza del sujeto encuadrado y el borde superior del marco de la imagen. Un headroom adecuado evita la sensación de ahogo o aplastamiento (si es muy escaso) o de vacío compositivo desbalanceado (si es excesivo).
- **Contexto de Uso Operativo**: Regla clásica de encuadre en entrevistas, noticieros, ficción dramática y retratos corporativos.
- **Ejemplo Práctico de Producción**: Ajustar la inclinación de la cámara para dejar dos dedos de aire entre el cabello del entrevistado y el límite superior de la pantalla de 16:9.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-composicion.webp` (1200x908) - "Composicion del encuadre: regla de tercios, aire sobre la cabeza y aire de mirada". Distancia vertical equilibrada en el tercio superior del encuadre, manteniendo la línea de los ojos en la línea superior de la regla de tercios.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'proper headroom framing, balanced head space, rule of thirds eye-line composition, professional portrait framing'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_parte_de*: `composicion`
  - *se_aplica_en*: `primer-plano`, `plano-americano`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#headroom) | *Relacionados originales*: 

#### 69. [Lente Gran Angular (Wide Angle Lens)](#lente-gran-angular)
- **Identificador Único (Slug)**: `lente-gran-angular`
- **Título Original en Fuente**: `Lente gran angular`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Objetivo Gran Angular, Lente Abierto, Wide Angle Optics
- **Definición Técnica Original**: Objetivo óptico cuya distancia focal es significativamente más corta que la diagonal del sensor (típicamente por debajo de 35mm en formato Full Frame de 35mm), ofreciendo un amplio ángulo de visión (más de 60 grados), gran profundidad de campo inherente y una exageración de la perspectiva espacial que aleja los planos de fondo.
- **Contexto de Uso Operativo**: Planos generales de paisajes, arquitectura de interiores reducidos, tomas de acción envolventes y planos dinámicos con gimbals.
- **Ejemplo Práctico de Producción**: Uso de un lente de 16mm para filmar el interior de un automóvil pequeño, permitiendo abarcar al conductor y al copiloto en el mismo plano.
- **Especificación Visual / Diagrama**: Perspectiva dinámica con líneas de fuga pronunciadas hacia los bordes y leve distorsión de barril en los extremos del marco.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: '16mm wide angle lens, expansive perspective, exaggerated architectural depth, deep depth of field'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `distancia-focal`
  - *se_opone_a*: `lente-telefoto`
  - *facilita*: `establishing-shot`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#lente-gran-angular) | *Relacionados originales*: 

#### 70. [Lente Telefoto (Telephoto Lens)](#lente-telefoto)
- **Identificador Único (Slug)**: `lente-telefoto`
- **Título Original en Fuente**: `Lente telefoto`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Teleobjetivo, Lente Largo, Long Lens
- **Definición Técnica Original**: Objetivo óptico de distancia focal larga (típicamente superior a 70mm o 85mm en formato Full Frame de 35mm) que proporciona un ángulo de visión estrecho, una notable compresión de la distancia espacial aparente entre el sujeto y el fondo, y una profundidad de campo sumamente reducida que aísla al motivo con un pronunciado desenfoque suave (bokeh).
- **Contexto de Uso Operativo**: Retratos cinematográficos cerrados, filmación de fauna silvestre, eventos deportivos y planos íntimos rodados a gran distancia.
- **Ejemplo Práctico de Producción**: Un lente de 200mm filmando a un personaje caminando por una calle concurrida: los edificios y transeúntes del fondo parecen estar pegados inmediatamente detrás de él.
- **Especificación Visual / Diagrama**: Sujeto nítido con fondo completamente cremoso y comprimido en capas pictóricas bidimensionales.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: '200mm telephoto lens, compressed background perspective, creamy bokeh background separation, cinematic subject isolation'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `distancia-focal`
  - *se_opone_a*: `lente-gran-angular`
  - *reduce*: `profundidad-de-campo`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#lente-telefoto) | *Relacionados originales*: 

#### 106. [Profundidad de Campo (Depth of Field / DoF)](#profundidad-de-campo)
- **Identificador Único (Slug)**: `profundidad-de-campo`
- **Título Original en Fuente**: `Profundidad De Campo`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Depth of Field (DoF), Zona de Nitidez Aceptable, DoF
- **Definición Técnica Original**: Distancia por delante y por detrás del punto exacto enfocado en la que los elementos de la escena se perciben con nitidez aceptable para el ojo humano. Depende de cuatro variables físicas: la apertura del diafragma (a mayor apertura f/1.4, menor DoF), la distancia focal del lente (a mayor milimetraje, menor DoF), la distancia física al sujeto (más cerca, menor DoF) y el tamaño físico del sensor.
- **Contexto de Uso Operativo**: Principal recurso óptico para jerarquizar elementos en la imagen aislando al sujeto del fondo en cine de ficción y comerciales.
- **Ejemplo Práctico de Producción**: Lograr una profundidad de campo de apenas 2 centímetros para que solo la pupila del actor esté nítida y el resto del entorno se disuelva en un desenfoque pictórico.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-exposicion.webp` (1200x1474) - "Triangulo de exposicion: diafragma, velocidad de obturacion e ISO y el efecto de cada uno". Plano focal nítido con degradación progresiva hacia adelante y atrás hacia discos de confusión desenfocados (bokeh).
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'shallow depth of field, f/1.4 bokeh blur background, razor thin focus plane, subject separation cinema look'.`
- **Relaciones Semánticas Inferidas**: 
  - *depende_de*: `diafragma`, `distancia-focal`
  - *determina*: `bokeh`, `primer-plano`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#profundidad-de-campo) | *Relacionados originales*: Diafragma, Distancia focal, F-stop

#### 115. [Regla de los Tercios](#regla-de-los-tercios)
- **Identificador Único (Slug)**: `regla-de-los-tercios`
- **Título Original en Fuente**: `Regla De Los Tercios`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Cuadrícula de Tercios, Composición en Tercios, Rule of Thirds
- **Definición Técnica Original**: Directriz clásica de composición visual que divide el marco en una cuadrícula imaginaria de 3x3 mediante dos líneas horizontales y dos verticales equidistantes. Establece que ubicar los puntos de interés principal (como los ojos del actor o la línea del horizonte) a lo largo de estas líneas o en sus cuatro intersecciones nodales produce una imagen mucho más dinámica y equilibrada que una composición rígidamente centrada.
- **Contexto de Uso Operativo**: Encuadre fundamental enseñado en cinematografía y fotografía para guiar la disposición de personajes y paisajes.
- **Ejemplo Práctico de Producción**: Colocar al orador en la línea vertical del tercio derecho, dejando los dos tercios izquierdos abiertos hacia donde dirige su mirada.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-composicion.webp` (1200x908) - "Composicion del encuadre: regla de tercios, aire sobre la cabeza y aire de mirada". Líneas guía punteadas dividiendo la pantalla en 9 rectángulos iguales con cuatro círculos en las intersecciones clave.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'rule of thirds alignment, offset dynamic framing, subject placed on third line intersection, professional photographic balance'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_parte_de*: `composicion`
  - *se_combina_con*: `headroom`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#regla-de-los-tercios) | *Relacionados originales*: Composición, Ángulo de cámara, Headroom

#### 121. [Rolling Shutter (Obturador Electrónico Progresivo)](#rolling-shutter)
- **Identificador Único (Slug)**: `rolling-shutter`
- **Título Original en Fuente**: `Rolling Shutter`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Efecto Gelatina, Jello Effect, Obturador Rodante
- **Definición Técnica Original**: Método de lectura electrónica empleado por la gran mayoría de sensores CMOS modernos en el que la imagen no se captura en un solo instante global simultáneo, sino que se escanea progresivamente línea por línea desde la parte superior hasta la inferior. En movimientos de cámara muy bruscos o giros de hélices, genera distorsiones geométricas características (inclinaciones oblicuas o efecto gelatina).
- **Contexto de Uso Operativo**: Consideración técnica al operar cámaras en tomas de acción rápida, montajes en vehículos con vibración o helicópteros.
- **Ejemplo Práctico de Producción**: Al pasar rápidamente un tren frente a la cámara, los postes verticales de luz parecen inclinarse en diagonal debido al tiempo de lectura del sensor.
- **Especificación Visual / Diagrama**: Líneas verticales que se comban como paralelogramos o hélices de avión que adoptan formas curvas distorsionadas en cuadros individuales.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'rolling shutter artifact, jello effect distortion, horizontal sensor scan line skewing'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_defecto_de*: `sensor-cmos`
  - *se_opone_a*: `global-shutter`
  - *afecta*: `velocidad-de-obturacion`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#rolling-shutter) | *Relacionados originales*: Velocidad de obturación, Steadicam

#### 176. [Zebra (Patrón de Rayas de Cebra)](#zebra)
- **Identificador Único (Slug)**: `zebra`
- **Título Original en Fuente**: `Zebra`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Líneas de Cebra, Asistente de Exposición Cebra, Zebra Stripes
- **Definición Técnica Original**: Herramienta de monitorización y exposición electrónica que superpone un patrón dinámico de rayas diagonales animadas en blanco y negro sobre las áreas de la imagen que alcanzan o superan un nivel de luminosidad IRE predeterminado (por ejemplo, 70% IRE para calibrar tonos de piel caucásica o 100% IRE para detectar zonas quemadas de sobreexposición irreversible).
- **Contexto de Uso Operativo**: Ajuste rápido y seguro de diafragma en rodajes documentales, eventos en vivo y exteriores con luz cambiante.
- **Ejemplo Práctico de Producción**: El operador ajusta el anillo de diafragma hasta que el patrón de cebra al 70% apenas empieza a aparecer en los pómulos iluminados del presentador.
- **Especificación Visual / Diagrama**: Rayas diagonales a 45 grados superpuestas sobre las altas luces en la pantalla LCD de la cámara sin grabarse en el archivo final.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'zebra stripes exposure overlay, 70 IRE zebra skin tone calibration, camera exposure zebra pattern'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_una_herramienta_de*: `exposicion`
  - *previene*: `sobreexposicion`
  - *se_complementa_con*: `waveform-y-vectorscope`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#zebra) | *Relacionados originales*: 

### Categoría: Iluminación, Exposición & Fotometría (8 Términos)

#### 12. [Backlight (Luz de Contraluz / Luz de Recorte)](#backlight)
- **Identificador Único (Slug)**: `backlight`
- **Título Original en Fuente**: `BACKLIGHT (Contraluz)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Luz de Recorte, Rim Light, Hair Light, Contraluz
- **Definición Técnica Original**: Fuente de iluminación ubicada detrás del sujeto y orientada hacia la cámara (habitualmente desde un ángulo elevado y fuera de cuadro) que ilumina los hombros, contornos y cabello del personaje. Crea un fino halo luminoso brillante que separa visualmente al sujeto de fondos oscuros, aportando tridimensionalidad y volumen al encuadre.
- **Contexto de Uso Operativo**: Tercer componente del esquema clásico de iluminación de tres puntos en sets de entrevistas, ficción y televisión.
- **Ejemplo Práctico de Producción**: Un proyector LED Fresnel suave de 300W colocado en lo alto detrás del entrevistado perfila su silueta separándola limpiamente de la pared azul marina del fondo.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-iluminacion-de-tres-puntos-1.webp` (1200x1120) - "Esquema de iluminacion de tres puntos visto desde arriba: luz principal, de relleno y contraluz". Fina línea luminosa que bordea la cabeza y hombros del sujeto contrastando fuertemente con el fondo oscuro.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'cinematic rim light, hair backlight separation, crisp edge lighting, rim illumination on subject'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_parte_de*: `iluminacion-de-tres-puntos`
  - *se_combina_con*: `key-light`
  - *separa_del*: `fondo`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#backlight) | *Relacionados originales*: Iluminación de tres puntos, Key light, Composición

#### 60. [Iluminación de Tres Puntos (Three-Point Lighting)](#iluminacion-de-tres-puntos)
- **Identificador Único (Slug)**: `iluminacion-de-tres-puntos`
- **Título Original en Fuente**: `Iluminación De Tres Puntos`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Esquema Clásico de Tres Luces, Triángulo de Iluminación, Three-Point Rig
- **Definición Técnica Original**: Configuración clásica y metodológica fundamental de iluminación cinematográfica compuesta por tres fuentes lumínicas coordinadas: 1) Luz Principal (Key Light), que define la forma y exposición básica; 2) Luz de Relleno (Fill Light), ubicada en el lado opuesto para suavizar las sombras y controlar el contraste; y 3) Luz de Contraluz (Backlight/Rim Light), que perfila al sujeto por detrás para separarlo del fondo.
- **Contexto de Uso Operativo**: Estándar de partida para iluminación en estudios de televisión, entrevistas corporativas, retratos dramáticos y fotografía publicitaria.
- **Ejemplo Práctico de Producción**: Se emplaza una luz principal a 45° a la izquierda del sujeto, un panel difuso a 45° a la derecha a mitad de potencia para relleno, y un foco cenital posterior para recorte.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-iluminacion-de-tres-puntos-1.webp` (1200x1120) - "Esquema de iluminacion de tres puntos visto desde arriba: luz principal, de relleno y contraluz". Plano de planta cenital mostrando el triángulo de 45° formado por la cámara, las dos luces frontales y el contraluz trasero.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'three-point lighting setup, key light 45 degrees, soft fill light, rim light backlight, studio portrait lighting'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_compone_de*: `key-light`, `backlight`
  - *modula*: `intensidad-luminosa`, `temperatura-de-color`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#iluminacion-de-tres-puntos) | *Relacionados originales*: Key light, Backlight, Temperatura de color

#### 62. [Intensidad Luminosa (Luminancia / Flujo Luminoso)](#intensidad-luminosa)
- **Identificador Único (Slug)**: `intensidad-luminosa`
- **Título Original en Fuente**: `Intensidad Luminosa`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Potencia Lumínica, Nivel de Iluminación, Luminous Intensity
- **Definición Técnica Original**: Cantidad física de energía luminosa emitida por una fuente de luz o incidente sobre una superficie, cuantificada técnicamente en luxes, candelas o foot-candles. En el set de rodaje se mide con un fotómetro o exposímetro incidente para determinar el contraste lumínico (lighting ratio) entre zonas de luces y sombras.
- **Contexto de Uso Operativo**: Calibración fotométrica realizada por el Director de Fotografía y el Gaffer para ajustar las potencias de cada proyector.
- **Ejemplo Práctico de Producción**: Medir con fotómetro incidente 800 lux en el rostro del personaje para fijar una relación de contraste 4:1 con respecto a las sombras de 200 lux.
- **Especificación Visual / Diagrama**: Cúpula difusora blanca del exposímetro Sekonic colocada frente al sujeto apuntando hacia la fuente de luz con lectura digital en Lux o EV.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'dramatic lighting ratio 4 to 1, high key bright illumination, low key chiaroscuro illumination, measured photometric light'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_mide_con*: `fotometro`
  - *influye_en*: `iso`, `f-stop`
  - *es_controlado_por*: `gaffer`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#intensidad-luminosa) | *Relacionados originales*: Luminancia, Temperatura de color, F-stop

#### 63. [ISO (Sensibilidad del Sensor)](#iso)
- **Identificador Único (Slug)**: `iso`
- **Título Original en Fuente**: `ISO`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Sensibilidad ISO, Índice de Exposición (EI), Sensor Gain
- **Definición Técnica Original**: Escala estandarizada internacionalmente que cuantifica la amplificación electrónica de la señal generada por el sensor digital de la cámara ante la luz incidente. Valores bajos (ISO 100-400) entregan máxima fidelidad cromática, menor ruido y mayor rango dinámico; valores elevados (ISO 3200-12800) permiten rodar con luz muy escasa a costa de introducir grano digital (ruido térmico y de cuantificación).
- **Contexto de Uso Operativo**: Ajuste básico de cámara adaptado a las condiciones lumínicas de la locación y el look deseado.
- **Ejemplo Práctico de Producción**: Fijar la cámara en su ISO Nativo Dual (Base ISO 800 para exteriores de día, Base ISO 3200 para escenas nocturnas en interiores).
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-exposicion.webp` (1200x1474) - "Triangulo de exposicion: diafragma, velocidad de obturacion e ISO y el efecto de cada uno". Comparativa de fotogramas donde a ISO 100 las sombras son negras y limpias y a ISO 12800 se aprecia un moteado visible de píxeles de color (ruido de crominancia).
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'clean low ISO grain-free image, native ISO 800 film texture, high ISO low-light digital noise'.`
- **Relaciones Semánticas Inferidas**: 
  - *forma_parte_de*: `triangulo-de-exposicion`
  - *genera*: `ruido-digital`
  - *interactua_con*: `velocidad-de-obturacion`, `diafragma`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#iso) | *Relacionados originales*: Diafragma, Velocidad de obturación, Reducción de ruido por IA

#### 65. [Key Light (Luz Principal)](#key-light)
- **Identificador Único (Slug)**: `key-light`
- **Título Original en Fuente**: `Key Light`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Luz Guía, Luz de Ataque, Primary Key Light
- **Definición Técnica Original**: Fuente de luz primaria, dominante y más potente que incide sobre el sujeto en una escena. Establece la dirección aparente de la luz (motivación lumínica), define la exposición base del sujeto y modela el volumen tridimensional del rostro mediante el dibujo característico de sus sombras.
- **Contexto de Uso Operativo**: Punto de partida ineludible en el diseño de cualquier esquema de iluminación en rodaje.
- **Ejemplo Práctico de Producción**: Un domo difusor Aputure de 120cm con panal (grid) colocado a 45 grados de la entrevistada actuando como luz principal suave y halagadora para la piel.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-iluminacion-de-tres-puntos-1.webp` (1200x1120) - "Esquema de iluminacion de tres puntos visto desde arriba: luz principal, de relleno y contraluz". Sombra suave triangular (iluminación Rembrandt) dibujada bajo la nariz y en la mejilla opuesta del personaje.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'Rembrandt key light, soft large diffused key light, 45 degree key lighting, dominant cinematic key source'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_la_base_de*: `iluminacion-de-tres-puntos`
  - *se_equilibra_con*: `fill-light`, `backlight`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#key-light) | *Relacionados originales*: 

#### 148. [Temperatura de Color (Kelvin / CCT)](#temperatura-de-color)
- **Identificador Único (Slug)**: `temperatura-de-color`
- **Título Original en Fuente**: `Temperatura De Color`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: CCT (Correlated Color Temperature), Grados Kelvin, Cálido / Frío
- **Definición Técnica Original**: Propiedad física del espectro electromagnético de una fuente de luz cuantificada en grados Kelvin (K), basada en el color de la radiación emitida por un cuerpo negro teórico al calentarse. Valores bajos (2700K - 3200K) corresponden a luces cálidas anaranjadas (fuego, lámparas de tungsteno); valores intermedios (5600K) representan la luz solar blanca neutral (Daylight); y valores altos (6500K - 10000K) corresponden a sombras frías y cielos nublados.
- **Contexto de Uso Operativo**: Configuración de luminarias y ajuste de balance de blancos para garantizar tonos de piel precisos o crear contrastes estéticos deliberados.
- **Ejemplo Práctico de Producción**: Mezclar una luz principal fría de 5600K que simula luz de luna entrando por la ventana con una lámpara práctica de mesa cálida de 2700K para generar contraste cromático.
- **Especificación Visual / Diagrama**: Barra de gradiente espectral que va desde el naranja dorado a 2000K pasando por el blanco puro a 5500K hasta el azul cobalto a 9000K.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: '5600K daylight balanced light, warm 3200K tungsten interior lighting, cinematic orange and teal color temperature contrast'.`
- **Relaciones Semánticas Inferidas**: 
  - *calibra_el*: `white-balance`
  - *se_mide_en*: `kelvin`
  - *condiciona_el*: `etalonaje-color-grading`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#temperatura-de-color) | *Relacionados originales*: White balance, Iluminación de tres puntos

#### 161. [Velocidad de Obturación (Shutter Speed / Shutter Angle)](#velocidad-de-obturacion)
- **Identificador Único (Slug)**: `velocidad-de-obturacion`
- **Título Original en Fuente**: `Velocidad De Obturación`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Tiempo de Exposición, Shutter Speed (1/s), Ángulo de Obturación (180°)
- **Definición Técnica Original**: Duración de tiempo exacta durante la cual el sensor permanece expuesto a la luz para registrar un único fotograma (por ejemplo, 1/50 de segundo). En cinematografía, la regla estándar de los 180 grados estipula que la velocidad de obturación debe ser exactamente el doble del frame rate (1/48s para 24 fps) para producir un desenfoque de movimiento (motion blur) natural y orgánico para el ojo humano.
- **Contexto de Uso Operativo**: Ajuste básico de cámara vinculado al frame rate y a la cantidad de movimiento borroso deseado en la acción.
- **Ejemplo Práctico de Producción**: Ajustar la obturación a 1/1000s en una escena de combate para eliminar el motion blur, produciendo un movimiento hipernítido, entrecortado y visceral (efecto 'Salvando al soldado Ryan').
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-exposicion.webp` (1200x1474) - "Triangulo de exposicion: diafragma, velocidad de obturacion e ISO y el efecto de cada uno". Comparativa entre dos fotogramas de una mano en movimiento: con obturación 1/50s la mano se ve difuminada suavemente; con 1/1000s cada dedo aparece congelado como foto fija.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: '180 degree shutter angle motion blur, fast shutter 1/1000s staccato action, natural cinematic motion blur'.`
- **Relaciones Semánticas Inferidas**: 
  - *forma_parte_de*: `triangulo-de-exposicion`
  - *depende_de*: `tasa-de-fotogramas`, `fps-frame-rate`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#velocidad-de-obturacion) | *Relacionados originales*: Tasa de fotogramas, ISO, Diafragma

#### 172. [White Balance (Balance de Blancos)](#white-balance)
- **Identificador Único (Slug)**: `white-balance`
- **Título Original en Fuente**: `WHITE BALANCE (Balance de blancos)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Equilibrio de Blancos, Calibración de Blancos, WB
- **Definición Técnica Original**: Ajuste electrónico del procesador de cámara mediante el cual se le indica qué temperatura de color específica debe interpretarse como blanco químicamente neutro (R=G=B). Elimina las dominantes de color indeseadas (como tonos amarillentos bajo bombillas incandescentes o azulados en sombra abierta), logrando que los colores y tonos de piel se reproduzcan con fidelidad natural.
- **Contexto de Uso Operativo**: Calibración obligatoria previa a la grabación cada vez que cambia la fuente de iluminación o locación.
- **Ejemplo Práctico de Producción**: Colocar una carta gris neutro de 18% frente al rostro del actor e iniciar la calibración de balance de blancos personalizado (Custom WB) de la cámara.
- **Especificación Visual / Diagrama**: Carta de calibración X-Rite ColorChecker con sus parches de blanco, grises y colores primarios sostenida frente al lente.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'accurate neutral white balance, calibrated skin tones, no unwanted color cast, true color temperature fidelity'.`
- **Relaciones Semánticas Inferidas**: 
  - *depende_de*: `temperatura-de-color`
  - *asegura_la*: `fidelidad-cromatica`
  - *facilita*: `etalonaje-color-grading`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#white-balance) | *Relacionados originales*: Temperatura de color, Etalonaje, RAW

### Categoría: Audio Directo & Microfonía (8 Términos)

#### 8. [Audio Directo (Sonido de Producción)](#audio-directo)
- **Identificador Único (Slug)**: `audio-directo`
- **Título Original en Fuente**: `Audio Directo`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Sonido de Producción, Sonido Directo de Set, Production Sound
- **Definición Técnica Original**: Registro electroacústico de las voces, ambientes y efectos de sonido capturados en vivo durante el rodaje sincrónico de las tomas de cámara, utilizando micrófonos direccionales (boom) y transmisores inalámbricos de solapa (lavalier) conectados a grabadores multipista portátiles.
- **Contexto de Uso Operativo**: Jornadas de rodaje en set interior o exteriores para captar la actuación vocal fidedigna con la máxima relación señal/ruido posible.
- **Ejemplo Práctico de Producción**: Captura simultánea en 4 canales discretos: caña boom superior para el ambiente general y dos lavaliers inalámbricos en los cuellos de los entrevistados.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-cadena-de-audio.webp` (1200x1152) - "Cadena de audio en video: microfono, preamplificador, grabadora, mezcla y master, con tipos de microfono". Grabador de audio Sound Devices con potenciómetros analógicos e indicadores vúmetro LED en verde/amarillo bordeando -18 dBFS.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'production sound capture, boom mic overhead, multi-track field recorder, clean dialogue capture, isolated audio channels'.`
- **Relaciones Semánticas Inferidas**: 
  - *requiere*: `boom`, `lavalier`, `phantom-power`, `xlr`
  - *alimenta*: `ingesta`, `mezcla-de-sonido`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#audio-directo) | *Relacionados originales*: Sync sound, Boom, Lavalier, ADR

#### 15. [Boom (Micrófono de Caña / Shotgun)](#boom)
- **Identificador Único (Slug)**: `boom`
- **Título Original en Fuente**: `BOOM (Micrófono de caña)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Micrófono Shotgun, Pértiga de Sonido, Caña de Sonido
- **Definición Técnica Original**: Sistema de captación acústica compuesto por una pértiga telescópica extensible de fibra de carbono y un micrófono direccional de tubo de interferencia (shotgun con patrón polar hipercardioide o supercardioide). Permite posicionar la cápsula a escasos centímetros por encima de las cabezas de los actores, justo fuera del límite superior del encuadre, captando un diálogo rico, corpóreo y sin reverberaciones indeseadas.
- **Contexto de Uso Operativo**: Grabación principal de diálogos en escenas de ficción, cine, entrevistas sentadas y series de televisión.
- **Ejemplo Práctico de Producción**: El operador de boom sostiene la pértiga a 3 metros de altura con una suspensión antivibratoria y un cortavientos (zeppelin/deadcat) para neutralizar el viento en la playa.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-cadena-de-audio.webp` (1200x1152) - "Cadena de audio en video: microfono, preamplificador, grabadora, mezcla y master, con tipos de microfono". Pértiga de 4 metros extendida sobre los actores con cápsula apuntando hacia la boca a 45 grados y cable XLR enrollado a lo largo del mástil.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'boom pole overhead microphone, shotgun mic with deadcat windshield, cinema boom operator capturing dialogue'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `microfono`
  - *alimenta*: `audio-directo`
  - *se_conecta_con*: `xlr`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#boom) | *Relacionados originales*: Lavalier, Audio directo, Mezcla de sonido

#### 68. [Lavalier (Micrófono de Solapa / Corbatero)](#lavalier)
- **Identificador Único (Slug)**: `lavalier`
- **Título Original en Fuente**: `LAVALIER (Micrófono de solapa)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Micrófono de Corbata, Lavalier Inalámbrico, Lapel Mic
- **Definición Técnica Original**: Micrófono electrodinámico o de condensador miniatura con cápsula omnidireccional diseñado para ser prendido de forma discreta en la ropa del sujeto (solapa, corbata, cuello) o completamente oculto bajo el vestuario mediante adhesivos médicos especiales. Conectado a una petaca transmisora inalámbrica UHF/digital, asegura una relación señal/ruido constante sin importar el movimiento del actor en el set.
- **Contexto de Uso Operativo**: Entrevistas en movimiento, conferencias corporativas, reality shows y planos generales de ficción donde una caña boom entraría en cuadro.
- **Ejemplo Práctico de Producción**: Instalación de una cápsula Sanken COS-11D oculta bajo el cuello de la camisa del director ejecutivo para grabar su ponencia mientras camina por el auditorio.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-cadena-de-audio.webp` (1200x1152) - "Cadena de audio en video: microfono, preamplificador, grabadora, mezcla y master, con tipos de microfono". Cápsula diminuta de 4mm con clip metálico y cable fino conectado al transmisor inalámbrico sujeto al cinturón trasero del orador.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'discreet lavalier lapel microphone, wireless transmitter beltpack, clean close-mic speech capture'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `microfono`
  - *proporciona*: `audio-directo`
  - *se_complementa_con*: `boom`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#lavalier) | *Relacionados originales*: Boom, Audio directo, Phantom power

#### 82. [Mixer (Mesa de Mezclas de Audio / Grabador Portátil)](#mixer)
- **Identificador Único (Slug)**: `mixer`
- **Título Original en Fuente**: `MIXER (Mesa de mezclas)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Consola de Sonido de Campo, Mezclador Multipista, Field Audio Recorder / Mixer
- **Definición Técnica Original**: Dispositivo electrónico especializado que recibe múltiples señales de micrófonos simultáneas a través de preamplificadores de bajo ruido analógicos, permitiendo ecualizar, filtrar frecuencias graves indeseadas (paso alto / low cut), ajustar ganancias individuales, enrutar envíos auxiliares y mezclar en vivo una pista estéreo o registrar cada canal de forma aislada (tracks ISO) en tarjetas de memoria de estado sólido.
- **Contexto de Uso Operativo**: Estación de trabajo del sonidista jefe (production sound mixer) en el carrito de sonido o bolso de campo durante el rodaje.
- **Ejemplo Práctico de Producción**: El sonidista monitorea con audífonos cerrados Sennheiser HD25, ajustando el fader del canal 1 (boom) y balanceando los canales 2 y 3 (lavaliers) mientras graba a 24-bit / 48kHz.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-cadena-de-audio.webp` (1200x1152) - "Cadena de audio en video: microfono, preamplificador, grabadora, mezcla y master, con tipos de microfono". Carcasa de aluminio con potenciómetros rotatorios con protección metálica, pantalla OLED de lectura de picos y puertos XLR en los laterales.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'Sound Devices field mixer recorder, multi-track audio console, professional audio mixer dials and meters'.`
- **Relaciones Semánticas Inferidas**: 
  - *procesa*: `audio-directo`
  - *proporciona*: `phantom-power`
  - *entrega*: `stems`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#mixer) | *Relacionados originales*: Mezcla de sonido, Boom, Switcher de video

#### 94. [Phantom Power (+48V / Alimentación Fantasma)](#phantom-power)
- **Identificador Único (Slug)**: `phantom-power`
- **Título Original en Fuente**: `PHANTOM POWER (Alimentación fantasma)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Alimentación +48V, Phantom Powering, P48
- **Definición Técnica Original**: Método estandarizado (norma IEC 61938) para suministrar corriente continua (+48 voltios) a través de los mismos conductores balanceados de un cable XLR estándar que transmiten la señal de audio, utilizado para polarizar las placas del condensador y alimentar los circuitos preamplificadores internos de micrófonos de condensador profesionales sin necesidad de baterías externas.
- **Contexto de Uso Operativo**: Activado mediante un interruptor físico en grabadoras, mezcladores e interfaces de audio cada vez que se conecta un micrófono de condensador o caña boom.
- **Ejemplo Práctico de Producción**: El sonidista activa el botón '+48V' en la grabadora portátil para hacer funcionar el micrófono shotgun Sennheiser MKH416 en el set.
- **Especificación Visual / Diagrama**: Interruptor serigrafiado con '+48V' o indicador LED rojo iluminado junto a la entrada hembra XLR de la consola.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'phantom power +48V switch, balanced audio power delivery, professional studio condenser mic powering'.`
- **Relaciones Semánticas Inferidas**: 
  - *alimenta*: `boom`
  - *se_transmite_por*: `xlr`
  - *es_suministrado_por*: `mixer`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#phantom-power) | *Relacionados originales*: XLR, Boom, Mezcla de sonido

#### 122. [Room Tone (Tono de Sala / Ruido de Fondo de Locación)](#room-tone)
- **Identificador Único (Slug)**: `room-tone`
- **Título Original en Fuente**: `ROOM TONE (Tono de sala)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Sonido Ambiente de Sala, Presence Track, Ambiente Neutro de Set
- **Definición Técnica Original**: Grabación continua de audio ambiental de 30 a 60 segundos realizada en riguroso silencio absoluto por parte de todo el equipo en la locación exacta donde se filmaron las escenas. Registra las propiedades acústicas específicas del espacio (zumbidos de aire acondicionado inaudibles, resonancias de paredes, eco natural), utilizándose en postproducción para rellenar huecos entre cortes de diálogo y garantizar una transición acústica imperceptible.
- **Contexto de Uso Operativo**: Grabado religiosamente al concluir el rodaje en cada locación o set antes de desmontar los micrófonos.
- **Ejemplo Práctico de Producción**: El 1st AD pide '¡Silencio absoluto en set para tono de sala, un minuto!', mientras el sonidista graba el aire estático del aula vacía.
- **Especificación Visual / Diagrama**: Forma de onda de audio continua, suave y de baja amplitud en la línea de tiempo de Pro Tools sirviendo como base homogénea bajo los clips de diálogo.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'room tone audio recording, silent film set ambient presence, acoustic floor room tone track'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `audio-directo`
  - *facilita*: `mezcla-de-sonido`, `adr`
  - *evita*: `cortes-acusticos`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#room-tone) | *Relacionados originales*: Audio directo, Mezcla de sonido, Foley

#### 143. [Sync Sound (Sonido Sincrónico / Audio Sincronizado)](#sync-sound)
- **Identificador Único (Slug)**: `sync-sound`
- **Título Original en Fuente**: `Sync Sound (Sonido sincronizado)`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Sonido Sincronizado, Audio en Fase, Double-System Sound Sync
- **Definición Técnica Original**: Procedimiento y condición en la que la pista de audio registrada coincide con una precisión matemática absoluta (a nivel de submili-segundo y de fotograma) con el movimiento labial de los actores y los acontecimientos físicos visibles en el plano de video, lograda mediante código de tiempo SMPTE compartido vía inalámbrica (Tentacle Sync) o el golpe de la claqueta.
- **Contexto de Uso Operativo**: Fase de rodaje con sistema de doble banda (cámara y grabador independientes) y primera fase de ingesta en el software de montaje.
- **Ejemplo Práctico de Producción**: Sincronización automática de 200 clips de video con sus pistas de audio WAV multipista correspondientes en DaVinci Resolve utilizando el código de tiempo incrustado.
- **Especificación Visual / Diagrama**: Pico agudo transitorio en la forma de onda de audio alineado exactamente con el fotograma de video donde las dos barras de la claqueta hacen contacto físico.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'sync sound waveform alignment, frame-accurate lip sync, audio timecode synchronization'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_logra_con*: `clapperboard`, `timecode`
  - *es_requisito_de*: `montaje`, `a-roll`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#sync-sound) | *Relacionados originales*: 

#### 174. [XLR (Conector de Audio Balanceado Cannon)](#xlr)
- **Identificador Único (Slug)**: `xlr`
- **Título Original en Fuente**: `XLR`
- **Fases del Proceso**: Producción
- **Sinónimos y Alias**: Conector Cannon, Cable de Audio Balanceado de 3 Pines, XLR-3
- **Definición Técnica Original**: Estándar industrial de conexión eléctrica circular y balanceada de tres clavijas (Pin 1: masa/chasis; Pin 2: polo positivo/fase; Pin 3: polo negativo/contrafase). Su circuito balanceado cancela pasivamente las interferencias electromagnéticas y ruidos de radiofrecuencia a lo largo de cables de decenas de metros, convirtiéndolo en el estándar indiscutible para microfonía y señales de nivel de línea profesional.
- **Contexto de Uso Operativo**: Conexión de micrófonos, consolas, altavoces activos y enlaces de audio en sets de rodaje, estudios y unidades móviles.
- **Ejemplo Práctico de Producción**: Tirar una línea de cable XLR de 30 metros desde el mástil del boom en la playa hasta la carpa del sonidista sin sufrir zumbidos eléctricos inducidos.
- **Especificación Visual / Diagrama**: Conector metálico cilíndrico robusto Neutrik con pestillo de seguridad retráctil y tres pines dorados internos.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'Neutrik XLR 3-pin connector, balanced shielded audio cable, professional stage audio jack'.`
- **Relaciones Semánticas Inferidas**: 
  - *conecta*: `boom`, `mixer`
  - *transporta*: `phantom-power`, `audio-directo`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#xlr) | *Relacionados originales*: Phantom power, Boom, Audio directo

### Categoría: Postproducción de Sonido & Acústica (9 Términos)

#### 3. [ADR (Automated Dialogue Replacement)](#adr)
- **Identificador Único (Slug)**: `adr`
- **Título Original en Fuente**: `ADR (Automated Dialogue Replacement)`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Doblaje de Diálogo en Estudio, Post-sincronización, Looping
- **Definición Técnica Original**: Proceso de postproducción de audio en el que los actores regraban sus parlamentos en una sala acústicamente tratada observando en pantalla la imagen de su actuación original, con el fin de reemplazar diálogos con ruido excesivo, subsanar defectos de dicción o modificar matices dramáticos.
- **Contexto de Uso Operativo**: Estudios de sonorización en postproducción cinematográfica y publicitaria cuando el audio de locación no alcanza estándares de claridad técnica.
- **Ejemplo Práctico de Producción**: Regrabación del diálogo susurrado de los protagonistas en una escena filmada cerca de una cascada ruidosa, sincronizando cada fonema con la pista visual.
- **Especificación Visual / Diagrama**: Monitor de estudio con código de tiempo y barras guía (beeps o streamers visuales) que marcan la entrada exacta del diálogo.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'studio booth ADR recording, high SNR dialogue replacement, clean speech track, lip-sync audio replacement'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_utiliza_para*: `mezcla-de-sonido`
  - *sucede_a*: `audio-directo`
  - *se_diferencia_de*: `doblaje`
  - *requiere*: `timecode`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#adr) | *Relacionados originales*: Doblaje, Audio directo, Mezcla de sonido

#### 9. [Audio Inmersivo (Dolby Atmos / Audio Espacial)](#audio-inmersivo)
- **Identificador Único (Slug)**: `audio-inmersivo`
- **Título Original en Fuente**: `AUDIO INMERSIVO (Dolby Atmos)`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Spatial Audio, Sonido Basado en Objetos, Dolby Atmos, Ambisonics
- **Definición Técnica Original**: Formato y paradigma de mezcla sonora multidimensional que prescinde del enrutamiento rígido a canales fijos (5.1 o 7.1) para ubicar y mover elementos de audio como objetos sonoros tridimensionales independientes en coordenadas X, Y, Z con canales cenitales de techo, reproduciéndose mediante renderizado binaural en audífonos o sistemas multialtavoz inmersivos.
- **Contexto de Uso Operativo**: Postproducción de audio para plataformas de streaming (Netflix, Apple TV+), videojuegos, salas de cine premium y experiencias de realidad virtual/extendida.
- **Ejemplo Práctico de Producción**: Mezcla de una escena de tormenta donde el sonido de los truenos y la lluvia se ubica dinámicamente en los altavoces de techo y laterales envolviendo al espectador.
- **Especificación Visual / Diagrama**: Pánel de paneo 3D en Pro Tools o DaVinci Fairlight con una esfera tridimensional donde los objetos de audio se mueven en tiempo real.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'Dolby Atmos spatial audio, 3D soundstage, object-based binaural sound, ceiling height surround channels, immersive mix'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `mezcla-de-sonido`
  - *es_compatible_con*: `vr`, `xr`
  - *sucede_a*: `stems`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#audio-inmersivo) | *Relacionados originales*: Mezcla de sonido, Masterización de entrega, Stems

#### 37. [Doblaje (Dubbing / Voice Localization)](#doblaje)
- **Identificador Único (Slug)**: `doblaje`
- **Título Original en Fuente**: `DOBLAJE (Dubbing)`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Doblaje de Idioma, Localización de Voz, Voice Dubbing
- **Definición Técnica Original**: Proceso de traducción, adaptación lingüística, sincronización labial (lip-sync) y regrabación de las pistas de diálogo de una obra audiovisual a un idioma distinto del idioma original en el que fue filmada, sustituyendo la pista vocal original pero manteniendo intactos los efectos sonoros, ambientes (M&E) y la banda sonora musical.
- **Contexto de Uso Operativo**: Distribución internacional de películas, series de televisión, animaciones y videojuegos para mercados de idiomas específicos.
- **Ejemplo Práctico de Producción**: Un largometraje rodado en inglés es doblado al español neutro latinoamericano en un estudio de doblaje en Bogotá, sincronizando los fonemas con los labios de los actores.
- **Especificación Visual / Diagrama**: Atril de locutor con guion pautado con marcas de respiración y código de tiempo, micrófono Neumann U87 y monitor de video al frente.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'voice dubbing booth, foreign language voiceover track, lip-sync translation dub, foreign audio track'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_diferencia_de*: `adr`
  - *requiere*: `stems`
  - *es_parte_de*: `distribucion`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#doblaje) | *Relacionados originales*: ADR, Voice-over, Clonación de voz

#### 50. [Foley (Efectos de Sala / Foley Art)](#foley)
- **Identificador Único (Slug)**: `foley`
- **Título Original en Fuente**: `Foley`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Efectos de Sala, Foley Sound, Sonorización Manual
- **Definición Técnica Original**: Arte y técnica de postproducción de sonido que consiste en recrear y grabar sincrónicamente en un estudio especializado todos los ruidos y efectos físicos producidos por la interacción de los personajes con su entorno (pisadas sobre grava, crujido de chaquetas de cuero, choque de copas, desenvainar espadas), dotando de textura, cercanía y realismo táctil a la imagen.
- **Contexto de Uso Operativo**: Indispensable en toda postproducción cinematográfica para reemplazar los ruidos perdidos al limpiar los diálogos o al crear la pista M&E (Música y Efectos).
- **Ejemplo Práctico de Producción**: El artista de foley pisa con botas de tacón sobre una bandeja llena de arena mientras mira en pantalla al protagonista caminando por una playa en silencio.
- **Especificación Visual / Diagrama**: Estudio de foley con distintos cajones de superficies (madera, baldosas, gravilla, cemento) y cajas llenas de objetos heterogéneos (vajilla, cadenas, telas).
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'foley artist studio pit, custom physical sound effects recording, Foley footsteps recording, tactile audio design'.`
- **Relaciones Semánticas Inferidas**: 
  - *alimenta*: `mezcla-de-sonido`
  - *es_indispensable_en*: `stems`
  - *se_combina_con*: `sfx`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#foley) | *Relacionados originales*: Mezcla de sonido, Audio directo, SFX

#### 73. [LUFS / Loudness (Loudness Units Full Scale)](#lufs-loudness)
- **Identificador Único (Slug)**: `lufs-loudness`
- **Título Original en Fuente**: `LUFS / Loudness`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Loudness Units, LKFS, Volumen Normalizado, Normalización EBU R128 / ITU-R BS.1770
- **Definición Técnica Original**: Unidad estándar internacional de medición que cuantifica la sonoridad subjetiva (intensidad percibida por el oído humano en función de la curva psicoacústica de frecuencias a lo largo del tiempo), sustituyendo a los antiguos medidores de picos. Las plataformas imponen estándares rigurosos de sonoridad integrada: -14 LUFS para Spotify y YouTube, -16 LUFS para Apple Podcasts, y -23 o -24 LUFS para televisión broadcast.
- **Contexto de Uso Operativo**: Fase final de masterización de audio para garantizar que el contenido no suene saturado ni excesivamente débil en comparación con el resto del catálogo de la plataforma.
- **Ejemplo Práctico de Producción**: El ingeniero de audio ajusta un limitador multibanda para que la mezcla final del video comercial marque exactamente -14 LUFS integrados y un True Peak de -1.0 dBFS.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-lufs-loudness-1.webp` (1200x842) - "Diagrama de LUFS y loudness: niveles de volumen normalizados para entrega en cada plataforma". Gráfico de barras horizontales de Youlean Loudness Meter mostrando valores numéricos de Integrated Loudness, Short Term y True Peak en decibelios.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'loudness normalization -14 LUFS, EBU R128 compliance, integrated loudness meter, broadcast audio standard'.`
- **Relaciones Semánticas Inferidas**: 
  - *regula*: `masterizacion-de-entrega`
  - *es_un_parametro_de*: `mezcla-de-sonido`
  - *evita*: `distorsion`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#lufs-loudness) | *Relacionados originales*: Mezcla de sonido, Masterización de entrega, Deliverable

#### 80. [Mezcla de Sonido (Sound Mix / Re-recording Mixing)](#mezcla-de-sonido)
- **Identificador Único (Slug)**: `mezcla-de-sonido`
- **Título Original en Fuente**: `MEZCLA DE SONIDO (Sound Mix)`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Re-recording Mixing, Mixaje de Audio, Final Sound Mix
- **Definición Técnica Original**: Proceso artístico y técnico en el que se combinan, balancean, ecualizan, procesan dinámicamente y sitúan espacialmente en el panorama estéreo o envolvente todas las pistas sonoras independientes de la obra: diálogos directos, ADR, efectos de sala (Foley), efectos especiales de sonido (SFX), ambientes naturales y la banda sonora musical.
- **Contexto de Uso Operativo**: Etapa culminante de la postproducción de audio antes de la exportación del master de entrega.
- **Ejemplo Práctico de Producción**: Atenuar automáticamente (sidechain ducking) la música de fondo 4 dB cada vez que el narrador habla para garantizar inteligibilidad absoluta de la voz.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-cadena-de-audio.webp` (1200x1152) - "Cadena de audio en video: microfono, preamplificador, grabadora, mezcla y master, con tipos de microfono". Consola de mezclas Avid S6 con decenas de faders motorizados, pantalla con Pro Tools y analizador de espectro de frecuencias por canal.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 're-recording mixing console, balanced film sound mix, audio ducking music and speech, 5.1 surround sound mix stage'.`
- **Relaciones Semánticas Inferidas**: 
  - *integra*: `audio-directo`, `adr`, `foley`, `underscore`
  - *produce*: `stems`, `lufs-loudness`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#mezcla-de-sonido) | *Relacionados originales*: Mixer, Foley, LUFS / Loudness

#### 135. [Stems (Pistas de Audio Separadas / Submezclas)](#stems)
- **Identificador Único (Slug)**: `stems`
- **Título Original en Fuente**: `Stems`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Submezclas de Audio, Buss Stems, M&E Tracks
- **Definición Técnica Original**: Archivos de audio de submezclas discretas que agrupan los elementos sonoros de una producción en categorías independientes: pista de Diálogos (DX), pista de Música (MX), pista de Efectos y Foley (FX) y pista de Ambientes (AMB). Permiten comercializar la obra a distribuidores internacionales que necesitan cambiar el idioma conservando intacta la pista de Música y Efectos (M&E).
- **Contexto de Uso Operativo**: Entregables contractuales obligatorios para productoras ante plataformas como Netflix, canales de televisión o agentes de ventas internacionales.
- **Ejemplo Práctico de Producción**: Exportar el archivo maestro junto a cuatro archivos WAV a 24-bit/48kHz sincronizados: DX, MX, FX y la pista internacional combinada M&E.
- **Especificación Visual / Diagrama**: Cuatro carpetas de pistas de audio coloreadas en el timeline (amarillo diálogos, verde música, azul efectos y morado ambientes).
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'audio stems export, DX MX FX stems, M&E mix deliverable, multitrack audio submixes'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `deliverable`
  - *deriva_de*: `mezcla-de-sonido`
  - *habilita*: `doblaje`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#stems) | *Relacionados originales*: Mezcla de sonido, Doblaje, Deliverable

#### 158. [Underscore (Música Incidental / Música de Fondo)](#underscore)
- **Identificador Único (Slug)**: `underscore`
- **Título Original en Fuente**: `Underscore`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Música de Acompañamiento, Banda Sonora Incidental, Background Score
- **Definición Técnica Original**: Composición musical instrumental diseñada para sonar por debajo de los diálogos y efectos de una escena sin restarles protagonismo ni competir por las mismas frecuencias medias de la voz humana, modulando sutilmente el tono emocional, la expectación o la tensión del espectador.
- **Contexto de Uso Operativo**: Postproducción de sonido en escenas dramáticas, videos corporativos emotivos y documentales.
- **Ejemplo Práctico de Producción**: Un suave arreglo de piano y cuerdas a bajo volumen que comienza justo cuando el entrevistado rememora un recuerdo de su infancia.
- **Especificación Visual / Diagrama**: Pistas estéreo de música instrumental ecualizadas con un ligero corte de frecuencias (dip) en la banda media de 1kHz a 3kHz para despejar el espacio espectral de la voz.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'subtle emotional underscore, background cinematic music, warm strings and piano score, non-intrusive dialogue music bed'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `musica`
  - *se_integra_en*: `mezcla-de-sonido`
  - *apoya_al*: `storytelling`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#underscore) | *Relacionados originales*: 

#### 168. [Voice-over (Voz en Off / Locución)](#voice-over)
- **Identificador Único (Slug)**: `voice-over`
- **Título Original en Fuente**: `Voice-over`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Voz en Off, Voz Superpuesta, Locución de Narrador
- **Definición Técnica Original**: Pista vocal grabada en estudio de un narrador, presentador o personaje que se reproduce sobre la imagen sin que el emisor de la voz aparezca físicamente en pantalla hablando, funcionando como hilo conductor explicativo, comentario reflexivo o monólogo interior.
- **Contexto de Uso Operativo**: Videos corporativos institucionales, comerciales de televisión, documentales de naturaleza y narración en primera persona en cine.
- **Ejemplo Práctico de Producción**: La voz profunda y cálida del locutor explicando los valores de innovación de la compañía mientras en pantalla se suceden tomas de B-Roll de los laboratorios.
- **Especificación Visual / Diagrama**: Locutor con filtro antipop frente al micrófono en cabina insonorizada leyendo el texto sincronizado con el código de tiempo de la imagen.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'corporate voice-over narration, deep resonant narrator speech, studio voice track over B-roll, documentary voiceover'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_combina_con*: `b-roll`
  - *guia_el*: `a-roll`
  - *se_integra_en*: `mezcla-de-sonido`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#voice-over) | *Relacionados originales*: Doblaje, ADR, Clonación de voz

### Categoría: Montaje & Edición de Video (21 Términos)

#### 1. [A-Roll (Material Principal de Diálogo / Acción)](#a-roll)
- **Identificador Único (Slug)**: `a-roll`
- **Título Original en Fuente**: `A-Roll`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: A-Footage, Toma Principal, Pistas Primarias de Diálogo
- **Definición Técnica Original**: Metraje cinematográfico o videográfico que contiene la acción nuclear, el testimonio principal o la conducción discursiva central de la pieza audiovisual. En la línea de tiempo de edición, el A-Roll determina la cadencia rítmica, la estructura dramática y la sincronización labial del audio guía.
- **Contexto de Uso Operativo**: Fase de montaje inicial (radio edit / rough cut) en documentales, publirreportajes, entrevistas corporativas y ficción dramática.
- **Ejemplo Práctico de Producción**: En un video corporativo institucional, las tomas del Director Ejecutivo respondiendo a cámara sobre fondo neutro constituyen el A-Roll.
- **Especificación Visual / Diagrama**: En la NLE se ubica típicamente en V1/A1-A2; visualmente muestra al orador principal en plano medio o primer plano con encuadre estable.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'talking head, direct-to-camera speech, primary dialogue, centered framing, crisp lavalier audio, master take'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_complementa_con*: `b-roll`, `cutaway`
  - *se_utiliza_para*: `rough-cut`, `storytelling`
  - *es_un_tipo_de*: `rodaje`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#a-roll) | *Relacionados originales*: B-Roll, Cutaway, Coverage

#### 11. [B-Roll (Material de Apoyo / Metraje Secundario)](#b-roll)
- **Identificador Único (Slug)**: `b-roll`
- **Título Original en Fuente**: `B-Roll`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Material de Apoyo, Tomas de Recurso, Metraje B, Cutaway Footage
- **Definición Técnica Original**: Metraje secundario grabado para complementar visualmente la narración principal (A-Roll). Abarca detalles del entorno, procesos de trabajo, rostros de oyentes, planos de situación y acciones dinámicas que se insertan sobre el discurso para ilustrar lo que se dice, cubrir cortes de edición y enriquecer el dinamismo visual.
- **Contexto de Uso Operativo**: Montaje de documentales, reportajes, comerciales de televisión y videos de marketing digital.
- **Ejemplo Práctico de Producción**: Mientras el artesano explica cómo moldea la cerámica (A-Roll), el editor muestra planos cerrados de sus manos cubiertas de barro girando en el torno (B-Roll).
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-b-roll-1.webp` (1200x526) - "Diagrama del B-Roll: material de apoyo que complementa al A-Roll en el montaje". En la línea de tiempo se ubica en las pistas de video superiores (V2, V3) cubriendo la pista de video principal pero manteniendo el audio del orador.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'cinematic B-roll montage, detailed macro shots, slow panning contextual footage, high dynamic visual texture'.`
- **Relaciones Semánticas Inferidas**: 
  - *cubre*: `a-roll`, `jump-cut`
  - *se_compone_de*: `cutaway`, `plano-detalle`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#b-roll) | *Relacionados originales*: A-Roll, Cutaway, Coverage, Preproducción

#### 13. [Banco de Edición (Suite de Montaje / Estación NLE)](#banco-de-edicion)
- **Identificador Único (Slug)**: `banco-de-edicion`
- **Título Original en Fuente**: `Banco de edición`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Isla de Edición, Editing Suite, Estación de Postproducción
- **Definición Técnica Original**: Entorno físico y técnico optimizado acústica y lumínicamente, equipado con una estación de trabajo informática de alto rendimiento, almacenamiento RAID de alta velocidad, software NLE profesional, monitores de referencia calibrados y altavoces de campo cercano para el montaje de imagen y sonido.
- **Contexto de Uso Operativo**: Estudios de postproducción y salas de montaje en productoras audiovisuales y canales de televisión.
- **Ejemplo Práctico de Producción**: El montajista trabaja en una sala con paredes grises neutras al 18%, luz indirecta D65 a 6500K y doble monitor 4K con tarjeta de salida Blackmagic DeckLink.
- **Especificación Visual / Diagrama**: Escritorio ergonómico con teclado con atajos de colores, superficie de control con jog/shuttle, monitores gemelos y paneles acústicos ranurados en las paredes.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'darkened editing suite, dual 4K monitors timeline, DaVinci Resolve console, studio acoustic treatment'.`
- **Relaciones Semánticas Inferidas**: 
  - *alberga*: `edicion-no-lineal`, `montaje`
  - *utiliza*: `timecode`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#banco-de-edicion) | *Relacionados originales*: 

#### 27. [Corte en J / Corte en L (J-Cut / L-Cut)](#corte-en-j-l)
- **Identificador Único (Slug)**: `corte-en-j-l`
- **Título Original en Fuente**: `Corte en J/L`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Split Edit, Corte Dividido de Audio, Audio Lead / Audio Lag
- **Definición Técnica Original**: Técnica de edición no sincrónica donde el corte de audio y el corte de video ocurren en momentos temporales distintos. En un Corte en J (J-cut), el audio del plano siguiente entra antes de que se vea su imagen; en un Corte en L (L-cut), la imagen cambia al nuevo plano pero el audio del plano anterior continúa escuchándose unos segundos por debajo.
- **Contexto de Uso Operativo**: Transición fundamental en diálogos cinematográficos, documentales y escenas conversacionales para otorgar fluidez y naturalidad orgánica.
- **Ejemplo Práctico de Producción**: Se escucha el ladrido de un perro (audio) dos segundos antes de que la imagen corte hacia la puerta de entrada donde aparece el animal (Corte en J).
- **Especificación Visual / Diagrama**: En el timeline de la NLE, las pistas de video y audio forman visiblemente la silueta de la letra 'J' o de la letra 'L' en los límites del corte.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'J-cut audio transition, seamless L-cut dialogue pacing, split edit cinema continuity, overlapping sound dialogue'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `transicion`
  - *evita*: `jump-cut`
  - *mejora_el*: `montaje`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#corte-en-j-l) | *Relacionados originales*: 

#### 28. [Coverage (Cobertura de Escena)](#coverage)
- **Identificador Único (Slug)**: `coverage`
- **Título Original en Fuente**: `COVERAGE (Cobertura)`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Cobertura Cinematográfica, Planos de Cobertura, Toma de Ángulos Múltiples
- **Definición Técnica Original**: Conjunto de planos rodados desde diferentes ángulos, escalas de encuadre y perspectivas (plano maestro, plano medio, plano y contraplano, planos de recurso) para registrar una misma acción dramática completa, otorgando al montajista suficiente material y alternativas para construir el ritmo idóneo en postproducción.
- **Contexto de Uso Operativo**: Estrategia de rodaje planificada por el director y el director de fotografía en el set de filmación.
- **Ejemplo Práctico de Producción**: Rodar una cena familiar con un plano general maestro, tres planos medios y cuatro primeros planos de cada comensal para tener cobertura total en montaje.
- **Especificación Visual / Diagrama**: Diagrama de planta de set con múltiples iconos de cámaras situados en arco respetando el eje de 180 grados apuntando a los personajes.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'full scene coverage, master shot with matching singles, multi-angle dialogue coverage, cinematic coverage setup'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_compone_de*: `master-shot`, `over-the-shoulder-shot`, `cutaway`
  - *facilita*: `montaje`, `raccord`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#coverage) | *Relacionados originales*: Master shot, Over-the-Shoulder Shot, Shot list

#### 29. [Cutaway (Plano de Recurso / Plano Inserción)](#cutaway)
- **Identificador Único (Slug)**: `cutaway`
- **Título Original en Fuente**: `CUTAWAY (Plano de recurso)`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Plano de Inserción, Plano de Apoyo, Insert Cutaway
- **Definición Técnica Original**: Plano breve que corta e interrumpe la acción o sujeto principal para mostrar un elemento exterior directamente relacionado con la escena (un reloj en la pared, las manos inquietas del personaje, un testigo mirando por la ventana). Sirve para aportar contexto, crear suspense o cubrir un salto de eje o elipsis en la pista de diálogo.
- **Contexto de Uso Operativo**: Montaje rítmico en documentales, reportajes informativos y escenas de ficción dramática.
- **Ejemplo Práctico de Producción**: Insertar un cutaway del cuadro torcido en la pared mientras el personaje habla nerviosamente por teléfono, reflejando su desconcierto psicológico.
- **Especificación Visual / Diagrama**: Clip corto de 1 a 3 segundos intercalado entre dos tomas del orador principal en la línea de tiempo.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'cinematic cutaway insert, contextual environmental detail, ticking clock cutaway, dramatic visual insert'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `b-roll`
  - *evita*: `jump-cut`
  - *incluye*: `noddies`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#cutaway) | *Relacionados originales*: B-Roll, Jump cut, Noddies

#### 41. [Edición No Lineal (NLE - Non-Linear Editing)](#edicion-no-lineal)
- **Identificador Único (Slug)**: `edicion-no-lineal`
- **Título Original en Fuente**: `Edición No Lineal (NLE)`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: NLE, Montaje Digital No Destructivo, Software de Edición
- **Definición Técnica Original**: Sistema digital de edición de audio y video en el que los archivos de metraje se pueden acceder instantáneamente en cualquier orden temporal sin reproducir secuencialmente el material previo (a diferencia del antiguo montaje lineal en cinta analógica). Opera de forma no destructiva sobre punteros y metadatos sin alterar los archivos originales de cámara.
- **Contexto de Uso Operativo**: Plataforma de trabajo universal en postproducción contemporánea (Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro, Avid Media Composer).
- **Ejemplo Práctico de Producción**: El montajista reorganiza las tres escenas finales del documental arrastrándolas con el ratón en la línea de tiempo en cuestión de segundos.
- **Especificación Visual / Diagrama**: Interfaz NLE clásica con paneles de navegador de medios, monitor de origen, monitor de programa y línea de tiempo multipista horizontal.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'non-linear editing interface, NLE software timeline, multi-track digital video editing, video timeline scrubber'.`
- **Relaciones Semánticas Inferidas**: 
  - *sustituye_a*: `edicion-lineal`
  - *opera_en*: `banco-de-edicion`
  - *gestiona*: `timecode`, `proxy`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#edicion-no-lineal) | *Relacionados originales*: Proxy, Renderizado, Rough cut

#### 44. [Escena (Unidad Dramática Espaciotemporal)](#escena)
- **Identificador Único (Slug)**: `escena`
- **Título Original en Fuente**: `Escena`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Scene, Unidad Dramática de Espacio y Tiempo
- **Definición Técnica Original**: Unidad dramática y narrativa del relato audiovisual delimitada por la unidad de tiempo y de espacio. Cada vez que la acción cambia de locación física o experimenta un salto temporal significativo, se inicia formalmente una nueva escena en el guion literario y técnico.
- **Contexto de Uso Operativo**: Estructuración de guiones literarios, desglose de producción y ordenación de planos en rodaje y montaje.
- **Ejemplo Práctico de Producción**: La Escena 14 se desarrolla íntegramente en el interior del automóvil de noche bajo la lluvia; al cortar a la mañana siguiente en la oficina del detective, comienza la Escena 15.
- **Especificación Visual / Diagrama**: Encabezado tipográfico canónico en el guion: 'EXT. CALLEJÓN OSCURO - NOCHE' numerado como ESCENA 12.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'complete cinematic scene, spatial and temporal unity, single-location dramatic beat'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_compone_de*: `take`, `coverage`
  - *conforma*: `secuencia`
  - *se_define_en*: `guion-literario`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#escena) | *Relacionados originales*: Secuencia, Take, Plano Americano

#### 48. [Fade In / Fade Out (Fundido a Negro / Apertura y Cierre)](#fade-in-fade-out)
- **Identificador Único (Slug)**: `fade-in-fade-out`
- **Título Original en Fuente**: `Fade In / Fade Out`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Fundido en Negro, Fundido en Blanco, Disolvencia a Negro
- **Definición Técnica Original**: Transición óptica y dramática clásica en la que la imagen emerge gradualmente desde un fondo monocromático (habitualmente negro, aunque puede ser blanco u otro color) hasta alcanzar la plena opacidad visual (Fade In), o desvanece progresivamente la imagen hasta desaparecer por completo en el negro (Fade Out).
- **Contexto de Uso Operativo**: Apertura y cierre formal de películas, transiciones de paso de tiempo significativo (elipsis temporal) o cambios drásticos de capítulo narrativo.
- **Ejemplo Práctico de Producción**: Al morir el protagonista, la imagen realiza un lento Fade Out a negro de 4 segundos, marcando el desenlace trágico de la historia.
- **Especificación Visual / Diagrama**: Curva de opacidad descendente de 100% a 0% sobre un fondo negro plano en la cabecera o final del clip.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'cinematic fade to black, slow atmospheric fade in, dramatic screen fade out closure'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `transicion`
  - *marca*: `elipsis-temporal`
  - *abre_o_cierra*: `secuencia`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#fade-in-fade-out) | *Relacionados originales*: 

#### 61. [Ingesta (Ingest / Transferencia de Medios)](#ingesta)
- **Identificador Único (Slug)**: `ingesta`
- **Título Original en Fuente**: `Ingesta`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Ingestión de Material, Descarga de Tarjetas, Media Ingest
- **Definición Técnica Original**: Fase inicial de la postproducción consistente en transferir de forma organizada, verificada (mediante algoritmos de comprobación de hash) y estructurada todos los archivos brutos de audio y video desde las tarjetas de memoria del rodaje hacia los discos duros de almacenamiento local o servidores compartidos de edición, organizando carpetas por día, cámara y escena.
- **Contexto de Uso Operativo**: Llegada del material desde el set al banco de edición o laboratorio de postproducción al final de cada jornada de grabación.
- **Ejemplo Práctico de Producción**: El asistente de postproducción utiliza Silverstack para volcar 512 GB de tarjetas RED Mini-Mag verificando la integridad MD5 antes de formatear las tarjetas.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-postproduccion.webp` (1200x550) - "Flujo de postproduccion de video: ingesta, montaje, corte final, correccion de color, diseno sonoro y exportacion". Barra de progreso de copia de archivos con reporte de verificación de integridad checksum en verde y árbol de carpetas con fechas estructuradas.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'media ingest workflow, checksum verified data transfer, organized raw footage directory ingest'.`
- **Relaciones Semánticas Inferidas**: 
  - *precede_a*: `proxy`, `rough-cut`
  - *supervisado_por*: `dit-media-management`
  - *alimenta*: `montaje`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#ingesta) | *Relacionados originales*: DIT / Media management, Proxy, Timecode

#### 64. [Jump Cut (Salto de Eje Temporal / Salto de Corte)](#jump-cut)
- **Identificador Único (Slug)**: `jump-cut`
- **Título Original en Fuente**: `Jump Cut`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Corte de Salto, Salto en el Eje, Jump Cut
- **Definición Técnica Original**: Corte abrupto y visible entre dos planos consecutivos del mismo sujeto tomados desde un ángulo de cámara y distancia prácticamente idénticos (diferencia inferior a 30 grados). Produce una sensación de salto espasmódico en el tiempo y el espacio; considerado un error en el montaje clásico de continuidad, se emplea deliberadamente en la modernidad (desde la Nouvelle Vague hasta YouTube) para acelerar el ritmo y condensar información.
- **Contexto de Uso Operativo**: Videos para redes sociales, vlogs de YouTube, comerciales frenéticos de moda y secuencias de desorientación psicológica en cine.
- **Ejemplo Práctico de Producción**: El orador explica una receta y el editor corta todas las pausas de respiración mediante jump cuts seguidos, imprimiendo un ritmo trepidante al video.
- **Especificación Visual / Diagrama**: El personaje parece teletransportarse instantáneamente de una postura a otra sin cambio aparente del encuadre general.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'modern jump cut editing style, staccato jump cut pacing, dynamic jump cuts YouTube style'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_opone_a*: `raccord`
  - *se_suaviza_con*: `cutaway`, `b-roll`
  - *es_un_tipo_de*: `montaje`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#jump-cut) | *Relacionados originales*: 

#### 84. [Montaje (Edición Cinematográfica)](#montaje)
- **Identificador Único (Slug)**: `montaje`
- **Título Original en Fuente**: `Montaje`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Edición de Video, Montaje Cinematográfico, Film Editing / Montage
- **Definición Técnica Original**: Arte, proceso técnico y lenguaje mediante el cual se seleccionan, recortan, yuxtaponen y articulan las distintas tomas registradas en el rodaje para construir una estructura espacio-temporal continua y con sentido, dotando a la obra de ritmo, tensión emocional, causalidad dramática y significado estético.
- **Contexto de Uso Operativo**: Fase central de la postproducción de cualquier proyecto audiovisual tras la finalización del rodaje.
- **Ejemplo Práctico de Producción**: Yuxtaponer el plano del rostro inexpresivo del actor con el plano de un plato de sopa humeante para sugerir hambre (efecto Kuleshov).
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-postproduccion.webp` (1200x550) - "Flujo de postproduccion de video: ingesta, montaje, corte final, correccion de color, diseno sonoro y exportacion". Línea de tiempo densa con múltiples pistas de video superpuestas, cortes verticales limpios y sincronización con ondas de audio.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'masterful film editing, montage sequence pacing, juxtaposition of shots, rhythmic cut timing'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_la_disciplina_de*: `postproduccion`
  - *articula*: `a-roll`, `b-roll`, `raccord`
  - *produce*: `rough-cut`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#montaje) | *Relacionados originales*: Edición no lineal, Corte en J/L, Coverage

#### 100. [Postproducción](#postproduccion)
- **Identificador Único (Slug)**: `postproduccion`
- **Título Original en Fuente**: `Postproducción`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Fase de Finalización, Post-production Phase, Post
- **Definición Técnica Original**: Tercera fase medular de la producción audiovisual que comprende todas las operaciones técnicas y artísticas ejecutadas tras concluir la filmación: ingesta y respaldo de medios, montaje editorial de imagen, diseño sonoro, mezcla y masterización de audio, efectos visuales digitales (VFX), corrección de color (etalonaje), subtitulación y exportación de archivos maestros.
- **Contexto de Uso Operativo**: Desde el día posterior al fin de rodaje (wrap) hasta la entrega formal de los masters definitivos al cliente o distribuidor.
- **Ejemplo Práctico de Producción**: Seis semanas de postproducción distribuidas en 3 semanas de edición offline, 1 semana de VFX, 1 semana de color grading y 1 semana de mezcla de audio final.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-postproduccion.webp` (1200x550) - "Flujo de postproduccion de video: ingesta, montaje, corte final, correccion de color, diseno sonoro y exportacion". Diagrama de flujo de postproducción conectando: Ingesta -> Offline Edit -> Picture Lock -> Conform -> Color Grading -> Sound Mix -> Master.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'post-production workflow, digital post-pipeline, color grading and audio mixing suite'.`
- **Relaciones Semánticas Inferidas**: 
  - *sucede_a*: `rodaje`
  - *contiene*: `montaje`, `etalonaje-color-grading`, `mezcla-de-sonido`, `vfx`
  - *produce*: `deliverable`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#postproduccion) | *Relacionados originales*: Edición no lineal, Etalonaje, Mezcla de sonido

#### 109. [Proxy (Archivo de Edición Ligero / Offline Media)](#proxy)
- **Identificador Único (Slug)**: `proxy`
- **Título Original en Fuente**: `Proxy`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Medios Proxy, Archivos Offline, Copias de Baja Resolución
- **Definición Técnica Original**: Archivo de video transcodificado en una resolución reducida (típicamente 1080p o 720p) y con un códec de edición sumamente ligero y eficiente (como ProRes Proxy, DNxHR LB o ProRes LT), generado a partir de los pesados archivos originales brutos de cámara (RAW 4K/8K). Permite un montaje ágil y fluido en computadoras estándar, reconectándose (relink / conform) a los archivos originales al final del proceso para el color y la exportación.
- **Contexto de Uso Operativo**: Flujos de trabajo con metraje en resolución 4K, 6K u 8K, multicámara pesada o laptops portátiles de edición.
- **Ejemplo Práctico de Producción**: Convertir 2 TB de material RAW 8K de RED en proxies ProRes Proxy de 150 GB para montar la película en una MacBook Pro ligera sin tirones.
- **Especificación Visual / Diagrama**: Interruptor 'Toggle Proxies' en la ventana de programa de la NLE que cambia instantáneamente entre la imagen nítida original y la versión proxy ligera.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'proxy workflow editing, lightweight offline video editing, ProRes Proxy timeline performance'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_genera_mediante*: `transcoding`
  - *facilita*: `edicion-no-lineal`
  - *se_sustituye_en*: `master`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#proxy) | *Relacionados originales*: RAW, Ingesta, Transcoding

#### 110. [Raccord (Continuidad Cinematográfica)](#raccord)
- **Identificador Único (Slug)**: `raccord`
- **Título Original en Fuente**: `Raccord`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Continuidad Cinematográfica, Continuity, Raccord de Movimiento / Mirada
- **Definición Técnica Original**: Coherencia, fluidez y correspondencia lógica y física entre planos consecutivos en el montaje cinematográfico, de manera que la unión de tomas rodadas en momentos y ángulos diferentes sea percibida por el espectador como una acción continua y homogénea. Comprende raccord de movimiento, de posición, de iluminación, de vestuario, de sonido y de dirección de miradas.
- **Contexto de Uso Operativo**: Supervisado en el set por el continuista o script supervisor y garantizado en la sala de edición por el montajista.
- **Ejemplo Práctico de Producción**: Si el actor sostiene un vaso con la mano derecha en el plano general, en el corte al primer plano debe continuar sosteniéndolo con la misma mano y al mismo nivel de líquido.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-eje-de-accion.webp` (1188x1186) - "Eje de accion en video: linea imaginaria entre dos personajes, zona valida de camara y salto de eje". Dos fotogramas adyacentes comparados en split-screen verificando que la posición del brazo y el nivel de agua en la copa coincidan al milímetro.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'seamless film continuity, perfect raccord matching action cut, flawless actor continuity'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_la_regla_de*: `montaje`
  - *supervisado_por*: `script-supervisor`
  - *se_rompe_en*: `jump-cut`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#raccord) | *Relacionados originales*: 

#### 125. [Rough Cut (Corte Preliminar / Primer Ensamblaje)](#rough-cut)
- **Identificador Único (Slug)**: `rough-cut`
- **Título Original en Fuente**: `ROUGH CUT (Corte preliminar)`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Primer Ensamblaje, Assembly Cut, Corte Borrador
- **Definición Técnica Original**: Primera versión estructurada completa de la obra audiovisual montada en la línea de tiempo siguiendo el orden del guion. Integra las mejores tomas seleccionadas (circle takes) sin pulido fino de ritmo, sin música definitiva, sin etalonaje cromático y con sonido directo básico, sirviendo como base de discusión entre el montajista y el director.
- **Contexto de Uso Operativo**: Hito crítico de revisión que concluye la primera etapa del montaje offline antes del corte fino (fine cut) y el bloqueo de imagen (picture lock).
- **Ejemplo Práctico de Producción**: El primer corte preliminar de la película arroja una duración de 2 horas y 40 minutos; a partir de ahí, director y montajista trabajan para reducirlo a 1 hora y 50 minutos.
- **Especificación Visual / Diagrama**: Línea de tiempo completa sin huecos negros pero con cortes toscos, clips con títulos provisorios superpuestos y audio sin mezclar.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'rough cut assembly timeline, initial film assembly review, unpolished edit timeline'.`
- **Relaciones Semánticas Inferidas**: 
  - *deriva_de*: `ingesta`, `a-roll`
  - *evoluciona_hacia*: `master`
  - *es_un_tipo_de*: `montaje`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#rough-cut) | *Relacionados originales*: Edición no lineal, Outtake, Etalonaje

#### 129. [Secuencia (Unidad Narrativa Temática)](#secuencia)
- **Identificador Único (Slug)**: `secuencia`
- **Título Original en Fuente**: `Secuencia`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Sequence, Bloque Narrativo, Acto Menor
- **Definición Técnica Original**: Unidad dramática superior compuesta por una serie de escenas vinculadas entre sí por una misma línea argumental, objetivo dramático o unidad de acción global, pudiendo desarrollarse a través de múltiples espacios y momentos temporales diferentes.
- **Contexto de Uso Operativo**: Planificación del guion y montaje estructural de largometrajes, documentales y series.
- **Ejemplo Práctico de Producción**: La 'secuencia del robo al banco' abarca cinco escenas consecutivas: la llegada de los autos a la calle, el ingreso a la sucursal, la apertura de la bóveda, el enfrentamiento policial y la huida.
- **Especificación Visual / Diagrama**: Bloque de escenas agrupadas bajo una misma etiqueta de color en el software de montaje o escaleta de guion.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'cinematic sequence progression, dramatic multi-scene beat, thematic story sequence'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_compone_de*: `escena`
  - *conforma*: `storytelling`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#secuencia) | *Relacionados originales*: Escena, Plano Americano, Take

#### 150. [Timecode (Código de Tiempo SMPTE)](#timecode)
- **Identificador Único (Slug)**: `timecode`
- **Título Original en Fuente**: `Timecode`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Código de Tiempo SMPTE, SMPTE Timecode (HH:MM:SS:FF), TC
- **Definición Técnica Original**: Estándar temporal universal de señal de reloj digital (norma SMPTE 12M) que asigna una dirección numérica única e irrepetible a cada fotograma individual de una grabación audiovisual, expresada con el formato de ocho dígitos: Horas : Minutos : Segundos : Fotogramas (HH:MM:SS:FF).
- **Contexto de Uso Operativo**: Sincronización multicámara, enlace de audio de doble sistema en set, conformación de edición offline a online y generación de subtítulos.
- **Ejemplo Práctico de Producción**: Localizar exactamente la caída del actor en el fotograma codificado como 01:23:45:18 para aplicar un efecto de sonido en esa posición precisa.
- **Especificación Visual / Diagrama**: Display digital de 8 dígitos en color naranja o blanco en la esquina inferior del monitor o visor de cámara avanzando cuadro a cuadro.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'SMPTE timecode display, HH MM SS FF numbers overlay, precise frame timecode counter'.`
- **Relaciones Semánticas Inferidas**: 
  - *sincroniza*: `sync-sound`, `clapperboard`
  - *estructura*: `edicion-no-lineal`, `srt`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#timecode) | *Relacionados originales*: Claqueta, Sync sound, Ingesta

#### 153. [Transcoding (Transcodificación de Video)](#transcoding)
- **Identificador Único (Slug)**: `transcoding`
- **Título Original en Fuente**: `Transcoding`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Conversión de Códec, Re-encoding de Video, Format Conversion
- **Definición Técnica Original**: Proceso computacional que convierte un flujo de datos de audio o video de un formato de codificación, resolución o compresión determinado a otro diferente (por ejemplo, transcodificar material comprimido H.264 de cámara lenta a ProRes 422 para edición, o masterizar ProRes 4444 a MP4 para streaming web).
- **Contexto de Uso Operativo**: Preparación de medios en ingesta, generación de proxies, exportación de copias para revisión y compresión final de distribución.
- **Ejemplo Práctico de Producción**: Utilizar Adobe Media Encoder para transcodificar por lotes 50 clips de cámara H.265 en códec de edición intermedio Apple ProRes 422.
- **Especificación Visual / Diagrama**: Cola de procesamiento por lotes con dos columnas mostrando el códec de entrada (Source) y el perfil de salida (Preset Destination).
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'batch video transcoding, format conversion queue, video encoder processing'.`
- **Relaciones Semánticas Inferidas**: 
  - *genera*: `proxy`
  - *transforma*: `codec`
  - *prepara_para*: `montaje`, `masterizacion-de-entrega`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#transcoding) | *Relacionados originales*: 

#### 155. [Transición (Efecto de Paso Entre Planos)](#transicion)
- **Identificador Único (Slug)**: `transicion`
- **Título Original en Fuente**: `Transición`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Transición Visual, Efecto de Corte / Disolvencia, Video Transition
- **Definición Técnica Original**: Mecanismo óptico o digital que conecta visualmente el final de un plano con el comienzo del plano siguiente en el montaje. Abarca desde el corte directo (cut, el más común y transparente) hasta disolvencias cruzadas (cross dissolve), barridos por movimiento (whip pan), fundidos en negro (fade) o transiciones estilizadas por máscara y zoom.
- **Contexto de Uso Operativo**: Herramienta narrativa del montajista para modular el flujo del tiempo, la relación espacial o el choque emocional entre ideas.
- **Ejemplo Práctico de Producción**: Una disolvencia cruzada de 2 segundos entre el rostro juvenil del personaje y su rostro envejecido 30 años después para expresar el paso de toda una vida.
- **Especificación Visual / Diagrama**: Rectángulo de transición superpuesto sobre el punto de unión de dos clips contiguos en el timeline de la NLE.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'seamless cross dissolve, dynamic whip pan transition, match cut visual transition'.`
- **Relaciones Semánticas Inferidas**: 
  - *incluye*: `fade-in-fade-out`, `corte-en-j-l`
  - *articula*: `montaje`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#transicion) | *Relacionados originales*: Fade In / Fade Out, Corte en J/L, Jump cut

#### 159. [Upcut (Corte Prematuro / Salto Rítmico de Acción)](#upcut)
- **Identificador Único (Slug)**: `upcut`
- **Título Original en Fuente**: `Upcut`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Corte Adelantado, Traspaso Rítmico Prematuro, Up-cutting
- **Definición Técnica Original**: Corte de montaje realizado fracciones de segundo antes de que concluya naturalmente la acción física de un personaje o el sonido de una frase, o corte que adelanta un evento para acelerar el dinamismo de la narración y forzar la atención expectante del espectador hacia la consecuencia inmediata.
- **Contexto de Uso Operativo**: Edición de secuencias de combate, trailers publicitarios de ritmo frenético y montaje cómico de réplicas rápidas.
- **Ejemplo Práctico de Producción**: Cortar el plano justo cuando el boxeador lanza el puñetazo antes de ver el impacto, mostrando directamente en el plano siguiente al oponente cayendo a la lona.
- **Especificación Visual / Diagrama**: El clip de origen se recorta drásticamente en el frame previo a la culminación física del movimiento.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'dynamic upcut editing, accelerated action cut, snappy comedic cut timing'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `montaje`
  - *acelera_el*: `ritmo-narrativo`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#upcut) | *Relacionados originales*: 

### Categoría: Colorimetría, Espacios de Color & Monitoreo (10 Términos)

#### 2. [ACES (Academy Color Encoding System)](#aces)
- **Identificador Único (Slug)**: `aces`
- **Título Original en Fuente**: `ACES`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Estándar de Color de la Academia, SMPTE 2065-1, ACEScc, ACEScct
- **Definición Técnica Original**: Arquitectura abierta y estándar de gestión y codificación de color desarrollada por la Academia de Artes y Ciencias Cinematográficas (AMPAS). Emplea un espacio de color ultraamplio (ACES2065-1) con precisión cromática en coma flotante de 32 bits, permitiendo intercambiar material heterogéneo entre distintas cámaras, motores de VFX y dispositivos de visualización sin pérdida cromática.
- **Contexto de Uso Operativo**: Flujos de trabajo multicámara de alta gama, postproducción con integración masiva de CGI/VFX y masterización para HDR y cine digital (DCI).
- **Ejemplo Práctico de Producción**: Un comercial grabado simultáneamente con ARRI Alexa Mini LF y RED V-Raptor normaliza ambas cámaras en espacio ACEScct dentro de DaVinci Resolve.
- **Especificación Visual / Diagrama**: Diagrama de cromaticidad CIE 1931 donde el gamut ACES cubre la totalidad del espectro visible humano superando con creces a Rec.709 y Rec.2020.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'ACES color space, Academy Color Encoding System, linear color pipeline, wide gamut color science, uncompressed 32-bit float'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `colorimetria`
  - *es_compatible_con*: `hdr`, `raw`, `rec-709`
  - *se_utiliza_para*: `etalonaje-color-grading`, `vfx`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#aces) | *Relacionados originales*: Rec.709, Etalonaje, HDR

#### 46. [Etalonaje / Color Grading (Corrección de Color y Estilización)](#etalonaje-color-grading)
- **Identificador Único (Slug)**: `etalonaje-color-grading`
- **Título Original en Fuente**: `Etalonaje / Color Grading`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Color Grading, Corrección de Color, Talonaje Digital, Color Timing
- **Definición Técnica Original**: Proceso dual de postproducción de imagen que comprende la Corrección Primaria (balancear la exposición neutra, contrastes y tonos de piel entre planos dispares) y la Estilización Secundaria / Grading (aplicación creativa de una paleta estética deliberada, curvas de tonos, máscaras selectivas y looks cromáticos emocionales que potencian el tono narrativo de la obra).
- **Contexto de Uso Operativo**: Etapa final de imagen tras el bloqueo de edición (picture lock) realizada en salas dedicadas con paneles de control (DaVinci Resolve Mini/Advanced Panel).
- **Ejemplo Práctico de Producción**: Transformar una escena diurna grabada plana en LOG en una atmósfera nocturna fría y desaturada con sombras azuladas y luces de tungsteno doradas en las ventanas.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-etalonaje-color-grading-1.webp` (1200x526) - "Diagrama de etalonaje o color grading: correccion y estilizacion del color en postproduccion". Tres ruedas cromáticas (Lift, Gamma, Gain) con selectores esféricos, curvas spline de matiz vs saturación y nodos seriales/paralelos.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'cinematic color grading, teal and orange palette, balanced skin tones, film print emulation, DaVinci Resolve colorist look'.`
- **Relaciones Semánticas Inferidas**: 
  - *sucede_a*: `montaje`
  - *opera_sobre*: `log`, `raw`
  - *se_apoya_en*: `waveform-y-vectorscope`, `lut`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#etalonaje-color-grading) | *Relacionados originales*: LUT, RAW, Saturación, Rec.709

#### 56. [HDR (High Dynamic Range / Alto Rango Dinámico)](#hdr)
- **Identificador Único (Slug)**: `hdr`
- **Título Original en Fuente**: `HDR (High Dynamic Range)`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Alto Rango Dinámico, HDR10 / Dolby Vision / HLG, Wide Dynamic Range
- **Definición Técnica Original**: Estándar de captura, postproducción y visualización de video que reproduce un rango de luminancia y una gama de colores (gamut Rec.2020) drásticamente más amplios que el video estándar SDR tradicional. Alcanza picos de brillo de hasta 1000 a 4000 nits y negros profundos sin aplastamiento, emulando la capacidad de percepción del ojo humano frente a contrastes extremos de luz natural.
- **Contexto de Uso Operativo**: Masterización de películas y series para servicios de streaming premium (Netflix, Apple TV, Disney+), pantallas OLED y consolas de videojuegos.
- **Ejemplo Práctico de Producción**: Masterizar una escena nocturna donde una fogata alcanza picos de 800 nits con chispas incandescentes nítidas mientras los rostros en penumbra conservan detalle textural en las sombras.
- **Especificación Visual / Diagrama**: Curvas de transferencia electroóptica PQ (Perceptual Quantizer / ST 2084) y HLG (Hybrid Log-Gamma) en monitores de masterización de 1000 nits.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'HDR high dynamic range, Dolby Vision 1000 nits master, vibrant specular highlights, deep OLED blacks'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_opone_a*: `rec-709`
  - *amplia_la*: `luminancia`
  - *requiere*: `masterizacion-de-entrega`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#hdr) | *Relacionados originales*: Luminancia, Rec.709, LOG

#### 72. [LOG (Perfil de Curva Logarítmica)](#log)
- **Identificador Único (Slug)**: `log`
- **Título Original en Fuente**: `LOG (Perfil logarítmico)`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Curva Logarítmica, Log Gamma (S-Log, C-Log, V-Log, LogC), Logarithmic Profile
- **Definición Técnica Original**: Curva de transferencia tonal de captura digital que comprime matemáticamente la información de luminancia del sensor de forma logarítmica (similar a la curva de densidad de la película química). Sacrifica el contraste y saturación visibles directos para preservar la mayor cantidad de pasos de rango dinámico tanto en las sombras profundas como en las altas luces extremas, entregando un archivo plano (flat) ideal para el posterior etalonaje.
- **Contexto de Uso Operativo**: Modo de grabación estándar en cámaras de cine profesional (ARRI LogC, Sony S-Log3, Canon C-Log3, Panasonic V-Log).
- **Ejemplo Práctico de Producción**: Grabar a la modelo en la playa en S-Log3: la imagen en cámara parece lechosa y descolorida, pero al gradear en DaVinci Resolve se recupera el cielo azul y el detalle del vestido blanco sin que nada esté quemado.
- **Especificación Visual / Diagrama**: Imagen cruda con apariencia deslavada, bajo contraste y tonos lechosos; el histograma se concentra en una banda central estrecha sin tocar los extremos.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'flat LOG picture profile, desaturated flat gamma curve, high dynamic range latitude, pre-color grading footage'.`
- **Relaciones Semánticas Inferidas**: 
  - *facilita*: `etalonaje-color-grading`
  - *se_transforma_con*: `lut`
  - *preserva_el*: `rango-dinamico`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#log) | *Relacionados originales*: RAW, LUT, Etalonaje

#### 74. [Luminancia (Señal de Brillo / Canal Y)](#luminancia)
- **Identificador Único (Slug)**: `luminancia`
- **Título Original en Fuente**: `Luminancia`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Canal Y, Señal de Brillo, Luma (Y')
- **Definición Técnica Original**: Componente fotométrico y electrónico de la señal de video que cuantifica la intensidad lumínica o brillo de cada píxel de la imagen con independencia de su información de color (crominancia). Representa la estructura de blanco y negro de la imagen y concentra más del 70% de la percepción humana de nitidez y detalle espacial.
- **Contexto de Uso Operativo**: Calibración de exposición, balance de contrastes y monitoreo en osciloscopios de forma de onda.
- **Ejemplo Práctico de Producción**: En un vectorscopio y monitor de forma de onda, la señal luma se mide en una escala de 0 IRE (negro puro) a 100 IRE (blanco de recorte).
- **Especificación Visual / Diagrama**: Imagen visualizada en blanco y negro puro despojando a la toma de sus canales de croma U/V.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'pure luma luminance channel, grayscale light values, 0 to 100 IRE luminance scale, black and white tonal range'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_combina_con*: `crominancia`
  - *se_mide_en*: `waveform-y-vectorscope`
  - *determina_la*: `exposicion`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#luminancia) | *Relacionados originales*: HDR, Intensidad luminosa, Waveform

#### 75. [LUT (Lookup Table / Tabla de Consulta de Color)](#lut)
- **Identificador Único (Slug)**: `lut`
- **Título Original en Fuente**: `LUT`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Lookup Table, 3D LUT, Tabla de Transformación Cromática, LUT Técnica / Creativa
- **Definición Técnica Original**: Archivo matemático matricial (habitualmente archivos .cube en 33x33x33 o 65x65x65 puntos tridimensionales) que mapea y transforma de forma algorítmica los valores de color de entrada (RGB) en nuevos valores específicos de salida. Se clasifican en LUTs Técnicas (de conversión, por ejemplo de LogC a Rec.709) y LUTs Creativas (que aplican una emulación estética o look cromático de película).
- **Contexto de Uso Operativo**: Monitoreo en vivo en el set de rodaje para previsualizar la toma con contraste normal y como punto de partida en la sala de etalonaje.
- **Ejemplo Práctico de Producción**: Cargar una LUT 3D en el monitor SmallHD del director para ver el material grabado en S-Log3 con aspecto cinematográfico natural en tiempo real.
- **Especificación Visual / Diagrama**: Cubo tridimensional de datos en el espacio RGB que interpola coordenadas cromáticas para transformar saturación, matiz y luminancia.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: '3D LUT color conversion, film emulation LUT applied, Rec.709 preview LUT, cinematic color lookup transform'.`
- **Relaciones Semánticas Inferidas**: 
  - *transforma*: `log`, `raw`
  - *se_aplica_en*: `etalonaje-color-grading`
  - *se_previsualiza_en*: `dit-media-management`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#lut) | *Relacionados originales*: LOG, Etalonaje, Rec.709

#### 111. [RAW (Video en Bruto de Sensor)](#raw)
- **Identificador Único (Slug)**: `raw`
- **Título Original en Fuente**: `RAW`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Metraje RAW, Formato en Bruto, Cinema RAW (BRAW, REDCODE, ProRes RAW)
- **Definición Técnica Original**: Formato de archivo que almacena directamente los datos binarios capturados por cada fotosito fotosensible de la matriz de filtros Bayer del sensor digital, sin aplicar desmosaicado (demosaicing), compresión destructiva, balance de blancos fijo ni curvas de contraste en cámara. Otorga una flexibilidad absoluta en postproducción para modificar la temperatura de color y la exposición a posteriori como si se hiciera en el rodaje.
- **Contexto de Uso Operativo**: Cinematografía de alto nivel, comerciales premium y planos destinados a procesos complejos de efectos visuales (VFX).
- **Ejemplo Práctico de Producción**: Modificar en postproducción el balance de blancos de una escena grabada en REDCODE RAW de 5600K a 3200K sin introducir degradación de ruido en la señal.
- **Especificación Visual / Diagrama**: Pánel de ajustes de cámara RAW en DaVinci Resolve donde los deslizadores de ISO, Kelvin, Tin y Espacio de Color se pueden alterar directamente desde la matriz Bayer.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'uncompressed cinema RAW footage, Bayer pattern sensor data, maximum dynamic range flexibility, pristine RAW digital negative'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_la_fuente_de*: `log`, `proxy`
  - *exige*: `dit-media-management`, `transcoding`
  - *es_ideal_para*: `vfx`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#raw) | *Relacionados originales*: LOG, Proxy, Etalonaje, Códec

#### 112. [REC.709 (Estándar de Espacio de Color HD)](#rec-709)
- **Identificador Único (Slug)**: `rec-709`
- **Título Original en Fuente**: `REC.709`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: ITU-R BT.709, Espacio de Color Estándar HD, sRGB Color Gamut
- **Definición Técnica Original**: Estándar técnico internacional promulgado por la Unión Internacional de Telecomunicaciones (ITU) en 1990 que define los parámetros de video de alta definición (HDTV): resolución 1920x1080, relación de aspecto 16:9, espacio cromático con primarios idénticos a sRGB y curva gamma de visualización estándar (2.2 / 2.4). Es el estándar universal para la visualización convencional en televisores, pantallas de ordenador y teléfonos móviles.
- **Contexto de Uso Operativo**: Espacio de color de destino por defecto para televisión broadcast y exportaciones estándar para redes sociales e internet.
- **Ejemplo Práctico de Producción**: Masterizar el video final en Rec.709 con gamma 2.4 para asegurar que los colores se visualicen correctamente en la mayoría de televisores y monitores domésticos.
- **Especificación Visual / Diagrama**: Triángulo en el diagrama de cromaticidad CIE 1931 que cubre aproximadamente el 35.9% de los colores que percibe el ojo humano.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'standard Rec.709 color gamut, HDTV broadcast standard, standard dynamic range SDR color space'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_opone_a*: `hdr`, `aces`
  - *es_el_destino_de*: `lut`
  - *es_el_estandar_de*: `broadcasting`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#rec-709) | *Relacionados originales*: LUT, HDR, Etalonaje

#### 127. [Saturación (Pureza Cromática)](#saturacion)
- **Identificador Único (Slug)**: `saturacion`
- **Título Original en Fuente**: `SATURACIÓN (Saturation)`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Pureza del Color, Intensidad Cromática, Chroma Saturation
- **Definición Técnica Original**: Medida que define la pureza, vivacidad o intensidad de un color específico en relación con un gris neutro de su misma luminosidad. Un color con 100% de saturación se percibe brillante, vivo y puro (como un láser o pintura pura), mientras que una saturación de 0% neutraliza todos los tonos transformando la imagen en una escala monocromática de grises.
- **Contexto de Uso Operativo**: Control clave en el etalonaje cromático para transmitir emociones: alta saturación para euforia o fantasía pop; baja saturación para dramatismo, melancolía o sobriedad documental.
- **Ejemplo Práctico de Producción**: Desaturar selectivamente todos los colores de la escena un 40% dejando únicamente la bufanda roja de la niña en su saturación original para convertirla en el centro de atención dramático.
- **Especificación Visual / Diagrama**: En el vectorscopio, la distancia radial desde el punto central neutro hacia los límites perimetrales de los cajetines de color representa el nivel de saturación.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'vibrant color saturation, desaturated moody cinema palette, selective color pop, muted vintage color grading'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_monitorea_en*: `waveform-y-vectorscope`
  - *se_modula_en*: `etalonaje-color-grading`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#saturacion) | *Relacionados originales*: Etalonaje, Waveform y vectorscope

#### 171. [Waveform y Vectorscope (Monitores de Forma de Onda y Vectorscopio)](#waveform-y-vectorscope)
- **Identificador Único (Slug)**: `waveform-y-vectorscope`
- **Título Original en Fuente**: `Waveform Y Vectorscope`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Scopes de Video, Monitores de Señal, Analizadores de Color y Exposición
- **Definición Técnica Original**: Instrumentos de medición técnica indispensables en postproducción de video: el Monitor de Forma de Onda (Waveform) grafica la luminancia (brillo) y los canales RGB de izquierda a derecha a lo largo del encuadre en una escala de 0 a 100 IRE; el Vectorscopio representa en una cuadrícula circular el matiz (ángulo radial de 360 grados) y la saturación (distancia desde el centro) de los colores, incluyendo una línea de referencia estándar para tonos de piel (Skin Tone Line).
- **Contexto de Uso Operativo**: Alineación de exposición, balance de blancos y control de límites legales en suites de corrección de color y unidades móviles.
- **Ejemplo Práctico de Producción**: El colorista verifica en el vectorscopio que los tonos de piel de la actriz se alineen exactamente a lo largo de la línea de Skin Tone Line (a 10:30 horas).
- **Especificación Visual / Diagrama**: Gráfico de trazas luminosas verdes o RGB desfilando horizontalmente (waveform) junto al disco circular con casillas de primarios R, G, B, Cy, Mg, Yl (vectorscopio).
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'video scopes overlay, RGB parade waveform display, vectorscope skin tone line alignment, broadcast legal signal analyzer'.`
- **Relaciones Semánticas Inferidas**: 
  - *analiza*: `luminancia`, `saturacion`
  - *guia_el*: `etalonaje-color-grading`
  - *verifica_los*: `limites-legales`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#waveform-y-vectorscope) | *Relacionados originales*: Luminancia, Etalonaje, Zebra

### Categoría: Efectos Visuales (VFX), Animación & Motion Graphics (10 Términos)

#### 5. [Animación 2D / 3D](#animacion-2d-3d)
- **Identificador Único (Slug)**: `animacion-2d-3d`
- **Título Original en Fuente**: `Animación 2D/3D`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Animación Digital, Computer Generated Animation (CGA), Motion Design
- **Definición Técnica Original**: Generación de secuencias visuales sintéticas en movimiento creadas mediante dibujo vectorial bidimensional o modelado, rigging e iluminación de mallas poligonales en entornos tridimensionales virtuales, prescindiendo del rodaje físico en set.
- **Contexto de Uso Operativo**: Comerciales explicativos de producto, visualización arquitectónica, contenido educativo, branding animado y películas animadas.
- **Ejemplo Práctico de Producción**: Modelado tridimensional de un teléfono inteligente desensamblándose en el aire para mostrar sus componentes internos en un comercial de tecnología.
- **Especificación Visual / Diagrama**: Vistas de visor 3D (wireframe, shading, viewport render) con curvas de animación Bezier sobre la línea de tiempo.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: '3D CGI animation, photorealistic render, keyframed motion, spline curve interpolation, octane render, stylized 2D vector animation'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_utiliza_para*: `motion-graphics`, `vfx`
  - *requiere*: `keyframe`, `renderizado`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#animacion-2d-3d) | *Relacionados originales*: Keyframe, VFX

#### 21. [Chroma Key (Incrustación por Croma / Pantalla Verde o Azul)](#chroma-key)
- **Identificador Único (Slug)**: `chroma-key`
- **Título Original en Fuente**: `Chroma Key`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Pantalla Verde / Pantalla Azul, Chroma Keying, Color Keying, Incrustación por Color
- **Definición Técnica Original**: Técnica de postproducción y efectos visuales que consiste en filmar a un sujeto frente a un fondo monocromático rigurosamente uniforme (típicamente verde brillante Pantone 354C o azul cobalto) para aislar mediante software ese rango de color y tornarlo completamente transparente (generando un canal alfa), permitiendo insertar detrás cualquier otro fondo real, digital o sintético.
- **Contexto de Uso Operativo**: Noticieros de televisión (mapa del clima), producciones de ciencia ficción, comerciales con escenarios virtuales y transmisiones de videojuegos.
- **Ejemplo Práctico de Producción**: Filmar al actor sentado en una caja verde en estudio para luego integrarlo en el asiento del piloto de una nave espacial navegando entre asteroides en 3D.
- **Especificación Visual / Diagrama**: Sujeto iluminado limpiamente frente a una pared de ciclorama verde brillante tensada sin arrugas ni sombras proyectadas.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'clean green screen background, chroma key studio setup, even green illumination, subject isolated for compositing'.`
- **Relaciones Semánticas Inferidas**: 
  - *genera*: `canal-alfa`
  - *se_integra_en*: `composicion`, `vfx`
  - *es_alternativa_a*: `volumen-led`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#chroma-key) | *Relacionados originales*: VFX, Producción virtual, Composición

#### 66. [Keyframe (Fotograma Clave)](#keyframe)
- **Identificador Único (Slug)**: `keyframe`
- **Título Original en Fuente**: `Keyframe`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Fotograma Clave, Punto Clave de Animación, Animation Keyframe
- **Definición Técnica Original**: Punto de anclaje temporal en una línea de tiempo digital donde el creador fija un valor paramétrico específico para una propiedad de un objeto (posición X/Y/Z, escala, rotación, opacidad, ganancia de volumen o color). El software interpola automáticamente mediante curvas matemáticas (splines) los fotogramas intermedios (in-betweens) entre dos fotogramas clave sucesivos.
- **Contexto de Uso Operativo**: Universal en animación 2D/3D, motion graphics, etalonaje dinámico y automatización de volumen de audio en cualquier software NLE/VFX.
- **Ejemplo Práctico de Producción**: Fijar un keyframe de posición en el segundo 0 a la izquierda de la pantalla y otro en el segundo 2 a la derecha para que el logotipo cruce la pantalla de forma fluida.
- **Especificación Visual / Diagrama**: Iconos en forma de diamante o rombo sobre las pistas de propiedades en After Effects o Premiere Pro conectados por curvas Bezier.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'keyframe interpolation, smooth Bezier ease-in ease-out, automated property curve, animation diamond marker'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_la_unidad_de*: `animacion-2d-3d`, `motion-graphics`
  - *modula*: `renderizado`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#keyframe) | *Relacionados originales*: 

#### 79. [Matte Painting (Pintura de Fondos Digitales)](#matte-painting)
- **Identificador Único (Slug)**: `matte-painting`
- **Título Original en Fuente**: `Matte Painting`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Pintura Matte, Fondo Digital Cinematográfico, Digital Matte Painting (DMP)
- **Definición Técnica Original**: Técnica artística y de efectos visuales que consiste en crear representaciones pictóricas fotorrealistas de paisajes monumentales, ciudades futuristas o entornos fantásticos imposibles o prohibitivamente caros de construir o filmar en la realidad, combinando pintura digital, fotocomposición de alta resolución y modelos 3D proyectados sobre geometrías espaciales.
- **Contexto de Uso Operativo**: Cine histórico, ciencia ficción, publicidad épica y ampliación de sets (set extensions) en postproducción.
- **Ejemplo Práctico de Producción**: Pintar una metrópolis cyberpunk futurista con rascacielos colosales y naves voladoras para sustituir el horizonte de una toma grabada en un descampado.
- **Especificación Visual / Diagrama**: Composición por capas separadas de primer término, término medio y fondo con efectos atmosféricos de neblina y profundidad de color.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'photorealistic digital matte painting, cinematic fantasy landscape, epic set extension, detailed architectural concept art'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `vfx`
  - *se_integra_con*: `camera-tracking`, `chroma-key`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#matte-painting) | *Relacionados originales*: 

#### 86. [Motion Graphics (Grafismo en Movimiento)](#motion-graphics)
- **Identificador Único (Slug)**: `motion-graphics`
- **Título Original en Fuente**: `Motion Graphics`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Diseño Gráfico en Movimiento, Animación Gráfica, Mograph
- **Definición Técnica Original**: Disciplina del diseño audiovisual que combina tipografía, formas geométricas vectoriales, logotipos, iconografía e ilustraciones animadas con sonido y música, creando piezas dinámicas concebidas primordialmente para explicar conceptos abstractos, comunicar datos estadísticos o fortalecer la identidad visual de marca.
- **Contexto de Uso Operativo**: Videos corporativos explicativos (explainer videos), cabeceras de programas de televisión, reels promocionales, infografías animadas y publicidad en redes.
- **Ejemplo Práctico de Producción**: Animar los gráficos de barras y porcentajes que crecen al compás de la música mientras iconos estilizados ilustran los hitos de crecimiento de una empresa fintech.
- **Especificación Visual / Diagrama**: Paletas de colores corporativos vibrantes, tipografías animadas con transiciones cinéticas elásticas y vectores limpios sobre fondos degradados.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'clean corporate motion graphics, dynamic kinetic typography, 2D vector animation explainer, sleek UI motion design'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `animacion-2d-3d`
  - *requiere*: `keyframe`
  - *se_diseña_en*: `after-effects`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#motion-graphics) | *Relacionados originales*: Animación 2D/3D, Keyframe, VFX

#### 123. [Rotoscopia (Rotoscoping Tradicional / Silueteado)](#rotoscopia)
- **Identificador Único (Slug)**: `rotoscopia`
- **Título Original en Fuente**: `Rotoscopia`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Recorte por Máscara, Silueteado Manual, Roto Painting
- **Definición Técnica Original**: Técnica de efectos visuales que consiste en trazar manualmente máscaras vectoriales spline fotograma a fotograma alrededor de un elemento o personaje en movimiento filmado en imagen real, con el fin de recortarlo con precisión de su entorno original para aislarlo, colocarlo sobre un fondo distinto o insertar elementos gráficos por detrás de él.
- **Contexto de Uso Operativo**: Postproducción de VFX cuando el rodaje no se realizó frente a pantalla verde (chroma key) o para eliminar cables y elementos no deseados del set.
- **Ejemplo Práctico de Producción**: El artista de roto dibuja 150 máscaras consecutivas siguiendo el contorno del pelo y extremidades del bailarín para insertar texto luminoso que pase por detrás de su espalda.
- **Especificación Visual / Diagrama**: Máscaras vectoriales de colores con múltiples puntos Bezier ajustándose minuciosamente sobre la silueta del sujeto en cada cuadro individual.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'meticulous rotoscoping spline mask, manual actor silhouette cutout, frame-by-frame alpha matte tracing'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_la_base_de*: `rotoscopia-automatica`
  - *genera*: `canal-alfa`
  - *es_parte_de*: `vfx`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#rotoscopia) | *Relacionados originales*: Chroma Key, VFX, Matte Painting

#### 130. [SFX (Efectos Especiales Prácticos / de Set)](#sfx)
- **Identificador Único (Slug)**: `sfx`
- **Título Original en Fuente**: `SFX (Efectos especiales prácticos)`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Efectos Físicos de Set, Efectos Mecánicos y Pirotécnicos, Practical Effects
- **Definición Técnica Original**: Efectos visuales e ilusiones físicas generadas directamente en el set de rodaje durante la filmación frente a la lente de la cámara, sin recurrir a la computación digital. Incluyen pirotecnia controlada, explosiones, chispas, lluvia y niebla artificial, prótesis de maquillaje prostético, disparos con balas de fogueo y plataformas mecánicas con cables (wirework).
- **Contexto de Uso Operativo**: Rodaje de escenas de acción, terror, ciencia ficción y secuencias donde la interacción física con los actores resulta primordial.
- **Ejemplo Práctico de Producción**: El equipo de SFX acciona dos cañones de aire con chispas y humo de pólvora detrás del actor al detonar una pared falsa de corcho prensado.
- **Especificación Visual / Diagrama**: Plétora de humo denso en el set, lluvia artificial cayendo desde tuberías perforadas cenitales y reflectores iluminando las gotas en suspensión.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'practical special effects in-camera, real pyrotechnic spark explosion, physical set rain machine, authentic practical creature makeup'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_opone_a*: `vfx`
  - *se_combina_con*: `live-action`
  - *opera_en*: `rodaje`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#sfx) | *Relacionados originales*: VFX, Foley, Rodaje

#### 136. [Stop Motion (Animación Fotograma a Fotograma)](#stop-motion)
- **Identificador Único (Slug)**: `stop-motion`
- **Título Original en Fuente**: `Stop Motion`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Animación en Volumen, Cuadro a Cuadro Físico, Claymation / Puppet Animation
- **Definición Técnica Original**: Técnica artesanal de animación que consiste en manipular físicamente objetos tridimensionales tangibles (marionetas articuladas con esqueletos de alambre, figuras de plastilina, recortes de papel) milímetro a milímetro entre cada disparo fotográfico individual estático. Al reproducir la serie de fotografías a 12 o 24 fps, se genera la ilusión mágica y táctil de vida autónoma.
- **Contexto de Uso Operativo**: Cortometrajes y largometrajes autorales de animación (como las obras de Aardman o Tim Burton), comerciales artísticos y spots de producto.
- **Ejemplo Práctico de Producción**: Un animador mueve un brazo de una figura de plastilina dos milímetros, toma una fotografía con la cámara, vuelve a moverlo dos milímetros más y dispara de nuevo, completando 24 fotos para lograr un solo segundo de video.
- **Especificación Visual / Diagrama**: Texturas táctiles palpables en los personajes (marcas microscópicas de huellas dactilares sobre la arcilla, telas bordadas reales) e iluminación constante de estudio.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'tactile stop-motion animation, handcrafted claymation puppet, charming frame-by-frame miniature set, textured physical lighting'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `animacion-2d-3d`
  - *requiere*: `rodaje`
  - *prescinde_de*: `cgi`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#stop-motion) | *Relacionados originales*: Animación 2D/3D, Keyframe, Timelapse

#### 162. [VFX (Efectos Visuales Digitales)](#vfx)
- **Identificador Único (Slug)**: `vfx`
- **Título Original en Fuente**: `VFX (Efectos visuales)`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Efectos Digitales de Postproducción, Visual Effects, CGI y Composición Digital
- **Definición Técnica Original**: Amplia disciplina de la postproducción audiovisual que engloba todos los procesos mediante los cuales se crean, manipulan o combinan imágenes que no pudieron ser capturadas durante el rodaje físico de imagen real. Abarca la integración de criaturas y escenarios 3D por computadora (CGI), matte painting digital, rotoscopia, borrado de cables, seguimiento de cámara 3D (matchmoving) y composición digital multicapa.
- **Contexto de Uso Operativo**: Superproducciones de cine, comerciales publicitarios con alto impacto visual, videoclips y series de televisión.
- **Ejemplo Práctico de Producción**: Insertar una flota de naves espaciales digitales sobre una toma grabada en un desierto, ajustando la luz, la atmósfera de polvo y la sombra en el suelo para lograr fotorrealismo indetectable.
- **Especificación Visual / Diagrama**: Árbol de nodos en software de composición (Nuke o Fusion) conectando pases de render 3D (diffuse, specular, ambient occlusion, depth) con el metraje de cámara.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'photorealistic visual effects, seamless CGI integration, cinematic digital composite, professional VFX render pass blend'.`
- **Relaciones Semánticas Inferidas**: 
  - *supervisado_por*: `vfx-supervisor`
  - *se_opone_a*: `sfx`
  - *integra*: `chroma-key`, `camera-tracking`, `matte-painting`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#vfx) | *Relacionados originales*: SFX, Chroma key, Matte painting, VFX Supervisor

#### 165. [Video Mapping (Proyección Monumental Mapeada)](#video-mapping)
- **Identificador Único (Slug)**: `video-mapping`
- **Título Original en Fuente**: `Video Mapping`
- **Fases del Proceso**: Postproducción
- **Sinónimos y Alias**: Projection Mapping, Mapeo de Video 3D, Proyección Arquitectónica
- **Definición Técnica Original**: Técnica de proyección audiovisual espacial que utiliza proyectores de alta luminosidad (20.000 a 50.000 lúmenes ANSI) combinados con software de deformación geométrica y servidores de medios para proyectar animaciones de video exactamente adaptadas sobre superficies tridimensionales complejas del mundo real (fachadas de catedrales, carrocerías de automóviles, escenarios esculturales), transformando su apariencia estática en estructuras vivas que parecen deformarse, abrirse o rotar.
- **Contexto de Uso Operativo**: Eventos de lanzamiento de marcas, festivales de luz y arte urbano, conciertos multitudinarios y exhibiciones museísticas interactivas.
- **Ejemplo Práctico de Producción**: Proyectar sobre la fachada de un palacio histórico una animación donde las columnas parecen desmoronarse y transformarse en cascadas de agua al ritmo de la música.
- **Especificación Visual / Diagrama**: Estructura arquitectónica real cobrando vida en la oscuridad de la noche mediante haces lumínicos calibrados que coinciden exactamente con cada moldura y ventana del edificio.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'spectacular architectural video projection mapping, building facade animated light show, 3D illusion mapped projection'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `proyeccion`
  - *utiliza*: `animacion-2d-3d`, `vfx`
  - *opera_en*: `eventos`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#video-mapping) | *Relacionados originales*: VFX, Producción virtual

### Categoría: Tecnología de Video, Señal & Códecs (15 Términos)

#### 14. [Bitrate (Tasa de Bits / Flujo de Datos)](#bitrate)
- **Identificador Único (Slug)**: `bitrate`
- **Título Original en Fuente**: `BITRATE (Tasa de bits)`
- **Fases del Proceso**: Producción, Postproducción, Distribución
- **Sinónimos y Alias**: Tasa de Bits, Flujo de Datos, Data Rate (Mbps / kbps)
- **Definición Técnica Original**: Cantidad de datos digitales binarios transferidos o procesados por unidad de tiempo para representar la señal de video o audio, expresada habitualmente en megabits por segundo (Mbps) o kilobits por segundo (kbps). Un bitrate elevado preserva texturas sutiles, grano y ausencia de artefactos de compresión a costa de generar archivos más pesados; un bitrate bajo comprime drásticamente el archivo facilitando su transmisión por internet pero introduciendo bandas de degradación (color banding) y pixelación.
- **Contexto de Uso Operativo**: Configuración de exportación para streaming, masterización de emisión televisiva y selección de perfiles de compresión de cámara.
- **Ejemplo Práctico de Producción**: Exportar un master de alta calidad en ProRes a 220 Mbps frente a un archivo optimizado para redes sociales en H.264 a 15 Mbps en resolución 4K.
- **Especificación Visual / Diagrama**: Comparativa entre dos recortes de un cielo degradado: a 5 Mbps se observan escalones visibles y bloques de compresión; a 50 Mbps el gradiente es continuo y sedoso.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'high bitrate clean video, uncompressed texture clarity, pristine high-bitrate encoding, no compression banding'.`
- **Relaciones Semánticas Inferidas**: 
  - *determina_la*: `calidad-de-imagen`
  - *se_vincula_con*: `codec`, `resolucion`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#bitrate) | *Relacionados originales*: Códec, Resolución, Deliverable

#### 16. [Broadcasting (Radiodifusión Televisiva Tradicional)](#broadcasting)
- **Identificador Único (Slug)**: `broadcasting`
- **Título Original en Fuente**: `Broadcasting`
- **Fases del Proceso**: Producción, Postproducción, Distribución
- **Sinónimos y Alias**: Emisión de Televisión, Transmisión Broadcast, Teledifusión
- **Definición Técnica Original**: Distribución unidireccional masiva de señales de audio y video dirigidas al público general a través del espectro radioeléctrico terrestre (TDT), satelital o redes de cable coaxial/fibra bajo normativas técnicas y estándares sumamente estrictos de ingeniería (SMPTE, EBU, ATSC, DVB) en cuanto a límites legales de señal, sincronismos y código de tiempo.
- **Contexto de Uso Operativo**: Cadenas de televisión públicas y comerciales, unidades móviles y coberturas informativas en directo.
- **Ejemplo Práctico de Producción**: Transmisión en vivo de un partido del torneo nacional emitida por señal abierta terrestre bajo el estándar DVB-T2 a 1080i50.
- **Especificación Visual / Diagrama**: Torre de telecomunicaciones emitiendo ondas hertzianas hacia antenas receptoras domésticas, o sala de control central (MCR - Master Control Room) con paredes de monitores con señal al aire.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'broadcast television studio control, live broadcast master control room MCR, on-air broadcast television feed'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_opone_a*: `streaming`
  - *exige*: `rec-709`, `lufs-loudness`
  - *emplea*: `switcher-de-video`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#broadcasting) | *Relacionados originales*: LUFS / Loudness, Rec.709

#### 24. [Códec (Codificador / Decodificador de Video)](#codec)
- **Identificador Único (Slug)**: `codec`
- **Título Original en Fuente**: `Códec`
- **Fases del Proceso**: Producción, Postproducción, Distribución
- **Sinónimos y Alias**: Algoritmo de Compresión, Codificador-Decodificador, Compression Algorithm
- **Definición Técnica Original**: Algoritmo computacional matemático que codifica (comprime) una señal de audio o video digital bruto para su almacenamiento o transmisión eficiente reduciendo redundancias espaciales y temporales, y la decodifica (descomprime) posteriormente para su reproducción o edición fluida. Se diferencian en códecs con pérdidas (lossy) o sin pérdidas perceptibles (visually lossless), y en códecs de adquisición (intraframe como ProRes) o de entrega (interframe como H.264/H.265).
- **Contexto de Uso Operativo**: Elección estratégica en cámaras, líneas de tiempo de edición y plataformas de exportación.
- **Ejemplo Práctico de Producción**: Usar Apple ProRes 422 HQ como códec intermedio durante el montaje para evitar que la CPU sufra decodificando la compleja compresión temporal de H.264.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-codec-1.webp` (1200x602) - "Diagrama de codec y contenedor en video: como se comprime y como se empaqueta el archivo". Diagrama explicativo ilustrando la diferencia entre un archivo de video bruto gigante que se comprime mediante el algoritmo códec y se empaqueta dentro de un contenedor MP4.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'efficient video codec compression, Apple ProRes encoding, advanced video compression pipeline'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_empaqueta_en*: `contenedor`
  - *determina_el*: `bitrate`
  - *se_ejemplifica_en*: `prores-h-264-h-265`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#codec) | *Relacionados originales*: Contenedor, Bitrate, ProRes / H.264 / H.265

#### 26. [Contenedor (Formato Envoltorio / Wrapper)](#contenedor)
- **Identificador Único (Slug)**: `contenedor`
- **Título Original en Fuente**: `Contenedor`
- **Fases del Proceso**: Producción, Postproducción, Distribución
- **Sinónimos y Alias**: Formato Envoltorio, Wrapper de Archivo, Container Format (.mov, .mp4, .mkv)
- **Definición Técnica Original**: Estructura de formato de archivo binario que funciona como un 'paquete' o caja estandarizada identificada por una extensión (.mov, .mp4, .mxf, .mkv) que almacena conjuntamente una o más pistas de video codificadas, pistas de audio multipista, pistas de subtítulos sincronizados, metadatos de código de tiempo y menús de navegación.
- **Contexto de Uso Operativo**: Manipulación de archivos en cualquier etapa del flujo de trabajo audiovisual digital.
- **Ejemplo Práctico de Producción**: Un archivo con extensión .MOV (contenedor QuickTime) que alberga en su interior una pista de video codificada en ProRes 4444, cuatro canales de audio PCM sin compresión y metadatos SMPTE.
- **Especificación Visual / Diagrama**: Ilustración de una caja etiquetada como '.MP4' dentro de la cual viajan ordenados un rollo de película (códec de video H.264), una cinta de audio (códec AAC) y una tarjeta de texto (subtítulo SRT).
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'video container wrapper diagram, MP4 and MOV multimedia file packaging, audio video multiplexing'.`
- **Relaciones Semánticas Inferidas**: 
  - *alberga*: `codec`, `timecode`, `srt`
  - *es_un_tipo_de*: `deliverable`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#contenedor) | *Relacionados originales*: Códec, Bitrate, Deliverable

#### 51. [FPS / Frame Rate (Cuadros por Segundo)](#fps-frame-rate)
- **Identificador Único (Slug)**: `fps-frame-rate`
- **Título Original en Fuente**: `FPS / Frame Rate`
- **Fases del Proceso**: Producción, Postproducción, Distribución
- **Sinónimos y Alias**: Frame Rate, Frecuencia de Cuadro, Tasa de Refresco Temporal
- **Definición Técnica Original**: Cantidad de imágenes estáticas individuales (fotogramas o cuadros) que se capturan, transmiten y reproducen sucesivamente en cada segundo de tiempo para engañar al sistema visual humano mediante el fenómeno de persistencia retiniana y movimiento aparente (efecto Phi). Los estándares mundiales son: 24 fps (estándar canónico del cine internacional), 25 fps (estándar PAL de Europa y Colombia), 30 fps (estándar digital y NTSC) y 50/60 fps (fluidez para deportes, videojuegos y cámara lenta).
- **Contexto de Uso Operativo**: Configuración fundacional que debe definirse unívocamente en la preproducción antes de encender las cámaras y crear la secuencia de edición.
- **Ejemplo Práctico de Producción**: Configurar el proyecto en 24 fps para otorgarle la cadencia y textura temporal cinematográfica característica frente al look hiperrealista o de telenovela de 60 fps.
- **Especificación Visual / Diagrama**: Tira de celuloide o secuencia gráfica mostrando 24 fotogramas numerados correlativamente que equivalen a exactamente un segundo de tiempo en el reloj.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: '24fps cinematic motion cadence, 60fps ultra-smooth video motion, natural 24 frames per second cinema standard'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_equivalente_a*: `tasa-de-fotogramas`
  - *condiciona_la*: `velocidad-de-obturacion`
  - *permite*: `camara-lenta`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#fps-frame-rate) | *Relacionados originales*: Cámara Lenta, Bitrate, Broadcasting

#### 67. [Latencia (Retardo de Señal / Delay)](#latencia)
- **Identificador Único (Slug)**: `latencia`
- **Título Original en Fuente**: `Latencia`
- **Fases del Proceso**: Producción, Postproducción, Distribución
- **Sinónimos y Alias**: Retardo de Transmisión, Delay de Señal, Buffer Lag
- **Definición Técnica Original**: Tiempo de demora o retardo temporal imperceptible o perceptible (medido en milisegundos) que transcurre desde el instante en que un acontecimiento físico ocurre frente al lente de la cámara o micrófono hasta que es procesado, codificado, transmitido y visualizado en la pantalla o monitor de destino.
- **Contexto de Uso Operativo**: Factor crítico en transmisiones en vivo, producción remota (REMI), monitoreo inalámbrico en set (Teradek) y teleprompters interactivos.
- **Ejemplo Práctico de Producción**: Un enlace de video inalámbrico de set que presume de latencia cero (< 1 ms), permitiendo al foquista enfocar tomas rápidas en tiempo real sin desfase.
- **Especificación Visual / Diagrama**: Línea temporal comparativa mostrando el fotograma capturado en T=0ms y reproducido en el monitor del director en T=150ms.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'ultra-low latency wireless video feed, zero latency field monitoring, live sync delay'.`
- **Relaciones Semánticas Inferidas**: 
  - *afecta_a*: `produccion-remota`, `streaming`
  - *se_reduce_con*: `ndi`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#latencia) | *Relacionados originales*: SRT, Producción remota, Switcher de video

#### 81. [MiniDV (Formato de Cinta Digital Histórico)](#minidv)
- **Identificador Único (Slug)**: `minidv`
- **Título Original en Fuente**: `MiniDV`
- **Fases del Proceso**: Producción, Postproducción, Distribución
- **Sinónimos y Alias**: Cinta MiniDV, Digital Video Cassette, Formato DV
- **Definición Técnica Original**: Formato icónico de grabación digital en cinta magnética de 6,35 mm introducido en 1995 que democratizó la producción independiente. Grababa video en definición estándar (SD: 720x480 NTSC / 720x576 PAL) con compresión DV intraframe a 25 Mbps y muestreo de color 4:1:1 o 4:2:0, capturado a la computadora mediante cables FireWire (IEEE 1394).
- **Contexto de Uso Operativo**: Hito fundacional en la historia del video digital, hoy objeto de culto y emulación nostálgica estética ('look Y2K / camcorder').
- **Ejemplo Práctico de Producción**: Un videoclip musical contemporáneo que se rueda deliberadamente con una videocámara Sony DCR-VX1000 de cinta MiniDV para lograr texturas entrelazadas nostálgicas de los 90.
- **Especificación Visual / Diagrama**: Pequeño casete magnético rectangular con ventana transparente central y logotipo 'MiniDV' dorado junto al conector FireWire 400 de 4 pines.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'vintage MiniDV camcorder aesthetic, retro Y2K digital video tape artifacts, authentic interlaced SD video texture'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_ancestro_de*: `prores-h-264-h-265`
  - *es_un_tipo_de*: `tecnologia-de-video`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#minidv) | *Relacionados originales*: Ingesta, Códec

#### 89. [NDI (Network Device Interface)](#ndi)
- **Identificador Único (Slug)**: `ndi`
- **Título Original en Fuente**: `NDI`
- **Fases del Proceso**: Producción, Postproducción, Distribución
- **Sinónimos y Alias**: Protocolo de Video por IP, Network Device Interface (NewTek), Video sobre Red Local
- **Definición Técnica Original**: Protocolo estándar de comunicación bidireccional desarrollado por NewTek que permite transmitir flujos de video de ultra alta definición (4K/HD), múltiples canales de audio multicanal y señales de control y tally a través de redes locales Ethernet convencionales (Gigabit LAN) con latencia prácticamente nula y sin necesidad de cableado SDI o HDMI dedicado.
- **Contexto de Uso Operativo**: Estudios de televisión modernos, producción virtual, centros de emisión remota, eventos en vivo y streaming multicámara corporativo.
- **Ejemplo Práctico de Producción**: Conectar tres cámaras PTZ en un auditorio a un switch de red mediante cables de red Cat6 y mezclarlas en el software vMix mediante fuentes NDI sin capturadoras dedicadas.
- **Especificación Visual / Diagrama**: Diagrama de red informática mostrando múltiples cámaras y ordenadores conectados a un switch Ethernet Gigabit intercambiando streams NDI en tiempo real.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'NDI network device interface, video over IP local network broadcast, low latency Ethernet video stream'.`
- **Relaciones Semánticas Inferidas**: 
  - *transporta*: `codec`, `timecode`
  - *se_utiliza_en*: `produccion-remota`, `switcher-de-video`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#ndi) | *Relacionados originales*: Switcher de video, Broadcasting, Producción remota

#### 108. [ProRes / H.264 / H.265 (Códecs Maestros de la Industria)](#prores-h-264-h-265)
- **Identificador Único (Slug)**: `prores-h-264-h-265`
- **Título Original en Fuente**: `PRORES / H.264 / H.265`
- **Fases del Proceso**: Producción, Postproducción, Distribución
- **Sinónimos y Alias**: Trinidad de Códecs, Apple ProRes, AVC, HEVC, Códecs de Edición y Distribución
- **Definición Técnica Original**: Los tres estándares de compresión dominantes del ecosistema audiovisual digital: 1) Apple ProRes: códec intraframe (cada fotograma se comprime independientemente) de 10/12 bits diseñado para máxima fidelidad y rendimiento en edición; 2) H.264 (AVC): códec interframe universal estándar de distribución web y streaming; 3) H.265 (HEVC): sucesor de H.264 que ofrece el doble de eficiencia de compresión, ideal para video 4K/8K HDR en anchos de banda reducidos.
- **Contexto de Uso Operativo**: ProRes para edición y archivo master; H.264 para compatibilidad universal en web; H.265 para dispositivos móviles modernos y streaming 4K eficiente.
- **Ejemplo Práctico de Producción**: La productora edita en Apple ProRes 422, exporta el master final en ProRes 4444 para archivo, y codifica una copia en H.264 para subir a YouTube y otra en H.265 para la app móvil.
- **Especificación Visual / Diagrama**: Tabla comparativa de compresión mostrando tasas de bits relativas: ProRes (220 Mbps), H.264 (25 Mbps), H.265 (12 Mbps) con idéntica resolución percibida.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'Apple ProRes 422 HQ intraframe codec, H.264 AVC universal web encoding, efficient H.265 HEVC 4K master'.`
- **Relaciones Semánticas Inferidas**: 
  - *son_variantes_de*: `codec`
  - *se_empaquetan_en*: `contenedor`
  - *determinan_el*: `bitrate`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#prores-h-264-h-265) | *Relacionados originales*: Códec, Bitrate, Master

#### 116. [Relación de Aspecto (Aspect Ratio)](#relacion-de-aspecto)
- **Identificador Único (Slug)**: `relacion-de-aspecto`
- **Título Original en Fuente**: `RELACIÓN DE ASPECTO (Aspect Ratio)`
- **Fases del Proceso**: Producción, Postproducción, Distribución
- **Sinónimos y Alias**: Proporción de Pantalla, Aspect Ratio, Formato de Cuadro
- **Definición Técnica Original**: Proporción matemática dimensional existente entre la anchura y la altura del marco rectangular de la imagen (Ancho : Alto). Los formatos estandarizados abarcan: 16:9 (1.78:1, estándar global de televisores, ordenadores y YouTube horizontal); 9:16 (0.56:1, video vertical para Reels, TikTok y Shorts); 1:1 (cuadrado); 4:5 (vertical optimizado para feeds de Instagram); y 2.39:1 / 2.35:1 (formato panorámico anamórfico de cine).
- **Contexto de Uso Operativo**: Planificación de encuadre en preproducción según la plataforma y pantalla de destino del contenido.
- **Ejemplo Práctico de Producción**: Rodar un spot en 16:9 con encuadre protegido (guías seguras) para poder extraer un reencuadre vertical 9:16 para redes sociales sin cortar la cabeza del modelo.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-relacion-de-aspecto-1.webp` (1200x1946) - "Relaciones de aspecto en video comparadas: 1:1, 4:5, 9:16, 16:9 y 2.39:1 con su uso". Infografía geométrica comparativa superponiendo los rectángulos de 16:9 (horizontal ancho), 9:16 (vertical estilizado) y 2.39:1 (cinemascope apaisado).
- **Guía de Prompts para Modelos LLM**: `Palabras clave: '16:9 cinematic widescreen, 9:16 vertical smartphone aspect ratio, 2.39:1 anamorphic cinema framing, 1:1 square video frame'.`
- **Relaciones Semánticas Inferidas**: 
  - *condiciona_la*: `composicion`
  - *se_aplica_en*: `video-vertical`, `safe-zones`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#relacion-de-aspecto) | *Relacionados originales*: Video vertical, Safe zones, Wide shot

#### 118. [Renderizado (Rendering / Exportación y Cómputo)](#renderizado)
- **Identificador Único (Slug)**: `renderizado`
- **Título Original en Fuente**: `Renderizado`
- **Fases del Proceso**: Producción, Postproducción, Distribución
- **Sinónimos y Alias**: Render, Procesamiento de Cuadros, Baking de Efectos
- **Definición Técnica Original**: Proceso computacional intensivo en el que la CPU y la GPU del ordenador calculan matemáticamente y sintetizan en un único archivo de video unificado todos los elementos superpuestos en la línea de tiempo: decodificación de códecs de cámara, transiciones, etalonaje de color, gráficos vectoriales, efectos de composición digital y mezcla multipista de audio.
- **Contexto de Uso Operativo**: Render de previsualización temporal en la línea de tiempo para reproducción fluida y render de exportación final del proyecto.
- **Ejemplo Práctico de Producción**: Hacer render de previsualización en DaVinci Resolve para reproducir a 24 fps estables una escena compleja que combina 4 capas de video 4K con reducción de ruido temporal.
- **Especificación Visual / Diagrama**: Barra de estado de render que pasa de rojo (no computado) a verde (computado y listo para reproducción en tiempo real).
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'GPU accelerated video rendering, timeline render caching, export render progress bar, computational frame synthesis'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_la_ejecucion_de*: `montaje`, `vfx`
  - *produce_el*: `deliverable`, `master`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#renderizado) | *Relacionados originales*: 

#### 119. [Resolución de Video (Densidad de Píxeles)](#resolucion)
- **Identificador Único (Slug)**: `resolucion`
- **Título Original en Fuente**: `Resolución`
- **Fases del Proceso**: Producción, Postproducción, Distribución
- **Sinónimos y Alias**: Resolución Espacial, Dimensiones en Píxeles, Pixel Resolution (1080p, 4K, 8K)
- **Definición Técnica Original**: Medida técnica que define la cantidad física total de píxeles que componen cada fotograma individual de video, expresada como el producto del número de columnas horizontales por el número de filas verticales. Abarca estándares como Full HD (1920x1080 = 2.07 megapíxeles), UHD 4K (3840x2160 = 8.29 megapíxeles), DCI 4K (4096x2160 = 8.84 megapíxeles) y 8K (7680x4320 = 33.17 megapíxeles).
- **Contexto de Uso Operativo**: Configuración de sensor en cámara, resolución de proyecto en la NLE y especificación técnica de entrega.
- **Ejemplo Práctico de Producción**: Grabar la entrevista en resolución 4K para una entrega final en 1080p, permitiendo al editor hacer reencuadres digitales y zooms de hasta 200% sin pérdida perceptible de calidad.
- **Especificación Visual / Diagrama**: Diagrama de recuadros anidados concéntricos mostrando cómo cuatro pantallas Full HD 1080p caben exactamente dentro de una sola imagen UHD 4K.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'crisp UHD 4K 3840x2160 resolution, sharp 8K ultra high definition detail, pixel perfect high resolution clarity'.`
- **Relaciones Semánticas Inferidas**: 
  - *determina_el*: `bitrate`
  - *se_compara_en*: `uhd-4k-vs-dci-4k`
  - *se_ajusta_en*: `relacion-de-aspecto`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#resolucion) | *Relacionados originales*: UHD, Bitrate, Aspect ratio

#### 142. [Switcher de Video (Mezclador de Video en Vivo / Vision Mixer)](#switcher-de-video)
- **Identificador Único (Slug)**: `switcher-de-video`
- **Título Original en Fuente**: `SWITCHER DE VIDEO (Mezclador)`
- **Fases del Proceso**: Producción, Postproducción, Distribución
- **Sinónimos y Alias**: Mesa de Realización, Mezclador de Video en Vivo, Vision Mixer
- **Definición Técnica Original**: Dispositivo físico electrónico o aplicación de software especializada que conmuta, corta, mezcla e incrusta en tiempo real múltiples señales de video entrantes (cámaras de set, repeticiones instantáneas, gráficos computarizados, enlaces remotos), enrutando la señal seleccionada hacia el canal de emisión en vivo (Program / PGM) y a los monitores de previsualización (Preview / PVW).
- **Contexto de Uso Operativo**: Emisiones de televisión en directo, streaming multicámara en vivo, conciertos y eventos corporativos híbridos.
- **Ejemplo Práctico de Producción**: El realizador presiona el botón 'Cámara 2' en el switcher Blackmagic ATEM Constellation justo cuando el cantante principal toma el micrófono en el escenario.
- **Especificación Visual / Diagrama**: Pánel con filas dobles de botones retroiluminados en rojo (PGM) y verde (PVW), palanca manual T-Bar para transiciones suaves y joystick para DVE.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'broadcast vision switcher console, Blackmagic ATEM control surface, illuminated bus buttons and T-bar fader, live TV control panel'.`
- **Relaciones Semánticas Inferidas**: 
  - *opera_en*: `broadcasting`, `streaming`
  - *procesa*: `ndi`
  - *conmuta*: `take`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#switcher-de-video) | *Relacionados originales*: NDI, Broadcasting, Producción remota

#### 145. [Tasa de Fotogramas (Frame Rate / Frecuencia Temporal)](#tasa-de-fotogramas)
- **Identificador Único (Slug)**: `tasa-de-fotogramas`
- **Título Original en Fuente**: `TASA DE FOTOGRAMAS (Frame rate)`
- **Fases del Proceso**: Producción, Postproducción, Distribución
- **Sinónimos y Alias**: Frecuencia de Cuadros, Frame Rate (fps), Velocidad de Fotogramas
- **Definición Técnica Original**: Parámetro temporal fundamental que mide el número de cuadros o fotogramas enteros registrados y reproducidos por unidad de tiempo de un segundo (medido en fps). Establece la cadencia rítmica, la fluidez visual del movimiento y condiciona la velocidad mínima de obturación para respetar la regla cinematográfica de los 180 grados.
- **Contexto de Uso Operativo**: Configuración obligatoria previa a la grabación de cualquier toma y pauta maestra de la línea de tiempo de postproducción.
- **Ejemplo Práctico de Producción**: Ajustar la cámara a 50 fps en Europa para evitar el parpadeo de las luces de corriente alterna a 50Hz, permitiendo además ralentizar la toma a la mitad en una secuencia a 25 fps.
- **Especificación Visual / Diagrama**: Esfera de reloj giratoria descompuesta en 24, 30 y 60 marcas correlativas alrededor del cuadrante de un segundo.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'precise frame rate calibration, 24fps cinematic aesthetic, 50fps broadcast fluid movement'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_equivalente_a*: `fps-frame-rate`
  - *permite*: `slow-motion`, `camara-lenta`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#tasa-de-fotogramas) | *Relacionados originales*: Slow motion, Velocidad de obturación, Timelapse

#### 157. [UHD 4K vs DCI 4K (Resolución de Consumo vs Cine Digital)](#uhd-4k-vs-dci-4k)
- **Identificador Único (Slug)**: `uhd-4k-vs-dci-4k`
- **Título Original en Fuente**: `UHD 4K vs DCI 4K`
- **Fases del Proceso**: Producción, Postproducción, Distribución
- **Sinónimos y Alias**: Ultra Alta Definición vs Cine 4K, 3840x2160 vs 4096x2160, UHD vs DCI
- **Definición Técnica Original**: Distinción técnica rigurosa entre los dos estándares mundiales de resolución denominados coloquialmente '4K': 1) UHD 4K (Ultra High Definition / 3840x2160 píxeles), con relación de aspecto exacta de 16:9, diseñado para televisión doméstica, pantallas de consumo y plataformas de streaming; frente a 2) DCI 4K (Digital Cinema Initiatives / 4096x2160 píxeles), con relación de aspecto nativa de 1.90:1 (o 17:9), estándar internacional de la industria cinematográfica para salas de cine y proyectores DCI.
- **Contexto de Uso Operativo**: Determinación de la resolución de captura en rodaje cinematográfico y selección de especificaciones de masterización para salas comerciales frente a streaming casero.
- **Ejemplo Práctico de Producción**: Rodar en DCI 4K para la versión de estreno en salas cinematográficas y recortar lateralmente 128 píxeles en cada borde para obtener el master UHD 4K destinado a Netflix.
- **Especificación Visual / Diagrama**: Diagrama comparativo donde el rectángulo DCI 4K (4096 píxeles de base) sobresale ligeramente por los dos laterales del rectángulo UHD 4K (3840 píxeles de base).
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'DCI 4K 4096x2160 cinematic frame, UHD 4K 3840x2160 16:9 consumer standard, aspect ratio comparison chart'.`
- **Relaciones Semánticas Inferidas**: 
  - *son_especificaciones_de*: `resolucion`
  - *definen_la*: `relacion-de-aspecto`
  - *se_destinan_a*: `masterizacion-de-entrega`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#uhd-4k-vs-dci-4k) | *Relacionados originales*: Resolución, Aspect ratio, HDR

### Categoría: Inteligencia Artificial Audiovisual & Producción Virtual (17 Términos)

#### 10. [Avatar Digital (Synthespian / Metahumano)](#avatar-digital)
- **Identificador Único (Slug)**: `avatar-digital`
- **Título Original en Fuente**: `Avatar Digital`
- **Fases del Proceso**: Preproducción, Producción, Postproducción
- **Sinónimos y Alias**: Metahumano, Doble Digital, Synthespian, Virtual Human
- **Definición Técnica Original**: Representación virtual tridimensional fotorrealista o estilizada de una persona humana, sintetizada mediante algoritmos de inteligencia artificial generativa o motores de render en tiempo real (Unreal Engine / MetaHuman), animada mediante captura de movimiento (mocap) o clonación vocal con sincronización labial automática.
- **Contexto de Uso Operativo**: Presentadores virtuales de noticias corporativas, dobles digitales en escenas de riesgo de cine, interfaces conversacionales interactivas y experiencias en mundos virtuales.
- **Ejemplo Práctico de Producción**: Generación de un avatar del embajador de marca que reproduce discursos corporativos en 12 idiomas diferentes sin necesidad de rodar físicamente en cada país.
- **Especificación Visual / Diagrama**: Rostro tridimensional con mapas de texturas dérmicas 8K y puntos de tracking de deformación facial facial FACS.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'photorealistic digital avatar, MetaHuman mesh, accurate facial lip-sync, sub-surface skin scattering, natural eye micro-movements'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_utiliza_para*: `produccion-virtual`
  - *se_integra_con*: `clonacion-de-voz`, `motion-capture`, `video-generativo`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#avatar-digital) | *Relacionados originales*: Video generativo, Clonación de voz, UGC

#### 23. [Clonación de Voz (Voice Cloning / Síntesis Neuronal TTS)](#clonacion-de-voz)
- **Identificador Único (Slug)**: `clonacion-de-voz`
- **Título Original en Fuente**: `Clonación De Voz`
- **Fases del Proceso**: Preproducción, Producción, Postproducción
- **Sinónimos y Alias**: Clonación Vocal por IA, Voice Synthesis, Voice Cloning, Voz Neuronal Generativa
- **Definición Técnica Original**: Tecnología de inteligencia artificial basada en redes neuronales profundas que analiza un archivo de muestra de audio de la voz real de una persona (típicamente de 1 a 10 minutos de habla limpia) para extraer y modelar su timbre tímbrico, acento, entonación, formantes vocales y cadencia respiratoria, permitiendo sintetizar cualquier texto nuevo reproduciendo la voz idéntica de ese individuo con sincronización emocional.
- **Contexto de Uso Operativo**: Localización multilingüe de videos corporativos, doblaje con la voz original del actor en otros idiomas, corrección de diálogos y accesibilidad.
- **Ejemplo Práctico de Producción**: Clonar la voz del fundador de la empresa en inglés para generar automáticamente la versión en español de su presentación institucional preservando su tono y calidez vocal única.
- **Especificación Visual / Diagrama**: Espectrograma de frecuencias vocales comparando la onda original humana con la onda sintética neuronal mostrando concordancia de armónicos superior al 95%.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'high fidelity voice cloning, neural voice synthesis ElevenLabs style, natural emotional voice inflections, accurate vocal timbre preservation'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `modelo-de-ia`
  - *se_combina_con*: `avatar-digital`, `doblaje`
  - *requiere*: `disclosure-de-contenido-ia`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#clonacion-de-voz) | *Relacionados originales*: Doblaje, Voice-over, Deepfake

#### 30. [Deepfake (Reemplazo Facial Sintético por IA)](#deepfake)
- **Identificador Único (Slug)**: `deepfake`
- **Título Original en Fuente**: `Deepfake`
- **Fases del Proceso**: Preproducción, Producción, Postproducción
- **Sinónimos y Alias**: Face-Swapping por IA, Manipulación Sintética Facial, Sustitución Facial Neuronal
- **Definición Técnica Original**: Técnica avanzada de visión por computadora y aprendizaje profundo (redes neuronales generativas antagónicas - GANs y modelos de difusión) que mapea e injerta de forma hiperrealista los rasgos faciales, expresiones y sincronía labial de una persona sobre el cuerpo y rostro de otro individuo en un video preexistente.
- **Contexto de Uso Operativo**: Rejuvenecimiento (de-aging) de actores veteranos en cine de Hollywood, sustitución de dobles en escenas de riesgo peligrosas, parodias autorizadas y generación de contenido sintético.
- **Ejemplo Práctico de Producción**: Rejuvenecer digitalmente el rostro de un actor consagrado 40 años para una escena de flashback en un drama histórico mediante redes neuronales entrenadas con sus películas de juventud.
- **Especificación Visual / Diagrama**: Malla de puntos faciales (landmarks) calculando vectores de movimiento de cejas, boca y ojos para fusionar los bordes cutáneos sin líneas de costura visibles.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'photorealistic deepfake face swap, seamless edge blending, temporal facial consistency, natural skin tone integration'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `modelo-de-ia`
  - *exige*: `disclosure-de-contenido-ia`
  - *se_aplica_en*: `vfx`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#deepfake) | *Relacionados originales*: Clonación de voz, Avatar digital, Disclosure de contenido IA

#### 34. [Disclosure de Contenido IA (Etiquetado y Transparencia Sintética)](#disclosure-de-contenido-ia)
- **Identificador Único (Slug)**: `disclosure-de-contenido-ia`
- **Título Original en Fuente**: `Disclosure De Contenido Ia`
- **Fases del Proceso**: Preproducción, Producción, Postproducción
- **Sinónimos y Alias**: Etiquetado de IA, AI Content Transparency, Declaración de Contenido Sintético, Watermarking C2PA
- **Definición Técnica Original**: Práctica ética, contractual y regulatoria (mandatoria según directivas como la AI Act europea y las políticas de plataformas como YouTube, TikTok y Meta) que consiste en declarar explícita y transparentemente a la audiencia y en los metadatos del archivo (estándar C2PA / Content Credentials) que un video, imagen o pista de voz fue generado, manipulado o alterado significativamente mediante algoritmos de inteligencia artificial.
- **Contexto de Uso Operativo**: Publicación de comerciales, documentales, noticias corporativas y campañas políticas que contienen metraje o voces sintéticas.
- **Ejemplo Práctico de Producción**: Añadir una insignia visual en pantalla y una etiqueta en los metadatos XMP de YouTube que indique: 'Contenido alterado o sintético: el audio y partes del video fueron generados con IA'.
- **Especificación Visual / Diagrama**: Insignia o marca de agua sutil con el icono de Content Credentials (CR) en la esquina superior y metadatos criptográficos incrustados en la cabecera del archivo.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'C2PA cryptographic watermark, AI content disclosure badge, transparent synthetic media labeling'.`
- **Relaciones Semánticas Inferidas**: 
  - *regula*: `video-generativo`, `deepfake`, `clonacion-de-voz`
  - *es_un_requisito_de*: `distribucion`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#disclosure-de-contenido-ia) | *Relacionados originales*: Deepfake, Video generativo, NDA

#### 40. [Edición Asistida por IA (AI-Powered Editing)](#edicion-asistida-por-ia)
- **Identificador Único (Slug)**: `edicion-asistida-por-ia`
- **Título Original en Fuente**: `Edición Asistida Por Ia`
- **Fases del Proceso**: Preproducción, Producción, Postproducción
- **Sinónimos y Alias**: Montaje Asistido por Inteligencia Artificial, Smart Editing, Copiloto de Edición
- **Definición Técnica Original**: Conjunto de herramientas algorítmicas integradas en suites de montaje profesional que automatizan tareas repetitivas mediante modelos de visión y lenguaje: detección automática de silencios y palabras de relleno (eh, umm), edición basada en texto a través de transcripciones, selección automática de las mejores tomas, reencuadre inteligente para video vertical y eliminación de fondos sin pantalla verde.
- **Contexto de Uso Operativo**: Optimización radical de tiempos de postproducción en productoras, agencias de marketing y creadores de contenido intensivo.
- **Ejemplo Práctico de Producción**: El editor elimina todas las pausas de más de 1 segundo de una entrevista de una hora en un solo clic seleccionando 'Eliminar silencios' en el editor de texto de Premiere Pro.
- **Especificación Visual / Diagrama**: Ventana de transcripción interactiva donde tachar una frase en el procesador de texto recorta automáticamente los fotogramas correspondientes en la línea de tiempo de video.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'AI text-based editing, smart scene edit detection, automated pause removal, intelligent reframe timeline'.`
- **Relaciones Semánticas Inferidas**: 
  - *acelera_el*: `montaje`
  - *incorpora*: `transcripcion-automatica`, `rotoscopia-automatica`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#edicion-asistida-por-ia) | *Relacionados originales*: Transcripción automática, Reel/Short, Edición no lineal

#### 83. [Modelo de IA (Foundational AI Video/Audio Model)](#modelo-de-ia)
- **Identificador Único (Slug)**: `modelo-de-ia`
- **Título Original en Fuente**: `Modelo De Ia`
- **Fases del Proceso**: Preproducción, Producción, Postproducción
- **Sinónimos y Alias**: Modelo Fundacional, Red Neuronal Generativa, AI Foundation Engine
- **Definición Técnica Original**: Red neuronal profunda de gran escala (arquitecturas Transformer, Modelos de Difusión o Diffusion Transformers / DiT) entrenada con cientos de miles de horas de video, audio y descripciones textuales para aprender las leyes físicas de la luz, el movimiento tridimensional, la coherencia temporal y la gramática del lenguaje audiovisual, permitiendo generar o modificar contenido a partir de instrucciones textuales.
- **Contexto de Uso Operativo**: Infraestructura matemática y algorítmica subyacente que alimenta plataformas como Runway Gen-3, Sora de OpenAI, Kling, Midjourney o ElevenLabs.
- **Ejemplo Práctico de Producción**: Un modelo de difusión espacial y temporal que predice y genera fotograma a fotograma el movimiento coherente de un automóvil derrapando sobre una carretera mojada.
- **Especificación Visual / Diagrama**: Diagrama de arquitectura de red neuronal mostrando capas convolucionales y de atención (Self-Attention) procesando tensores de píxeles latentes.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'diffusion transformer DiT architecture, foundational video generation model, spatial-temporal latent model'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_la_base_de*: `video-generativo`, `clonacion-de-voz`, `prompt`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#modelo-de-ia) | *Relacionados originales*: Video generativo, Upscaling por IA, Transcripción automática

#### 105. [Producción Virtual (Virtual Production / In-Camera VFX)](#produccion-virtual)
- **Identificador Único (Slug)**: `produccion-virtual`
- **Título Original en Fuente**: `Producción Virtual`
- **Fases del Proceso**: Preproducción, Producción, Postproducción
- **Sinónimos y Alias**: Producción Virtual en Set, ICVFX (In-Camera VFX), StageCraft
- **Definición Técnica Original**: Metodología revolucionaria de cinematografía que fusiona el rodaje de imagen real física con entornos tridimensionales digitales generados en tiempo real por motores de videojuegos (Unreal Engine). Los fondos se proyectan sobre colosales pantallas LED curvas (volúmenes LED) sincronizadas con el movimiento de la cámara física mediante rastreo espacial (camera tracking), logrando que la perspectiva y la iluminación sobre los actores coincidan a la perfección en cámara.
- **Contexto de Uso Operativo**: Largometrajes de gran escala (como The Mandalorian), comerciales automotrices y series dramáticas de ciencia ficción y época.
- **Ejemplo Práctico de Producción**: Filmar a los actores en una nave espacial: el volumen LED proyecta el planeta Marte con luz rojiza real rebotando en los cascos de los actores sin usar pantallas verdes ni postproducción de croma.
- **Especificación Visual / Diagrama**: Pared envolvente de paneles LED gigantes mostrando un paisaje desértico con la cámara en grúa equipada con sensores de tracking en el techo del estudio.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'virtual production stage, LED volume wall Unreal Engine background, in-camera visual effects ICVFX, real-time parallax tracking'.`
- **Relaciones Semánticas Inferidas**: 
  - *integra*: `volumen-led`, `render-en-tiempo-real`, `camera-tracking`
  - *sustituye_a*: `chroma-key`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#produccion-virtual) | *Relacionados originales*: Volumen LED, Render en tiempo real, Chroma key

#### 107. [Prompt (Consigna Textual de Generación por IA)](#prompt)
- **Identificador Único (Slug)**: `prompt`
- **Título Original en Fuente**: `Prompt`
- **Fases del Proceso**: Preproducción, Producción, Postproducción
- **Sinónimos y Alias**: Consigna Textual, Instrucción de Prompting, Text Prompt
- **Definición Técnica Original**: Cadena estructurada de texto natural, parámetros técnicos, palabras clave estilísticas y condicionantes formales suministrada a un modelo de inteligencia artificial generativa para guiar con precisión la síntesis de una imagen, un clip de video, una locución o una pista musical, especificando plano, lente, iluminación, movimiento y acción dramática.
- **Contexto de Uso Operativo**: Herramienta operativa principal en flujos de trabajo de creación audiovisual generativa con IA (Runway, Sora, Midjourney, Pika).
- **Ejemplo Práctico de Producción**: 'Cinematic wide shot, 35mm lens, f/2.8, slow dolly forward, golden hour lighting, a lone astronaut walking across Martian red dunes, photorealistic 8k, 24fps'.
- **Especificación Visual / Diagrama**: Cuadro de texto de entrada con la consigna tipiada acompañada de selectores de semilla (seed), relación de aspecto (16:9) y fuerza de movimiento (motion brush).
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'structured technical prompt, camera cues prompt engineering, lighting and focal length descriptors, negative prompt constraints'.`
- **Relaciones Semánticas Inferidas**: 
  - *guia_al*: `video-generativo`, `modelo-de-ia`
  - *determina_la*: `calidad-de-imagen`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#prompt) | *Relacionados originales*: Video generativo, Guion técnico, Ángulo de cámara

#### 113. [Reducción de Ruido por IA (AI Noise Reduction / Voice Isolation)](#reduccion-de-ruido-por-ia)
- **Identificador Único (Slug)**: `reduccion-de-ruido-por-ia`
- **Título Original en Fuente**: `Reducción De Ruido Por Ia`
- **Fases del Proceso**: Preproducción, Producción, Postproducción
- **Sinónimos y Alias**: Aislamiento de Voz por IA, Voice Isolation, AI Audio Denoising
- **Definición Técnica Original**: Algoritmo de procesamiento digital de señales entrenado mediante aprendizaje profundo para separar y aislar con extrema pulcritud las frecuencias de la voz humana de cualquier ruido ambiental de fondo (tráfico, aire acondicionado, viento, murmullo de cafetería o eco de habitación), reconstruyendo armónicos vocales perdidos sin generar los artefactos metálicos acuosos de los filtros tradicionales.
- **Contexto de Uso Operativo**: Limpieza de sonido directo en documentales, entrevistas en exteriores ruidosos y rescate de pistas de audio deficientes en postproducción.
- **Ejemplo Práctico de Producción**: Activar 'Voice Isolation' en DaVinci Resolve para eliminar completamente el rugido de los motores de avión en una entrevista grabada junto a una pista de aterrizaje.
- **Especificación Visual / Diagrama**: Deslizador de porcentaje (0% a 100%) en el panel de pista de audio de la NLE; la forma de onda del ruido continuo desaparece dejando solo los pulsos de la voz.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'AI voice isolation clean speech, neural audio denoising, removal of background street noise, studio-quality speech extraction'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `edicion-asistida-por-ia`
  - *mejora_el*: `audio-directo`
  - *previene_el*: `adr`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#reduccion-de-ruido-por-ia) | *Relacionados originales*: ADR, ISO, Audio directo

#### 117. [Render en Tiempo Real (Real-Time Rendering)](#render-en-tiempo-real)
- **Identificador Único (Slug)**: `render-en-tiempo-real`
- **Título Original en Fuente**: `Render En Tiempo Real`
- **Fases del Proceso**: Preproducción, Producción, Postproducción
- **Sinónimos y Alias**: Renderizado en Vivo, Motor de Render en Tiempo Real (Unreal Engine / Unity), Real-Time GPU Compute
- **Definición Técnica Original**: Capacidad computacional gráfica de procesar, iluminar y calcular fotogramas visuales complejos a una velocidad igual o superior a la tasa de reproducción interactiva (a 24, 60 o 120 fps constantes sin demoras de procesamiento previo), utilizando tarjetas gráficas de última generación con trazado de rayos por hardware (Ray Tracing / Path Tracing).
- **Contexto de Uso Operativo**: Producción virtual en volúmenes LED, transmisiones de televisión con realidad aumentada (AR) y experiencias inmersivas interactivas.
- **Ejemplo Práctico de Producción**: Unreal Engine 5 recalculando la iluminación y el reflejo de las paredes del castillo en tiempo real a 60 fps mientras la cámara del set se mueve libremente.
- **Especificación Visual / Diagrama**: Visualizador de viewport 3D ejecutándose a 60 FPS estables con cálculo dinámico de iluminación global Lumen y sombras suaves instantáneas.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'Unreal Engine real-time rendering, hardware ray tracing 60fps, Lumen global illumination, instantaneous frame computation'.`
- **Relaciones Semánticas Inferidas**: 
  - *habilita_la*: `produccion-virtual`
  - *sustenta_al*: `volumen-led`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#render-en-tiempo-real) | *Relacionados originales*: Producción virtual, Volumen LED, VFX

#### 124. [Rotoscopia Automática (AI Magic Mask / Neural Rotoscoping)](#rotoscopia-automatica)
- **Identificador Único (Slug)**: `rotoscopia-automatica`
- **Título Original en Fuente**: `Rotoscopia Automática`
- **Fases del Proceso**: Preproducción, Producción, Postproducción
- **Sinónimos y Alias**: Máscara Mágica por IA, Roto Neuronal, AI Background Removal
- **Definición Técnica Original**: Herramienta de postproducción de video basada en redes neuronales de segmentación semántica que aísla y recorta automáticamente a una persona u objeto en movimiento a lo largo de un plano con solo trazar una pincelada sobre el sujeto, rastreando su silueta con precisión de cabello y ropa sin requerir máscaras manuales fotograma por fotograma.
- **Contexto de Uso Operativo**: Aplicación selectiva de etalonaje solo en el personaje, inserción de títulos detrás de personas y eliminación de fondos en segundos.
- **Ejemplo Práctico de Producción**: El colorista pasa un trazo con la Magic Mask de DaVinci sobre el rostro del protagonista y en 5 segundos tiene una máscara perfecta que sigue su rostro durante toda la toma de 20 segundos.
- **Especificación Visual / Diagrama**: Superposición de máscara de color rojo semitransparente cubriendo milimétricamente al personaje mientras este se desplaza y gira.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'AI magic mask rotoscoping, neural semantic segmentation mask, automatic person cutout video'.`
- **Relaciones Semánticas Inferidas**: 
  - *evoluciona_de*: `rotoscopia`
  - *es_un_tipo_de*: `edicion-asistida-por-ia`
  - *genera*: `canal-alfa`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#rotoscopia-automatica) | *Relacionados originales*: Chroma key, VFX, Edición asistida por IA

#### 154. [Transcripción Automática (Speech-to-Text por IA)](#transcripcion-automatica)
- **Identificador Único (Slug)**: `transcripcion-automatica`
- **Título Original en Fuente**: `Transcripción Automática`
- **Fases del Proceso**: Preproducción, Producción, Postproducción
- **Sinónimos y Alias**: Transcripción Neuronal, Reconocimiento de Voz por IA, Speech-to-Text (STT)
- **Definición Técnica Original**: Tecnología de procesamiento del lenguaje natural y reconocimiento automático del habla basada en modelos neuronales (como Whisper de OpenAI) que convierte la pista vocal de un archivo de video en texto mecanografiado con código de tiempo de entrada y salida preciso por palabra, permitiendo generar subtítulos instantáneos y montar video a través de la edición del texto transcrito.
- **Contexto de Uso Operativo**: Generación automática de subtítulos para accesibilidad, búsqueda de parlamentos en entrevistas de horas de duración y edición basada en texto.
- **Ejemplo Práctico de Producción**: Convertir una entrevista de 45 minutos en un guion transcrito con marcas de tiempo en menos de 2 minutos, con más del 98% de precisión en los términos técnicos.
- **Especificación Visual / Diagrama**: Columna de texto sincronizada junto a la ventana de visualización donde cada palabra se resalta en azul al ser pronunciada en el video.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'Whisper AI speech to text transcription, precise word-level timecode sync, automated caption generation'.`
- **Relaciones Semánticas Inferidas**: 
  - *produce*: `srt`, `subtitulos-quemados`
  - *alimenta_la*: `edicion-asistida-por-ia`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#transcripcion-automatica) | *Relacionados originales*: Edición asistida por IA, Video podcast

#### 160. [Upscaling por IA (Superresolución Neuronal)](#upscaling-por-ia)
- **Identificador Único (Slug)**: `upscaling-por-ia`
- **Título Original en Fuente**: `Upscaling Por Ia`
- **Fases del Proceso**: Preproducción, Producción, Postproducción
- **Sinónimos y Alias**: Superresolución por IA, AI Video Upscaler, Restauración y Escalado Neuronal
- **Definición Técnica Original**: Proceso algorítmico que utiliza redes neuronales convolucionales o modelos generativos entrenados para incrementar la resolución espacial de un video (por ejemplo, escalar de 1080p a 4K o de 4K a 8K), no simplemente duplicando píxeles o interpolando linealmente, sino inventando y sintetizando detalles microtexturales fotorrealistas coherentes con el contenido.
- **Contexto de Uso Operativo**: Restauración de películas y material de archivo antiguo, mejora de tomas de archivo en baja resolución y masterización a gran formato.
- **Ejemplo Práctico de Producción**: Procesar con Topaz Video AI un metraje de archivo de 1970 grabado en 480p para convertirlo en una toma limpia y nítida en 4K apta para proyectarse en pantallas gigantes.
- **Especificación Visual / Diagrama**: Comparativa en pantalla dividida: a la izquierda, la imagen escalada por bicúbico muestra bordes borrosos; a la derecha, la versión con IA muestra pestañas individuales y poros en la piel.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'AI video upscaling, neural super-resolution detail enhancement, photorealistic texture hallucination Topaz style'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `modelo-de-ia`
  - *incrementa_la*: `resolucion`
  - *mejora_la*: `calidad-de-imagen`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#upscaling-por-ia) | *Relacionados originales*: Resolución, UHD, Modelo de IA

#### 164. [Video Generativo (Text-to-Video / Image-to-Video)](#video-generativo)
- **Identificador Único (Slug)**: `video-generativo`
- **Título Original en Fuente**: `VIDEO GENERATIVO (Text-to-Video)`
- **Fases del Proceso**: Preproducción, Producción, Postproducción
- **Sinónimos y Alias**: Generación de Video por IA, Text-to-Video (T2V), Metraje Sintético Generativo
- **Definición Técnica Original**: Disciplina de la inteligencia artificial generativa en la que modelos multimodales avanzados sintetizan secuencias continuas de video fotorrealista o estilizado a partir de instrucciones textuales (prompts), imágenes de referencia fija (Image-to-Video) o condicionantes de cámara, calculando la coherencia física, lumínica y temporal entre fotogramas sin necesidad de filmar en un set.
- **Contexto de Uso Operativo**: Creación de conceptos visuales rápidos en preproducción, planos de recurso imposibles de rodar físicamente, efectos de ciencia ficción y publicidad experimental.
- **Ejemplo Práctico de Producción**: Generar un clip cinematográfico de 5 segundos de una ballena luminiscente volando sobre los rascacielos de Tokio en una noche lluviosa mediante una consigna de texto en Runway Gen-3.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-video-generativo-1.webp` (1200x654) - "Diagrama de video generativo: como la inteligencia artificial produce material audiovisual". Diagrama mostrando el flujo Prompt de Texto -> Espacio Latente Neuronal -> Difusión Temporal -> Fotogramas de Video Coherentes.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'Runway Gen-3 photorealistic video, Sora hyper-realistic physics, text-to-video coherent motion, high frame consistency video generation'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_alimenta_de*: `prompt`, `modelo-de-ia`
  - *requiere*: `disclosure-de-contenido-ia`
  - *se_opone_a*: `live-action`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#video-generativo) | *Relacionados originales*: Prompt, Modelo de IA, Disclosure de contenido IA

#### 169. [Volumen LED (LED Volume / Paredes LED para Producción Virtual)](#volumen-led)
- **Identificador Único (Slug)**: `volumen-led`
- **Título Original en Fuente**: `VOLUMEN LED (LED Volume)`
- **Fases del Proceso**: Preproducción, Producción, Postproducción
- **Sinónimos y Alias**: Pared LED Curva, Cueva LED Virtual, StageCraft LED Studio
- **Definición Técnica Original**: Instalación física compuesta por una gigantesca pared semicircular cóncava y un techo continuo de paneles de micro-LED de alta resolución y alto brillo, controlados por procesadores de video dedicados. Muestran escenarios tridimensionales en tiempo real que envuelven el set de rodaje, proyectando una luz ambiental fotorrealista perfecta sobre los actores y objetos reales.
- **Contexto de Uso Operativo**: Platós de producción virtual de última generación para cine, series y comerciales automovilísticos.
- **Ejemplo Práctico de Producción**: Un estudio con un volumen LED de 25 metros de diámetro y 6 metros de altura donde se filman escenas de un viaje en tren mientras el paisaje exterior pasa a 100 km/h por las ventanas.
- **Especificación Visual / Diagrama**: Estructura colosal semicircular de pantallas LED iluminadas con un cielo atardecer reflejándose orgánicamente en la carrocería brillante de un coche situado en el centro.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'giant LED volume wall cinema set, curved Micro-LED stage, realistic in-camera lighting reflections on actors'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_la_infraestructura_de*: `produccion-virtual`
  - *sustenta_el*: `render-en-tiempo-real`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#volumen-led) | *Relacionados originales*: Producción virtual, Render en tiempo real, Camera tracking

#### 170. [VR (Virtual Reality / Realidad Virtual Audiovisual)](#vr)
- **Identificador Único (Slug)**: `vr`
- **Título Original en Fuente**: `VR (Realidad Virtual)`
- **Fases del Proceso**: Preproducción, Producción, Postproducción
- **Sinónimos y Alias**: Realidad Virtual, Video 360 Grados, Inmersión VR
- **Definición Técnica Original**: Medio y tecnología audiovisual inmersiva que sustituye completamente el campo visual y auditivo del usuario mediante un visor estereoscópico montado en la cabeza (HMD) con seguimiento de posición de seis grados de libertad (6DoF) y audio espacial binaural, situándolo dentro de un entorno esférico de 360 grados filmado con rigs multicámara esféricos o sintetizado en 3D.
- **Contexto de Uso Operativo**: Experiencias de entretenimiento interactivo, simulaciones de entrenamiento corporativo y médico, y cortometrajes inmersivos.
- **Ejemplo Práctico de Producción**: Un documental en video 360° estereoscópico que sitúa al espectador en la cima del monte Everest permitiéndole mirar en cualquier dirección libremente.
- **Especificación Visual / Diagrama**: Usuario con visor VR Meta Quest y auriculares cerrados interactuando con las manos en un entorno espacial esférico.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'immersive 360 VR experience, stereoscopic virtual reality headset view, 6DoF spatial environment'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `xr`
  - *requiere*: `audio-inmersivo`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#vr) | *Relacionados originales*: XR, Producción virtual, Video mapping

#### 175. [XR (Extended Reality / Realidad Extendida)](#xr)
- **Identificador Único (Slug)**: `xr`
- **Título Original en Fuente**: `XR (Realidad Extendida)`
- **Fases del Proceso**: Preproducción, Producción, Postproducción
- **Sinónimos y Alias**: Realidad Extendida, Ecosistema Inmersivo XR, Realidad Mixta y Aumentada
- **Definición Técnica Original**: Término paraguas que engloba el espectro completo de tecnologías que combinan elementos reales y virtuales: Realidad Virtual (VR, inmersión total), Realidad Aumentada (AR, superposición de gráficos digitales sobre el mundo real) y Realidad Mixta (MR, interacción física de elementos digitales con objetos reales del entorno tangible).
- **Contexto de Uso Operativo**: Producción audiovisual de vanguardia, escenografías interactivas para programas en directo y conciertos masivos con gráficos flotantes.
- **Ejemplo Práctico de Producción**: Un noticiero de televisión donde el presentador camina alrededor de un holograma tridimensional interactivo de un huracán que gira en el centro del plató.
- **Especificación Visual / Diagrama**: Superposición de interfaces gráficas tridimensionales flotando en el espacio físico real de un set de televisión.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'extended reality XR studio, mixed reality holographic display, broadcast augmented reality overlay'.`
- **Relaciones Semánticas Inferidas**: 
  - *engloba*: `vr`, `produccion-virtual`
  - *emplea*: `render-en-tiempo-real`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#xr) | *Relacionados originales*: VR, Producción virtual, Video mapping

### Categoría: Entrega, Formatos Digitales & Distribución (16 Términos)

#### 31. [Deliverable (Entregable Audiovisual)](#deliverable)
- **Identificador Único (Slug)**: `deliverable`
- **Título Original en Fuente**: `DELIVERABLE (Entregable)`
- **Fases del Proceso**: Distribución
- **Sinónimos y Alias**: Entregable Final, Paquete de Entrega, Master Deliverable
- **Definición Técnica Original**: Conjunto formal de archivos definitivos especificados en el contrato que la casa productora debe suministrar al cliente o distribuidor al concluir el proyecto. Abarca los masters de alta resolución, versiones adaptadas por relación de aspecto (16:9, 9:16, 1:1), versiones cortas para redes (cutdowns), pistas de audio stems (M&E) y archivos de subtítulos.
- **Contexto de Uso Operativo**: Hito contractual culminante y firma de acta de conformidad del proyecto audiovisual.
- **Ejemplo Práctico de Producción**: El paquete de entregables de la campaña incluye: 1 master ProRes 4444 en 16:9, 3 adaptaciones en H.264 vertical 9:16 para Instagram Reels, y 2 archivos SRT de subtítulos en español e inglés.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-deliverable-1.webp` (1200x530) - "Diagrama de deliverable audiovisual: los entregables finales de un proyecto de video". Diagrama con una caja central de entregables ramificándose en archivos de video master, carpetas de adaptaciones para redes y pistas de audio stems.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'client video deliverable package, multi-format delivery assets, final ProRes master and social cutdowns'.`
- **Relaciones Semánticas Inferidas**: 
  - *concluye_la*: `produccion-de-video`
  - *se_compone_de*: `master`, `stems`, `srt`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#deliverable) | *Relacionados originales*: Master, Aspect ratio, Video vertical

#### 42. [Entrega / Subida (Upload y Distribución en Plataformas)](#entrega-subida)
- **Identificador Único (Slug)**: `entrega-subida`
- **Título Original en Fuente**: `ENTREGA / SUBIDA (Upload)`
- **Fases del Proceso**: Distribución
- **Sinónimos y Alias**: Carga de Archivo, Upload de Video, Publicación en Servidor
- **Definición Técnica Original**: Proceso técnico y logístico de transferir los archivos finales de video terminados hacia servidores de almacenamiento en la nube, plataformas de revisión con clientes (Frame.io) o servidores de distribución pública (YouTube, Vimeo, Meta, TikTok), verificando la integridad de subida y el procesamiento posterior de transcodificación del servidor.
- **Contexto de Uso Operativo**: Fase final de distribución y difusión de la obra audiovisual.
- **Ejemplo Práctico de Producción**: Subir el video masterizado a Frame.io para que el departamento legal del cliente deje comentarios con código de tiempo antes de la publicación definitiva.
- **Especificación Visual / Diagrama**: Ventana de navegador con barra de subida porcentual al 100% y estado 'Procesando versión 4K en servidor'.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'cloud video upload progress, Frame.io client review platform, seamless high speed upload'.`
- **Relaciones Semánticas Inferidas**: 
  - *sigue_a*: `deliverable`, `masterizacion-de-entrega`
  - *inicia_el*: `streaming`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#entrega-subida) | *Relacionados originales*: Deliverable, Master, Bitrate

#### 58. [Hook (Gancho Inicial de Retención)](#hook)
- **Identificador Único (Slug)**: `hook`
- **Título Original en Fuente**: `HOOK (Gancho)`
- **Fases del Proceso**: Distribución
- **Sinónimos y Alias**: Gancho Audiovisual, Hook de Entrada, Primeros 3 Segundos
- **Definición Técnica Original**: Estrategia narrativa, visual y auditiva concentrada en los primeros 3 a 5 segundos de un video (especialmente en formatos cortos para redes sociales) diseñada para detener inmediatamente el deslizamiento del pulgar del usuario (scroll stopping), despertar curiosidad imperiosa o plantear una pregunta intrigante que garantice la retención de la audiencia.
- **Contexto de Uso Operativo**: Creación de Reels, TikToks, Shorts de YouTube y comerciales digitales de respuesta directa.
- **Ejemplo Práctico de Producción**: Comenzar el video con el plano del automóvil en llamas y la frase 'Esto es lo que nadie te dice antes de comprar tu primer deportivo' para enganchar a la audiencia.
- **Especificación Visual / Diagrama**: Gráfico de retención de audiencia mostrando una caída pronunciada en el segundo 3 si no hay hook frente a una línea horizontal estable cuando el gancho es efectivo.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'scroll stopping hook, high energy video intro, immediate visual intrigue, viral short hook framing'.`
- **Relaciones Semánticas Inferidas**: 
  - *maximiza_la*: `tasa-de-retencion`
  - *es_esencial_en*: `reel-short`, `video-vertical`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#hook) | *Relacionados originales*: Tasa de retención, Reel/Short, Guion técnico

#### 76. [Master (Archivo Maestro de Máxima Calidad)](#master)
- **Identificador Único (Slug)**: `master`
- **Título Original en Fuente**: `MASTER (Archivo maestro)`
- **Fases del Proceso**: Distribución
- **Sinónimos y Alias**: Archivo Maestro, Master de Conservación, Mezzanine File / Golden Master
- **Definición Técnica Original**: Archivo digital definitivo exportado en la máxima resolución y profundidad de color posibles, empleando un códec de compresión visualmente sin pérdidas de estándar industrial (como Apple ProRes 4444 XQ o Avid DNxHR HQX). Sirve como matriz histórica de archivo y preservación a partir de la cual se derivan todas las copias comprimidas de distribución comercial.
- **Contexto de Uso Operativo**: Almacenamiento de conservación en bóvedas de datos (LTO tape / Cloud Cold Storage) y entrega a distribuidores cinematográficos.
- **Ejemplo Práctico de Producción**: El master definitivo de la película se exporta en ProRes 4444 XQ en resolución DCI 4K con audio PCM a 24-bit/48kHz de 180 GB de peso.
- **Especificación Visual / Diagrama**: Ficha técnica de metadatos del archivo en MediaInfo mostrando códec ProRes 4444, 12 bits de profundidad de color y tasa de bits de 500 Mbps.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'golden master video archive, uncompressed ProRes 4444 XQ master, pristine quality preservation file'.`
- **Relaciones Semánticas Inferidas**: 
  - *culmina_la*: `postproduccion`
  - *da_origen_a*: `deliverable`
  - *requiere*: `masterizacion-de-entrega`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#master) | *Relacionados originales*: Deliverable, ProRes / H.264 / H.265, Renderizado

#### 78. [Masterización de Entrega (Conformado y Mastering)](#masterizacion-de-entrega)
- **Identificador Único (Slug)**: `masterizacion-de-entrega`
- **Título Original en Fuente**: `Masterización De Entrega`
- **Fases del Proceso**: Distribución
- **Sinónimos y Alias**: Mastering Final, Conformado Técnico de Entrega, QC and Mastering
- **Definición Técnica Original**: Fase técnica exhaustiva de control de calidad (Quality Control - QC) y preparación final del archivo audiovisual para asegurar el cumplimiento milimétrico de las directrices técnicas del cliente o difusor: normalización de volumen (LUFS), verificación de niveles legales de video (Broadcast Safe), incrustación de metadatos, barras y tonos de calibración, y sincronía labial.
- **Contexto de Uso Operativo**: Último paso antes de la entrega definitiva del material audiovisual.
- **Ejemplo Práctico de Producción**: Pasar el video por un analizador automatizado de QC para certificar que ningún fotograma sobrepase los 100 IRE de blanco ni baje de 0 IRE de negro.
- **Especificación Visual / Diagrama**: Monitor de forma de onda mostrando la señal de video confinada estrictamente entre las líneas de corte legal de 0% y 100% sin desbordamientos.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'broadcast legal mastering, strict QC compliance check, loudness normalization mastering, professional delivery conform'.`
- **Relaciones Semánticas Inferidas**: 
  - *garantiza*: `lufs-loudness`, `safe-zones`
  - *produce_el*: `master`, `deliverable`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#masterizacion-de-entrega) | *Relacionados originales*: LUFS / Loudness, Mezcla de sonido, Deliverable

#### 114. [Reel / Short (Formato de Video Corto Vertical)](#reel-short)
- **Identificador Único (Slug)**: `reel-short`
- **Título Original en Fuente**: `Reel / Short`
- **Fases del Proceso**: Distribución
- **Sinónimos y Alias**: Video Corto, Short-Form Video, TikTok / Instagram Reel / YouTube Short
- **Definición Técnica Original**: Formato audiovisual vertical (9:16) de consumo rápido con duración típicamente comprendida entre 15 y 90 segundos, caracterizado por un ritmo de montaje vertiginoso, subtítulos dinámicos llamativos en pantalla, diseño sonoro contundente y un gancho inicial hiperconcentrado optimizado para el consumo móvil.
- **Contexto de Uso Operativo**: Estrategias de contenido orgánico y publicidad de captación en TikTok, Instagram y YouTube.
- **Ejemplo Práctico de Producción**: Un tutorial de cocina de 30 segundos en formato vertical con 40 cortes dinámicos, efectos de sonido y subtítulos animados en el centro.
- **Especificación Visual / Diagrama**: Pantalla vertical de smartphone ocupada al 100% por la imagen con iconos interactivos de me gusta y comentarios superpuestos en el margen derecho.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'dynamic TikTok reel style, fast-paced vertical video, punchy kinetic captions, viral short mobile cinematography'.`
- **Relaciones Semánticas Inferidas**: 
  - *utiliza*: `video-vertical`, `hook`
  - *mide_su_exito_con*: `tasa-de-retencion`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#reel-short) | *Relacionados originales*: Hook, Video vertical, Tasa de retención

#### 126. [Safe Zones (Zonas Seguras de Visualización)](#safe-zones)
- **Identificador Único (Slug)**: `safe-zones`
- **Título Original en Fuente**: `Safe Zones`
- **Fases del Proceso**: Distribución
- **Sinónimos y Alias**: Márgenes de Seguridad, Action Safe / Title Safe, Zonas Seguras de Títulos
- **Definición Técnica Original**: Líneas guía estandarizadas superpuestas en el monitor de edición que delimitan los márgenes perimetrales seguros del encuadre: la Zona Segura de Acción (Action Safe, 90% interior del marco) garantiza que ningún elemento visual esencial quede recortado por biseles de televisores; la Zona Segura de Títulos (Title Safe, 80% interior) asegura que los textos, gráficos y logotipos se lean con claridad sin ser tapados por interfaces de usuario de redes sociales (botones de TikTok, subtítulos automáticos o avatares).
- **Contexto de Uso Operativo**: Composición de encuadre en cámara y diseño de grafismos y títulos en la suite de postproducción.
- **Ejemplo Práctico de Producción**: Verificar que el logotipo del cliente no quede oculto detrás de la barra de descripción y el botón de compartir de Instagram Reels ubicándolo en la zona segura central.
- **Especificación Visual / Diagrama**: Dos rectángulos concéntricos punteados superpuestos sobre el encuadre delimitando el 90% (Action Safe) y el 80% (Title Safe).
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'broadcast title safe guides, action safe margin overlay, clean text placement within safe zones'.`
- **Relaciones Semánticas Inferidas**: 
  - *protege*: `composicion`, `subtitulos-quemados`
  - *se_adapta_a*: `video-vertical`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#safe-zones) | *Relacionados originales*: Video vertical, Subtítulos quemados, Composición

#### 133. [SRT (SubRip Subtitle Format / Archivo de Subtítulos)](#srt)
- **Identificador Único (Slug)**: `srt`
- **Título Original en Fuente**: `SRT`
- **Fases del Proceso**: Distribución
- **Sinónimos y Alias**: Archivo .SRT, SubRip Text, Pista de Subtítulos Externa
- **Definición Técnica Original**: Formato de archivo de texto plano universalmente estandarizado para almacenar subtítulos temporizados. Cada bloque contiene cuatro líneas de información: 1) Número secuencial del subtítulo; 2) Código de tiempo exacto de inicio y fin (HH:MM:SS,mmm); 3) Una o dos líneas de texto del parlamento; y 4) Una línea en blanco de separación.
- **Contexto de Uso Operativo**: Suministro de subtítulos opcionales multilingües para plataformas web (YouTube, LinkedIn) y reproductores multimedia.
- **Ejemplo Práctico de Producción**: Un archivo 'video_espanol.srt' que se sube a YouTube junto con el video para que el usuario pueda activar o desactivar los subtítulos a voluntad.
- **Especificación Visual / Diagrama**: Bloque de texto formateado: '1 
 00:00:01,500 --> 00:00:04,200 
 Bienvenidos a nuestro informe anual.'
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'clean SubRip SRT text file format, millisecond accurate subtitle timecodes, plain text closed captions'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `subtitulos-vs-closed-captions`
  - *se_genera_con*: `transcripcion-automatica`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#srt) | *Relacionados originales*: Latencia, Producción remota, Broadcasting

#### 139. [Streaming (Transmisión Continua de Medios)](#streaming)
- **Identificador Único (Slug)**: `streaming`
- **Título Original en Fuente**: `Streaming`
- **Fases del Proceso**: Distribución
- **Sinónimos y Alias**: Transmisión en Flujo, Emisión en Directo / OTT, Video Streaming (HLS / DASH)
- **Definición Técnica Original**: Tecnología de distribución digital que permite enviar flujos de video y audio fragmentados en pequeños paquetes de datos a través de redes IP a demanda (VOD) o en vivo (Live Streaming), permitiendo al usuario final reproducir el contenido de forma instantánea a medida que se descarga sin necesidad de almacenar el archivo completo en su dispositivo local.
- **Contexto de Uso Operativo**: Plataformas de video bajo demanda (Netflix, YouTube) y transmisiones en vivo (Twitch, Kick, Zoom).
- **Ejemplo Práctico de Producción**: Transmisión de un concierto en vivo a 100.000 espectadores simultáneos adaptando automáticamente la calidad de 4K a 720p según la velocidad de conexión de cada usuario (Adaptive Bitrate Streaming HLS).
- **Especificación Visual / Diagrama**: Línea de tiempo de reproducción en el navegador web con una barra de búfer gris claro avanzando unos segundos por delante del cursor de reproducción rojo.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'live internet video streaming, adaptive bitrate HLS delivery, real-time live video broadcast buffer'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_opone_a*: `broadcasting`
  - *requiere*: `bitrate`, `codec`
  - *se_distribuye_mediante*: `entrega-subida`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#streaming) | *Relacionados originales*: Broadcasting, Bitrate, Entrega / Subida

#### 140. [Subtítulos Quemados (Burned-in Subtitles / Open Captions)](#subtitulos-quemados)
- **Identificador Único (Slug)**: `subtitulos-quemados`
- **Título Original en Fuente**: `SUBTÍTULOS QUEMADOS (Burned-in)`
- **Fases del Proceso**: Distribución
- **Sinónimos y Alias**: Subtítulos Incrustados, Open Captions (OC), Subtítulos Hardcoded
- **Definición Técnica Original**: Textos de subtítulos o transcripciones que se renderizan y graban de forma permanente e irreversible sobre los píxeles de la propia imagen de video durante la exportación. No pueden ser desactivados ni modificados por el espectador, garantizando que el diseño tipográfico, la posición exacta, el color y las animaciones se muestren exactamente como el creador concibió.
- **Contexto de Uso Operativo**: Videos para redes sociales móviles (Instagram, TikTok, LinkedIn) donde más del 80% de los usuarios consume contenido con el audio apagado.
- **Ejemplo Práctico de Producción**: Incrustar subtítulos con tipografía moderna en negrita amarilla con fondo negro semitransparente quemados en el video vertical para captar la atención sin sonido.
- **Especificación Visual / Diagrama**: Texto en tipografía sans-serif con contorno negro nítido situado en el tercio inferior del fotograma perfectamente visible sobre fondos claros y oscuros.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'burned-in open captions, bold kinetic text overlay, permanent subtitles on video, mobile friendly caption styling'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_diferencia_de*: `subtitulos-vs-closed-captions`
  - *se_aplica_en*: `video-vertical`, `reel-short`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#subtitulos-quemados) | *Relacionados originales*: Transcripción automática, Safe zones

#### 141. [Subtítulos vs Closed Captions (Subtítulos de Idioma vs Accesibilidad)](#subtitulos-vs-closed-captions)
- **Identificador Único (Slug)**: `subtitulos-vs-closed-captions`
- **Título Original en Fuente**: `SUBTÍTULOS vs CLOSED CAPTIONS`
- **Fases del Proceso**: Distribución
- **Sinónimos y Alias**: Subtítulos vs CC, Subtítulos de Traducción vs Subtítulos para Sordos, Subtitles vs Closed Captions
- **Definición Técnica Original**: Distinción funcional crítica entre dos modalidades de texto sincronizado: 1) Subtítulos (Subtitles): concebidos para espectadores que escuchan pero no dominan el idioma original, transcribiendo exclusivamente los diálogos hablados; frente a 2) Closed Captions (CC): diseñados para personas con discapacidad auditiva o entornos en silencio, transcribiendo no solo los diálogos sino también identificando al orador, describiendo efectos sonoros cruciales ([trueno lejano], [música melancólica]) y modulaciones tonales.
- **Contexto de Uso Operativo**: Cumplimiento de leyes de accesibilidad universal en televisión broadcast y plataformas de streaming.
- **Ejemplo Práctico de Producción**: El archivo CC indica en pantalla '[música de suspenso in crescendo]' y '[jadeo ahogado de María]' para transmitir el clima dramático a personas sordas.
- **Especificación Visual / Diagrama**: Texto blanco sobre recuadro negro opaco con el icono internacional '[CC]' en la esquina del reproductor.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'closed captions for hearing impaired, accessible sound descriptions in brackets, CC subtitle overlay'.`
- **Relaciones Semánticas Inferidas**: 
  - *engloba*: `srt`
  - *promueve_la*: `accesibilidad`
  - *se_diferencia_de*: `subtitulos-quemados`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#subtitulos-vs-closed-captions) | *Relacionados originales*: Subtítulos quemados, Transcripción automática

#### 146. [Tasa de Retención (Retention Rate / Audiencia Sostenida)](#tasa-de-retencion)
- **Identificador Único (Slug)**: `tasa-de-retencion`
- **Título Original en Fuente**: `Tasa De Retención`
- **Fases del Proceso**: Distribución
- **Sinónimos y Alias**: Curva de Retención de Audiencia, Audience Retention Graph, Porcentaje Medio de Reproducción
- **Definición Técnica Original**: Métrica analítica cuantitativa que mide el porcentaje promedio de un video que los espectadores miran antes de abandonar la reproducción, visualizada como una curva temporal continua. Permite diagnosticar con exactitud qué momentos causaron aburrimiento (caídas abruptas en la curva) o qué segmentos resultaron fascinantes (mesetas o picos de repetición).
- **Contexto de Uso Operativo**: Optimización del montaje editorial en canales de YouTube y evaluación del rendimiento de campañas publicitarias en redes.
- **Ejemplo Práctico de Producción**: Un video con un 65% de retención en el minuto 10 que el algoritmo de YouTube recomienda masivamente al identificar un enganche excepcional de la audiencia.
- **Especificación Visual / Diagrama**: Gráfico de línea descendente suave en YouTube Studio que compara la retención del video frente al rendimiento típico de videos similares.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'audience retention graph analysis, high retention pacing, YouTube studio analytics retention curve'.`
- **Relaciones Semánticas Inferidas**: 
  - *depende_de*: `hook`, `montaje`
  - *evalua_el*: `reel-short`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#tasa-de-retencion) | *Relacionados originales*: Hook, Reel/Short, Edición asistida por IA

#### 147. [Teleprompter (Apuntador Óptico Electrónico)](#teleprompter)
- **Identificador Único (Slug)**: `teleprompter`
- **Título Original en Fuente**: `Teleprompter`
- **Fases del Proceso**: Distribución
- **Sinónimos y Alias**: Prompter, Autocue, Apuntador de Cámara
- **Definición Técnica Original**: Dispositivo óptico compuesto por una pantalla plana horizontal y un espejo divisor de haz (beam splitter) inclinado a 45 grados colocado directamente frente al objetivo de la cámara. Refleja el texto del guion en scroll hacia los ojos del orador mientras permite que la lente de la cámara grabe a través del cristal sin registrar las letras, logrando que el presentador lea su discurso mirando fijamente a los ojos del espectador.
- **Contexto de Uso Operativo**: Noticieros de televisión, discursos presidenciales, cursos online masivos y grabaciones de oradores corporativos.
- **Ejemplo Práctico de Producción**: El director ejecutivo lee fluidamente un discurso complejo de 10 minutos sin titubear ni desviar la mirada del centro exacto del lente de cámara.
- **Especificación Visual / Diagrama**: Cristal semirreflectante transparente montado en el parasol de la cámara con letras blancas desplazándose suavemente sobre el cristal.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'teleprompter camera rig, news anchor reading glass prompter, beam splitter glass setup'.`
- **Relaciones Semánticas Inferidas**: 
  - *asiste_a*: `a-roll`
  - *opera_en*: `rodaje`, `broadcasting`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#teleprompter) | *Relacionados originales*: Voice-over, Call sheet, ADR

#### 156. [UGC (User-Generated Content / Contenido Generado por el Usuario)](#ugc)
- **Identificador Único (Slug)**: `ugc`
- **Título Original en Fuente**: `UGC (User-Generated Content)`
- **Fases del Proceso**: Distribución
- **Sinónimos y Alias**: Contenido Creado por Usuarios, UGC Video, Formato Testimonial Orgánico
- **Definición Técnica Original**: Estilo y formato audiovisual caracterizado por una estética deliberadamente espontánea, casera y sin pulido técnico excesivo (grabado con teléfonos inteligentes, luz ambiental natural, audio directo y encuadre vertical en primera persona), creado por clientes o creadores de contenido para transmitir autenticidad, confianza y cercanía en campañas de marketing digital.
- **Contexto de Uso Operativo**: Comerciales en TikTok y Meta Ads con alta tasa de conversión publicitaria y marketing de influencers.
- **Ejemplo Práctico de Producción**: Una clienta grabándose en el espejo de su baño con el móvil mientras prueba una crema facial y comparte sus impresiones sinceras.
- **Especificación Visual / Diagrama**: Plano grabado con cámara frontal de smartphone en mano con leve temblor orgánico, luz doméstica de ventana y subtítulos llamativos al centro.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'authentic UGC video style, smartphone selfie camera review, natural organic handheld framing, real customer testimonial'.`
- **Relaciones Semánticas Inferidas**: 
  - *se_opone_a*: `cinematografia-tradicional`
  - *se_distribuye_en*: `reel-short`, `video-vertical`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#ugc) | *Relacionados originales*: Reel/Short, Hook, Avatar digital

#### 166. [Video Podcast (Vodcast / Podcast Audiovisual)](#video-podcast)
- **Identificador Único (Slug)**: `video-podcast`
- **Título Original en Fuente**: `Video Podcast`
- **Fases del Proceso**: Distribución
- **Sinónimos y Alias**: Vodcast, Podcast con Video, Videocast
- **Definición Técnica Original**: Formato audiovisual híbrido que combina la intimidad conversacional y la profundidad temática del podcasting tradicional de audio con la grabación multicámara en vivo en un estudio decorado, habitualmente con planos y contraplanos automáticos o conmutados por switcher y micrófonos de estudio prominentes en cuadro.
- **Contexto de Uso Operativo**: Contenido de larga duración para YouTube y Spotify, debates corporativos de liderazgo y entrevistas especializadas.
- **Ejemplo Práctico de Producción**: Tres cámaras 4K y micrófonos Shure SM7B grabando una conversación de dos horas entre dos expertos en tecnología en un estudio con luces de neón decorativas.
- **Especificación Visual / Diagrama**: Mesa redonda de estudio con micrófonos de brazo articulado, auriculares en los participantes y fondo con iluminación cálida estilizada.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'studio video podcast setup, multi-camera talk show framing, Shure SM7B on boom arm, moody studio neon lighting'.`
- **Relaciones Semánticas Inferidas**: 
  - *combina*: `audio-directo`, `coverage`
  - *se_distribuye_en*: `streaming`, `reel-short`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#video-podcast) | *Relacionados originales*: Transcripción automática, Reel/Short

#### 167. [Video Vertical (Formato 9:16 para Smartphones)](#video-vertical)
- **Identificador Único (Slug)**: `video-vertical`
- **Título Original en Fuente**: `Video Vertical (9:16)`
- **Fases del Proceso**: Distribución
- **Sinónimos y Alias**: Formato 9:16, Vertical Video, Mobile-First Video
- **Definición Técnica Original**: Estándar de composición y aspecto audiovisual concebido específicamente para la orientación natural de los teléfonos inteligentes (relación de aspecto 9:16 o 1080x1920 píxeles). Exige una reformulación de la gramática visual clásica: los encuadres privilegian planos medios y primeros planos verticales, manteniendo la acción y los textos confinados en la zona segura central para no ser solapados por la interfaz de las aplicaciones móviles.
- **Contexto de Uso Operativo**: Formato hegemónico para TikTok, Instagram Reels, YouTube Shorts y publicidad móvil.
- **Ejemplo Práctico de Producción**: Diseñar el encuadre de una modelo caminando por la pasarela de moda para que llene de pies a cabeza la pantalla vertical del teléfono de 9:16.
- **Especificación Visual / Diagrama**: Infografía en fuente: `glosario-video-vertical-1.webp` (1200x852) - "Diagrama de video vertical: encuadre 9:16 pensado para consumo movil". Marco rectangular esbelto orientado verticalmente con el sujeto ocupando la franja vertical central y márgenes superior e inferior despejados.
- **Guía de Prompts para Modelos LLM**: `Palabras clave: 'vertical video 9:16 composition, full screen smartphone framing, mobile first portrait cinematography'.`
- **Relaciones Semánticas Inferidas**: 
  - *es_un_tipo_de*: `relacion-de-aspecto`
  - *es_la_base_de*: `reel-short`, `ugc`
  - *respeta*: `safe-zones`
- **Trazabilidad de la Fuente**: [Mouse Interactivo - Terminología de producción de video profesional](https://mouseinteractivo.com/terminologia-produccion-video/#video-vertical) | *Relacionados originales*: Relación de aspecto, Safe zones, Reel/Short

## 5. Recomendaciones Estratégicas para el Pipeline de Desarrollo

Para los agentes de modelado ontológico, marcado HTML/JSON-LD, interfaz de usuario y persistencia, se establecen las siguientes pautas directrices derivadas de este minado:

1. **Preservación de Slugs Canónicos**: Los 177 slugs documentados en este reporte (`#a-roll`, `#aces`, etc.) deben actuar como claves primarias invariantes tanto en el marcado DOM (`id="..."`) como en el grafo semántico y en el esquema JSON-LD (`@id`), garantizando que ningún enlace interno se rompa.
2. **Manejo de Sinónimos Bilingües y Duplicados**: Para las entradas #18/#132 (Cámara Lenta / Slow Motion) y #51/#145 (FPS / Tasa de Fotogramas), el modelo de datos debe consolidar la ontología canónica unificada mientras expone ambos slugs como puntos de entrada navegables (redirección interna o renderizado coordinado con etiqueta `sameAs`).
3. **Estructura JSON-LD `DefinedTermSet`**: Se recomienda embeber un único bloque `DefinedTermSet` en la cabecera HTML que contenga el catálogo completo de `DefinedTerm` con propiedades `name`, `alternateName`, `description`, `inDefinedTermSet` y `disambiguatingDescription`.
4. **Caché Local Offline de Infografías**: Las 18 infografías de alta resolución documentadas deben integrarse de forma estática y local en el proyecto para garantizar el cumplimiento estricto del criterio de aceptación de *Cero Llamadas Externas a la Red en Tiempo de Ejecución*.
5. **Módulo de Orientación de Prompts para LLM**: Utilizar los atributos `llm_prompt_guidance` y las relaciones entre productos audiovisuales (comercial, reel, documental, corporativo) para construir la herramienta interactiva de asesoramiento de intenciones solicitada en R6.

