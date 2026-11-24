# DOCWEB MULTIGLOSSARY — Estación Ontológica y Orientador de Prompts Técnicos

Sistema de gestión ontológica multi-dominio y orientador de prompts técnicos autónomo, persistente y local, diseñado para operar íntegramente en el navegador sin dependencias de servidores externos ni bases de datos en la nube.

---

## 1. Características de Arquitectura & Producto

- **100% Autónomo y Local (Zero-Dependency Runtime):** Opera sin conexión a internet ni llamadas de red, garantizando funcionamiento bajo el protocolo local `file:///` sin bloqueos CORS gracias a su estrategia de compilación estática (`app/data/bundle.js`).
- **Gobernanza Criptográfica de Datos:** Verificación determinista de paridad mediante hash SHA-256 entre los archivos fuente de dominio y el paquete compilado en el cliente, eliminando riesgos de desincronización silenciosa (split-brain).
- **Cobertura Ontológica Convergente (9 Dominios / 317 Términos Canónicos):**
  1. **Producción Audiovisual & Terminología de Video (`AudiovisualProduction`):** 212 conceptos técnicos estructurados en 13 categorías profesionales.
  2. **Ingeniería de Software & Ontología de Sistemas (`SoftwareEngineeringOntology`):** 30 conceptos que modelan la jerarquía ontológica de seis niveles (L1 a L6).
  3. **Arquitectura de Agentes & Sistemas Multiagente (`AgentArchitecture`):** 14 conceptos de agentes software, BDI, sensores/efectores y ontologías multiagente.
  4. **Ingeniería de Prompts (`PromptEngineering`):** 12 conceptos de prompting, contexto, plantillas y optimización de instrucciones.
  5. **Ingeniería de Software Aumentada por IA (`AIAugmentedEngineering`):** 11 conceptos de desarrollo aumentado por IA, copilotos y validación humana.
  6. **Render & Animación 3D (`Render-3D-Animations`):** 10 conceptos de pipeline gráfico, sombreado y algoritmos de iluminación.
  7. **Video, Imagen & Gráficos Digitales (`VideoImage`):** 10 conceptos fundamentales de procesamiento, espacios de color y compresión.
  8. **IA Generativa & Modelos Multimodales para Medios (`GenerativeAIMedia`):** 10 conceptos de difusión, espacio latente y acondicionamiento.
  9. **Sistemas RAG, Bases de Datos Vectoriales & Recuperación Semántica (`RAGAndVectorKnowledge`):** 8 conceptos de RAG, embeddings, indexación y grounding.
- **Orientador de Prompts Técnicos (33 Productos Objetivo):** Transforma la consulta ontológica en directivas imperativas de producción y especificaciones para modelos generativos o especificaciones de ingeniería.
- **Diagramas Contextuales Nativos en SVG:** Generación en memoria de grafos focales, jerárquicos (L1-L6), secuenciales (pipeline) y atlas relacional sin dependencias de librerías externas.
- **Seguridad en Cliente Endurecida:** Cabecera `Content-Security-Policy` estricta (`default-src 'self'`) en `index.html` y renderizado DOM completamente sanitizado contra inyecciones XSS.
- **Persistencia Local y Exportación de Cápsulas:** Almacenamiento local mediante `IndexedDB` y exportación/importación atómica en archivos JSON portables.

---

## 2. Estructura Limpia del Repositorio

```
DocWebGlosary/
├── index.html                     # Punto de entrada de la aplicación SPA
├── audit_autonomy.js              # Oráculo rápido de verificación de autonomía
├── package.json                   # Manifiesto estándar con scripts de construcción y pruebas
├── README.md                      # Documentación canónica y viva del sistema
├── app/
│   ├── css/
│   │   └── app.css                # Sistema de diseño y variables CSS
│   ├── js/
│   │   ├── app.js                 # Controlador UI, renderizado sanitizado y enrutamiento
│   │   ├── semantic-engine.js     # Motor ontológico y diagramador SVG contextual
│   │   ├── prompt-orientator.js   # Orientador técnico de prompts y directivas IA
│   │   └── storage.js             # Motor de persistencia IndexedDB y cápsulas JSON
│   └── data/
│       ├── catalog.json           # Catálogo central y metadatos de los 5 glosarios
│       └── bundle.js              # Paquete ejecutable compilado con hash SHA-256
├── AudiovisualProduction/data/    # Fuente canónica inmutable (glossary.json + terms.json)
├── GenerativeAIMedia/data/        # Fuente canónica inmutable (glossary.json + terms.json)
├── Render-3D-Animations/data/     # Fuente canónica inmutable (glossary.json + terms.json)
├── SoftwareEngineeringOntology/data/ # Fuente canónica inmutable (glossary.json + terms.json)
├── VideoImage/data/               # Fuente canónica inmutable (glossary.json + terms.json)
├── tools/
│   ├── build_data_bundle.js       # Compilador declarativo de datos con validación e idempotencia
│   ├── build_release.js           # Generador de distribución limpia (< 20 archivos, < 0.6 MB)
│   ├── run_all_tests.js           # Master Test Runner E2E (8 suites, 310 aserciones)
│   ├── test_autonomy.js           # Suite de preservación y autonomía offline
│   ├── test_catalog_and_terms.js  # Integridad de catálogo y términos
│   ├── test_data_parity.js        # Detección determinista de desincronización (Split-Brain)
│   ├── test_jsonld_schema.js      # Validación Schema.org DefinedTerm JSON-LD
│   ├── test_m4_m6_adversarial.js  # Suite adversarial de robustez para Hitos 4 a 6
│   ├── test_prompt_orientator.js  # Pruebas del orientador técnico de prompts
│   ├── test_semantic_integrity.js # Integridad de relaciones ontológicas bidireccionales
│   ├── test_storage_capsule.js    # Pruebas de persistencia IndexedDB y SHA-256
│   └── archive/                   # Archivo histórico de scripts mutantes retirados
└── dist/                          # Paquetes de distribución comprimidos (.zip)
```

---

## 3. Comandos de Desarrollo y Operación

El proyecto se gestiona mediante comandos estándar de Node.js (cero dependencias en `node_modules`):

```bash
# 1. Compilar y sincronizar paquete de datos (idempotente)
npm run build
# o bien: node tools/build_data_bundle.js

# 2. Ejecutar la suite completa de pruebas E2E (8 suites modulares)
npm test
# o bien: node tools/run_all_tests.js

# 3. Ejecutar suite de autonomía de red (cero llamadas externas)
npm run test:autonomy
# o bien: node audit_autonomy.js

# 4. Ejecutar suite adversarial de robustez (M4-M6)
npm run test:adversarial
# o bien: node tools/test_m4_m6_adversarial.js

# 5. Generar paquete de release de producción listo para distribución
npm run dist
# Genera: dist/DocWebGlosary-v1.0.0-dist.zip (< 20 archivos, peso ~0.5 MB)
```

---

## 4. Garantías de Calidad y Certificación

- **Pass Rate:** 100.0% (310 aserciones ejecutadas en < 400 ms).
- **Tiers Verificados:**
  - **Tier 1:** Verificación Unitaria y Smoke (118 pruebas).
  - **Tier 2:** Análisis de Robustez y Valores Límite (131 pruebas).
  - **Tier 3:** Integración Cruzada e Interconexión de Glosarios (40 pruebas).
  - **Tier 4:** Escenarios de Aplicación del Mundo Real (21 pruebas).
- **Cobertura de Características:** 25/25 features (F1 a F25) certificadas.
- **Gobernanza Git:** Hook `pre-commit` activo que bloquea cualquier commit que altere datos sin recompilar o que falle una sola prueba.
