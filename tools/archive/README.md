# Archivo Histórico de Scripts de Mutación e Ingesta Inicial

Este directorio contiene los scripts imperativos de enriquecimiento y rescate utilizados durante las fases de prototipado y expansión agéntica inicial (Hitos 1 a 6):

1. `enrich_audiovisual_terms.js`: Enriquecimiento del glosario audiovisual original.
2. `expand_candidate_glossaries.js`: Expansión inicial de glosarios candidatos.
3. `expand_software_ontology_full.js`: Ingesta inicial de los 30 términos de ontología de sistemas.
4. `reincorporate_lost_terms.js`: Parche de rescate tras pérdida accidental de términos.

## Estado Operativo: RETIRADOS Y ARCHIVADOS (FROZEN)

**ADVERTENCIA**: Estos scripts mutaban archivos JSON in-situ de forma destructiva y no idempotente.
En la arquitectura de producción actual, **los 10 archivos en `<Domain>/data/glossary.json` y `<Domain>/data/terms.json` constituyen la única fuente canónica de verdad inmutable**. 

Cualquier cambio a los datos debe realizarse declarativamente sobre dichos archivos JSON y compilarse mediante:
```bash
node tools/build_data_bundle.js
# o mediante:
npm run build
```
No ejecute los scripts de esta carpeta sobre los archivos de producción.
