const fs = require('fs');
const path = require('path');

const parsedTerms = JSON.parse(fs.readFileSync(path.join(__dirname, 'parsed_terms.json'), 'utf8'));

// Categorization heuristic based on audiovisual engineering taxonomy
function assignCategory(title, slug, text) {
  const s = slug.toLowerCase();
  const t = title.toLowerCase();
  const txt = text.toLowerCase();

  // AI & Virtual Production
  if (['avatar-digital', 'clonacion-de-voz', 'deepfake', 'disclosure-de-contenido-ia',
       'edicion-asistida-por-ia', 'modelo-de-ia', 'prompt', 'reduccion-de-ruido-por-ia',
       'rotoscopia-automatica', 'transcripcion-automatica', 'upscaling-por-ia',
       'video-generativo', 'volumen-led', 'produccion-virtual', 'vr', 'xr', 'render-en-tiempo-real'].includes(s)) {
    return 'Inteligencia Artificial Audiovisual & Producción Virtual';
  }

  // Preproducción & Narrativa
  if (['animatic', 'casting', 'guion-literario', 'guion-tecnico', 'nda',
       'preproduccion', 'scouting', 'shot-list', 'storyboard', 'storytelling',
       'call-sheet', 'narrativa-visual'].includes(s)) {
    return 'Preproducción & Planificación';
  }

  // Dirección & Set / Crew
  if (['asistente-de-direccion', 'direccion-de-fotografia', 'dit-media-management',
       'gaffer', 'on-location', 'playback', 'produccion-de-video', 'produccion-remota',
       'rodaje', 'take', 'vfx-supervisor', 'wrap', 'clapperboard'].includes(s)) {
    return 'Dirección, Rodaje & Gestión de Set';
  }

  // Cámara, Movimiento & Maquinaria
  if (['angulo-de-camara', 'camera-tracking', 'dolly-shot', 'drone', 'gimbal',
       'hyperlapse', 'live-action', 'motion-capture', 'noddies', 'outtake',
       'over-the-shoulder-shot', 'plano-americano', 'plano-detalle', 'plano-general',
       'plano-secuencia', 'primer-plano', 'escala-de-planos', 'establishing-shot',
       'master-shot', 'steadicam', 'tilt', 'timelapse', 'tracking-shot',
       'zoom-in-zoom-out', 'camara-lenta', 'slow-motion'].includes(s)) {
    return 'Cámara, Encuadre & Movimiento';
  }

  // Óptica & Composición
  if (['composicion', 'diafragma', 'distancia-focal', 'f-stop', 'focus-peaking',
       'headroom', 'lente-gran-angular', 'lente-telefoto', 'profundidad-de-campo',
       'regla-de-los-tercios', 'rolling-shutter', 'zebra'].includes(s)) {
    return 'Óptica, Enfoque & Composición';
  }

  // Iluminación & Exposición
  if (['backlight', 'iluminacion-de-tres-puntos', 'intensidad-luminosa', 'iso',
       'key-light', 'temperatura-de-color', 'velocidad-de-obturacion', 'white-balance'].includes(s)) {
    return 'Iluminación, Exposición & Fotometría';
  }

  // Audio Directo & Conectividad
  if (['audio-directo', 'boom', 'lavalier', 'mixer', 'phantom-power', 'room-tone',
       'sync-sound', 'xlr'].includes(s)) {
    return 'Audio Directo & Microfonía';
  }

  // Postproducción de Audio
  if (['adr', 'audio-inmersivo', 'doblaje', 'foley', 'lufs-loudness',
       'mezcla-de-sonido', 'stems', 'underscore', 'voice-over'].includes(s)) {
    return 'Postproducción de Sonido & Acústica';
  }

  // Montaje & Edición de Video
  if (['a-roll', 'b-roll', 'banco-de-edicion', 'corte-en-j-l', 'coverage',
       'cutaway', 'edicion-no-lineal', 'fade-in-fade-out', 'ingesta',
       'jump-cut', 'montaje', 'postproduccion', 'proxy', 'raccord',
       'rough-cut', 'secuencia', 'escena', 'timecode', 'transcoding',
       'transicion', 'upcut'].includes(s)) {
    return 'Montaje & Edición de Video';
  }

  // Color & Monitoreo
  if (['aces', 'etalonaje-color-grading', 'hdr', 'log', 'lut', 'raw', 'rec-709',
       'saturacion', 'luminancia', 'waveform-y-vectorscope'].includes(s)) {
    return 'Colorimetría, Espacios de Color & Monitoreo';
  }

  // VFX, Animación & Efectos Especiales
  if (['animacion-2d-3d', 'chroma-key', 'keyframe', 'matte-painting', 'motion-graphics',
       'rotoscopia', 'sfx', 'stop-motion', 'vfx', 'video-mapping'].includes(s)) {
    return 'Efectos Visuales (VFX), Animación & Motion Graphics';
  }

  // Tecnología, Códecs & Señal
  if (['bitrate', 'broadcasting', 'codec', 'contenedor', 'fps-frame-rate',
       'latencia', 'minidv', 'ndi', 'prores-h-264-h-265', 'relacion-de-aspecto',
       'renderizado', 'resolucion', 'switcher-de-video', 'tasa-de-fotogramas',
       'uhd-4k-vs-dci-4k'].includes(s)) {
    return 'Tecnología de Video, Señal & Códecs';
  }

  // Distribución, Entrega & Métricas
  if (['deliverable', 'entrega-subida', 'hook', 'master', 'masterizacion-de-entrega',
       'reel-short', 'safe-zones', 'srt', 'streaming', 'subtitulos-quemados',
       'subtitulos-vs-closed-captions', 'tasa-de-retencion', 'teleprompter',
       'ugc', 'video-podcast', 'video-vertical'].includes(s)) {
    return 'Entrega, Formatos Digitales & Distribución';
  }

  return 'General Audiovisual';
}

const categorized = {};
parsedTerms.forEach(t => {
  const cat = assignCategory(t.title, t.slug, t.definition);
  if (!categorized[cat]) categorized[cat] = [];
  categorized[cat].push(t.title);
});

console.log('--- Categorization Breakdown ---');
for (const [cat, items] of Object.entries(categorized)) {
  console.log(`${cat}: ${items.length} terms`);
}

let totalCategorized = Object.values(categorized).reduce((acc, v) => acc + v.length, 0);
console.log('Total categorized:', totalCategorized);
