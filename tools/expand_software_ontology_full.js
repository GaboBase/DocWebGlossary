const fs = require('fs');
const path = require('path');

const softEngDir = path.join(__dirname, '..', 'SoftwareEngineeringOntology', 'data');
const termsFile = path.join(softEngDir, 'terms.json');
const glossaryFile = path.join(softEngDir, 'glossary.json');
const catalogFile = path.join(__dirname, '..', 'app', 'data', 'catalog.json');

const termsData = JSON.parse(fs.readFileSync(termsFile, 'utf8'));
const glossaryData = JSON.parse(fs.readFileSync(glossaryFile, 'utf8'));
const catalogData = JSON.parse(fs.readFileSync(catalogFile, 'utf8'));

const additionalTerms = [
  {
    id: "urn:term:software-engineering-ontology:arista-semantica-tipada",
    slug: "arista-semantica-tipada",
    title: "Arista Semántica Tipada (Typed Semantic Edge / Relational Ontology)",
    category: "relaciones-semanticas",
    categoryLabel: "Ontología de Relaciones Semánticas",
    definition: "Vínculo direccional formal entre dos nodos conceptuales que no denota mera cercanía asociativa, sino un predicado tipado riguroso con semántica, dirección, relación inversa explícita, ámbito de validez, condiciones y estado epistemológico verificable.",
    shortDefinition: "Conector formal tipado que expresa la naturaleza exacta de la dependencia o jerarquía entre dos conceptos ontológicos.",
    extendedDefinition: "Fórmula central de la Sección V del modelo ontológico: distingue taxones (subclass_of), mereología (component_of, member_of), dependencias funcionales (depends_on, requires), realizaciones (implements), causalidades (causes, enables) y orden temporal (precedes).",
    fullDefinition: "Elemento estructural de primer orden en grafos de conocimiento. Impide la ambigüedad de grafos no tipados, habilitando inferencia determinista y derivación de caminos causales sin alucinación.",
    components: [
      "Nodo origen (Subject / Domain node)",
      "Predicado tipado formal (Predicate / Relation type)",
      "Nodo destino (Object / Range node)",
      "Inversa declarada y verificada (Inverse relation)",
      "Evidencia y estado epistemológico (Observed / Inferred / Hypothesized)"
    ],
    applications: [
      "Modelado ontológico formal en DocWeb Multiglossary",
      "Razonamiento automatizado en motores GraphRAG",
      "Auditoría de linaje de datos y trazabilidad de software"
    ],
    examples: [
      "La arista 'Microservicio --implements--> Bounded Context' que define con precisión arquitectónica la realización del dominio."
    ],
    synonyms: ["Typed edge", "Arista tipada", "Predicado ontológico", "Tripleta semántica"],
    attributes: {
      faseProduccion: "Modelado / Gobernanza",
      categoriaCanon: "Ontología de Relaciones Semánticas",
      fuenteIndice: "Ontología Integral de Software v1.0 - Sección V"
    },
    relations: [
      { type: "isPartOf", target: "urn:term:software-engineering-ontology:graphrag-recuperacion-semantica", note: "Las aristas tipadas forman la red de navegación relacional en GraphRAG" },
      { type: "governs", target: "urn:term:software-engineering-ontology:jerarquia-seis-niveles", note: "Define los enlaces verticales y laterales dentro de los 6 niveles" },
      { type: "requires", target: "urn:term:software-engineering-ontology:artefacto-software", note: "Conecta formalmente artefactos computacionales y conceptos" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Concepto esencial para evitar relaciones espurias o ambiguas en grafos de agentes.",
      promptTokens: ["typed semantic edge", "formal knowledge graph predicate", "inverse relation contract", "bidirectional ontological link"],
      negativeTokens: ["untyped edge", "vague association", "spurious link"],
      modelCompatibility: ["All Reasoning & Graph Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 16,
      originalTitle: "Arista Semántica Tipada"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:semantica-axiomatica",
    slug: "semantica-axiomatica",
    title: "Semántica Axiomática y Lógica de Hoare (Axiomatic Semantics / Hoare Triples)",
    category: "semantica-compilacion",
    categoryLabel: "Semántica & Compilación",
    definition: "Enfoque formal de semántica de lenguajes de programación iniciado por C. A. R. Hoare que define el significado de un comando mediante aserciones lógicas que describen el estado del sistema antes y después de su ejecución: {P} C {Q}, donde P es la precondición, C el comando y Q la postcondición.",
    shortDefinition: "Método matemático formal que demuestra la corrección de un programa basándose en precondiciones, invariantes y postcondiciones.",
    extendedDefinition: "Sección VI del modelo ontológico: permite verificar la corrección parcial y total sin necesidad de simular cada paso de ejecución física, constituyendo la base de los contratos de software (Design by Contract).",
    fullDefinition: "Paradigma lógico de verificación estricta. Utilizado en sistemas críticos donde la prueba empírica por muestreo es insuficiente para certificar ausencia de errores catastróficos.",
    components: [
      "Precondición formal {P} (Estado válido antes de la ejecución)",
      "Sentencia o comando ejecutable C",
      "Postcondición formal {Q} (Garantía observable tras la ejecución)",
      "Invariante de bucle o de clase (Propiedad que se preserva constante)"
    ],
    applications: [
      "Diseño por contrato en lenguajes como Eiffel, Ada o TypeScript estricto",
      "Verificación formal de contratos inteligentes y núcleos de sistemas operativos",
      "Generación de aserciones de prueba automáticas por agentes de código"
    ],
    examples: [
      "La verificación formal de que el saldo de una cuenta bancaria nunca sea negativo tras una operación de débito autorizada."
    ],
    synonyms: ["Axiomatic semantics", "Lógica de Hoare", "Tripletas de Hoare", "Verificación axiomática"],
    attributes: {
      faseProduccion: "Verificación Formal / Compilación",
      categoriaCanon: "Semántica & Compilación",
      fuenteIndice: "Ontología Integral de Software v1.0 - Sección VI"
    },
    relations: [
      { type: "relatesTo", target: "urn:term:software-engineering-ontology:ast-abstract-syntax-tree", note: "Opera sobre las construcciones sintácticas del AST" },
      { type: "ensures", target: "urn:term:software-engineering-ontology:transaccion-acid", note: "Formaliza la preservación de consistencia e invariantes transaccionales" },
      { type: "requires", target: "urn:term:software-engineering-ontology:runtime-motor-ejecucion", note: "Verifica que el comportamiento observable en ejecución respete los axiomas" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Fundamento para generar código con precondiciones, postcondiciones e invariantes robustas.",
      promptTokens: ["Hoare triple logic", "axiomatic semantics contract", "precondition postcondition invariant", "formal verification proof"],
      negativeTokens: ["untested side effects", "hidden state mutation"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 17,
      originalTitle: "Semántica Axiomática"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:semantica-denotacional",
    slug: "semantica-denotacional",
    title: "Semántica Denotacional (Denotational Semantics / Scott-Strachey Approach)",
    category: "semantica-compilacion",
    categoryLabel: "Semántica & Compilación",
    definition: "Enfoque matemático formal formulado por Dana Scott y Christopher Strachey que asigna a cada frase de un lenguaje de programación un objeto matemático (su denotación), típicamente una función entre dominios semánticos, basada en el principio de composicionalidad.",
    shortDefinition: "Formalismo que traduce programas a funciones matemáticas en dominios abstractos para razonar sobre su equivalencia y propiedades.",
    extendedDefinition: "A diferencia de la semántica operacional (que describe cómo se ejecuta un programa paso a paso), la semántica denotacional se enfoca en qué función matemática abstracta calcula el programa independientemente de la máquina física.",
    fullDefinition: "Herramienta teórica de referencia para el diseño de lenguajes funcionales, optimizadores de compiladores y demostración de equivalencia observacional entre programas refactorizados.",
    components: [
      "Sintaxis abstracta de entrada (Expresiones del lenguaje)",
      "Dominios semánticos (Conjuntos matemáticos estructurados y CPOs)",
      "Funciones de valuación semántica composicionales ($\\mathcal{E}[\![e]\!]\\rho$)",
      "Teoría de puntos fijos para la semántica de la recursión (Teorema de Kleene)"
    ],
    applications: [
      "Diseño y especificación formal de nuevos lenguajes de programación",
      "Demostración de corrección de compiladores y transformaciones de optimización",
      "Razonamiento abstracto sobre tipos en cálculo lambda"
    ],
    examples: [
      "Mapear una función factorial recursiva a su menor punto fijo funcional en el dominio de números enteros extendidos."
    ],
    synonyms: ["Denotational semantics", "Semántica de Scott-Strachey", "Función de significado"],
    attributes: {
      faseProduccion: "Teoría de Lenguajes / Compilación",
      categoriaCanon: "Semántica & Compilación",
      fuenteIndice: "Ontología Integral de Software v1.0 - Sección VI"
    },
    relations: [
      { type: "complements", target: "urn:term:software-engineering-ontology:semantica-axiomatica", note: "Aporta la interpretación matemática composicional complementaria a los axiomas de Hoare" },
      { type: "appliesTo", target: "urn:term:software-engineering-ontology:ast-abstract-syntax-tree", note: "Asigna denotaciones formales a cada nodo del árbol sintáctico" },
      { type: "influences", target: "urn:term:software-engineering-ontology:runtime-motor-ejecucion", note: "Guía el diseño formal de intérpretes abstractos" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Marco matemático para demostrar equivalencia composicional entre implementaciones.",
      promptTokens: ["denotational semantics valuation", "Scott domains fixed point", "compositional program meaning", "mathematical function equivalence"],
      negativeTokens: ["ad-hoc runtime behavior", "unspecified edge case"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 18,
      originalTitle: "Semántica Denotacional"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:arquitectura-hexagonal-puertos-adaptadores",
    slug: "arquitectura-hexagonal-puertos-adaptadores",
    title: "Arquitectura Hexagonal (Ports and Adapters Pattern / Alistair Cockburn)",
    category: "arquitectura-diseno",
    categoryLabel: "Arquitectura & Diseño Estructural",
    definition: "Patrón arquitectónico creado por Alistair Cockburn que aísla la lógica central de negocio de la aplicación dentro de un núcleo protegido, interactuando con el exterior exclusivamente a través de Puertos (interfaces abstractas) y Adaptadores (implementaciones tecnológicas concretas para HTTP, bases de datos o mensajería).",
    shortDefinition: "Diseño que desacopla el núcleo de dominio de la infraestructura externa mediante puertos e interfaces intercambiables.",
    extendedDefinition: "Sección VII del modelo ontológico: permite que una aplicación sea ejecutada indistintamente por usuarios humanos, pruebas automatizadas o scripts por lotes, y que su almacenamiento sea cambiado sin tocar una sola línea de código de dominio.",
    fullDefinition: "Variante fundamental de la Arquitectura Limpia (Clean Architecture / Onion Architecture). Invierte las dependencias para que la infraestructura dependa del dominio y nunca al revés, minimizando la inestabilidad de Martin del núcleo.",
    components: [
      "Núcleo de Dominio (Domain entities, use cases, business rules)",
      "Puertos Primarios / Entrada (Inbound Ports: APIs de casos de uso)",
      "Puertos Secundarios / Salida (Outbound Ports: contratos de persistencia y servicios externos)",
      "Adaptadores Primarios (CLI, Controllers REST, UI)",
      "Adaptadores Secundarios (Repositorios SQL/NoSQL, clientes gRPC, pasarelas de pago)"
    ],
    applications: [
      "Construcción de aplicaciones empresariales altamente testeables sin base de datos real",
      "Sistemas de agentes desacoplados con múltiples proveedores de inferencia (MCP)",
      "Microservicios con ciclo de vida tecnológico evolutivo"
    ],
    examples: [
      "En DocWeb, la lógica semántica opera como núcleo puro; IndexedDB y el paquete bundle.js son adaptadores de persistencia intercambiables."
    ],
    synonyms: ["Hexagonal architecture", "Puertos y adaptadores", "Ports and Adapters", "Clean Architecture Core"],
    attributes: {
      faseProduccion: "Arquitectura / Diseño",
      categoriaCanon: "Arquitectura & Diseño Estructural",
      fuenteIndice: "Ontología Integral de Software v1.0 - Sección VII"
    },
    relations: [
      { type: "implements", target: "urn:term:software-engineering-ontology:ddd-domain-driven-design", note: "Protege el modelo de dominio DDD frente a la contaminación técnica" },
      { type: "regulates", target: "urn:term:software-engineering-ontology:inestabilidad-martin", note: "Garantiza que el núcleo tenga acoplamiento eferente cero (Ce = 0, I = 0)" },
      { type: "appliesTo", target: "urn:term:software-engineering-ontology:aplicacion", note: "Estructura interna modular para aplicaciones sostenibles" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Estándar arquitectónico para separar infraestructura de reglas de negocio puras.",
      promptTokens: ["ports and adapters architecture", "hexagonal core domain", "inbound outbound ports", "infrastructure adapter decoupling"],
      negativeTokens: ["database-driven architecture", "tight coupling to framework"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 19,
      originalTitle: "Arquitectura Hexagonal"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:bounded-context-ddd",
    slug: "bounded-context-ddd",
    title: "Contexto Delimitado en DDD (Bounded Context / Explicit Semantic Boundary)",
    category: "arquitectura-diseno",
    categoryLabel: "Arquitectura & Diseño Estructural",
    definition: "Límite explícito dentro del cual un modelo de dominio particular es aplicable y un Lenguaje Ubicuo tiene un significado unívoco e indiscutible. En diferentes contextos delimitados, el mismo término puede representar conceptos distintos con modelos de datos e invariantes independientes.",
    shortDefinition: "Frontera conceptual que delimita el alcance exacto donde un modelo y su vocabulario son estrictamente válidos.",
    extendedDefinition: "Sección VII del modelo ontológico: evita la trampa del 'modelo unificado corporativo monolítico', permitiendo que cada contexto modele la realidad según sus necesidades operativas específicas (p.ej., 'Plano' en rodaje vs. 'Plano' en edición).",
    fullDefinition: "Patrón estratégico supremo de Domain-Driven Design. Proporciona la base conceptual para la definición de equipos independientes, microservicios autónomos y mapas de contexto (Context Maps).",
    components: [
      "Frontera semántica explícita (Semantic boundary)",
      "Lenguaje Ubicuo contextual (Local Ubiquitous Language)",
      "Modelo de dominio aislado (Isolated domain model)",
      "Mapa de relaciones intercontextuales (Partnership, Shared Kernel, Customer/Supplier, Anti-Corruption Layer)"
    ],
    applications: [
      "Diseño y descomposición de sistemas monolíticos en microservicios",
      "Alineamiento organizacional según la Ley de Conway",
      "Definición de glosarios especializados independientes en DocWeb Multiglossary"
    ],
    examples: [
      "El glosario 'Producción Audiovisual' y el glosario 'Render 3D' definen 'Cámara' con atributos distintos sin conflicto porque pertenecen a Bounded Contexts separados."
    ],
    synonyms: ["Bounded Context", "Contexto delimitado", "Frontera semántica de dominio", "Context boundary"],
    attributes: {
      faseProduccion: "Modelado / Estrategia",
      categoriaCanon: "Arquitectura & Diseño Estructural",
      fuenteIndice: "Ontología Integral de Software v1.0 - Sección VII"
    },
    relations: [
      { type: "isPartOf", target: "urn:term:software-engineering-ontology:ddd-domain-driven-design", note: "Patrón estratégico central de DDD" },
      { type: "guides", target: "urn:term:software-engineering-ontology:microservicio", note: "Establece el tamaño y alcance idóneo para un microservicio" },
      { type: "relatesTo", target: "urn:term:software-engineering-ontology:jerarquia-seis-niveles", note: "Permite organizar ontologías multinivel sin colisiones de nombres" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Criterio estratégico primordial para delimitar microservicios y evitar modelos monolíticos inflados.",
      promptTokens: ["DDD bounded context boundary", "ubiquitous language scope", "isolated domain model", "context mapping translation"],
      negativeTokens: ["universal enterprise data model", "leaky abstractions between modules"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 20,
      originalTitle: "Contexto Delimitado (Bounded Context)"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:teorema-cap",
    slug: "teorema-cap",
    title: "Teorema CAP de Brewer (Brewer's CAP Theorem / Consistency, Availability, Partition Tolerance)",
    category: "sistemas-distribuidos",
    categoryLabel: "Sistemas Distribuidos & Persistencia",
    definition: "Principio formal demostrado por Eric Brewer y formalizado por Seth Gilbert y Nancy Lynch que afirma que es imposible que un almacén de datos distribuido proporcione simultáneamente más de dos de las siguientes tres garantías ante la presencia de particiones de red: Consistencia fuerte (C), Disponibilidad (A) y Tolerancia a particiones (P).",
    shortDefinition: "Teorema que demuestra que un sistema distribuido solo puede garantizar dos de tres propiedades: Consistencia, Disponibilidad o Tolerancia a particiones.",
    extendedDefinition: "Sección X del modelo ontológico: dado que en redes reales las particiones (P) son inevitables debido a cortes de fibra, fallos de routers o latencias extremas, todo sistema distribuido debe elegir formalmente entre Consistencia (sistemas CP: rechazan operaciones si no hay quórum) o Disponibilidad (sistemas AP: aceptan escrituras con consistencia eventual).",
    fullDefinition: "Ley fundamental de la ingeniería de sistemas distribuidos. Condiciona la arquitectura de bases de datos como Cassandra, CockroachDB, Spanner y DynamoDB.",
    components: [
      "Consistencia Fuerte / Linealizabilidad (Consistency: cada lectura recibe la escritura más reciente)",
      "Disponibilidad (Availability: cada nodo sin fallo devuelve respuesta válida sin error)",
      "Tolerancia a Particiones (Partition Tolerance: el sistema opera ante pérdidas de mensajes de red)",
      "Compensación PACELC (Si hay partición elige A o C; si no hay partición elige Latencia o Consistencia)"
    ],
    applications: [
      "Elección fundamentada de motores de bases de datos en la nube",
      "Diseño de algoritmos de consenso distribuido (Raft, Paxos)",
      "Arquitecturas de sincronización offline-first con resolución de conflictos (CRDTs)"
    ],
    examples: [
      "DocWeb opera en modo local offline tolerando partición total de internet priorizando disponibilidad inmediata mediante almacenamiento en el cliente."
    ],
    synonyms: ["CAP Theorem", "Teorema de Brewer", "Trilema CAP", "Principio de consistencia distribuida"],
    attributes: {
      faseProduccion: "Arquitectura Distribuida / Persistencia",
      categoriaCanon: "Sistemas Distribuidos & Persistencia",
      fuenteIndice: "Ontología Integral de Software v1.0 - Sección X"
    },
    relations: [
      { type: "differentiatesFrom", target: "urn:term:software-engineering-ontology:transaccion-acid", note: "Contrasta las garantías ACID locales con los tradeoffs de red distribuidos" },
      { type: "causes", target: "urn:term:software-engineering-ontology:consistencia-eventual-base", note: "La elección de AP obliga a adoptar modelos de consistencia eventual" },
      { type: "appliesTo", target: "urn:term:software-engineering-ontology:microservicio", note: "Gobierna la comunicación de datos entre servicios distribuidos en red" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Marco teórico obligatorio para justificar decisiones de consistencia y tolerancia a fallos en sistemas distribuidos.",
      promptTokens: ["CAP theorem trade-offs", "network partition tolerance", "linearizable consistency CP vs available AP", "distributed system boundary"],
      negativeTokens: ["simultaneous CAP perfection", "ignoring network failures"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 21,
      originalTitle: "Teorema CAP de Brewer"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:consistencia-eventual-base",
    slug: "consistencia-eventual-base",
    title: "Consistencia Eventual y Modelo BASE (Eventual Consistency / BASE Semantics)",
    category: "sistemas-distribuidos",
    categoryLabel: "Sistemas Distribuidos & Persistencia",
    definition: "Modelo de consistencia débil en sistemas distribuidos que garantiza que, si no se realizan nuevas actualizaciones sobre un elemento de datos, eventualmente todas las réplicas convergerán hacia el mismo valor. Es la base del acrónimo BASE (Basically Available, Soft state, Eventual consistency), contrapuesto al modelo estricto ACID.",
    shortDefinition: "Garantía distribuida donde las réplicas convergen al mismo estado tras un intervalo de tiempo sin exigir bloqueo inmediato sincrónico.",
    extendedDefinition: "Sección X del modelo ontológico: maximiza el rendimiento y la disponibilidad desacoplando las escrituras de la sincronización en tiempo real. Utiliza estampas de tiempo, relojes vectoriales o tipos de datos replicados sin conflicto (CRDTs).",
    fullDefinition: "Paradigma dominante en arquitecturas web a escala masiva. Admite lecturas transitoriamente obsoletas a cambio de latencias ultrabajas y resiliencia total ante desconexiones.",
    components: [
      "Basically Available (Disponibilidad básica ante particiones)",
      "Soft State (El estado puede mutar sin interacción externa por convergencia de réplicas)",
      "Eventual Consistency (Convergencia asintótica garantizada)",
      "Mecanismos de resolución de conflictos (Last-Write-Wins, CRDTs, Vector Clocks)"
    ],
    applications: [
      "Sistemas de feeds sociales, carritos de compras y caches distribuidos",
      "Bases de datos NoSQL distribuidas (Dynamo, Cassandra, Riak)",
      "Colaboración en tiempo real en editores locales desconectados"
    ],
    examples: [
      "La sincronización de réplicas de cápsulas en DocWeb que convergen tras comparar hashes SHA-256 de las revisiones."
    ],
    synonyms: ["Eventual consistency", "Modelo BASE", "Consistencia asintótica", "Convergencia eventual"],
    attributes: {
      faseProduccion: "Persistencia Distribuida",
      categoriaCanon: "Sistemas Distribuidos & Persistencia",
      fuenteIndice: "Ontología Integral de Software v1.0 - Sección X"
    },
    relations: [
      { type: "differentiatesFrom", target: "urn:term:software-engineering-ontology:transaccion-acid", note: "Opuesto al modelo ACID de consistencia estricta inmediata" },
      { type: "enabledBy", target: "urn:term:software-engineering-ontology:teorema-cap", note: "Surge como elección deliberada en sistemas de alta disponibilidad (AP)" },
      { type: "usedBy", target: "urn:term:software-engineering-ontology:patron-saga-distribuido", note: "Marco temporal sobre el cual se ejecutan los pasos de una saga" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Concepto clave para arquitecturas distribuidas de alta escala y tolerancia a latencia.",
      promptTokens: ["eventual consistency BASE", "replicated state convergence", "vector clock conflict resolution", "asynchronous replica propagation"],
      negativeTokens: ["blocking distributed lock", "immediate two-phase commit requirement"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 22,
      originalTitle: "Consistencia Eventual (BASE)"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:patron-saga-distribuido",
    slug: "patron-saga-distribuido",
    title: "Patrón Saga Distribuido (Saga Pattern / Compensating Transactions)",
    category: "sistemas-distribuidos",
    categoryLabel: "Sistemas Distribuidos & Persistencia",
    definition: "Patrón de diseño arquitectónico para gestionar transacciones que abarcan múltiples microservicios independientes sin utilizar bloqueos distribuidos de dos fases (2PC). Se estructura como una secuencia de transacciones locales coordinadas; si una transacción falla, la saga ejecuta transacciones de compensación que deshacen los cambios previamente confirmados.",
    shortDefinition: "Secuencia coordinada de transacciones locales con acciones compensatorias para garantizar consistencia entre múltiples microservicios.",
    extendedDefinition: "Sección X del modelo ontológico: puede orquestarse mediante coreografía (eventos emitidos y consumidos reactivamente entre servicios) o mediante orquestación centralizada (un coordinador de saga explícito que despacha comandos y supervisa el estado).",
    fullDefinition: "Solución práctica al problema de la consistencia transaccional en arquitecturas orientadas a servicios. Evita el bloqueo de recursos y garantiza aislamiento temporal mediante compensaciones.",
    components: [
      "Transacciones locales ejecutadas en cada servicio individual",
      "Transacciones compensatorias reversibles (Compensating actions)",
      "Coordinador de saga (Saga Orchestrator) o bus de eventos coreografiados",
      "Mecanismo de idempotencia estricta en cada endpoint de compensación"
    ],
    applications: [
      "Flujos de compra y reserva con múltiples proveedores (vuelo + hotel + pago)",
      "Procesos de cobro y despacho en comercio electrónico",
      "Pipelines de aprovisionamiento de recursos en infraestructura cloud"
    ],
    examples: [
      "Si el cobro con tarjeta falla tras haber reservado stock en el almacén, la saga invoca la transacción compensatoria 'cancelarReservaStock'."
    ],
    synonyms: ["Saga pattern", "Patrón Saga", "Transacciones compensatorias", "Coordinación de saga"],
    attributes: {
      faseProduccion: "Orquestación / Integración",
      categoriaCanon: "Sistemas Distribuidos & Persistencia",
      fuenteIndice: "Ontología Integral de Software v1.0 - Sección X"
    },
    relations: [
      { type: "implements", target: "urn:term:software-engineering-ontology:consistencia-eventual-base", note: "Materializa la consistencia eventual a través de múltiples almacenes" },
      { type: "coordinates", target: "urn:term:software-engineering-ontology:microservicio", note: "Orquesta flujos de negocio entre servicios autónomos" },
      { type: "differentiatesFrom", target: "urn:term:software-engineering-ontology:transaccion-acid", note: "Sustituye transacciones ACID distribuidas por transacciones locales secuenciales" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Patrón mandatorio para consistencia transaccional en microservicios sin bloqueos de red.",
      promptTokens: ["distributed saga pattern", "compensating transaction workflow", "saga orchestration choreography", "idempotent rollback execution"],
      negativeTokens: ["two-phase commit deadlock", "unhandled partial failure"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 23,
      originalTitle: "Patrón Saga Distribuido"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:write-ahead-logging-wal",
    slug: "write-ahead-logging-wal",
    title: "Registro Previo en Disco (Write-Ahead Logging / WAL)",
    category: "sistemas-distribuidos",
    categoryLabel: "Sistemas Distribuidos & Persistencia",
    definition: "Técnica de ingeniería de bases de datos y sistemas de archivos en la que todas las modificaciones de datos se registran primero de manera secuencial y duradera en un registro de transacciones (log) en disco antes de que los cambios se apliquen a las estructuras de datos principales en memoria o almacenamiento.",
    shortDefinition: "Mecanismo que escribe los cambios en un archivo de log secuencial antes de mutar la base de datos, garantizando durabilidad y recuperación ante caídas.",
    extendedDefinition: "Sección X del modelo ontológico: garantiza la propiedad de Durabilidad de ACID y la recuperación ante fallos de energía (Crash Recovery). Si el sistema se apaga intempestivamente, al reiniciar repite las operaciones confirmadas (REDO) y deshace las transacciones incompletas (UNDO).",
    fullDefinition: "Infraestructura crítica en motores como PostgreSQL, SQLite, RocksDB y motores de consenso como Raft. Maximiza el rendimiento transformando escrituras aleatorias lentas en escrituras secuenciales continuas de alto rendimiento.",
    components: [
      "Archivo de registro sólo-añadir (Append-only log file)",
      "Punto de control periódico (Checkpointing mechanism)",
      "Algoritmo ARIES de recuperación (Analysis, REDO, UNDO phases)",
      "Llamada a sincronización en disco físico (fsync / flushes)"
    ],
    applications: [
      "Durabilidad en bases de datos relacionales y NoSQL",
      "Consistencia en sistemas de archivos transaccionales (ext4, NTFS, ZFS)",
      "Registro de estado inmutable en motores de consenso distribuido"
    ],
    examples: [
      "SQLite ejecutándose en modo WAL para permitir lecturas concurrentes simultáneas sin bloquear a los escritores."
    ],
    synonyms: ["WAL", "Write-Ahead Logging", "Registro de transacciones previo", "Log de rehacer y deshacer"],
    attributes: {
      faseProduccion: "Persistencia / Motor de Almacenamiento",
      categoriaCanon: "Sistemas Distribuidos & Persistencia",
      fuenteIndice: "Ontología Integral de Software v1.0 - Sección X"
    },
    relations: [
      { type: "ensures", target: "urn:term:software-engineering-ontology:transaccion-acid", note: "Garantiza matemáticamente la propiedad de Durabilidad (D) en ACID" },
      { type: "usedBy", target: "urn:term:software-engineering-ontology:runtime-motor-ejecucion", note: "Utilizado por motores de ejecución y persistencia para crash-recovery" },
      { type: "supports", target: "urn:term:software-engineering-ontology:consistencia-eventual-base", note: "Sirve de base para réplica basada en logs (Change Data Capture)" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Mecanismo definitivo para durabilidad y prevención de corrupción de datos.",
      promptTokens: ["write ahead logging WAL", "append only transaction journal", "crash recovery redo undo", "durable fsync commit"],
      negativeTokens: ["unbuffered dirty write", "silent corruption on crash"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 24,
      originalTitle: "Write-Ahead Logging (WAL)"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:principio-minimo-privilegio",
    slug: "principio-minimo-privilegio",
    title: "Principio de Mínimo Privilegio (Principle of Least Privilege / PoLP)",
    category: "seguridad-calidad",
    categoryLabel: "Seguridad & Calidad de Software",
    definition: "Principio de seguridad de la información formulado por Saltzer y Schroeder que estipula que cada módulo, usuario, proceso o agente debe tener acceso únicamente a los recursos y permisos estrictamente indispensables para cumplir con su función legítima autorizada, y nada más.",
    shortDefinition: "Regla de seguridad que concede a cada entidad exclusivamente los permisos mínimos necesarios para realizar su tarea autorizada.",
    extendedDefinition: "Sección XI del modelo ontológico: minimiza el radio de impacto (Blast Radius) ante fallos, vulnerabilidades o compromisos de seguridad. Exige que los tokens, credenciales y sandboxes tengan alcance acotado y caducidad temporal estricta.",
    fullDefinition: "Pilar de la arquitectura Zero Trust y la seguridad moderna de agentes. Prohíbe terminantemente la ejecución por defecto con privilegios de administrador o superusuario.",
    components: [
      "Control de acceso basado en roles y atributos (RBAC / ABAC)",
      "Tokens de autorización de alcance mínimo (Scoped OAuth / JWT tokens)",
      "Aislamiento de procesos y sandboxing de recursos (chroot, cgroups, WebAssembly sandbox)",
      "Auditoría continua de permisos y revocación automática"
    ],
    applications: [
      "Configuración de permisos en herramientas y subagentes de IA (MCP tools)",
      "Políticas de seguridad en contenedores Docker y pods de Kubernetes",
      "Gobernanza de accesos a bases de datos y APIs de producción"
    ],
    examples: [
      "Un subagente de documentación que sólo recibe herramientas de lectura de disco (read_file) sin permisos de escritura ni ejecución de comandos."
    ],
    synonyms: ["Least privilege", "PoLP", "Mínimo privilegio", "Principio de acceso mínimo"],
    attributes: {
      faseProduccion: "Seguridad / Gobernanza",
      categoriaCanon: "Seguridad & Calidad de Software",
      fuenteIndice: "Ontología Integral de Software v1.0 - Sección XI"
    },
    relations: [
      { type: "implements", target: "urn:term:software-engineering-ontology:defensa-en-profundidad", note: "Componente cardinal de una estrategia de seguridad multicapa" },
      { type: "regulates", target: "urn:term:software-engineering-ontology:plugin", note: "Impone límites estrictos de sandbox y acceso a los complementos" },
      { type: "governs", target: "urn:term:software-engineering-ontology:agente-autonomo-deliberativo", note: "Acota la autoridad operativa del agente para evitar acciones destructivas" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Directriz obligatoria para acotar el radio de impacto de herramientas y scripts.",
      promptTokens: ["principle of least privilege", "strict RBAC scoping", "sandboxed minimal authority", "zero trust permission boundary"],
      negativeTokens: ["root access everywhere", "wildcard permissions *:*"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 25,
      originalTitle: "Principio de Mínimo Privilegio"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:defensa-en-profundidad",
    slug: "defensa-en-profundidad",
    title: "Defensa en Profundidad (Defense in Depth / Layered Security)",
    category: "seguridad-calidad",
    categoryLabel: "Seguridad & Calidad de Software",
    definition: "Estrategia de ciberseguridad que implementa múltiples capas defensivas superpuestas y redundantes a lo largo de todo el sistema informático, de tal manera que si un mecanismo de seguridad falla o es vulnerado, las capas subsiguientes continúan conteniendo y neutralizando la amenaza.",
    shortDefinition: "Estrategia que dispone múltiples barreras de seguridad independientes para evitar que un único fallo exponga todo el sistema.",
    extendedDefinition: "Sección XI del modelo ontológico: no confía ciegamente en un único firewall o control de entrada. Combina validación de esquemas, autenticación multifactor, cifrado en reposo y en tránsito, sandboxing, linters estáticos y telemetría de comportamiento.",
    fullDefinition: "Enfoque holístico de resiliencia de software. Asegura que la protección no dependa de un único punto de fallo (Single Point of Failure), elevando exponencialmente el coste de vulneración para un adversario.",
    components: [
      "Seguridad perimetral y gateways de API (WAF, Rate limiting)",
      "Autenticación robusta y autorización granular (MFA, RBAC)",
      "Validación rigurosa de entradas y esquemas tipados (Input sanitization)",
      "Cifrado de datos en tránsito (TLS 1.3) y en reposo (AES-256)",
      "Monitoreo de anomalías y auditoría forense inmutable"
    ],
    applications: [
      "Protección de infraestructuras críticas y plataformas financieras",
      "Arquitecturas de ejecución de código arbitrario y agentes en la nube",
      "Desarrollo seguro de aplicaciones web conforme a OWASP Top 10"
    ],
    examples: [
      "Combinar validación de esquema JSON-Schema en el cliente, sanitización estricta en el servidor y consultas parametrizadas en la base de datos contra inyección SQL."
    ],
    synonyms: ["Defense in depth", "Seguridad en capas", "Defensa profunda", "Layered defense"],
    attributes: {
      faseProduccion: "Seguridad / Arquitectura",
      categoriaCanon: "Seguridad & Calidad de Software",
      fuenteIndice: "Ontología Integral de Software v1.0 - Sección XI"
    },
    relations: [
      { type: "generalizes", target: "urn:term:software-engineering-ontology:principio-minimo-privilegio", note: "El mínimo privilegio es una de las capas esenciales de la defensa profunda" },
      { type: "protects", target: "urn:term:software-engineering-ontology:aplicacion", note: "Blinda la aplicación completa frente a ataques multivectoriales" },
      { type: "appliesTo", target: "urn:term:software-engineering-ontology:runtime-motor-ejecucion", note: "Aísla el motor de ejecución en sandboxes protegidos" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Estrategia fundamental para diseño de sistemas resilientes sin puntos únicos de fallo.",
      promptTokens: ["defense in depth architecture", "layered security barriers", "redundant defense controls", "zero single point of failure"],
      negativeTokens: ["single perimeter reliance", "unauthenticated internal network"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 26,
      originalTitle: "Defensa en Profundidad"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:agente-autonomo-deliberativo",
    slug: "agente-autonomo-deliberativo",
    title: "Agente Autónomo Deliberativo y Reactivo (Autonomous Agent Architecture / BDI Model)",
    category: "agentes-conocimiento",
    categoryLabel: "Agentes & Conocimiento Procedimental",
    definition: "Entidad computacional de software que percibe su entorno a través de sensores o herramientas, mantiene un estado interno y selecciona dinámicamente secuencias de acciones para alcanzar metas u objetivos declarados, equilibrando deliberación reflexiva (planificación hacia adelante) y reactividad inmediata ante eventos o fallos del entorno.",
    shortDefinition: "Sistema de software que percibe el entorno, planifica y ejecuta acciones autónomamente mediante herramientas para lograr objetivos específicos.",
    extendedDefinition: "Sección XIII del modelo ontológico: un agente no se reduce a un simple modelo de lenguaje (LLM), sino que comprende un bucle de control (Reason-Act loop), memoria episódica/semántica, capacidad de orquestación, políticas de gobernanza y herramientas invocables (MCP).",
    fullDefinition: "Paradigma contemporáneo de inteligencia artificial en ingeniería de software. Su grado de autonomía está estrictamente acotado por los permisos efectivos asignados y requiere verificación empírica de sus resultados antes del cierre de tareas.",
    components: [
      "Bucle de percepción, razonamiento y acción (Perceive-Deliberate-Act cycle)",
      "Motor de planificación y descomposición de tareas (Task planner & DAG)",
      "Memoria de trabajo, episódica y contextual (Working memory & Context window)",
      "Conjunto de herramientas invocables con contrato (Tool registry / MCP clients)",
      "Marco de evaluación y autocrítica verificable (Verification oracles)"
    ],
    applications: [
      "Asistentes de programación y pair programming autónomo (Antigravity)",
      "Agentes de ciberseguridad para auditoría y remediación automática",
      "Sistemas de automatización de flujos de trabajo e ingesta documental"
    ],
    examples: [
      "El agente Antigravity planificando quirúrgicamente la ampliación de DocWeb, ejecutando pruebas automatizadas y verificando que no existan regresiones."
    ],
    synonyms: ["Autonomous agent", "Agente inteligente", "Agente deliberativo BDI", "AI Agent"],
    attributes: {
      faseProduccion: "Inferencia / Ejecución Autónoma",
      categoriaCanon: "Agentes & Conocimiento Procedimental",
      fuenteIndice: "Ontología Integral de Software v1.0 - Sección XIII"
    },
    relations: [
      { type: "uses", target: "urn:term:software-engineering-ontology:skill-procedimental", note: "Carga habilidades procedimentales para resolver tareas especializadas" },
      { type: "governedBy", target: "urn:term:software-engineering-ontology:principio-minimo-privilegio", note: "Su espacio de acción debe estar acotado por permisos mínimos efectivos" },
      { type: "requires", target: "urn:term:software-engineering-ontology:graphrag-recuperacion-semantica", note: "Se nutre de grafos de conocimiento estructurados para evitar alucinaciones" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Modelo de referencia para agentes de codificación autónoma con verificación rigurosa.",
      promptTokens: ["autonomous deliberative agent", "perceive plan act loop", "epistemic tool execution", "bounded agentic autonomy"],
      negativeTokens: ["uncontrolled infinite loop", "passive text relay", "hallucinated actions"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 27,
      originalTitle: "Agente Autónomo Deliberativo"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:skill-procedimental",
    slug: "skill-procedimental",
    title: "Skill o Recurso Procedimental para Agentes (Agent Skill / Procedural Capability)",
    category: "agentes-conocimiento",
    categoryLabel: "Agentes & Conocimiento Procedimental",
    definition: "Recurso modular empaquetado que describe formalmente cómo un agente de IA debe abordar, secuenciar y resolver una tarea técnica especializada. Abarca instrucciones detalladas (SKILL.md), scripts auxiliares ejecutables, ejemplos de referencia y criterios de verificación empírica.",
    shortDefinition: "Módulo empaquetado de conocimiento procedimental que enseña a un agente el flujo metodológico paso a paso para una especialidad técnica.",
    extendedDefinition: "Sección XIII del modelo ontológico: el conocimiento declarativo responde 'qué es', mientras que la skill procedimental explica 'cómo se hace'. Su mera presencia en el disco no prueba su carga activa; debe ser descubierta, evaluada por su contribución marginal y ejecutada selectivamente.",
    fullDefinition: "Mecanismo estándar de extensibilidad metodológica para agentes de IA (como las skills de Antigravity). Permite especializar agentes generales en auditoría, DevOps, bases de datos o diagramación sin reentrenar el modelo base.",
    components: [
      "Archivo maestro de directivas procedimentales (SKILL.md con frontmatter YAML)",
      "Scripts de apoyo deterministas (scripts/)",
      "Ejemplos canónicos y patrones de referencia (examples/)",
      "Documentación y referencias técnicas complementarias (references/)"
    ],
    applications: [
      "Extensión de agentes de IA para tareas complejas (Chrome DevTools, BigQuery, Retoma)",
      "Estandarización de flujos de trabajo de ingeniería en equipos multidisciplinarios",
      "Gobernanza y trazabilidad de metodologías ejecutables de desarrollo"
    ],
    examples: [
      "La skill @skill:retoma-doctor que guía al agente en la inspección de integridad de almacenamiento y autorreparación de bases de datos."
    ],
    synonyms: ["Agent skill", "Habilidad procedimental", "Skill técnica", "Recurso procedimental"],
    attributes: {
      faseProduccion: "Configuración / Habilitación de Agentes",
      categoriaCanon: "Agentes & Conocimiento Procedimental",
      fuenteIndice: "Ontología Integral de Software v1.0 - Sección XIII"
    },
    relations: [
      { type: "usedBy", target: "urn:term:software-engineering-ontology:agente-autonomo-deliberativo", note: "El agente consulta y ejecuta la skill para guiar su metodología" },
      { type: "complements", target: "urn:term:software-engineering-ontology:plugin", note: "La skill aporta la metodología procedimental mientras el plugin expone las herramientas técnicas" },
      { type: "relatesTo", target: "urn:term:software-engineering-ontology:presupuesto-recuperacion-subgrafo", note: "Su contenido debe cargarse progresivamente respetando el presupuesto de contexto" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Unidad estándar de extensión metodológica procedimental para asistentes agenticos.",
      promptTokens: ["agent skill specification", "procedural guidance SKILL.md", "marginal capability contribution", "reusable agent workflow"],
      negativeTokens: ["rigid hardcoded prompt", "unstructured text block"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 28,
      originalTitle: "Skill Procedimental"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:orquestador-multiagente",
    slug: "orquestador-multiagente",
    title: "Orquestador y Coordinador Multiagente (Multi-Agent Orchestrator / Squad Dispatcher)",
    category: "agentes-conocimiento",
    categoryLabel: "Agentes & Conocimiento Procedimental",
    definition: "Componente arquitectónico supervisor responsable de descomponer una misión técnica compleja en tareas atómicas independientes, asignarlas a subagentes especializados con contratos de entrada/salida y presupuesto explícito, monitorear su progreso reactivamente y consolidar sus resultados verificados respetando el principio de escritor único (Single-Writer Principle).",
    shortDefinition: "Sistema coordinador que divide objetivos complejos entre subagentes especializados, supervisando su ejecución y convergencia sin colisiones.",
    extendedDefinition: "Sección XIII del modelo ontológico: evita la duplicación redundante de tareas y previene condiciones de carrera garantizando que exactamente un subagente escriba sobre un archivo o recurso compartido a la vez.",
    fullDefinition: "Estructura de gobernanza colaborativa entre agentes autónomos. Aplica espera reactiva (no bucles de sondeo activo) y valida mediante oráculos antes de certificar el cumplimiento de metas.",
    components: [
      "Planificador de grafos dirigidos de dependencias (DAG task scheduler)",
      "Contrato formal de delegación (Objetivo, archivos autorizados, presupuesto, criterios de aceptación)",
      "Sistema de comunicación y despacho de mensajes (Message bus / Mailbox)",
      "Mecanismo de reconciliación y cierre determinista (Handoff reconciler)"
    ],
    applications: [
      "Equipos autónomos de agentes para migraciones masivas de código y refactorizaciones",
      "Auditorías paralelas de seguridad, rendimiento y accesibilidad",
      "Coordinación de agentes en el entorno Antigravity Teamwork"
    ],
    examples: [
      "El despachador de Teamwork coordinando un subagente de auditoría de evidencia y un subagente de desarrollo sobre DocWeb."
    ],
    synonyms: ["Multi-agent orchestrator", "Orquestador de agentes", "Coordinador de squad", "Teamwork lead"],
    attributes: {
      faseProduccion: "Orquestación / Concurrencia de Agentes",
      categoriaCanon: "Agentes & Conocimiento Procedimental",
      fuenteIndice: "Ontología Integral de Software v1.0 - Sección XIII"
    },
    relations: [
      { type: "coordinates", target: "urn:term:software-engineering-ontology:agente-autonomo-deliberativo", note: "Despacha y supervisa subagentes deliberativos" },
      { type: "implements", target: "urn:term:software-engineering-ontology:presupuesto-recuperacion-subgrafo", note: "Asigna presupuestos explícitos de tokens y tiempo a cada delegación" },
      { type: "relatesTo", target: "urn:term:software-engineering-ontology:inestabilidad-martin", note: "Organiza delegaciones minimizando acoplamientos entre subagentes concurrentes" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Arquitectura cardinal para coordinar múltiples agentes concurrentes sin colisiones ni duplicados.",
      promptTokens: ["multi-agent orchestrator", "single writer principle", "reactive delegation contract", "squad task reconciliation"],
      negativeTokens: ["concurrent write collision", "infinite polling loop", "duplicated subagent task"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 29,
      originalTitle: "Orquestador Multiagente"
    }
  },
  {
    id: "urn:term:software-engineering-ontology:presupuesto-recuperacion-subgrafo",
    slug: "presupuesto-recuperacion-subgrafo",
    title: "Presupuesto de Recuperación y Selección Contextual (Knowledge Retrieval Budget / Subgraph Pruning)",
    category: "ingenieria-conocimiento",
    categoryLabel: "Ingeniería de Conocimiento & Grafos",
    definition: "Política y mecanismo de control cuantitativo que limita la expansión de un grafo de conocimiento a un subgrafo relevante acotado por presupuestos explícitos e independientes: número máximo de nodos visibles, aristas, saltos de vecindad topológica, tokens consumidos y latencia de respuesta, evitando enviar el grafo completo al modelo de lenguaje.",
    shortDefinition: "Mecanismo de poda que selecciona únicamente los nodos y relaciones relevantes bajo límites estrictos de tokens y saltos topológicos.",
    extendedDefinition: "Sección XVI del modelo ontológico: no se debe convertir la ontología entera en prompt ni en una escena gráfica inmanejable. Permite seleccionar modos de exploración: Rápida (1 salto), Detallada (2 saltos) o Exhaustiva (3 saltos), adaptándose a la intención de la tarea.",
    fullDefinition: "Principio de economía cognitiva en sistemas asistidos por IA. Asegura que el contexto inyectado sea denso en información de alto valor, descartando nodos desconectados o redundantes que diluyen la atención del modelo.",
    components: [
      "Presupuesto de nodos y aristas (Node / Edge cap)",
      "Límite de profundidad de saltos de vecindad (Expansion hop limit: 1 a 3)",
      "Presupuesto de tokens de contexto (Token allocation budget)",
      "Función de poda semántica por intención (Intent-based pruning function)"
    ],
    applications: [
      "Optimización de prompts en asistentes de desarrollo (RAG & GraphRAG)",
      "Control de rendimiento interactivo en diagramas SVG de DocWeb",
      "Prevención de desbordamiento de ventanas de contexto en LLMs"
    ],
    examples: [
      "En DocWeb, el selector de presupuesto limita el Diagrama Contextual a 1 salto para respuesta rápida o 3 saltos para análisis exhaustivo."
    ],
    synonyms: ["Retrieval budget", "Presupuesto de recuperación", "Poda de subgrafo", "Context budget pruning"],
    attributes: {
      faseProduccion: "Inferencia / Recuperación Semántica",
      categoriaCanon: "Ingeniería de Conocimiento & Grafos",
      fuenteIndice: "Ontología Integral de Software v1.0 - Sección XVI"
    },
    relations: [
      { type: "regulates", target: "urn:term:software-engineering-ontology:graphrag-recuperacion-semantica", note: "Fija los límites cuantitativos de extracción del subgrafo contextual" },
      { type: "implements", target: "urn:term:software-engineering-ontology:jerarquia-seis-niveles", note: "Aprovecha la cota de 6 niveles para restringir el espacio de búsqueda" },
      { type: "usedBy", target: "urn:term:software-engineering-ontology:agente-autonomo-deliberativo", note: "Garantiza que el agente opere dentro de límites seguros de costo y contexto" }
    ],
    level: "professional",
    status: "canonical",
    aiPromptGuidance: {
      relevance: "Mecanismo esencial para controlar el costo de inferencia y evitar dilución de atención en RAG.",
      promptTokens: ["knowledge retrieval budget", "subgraph pruning policy", "token allocation cap", "intent-driven neighbor expansion"],
      negativeTokens: ["unbounded graph dump", "context window overflow", "diluted prompt noise"],
      modelCompatibility: ["All Reasoning & Coding Models"]
    },
    metadata: {
      source: "ontologia_integral_software_v1",
      sourceIndex: 30,
      originalTitle: "Presupuesto de Recuperación de Subgrafo"
    }
  }
];

// Comprobar y fusionar
let addedCount = 0;
let updatedCount = 0;

additionalTerms.forEach(term => {
  const existingIdx = termsData.canonicalTerms.findIndex(t => t.id === term.id);
  if (existingIdx !== -1) {
    termsData.canonicalTerms[existingIdx] = term;
    updatedCount++;
  } else {
    termsData.canonicalTerms.push(term);
    addedCount++;
  }
});

glossaryData.termCount = termsData.canonicalTerms.length;
fs.writeFileSync(termsFile, JSON.stringify(termsData, null, 2), 'utf8');
fs.writeFileSync(glossaryFile, JSON.stringify(glossaryData, null, 2), 'utf8');

// Actualizar catalog.json
const catEntry = catalogData.canonicalGlossaries.find(g => g.id === glossaryData.id);
if (catEntry) {
  catEntry.termCount = termsData.canonicalTerms.length;
  catEntry.categories = [
    "Taxonomía de Artefactos (L1-L6)",
    "Arquitectura & Diseño Estructural",
    "Semántica & Compilación",
    "Sistemas Distribuidos & Persistencia",
    "Seguridad & Calidad de Software",
    "Agentes & Conocimiento Procedimental",
    "Ingeniería de Conocimiento & Grafos",
    "Ontología de Relaciones Semánticas"
  ];
}
fs.writeFileSync(catalogFile, JSON.stringify(catalogData, null, 2), 'utf8');

console.log(`Expansión de SoftwareEngineeringOntology completada.`);
console.log(`Términos añadidos: ${addedCount}, actualizados: ${updatedCount}.`);
console.log(`Nuevo total en SoftwareEngineeringOntology: ${termsData.canonicalTerms.length} términos.`);
