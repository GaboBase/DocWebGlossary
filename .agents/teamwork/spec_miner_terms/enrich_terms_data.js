const fs = require('fs');
const path = require('path');

const parsedTerms = JSON.parse(fs.readFileSync(path.join(__dirname, 'parsed_terms.json'), 'utf8'));
const termDiagrams = JSON.parse(fs.readFileSync(path.join(__dirname, 'term_diagrams.json'), 'utf8'));

// Helper to determine phase
function getPhases(category) {
  switch (category) {
    case 'Preproducción & Planificación':
      return ['Preproducción'];
    case 'Dirección, Rodaje & Gestión de Set':
    case 'Cámara, Encuadre & Movimiento':
    case 'Óptica, Enfoque & Composición':
    case 'Iluminación, Exposición & Fotometría':
    case 'Audio Directo & Microfonía':
      return ['Producción'];
    case 'Montaje & Edición de Video':
    case 'Colorimetría, Espacios de Color & Monitoreo':
    case 'Postproducción de Sonido & Acústica':
    case 'Efectos Visuales (VFX), Animación & Motion Graphics':
      return ['Postproducción'];
    case 'Tecnología de Video, Señal & Códecs':
      return ['Producción', 'Postproducción', 'Distribución'];
    case 'Inteligencia Artificial Audiovisual & Producción Virtual':
      return ['Preproducción', 'Producción', 'Postproducción'];
    case 'Entrega, Formatos Digitales & Distribución':
      return ['Distribución'];
    default:
      return ['Producción', 'Postproducción'];
  }
}

// Map categories
function getCategory(slug) {
  const s = slug.toLowerCase();
  if (['avatar-digital', 'clonacion-de-voz', 'deepfake', 'disclosure-de-contenido-ia',
       'edicion-asistida-por-ia', 'modelo-de-ia', 'prompt', 'reduccion-de-ruido-por-ia',
       'rotoscopia-automatica', 'transcripcion-automatica', 'upscaling-por-ia',
       'video-generativo', 'volumen-led', 'produccion-virtual', 'vr', 'xr', 'render-en-tiempo-real'].includes(s)) {
    return 'Inteligencia Artificial Audiovisual & Producción Virtual';
  }
  if (['animatic', 'casting', 'guion-literario', 'guion-tecnico', 'nda',
       'preproduccion', 'scouting', 'shot-list', 'storyboard', 'storytelling',
       'call-sheet', 'narrativa-visual'].includes(s)) {
    return 'Preproducción & Planificación';
  }
  if (['asistente-de-direccion', 'direccion-de-fotografia', 'dit-media-management',
       'gaffer', 'on-location', 'playback', 'produccion-de-video', 'produccion-remota',
       'rodaje', 'take', 'vfx-supervisor', 'wrap', 'clapperboard'].includes(s)) {
    return 'Dirección, Rodaje & Gestión de Set';
  }
  if (['angulo-de-camara', 'camera-tracking', 'dolly-shot', 'drone', 'gimbal',
       'hyperlapse', 'live-action', 'motion-capture', 'noddies', 'outtake',
       'over-the-shoulder-shot', 'plano-americano', 'plano-detalle', 'plano-general',
       'plano-secuencia', 'primer-plano', 'escala-de-planos', 'establishing-shot',
       'master-shot', 'steadicam', 'tilt', 'timelapse', 'tracking-shot',
       'zoom-in-zoom-out', 'camara-lenta', 'slow-motion'].includes(s)) {
    return 'Cámara, Encuadre & Movimiento';
  }
  if (['composicion', 'diafragma', 'distancia-focal', 'f-stop', 'focus-peaking',
       'headroom', 'lente-gran-angular', 'lente-telefoto', 'profundidad-de-campo',
       'regla-de-los-tercios', 'rolling-shutter', 'zebra'].includes(s)) {
    return 'Óptica, Enfoque & Composición';
  }
  if (['backlight', 'iluminacion-de-tres-puntos', 'intensidad-luminosa', 'iso',
       'key-light', 'temperatura-de-color', 'velocidad-de-obturacion', 'white-balance'].includes(s)) {
    return 'Iluminación, Exposición & Fotometría';
  }
  if (['audio-directo', 'boom', 'lavalier', 'mixer', 'phantom-power', 'room-tone',
       'sync-sound', 'xlr'].includes(s)) {
    return 'Audio Directo & Microfonía';
  }
  if (['adr', 'audio-inmersivo', 'doblaje', 'foley', 'lufs-loudness',
       'mezcla-de-sonido', 'stems', 'underscore', 'voice-over'].includes(s)) {
    return 'Postproducción de Sonido & Acústica';
  }
  if (['a-roll', 'b-roll', 'banco-de-edicion', 'corte-en-j-l', 'coverage',
       'cutaway', 'edicion-no-lineal', 'fade-in-fade-out', 'ingesta',
       'jump-cut', 'montaje', 'postproduccion', 'proxy', 'raccord',
       'rough-cut', 'secuencia', 'escena', 'timecode', 'transcoding',
       'transicion', 'upcut'].includes(s)) {
    return 'Montaje & Edición de Video';
  }
  if (['aces', 'etalonaje-color-grading', 'hdr', 'log', 'lut', 'raw', 'rec-709',
       'saturacion', 'luminancia', 'waveform-y-vectorscope'].includes(s)) {
    return 'Colorimetría, Espacios de Color & Monitoreo';
  }
  if (['animacion-2d-3d', 'chroma-key', 'keyframe', 'matte-painting', 'motion-graphics',
       'rotoscopia', 'sfx', 'stop-motion', 'vfx', 'video-mapping'].includes(s)) {
    return 'Efectos Visuales (VFX), Animación & Motion Graphics';
  }
  if (['bitrate', 'broadcasting', 'codec', 'contenedor', 'fps-frame-rate',
       'latencia', 'minidv', 'ndi', 'prores-h-264-h-265', 'relacion-de-aspecto',
       'renderizado', 'resolucion', 'switcher-de-video', 'tasa-de-fotogramas',
       'uhd-4k-vs-dci-4k'].includes(s)) {
    return 'Tecnología de Video, Señal & Códecs';
  }
  if (['deliverable', 'entrega-subida', 'hook', 'master', 'masterizacion-de-entrega',
       'reel-short', 'safe-zones', 'srt', 'streaming', 'subtitulos-quemados',
       'subtitulos-vs-closed-captions', 'tasa-de-retencion', 'teleprompter',
       'ugc', 'video-podcast', 'video-vertical'].includes(s)) {
    return 'Entrega, Formatos Digitales & Distribución';
  }
  return 'General Audiovisual';
}

console.log('Building enrichment metadata...');
