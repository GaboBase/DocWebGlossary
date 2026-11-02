# AGENTS.md — DocWeb MultiGlosary

Instrucciones estables para el desarrollo del proyecto DocWeb MultiGlosary.
Este documento define la arquitectura, comandos y requisitos de verificación.

---

## 1. Propósito del producto

Aplicación web estática, autónoma y offline-capable para gestión de glosarios ontológicos multi-dominio y orientación de prompts técnicos. Ejecuta 100% del lado del cliente, sin servidores remotos, sin bases de datos en la nube, sin CDNs y funciona bajo el protocolo local `file://`.

---

## 2. Arquitectura

### Dominios ontológicos (5, coexisten en una sola aplicación)

| Dominio | ID | Términos |
|---------|-----|----------|
| Producción Audiovisual & Terminología de Video | `audiovisual-production` | 212 |
| Ingeniería de Software & Ontología de Sistemas | `software-engineering-ontology` | 30 |
| Render & Animación 3D | `render-3d-animations` | 10 |
| Video, Imagen & Gráficos Digitales | `video-image` | 10 |
| IA Generativa & Modelos Multimodales para Medios | `generative-ai-media` | 10 |

**Total: 272 términos canónicos** en 10 archivos JSON fuente (`<Dominio>/data/glossary.json` + `<Dominio>/data/terms.json`).

### Módulos de runtime (Vanilla JS, cero dependencias)

- `index.html` — SPA, CSP estricta, scripts/links locales
- `app/css/app.css` — sistema de diseño
- `app/js/app.js` — controlador UI, renderizado sanitizado, enrutador hash, eventos delegados (CSP-safe)
- `app/js/semantic-engine.js` — motor ontológico, JSON-LD, diagramas SVG
- `app/js/prompt-orientator.js` — orientador de prompts técnicos (33 productos)
- `app/js/storage.js` — IndexedDB con fallback RAM, cápsulas SHA-256

### Contratos públicos de JavaScript (preservar)

- `window.DocWebCanonicalData`
- `window.DocWebSemantics`
- `window.DocWebStorage`
- `window.DocWebApp`

---

## 3. Comandos de desarrollo

```bash
# Compilar y sincronizar paquete de datos (idempotente, solo lectura sobre fuentes)
npm run build

# Ejecutar suite completa de pruebas E2E (10 suites modulares)
npm test

# Suite de autonomía offline (cero llamadas externas)
npm run test:autonomy

# Suite adversarial de robustez (M4-M6)
npm run test:adversarial

# Generar paquete de release (ZIP, 18 archivos de producción)
npm run dist
```

---

## 4. Requisitos de verificación

- **Todas las pruebas deben pasar (100%)** antes de considerar cualquier cambio completo.
- **Cero mutación** de los 10 archivos JSON fuente de dominio durante la compilación.
- **Hash SHA-256 determinista** sobre los archivos fuente originales, con ordenamiento de archivos determinista.
- **Separación** entre normalización de texto para índices de búsqueda y verificación criptográfica de integridad.
- **CSP compatible**: `script-src 'self'` sin `unsafe-inline`. No usar controladores de eventos en línea (`onclick`, `onchange`, etc.). Usar el sistema delegado `data-cmd`/`data-cmd-arg`.
- **Todo el contenido de datos insertado en el DOM** debe pasar por `escapeHtml()`.
- **file:// execution** debe seguir funcionando sin CORS ni llamadas de red.
- **Índices semánticos precomputados** son artefactos derivados, nunca fuentes de verdad competidoras.
- **Paquete de release** debe contener exactamente los archivos de producción requeridos (18), sin `.git/`, `.agents/`, herramientas, tests ni reportes.

---

## 5. Restricciones (no modificar sin autorización explícita)

- No introducir Ollama, endpoints de modelos locales, LLMs remotos ni proveedores de inferencia externos.
- No introducir CDNs, servicios de fuentes remotos, bases de datos remotas o APIs externas.
- No dividir los cinco dominios en productos separados sin una decisión de producto aprobada.
- No realizar traducciones masivas ni cambiar identificadores canónicos de términos.
- No modificar los 10 archivos JSON fuente de dominio sin una corrección autorizada y respaldada por evidencia.
- No eliminar archivos rastreados por Git sin autorización.
- No crear pruebas, canales de compilación o documentación duplicada.
- No crear nuevos documentos de continuidad si `CONTINUITY_STATE.md` ya sirve para ese propósito.

---

## 6. Estado actual (verificado)

- 693 aserciones, 100% aprobadas, 0 fallidas
- 10 suites: Autonomía, Paridad de Datos, Catálogo y Términos, Integridad Semántica, JSON-LD, Orientador de Prompts, Cápsula de Almacenamiento, Adversarial M4-M6, Seguridad del DOM, Búsqueda Interdominio y Procedencia
- Fase de estabilización (v1.0.0) completa
- Fase 2 (B-10): base semántica interdominio validada; UI de composición en desarrollo; gráfico interactivo pendiente

---

## 7. Siguiente tarea recomendada

Implementar la UI de composición interdominio (B-10, paso 2 del plan incremental): selección de términos desde múltiples dominios simultáneamente en el portal hub, con procedencia de dominio y composición de prompts consciente de relaciones.
