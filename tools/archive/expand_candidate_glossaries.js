const fs = require('fs');
const path = require('path');

// 1. Definición del Glosario de Ontología de Ingeniería de Software
const softEngGlossary = {
  "$schema": "../../schema/glossary.json",
  "id": "software-engineering-ontology",
  "slug": "software-engineering-ontology",
  "title": "Ingeniería de Software & Ontología de Sistemas",
  "description": "Base conceptual rigurosa, taxonomía y modelo ontológico de seis niveles para artefactos computacionales, arquitectura de software, compiladores, sistemas distribuidos y patrones de conocimiento contextual.",
  "domain": "Software Engineering, System Architecture, Ontologies, Compilers, Distributed Systems",
  "version": "1.0.0",
  "termCount": 15,
  "categories": [
    "Taxonomía de Artefactos (L1-L6)",
    "Arquitectura & Diseño Estructural",
    "Semántica & Compilación",
    "Sistemas Distribuidos & Persistencia",
    "Ingeniería de Conocimiento & Grafos"
  ],
  "author": "DocWeb Knowledge Engineering Working Group",
  "created": "2026-10-22",
  "updated": "2026-11-01"
};

const softEngTerms = [
  {
    id: "urn:term:software-engineering-ontology:artefacto-software",
    slug: "artefacto-software",
    title: "Artefacto de Software (Software Artifact / Computational Entity)",
    category: "taxonomia-artefactos",
    categoryLabel: "Taxonomía de Artefactos (L1-L6)",
    definition: "Entidad tangible y verificable producida, configurada o ejecutada durante el ciclo de vida del software. Abarca desde especificaciones formales y código fuente hasta binarios ejecutables, contenedores y modelos ontológicos compilados.",
    shortDefinition: "Entidad discreta y determinista generada en el ciclo de vida del desarrollo de software que posee identidad, estado, interfaz y ciclo de evolución.",
    extendedDefinition: "En la ontología formal de software, un artefacto no se reduce al archivo físico en disco, sino que comprende su contrato de interfaz, sus dependencias formales, sus metadatos de procedencia y su grafo de verificación epistémica.",
    fullDefinition: "Clase base primordial (Nivel L1) en la ontología de sistemas. Todo programa, biblioteca, servicio o módulo deriva formalmente de esta entidad, requiriendo verificación de tipos, pruebas de conformidad y trazabilidad de mutaciones.",
    components: [
      "Identificador canónico unívoco (URN / Hash SHA-256)",
      "Interfaz o contrato público (API / ABI)",
      "Grafo de dependencias declaradas y transitivas",
      "Suite de verificación y pruebas automatizadas"
    ],
    applications: [
      "Catalogación y gobernanza de dependencias de software",
      "Pipelines de integración y entrega continua (CI/CD)",
      "Análisis estático de código y auditoría de seguridad"
    ],
    examples: [
      "Un paquete npm inmutable con hash criptográfico, manifiesto package.json y firmas de procedencia en cadena de suministro."
    ],
    synonyms: ["Software artifact", "Entidad de software", "Componente de software"],
    attributes: {
      faseProduccion: "Arquitectura / Construcción",
      categoriaCanon: "Taxonomía de Artefactos (L1-L6)",
      fuenteIndice: "Ontología Integral de Software v1.0"
    },
    relations: [
      { type: "generalizes", target: "urn:term:software-engineering-ontology:aplicacion", note: "La aplicación es una especialización autónoma de alto nivel de artefacto de software" },
      { type: "generalizes", target: "urn:term:software-engineering-ontology:biblioteca", note: "La biblioteca es un artefacto de software reutilizable sin bucle de control propio" },
      { type: "requires", target: "urn:term:software-engineering-ontology:runtime-motor-ejecucion", note: "Todo artefacto ejecutable requiere un entorno de ejecución para materializarse" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Concepto raíz ontológico para razonamiento sobre arquitecturas de software y límites de módulos.",
      promptTokens: ["software artifact ontology", "deterministic computational entity", "immutable artifact package", "formal module contract"],
      negativeTokens: ["abstract idea without code", "unversioned snippet"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 1,
      originalTitle: "Artefacto de Software"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:aplicacion",
    slug: "aplicacion",
    title: "Aplicación de Software (Software Application / Autonomous System)",
    category: "taxonomia-artefactos",
    categoryLabel: "Taxonomía de Artefactos (L1-L6)",
    definition: "Sistema de software autónomo y completo, diseñado para cumplir una finalidad funcional para usuarios finales u otros sistemas externos, que posee su propio punto de entrada (main entry point) y controla su ciclo de vida y bucle de eventos.",
    shortDefinition: "Programa ejecutable autocontenido dotado de punto de entrada propio que orquesta dependencias para resolver un propósito de usuario o negocio.",
    extendedDefinition: "Se distingue ontológicamente de una biblioteca o framework porque retiene la inversión de control respecto a sus módulos internos, pero asume el papel de actor primario en el sistema operativo o contenedor host.",
    fullDefinition: "Artefacto de software de nivel superior (L2) con punto de entrada autónomo (main function / daemon runner). Posee soberanía sobre su espacio de memoria y configuración, coordinando bibliotecas, motores de datos y extensiones.",
    components: [
      "Punto de entrada primario (Entrypoint executable)",
      "Bucle de control o eventos (Event loop / Runtime supervisor)",
      "Capa de configuración de entorno (Config / ENV)",
      "Interfaces de entrada/salida (UI, REST API, CLI)"
    ],
    applications: [
      "Sistemas empresariales y portales web autónomos",
      "Aplicaciones de escritorio, móviles y microservicios",
      "Herramientas de línea de comandos (CLI) y daemons"
    ],
    examples: [
      "El servidor de aplicaciones DOCWEB MULTIGLOSSARY ejecutándose en el navegador como SPA autónoma e interactiva."
    ],
    synonyms: ["Application", "App", "Programa autónomo", "Sistema ejecutable"],
    attributes: {
      faseProduccion: "Despliegue / Runtime",
      categoriaCanon: "Taxonomía de Artefactos (L1-L6)",
      fuenteIndice: "Ontología Integral de Software v1.0"
    },
    relations: [
      { type: "isTypeOf", target: "urn:term:software-engineering-ontology:artefacto-software", note: "Especialización de artefacto de software ejecutable autónomo" },
      { type: "composes", target: "urn:term:software-engineering-ontology:plugin", note: "Una aplicación extensible admite la carga dinámica de plugins en caliente" },
      { type: "dependsOn", target: "urn:term:software-engineering-ontology:framework", note: "Frecuentemente estructurada sobre la inversión de control de un framework" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Unidad arquitectónica fundamental para delimitar la frontera de un producto ejecutable.",
      promptTokens: ["standalone application architecture", "main entrypoint loop", "autonomous software system", "application container boundary"],
      negativeTokens: ["passive code snippet", "headless library"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 2,
      originalTitle: "Aplicación de Software"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:plugin",
    slug: "plugin",
    title: "Plugin o Módulo de Extensión (Plugin / Extension Module)",
    category: "taxonomia-artefactos",
    categoryLabel: "Taxonomía de Artefactos (L1-L6)",
    definition: "Módulo de software diseñado para acoplarse dinámicamente a una aplicación host sin requerir su recompilación ni modificación del código base, extendiendo o especializando sus capacidades a través de puntos de extensión (extension points) o contratos de interfaz formales.",
    shortDefinition: "Componente desacoplado que se enlaza dinámicamente a una aplicación para añadir funcionalidades específicas bajo contratos definidos.",
    extendedDefinition: "Los plugins respetan el Principio Abierto/Cerrado (OCP). Operan en un contexto subordinado a la aplicación anfitriona y pueden aislarse en sandboxes de permisos para evitar fallos de seguridad o corrupción de memoria.",
    fullDefinition: "Artefacto de software complementario cuya existencia y ejecución dependen estrictamente de un host orquestador. Permite arquitecturas altamente modulares y evolutivas sin acoplamiento estático en tiempo de enlace.",
    components: [
      "Manifiesto de capacidades y metadatos (Plugin manifest)",
      "Puntos de extensión y suscripción a hooks (Hooks / Extension Points)",
      "Aislamiento o sandbox de ejecución (Sandbox context)",
      "Contrato de ciclo de vida (init, activate, deactivate, destroy)"
    ],
    applications: [
      "Arquitecturas de plugins en navegadores, IDEs y herramientas de edición",
      "Sistemas de agentes modulares con herramientas dinámicas MCP",
      "Motores de filtrado y procesamiento en cadenas de streaming"
    ],
    examples: [
      "Un plugin de Chrome DevTools MCP que expone inspección DOM y auditorías de accesibilidad a un asistente de IA."
    ],
    synonyms: ["Plugin", "Complemento", "Add-on", "Módulo de extensión"],
    attributes: {
      faseProduccion: "Construcción / Extensión",
      categoriaCanon: "Taxonomía de Artefactos (L1-L6)",
      fuenteIndice: "Ontología Integral de Software v1.0"
    },
    relations: [
      { type: "dependsOn", target: "urn:term:software-engineering-ontology:aplicacion", note: "El plugin requiere una aplicación host anfitriona para ejecutarse" },
      { type: "isTypeOf", target: "urn:term:software-engineering-ontology:artefacto-software", note: "Módulo empaquetado sujeto a control de versiones e interfaces" },
      { type: "implements", target: "urn:term:software-engineering-ontology:inestabilidad-martin", note: "Asegura bajo acoplamiento e independencia de dependencias centrales" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Patrón clave de extensibilidad modular para agentes, editores y sistemas desacoplados.",
      promptTokens: ["extensible plugin architecture", "dynamic lifecycle hook", "host extension point", "sandboxed plugin contract"],
      negativeTokens: ["monolithic tight coupling", "hardcoded dependency"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 3,
      originalTitle: "Plugin / Complemento"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:biblioteca",
    slug: "biblioteca",
    title: "Biblioteca de Código (Library / Reusable Component Archive)",
    category: "taxonomia-artefactos",
    categoryLabel: "Taxonomía de Artefactos (L1-L6)",
    definition: "Colección de funciones, clases, tipos y recursos reutilizables empaquetados para ser invocados por programas externos. A diferencia de un framework, no impone el flujo de control global: la aplicación llamadora mantiene la iniciativa de ejecución.",
    shortDefinition: "Conjunto reutilizable de subrutinas y tipos de datos que la aplicación invoca pasivamente según sus propias necesidades.",
    extendedDefinition: "Se clasifican en estáticas (enlazadas en tiempo de compilación) y dinámicas (enlazadas en tiempo de carga o ejecución como DLLs o SOs). Ofrecen cohesión funcional y minimizan la duplicación de código.",
    fullDefinition: "Bloque de construcción primario para composición de sistemas. Su interfaz de programación (API) expone contratos deterministas con precondiciones, postcondiciones e invariantes.",
    components: [
      "Cabeceras o declaraciones de tipos (Headers / .d.ts / Type definitions)",
      "Código compilado o empaquetado (Bytecode / Native object code)",
      "Documentación técnica de contratos de API",
      "Pruebas unitarias de regresión"
    ],
    applications: [
      "Operaciones matemáticas, criptográficas y transformaciones de datos",
      "Gestión de colecciones complejas y estructuras de datos de grafos",
      "Parsing de formatos (JSON, XML, SVG, GraphQL)"
    ],
    examples: [
      "Una biblioteca matemática de interpolación de curvas Bézier y cálculo de distancias sobre grafos."
    ],
    synonyms: ["Library", "Librería de código", "Package", "Módulo reutilizable"],
    attributes: {
      faseProduccion: "Construcción",
      categoriaCanon: "Taxonomía de Artefactos (L1-L6)",
      fuenteIndice: "Ontología Integral de Software v1.0"
    },
    relations: [
      { type: "isTypeOf", target: "urn:term:software-engineering-ontology:artefacto-software", note: "Artefacto reutilizable pasivo" },
      { type: "differentiatesFrom", target: "urn:term:software-engineering-ontology:framework", note: "La biblioteca es invocada por el código del usuario; el framework invoca el código del usuario (Inversión de Control)" },
      { type: "usedBy", target: "urn:term:software-engineering-ontology:aplicacion", note: "Integrada como dependencia para resolver capacidades específicas" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Distingue módulos pasivos invocables de esqueletos arquitectónicos con inversión de control.",
      promptTokens: ["pure reusable library", "stateless API contract", "passive code archive", "caller-controlled invocation"],
      negativeTokens: ["inversion of control container", "opinionated framework"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 4,
      originalTitle: "Biblioteca (Library)"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:framework",
    slug: "framework",
    title: "Framework o Marco de Trabajo (Framework / Inversion of Control Skeleton)",
    category: "taxonomia-artefactos",
    categoryLabel: "Taxonomía de Artefactos (L1-L6)",
    definition: "Estructura arquitectónica y esqueleto de software genérico y extensible que define el ciclo de vida y la secuencia de ejecución de un programa, aplicando el Principio de Hollywood ('No nos llames, nosotros te llamaremos') mediante inversión de control (IoC).",
    shortDefinition: "Esqueleto de software que controla el flujo de ejecución e invoca código específico proporcionado por el desarrollador en puntos designados.",
    extendedDefinition: "El framework impone una convención y un modelo mental específico sobre la organización del código, proporcionando servicios transversales como enrutamiento, inyección de dependencias y gestión de estado.",
    fullDefinition: "Plataforma arquitectónica de soporte sobre la cual se edifican aplicaciones. Centraliza la complejidad de bajo nivel y delega en el desarrollador la implementación de handlers o callbacks de dominio.",
    components: [
      "Motor de inversión de control (Inversion of Control Container / Dispatcher)",
      "Plantillas de diseño de ciclo de vida (Template Method / Strategy patterns)",
      "Mecanismo de inyección de dependencias (Dependency Injection)",
      "Puntos de enlace y callbacks (Event handlers / Lifecycle hooks)"
    ],
    applications: [
      "Desarrollo de interfaces de usuario reactivas (React, Vue, Lit)",
      "Servidores web y microservicios (Express, Fastify, Spring Boot)",
      "Motores de pruebas automatizadas y pipelines de aserciones"
    ],
    examples: [
      "Un framework de agentes autónomos que gestiona el bucle de razonamiento, memoria y despacho de herramientas automáticamente."
    ],
    synonyms: ["Framework", "Marco de trabajo", "Esqueleto de aplicación", "Plataforma de desarrollo"],
    attributes: {
      faseProduccion: "Arquitectura / Construcción",
      categoriaCanon: "Taxonomía de Artefactos (L1-L6)",
      fuenteIndice: "Ontología Integral de Software v1.0"
    },
    relations: [
      { type: "controls", target: "urn:term:software-engineering-ontology:aplicacion", note: "Orquesta el flujo de ejecución en el que se inscriben las aplicaciones" },
      { type: "differentiatesFrom", target: "urn:term:software-engineering-ontology:biblioteca", note: "Implementa Inversión de Control estricta a diferencia de bibliotecas pasivas" },
      { type: "implements", target: "urn:term:software-engineering-ontology:ddd-domain-driven-design", note: "Permite aislar la infraestructura técnica de la lógica de dominio puro" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Fundamento arquitectónico para distinguir control pasivo de inversión de control en diseño de sistemas.",
      promptTokens: ["inversion of control framework", "Hollywood principle architecture", "declarative lifecycle dispatcher", "framework skeleton"],
      negativeTokens: ["simple utility helper", "unstructured library call"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 5,
      originalTitle: "Framework / Marco de Trabajo"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:microservicio",
    slug: "microservicio",
    title: "Microservicio (Microservice / Autonomous Distributed Service)",
    category: "arquitectura-diseno",
    categoryLabel: "Arquitectura & Diseño Estructural",
    definition: "Estilo arquitectónico y unidad de despliegue independiente que implementa una capacidad de negocio acotada (Bounded Context), comunicándose mediante protocolos de red ligeros (gRPC, HTTP/REST, colas de mensajes) y gestionando su propio almacenamiento de datos.",
    shortDefinition: "Servicio de software distribuido, de alcance acotado y despliegue independiente que interactúa a través de contratos de red estrictos.",
    extendedDefinition: "Promueve la alta cohesión y el bajo acoplamiento entre equipos y dominios. Introduce retos de coherencia eventual, observabilidad distribuida y resiliencia ante particiones de red (Teorema CAP).",
    fullDefinition: "Artefacto de software distribuido diseñado para escalabilidad horizontal y soberanía operativa. Cada microservicio encapsula su modelo de datos y estado, prohibiendo el acceso directo a su base de datos desde el exterior.",
    components: [
      "API de transporte de red (REST, gRPC, Protobuf, GraphQL)",
      "Almacén de persistencia exclusivo (Database-per-service pattern)",
      "Sistemas de telemetría y trazabilidad distribuida (OpenTelemetry)",
      "Manifiesto de contenedor y orquestación (Dockerfile, Kubernetes Pod)"
    ],
    applications: [
      "Sistemas de comercio electrónico y streaming a gran escala",
      "Sistemas bancarios modulares y procesamiento de pagos",
      "Plataformas SaaS multi-inquilino con despliegues independientes"
    ],
    examples: [
      "Un microservicio de catalogación semántica que procesa e indexa grafos ontológicos respondiendo consultas vía gRPC."
    ],
    synonyms: ["Microservice", "Servicio autónomo", "Componente distribuido"],
    attributes: {
      faseProduccion: "Despliegue / Operación",
      categoriaCanon: "Arquitectura & Diseño Estructural",
      fuenteIndice: "Ontología Integral de Software v1.0"
    },
    relations: [
      { type: "implements", target: "urn:term:software-engineering-ontology:ddd-domain-driven-design", note: "Materializa un contexto delimitado (Bounded Context) en arquitectura distribuida" },
      { type: "differentiatesFrom", target: "urn:term:software-engineering-ontology:aplicacion", note: "Distribución de red desacoplada frente a despliegue monolítico unificado" },
      { type: "dependsOn", target: "urn:term:software-engineering-ontology:transaccion-acid", note: "Aborda los desafíos de consistencia eventual frente a transacciones locales ACID" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Unidad estándar de arquitectura distribuida moderna y fronteras de contexto.",
      promptTokens: ["microservice bounded context", "independent deployment unit", "isolated database per service", "distributed API contract"],
      negativeTokens: ["shared database monolith", "tightly coupled library"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 6,
      originalTitle: "Microservicio"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:script",
    slug: "script",
    title: "Script o Guión de Automatización (Script / Interpreted Automation)",
    category: "taxonomia-artefactos",
    categoryLabel: "Taxonomía de Artefactos (L1-L6)",
    definition: "Programa de software habitualmente interpretado o compilado 'just-in-time', diseñado para automatizar secuencias operativas, transformaciones de datos o tareas del sistema, caracterizado por una estructura concisa y ausencia de compilación previa explícita.",
    shortDefinition: "Código ejecutable interpretado de estructura ligera enfocado en la automatización directa de tareas y procesamiento secuencial.",
    extendedDefinition: "Tradicionalmente asociados a shells (Bash, PowerShell) o lenguajes dinámicos (Python, Node.js). En ontología de sistemas, el script prioriza la inmediatez y la orquestación sobre la ingeniería formal de tipos.",
    fullDefinition: "Artefacto de software de ciclo de vida ágil que manipula recursos del sistema operativo o interactúa con APIs externas para resolver un flujo procedural concreto.",
    components: [
      "Shebang o directiva de intérprete (#!/usr/bin/env node)",
      "Lógica procedural lineal o funcional",
      "Manejo de argumentos de línea de comandos (CLI arguments)",
      "Códigos de salida estandarizados (Exit codes: 0 para éxito, >0 para error)"
    ],
    applications: [
      "Scripts de build, empaquetado y generación de bundles de datos",
      "Automatización de migraciones de bases de datos y backups",
      "Pruebas de humo y scripts de verificación de integridad"
    ],
    examples: [
      "El script tools/build_data_bundle.js que consolida todos los JSONs canónicos en bundle.js para soporte file:///."
    ],
    synonyms: ["Script", "Guión de comandos", "Automatismo procedural"],
    attributes: {
      faseProduccion: "Construcción / Automatización",
      categoriaCanon: "Taxonomía de Artefactos (L1-L6)",
      fuenteIndice: "Ontología Integral de Software v1.0"
    },
    relations: [
      { type: "isTypeOf", target: "urn:term:software-engineering-ontology:artefacto-software", note: "Artefacto liviano procedural" },
      { type: "requires", target: "urn:term:software-engineering-ontology:runtime-motor-ejecucion", note: "Requiere un motor de ejecución/intérprete en tiempo de llamada" },
      { type: "usedFor", target: "urn:term:software-engineering-ontology:aplicacion", note: "Facilita la compilación, despliegue y mantenimiento de aplicaciones" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Tipo de artefacto procedural directo para tooling y automatización.",
      promptTokens: ["automation script", "deterministic pipeline CLI", "shell execution script", "exit code compliance"],
      negativeTokens: ["full-scale enterprise framework"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 7,
      originalTitle: "Script de Automatización"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:runtime-motor-ejecucion",
    slug: "runtime-motor-ejecucion",
    title: "Runtime o Entorno de Ejecución (Runtime Environment / Execution Engine)",
    category: "semantica-compilacion",
    categoryLabel: "Semántica & Compilación",
    definition: "Subsistema de software que proporciona los servicios esenciales necesarios para que un programa se ejecute sobre el hardware o sistema operativo anfitrión. Administra la memoria, recolección de basura, planificación de hilos y puentes de entrada/salida.",
    shortDefinition: "Capa de software subyacente que suministra el entorno operativo, gestión de memoria y servicios básicos durante la ejecución del programa.",
    extendedDefinition: "Incluye motores de JavaScript (V8, SpiderMonkey), máquinas virtuales (JVM, CLR) y runtimes de contenedores. Define el modelo de concurrencia y la interacción con los recursos físicos.",
    fullDefinition: "Infraestructura de ejecución activa. Garantiza la seguridad de tipos en tiempo de corrida, resuelve dependencias dinámicas y traduce código intermedio (bytecode) a código de máquina nativo.",
    components: [
      "Recolector de basura y asignador de memoria (Garbage Collector / Memory Allocator)",
      "Bucle de eventos y programador de tareas (Event loop / Task Scheduler)",
      "Compilador Just-In-Time (JIT Compiler)",
      "API de sistema y puente de llamadas nativas (Syscalls abstraction layer)"
    ],
    applications: [
      "Ejecución de aplicaciones web en navegadores modernos",
      "Microservicios en Node.js, Deno, Bun o JVM",
      "Aislamiento seguro de agentes autónomos en sandboxes locales"
    ],
    examples: [
      "El motor V8 ejecutando el bucle de eventos asíncrono y optimizando funciones JavaScript mediante compilación Turbofan."
    ],
    synonyms: ["Runtime", "Execution engine", "Motor de ejecución", "Entorno de corrida"],
    attributes: {
      faseProduccion: "Runtime / Ejecución",
      categoriaCanon: "Semántica & Compilación",
      fuenteIndice: "Ontología Integral de Software v1.0"
    },
    relations: [
      { type: "enables", target: "urn:term:software-engineering-ontology:aplicacion", note: "Permite la instanciación y ejecución en memoria de aplicaciones" },
      { type: "requires", target: "urn:term:software-engineering-ontology:ast-abstract-syntax-tree", note: "Interpreta y optimiza representaciones sintácticas intermedias" },
      { type: "providesContextFor", target: "urn:term:software-engineering-ontology:plugin", note: "Ofrece el contexto y límites de seguridad para la ejecución de extensiones" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Capa fundamental para razonamiento de rendimiento, ciclo de eventos y memoria.",
      promptTokens: ["runtime execution engine", "event loop scheduler", "memory allocation sandbox", "JIT compiled runtime"],
      negativeTokens: ["static source code file", "design diagram"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 8,
      originalTitle: "Runtime / Motor de Ejecución"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:ast-abstract-syntax-tree",
    slug: "ast-abstract-syntax-tree",
    title: "Árbol de Sintaxis Abstracta (Abstract Syntax Tree / AST)",
    category: "semantica-compilacion",
    categoryLabel: "Semántica & Compilación",
    definition: "Representación en árbol de la estructura sintáctica abstracta de código fuente escrito en un lenguaje formal. Cada nodo del árbol denota una construcción formal presente en el código, omitiendo detalles léxicos irrelevantes como espacios, comentarios o paréntesis redundantes.",
    shortDefinition: "Grafo jerárquico que modela la estructura gramatical y semántica de un programa para análisis, optimización y transpilación.",
    extendedDefinition: "Fase cardinal de compiladores y linters. Sobre el AST se aplican análisis semánticos (type checking), transformaciones de código (Babel, SWC) y optimizaciones previas a la generación de código intermedio o binario.",
    fullDefinition: "Estructura formal intermedia en la teoría de lenguajes de programación. Permite a analizadores estáticos y modelos de lenguaje de código razonar deterministamente sobre el significado y flujo de datos de un programa.",
    components: [
      "Nodo raíz (Program / File root node)",
      "Nodos de declaraciones, sentencias y expresiones (Statements, Declarations, Expressions)",
      "Enlaces jerárquicos padre-hijo tipados",
      "Metadatos de posición espacial en fuente (Source map coordinates: line, column)"
    ],
    applications: [
      "Linters, formateadores de código y transformaciones AST (ESLint, Prettier)",
      "Compiladores y transpiladores de lenguajes modernos (TypeScript, Rust)",
      "Agentes de IA especializados en refactorización quirúrgica de código"
    ],
    examples: [
      "La transformación de una declaración de función flecha a una función tradicional analizada y mutada sobre su nodo AST correspondiente."
    ],
    synonyms: ["AST", "Árbol sintáctico", "Abstract Syntax Tree", "Grafo de sintaxis"],
    attributes: {
      faseProduccion: "Compilación / Análisis",
      categoriaCanon: "Semántica & Compilación",
      fuenteIndice: "Ontología Integral de Software v1.0"
    },
    relations: [
      { type: "usedBy", target: "urn:term:software-engineering-ontology:runtime-motor-ejecucion", note: "El motor de ejecución o compilador compila el AST a bytecode ejecutable" },
      { type: "isTypeOf", target: "urn:term:software-engineering-ontology:artefacto-software", note: "Representación intermedia formal de software" },
      { type: "relatesTo", target: "urn:term:software-engineering-ontology:inestabilidad-martin", note: "Permite calcular dependencias directas mediante análisis estático de imports" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Representación canónica para manipulación y razonamiento estructurado sobre código por LLMs.",
      promptTokens: ["abstract syntax tree traversal", "compiler AST transformation", "semantic code tree", "lossless syntax parsing"],
      negativeTokens: ["plain regex string match", "unparsed text"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 9,
      originalTitle: "Árbol de Sintaxis Abstracta (AST)"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:inestabilidad-martin",
    slug: "inestabilidad-martin",
    title: "Métrica de Inestabilidad de Martin (Martin's Instability Metric / I = Ce / (Ca + Ce))",
    category: "arquitectura-diseno",
    categoryLabel: "Arquitectura & Diseño Estructural",
    definition: "Métrica formal de ingeniería de software formulada por Robert C. Martin que cuantifica la propensión al cambio de un paquete o módulo. Se calcula como la razón entre los acoplamientos eferentes (Ce: dependencias salientes) y la suma de acoplamientos aferentes (Ca: dependencias entrantes) y eferentes: I = Ce / (Ca + Ce).",
    shortDefinition: "Razón matemática entre dependencias salientes y totales que mide si un módulo es estable (I ≈ 0) o inestable/flexible (I ≈ 1).",
    extendedDefinition: "Un valor de I = 0 indica un módulo máximamente estable (muchos dependen de él, él no depende de nadie, como el núcleo ontológico de un sistema). Un valor de I = 1 indica un módulo flexible y volátil. Se relaciona con la métrica de Abstractividad (A) para formular el Principio de Dependencias Estables.",
    fullDefinition: "Métrica fundamental en el diseño de arquitectura modular limpia. Exige que los módulos estables sean abstractos y que las dependencias apunten en la dirección de la estabilidad creciente (hacia I=0).",
    components: [
      "Acoplamiento Aferente (Ca: número de clases externas que dependen de este módulo)",
      "Acoplamiento Eferente (Ce: número de clases externas de las que depende este módulo)",
      "Fórmula de Inestabilidad (I = Ce / (Ca + Ce))",
      "Gráfico de Secuencia Principal (Distancia normalizada D = |A + I - 1|)"
    ],
    applications: [
      "Auditoría arquitectónica de modularidad y detección de ciclos de dependencias",
      "Diseño de núcleos ontológicos y capas de abstracción inviolables",
      "Refactorización guiada para desacoplamiento de componentes de alto impacto"
    ],
    examples: [
      "El motor semántico de DocWeb tiene Ca alto y Ce bajo (I ≈ 0.05), garantizando máxima estabilidad para que toda la interfaz dependa de él sin riesgo de deriva."
    ],
    synonyms: ["Instability metric", "Inestabilidad de Martin", "Métrica de acoplamiento eferente"],
    attributes: {
      faseProduccion: "Diseño Arquitectónico / Auditoría",
      categoriaCanon: "Arquitectura & Diseño Estructural",
      fuenteIndice: "Ontología Integral de Software v1.0"
    },
    relations: [
      { type: "regulates", target: "urn:term:software-engineering-ontology:framework", note: "Impone que el núcleo del framework sea estable frente a módulos periféricos" },
      { type: "appliesTo", target: "urn:term:software-engineering-ontology:microservicio", note: "Orienta el acoplamiento mínimo entre fronteras de servicios distribuidos" },
      { type: "influences", target: "urn:term:software-engineering-ontology:modelo-c4", note: "Informa los límites de componentes en diagramas arquitectónicos C4" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Métrica matemática para evaluar la calidad arquitectónica y la dirección de dependencias.",
      promptTokens: ["Martin instability metric", "efferent afferent coupling ratio", "stable abstractions principle", "clean architecture metrics"],
      negativeTokens: ["circular dependency", "spaghetti architecture"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 10,
      originalTitle: "Métrica de Inestabilidad de Martin"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:modelo-c4",
    slug: "modelo-c4",
    title: "Modelo C4 de Arquitectura de Software (C4 Model / Context, Containers, Components, Code)",
    category: "arquitectura-diseno",
    categoryLabel: "Arquitectura & Diseño Estructural",
    definition: "Enfoque de diagramación jerárquica y visualización arquitectónica formulado por Simon Brown que describe un sistema de software mediante cuatro niveles de abstracción crecientes: Contexto del Sistema (L1), Contenedores (L2), Componentes (L3) y Código/Clases (L4).",
    shortDefinition: "Metodología de documentación visual en 4 niveles zoomables para comunicar arquitecturas de software con claridad sin ambigüedad sintáctica.",
    extendedDefinition: "Funciona como un mapa interactivo (similar a Google Maps): permite a los equipos alejarse para ver los límites con actores externos (Contexto) o acercarse para ver el flujo interno de una clase o algoritmo (Código).",
    fullDefinition: "Estándar de facto moderno para representación arquitectónica. Elimina diagramas UML sobrecargados en favor de representaciones semánticas estructuradas comprensibles por desarrolladores, analistas y agentes de IA.",
    components: [
      "Nivel 1: Diagrama de Contexto del Sistema (System Context)",
      "Nivel 2: Diagrama de Contenedores (Containers: apps, DBs, microservices)",
      "Nivel 3: Diagrama de Componentes (Components: controllers, services, repositories)",
      "Nivel 4: Diagrama de Código (Code: UML class / struct diagrams)"
    ],
    applications: [
      "Documentación viva de arquitecturas de software empresariales",
      "Inducción técnica (onboarding) y comunicación multidisciplinaria",
      "Modelado de grafos de conocimiento contextual para asistentes de código"
    ],
    examples: [
      "Diagramar DocWeb en Nivel 1 mostrando al usuario y sistemas externos, y en Nivel 2 detallando la SPA web, el almacenamiento IndexedDB y el paquete bundle.js."
    ],
    synonyms: ["C4 model", "C4 architecture", "Modelo C4", "Diagramación en cuatro niveles"],
    attributes: {
      faseProduccion: "Diseño Arquitectónico / Documentación",
      categoriaCanon: "Arquitectura & Diseño Estructural",
      fuenteIndice: "Ontología Integral de Software v1.0"
    },
    relations: [
      { type: "implements", target: "urn:term:software-engineering-ontology:jerarquia-seis-niveles", note: "Se alinea armónicamente con los niveles estructurales de la ontología" },
      { type: "describes", target: "urn:term:software-engineering-ontology:microservicio", note: "Representa contenedores y límites de despliegue en Nivel 2 del modelo" },
      { type: "relatesTo", target: "urn:term:software-engineering-ontology:inestabilidad-martin", note: "Visualiza gráficamente los flujos de dependencias para calcular acoplamientos" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Estándar visual para generación de diagramas arquitectónicos multinivel en prompts.",
      promptTokens: ["C4 model architecture diagram", "context container component code levels", "zoomable architectural abstraction", "clean boundary diagram"],
      negativeTokens: ["unstructured box and line diagram", "overcomplicated UML"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 11,
      originalTitle: "Modelo C4 de Arquitectura"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:ddd-domain-driven-design",
    slug: "ddd-domain-driven-design",
    title: "Diseño Guiado por el Dominio (Domain-Driven Design / DDD)",
    category: "arquitectura-diseno",
    categoryLabel: "Arquitectura & Diseño Estructural",
    definition: "Enfoque de diseño de software introducido por Eric Evans que sitúa el modelo de negocio y su lógica de dominio en el centro del sistema, estableciendo un Lenguaje Ubicuo (Ubiquitous Language) compartido entre expertos de dominio y desarrolladores, y delimitando contextos (Bounded Contexts).",
    shortDefinition: "Metodología que alinea el software con la realidad del negocio mediante un lenguaje compartido y fronteras contextuales explícitas.",
    extendedDefinition: "Distingue patrones estratégicos (Context Mapping, Bounded Context, Core Domain) de patrones tácticos (Entities, Value Objects, Aggregates, Repositories, Domain Events). Previene la mezcla de lógica técnica de persistencia con reglas de negocio puras.",
    fullDefinition: "Paradigma ontológico fundamental para modelar sistemas complejos. Asegura que cada término tenga un significado unívoco dentro de su contexto específico, evitando la fragmentación terminológica.",
    components: [
      "Lenguaje Ubicuo (Ubiquitous Language compartido y formal)",
      "Contextos Delimitados (Bounded Contexts con mapas de contexto)",
      "Objetos de Dominio: Entidades (Entities con identidad) y Objetos de Valor (Value Objects inmutables)",
      "Agregados y Raíces de Agregado (Aggregates & Aggregate Roots)",
      "Eventos de Dominio (Domain Events)"
    ],
    applications: [
      "Modelado de negocios complejos (fintech, logística, telecomunicaciones)",
      "Definición de fronteras de microservicios y sistemas autónomos",
      "Construcción de taxonomías y glosarios ontológicos semánticos"
    ],
    examples: [
      "Modelar en DocWeb el término canónico como Entidad inmutable gobernada por su URN, separada de las opciones de visualización efímeras del UI."
    ],
    synonyms: ["DDD", "Domain-Driven Design", "Diseño guiado por el dominio", "Modelado de dominio"],
    attributes: {
      faseProduccion: "Modelado / Arquitectura",
      categoriaCanon: "Arquitectura & Diseño Estructural",
      fuenteIndice: "Ontología Integral de Software v1.0"
    },
    relations: [
      { type: "influences", target: "urn:term:software-engineering-ontology:microservicio", note: "El Bounded Context de DDD es el criterio primario para delimitar microservicios" },
      { type: "requires", target: "urn:term:software-engineering-ontology:jerarquia-seis-niveles", note: "Estructura ontológica que garantiza precisión semántica sin colisión de términos" },
      { type: "complements", target: "urn:term:software-engineering-ontology:transaccion-acid", note: "Los Agregados definen las fronteras de consistencia transaccional inmediata" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Marco fundamental para ingeniería de prompt y diseño guiado por modelos de dominio claros.",
      promptTokens: ["domain driven design DDD", "ubiquitous language", "bounded context boundary", "aggregate root invariants"],
      negativeTokens: ["anemic domain model", "database-first coupling"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 12,
      originalTitle: "Diseño Guiado por el Dominio (DDD)"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:jerarquia-seis-niveles",
    slug: "jerarquia-seis-niveles",
    title: "Jerarquía Ontológica de Seis Niveles (Six-Level Ontological Hierarchy / L1–L6)",
    category: "ingenieria-conocimiento",
    categoryLabel: "Ingeniería de Conocimiento & Grafos",
    definition: "Regla y modelo estructural de representación del conocimiento que restringe la profundidad máxima de subordinación taxonómica a seis niveles discretos (L1: Meta/Fundacional -> L2: Dominio/Sistema -> L3: Arquitectura/Módulo -> L4: Componente/Concepto -> L5: Operación/Algoritmo -> L6: Atributo/Implementación) para evitar la explosión combinatoria y garantizar recuperabilidad eficiente en agentes de IA.",
    shortDefinition: "Límite ontológico formal que restringe la taxonomía jerárquica a 6 estratos rigurosos para controlar el coste de inferencia y visualización.",
    extendedDefinition: "Fórmula central propuesta en el documento 'Ontología integral de programación e ingeniería de software': previene la dispersión infinita de subcategorías manteniendo un grafo canónico con presupuestos de recuperación explícitos.",
    fullDefinition: "Principio de economía epistémica y control de complejidad cognitiva. Garantiza que cualquier concepto o artefacto en el sistema sea ubicable a una distancia topológica no mayor a seis saltos desde la raíz ontológica.",
    components: [
      "Nivel L1: Fundacional / Meta-ontología (Entidades axiomáticas)",
      "Nivel L2: Dominio / Sistemas Globales (Ecosistemas de software y medios)",
      "Nivel L3: Arquitecturas / Subsistemas (Límites estructurales)",
      "Nivel L4: Conceptos Canónicos / Clases de Dominio",
      "Nivel L5: Técnicas / Procesos / Algoritmos operacionales",
      "Nivel L6: Instancias / Configuraciones / Atributos concretos"
    ],
    applications: [
      "Navegación e inspección en el Diagrama Contextual de DocWeb",
      "Indexación semántica eficiente en sistemas de recuperación GraphRAG",
      "Presupuestación de tokens y profundidad de razonamiento en agentes autónomos"
    ],
    examples: [
      "Clasificar 'balance-de-blancos' como L4 (Concepto Canónico) con 'temperatura-kelvin' en L5 (Parámetro) y '5600K' en L6 (Valor)."
    ],
    synonyms: ["Jerarquía L1-L6", "Six-level hierarchy", "Coto de seis niveles", "Taxonomía acotada L1-L6"],
    attributes: {
      faseProduccion: "Modelado Ontológico / Gobernanza",
      categoriaCanon: "Ingeniería de Conocimiento & Grafos",
      fuenteIndice: "Ontología Integral de Software v1.0"
    },
    relations: [
      { type: "regulates", target: "urn:term:software-engineering-ontology:graphrag-recuperacion-semantica", note: "Fija el radio de vecindad para expansión de subgrafos en consultas de IA" },
      { type: "alignsWith", target: "urn:term:software-engineering-ontology:modelo-c4", note: "Correspondencia dimensional con los niveles de abstracción arquitectónica" },
      { type: "governs", target: "urn:term:software-engineering-ontology:artefacto-software", note: "Asigna a cada artefacto su cota ontológica exacta" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Principio rector para diseñar diagramas y grafos de conocimiento estructurados y navegables.",
      promptTokens: ["six-level ontology hierarchy", "L1 to L6 abstraction depth", "bounded graph exploration", "controlled cognitive complexity"],
      negativeTokens: ["unbounded deep taxonomy", "infinite recursion"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 13,
      originalTitle: "Jerarquía Ontológica de Seis Niveles"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:transaccion-acid",
    slug: "transaccion-acid",
    title: "Transacción ACID (ACID Transaction / Atomicity, Consistency, Isolation, Durability)",
    category: "sistemas-distribuidos",
    categoryLabel: "Sistemas Distribuidos & Persistencia",
    definition: "Conjunto de cuatro garantías formales (Atomicidad, Consistencia, Aislamiento y Durabilidad) que aseguran que una secuencia de operaciones sobre una base de datos se ejecute de manera segura y confiable incluso ante caídas de energía, fallos de hardware o accesos concurrentes.",
    shortDefinition: "Propiedades matemáticas fundamentales que garantizan la integridad determinista en sistemas de bases de datos y persistencia transaccional.",
    extendedDefinition: "La Atomicidad asegura que todo se ejecute o nada; la Consistencia preserva los invariantes del esquema; el Aislamiento evita lecturas sucias o condiciones de carrera; la Durabilidad garantiza que los datos confirmados no se pierdan.",
    fullDefinition: "Contrato fundamental de confiabilidad de datos. En arquitecturas modernas se contrasta con modelos de consistencia eventual (BASE) en bases de datos NoSQL y distribuidas.",
    components: [
      "Atomicidad (All-or-nothing rollback mechanism)",
      "Consistencia (Integrity constraints enforcement)",
      "Aislamiento (Isolation levels: Read Committed, Repeatable Read, Serializable)",
      "Durabilidad (Write-Ahead Logging / WAL persistente en disco)"
    ],
    applications: [
      "Operaciones bancarias y transferencias de saldo",
      "Persistencia local en navegadores mediante transacciones IndexedDB",
      "Sistemas de gestión de inventario y pedidos transaccionales"
    ],
    examples: [
      "La transacción de guardado de un nuevo término en storage.js que asegura atomicidad mediante una transacción readwrite en IndexedDB."
    ],
    synonyms: ["ACID", "Propiedades ACID", "Transaccionalidad estricta", "ACID guarantees"],
    attributes: {
      faseProduccion: "Persistencia / Runtime",
      categoriaCanon: "Sistemas Distribuidos & Persistencia",
      fuenteIndice: "Ontología Integral de Software v1.0"
    },
    relations: [
      { type: "implementedBy", target: "urn:term:software-engineering-ontology:aplicacion", note: "Implementado en capas de almacenamiento local para garantizar persistencia" },
      { type: "differentiatesFrom", target: "urn:term:software-engineering-ontology:microservicio", note: "En microservicios distribuidos las transacciones ACID locales se sustituyen por patrones Saga o consistencia eventual" },
      { type: "ensures", target: "urn:term:software-engineering-ontology:artefacto-software", note: "Preserva la integridad de estado de los artefactos persistidos" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Patrón indispensable para diseño de almacenamiento confiable y sin corrupción de datos.",
      promptTokens: ["ACID transactional integrity", "write ahead log WAL", "strict isolation level", "atomic rollback guarantee"],
      negativeTokens: ["dirty read", "uncommitted state", "silent data corruption"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 14,
      originalTitle: "Transacción ACID"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:graphrag-recuperacion-semantica",
    slug: "graphrag-recuperacion-semantica",
    title: "GraphRAG y Recuperación Semántica con Grafos (Graph-based Retrieval-Augmented Generation)",
    category: "ingenieria-conocimiento",
    categoryLabel: "Ingeniería de Conocimiento & Grafos",
    definition: "Paradigma avanzado de inteligencia artificial que combina la recuperación aumentada por generación (RAG) con grafos de conocimiento estructurados. En lugar de limitarse a fragmentos de texto vectoriales planos, extrae subgrafos contextuales conectados con entidades, relaciones ontológicas y pruebas de procedencia.",
    shortDefinition: "Arquitectura que une modelos de lenguaje con grafos de conocimiento para responder consultas complejas con trazabilidad y sin alucinaciones.",
    extendedDefinition: "Supera la ceguera relacional del RAG tradicional basado solo en similitud coseno de embeddings. Permite realizar consultas agregadas holísticas ('¿cuál es la estructura completa de iluminación?') sintetizando comunidades y vecindades de conceptos.",
    fullDefinition: "Infraestructura semántica contemporánea para agentes de conocimiento. Permite proyectar la intención de una tarea sobre el grafo canónico y recuperar únicamente el subgrafo relevante bajo presupuestos finitos de contexto.",
    components: [
      "Grafo de entidades y relaciones tipadas (Knowledge graph triples: Subject-Predicate-Object)",
      "Motor de detección de comunidades jerárquicas (Leiden algorithm clustering)",
      "Mecanismo de generación de resúmenes de comunidad (Community reports)",
      "Proyector de subgrafos por intención de consulta (Intent-driven subgraph selector)"
    ],
    applications: [
      "Sistemas de consulta técnica de alta precisión para bases documentales extensas",
      "Navegación contextual asistida por IA en DocWeb Multiglossary",
      "Auditoría epistemológica y trazabilidad de afirmaciones de modelos generativos"
    ],
    examples: [
      "El motor semántico de DocWeb que proyecta las relaciones de un término y genera directivas estructuradas para el Orientador de IA."
    ],
    synonyms: ["GraphRAG", "Graph-RAG", "Recuperación semántica basada en grafos", "Knowledge graph RAG"],
    attributes: {
      faseProduccion: "Inferencia / Recuperación",
      categoriaCanon: "Ingeniería de Conocimiento & Grafos",
      fuenteIndice: "Ontología Integral de Software v1.0"
    },
    relations: [
      { type: "implements", target: "urn:term:software-engineering-ontology:jerarquia-seis-niveles", note: "Emplea cotas ontológicas para limitar el coste de recuperación del subgrafo" },
      { type: "requires", target: "urn:term:software-engineering-ontology:ddd-domain-driven-design", note: "Se nutre de modelos de dominio formalmente estructurados para máxima precisión" },
      { type: "relatesTo", target: "urn:term:software-engineering-ontology:ast-abstract-syntax-tree", note: "Extiende el razonamiento de grafos desde código fuente hacia ontologías completas" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Técnica de vanguardia para conectar bases de conocimiento estructuradas con agentes de IA.",
      promptTokens: ["GraphRAG knowledge graph retrieval", "hierarchical entity community summary", "intent-driven subgraph reasoning", "epistemic evidence traceability"],
      negativeTokens: ["blind vector similarity search", "hallucinatory answer"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 15,
      originalTitle: "GraphRAG / Recuperación Semántica con Grafos"
    }
  }
];

// 2. Definición del Glosario de IA Generativa & Modelos Multimodales para Medios
const genAiGlossary = {
  "$schema": "../../schema/glossary.json",
  "id": "generative-ai-media",
  "slug": "generative-ai-media",
  "title": "IA Generativa & Modelos Multimodales para Medios",
  "description": "Fundamentos teóricos, arquitecturas neuronales, modelos de difusión, mecanismos de atención y flujos de trabajo generativos para síntesis cinemática de imagen, video y audio.",
  "domain": "Generative AI, Diffusion Models, Multimodal Media Synthesis, Neural Video, Transformer Architectures",
  "version": "1.0.0",
  "termCount": 10,
  "categories": [
    "Arquitecturas de Difusión & Espacio Latente",
    "Acondicionamiento & Control Espacial",
    "Atención Multimodal & Embeddings",
    "Síntesis Temporal & Video Neuronal",
    "Alineación, Guía & Muestreo"
  ],
  "author": "DocWeb Knowledge Engineering Working Group",
  "created": "2026-10-25",
  "updated": "2026-11-01"
};

const genAiTerms = [
  {
    id: "urn:term:generative-ai-media:diffusion-models",
    slug: "diffusion-models",
    title: "Modelos de Difusión Probabilística (Denoising Diffusion Probabilistic Models / DDPM)",
    category: "arquitecturas-difusion",
    categoryLabel: "Arquitecturas de Difusión & Espacio Latente",
    definition: "Clase de modelos generativos basados en procesos estocásticos que aprenden a generar datos revirtiendo un proceso progresivo de difusión. En el paso directo (forward process) se añade gradualmente ruido gaussiano a los datos hasta destruirlos por completo; en el paso inverso (reverse process), una red neuronal aprende a remover dicho ruido secuencialmente para reconstruir o sintetizar muestras novedosas.",
    shortDefinition: "Arquitectura generativa que crea imágenes o audio de alta fidelidad eliminando iterativamente ruido gaussiano a través de una red neuronal entrenada.",
    extendedDefinition: "A diferencia de las GANs (que sufren colapso modal) y los VAEs estándar (que generan resultados borrosos), los modelos de difusión ofrecen estabilidad matemática de entrenamiento y una cobertura modal superior.",
    fullDefinition: "Paradigma generativo dominante en síntesis visual moderna. Modela el gradiente de la distribución de densidad de los datos (Score-based generative modeling) para guiar trayectorias desde el caos estocástico hacia la coherencia perceptual.",
    components: [
      "Proceso directo markoviano de adición de ruido (Forward noise schedule / $\\beta_t$)",
      "Red U-Net o DiT de predicción de ruido residual (Noise predictor $\\epsilon_\\theta(x_t, t)$)",
      "Ecuaciones diferenciales estocásticas y ODEs de muestreo inverso (DDIM, DPM-Solver)",
      "Función de pérdida variacional simplificada ($L_{\\text{simple}}$)"
    ],
    applications: [
      "Generación fotorrealista de imágenes cinematográficas y arte digital",
      "Síntesis y extensión temporal de secuencias de video",
      "Restauración, superresolución e inpainting de fotogramas degradados"
    ],
    examples: [
      "Midjourney, Stable Diffusion o Flux ejecutando 25 pasos de desruidado para materializar un retrato cinemático a partir de ruido puro."
    ],
    synonyms: ["DDPM", "Diffusion models", "Modelos de difusión", "Proceso de desruidado estocástico"],
    attributes: {
      faseProduccion: "Generación / Inferencia",
      categoriaCanon: "Arquitecturas de Difusión & Espacio Latente",
      fuenteIndice: "DocWeb AI Media Synthesis Catalog"
    },
    relations: [
      { type: "generalizes", target: "urn:term:generative-ai-media:latent-diffusion-models", note: "Los LDM aplican este proceso en el espacio latente comprimido" },
      { type: "relatesTo", target: "urn:term:audiovisual-production:rack-focus", note: "Afecta la nitidez y coherencia focal en fotogramas generados" },
      { type: "requires", target: "urn:term:generative-ai-media:classifier-free-guidance-cfg", note: "Requiere esquemas de guía para orientar el desruidado hacia el prompt" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Motor computacional base de todas las herramientas generativas modernas de imagen y video.",
      promptTokens: ["denoising diffusion process", "DDPM sampling trajectory", "iterative noise removal", "score-based synthesis"],
      negativeTokens: ["GAN artifacts", "mode collapse", "blurry VAE reconstruction"],
      modelCompatibility: ["Stable Diffusion", "Midjourney", "Flux", "Runway Gen-3"]
    },
    metadata: {
      source: "docweb_genai_media_v1",
      sourceIndex: 1,
      originalTitle: "Modelos de Difusión Probabilística"
    }
  },
  {
    id: "urn:term:generative-ai-media:latent-diffusion-models",
    slug: "latent-diffusion-models",
    title: "Modelos de Difusión en Espacio Latente (Latent Diffusion Models / LDM)",
    category: "arquitecturas-difusion",
    categoryLabel: "Arquitecturas de Difusión & Espacio Latente",
    definition: "Variante de los modelos de difusión que ejecuta el proceso de entrenamiento y muestreo de ruido dentro del espacio latente de baja dimensión de un autocodificador preentrenado (VAE), en lugar de operar directamente en el costoso espacio de píxeles.",
    shortDefinition: "Arquitectura que comprime la imagen a un espacio latente compacto para desruidar con alta velocidad y menor consumo computacional.",
    extendedDefinition: "Propuesta por Rombach et al. (Stable Diffusion). Al comprimir imágenes de alta resolución mediante un factor espacial (como $8\\times$ o $16\\times$), reduce el coste computacional entre 10 y 100 veces, preservando la fidelidad perceptiva y geométrica.",
    fullDefinition: "Base de la democratización de la IA generativa moderna. Separa la compresión perceptiva (responsabilidad del VAE) de la generación semántica (responsabilidad de la U-Net o DiT en espacio latente).",
    components: [
      "Autocodificador variacional preentrenado (Encoder $\\mathcal{E}$ y Decoder $\\mathcal{D}$)",
      "Espacio latente normalizado de tensores de dimensiones reducidas ($Z = \\mathcal{E}(x)$)",
      "Red neuronal de difusión latente con condicionamiento multimodal",
      "Decodificador de síntesis de píxeles de alta resolución"
    ],
    applications: [
      "Generación de imágenes en hardware de consumo y estaciones locales",
      "Modelos de video neurónico en espacio latente espacio-temporal",
      "Sistemas de inpainting y outpainting en tiempo real"
    ],
    examples: [
      "Stable Diffusion XL tomando un prompt, generando un tensor latente de 128x128x4 y proyectándolo a través del decodificador VAE a una imagen final de 1024x1024 píxeles."
    ],
    synonyms: ["LDM", "Latent diffusion", "Difusión latente", "Stable Diffusion Architecture"],
    attributes: {
      faseProduccion: "Generación / Inferencia",
      categoriaCanon: "Arquitecturas de Difusión & Espacio Latente",
      fuenteIndice: "DocWeb AI Media Synthesis Catalog"
    },
    relations: [
      { type: "isTypeOf", target: "urn:term:generative-ai-media:diffusion-models", note: "Especialización de difusión optimizada en espacio comprimido" },
      { type: "requires", target: "urn:term:generative-ai-media:variational-autoencoder-vae", note: "Depende del VAE para codificar y decodificar entre píxeles y tensores latentes" },
      { type: "complements", target: "urn:term:generative-ai-media:cross-attention-mechanism", note: "Utiliza atención cruzada para inyectar condicionamiento de texto en el espacio latente" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Estructura interna que determina cómo las dimensiones y resoluciones afectan la coherencia de imagen.",
      promptTokens: ["latent diffusion space", "compressed latent representation", "perceptual autoencoding", "spatial compression 8x"],
      negativeTokens: ["pixel space brute force", "memory overflow"],
      modelCompatibility: ["SDXL", "Flux.1", "Runway Gen-3", "OpenAI Sora"]
    },
    metadata: {
      source: "docweb_genai_media_v1",
      sourceIndex: 2,
      originalTitle: "Modelos de Difusión en Espacio Latente"
    }
  },
  {
    id: "urn:term:generative-ai-media:cross-attention-mechanism",
    slug: "cross-attention-mechanism",
    title: "Mecanismo de Atención Cruzada (Cross-Attention Mechanism / Text-to-Image Conditioning)",
    category: "atencion-multimodal",
    categoryLabel: "Atención Multimodal & Embeddings",
    definition: "Módulo de atención de transformadores que mapea información entre dos modalidades distintas: proyecta las características espaciales de la imagen en proceso de difusión (consultas / Queries) sobre las representaciones semánticas del texto codificadas por un modelo de lenguaje (claves / Keys y valores / Values).",
    shortDefinition: "Capa de red neuronal que guía la colocación y aspecto de los elementos visuales según las palabras del prompt del usuario.",
    extendedDefinition: "Es el puente responsable del alineamiento prompt-imagen. Permite que cada zona espacial de la imagen 'preste atención' a tokens específicos del texto (como asociar 'ojos verdes' exclusivamente a la región ocular del rostro).",
    fullDefinition: "Operación matemática fundamental $\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$. Permite manipular mapas de atención cruzada para control fino de composición, sustitución de palabras (Prompt-to-Prompt) e inyección de tokens de referencia.",
    components: [
      "Vectores Query ($Q$) proyectados desde los estados espaciales de la imagen",
      "Vectores Key ($K$) proyectados desde los embeddings de tokens de texto",
      "Vectores Value ($V$) portadores de las características semánticas contextualizadas",
      "Matrices de mapas de atención espacial normalizadas por softmax"
    ],
    applications: [
      "Guiado fiel de texto a imagen y generación de planos audiovisuales",
      "Técnicas de edición de imagen sin entrenamiento (Cross-attention control / Prompt-to-Prompt)",
      "Focalización de objetos y coherencia de personajes recurrentes"
    ],
    examples: [
      "La palabra 'claqueta' en el prompt activa intensamente los valores de atención en la región central del plano donde la red dibuja los bordes y rayas del objeto."
    ],
    synonyms: ["Cross-attention", "Atención cruzada", "Mecanismo de atención texto-imagen", "Cross-modal attention"],
    attributes: {
      faseProduccion: "Inferencia / Acondicionamiento",
      categoriaCanon: "Atención Multimodal & Embeddings",
      fuenteIndice: "DocWeb AI Media Synthesis Catalog"
    },
    relations: [
      { type: "regulates", target: "urn:term:generative-ai-media:latent-diffusion-models", note: "Guía el proceso de desruidado del modelo latente hacia la intención del prompt" },
      { type: "requires", target: "urn:term:generative-ai-media:multimodal-embeddings-clip", note: "Toma como claves y valores los embeddings producidos por el codificador de texto" },
      { type: "usedBy", target: "urn:term:generative-ai-media:controlnet-spatial-conditioning", note: "Se combina con señales estructurales para doble condicionamiento semántico y espacial" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Mecanismo que determina el peso y fidelidad de cada adjetivo y sustantivo en la imagen generada.",
      promptTokens: ["cross-attention conditioning", "precise token attention map", "query-key cross-modal binding", "semantic alignment"],
      negativeTokens: ["token bleed", "concept bleeding", "ignored prompt keywords"],
      modelCompatibility: ["All Multimodal Diffusion & Transformer Models"]
    },
    metadata: {
      source: "docweb_genai_media_v1",
      sourceIndex: 3,
      originalTitle: "Mecanismo de Atención Cruzada"
    }
  },
  {
    id: "urn:term:generative-ai-media:variational-autoencoder-vae",
    slug: "variational-autoencoder-vae",
    title: "Autoencoder Variacional Espacial (Variational Autoencoder / VAE / Autoencoder KL)",
    category: "arquitecturas-difusion",
    categoryLabel: "Arquitecturas de Difusión & Espacio Latente",
    definition: "Red neuronal compuesta por un codificador y un decodificador entrenada para mapear imágenes del espacio de píxeles a una distribución gaussiana regularizada en el espacio latente y viceversa, preservando la fidelidad de colores, contrastes y microtexturas de alta frecuencia.",
    shortDefinition: "Componente bidireccional que comprime imágenes a espacio latente para el modelo generativo y luego las descomprime a imagen final visible.",
    extendedDefinition: "En pipelines de video e imagen generativa, un VAE defectuoso o mal calibrado provoca colores apagados, tonos de piel lavados o artefactos de mosaico. Los VAEs modernos utilizan cuantización vectorial (VQ-VAE) o regularización KL (Kullback-Leibler).",
    fullDefinition: "Subsistema de compresión y descompresión analógica-digital en modelos de difusión. Su espacio latente condensa la información perceptiva de la imagen, permitiendo que la red principal opere sin saturación de memoria GPU.",
    components: [
      "Encoder convolucional con capas de downsampling",
      "Espacio latente continuo parametrizado por media ($\\mu$) y varianza ($\\sigma^2$)",
      "Técnica de reparametrización estocástica (Reparameterization trick)",
      "Decoder con capas de upsampling y convoluciones residuales"
    ],
    applications: [
      "Decodificación final de fotogramas generados en alta resolución",
      "Codificación de imágenes de referencia para Image-to-Image y ControlNet",
      "Compresión de video espacio-temporal en modelos neuronales"
    ],
    examples: [
      "El VAE de DaVinci o de SDXL reconstruyendo microcontrastes de piel y degradados tonales a partir del mapa de tensores latentes desruidado."
    ],
    synonyms: ["VAE", "Autoencoder variacional", "Autoencoder KL", "Latent encoder/decoder"],
    attributes: {
      faseProduccion: "Codificación / Decodificación",
      categoriaCanon: "Arquitecturas de Difusión & Espacio Latente",
      fuenteIndice: "DocWeb AI Media Synthesis Catalog"
    },
    relations: [
      { type: "enables", target: "urn:term:generative-ai-media:latent-diffusion-models", note: "Proporciona el sustrato del espacio latente donde opera la difusión" },
      { type: "relatesTo", target: "urn:term:video-image:color-gamut", note: "El VAE debe calibrarse para no recortar gamut cromático amplio como Rec.709 o DCI-P3" },
      { type: "influences", target: "urn:term:audiovisual-production:etalonaje-color-grading", note: "Define la neutralidad del color antes del etalonaje final" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Elemento clave para evitar colores lavados o artefactos de decodificación en imágenes IA.",
      promptTokens: ["calibrated VAE decode", "high-fidelity variational autoencoder", "rich color saturation", "clean microtextures"],
      negativeTokens: ["washed out colors", "tiled VAE artifacts", "pixelated color banding"],
      modelCompatibility: ["All Latent Diffusion Architectures"]
    },
    metadata: {
      source: "docweb_genai_media_v1",
      sourceIndex: 4,
      originalTitle: "Autoencoder Variacional (VAE)"
    }
  },
  {
    id: "urn:term:generative-ai-media:lora-low-rank-adaptation",
    slug: "lora-low-rank-adaptation",
    title: "Adaptación de Bajo Rango (Low-Rank Adaptation / LoRA)",
    category: "acondicionamiento-control",
    categoryLabel: "Acondicionamiento & Control Espacial",
    definition: "Técnica de ajuste fino eficiente de parámetros (PEFT) que congela los pesos preentrenados del modelo base e inyecta matrices de descomposición de bajo rango ($A \\times B$) en las capas de atención del transformador, permitiendo aprender nuevos personajes, estilos o conceptos con archivos de pocos megabytes.",
    shortDefinition: "Módulo liviano acoplable que inyecta estilos, personajes o técnicas de iluminación específicas en un modelo generativo base sin reentrenarlo.",
    extendedDefinition: "Matemáticamente, descompone la matriz de actualización de pesos $\\Delta W$ de dimensiones $d \\times k$ en el producto de dos matrices de rango $r \\ll \\min(d, k)$. Reduce los requerimientos de memoria VRAM en más de un 80% durante el entrenamiento.",
    fullDefinition: "Método modular preferido de la industria para personalizar modelos generativos. Permite apilar múltiples LoRAs simultáneamente modulando sus ponderaciones o escalas de influencia (Alpha / Weight).",
    components: [
      "Matriz de rango bajo A ($d \\times r$) inicializada con distribución normal",
      "Matriz de rango bajo B ($r \\times k$) inicializada en cero",
      "Factor de escala de rango (Rank $r$ y LoRA Alpha $\\alpha$)",
      "Ponderación dinámica de inferencia (LoRA weight multiplier: 0.0 a 1.5)"
    ],
    applications: [
      "Consistencia de personajes recurrentes a través de múltiples tomas y escenas",
      "Replicación de estilos cinematográficos de autor (p.ej. Wes Anderson, Film Noir)",
      "Inyección de vestuarios corporativos, props o marcas registradas en sets generativos"
    ],
    examples: [
      "Cargar un LoRA de iluminación de tungsteno con peso 0.8 junto a un LoRA de lente anamórfico vintage con peso 0.6 para filmar una secuencia nocturna."
    ],
    synonyms: ["LoRA", "Low-Rank Adaptation", "Ajuste fino de bajo rango", "Adaptador LoRA"],
    attributes: {
      faseProduccion: "Personalización / Inferencia",
      categoriaCanon: "Acondicionamiento & Control Espacial",
      fuenteIndice: "DocWeb AI Media Synthesis Catalog"
    },
    relations: [
      { type: "modulates", target: "urn:term:generative-ai-media:cross-attention-mechanism", note: "Modifica los pesos de las proyecciones de atención cruzada" },
      { type: "complements", target: "urn:term:generative-ai-media:controlnet-spatial-conditioning", note: "El LoRA aporta identidad y estilo mientras ControlNet aporta composición geométrica" },
      { type: "usedFor", target: "urn:term:audiovisual-production:continuidad-cinematografica", note: "Garantiza coherencia física del rostro y vestuario en planos sucesivos" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Herramienta obligatoria para mantener continuidad visual de protagonistas en preproducción cinemática con IA.",
      promptTokens: ["character consistency LoRA", "stylistic adapter", "low-rank weight blend", "coherent cinematic aesthetic"],
      negativeTokens: ["overcooked LoRA artifacts", "burned contrast", "distorted face anatomy"],
      modelCompatibility: ["SDXL", "Flux", "Midjourney Style Reference", "Runway Gen-3"]
    },
    metadata: {
      source: "docweb_genai_media_v1",
      sourceIndex: 5,
      originalTitle: "Adaptación de Bajo Rango (LoRA)"
    }
  },
  {
    id: "urn:term:generative-ai-media:controlnet-spatial-conditioning",
    slug: "controlnet-spatial-conditioning",
    title: "ControlNet y Acondicionamiento Espacial Estructural (ControlNet / Spatial Conditioning)",
    category: "acondicionamiento-control",
    categoryLabel: "Acondicionamiento & Control Espacial",
    definition: "Arquitectura neuronal que añade condicionamiento espacial explícito a modelos de difusión mediante el bloqueo de los pesos originales y la duplicación de una copia entrenable comunicada mediante capas de convolución cero (Zero Convolutions). Permite guiar la generación con mapas de profundidad, bordes Canny, poses humanas (OpenPose) o líneas normales.",
    shortDefinition: "Red complementaria que obliga al modelo generativo a respetar exactamente la geometría, pose o perspectiva provista por una imagen guía.",
    extendedDefinition: "Resuelve la incapacidad del texto puro para dictar composiciones espaciales exactas. Permite a los directores de fotografía transferir un encuadre preciso, el escorzo de un actor o la perspectiva de un pasillo al cuadro generado.",
    fullDefinition: "Infraestructura de control compositivo en producción visual con IA. Sus variantes incluyen Canny (líneas duras), Depth (mapa de profundidad Z), OpenPose (esqueleto anatómico de 18 articulaciones) y SoftEdge/Lineart.",
    components: [
      "Bloques bloqueados del modelo base (Locked original blocks)",
      "Bloques entrenables duplicados (Trainable cloned blocks)",
      "Capas de convolución cero de entrada y salida (Zero Convolutions con pesos iniciales en cero)",
      "Preprocesadores de señal visual (Canny detector, MiDaS/ZoeDepth, OpenPose estimator)"
    ],
    applications: [
      "Composición de encuadres cinematográficos según storyboards y bocetos",
      "Control estricto de postura corporal en planos americanos y primeros planos",
      "Mapeo de arquitectura y perspectivas sin deformación de líneas de fuga"
    ],
    examples: [
      "Alimentar un render 3D alámbrico a través de ControlNet Depth para que la IA genere un set fotorrealista respetando con exactitud la posición de las columnas y la cámara."
    ],
    synonyms: ["ControlNet", "Acondicionamiento espacial", "Control de estructura", "Red de control geométrico"],
    attributes: {
      faseProduccion: "Previsualización / Composición",
      categoriaCanon: "Acondicionamiento & Control Espacial",
      fuenteIndice: "DocWeb AI Media Synthesis Catalog"
    },
    relations: [
      { type: "guides", target: "urn:term:generative-ai-media:latent-diffusion-models", note: "Inyecta tensores espaciales en las etapas residuales del modelo latente" },
      { type: "complements", target: "urn:term:audiovisual-production:angulo-de-camara", note: "Fija con precisión matemática el punto de vista y ángulo de encuadre" },
      { type: "usedFor", target: "urn:term:audiovisual-production:storyboard", note: "Convierte bocetos del guion gráfico en planos cinemáticos fotorrealistas" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Herramienta definitiva para sustituir la aleatoriedad de composición por control de director.",
      promptTokens: ["ControlNet depth guided", "strict pose adherence", "zero convolution structural guidance", "perspective aligned composition"],
      negativeTokens: ["misaligned limbs", "perspective distortion", "random framing"],
      modelCompatibility: ["Stable Diffusion", "SDXL", "Flux Tools", "ComfyUI Pipelines"]
    },
    metadata: {
      source: "docweb_genai_media_v1",
      sourceIndex: 6,
      originalTitle: "ControlNet / Acondicionamiento Espacial"
    }
  },
  {
    id: "urn:term:generative-ai-media:classifier-free-guidance-cfg",
    slug: "classifier-free-guidance-cfg",
    title: "Guía Libre de Clasificador y Escala CFG (Classifier-Free Guidance / CFG Scale)",
    category: "alineacion-muestreo",
    categoryLabel: "Alineación, Guía & Muestreo",
    definition: "Técnica de muestreo para modelos de difusión que combina linealmente una predicción de ruido condicionada por el prompt ($e_\\theta(x_t, c)$) con una predicción incondicionada ($e_\\theta(x_t, \\emptyset)$), modulada por un escalar de guía ($w$ o CFG Scale): $\\tilde{e} = e_\\theta(x_t, \\emptyset) + w \\cdot (e_\\theta(x_t, c) - e_\\theta(x_t, \\emptyset))$.",
    shortDefinition: "Factor numérico que regula cuán estrictamente la imagen generada debe obedecer al prompt frente a la creatividad o naturalidad orgánica.",
    extendedDefinition: "Un valor bajo de CFG (1 a 4) otorga naturalidad y libertad plástica pero puede ignorar detalles del prompt. Un valor moderado (5 a 8) es el punto dulce estándar. Valores excesivos (>12) provocan saturación agresiva de color, halos y contraste quemado.",
    fullDefinition: "Mecanismo matemático que prescinde de un clasificador externo preentrenado. Al extrapolar en la dirección indicada por la diferencia entre la estimación con texto y sin texto, amplifica selectivamente las probabilidades de los modos semánticos deseados.",
    components: [
      "Paso condicionado con prompt positivo ($e_\\theta(x_t, c)$)",
      "Paso incondicionado con prompt vacío o negativo ($e_\\theta(x_t, \\emptyset)$)",
      "Escala escalar de guía ($w$ o CFG Scale)",
      "Técnicas de reescalado dinámico (Dynamic Thresholding / CFG Rescale) para evitar sobreexposición"
    ],
    applications: [
      "Calibración de fidelidad compositiva en motores de render generativo",
      "Uso de prompts negativos para suprimir aberraciones cromáticas o deformaciones",
      "Control de equilibrio entre hiperrealismo y fidelidad literal"
    ],
    examples: [
      "Ajustar CFG en 6.5 con prompt negativo 'oversaturated, high contrast, blurry' para obtener una estética cinematográfica natural y balanceada."
    ],
    synonyms: ["CFG Scale", "Classifier-Free Guidance", "Escala de guía", "Guía incondicionada"],
    attributes: {
      faseProduccion: "Inferencia / Muestreo",
      categoriaCanon: "Alineación, Guía & Muestreo",
      fuenteIndice: "DocWeb AI Media Synthesis Catalog"
    },
    relations: [
      { type: "controls", target: "urn:term:generative-ai-media:diffusion-models", note: "Modula la trayectoria de predicción de ruido durante todo el bucle de muestreo" },
      { type: "influences", target: "urn:term:audiovisual-production:dynamic-range-latitude", note: "Valores desmedidos de CFG colapsan el rango dinámico empastando sombras o quemando altas luces" },
      { type: "interactsWith", target: "urn:term:generative-ai-media:cross-attention-mechanism", note: "Pondera la fuerza con la que las capas de atención cruzada tiran del desruidado" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Parámetro numérico clave en la generación para evitar el 'aspecto IA plástico y sobrecontrastado'.",
      promptTokens: ["CFG scale 6.0", "balanced prompt adherence", "natural dynamic range", "subtle text guidance"],
      negativeTokens: ["burnt pixels", "high CFG artifacts", "deep-fried contrast", "neon oversaturation"],
      modelCompatibility: ["All Diffusion Samplers"]
    },
    metadata: {
      source: "docweb_genai_media_v1",
      sourceIndex: 7,
      originalTitle: "Guía Libre de Clasificador (CFG)"
    }
  },
  {
    id: "urn:term:generative-ai-media:transformer-dit-diffusion-transformer",
    slug: "transformer-dit-diffusion-transformer",
    title: "Transformador de Difusión (Diffusion Transformer / DiT Architecture)",
    category: "arquitecturas-difusion",
    categoryLabel: "Arquitecturas de Difusión & Espacio Latente",
    definition: "Arquitectura neuronal que sustituye la tradicional red convolucional U-Net en los modelos de difusión por una estructura basada enteramente en Transformadores. Las imágenes o volúmenes de video latentes se dividen en parches secuenciales (patches) procesados mediante bloques de autoatención y atención cruzada escalables.",
    shortDefinition: "Arquitectura moderna que reemplaza las redes convolucionales por transformers puros para lograr un escalado masivo en modelos de video e imagen.",
    extendedDefinition: "Formulada por Peebles y Xie (2023), y base de sistemas de frontera como OpenAI Sora, Flux y Runway Gen-3. Demuestra leyes de escala (Scaling Laws): a mayor capacidad de cómputo y parámetros, la calidad física y coherencia espacial mejoran de forma predecible sin estancarse.",
    fullDefinition: "Evolución paradigmática en IA generativa multimodal. Al unificar la generación de medios bajo el mecanismo de transformadores, permite procesar conjuntamente texto, parches de imagen y fotogramas de video con atención global unificada.",
    components: [
      "Operador de parcheado espacial y temporal (Patchify layer: divide latentes en parches $p \\times p$)",
      "Embeddings de posición espacio-temporal aprendidos (3D Positional Embeddings)",
      "Bloques de transformador con modulación adaptativa (adaLN / adaptive layer norm)",
      "Capas de desparcheado final para reconstruir el tensor latente (Unpatchify)"
    ],
    applications: [
      "Generación de video cinematográfico continuo a alta resolución (Sora, Kling, Luma)",
      "Modelos fundacionales de síntesis de imagen de última generación (Flux.1)",
      "Modelado de físicas de fluidos, colisiones e iluminación consistente en video"
    ],
    examples: [
      "Flux o Sora procesando una secuencia de 10 segundos como una secuencia masiva de parches espacio-temporales acoplados por autoatención completa."
    ],
    synonyms: ["DiT", "Diffusion Transformer", "Transformador de difusión", "Arquitectura DiT"],
    attributes: {
      faseProduccion: "Arquitectura / Entrenamiento",
      categoriaCanon: "Arquitecturas de Difusión & Espacio Latente",
      fuenteIndice: "DocWeb AI Media Synthesis Catalog"
    },
    relations: [
      { type: "generalizes", target: "urn:term:generative-ai-media:diffusion-models", note: "Representa el estado del arte de las redes de desruidado en difusión" },
      { type: "enables", target: "urn:term:generative-ai-media:text-to-video-motion-vector", note: "Permite modelar coherencia temporal fluida mediante atención espacio-temporal" },
      { type: "differentiatesFrom", target: "urn:term:software-engineering-ontology:runtime-motor-ejecucion", note: "Infraestructura de red neuronal frente a motor de ejecución de software" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Arquitectura detrás de los modelos de video más avanzados capaces de comprender movimiento cinemático realista.",
      promptTokens: ["Diffusion Transformer DiT", "patch-based neural synthesis", "spatio-temporal transformer blocks", "scaling laws visual model"],
      negativeTokens: ["convolutive blur", "temporal flicker", "jello effect"],
      modelCompatibility: ["Flux.1", "OpenAI Sora", "Kling AI", "Runway Gen-3"]
    },
    metadata: {
      source: "docweb_genai_media_v1",
      sourceIndex: 8,
      originalTitle: "Transformador de Difusión (DiT)"
    }
  },
  {
    id: "urn:term:generative-ai-media:text-to-video-motion-vector",
    slug: "text-to-video-motion-vector",
    title: "Vectores de Movimiento e Inferencia Temporal T2V (Temporal Motion Vectors / Neural Video Dynamics)",
    category: "sintesis-temporal",
    categoryLabel: "Síntesis Temporal & Video Neuronal",
    definition: "Mecanismo computacional y representacional en modelos neuronales de generación de video (Text-to-Video / Image-to-Video) que modela el flujo óptico, trayectorias de cámara y cinemática de objetos a lo largo de la dimensión temporal, garantizando coherencia entre fotogramas consecutivos sin metamorfosis involuntarias.",
    shortDefinition: "Parámetros y capas de atención temporal que controlan la velocidad, dirección y física del movimiento en videos generados por IA.",
    extendedDefinition: "Integra módulos de atención temporal unidimensionales o tridimensionales que correlacionan características entre frames adyacentes. Permite condicionar el video mediante directivas cinemáticas como 'travelling in', 'paneo horizontal' o 'velocidad orbital'.",
    fullDefinition: "Subsistema que transforma la síntesis de fotogramas estáticos en un flujo audiovisual continuo. Previene el parpadeo (flickering), preserva las identidades de personajes y simula comportamientos dinámicos coherentes con las leyes de la física.",
    components: [
      "Capas de atención temporal (1D Temporal Attention Blocks a lo largo del eje T)",
      "Condicionamiento de velocidad de fotogramas (FPS conditioning / Motion Bucket ID)",
      "Inyección de trayectorias de cámara 6DoF (Camera Motion Controls: Pan, Tilt, Zoom, Roll)",
      "Módulos de interpolación temporal y flujo óptico latente"
    ],
    applications: [
      "Generación de tomas cinemáticas de ficción con movimientos de cámara complejos",
      "Animación de imágenes estáticas fijando vectores de desplazamiento específicos",
      "Extensión y bucle de videos de fondo para entornos virtuales"
    ],
    examples: [
      "Configurar un Camera Motion Pan Right a velocidad constante de 3.0 en Runway Gen-3 para revelar un paisaje montañoso al amanecer."
    ],
    synonyms: ["Motion vector T2V", "Dinámica de video neural", "Atención temporal", "Camera motion control"],
    attributes: {
      faseProduccion: "Generación Cinemática / Animación",
      categoriaCanon: "Síntesis Temporal & Video Neuronal",
      fuenteIndice: "DocWeb AI Media Synthesis Catalog"
    },
    relations: [
      { type: "implements", target: "urn:term:audiovisual-production:travelling", note: "Permite materializar un movimiento de travelling sobre rieles mediante vector de cámara virtual" },
      { type: "regulates", target: "urn:term:audiovisual-production:continuidad-cinematografica", note: "Evita mutaciones o teletransportaciones espaciales entre fotogramas" },
      { type: "requires", target: "urn:term:generative-ai-media:transformer-dit-diffusion-transformer", note: "Se beneficia de la atención espacio-temporal de arquitecturas DiT" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Instrucción primordial para dirigir movimiento de cámara profesional en modelos como Sora, Runway y Kling.",
      promptTokens: ["smooth directional motion vector", "fluid 24fps camera move", "coherent physical momentum", "temporal attention stability"],
      negativeTokens: ["morphing faces", "chaotic jitter", "jittery camera", "flickering background"],
      modelCompatibility: ["Runway Gen-3", "OpenAI Sora", "Kling AI", "Luma Dream Machine"]
    },
    metadata: {
      source: "docweb_genai_media_v1",
      sourceIndex: 9,
      originalTitle: "Vectores de Movimiento e Inferencia Temporal T2V"
    }
  },
  {
    id: "urn:term:generative-ai-media:multimodal-embeddings-clip",
    slug: "multimodal-embeddings-clip",
    title: "Incrustaciones Multimodales de Texto e Imagen (Multimodal CLIP Embeddings / Contrastive Language-Image Pretraining)",
    category: "atencion-multimodal",
    categoryLabel: "Atención Multimodal & Embeddings",
    definition: "Espacio vectorial matemático compartido y de alta dimensión (típicamente 768 o 1024 dimensiones) entrenado mediante aprendizaje contrastivo por OpenAI CLIP para proyectar tanto descripciones textuales como imágenes en puntos contiguos cuando representan el mismo concepto semántico.",
    shortDefinition: "Representación matemática compartida donde el texto y las imágenes se ubican en el mismo espacio geométrico según su significado.",
    extendedDefinition: "Es la brújula conceptual de los modelos generativos. Permite medir cuantitativamente la similitud semántica mediante la distancia coseno entre un vector de texto y un vector visual, habilitando búsquedas cross-modales y alineamiento de prompts.",
    fullDefinition: "Piedra angular de la visión artificial contemporánea. Al sincronizar las representaciones del lenguaje natural con el mundo visual, permite que un modelo generativo entienda que el token 'anamórfico' corresponde a un bokeh ovalado y reflejos horizontales azulados.",
    components: [
      "Codificador de texto (Text Transformer Encoder)",
      "Codificador de visión (Vision Transformer / ViT o ResNet)",
      "Espacio de proyección lineal normalizado en esfera unitaria",
      "Métrica de similitud del coseno (Cosine similarity loss function)"
    ],
    applications: [
      "Acondicionamiento semántico primario para generadores de imagen y video",
      "Clasificación Zero-Shot y búsqueda de imágenes por lenguaje natural",
      "Filtrado estético y evaluación de calidad de datos sintéticos (CLIP Score)"
    ],
    examples: [
      "El cálculo del CLIP Score para verificar que un fotograma generado coincide al 92% con la directiva 'plano contraplano en clave baja'."
    ],
    synonyms: ["CLIP", "CLIP embeddings", "Incrustaciones multimodales", "Contrastive Language-Image Pretraining"],
    attributes: {
      faseProduccion: "Inferencia / Evaluación",
      categoriaCanon: "Atención Multimodal & Embeddings",
      fuenteIndice: "DocWeb AI Media Synthesis Catalog"
    },
    relations: [
      { type: "feeds", target: "urn:term:generative-ai-media:cross-attention-mechanism", note: "Suministra los vectores clave y valor para la atención cruzada" },
      { type: "evaluates", target: "urn:term:audiovisual-production:narrativa-visual", note: "Permite auditar la fidelidad narrativa entre el guion técnico y la imagen generada" },
      { type: "relatesTo", target: "urn:term:software-engineering-ontology:graphrag-recuperacion-semantica", note: "Base vectorial complementaria a grafos estructurados en sistemas de búsqueda híbrida" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Espacio semántico que interpreta el vocabulario visual y estilístico en prompts multimodales.",
      promptTokens: ["multimodal CLIP embedding alignment", "contrastive vision-language representation", "high cosine similarity", "semantic fidelity"],
      negativeTokens: ["semantic mismatch", "unrelated visual concepts"],
      modelCompatibility: ["All Vision-Language Models"]
    },
    metadata: {
      source: "docweb_genai_media_v1",
      sourceIndex: 10,
      originalTitle: "Incrustaciones Multimodales CLIP"
    }
  }
];

// Rutas de guardado
const baseDir = path.join(__dirname, '..');
const softEngDir = path.join(baseDir, 'SoftwareEngineeringOntology', 'data');
const genAiDir = path.join(baseDir, 'GenerativeAIMedia', 'data');

if (!fs.existsSync(softEngDir)) fs.mkdirSync(softEngDir, { recursive: true });
if (!fs.existsSync(genAiDir)) fs.mkdirSync(genAiDir, { recursive: true });

fs.writeFileSync(path.join(softEngDir, 'glossary.json'), JSON.stringify(softEngGlossary, null, 2), 'utf8');
fs.writeFileSync(path.join(softEngDir, 'terms.json'), JSON.stringify({
  "$schema": "../../schema/terms.json",
  "glossaryId": "software-engineering-ontology",
  "canonicalTerms": softEngTerms
}, null, 2), 'utf8');

fs.writeFileSync(path.join(genAiDir, 'glossary.json'), JSON.stringify(genAiGlossary, null, 2), 'utf8');
fs.writeFileSync(path.join(genAiDir, 'terms.json'), JSON.stringify({
  "$schema": "../../schema/terms.json",
  "glossaryId": "generative-ai-media",
  "canonicalTerms": genAiTerms
}, null, 2), 'utf8');

// Actualizar catalog.json
const catalogPath = path.join(baseDir, 'app', 'data', 'catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

// Comprobar si ya existen
if (!catalog.canonicalGlossaries.find(g => g.id === softEngGlossary.id)) {
  catalog.canonicalGlossaries.push({
    id: softEngGlossary.id,
    slug: softEngGlossary.slug,
    title: softEngGlossary.title,
    description: softEngGlossary.description,
    dataPath: "./SoftwareEngineeringOntology/data/terms.json",
    metadataPath: "./SoftwareEngineeringOntology/data/glossary.json",
    domain: softEngGlossary.domain,
    termCount: softEngTerms.length,
    categories: softEngGlossary.categories
  });
}

if (!catalog.canonicalGlossaries.find(g => g.id === genAiGlossary.id)) {
  catalog.canonicalGlossaries.push({
    id: genAiGlossary.id,
    slug: genAiGlossary.slug,
    title: genAiGlossary.title,
    description: genAiGlossary.description,
    dataPath: "./GenerativeAIMedia/data/terms.json",
    metadataPath: "./GenerativeAIMedia/data/glossary.json",
    domain: genAiGlossary.domain,
    termCount: genAiTerms.length,
    categories: genAiGlossary.categories
  });
}

// Actualizar AudiovisualProduction termCount en catalog
const av = catalog.canonicalGlossaries.find(g => g.id === 'audiovisual-production');
if (av) {
  av.termCount = 212;
}

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');

console.log('Nuevos glosarios creados e integrados en catalog.json exitosamente.');
console.log(`SoftwareEngineeringOntology: ${softEngTerms.length} términos.`);
console.log(`GenerativeAIMedia: ${genAiTerms.length} términos.`);
