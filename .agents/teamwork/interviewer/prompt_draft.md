Construir e integrar en producción el primer glosario semántico de DOCWEB MULTIGLOSSARY especializado en producción audiovisual y terminología de video dentro del sistema existente en D:\DocWebGlosary, estructurado semánticamente, conectado, navegable, persistente y extensible como arquitectura compartida para futuros glosarios.

Working directory: D:\DocWebGlosary
Integrity mode: development
The team must NOT: desplegar o publicar el sitio en entornos externos, contratar servicios o infraestructura de pago, realizar operaciones destructivas sobre información preexistente sin justificación y autorización específica, generar llamadas o dependencias a URLs externas durante la ejecución de la aplicación, ni utilizar imágenes protegidas por derechos de autor sin autorización.

Fuentes de referencia:
- Fuente principal: https://mouseinteractivo.com/terminologia-produccion-video/ (177 términos declarados)
- Fuentes técnicas complementarias de producción audiovisual e ingeniería de prompts para modelos LLM (documentando trazabilidad)

## Requirements

### R1. Inspección no invasiva y preservación de la aplicación existente
Inspeccionar D:\DocWebGlosary para determinar la estructura de archivos, el HTML correspondiente a la aplicación, componentes, arquitectura, estilos, scripts, almacenamiento y convenciones de navegación sin reconstruir ni alterar el funcionamiento preexistente; si existen varios candidatos HTML, identificar alternativas sin sobrescribir ninguno. Preservar la identidad visual, componentes, estilos y cualquier funcionalidad ajena a esta misión.

### R2. Extracción, verificación y enriquecimiento editorial de terminología
Inspeccionar el contenido íntegro de la publicación principal en https://mouseinteractivo.com/terminologia-produccion-video/, verificar cuántos términos existen realmente frente a los 177 declarados y documentar discrepancias. Extraer denominaciones, definiciones, categorías, sinónimos, contextos de uso, aplicaciones, ejemplos, clasificaciones, relaciones e ilustraciones/diagramas con descripciones. Redactar definiciones propias, rigurosas y originales conservando nombres técnicos sin reproducción masiva del original, registrando la procedencia en metadatos locales no navegables y diferenciando claramente contenido derivado, complementaciones verificadas, relaciones inferidas e información pendiente de validación.

### R3. Expansión estratégica para generación audiovisual y orientación para LLM
Ampliar el catálogo terminológico mediante investigación técnica complementaria para su uso en la formulación de encargos a modelos LLM. Incorporar terminologías y palabras clave para la construcción de cualquier producto audiovisual generado por IA, detallando requerimientos, criterios, relaciones, condiciones, condicionantes, variables, tecnologías y estrategias aplicables.

### R4. Modelado semántico, entidades independientes y relaciones tipadas bidireccionales
Convertir cada término en una entidad semántica independiente con identificador único estable, denominación, definición y atributos pertinentes. Desarrollar descomposiciones conceptuales justificadas (conceptos principales, subconceptos, componentes, propiedades, funciones, aplicaciones, procesos, técnicas, herramientas, requisitos, dependencias, entradas, salidas, artefactos resultantes, conceptos complementarios, alternativas y opuestos). Implementar un modelo de relaciones tipadas (es un tipo de, es parte de, se compone de, contiene, se especializa en, es más general que, depende de, requiere, precede a, sucede a, produce, se utiliza para, es compatible con, es una alternativa a, se diferencia de, se relaciona con, tiene como entrada, tiene como resultado) con enlaces internos canónicos que apunten a identificadores existentes y permitan navegación inversa.

### R5. Integración HTML semántico y datos estructurados JSON-LD
Incorporar el glosario directamente en el HTML de la aplicación utilizando HTML semántico (section, article, dfn, dl, dt, dd, identificadores únicos, hipervínculos internos, atributos data-* y microdata cuando corresponda) y JSON-LD estructurado bajo los esquemas DefinedTermSet y DefinedTerm. Garantizar correspondencia unívoca entre los datos visibles, las entidades almacenadas y el marcado estructurado.

### R6. Experiencia de exploración, búsqueda y orientador de intenciones audiovisuales
Implementar búsqueda de términos, navegación alfabética, filtros por categorías, definiciones expandibles, subconceptos recursivos, relaciones cruzadas, referencias inversas y diagramas contextuales. Desarrollar navegación por productos audiovisuales (tráiler, teaser, reel, video corporativo, video explicativo, storyboard, animatic, plano, toma, secuencia, montaje, formatos de exportación, etc.) y sus atributos determinantes (duración, formato, resolución, relación de aspecto, audiencia, finalidad, plataforma, estilo, sonido, subtítulos, ritmo, narrativa) para guiar la conversión de ideas informales en especificaciones técnicas precisas para modelos de IA.

### R7. Persistencia verificable y arquitectura desacoplada multiglosario
Asegurar que las ampliaciones, subconceptos, definiciones, relaciones y atributos incorporados se guarden en el mecanismo de persistencia del sistema, garantizando conservación, recuperación y respaldo ante recargas o reinicios, sin generar contenido automáticamente desde la red en tiempo de ejecución. Estructurar la interfaz, búsqueda, navegación, persistencia y motor de relaciones como capacidades modulares compartidas que permitan incorporar futuros dominios (imagen, publicidad/marketing, ontologías, IA, software) sin duplicar la aplicación ni perder la identidad de cada colección.

## Verification Resources
Inspeccionar D:\DocWebGlosary para determinar si existen suites de prueba, scripts de validación o herramientas de linting previas. Si no existen herramientas automatizadas en el repositorio, implementar scripts independientes de prueba y validación técnica (por ejemplo, validación de sintaxis HTML/JSON-LD, integridad de identificadores y enlaces internos, comprobación de persistencia local y verificación de ausencia de peticiones de red externas en tiempo de ejecución).

## Acceptance Criteria

### Inspección e Integridad
- [ ] La estructura de directorios y el archivo HTML destino de la aplicación en D:\DocWebGlosary están identificados, documentados y preservados sin sobrescrituras destructivas ni regresiones funcionales.
- [ ] La aplicación opera completamente sin conexión y no realiza llamadas a URLs o servicios externos durante la carga o ejecución interactiva.

### Cobertura Terminológica y Calidad Editorial
- [ ] Todos los términos de la publicación principal son inspeccionados, contabilizados y contrastados con los 177 declarados, documentando cualquier discrepancia en un informe técnico.
- [ ] Las definiciones incorporadas son redacciones originales y rigurosas, con metadatos locales no navegables que acreditan trazabilidad, diferenciando contenido de la fuente, complementaciones y relaciones inferidas.
- [ ] El catálogo incluye términos expandidos de requerimientos, variables, tecnologías y condiciones para la formulación de productos audiovisuales con modelos LLM.

### Modelado Semántico y Marcado Estructurado
- [ ] Cada término cuenta con un identificador único y estable en el DOM y en las entidades de datos.
- [ ] El marcado HTML utiliza elementos semánticos (section, article, dfn, dl, dt, dd) y el bloque JSON-LD implementa DefinedTermSet y DefinedTerm sin errores de sintaxis ni vocabularios no reconocidos.
- [ ] Todas las relaciones semánticas son bidireccionales, navegan internamente y resuelven a identificadores locales existentes sin enlaces rotos.

### Experiencia de Usuario y Orientación Técnica
- [ ] Búsqueda en tiempo real, navegación alfabética A-Z y filtrado por categorías plenamente operativos e interactivos.
- [ ] Despliegue funcional de definiciones expandibles, subconceptos recursivos y diagramas conceptuales contextuales.
- [ ] Módulo orientador de productos audiovisuales operativo, relacionando productos con atributos técnicos pertinentes (resolución, aspect ratio, duración, plataforma, etc.) para estructurar prompts hacia modelos LLM.

### Persistencia y Extensibilidad Multiglosario
- [ ] Toda adición o modificación de conocimiento se almacena en el mecanismo de persistencia local del sistema, manteniéndose tras recargas de página y permitiendo recuperación verificada.
- [ ] Los módulos de navegación, persistencia, relaciones y búsqueda están desacoplados del glosario específico, listos para albergar futuros glosarios especializados sin duplicar la aplicación.
