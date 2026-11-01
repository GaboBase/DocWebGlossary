/**
 * DOCWEB MULTIGLOSSARY — Canonical & Semantic Knowledge Engine
 * Cumplimiento del Contrato del Sistema:
 * - Carga autónoma desde almacenamiento local.
 * - Validación y resolución de relaciones directas e inversas.
 * - Generación de grafos contextuales en SVG sin dependencias externas.
 * - Mapeo a JSON-LD / Schema.org (DefinedTerm / DefinedTermSet).
 * - Detección de enlaces inter-glosario.
 */

class SemanticKnowledgeEngine {
  constructor() {
    this.catalog = null;
    this.glossaries = new Map(); // id -> glossaryMetadata
    this.terms = new Map();      // id -> termObject
    this.inverseRelations = new Map(); // targetTermId -> Array<{sourceTermId, type, label, note}>
    this.storage = window.DocWebStorage;
  }

  async loadAll(catalogData, glossariesData) {
    this.catalog = catalogData;
    this.glossaries.clear();
    this.terms.clear();
    this.inverseRelations.clear();

    // 1. Cargar metadatos de glosarios
    for (const g of catalogData.canonicalGlossaries) {
      this.glossaries.set(g.id, g);
    }

    // 2. Cargar términos canónicos
    for (const [glossaryId, termsList] of Object.entries(glossariesData)) {
      for (const term of termsList) {
        term.glossaryId = glossaryId;
        term.origin = 'canonical';
        this.terms.set(term.id, term);
      }
    }

    // 3. Fusionar con modificaciones persistidas en IndexedDB (si existen)
    try {
      if (this.storage) {
        const customTerms = await this.storage.getAllCustomTerms();
        for (const cTerm of customTerms) {
          // Si el término ya existe, prevalece la versión persistida más reciente
          this.terms.set(cTerm.id, cTerm);
        }
      }
    } catch (e) {
      console.warn('No se pudieron recuperar términos personalizados de IndexedDB:', e);
    }

    // 4. Calcular relaciones inversas bidireccionales de manera determinista
    this.computeInverseRelations();

    return {
      glossariesCount: this.glossaries.size,
      termsCount: this.terms.size
    };
  }

  computeInverseRelations() {
    this.inverseRelations.clear();

    const relationInverseMap = {
      'isTypeOf': { type: 'hasSubtype', label: 'Tiene como subtipo / técnica' },
      'isPartOf': { type: 'composedOf', label: 'Se compone de' },
      'contains': { type: 'containedIn', label: 'Está contenido en' },
      'dependsOn': { type: 'dependencyOf', label: 'Es dependencia para' },
      'requires': { type: 'requiredBy', label: 'Es requerido por' },
      'produces': { type: 'producedBy', label: 'Es producido por' },
      'producedBy': { type: 'produces', label: 'Produce' },
      'usedFor': { type: 'uses', label: 'Es empleado por' },
      'alternativeTo': { type: 'alternativeTo', label: 'Es alternativa recíproca a' },
      'differsFrom': { type: 'differsFrom', label: 'Se diferencia recíprocamente de' },
      'compatibleWith': { type: 'compatibleWith', label: 'Es compatible con' },
      'relatedTo': { type: 'relatedTo', label: 'Está relacionado con' },
      'hasInput': { type: 'isInputTo', label: 'Es parámetro de entrada para' },
      'hasOutput': { type: 'isOutputOf', label: 'Es resultado u output de' }
    };

    for (const [sourceId, term] of this.terms.entries()) {
      if (!term.relations || !Array.isArray(term.relations)) continue;

      for (const rel of term.relations) {
        if (!rel.target) continue;
        
        if (!this.inverseRelations.has(rel.target)) {
          this.inverseRelations.set(rel.target, []);
        }

        const invConfig = relationInverseMap[rel.type] || {
          type: 'reverseRelatedTo',
          label: 'Referenciado inversamente por'
        };

        this.inverseRelations.get(rel.target).push({
          sourceTermId: sourceId,
          sourceTitle: term.title,
          sourceGlossaryId: term.glossaryId,
          type: invConfig.type,
          originalType: rel.type,
          label: invConfig.label,
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

  searchTerms(query, glossaryFilter = null, categoryFilter = null) {
    const q = (query || '').toLowerCase().trim();
    return this.getAllTerms().filter(term => {
      if (glossaryFilter && glossaryFilter !== 'all' && term.glossaryId !== glossaryFilter) {
        return false;
      }
      if (categoryFilter && categoryFilter !== 'all' && term.category !== categoryFilter) {
        return false;
      }
      if (!q) return true;

      const titleMatch = term.title && term.title.toLowerCase().includes(q);
      const defMatch = term.shortDefinition && term.shortDefinition.toLowerCase().includes(q);
      const fullDefMatch = term.fullDefinition && term.fullDefinition.toLowerCase().includes(q);
      const synMatch = term.synonyms && term.synonyms.some(s => s.toLowerCase().includes(q));
      const compMatch = term.components && term.components.some(c => c.toLowerCase().includes(q));

      return titleMatch || defMatch || fullDefMatch || synMatch || compMatch;
    });
  }

  generateJsonLd(term) {
    if (!term) return null;
    const glossary = this.getGlossary(term.glossaryId) || {};

    return {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "@id": term.id,
      "name": term.title,
      "description": term.shortDefinition,
      "disambiguatingDescription": term.fullDefinition,
      "inDefinedTermSet": {
        "@type": "DefinedTermSet",
        "@id": "urn:glossary:" + (term.glossaryId || "global"),
        "name": glossary.title || "DocWeb Knowledge Glossary",
        "description": glossary.description || ""
      },
      "alternateName": term.synonyms || [],
      "additionalType": "urn:docweb:ontology:" + (term.level || "concept"),
      "identifier": term.slug,
      "disambiguation": term.category
    };
  }

  /**
   * Genera un diagrama SVG semántico autónomo del término y sus relaciones directas e inversas.
   * Sin dependencias externas de librerías ni scripts CDN.
   */
  generateContextualDiagramSvg(term) {
    if (!term) return '<div class="p-4 text-center text-sm text-[var(--muted-foreground)]">Sin datos de término</div>';

    const directRels = term.relations || [];
    const inverseRels = this.getInverseRelations(term.id);

    const width = 800;
    const height = Math.max(360, (Math.max(directRels.length, inverseRels.length) * 65) + 120);
    const centerX = width / 2;
    const centerY = height / 2;

    let svgParts = [];
    svgParts.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" class="w-full h-auto overflow-visible select-none font-sans">`);
    
    // Defs para marcadores de flecha
    svgParts.push(`
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
    `);

    // Cuadrícula o fondo sutil
    svgParts.push(`<rect width="${width}" height="${height}" rx="12" fill="var(--card, #ffffff)" stroke="var(--border, #e2e8f0)" stroke-width="1" />`);

    // Nodo Central (Término Actual)
    const centralBoxW = 200;
    const centralBoxH = 68;
    const centralX = centerX - (centralBoxW / 2);
    const centralY = centerY - (centralBoxH / 2);

    // Calcular nodos de relaciones directas (a la derecha)
    const rightX = width - 210;
    const rightCount = directRels.length;
    const rightSpacing = rightCount > 1 ? (height - 120) / (rightCount - 1) : 0;
    const rightStartY = rightCount > 1 ? 60 : centerY - 25;

    directRels.forEach((rel, idx) => {
      const targetTerm = this.getTerm(rel.target);
      const targetTitle = targetTerm ? targetTerm.title : rel.target.split(':').pop();
      const isCross = targetTerm && targetTerm.glossaryId !== term.glossaryId;
      const targetY = rightCount > 1 ? (rightStartY + idx * rightSpacing) : centerY - 25;
      const targetX = rightX;

      // Línea conectora Bezier
      const startX = centralX + centralBoxW;
      const startY = centerY;
      const endX = targetX;
      const endY = targetY + 25;
      const cp1X = startX + 70;
      const cp1Y = startY;
      const cp2X = endX - 70;
      const cp2Y = endY;

      svgParts.push(`
        <path d="M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}" 
              fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="${isCross ? '4 3' : 'none'}" marker-end="url(#arrow-direct)" />
        <rect x="${(startX + endX)/2 - 45}" y="${(startY + endY)/2 - 10}" width="90" height="18" rx="4" fill="var(--background, #f8fafc)" stroke="#3b82f6" stroke-width="0.8"/>
        <text x="${(startX + endX)/2}" y="${(startY + endY)/2 + 2}" font-size="10" fill="#2563eb" text-anchor="middle" font-weight="600">${rel.type}</text>
      `);

      // Tarjeta destino
      svgParts.push(`
        <g class="cursor-pointer transition-transform hover:opacity-80" onclick="window.DocWebApp.navigateToTerm('${rel.target}')">
          <rect x="${targetX}" y="${targetY}" width="180" height="50" rx="8" fill="var(--background, #f8fafc)" stroke="${isCross ? '#8b5cf6' : '#cbd5e1'}" stroke-width="${isCross ? '2' : '1'}" filter="url(#shadow)"/>
          <text x="${targetX + 10}" y="${targetY + 20}" font-size="11" font-weight="600" fill="var(--foreground, #0f172a)">${this.truncateText(targetTitle, 22)}</text>
          <text x="${targetX + 10}" y="${targetY + 36}" font-size="9" fill="${isCross ? '#7c3aed' : 'var(--muted-foreground, #64748b)'}">${isCross ? 'Inter-Glosario ⤻' : (targetTerm ? targetTerm.category : 'Relación')}</text>
        </g>
      `);
    });

    // Calcular nodos de relaciones inversas (a la izquierda)
    const leftX = 30;
    const leftCount = inverseRels.length;
    const leftSpacing = leftCount > 1 ? (height - 120) / (leftCount - 1) : 0;
    const leftStartY = leftCount > 1 ? 60 : centerY - 25;

    inverseRels.forEach((rel, idx) => {
      const sourceY = leftCount > 1 ? (leftStartY + idx * leftSpacing) : centerY - 25;
      const isCross = rel.sourceGlossaryId !== term.glossaryId;

      // Línea conectora hacia el nodo central
      const startX = leftX + 180;
      const startY = sourceY + 25;
      const endX = centralX;
      const endY = centerY;
      const cp1X = startX + 70;
      const cp1Y = startY;
      const cp2X = endX - 70;
      const cp2Y = endY;

      svgParts.push(`
        <path d="M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}" 
              fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="${isCross ? '4 3' : 'none'}" marker-end="url(#arrow-inverse)" />
        <rect x="${(startX + endX)/2 - 45}" y="${(startY + endY)/2 - 10}" width="90" height="18" rx="4" fill="var(--background, #f8fafc)" stroke="#10b981" stroke-width="0.8"/>
        <text x="${(startX + endX)/2}" y="${(startY + endY)/2 + 2}" font-size="10" fill="#059669" text-anchor="middle" font-weight="600">${rel.type}</text>
      `);

      // Tarjeta origen inverso
      svgParts.push(`
        <g class="cursor-pointer transition-transform hover:opacity-80" onclick="window.DocWebApp.navigateToTerm('${rel.sourceTermId}')">
          <rect x="${leftX}" y="${sourceY}" width="180" height="50" rx="8" fill="var(--background, #f8fafc)" stroke="${isCross ? '#8b5cf6' : '#cbd5e1'}" stroke-width="${isCross ? '2' : '1'}" filter="url(#shadow)"/>
          <text x="${leftX + 10}" y="${sourceY + 20}" font-size="11" font-weight="600" fill="var(--foreground, #0f172a)">${this.truncateText(rel.sourceTitle, 22)}</text>
          <text x="${leftX + 10}" y="${sourceY + 36}" font-size="9" fill="${isCross ? '#7c3aed' : 'var(--muted-foreground, #64748b)'}">${isCross ? 'Origen Inter-Glosario ⤻' : 'Referencia Inversa'}</text>
        </g>
      `);
    });

    // Renderizado del Nodo Central (encima de las líneas)
    svgParts.push(`
      <g filter="url(#shadow)">
        <rect x="${centralX}" y="${centralY}" width="${centralBoxW}" height="${centralBoxH}" rx="10" 
              fill="#2563eb" stroke="#1d4ed8" stroke-width="2" />
        <text x="${centerX}" y="${centerY - 8}" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">${this.truncateText(term.title, 24)}</text>
        <text x="${centerX}" y="${centerY + 10}" font-size="10" fill="#dbeafe" text-anchor="middle">${term.category || 'Término'}</text>
        <text x="${centerX}" y="${centerY + 24}" font-size="9" fill="#bfdbfe" text-anchor="middle">Nivel: ${term.level || 'general'}</text>
      </g>
    `);

    // Título y Leyenda
    svgParts.push(`
      <text x="20" y="28" font-size="11" font-weight="bold" fill="var(--foreground, #0f172a)">DIAGRAMA CONTEXTUAL DE RELACIONES</text>
      <g transform="translate(${width - 340}, 16)">
        <circle cx="8" cy="8" r="4" fill="#3b82f6" />
        <text x="18" y="11" font-size="9" fill="var(--muted-foreground, #64748b)">Relación Directa</text>
        <circle cx="110" cy="8" r="4" fill="#10b981" />
        <text x="120" y="11" font-size="9" fill="var(--muted-foreground, #64748b)">Relación Inversa</text>
        <circle cx="215" cy="8" r="4" fill="#8b5cf6" />
        <text x="225" y="11" font-size="9" fill="var(--muted-foreground, #64748b)">Inter-Glosario</text>
      </g>
    `);

    svgParts.push(`</svg>`);
    return svgParts.join('\n');
  }

  truncateText(text, maxLen) {
    if (!text) return '';
    return text.length > maxLen ? text.substring(0, maxLen - 1) + '…' : text;
  }
}

window.DocWebSemantics = new SemanticKnowledgeEngine();
