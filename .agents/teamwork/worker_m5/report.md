# Informe de Ingeniería: Hito 5 — Persistencia, Respaldo en Cápsula y Arquitectura Desacoplada Multiglosario

**Fecha:** 2026-11-01  
**Agente Responsable:** worker_m5 (teamwork_worker)  
**Rol Primario:** implementer, qa, specialist  
**Estado:** COMPLETADO CON ÉXITO (100% de aserciones verificadas)

---

## 1. Resumen Ejecutivo

El Hito 5 de DOCWEB MULTIGLOSSARY ha sido completado y verificado rigurosamente. Este hito implementa y consolida la capa de persistencia local, auditoría inmutable de revisiones, cálculo criptográfico nativo de integridad y respaldos portables atómicos mediante **Cápsulas de Conocimiento** (`DOCWEB_MULTIGLOSSARY_CAPSULE`), todo ello bajo una arquitectura modular y desacoplada del dominio específico.

La totalidad del sistema opera en estricta conformidad con el Contrato del Sistema:
1. **Cero llamadas o dependencias de red:** 100% local, offline y seguro.
2. **Integridad Criptográfica NIST:** Cálculo nativo SHA-256 con Web Crypto API (`window.crypto.subtle`) y fallback determinista verificado.
3. **Persistencia Híbrida Transaccional:** IndexedDB (`DocWebMultiGlossaryDB`) estructurada en tres almacenes especializados: `custom_terms`, `custom_glossaries` y `revisions_log`.
4. **Respaldos Atómicos e Inmutables:** Exportación e importación de cápsulas JSON v1.0.0 con detección de manipulaciones indebidas y validación estructural estricta.
5. **Arquitectura Compartida Multiglosario:** Modelo de datos desacoplado y neutral, preparado para albergar futuros glosarios temáticos (imagen, marketing, ontología, software) sin duplicar código de la aplicación.

---

## 2. Alcance e Inventario de Características Implementadas

En conformidad con `PROJECT.md` y `ORIGINAL_REQUEST.md` (§R7):

| # | Característica | Descripción | Implementación Técnica | Estado |
|---|----------------|-------------|-------------------------|:------:|
| **F20** | IndexedDB Custom Term Persistence | Almacenamiento local estructurado de términos personalizados, ediciones y revisiones inmutables | Base de datos `DocWebMultiGlossaryDB` con almacenes `custom_terms`, `custom_glossaries` y `revisions_log` | **VERIFICADO** |
| **F21** | SHA-256 Web Crypto Integrity Hash | Resumen criptográfico SHA-256 según estándares NIST para huellas de contenido y verificación de firmas | Método `computeSha256(str)` con Web Crypto API nativa y fallback determinista prefixado (`fallback-`) | **VERIFICADO** |
| **F22** | JSON Capsule Import / Export | Exportación e importación de cápsulas de conocimiento atómicas serializadas en JSON | Métodos `exportKnowledgeCapsule()`, `importKnowledgeCapsule()`, `verifyCapsuleIntegrity()` con validación estricta | **VERIFICADO** |
| **F23** | Decoupled Shared Multi-glossary Architecture | Motor de persistencia genérico y domain-agnostic listo para múltiples colecciones simultáneas | Soporte para índices por `glossaryId`, almacén `custom_glossaries` y filtrado granular sin acoplamiento a dominio | **VERIFICADO** |

---

## 3. Arquitectura y Detalles de Implementación

### 3.1 Esquema de Base de Datos IndexedDB (`DocWebMultiGlossaryDB` v1)

El archivo `app/js/storage.js` gestiona la base de datos local `DocWebMultiGlossaryDB` mediante tres almacenes de objetos (*object stores*):

1. **`custom_terms`**:
   - `keyPath`: `'id'` (URN canónica, ej. `urn:term:audiovisual-production:mi-termino`).
   - Índices:
     - `'glossaryId'`: Permite consultar y filtrar términos pertenecientes a una colección específica.
     - `'slug'`: Búsqueda y desambiguación rápida por identificador legible.
     - `'updatedAt'`: Ordenación cronológica de ediciones locales.

2. **`custom_glossaries`**:
   - `keyPath`: `'id'` (Identificador de colección, ej. `marketing-digital`, `ia-ontologies`).
   - Permite que el usuario o extensiones registren metadatos de colecciones temáticas futuras de forma autónoma.

3. **`revisions_log`**:
   - `keyPath`: `'revisionId'` (Identificador único e inmutable por revisión, prefijado con timestamp).
   - Índices:
     - `'termId'`: Permite auditar el historial completo de cambios de un término concreto.
     - `'timestamp'`: Trazabilidad temporal lineal de modificaciones en la base de datos.
   - Cada entrada de revisión incluye: `revisionId`, `termId`, `timestamp`, `author`, `changeLog`, `hash` (SHA-256) y una instantánea completa `snapshot` del término en ese momento.

### 3.2 Hashing Criptográfico SHA-256 y Fallback Determinista (F21)

El método `computeSha256(str)` implementa:
- **Ruta Principal:** `window.crypto.subtle.digest('SHA-256', msgUint8)` retornando una cadena hexadecimal en minúsculas de 64 caracteres.
  - Vector NIST cadena vacía `""` -> `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.
  - Vector NIST texto `"test"` -> `9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08`.
- **Ruta Fallback Determinista:** Si la aplicación se ejecuta en entornos sandboxed sin acceso a `crypto.subtle`, activa una función hash determinista con prefijo `'fallback-'`, garantizando que la aplicación continúe funcionando sin interrupción.

### 3.3 Cápsula de Conocimiento Atómica (`DOCWEB_MULTIGLOSSARY_CAPSULE` v1.0.0)

Estructura canónica de la cápsula:
```json
{
  "format": "DOCWEB_MULTIGLOSSARY_CAPSULE",
  "version": "1.0.0",
  "exportedAt": "2026-11-01T04:00:00.000Z",
  "generator": "DocWeb Local Knowledge Engine",
  "stats": {
    "totalCustomTerms": 1,
    "totalRevisions": 1
  },
  "terms": [ ... ],
  "revisions": [ ... ],
  "integrityHash": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
}
```

- **Detección de Manipulación (Tamper Detection):** El hash `integrityHash` se calcula sobre la serialización JSON del contenido canónico de la cápsula (excluyendo el campo `integrityHash`). Cualquier modificación a un término, descripción o metadato invalida inmediatamente la firma.
- **Validación Estricta al Importar:**
  - Rechaza formatos no declarados (`format !== 'DOCWEB_MULTIGLOSSARY_CAPSULE'`).
  - Rechaza estructuras con términos corruptos o que no sean un arreglo (`!Array.isArray(capsule.terms)`).
  - Admite opción `{ verifyIntegrity: true }` y método `verifyCapsuleIntegrity(capsuleData)`.

### 3.4 Conexión de Interfaz de Usuario en `app/js/app.js`

Se implementaron y enlazaron los métodos pendientes del controlador de la interfaz de usuario:
1. `exportCapsule()`: Exporta un archivo JSON descargable nombrado `docweb-knowledge-capsule-[glosario]-[timestamp].json` conteniendo todos los términos locales, historial de revisiones y firma criptográfica.
2. `handleImportFile(event)`: Carga el archivo JSON seleccionado por el usuario, valida la integridad criptográfica SHA-256 (alertando al usuario en caso de discordancia), inserta las entidades en IndexedDB de forma atómica y recarga inmediatamente el motor semántico en memoria (`window.DocWebSemantics`).
3. `openTermEditor(existingTerm = null)`: Despliega un modal interactivo accesible para la creación o edición de términos, autogenerando identificadores URN canónicos, calculando el hash de contenido, registrando la revisión inmutable y refrescando la vista y el índice A-Z.

---

## 4. Evidencia Empírica de Verificación

Se ejecutaron todas las pruebas requeridas con resultado 100% exitoso:

### 4.1 Suite E2E de Persistencia y Cápsula (`tools/test_storage_capsule.js`)
```
=== Running Persistence & Storage Capsule Suite ===
  ✔ PASS [F20][T1] app/js/storage.js loaded into VM sandbox with Web Crypto
  ✔ PASS [F21][T1] SHA-256 hash of empty string matches standard NIST vector
  ✔ PASS [F21][T1] SHA-256 hash of "test" matches standard NIST vector
  ✔ PASS [F21][T1] Deterministic fallback hash activates when Web Crypto is unavailable
  ✔ PASS [F22][T1] storage.js declares canonical capsule format "DOCWEB_MULTIGLOSSARY_CAPSULE"
  ✔ PASS [F21][T2] Capsule hashes successfully computed
  ✔ PASS [F21][T2] Tamper Detection: Modified payload alters SHA-256 capsule integrity hash
  ✔ PASS [F22][T2] Capsule importer rejects non-compliant capsule format identifier
  ✔ PASS [F22][T2] Capsule importer rejects capsule with non-array terms field
  ✔ PASS [F20][T3] IndexedDB store "custom_terms" configured for local term entity storage
  ✔ PASS [F20][T3] IndexedDB store "custom_glossaries" configured for custom collections
  ✔ PASS [F20][T3] IndexedDB store "revisions_log" configured for immutable revision history
  ✔ PASS [F20][T3] LocalStorageEngine implements method: init()
  ✔ PASS [F20][T3] LocalStorageEngine implements method: computeSha256()
  ✔ PASS [F20][T3] LocalStorageEngine implements method: saveTerm()
  ✔ PASS [F20][T3] LocalStorageEngine implements method: getTerm()
  ✔ PASS [F20][T3] LocalStorageEngine implements method: getAllCustomTerms()
  ✔ PASS [F20][T3] LocalStorageEngine implements method: getTermRevisions()
  ✔ PASS [F20][T3] LocalStorageEngine implements method: exportKnowledgeCapsule()
  ✔ PASS [F20][T3] LocalStorageEngine implements method: importKnowledgeCapsule()
  ✔ PASS [F22][T4] Scenario 3: Atomic knowledge capsule successfully serialized to JSON text
  ✔ PASS [F22][T4] Scenario 3: Parsed capsule format verified upon restore
  ✔ PASS [F22][T4] Scenario 3: All custom terms restored with 100% round-trip fidelity
  ✔ PASS [F20][T4] Scenario 3: Full immutable revision history preserved in restored capsule

Total Assertions: 24 | Passed: 24 | Failed: 0 | Pass Rate: 100.0%
```

### 4.2 Suite Maestra E2E Completa (`tools/run_all_tests.js`)
```
OVERALL SUITE RESULTS
Execution Time:   260ms
Total Assertions: 221
Passed:           221
Failed:           0
Pending:          0
Pass Rate:        100.0%
```
Todas las suites pasaron sin advertencias ni regresiones:
- Autonomy & Preservation Suite: 37/37 pass
- Catalog & Terms Integrity Suite: 28/28 pass
- Semantic Integrity & Ontology Suite: 29/29 pass
- JSON-LD & Semantic HTML5 Suite: 49/49 pass
- Prompt Intention Orientator Suite: 47/47 pass
- Persistence & Storage Capsule Suite: 24/24 pass
- Master E2E Verification & Hardening: 7/7 pass

### 4.3 Auditoría de Autonomía 100% Offline (`audit_autonomy.js`)
```
VERIFICACIÓN ESTRICTA: 100% AUTÓNOMO Y LOCAL. Cero peticiones o CDNs externos.
Código de salida: 0
```

---

## 5. Conclusión y Handoff

El Hito 5 está completamente finalizado, verificado empíricamente y blindado frente a regresiones. La arquitectura de persistencia y respaldo en cápsula de DOCWEB MULTIGLOSSARY está lista para producción local y para la verificación final del Hito 6.
