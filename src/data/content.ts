// ---------------------------------------------------------------------------
// SITE CONTENT
// Edit this file to update the site. No component changes needed for
// text/content updates.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Sumedh Gaikwad",
  title: "Backend Software Engineer",
  tagline:
    "Building scalable backend systems today while learning AI to build intelligent products tomorrow.",
  email: "sumedhgaikwad.dev@gmail.com",
  github: "https://github.com/SumedhGaikwad03",
  linkedin: "https://www.linkedin.com/in/sumedh-gaikwad-8b95292a6/",
  x: "https://x.com/Suuumedhh",
  resumeUrl: "/resume.pdf",
  location: "Pune, India",
};

export const status = {
  state: "OPEN_TO_WORK",
  focus: "BACKEND \u2192 AI",
  role: "Backend / AI-ML Engineering",
};

export const summary = {
  paragraphs: [
    "I'm a backend-focused software engineer who understands the full stack but specializes in APIs, databases, and system architecture — with hands-on research experience applying reinforcement learning to real-world systems.",
    "I've shipped production backend features during a software engineering internship, delivered a client project end-to-end, and taken a hackathon idea through to a peer-reviewed publication. I'm currently learning machine learning and deep learning so I can build AI-powered features into production software, not just prototypes.",
  ],
};

export const current = {
  building: {
    name: "Finance_one",
    description:
      "A production-quality backend-first finance platform focused on scalable architecture and AI integration.",
  },
  learning: [
    "Machine Learning Specialization — Coursera",
    "Deep Learning Specialization — Coursera",
    "Backend Architecture",
    "System Design",
  ],
  exploring: ["RAG", "LLM Integration", "AI-powered applications"],
  statusNote: "Open to Backend / AI-ML Engineering opportunities.",
};

export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
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

// Order matters — this is the order shown in Featured Projects.
export const projects: Project[] = [
  {
    slug: "atrio",
    name: "Atrio",
    oneLiner:
      "A real-time collaborative workspace for shared notes and task management with live sync across users.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    github: "https://github.com/SumedhGaikwad03",
    demo: "https://atrio-gamma.vercel.app",
    featured: true,
    overview:
      "Atrio is a real-time collaboration platform for shared notes and task management, built with WebSocket-based live sync so changes propagate instantly across every connected user. Deployed to real users during a beta phase.",
    problem:
      "Collaborative tools feel broken the moment sync lags or onboarding gets in the way — users expect changes to appear instantly and expect to start using the product without friction.",
    solution:
      "Use Socket.io for WebSocket-based live sync so edits propagate in real time, and design a frictionless onboarding flow so new users can start collaborating immediately without setup overhead.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    architecture:
      "An Express REST API handles persistence to MongoDB, while a Socket.io layer broadcasts real-time updates to all connected clients in a workspace. React on the frontend reconciles local state against incoming socket events.",
    engineeringDecisions: [
      "Socket.io chosen for real-time sync given its reconnection handling and room-based broadcasting.",
      "Frictionless onboarding prioritized over feature breadth for the beta release.",
    ],
    challenges: [
      "Reconciling concurrent edits from multiple users without conflicting state.",
      "Keeping real-time updates consistent through network drops and reconnects.",
    ],
    lessonsLearned: [
      "Real-time features surface edge cases — reconnection, out-of-order events — that don't show up in a request/response API.",
    ],
    futureImprovements: [
      "Add conflict resolution for simultaneous edits to the same note.",
      "Add offline support with sync-on-reconnect.",
    ],
  },
  {
    slug: "smart-traffic-management-system",
    name: "Smart Traffic Management System",
    oneLiner:
      "A reinforcement-learning agent that optimizes traffic signal timing in real time, cutting average wait times by over 58%.",
    tech: ["Python", "FastAPI", "PyTorch", "React", "SUMO", "TraCI", "WebSocket"],
    featured: true,
    overview:
      "A Smart India Hackathon 2025 entry. A Double Deep Q-Network (D-DQN) reinforcement learning agent dynamically optimizes traffic signal phases in real time across two network topologies — a single intersection and an urban arterial grid. The project was later published as peer-reviewed research.",
    problem:
      "Fixed-interval traffic signals don't account for real-time traffic density, leading to unnecessary congestion — especially at intersections with uneven or unpredictable traffic flow. Evaluating a new signal-control policy also requires an unbiased way to compare it against the existing fixed-time baseline.",
    solution:
      "Train a D-DQN agent to choose signal phases based on real-time traffic state, and run dual parallel simulations — one controlled by the RL agent, one by fixed-time logic — so the two policies can be compared on identical, unbiased traffic conditions. Emergency vehicle detection with signal preemption was layered on top to handle real-world edge cases.",
    techStack: ["Python", "FastAPI", "PyTorch", "React", "SUMO", "TraCI", "WebSocket"],
    architecture:
      "SUMO/TraCI drives the traffic simulation; a PyTorch D-DQN agent observes lane state and selects signal phases. A FastAPI backend streams live simulation state to a React dashboard over WebSocket for real-time monitoring. Two simulation instances run in parallel — RL-controlled and fixed-time — for direct, unbiased comparison.",
    engineeringDecisions: [
      "D-DQN over simpler heuristics to let the agent learn from real traffic patterns rather than hand-tuned rules.",
      "Dual parallel simulation architecture to eliminate bias when comparing RL against the fixed-time baseline.",
      "WebSocket streaming over polling for a real-time monitoring dashboard.",
      "Emergency vehicle detection with signal preemption to handle a real-world constraint the base RL policy doesn't cover.",
    ],
    challenges: [
      "Keeping two simulation instances synchronized and directly comparable in real time.",
      "Tuning the reward function so the agent optimizes for wait time without destabilizing traffic flow.",
      "Integrating emergency preemption without conflicting with the learned policy.",
    ],
    lessonsLearned: [
      "A reinforcement learning result is only trustworthy if the baseline comparison is run under identical, controlled conditions.",
      "Taking a project from hackathon MVP to published research meant re-validating assumptions that were fine for a demo but not for a paper.",
    ],
    futureImprovements: [
      "Extend the grid topology to a larger, city-scale network.",
      "Explore multi-agent RL for coordinated signal control across intersections.",
    ],
  },
  {
    slug: "virtual2reality",
    name: "Virtual2Reality",
    oneLiner:
      "A production enquiry website built end-to-end for a real estate firm in about a month.",
    tech: ["Web Technologies", "Lightweight Backend", "Deployment"],
    demo: "https://virtual2reality.in",
    featured: true,
    overview:
      "A client project: a real estate enquiry website built and deployed end-to-end in about a month, based on a real firm's requirements — from backend logic through deployment and client coordination.",
    problem:
      "The client needed a way to capture and organize property enquiries from site visitors without the overhead of a full CRM — something simple, reliable, and easy for non-technical staff to use.",
    solution:
      "Build a lightweight backend that captures enquiries directly into structured Excel records, avoiding unnecessary infrastructure while still giving the client a usable, organized output they could act on immediately.",
    techStack: ["HTML/CSS/JS", "Lightweight backend", "Excel-based data capture"],
    architecture:
      "A simple frontend enquiry form submits to a lightweight backend service, which structures and appends each submission to an Excel-based record store the client can open directly — no database or admin panel required.",
    engineeringDecisions: [
      "Excel-based output chosen over a full database, matching the client's actual technical needs rather than over-engineering the solution.",
      "Focused scope: ship a working, deployed product in a short timeline rather than a feature-heavy demo.",
    ],
    challenges: [
      "Translating informal client requirements into a concrete technical spec.",
      "Keeping the backend simple while still making submissions reliable and structured.",
    ],
    lessonsLearned: [
      "The right technical solution matches the client's actual workflow, not the most sophisticated option available.",
    ],
    futureImprovements: [
      "Add a lightweight admin view for the client to browse enquiries without opening Excel.",
      "Add basic form validation and spam prevention.",
    ],
  },
  {
    slug: "finance-one",
    name: "Finance_one",
    oneLiner:
      "A backend-first finance platform focused on scalable architecture and AI integration.",
    tech: ["Node.js", "PostgreSQL", "Redis", "Docker"],
    featured: true,
    placeholder: true,
    overview:
      "Finance_one is an in-progress finance platform designed around a backend-first architecture. The project prioritizes correctness, scalability, and clean data modeling before any AI features are layered on top.",
    problem:
      "Most personal finance tools trade off correctness for a polished UI. Financial data needs a data model that can survive schema changes, support auditability, and scale with usage.",
    solution:
      "Design the backend and data model first: normalized schemas, transactional integrity, and a clean API layer, before introducing any AI-assisted features such as spending insights or forecasting.",
    techStack: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker"],
    architecture:
      "Service-oriented backend with a clear separation between the ingestion layer, the core ledger service, and a read-optimized reporting layer. AI features will sit behind the reporting layer as a separate service.",
    engineeringDecisions: [
      "Backend-first development to avoid rebuilding the data model after the fact.",
      "PostgreSQL for transactional integrity over a NoSQL alternative.",
      "AI integration planned as an additive layer, not a core dependency.",
    ],
    challenges: [
      "Designing a ledger schema that stays consistent under concurrent writes.",
      "Keeping the reporting layer fast without duplicating business logic.",
    ],
    lessonsLearned: [
      "Data modeling decisions made early are the hardest to reverse later.",
    ],
    futureImprovements: [
      "Add AI-powered spending insights.",
      "Add forecasting based on historical transaction data.",
      "Public API for third-party integrations.",
    ],
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  type: "Internship" | "Client Project" | "Hackathon";
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineering Intern",
    org: "Actima Software, Pune",
    period: "Jan 2025 — Aug 2025",
    type: "Internship",
    points: [
      "Developed backend features and REST API endpoints for internal applications, handling database integration and backend–frontend communication.",
      "Contributed to real-world development workflows including version control, code reviews, and debugging in a production environment.",
    ],
  },
  {
    role: "Real Estate Enquiry Website",
    org: "Virtual2Reality — Client Project",
    period: "1 month · 2024",
    type: "Client Project",
    points: [
      "Built and deployed a production enquiry website end-to-end for a real estate firm in about a month.",
    ],
  },
  {
    role: "Smart Traffic Management System",
    org: "Smart India Hackathon 2025 — Team Lead",
    period: "2025",
    type: "Hackathon",
    points: [
      "Led Team VEIG_1 through SIH 2025 screening rounds to college-level selection, building and presenting a D-DQN reinforcement learning traffic signal system.",
      "The project later became a peer-reviewed published paper.",
    ],
  },
];

export const publication = {
  title:
    "Adaptive Urban Traffic Signal Optimization Using Reinforcement Learning: A D-DQN Approach",
  authors: "Prof. P.R. Patil, Sumedh Gaikwad, Nimish Darne, Yash Joshi",
  journal: "International Journal of Innovative Research in Technology (IJIRT)",
  info: "Vol. 12, Issue 11, pp. 14500–14513 · April 2026 · ISSN: 2349-6002",
  url: "https://ijirt.org/",
};

export type TechGroup = { label: string; items: string[] };

export const technologies: TechGroup[] = [
  { label: "Languages", items: ["JavaScript", "TypeScript", "Python", "Java", "C", "C++", "SQL"] },
  { label: "Frontend", items: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Responsive Web Design"] },
  { label: "Backend", items: ["Node.js", "Express.js", "FastAPI", "RESTful APIs", "WebSocket (Socket.io)", "Authentication (JWT)", "MVC Architecture"] },
  { label: "Databases & ORM", items: ["PostgreSQL", "MongoDB", "Prisma ORM"] },
  { label: "AI / Machine Learning", items: ["PyTorch", "Reinforcement Learning", "Machine Learning Fundamentals", "Model Integration", "Inference Pipelines"] },
  { label: "Tools & Platforms", items: ["Git", "GitHub", "Postman", "Vercel", "Render", "VS Code", "npm/pnpm", "SUMO", "TraCI"] },
];

export const education = {
  degree: "B.E. Computer Engineering — Honors: Artificial Intelligence & Machine Learning",
  school: "Savitribai Phule Pune University (SPPU)",
  period: "2022 — 2026",
  sgpa: "SGPA: 9.47 (latest semester)",
  cgpa: "CGPA: 8.33 (overall, so far)",
};

export const certifications = [
  {
    name: "Full Stack Web Development — upGrad",
    info: "~10-month program covering the MERN stack, Data Structures & Algorithms, and professional software development practices.",
    period: "2024 — 2025",
    url: "https://upgrad.certificate.givemycertificate.com/c/2d5285df-4327-4f58-be58-8c063383a459",
  },
];
