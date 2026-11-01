const fs = require('fs');
const path = require('path');

const parsedTerms = JSON.parse(fs.readFileSync(path.join(__dirname, 'parsed_terms.json'), 'utf8'));
const termDiagrams = JSON.parse(fs.readFileSync(path.join(__dirname, 'term_diagrams.json'), 'utf8'));

// Load all 13 modules
const mPre = require('./cat_preproduction.js');
const mDir = require('./cat_direction.js');
const mCam = require('./cat_camera.js');
const mOpt = require('./cat_optics.js');
const mLgt = require('./cat_lighting.js');
const mAudDir = require('./cat_audio_direct.js');
const mAudPost = require('./cat_audio_post.js');
const mEdit = require('./cat_editing.js');
const mCol = require('./cat_color.js');
const mVfx = require('./cat_vfx.js');
const mTech = require('./cat_technology.js');
const mAi = require('./cat_ai.js');
const mDist = require('./cat_distribution.js');

const categoryModules = [
  { name: 'Preproducción & Planificación', mod: mPre, phase: ['Preproducción'] },
  { name: 'Dirección, Rodaje & Gestión de Set', mod: mDir, phase: ['Producción'] },
  { name: 'Cámara, Encuadre & Movimiento', mod: mCam, phase: ['Producción'] },
  { name: 'Óptica, Enfoque & Composición', mod: mOpt, phase: ['Producción'] },
  { name: 'Iluminación, Exposición & Fotometría', mod: mLgt, phase: ['Producción'] },
  { name: 'Audio Directo & Microfonía', mod: mAudDir, phase: ['Producción'] },
  { name: 'Postproducción de Sonido & Acústica', mod: mAudPost, phase: ['Postproducción'] },
  { name: 'Montaje & Edición de Video', mod: mEdit, phase: ['Postproducción'] },
  { name: 'Colorimetría, Espacios de Color & Monitoreo', mod: mCol, phase: ['Postproducción'] },
  { name: 'Efectos Visuales (VFX), Animación & Motion Graphics', mod: mVfx, phase: ['Postproducción'] },
  { name: 'Tecnología de Video, Señal & Códecs', mod: mTech, phase: ['Producción', 'Postproducción', 'Distribución'] },
  { name: 'Inteligencia Artificial Audiovisual & Producción Virtual', mod: mAi, phase: ['Preproducción', 'Producción', 'Postproducción'] },
  { name: 'Entrega, Formatos Digitales & Distribución', mod: mDist, phase: ['Distribución'] }
];

// Combine all knowledge entries into a single dictionary
const knowledgeMap = new Map();
categoryModules.forEach(cat => {
  for (const [slug, data] of Object.entries(cat.mod)) {
    if (knowledgeMap.has(slug)) {
      console.warn(`WARNING: Duplicate slug in modules: ${slug}`);
    }
    knowledgeMap.set(slug, { ...data, category: cat.name, phases: cat.phase });
  }
});

console.log(`Total defined knowledge entries: ${knowledgeMap.size}`);

// Verify all parsed terms exist in knowledgeMap
let missingCount = 0;
parsedTerms.forEach(t => {
  if (!knowledgeMap.has(t.slug)) {
    console.error(`ERROR: Term #${t.index} "${t.title}" with slug "${t.slug}" missing from knowledge map!`);
    missingCount++;
  }
});

if (missingCount === 0) {
  console.log('SUCCESS: All 177 parsed terms mapped perfectly!');
} else {
  console.error(`FAILURE: ${missingCount} terms missing!`);
  process.exit(1);
}

// Assemble full catalog
const fullCatalog = parsedTerms.map(t => {
  const k = knowledgeMap.get(t.slug);
  
  // Diagram mapping from termDiagrams if present
  let visualInfo = {
    has_source_diagram: false,
    diagram_asset: null,
    visual_description: k.visual_notes
  };

  if (termDiagrams[t.title] && termDiagrams[t.title].length > 0) {
    const d = termDiagrams[t.title][0];
    visualInfo.has_source_diagram = true;
    visualInfo.diagram_asset = {
      filename: path.basename(d.src),
      url: d.src,
      alt_text: d.alt,
      dimensions: `${d.width}x${d.height}`
    };
  }

  return {
    id: t.slug,
    index: t.index,
    denomination: k.denomination,
    source_title: t.title,
    category: k.category,
    phases: k.phases,
    synonyms: k.synonyms,
    source_attribution: {
      source_name: "Mouse Interactivo - Terminología de producción de video profesional",
      source_url: `https://mouseinteractivo.com/terminologia-produccion-video/#${t.slug}`,
      core_meaning: t.definition,
      related_in_source: t.related.map(r => r.name)
    },
    original_definition: k.original_def,
    context_of_use: k.context_of_use,
    illustrative_example: k.example,
    visual_specification: visualInfo,
    llm_prompt_guidance: k.llm_prompt_guidance,
    relationships: {
      explicit_source: t.related.map(r => {
        const m = r.url.match(/#([a-z0-9-]+)$/);
        return { name: r.name, slug: m ? m[1] : '' };
      }),
      inferred_semantic: k.inferred_relations
    }
  };
});

fs.writeFileSync(
  path.join(__dirname, 'catalog_177_enriched.json'),
  JSON.stringify(fullCatalog, null, 2),
  'utf8'
);
console.log('Saved catalog_177_enriched.json with 177 items.');
