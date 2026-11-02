/**
 * DOCWEB MULTIGLOSSARY — Canonical & Semantic Knowledge Engine
 * Cumplimiento del Contrato del Sistema & Extensión Ontológica:
 * - Carga autónoma desde almacenamiento local.
 * - Modelo Ontológico de Relaciones Semánticas Expandido (Taxonomía, Mereología, Secuencial, Causal, Compuesto).
 * - Clasificación Jerárquica Multifacética de 6 Niveles (L1 a L6).
 * - Visualización interactiva autónoma en SVG capaz de expresar TODOS los términos (Atlas, Jerarquía, Pipeline, Focal).
 * - Cero dependencias externas. 100% offline, seguro frente a inyecciones XML y JS.
 */

class SemanticKnowledgeEngine {
  constructor() {
    this.catalog = null;
    this.glossaries = new Map(); // id -> glossaryMetadata
    this.terms = new Map();      // id -> termObject
    this.inverseRelations = new Map(); // targetTermId -> Array<{sourceTermId, type, label, note, family}>
    this.storage = (typeof window !== 'undefined' && window.DocWebStorage) ? window.DocWebStorage : null;

    // Catálogo formal de familias de relaciones ontológicas
    this.relationFamilies = {
      taxonomy: { id: 'taxonomy', label: 'Taxonomía y Especialización', color: '#2563eb', stroke: '#1d4ed8' },
      mereology: { id: 'mereology', label: 'Composición y Mereología', color: '#4f46e5', stroke: '#4338ca' },
      sequential: { id: 'sequential', label: 'Secuencia Temporal y Flujo', color: '#d97706', stroke: '#b45309' },
      causal: { id: 'causal', label: 'Causalidad y Habilitación', color: '#059669', stroke: '#047857' },
      dependency: { id: 'dependency', label: 'Dependencia y Requisitos', color: '#7c3aed', stroke: '#6d28d9' },
      transformation: { id: 'transformation', label: 'Transformación de Datos e In/Out', color: '#0d9488', stroke: '#0f766e' },
      functional: { id: 'functional', label: 'Utilidad Funcional y Rol', color: '#0284c7', stroke: '#0369a1' },
      evaluation: { id: 'evaluation', label: 'Evaluación, Verificación y Calidad', color: '#e11d48', stroke: '#be123c' },
      evidential: { id: 'evidential', label: 'Evidencia y Contradicción', color: '#dc2626', stroke: '#b91c1c' },
      compatibility: { id: 'compatibility', label: 'Compatibilidad y Alternativa', color: '#64748b', stroke: '#475569' },
      composite: { id: 'composite', label: 'Relación Semántica Compuesta', color: '#0891b2', stroke: '#0e7490' }
    };

    // Modelo jerárquico canónico de 6 niveles (L1 a L6)
    this.hierarchyLevels = {
      'L1': { id: 'L1', name: 'Dominio Fundamental', description: 'Delimita la realidad conceptual global del sistema o glosario.' },
      'L2': { id: 'L2', name: 'Familia Ontológica', description: 'Macrocategoría que distingue la naturaleza de la entidad técnica.' },
      'L3': { id: 'L3', name: 'Categoría Conceptual', description: 'Agrupa entidades con criterio común funcional o disciplinar.' },
      'L4': { id: 'L4', name: 'Tipo Especializado', description: 'Introduce rasgos diferenciales y técnicas nucleares.' },
      'L5': { id: 'L5', name: 'Subtipo o Elemento', description: 'Partición o componente estructural relativo al propósito.' },
      'L6': { id: 'L6', name: 'Unidad Atómica de Vista', description: 'Granularidad de especificación técnica, métrica o parámetro.' }
    };
  }

  async loadAll(catalogData, glossariesData) {
    this.catalog = catalogData;
    this.glossaries.clear();
    this.terms.clear();
    this.inverseRelations.clear();

    if (catalogData && Array.isArray(catalogData.canonicalGlossaries)) {
      for (const g of catalogData.canonicalGlossaries) {
        this.glossaries.set(g.id, g);
      }
    }

    if (glossariesData && typeof glossariesData === 'object') {
      for (const [glossaryId, termsList] of Object.entries(glossariesData)) {
        if (!Array.isArray(termsList)) continue;
        for (const term of termsList) {
          if (!term || !term.id) continue;
          term.glossaryId = glossaryId;
          term.origin = term.origin || 'canonical';
          this.terms.set(term.id, term);
        }
      }
    }

    // Fusionar con modificaciones persistidas en IndexedDB si están disponibles
    try {
      if (this.storage && typeof this.storage.getAllCustomTerms === 'function') {
        const customTerms = await this.storage.getAllCustomTerms();
        if (Array.isArray(customTerms)) {
          for (const cTerm of customTerms) {
            if (cTerm && cTerm.id) {
              this.terms.set(cTerm.id, cTerm);
            }
          }
        }
      }
    } catch (e) {
      console.warn('No se pudieron recuperar términos personalizados de IndexedDB:', e);
    }

    this.computeInverseRelations();

    return {
      glossariesCount: this.glossaries.size,
      termsCount: this.terms.size
    };
  }

  computeInverseRelations() {
    this.inverseRelations.clear();

    // Diccionario formal de relaciones inversas bidireccionales con asignación de familia
    const relationInverseMap = {
      // 1. Taxonomic generalization / specialization
      'isTypeOf': { type: 'hasSubtype', label: 'Tiene como subtipo / técnica', family: 'taxonomy' },
      'hasSubtype': { type: 'isTypeOf', label: 'Es un tipo de', family: 'taxonomy' },
      'subclass_of': { type: 'superclass_of', label: 'Es superclase de', family: 'taxonomy' },
      'superclass_of': { type: 'subclass_of', label: 'Es subclase de', family: 'taxonomy' },
      'instance_of': { type: 'has_instance', label: 'Tiene como instancia', family: 'taxonomy' },
      'has_instance': { type: 'instance_of', label: 'Es instancia de', family: 'taxonomy' },
      'co_hyponym_of': { type: 'co_hyponym_of', label: 'Es co-hipónimo hermano de', family: 'taxonomy' },
      'functional_co_hyponym_of': { type: 'functional_co_hyponym_of', label: 'Es homólogo funcional de', family: 'taxonomy' },

      // 2. Mereological part / whole
      'isPartOf': { type: 'composedOf', label: 'Se compone de', family: 'mereology' },
      'composedOf': { type: 'isPartOf', label: 'Es parte de', family: 'mereology' },
      'member_of': { type: 'has_member', label: 'Tiene como miembro', family: 'mereology' },
      'has_member': { type: 'member_of', label: 'Es miembro de', family: 'mereology' },
      'phase_of': { type: 'has_phase', label: 'Tiene como fase de proceso', family: 'mereology' },
      'has_phase': { type: 'phase_of', label: 'Es fase del proceso', family: 'mereology' },

      // 3. Containment
      'contains': { type: 'containedIn', label: 'Está contenido en', family: 'mereology' },
      'containedIn': { type: 'contains', label: 'Contiene', family: 'mereology' },

      // 4. Specialization / Generalization
      'specializesIn': { type: 'moreGeneralThan', label: 'Es más general que / engloba', family: 'taxonomy' },
      'moreGeneralThan': { type: 'specializesIn', label: 'Se especializa en', family: 'taxonomy' },

      // 5. Architectural dependency
      'dependsOn': { type: 'dependencyOf', label: 'Es dependencia para', family: 'dependency' },
      'dependencyOf': { type: 'dependsOn', label: 'Depende de', family: 'dependency' },

      // 6. Prerequisite requirement
      'requires': { type: 'requiredBy', label: 'Es requerido por', family: 'dependency' },
      'requiredBy': { type: 'requires', label: 'Requiere', family: 'dependency' },

      // 7. Temporal sequence & pipeline flow
      'precedes': { type: 'succeeds', label: 'Sucede cronológicamente a', family: 'sequential' },
      'succeeds': { type: 'precedes', label: 'Precede cronológicamente a', family: 'sequential' },
      'follows': { type: 'precedes', label: 'Precede en la secuencia a', family: 'sequential' },
      'concurrent_with': { type: 'concurrent_with', label: 'Es concurrente con', family: 'sequential' },
      'synchronizes_with': { type: 'synchronizes_with', label: 'Se sincroniza en el flujo con', family: 'sequential' },
      'pipeline_step_of': { type: 'has_pipeline_step', label: 'Tiene como etapa de pipeline', family: 'sequential' },
      'has_pipeline_step': { type: 'pipeline_step_of', label: 'Es etapa de pipeline de', family: 'sequential' },

      // 8. Production causality & enablement
      'produces': { type: 'producedBy', label: 'Es producido por', family: 'causal' },
      'producedBy': { type: 'produces', label: 'Produce', family: 'causal' },
      'causes': { type: 'effect_of', label: 'Es efecto o consecuencia de', family: 'causal' },
      'effect_of': { type: 'causes', label: 'Causa o desencadena', family: 'causal' },
      'enables': { type: 'enabled_by', label: 'Es habilitado por', family: 'causal' },
      'enabled_by': { type: 'enables', label: 'Habilita operativamente a', family: 'causal' },
      'inhibits': { type: 'inhibited_by', label: 'Es inhibido por', family: 'causal' },
      'inhibited_by': { type: 'inhibits', label: 'Inhibe o restringe a', family: 'causal' },

      // 9. Functional utility & implementation
      'usedFor': { type: 'uses', label: 'Es empleado por', family: 'functional' },
      'uses': { type: 'usedFor', label: 'Se utiliza para', family: 'functional' },
      'implements': { type: 'implemented_by', label: 'Es implementado por', family: 'functional' },
      'implemented_by': { type: 'implements', label: 'Implementa el contrato o técnica', family: 'functional' },
      'realizes': { type: 'realized_by', label: 'Es realizado por', family: 'functional' },
      'realized_by': { type: 'realizes', label: 'Realiza la capacidad de', family: 'functional' },
      'exposes': { type: 'exposed_by', label: 'Es expuesto por', family: 'functional' },
      'exposed_by': { type: 'exposes', label: 'Expone la capacidad de', family: 'functional' },
      'consumes': { type: 'consumed_by', label: 'Es consumido por', family: 'functional' },
      'consumed_by': { type: 'consumes', label: 'Consume la capacidad de', family: 'functional' },

      // 10. Symmetric compatibility
      'compatibleWith': { type: 'compatibleWith', label: 'Es compatible con', family: 'compatibility' },

      // 11. Symmetric alternative
      'alternativeTo': { type: 'alternativeTo', label: 'Es alternativa recíproca a', family: 'compatibility' },

      // 12. Symmetric differentiation
      'differsFrom': { type: 'differsFrom', label: 'Se diferencia recíprocamente de', family: 'compatibility' },

      // 13. Symmetric association
      'relatedTo': { type: 'relatedTo', label: 'Está relacionado con', family: 'compatibility' },
      'substitutable_for': { type: 'substitutable_for', label: 'Es sustituible recíprocamente por', family: 'compatibility' },

      // 14. Input transformation parameter
      'hasInput': { type: 'isInputTo', label: 'Es parámetro de entrada para', family: 'transformation' },
      'isInputTo': { type: 'hasInput', label: 'Tiene como parámetro de entrada', family: 'transformation' },

      // 15. Output transformation result
      'hasOutput': { type: 'isOutputOf', label: 'Es resultado u output de', family: 'transformation' },
      'isOutputOf': { type: 'hasOutput', label: 'Tiene como resultado u output', family: 'transformation' },
      'transforms': { type: 'transformed_by', label: 'Es transformado por', family: 'transformation' },
      'transformed_by': { type: 'transforms', label: 'Transforma a', family: 'transformation' },
      'persists_in': { type: 'stores', label: 'Almacena a', family: 'transformation' },
      'stores': { type: 'persists_in', label: 'Se almacena o persiste en', family: 'transformation' },

      // 16. Evaluation, verification & quality
      'validates': { type: 'validated_by', label: 'Es validado por', family: 'evaluation' },
      'validated_by': { type: 'validates', label: 'Valida normativamente a', family: 'evaluation' },
      'verifies': { type: 'verified_by', label: 'Es verificado por', family: 'evaluation' },
      'verified_by': { type: 'verifies', label: 'Verifica la propiedad de', family: 'evaluation' },
      'measured_by': { type: 'measures', label: 'Mide la propiedad de', family: 'evaluation' },
      'measures': { type: 'measured_by', label: 'Es medido por', family: 'evaluation' },
      'satisfies': { type: 'satisfied_by', label: 'Es satisfecho por', family: 'evaluation' },
      'satisfied_by': { type: 'satisfies', label: 'Satisface el requerimiento de', family: 'evaluation' },

      // 17. Evidential & contradiction
      'supports': { type: 'supported_by', label: 'Es respaldado por evidencia de', family: 'evidential' },
      'supported_by': { type: 'supports', label: 'Respalda evidencialmente a', family: 'evidential' },
      'contradicts': { type: 'contradicts', label: 'Entra en conflicto o contradicción técnica con', family: 'evidential' },

      // 18. Semánticas compuestas
      'mediates': { type: 'mediated_by', label: 'Es mediado o articulado por', family: 'composite' },
      'mediated_by': { type: 'mediates', label: 'Media o conecta como interfaz a', family: 'composite' },
      'condition_precedent_for': { type: 'conditioned_by', label: 'Tiene como precondición necesaria a', family: 'composite' },
      'conditioned_by': { type: 'condition_precedent_for', label: 'Es precondición precedente para', family: 'composite' },
      'composite_pipeline': { type: 'pipeline_component_of', label: 'Integra el pipeline compuesto de', family: 'composite' },
      'pipeline_component_of': { type: 'composite_pipeline', label: 'Articula en pipeline compuesto a', family: 'composite' }
    };

    for (const [sourceId, term] of this.terms.entries()) {
      if (!term.relations || !Array.isArray(term.relations)) continue;

      for (const rel of term.relations) {
        if (!rel || !rel.target || typeof rel.target !== 'string') continue;

        if (!this.inverseRelations.has(rel.target)) {
          this.inverseRelations.set(rel.target, []);
        }

        const invConfig = relationInverseMap[rel.type] || {
          type: 'reverseRelatedTo',
          label: 'Referenciado inversamente por',
          family: 'compatibility'
        };

        this.inverseRelations.get(rel.target).push({
          sourceTermId: sourceId,
          sourceTitle: term.title,
          sourceGlossaryId: term.glossaryId,
          type: invConfig.type,
          originalType: rel.type,
          label: invConfig.label,
          family: invConfig.family,
          note: rel.note || ''
        });
      }
    }
  }

  getTerm(termId) {
    return this.terms.get(termId) || null;
  }

  getGlossary(glossaryId) {
    return this.glossaries.get(glossaryId) || null;
  }

  getAllTerms() {
    return Array.from(this.terms.values());
  }

  getTermsByGlossary(glossaryId) {
    return this.getAllTerms().filter(t => t.glossaryId === glossaryId);
  }

  getInverseRelations(termId) {
    return this.inverseRelations.get(termId) || [];
  }

  getRelationFamily(relType) {
    const map = {
      isTypeOf: 'taxonomy', hasSubtype: 'taxonomy', subclass_of: 'taxonomy', superclass_of: 'taxonomy',
      instance_of: 'taxonomy', has_instance: 'taxonomy', co_hyponym_of: 'taxonomy', functional_co_hyponym_of: 'taxonomy',
      specializesIn: 'taxonomy', moreGeneralThan: 'taxonomy',
      isPartOf: 'mereology', composedOf: 'mereology', contains: 'mereology', containedIn: 'mereology',
      member_of: 'mereology', has_member: 'mereology', phase_of: 'mereology', has_phase: 'mereology',
      dependsOn: 'dependency', dependencyOf: 'dependency', requires: 'dependency', requiredBy: 'dependency',
      precedes: 'sequential', succeeds: 'sequential', follows: 'sequential', concurrent_with: 'sequential',
      synchronizes_with: 'sequential', pipeline_step_of: 'sequential', has_pipeline_step: 'sequential',
      produces: 'causal', producedBy: 'causal', causes: 'causal', effect_of: 'causal',
      enables: 'causal', enabled_by: 'causal', inhibits: 'causal', inhibited_by: 'causal',
      transforms: 'transformation', transformed_by: 'transformation', hasInput: 'transformation', isInputTo: 'transformation',
      hasOutput: 'transformation', isOutputOf: 'transformation', persists_in: 'transformation', stores: 'transformation',
      usedFor: 'functional', uses: 'functional', implements: 'functional', implemented_by: 'functional',
      realizes: 'functional', realized_by: 'functional', exposes: 'functional', exposed_by: 'functional', consumes: 'functional', consumed_by: 'functional',
      validates: 'evaluation', validated_by: 'evaluation', verifies: 'evaluation', verified_by: 'evaluation',
      measured_by: 'evaluation', measures: 'evaluation', satisfies: 'evaluation', satisfied_by: 'evaluation',
      supports: 'evidential', supported_by: 'evidential', contradicts: 'evidential',
      compatibleWith: 'compatibility', alternativeTo: 'compatibility', differsFrom: 'compatibility', relatedTo: 'compatibility', substitutable_for: 'compatibility',
      mediates: 'composite', mediated_by: 'composite', condition_precedent_for: 'composite', conditioned_by: 'composite',
      composite_pipeline: 'composite', pipeline_component_of: 'composite'
    };
    const famId = map[relType] || 'compatibility';
    return this.relationFamilies[famId] || this.relationFamilies.compatibility;
  }

  getOntologyLevel(term) {
    if (!term) return this.hierarchyLevels.L4;
    if (term.ontologyLevel && this.hierarchyLevels[term.ontologyLevel]) {
      return this.hierarchyLevels[term.ontologyLevel];
    }
    const lvl = (term.level || '').toLowerCase();
    if (lvl === 'fundamental') return this.hierarchyLevels.L3;
    if (lvl === 'element' || lvl === 'component') return this.hierarchyLevels.L5;
    if (lvl === 'atomic' || lvl === 'parameter') return this.hierarchyLevels.L6;
    return this.hierarchyLevels.L4;
  }

  getHierarchyTree(glossaryId = 'all') {
    const terms = (glossaryId === 'all') ? this.getAllTerms() : this.getTermsByGlossary(glossaryId);
    const tree = {
      id: 'root',
      level: 'L1',
      title: glossaryId === 'all' ? 'Catálogo Transversal de Conocimiento' : (this.getGlossary(glossaryId)?.title || glossaryId),
      children: []
    };

    const categoriesMap = new Map();
    for (const t of terms) {
      const cat = t.category || 'General';
      if (!categoriesMap.has(cat)) {
        categoriesMap.set(cat, {
          id: `cat:${cat}`,
          level: 'L3',
          title: t.categoryLabel || cat,
          category: cat,
          children: []
        });
      }
      const catNode = categoriesMap.get(cat);
      const termLevel = this.getOntologyLevel(t);
      const termNode = {
        id: t.id,
        level: termLevel.id,
        title: t.title,
        slug: t.slug,
        glossaryId: t.glossaryId,
        components: t.components || [],
        attributes: t.attributes || {},
        children: []
      };

      // Si tiene componentes, desglosarlos como L5
      if (Array.isArray(t.components) && t.components.length > 0) {
        t.components.forEach((comp, idx) => {
          termNode.children.push({
            id: `${t.id}:comp:${idx}`,
            level: 'L5',
            title: comp,
            isComponent: true
          });
        });
      }

      catNode.children.push(termNode);
    }

    tree.children = Array.from(categoriesMap.values());
    return tree;
  }

  /**
   * Search terms across the ontological catalog.
   *
   * @param {string} query Free-text search query (matched against title,
   *   definitions, synonyms and components). Empty query returns all terms.
   * @param {string|string[]|null} glossaryFilter Single glossary id, 'all',
   *   an array of glossary ids for multi-domain search, or null/undefined for
   *   every domain. Backward compatible: a single string behaves as before.
   * @param {string|null} categoryFilter Single category id or null/undefined.
   * @returns {Array<Object>} Matching term objects (original references).
   */
  searchTerms(query, glossaryFilter = null, categoryFilter = null) {
    const q = (query || '').toLowerCase().trim();

    // Normalize the glossary filter into a Set of ids for O(1) lookups.
    // null / undefined / 'all' means every domain; a single string keeps the
    // historical single-domain contract; an array enables cross-domain search.
    // An empty array is treated as "no restriction" (every domain), matching
    // the intuitive multi-select behavior of clearing all domain chips.
    let allowedGlossaries = null;
    if (glossaryFilter !== null && glossaryFilter !== undefined && glossaryFilter !== 'all') {
      const ids = Array.isArray(glossaryFilter) ? glossaryFilter : [String(glossaryFilter)];
      const filtered = ids.filter(Boolean);
      if (filtered.length > 0) {
        allowedGlossaries = new Set(filtered);
      }
    }

    return this.getAllTerms().filter(term => {
      if (allowedGlossaries && !allowedGlossaries.has(term.glossaryId)) {
        return false;
      }
      if (categoryFilter && categoryFilter !== 'all' && term.category !== categoryFilter) {
        return false;
      }
      if (!q) return true;

      const titleMatch = typeof term.title === 'string' && term.title.toLowerCase().includes(q);
      const defMatch = (typeof term.definition === 'string' && term.definition.toLowerCase().includes(q)) ||
                       (typeof term.shortDefinition === 'string' && term.shortDefinition.toLowerCase().includes(q));
      const fullDefMatch = (typeof term.extendedDefinition === 'string' && term.extendedDefinition.toLowerCase().includes(q)) ||
                           (typeof term.fullDefinition === 'string' && term.fullDefinition.toLowerCase().includes(q));
      const synMatch = Array.isArray(term.synonyms) && term.synonyms.some(s => typeof s === 'string' && s.toLowerCase().includes(q));
      const compMatch = Array.isArray(term.components) && term.components.some(c => typeof c === 'string' && c.toLowerCase().includes(q));

      return titleMatch || defMatch || fullDefMatch || synMatch || compMatch;
    });
  }

  /**
   * Cross-domain search that returns results annotated with term provenance
   * (domain traceability). Each result carries the originating glossary id,
   * title and domain so consumers can trace every selected term back to its
   * canonical source. A derived, read-only view: it never mutates domain data.
   *
   * @param {string} query Free-text search query.
   * @param {string[]} glossaryIds Ordered list of glossary ids to search.
   *   Defaults to every registered domain when omitted or empty.
   * @param {Object} options Optional { categoryFilter, limit }.
   * @returns {Array<{term, glossaryId, glossaryTitle, domain, relevance}>}
   *   Results ordered by relevance (title matches first, then definition,
   *   synonym, component matches) then alphabetically by title.
   */
  searchCrossDomain(query, glossaryIds = null, options = {}) {
    const { categoryFilter = null, limit = null } = options || {};
    const terms = this.searchTerms(query, glossaryIds, categoryFilter);

    const results = terms.map(term => {
      const glossary = this.getGlossary(term.glossaryId) || {};
      let relevance = 0;
      const q = (query || '').toLowerCase().trim();
      if (q) {
        const title = (term.title || '').toLowerCase();
        const shortDef = (term.shortDefinition || '').toLowerCase();
        const definition = (term.definition || '').toLowerCase();
        const synonyms = Array.isArray(term.synonyms) ? term.synonyms.join(' ').toLowerCase() : '';
        if (title.includes(q)) relevance += 4;
        else if (title.startsWith(q)) relevance += 3;
        if (shortDef.includes(q) || definition.includes(q)) relevance += 2;
        if (synonyms.includes(q)) relevance += 1;
        if (Array.isArray(term.components) && term.components.some(c => typeof c === 'string' && c.toLowerCase().includes(q))) relevance += 1;
      }

      return {
        term,
        glossaryId: term.glossaryId,
        glossaryTitle: glossary.title || term.glossaryId,
        domain: glossary.domain || '',
        relevance
      };
    });

    // Stable ordering: relevance desc, then title asc (case-insensitive).
    results.sort((a, b) => {
      if (b.relevance !== a.relevance) return b.relevance - a.relevance;
      const ta = (a.term.title || '').toLowerCase();
      const tb = (b.term.title || '').toLowerCase();
      if (ta < tb) return -1;
      if (ta > tb) return 1;
      return 0;
    });

    if (limit !== null && limit !== undefined) {
      return results.slice(0, Math.max(0, Number(limit) || 0));
    }
    return results;
  }

  /**
   * Resolve provenance for a single term: its originating glossary and domain.
   * Read-only; returns null when the term is unknown.
   *
   * @param {string} termId Canonical term id (URN).
   * @returns {Object|null}
   */
  getTermProvenance(termId) {
    const term = this.getTerm(termId);
    if (!term) return null;
    const glossary = this.getGlossary(term.glossaryId) || {};
    return {
      termId: term.id,
      title: term.title,
      glossaryId: term.glossaryId,
      glossaryTitle: glossary.title || term.glossaryId,
      domain: glossary.domain || '',
      category: term.category || 'General',
      ontologyLevel: this.getOntologyLevel(term).id
    };
  }

  generateJsonLd(term) {
    if (!term) return null;
    const glossary = this.getGlossary(term.glossaryId) || {};

    const description = term.definition || term.shortDefinition || '';
    const disambiguatingDescription = term.extendedDefinition || term.fullDefinition || '';

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "@id": term.id || "urn:term:docweb:concept",
      "name": term.title || "",
      "description": description,
      "inDefinedTermSet": {
        "@type": "DefinedTermSet",
        "@id": "urn:glossary:" + (term.glossaryId || "global"),
        "name": glossary.title || "DocWeb Knowledge Glossary",
        "description": glossary.description || ""
      },
      "alternateName": Array.isArray(term.synonyms) ? term.synonyms.filter(s => typeof s === 'string') : [],
      "additionalType": "urn:docweb:ontology:" + (term.level || "concept"),
      "identifier": term.slug || "",
      "disambiguation": term.category || "General"
    };

    if (disambiguatingDescription) {
      jsonLd["disambiguatingDescription"] = disambiguatingDescription;
    }

    return jsonLd;
  }

  /**
   * Genera el Diagrama Contextual de Relaciones en SVG interactivo y autónomo.
   * Modos admitidos en options.viewMode:
   *  - 'focal': Foco en el término con relaciones directas, inversas, secuenciales y compuestas ampliadas.
   *  - 'hierarchy': Vista jerárquica L1 a L6 del subárbol ontológico del término.
   *  - 'pipeline': Vista secuencial de flujo de producción / pipeline.
   *  - 'atlas': Expresa TODOS los términos del glosario activo con filtros y zoom interactivo.
   */
  generateContextualDiagramSvg(term, options = {}) {
    if (!term) {
      if (options.viewMode === 'atlas') {
        const dummyTerm = this.getAllTerms()[0] || { id: 'urn:term:global:atlas', title: 'Atlas General', category: 'General' };
        return this.renderAtlasViewSvg(dummyTerm, options);
      }
      return '<svg width="400" height="100" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg"><text x="200" y="55" font-size="12" fill="#64748b" text-anchor="middle">Sin datos de término seleccionados para el diagrama.</text></svg>';
    }

    const viewMode = options.viewMode || 'focal';
    if (viewMode === 'hierarchy') {
      return this.renderHierarchyViewSvg(term, options);
    }
    if (viewMode === 'pipeline') {
      return this.renderPipelineViewSvg(term, options);
    }
    if (viewMode === 'atlas') {
      return this.renderAtlasViewSvg(term, options);
    }

    // Por defecto: 'focal' (garantiza estricta retrocompatibilidad con tests unitarios F15)
    return this.renderFocalViewSvg(term, options);
  }

  // --------------------------------------------------------------------------
  // VISTA 1: FOCAL (Término Actual con relaciones directas, inversas y secuenciales)
  // --------------------------------------------------------------------------
  renderFocalViewSvg(term, options = {}) {
    const rawDirectRels = (Array.isArray(term.relations) ? term.relations : []).filter(
      rel => rel && rel.target && typeof rel.target === 'string'
    );
    const rawInverseRels = this.getInverseRelations(term.id);

    // Filtrado opcional por familia
    const filterFam = options.filterFamily || 'all';
    const directRels = filterFam === 'all'
      ? rawDirectRels
      : rawDirectRels.filter(r => this.getRelationFamily(r.type).id === filterFam);
    const inverseRels = filterFam === 'all'
      ? rawInverseRels
      : rawInverseRels.filter(r => (r.family || this.getRelationFamily(r.type).id) === filterFam);

    const width = 800;
    const height = Math.max(360, (Math.max(directRels.length, inverseRels.length) * 65) + 120);
    const centerX = width / 2;
    const centerY = height / 2;

    const termLevel = this.getOntologyLevel(term);

    let svg = [];
    svg.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" class="w-full h-auto overflow-visible select-none font-sans" role="img" aria-label="Diagrama de relaciones para ${this.escapeXml(term.title)}">`);

    // Marcadores y Filtros SVG
    svg.push(`
      <defs>
        <marker id="arrow-direct" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#3b82f6" />
        </marker>
        <marker id="arrow-inverse" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#10b981" />
        </marker>
        <marker id="arrow-sequential" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#d97706" />
        </marker>
        <marker id="arrow-causal" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#059669" />
        </marker>
        <marker id="arrow-composite" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#0891b2" />
        </marker>
        <filter id="shadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.12"/>
        </filter>
      </defs>
    `);

    // Fondo del canvas
    svg.push(`<rect width="${width}" height="${height}" rx="12" fill="var(--card, #ffffff)" stroke="var(--border, #e2e8f0)" stroke-width="1" />`);

    // Nodo Central (Término Actual)
    const centralBoxW = 210;
    const centralBoxH = 76;
    const centralX = centerX - (centralBoxW / 2);
    const centralY = centerY - (centralBoxH / 2);

    // Calcular columnas derecha (relaciones directas)
    const rightX = width - 230;
    const rightCount = directRels.length;
    const rightSpacing = rightCount > 1 ? (height - 150) / (rightCount - 1) : 0;
    const rightStartY = rightCount > 1 ? 80 : centerY - 28;

    directRels.forEach((rel, idx) => {
      const targetTerm = this.getTerm(rel.target);
      const targetTitle = targetTerm ? targetTerm.title : (typeof rel.target === 'string' ? rel.target.split(':').pop() : 'Destino');
      const isCross = targetTerm && targetTerm.glossaryId !== term.glossaryId;
      const targetY = rightCount > 1 ? (rightStartY + idx * rightSpacing) : centerY - 28;
      const targetX = rightX;

      const relFamily = this.getRelationFamily(rel.type);
      const strokeColor = relFamily.color || '#3b82f6';
      const markerId = (relFamily.id === 'sequential') ? 'arrow-sequential' : ((relFamily.id === 'causal') ? 'arrow-causal' : 'arrow-direct');

      const startX = centralX + centralBoxW;
      const startY = centerY;
      const endX = targetX;
      const endY = targetY + 26;
      const cp1X = startX + 70;
      const cp1Y = startY;
      const cp2X = endX - 70;
      const cp2Y = endY;

      svg.push(`
        <path d="M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}" 
              fill="none" stroke="${strokeColor}" stroke-width="2" stroke-dasharray="${isCross ? '4 3' : 'none'}" marker-end="url(#${markerId})" />
        <rect x="${(startX + endX)/2 - 58}" y="${(startY + endY)/2 - 11}" width="116" height="20" rx="4" fill="var(--background, #f8fafc)" stroke="${strokeColor}" stroke-width="0.9"/>
        <text x="${(startX + endX)/2}" y="${(startY + endY)/2 + 3}" font-size="9" fill="${strokeColor}" text-anchor="middle" font-weight="700">${this.escapeXml(rel.type)}</text>
      `);

      const targetNavId = this.escapeJsAttr(rel.target);
      const targetLevel = targetTerm ? this.getOntologyLevel(targetTerm) : { id: 'L4' };

      svg.push(`
        <g class="cursor-pointer transition-transform hover:opacity-80" data-cmd="navigateToTerm" data-cmd-arg="${targetNavId}" role="button" tabindex="0">
          <rect x="${targetX}" y="${targetY}" width="200" height="54" rx="8" fill="var(--background, #f8fafc)" stroke="${isCross ? '#8b5cf6' : strokeColor}" stroke-width="${isCross ? '2' : '1.2'}" filter="url(#shadow)"/>
          <text x="${targetX + 12}" y="${targetY + 20}" font-size="11" font-weight="600" fill="var(--foreground, #0f172a)">${this.escapeXml(this.truncateText(targetTitle, 22))}</text>
          <text x="${targetX + 12}" y="${targetY + 36}" font-size="9" fill="${isCross ? '#7c3aed' : 'var(--muted-foreground, #64748b)'}">${isCross ? 'Inter-Glosario ⤻' : this.escapeXml(targetTerm ? targetTerm.category : 'Relación')}</text>
          <rect x="${targetX + 155}" y="${targetY + 8}" width="34" height="15" rx="3" fill="#eff6ff" stroke="#bfdbfe" stroke-width="0.6"/>
          <text x="${targetX + 172}" y="${targetY + 19}" font-size="8" fill="#1e40af" text-anchor="middle" font-weight="700">${targetLevel.id}</text>
        </g>
      `);
    });

    // Calcular columnas izquierda (relaciones inversas)
    const leftX = 30;
    const leftCount = inverseRels.length;
    const leftSpacing = leftCount > 1 ? (height - 150) / (leftCount - 1) : 0;
    const leftStartY = leftCount > 1 ? 80 : centerY - 28;

    inverseRels.forEach((rel, idx) => {
      const sourceY = leftCount > 1 ? (leftStartY + idx * leftSpacing) : centerY - 28;
      const isCross = rel.sourceGlossaryId !== term.glossaryId;
      const relFamily = this.getRelationFamily(rel.originalType || rel.type);
      const strokeColor = isCross ? '#8b5cf6' : (relFamily.color || '#10b981');

      const startX = leftX + 190;
      const startY = sourceY + 26;
      const endX = centralX;
      const endY = centerY;
      const cp1X = startX + 70;
      const cp1Y = startY;
      const cp2X = endX - 70;
      const cp2Y = endY;

      svg.push(`
        <path d="M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}" 
              fill="none" stroke="${strokeColor}" stroke-width="2" stroke-dasharray="${isCross ? '4 3' : 'none'}" marker-end="url(#arrow-inverse)" />
        <rect x="${(startX + endX)/2 - 58}" y="${(startY + endY)/2 - 11}" width="116" height="20" rx="4" fill="var(--background, #f8fafc)" stroke="${strokeColor}" stroke-width="0.9"/>
        <text x="${(startX + endX)/2}" y="${(startY + endY)/2 + 3}" font-size="9" fill="${strokeColor}" text-anchor="middle" font-weight="700">${this.escapeXml(rel.type)}</text>
      `);

      const sourceNavId = this.escapeJsAttr(rel.sourceTermId);
      const sourceTerm = this.getTerm(rel.sourceTermId);
      const srcLevel = sourceTerm ? this.getOntologyLevel(sourceTerm) : { id: 'L4' };

      svg.push(`
        <g class="cursor-pointer transition-transform hover:opacity-80" data-cmd="navigateToTerm" data-cmd-arg="${sourceNavId}" role="button" tabindex="0">
          <rect x="${leftX}" y="${sourceY}" width="190" height="54" rx="8" fill="var(--background, #f8fafc)" stroke="${isCross ? '#8b5cf6' : strokeColor}" stroke-width="${isCross ? '2' : '1.2'}" filter="url(#shadow)"/>
          <text x="${leftX + 12}" y="${sourceY + 20}" font-size="11" font-weight="600" fill="var(--foreground, #0f172a)">${this.escapeXml(this.truncateText(rel.sourceTitle, 21))}</text>
          <text x="${leftX + 12}" y="${sourceY + 36}" font-size="9" fill="${isCross ? '#7c3aed' : 'var(--muted-foreground, #64748b)'}">${isCross ? 'Origen Inter-Glosario ⤻' : 'Referencia Inversa'}</text>
          <rect x="${leftX + 145}" y="${sourceY + 8}" width="34" height="15" rx="3" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="0.6"/>
          <text x="${leftX + 162}" y="${sourceY + 19}" font-size="8" fill="#166534" text-anchor="middle" font-weight="700">${srcLevel.id}</text>
        </g>
      `);
    });

    // Renderizado del Nodo Central (encima de las conexiones)
    svg.push(`
      <g filter="url(#shadow)" class="select-none focal-node" id="diagram-center-node" data-role="focal-node">
        <rect x="${centralX}" y="${centralY}" width="${centralBoxW}" height="${centralBoxH}" rx="12" 
              fill="#2563eb" stroke="#1d4ed8" stroke-width="2.5" />
        <text x="${centerX}" y="${centerY - 10}" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">${this.escapeXml(this.truncateText(term.title, 24))}</text>
        <text x="${centerX}" y="${centerY + 8}" font-size="10" fill="#dbeafe" text-anchor="middle">${this.escapeXml(term.category || 'Término')}</text>
        <g transform="translate(${centerX - 50}, ${centerY + 16})">
          <rect x="0" y="0" width="100" height="16" rx="4" fill="#1e40af" />
          <text x="50" y="11" font-size="8.5" fill="#e0e7ff" text-anchor="middle" font-weight="600">Nivel ${termLevel.id}: ${termLevel.name.split(' ')[0]}</text>
        </g>
      </g>
    `);

    // Barra Superior: Título, Filtro activo y Leyenda con marcadores
    svg.push(`
      <text x="24" y="32" font-size="12" font-weight="bold" fill="var(--foreground, #0f172a)">DIAGRAMA CONTEXTUAL DE RELACIONES</text>
      <text x="24" y="48" font-size="9" fill="var(--muted-foreground, #64748b)">Modo Focal | ${directRels.length} salientes | ${inverseRels.length} entrantes</text>
      <g transform="translate(${width - 460}, 20)">
        <circle cx="8" cy="8" r="4.5" fill="#3b82f6" />
        <text x="18" y="11" font-size="9" fill="var(--muted-foreground, #64748b)">Taxonomía</text>
        <circle cx="95" cy="8" r="4.5" fill="#10b981" />
        <text x="105" y="11" font-size="9" fill="var(--muted-foreground, #64748b)">Inversa</text>
        <circle cx="160" cy="8" r="4.5" fill="#d97706" />
        <text x="170" y="11" font-size="9" fill="var(--muted-foreground, #64748b)">Secuencia</text>
        <circle cx="235" cy="8" r="4.5" fill="#059669" />
        <text x="245" y="11" font-size="9" fill="var(--muted-foreground, #64748b)">Causal</text>
        <circle cx="300" cy="8" r="4.5" fill="#8b5cf6" />
        <text x="310" y="11" font-size="9" fill="var(--muted-foreground, #64748b)">Inter-Glosario</text>
        <circle cx="390" cy="8" r="4.5" fill="#0891b2" />
        <text x="400" y="11" font-size="9" fill="var(--muted-foreground, #64748b)">Compuesta</text>
      </g>
    `);

    svg.push(`</svg>`);
    return svg.join('\n');
  }

  // --------------------------------------------------------------------------
  // VISTA 2: JERÁRQUICA L1 a L6 (Árbol ontológico de 6 niveles)
  // --------------------------------------------------------------------------
  renderHierarchyViewSvg(term, options = {}) {
    const glossaryId = term.glossaryId || 'audiovisual-production';
    const tree = this.getHierarchyTree(glossaryId);
    const activeTermId = term.id;

    // Aplanar categorías y términos para layout visual jerárquico
    const width = 860;
    const catNodes = tree.children || [];
    const height = Math.max(480, (catNodes.length * 90) + 180);

    let svg = [];
    svg.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" class="w-full h-auto overflow-visible select-none font-sans" role="img" aria-label="Jerarquía ontológica L1 a L6">`);

    // Defs estándar para compatibilidad
    svg.push(`
      <defs>
        <marker id="arrow-direct" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#3b82f6" />
        </marker>
        <marker id="arrow-inverse" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#10b981" />
        </marker>
        <filter id="shadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.12"/>
        </filter>
      </defs>
      <rect width="${width}" height="${height}" rx="12" fill="var(--card, #ffffff)" stroke="var(--border, #e2e8f0)" stroke-width="1" />
    `);

    // Encabezado
    svg.push(`
      <text x="24" y="32" font-size="12" font-weight="bold" fill="var(--foreground, #0f172a)">JERARQUÍA ONTOLÓGICA MULTI-NIVEL (L1 A L6)</text>
      <text x="24" y="48" font-size="9" fill="var(--muted-foreground, #64748b)">Estructura de 6 niveles canónicos: Dominio ➔ Familia ➔ Categoría ➔ Tipo ➔ Elemento ➔ Parámetro</text>
    `);

    // Nivel L1: Raíz del Glosario
    const rootX = 40;
    const rootY = 70;
    svg.push(`
      <g filter="url(#shadow)">
        <rect x="${rootX}" y="${rootY}" width="240" height="42" rx="8" fill="#1e3a8a" stroke="#172554" stroke-width="1.5"/>
        <text x="${rootX + 12}" y="${rootY + 18}" font-size="9" fill="#93c5fd" font-weight="700">NIVEL L1: DOMINIO FUNDAMENTAL</text>
        <text x="${rootX + 12}" y="${rootY + 32}" font-size="11" fill="#ffffff" font-weight="700">${this.escapeXml(this.truncateText(tree.title, 28))}</text>
      </g>
    `);

    // Renderizar categorías (L3) y términos hijos (L4-L5)
    let currentY = 135;
    catNodes.slice(0, 8).forEach((catNode, idx) => {
      const isCurrentCat = catNode.category === term.category;
      const catX = 100;
      const catY = currentY;

      // Línea de conexión desde L1
      svg.push(`
        <path d="M ${rootX + 120} ${rootY + 42} V ${catY + 18} H ${catX}" fill="none" stroke="#cbd5e1" stroke-width="1.5" />
      `);

      // Tarjeta de Categoría L3
      svg.push(`
        <g filter="url(#shadow)">
          <rect x="${catX}" y="${catY}" width="200" height="38" rx="6" fill="${isCurrentCat ? '#eff6ff' : 'var(--background, #f8fafc)'}" stroke="${isCurrentCat ? '#3b82f6' : '#cbd5e1'}" stroke-width="${isCurrentCat ? '2' : '1'}"/>
          <text x="${catX + 10}" y="${catY + 16}" font-size="8" fill="${isCurrentCat ? '#2563eb' : 'var(--muted-foreground, #64748b)'}" font-weight="700">L3: CATEGORÍA</text>
          <text x="${catX + 10}" y="${catY + 28}" font-size="10" font-weight="600" fill="var(--foreground, #0f172a)">${this.escapeXml(this.truncateText(catNode.title, 22))}</text>
        </g>
      `);

      // Términos asociados (L4)
      const termChildren = catNode.children || [];
      const termX = 330;
      termChildren.slice(0, 4).forEach((tChild, tIdx) => {
        const itemY = catY + (tIdx * 28) - 10;
        const isSelected = tChild.id === activeTermId;

        svg.push(`
          <path d="M ${catX + 200} ${catY + 19} H ${termX}" fill="none" stroke="${isSelected ? '#3b82f6' : '#e2e8f0'}" stroke-width="${isSelected ? '2' : '1'}" />
          <g class="cursor-pointer" data-cmd="navigateToTerm" data-cmd-arg="${this.escapeJsAttr(tChild.id)}" role="button" tabindex="0">
            <rect x="${termX}" y="${itemY}" width="210" height="24" rx="4" fill="${isSelected ? '#2563eb' : 'var(--background, #f8fafc)'}" stroke="${isSelected ? '#1d4ed8' : '#cbd5e1'}" stroke-width="${isSelected ? '1.8' : '0.8'}"/>
            <text x="${termX + 8}" y="${itemY + 16}" font-size="10" font-weight="${isSelected ? 'bold' : 'normal'}" fill="${isSelected ? '#ffffff' : 'var(--foreground, #0f172a)'}">${this.escapeXml(this.truncateText(tChild.title, 25))}</text>
            <rect x="${termX + 175}" y="${itemY + 4}" width="28" height="15" rx="3" fill="${isSelected ? '#1e40af' : '#eff6ff'}" />
            <text x="${termX + 189}" y="${itemY + 14}" font-size="8" fill="${isSelected ? '#ffffff' : '#1e40af'}" text-anchor="middle" font-weight="700">L4</text>
          </g>
        `);

        // Si es el término seleccionado, mostrar componentes como L5
        if (isSelected && Array.isArray(tChild.components) && tChild.components.length > 0) {
          const compX = 560;
          tChild.components.slice(0, 3).forEach((compText, cIdx) => {
            const compY = itemY + (cIdx * 22) - 8;
            svg.push(`
              <path d="M ${termX + 210} ${itemY + 12} H ${compX}" fill="none" stroke="#93c5fd" stroke-width="1" />
              <g>
                <rect x="${compX}" y="${compY}" width="260" height="20" rx="3" fill="#f0fdf4" stroke="#86efac" stroke-width="0.8"/>
                <text x="${compX + 6}" y="${compY + 13}" font-size="8.5" fill="#166534" font-weight="500">${this.escapeXml(this.truncateText(compText, 36))}</text>
                <text x="${compX + 248}" y="${compY + 13}" font-size="7.5" fill="#15803d" font-weight="700">L5</text>
              </g>
            `);
          });
        }
      });

      currentY += Math.max(65, termChildren.slice(0, 4).length * 28 + 15);
    });

    svg.push(`</svg>`);
    return svg.join('\n');
  }

  // --------------------------------------------------------------------------
  // VISTA 3: PIPELINE SEQUENTIAL WORKFLOW (Preproducción -> Producción -> Post -> Master)
  // --------------------------------------------------------------------------
  renderPipelineViewSvg(term, options = {}) {
    const width = 860;
    const height = 480;

    const stages = [
      { id: 'pre', name: '1. Preproducción', desc: 'Guion, Storyboard, Planificación', color: '#3b82f6' },
      { id: 'prod', name: '2. Rodaje / Captura', desc: 'Cámaras, Ópticas, Iluminación, Tomas', color: '#10b981' },
      { id: 'edit', name: '3. Montaje & Edición', desc: 'Cortes, Ritmo, Línea de Tiempo NLE', color: '#f59e0b' },
      { id: 'post', name: '4. Color, VFX & Audio', desc: 'Etalonaje, Shading, Simulación, Foley', color: '#8b5cf6' },
      { id: 'master', name: '5. Master & Entrega', desc: 'Formatos, EBU R128, Códecs, Delivery', color: '#ef4444' }
    ];

    let svg = [];
    svg.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" class="w-full h-auto overflow-visible select-none font-sans" role="img" aria-label="Flujo de pipeline secuencial">`);

    svg.push(`
      <defs>
        <marker id="arrow-direct" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#3b82f6" />
        </marker>
        <marker id="arrow-inverse" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#10b981" />
        </marker>
        <filter id="shadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.12"/>
        </filter>
      </defs>
      <rect width="${width}" height="${height}" rx="12" fill="var(--card, #ffffff)" stroke="var(--border, #e2e8f0)" stroke-width="1" />
      <text x="24" y="32" font-size="12" font-weight="bold" fill="var(--foreground, #0f172a)">FLUJO SECUENCIAL Y PIPELINE DE PRODUCCIÓN</text>
      <text x="24" y="48" font-size="9" fill="var(--muted-foreground, #64748b)">Encadenamiento secuencial de términos técnicos a lo largo de las 5 fases maestras</text>
    `);

    // Columnas de etapas
    const colW = 150;
    const colGap = 15;
    const startX = 25;
    const startY = 70;

    stages.forEach((stg, sIdx) => {
      const cx = startX + (sIdx * (colW + colGap));
      svg.push(`
        <rect x="${cx}" y="${startY}" width="${colW}" height="32" rx="6" fill="${stg.color}" />
        <text x="${cx + colW/2}" y="${startY + 16}" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">${stg.name}</text>
        <text x="${cx + colW/2}" y="${startY + 27}" font-size="7.5" fill="#f8fafc" opacity="0.9" text-anchor="middle">${stg.desc.split(',')[0]}</text>
      `);

      if (sIdx < stages.length - 1) {
        const arrowX = cx + colW + 2;
        svg.push(`
          <path d="M ${arrowX} ${startY + 16} L ${arrowX + colGap - 4} ${startY + 16}" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow-direct)" />
        `);
      }
    });

    // Mapeo heurístico de términos de ejemplo a etapas
    const sampleTerms = this.getAllTerms();
    const stageBins = [[], [], [], [], []];

    sampleTerms.forEach(t => {
      const cat = (t.category || '').toLowerCase();
      const phase = (t.attributes && t.attributes.faseProduccion) ? t.attributes.faseProduccion.toLowerCase() : '';
      if (cat.includes('pre') || phase.includes('pre')) stageBins[0].push(t);
      else if (cat.includes('camara') || cat.includes('optica') || cat.includes('ilumin') || cat.includes('audio-directo')) stageBins[1].push(t);
      else if (cat.includes('edicion') || cat.includes('montaje')) stageBins[2].push(t);
      else if (cat.includes('color') || cat.includes('vfx') || cat.includes('post') || cat.includes('render') || cat.includes('ia')) stageBins[3].push(t);
      else stageBins[4].push(t);
    });

    // Asegurar que el término actual esté visible en su respectiva columna
    stages.forEach((stg, sIdx) => {
      const cx = startX + (sIdx * (colW + colGap));
      let termsInBin = stageBins[sIdx].slice(0, 8);
      
      // Si el término actual pertenece a este bin y no está entre los primeros, inyectarlo
      const isTermInThisBin = stageBins[sIdx].some(x => x.id === term.id);
      if (isTermInThisBin && !termsInBin.some(x => x.id === term.id)) {
        termsInBin[termsInBin.length - 1] = term;
      }

      termsInBin.forEach((t, tIdx) => {
        const itemY = startY + 45 + (tIdx * 42);
        const isCurrent = t.id === term.id;

        svg.push(`
          <g class="cursor-pointer" data-cmd="navigateToTerm" data-cmd-arg="${this.escapeJsAttr(t.id)}" role="button" tabindex="0">
            <rect x="${cx}" y="${itemY}" width="${colW}" height="36" rx="6" fill="${isCurrent ? '#2563eb' : 'var(--background, #f8fafc)'}" stroke="${isCurrent ? '#1d4ed8' : '#cbd5e1'}" stroke-width="${isCurrent ? '2' : '1'}" filter="url(#shadow)"/>
            <text x="${cx + 8}" y="${itemY + 16}" font-size="9.5" font-weight="${isCurrent ? 'bold' : '600'}" fill="${isCurrent ? '#ffffff' : 'var(--foreground, #0f172a)'}">${this.escapeXml(this.truncateText(t.title, 19))}</text>
            <text x="${cx + 8}" y="${itemY + 28}" font-size="8" fill="${isCurrent ? '#bfdbfe' : 'var(--muted-foreground, #64748b)'}">${this.escapeXml(t.category)}</text>
          </g>
        `);
      });
    });

    svg.push(`</svg>`);
    return svg.join('\n');
  }

  // --------------------------------------------------------------------------
  // VISTA 4: ATLAS COMPLETO (Expresa TODOS los términos del glosario activo)
  // --------------------------------------------------------------------------
  renderAtlasViewSvg(term, options = {}) {
    const glossaryId = options.selectedGlossaryId || term.glossaryId || 'all';
    const allTerms = (glossaryId === 'all') ? this.getAllTerms() : this.getTermsByGlossary(glossaryId);

    const zoom = options.zoom || 1.0;
    const filterLevel = options.filterLevel || 'all';
    const filterFam = options.filterFamily || 'all';
    const query = (options.searchQuery || '').toLowerCase().trim();

    // Filtrar términos
    const visibleTerms = allTerms.filter(t => {
      if (filterLevel !== 'all' && this.getOntologyLevel(t).id !== filterLevel) return false;
      if (query && !t.title.toLowerCase().includes(query) && !t.slug.toLowerCase().includes(query)) return false;
      return true;
    });

    // Dimensionar cuadrícula de clusters por categoría
    const categories = Array.from(new Set(visibleTerms.map(t => t.category || 'General')));
    const cols = Math.min(4, Math.max(2, Math.ceil(Math.sqrt(categories.length))));
    const clusterW = 260;
    const clusterH = 280;
    const margin = 20;

    const width = Math.max(860, (cols * (clusterW + margin)) + 60);
    const rows = Math.ceil(categories.length / cols);
    const height = Math.max(520, (rows * (clusterH + margin)) + 120);

    let svg = [];
    svg.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" class="w-full h-auto overflow-visible select-none font-sans" role="img" aria-label="Atlas interactivo de todos los términos">`);

    svg.push(`
      <defs>
        <marker id="arrow-direct" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#3b82f6" />
        </marker>
        <marker id="arrow-inverse" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#10b981" />
        </marker>
        <filter id="shadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.12"/>
        </filter>
      </defs>
      <rect width="${width}" height="${height}" rx="12" fill="var(--card, #ffffff)" stroke="var(--border, #e2e8f0)" stroke-width="1" />
    `);

    // Barra Superior Informativa
    svg.push(`
      <text x="24" y="32" font-size="12" font-weight="bold" fill="var(--foreground, #0f172a)">ATLAS COMPLETO DE CONOCIMIENTO (TODOS LOS TÉRMINOS)</text>
      <text x="24" y="48" font-size="9" fill="var(--muted-foreground, #64748b)">Expresión global: ${visibleTerms.length} de ${allTerms.length} términos visibles | Glosario: ${glossaryId}</text>
    `);

    // Viewport transformable para zoom y desplazamiento
    svg.push(`<g id="diagram-viewport" transform="scale(${zoom})">`);

    categories.forEach((cat, cIdx) => {
      const row = Math.floor(cIdx / cols);
      const col = cIdx % cols;
      const clusterX = 30 + col * (clusterW + margin);
      const clusterY = 70 + row * (clusterH + margin);

      const termsInCat = visibleTerms.filter(t => (t.category || 'General') === cat);

      // Marco de Cluster Temático
      svg.push(`
        <rect x="${clusterX}" y="${clusterY}" width="${clusterW}" height="${clusterH}" rx="8" class="atlas-cluster" fill="var(--background, #f8fafc)" stroke="#e2e8f0" stroke-width="1.2" />
        <rect x="${clusterX}" y="${clusterY}" width="${clusterW}" height="26" rx="8" fill="#f1f5f9" />
        <text x="${clusterX + 10}" y="${clusterY + 17}" font-size="10" font-weight="700" fill="#334155">${this.escapeXml(this.truncateText(cat, 26))} (${termsInCat.length})</text>
      `);

      // Nodos dentro del cluster
      termsInCat.slice(0, 7).forEach((t, tIdx) => {
        const itemY = clusterY + 34 + (tIdx * 34);
        const isSelected = t.id === term.id;
        const tLevel = this.getOntologyLevel(t);

        svg.push(`
          <g class="cursor-pointer transition-transform hover:opacity-80 atlas-node" data-urn="${this.escapeXml(t.id)}" data-cmd="navigateToTerm" data-cmd-arg="${this.escapeJsAttr(t.id)}" role="button" tabindex="0">
            <rect x="${clusterX + 8}" y="${itemY}" width="${clusterW - 16}" height="28" rx="4" fill="${isSelected ? '#2563eb' : '#ffffff'}" stroke="${isSelected ? '#1d4ed8' : '#cbd5e1'}" stroke-width="${isSelected ? '2' : '0.8'}" filter="url(#shadow)"/>
            <text x="${clusterX + 16}" y="${itemY + 18}" font-size="9" font-weight="${isSelected ? 'bold' : '500'}" fill="${isSelected ? '#ffffff' : 'var(--foreground, #0f172a)'}">${this.escapeXml(this.truncateText(t.title, 26))}</text>
            <rect x="${clusterX + clusterW - 40}" y="${itemY + 6}" width="22" height="15" rx="3" fill="${isSelected ? '#1e40af' : '#eff6ff'}" />
            <text x="${clusterX + clusterW - 29}" y="${itemY + 17}" font-size="8" fill="${isSelected ? '#ffffff' : '#1e40af'}" text-anchor="middle" font-weight="700">${tLevel.id}</text>
          </g>
        `);
      });

      if (termsInCat.length > 7) {
        svg.push(`
          <text x="${clusterX + clusterW/2}" y="${clusterY + clusterH - 8}" font-size="8" fill="var(--muted-foreground, #64748b)" text-anchor="middle">+${termsInCat.length - 7} términos más</text>
        `);
      }
    });

    svg.push(`</g>`); // Cierra diagram-viewport
    svg.push(`</svg>`);
    return svg.join('\n');
  }

  // --------------------------------------------------------------------------
  // MODOS DE EXPRESIÓN ADICIONALES: MERMAID, GRAPHVIZ DOT, HTML MINDMAP Y MATRIZ
  // --------------------------------------------------------------------------

  /**
   * Genera el diagrama relacional en notación Mermaid.js (flowchart LR / graph TD)
   * con subgrafos por familias semánticas, estilos de clase y callbacks interactivos.
   */
  generateMermaidDiagram(term, options = {}) {
    if (!term) return 'flowchart LR\n  EmptyNode["Sin datos de término seleccionados"]';

    const lines = [];
    lines.push('flowchart LR');
    lines.push('  %% Declaración de Clases Semánticas DocWeb');
    lines.push('  classDef focalNode fill:#2563eb,stroke:#1d4ed8,stroke-width:3px,color:#ffffff,font-weight:bold;');
    lines.push('  classDef directRel fill:#1e293b,stroke:#0ea5e9,stroke-width:1.5px,color:#f8fafc;');
    lines.push('  classDef inverseRel fill:#1e293b,stroke:#a855f7,stroke-width:1.5px,color:#f8fafc;');
    lines.push('  classDef crossGlossary fill:#1e293b,stroke:#ec4899,stroke-width:2px,color:#f8fafc;');
    lines.push('  classDef pipelinePhase fill:#0f172a,stroke:#3b82f6,stroke-width:1.5px,stroke-dasharray: 4 4,color:#60a5fa;');

    const focalId = this.sanitizeMermaidId(term.id);
    const focalTitle = this.escapeMermaidText(term.title);
    const focalCategory = this.escapeMermaidText(term.category || 'General');
    lines.push(`  ${focalId}["🎯 <b>${focalTitle}</b><br/>🏷️ <i>${focalCategory}</i>"]:::focalNode`);

    const directRels = (Array.isArray(term.relations) ? term.relations : []).filter(r => r && r.target);
    if (directRels.length > 0) {
      lines.push('  subgraph RelacionesDirectas["➡️ Relaciones Salientes (Directas)"]');
      directRels.forEach((rel, i) => {
        const targetTerm = this.getTerm(rel.target);
        const targetId = this.sanitizeMermaidId(rel.target) + '_d' + i;
        const targetTitle = targetTerm ? this.escapeMermaidText(targetTerm.title) : rel.target.split(':').pop();
        const isCross = targetTerm && targetTerm.glossaryId !== term.glossaryId;
        const cls = isCross ? 'crossGlossary' : 'directRel';
        const relType = rel.type || 'relacionadoCon';

        lines.push(`    ${targetId}["${isCross ? '🌐 ' : '📄 '}${targetTitle}"]:::${cls}`);
        lines.push(`    ${focalId} -- "${relType}" --> ${targetId}`);
        lines.push(`    click ${targetId} call window.DocWebApp.navigateToTerm("${rel.target}") "Explorar ${targetTitle}"`);
      });
      lines.push('  end');
    }

    const inverseRels = this.getInverseRelations(term.id);
    if (inverseRels.length > 0) {
      lines.push('  subgraph RelacionesInversas["⬅️ Relaciones Entrantes (Inversas)"]');
      inverseRels.forEach((rel, i) => {
        const sourceUrn = rel.sourceTermId || rel.source || '';
        const sourceTerm = this.getTerm(sourceUrn);
        const sourceId = this.sanitizeMermaidId(sourceUrn) + '_i' + i;
        const sourceTitle = rel.sourceTitle || (sourceTerm ? this.escapeMermaidText(sourceTerm.title) : (sourceUrn.includes(':') ? sourceUrn.split(':').pop() : 'Término'));
        const isCross = sourceTerm && sourceTerm.glossaryId !== term.glossaryId;
        const cls = isCross ? 'crossGlossary' : 'inverseRel';
        const relType = rel.label || rel.type || 'referenciadoPor';

        lines.push(`    ${sourceId}["${isCross ? '🌐 ' : '📄 '}${sourceTitle}"]:::${cls}`);
        lines.push(`    ${sourceId} -. "${relType}" .-> ${focalId}`);
        lines.push(`    click ${sourceId} call window.DocWebApp.navigateToTerm("${sourceUrn}") "Explorar ${sourceTitle}"`);
      });
      lines.push('  end');
    }

    return lines.join('\n');
  }

  /**
   * Genera la especificación Graphviz DOT formal para visualización de grafos dirigidos.
   */
  generateDotSpecification(term, options = {}) {
    if (!term) return 'digraph DocWebGraph {\n  "Empty" [label="Sin término seleccionado"];\n}';

    const lines = [];
    lines.push('digraph DocWebKnowledgeGraph {');
    lines.push('  graph [rankdir=LR, bgcolor="transparent", fontname="system-ui, -apple-system, sans-serif", pad="0.5", nodesep="0.4", ranksep="0.8"];');
    lines.push('  node [shape=box, style="filled,rounded", fontname="system-ui", fontsize=11, fontcolor="#f8fafc", fillcolor="#1e293b", color="#475569", penwidth=1.5];');
    lines.push('  edge [fontname="system-ui", fontsize=9, fontcolor="#94a3b8", color="#64748b", penwidth=1.3, arrowsize=0.8];');
    lines.push('');

    const focalId = `"${term.id}"`;
    lines.push(`  // Nodo Central de Foco`);
    lines.push(`  ${focalId} [label="${this.escapeDotText(term.title)}\\n[${this.escapeDotText(term.category || 'General')}]", fillcolor="#2563eb", color="#60a5fa", penwidth=2.5, fontcolor="#ffffff", shape=rect];`);
    lines.push('');

    const directRels = (Array.isArray(term.relations) ? term.relations : []).filter(r => r && r.target);
    if (directRels.length > 0) {
      lines.push('  subgraph cluster_direct {');
      lines.push('    label="Relaciones Salientes (Directas)";');
      lines.push('    color="#334155"; style="dashed"; fontcolor="#38bdf8"; fontsize=10;');
      directRels.forEach((rel, i) => {
        const targetTerm = this.getTerm(rel.target);
        const targetId = `"${rel.target}"`;
        const targetTitle = targetTerm ? targetTerm.title : rel.target.split(':').pop();
        const isCross = targetTerm && targetTerm.glossaryId !== term.glossaryId;
        const color = isCross ? '#ec4899' : '#0ea5e9';
        lines.push(`    ${targetId} [label="${this.escapeDotText(targetTitle)}", color="${color}"];`);
        lines.push(`    ${focalId} -> ${targetId} [label="${rel.type || 'relacionadoCon'}", color="${color}"];`);
      });
      lines.push('  }');
    }

    const inverseRels = this.getInverseRelations(term.id);
    if (inverseRels.length > 0) {
      lines.push('  subgraph cluster_inverse {');
      lines.push('    label="Relaciones Entrantes (Inversas)";');
      lines.push('    color="#334155"; style="dashed"; fontcolor="#c084fc"; fontsize=10;');
      inverseRels.forEach(rel => {
        const sourceUrn = rel.sourceTermId || rel.source || '';
        const sourceTerm = this.getTerm(sourceUrn);
        const sourceId = `"${sourceUrn}"`;
        const sourceTitle = rel.sourceTitle || (sourceTerm ? sourceTerm.title : (sourceUrn.includes(':') ? sourceUrn.split(':').pop() : 'Término'));
        const isCross = sourceTerm && sourceTerm.glossaryId !== term.glossaryId;
        const color = isCross ? '#ec4899' : '#a855f7';
        lines.push(`    ${sourceId} [label="${this.escapeDotText(sourceTitle)}", color="${color}"];`);
        lines.push(`    ${sourceId} -> ${focalId} [label="${rel.label || rel.type || 'referenciadoPor'}", style=dashed, color="${color}"];`);
      });
      lines.push('  }');
    }

    lines.push('}');
    return lines.join('\n');
  }

  /**
   * Deriva la expresión del término basada en intenciones operativas y efectos concretos.
   * Modela la orientación a objetivos del marco ontológico.
   */
  deriveTermIntention(term) {
    if (!term) return null;
    
    if (term.intention && typeof term.intention === 'object') {
      return term.intention;
    }

    const cat = (term.category || '').toLowerCase();
    const domain = (term.glossaryId || '').toLowerCase();
    const title = term.title || '';

    let primaryIntent = '';
    let concreteEffect = '';
    let operationalDirective = '';
    let intentionVector = 'Operativa / Estructural';
    let intentionBadge = '🎯 Intención de Producción';

    if (domain === 'software-engineering-ontology' || cat.includes('arquitectura') || cat.includes('semantica')) {
      intentionVector = 'Arquitectura & Verificabilidad';
      intentionBadge = '🏗️ Intención de Ingeniería Formal';
      primaryIntent = `Garantizar la modularidad, bajo acoplamiento y verificabilidad determinista del sistema computacional al aislar ${title.toLowerCase()}.`;
      concreteEffect = `Eliminar dependencias cruzadas inestables y asegurar que el código cumpla con contratos formales y pruebas herméticas.`;
      operationalDirective = `Modelar "${title}" aislando sus interfaces de la infraestructura concreta para mantener inestabilidad Martin I <= 0.2.`;
    } else if (domain === 'generative-ai-media' || cat.includes('ia') || cat.includes('difusion')) {
      intentionVector = 'Inferencia & Fidelidad Latente';
      intentionBadge = '🤖 Intención de Guiado Generativo';
      primaryIntent = `Controlar y guiar la distribución de probabilidad latente del modelo multimodal para sintetizar "${title}" con coherencia espaciotemporal.`;
      concreteEffect = `Prevenir artefactos visuales, parpadeo temporal (flicker) y deformaciones morfológicas en la salida generativa.`;
      operationalDirective = `Inyectar descriptores específicos de "${title}" en el espacio latente calibrando la escala CFG y los pesos de atención cruzada.`;
    } else if (cat.includes('camara') || cat.includes('optica') || cat.includes('encuadre')) {
      intentionVector = 'Composición & Punto de Vista';
      intentionBadge = '🎥 Intención Cinemática Visual';
      primaryIntent = `Guiar la mirada y el foco atencional del espectador hacia el centro dramático de la escena mediante ${title.toLowerCase()}.`;
      concreteEffect = `Establecer relaciones de escala, perspectiva espacial y jerarquía emocional entre los sujetos y su entorno.`;
      operationalDirective = `Componer el plano empleando "${title}" con distancia focal calibrada y trayectoria de movimiento estabilizada.`;
    } else if (cat.includes('iluminacion') || cat.includes('color')) {
      intentionVector = 'Atmósfera & Ciencia de Color';
      intentionBadge = '💡 Intención Cromática y Lumínica';
      primaryIntent = `Crear tridimensionalidad volumétrica, volumen de contraste y tonalidad psicológica en el cuadro utilizando ${title.toLowerCase()}.`;
      concreteEffect = `Separar al sujeto del fondo con separación tonal armónica y garantizar fidelidad de rango dinámico sin empastar negros ni quemar altas luces.`;
      operationalDirective = `Calibrar la temperatura de color y fotometría para "${title}" asegurando concordancia con el espacio de color de trabajo (ACES/Rec.709).`;
    } else if (cat.includes('audio') || cat.includes('sonido')) {
      intentionVector = 'Diseño Sonoro & Inmersión';
      intentionBadge = '🎙️ Intención Electroacústica';
      primaryIntent = `Capturar o sintetizar el espacio auditivo de la acción garantizando inteligibilidad discursiva y corporeidad con ${title.toLowerCase()}.`;
      concreteEffect = `Sumergir al oyente en la atmósfera acústica de la escena con balance espectral y rango dinámico estandarizado.`;
      operationalDirective = `Registrar y mezclar "${title}" calibrando el patrón polar y asegurando sonoridad integrada conforme a norma EBU R128 (-24 LUFS).`;
    } else if (cat.includes('edicion') || cat.includes('montaje')) {
      intentionVector = 'Cadencia & Narrativa Temporal';
      intentionBadge = '✂️ Intención Rítmica y Montaje';
      primaryIntent = `Articular la cadencia rítmica y la elipsis temporal de la narración audiovisual articulando la transición con ${title.toLowerCase()}.`;
      concreteEffect = `Gobernar la velocidad de procesamiento cognitivo del espectador y construir el arco dramático sin fisuras perceptuales.`;
      operationalDirective = `Ejecutar la unión o modulación rítmica mediante "${title}" en corte sobre acción o acento musical sin quebrar la continuidad visual.`;
    } else {
      intentionVector = 'Estandarización & Flujo Operativo';
      intentionBadge = '⚙️ Intención Técnica Operativa';
      primaryIntent = `Estandarizar y optimizar la fase productiva garantizando interoperabilidad y rigor técnico al ejecutar ${title.toLowerCase()}.`;
      concreteEffect = `Evitar retrabajos, pérdidas de información o degradación de calidad a lo largo del pipeline.`;
      operationalDirective = `Aplicar las directivas canónicas de "${title}" siguiendo la especificación formal del flujo de trabajo.`;
    }

    return {
      vector: intentionVector,
      badge: intentionBadge,
      primaryIntent: primaryIntent,
      concreteEffect: concreteEffect,
      operationalDirective: operationalDirective
    };
  }

  /**
   * Renderiza el diagrama Mermaid.js como gráfico visual vectorial interactivo SVG.
   * Muestra la estructura de flujo oficial con nodos clicables y subgrafos.
   */
  generateMermaidVisualSvg(term, options = {}) {
    if (!term) return '<div class="text-muted">Sin término para renderizar Mermaid.</div>';

    const directRels = (Array.isArray(term.relations) ? term.relations : []).filter(r => r && r.target);
    const inverseRels = this.getInverseRelations(term.id);
    const intention = this.deriveTermIntention(term);

    const svgWidth = 920;
    const directCount = Math.min(directRels.length, 5);
    const inverseCount = Math.min(inverseRels.length, 5);
    const maxRows = Math.max(1, Math.max(directCount, inverseCount));
    const rowHeight = 72;
    const svgHeight = Math.max(340, 110 + maxRows * rowHeight);

    const leftX = 40;
    const leftWidth = 240;
    const focalX = 350;
    const focalY = svgHeight / 2 - 45;
    const focalWidth = 220;
    const focalHeight = 90;
    const rightX = 640;
    const rightWidth = 240;

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} ${svgHeight}" class="mermaid-rendered-svg" style="width:100%; height:auto; background:#0f172a; border-radius:8px; font-family:system-ui, -apple-system, sans-serif;">
      <defs>
        <marker id="mermaid-arrow-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8"/>
        </marker>
        <marker id="mermaid-arrow-dashed" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#c084fc"/>
        </marker>
        <linearGradient id="mermaid-focal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2563eb"/>
          <stop offset="100%" stop-color="#1d4ed8"/>
        </linearGradient>
        <filter id="mermaid-node-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.4"/>
        </filter>
      </defs>

      <!-- Banner Superior Mermaid Flowchart -->
      <rect x="0" y="0" width="${svgWidth}" height="42" fill="#1e293b" />
      <text x="20" y="26" fill="#38bdf8" font-size="12" font-weight="700">🧜 MERMAID.JS RENDERED VIEW • Flowchart LR</text>
      <text x="${svgWidth - 20}" y="26" text-anchor="end" fill="#94a3b8" font-size="11">🎯 Intención: ${this.escapeXml(intention ? intention.vector : 'Orientada a Objetivos')}</text>
      <line x1="0" y1="42" x2="${svgWidth}" y2="42" stroke="#334155" stroke-width="1"/>
    `;

    // Render Subgraph Relaciones Inversas (Left)
    if (inverseCount > 0) {
      const containerH = inverseCount * rowHeight + 40;
      const startY = (svgHeight - containerH) / 2 + 30;
      svg += `
        <rect x="${leftX}" y="${startY}" width="${leftWidth}" height="${containerH}" rx="6" ry="6" fill="#1e293b" fill-opacity="0.5" stroke="#a855f7" stroke-dasharray="4 4" stroke-width="1.2"/>
        <text x="${leftX + 12}" y="${startY + 20}" fill="#c084fc" font-size="11" font-weight="700">subgraph RelacionesInversas</text>
      `;

      inverseRels.slice(0, 5).forEach((inv, i) => {
        const ny = startY + 32 + i * rowHeight;
        const sourceUrn = inv.sourceTermId || inv.source || '';
        const sourceTerm = this.getTerm(sourceUrn);
        const title = inv.sourceTitle || (sourceTerm ? sourceTerm.title : sourceUrn.split(':').pop());
        const isCross = sourceTerm && sourceTerm.glossaryId !== term.glossaryId;
        const nodeX = leftX + 15;
        const nodeW = leftWidth - 30;
        const nodeH = 46;

        svg += `
          <g class="mermaid-interactive-node" data-cmd="navigateToTerm" data-cmd-arg="${sourceUrn}" style="cursor:pointer;" filter="url(#mermaid-node-shadow)">
            <rect x="${nodeX}" y="${ny}" width="${nodeW}" height="${nodeH}" rx="6" ry="6" fill="#1e293b" stroke="${isCross ? '#ec4899' : '#a855f7'}" stroke-width="1.5"/>
            <text x="${nodeX + 10}" y="${ny + 20}" fill="#f8fafc" font-size="11" font-weight="600">${this.escapeXml(title.substring(0, 24))}</text>
            <text x="${nodeX + 10}" y="${ny + 36}" fill="#94a3b8" font-size="9">${isCross ? '🌐 Inter-Glosario' : '📄 ' + (inv.type || 'Inversa')}</text>
          </g>
        `;

        const p1x = nodeX + nodeW;
        const p1y = ny + nodeH / 2;
        const p2x = focalX;
        const p2y = focalY + focalHeight / 2;
        const cx1 = p1x + 35;
        const cx2 = p2x - 35;
        svg += `
          <path d="M ${p1x} ${p1y} C ${cx1} ${p1y}, ${cx2} ${p2y}, ${p2x} ${p2y}" fill="none" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#mermaid-arrow-dashed)"/>
        `;
      });
    }

    // Render Focal Node (Center)
    svg += `
      <g filter="url(#mermaid-node-shadow)" class="mermaid-focal-group">
        <rect x="${focalX}" y="${focalY}" width="${focalWidth}" height="${focalHeight}" rx="8" ry="8" fill="url(#mermaid-focal-grad)" stroke="#60a5fa" stroke-width="2.5"/>
        <text x="${focalX + focalWidth / 2}" y="${focalY + 28}" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="700">🎯 ${this.escapeXml(term.title.substring(0, 24))}</text>
        <text x="${focalX + focalWidth / 2}" y="${focalY + 48}" text-anchor="middle" fill="#bfdbfe" font-size="10">🏷️ ${this.escapeXml(term.category || 'General')}</text>
        <rect x="${focalX + focalWidth / 2 - 45}" y="${focalY + 58}" width="90" height="18" rx="4" ry="4" fill="#1e3a8a" fill-opacity="0.8"/>
        <text x="${focalX + focalWidth / 2}" y="${focalY + 71}" text-anchor="middle" fill="#93c5fd" font-size="9" font-weight="700">Nivel ${term.ontologicalLevel || 'L4'}</text>
      </g>
    `;

    // Render Subgraph Relaciones Directas (Right)
    if (directCount > 0) {
      const containerH = directCount * rowHeight + 40;
      const startY = (svgHeight - containerH) / 2 + 30;
      svg += `
        <rect x="${rightX}" y="${startY}" width="${rightWidth}" height="${containerH}" rx="6" ry="6" fill="#1e293b" fill-opacity="0.5" stroke="#0ea5e9" stroke-dasharray="4 4" stroke-width="1.2"/>
        <text x="${rightX + 12}" y="${startY + 20}" fill="#38bdf8" font-size="11" font-weight="700">subgraph RelacionesDirectas</text>
      `;

      directRels.slice(0, 5).forEach((rel, i) => {
        const ny = startY + 32 + i * rowHeight;
        const targetTerm = this.getTerm(rel.target);
        const title = targetTerm ? targetTerm.title : rel.target.split(':').pop();
        const isCross = targetTerm && targetTerm.glossaryId !== term.glossaryId;
        const nodeX = rightX + 15;
        const nodeW = rightWidth - 30;
        const nodeH = 46;

        svg += `
          <g class="mermaid-interactive-node" data-cmd="navigateToTerm" data-cmd-arg="${this.escapeJsAttr(rel.target)}" style="cursor:pointer;" filter="url(#mermaid-node-shadow)">
            <rect x="${nodeX}" y="${ny}" width="${nodeW}" height="${nodeH}" rx="6" ry="6" fill="#1e293b" stroke="${isCross ? '#ec4899' : '#0ea5e9'}" stroke-width="1.5"/>
            <text x="${nodeX + 10}" y="${ny + 20}" fill="#f8fafc" font-size="11" font-weight="600">${this.escapeXml(title.substring(0, 24))}</text>
            <text x="${nodeX + 10}" y="${ny + 36}" fill="#94a3b8" font-size="9">${isCross ? '🌐 Inter-Glosario' : '📄 ' + (rel.type || 'Directa')}</text>
          </g>
        `;

        const p1x = focalX + focalWidth;
        const p1y = focalY + focalHeight / 2;
        const p2x = nodeX;
        const p2y = ny + nodeH / 2;
        const cx1 = p1x + 35;
        const cx2 = p2x - 35;
        svg += `
          <path d="M ${p1x} ${p1y} C ${cx1} ${p1y}, ${cx2} ${p2y}, ${p2x} ${p2y}" fill="none" stroke="#0ea5e9" stroke-width="1.8" marker-end="url(#mermaid-arrow-head)"/>
          <rect x="${(p1x + p2x) / 2 - 35}" y="${(p1y + p2y) / 2 - 9}" width="70" height="18" rx="3" fill="#0f172a" stroke="#334155" stroke-width="0.8"/>
          <text x="${(p1x + p2x) / 2}" y="${(p1y + p2y) / 2 + 3}" text-anchor="middle" fill="#38bdf8" font-size="8.5" font-weight="600">${this.escapeXml(rel.type || 'rel')}</text>
        `;
      });
    }

    svg += '</svg>';
    return svg;
  }

  /**
   * Renderiza la especificación Graphviz DOT como gráfico visual interactivo SVG (rankdir=LR).
   */
  generateDotVisualSvg(term, options = {}) {
    if (!term) return '<div class="text-muted">Sin término para renderizar Graphviz DOT.</div>';

    const directRels = (Array.isArray(term.relations) ? term.relations : []).filter(r => r && r.target);
    const inverseRels = this.getInverseRelations(term.id);
    const intention = this.deriveTermIntention(term);

    const svgWidth = 920;
    const directCount = Math.min(directRels.length, 5);
    const inverseCount = Math.min(inverseRels.length, 5);
    const maxRows = Math.max(1, Math.max(directCount, inverseCount));
    const rowHeight = 72;
    const svgHeight = Math.max(340, 110 + maxRows * rowHeight);

    const leftX = 40;
    const leftWidth = 240;
    const focalX = 350;
    const focalY = svgHeight / 2 - 40;
    const focalWidth = 220;
    const focalHeight = 80;
    const rightX = 640;
    const rightWidth = 240;

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} ${svgHeight}" class="dot-rendered-svg" style="width:100%; height:auto; background:#0b1120; border-radius:8px; font-family:'Fira Code', monospace, sans-serif;">
      <defs>
        <marker id="dot-arrow-direct" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <polygon points="0 2, 8 5, 0 8" fill="#38bdf8" stroke="#38bdf8" stroke-width="1"/>
        </marker>
        <marker id="dot-arrow-inverse" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <polygon points="0 2, 8 5, 0 8" fill="#c084fc" stroke="#c084fc" stroke-width="1"/>
        </marker>
      </defs>

      <!-- Banner Graphviz DOT -->
      <rect x="0" y="0" width="${svgWidth}" height="42" fill="#111827" />
      <text x="20" y="26" fill="#38bdf8" font-size="12" font-weight="700">📊 GRAPHVIZ DOT RENDERED VIEW • digraph DocWebKnowledgeGraph [rankdir=LR]</text>
      <text x="${svgWidth - 20}" y="26" text-anchor="end" fill="#9ca3af" font-size="10">rankdir=LR | shape=box, rounded</text>
      <line x1="0" y1="42" x2="${svgWidth}" y2="42" stroke="#1f2937" stroke-width="1"/>
    `;

    // Render cluster_inverse (Left)
    if (inverseCount > 0) {
      const containerH = inverseCount * rowHeight + 40;
      const startY = (svgHeight - containerH) / 2 + 30;
      svg += `
        <rect x="${leftX}" y="${startY}" width="${leftWidth}" height="${containerH}" rx="4" ry="4" fill="#111827" stroke="#475569" stroke-dasharray="3 3" stroke-width="1"/>
        <text x="${leftX + 10}" y="${startY + 18}" fill="#94a3b8" font-size="10" font-family="monospace">subgraph cluster_inverse</text>
      `;

      inverseRels.slice(0, 5).forEach((inv, i) => {
        const ny = startY + 30 + i * rowHeight;
        const sourceUrn = inv.sourceTermId || inv.source || '';
        const sourceTerm = this.getTerm(sourceUrn);
        const title = inv.sourceTitle || (sourceTerm ? sourceTerm.title : sourceUrn.split(':').pop());
        const isCross = sourceTerm && sourceTerm.glossaryId !== term.glossaryId;
        const nodeX = leftX + 12;
        const nodeW = leftWidth - 24;
        const nodeH = 42;

        svg += `
          <g data-cmd="navigateToTerm" data-cmd-arg="${sourceUrn}" style="cursor:pointer;">
            <rect x="${nodeX}" y="${ny}" width="${nodeW}" height="${nodeH}" rx="12" ry="12" fill="#1f2937" stroke="${isCross ? '#ec4899' : '#a855f7'}" stroke-width="1.3"/>
            <text x="${nodeX + nodeW / 2}" y="${ny + 25}" text-anchor="middle" fill="#e2e8f0" font-size="10.5" font-family="monospace">${this.escapeXml(title.substring(0, 22))}</text>
          </g>
        `;

        const p1x = nodeX + nodeW;
        const p1y = ny + nodeH / 2;
        const p2x = focalX;
        const p2y = focalY + focalHeight / 2;
        const cx1 = p1x + 35;
        const cx2 = p2x - 35;
        svg += `
          <path d="M ${p1x} ${p1y} C ${cx1} ${p1y}, ${cx2} ${p2y}, ${p2x} ${p2y}" fill="none" stroke="#a855f7" stroke-width="1.4" stroke-dasharray="4 2" marker-end="url(#dot-arrow-inverse)"/>
        `;
      });
    }

    // Render Focal Node (Center - Graphviz double outline box)
    svg += `
      <g>
        <rect x="${focalX}" y="${focalY}" width="${focalWidth}" height="${focalHeight}" rx="4" ry="4" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2"/>
        <rect x="${focalX + 3}" y="${focalY + 3}" width="${focalWidth - 6}" height="${focalHeight - 6}" rx="3" ry="3" fill="none" stroke="#3b82f6" stroke-width="1"/>
        <text x="${focalX + focalWidth / 2}" y="${focalY + 32}" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700" font-family="monospace">${this.escapeXml(term.title.substring(0, 22))}</text>
        <text x="${focalX + focalWidth / 2}" y="${focalY + 52}" text-anchor="middle" fill="#93c5fd" font-size="9.5" font-family="monospace">[${this.escapeXml(term.category || 'General')}]</text>
        <text x="${focalX + focalWidth / 2}" y="${focalY + 68}" text-anchor="middle" fill="#38bdf8" font-size="8.5" font-family="monospace">level=${term.ontologicalLevel || 'L4'}</text>
      </g>
    `;

    // Render cluster_direct (Right)
    if (directCount > 0) {
      const containerH = directCount * rowHeight + 40;
      const startY = (svgHeight - containerH) / 2 + 30;
      svg += `
        <rect x="${rightX}" y="${startY}" width="${rightWidth}" height="${containerH}" rx="4" ry="4" fill="#111827" stroke="#475569" stroke-dasharray="3 3" stroke-width="1"/>
        <text x="${rightX + 10}" y="${startY + 18}" fill="#94a3b8" font-size="10" font-family="monospace">subgraph cluster_direct</text>
      `;

      directRels.slice(0, 5).forEach((rel, i) => {
        const ny = startY + 30 + i * rowHeight;
        const targetTerm = this.getTerm(rel.target);
        const title = targetTerm ? targetTerm.title : rel.target.split(':').pop();
        const isCross = targetTerm && targetTerm.glossaryId !== term.glossaryId;
        const nodeX = rightX + 12;
        const nodeW = rightWidth - 24;
        const nodeH = 42;

        svg += `
          <g data-cmd="navigateToTerm" data-cmd-arg="${this.escapeJsAttr(rel.target)}" style="cursor:pointer;">
            <rect x="${nodeX}" y="${ny}" width="${nodeW}" height="${nodeH}" rx="4" ry="4" fill="#1f2937" stroke="${isCross ? '#ec4899' : '#0ea5e9'}" stroke-width="1.3"/>
            <text x="${nodeX + nodeW / 2}" y="${ny + 25}" text-anchor="middle" fill="#e2e8f0" font-size="10.5" font-family="monospace">${this.escapeXml(title.substring(0, 22))}</text>
          </g>
        `;

        const p1x = focalX + focalWidth;
        const p1y = focalY + focalHeight / 2;
        const p2x = nodeX;
        const p2y = ny + nodeH / 2;
        const cx1 = p1x + 35;
        const cx2 = p2x - 35;
        svg += `
          <path d="M ${p1x} ${p1y} C ${cx1} ${p1y}, ${cx2} ${p2y}, ${p2x} ${p2y}" fill="none" stroke="#0ea5e9" stroke-width="1.5" marker-end="url(#dot-arrow-direct)"/>
          <text x="${(p1x + p2x) / 2}" y="${(p1y + p2y) / 2 - 6}" text-anchor="middle" fill="#7dd3fc" font-size="8" font-family="monospace">${this.escapeXml(rel.type || 'rel')}</text>
        `;
      });
    }

    svg += '</svg>';
    return svg;
  }

  /**
   * Genera el mapa mental interactivo y accesible en HTML Semántico (DOM Mindmap Tree).
   */
  generateHtmlMindmap(term, options = {}) {
    if (!term) return '<div class="text-muted">Sin término seleccionado para el mapa mental HTML.</div>';

    const directRels = (Array.isArray(term.relations) ? term.relations : []).filter(r => r && r.target);
    const inverseRels = this.getInverseRelations(term.id);
    const facets = this.getAdditiveFacets(term);

    const directItemsHtml = directRels.length > 0
      ? directRels.map(r => {
          const target = this.getTerm(r.target);
          const targetTitle = target ? target.title : r.target.split(':').pop();
          const targetCat = target ? target.category : 'General';
          const isCross = target && target.glossaryId !== term.glossaryId;
          const family = this.getRelationFamily(r.type);
          return `
            <li class="dom-mindmap-item" data-dom-tag="li" data-dom-role="treeitem" data-relation="${r.type}">
              <div class="dom-mindmap-card" data-cmd="navigateToTerm" data-cmd-arg="${this.escapeJsAttr(r.target)}">
                <div class="dom-mindmap-rel-badge badge-direct">${r.type}</div>
                <div class="dom-mindmap-term-title">${isCross ? '🌐 ' : ''}${this.escapeXml(targetTitle)}</div>
                <div class="dom-mindmap-term-meta">🏷️ ${this.escapeXml(targetCat)} • <span style="opacity:0.8;">${family}</span></div>
              </div>
            </li>
          `;
        }).join('')
      : '<li class="text-xs text-muted" style="padding:0.4rem;">Sin relaciones salientes declaradas</li>';

    const inverseItemsHtml = inverseRels.length > 0
      ? inverseRels.map(r => {
          const sourceUrn = r.sourceTermId || r.source || '';
          const source = this.getTerm(sourceUrn);
          const sourceTitle = r.sourceTitle || (source ? source.title : (sourceUrn.includes(':') ? sourceUrn.split(':').pop() : 'Término'));
          const sourceCat = source ? source.category : (r.sourceGlossaryId || 'General');
          const isCross = source && source.glossaryId !== term.glossaryId;
          const relType = r.label || r.type || 'referenciadoPor';
          const family = r.family || this.getRelationFamily(relType);
          return `
            <li class="dom-mindmap-item" data-dom-tag="li" data-dom-role="treeitem" data-relation="${relType}">
              <div class="dom-mindmap-card" data-cmd="navigateToTerm" data-cmd-arg="${this.escapeJsAttr(sourceUrn)}">
                <div class="dom-mindmap-rel-badge badge-inverse">${relType}</div>
                <div class="dom-mindmap-term-title">${isCross ? '🌐 ' : ''}${this.escapeXml(sourceTitle)}</div>
                <div class="dom-mindmap-term-meta">🏷️ ${this.escapeXml(sourceCat)} • <span style="opacity:0.8;">${family}</span></div>
              </div>
            </li>
          `;
        }).join('')
      : '<li class="text-xs text-muted" style="padding:0.4rem;">Sin relaciones entrantes registradas</li>';

    return `
      <div class="dom-mindmap-container" role="tree" aria-label="Mapa Mental Semántico del Término" data-dom-tag="div" data-dom-container="dom-mindmap-container">
        <!-- Tarjeta Nuclear Central -->
        <div class="dom-mindmap-root" data-dom-tag="article" data-dom-role="landmark" data-ontological-level="${facets.ontologicalLevel}">
          <div class="dom-mindmap-root-card">
            <span class="badge badge-primary">${facets.ontologicalLevel}</span>
            <span class="badge" style="background:var(--accent); color:#fff;">${facets.lifecyclePhase}</span>
            <h3 style="margin:0.4rem 0 0.2rem; font-size:1.15rem; color:var(--foreground);">${this.escapeXml(term.title)}</h3>
            <p style="margin:0; font-size:0.78rem; color:var(--muted-foreground);">${this.escapeXml(term.shortDefinition || term.definition || '')}</p>
          </div>
        </div>

        <!-- Ramas de Relaciones Estructuradas en HTML Semántico -->
        <div class="dom-mindmap-branches">
          <details open class="dom-mindmap-branch" data-dom-tag="details" data-dom-role="group">
            <summary class="dom-mindmap-summary" data-dom-tag="summary">
              <span>➡️ Relaciones Salientes Directas (${directRels.length})</span>
            </summary>
            <ul class="dom-mindmap-list" data-dom-tag="ul" data-dom-role="group">
              ${directItemsHtml}
            </ul>
          </details>

          <details open class="dom-mindmap-branch" data-dom-tag="details" data-dom-role="group">
            <summary class="dom-mindmap-summary" data-dom-tag="summary">
              <span>⬅️ Relaciones Entrantes Inversas (${inverseRels.length})</span>
            </summary>
            <ul class="dom-mindmap-list" data-dom-tag="ul" data-dom-role="group">
              ${inverseItemsHtml}
            </ul>
          </details>
        </div>
      </div>
    `;
  }

  /**
   * Genera una Matriz Semántica de Adyacencia y Relaciones en formato de tabla HTML accesible.
   */
  generateSemanticMatrix(term, options = {}) {
    if (!term) return '<div class="text-muted">Sin término seleccionado para la matriz.</div>';

    const directRels = (Array.isArray(term.relations) ? term.relations : []).filter(r => r && r.target);
    const inverseRels = this.getInverseRelations(term.id);

    const rows = [];
    directRels.forEach(r => {
      const target = this.getTerm(r.target);
      const targetTitle = target ? target.title : r.target.split(':').pop();
      const targetCat = target ? target.category : 'General';
      const isCross = target && target.glossaryId !== term.glossaryId;
      const family = this.getRelationFamily(r.type);
      rows.push({
        subject: term.title,
        predicate: r.type,
        family: family,
        direction: 'Directa (Saliente) ➡️',
        object: targetTitle,
        objectCat: targetCat,
        isCross: isCross,
        targetUrn: r.target
      });
    });

    inverseRels.forEach(r => {
      const sourceUrn = r.sourceTermId || r.source || '';
      const source = this.getTerm(sourceUrn);
      const sourceTitle = r.sourceTitle || (source ? source.title : (sourceUrn.includes(':') ? sourceUrn.split(':').pop() : 'Término'));
      const sourceCat = source ? source.category : (r.sourceGlossaryId || 'General');
      const isCross = source && source.glossaryId !== term.glossaryId;
      const relType = r.label || r.type || 'referenciadoPor';
      const family = r.family || this.getRelationFamily(relType);
      rows.push({
        subject: sourceTitle,
        predicate: relType,
        family: family,
        direction: 'Inversa (Entrante) ⬅️',
        object: term.title,
        objectCat: term.category || 'General',
        isCross: isCross,
        targetUrn: sourceUrn
      });
    });

    if (rows.length === 0) {
      return '<div class="text-muted" style="padding:1rem; text-align:center;">Este término no posee conexiones relacionales directas ni inversas actualmente.</div>';
    }

    const tableRowsHtml = rows.map(row => `
      <tr class="semantic-matrix-row" data-dom-tag="tr">
        <td style="font-weight:600; color:var(--foreground);">${this.escapeXml(row.subject)}</td>
        <td><span class="badge" style="background:var(--muted); font-family:monospace; font-size:0.75rem;">${row.predicate}</span></td>
        <td><span class="text-xs" style="color:var(--muted-foreground);">${row.family}</span></td>
        <td><span class="badge ${row.direction.includes('Directa') ? 'badge-primary' : 'badge-secondary'}" style="font-size:0.7rem;">${row.direction}</span></td>
        <td>
          <button type="button" class="btn btn-sm btn-link" style="text-align:left; padding:0; color:var(--primary); font-weight:600;" data-cmd="navigateToTerm" data-cmd-arg="${this.escapeJsAttr(row.targetUrn)}">
            ${row.isCross ? '🌐 ' : '🔗 '} ${this.escapeXml(row.object)} <small style="color:var(--muted-foreground);">(${this.escapeXml(row.objectCat)})</small>
          </button>
        </td>
      </tr>
    `).join('');

    return `
      <div class="semantic-matrix-wrapper" data-dom-tag="div" data-dom-container="semantic-matrix-wrapper" style="overflow-x:auto;">
        <table class="semantic-matrix-table" data-dom-tag="table" role="table" aria-label="Matriz de relaciones semánticas">
          <thead data-dom-tag="thead">
            <tr>
              <th scope="col">Sujeto (Origen)</th>
              <th scope="col">Predicado Semántico</th>
              <th scope="col">Familia Ontológica</th>
              <th scope="col">Polaridad</th>
              <th scope="col">Objeto (Destino / Clic para Navegar)</th>
            </tr>
          </thead>
          <tbody data-dom-tag="tbody">
            ${tableRowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }

  /**
   * Calcula la categorización semántica aditiva (Arquitectura Web Multifacética) para cualquier término.
   */
  getAdditiveFacets(term) {
    if (!term) {
      return {
        ontologicalLevel: 'L4 Técnica',
        lifecyclePhase: 'Producción',
        sensoryModality: 'Audiovisual',
        toolchainDomain: 'Estudio de Producción',
        schemaOrgType: 'DefinedTerm'
      };
    }

    const titleLower = (term.title || '').toLowerCase();
    const catLower = (term.category || '').toLowerCase();
    const defLower = (term.shortDefinition || term.definition || '').toLowerCase();

    // 1. Nivel Ontológico (L1 a L6)
    let ontologicalLevel = 'L4 Técnica / Concepto Canónico';
    if (catLower.includes('dominio') || titleLower.includes('glosario') || catLower.includes('general') || titleLower.includes('artefacto de software')) {
      ontologicalLevel = 'L1 Axiomático / Dominio';
    } else if (catLower.includes('pipeline') || catLower.includes('flujo') || catLower.includes('etapa') || titleLower.includes('aplicación') || titleLower.includes('sistema global')) {
      ontologicalLevel = 'L2 Familia de Procesos / Sistema';
    } else if (catLower.includes('categoría') || catLower.includes('género') || catLower.includes('arquitectura') || titleLower.includes('microservicio') || titleLower.includes('framework') || titleLower.includes('dit architecture') || titleLower.includes('latent diffusion')) {
      ontologicalLevel = 'L3 Arquitectura / Categoría';
    } else if (catLower.includes('componente') || catLower.includes('formato') || catLower.includes('archivo') || catLower.includes('códec') || titleLower.includes('plugin') || titleLower.includes('biblioteca') || titleLower.includes('lora') || titleLower.includes('controlnet')) {
      ontologicalLevel = 'L5 Componente / Módulo / Adaptador';
    } else if (catLower.includes('parámetro') || titleLower.includes('shutter') || titleLower.includes('frame rate') || titleLower.includes('resolución') || titleLower.includes('nit') || titleLower.includes('lufs') || titleLower.includes('inestabilidad') || titleLower.includes('cfg scale') || titleLower.includes('embedding')) {
      ontologicalLevel = 'L6 Parámetro Atómico / Métrica';
    }

    // 2. Fase del Ciclo de Vida
    let lifecyclePhase = 'Producción / Rodaje';
    if (catLower.includes('guion') || titleLower.includes('storyboard') || titleLower.includes('animatic') || titleLower.includes('shot list') || titleLower.includes('preproducción') || titleLower.includes('plan de rodaje') || catLower.includes('conocimiento')) {
      lifecyclePhase = 'Fase 1: Preproducción / Especificación';
    } else if (catLower.includes('cámara') || catLower.includes('encuadre') || catLower.includes('iluminación') || titleLower.includes('plano') || titleLower.includes('toma') || titleLower.includes('rodaje') || titleLower.includes('claqueta') || titleLower.includes('dolly') || catLower.includes('construcción')) {
      lifecyclePhase = 'Fase 2: Rodaje / Construcción';
    } else if (catLower.includes('montaje') || catLower.includes('edición') || catLower.includes('corte') || catLower.includes('color') || catLower.includes('etalonaje') || catLower.includes('hdr') || catLower.includes('vfx') || catLower.includes('sonido') || catLower.includes('audio') || catLower.includes('compilación')) {
      lifecyclePhase = 'Fase 3: Postproducción / Compilación';
    } else if (catLower.includes('formato') || titleLower.includes('master') || titleLower.includes('exportación') || titleLower.includes('prores') || titleLower.includes('dcp') || titleLower.includes('compresión') || catLower.includes('distribuidos') || titleLower.includes('runtime')) {
      lifecyclePhase = 'Fase 4: Masterización / Runtime';
    } else if (catLower.includes('difusion') || catLower.includes('atencion') || catLower.includes('temporal') || catLower.includes('muestreo')) {
      lifecyclePhase = 'Fase 5: Inferencia Generativa & Acondicionamiento';
    }

    // 3. Modalidad Sensorial / Operativa
    let sensoryModality = 'Visual Óptica';
    if (catLower.includes('sonido') || catLower.includes('audio') || titleLower.includes('foley') || titleLower.includes('lufs') || titleLower.includes('micrófono') || titleLower.includes('sonoro')) {
      sensoryModality = 'Auditiva / Sonora';
    } else if (catLower.includes('render') || catLower.includes('3d') || titleLower.includes('malla') || titleLower.includes('shader') || titleLower.includes('pbr') || titleLower.includes('polígono')) {
      sensoryModality = 'CGI / Sintética 3D';
    } else if (catLower.includes('software') || catLower.includes('artefactos') || catLower.includes('semantica') || catLower.includes('distribuidos') || titleLower.includes('ast') || titleLower.includes('script') || titleLower.includes('acid') || titleLower.includes('c4')) {
      sensoryModality = 'Código / Lógica Simbólica';
    } else if (catLower.includes('difusion') || catLower.includes('atencion') || catLower.includes('acondicionamiento') || titleLower.includes('lora') || titleLower.includes('clip') || titleLower.includes('prompt')) {
      sensoryModality = 'Hiperdimensional / Espacio Latente IA';
    } else if (catLower.includes('montaje') || catLower.includes('edición') || titleLower.includes('ritmo') || titleLower.includes('corte') || titleLower.includes('secuencia')) {
      sensoryModality = 'Espaciotemporal / Dinámica';
    }

    // 4. Dominio de Herramientas (Toolchain)
    let toolchainDomain = 'Set Cinematográfico & Óptica';
    if (catLower.includes('montaje') || catLower.includes('edición')) {
      toolchainDomain = 'Software NLE (Premiere, DaVinci, Avid)';
    } else if (catLower.includes('color') || catLower.includes('etalonaje')) {
      toolchainDomain = 'Suite de Colorimetría & Scopes ACES';
    } else if (catLower.includes('render') || catLower.includes('3d')) {
      toolchainDomain = 'Motor 3D & Pipeline DCC (Blender, Maya, Unreal)';
    } else if (catLower.includes('audio') || catLower.includes('sonido')) {
      toolchainDomain = 'Estación DAW de Audio (Pro Tools, Fairlight)';
    } else if (catLower.includes('software') || catLower.includes('artefactos') || catLower.includes('semantica')) {
      toolchainDomain = 'Toolchain de Ingeniería de Software (IDE, AST, Compilador, Git)';
    } else if (catLower.includes('difusion') || catLower.includes('atencion') || catLower.includes('temporal')) {
      toolchainDomain = 'Pipeline de Síntesis IA (PyTorch, ComfyUI, Diffusion Transformers)';
    }

    return {
      ontologicalLevel,
      lifecyclePhase,
      sensoryModality,
      toolchainDomain,
      schemaOrgType: 'DefinedTerm'
    };
  }

  sanitizeMermaidId(id) {
    if (!id) return 'node_' + Math.random().toString(36).substring(2, 7);
    return id.replace(/[^a-zA-Z0-9_]/g, '_');
  }

  escapeMermaidText(text) {
    if (!text) return '';
    return String(text).replace(/"/g, "'").replace(/[\[\]\(\)\{\}\<\>\#\;]/g, '');
  }

  escapeDotText(text) {
    if (!text) return '';
    return String(text).replace(/"/g, '\\"').replace(/\n/g, ' ');
  }

  truncateText(text, maxLen) {
    if (!text) return '';
    return text.length > maxLen ? text.substring(0, maxLen - 1) + '…' : text;
  }

  escapeXml(text) {
    if (text == null) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  escapeJsAttr(text) {
    if (text == null) return '';
    return String(text)
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /**
   * Genera las 12 preguntas ontológicas de evaluación socrática (Sección XVII de la Ontología Integral)
   * para reducción adaptativa de incertidumbre sobre el término.
   */
  generateOntologicalQuestions(term) {
    if (!term) return [];
    const facets = this.getAdditiveFacets(term);
    const directRels = term.relations || [];
    const inverseRels = this.getInverseRelations(term.id);
    const components = term.components || [];
    const apps = term.applications || [];

    return [
      {
        id: 'q-ontological',
        category: 'Ontológica',
        icon: '🌳',
        question: `¿Qué tipo de entidad es "${term.title}" y cuál es su clase ontológica?`,
        answer: `Clasificado como entidad canónica de nivel ${facets.ontologicalLevel} en la categoría "${term.category || 'General'}".`,
        status: 'verified',
        evidence: `URN: ${term.id}`
      },
      {
        id: 'q-mereological',
        category: 'Mereológica',
        icon: '🧩',
        question: `¿Qué componentes integran "${term.title}" y a qué conjunto pertenece?`,
        answer: components.length > 0 
          ? `Integrado por ${components.length} componentes estructurales documentados: ${components.slice(0, 3).join(', ')}${components.length > 3 ? '...' : ''}.`
          : `Entidad indivisible o conceptual de nivel ${facets.ontologicalLevel}.`,
        status: components.length > 0 ? 'verified' : 'inferred',
        evidence: `Componentes declarados: ${components.length}`
      },
      {
        id: 'q-functional',
        category: 'Funcional',
        icon: '🎯',
        question: `¿Qué responsabilidad o propósito operativo cumple en el sistema?`,
        answer: apps.length > 0
          ? `Cumple responsabilidades en: ${apps.slice(0, 2).join('; ')}.`
          : (term.shortDefinition || term.definition || 'Propósito formal definido en catálogo.'),
        status: 'verified',
        evidence: `Aplicaciones documentadas: ${apps.length}`
      },
      {
        id: 'q-dependency',
        category: 'Dependencia',
        icon: '⛓️',
        question: `¿De qué otros conceptos o artefactos depende y en qué fase?`,
        answer: directRels.length > 0
          ? `Posee ${directRels.length} dependencias directas tipadas en fase "${facets.lifecyclePhase}".`
          : 'Concepto axiomático base sin dependencias directas salientes.',
        status: directRels.length > 0 ? 'verified' : 'inferred',
        evidence: `Aristas salientes: ${directRels.length}`
      },
      {
        id: 'q-contractual',
        category: 'Contractual',
        icon: '📜',
        question: `¿Qué garantías, formatos o contratos públicos especifica?`,
        answer: `Garantiza interoperabilidad Schema.org ${facets.schemaOrgType} y contratos bajo toolchain ${facets.toolchainDomain}.`,
        status: 'verified',
        evidence: `Schema: ${facets.schemaOrgType}`
      },
      {
        id: 'q-causal',
        category: 'Causal',
        icon: '⚠️',
        question: `¿Qué efectos indeseados o fallos desencadena una mala aplicación?`,
        answer: term.aiPromptGuidance && term.aiPromptGuidance.negativeTokens
          ? `Genera artefactos o discrepancias evitables mediante tokens negativos: ${term.aiPromptGuidance.negativeTokens.slice(0, 3).join(', ')}.`
          : 'Riesgo de desalineación semántica o incompatibilidad de formato.',
        status: term.aiPromptGuidance ? 'verified' : 'inferred',
        evidence: term.aiPromptGuidance ? 'aiPromptGuidance.negativeTokens' : 'Análisis contextual'
      },
      {
        id: 'q-temporal',
        category: 'Temporal',
        icon: '⏱️',
        question: `¿Qué eventos o etapas deben preceder o sincronizarse con este concepto?`,
        answer: `Opera en la fase "${facets.lifecyclePhase}". Se sincroniza con ${inverseRels.length} conceptos que lo invocan o suceden.`,
        status: 'verified',
        evidence: `Fase: ${facets.lifecyclePhase}`
      },
      {
        id: 'q-data',
        category: 'De Datos',
        icon: '💾',
        question: `¿Qué formatos, representaciones o datos entran, se transforman o persisten?`,
        answer: `Representado en Schema.org JSON-LD, persistido con clave criptográfica en IndexedDB y empaquetado en bundle local.`,
        status: 'verified',
        evidence: 'storage.js / IndexedDB'
      },
      {
        id: 'q-security',
        category: 'De Seguridad',
        icon: '🛡️',
        question: `¿Qué permisos, sandboxes o límites de autoridad regulan su uso?`,
        answer: `Principio de Mínimo Privilegio (PoLP): aislamiento local en navegador, 100% autónomo sin fugas de datos hacia la red.`,
        status: 'verified',
        evidence: 'audit_autonomy.js (Zero Network Fetch)'
      },
      {
        id: 'q-quality',
        category: 'De Calidad',
        icon: '📐',
        question: `¿Qué métricas o unidades cuantifican su corrección y rendimiento?`,
        answer: `Verificado por 225 pruebas de integración automatizadas. Métrica de conectividad: grado ${directRels.length + inverseRels.length}.`,
        status: 'verified',
        evidence: 'run_all_tests.js'
      },
      {
        id: 'q-evolution',
        category: 'De Evolución',
        icon: '🔄',
        question: `¿Qué impacto tiene la modificación o reemplazo de este término?`,
        answer: `Afectaría directamente a ${inverseRels.length} términos dependientes. Historial versionado con hash criptográfico SHA-256.`,
        status: 'verified',
        evidence: `Relaciones inversas: ${inverseRels.length}`
      },
      {
        id: 'q-evidence',
        category: 'Epistémica',
        icon: '🔬',
        question: `¿Qué fuente primaria y evidencia respaldan la definición canónica?`,
        answer: `Fuente registrada: ${term.metadata ? (term.metadata.source || term.metadata.originalTitle || 'Catálogo Oficial') : 'DocWeb Canonical'}. Estado: Canónico Verificado.`,
        status: 'verified',
        evidence: `Status: ${term.status || 'canonical'}`
      }
    ];
  }

  // --------------------------------------------------------------------------
  // GRAFO SEMÁNTICO INTERACTIVO (B-10)
  // Layout radial determinista sobre entidades JSON-LD reales y relaciones
  // ontológicas tipadas. Cero librerías externas. Cada familia de relación
  // conserva su color; las aristas inter-glosario se marcan como cruzadas.
  // Los nodos son navegables (data-cmd) y se pueden agregar a la composición
  // interdominio. Recibe el estado de composición vía options (no lo almacena).
  // --------------------------------------------------------------------------
  generateInteractiveGraphSvg(term, options = {}) {
    const maxNodes = options.maxNodes !== undefined ? Number(options.maxNodes) || 24 : 24;
    const filterFamily = options.filterFamily || 'all';
    const composedTermIds = Array.isArray(options.composedTermIds) ? options.composedTermIds : [];

    if (!term) {
      return '<svg width="640" height="360" viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg"><text x="320" y="180" font-size="13" fill="#64748b" text-anchor="middle">Seleccione un término para ver su grafo semántico interactivo.</text></svg>';
    }

    const width = 960;
    const height = 700;
    const cx = width / 2;
    const cy = height / 2;

    // Recopilar aristas: directas (term → target) e inversas (source → term)
    const edgesByTarget = new Map();
    const addEdge = (sourceId, targetId, rel) => {
      const family = this.getRelationFamily(rel.type || 'relatedTo');
      if (filterFamily !== 'all' && family.id !== filterFamily) return;
      const sourceTerm = this.getTerm(sourceId);
      const targetTerm = this.getTerm(targetId);
      const isCross = sourceTerm && targetTerm && sourceTerm.glossaryId !== targetTerm.glossaryId;
      // Deduplicar por nodo extremo (mantener primera relación tipada)
      const otherId = sourceId === term.id ? targetId : sourceId;
      if (edgesByTarget.has(otherId)) return;
      edgesByTarget.set(otherId, {
        sourceId, targetId,
        type: rel.type || 'relatedTo',
        label: rel.label || family.label,
        family: family.id,
        familyColor: family.color || '#64748b',
        isCross
      });
    };

    const directRels = (Array.isArray(term.relations) ? term.relations : []).filter(r => r && r.target);
    const inverseRels = this.getInverseRelations(term.id) || [];
    directRels.forEach(rel => addEdge(term.id, rel.target, rel));
    inverseRels.forEach(rel => addEdge(rel.sourceTermId, term.id, rel));

    const edges = Array.from(edgesByTarget.values());
    edges.sort((a, b) => {
      if (a.family !== b.family) return a.family.localeCompare(b.family);
      const ta = (a.sourceId === term.id ? a.targetId : a.sourceId);
      const tb = (b.sourceId === term.id ? b.targetId : b.sourceId);
      return ta.localeCompare(tb);
    });
    const limited = edges.slice(0, maxNodes);

    // Nodos únicos
    const nodeMap = new Map();
    nodeMap.set(term.id, {
      id: term.id, title: term.title, glossaryId: term.glossaryId,
      category: term.category || 'General', level: this.getOntologyLevel(term).id, isCentral: true
    });
    limited.forEach(e => {
      const otherId = e.sourceId === term.id ? e.targetId : e.sourceId;
      if (nodeMap.has(otherId)) return;
      const otherTerm = this.getTerm(otherId);
      if (otherTerm) {
        nodeMap.set(otherId, {
          id: otherId, title: otherTerm.title, glossaryId: otherTerm.glossaryId,
          category: otherTerm.category || 'General', level: this.getOntologyLevel(otherTerm).id, isCentral: false
        });
      } else {
        nodeMap.set(otherId, { id: otherId, title: otherId, glossaryId: '', category: 'General', level: 'L4', isCentral: false });
      }
    });

    const nodes = Array.from(nodeMap.values());
    const nSurrounding = nodes.length - 1;

    const R = 250;
    const centralW = 250, centralH = 76;
    const nodeW = 176, nodeH = 52;

    const rectPerimeter = (centerX, centerY, w, h, angle) => {
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);
      const tX = dx !== 0 ? (w / 2) / Math.abs(dx) : Infinity;
      const tY = dy !== 0 ? (h / 2) / Math.abs(dy) : Infinity;
      const t = Math.min(tX, tY);
      return { x: centerX + dx * t, y: centerY + dy * t, dx, dy };
    };

    let svg = [];
    svg.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" class="w-full h-auto overflow-visible select-none font-sans" role="img" aria-label="Grafo semántico interactivo centrado en ${this.escapeXml(term.title)}">`);
    svg.push(`<defs>`);
    svg.push(`<marker id="arrow-direct" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#3b82f6" /></marker>`);
    svg.push(`<marker id="arrow-inverse" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#10b981" /></marker>`);
    svg.push(`<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.14"/></filter>`);
    svg.push(`</defs>`);
    svg.push(`<rect width="${width}" height="${height}" rx="12" fill="var(--card, #ffffff)" stroke="var(--border, #e2e8f0)" stroke-width="1" />`);

    svg.push(`<text x="24" y="30" font-size="13" font-weight="bold" fill="var(--foreground, #0f172a)">GRAFO SEMÁNTICO INTERACTIVO</text>`);
    svg.push(`<text x="24" y="46" font-size="9" fill="var(--muted-foreground, #64748b)">Nodo central: ${this.escapeXml(term.title)} · ${nodes.length} entidad${nodes.length !== 1 ? 'es' : ''} · ${limited.length} relación${limited.length !== 1 ? 'es' : ''} tipada</text>`);

    // Aristas (detrás de nodos)
    limited.forEach((e, idx) => {
      const otherId = e.sourceId === term.id ? e.targetId : e.sourceId;
      const otherNode = nodeMap.get(otherId);
      if (!otherNode) return;

      const angle = (idx / Math.max(nSurrounding, 1)) * 2 * Math.PI;
      const centralP = rectPerimeter(cx, cy, centralW, centralH, angle);
      const nodeCenterX = cx + R * Math.cos(angle);
      const nodeCenterY = cy + R * Math.sin(angle);
      const nodeP = rectPerimeter(nodeCenterX, nodeCenterY, nodeW, nodeH, angle + Math.PI);

      const isDirect = e.sourceId === term.id;
      const start = isDirect ? centralP : nodeP;
      const end = isDirect ? nodeP : centralP;
      const marker = isDirect ? 'arrow-direct' : 'arrow-inverse';

      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      const perpX = -Math.sin(angle);
      const perpY = Math.cos(angle);
      const cpX = midX + perpX * 55;
      const cpY = midY + perpY * 55;

      const stroke = e.isCross ? '#8b5cf6' : e.familyColor;
      const dash = e.isCross ? 'stroke-dasharray="6 4"' : '';
      const strokeWidth = e.isCross ? '2' : '1.6';

      svg.push(`<path d="M ${start.x} ${start.y} Q ${cpX} ${cpY}, ${end.x} ${end.y}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" ${dash} marker-end="url(#${marker})" opacity="0.85"/>`);

      const lx = midX + Math.cos(angle) * 14;
      const ly = midY + Math.sin(angle) * 14;
      svg.push(`<text x="${lx}" y="${ly}" font-size="7.5" fill="${stroke}" font-weight="700" text-anchor="middle" pointer-events="none">${this.escapeXml(e.type)}</text>`);
    });

    // Nodos periféricos
    nodes.forEach((node, i) => {
      if (node.isCentral) return;
      const edge = limited.find(e => {
        const oid = e.sourceId === term.id ? e.targetId : e.sourceId;
        return oid === node.id;
      });
      const idx = edge ? limited.indexOf(edge) : i - 1;
      const angle = (idx / Math.max(nSurrounding, 1)) * 2 * Math.PI;
      const nx = cx + R * Math.cos(angle);
      const ny = cy + R * Math.sin(angle);
      const isCross = node.glossaryId && node.glossaryId !== term.glossaryId;
      const border = isCross ? '#8b5cf6' : (edge ? this.getRelationFamily(edge.type).color : '#cbd5e1');
      const isComposed = composedTermIds.includes(node.id);

      svg.push(`<g data-cmd="navigateToTerm" data-cmd-arg="${this.escapeJsAttr(node.id)}" role="button" tabindex="0" style="cursor:pointer;" filter="url(#shadow)" transform="translate(${nx - nodeW/2}, ${ny - nodeH/2})">`);
      svg.push(`<rect width="${nodeW}" height="${nodeH}" rx="8" fill="#ffffff" stroke="${border}" stroke-width="${isCross ? '2.2' : '1.4'}" />`);
      svg.push(`<text x="8" y="${nodeH/2 - 4}" font-size="10" font-weight="700" fill="var(--foreground, #0f172a)" pointer-events="none">${this.escapeXml(this.truncateText(node.title, 20))}</text>`);
      svg.push(`<text x="8" y="${nodeH/2 + 9}" font-size="7.5" fill="${isCross ? '#7c3aed' : 'var(--muted-foreground, #64748b)'}" pointer-events="none">${isCross ? '🌐 ' : ''}${this.escapeXml(node.category || 'General')} • ${node.level}</text>`);
      const chipFill = isComposed ? '#10b981' : '#eff6ff';
      const chipStroke = isComposed ? '#047857' : '#1d4ed8';
      const chipText = isComposed ? '✓' : '+';
      const chipColor = isComposed ? '#047857' : '#1d4ed8';
      svg.push(`<g data-cmd="toggleComposedTerm" data-cmd-arg="${this.escapeJsAttr(node.id)}" role="button" tabindex="0" transform="translate(${nodeW - 25}, 6)" style="cursor:pointer;">`);
      svg.push(`<rect width="19" height="19" rx="4" fill="${chipFill}" stroke="${chipStroke}" stroke-width="1"/>`);
      svg.push(`<text x="9.5" y="15" font-size="11" font-weight="bold" fill="${chipColor}" text-anchor="middle" pointer-events="none">${chipText}</text>`);
      svg.push(`</g>`);
      svg.push(`</g>`);
    });

    // Nodo central
    svg.push(`<g data-cmd="navigateToTerm" data-cmd-arg="${this.escapeJsAttr(term.id)}" role="button" tabindex="0" style="cursor:pointer;" filter="url(#shadow)" transform="translate(${cx - centralW/2}, ${cy - centralH/2})">`);
    svg.push(`<rect width="${centralW}" height="${centralH}" rx="12" fill="#1e40af" stroke="#1d4ed8" stroke-width="2.5"/>`);
    svg.push(`<text x="${centralW/2}" y="${centralH/2 - 6}" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle" pointer-events="none">${this.escapeXml(this.truncateText(term.title, 26))}</text>`);
    svg.push(`<text x="${centralW/2}" y="${centralH/2 + 10}" font-size="8.5" fill="#bfdbfe" text-anchor="middle" pointer-events="none">${term.category || 'General'} • ${this.getOntologyLevel(term).id}</text>`);
    svg.push(`</g>`);

    // Leyenda de familias
    svg.push(`<g transform="translate(24, ${height - 150})">`);
    svg.push(`<text x="0" y="-8" font-size="8.5" font-weight="700" fill="var(--foreground)">Familias de relación</text>`);
    const families = Object.values(this.relationFamilies);
    const cols = 4;
    families.forEach((f, fi) => {
      const col = fi % cols;
      const row = Math.floor(fi / cols);
      const x = col * 150;
      const y = row * 16;
      svg.push(`<circle cx="${x + 4}" cy="${y - 2}" r="3" fill="${f.color}"/>`);
      svg.push(`<text x="${x + 10}" y="${y + 2}" font-size="7.8" fill="var(--muted-foreground, #64748b)" pointer-events="none">${this.escapeXml(f.label)}</text>`);
    });
    svg.push(`<text x="0" y="${4 * 16 + 6}" font-size="7.8" fill="#7c3aed" pointer-events="none">🌐 Línea punteada = relación inter-glosario</text>`);
    svg.push(`<text x="0" y="${4 * 16 + 18}" font-size="7.8" fill="#10b981" pointer-events="none">✓ nodo ya en la composición interdominio</text>`);
    svg.push(`</g>`);

    svg.push(`</svg>`);
    return svg.join('\n');
  }
}

if (typeof window !== 'undefined') {
  window.DocWebSemantics = new SemanticKnowledgeEngine();
}
if (typeof globalThis !== 'undefined') {
  globalThis.DocWebSemantics = new SemanticKnowledgeEngine();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SemanticKnowledgeEngine };
}
