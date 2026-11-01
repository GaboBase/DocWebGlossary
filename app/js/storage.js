/**
 * DOCWEB MULTIGLOSSARY — Local & Persistent Storage Engine
 * Cumplimiento estricto del Contrato del Sistema:
 * - Persistencia local híbrida (IndexedDB como almacén local de revisiones y modificaciones).
 * - Cero dependencias externas.
 * - Soporte para guardar, versionar, consultar, exportar e importar conocimiento.
 * - Hash criptográfico SHA-256 nativo (Web Crypto API) para verificar integridad.
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

  async init() {
    if (this.isReady && this.db) return this.db;

    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        console.warn('IndexedDB no está disponible en este entorno.');
        this.isReady = false;
        resolve(null);
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        if (!db.objectStoreNames.contains(STORE_TERMS)) {
          const termsStore = db.createObjectStore(STORE_TERMS, { keyPath: 'id' });
          termsStore.createIndex('glossaryId', 'glossaryId', { unique: false });
          termsStore.createIndex('slug', 'slug', { unique: false });
          termsStore.createIndex('updatedAt', 'updatedAt', { unique: false });
        }

        if (!db.objectStoreNames.contains(STORE_GLOSSARIES)) {
          db.createObjectStore(STORE_GLOSSARIES, { keyPath: 'id' });
        }

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
        console.error('Error al inicializar IndexedDB:', event.target.error);
        this.isReady = false;
        reject(event.target.error);
      };
    });
  }

  async computeSha256(str) {
    if (window.crypto && window.crypto.subtle) {
      const msgUint8 = new TextEncoder().encode(str);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // Fallback determinista en caso de entorno estricto sin subtle crypto
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return 'fallback-' + Math.abs(hash).toString(16);
  }

  async saveTerm(term, author = 'user', changeLog = 'Actualización local') {
    await this.init();
    if (!this.db) throw new Error('Almacén local IndexedDB no inicializado.');

    const now = new Date().toISOString();
    const termCopy = JSON.parse(JSON.stringify(term));
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

  async getAllCustomTerms() {
    await this.init();
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_TERMS], 'readonly');
      const store = transaction.objectStore(STORE_TERMS);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = (event) => reject(event.target.error);
    });
  }

  async getTermRevisions(termId) {
    await this.init();
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
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
    });
  }

  async exportKnowledgeCapsule() {
    await this.init();
    const customTerms = await this.getAllCustomTerms();
    
    // Obtener todas las revisiones
    const allRevisions = await new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_REVISIONS], 'readonly');
      const store = transaction.objectStore(STORE_REVISIONS);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = (event) => reject(event.target.error);
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

    const capsuleString = JSON.stringify(capsule, null, 2);
    capsule.integrityHash = await this.computeSha256(capsuleString);

    return capsule;
  }

  async importKnowledgeCapsule(capsuleData) {
    await this.init();
    if (!capsuleData || capsuleData.format !== 'DOCWEB_MULTIGLOSSARY_CAPSULE') {
      throw new Error('Formato de cápsula no válido para DOCWEB MULTIGLOSSARY.');
    }

    if (!Array.isArray(capsuleData.terms)) {
      throw new Error('La cápsula no contiene una lista de términos válida.');
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
}

window.DocWebStorage = new LocalStorageEngine();
