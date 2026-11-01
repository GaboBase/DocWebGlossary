/**
 * DOCWEB MULTIGLOSSARY — Local & Persistent Storage Engine (Milestone 5)
 * Cumplimiento estricto de los Requisitos R7 y Features F20, F21, F22, F23:
 * - F20: Persistencia de términos personalizados y modificaciones en IndexedDB (DocWebMultiGlossaryDB).
 * - F21: Cálculo criptográfico nativo SHA-256 (Web Crypto API) con fallback determinista.
 * - F22: Importación y exportación de cápsulas de conocimiento atómicas (DOCWEB_MULTIGLOSSARY_CAPSULE v1.0.0).
 * - F23: Arquitectura desacoplada y domain-agnostic para soportar múltiples glosarios especializados.
 * - 100% Autónomo y Local: Cero llamadas a URLs externas o dependencias remotas.
 */

const DB_NAME = 'DocWebMultiGlossaryDB';
const DB_VERSION = 1;
const STORE_TERMS = 'custom_terms';
const STORE_GLOSSARIES = 'custom_glossaries';
const STORE_REVISIONS = 'revisions_log';

class LocalStorageEngine {
  constructor() {
    this.db = null;
    this.isReady = false;
  }

  /**
   * Inicializa la conexión con IndexedDB y crea los almacenes necesarios.
   * @returns {Promise<IDBDatabase|null>}
   */
  async init() {
    if (this.isReady && this.db) return this.db;

    return new Promise((resolve, reject) => {
      const idb = (typeof window !== 'undefined' && window.indexedDB) 
        ? window.indexedDB 
        : (typeof indexedDB !== 'undefined' ? indexedDB : null);

      if (!idb) {
        if (typeof console !== 'undefined' && console.warn) {
          console.warn('IndexedDB no está disponible en este entorno.');
        }
        this.isReady = false;
        resolve(null);
        return;
      }

      const request = idb.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Almacén de Términos Personalizados y Modificaciones Locales
        if (!db.objectStoreNames.contains(STORE_TERMS)) {
          const termsStore = db.createObjectStore(STORE_TERMS, { keyPath: 'id' });
          termsStore.createIndex('glossaryId', 'glossaryId', { unique: false });
          termsStore.createIndex('slug', 'slug', { unique: false });
          termsStore.createIndex('updatedAt', 'updatedAt', { unique: false });
        }

        // Almacén de Metadatos de Glosarios Especializados Personalizados
        if (!db.objectStoreNames.contains(STORE_GLOSSARIES)) {
          db.createObjectStore(STORE_GLOSSARIES, { keyPath: 'id' });
        }

        // Almacén Inmutable de Historial de Revisiones
        if (!db.objectStoreNames.contains(STORE_REVISIONS)) {
          const revStore = db.createObjectStore(STORE_REVISIONS, { keyPath: 'revisionId' });
          revStore.createIndex('termId', 'termId', { unique: false });
          revStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        this.isReady = true;
        resolve(this.db);
      };

      request.onerror = (event) => {
        if (typeof console !== 'undefined' && console.error) {
          console.error('Error al inicializar IndexedDB:', event.target.error);
        }
        this.isReady = false;
        reject(event.target.error);
      };
    });
  }

  /**
   * Calcula el hash criptográfico SHA-256 de una cadena de texto.
   * Utiliza la Web Crypto API (window.crypto.subtle) nativa si está disponible.
   * Si no está disponible, activa un algoritmo de dispersión determinista (prefijo 'fallback-').
   * @param {string} str Texto a resumir.
   * @returns {Promise<string>} Hash hexadecimal de 64 caracteres o fallback.
   */
  async computeSha256(str) {
    if (typeof str !== 'string') {
      str = String(str || '');
    }

    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle && typeof window.crypto.subtle.digest === 'function') {
      const msgUint8 = new TextEncoder().encode(str);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Fallback determinista cuando window.crypto.subtle no está disponible en sandbox / entornos restringidos
    // Retorna prefijo 'fallback-' verificado por la suite de pruebas E2E F21
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return 'fallback-' + Math.abs(hash).toString(16);
  }

  /**
   * Guarda o actualiza un término en IndexedDB y registra una revisión inmutable.
   * @param {Object} term Entidad del término.
   * @param {string} author Identificador del autor de la modificación.
   * @param {string} changeLog Descripción del cambio realizado.
   * @returns {Promise<Object>} Resultado con el término y la revisión creada.
   */
  async saveTerm(term, author = 'user', changeLog = 'Actualización local') {
    await this.init();
    if (!this.db) throw new Error('Almacén local IndexedDB no inicializado.');

    if (!term || typeof term !== 'object') {
      throw new Error('Entidad de término inválida para persistencia.');
    }

    const now = new Date().toISOString();
    const termCopy = JSON.parse(JSON.stringify(term));

    if (!termCopy.id) {
      const slug = termCopy.slug || ('term-' + Date.now());
      const glossary = termCopy.glossaryId || 'custom';
      termCopy.id = `urn:term:${glossary}:${slug}`;
    }

    termCopy.updatedAt = now;
    if (!termCopy.createdAt) termCopy.createdAt = now;
    termCopy.origin = termCopy.origin || 'persisted_local';

    const serialized = JSON.stringify(termCopy);
    const contentHash = await this.computeSha256(serialized);
    termCopy.hash = contentHash;

    const revision = {
      revisionId: 'rev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      termId: termCopy.id,
      timestamp: now,
      author: author,
      changeLog: changeLog,
      hash: contentHash,
      snapshot: termCopy
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_TERMS, STORE_REVISIONS], 'readwrite');
      const termsStore = transaction.objectStore(STORE_TERMS);
      const revStore = transaction.objectStore(STORE_REVISIONS);

      termsStore.put(termCopy);
      revStore.put(revision);

      transaction.oncomplete = () => {
        resolve({
          success: true,
          term: termCopy,
          revision: revision
        });
      };

      transaction.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  /**
   * Obtiene un término por su identificador URN.
   * @param {string} termId Identificador URN del término.
   * @returns {Promise<Object|null>}
   */
  async getTerm(termId) {
    await this.init();
    if (!this.db) return null;

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_TERMS], 'readonly');
      const store = transaction.objectStore(STORE_TERMS);
      const request = store.get(termId);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = (event) => reject(event.target.error);
    });
  }

  /**
   * Obtiene todos los términos personalizados, opcionalmente filtrados por glosario.
   * @param {string|null} glossaryId Identificador del glosario o null/'all' para todos.
   * @returns {Promise<Array>}
   */
  async getAllCustomTerms(glossaryId = null) {
    await this.init();
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db.transaction([STORE_TERMS], 'readonly');
        const store = transaction.objectStore(STORE_TERMS);

        if (glossaryId && glossaryId !== 'all' && store.indexNames && store.indexNames.contains('glossaryId')) {
          const index = store.index('glossaryId');
          const request = index.getAll(glossaryId);
          request.onsuccess = () => resolve(request.result || []);
          request.onerror = (event) => reject(event.target.error);
        } else {
          const request = store.getAll();
          request.onsuccess = () => {
            let terms = request.result || [];
            if (glossaryId && glossaryId !== 'all') {
              terms = terms.filter(t => t.glossaryId === glossaryId);
            }
            resolve(terms);
          };
          request.onerror = (event) => reject(event.target.error);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Obtiene el historial inmutable de revisiones de un término específico.
   * @param {string} termId Identificador URN del término.
   * @returns {Promise<Array>} Lista de revisiones ordenadas de más reciente a más antigua.
   */
  async getTermRevisions(termId) {
    await this.init();
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db.transaction([STORE_REVISIONS], 'readonly');
        const store = transaction.objectStore(STORE_REVISIONS);
        const index = store.index('termId');
        const request = index.getAll(termId);

        request.onsuccess = () => {
          const revs = request.result || [];
          revs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          resolve(revs);
        };
        request.onerror = (event) => reject(event.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Exporta una Cápsula de Conocimiento Atómica verificable criptográficamente.
   * Formato: DOCWEB_MULTIGLOSSARY_CAPSULE v1.0.0
   * @param {string|null} glossaryId Glosario específico o null para toda la base.
   * @returns {Promise<Object>} Cápsula con metadatos, términos, revisiones y hash SHA-256.
   */
  async exportKnowledgeCapsule(glossaryId = null) {
    await this.init();
    const customTerms = await this.getAllCustomTerms(glossaryId);
    
    // Obtener las revisiones correspondientes
    const allRevisions = await new Promise((resolve, reject) => {
      if (!this.db) {
        resolve([]);
        return;
      }
      try {
        const transaction = this.db.transaction([STORE_REVISIONS], 'readonly');
        const store = transaction.objectStore(STORE_REVISIONS);
        const request = store.getAll();
        request.onsuccess = () => {
          let revs = request.result || [];
          if (glossaryId && glossaryId !== 'all') {
            const termIdSet = new Set(customTerms.map(t => t.id));
            revs = revs.filter(r => termIdSet.has(r.termId));
          }
          revs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
          resolve(revs);
        };
        request.onerror = (event) => reject(event.target.error);
      } catch (e) {
        resolve([]);
      }
    });

    const capsule = {
      format: 'DOCWEB_MULTIGLOSSARY_CAPSULE',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      generator: 'DocWeb Local Knowledge Engine',
      stats: {
        totalCustomTerms: customTerms.length,
        totalRevisions: allRevisions.length
      },
      terms: customTerms,
      revisions: allRevisions
    };

    if (glossaryId && glossaryId !== 'all') {
      capsule.glossaryId = glossaryId;
    }

    const capsuleString = JSON.stringify(capsule, null, 2);
    capsule.integrityHash = await this.computeSha256(capsuleString);

    return capsule;
  }

  /**
   * Verifica la integridad criptográfica de una cápsula frente a manipulaciones.
   * @param {Object} capsuleData Objeto de la cápsula a auditar.
   * @returns {Promise<{valid: boolean, expectedHash: string, actualHash: string, reason?: string}>}
   */
  async verifyCapsuleIntegrity(capsuleData) {
    if (!capsuleData || typeof capsuleData !== 'object') {
      return { valid: false, reason: 'Objeto de cápsula no válido' };
    }
    if (!capsuleData.integrityHash) {
      return { valid: false, reason: 'La cápsula no incluye hash de integridad SHA-256' };
    }

    const expectedHash = capsuleData.integrityHash;
    const copy = { ...capsuleData };
    delete copy.integrityHash;
    const copyStr = JSON.stringify(copy, null, 2);
    const actualHash = await this.computeSha256(copyStr);

    return {
      valid: expectedHash === actualHash,
      expectedHash,
      actualHash
    };
  }

  /**
   * Importa una cápsula de conocimiento atómica a IndexedDB tras validación estructural.
   * @param {Object} capsuleData Datos JSON de la cápsula.
   * @param {Object} options Opciones adicionales (ej. verifyIntegrity: boolean).
   * @returns {Promise<{importedTerms: number, importedRevisions: number}>}
   */
  async importKnowledgeCapsule(capsuleData, options = {}) {
    await this.init();
    if (!capsuleData || capsuleData.format !== 'DOCWEB_MULTIGLOSSARY_CAPSULE') {
      throw new Error('Formato de cápsula no válido para DOCWEB MULTIGLOSSARY.');
    }

    if (!Array.isArray(capsuleData.terms)) {
      throw new Error('La cápsula no contiene una lista de términos válida.');
    }

    if (capsuleData.revisions !== undefined && !Array.isArray(capsuleData.revisions)) {
      throw new Error('La cápsula contiene un registro de revisiones no válido.');
    }

    if (options.verifyIntegrity && capsuleData.integrityHash) {
      const integrity = await this.verifyCapsuleIntegrity(capsuleData);
      if (!integrity.valid) {
        throw new Error('Fallo de integridad criptográfica: la cápsula ha sido manipulada o está corrupta.');
      }
    }

    if (!this.db) {
      throw new Error('Almacén local IndexedDB no inicializado.');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_TERMS, STORE_REVISIONS], 'readwrite');
      const termsStore = transaction.objectStore(STORE_TERMS);
      const revStore = transaction.objectStore(STORE_REVISIONS);

      for (const term of capsuleData.terms) {
        termsStore.put(term);
      }

      if (Array.isArray(capsuleData.revisions)) {
        for (const rev of capsuleData.revisions) {
          revStore.put(rev);
        }
      }

      transaction.oncomplete = () => {
        resolve({
          importedTerms: capsuleData.terms.length,
          importedRevisions: (capsuleData.revisions || []).length
        });
      };

      transaction.onerror = (event) => reject(event.target.error);
    });
  }

  /**
   * Elimina un término del almacén activo y registra una revisión inmutable de eliminación (tombstone).
   * @param {string} termId Identificador URN del término a eliminar.
   * @param {string} author Autor de la eliminación.
   * @param {string} reason Motivo de eliminación.
   * @returns {Promise<Object>}
   */
  async deleteTerm(termId, author = 'user', reason = 'Eliminación de término local') {
    await this.init();
    if (!this.db) throw new Error('Almacén local IndexedDB no inicializado.');

    const existing = await this.getTerm(termId);
    if (!existing) return { success: false, notFound: true };

    const now = new Date().toISOString();
    const revision = {
      revisionId: 'rev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      termId: termId,
      timestamp: now,
      author: author,
      changeLog: `[ELIMINADO] ${reason}`,
      hash: await this.computeSha256(`DELETED:${termId}:${now}`),
      snapshot: { ...existing, _deleted: true }
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_TERMS, STORE_REVISIONS], 'readwrite');
      const termsStore = transaction.objectStore(STORE_TERMS);
      const revStore = transaction.objectStore(STORE_REVISIONS);

      termsStore.delete(termId);
      revStore.put(revision);

      transaction.oncomplete = () => resolve({ success: true, deletedTermId: termId, revision });
      transaction.onerror = (event) => reject(event.target.error);
    });
  }

  /**
   * Guarda o actualiza metadatos de un glosario especializado en IndexedDB.
   * Permite desacoplamiento multi-glosario (F23).
   * @param {Object} glossary Metadatos del glosario.
   * @returns {Promise<Object>}
   */
  async saveGlossary(glossary) {
    await this.init();
    if (!this.db) throw new Error('Almacén local IndexedDB no inicializado.');

    const now = new Date().toISOString();
    const copy = { ...glossary, updatedAt: now };
    if (!copy.createdAt) copy.createdAt = now;

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_GLOSSARIES], 'readwrite');
      const store = transaction.objectStore(STORE_GLOSSARIES);
      store.put(copy);
      transaction.oncomplete = () => resolve({ success: true, glossary: copy });
      transaction.onerror = (event) => reject(event.target.error);
    });
  }

  /**
   * Obtiene metadatos de un glosario personalizado por su identificador.
   * @param {string} glossaryId
   * @returns {Promise<Object|null>}
   */
  async getGlossary(glossaryId) {
    await this.init();
    if (!this.db) return null;

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_GLOSSARIES], 'readonly');
      const store = transaction.objectStore(STORE_GLOSSARIES);
      const request = store.get(glossaryId);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = (event) => reject(event.target.error);
    });
  }

  /**
   * Obtiene todos los glosarios personalizados registrados localmente.
   * @returns {Promise<Array>}
   */
  async getAllCustomGlossaries() {
    await this.init();
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_GLOSSARIES], 'readonly');
      const store = transaction.objectStore(STORE_GLOSSARIES);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = (event) => reject(event.target.error);
    });
  }

  /**
   * Limpia todos los almacenes locales de IndexedDB (términos, glosarios y revisiones).
   * @returns {Promise<boolean>}
   */
  async clearAllCustomData() {
    await this.init();
    if (!this.db) return false;

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_TERMS, STORE_GLOSSARIES, STORE_REVISIONS], 'readwrite');
      transaction.objectStore(STORE_TERMS).clear();
      transaction.objectStore(STORE_GLOSSARIES).clear();
      transaction.objectStore(STORE_REVISIONS).clear();

      transaction.oncomplete = () => resolve(true);
      transaction.onerror = (event) => reject(event.target.error);
    });
  }
}

if (typeof window !== 'undefined') {
  window.DocWebStorage = new LocalStorageEngine();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LocalStorageEngine,
    DocWebStorage: (typeof window !== 'undefined' ? window.DocWebStorage : new LocalStorageEngine())
  };
}
