export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  engineeringOneLiner: string;
  tech: string[];
  github?: string;
  demo?: string;
  video?: string;
  featured: boolean;
  overview: string;
  problem: string;
  solution: string;
  techStack: string[];
  architecture: string;
  screenshots?: { src: string; caption: string }[];
  engineeringDecisions: string[];
  challenges: string[];
  lessonsLearned: string[];
  futureImprovements: string[];
  placeholder?: boolean;
};

// Canonical project records ordered for portfolio display
export const projectsData: Project[] = [
  {
    slug: "atrio",
    name: "Atrio",
    oneLiner:
      "A shared workspace where distributed teams can manage notes and tasks together and see changes as they happen.",
    engineeringOneLiner:
      "A real-time collaborative workspace engineered around dual-channel HTTP/WebSocket synchronization, multi-tenant room isolation, and low-latency team presence.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com/SumedhGaikwad03",
    demo: "https://atrio.sumedhgaikwad.com",
    featured: true,
    overview:
      "Atrio is a full-stack real-time collaborative workspace allowing distributed teams to synchronously manage notes and tasks. It pairs an Express REST API for durable MongoDB persistence with a stateful Socket.io layer for live presence and instantaneous event propagation.",
    problem:
      "Lightweight note applications are typically single-user silos or rely on sluggish polling, while enterprise platforms carry heavy friction and latency. Teams need a fast, low-friction shared workspace with real-time feedback and robust multi-tenant authorization.",
    solution:
      "Implement a dual-channel architecture where REST handles durable CRUD persistence and Socket.io broadcasts room-scoped events, paired with in-memory presence tracking that counts socket connections per user to eliminate multi-tab disconnect flicker.",
    techStack: [
      "React 18",
      "Node.js",
      "Express 5",
      "Socket.io",
      "MongoDB",
      "Mongoose 8",
      "Framer Motion",
      "JWT",
      "bcryptjs",
      "Tailwind CSS",
      "Axios",
    ],
    architecture:
      "A dual-channel system combining a stateless Express 5 REST API for MongoDB persistence and an in-process Socket.io server for live presence and room broadcasting, consumed by an optimistic React 18 frontend.",
    engineeringDecisions: [
      "Room-based authorization checks room.members.includes(req.userId) rather than creator-only ownership.",
      "In-memory presence map (Map<roomId, Map<userId, socketCount>>) tracks connection counts to prevent multi-tab flicker.",
      "Stateless JWT revocation by comparing decoded.iat with user.passwordChangedAt timestamps.",
      "Mongoose pre('findOneAndDelete') hook cascades deletion to all child notes and tasks on room removal.",
      "Deterministic hash-based visual note rotation computed from MongoDB ObjectId seeds.",
      "Optimistic UI updates with temporary client IDs reconciled against incoming server/socket payloads.",
    ],
    challenges: [
      "Preventing presence flapping and phantom disconnects when users refresh or open multiple tabs.",
      "Deduplicating local optimistic state against incoming Socket.io broadcast events.",
      "Enforcing relational cascade invariants across MongoDB collections without native foreign key constraints.",
    ],
    lessonsLearned: [
      "Separating durable REST persistence from ephemeral WebSocket broadcasting simplifies rollback and failure recovery.",
      "Tracking connection counts rather than binary socket status is essential for reliable user presence.",
    ],
    futureImprovements: [
      "Redis Pub/Sub adapter for horizontal multi-instance socket clustering.",
      "Rich-text / Markdown formatting with collaborative CRDT operational transformations.",
      "Activity audit log stream for tracking workspace history.",
    ],
  },
  {
    slug: "smart-traffic-management-system",
    name: "Smart Traffic Management System",
    oneLiner:
      "A traffic-control research project that tests whether intelligent signal decisions can reduce congestion in simulated city streets.",
    engineeringOneLiner:
      "A dual-simulation reinforcement learning traffic controller using PyTorch Double Deep Q-Networks (DDQN) to dynamically optimize multi-phase signal timings, cutting average wait times by 23.2% while benchmarking directly against an unbiased cyclical baseline.",
    tech: ["Python", "FastAPI", "PyTorch", "SUMO", "React"],
    featured: true,
    overview:
      "A research-oriented intelligent transportation platform combining PyTorch Double Deep Q-Networks (DDQN) with Eclipse SUMO micro-simulations. It runs two step-synchronized simulations concurrently (Baseline Fixed-Time vs DDQN Agent) to eliminate stochastic arrival bias while evaluating performance under empirical FHWA NGSIM US-101 traffic demand.",
    problem:
      "Fixed-time traffic signals cannot adapt dynamically to fluctuating vehicular density. Evaluating adaptive RL signal controllers sequentially across separate simulation runs introduces stochastic arrival bias that distorts comparative performance metrics.",
    solution:
      "Build a dual parallel micro-simulation architecture (DualSimManager) executing Baseline and RL instances in lockstep at 0.1s ticks across isolated TraCI ports. Wrap PyTorch DDQN inferences inside deterministic physical timing invariants (10s min hold, 60s starvation override) and emergency vehicle green corridor preemption.",
    techStack: [
      "Python",
      "FastAPI",
      "PyTorch",
      "DDQN",
      "Eclipse SUMO",
      "TraCI",
      "WebSockets",
      "FHWA NGSIM US-101",
      "React",
      "TypeScript",
      "Zustand",
      "Recharts",
      "Tailwind CSS",
    ],
    architecture:
      "A dual-simulation engine co-orchestrating two concurrent SUMO instances via multi-port TraCI sockets, integrated with a FastAPI asynchronous backend, a PyTorch 25-state DDQN controller, and a live WebSocket telemetry broadcaster.",
    engineeringDecisions: [
      "Dual parallel simulation architecture executing baseline and RL in lockstep to eliminate stochastic arrival bias.",
      "Double Deep Q-Networks (DDQN) with experience replay and target networks to prevent Q-value overestimation.",
      "Deterministic physical safety invariants (10s min green hold, 60s starvation override) wrapping neural policy outputs.",
      "Empirical FHWA NGSIM US-101 vehicle trajectory preprocessing into microscopic SUMO route definitions.",
      "Live WebSocket telemetry broadcasting at 200ms intervals to stream state snapshots without polling overhead.",
    ],
    challenges: [
      "Synchronizing two independent SUMO subprocesses and TraCI socket channels at 0.1s intervals.",
      "Handling SUMO gateway priority junction blocking for emergency vehicles via TraCI moveTo() recovery.",
      "Analyzing the coordination boundary limitation in multi-junction arterial grids.",
    ],
    lessonsLearned: [
      "Reinforcement learning evaluation in cyber-physical systems requires identical, step-synchronized baseline controls to be statistically credible.",
      "Local intersection optimization in arterial grids can shift queues to downstream fixed-cycle signals, demonstrating the necessity of multi-agent coordination.",
    ],
    futureImprovements: [
      "Multi-Agent Reinforcement Learning (MARL) coordinating signal phases across all 5 intersections in the 3x3 grid.",
      "Completing the frontend real-time monitoring dashboard API integration.",
    ],
  },
  {
    slug: "virtual2reality",
    name: "Virtual2Reality",
    oneLiner:
      "A real-estate discovery platform that helps people explore properties while organizing listing information and enquiries for the business behind it.",
    engineeringOneLiner:
      "A domain-driven luxury real estate discovery platform and ingestion engine built with React 19, Express 5, Prisma, and PostgreSQL, featuring paise-accurate currency modeling and SSRF-hardened listing ingestion.",
    tech: ["React", "Node.js", "PostgreSQL", "Prisma", "Cloudinary"],
    demo: "https://www.virtual2reality.in/",
    featured: true,
    overview:
      "Virtual2Reality is a commercial real estate discovery platform and inventory management engine. It features a domain-driven relational hierarchy (Developer → Project → Configuration → Media), paise-accurate currency modeling via BigInt, an SSRF-hardened web ingestion pipeline, and an administrative CMS portal with Cloudinary media streaming.",
    problem:
      "Real estate discovery in high-growth markets suffers from fragmented inventory, inconsistent currency formats (Crores vs Lakhs), unstandardized carpet area metrics, and the security risk of exposing staging developer inventory or suffering SSRF attacks during property web scraping.",
    solution:
      "Build a strict 6-tier modular monolith (Routes → Validators → Controllers → Services → Repositories → PostgreSQL) that normalizes Indian denominations into BigInt paise, enforces multi-tier relational publication boundaries, validates external URLs against private IP CIDR blacklists before scraping, and streams media directly to Cloudinary memory buffers.",
    techStack: [
      "React 19",
      "Node.js",
      "Express 5",
      "TypeScript",
      "PostgreSQL",
      "Prisma 7",
      "@prisma/adapter-pg",
      "Cloudinary",
      "Docker",
      "JWT",
      "bcryptjs",
      "Tailwind CSS",
      "Vite 8",
    ],
    architecture:
      "A 6-tier modular monolith architecture separating public discovery endpoints from protected admin CMS workflows, backed by PostgreSQL / Prisma 7, Cloudinary media streaming, and Google Sheets CRM sync.",
    engineeringDecisions: [
      "BigInt 64-bit integer representation in paise to prevent IEEE-754 binary floating-point roundoff errors.",
      "Pre-flight DNS IP resolution and private subnet validation in scraper to prevent SSRF vulnerabilities.",
      "Multi-tier publication boundary ensuring draft developer inventories never leak into public discovery.",
      "Stateless Cloudinary memory buffer streaming avoiding local container disk writes.",
      "Authoritative lead context resolution deriving parent relationships directly from verified database entities.",
    ],
    challenges: [
      "Normalizing diverse Indian currency inputs into exact 64-bit BigInt paise values.",
      "Blocking sophisticated SSRF vectors (loopback, private ranges, manual redirects) during external URL ingestion.",
      "Enforcing double-publication filters across deep relational joins in Prisma ORM.",
    ],
    lessonsLearned: [
      "High-value commercial applications require absolute currency precision at the database layer rather than relying on floating-point floats.",
      "Allowing administrative ingestion of arbitrary external URLs mandates pre-flight network boundary validation to block internal cloud probing.",
    ],
    futureImprovements: [
      "Full-text search engine enhancements with multi-attribute database indexing.",
      "Automated self-service customer tour booking.",
    ],
  },
  {
    slug: "finance-one",
    name: "Finance One",
    oneLiner:
      "A personal finance platform designed to keep financial records accurate, keep each user's data separate, and make spending easier to understand.",
    engineeringOneLiner:
      "A backend-first personal finance platform engineered around transactional correctness, multi-tenant data isolation, and a controlled query abstraction bridging deterministic ledgers with AI extensibility.",
    tech: ["Node.js", "TypeScript", "PostgreSQL", "Prisma", "Docker"],
    featured: true,
    placeholder: false,
    overview:
      "Finance One is a personal finance platform designed backend-first to guarantee mathematical correctness, multi-tenant security, and domain invariants before introducing an AI query layer. It models transactional truth with Decimal precision and domain-enforced budget locking.",
    problem:
      "Most personal finance applications either treat database consistency as a secondary concern or connect an LLM directly to a database via text-to-SQL, risking floating-point errors, security breaches, and unconstrained hallucinations.",
    solution:
      "Build a 5-tier Express/Prisma/PostgreSQL backend enforcing domain rules, Decimal calculations, and user scoping, paired with a TransactionQuery abstraction that routes natural language queries through pgvector skill matching and structured extraction without direct database access.",
    techStack: [
      "Node.js",
      "Express",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "pgvector",
      "Docker",
      "Zod",
      "JWT",
      "Ollama",
    ],
    architecture:
      "A 5-tier Express REST API (Routes → Controllers with Zod → Domain Services & Analytics → Repositories with user scoping → Prisma ORM → PostgreSQL 18 with pgvector in Docker).",
    engineeringDecisions: [
      "Prisma.Decimal used across all models and calculations to prevent IEEE-754 binary floating-point roundoff errors.",
      "Budget locking (BudgetLockedError) and period overlap validation enforced in domain services prior to persistence.",
      "Multi-tenant data isolation with anti-enumeration 404 responses for unauthorized resource lookups.",
      "TransactionQuery contract decouples query generation from deterministic database execution.",
      "pgvector integrated into PostgreSQL for 2560-dim semantic skill matching with 0.70 confidence gating.",
    ],
    challenges: [
      "Implementing calendar date math for weekly, monthly, and quarterly budgets across variable month lengths.",
      "Preventing budget period overlaps with temporal intersection algorithms in domain services.",
      "Managing nearest-neighbor distance thresholding to reject out-of-domain questions.",
    ],
    lessonsLearned: [
      "Financial calculations must be strictly decoupled from JavaScript floating-point representations.",
      "LLMs should interpret intent into structured contracts rather than directly executing database queries.",
    ],
    futureImprovements: [
      "Mount public /api/ai routes in production router.",
      "Implement SUM, COUNT, MAX, MIN aggregation execution in TransactionQueryService.",
      "Build React + TanStack Query web client.",
    ],
  },
];
