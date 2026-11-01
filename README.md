# DOCWEB MULTIGLOSSARY — Base de Conocimiento Local y Semántica

Sistema multiglosario semántico, local, persistente y extensible desarrollado bajo el **Contrato del Sistema DOCWEB MULTIGLOSSARY**.

---

## 1. Características Principales

- **100% Autónomo y Local:** No requiere conexión a Internet, ni dependencias de CDNs, APIs de terceros o scripts remotos.
- **Catálogo Central Transversal:** Permite consultar y relacionar múltiples glosarios técnicos compartiendo una interfaz y modelo común sin duplicación.
- **Modelo Semántico Tipado:** Entidades con identificador permanente (`urn:term:<glossary>:<slug>`), relaciones explícitas directas e inversas calculadas de forma determinista (`isTypeOf`, `dependsOn`, `requires`, `produces`, `usedFor`, etc.).
- **Persistencia Local Híbrida:** 
  - Datos canónicos versionados en archivos JSON locales.
  - Almacenamiento duradero de modificaciones y ampliaciones del usuario en `IndexedDB` con log de revisiones y cálculo de hash de integridad SHA-256.
  - Exportación e importación de cápsulas de conocimiento completas (`.json`).
- **Diagramas Contextuales Autónomos:** Generación dinámica de grafos y relaciones semánticas en SVG nativo sin dependencias de librerías externas.
- **Datos Estructurados:** Compatibilidad con Schema.org (`DefinedTerm` y `DefinedTermSet`) inyectados dinámicamente en el DOM como JSON-LD.

---

## 2. Glosarios Iniciales Incluidos

1. **Render & Animación 3D (`Render-3D-Animations`):**
   - Trazado de Rayos (Ray Tracing), Rasterización, Pipeline Gráfico, BVH, BRDF, PBR, Shaders, Animación Esquelética, Keyframes, Oclusión Ambiental.
2. **Video, Imagen & Gráficos Digitales (`VideoImage`):**
   - Píxel, Framebuffer, Gama de Color, Espacio de Color, HDR, Códec de Video, Submuestreo de Croma, Tasa de Fotogramas, Filtro Bayer, Convolución Espacial.

Ambos glosarios cuentan con **relaciones cruzadas inter-glosario** activas y verificadas.

---

## 3. Estructura de Directorios

```
DocWebGlosary/
├── index.html                     # Punto de entrada local
├── audit_autonomy.js              # Script de auditoría de autonomía
├── app/
│   ├── css/
│   │   └── app.css                # Sistema de diseño y variables CSS
│   ├── js/
│   │   ├── storage.js             # Motor de persistencia IndexedDB y exportador
│   │   ├── semantic-engine.js     # Motor ontológico y diagramador SVG
│   │   └── app.js                 # Controlador UI y enrutador
│   └── data/
│       └── catalog.json           # Catálogo central de glosarios
├── Render-3D-Animations/
│   └── data/
│       ├── glossary.json          # Metadatos del glosario
│       └── terms.json             # Términos canónicos
└── VideoImage/
    └── data/
        ├── glossary.json          # Metadatos del glosario
        └── terms.json             # Términos canónicos
```

---

## 4. Instrucciones de Uso

1. Abra directamente `index.html` en cualquier navegador web moderno (o mediante un servidor local estático como `npx serve` o la extensión Live Server si el navegador restringe llamadas `fetch` relativas bajo el protocolo `file://`).
2. Utilice el selector superior para alternar entre glosarios individuales o ver el catálogo transversal completo.
3. Explore términos mediante la barra de búsqueda o filtrando por categorías.
4. Haga clic en los nodos de los diagramas contextuales SVG para navegar inmediatamente entre conceptos relacionados y glosarios vinculados.
5. Emplee el botón **"Ampliar Conocimiento"** o **"Nuevo Término"** para registrar nuevas entidades que quedarán persistidas de inmediato.
6. Genere respaldos o comparta el conocimiento a través del botón **"Exportar Cápsula"**.
