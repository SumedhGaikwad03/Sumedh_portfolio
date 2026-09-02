export interface ProjectEvidence {
  slug: string;
  // Standard Mode Proof Highlights
  standardProof: {
    problemBrief: string;
    solutionBrief: string;
    keyMetric: {
      value: string;
      label: string;
    };
  };
  // Engineering Mode Deep Dossier Specs
  engineeringSpecs: {
    systemModel: string;
    architecture: string;
    invariant: string;
    securityBoundary: string;
    concurrencyState: string;
    aiBoundary?: string;
    implementationEvidence: string;
  };
}

export const PROJECT_EVIDENCE: Record<string, ProjectEvidence> = {
  "finance-one": {
    slug: "finance-one",
    standardProof: {
      problemBrief: "People need finance tools they can trust with accurate balances, private records, and clear answers about their spending.",
      solutionBrief: "A personal finance platform that protects each user's data, keeps records accurate, and turns everyday questions into structured spending queries.",
      keyMetric: {
        value: "0 Floating Drift",
        label: "Accurate ledger balances with a controlled query experience",
      },
    },
    engineeringSpecs: {
      systemModel: "5-Tier Domain-Driven REST Backend (Routes → Zod Controllers → Domain Services → Repositories → PostgreSQL 18).",
      architecture: "Modular Express 5 monolith with Prisma ORM, temporal budget intersection checks, and containerized pgvector extension.",
      invariant: "Prisma.Decimal prevents IEEE-754 binary floating-point financial drift across all ledger balances and transactions.",
      securityBoundary: "Multi-tenant anti-enumeration (404 on ownership mismatch); LLM restricted to structured parameter extraction.",
      concurrencyState: "Temporal overlap intersection algorithms in domain service reject concurrent overlapping budget cycles with BudgetLockedError.",
      aiBoundary: "Natural language queries routed via 2560-dim vector embeddings with 0.70 confidence gating; 0 raw SQL write access.",
      implementationEvidence: "Verified backend architecture with Zod schema validation, dockerized PostgreSQL + pgvector, and automated test coverage.",
    },
  },
  atrio: {
    slug: "atrio",
    standardProof: {
      problemBrief: "Distributed teams need to work in the same space without waiting for updates or losing track of who is present.",
      solutionBrief: "A shared workspace that keeps notes and tasks synchronized and shows team presence as people join, leave, or open another tab.",
      keyMetric: {
        value: "< 50ms Broadcast",
        label: "Fast shared updates without multi-tab presence flicker",
      },
    },
    engineeringSpecs: {
      systemModel: "Dual-Channel Hybrid: Stateless Express REST API + Stateful In-Process WebSocket Broadcast Layer.",
      architecture: "Stateless Express 5 REST API for MongoDB persistence + Socket.io room broadcaster consumed by React 18 optimistic client.",
      invariant: "In-memory Map<roomId, Map<userId, socketCount>> tracks active connection counts to eliminate multi-tab disconnect flicker.",
      securityBoundary: "Stateless JWT revocation comparing decoded.iat with user.passwordChangedAt; room.members.includes(req.userId) validation.",
      concurrencyState: "Optimistic UI mutations reconciled against server and broadcast payloads via temporary client UUID reconciliation.",
      implementationEvidence: "Mongoose pre('findOneAndDelete') hook cascades deletions across child notes and tasks; deployed live at atrio.sumedhgaikwad.com.",
    },
  },
  virtual2reality: {
    slug: "virtual2reality",
    standardProof: {
      problemBrief: "Property information arrives in inconsistent formats, while the business needs accurate prices and a safe way to bring listings into one place.",
      solutionBrief: "A property discovery platform that organizes listings, preserves pricing accuracy, collects enquiries, and checks outside sources before importing information.",
      keyMetric: {
        value: "100% Paise Accuracy",
        label: "Accurate property pricing and protected listing imports",
      },
    },
    engineeringSpecs: {
      systemModel: "6-Tier Modular Monolith (Routes → Validators → Controllers → Services → Repositories → PostgreSQL).",
      architecture: "Domain-driven relational hierarchy (Developer → Project → Configuration → Media) with stateless Cloudinary streaming.",
      invariant: "BigInt 64-bit integer paise normalizer eliminates binary floating-point roundoff errors across multi-crore transactions.",
      securityBoundary: "Pre-flight DNS IP resolution blocking loopback (127.0.0.1) and RFC 1918 private CIDR subnets prior to scraper network requests.",
      concurrencyState: "Multi-tier publication boundary ensuring unapproved draft developer inventories never leak into public discovery.",
      implementationEvidence: "Production commercial platform serving live developer inventory and lead contexts at www.virtual2reality.in.",
    },
  },
  "smart-traffic-management-system": {
    slug: "smart-traffic-management-system",
    standardProof: {
      problemBrief: "Fixed traffic signals do not respond well to changing traffic, and testing a new approach fairly requires comparable traffic conditions.",
      solutionBrief: "A traffic simulation that compares an adaptive controller with a fixed-timing baseline under the same traffic conditions.",
      keyMetric: {
        value: "-23.2% Delay",
        label: "Lower simulated traffic delay under real-world traffic data",
      },
    },
    engineeringSpecs: {
      systemModel: "Dual-Process Cyber-Physical Digital Twin (Step-Synchronized Baseline vs PyTorch DDQN Agent).",
      architecture: "FastAPI asynchronous engine co-orchestrating 2 SUMO instances via isolated TCP TraCI ports 8813 & 8814 at 0.1s ticks.",
      invariant: "0.1s step-locked dual SUMO simulation on isolated TraCI ports 8813 & 8814; deterministic safety invariants (10s min green hold, 60s max starvation override).",
      securityBoundary: "Priority junction emergency vehicle green corridor preemption with TraCI moveTo() trajectory recovery.",
      concurrencyState: "TraCI TCP socket lockstep preemption; 200ms WebSocket telemetry broadcast streaming 25-state vectors without polling overhead.",
      implementationEvidence: "Peer-reviewed research methodology evaluating DDQN neural policies against unbiased cyclical baselines.",
    },
  },
};
