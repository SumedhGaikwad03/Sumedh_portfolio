export interface EngineeringDeliveryContext {
  systemsDelivered: string;
  architecturalContributions: string;
  keyEngineeringDecisions: string[];
  techSurface: string[];
  performanceReliability: string;
  securityDataConstraints: string;
  deliveryEvidence: string;
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  type: "Internship" | "Client Project" | "Hackathon";
  projectSlug?: string; // Link to project dossier if applicable
  // Standard Recruiter View
  summary: string;
  points: string[];
  // Engineering Deep View
  engineeringContext: EngineeringDeliveryContext;
}

export const experienceData: ExperienceItem[] = [
  {
    role: "Software Engineering Intern",
    org: "Actima Software, Pune",
    period: "Jan 2025 — Aug 2025",
    type: "Internship",
    summary: "Built and maintained client web applications, REST APIs, and database integrations in a lean engineering team.",
    points: [
      "Developed and maintained frontend and backend features for multiple client projects, contributing to REST APIs, database integration, and production-ready web applications.",
      "Collaborated with clients to understand business requirements and translate feedback into functional software solutions across diverse service engagements.",
      "Worked closely with senior engineers in a lean development team, participating in Git-based workflows, code reviews, debugging, testing, and iterative software delivery.",
    ],
    engineeringContext: {
      systemsDelivered: "Multi-client web portals, REST API integrations, and database persistence layers.",
      architecturalContributions: "Engineered validated REST endpoints with consistent HTTP response contracts, structured error handling, and automated schema queries in agile sprints.",
      keyEngineeringDecisions: [
        "Enforced strict input validation schemas on API routes prior to database execution.",
        "Established Git-based branch workflows with PR code reviews, conflict resolution, and staging build verification.",
      ],
      techSurface: ["React.js", "Node.js", "Express.js", "REST APIs", "SQL", "Git", "Postman"],
      performanceReliability: "Structured modular backend handlers to maintain low-latency API response times across multi-client workloads.",
      securityDataConstraints: "Enforced parameter sanitization and token-based authentication guards on sensitive client endpoints.",
      deliveryEvidence: "Production features deployed across client service engagements with automated test and lint integrity.",
    },
  },
  {
    role: "Full-Stack Real Estate Platform",
    org: "Virtual2Reality — Client Project",
    period: "1 month · 2024",
    type: "Client Project",
    projectSlug: "virtual2reality",
    summary: "Delivered an end-to-end commercial real estate discovery website and structured lead capture backend.",
    points: [
      "Developed and deployed a production enquiry website end-to-end for a real estate firm in about a month, based on real client requirements.",
      "Built a lightweight backend capturing user enquiries into structured Excel records; delivered including deployment and client coordination.",
    ],
    engineeringContext: {
      systemsDelivered: "6-tier modular monolith (Routes → Validators → Controllers → Services → Repositories → PostgreSQL) with Cloudinary media streaming.",
      architecturalContributions: "Architected strict tier separation decoupling HTTP controllers from domain services and database repositories; implemented pre-flight DNS SSRF validation.",
      keyEngineeringDecisions: [
        "Modeled Indian currency in 64-bit BigInt paise to avoid binary floating-point roundoff drift.",
        "Implemented pre-flight DNS subnet resolution in listing scraper to block private IP CIDR ranges (RFC 1918 / loopback).",
        "Stateless memory buffer streaming directly to Cloudinary CDN, avoiding disk writes in containerized environments.",
      ],
      techSurface: ["React 19", "Express 5", "TypeScript", "Prisma 7", "PostgreSQL", "Cloudinary", "Docker"],
      performanceReliability: "Sub-50ms query response times via relational Prisma indexing and multi-attribute property filters.",
      securityDataConstraints: "Multi-tier draft/live publication filter ensuring unverified developer inventory never leaks to public endpoints.",
      deliveryEvidence: "End-to-end commercial deployment (virtual2reality.in) capturing structured lead records with verified zero currency drift.",
    },
  },
  {
    role: "Smart Traffic Management System",
    org: "Smart India Hackathon 2025 — Team Lead",
    period: "2025",
    type: "Hackathon",
    projectSlug: "smart-traffic-management-system",
    summary: "Led team to college selection with an adaptive RL traffic controller MVP, evolving into a published research paper.",
    points: [
      "Led Team VEIG_1 through multiple screening rounds to college-level selection; built and presented the Smart Traffic Management System MVP.",
      "Project evolved into a final-year BE project and a peer-reviewed published paper — hackathon idea to publication.",
    ],
    engineeringContext: {
      systemsDelivered: "Dual parallel micro-simulation RL engine (DualSimManager) co-orchestrating Baseline and PyTorch DDQN in lockstep at 0.1s ticks across TraCI ports 8813 & 8814.",
      architecturalContributions: "Designed step-synchronized parallel simulation architecture to eliminate stochastic arrival bias; implemented deterministic physical safety overrides.",
      keyEngineeringDecisions: [
        "Trained PyTorch Double Deep Q-Networks (DDQN) with experience replay and Huber loss to avoid Q-value overestimation.",
        "Enforced hard physical safety constraints (10s min green hold, 60s starvation override) wrapping probabilistic neural agent actions.",
        "Emergency vehicle preemption with TraCI moveTo() recovery to prevent intersection deadlock.",
      ],
      techSurface: ["Python", "FastAPI", "PyTorch", "DDQN", "Eclipse SUMO", "TraCI", "WebSockets"],
      performanceReliability: "23.2% delay reduction under empirical FHWA NGSIM US-101 traffic demand with real-time 200ms WebSocket telemetry streaming.",
      securityDataConstraints: "Strict hardware clock step synchronization across isolated TCP socket ports ensuring zero state desynchronization.",
      deliveryEvidence: "Published peer-reviewed research paper in IJIRT (Vol. 12, Issue 11, April 2026, ISSN: 2349-6002).",
    },
  },
];
