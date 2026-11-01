const fs = require('fs');
const path = require('path');

const catalog = JSON.parse(fs.readFileSync(path.join(__dirname, 'catalog_177_enriched.json'), 'utf8'));
const audit = JSON.parse(fs.readFileSync(path.join(__dirname, 'audit_summary.json'), 'utf8'));

console.log('Generating comprehensive report.md...');

// Category order list
const categoryOrder = [
  'Preproducción & Planificación',
  'Dirección, Rodaje & Gestión de Set',
  'Cámara, Encuadre & Movimiento',
  'Óptica, Enfoque & Composición',
  'Iluminación, Exposición & Fotometría',
  'Audio Directo & Microfonía',
  'Postproducción de Sonido & Acústica',
  'Montaje & Edición de Video',
  'Colorimetría, Espacios de Color & Monitoreo',
  'Efectos Visuales (VFX), Animación & Motion Graphics',
  'Tecnología de Video, Señal & Códecs',
  'Inteligencia Artificial Audiovisual & Producción Virtual',
  'Entrega, Formatos Digitales & Distribución'
];

let md = '';

// Title & Meta
md += `# Informe Técnico de Minado de Especificaciones: Terminología de Producción Audiovisual y Video\n\n`;
md += `**Agente**: \`spec_miner_terms\` (Terminology Spec Miner)  \n`;
md += `**Fuente Primaria Autorizada**: [Mouse Interactivo - Terminología de producción de video: glosario profesional A–Z](https://mouseinteractivo.com/terminologia-produccion-video/)  \n`;
md += `**Fecha de Extracción y Auditoría**: 2026-11-01  \n`;
md += `**Directorio de Trabajo**: \`D:\\DocWebGlosary\\.agents\\teamwork\\spec_miner_terms\\\`  \n`;
md += `**Destino del Reporte**: \`D:\\DocWebGlosary\\.agents\\teamwork\\spec_miner_terms\\report.md\`  \n\n`;
md += `---\n\n`;

// Executive Summary
md += `## 1. Resumen Ejecutivo y Trazabilidad del Minado\n\n`;
md += `El presente informe documenta la inspección exhaustiva, extracción no invasiva, verificación cuantitativa y enriquecimiento conceptual del glosario profesional de producción audiovisual publicado por **Mouse Interactivo**.\n\n`;
md += `La investigación contrastó de manera rigurosa la totalidad de los contenidos de la fuente frente a los **177 términos declarados** en el encabezado de la publicación original, analizando su estructuración léxica, integridad de hipervínculos, duplicidades semánticas, activos visuales (infografías y diagramas técnicos) y su aplicabilidad directa para la formulación de requerimientos técnicos e ingeniería de prompts hacia modelos de inteligencia artificial multimodal (Runway Gen-3, Sora, Kling, Midjourney, ElevenLabs).\n\n`;

// Accounting and Discrepancies
md += `## 2. Contabilización Rigurosa y Análisis de Discrepancias\n\n`;
md += `### 2.1 Balance Cuantitativo de Términos\n`;
md += `- **Términos declarados en la publicación**: **177 términos**.\n`;
md += `- **Entradas físicas de términos extraídas (\`### Heading\` con ancla)**: **177 términos exactos** (100% de correspondencia numérica ordinal).\n`;
md += `- **Entidades conceptuales únicas efectivas**: **175 conceptos únicos**.\n\n`;

md += `### 2.2 Duplicidades Conceptuales y Discrepancias Identificadas\n`;
md += `A pesar de que existen físicamente 177 encabezados numerados del 1 al 177, el análisis de contenido detectó **dos casos de duplicación conceptual explícita con inversión bilingüe español/inglés**, lo que reduce el número de conceptos netos a 175:\n\n`;

md += `1. **Duplicado 1: Cámara Lenta / Slow Motion**\n`;
md += `   - **Entrada #18**: \`### Cámara Lenta (Slow Motion)\` (Slug: \`#camara-lenta\`).\n`;
md += `     - *Definición fuente*: Efecto de reproducir a menor velocidad grabando a tasa de cuadros más alta (120 o 240 fps); señala la necesidad de mayor luz y advierte contra la ralentización por software en edición.\n`;
md += `     - *Relacionados*: FPS / Frame Rate, Timelapse, Bitrate.\n`;
md += `   - **Entrada #132**: \`### SLOW MOTION (Cámara lenta)\` (Slug: \`#slow-motion\`).\n`;
md += `     - *Definición fuente*: Efecto de reproducir más lento grabando a frame rate alto (60, 120, 240 fps) y reproduciendo a 24/25 fps; reitera la alta velocidad de obturación y la luz requerida.\n`;
md += `     - *Relacionados*: Tasa de fotogramas, Velocidad de obturación, Hyperlapse.\n`;
md += `   - *Veredicto Técnico*: Duplicación redundante en la fuente donde el mismo principio físico y técnico fue redactado dos veces para cubrir tanto la búsqueda por la letra C (español) como por la letra S (inglés).\n\n`;

md += `2. **Duplicado 2: FPS / Tasa de Fotogramas**\n`;
md += `   - **Entrada #51**: \`### FPS / Frame Rate\` (Slug: \`#fps-frame-rate\`).\n`;
md += `     - *Definición fuente*: Tasa de cuadros por segundo para crear movimiento; detalla estándares de 24 fps (cine), 25/30 fps (TV/web) y 50/60 fps (fluidez/cámara lenta).\n`;
md += `     - *Relacionados*: Cámara Lenta, Bitrate, Broadcasting.\n`;
md += `   - **Entrada #145**: \`### TASA DE FOTOGRAMAS (Frame rate)\` (Slug: \`#tasa-de-fotogramas\`).\n`;
md += `     - *Definición fuente*: Número de imágenes por segundo en fps; repite estándares de 24 fps (cine), 25 fps (PAL Colombia/Europa), 30 fps (digital) y 50/60 fps (cámara lenta 2.5x).\n`;
md += `     - *Relacionados*: Slow motion, Velocidad de obturación, Timelapse.\n`;
md += `   - *Veredicto Técnico*: Duplicación conceptual idéntica indexada en la letra F por acrónimo inglés y en la letra T por traducción al castellano.\n\n`;

md += `### 2.3 Inconsistencias Tipográficas y de Formato en Títulos\n`;
md += `Se identificó una marcada irregularidad en las convenciones de titulación de la publicación original:\n`;
md += `- **32 títulos con palabras clave en MAYÚSCULAS sostenidas** y traducción/alias entre paréntesis (ejemplos: \`AUDIO INMERSIVO (Dolby Atmos)\`, \`BACKLIGHT (Contraluz)\`, \`BITRATE (Tasa de bits)\`, \`BOOM (Micrófono de caña)\`, \`CALL SHEET (Orden del día)\`, \`COVERAGE (Cobertura)\`, \`CUTAWAY (Plano de recurso)\`, \`DELIVERABLE (Entregable)\`, \`DIAFRAGMA (Apertura)\`, \`DOBLAJE (Dubbing)\`, \`HOOK (Gancho)\`, \`LAVALIER (Micrófono de solapa)\`, \`MASTER (Archivo maestro)\`, \`MEZCLA DE SONIDO (Sound Mix)\`, \`MIXER (Mesa de mezclas)\`, \`PHANTOM POWER (Alimentación fantasma)\`, \`PLANO GENERAL (Wide shot)\`, \`RELACIÓN DE ASPECTO (Aspect Ratio)\`, \`RODAJE (Shooting)\`, \`ROOM TONE (Tono de sala)\`, \`ROUGH CUT (Corte preliminar)\`, \`SATURACIÓN (Saturation)\`, \`SCOUTING (Exploración de locaciones)\`, \`SHOT LIST (Lista de planos)\`, \`SLOW MOTION (Cámara lenta)\`, \`SUBTÍTULOS QUEMADOS (Burned-in)\`, \`SUBTÍTULOS vs CLOSED CAPTIONS\`, \`SWITCHER DE VIDEO (Mezclador)\`, \`TASA DE FOTOGRAMAS (Frame rate)\`, \`VIDEO GENERATIVO (Text-to-Video)\`, \`VOLUMEN LED (LED Volume)\`, \`WHITE BALANCE (Balance de blancos)\`).\n`;
md += `- **145 títulos en Formato Título / Mixto** (\`Ángulo De Cámara\`, \`Animación 2D/3D\`, \`Asistente De Dirección (AD)\`, \`Clapperboard (Claqueta)\`, \`Cámara Lenta (Slow Motion)\`).\n`;
md += `- *Normalización adoptada*: Para la arquitectura del glosario semántico se preserva el registro del título original de la fuente en metadatos no navegables, pero se normaliza la denominación técnica principal a formato estándar de ingeniería audiovisual.\n\n`;

md += `### 2.4 Distribución Alfabética y Letras Ausentes\n`;
md += `El índice alfabético A–Z de la fuente presenta la siguiente distribución:\n`;
md += `\`\`\`json\n${JSON.stringify(audit.alphabetDist, null, 2)}\n\`\`\`\n`;
md += `- **Letras no representadas (ausentes)**: **Q** e **Y** no contienen ningún término en la fuente (por ejemplo, términos clásicos como *QuickTime*, *Quad split*, *YCbCr* o *Yaw* no fueron incluidos).\n\n`;

md += `### 2.5 Auditoría de Hipervínculos Cruzados Internos\n`;
md += `- **Total de hipervínculos cruzados en la sección 'Relacionados'**: **409 enlaces**.\n`;
md += `- **Enlaces rotos identificados**: **0 enlaces rotos** (100% de los 409 enlaces resuelven unívocamente a un slug de ancla existente dentro de los 177 términos).\n\n`;

md += `### 2.6 Catálogo de Diagramas Técnicos e Infografías\n`;
md += `La inspección del código fuente HTML reveló que la publicación cuenta con **18 infografías técnicas propietarias de alta resolución** (formatos WebP de 1200 píxeles de base) reutilizadas estratégicamente en **39 términos**:\n\n`;

md += `| # | Nombre de Archivo Infográfico | Dimensiones | Términos Donde Aparece en la Fuente | Descripción del Diagrama |
|---|-------------------------------|-------------|------------------------------------|--------------------------|
| 1 | \`glosario-angulo-de-camara-1.webp\` | 1200x782 | Ángulo De Cámara | Ángulos de cámara en video: picado, normal y contrapicado vistos de perfil |
| 2 | \`glosario-cadena-de-audio.webp\` | 1200x1152 | Audio Directo, BOOM, LAVALIER, MEZCLA DE SONIDO, MIXER | Cadena de audio completa: micrófono, preamplificador, grabadora, mezcla y master |
| 3 | \`glosario-b-roll-1.webp\` | 1200x526 | B-Roll | Relación entre A-Roll y B-Roll en la línea de tiempo de montaje |
| 4 | \`glosario-iluminacion-de-tres-puntos-1.webp\` | 1200x1120 | BACKLIGHT, Iluminación De Tres Puntos, Key Light | Esquema cenital de iluminación de tres puntos: principal, relleno y contraluz |
| 5 | \`glosario-codec-1.webp\` | 1200x602 | Códec | Diagrama de códec y contenedor: compresión de datos y empaquetado |
| 6 | \`glosario-composicion.webp\` | 1200x908 | Composición, Headroom, Regla De Los Tercios | Composición de encuadre: regla de tercios, aire superior y aire de mirada |
| 7 | \`glosario-deliverable-1.webp\` | 1200x530 | DELIVERABLE | Desglose de entregables finales de un proyecto audiovisual |
| 8 | \`glosario-exposicion.webp\` | 1200x1474 | DIAFRAGMA, F-stop, ISO, Profundidad De Campo, Velocidad De Obturación | Triángulo de exposición: relación entre apertura, obturación e ISO |
| 9 | \`glosario-movimientos-de-camara.webp\` | 1200x1900 | Dolly Shot, Tilt, Tracking Shot, Zoom In / Zoom Out | Familias de movimiento: paneo/tilt, travelling/grúa y zoom óptico |
| 10 | \`glosario-escala-de-planos-1.webp\` | 1200x2220 | Escala De Planos, Plano Americano, PLANO GENERAL, Primer Plano | Escala canónica de encuadres sobre la figura humana |
| 11 | \`glosario-etalonaje-color-grading-1.webp\` | 1200x526 | Etalonaje / Color Grading | Flujo de corrección primaria y estilización secundaria de color |
| 12 | \`glosario-postproduccion.webp\` | 1200x550 | Ingesta, Montaje, Postproducción | Flujo de postproducción: ingesta, montaje, corte, color, sonido y master |
| 13 | \`glosario-lufs-loudness-1.webp\` | 1200x842 | LUFS / Loudness | Niveles de sonoridad integrada normalizados por plataforma |
| 14 | \`glosario-produccion-de-video-1.webp\` | 1200x636 | Preproducción, Producción De Video | Las tres fases de producción audiovisual y sus actividades clave |
| 15 | \`glosario-eje-de-accion.webp\` | 1188x1186 | Raccord | Ley de los 180 grados, línea imaginaria del eje de acción y salto de eje |
| 16 | \`glosario-relacion-de-aspecto-1.webp\` | 1200x1946 | RELACIÓN DE ASPECTO | Comparativa gráfica de relaciones de aspecto (1:1, 4:5, 9:16, 16:9, 2.39:1) |
| 17 | \`glosario-video-generativo-1.webp\` | 1200x654 | VIDEO GENERATIVO | Pipeline de síntesis de video mediante inteligencia artificial |
| 18 | \`glosario-video-vertical-1.webp\` | 1200x852 | Video Vertical (9:16) | Encuadre móvil 9:16 y zonas seguras para interfaces de redes sociales |\n\n`;

// Required Spec Miner Tables
md += `## 3. Tablas Estándar de Minado de Especificaciones\n\n`;
md += `### Features Discovered\n`;
md += `| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |\n`;
md += `|---|----------|---------|-------------|--------|---------|----------------|----------------|\n`;

categoryOrder.forEach((catName, cIdx) => {
  const catTerms = catalog.filter(t => t.category === catName);
  const sampleTerms = catTerms.slice(0, 3).map(t => t.id).join(', ');
  md += `| ${cIdx + 1} | ${catName} | Colección de ${catTerms.length} términos de ${catName} | Especificaciones técnicas, operativas y semánticas de ${catName.toLowerCase()} (${sampleTerms}...) | Parámetros técnicos de rodaje, edición, audio y metadatos | Entidades semánticas modeladas, definiciones originales y prompt guidance | Términos con doble registro bilingüe o mayúsculas sostenidas identificados y normalizados | Inspección de encabezados H3 y contenido de mouseinteractivo.com |\n`;
});

md += `\n### Edge Cases\n`;
md += `| # | Feature | Input | Observed Behavior |\n`;
md += `|---|---------|-------|-------------------|\n`;
md += `| 1 | Duplicado Bilingüe | Búsqueda de 'camara-lenta' vs 'slow-motion' | Entradas #18 y #132 definen exactamente el mismo concepto con ligeras variaciones de redacción. Solución: vincular como sinónimos bidireccionales canónicos manteniendo ambos slugs como alias navegables. |\n`;
md += `| 2 | Duplicado Conceptual | Búsqueda de 'fps-frame-rate' vs 'tasa-de-fotogramas' | Entradas #51 y #145 repiten los mismos estándares de cuadros por segundo (24, 25, 30, 60 fps). Solución: unificar la entidad semántica subyacente y referenciar ambos puntos de entrada. |\n`;
md += `| 3 | Tipografía Mayúscula | Títulos como 'AUDIO INMERSIVO', 'BITRATE', 'CALL SHEET' | 32 títulos aparecen en versales completas en la fuente. Solución: almacenar el string exacto en metadatos no navegables y normalizar la denominación para accesibilidad y visualización DOM. |\n`;
md += `| 4 | Letras Vacías en A-Z | Navegación por letras 'Q' e 'Y' | La fuente omite por completo términos bajo las letras Q e Y. Solución: la interfaz A-Z debe deshabilitar visualmente o marcar como sin contenido dichas letras para evitar estados vacíos confusos. |\n`;
md += `| 5 | Ausencia de Diagrama | Términos sin infografía propia (138 términos) | La fuente cuenta con 18 infografías para 39 términos; los restantes 138 carecen de imagen. Solución: incorporar especificaciones de visualización textual y monitorización (waveforms, grillas, encuadres) para cada término sin imagen. |\n`;
md += `| 6 | Ambigüedad 4K | Uso indistinto de '4K' para TV y Cine | Término #157 diferencia rigurosamente UHD 4K (3840x2160, 16:9) de DCI 4K (4096x2160, 17:9). Solución: incorporar reglas de desambiguación en el recomendador de prompts LLM. |\n`;
md += `| 7 | Parámetros de Loudness | Entrega de audio para streaming web vs Broadcast | Término #73 (LUFS) establece -14 LUFS para YouTube/Spotify frente a -24 LUFS para TV (EBU R128). Solución: parametrizar los presets de entrega en el orientador de productos. |\n\n`;

// Complete Enriched Catalog
md += `## 4. Catálogo Completo Enriquecido de los 177 Términos\n\n`;
md += `A continuación se detallan exhaustivamente los **177 términos** del glosario profesional, estructurados en sus 13 categorías técnicas. Cada término incluye su denominación, procedencia original, definición técnica rigurosa y original (sin reproducción masiva de derechos de autor), sinónimos, contexto operativo, ejemplo práctico, relaciones semánticas, activos visuales y guía de formulación para modelos de IA.\n\n`;

categoryOrder.forEach(catName => {
  const catTerms = catalog.filter(t => t.category === catName);
  md += `### Categoría: ${catName} (${catTerms.length} Términos)\n\n`;

  catTerms.forEach(t => {
    md += `#### ${t.index}. [${t.denomination}](#${t.id})\n`;
    md += `- **Identificador Único (Slug)**: \`${t.id}\`\n`;
    md += `- **Título Original en Fuente**: \`${t.source_title}\`\n`;
    md += `- **Fases del Proceso**: ${t.phases.join(', ')}\n`;
    md += `- **Sinónimos y Alias**: ${t.synonyms.join(', ')}\n`;
    md += `- **Definición Técnica Original**: ${t.original_definition}\n`;
    md += `- **Contexto de Uso Operativo**: ${t.context_of_use}\n`;
    md += `- **Ejemplo Práctico de Producción**: ${t.illustrative_example}\n`;
    md += `- **Especificación Visual / Diagrama**: ${t.visual_specification.has_source_diagram ? `Infografía en fuente: \`${t.visual_specification.diagram_asset.filename}\` (${t.visual_specification.diagram_asset.dimensions}) - "${t.visual_specification.diagram_asset.alt_text}". ` : ''}${t.visual_specification.visual_description}\n`;
    md += `- **Guía de Prompts para Modelos LLM**: \`${t.llm_prompt_guidance}\`\n`;
    md += `- **Relaciones Semánticas Inferidas**: \n`;
    for (const [rel, targets] of Object.entries(t.relationships.inferred_semantic)) {
      md += `  - *${rel}*: ${Array.isArray(targets) ? targets.map(tgt => `\`${tgt}\``).join(', ') : `\`${targets}\``}\n`;
    }
    md += `- **Trazabilidad de la Fuente**: [${t.source_attribution.source_name}](${t.source_attribution.source_url}) | *Relacionados originales*: ${t.source_attribution.related_in_source.join(', ')}\n\n`;
  });
});

// Strategic Recommendations
md += `## 5. Recomendaciones Estratégicas para el Pipeline de Desarrollo\n\n`;
md += `Para los agentes de modelado ontológico, marcado HTML/JSON-LD, interfaz de usuario y persistencia, se establecen las siguientes pautas directrices derivadas de este minado:\n\n`;
md += `1. **Preservación de Slugs Canónicos**: Los 177 slugs documentados en este reporte (\`#a-roll\`, \`#aces\`, etc.) deben actuar como claves primarias invariantes tanto en el marcado DOM (\`id="..."\`) como en el grafo semántico y en el esquema JSON-LD (\`@id\`), garantizando que ningún enlace interno se rompa.\n`;
md += `2. **Manejo de Sinónimos Bilingües y Duplicados**: Para las entradas #18/\#132 (Cámara Lenta / Slow Motion) y #51/\#145 (FPS / Tasa de Fotogramas), el modelo de datos debe consolidar la ontología canónica unificada mientras expone ambos slugs como puntos de entrada navegables (redirección interna o renderizado coordinado con etiqueta \`sameAs\`).\n`;
md += `3. **Estructura JSON-LD \`DefinedTermSet\`**: Se recomienda embeber un único bloque \`DefinedTermSet\` en la cabecera HTML que contenga el catálogo completo de \`DefinedTerm\` con propiedades \`name\`, \`alternateName\`, \`description\`, \`inDefinedTermSet\` y \`disambiguatingDescription\`.\n`;
md += `4. **Caché Local Offline de Infografías**: Las 18 infografías de alta resolución documentadas deben integrarse de forma estática y local en el proyecto para garantizar el cumplimiento estricto del criterio de aceptación de *Cero Llamadas Externas a la Red en Tiempo de Ejecución*.\n`;
md += `5. **Módulo de Orientación de Prompts para LLM**: Utilizar los atributos \`llm_prompt_guidance\` y las relaciones entre productos audiovisuales (comercial, reel, documental, corporativo) para construir la herramienta interactiva de asesoramiento de intenciones solicitada en R6.\n\n`;

fs.writeFileSync(path.join(__dirname, 'report.md'), md, 'utf8');
console.log('Successfully written report.md. File size:', md.length, 'bytes');
