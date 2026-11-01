/**
 * DOCWEB MULTIGLOSSARY — Controlador Principal de la Aplicación
 * Conecta UI, Motor Semántico, Persistencia Local IndexedDB y Diagramación.
 */

window.DocWebApp = {
  currentGlossaryId: 'all',
  currentCategory: 'all',
  currentTermId: null,
  activeTab: 'details', // 'details', 'diagram', 'jsonld', 'history'

  async init() {
    try {
      this.updateStatus('Cargando catálogo canónico...', 'info');

      // 1. Cargar Catálogo Canónico
      const catalogRes = await fetch('./app/data/catalog.json');
      const catalog = await catalogRes.json();

      // 2. Cargar Glosarios Canónicos
      const glossariesData = {};
      for (const g of catalog.canonicalGlossaries) {
        try {
          const termsRes = await fetch(g.dataPath);
          const tData = await termsRes.json();
          glossariesData[g.id] = tData.canonicalTerms || [];
        } catch (err) {
          console.warn(`No se pudo cargar el glosario ${g.id}:`, err);
          glossariesData[g.id] = [];
        }
      }

      // 3. Inicializar Motor Semántico
      await window.DocWebSemantics.loadAll(catalog, glossariesData);

      // 4. Renderizar Interfaz
      this.renderGlossarySelector();
      this.renderCategoryChips();
      this.filterAndRenderTerms();

      // Seleccionar primer término si existe
      const allTerms = window.DocWebSemantics.getAllTerms();
      if (allTerms.length > 0) {
        this.selectTerm(allTerms[0].id);
      }

      this.setupEventListeners();
      this.updateStatus('Sistema listo. Base de conocimiento local activa.', 'success');
    } catch (e) {
      console.error('Error al inicializar DOCWEB MULTIGLOSSARY:', e);
      this.updateStatus('Error al cargar datos canónicos: ' + e.message, 'danger');
    }
  },

  updateStatus(msg, type = 'info') {
    const el = document.getElementById('system-status-indicator');
    if (el) {
      el.textContent = msg;
      el.className = `brand-badge status-${type}`;
    }
  },

  setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterAndRenderTerms(e.target.value);
      });
    }

    const glossarySelect = document.getElementById('glossary-select');
    if (glossarySelect) {
      glossarySelect.addEventListener('change', (e) => {
        this.currentGlossaryId = e.target.value;
        this.currentCategory = 'all';
        this.renderCategoryChips();
        this.filterAndRenderTerms(searchInput ? searchInput.value : '');
      });
    }

    // Botones de Exportar / Importar
    const btnExport = document.getElementById('btn-export-capsule');
    if (btnExport) {
      btnExport.addEventListener('click', () => this.exportCapsule());
    }

    const btnImport = document.getElementById('btn-import-capsule');
    const fileImportInput = document.getElementById('input-import-file');
    if (btnImport && fileImportInput) {
      btnImport.addEventListener('click', () => fileImportInput.click());
      fileImportInput.addEventListener('change', (e) => this.handleImportFile(e));
    }

    // Botón de Crear Término Nuevo
    const btnNewTerm = document.getElementById('btn-new-term');
    if (btnNewTerm) {
      btnNewTerm.addEventListener('click', () => this.openTermEditor());
    }
  },

  renderGlossarySelector() {
    const select = document.getElementById('glossary-select');
    if (!select) return;

    select.innerHTML = '<option value="all">🔍 Todos los Glosarios (Catálogo Transversal)</option>';
    for (const [id, g] of window.DocWebSemantics.glossaries.entries()) {
      const opt = document.createElement('option');
      opt.value = id;
      opt.textContent = `📚 ${g.title}`;
      select.appendChild(opt);
    }
  },

  renderCategoryChips() {
    const container = document.getElementById('category-container');
    if (!container) return;

    container.innerHTML = '';
    const allChip = document.createElement('span');
    allChip.className = `cat-chip ${this.currentCategory === 'all' ? 'active' : ''}`;
    allChip.textContent = 'Todas';
    allChip.onclick = () => {
      this.currentCategory = 'all';
      this.renderCategoryChips();
      this.filterAndRenderTerms();
    };
    container.appendChild(allChip);

    // Obtener categorías únicas
    const terms = this.currentGlossaryId === 'all' 
      ? window.DocWebSemantics.getAllTerms()
      : window.DocWebSemantics.getTermsByGlossary(this.currentGlossaryId);

    const categories = Array.from(new Set(terms.map(t => t.category).filter(Boolean)));
    for (const cat of categories) {
      const chip = document.createElement('span');
      chip.className = `cat-chip ${this.currentCategory === cat ? 'active' : ''}`;
      chip.textContent = cat;
      chip.onclick = () => {
        this.currentCategory = cat;
        this.renderCategoryChips();
        this.filterAndRenderTerms();
      };
      container.appendChild(chip);
    }
  },

  filterAndRenderTerms(searchQuery = '') {
    const container = document.getElementById('terms-list');
    if (!container) return;

    const query = searchQuery || (document.getElementById('search-input') ? document.getElementById('search-input').value : '');
    const terms = window.DocWebSemantics.searchTerms(query, this.currentGlossaryId, this.currentCategory);

    container.innerHTML = '';
    if (terms.length === 0) {
      container.innerHTML = '<div class="p-4 text-xs text-center text-[var(--muted-foreground)]">No se encontraron términos coincidentes.</div>';
      return;
    }

    terms.forEach(term => {
      const item = document.createElement('div');
      item.className = `term-list-item ${this.currentTermId === term.id ? 'active' : ''}`;
      item.onclick = () => this.selectTerm(term.id);

      const isCross = this.currentGlossaryId === 'all';
      const glossaryInfo = isCross ? (window.DocWebSemantics.getGlossary(term.glossaryId)?.title || term.glossaryId) : term.category;

      item.innerHTML = `
        <div class="term-item-header">
          <span class="term-item-title">${term.title}</span>
          <span class="term-item-badge">${glossaryInfo}</span>
        </div>
        <div class="term-item-snippet">${term.shortDefinition || ''}</div>
      `;
      container.appendChild(item);
    });
  },

  selectTerm(termId) {
    this.currentTermId = termId;
    
    // Actualizar clase activa en la lista
    document.querySelectorAll('.term-list-item').forEach(el => el.classList.remove('active'));
    this.filterAndRenderTerms(); // sincroniza lista

    const term = window.DocWebSemantics.getTerm(termId);
    if (!term) return;

    this.renderTermView(term);
  },

  navigateToTerm(targetTermId) {
    this.selectTerm(targetTermId);
  },

  renderTermView(term) {
    const viewContainer = document.getElementById('term-view-container');
    if (!viewContainer) return;

    const glossary = window.DocWebSemantics.getGlossary(term.glossaryId);
    const directRels = term.relations || [];
    const inverseRels = window.DocWebSemantics.getInverseRelations(term.id);

    // Preparar JSON-LD
    const jsonLd = window.DocWebSemantics.generateJsonLd(term);
    let scriptTag = document.getElementById('term-jsonld-script');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'term-jsonld-script';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLd, null, 2);

    // Render HTML del Término
    viewContainer.innerHTML = `
      <div class="content-card">
        <div class="term-header-view">
          <div>
            <h1 class="term-title-large">${term.title}</h1>
            <div class="term-meta-row">
              <span class="term-badge-primary">📚 ${glossary ? glossary.title : term.glossaryId}</span>
              <span class="term-badge-primary">🏷️ ${term.category || 'General'}</span>
              <span class="term-badge-id">${term.id}</span>
              ${term.origin === 'persisted_local' ? '<span class="term-badge-cross" style="color:var(--success); border-color:var(--success);">💾 Persistido Local</span>' : ''}
            </div>
          </div>
          <div style="display:flex; gap:0.5rem;">
            <button class="btn btn-sm btn-primary" onclick="window.DocWebApp.openTermEditor('${term.id}')">✏️ Ampliar Conocimiento</button>
          </div>
        </div>

        <div class="section-label">Definición Concisa</div>
        <div class="definition-lead">${term.shortDefinition || 'Sin definición corta'}</div>

        <div class="section-label">Desarrollo Conceptual Extendido</div>
        <div class="definition-full">${term.fullDefinition || 'Sin definición detallada'}</div>

        <!-- Atributos Técnicos -->
        <div class="info-grid">
          <div class="info-block">
            <div class="info-block-title">⚙️ Atributos Específicos</div>
            <div class="info-block-content">
              ${term.attributes ? Object.entries(term.attributes).map(([k, v]) => `<div><strong>${k}:</strong> ${v}</div>`).join('') : '<span class="text-xs text-[var(--muted-foreground)]">No definidos</span>'}
            </div>
          </div>

          <div class="info-block">
            <div class="info-block-title">🧩 Componentes y Estructura</div>
            <div class="info-block-content">
              ${term.components && term.components.length > 0 
                ? `<ul style="padding-left:1.2rem;">${term.components.map(c => `<li>${c}</li>`).join('')}</ul>` 
                : '<span class="text-xs text-[var(--muted-foreground)]">Sin componentes declarados</span>'}
            </div>
          </div>

          <div class="info-block">
            <div class="info-block-title">🎯 Aplicaciones Prácticas</div>
            <div class="info-block-content">
              ${term.applications && term.applications.length > 0 
                ? `<ul style="padding-left:1.2rem;">${term.applications.map(a => `<li>${a}</li>`).join('')}</ul>` 
                : '<span class="text-xs text-[var(--muted-foreground)]">Sin aplicaciones registradas</span>'}
            </div>
          </div>

          <div class="info-block">
            <div class="info-block-title">💡 Ejemplos Documentados</div>
            <div class="info-block-content">
              ${term.examples && term.examples.length > 0 
                ? `<ul style="padding-left:1.2rem;">${term.examples.map(ex => `<li>${ex}</li>`).join('')}</ul>` 
                : '<span class="text-xs text-[var(--muted-foreground)]">Sin ejemplos registrados</span>'}
            </div>
          </div>
        </div>
      </div>

      <!-- Diagrama Contextual Semántico -->
      <div class="content-card">
        <div class="term-header-view" style="margin-bottom:0.5rem;">
          <div>
            <h2 style="font-size:1.15rem; font-weight:700;">🗺️ Diagrama Contextual de Relaciones</h2>
            <p style="font-size:0.8rem; color:var(--muted-foreground);">Visualización interactiva autónoma en SVG. Haz clic en cualquier nodo para navegar.</p>
          </div>
        </div>
        <div class="diagram-svg-wrapper" style="overflow-x:auto;">
          ${window.DocWebSemantics.generateContextualDiagramSvg(term)}
        </div>
      </div>

      <!-- Relaciones Semánticas Bidireccionales -->
      <div class="content-card">
        <h2 style="font-size:1.15rem; font-weight:700; margin-bottom:0.75rem;">🔗 Relaciones Semánticas Explícitas</h2>
        
        <div class="section-label">Relaciones Salientes (Directas)</div>
        <div class="relations-container">
          ${directRels.length > 0 ? directRels.map(rel => {
            const targetT = window.DocWebSemantics.getTerm(rel.target);
            const isCross = targetT && targetT.glossaryId !== term.glossaryId;
            return `
              <div class="relation-card">
                <div class="relation-info">
                  <div style="display:flex; align-items:center; gap:0.5rem;">
                    <span class="relation-type-tag">${rel.type}</span>
                    <span style="font-size:0.75rem; color:var(--muted-foreground);">${rel.label || ''}</span>
                    ${isCross ? '<span class="relation-badge-cross">Inter-Glosario ⤻</span>' : ''}
                  </div>
                  <a class="relation-target-title" onclick="window.DocWebApp.navigateToTerm('${rel.target}')">
                    ${targetT ? targetT.title : rel.target}
                  </a>
                  <div class="relation-note">${rel.note || ''}</div>
                </div>
                <button class="btn btn-sm" onclick="window.DocWebApp.navigateToTerm('${rel.target}')">Explorar →</button>
              </div>
            `;
          }).join('') : '<div class="text-xs text-[var(--muted-foreground)]">No posee relaciones salientes declaradas.</div>'}
        </div>

        <div class="section-label" style="margin-top:1.5rem;">Relaciones Entrantes (Inversas Calculadas)</div>
        <div class="relations-container">
          ${inverseRels.length > 0 ? inverseRels.map(inv => {
            const isCross = inv.sourceGlossaryId !== term.glossaryId;
            return `
              <div class="relation-card">
                <div class="relation-info">
                  <div style="display:flex; align-items:center; gap:0.5rem;">
                    <span class="relation-type-tag inverse">${inv.type} (${inv.originalType})</span>
                    <span style="font-size:0.75rem; color:var(--muted-foreground);">${inv.label || ''}</span>
                    ${isCross ? '<span class="relation-badge-cross">Inter-Glosario ⤻</span>' : ''}
                  </div>
                  <a class="relation-target-title" onclick="window.DocWebApp.navigateToTerm('${inv.sourceTermId}')">
                    ${inv.sourceTitle}
                  </a>
                  <div class="relation-note">${inv.note || ''}</div>
                </div>
                <button class="btn btn-sm" onclick="window.DocWebApp.navigateToTerm('${inv.sourceTermId}')">Ir al origen ←</button>
              </div>
            `;
          }).join('') : '<div class="text-xs text-[var(--muted-foreground)]">Ningún otro término referencia directamente a esta entidad.</div>'}
        </div>
      </div>

      <!-- JSON-LD Preview Inspector -->
      <div class="content-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <h2 style="font-size:0.95rem; font-weight:700;">🌐 Datos Estructurados JSON-LD (Schema.org DefinedTerm)</h2>
          <span style="font-size:0.75rem; color:var(--muted-foreground);">Inyectado en DOM</span>
        </div>
        <pre style="background:var(--background); border:1px solid var(--border); padding:0.75rem; border-radius:var(--radius); font-size:0.75rem; overflow-x:auto;">${JSON.stringify(jsonLd, null, 2)}</pre>
      </div>
    `;
  },

  // Modal de Edición / Ampliación Semántica
  openTermEditor(termId = null) {
    const existing = termId ? window.DocWebSemantics.getTerm(termId) : null;
    const isNew = !existing;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'term-editor-modal';

    const glossariesList = Array.from(window.DocWebSemantics.glossaries.values());

    modal.innerHTML = `
      <div class="modal-content">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h2 style="font-size:1.15rem; font-weight:700;">${isNew ? '✨ Nuevo Término de Conocimiento' : '✏️ Ampliar Término Existente'}</h2>
          <button class="btn btn-sm" onclick="document.getElementById('term-editor-modal').remove()">✕</button>
        </div>

        <div class="form-group">
          <label class="form-label">Glosario Destino</label>
          <select id="edit-glossary" class="form-select">
            ${glossariesList.map(g => `<option value="${g.id}" ${existing && existing.glossaryId === g.id ? 'selected' : ''}>${g.title}</option>`).join('')}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Título del Término</label>
          <input type="text" id="edit-title" class="form-input" value="${existing ? existing.title : ''}" placeholder="Ej. Trazado de Trayectorias">
        </div>

        <div class="form-group">
          <label class="form-label">Categoría Temática</label>
          <input type="text" id="edit-category" class="form-input" value="${existing ? existing.category : ''}" placeholder="Ej. Renderizado">
        </div>

        <div class="form-group">
          <label class="form-label">Definición Concisa (Lead)</label>
          <textarea id="edit-shortDef" class="form-textarea" placeholder="Resumen directo del concepto">${existing ? existing.shortDefinition : ''}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Definición Completa y Rigurosa</label>
          <textarea id="edit-fullDef" class="form-textarea" style="min-height:100px;" placeholder="Fundamentación conceptual, matemática o técnica">${existing ? existing.fullDefinition : ''}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Componentes (separados por coma)</label>
          <input type="text" id="edit-components" class="form-input" value="${existing && existing.components ? existing.components.join(', ') : ''}" placeholder="Comp 1, Comp 2">
        </div>

        <div class="form-group">
          <label class="form-label">Registro de Modificación / Justificación (Changelog)</label>
          <input type="text" id="edit-changelog" class="form-input" value="Ampliación conceptual y enriquecimiento semántico local" placeholder="Motivo del cambio">
        </div>

        <div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-top:1rem;">
          <button class="btn" onclick="document.getElementById('term-editor-modal').remove()">Cancelar</button>
          <button class="btn btn-primary" onclick="window.DocWebApp.saveEditorTerm('${termId || ''}')">💾 Guardar y Persistir Localmente</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  },

  async saveEditorTerm(existingId) {
    const glossaryId = document.getElementById('edit-glossary').value;
    const title = document.getElementById('edit-title').value.trim();
    const category = document.getElementById('edit-category').value.trim();
    const shortDef = document.getElementById('edit-shortDef').value.trim();
    const fullDef = document.getElementById('edit-fullDef').value.trim();
    const componentsStr = document.getElementById('edit-components').value.trim();
    const changelog = document.getElementById('edit-changelog').value.trim();

    if (!title) {
      alert('El título del término es obligatorio.');
      return;
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const termId = existingId || `urn:term:${glossaryId}:${slug}`;

    const existingTerm = existingId ? window.DocWebSemantics.getTerm(existingId) : {};

    const updatedTerm = {
      ...existingTerm,
      id: termId,
      slug: slug,
      title: title,
      glossaryId: glossaryId,
      category: category || 'General',
      shortDefinition: shortDef,
      fullDefinition: fullDef,
      components: componentsStr ? componentsStr.split(',').map(s => s.trim()).filter(Boolean) : (existingTerm.components || []),
      relations: existingTerm.relations || []
    };

    try {
      this.updateStatus('Persistiendo término en IndexedDB...', 'info');
      await window.DocWebStorage.saveTerm(updatedTerm, 'local-user', changelog);
      
      // Actualizar motor en memoria
      window.DocWebSemantics.terms.set(updatedTerm.id, updatedTerm);
      window.DocWebSemantics.computeInverseRelations();

      document.getElementById('term-editor-modal').remove();
      this.renderCategoryChips();
      this.filterAndRenderTerms();
      this.selectTerm(updatedTerm.id);
      this.updateStatus(`Término "${title}" guardado y persistido con éxito.`, 'success');
    } catch (e) {
      console.error('Error al guardar término:', e);
      alert('Error de persistencia: ' + e.message);
      this.updateStatus('Error al guardar en almacenamiento persistente.', 'danger');
    }
  },

  async exportCapsule() {
    try {
      this.updateStatus('Generando cápsula de exportación...', 'info');
      const capsule = await window.DocWebStorage.exportKnowledgeCapsule();
      
      // Añadir también términos canónicos para una exportación completa si se desea
      capsule.canonicalIncluded = window.DocWebSemantics.getAllTerms();

      const blob = new Blob([JSON.stringify(capsule, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `docweb-knowledge-capsule-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.updateStatus('Cápsula de conocimiento exportada correctamente.', 'success');
    } catch (e) {
      console.error('Error al exportar:', e);
      alert('Error al exportar cápsula: ' + e.message);
    }
  },

  async handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      this.updateStatus('Importando cápsula...', 'info');
      const text = await file.text();
      const capsule = JSON.parse(text);

      const result = await window.DocWebStorage.importKnowledgeCapsule(capsule);
      
      // Recargar motor
      const catalogRes = await fetch('./app/data/catalog.json');
      const catalog = await catalogRes.json();
      const glossariesData = {};
      for (const g of catalog.canonicalGlossaries) {
        const termsRes = await fetch(g.dataPath);
        const tData = await termsRes.json();
        glossariesData[g.id] = tData.canonicalTerms || [];
      }
      await window.DocWebSemantics.loadAll(catalog, glossariesData);

      this.renderCategoryChips();
      this.filterAndRenderTerms();
      this.updateStatus(`Importados ${result.importedTerms} términos y ${result.importedRevisions} revisiones.`, 'success');
      alert(`Importación completada con éxito:\n- Términos importados: ${result.importedTerms}\n- Revisiones de auditoría: ${result.importedRevisions}`);
    } catch (e) {
      console.error('Error al importar:', e);
      alert('Error en importación: ' + e.message);
      this.updateStatus('Fallo al importar cápsula.', 'danger');
    }
  }
};

window.addEventListener('DOMContentLoaded', () => {
  window.DocWebApp.init();
});
