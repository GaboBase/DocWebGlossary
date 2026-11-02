/**
 * DOCWEB MULTIGLOSSARY — Controlador Principal de la Aplicación
 * Conecta UI, Motor Semántico, Persistencia Local IndexedDB y Diagramación.
 */

window.DocWebApp = {
  escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  currentGlossaryId: 'all',
  currentCategory: 'all',
  currentLetter: 'all',
  currentTermId: null,
  activeTab: 'details', // 'details', 'diagram', 'jsonld', 'history'
  searchDebounceTimer: null,

  // Estado reactivo del Diagrama Contextual Multimodal
  diagramViewMode: 'focal', // 'focal', 'hierarchy', 'pipeline', 'atlas'
  diagramZoom: 1.0,
  diagramFilterFamily: 'all',
  diagramFilterLevel: 'all',
  diagramSearchQuery: '',

  // Navegación de Vistas y Portal Hub
  currentView: 'glossary-view',
  hoverMode: 'complete', // 'complete', 'simple', 'off'
  hubFilterDomain: 'all',
  hubFilterLevel: 'all',
  hubFilterPhase: 'all',
  hubFilterModality: 'all',
  hubFilterQuery: '',
  _isUpdatingHash: false,

  // Estado de Composición Interdominio (B-10)
  composedTerms: [],      // Array de IDs de términos seleccionados para composición
  composedPrompt: '',     // Prompt compuesto generado desde términos seleccionados
  compFilterDomain: 'all', // Dominio filtrado para candidatos de composición
  compFilterQuery: '',    // Consulta de texto para candidatos de composición

  async init() {
    try {
      this.updateStatus('Cargando catálogo canónico...', 'info');

      let catalog = null;
      const glossariesData = {};

      // 1. Carga universal desde paquete local (soporta protocolo file:/// sin bloqueos CORS)
      if (window.DocWebCanonicalData && window.DocWebCanonicalData.catalog) {
        catalog = window.DocWebCanonicalData.catalog;
        const bundleGlossaries = window.DocWebCanonicalData.glossaries || {};
        for (const [gid, terms] of Object.entries(bundleGlossaries)) {
          glossariesData[gid] = terms;
        }
      } else {
        // Fallback vía fetch para entornos servidos por HTTP
        const catalogRes = await fetch('./app/data/catalog.json');
        catalog = await catalogRes.json();

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
      }

      // 2. Inicializar Motor Semántico
      await window.DocWebSemantics.loadAll(catalog, glossariesData);

      // 3. Renderizar Interfaz
      this.renderGlossarySelector();
      this.renderCategoryChips();
      this.renderAzNav();
      this.filterAndRenderTerms();
      this.setupViewTabs();
      this.initHomepage();
      this.initCompositionPanel();
      this.setupHoverSystem();

      // 4. Configurar Enrutamiento por Hash en la URL (Deep Linking & Navegación Historial)
      this.setupHashRouter();

      // Resolver ruta inicial desde el hash de la URL o seleccionar primer término
      const hasInitialHash = typeof window !== 'undefined' && window.location && window.location.hash && window.location.hash.length > 1;
      if (hasInitialHash) {
        this.handleHashChange();
      } else {
        const allTerms = window.DocWebSemantics.getAllTerms();
        if (allTerms.length > 0) {
          this.selectTerm(allTerms[0].id, false);
        }
      }

      this.setupEventListeners();
      this.setupDelegatedActions();
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
        clearTimeout(this.searchDebounceTimer);
        this.searchDebounceTimer = setTimeout(() => {
          this.filterAndRenderTerms(e.target.value);
        }, 120);
      });
    }

    const glossarySelect = document.getElementById('glossary-select');
    if (glossarySelect) {
      glossarySelect.addEventListener('change', (e) => {
        this.currentGlossaryId = e.target.value;
        this.currentCategory = 'all';
        this.currentLetter = 'all';
        this.updateAzNavActive();
        this.renderCategoryChips();
        this.filterAndRenderTerms(searchInput ? searchInput.value : '');
        this.populateOrientatorProductSelect();

        // Actualización inmediata de la visualización del término y diagrama
        const availableTerms = this.currentGlossaryId === 'all'
          ? window.DocWebSemantics.getAllTerms()
          : window.DocWebSemantics.getTermsByGlossary(this.currentGlossaryId);

        if (availableTerms.length > 0) {
          // Seleccionar primer término del glosario activo para refrescar tarjeta y diagrama
          this.selectTerm(availableTerms[0].id);
        }

        const gObj = window.DocWebSemantics.getGlossary(this.currentGlossaryId);
        const gTitle = gObj ? gObj.title : (this.currentGlossaryId === 'all' ? 'Catálogo Transversal (Todos)' : this.currentGlossaryId);
        this.updateStatus(`Glosario activo: ${gTitle} (${availableTerms.length} términos)`, 'success');
      });
    }

    // Botón Término Aleatorio
    const btnRandom = document.getElementById('btn-random-term');
    if (btnRandom) {
      btnRandom.addEventListener('click', () => this.selectRandomTerm());
    }

    // Botón Inspector DOM & Semántica
    const btnInspector = document.getElementById('btn-toggle-inspector');
    if (btnInspector) {
      btnInspector.addEventListener('click', () => this.toggleDomInspector());
    }

    // Atajo de teclado para Inspector DOM (Alt + I)
    document.addEventListener('keydown', (e) => {
      if (e.altKey && (e.key === 'i' || e.key === 'I')) {
        e.preventDefault();
        this.toggleDomInspector();
      }
    });

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

    // Modal Orientador Audiovisual IA (Milestone 4)
    const btnOrientator = document.getElementById('btn-orientator');
    if (btnOrientator) {
      btnOrientator.addEventListener('click', () => this.openOrientatorModal());
    }

    const btnCloseOrientator = document.getElementById('btn-close-orientator');
    if (btnCloseOrientator) {
      btnCloseOrientator.addEventListener('click', () => this.closeOrientatorModal());
    }

    const orientatorModal = document.getElementById('orientator-modal');
    if (orientatorModal) {
      orientatorModal.addEventListener('click', (e) => {
        if (e.target === orientatorModal) {
          this.closeOrientatorModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('orientator-modal');
        if (modal && modal.style.display !== 'none') {
          this.closeOrientatorModal();
        }
      }
    });

    const orientatorGlossaryPicker = document.getElementById('orientator-glossary-picker');
    if (orientatorGlossaryPicker) {
      orientatorGlossaryPicker.addEventListener('change', (e) => {
        this.populateOrientatorProductSelect(e.target.value);
      });
    }

    const orientatorSelect = document.getElementById('orientator-product-select');
    if (orientatorSelect) {
      orientatorSelect.addEventListener('change', (e) => {
        this.populateOrientatorProductDefaults(e.target.value);
        this.updateHash(`#/orientator/${e.target.value}`);
      });
    }

    const btnResetOrientator = document.getElementById('btn-reset-orientator');
    if (btnResetOrientator) {
      btnResetOrientator.addEventListener('click', () => {
        const prodId = orientatorSelect ? orientatorSelect.value : 'trailer';
        this.populateOrientatorProductDefaults(prodId);
      });
    }

    const btnGenerateSpec = document.getElementById('btn-generate-spec');
    if (btnGenerateSpec) {
      btnGenerateSpec.addEventListener('click', () => this.generateOrientatorSpecification());
    }

    const btnCopyPos = document.getElementById('btn-copy-positive');
    if (btnCopyPos) {
      btnCopyPos.addEventListener('click', () => this.copyToClipboard('spec-positive-prompt', 'btn-copy-positive', '📋 Copiar Prompt'));
    }

    const btnCopyNeg = document.getElementById('btn-copy-negative');
    if (btnCopyNeg) {
      btnCopyNeg.addEventListener('click', () => this.copyToClipboard('spec-negative-prompt', 'btn-copy-negative', '📋 Copiar Negative'));
    }

    const btnCopyDir = document.getElementById('btn-copy-directives');
    if (btnCopyDir) {
      btnCopyDir.addEventListener('click', () => this.copyToClipboard('spec-action-directives', 'btn-copy-directives', '📋 Copiar Directivas'));
    }
  },

  // =========================================================================
  // DELEGATED EVENT SYSTEM (CSP-SAFE)
  // Replaces inline event handlers (onclick / onchange / onsubmit) so the page
  // works under script-src 'self' without 'unsafe-inline'. Reads data-cmd /
  // data-cmd-arg attributes instead of executing markup-embedded JavaScript.
  // =========================================================================

  setupDelegatedActions() {
    if (typeof document === 'undefined') return;

    // Coerce numeric string arguments into real numbers (e.g. zoom steps).
    const coerceArg = (arg) => {
      if (arg !== null && arg !== '' && /^-?\d+(\.\d+)?$/.test(String(arg))) {
        return Number(arg);
      }
      return arg;
    };

    const invokeClick = (target) => {
      const cmdEl = target.closest('[data-cmd]');
      if (!cmdEl) return;
      const method = cmdEl.getAttribute('data-cmd');
      let arg = cmdEl.getAttribute('data-cmd-arg');
      if (arg === null) {
        arg = cmdEl.getAttribute('data-term-id')
          || cmdEl.getAttribute('data-format')
          || cmdEl.getAttribute('data-mode')
          || '';
      }
      const fn = window.DocWebApp && window.DocWebApp[method];
      if (typeof fn === 'function') {
        fn(coerceArg(arg), cmdEl);
      }
    };

    document.addEventListener('click', (e) => invokeClick(e.target), true);

    document.addEventListener('change', (e) => {
      const select = e.target.closest('[data-cmd]');
      if (!select) return;
      const method = select.getAttribute('data-cmd');
      const fn = window.DocWebApp && window.DocWebApp[method];
      if (typeof fn === 'function') {
        fn(select.value);
      }
    }, true);
  },

  // =========================================================================
  // SISTEMA DE NAVEGACIÓN POR PESTAÑAS (HUB / GLOSARIOS / DIAGRAMA / ORIENTADOR)
  // =========================================================================

  setupViewTabs() {
    const tabs = document.querySelectorAll('.nav-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetView = tab.dataset.targetView;
        this.switchView(targetView);
      });
    });
  },

  switchView(viewId, updateUrl = true) {
    if (viewId === 'orientator-view') {
      this.openOrientatorModal();
      return;
    }

    if (viewId === 'diagram-view') {
      this.switchView('glossary-view', false);
      const diagramEl = document.getElementById('diagram-section-container');
      if (diagramEl) {
        diagramEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      const navBtnDiagram = document.getElementById('nav-btn-diagram');
      document.querySelectorAll('.nav-tab-btn').forEach(b => b.classList.remove('active'));
      if (navBtnDiagram) navBtnDiagram.classList.add('active');

      if (updateUrl) {
        const term = this.currentTermId ? window.DocWebSemantics.getTerm(this.currentTermId) : null;
        if (term && term.slug) {
          this.updateHash(`#/diagram/${term.slug}`);
        } else {
          this.updateHash('#/diagram');
        }
      }
      return;
    }

    this.currentView = viewId;
    document.querySelectorAll('.nav-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.targetView === viewId);
    });

    const homepageView = document.getElementById('homepage-view');
    const glossaryView = document.getElementById('glossary-view');

    if (viewId === 'homepage-view') {
      if (homepageView) homepageView.style.display = 'block';
      if (glossaryView) glossaryView.style.display = 'none';
      this.renderHomepage();
      if (updateUrl) {
        this.updateHash('#/hub');
      }
    } else {
      if (homepageView) homepageView.style.display = 'none';
      if (glossaryView) glossaryView.style.display = 'grid';
      if (updateUrl) {
        const term = this.currentTermId ? window.DocWebSemantics.getTerm(this.currentTermId) : null;
        if (term && term.slug) {
          this.updateHash(`#/term/${term.slug}`);
        } else {
          this.updateHash(`#/glossary/${this.currentGlossaryId || 'all'}`);
        }
      }
    }
  },

  // =========================================================================
  // ENRUTAMIENTO POR HASH EN LA URL (DEEP LINKING & HISTORIAL)
  // =========================================================================

  setupHashRouter() {
    if (typeof window === 'undefined') return;
    window.addEventListener('hashchange', () => {
      if (this._isUpdatingHash) return;
      this.handleHashChange();
    });
  },

  updateHash(hash) {
    if (typeof window === 'undefined' || !window.location) return;
    if (window.location.hash === hash) return;
    this._isUpdatingHash = true;
    try {
      window.location.hash = hash;
    } finally {
      setTimeout(() => { this._isUpdatingHash = false; }, 40);
    }
  },

  handleHashChange() {
    if (typeof window === 'undefined' || !window.location || !window.DocWebSemantics) return;
    const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
    if (!rawHash) {
      this.switchView('homepage-view', false);
      return;
    }

    const parts = rawHash.split('/');
    const section = parts[0];

    if (section === 'hub' || section === 'home') {
      this.switchView('homepage-view', false);
    } else if (section === 'orientator') {
      const prodId = parts[1] || null;
      this.openOrientatorModal(prodId, false);
    } else if (section === 'glossary') {
      const gid = parts[1] || 'all';
      this.currentGlossaryId = gid;
      const select = document.getElementById('glossary-select');
      if (select) select.value = gid;
      this.renderCategoryChips();
      this.renderAzNav();
      
      const termSlug = parts[2];
      if (termSlug) {
        const found = window.DocWebSemantics.getAllTerms().find(t => 
          (gid === 'all' || t.glossaryId === gid) && (t.slug === termSlug || t.id.endsWith(':' + termSlug))
        );
        if (found) {
          this.switchView('glossary-view', false);
          this.selectTerm(found.id, false);
          return;
        }
      }
      this.switchView('glossary-view', false);
      this.filterAndRenderTerms();
    } else if (section === 'term') {
      const termIdentifier = parts.slice(1).join('/');
      const all = window.DocWebSemantics.getAllTerms();
      const found = window.DocWebSemantics.getTerm(termIdentifier) || 
                    all.find(t => t.slug === termIdentifier || t.id === termIdentifier || t.id.endsWith(':' + termIdentifier));
      if (found) {
        this.currentGlossaryId = found.glossaryId;
        const select = document.getElementById('glossary-select');
        if (select) select.value = found.glossaryId;
        this.renderCategoryChips();
        this.renderAzNav();
        this.switchView('glossary-view', false);
        this.selectTerm(found.id, false);
      }
    } else if (section === 'diagram') {
      const termIdentifier = parts.slice(1).join('/');
      if (termIdentifier) {
        const all = window.DocWebSemantics.getAllTerms();
        const found = window.DocWebSemantics.getTerm(termIdentifier) ||
                      all.find(t => t.slug === termIdentifier || t.id === termIdentifier || t.id.endsWith(':' + termIdentifier));
        if (found) {
          this.selectTerm(found.id, false);
        }
      }
      this.switchView('diagram-view', false);
    }
  },

  copyTermDeepLink(termId) {
    if (typeof window === 'undefined' || !window.location) return;
    const term = window.DocWebSemantics.getTerm(termId);
    if (!term) return;
    const baseUrl = (window.location.href || '').split('#')[0];
    const cleanUrl = `${baseUrl}#/term/${term.slug}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanUrl).then(() => {
        this.updateStatus(`Enlace directo copiado: ${cleanUrl}`, 'success');
      }).catch(() => {
        prompt('Enlace directo al término:', cleanUrl);
      });
    } else {
      prompt('Enlace directo al término:', cleanUrl);
    }
  },

  // =========================================================================
  // PORTAL HUB & EXPLORADOR TRANSVERSAL MULTIFACÉTICO (HOMEPAGE)
  // =========================================================================

  initHomepage() {
    const selectDomain = document.getElementById('filter-hub-domain');
    if (selectDomain && window.DocWebSemantics) {
      selectDomain.innerHTML = '<option value="all">🔍 Todos los Dominios (Catálogo Transversal)</option>';
      window.DocWebSemantics.glossaries.forEach((g, gid) => {
        const opt = document.createElement('option');
        opt.value = gid;
        opt.textContent = `📚 ${g.title} (${g.termCount || 0} términos)`;
        selectDomain.appendChild(opt);
      });

      selectDomain.addEventListener('change', (e) => {
        this.hubFilterDomain = e.target.value;
        this.filterAndRenderHubTerms();
      });
    }

    const selectLevel = document.getElementById('filter-hub-level');
    if (selectLevel) {
      selectLevel.addEventListener('change', (e) => {
        this.hubFilterLevel = e.target.value;
        this.filterAndRenderHubTerms();
      });
    }

    const selectPhase = document.getElementById('filter-hub-phase');
    if (selectPhase) {
      selectPhase.addEventListener('change', (e) => {
        this.hubFilterPhase = e.target.value;
        this.filterAndRenderHubTerms();
      });
    }

    const selectModality = document.getElementById('filter-hub-modality');
    if (selectModality) {
      selectModality.addEventListener('change', (e) => {
        this.hubFilterModality = e.target.value;
        this.filterAndRenderHubTerms();
      });
    }

    const filterText = document.getElementById('filter-hub-text');
    if (filterText) {
      filterText.addEventListener('input', (e) => {
        this.hubFilterQuery = e.target.value.toLowerCase().trim();
        this.filterAndRenderHubTerms();
      });
    }

    const btnResetHub = document.getElementById('btn-reset-hub-filters');
    if (btnResetHub) {
      btnResetHub.addEventListener('click', () => {
        this.hubFilterDomain = 'all';
        this.hubFilterLevel = 'all';
        this.hubFilterPhase = 'all';
        this.hubFilterModality = 'all';
        this.hubFilterQuery = '';
        if (selectDomain) selectDomain.value = 'all';
        if (selectLevel) selectLevel.value = 'all';
        if (selectPhase) selectPhase.value = 'all';
        if (selectModality) selectModality.value = 'all';
        if (filterText) filterText.value = '';
        this.filterAndRenderHubTerms();
      });
    }

    this.setupHeroSearch();
    this.renderHomepage();
  },

  renderHomepage() {
    if (!window.DocWebSemantics) return;

    // 1. Métricas Globales
    const allTerms = window.DocWebSemantics.getAllTerms();
    const glossariesCount = window.DocWebSemantics.glossaries.size;
    let totalDirectRelations = 0;
    allTerms.forEach(t => {
      totalDirectRelations += (t.relations || []).length;
    });

    const statTermsEl = document.getElementById('stat-total-terms');
    if (statTermsEl) statTermsEl.textContent = allTerms.length;

    const statGlossEl = document.getElementById('stat-total-glossaries');
    if (statGlossEl) statGlossEl.textContent = glossariesCount;

    const statRelEl = document.getElementById('stat-total-relations');
    if (statRelEl) statRelEl.textContent = `${totalDirectRelations}+`;

    // 2. Vitrina de Glosarios Especializados
    const showcaseContainer = document.getElementById('homepage-glossary-cards');
    if (showcaseContainer) {
      showcaseContainer.innerHTML = '';
      window.DocWebSemantics.glossaries.forEach((g, gid) => {
        const termsInG = window.DocWebSemantics.getTermsByGlossary(gid);
        const topCategories = (g.categories || []).slice(0, 4);

        const card = document.createElement('div');
        card.className = 'glossary-showcase-card';
        card.setAttribute('data-hover-info', `Glosario temático: ${this.escapeHtml(g.title)}. Dominio: ${this.escapeHtml(g.domain)}`);
        card.innerHTML = `
          <div>
            <div class="glossary-card-header">
              <h3 class="glossary-card-title">${this.escapeHtml(g.title)}</h3>
              <span class="glossary-card-count">${termsInG.length} conceptos</span>
            </div>
            <div class="glossary-card-domain" style="margin-top:0.4rem;">${this.escapeHtml(g.domain)}</div>
            <p class="glossary-card-desc" style="margin-top:0.6rem;">${this.escapeHtml(g.description)}</p>
          </div>
          <div>
            <div class="glossary-card-tags">
              ${topCategories.map(cat => `<span class="glossary-tag-chip">🏷️ ${this.escapeHtml(cat)}</span>`).join('')}
            </div>
            <div class="glossary-card-footer">
              <span style="font-size:0.75rem; color:var(--muted-foreground);">v${this.escapeHtml(g.version || '1.0.0')}</span>
              <button type="button" class="btn btn-sm btn-primary btn-explore-glossary" data-glossary-id="${gid}">
                Explorar Glosario ➔
              </button>
            </div>
          </div>
        `;

        const btnExplore = card.querySelector('.btn-explore-glossary');
        if (btnExplore) {
          btnExplore.addEventListener('click', () => {
            this.switchView('glossary-view');
            this.currentGlossaryId = gid;
            const selectEl = document.getElementById('glossary-select');
            if (selectEl) selectEl.value = gid;
            this.currentCategory = 'all';
            this.currentLetter = 'all';
            this.renderCategoryChips();
            this.filterAndRenderTerms();
            if (termsInG.length > 0) this.selectTerm(termsInG[0].id);
          });
        }

        showcaseContainer.appendChild(card);
      });
    }

    // 3. Renderizar resultados del explorador transversal
    this.filterAndRenderHubTerms();

    // 4. Renderizar panel de composición interdominio
    this.renderCompositionPanel();
  },

  // =========================================================================
  // COMPOSICIÓN INTERDOMINIO (B-10)
  // Selección de términos desde múltiples dominios con procedencia de dominio
  // y composición de prompts consciente de relaciones.
  // =========================================================================

  initCompositionPanel() {
    if (typeof document === 'undefined') return;

    // Selector de dominios de origen (chips)
    const domainChipsContainer = document.getElementById('composition-domain-chips');
    if (domainChipsContainer && window.DocWebSemantics) {
      domainChipsContainer.innerHTML = '';
      const allChip = document.createElement('button');
      allChip.type = 'button';
      allChip.className = 'cat-chip active';
      allChip.textContent = 'Todos los Dominios';
      allChip.setAttribute('data-cmd', 'selectCompositionDomain');
      allChip.setAttribute('data-cmd-arg', 'all');
      allChip.setAttribute('role', 'button');
      allChip.setAttribute('tabindex', '0');
      allChip.onclick = () => this.selectCompositionDomain('all');
      domainChipsContainer.appendChild(allChip);

      window.DocWebSemantics.glossaries.forEach((g, gid) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'cat-chip';
        chip.textContent = `📚 ${g.title}`;
        chip.setAttribute('data-cmd', 'selectCompositionDomain');
        chip.setAttribute('data-cmd-arg', gid);
        chip.setAttribute('role', 'button');
        chip.setAttribute('tabindex', '0');
        chip.onclick = () => this.selectCompositionDomain(gid);
        domainChipsContainer.appendChild(chip);
      });
    }

    // Campo de búsqueda de composición
    const compText = document.getElementById('filter-comp-text');
    if (compText) {
      compText.addEventListener('input', (e) => {
        this.compFilterQuery = e.target.value.toLowerCase().trim();
        this.renderComposedTermsCandidates();
      });
    }

    // Botón limpiar composición
    const btnClear = document.getElementById('btn-clear-composition');
    if (btnClear) {
      btnClear.addEventListener('click', () => this.clearComposition());
    }
  },

  selectCompositionDomain(domainId) {
    this.compFilterDomain = domainId;
    // Actualizar chips activos
    const container = document.getElementById('composition-domain-chips');
    if (container) {
      container.querySelectorAll('.cat-chip').forEach(chip => {
        const arg = chip.getAttribute('data-cmd-arg');
        chip.classList.toggle('active', arg === domainId);
      });
    }
    this.renderComposedTermsCandidates();
  },

  toggleComposedTerm(termId) {
    const idx = this.composedTerms.indexOf(termId);
    if (idx >= 0) {
      this.composedTerms.splice(idx, 1);
    } else {
      this.composedTerms.push(termId);
    }
    this.renderCompositionPanel();
    this.updateStatus(
      `Término ${idx >= 0 ? 'eliminado de' : 'agregado a'} la composición interdominio`,
      'info'
    );
  },

  isTermComposed(termId) {
    return this.composedTerms.includes(termId);
  },

  clearComposition() {
    this.composedTerms = [];
    this.composedPrompt = '';
    const output = document.getElementById('composed-prompt-output');
    if (output) output.textContent = '';
    this.renderCompositionPanel();
    this.updateStatus('Composición interdominio limpiada', 'info');
  },

  renderCompositionPanel() {
    // Actualizar contador
    const badge = document.getElementById('composition-count-badge');
    if (badge) {
      badge.textContent = `${this.composedTerms.length} término${this.composedTerms.length !== 1 ? 's' : ''} seleccionado${this.composedTerms.length !== 1 ? 's' : ''}`;
    }

    // Renderizar términos seleccionados con procedencia
    const container = document.getElementById('composed-terms-container');
    if (!container) return;

    container.innerHTML = '';

    if (this.composedTerms.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding:1rem; text-align:center; color:var(--muted-foreground); font-size:0.85rem;">
          No hay términos seleccionados. Busca y selecciona conceptos de cualquier dominio para comenzar.
        </div>
      `;
      return;
    }

    this.composedTerms.forEach(termId => {
      const term = window.DocWebSemantics.getTerm(termId);
      if (!term) return;

      const provenance = window.DocWebSemantics.getTermProvenance(termId);
      const glossary = window.DocWebSemantics.getGlossary(term.glossaryId) || {};
      const relCount = Array.isArray(term.relations) ? term.relations.length : 0;
      const inverseCount = window.DocWebSemantics.getInverseRelations(termId).length;

      const chip = document.createElement('div');
      chip.className = 'composed-term-chip';
      chip.style.cssText = 'display:inline-flex; align-items:center; gap:0.4rem; padding:0.4rem 0.7rem; background:var(--card); border:1px solid var(--border); border-radius:var(--radius); font-size:0.8rem;';
      chip.setAttribute('data-term-id', termId);
      chip.setAttribute('role', 'button');
      chip.setAttribute('tabindex', '0');

      chip.innerHTML = `
        <span style="font-weight:600; color:var(--foreground);">${this.escapeHtml(term.title)}</span>
        <span style="font-size:0.65rem; color:var(--muted-foreground);">📚 ${provenance ? this.escapeHtml(provenance.glossaryTitle) : term.glossaryId}</span>
        <span style="font-size:0.65rem; color:#10b981;">🔗 ${relCount + inverseCount} rels</span>
        <button type="button" data-cmd="toggleComposedTerm" data-cmd-arg="${this.escapeHtml(termId)}" style="margin-left:auto; background:none; border:none; color:var(--danger); cursor:pointer; font-size:1rem; padding:0 0.2rem;">✕</button>
      `;

      chip.addEventListener('click', (e) => {
        // Si se hizo clic en el botón de eliminar, no navegar
        if (e.target.tagName === 'BUTTON') return;
        this.switchView('glossary-view');
        this.selectTerm(termId);
      });

      container.appendChild(chip);
    });
  },

  renderComposedTermsCandidates() {
    if (!window.DocWebSemantics) return;
    const container = document.getElementById('explorer-cards-container');
    if (!container) return;

    const query = this.compFilterQuery || '';
    const domainFilter = this.compFilterDomain || 'all';

    let terms = window.DocWebSemantics.getAllTerms();

    // Filtrar por dominio
    if (domainFilter && domainFilter !== 'all') {
      terms = terms.filter(t => t.glossaryId === domainFilter);
    }

    // Filtrar por texto
    if (query) {
      terms = terms.filter(t => {
        const text = `${t.title} ${t.slug} ${t.shortDefinition || ''} ${t.definition || ''} ${(t.synonyms || []).join(' ')}`.toLowerCase();
        return text.includes(query);
      });
    }

    // Ordenar alfabéticamente
    terms.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'es', { sensitivity: 'base' }));

    const counterEl = document.getElementById('explorer-results-counter');
    if (counterEl) {
      counterEl.textContent = `Composición: ${terms.length} término${terms.length !== 1 ? 's' : ''} disponible${terms.length !== 1 ? 's' : ''}`;
    }

    container.innerHTML = '';

    if (terms.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 3rem; text-align: center; color: var(--muted-foreground); background: var(--card); border: 1px dashed var(--border); border-radius: var(--radius);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
          <p style="font-size: 0.95rem; font-weight: 600;">No se encontraron términos para la composición.</p>
        </div>
      `;
      return;
    }

    terms.forEach(term => {
      const g = window.DocWebSemantics.getGlossary(term.glossaryId);
      const isSelected = this.isTermComposed(term.id);

      const card = document.createElement('article');
      card.className = `explorer-term-card ${isSelected ? 'composed-selected' : ''}`;
      card.setAttribute('data-term-id', term.id);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.style.cssText = isSelected ? 'border:2px solid var(--primary); background:rgba(37,99,235,0.05);' : '';

      card.innerHTML = `
        <div>
          <div class="explorer-term-header">
            <h4 class="explorer-term-title">${this.escapeHtml(term.title)}</h4>
            <span class="explorer-term-badge">📚 ${this.escapeHtml(g ? g.slug : term.glossaryId)}</span>
            ${isSelected ? '<span style="color:var(--primary); font-weight:700;">✓ Seleccionado</span>' : ''}
          </div>
          <div class="explorer-term-meta" style="margin: 0.4rem 0;">
            <span class="term-badge-cat" style="font-size: 0.65rem;">🏷️ ${this.escapeHtml(term.category || 'General')}</span>
          </div>
          <p class="explorer-term-snippet">${this.escapeHtml(term.shortDefinition || term.definition || 'Sin definición resumida.')}</p>
        </div>
        <div class="explorer-term-footer">
          <span>🔄 ${(term.relations || []).length} relaciones</span>
          <span style="font-weight: 600; color: var(--primary);">${isSelected ? 'Quitar de composición' : 'Agregar a composición'}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        this.toggleComposedTerm(term.id);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleComposedTerm(term.id);
        }
      });

      container.appendChild(card);
    });
  },

  composeCrossDomainPrompt() {
    if (!window.DocWebSemantics || this.composedTerms.length === 0) {
      this.updateStatus('No hay términos seleccionados para componer un prompt.', 'warning');
      return;
    }

    const terms = this.composedTerms.map(id => window.DocWebSemantics.getTerm(id)).filter(Boolean);
    if (terms.length === 0) return;

    // Agrupar por dominio para trazabilidad de procedencia
    const byDomain = new Map();
    for (const t of terms) {
      if (!byDomain.has(t.glossaryId)) {
        const g = window.DocWebSemantics.getGlossary(t.glossaryId) || {};
        byDomain.set(t.glossaryId, {
          glossaryId: t.glossaryId,
          glossaryTitle: g.title || t.glossaryId,
          domain: g.domain || '',
          terms: []
        });
      }
      byDomain.get(t.glossaryId).terms.push(t);
    }

    // Detectar relaciones entre términos seleccionados (misma pareja o cruzadas)
    const selectedIds = new Set(this.composedTerms);
    const crossRelations = [];
    for (const t of terms) {
      if (!Array.isArray(t.relations)) continue;
      for (const rel of t.relations) {
        if (selectedIds.has(rel.target)) {
          const target = window.DocWebSemantics.getTerm(rel.target);
          crossRelations.push({
            source: t.id,
            sourceTitle: t.title,
            target: rel.target,
            targetTitle: target ? target.title : rel.target,
            type: rel.type,
            family: window.DocWebSemantics.getRelationFamily(rel.type).label,
            isCrossDomain: target && target.glossaryId !== t.glossaryId
          });
        }
      }
    }

    // Construir el prompt compuesto
    const lines = [];
    lines.push('# Prompt Técnico Compuesto — DocWeb MultiGlossary');
    lines.push('');
    lines.push('Generado a partir de términos seleccionados de múltiples dominios ontológicos.');
    lines.push(`Términos: ${terms.length} | Dominios: ${byDomain.size} | Relaciones detectadas: ${crossRelations.length}`);
    lines.push('');

    // Sección por dominio con procedencia
    lines.push('## Términos por Dominio (Procedencia de Glosario)');
    lines.push('');
    for (const [gid, info] of byDomain) {
      lines.push(`### ${info.glossaryTitle}`);
      lines.push(`*Dominio: ${info.domain} | Glosario: ${info.glossaryId}*`);
      lines.push('');
      for (const t of info.terms) {
        const def = t.shortDefinition || t.definition || '';
        lines.push(`- **${this.escapeHtml(t.title)}** (${t.id}): ${this.escapeHtml(def)}`);
      }
      lines.push('');
    }

    // Sección de relaciones entre términos
    if (crossRelations.length > 0) {
      lines.push('## Relaciones Semánticas Detectadas entre Términos Seleccionados');
      lines.push('');
      for (const rel of crossRelations) {
        const domainMarker = rel.isCrossDomain ? ' [Inter-Glosario]' : '';
        lines.push(`- ${this.escapeHtml(rel.sourceTitle)} → ${this.escapeHtml(rel.targetTitle)}: ${rel.family} (${rel.type})${domainMarker}`);
      }
      lines.push('');
    }

    // Plantilla de prompt técnico
    lines.push('## Prompt Técnico Sintetizado');
    lines.push('');
    lines.push('Utiliza los siguientes conceptos ontológicos, sus definiciones y relaciones para orientar la generación de una especificación técnica:');
    lines.push('');
    for (const [gid, info] of byDomain) {
      lines.push(`### Desde ${info.glossaryTitle}:`);
      for (const t of info.terms) {
        lines.push(`- ${this.escapeHtml(t.title)}: ${this.escapeHtml(t.shortDefinition || t.definition || '')}`);
      }
      lines.push('');
    }
    if (crossRelations.length > 0) {
      lines.push('Relaciones relevantes entre los conceptos seleccionados:');
      for (const rel of crossRelations) {
        lines.push(`- ${this.escapeHtml(rel.sourceTitle)} está ${rel.family.toLowerCase()} con ${this.escapeHtml(rel.targetTitle)}`);
      }
      lines.push('');
    }
    lines.push('Genera una especificación técnica que integre estos conceptos respetando sus relaciones ontológicas y su procedencia de dominio.');

    this.composedPrompt = lines.join('\n');

    // Mostrar en el output
    const output = document.getElementById('composed-prompt-output');
    if (output) {
      output.textContent = this.composedPrompt;
    }

    this.updateStatus(`Prompt compuesto generado: ${terms.length} términos de ${byDomain.size} dominios.`, 'success');
  },

  copyComposedPrompt() {
    if (!this.composedPrompt) {
      this.updateStatus('No hay prompt compuesto para copiar.', 'warning');
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(this.composedPrompt).then(() => {
        this.updateStatus('Prompt compuesto copiado al portapapeles.', 'success');
      }).catch(() => {
        prompt('Prompt compuesto:', this.composedPrompt);
      });
    } else {
      prompt('Prompt compuesto:', this.composedPrompt);
    }
  },

  filterAndRenderHubTerms() {
    if (!window.DocWebSemantics) return;
    const container = document.getElementById('explorer-cards-container');
    const counterEl = document.getElementById('explorer-results-counter');
    if (!container) return;

    let allTerms = window.DocWebSemantics.getAllTerms();

    // Filtro por dominio
    if (this.hubFilterDomain && this.hubFilterDomain !== 'all') {
      allTerms = allTerms.filter(t => t.glossaryId === this.hubFilterDomain);
    }

    // Filtro por nivel ontológico L1-L6
    if (this.hubFilterLevel && this.hubFilterLevel !== 'all') {
      allTerms = allTerms.filter(t => {
        const facets = window.DocWebSemantics.getAdditiveFacets(t);
        return facets.ontologicalLevel.startsWith(this.hubFilterLevel);
      });
    }

    // Filtro por fase de ciclo de vida
    if (this.hubFilterPhase && this.hubFilterPhase !== 'all') {
      allTerms = allTerms.filter(t => {
        const facets = window.DocWebSemantics.getAdditiveFacets(t);
        const phaseLower = facets.lifecyclePhase.toLowerCase();
        return phaseLower.includes(this.hubFilterPhase);
      });
    }

    // Filtro por modalidad operativa
    if (this.hubFilterModality && this.hubFilterModality !== 'all') {
      allTerms = allTerms.filter(t => {
        const facets = window.DocWebSemantics.getAdditiveFacets(t);
        const modLower = facets.sensoryModality.toLowerCase();
        if (this.hubFilterModality === 'visual') return modLower.includes('visual') || modLower.includes('óptica');
        if (this.hubFilterModality === 'auditiva') return modLower.includes('auditiva') || modLower.includes('sonor');
        if (this.hubFilterModality === 'codigo') return modLower.includes('código') || modLower.includes('simbólica') || modLower.includes('sintáctic');
        if (this.hubFilterModality === 'ia') return modLower.includes('ia') || modLower.includes('hiperdimensional') || modLower.includes('latente');
        if (this.hubFilterModality === 'color') return modLower.includes('color') || modLower.includes('rango') || modLower.includes('espectr');
        return true;
      });
    }

    // Filtro por texto
    if (this.hubFilterQuery) {
      allTerms = allTerms.filter(t => {
        const text = `${t.title} ${t.slug} ${t.shortDefinition || ''} ${t.definition || ''} ${(t.synonyms || []).join(' ')}`.toLowerCase();
        return text.includes(this.hubFilterQuery);
      });
    }

    if (counterEl) {
      counterEl.textContent = `Mostrando ${allTerms.length} de ${window.DocWebSemantics.getAllTerms().length} conceptos`;
    }

    if (allTerms.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 3rem; text-align: center; color: var(--muted-foreground); background: var(--card); border: 1px dashed var(--border); border-radius: var(--radius);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
          <p style="font-size: 0.95rem; font-weight: 600;">No se encontraron términos con los filtros seleccionados.</p>
          <p style="font-size: 0.8rem; margin-top: 0.25rem;">Intenta restablecer los filtros para volver a ver el catálogo completo.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = '';
    const displayList = allTerms.slice(0, 48);

    displayList.forEach(term => {
      const g = window.DocWebSemantics.getGlossary(term.glossaryId);
      const facets = window.DocWebSemantics.getAdditiveFacets(term);
    const questions = window.DocWebSemantics.generateOntologicalQuestions ? window.DocWebSemantics.generateOntologicalQuestions(term) : [];

      const card = document.createElement('article');
      card.className = 'explorer-term-card';
      card.setAttribute('data-term-id', term.id);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.innerHTML = `
        <div>
          <div class="explorer-term-header">
            <h4 class="explorer-term-title">${this.escapeHtml(term.title)}</h4>
            <span class="explorer-term-badge">📚 ${this.escapeHtml(g ? g.slug : term.glossaryId)}</span>
          </div>
          <div class="explorer-term-meta" style="margin: 0.4rem 0;">
            <span class="term-badge-cat" style="font-size: 0.65rem;">🏷️ ${this.escapeHtml(term.category || 'General')}</span>
            <span class="term-badge-level" style="font-size: 0.65rem;">📐 ${this.escapeHtml(facets.ontologicalLevel)}</span>
          </div>
          <p class="explorer-term-snippet">${this.escapeHtml(term.shortDefinition || term.definition || 'Sin definición resumida.')}</p>
        </div>
        <div class="explorer-term-footer">
          <span>🔄 ${(term.relations || []).length} relaciones</span>
          <span style="font-weight: 600; color: var(--primary);">Ver Ficha ➔</span>
        </div>
      `;

      card.addEventListener('click', () => {
        this.switchView('glossary-view');
        this.selectTerm(term.id);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.switchView('glossary-view');
          this.selectTerm(term.id);
        }
      });

      container.appendChild(card);
    });
  },

  setupHeroSearch() {
    const input = document.getElementById('hero-global-search');
    const suggestions = document.getElementById('hero-search-suggestions');
    if (!input || !suggestions) return;

    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q || q.length < 2) {
        suggestions.style.display = 'none';
        suggestions.innerHTML = '';
        return;
      }

      const allTerms = window.DocWebSemantics.getAllTerms();
      const matched = allTerms.filter(t => {
        return t.title.toLowerCase().includes(q) ||
               t.slug.toLowerCase().includes(q) ||
               (t.synonyms || []).some(s => s.toLowerCase().includes(q));
      }).slice(0, 8);

      if (matched.length === 0) {
        suggestions.innerHTML = '<div style="padding: 0.75rem 1rem; font-size: 0.8rem; color: var(--muted-foreground);">Sin resultados coincidentes.</div>';
        suggestions.style.display = 'block';
        return;
      }

      suggestions.innerHTML = matched.map(t => {
        const g = window.DocWebSemantics.getGlossary(t.glossaryId);
        const safeTitle = this.escapeHtml(t.title);
        const safeCategory = this.escapeHtml(t.category || 'General');
        const safeId = this.escapeHtml(t.id);
        const safeGlossary = this.escapeHtml(g ? g.slug : t.glossaryId);
        return `
          <div class="suggestion-item" data-term-id="${safeId}">
            <div>
              <div class="suggestion-title">${safeTitle}</div>
              <div style="font-size: 0.7rem; color: var(--muted-foreground);">${safeCategory}</div>
            </div>
            <span class="suggestion-badge">📚 ${safeGlossary}</span>
          </div>
        `;
      }).join('');

      suggestions.style.display = 'block';

      suggestions.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
          const tid = item.dataset.termId;
          suggestions.style.display = 'none';
          input.value = '';
          this.switchView('glossary-view');
          this.selectTerm(tid);
        });
      });
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        input.value = '';
        suggestions.style.display = 'none';
      }
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !suggestions.contains(e.target)) {
        suggestions.style.display = 'none';
      }
    });
  },

  // =========================================================================
  // SISTEMA GLOBAL DE INFORMACIÓN AL PASAR EL CURSOR (HOVER SIMPLE / COMPLETO)
  // =========================================================================

  setupHoverSystem() {
    const btnToggle = document.getElementById('btn-toggle-hover-mode');
    const labelEl = document.getElementById('hover-mode-label');
    const tooltip = document.getElementById('global-hover-tooltip');

    if (btnToggle) {
      btnToggle.addEventListener('click', () => this.toggleHoverMode());
    }

    // Atajo Alt + H para alternar el modo hover
    document.addEventListener('keydown', (e) => {
      if (e.altKey && (e.key === 'h' || e.key === 'H')) {
        e.preventDefault();
        this.toggleHoverMode();
      }
    });

    if (!tooltip) return;

    document.addEventListener('mouseover', (e) => {
      if (this.hoverMode === 'off') {
        tooltip.style.display = 'none';
        return;
      }

      const target = e.target.closest('[data-term-id], .term-list-item, .spec-term-chip, .term-badge, .explorer-term-card, [data-hover-info], button, select');
      if (!target) return;

      let term = null;
      let termId = target.dataset.termId;

      if (!termId && target.classList.contains('term-list-item')) {
        const titleEl = target.querySelector('.term-item-title');
        if (titleEl) {
          const titleText = titleEl.textContent.trim();
          term = window.DocWebSemantics.getAllTerms().find(t => t.title === titleText);
          if (term) termId = term.id;
        }
      }

      if (termId && !term) {
        term = window.DocWebSemantics.getTerm(termId);
      }

      if (term) {
        const glossary = window.DocWebSemantics.getGlossary(term.glossaryId);
        const facets = window.DocWebSemantics.getAdditiveFacets(term);
    const questions = window.DocWebSemantics.generateOntologicalQuestions ? window.DocWebSemantics.generateOntologicalQuestions(term) : [];
        const relsCount = (term.relations || []).length;

        if (this.hoverMode === 'simple') {
          tooltip.innerHTML = `
            <div class="tooltip-simple-box">
              <div class="tooltip-simple-title">${this.escapeHtml(term.title)}</div>
              <div class="tooltip-simple-badge">📚 ${this.escapeHtml(glossary ? glossary.title : term.glossaryId)} • 🏷️ ${this.escapeHtml(term.category || 'General')}</div>
              <div class="tooltip-simple-desc">${this.escapeHtml(term.shortDefinition || term.definition || '')}</div>
              <div style="font-size:0.65rem; color:var(--primary); font-weight:700; margin-top:0.2rem;">📐 ${this.escapeHtml(facets.ontologicalLevel)}</div>
            </div>
          `;
        } else {
          // Modo Completo
          const aiTokens = term.aiPromptGuidance ? (term.aiPromptGuidance.promptTokens || []).slice(0, 3).map(t => this.escapeHtml(t)).join(', ') : '';
          tooltip.innerHTML = `
            <div class="tooltip-complete-box">
              <div class="tooltip-complete-header">
                <div class="tooltip-complete-title">${this.escapeHtml(term.title)}</div>
                <div class="tooltip-complete-urn">${this.escapeHtml(term.id)}</div>
              </div>
              <div class="tooltip-complete-body">
                ${this.escapeHtml(term.definition || term.shortDefinition || '')}
              </div>
              <div class="tooltip-complete-tags">
                <span class="tooltip-complete-chip">📚 ${this.escapeHtml(glossary ? glossary.title : term.glossaryId)}</span>
                <span class="tooltip-complete-chip">🏷️ ${this.escapeHtml(term.category || 'General')}</span>
                <span class="tooltip-complete-chip">📐 ${this.escapeHtml(facets.ontologicalLevel)}</span>
                <span class="tooltip-complete-chip">⏳ ${this.escapeHtml(facets.lifecyclePhase)}</span>
                <span class="tooltip-complete-chip">👁️ ${this.escapeHtml(facets.sensoryModality)}</span>
              </div>
              ${aiTokens ? `<div style="font-size:0.68rem; color:var(--muted-foreground);"><strong style="color:var(--foreground);">Prompt IA:</strong> ${aiTokens}</div>` : ''}
              <div class="tooltip-complete-stats">
                <span>Relaciones ontológicas: <strong>${relsCount}</strong></span>
                <span>Estado: <strong>Canónico</strong></span>
              </div>
            </div>
          `;
        }

        tooltip.style.display = 'block';
        return;
      }

      // Si es un botón o elemento de interfaz con data-hover-info o title
      const hoverInfo = target.dataset.hoverInfo || target.title || target.getAttribute('aria-label');
      if (hoverInfo && (target.tagName === 'BUTTON' || target.tagName === 'SELECT' || target.dataset.hoverInfo)) {
        tooltip.innerHTML = `
          <div class="tooltip-simple-box">
            <div class="tooltip-simple-title" style="color:var(--foreground);">Control de Interfaz</div>
            <div class="tooltip-simple-desc">${this.escapeHtml(hoverInfo)}</div>
          </div>
        `;
        tooltip.style.display = 'block';
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (tooltip.style.display === 'none') return;
      const offset = 14;
      let x = e.clientX + offset;
      let y = e.clientY + offset;

      const rect = tooltip.getBoundingClientRect();
      if (x + rect.width > window.innerWidth - 10) {
        x = e.clientX - rect.width - offset;
      }
      if (y + rect.height > window.innerHeight - 10) {
        y = e.clientY - rect.height - offset;
      }

      tooltip.style.left = `${Math.max(10, x)}px`;
      tooltip.style.top = `${Math.max(10, y)}px`;
    });

    document.addEventListener('mouseout', (e) => {
      const fromEl = e.target.closest('[data-term-id], .term-list-item, .spec-term-chip, .term-badge, .explorer-term-card, [data-hover-info], button, select');
      if (fromEl) {
        tooltip.style.display = 'none';
      }
    });
  },

  toggleHoverMode() {
    if (this.hoverMode === 'complete') {
      this.hoverMode = 'simple';
    } else if (this.hoverMode === 'simple') {
      this.hoverMode = 'off';
    } else {
      this.hoverMode = 'complete';
    }

    const labelEl = document.getElementById('hover-mode-label');
    const tooltip = document.getElementById('global-hover-tooltip');
    if (tooltip && this.hoverMode === 'off') {
      tooltip.style.display = 'none';
    }

    const modeLabels = {
      complete: '💡 Hover: Completo',
      simple: '💡 Hover: Simple',
      off: '💡 Hover: Desactivado'
    };

    if (labelEl) {
      labelEl.textContent = modeLabels[this.hoverMode];
    }

    this.updateStatus(`Modo de información flotante (Hover) cambiado a: ${this.hoverMode.toUpperCase()}`, 'info');
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
    allChip.setAttribute('role', 'button');
    allChip.setAttribute('tabindex', '0');
    allChip.setAttribute('aria-label', 'Todas las categorías');
    allChip.setAttribute('title', 'Mostrar términos de todas las categorías temáticas');
    allChip.setAttribute('data-dom-tag', 'span');
    allChip.setAttribute('data-dom-role', 'button');
    allChip.setAttribute('data-dom-container', 'category-chips-container');
    allChip.onclick = () => {
      this.currentCategory = 'all';
      this.renderCategoryChips();
      this.filterAndRenderTerms();
    };
    container.appendChild(allChip);

    // Obtener categorías únicas según glosario activo
    let categories = [];
    if (this.currentGlossaryId === 'all') {
      const allTerms = window.DocWebSemantics.getAllTerms();
      categories = Array.from(new Set(allTerms.map(t => t.category).filter(Boolean)));
    } else {
      const g = window.DocWebSemantics.getGlossary(this.currentGlossaryId);
      if (g && Array.isArray(g.categories) && g.categories.length > 0) {
        categories = [...g.categories];
      } else {
        const terms = window.DocWebSemantics.getTermsByGlossary(this.currentGlossaryId);
        categories = Array.from(new Set(terms.map(t => t.category).filter(Boolean)));
      }
    }

    categories.sort((a, b) => a.localeCompare(b, 'es'));

    for (const cat of categories) {
      const chip = document.createElement('span');
      chip.className = `cat-chip ${this.currentCategory === cat ? 'active' : ''}`;
      
      // Obtener etiqueta legible desde los términos o formatear slug
      let label = cat;
      const sampleTerm = window.DocWebSemantics.getAllTerms().find(t => t.category === cat);
      if (sampleTerm && sampleTerm.categoryLabel) {
        label = sampleTerm.categoryLabel;
      } else if (typeof cat === 'string' && cat.includes('-')) {
        label = cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }

      const count = window.DocWebSemantics.getAllTerms().filter(t => t.category === cat && (this.currentGlossaryId === 'all' || t.glossaryId === this.currentGlossaryId)).length;
      
      chip.textContent = label;
      chip.setAttribute('data-category', cat);
      chip.setAttribute('role', 'button');
      chip.setAttribute('tabindex', '0');
      chip.setAttribute('aria-label', `Categoría: ${this.escapeHtml(label)} (${count} términos)`);
      chip.setAttribute('title', `Categoría: ${this.escapeHtml(label)}\n• ${count} términos disponibles en esta categoría\n• Clic para filtrar exclusivamente este dominio`);
      chip.setAttribute('data-dom-tag', 'span');
      chip.setAttribute('data-dom-role', 'button');
      chip.setAttribute('data-dom-container', 'category-chips-container');
      chip.onclick = () => {
        this.currentCategory = (this.currentCategory === cat) ? 'all' : cat;
        this.renderCategoryChips();
        this.filterAndRenderTerms();
      };
      container.appendChild(chip);
    }
  },

  renderAzNav() {
    const nav = document.getElementById('az-nav');
    if (!nav) return;

    nav.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.className = `az-btn ${this.currentLetter === 'all' ? 'active' : ''}`;
    allBtn.textContent = 'TODOS';
    allBtn.setAttribute('data-letter', 'all');
    allBtn.setAttribute('aria-label', 'Mostrar todos los términos alfabéticamente');
    allBtn.onclick = () => {
      this.currentLetter = 'all';
      this.updateAzNavActive();
      this.filterAndRenderTerms();
    };
    nav.appendChild(allBtn);

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    for (const letter of letters) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `az-btn ${this.currentLetter === letter ? 'active' : ''}`;
      btn.textContent = letter;
      btn.setAttribute('data-letter', letter);
      btn.setAttribute('aria-label', `Filtrar términos por la letra ${letter}`);
      btn.onclick = () => {
        this.currentLetter = (this.currentLetter === letter) ? 'all' : letter;
        this.updateAzNavActive();
        this.filterAndRenderTerms();
      };
      nav.appendChild(btn);
    }
  },

  updateAzNavActive() {
    const nav = document.getElementById('az-nav');
    if (!nav) return;
    nav.querySelectorAll('.az-btn').forEach(btn => {
      const letter = btn.getAttribute('data-letter');
      if (letter === this.currentLetter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  },

  filterAndRenderTerms(searchQuery = '') {
    const container = document.getElementById('terms-list');
    if (!container) return;

    const query = searchQuery !== undefined && searchQuery !== null ? searchQuery : (document.getElementById('search-input') ? document.getElementById('search-input').value : '');
    const q = (query || '').toLowerCase().trim();

    // 1. Obtener conjunto base según glosario seleccionado
    let terms = this.currentGlossaryId === 'all'
      ? window.DocWebSemantics.getAllTerms()
      : window.DocWebSemantics.getTermsByGlossary(this.currentGlossaryId);

    // 2. Filtrado por categoría temática
    if (this.currentCategory && this.currentCategory !== 'all') {
      terms = terms.filter(t => t.category === this.currentCategory);
    }

    // 3. Filtrado alfabético A-Z (con normalización diacrítica de acentos)
    if (this.currentLetter && this.currentLetter !== 'all') {
      terms = terms.filter(t => {
        if (!t.title || typeof t.title !== 'string') return false;
        const clean = t.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toUpperCase();
        return clean.charAt(0) === this.currentLetter;
      });
    }

    // 4. Búsqueda multi-campo con comprobaciones defensivas de tipo
    if (q) {
      terms = terms.filter(term => {
        const titleMatch = typeof term.title === 'string' && term.title.toLowerCase().includes(q);
        const shortDef = term.shortDefinition || term.definition;
        const shortDefMatch = typeof shortDef === 'string' && shortDef.toLowerCase().includes(q);
        const fullDef = term.fullDefinition || term.extendedDefinition;
        const fullDefMatch = typeof fullDef === 'string' && fullDef.toLowerCase().includes(q);
        const synMatch = Array.isArray(term.synonyms) && term.synonyms.some(s => typeof s === 'string' && s.toLowerCase().includes(q));
        const compMatch = Array.isArray(term.components) && term.components.some(c => typeof c === 'string' && c.toLowerCase().includes(q));

        return titleMatch || shortDefMatch || fullDefMatch || synMatch || compMatch;
      });
    }

    // Orden alfabético canónico en español
    terms.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'es', { sensitivity: 'base' }));

    container.innerHTML = '';
    if (terms.length === 0) {
      container.innerHTML = '<div class="p-4 text-xs text-center text-[var(--muted-foreground)]">No se encontraron términos coincidentes.</div>';
      return;
    }

    terms.forEach(term => {
      const item = document.createElement('div');
      item.className = `term-list-item ${this.currentTermId === term.id ? 'active' : ''}`;
      item.setAttribute('data-term-id', term.id);
      item.onclick = () => this.selectTerm(term.id);

      const isCross = this.currentGlossaryId === 'all';
      const glossaryInfo = isCross ? (window.DocWebSemantics.getGlossary(term.glossaryId)?.title || term.glossaryId) : term.category;
      const facets = window.DocWebSemantics ? window.DocWebSemantics.getAdditiveFacets(term) : { ontologicalLevel: 'L4 Técnica', lifecyclePhase: 'Producción' };
      const relCount = Array.isArray(term.relations) ? term.relations.length : 0;
      const snippet = term.shortDefinition || term.definition || '';

      // Información at-hover enriquecida con metadatos ontológicos, fase, relaciones y URN
      item.setAttribute('title', `[${this.escapeHtml(term.title)}] (${this.escapeHtml(term.category || 'General')})\n• Nivel Ontológico: ${this.escapeHtml(facets.ontologicalLevel)}\n• Fase de Flujo: ${this.escapeHtml(facets.lifecyclePhase)}\n• Relaciones Activas: ${relCount}\n• Definición: ${this.escapeHtml(snippet.substring(0, 140))}...\n• URN: ${this.escapeHtml(term.id)}`);
      item.setAttribute('data-dom-tag', 'div');
      item.setAttribute('data-dom-role', 'listitem');
      item.setAttribute('data-dom-container', 'terms-list');
      item.setAttribute('data-dom-category', term.category || 'General');
      item.setAttribute('data-ontological-level', facets.ontologicalLevel);
      item.setAttribute('data-lifecycle-phase', facets.lifecyclePhase);
      item.setAttribute('role', 'listitem');
      item.setAttribute('tabindex', '0');
      item.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectTerm(term.id);
        }
      };

      const safeTitle = this.escapeHtml(term.title);
      const safeSnippet = this.escapeHtml(snippet);
      const safeGlossary = this.escapeHtml(glossaryInfo);
      item.innerHTML = `
        <div class="term-item-header">
          <span class="term-item-title">${safeTitle}</span>
          <span class="term-item-badge">${safeGlossary}</span>
        </div>
        <div class="term-item-snippet">${safeSnippet}</div>
      `;
      container.appendChild(item);
    });
  },

  selectTerm(termId, updateUrl = true) {
    this.currentTermId = termId;
    
    // Actualizar clase activa en la lista
    document.querySelectorAll('.term-list-item').forEach(el => el.classList.remove('active'));
    this.filterAndRenderTerms(); // sincroniza lista

    const term = window.DocWebSemantics.getTerm(termId);
    if (!term) return;

    if (updateUrl && term.slug) {
      this.updateHash(`#/term/${term.slug}`);
    }

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

    const facets = window.DocWebSemantics.getAdditiveFacets(term);
    const questions = window.DocWebSemantics.generateOntologicalQuestions ? window.DocWebSemantics.generateOntologicalQuestions(term) : [];
    const intention = window.DocWebSemantics.deriveTermIntention ? window.DocWebSemantics.deriveTermIntention(term) : null;

    // Render HTML del Término (HTML5 Semantic DOM)
    viewContainer.innerHTML = `
      <article class="content-card semantic-term-entity" itemscope itemtype="https://schema.org/DefinedTerm"
        id="term-entity-card"
        data-term-id="${this.escapeHtml(term.id)}"
        data-glossary-id="${this.escapeHtml(term.glossaryId)}"
        data-category="${this.escapeHtml(term.category || 'General')}"
        data-ontological-level="${this.escapeHtml(facets.ontologicalLevel)}"
        data-lifecycle-phase="${this.escapeHtml(facets.lifecyclePhase)}"
        data-sensory-modality="${this.escapeHtml(facets.sensoryModality)}"
        data-toolchain="${this.escapeHtml(facets.toolchainDomain)}"
        data-dom-tag="article"
        data-dom-role="landmark"
        data-dom-container="term-view-container"
        data-dom-info="Entidad Semántica Autónoma de Conocimiento (Schema.org DefinedTerm)"
        role="article"
        aria-labelledby="term-title-heading">
        
        <header class="term-header-view" data-dom-tag="header" data-dom-container="content-card">
          <div>
            <dfn class="term-title-large" id="term-title-heading" itemprop="name" data-dom-tag="dfn" title="Definición canónica del término">${this.escapeHtml(term.title)}</dfn>
            <div class="term-meta-row" data-dom-tag="div">
              <span class="term-badge-primary" title="Glosario temático al que pertenece este término">📚 ${this.escapeHtml(glossary ? glossary.title : term.glossaryId)}</span>
              <span class="term-badge-primary" title="Categoría primaria de clasificación">🏷️ ${this.escapeHtml(term.category || 'General')}</span>
              <span class="term-badge-id" title="Identificador uniforme de recursos (URN canónica) persistente e inmutable">${this.escapeHtml(term.id)}</span>
              ${term.origin === 'persisted_local' ? '<span class="term-badge-cross" style="color:var(--success); border-color:var(--success);" title="Almacenado localmente en IndexedDB">💾 Persistido Local</span>' : ''}
            </div>
          </div>
          
          <!-- Botones de Acción Inmediata del Término -->
          <div class="term-action-buttons-group" style="display:flex; flex-wrap:wrap; gap:0.35rem; align-items:center;" data-dom-tag="div" data-dom-container="term-header-view">
            <button type="button" class="btn btn-sm btn-primary" data-cmd="openTermEditor" data-cmd-arg="${term.id}" title="Editar o ampliar atributos, relaciones y definiciones de este término" aria-label="Editar o ampliar término">✏️ Editar</button>
            <button type="button" class="btn btn-sm btn-secondary" data-cmd="copyTermDeepLink" data-cmd-arg="${term.id}" title="Copiar enlace directo URL con hash al portapapeles" aria-label="Copiar enlace directo">🔗 Enlace</button>
            <button type="button" class="btn btn-sm btn-secondary" data-cmd="copyTermUrn" data-cmd-arg="${term.id}" title="Copiar identificador URN canónico al portapapeles" aria-label="Copiar URN canónica">📋 Copiar URN</button>
            <button type="button" class="btn btn-sm btn-secondary" data-cmd="copyTermJsonLd" data-cmd-arg="${term.id}" title="Copiar especificación Schema.org DefinedTerm JSON-LD estructurado" aria-label="Copiar JSON-LD">📄 JSON-LD</button>
            <button type="button" class="btn btn-sm btn-secondary" data-cmd="focusInDiagram" title="Desplazarse y enfocar este término en el Diagrama Contextual de Relaciones" aria-label="Enfocar en diagrama">🎯 Ver Diagrama</button>
            <button type="button" class="btn btn-sm btn-secondary" data-cmd="orientInAiModal" data-cmd-arg="${term.id}" title="Abrir Orientador de Intenciones Audiovisuales para IA con este término vinculado" aria-label="Orientar en IA">🎬 Orientar IA</button>
            <button type="button" class="btn btn-sm btn-secondary" data-cmd="downloadTermJson" data-cmd-arg="${term.id}" title="Descargar ficha técnica estructurada en JSON local autónomo" aria-label="Descargar JSON del término">📥 Descargar JSON</button>
          </div>
        </header>

        <!-- Categorización Semántica Aditiva (Arquitectura Web Multifacética) -->
        <section class="additive-facets-section" aria-label="Categorización semántica aditiva" data-dom-tag="section" data-dom-container="content-card" style="margin-top:0.75rem; background:rgba(37,99,235,0.06); border:1px solid rgba(59,130,246,0.25); border-radius:var(--radius); padding:0.65rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
            <span style="font-size:0.78rem; font-weight:700; color:var(--primary); display:flex; align-items:center; gap:0.35rem;">
              <span>🏷️ Categorización Semántica Aditiva (Arquitectura Web & Modelado en el DOM)</span>
            </span>
            <span style="font-size:0.68rem; color:var(--muted-foreground);">Modelo multidimensional no restrictivo</span>
          </div>
          <div class="additive-facets-chips" style="display:flex; flex-wrap:wrap; gap:0.4rem;">
            <span class="facet-chip" style="background:var(--card); border:1px solid var(--border); font-size:0.72rem; padding:0.2rem 0.5rem; border-radius:4px; display:inline-flex; align-items:center; gap:0.25rem;" title="Nivel en la jerarquía ontológica de 6 niveles (L1 a L6)" data-dom-tag="span">
              🌳 <strong>Nivel:</strong> <span style="color:var(--primary); font-weight:600;">${this.escapeHtml(facets.ontologicalLevel)}</span>
            </span>
            <span class="facet-chip" style="background:var(--card); border:1px solid var(--border); font-size:0.72rem; padding:0.2rem 0.5rem; border-radius:4px; display:inline-flex; align-items:center; gap:0.25rem;" title="Fase cronológica de producción audiovisual donde interviene" data-dom-tag="span">
              ⏱️ <strong>Fase de Flujo:</strong> <span style="color:#10b981; font-weight:600;">${this.escapeHtml(facets.lifecyclePhase)}</span>
            </span>
            <span class="facet-chip" style="background:var(--card); border:1px solid var(--border); font-size:0.72rem; padding:0.2rem 0.5rem; border-radius:4px; display:inline-flex; align-items:center; gap:0.25rem;" title="Modalidad sensorial o técnica que compromete" data-dom-tag="span">
              👁️ <strong>Modalidad:</strong> <span style="color:#ec4899; font-weight:600;">${this.escapeHtml(facets.sensoryModality)}</span>
            </span>
            <span class="facet-chip" style="background:var(--card); border:1px solid var(--border); font-size:0.72rem; padding:0.2rem 0.5rem; border-radius:4px; display:inline-flex; align-items:center; gap:0.25rem;" title="Herramienta o entorno técnico principal" data-dom-tag="span">
              🛠️ <strong>Toolchain:</strong> <span style="color:#f59e0b; font-weight:600;">${this.escapeHtml(facets.toolchainDomain)}</span>
            </span>
            <span class="facet-chip" style="background:var(--card); border:1px solid var(--border); font-size:0.72rem; padding:0.2rem 0.5rem; border-radius:4px; display:inline-flex; align-items:center; gap:0.25rem;" title="Marcado semántico estándar Schema.org" data-dom-tag="span">
              🏛️ <strong>Esquema Web:</strong> Schema.org <span style="color:#8b5cf6; font-weight:600;">${this.escapeHtml(facets.schemaOrgType)}</span>
            </span>
          </div>
        </section>

        <section class="term-definition-section" aria-label="Definición y desarrollo conceptual" data-dom-tag="section" data-dom-container="content-card">
          <div class="section-label" data-dom-tag="div">Definición Concisa</div>
          <p class="definition-lead" itemprop="description" data-dom-tag="p">${this.escapeHtml(term.shortDefinition || term.definition || 'Sin definición corta')}</p>

          <div class="section-label" data-dom-tag="div">Desarrollo Conceptual Extendido</div>
          <div class="definition-full" itemprop="disambiguatingDescription" data-dom-tag="div">${this.escapeHtml(term.fullDefinition || term.extendedDefinition || 'Sin definición detallada')}</div>
        </section>

        <!-- Marco de Expresión Basada en Intenciones Operativas y Efectos Concretos -->
        ${intention ? `
        <section class="intent-driven-section content-card" aria-label="Expresión basada en intenciones" data-dom-tag="section" data-dom-container="content-card" style="margin-top:0.75rem; border-left:4px solid var(--accent); background:linear-gradient(135deg, rgba(56,189,248,0.04) 0%, rgba(139,92,246,0.04) 100%); padding:0.85rem; border-radius:var(--radius); border-top:1px solid var(--border); border-right:1px solid var(--border); border-bottom:1px solid var(--border);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem; flex-wrap:wrap; gap:0.4rem;">
            <div style="display:flex; align-items:center; gap:0.4rem;">
              <span style="font-size:1.15rem;">🎯</span>
              <h3 style="font-size:0.95rem; font-weight:700; margin:0; color:var(--foreground);">Expresión Basada en Intenciones Operativas</h3>
            </div>
            <span class="badge" style="background:rgba(56,189,248,0.15); color:#38bdf8; font-weight:700; font-size:0.72rem; padding:0.18rem 0.5rem; border-radius:0.3rem;">
              ${this.escapeHtml(intention.badge)}
            </span>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.6rem; margin-top:0.5rem;">
            <div style="background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:0.65rem;">
              <div style="font-size:0.72rem; font-weight:700; color:var(--primary); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.25rem;">
                🎯 Propósito / Intención Primaria
              </div>
              <div style="font-size:0.78rem; color:var(--foreground); line-height:1.45;">
                ${this.escapeHtml(intention.primaryIntent)}
              </div>
            </div>

            <div style="background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:0.65rem;">
              <div style="font-size:0.72rem; font-weight:700; color:#10b981; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.25rem;">
                ⚡ Efecto & Transformación Concreta
              </div>
              <div style="font-size:0.78rem; color:var(--foreground); line-height:1.45;">
                ${this.escapeHtml(intention.concreteEffect)}
              </div>
            </div>
          </div>

          <div style="margin-top:0.6rem; background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:0.65rem; display:flex; flex-direction:column; gap:0.35rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.3rem;">
              <span style="font-size:0.72rem; font-weight:700; color:var(--accent); text-transform:uppercase; letter-spacing:0.04em;">
                🤖 Directiva de Prompt Basada en Intención
              </span>
              <div style="display:flex; gap:0.3rem;">
                <button type="button" class="btn btn-sm btn-secondary" style="font-size:0.68rem; padding:0.15rem 0.45rem;" data-cmd="copyToClipboardDirect" data-cmd-arg="${this.escapeHtml(intention.operationalDirective)}">
                  📋 Copiar Directiva
                </button>
                <button type="button" class="btn btn-sm btn-primary" style="font-size:0.68rem; padding:0.15rem 0.45rem;" data-cmd="orientInAiModal" data-cmd-arg="${term.id}">
                  ✨ Usar en Orientador IA
                </button>
              </div>
            </div>
            <div style="font-size:0.78rem; color:var(--muted-foreground); font-family:monospace; line-height:1.45; background:var(--background); padding:0.45rem 0.65rem; border-radius:0.3rem; border:1px solid var(--border);">
              ${this.escapeHtml(intention.operationalDirective)}
            </div>
          </div>
        </section>
        ` : ''}

        <!-- Atributos Técnicos, Componentes, Aplicaciones y Ejemplos (HTML5 Semantic Description List) -->
        <section aria-label="Atributos y descomposiciones conceptuales" data-dom-tag="section" data-dom-container="content-card">
          <dl class="info-grid" data-dom-tag="dl" data-dom-role="list">
            <div class="info-block" data-dom-tag="div">
              <dt class="info-block-title" data-dom-tag="dt">⚙️ Atributos Específicos</dt>
              <dd class="info-block-content" data-dom-tag="dd">
                ${term.attributes && Object.keys(term.attributes).length > 0 ? Object.entries(term.attributes).map(([k, v]) => `<div><strong>${this.escapeHtml(k)}:</strong> ${this.escapeHtml(v)}</div>`).join('') : '<span class="text-xs text-[var(--muted-foreground)]">No definidos</span>'}
              </dd>
            </div>

            <div class="info-block" data-dom-tag="div">
              <dt class="info-block-title" data-dom-tag="dt">🧩 Componentes y Estructura</dt>
              <dd class="info-block-content" data-dom-tag="dd">
                ${term.components && term.components.length > 0 
                  ? `<ul style="padding-left:1.2rem;">${term.components.map(c => `<li>${this.escapeHtml(c)}</li>`).join('')}</ul>` 
                  : '<span class="text-xs text-[var(--muted-foreground)]">Sin componentes declarados</span>'}
              </dd>
            </div>

            <div class="info-block" data-dom-tag="div">
              <dt class="info-block-title" data-dom-tag="dt">🎯 Aplicaciones Prácticas</dt>
              <dd class="info-block-content" data-dom-tag="dd">
                ${term.applications && term.applications.length > 0 
                  ? `<ul style="padding-left:1.2rem;">${term.applications.map(a => `<li>${this.escapeHtml(a)}</li>`).join('')}</ul>` 
                  : '<span class="text-xs text-[var(--muted-foreground)]">Sin aplicaciones registradas</span>'}
              </dd>
            </div>

            <div class="info-block" data-dom-tag="div">
              <dt class="info-block-title" data-dom-tag="dt">💡 Ejemplos Documentados</dt>
              <dd class="info-block-content" data-dom-tag="dd">
                ${term.examples && term.examples.length > 0 
                  ? `<ul style="padding-left:1.2rem;">${term.examples.map(ex => `<li>${this.escapeHtml(ex)}</li>`).join('')}</ul>` 
                  : '<span class="text-xs text-[var(--muted-foreground)]">Sin ejemplos registrados</span>'}
              </dd>
            </div>

            ${term.aiPromptGuidance ? `
              <div class="info-block" style="grid-column: 1 / -1; border-color: var(--accent);" data-dom-tag="div">
                <dt class="info-block-title" style="color: var(--accent);" data-dom-tag="dt">🤖 Orientación para Modelos de IA Generativa</dt>
                <dd class="info-block-content" data-dom-tag="dd">
                  <p style="margin-bottom:0.4rem;"><strong>Relevancia:</strong> ${this.escapeHtml(term.aiPromptGuidance.relevance || '')}</p>
                  ${term.aiPromptGuidance.promptTokens && term.aiPromptGuidance.promptTokens.length > 0 ? `
                    <div style="margin-bottom:0.3rem;"><strong>Tokens Clave:</strong> <span class="tag-cloud" style="display:inline-flex; gap:0.25rem;">${term.aiPromptGuidance.promptTokens.map(t => `<span class="tag-item" style="color:var(--primary);">${this.escapeHtml(t)}</span>`).join('')}</span></div>` : ''}
                  ${term.aiPromptGuidance.negativeTokens && term.aiPromptGuidance.negativeTokens.length > 0 ? `
                    <div style="margin-bottom:0.3rem;"><strong>Tokens Negativos:</strong> <span class="tag-cloud" style="display:inline-flex; gap:0.25rem;">${term.aiPromptGuidance.negativeTokens.map(t => `<span class="tag-item" style="color:var(--danger);">${this.escapeHtml(t)}</span>`).join('')}</span></div>` : ''}
                  ${term.aiPromptGuidance.modelCompatibility && term.aiPromptGuidance.modelCompatibility.length > 0 ? `
                    <div><strong>Compatibilidad:</strong> ${term.aiPromptGuidance.modelCompatibility.map(t => this.escapeHtml(t)).join(', ')}</div>` : ''}
                </dd>
              </div>
            ` : ''}
          </dl>
        </section>

        <!-- Motor de Cuestionamiento Adaptativo Ontológico (Sección XVII de la Ontología Integral) -->
        <section class="socratic-questioning-card" aria-label="Motor de Cuestionamiento Adaptativo Ontológico" data-dom-tag="section" data-dom-container="content-card" style="margin-top:1rem; background:rgba(139,92,246,0.04); border:1px solid rgba(139,92,246,0.25); border-radius:var(--radius); padding:0.85rem;">
          <header style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" data-cmd="toggleSocraticSection" title="Alternar panel de cuestionamiento ontológico socrático">
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span style="font-size:1.3rem;">🧐</span>
              <div>
                <h3 style="font-size:0.95rem; font-weight:700; color:var(--accent); margin:0;">Motor de Cuestionamiento Adaptativo (Evaluación Ontológica)</h3>
                <p style="font-size:0.75rem; color:var(--muted-foreground); margin:0;">12 preguntas socráticas para reducción de incertidumbre epistémica (Sección XVII)</p>
              </div>
            </div>
            <span id="socratic-toggle-icon" style="font-size:0.85rem; font-weight:700; color:var(--accent);">▼ Desplegar</span>
          </header>

          <div id="socratic-questions-container" style="display:none; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.6rem; margin-top:0.85rem; border-top:1px dashed var(--border); padding-top:0.75rem;">
            ${questions.map(q => `
              <div class="socratic-question-box" style="background:var(--card); border:1px solid var(--border); border-radius:0.4rem; padding:0.65rem; display:flex; flex-direction:column; gap:0.3rem;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:0.72rem; font-weight:700; color:var(--primary);">${this.escapeHtml(q.icon)} ${this.escapeHtml(q.category)}</span>
                  <span style="font-size:0.65rem; padding:0.1rem 0.35rem; border-radius:0.2rem; background:${q.status === 'verified' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)'}; color:${q.status === 'verified' ? '#10b981' : '#f59e0b'}; font-weight:700;">${q.status === 'verified' ? '✔ Verificada' : 'ℹ Inferencia'}</span>
                </div>
                <div style="font-size:0.76rem; font-weight:600; color:var(--foreground); line-height:1.3;">${this.escapeHtml(q.question)}</div>
                <div style="font-size:0.72rem; color:var(--muted-foreground); line-height:1.4;">${this.escapeHtml(q.answer)}</div>
                <div style="font-size:0.65rem; font-family:monospace; color:var(--muted-foreground); border-top:1px solid var(--border); padding-top:0.25rem; margin-top:0.2rem;">${this.escapeHtml(q.evidence)}</div>
              </div>
            `).join('')}
          </div>
        </section>
      </article>

      <!-- Diagrama Contextual Semántico Multimodal (SVG, HTML Mindmap, Mermaid, DOT, Matriz) -->
      <section class="content-card" id="diagram-section-container" aria-label="Diagrama contextual de relaciones" data-dom-tag="section" data-dom-container="app-layout">
        <header class="term-header-view" style="margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;" data-dom-tag="header">
          <div>
            <h2 style="font-size:1.15rem; font-weight:700; margin:0;" data-dom-tag="h2">🗺️ Diagrama Contextual de Relaciones</h2>
            <p style="font-size:0.8rem; color:var(--muted-foreground); margin:0;" data-dom-tag="p">Visualización interactiva multimodal. Explora en SVG, HTML Semántico, Mermaid.js, Graphviz DOT, Matriz o Grafo Interactivo (B-10).</p>
          </div>

          <!-- Barra de Herramientas Principal: Formatos de Expresión -->
          <div class="diagram-toolbar" style="display:flex; flex-wrap:wrap; align-items:center; gap:0.4rem;" data-dom-tag="div">
            <!-- Selector de Formato de Expresión -->
            <div class="btn-group" role="group" aria-label="Formato de expresión del diagrama" data-dom-tag="div">
              <button type="button" class="btn btn-sm diagram-format-btn ${this.diagramExpressionFormat === 'svg' ? 'btn-primary' : 'btn-secondary'}" data-format="svg" data-cmd="setDiagramExpressionFormat" title="Renderizado gráfico vectorial SVG con zoom interactivo">🎨 SVG Gráfico</button>
              <button type="button" class="btn btn-sm diagram-format-btn ${this.diagramExpressionFormat === 'html' ? 'btn-primary' : 'btn-secondary'}" data-format="html" data-cmd="setDiagramExpressionFormat" title="Mapa mental interactivo con elementos HTML semánticos y ramas accesibles">📄 HTML Mindmap</button>
              <button type="button" class="btn btn-sm diagram-format-btn ${this.diagramExpressionFormat === 'mermaid' ? 'btn-primary' : 'btn-secondary'}" data-format="mermaid" data-cmd="setDiagramExpressionFormat" title="Diagrama en código Mermaid.js compatible con markdown y documentación">🧜 Mermaid.js</button>
              <button type="button" class="btn btn-sm diagram-format-btn ${this.diagramExpressionFormat === 'dot' ? 'btn-primary' : 'btn-secondary'}" data-format="dot" data-cmd="setDiagramExpressionFormat" title="Especificación formal Graphviz DOT para ingeniería de grafos">📊 Graphviz DOT</button>
              <button type="button" class="btn btn-sm diagram-format-btn ${this.diagramExpressionFormat === 'matrix' ? 'btn-primary' : 'btn-secondary'}" data-format="matrix" data-cmd="setDiagramExpressionFormat" title="Matriz relacional de adyacencia y navegación tabular directa">📋 Matriz Relacional</button>
              <button type="button" class="btn btn-sm diagram-format-btn ${this.diagramExpressionFormat === 'interactive-graph' ? 'btn-primary' : 'btn-secondary'}" data-format="interactive-graph" data-cmd="setDiagramExpressionFormat" title="Grafo semántico interactivo: nodos de término, aristas tipadas por familia y navegación entre dominios">🌐 Grafo Interactivo</button>
            </div>
          </div>
        </header>

        <!-- Sub-barra de Controles Específicos para SVG (visible solo en formato SVG) -->
        <div id="diagram-svg-controls" style="display:${this.diagramExpressionFormat === 'svg' ? 'flex' : 'none'}; flex-wrap:wrap; align-items:center; gap:0.4rem; margin-bottom:0.6rem; padding-bottom:0.5rem; border-bottom:1px solid var(--border);" data-dom-tag="div">
          <div class="btn-group" role="group" aria-label="Modo de vista de diagrama SVG">
            <button type="button" class="btn btn-sm diagram-mode-btn ${this.diagramViewMode === 'focal' ? 'btn-primary' : 'btn-secondary'}" data-mode="focal" data-cmd="setDiagramViewMode" title="Vista Focal centrada en el término y sus enlaces">🎯 Focal</button>
            <button type="button" class="btn btn-sm diagram-mode-btn ${this.diagramViewMode === 'hierarchy' ? 'btn-primary' : 'btn-secondary'}" data-mode="hierarchy" data-cmd="setDiagramViewMode" title="Jerarquía Ontológica de 6 Niveles L1 a L6">🌳 Jerarquía L1-L6</button>
            <button type="button" class="btn btn-sm diagram-mode-btn ${this.diagramViewMode === 'pipeline' ? 'btn-primary' : 'btn-secondary'}" data-mode="pipeline" data-cmd="setDiagramViewMode" title="Flujo Secuencial del Pipeline de Producción">⛓️ Pipeline</button>
            <button type="button" class="btn btn-sm diagram-mode-btn ${this.diagramViewMode === 'atlas' ? 'btn-primary' : 'btn-secondary'}" data-mode="atlas" data-cmd="setDiagramViewMode" title="Atlas Interactivo de Todos los Términos">🌐 Atlas (Todos)</button>
          </div>

          <!-- Filtro de Familia de Relación -->
          <select id="diagram-filter-family" name="diagram-filter-family" class="form-select form-select-sm" style="font-size:0.75rem; padding:0.25rem 0.5rem; height:auto; width:auto;" data-cmd="setDiagramFilterFamily" aria-label="Filtrar por familia de relación">
            <option value="all" ${this.diagramFilterFamily === 'all' ? 'selected' : ''}>Todas las Familias</option>
            <option value="taxonomy" ${this.diagramFilterFamily === 'taxonomy' ? 'selected' : ''}>Taxonomía</option>
            <option value="mereology" ${this.diagramFilterFamily === 'mereology' ? 'selected' : ''}>Composición / Mereología</option>
            <option value="sequential" ${this.diagramFilterFamily === 'sequential' ? 'selected' : ''}>Secuencia Temporal</option>
            <option value="causal" ${this.diagramFilterFamily === 'causal' ? 'selected' : ''}>Causalidad</option>
            <option value="dependency" ${this.diagramFilterFamily === 'dependency' ? 'selected' : ''}>Dependencias</option>
            <option value="transformation" ${this.diagramFilterFamily === 'transformation' ? 'selected' : ''}>Transformación</option>
            <option value="evaluation" ${this.diagramFilterFamily === 'evaluation' ? 'selected' : ''}>Evaluación & Calidad</option>
            <option value="composite" ${this.diagramFilterFamily === 'composite' ? 'selected' : ''}>Semántica Compuesta</option>
          </select>

          <!-- Filtro de Nivel Ontológico -->
          <select id="diagram-filter-level" name="diagram-filter-level" class="form-select form-select-sm" style="font-size:0.75rem; padding:0.25rem 0.5rem; height:auto; width:auto;" data-cmd="setDiagramFilterLevel" aria-label="Filtrar por nivel de jerarquía">
            <option value="all" ${this.diagramFilterLevel === 'all' ? 'selected' : ''}>Nivel: Todos</option>
            <option value="L1" ${this.diagramFilterLevel === 'L1' ? 'selected' : ''}>L1 Dominio</option>
            <option value="L2" ${this.diagramFilterLevel === 'L2' ? 'selected' : ''}>L2 Familia</option>
            <option value="L3" ${this.diagramFilterLevel === 'L3' ? 'selected' : ''}>L3 Categoría</option>
            <option value="L4" ${this.diagramFilterLevel === 'L4' ? 'selected' : ''}>L4 Técnica</option>
            <option value="L5" ${this.diagramFilterLevel === 'L5' ? 'selected' : ''}>L5 Componente</option>
            <option value="L6" ${this.diagramFilterLevel === 'L6' ? 'selected' : ''}>L6 Parámetro</option>
          </select>

          <!-- Controles de Zoom -->
          <div class="btn-group" role="group" aria-label="Controles de zoom">
            <button type="button" class="btn btn-sm btn-secondary" data-cmd="zoomDiagram" data-cmd-arg="0.15" title="Acercar zoom">🔍 +</button>
            <button type="button" class="btn btn-sm btn-secondary" data-cmd="zoomDiagram" data-cmd-arg="-0.15" title="Alejar zoom">🔍 -</button>
            <button type="button" class="btn btn-sm btn-secondary" data-cmd="resetDiagramZoom" title="Restablecer zoom">↺ 100%</button>
          </div>
        </div>

        <!-- Contenedor Principal del Diagrama Dinámico -->
        <div class="diagram-svg-wrapper" id="diagram-svg-container" style="overflow-x:auto;" data-dom-tag="div" data-dom-container="diagram-section-container">
          ${this.renderDiagramOutput(term)}
        </div>
      </section>

      <!-- Relaciones Semánticas Bidireccionales -->
      <section class="content-card" aria-label="Relaciones semánticas bidireccionales">
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
                    <span class="relation-type-tag">${this.escapeHtml(rel.type)}</span>
                    <span style="font-size:0.75rem; color:var(--muted-foreground);">${this.escapeHtml(rel.label || '')}</span>
                    ${isCross ? '<span class="relation-badge-cross">Inter-Glosario ⤻</span>' : ''}
                  </div>
                  <a class="relation-target-title" data-cmd="navigateToTerm" data-cmd-arg="${this.escapeHtml(rel.target)}">
                    ${this.escapeHtml(targetT ? targetT.title : rel.target)}
                  </a>
                  <div class="relation-note">${this.escapeHtml(rel.note || '')}</div>
                </div>
                <button class="btn btn-sm" data-cmd="navigateToTerm" data-cmd-arg="${this.escapeHtml(rel.target)}">Explorar →</button>
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
                    <span class="relation-type-tag inverse">${this.escapeHtml(inv.type)} (${this.escapeHtml(inv.originalType)})</span>
                    <span style="font-size:0.75rem; color:var(--muted-foreground);">${this.escapeHtml(inv.label || '')}</span>
                    ${isCross ? '<span class="relation-badge-cross">Inter-Glosario ⤻</span>' : ''}
                  </div>
                  <a class="relation-target-title" data-cmd="navigateToTerm" data-cmd-arg="${this.escapeHtml(inv.sourceTermId)}">
                    ${this.escapeHtml(inv.sourceTitle)}
                  </a>
                  <div class="relation-note">${this.escapeHtml(inv.note || '')}</div>
                </div>
                <button class="btn btn-sm" data-cmd="navigateToTerm" data-cmd-arg="${this.escapeHtml(inv.sourceTermId)}">Ir al origen ←</button>
              </div>
            `;
          }).join('') : '<div class="text-xs text-[var(--muted-foreground)]">Ningún otro término referencia directamente a esta entidad.</div>'}
        </div>
      </section>

      <!-- JSON-LD Preview Inspector -->
      <section class="content-card" aria-label="Vista previa de datos estructurados JSON-LD">
        <header style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <h2 style="font-size:0.95rem; font-weight:700;">🌐 Datos Estructurados JSON-LD (Schema.org DefinedTerm)</h2>
          <span style="font-size:0.75rem; color:var(--muted-foreground);">Inyectado en DOM</span>
        </header>
        <pre style="background:var(--background); border:1px solid var(--border); padding:0.75rem; border-radius:var(--radius); font-size:0.75rem; overflow-x:auto;">${JSON.stringify(jsonLd, null, 2)}</pre>
      </section>
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
          <button class="btn btn-sm" data-cmd="closeTermEditor">✕</button>
        </div>

        <div class="form-group">
          <label class="form-label">Glosario Destino</label>
          <select id="edit-glossary" class="form-select">
            ${glossariesList.map(g => `<option value="${this.escapeHtml(g.id)}" ${existing && existing.glossaryId === g.id ? 'selected' : ''}>${this.escapeHtml(g.title)}</option>`).join('')}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Título del Término</label>
          <input type="text" id="edit-title" class="form-input" value="${this.escapeHtml(existing ? existing.title : '')}" placeholder="Ej. Trazado de Trayectorias">
        </div>

        <div class="form-group">
          <label class="form-label">Categoría Temática</label>
          <input type="text" id="edit-category" class="form-input" value="${this.escapeHtml(existing ? existing.category : '')}" placeholder="Ej. Renderizado">
        </div>

        <div class="form-group">
          <label class="form-label">Definición Concisa (Lead)</label>
          <textarea id="edit-shortDef" class="form-textarea" placeholder="Resumen directo del concepto">${this.escapeHtml(existing ? existing.shortDefinition : '')}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Definición Completa y Rigurosa</label>
          <textarea id="edit-fullDef" class="form-textarea" style="min-height:100px;" placeholder="Fundamentación conceptual, matemática o técnica">${this.escapeHtml(existing ? existing.fullDefinition : '')}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Componentes (separados por coma)</label>
          <input type="text" id="edit-components" class="form-input" value="${this.escapeHtml(existing && existing.components ? existing.components.join(', ') : '')}" placeholder="Comp 1, Comp 2">
        </div>

        <div class="form-group">
          <label class="form-label">Registro de Modificación / Justificación (Changelog)</label>
          <input type="text" id="edit-changelog" class="form-input" value="Ampliación conceptual y enriquecimiento semántico local" placeholder="Motivo del cambio">
        </div>

        <div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-top:1rem;">
          <button class="btn" data-cmd="closeTermEditor">Cancelar</button>
          <button class="btn btn-primary" data-cmd="saveEditorTerm" data-cmd-arg="${termId || ''}">💾 Guardar y Persistir Localmente</button>
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

  closeTermEditor() {
    const modal = document.getElementById('term-editor-modal');
    if (modal) {
      modal.remove();
    }
  },

  // --- Métodos de Navegación e Interacción del Diagrama Semántico (Milestone 2) ---

  renderDiagramOutput(term) {
    if (!term || !window.DocWebSemantics) return '';
    const format = this.diagramExpressionFormat || 'svg';

    if (format === 'html') {
      return window.DocWebSemantics.generateHtmlMindmap(term, {
        selectedGlossaryId: this.currentGlossaryId || 'all'
      });
    } else if (format === 'mermaid') {
      const mermaidCode = window.DocWebSemantics.generateMermaidDiagram(term, {
        selectedGlossaryId: this.currentGlossaryId || 'all'
      });
      const renderedVisualSvg = window.DocWebSemantics.generateMermaidVisualSvg
        ? window.DocWebSemantics.generateMermaidVisualSvg(term, { selectedGlossaryId: this.currentGlossaryId || 'all' })
        : '';
      return `
        <div class="code-export-container" data-dom-tag="div" data-dom-container="code-export-container">
          <!-- Diagrama Mermaid Visual Renderizado Autónomo -->
          <div class="rendered-diagram-visual-wrapper" style="margin-bottom:0.75rem; border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; background:#0f172a;">
            ${renderedVisualSvg}
          </div>

          <!-- Cabecera de Código Fuente y Botones de Acción -->
          <div class="code-export-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem; flex-wrap:wrap; gap:0.4rem;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--primary);">🧜 Especificación Mermaid.js (Código Fuente)</span>
            <div style="display:flex; gap:0.35rem;">
              <button type="button" class="btn btn-sm btn-primary" data-cmd="copyDiagramCode" data-cmd-arg="mermaid">📋 Copiar Código Mermaid</button>
              <button type="button" class="btn btn-sm btn-secondary" data-cmd="toggleDiagramCode" data-cmd-arg="mermaid">👁️ Mostrar/Ocultar Código</button>
            </div>
          </div>
          <pre class="code-export-pre" id="mermaid-code-pre" style="display:none; background:var(--background); border:1px solid var(--border); padding:0.85rem; border-radius:var(--radius); font-size:0.75rem; color:#f8fafc; font-family:monospace; line-height:1.5; overflow-x:auto;"><code id="mermaid-code-content">${window.DocWebSemantics.escapeXml(mermaidCode)}</code></pre>
        </div>
      `;
    } else if (format === 'dot') {
      const dotCode = window.DocWebSemantics.generateDotSpecification(term, {
        selectedGlossaryId: this.currentGlossaryId || 'all'
      });
      const renderedVisualSvg = window.DocWebSemantics.generateDotVisualSvg
        ? window.DocWebSemantics.generateDotVisualSvg(term, { selectedGlossaryId: this.currentGlossaryId || 'all' })
        : '';
      return `
        <div class="code-export-container" data-dom-tag="div" data-dom-container="code-export-container">
          <!-- Diagrama Graphviz DOT Visual Renderizado Autónomo -->
          <div class="rendered-diagram-visual-wrapper" style="margin-bottom:0.75rem; border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; background:#0b1120;">
            ${renderedVisualSvg}
          </div>

          <!-- Cabecera de Código y Botones de Acción -->
          <div class="code-export-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem; flex-wrap:wrap; gap:0.4rem;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--primary);">📊 Especificación Graphviz DOT Formal (Código Fuente)</span>
            <div style="display:flex; gap:0.35rem;">
              <button type="button" class="btn btn-sm btn-primary" data-cmd="copyDiagramCode" data-cmd-arg="dot">📋 Copiar Especificación DOT</button>
              <button type="button" class="btn btn-sm btn-secondary" data-cmd="toggleDiagramCode" data-cmd-arg="dot">👁️ Mostrar/Ocultar Código</button>
            </div>
          </div>
          <pre class="code-export-pre" id="dot-code-pre" style="display:none; background:var(--background); border:1px solid var(--border); padding:0.85rem; border-radius:var(--radius); font-size:0.75rem; color:#f8fafc; font-family:monospace; line-height:1.5; overflow-x:auto;"><code id="dot-code-content">${window.DocWebSemantics.escapeXml(dotCode)}</code></pre>
        </div>
      `;
    } else if (format === 'matrix') {
      return window.DocWebSemantics.generateSemanticMatrix(term, {
        selectedGlossaryId: this.currentGlossaryId || 'all'
      });
    } else if (format === 'interactive-graph') {
      return window.DocWebSemantics.generateInteractiveGraphSvg(term, {
        maxNodes: 24,
        filterFamily: this.diagramFilterFamily || 'all',
        composedTermIds: this.composedTerms || []
      });
    }

    // Default SVG
    return window.DocWebSemantics.generateContextualDiagramSvg(term, {
      viewMode: this.diagramViewMode || 'focal',
      zoom: this.diagramZoom || 1,
      filterFamily: this.diagramFilterFamily || 'all',
      filterLevel: this.diagramFilterLevel || 'all',
      searchQuery: this.diagramSearchQuery || '',
      selectedGlossaryId: this.currentGlossaryId || 'all'
    });
  },

  refreshDiagram() {
    const container = document.getElementById('diagram-svg-container');
    if (!container || !window.DocWebSemantics) return;
    const term = this.currentTermId ? window.DocWebSemantics.getTerm(this.currentTermId) : window.DocWebSemantics.getAllTerms()[0];
    if (!term) return;

    container.innerHTML = this.renderDiagramOutput(term);

    // Actualizar botones de formato activo
    document.querySelectorAll('.diagram-format-btn').forEach(btn => {
      const fmt = btn.getAttribute('data-format');
      if (fmt === (this.diagramExpressionFormat || 'svg')) {
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-secondary');
      } else {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
      }
    });

    // Mostrar/ocultar barra de sub-modos SVG según formato
    const svgControls = document.getElementById('diagram-svg-controls');
    if (svgControls) {
      svgControls.style.display = (this.diagramExpressionFormat || 'svg') === 'svg' ? 'flex' : 'none';
    }

    document.querySelectorAll('.diagram-mode-btn').forEach(btn => {
      const mode = btn.getAttribute('data-mode');
      if (mode === this.diagramViewMode) {
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-secondary');
      } else {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
      }
    });
  },

  setDiagramExpressionFormat(format) {
    this.diagramExpressionFormat = format;
    this.refreshDiagram();
  },

  setDiagramViewMode(mode) {
    this.diagramViewMode = mode;
    this.refreshDiagram();
  },

  setDiagramBudget(budget) {
    this.diagramBudget = budget;
    this.updateStatus(`Presupuesto de recuperación ajustado a: ${budget.toUpperCase()}`, 'info');
    this.refreshDiagram();
  },

  toggleSocraticSection() {
    const container = document.getElementById('socratic-questions-container');
    const icon = document.getElementById('socratic-toggle-icon');
    if (!container) return;
    const isHidden = container.style.display === 'none';
    container.style.display = isHidden ? 'grid' : 'none';
    if (icon) icon.textContent = isHidden ? '▲ Plegar' : '▼ Desplegar';
  },

  setDiagramFilterFamily(family) {
    this.diagramFilterFamily = family;
    this.refreshDiagram();
  },

  setDiagramFilterLevel(level) {
    this.diagramFilterLevel = level;
    this.refreshDiagram();
  },

  zoomDiagram(delta) {
    const current = this.diagramZoom || 1.0;
    this.diagramZoom = Math.max(0.4, Math.min(3.0, parseFloat((current + delta).toFixed(2))));
    this.refreshDiagram();
  },

  resetDiagramZoom() {
    this.diagramZoom = 1.0;
    this.refreshDiagram();
  },

  // --- Métodos de Botones de Acción Inmediata y Utilidades ---

  copyTermUrn(urn) {
    if (!urn) return;
    navigator.clipboard.writeText(urn).then(() => {
      this.updateStatus(`URN canónica copiada: ${urn}`, 'success');
    }).catch(() => {
      prompt('Copia la URN canónica:', urn);
    });
  },

  copyTermJsonLd(termId) {
    const term = window.DocWebSemantics.getTerm(termId);
    if (!term) return;
    const jsonLd = window.DocWebSemantics.generateJsonLd(term);
    const jsonStr = JSON.stringify(jsonLd, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      this.updateStatus(`JSON-LD copiado al portapapeles para "${term.title}"`, 'success');
    }).catch(() => {
      prompt('Copia el JSON-LD:', jsonStr);
    });
  },

  focusInDiagram() {
    this.setDiagramExpressionFormat('svg');
    this.setDiagramViewMode('focal');
    const el = document.getElementById('diagram-section-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  orientInAiModal(termId) {
    this.openOrientatorModal();
    const term = window.DocWebSemantics.getTerm(termId);
    if (term) {
      const note = document.getElementById('orientator-notes');
      if (note) {
        note.value = `Enfocar la intención técnica integrando el término canónico "${term.title}" (${term.id}): ${term.shortDefinition || term.definition}`;
      }
      this.generateOrientatorSpecification();
    }
  },

  downloadTermJson(termId) {
    const term = window.DocWebSemantics.getTerm(termId);
    if (!term) return;
    const jsonStr = JSON.stringify(term, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${term.slug || 'termino'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.updateStatus(`Ficha descargada: ${term.slug}.json`, 'success');
  },

  selectRandomTerm() {
    const availableTerms = this.currentGlossaryId === 'all'
      ? window.DocWebSemantics.getAllTerms()
      : window.DocWebSemantics.getTermsByGlossary(this.currentGlossaryId);
    if (!availableTerms || availableTerms.length === 0) return;
    const randomIndex = Math.floor(Math.random() * availableTerms.length);
    const randomTerm = availableTerms[randomIndex];
    this.selectTerm(randomTerm.id);
    this.updateStatus(`🎲 Término aleatorio seleccionado: ${randomTerm.title}`, 'info');
  },

  copyDiagramCode(type) {
    const term = this.currentTermId ? window.DocWebSemantics.getTerm(this.currentTermId) : window.DocWebSemantics.getAllTerms()[0];
    if (!term) return;
    let code = '';
    if (type === 'mermaid') {
      code = window.DocWebSemantics.generateMermaidDiagram(term, { selectedGlossaryId: this.currentGlossaryId });
    } else if (type === 'dot') {
      code = window.DocWebSemantics.generateDotSpecification(term, { selectedGlossaryId: this.currentGlossaryId });
    }
    navigator.clipboard.writeText(code).then(() => {
      this.updateStatus(`Código ${type.toUpperCase()} copiado al portapapeles.`, 'success');
    }).catch(() => {
      prompt(`Copia el código ${type.toUpperCase()}:`, code);
    });
  },

  toggleDiagramCode(type) {
    const el = document.getElementById(`${type}-code-pre`);
    if (el) {
      el.style.display = (el.style.display === 'none' || !el.style.display) ? 'block' : 'none';
    }
  },

  copyToClipboardDirect(text, btnElement, feedbackText = '📋 Copiado!') {
    if (!navigator.clipboard) {
      prompt('Copia el texto:', text);
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      if (btnElement) {
        const orig = btnElement.textContent;
        btnElement.textContent = feedbackText;
        setTimeout(() => { btnElement.textContent = orig; }, 2000);
      }
      this.updateStatus('Directiva basada en intención copiada al portapapeles.', 'success');
    }).catch(() => {
      prompt('Copia el texto:', text);
    });
  },

  // --- Modo Inspector DOM & Semántica Web ---

  toggleDomInspector() {
    this.isInspectorActive = !this.isInspectorActive;
    let hud = document.getElementById('dom-inspector-hud');
    const btn = document.getElementById('btn-toggle-inspector');

    if (this.isInspectorActive) {
      document.body.classList.add('inspector-mode-active');
      if (btn) {
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-secondary');
        btn.innerHTML = '<span>🔍 Inspector ON</span>';
      }
      if (!hud) {
        hud = document.createElement('div');
        hud.id = 'dom-inspector-hud';
        hud.className = 'dom-inspector-hud';
        document.body.appendChild(hud);
      }
      hud.style.display = 'block';
      hud.innerHTML = `
        <div class="hud-title">🔍 Inspector DOM & Semántica Web Activo</div>
        <div class="hud-desc">Pasa el cursor sobre cualquier elemento de la interfaz para inspeccionar su etiqueta, clases, contenedor, atributos y arquitectura web. Haz clic nuevamente en el botón para desactivar.</div>
      `;

      if (!this._inspectorMouseMoveBound) {
        this._inspectorMouseMoveBound = (e) => this.handleInspectorMouseMove(e);
      }
      document.addEventListener('mousemove', this._inspectorMouseMoveBound);
      this.updateStatus('Modo Inspector DOM activado. Pasa el cursor sobre la interfaz.', 'info');
    } else {
      document.body.classList.remove('inspector-mode-active');
      if (btn) {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
        btn.innerHTML = '<span>🔍 Inspector DOM</span>';
      }
      if (hud) hud.style.display = 'none';
      if (this._inspectorMouseMoveBound) {
        document.removeEventListener('mousemove', this._inspectorMouseMoveBound);
      }
      if (this._lastInspectedEl) {
        this._lastInspectedEl.classList.remove('dom-inspector-highlight');
        this._lastInspectedEl = null;
      }
      this.updateStatus('Modo Inspector DOM desactivado.', 'info');
    }
  },

  handleInspectorMouseMove(e) {
    if (!this.isInspectorActive) return;
    const hud = document.getElementById('dom-inspector-hud');
    if (!hud) return;

    // Elemento bajo cursor ignorando el HUD
    const target = document.elementFromPoint(e.clientX, e.clientY);
    if (!target || target === hud || hud.contains(target)) return;

    if (this._lastInspectedEl && this._lastInspectedEl !== target) {
      this._lastInspectedEl.classList.remove('dom-inspector-highlight');
    }
    this._lastInspectedEl = target;
    target.classList.add('dom-inspector-highlight');

    const tagName = target.tagName.toLowerCase();
    const elId = target.id ? `#${target.id}` : '';
    const classes = Array.from(target.classList).filter(c => c !== 'dom-inspector-highlight').map(c => `.${c}`).join(' ');
    const parent = target.parentElement;
    const parentDesc = parent ? `<${parent.tagName.toLowerCase()}>${parent.id ? ` #${parent.id}` : ''}${parent.className && typeof parent.className === 'string' ? ` .${parent.className.trim().split(' ').slice(0, 2).join(' .')}` : ''}` : 'N/A';

    // Recoger atributos relevantes
    const attrs = [];
    for (let i = 0; i < target.attributes.length; i++) {
      const a = target.attributes[i];
      if (a.name !== 'class' && a.name !== 'id' && !a.name.startsWith('on')) {
        attrs.push(`${a.name}="${a.value}"`);
      }
    }
    const attrsStr = attrs.length > 0 ? attrs.slice(0, 5).join(' ') : 'Sin atributos específicos';

    // Deducción de rol semántico y arquitectura
    let semanticRole = 'Elemento de estructura visual';
    if (tagName === 'article') semanticRole = 'Entidad autónoma de contenido independiente (Schema.org DefinedTerm)';
    else if (tagName === 'dfn') semanticRole = 'Término oficial definido en el documento (HTML5 Definition element)';
    else if (tagName === 'header') semanticRole = 'Encabezado introductorio de sección o documento (Banner landmark)';
    else if (tagName === 'section') semanticRole = 'Sección temática estructurada con título contextual';
    else if (tagName === 'aside') semanticRole = 'Contenido tangencial / barra lateral de navegación y filtrado';
    else if (tagName === 'nav') semanticRole = 'Bloque de enlaces de navegación accesible (Navigation landmark)';
    else if (tagName === 'dl') semanticRole = 'Lista de descripción semántica para pares término-desarrollo';
    else if (tagName === 'dt') semanticRole = 'Término sujeto dentro de la lista de descripción';
    else if (tagName === 'dd') semanticRole = 'Definición o valor asociado al término en la lista de descripción';
    else if (tagName === 'svg') semanticRole = 'Gráfico vectorial autónomo interactivo para modelado relacional';
    else if (tagName === 'button') semanticRole = 'Elemento interactivo de control y disparo de acciones accesibles';
    else if (tagName === 'details') semanticRole = 'Widget interactivo nativo expandible / colapsable de revelación progresiva';
    else if (tagName === 'summary') semanticRole = 'Cabecera interactiva y foco accesible de un elemento <details>';
    else if (target.getAttribute('itemscope') !== null) semanticRole = 'Entidad con microdatos estructurados Schema.org';

    hud.innerHTML = `
      <div class="hud-badge-tag">&lt;${tagName}&gt; <span style="color:#60a5fa;">${elId}</span> <span style="color:#94a3b8; font-size:0.7rem;">${classes}</span></div>
      <div style="font-size:0.75rem; margin-top:0.3rem;"><strong>📦 Contenedor Padre:</strong> ${parentDesc}</div>
      <div style="font-size:0.72rem; color:var(--muted-foreground); margin-top:0.2rem; word-break:break-all;"><strong>⚙️ Atributos:</strong> ${attrsStr}</div>
      <div style="font-size:0.75rem; color:#38bdf8; margin-top:0.25rem;"><strong>📐 Arquitectura Web:</strong> ${semanticRole}</div>
    `;
  },

  // --- Métodos de Orientador Audiovisual IA (Milestone 4) ---

  openOrientatorModal(productId = null, updateUrl = true) {
    const modal = document.getElementById('orientator-modal');
    if (!modal) return;
    this.populateOrientatorProductSelect();

    if (productId) {
      const select = document.getElementById('orientator-product-select');
      if (select) {
        const optionExists = Array.from(select.options).some(o => o.value === productId);
        if (optionExists) {
          select.value = productId;
          this.populateOrientatorProductDefaults(productId);
        }
      }
    }

    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');

    if (updateUrl) {
      const currentSelected = document.getElementById('orientator-product-select')?.value || productId;
      this.updateHash(currentSelected ? `#/orientator/${currentSelected}` : '#/orientator');
    }

    const closeBtn = document.getElementById('btn-close-orientator');
    if (closeBtn) closeBtn.focus();
  },

  closeOrientatorModal(updateUrl = true) {
    const modal = document.getElementById('orientator-modal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');

    if (updateUrl) {
      const hp = document.getElementById('homepage-view');
      const isHpVisible = hp && hp.style.display !== 'none';
      if (isHpVisible) {
        this.updateHash('#/hub');
      } else {
        const term = this.currentTermId ? window.DocWebSemantics.getTerm(this.currentTermId) : null;
        if (term && term.slug) {
          this.updateHash(`#/term/${term.slug}`);
        } else {
          this.updateHash(`#/glossary/${this.currentGlossaryId || 'all'}`);
        }
      }
    }

    const btn = document.getElementById('btn-orientator');
    if (btn) btn.focus();
  },

  closeOrientatorAndNavigate(termId) {
    this.closeOrientatorModal();
    if (termId) {
      this.navigateToTerm(termId);
    }
  },

  populateOrientatorProductSelect(forcedGlossaryId = null) {
    const select = document.getElementById('orientator-product-select');
    if (!select || !window.DocWebPromptOrientator) return;

    const currentGlossary = forcedGlossaryId !== null ? forcedGlossaryId : (this.currentGlossaryId || 'all');
    
    // Sincronizar selector de glosario dentro del modal si existe
    const picker = document.getElementById('orientator-glossary-picker');
    if (picker && window.DocWebSemantics && picker.children.length === 0) {
      const optAll = document.createElement('option');
      optAll.value = 'all';
      optAll.textContent = '🔍 Todos los Dominios (Catálogo Completo)';
      picker.appendChild(optAll);
      window.DocWebSemantics.glossaries.forEach(g => {
        const opt = document.createElement('option');
        opt.value = g.id;
        opt.textContent = `📚 ${g.title}`;
        picker.appendChild(opt);
      });
    }
    if (picker && forcedGlossaryId === null) {
      picker.value = currentGlossary;
    }

    const products = window.DocWebPromptOrientator.getProductList(currentGlossary);
    const badge = document.getElementById('orientator-glossary-badge');
    if (badge) {
      let glossaryName = 'Todos los Glosarios';
      if (window.DocWebSemantics && window.DocWebSemantics.glossaries.has(currentGlossary)) {
        glossaryName = window.DocWebSemantics.glossaries.get(currentGlossary).title;
      }
      badge.textContent = `📚 Glosario: ${glossaryName}`;
    }

    const previousVal = select.value;
    select.innerHTML = '';

    products.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `${p.icon || '🎬'} ${p.name}`;
      select.appendChild(opt);
    });

    const exists = products.some(p => p.id === previousVal);
    const selectedId = exists ? previousVal : (products[0] ? products[0].id : 'trailer');
    select.value = selectedId;
    this.populateOrientatorProductDefaults(selectedId);
  },

  populateOrientatorProductDefaults(productId) {
    if (!window.DocWebPromptOrientator || !window.DocWebPromptOrientator.getProduct) return;
    const prod = window.DocWebPromptOrientator.getProduct(productId);
    if (!prod) return;

    const descEl = document.getElementById('orientator-product-desc');
    if (descEl) {
      descEl.textContent = `${prod.description} | Alcance / Duración: ${prod.targetDuration}`;
    }

    // Atributos Determinantes de Producción dinámicos específicos por producto
    const dynamicContainer = document.getElementById('orientator-dynamic-attributes');
    const attrs = window.DocWebPromptOrientator.getProductAttributes(productId);
    const defaults = prod.defaultAttributes || {};

    if (dynamicContainer && attrs) {
      dynamicContainer.innerHTML = '';
      attrs.forEach(attr => {
        const field = document.createElement('div');
        field.className = 'form-group';

        const label = document.createElement('label');
        label.className = 'form-label';
        label.setAttribute('for', `attr-${attr.key}`);
        label.textContent = attr.label;
        field.appendChild(label);

        const val = defaults[attr.key] !== undefined ? defaults[attr.key] : (attr.default || '');

        if (Array.isArray(attr.options) && attr.options.length > 0) {
          const sel = document.createElement('select');
          sel.id = `attr-${attr.key}`;
          sel.name = `attr-${attr.key}`;
          sel.className = 'form-select';
          attr.options.forEach(opt => {
            const optEl = document.createElement('option');
            optEl.value = opt;
            optEl.textContent = opt;
            if (opt === val) optEl.selected = true;
            sel.appendChild(optEl);
          });
          field.appendChild(sel);
        } else {
          const inp = document.createElement('input');
          inp.type = 'text';
          inp.id = `attr-${attr.key}`;
          inp.name = `attr-${attr.key}`;
          inp.className = 'form-input';
          inp.value = val;
          inp.placeholder = attr.description || attr.label;
          field.appendChild(inp);
        }
        dynamicContainer.appendChild(field);
      });
    }

    // Verbos de Acción Recomendados
    const verbsContainer = document.getElementById('orientator-action-verbs-container');
    if (verbsContainer) {
      if (Array.isArray(prod.actionVerbs) && prod.actionVerbs.length > 0) {
        verbsContainer.style.display = 'block';
        verbsContainer.innerHTML = `
          <div style="font-size:0.75rem; font-weight:700; color:var(--primary); margin-bottom:0.35rem; display:flex; align-items:center; gap:0.3rem;">
            <span>⚡ Verbos de Acción para Directivas de Prompt:</span>
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
            ${prod.actionVerbs.map(v => {
              if (typeof v === 'string') {
                const words = v.trim().split(' ');
                const primaryVerb = words[0];
                const detail = words.slice(1).join(' ');
                return `
                  <span class="action-verb-badge" title="${v}">
                    <strong>${primaryVerb}</strong>${detail ? ` <small style="opacity:0.85;">— ${detail}</small>` : ''}
                  </span>
                `;
              } else if (v && typeof v === 'object') {
                const verbName = v.verb || v.name || v.title || 'Acción';
                const cat = v.category ? `(${v.category})` : '';
                return `
                  <span class="action-verb-badge" title="${v.description || verbName}">
                    <strong>${verbName}</strong> ${cat ? `<small style="opacity:0.85;">${cat}</small>` : ''}
                  </span>
                `;
              }
              return '';
            }).join('')}
          </div>
        `;
      } else {
        verbsContainer.style.display = 'none';
        verbsContainer.innerHTML = '';
      }
    }

    // Tareas y Actividades del Flujo de Trabajo (Workflow Tasks)
    const tasksContainer = document.getElementById('orientator-workflow-tasks-container');
    if (tasksContainer && prod.workflowTasks) {
      let phases = [];
      if (Array.isArray(prod.workflowTasks)) {
        phases = prod.workflowTasks;
      } else if (typeof prod.workflowTasks === 'object') {
        const labels = {
          preproduction: 'Preproducción & Planificación',
          production: 'Producción & Rodaje / Render',
          postproduction: 'Postproducción & Masterización'
        };
        for (const [key, tasks] of Object.entries(prod.workflowTasks)) {
          if (Array.isArray(tasks) && tasks.length > 0) {
            phases.push({
              phase: labels[key] || key.charAt(0).toUpperCase() + key.slice(1),
              tasks: tasks.map(t => ({
                title: t.name || t.title || 'Tarea',
                description: t.description || t.instructions || ''
              }))
            });
          }
        }
      }

      if (phases.length > 0) {
        tasksContainer.style.display = 'block';
        tasksContainer.innerHTML = `
          <div style="font-size:0.75rem; font-weight:700; color:var(--primary); margin-bottom:0.35rem; display:flex; align-items:center; gap:0.3rem;">
            <span>📋 Tareas y Actividades Operativas (Fases):</span>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.5rem;">
            ${phases.map(phase => `
              <div class="workflow-phase-card" style="background:var(--card); border:1px solid var(--border); padding:0.5rem; border-radius:var(--radius); border-left:3px solid var(--primary);">
                <div style="font-weight:700; font-size:0.78rem; margin-bottom:0.25rem; color:var(--foreground);">📌 ${phase.phase}</div>
                <ul style="margin:0; padding-left:1.1rem; font-size:0.72rem; color:var(--muted-foreground);">
                  ${phase.tasks.map(t => `<li title="${t.description || ''}"><strong style="color:var(--foreground);">${t.title}</strong></li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        `;
      } else {
        tasksContainer.style.display = 'none';
        tasksContainer.innerHTML = '';
      }
    }
  },

  generateOrientatorSpecification() {
    if (!window.DocWebPromptOrientator || !window.DocWebPromptOrientator.buildSpecification) return;

    const select = document.getElementById('orientator-product-select');
    const productId = select ? select.value : 'trailer';

    const attrs = {};
    const schemaAttrs = window.DocWebPromptOrientator.getProductAttributes(productId);
    if (Array.isArray(schemaAttrs)) {
      for (const item of schemaAttrs) {
        const el = document.getElementById(`attr-${item.key}`);
        if (el) {
          attrs[item.key] = el.value.trim();
        }
      }
    }
    const attrKeys = ['duration', 'aspectRatio', 'resolution', 'targetAudience', 'intent', 'platform', 'style', 'audio', 'subtitles', 'pacing', 'camera'];
    for (const key of attrKeys) {
      if (attrs[key] === undefined) {
        const el = document.getElementById(`attr-${key}`);
        if (el) attrs[key] = el.value.trim();
      }
    }

    const spec = window.DocWebPromptOrientator.buildSpecification(productId, attrs);
    if (!spec) return;

    const resultsPanel = document.getElementById('orientator-results');
    if (!resultsPanel) return;

    const badgeEl = document.getElementById('spec-product-badge');
    if (badgeEl) badgeEl.textContent = `🎯 ${spec.productName}`;

    const posEl = document.getElementById('spec-positive-prompt');
    if (posEl) posEl.textContent = spec.positivePrompt;

    const negEl = document.getElementById('spec-negative-prompt');
    if (negEl) negEl.textContent = spec.negativePrompt;

    const actEl = document.getElementById('spec-action-directives');
    if (actEl) {
      if (Array.isArray(spec.actionDirectives)) {
        actEl.textContent = spec.actionDirectives.map((d, i) => `${i + 1}. ${d}`).join('\n');
      } else {
        actEl.textContent = spec.actionDirectives || 'Sin directivas de acción específicas.';
      }
    }

    const wfEl = document.getElementById('spec-workflow-tasks');
    if (wfEl) {
      wfEl.innerHTML = '';
      let phases = [];
      if (Array.isArray(spec.workflowTasks)) {
        phases = spec.workflowTasks;
      } else if (spec.workflowTasks && typeof spec.workflowTasks === 'object') {
        const phaseNames = {
          preproduction: 'Fase 1: Preproducción, Conceptualización & Planificación',
          production: 'Fase 2: Producción, Rodaje / Render & Ejecución',
          postproduction: 'Fase 3: Postproducción, Montaje, Colorimetría & Masterización'
        };
        for (const [key, tasks] of Object.entries(spec.workflowTasks)) {
          if (Array.isArray(tasks) && tasks.length > 0) {
            phases.push({
              phase: phaseNames[key] || key.charAt(0).toUpperCase() + key.slice(1),
              tasks: tasks.map(t => ({
                title: t.name || t.title || 'Tarea Operativa',
                activity: t.activity || (key === 'preproduction' ? 'Planificación' : key === 'production' ? 'Ejecución' : 'Finalización'),
                instructions: t.description || t.instructions || '',
                linkedTerms: t.linkedTerms || (t.termId ? [t.termId] : [])
              }))
            });
          }
        }
      }

      if (phases.length > 0) {
        phases.forEach(phase => {
          const phaseCard = document.createElement('div');
          phaseCard.className = 'workflow-phase-block';
          phaseCard.style.cssText = 'background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:0.6rem; margin-bottom:0.4rem;';

          let tasksHtml = (phase.tasks || []).map(t => {
            let termsBadges = '';
            if (Array.isArray(t.linkedTerms) && t.linkedTerms.length > 0) {
              termsBadges = t.linkedTerms.map(urn => {
                const termObj = window.DocWebSemantics ? window.DocWebSemantics.getTerm(urn) : null;
                const title = termObj ? termObj.title : (urn.includes(':') ? urn.split(':').pop() : urn);
                return `<button type="button" class="spec-term-badge" data-cmd="closeOrientatorAndNavigate" data-cmd-arg="${this.escapeHtml(urn)}" style="font-size:0.68rem; padding:0.15rem 0.35rem;" title="Ver ${title}">🔗 ${title}</button>`;
              }).join(' ');
            }
            return `
              <div style="margin-bottom:0.4rem; padding-bottom:0.35rem; border-bottom:1px dashed var(--border);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-weight:600; font-size:0.8rem; color:var(--foreground);">• ${t.title}</span>
                  <span style="font-size:0.7rem; color:var(--muted-foreground); background:var(--muted); padding:0.1rem 0.3rem; border-radius:4px;">${t.activity}</span>
                </div>
                <div style="font-size:0.75rem; color:var(--muted-foreground); margin-top:0.15rem;">${t.instructions}</div>
                ${termsBadges ? `<div style="display:flex; flex-wrap:wrap; gap:0.25rem; margin-top:0.25rem;">${termsBadges}</div>` : ''}
              </div>
            `;
          }).join('');

          phaseCard.innerHTML = `
            <div style="font-weight:700; font-size:0.85rem; color:var(--primary); margin-bottom:0.4rem; border-bottom:1px solid var(--border); padding-bottom:0.25rem;">
              📌 ${phase.phase}
            </div>
            ${tasksHtml}
          `;
          wfEl.appendChild(phaseCard);
        });
      } else {
        wfEl.innerHTML = '<span style="font-size:0.75rem; color:var(--muted-foreground);">No hay tareas específicas definidas para este producto.</span>';
      }
    }

    const camEl = document.getElementById('spec-camera-directives');
    if (camEl) camEl.textContent = spec.cameraDirectives;

    const lightEl = document.getElementById('spec-lighting-directives');
    if (lightEl) lightEl.textContent = spec.lightingAndColorDirectives;

    const termsContainer = document.getElementById('spec-referenced-terms');
    if (termsContainer) {
      termsContainer.innerHTML = '';
      if (Array.isArray(spec.referencedGlossaryTerms) && spec.referencedGlossaryTerms.length > 0) {
        spec.referencedGlossaryTerms.forEach(t => {
          const badge = document.createElement('button');
          badge.type = 'button';
          badge.className = 'spec-term-badge';
          badge.setAttribute('data-term-id', t.id);
          badge.title = `Explorar "${this.escapeHtml(t.title)}" en el glosario`;
          badge.innerHTML = `<span>🔗</span> ${this.escapeHtml(t.title)}`;
          badge.onclick = () => {
            this.closeOrientatorModal();
            this.navigateToTerm(t.id);
          };
          termsContainer.appendChild(badge);
        });
      } else {
        termsContainer.innerHTML = '<span style="font-size:0.75rem; color:var(--muted-foreground);">No hay términos específicos asociados a esta selección.</span>';
      }
    }

    resultsPanel.style.display = 'block';
    resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  },

  async copyToClipboard(elementId, buttonId, originalText) {
    const el = document.getElementById(elementId);
    const btn = document.getElementById(buttonId);
    if (!el) return;

    const text = el.textContent || '';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      if (btn) {
        btn.textContent = '✔ ¡Copiado!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 1500);
      }
    } catch (err) {
      console.warn('Error al copiar:', err);
    }
  },

  async exportCapsule() {
    try {
      if (!window.DocWebStorage) {
        alert('El almacén local DocWebStorage no está disponible.');
        return;
      }
      this.updateStatus('Generando cápsula de conocimiento con firma SHA-256...', 'info');
      const glossaryId = (this.currentGlossaryId && this.currentGlossaryId !== 'all') ? this.currentGlossaryId : null;
      const capsule = await window.DocWebStorage.exportKnowledgeCapsule(glossaryId);
      
      const jsonStr = JSON.stringify(capsule, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      a.href = url;
      a.download = `docweb-knowledge-capsule-${glossaryId || 'all'}-${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      const hashPreview = capsule.integrityHash ? (capsule.integrityHash.slice(0, 10) + '...') : 'OK';
      this.updateStatus(`Cápsula exportada (${capsule.stats.totalCustomTerms} términos, ${capsule.stats.totalRevisions} revisiones). Hash: ${hashPreview}`, 'success');
    } catch (err) {
      console.error('Error al exportar cápsula:', err);
      this.updateStatus('Error al exportar cápsula: ' + err.message, 'danger');
    }
  },

  async handleImportFile(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    try {
      this.updateStatus('Leyendo archivo de cápsula...', 'info');
      const text = await file.text();
      const capsuleData = JSON.parse(text);

      if (!window.DocWebStorage) {
        throw new Error('Almacén local no disponible.');
      }

      if (capsuleData.integrityHash) {
        const verifyRes = await window.DocWebStorage.verifyCapsuleIntegrity(capsuleData);
        if (!verifyRes.valid) {
          const proceed = confirm('ADVERTENCIA: La verificación de integridad criptográfica SHA-256 no coincide (la cápsula pudo haber sido alterada externamente). ¿Desea importarla de todas formas?');
          if (!proceed) {
            this.updateStatus('Importación cancelada por fallo de integridad criptográfica.', 'warning');
            event.target.value = '';
            return;
          }
        }
      }

      this.updateStatus('Importando términos y revisiones en IndexedDB...', 'info');
      const result = await window.DocWebStorage.importKnowledgeCapsule(capsuleData);

      if (capsuleData.terms && capsuleData.terms.length > 0 && window.DocWebSemantics) {
        for (const t of capsuleData.terms) {
          t.origin = t.origin || 'persisted_local';
          window.DocWebSemantics.terms.set(t.id, t);
        }
        window.DocWebSemantics.computeInverseRelations();
        this.filterAndRenderTerms();
      }

      this.updateStatus(`Cápsula importada con éxito: ${result.importedTerms} términos y ${result.importedRevisions} revisiones.`, 'success');
      alert(`¡Cápsula importada con éxito!\n• Términos importados: ${result.importedTerms}\n• Revisiones registradas: ${result.importedRevisions}`);
    } catch (err) {
      console.error('Error al importar cápsula:', err);
      this.updateStatus('Error al importar cápsula: ' + err.message, 'danger');
      alert('Error al importar cápsula:\n' + err.message);
    } finally {
      event.target.value = '';
    }
  }
};

if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  window.addEventListener('DOMContentLoaded', () => {
    window.DocWebApp.init();
  });
}
