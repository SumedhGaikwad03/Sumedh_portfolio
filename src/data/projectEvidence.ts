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
      problemBrief: "Personal finance apps frequently risk IEEE-754 floating-point balance drift and unconstrained text-to-SQL LLM hallucinations.",
      solutionBrief: "5-tier REST backend with Prisma.Decimal arithmetic, domain-enforced budget locking, and JSON parameter-extracted semantic query routing.",
      keyMetric: {
        value: "0 Floating Drift",
        label: "Decimal-accurate ledger balances & zero direct SQL execution risk",
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
      problemBrief: "Team collaboration platforms suffer from sluggish HTTP polling or catastrophic presence flapping when users refresh or open multiple tabs.",
      solutionBrief: "Dual-channel architecture pairing an Express REST API for durable MongoDB CRUD with in-process Socket.io and in-memory connection-counted presence tracking.",
      keyMetric: {
        value: "< 50ms Broadcast",
        label: "Live event sync latency & 100% elimination of multi-tab disconnect flicker",
      },
    },
    engineeringSpecs: {
      systemModel: "Dual-Channel Hybrid: Stateless Express REST API + Stateful In-Process WebSocket Broadcast Layer.",
      architecture: "Stateless Express 5 REST API for MongoDB persistence + Socket.io room broadcaster consumed by React 18 optimistic client.",
      invariant: "In-memory Map<roomId, Map<userId, socketCount>> tracks active connection counts to eliminate multi-tab disconnect flicker.",
      securityBoundary: "Stateless JWT revocation comparing decoded.iat with user.passwordChangedAt; room.members.includes(req.userId) validation.",
      concurrencyState: "Optimistic UI mutations reconciled against server and broadcast payloads via temporary client UUID reconciliation.",
      implementationEvidence: "Mongoose pre('findOneAndDelete') hook cascades deletions across child notes and tasks; deployed beta live at atrio-gamma.vercel.app.",
    },
  },
  virtual2reality: {
    slug: "virtual2reality",
    standardProof: {
      problemBrief: "Real estate platforms suffer from rupee/paise roundoff errors across multi-crore transactions and SSRF vulnerabilities during automated property web scraping.",
      solutionBrief: "6-tier modular monolith using 64-bit BigInt paise currency representation and pre-flight DNS IP filtering to block internal cloud network probing.",
      keyMetric: {
        value: "100% Paise Accuracy",
        label: "Zero floating-point currency drift & RFC 1918 private subnet SSRF protection",
      },
    },
    engineeringSpecs: {
      systemModel: "6-Tier Modular Monolith (Routes → Validators → Controllers → Services → Repositories → PostgreSQL).",
      architecture: "Domain-driven relational hierarchy (Developer → Project → Configuration → Media) with stateless Cloudinary streaming.",
      invariant: "BigInt 64-bit integer paise normalizer eliminates binary floating-point roundoff errors across multi-crore transactions.",
      securityBoundary: "Pre-flight DNS IP resolution blocking loopback (127.0.0.1) and RFC 1918 private CIDR subnets prior to scraper network requests.",
      concurrencyState: "Multi-tier publication boundary ensuring unapproved draft developer inventories never leak into public discovery.",
      implementationEvidence: "Production commercial platform serving live developer inventory and lead contexts at virtual2reality.in.",
    },
  },
  "smart-traffic-management-system": {
    slug: "smart-traffic-management-system",
    standardProof: {
      problemBrief: "Sequential reinforcement learning traffic signal evaluations introduce stochastic vehicle arrival bias, distorting comparative delay metrics.",
      solutionBrief: "Dual parallel SUMO micro-simulation architecture running baseline cyclical and PyTorch DDQN controllers in 0.1s lockstep with safety invariants.",
      keyMetric: {
        value: "-23.2% Delay",
        label: "Queue wait time reduction under empirical FHWA NGSIM US-101 traffic demand",
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
