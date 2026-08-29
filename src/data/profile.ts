export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  x: string;
  resumeUrl: string;
  location: string;
}

export interface StatusData {
  state: string;
  focus: string;
  role: string;
}

export interface SummaryData {
  paragraphs: string[];
}

export interface CurrentData {
  building: {
    name: string;
    description: string;
  };
  learning: string[];
  exploring: string[];
  statusNote: string;
}

export const profileData: ProfileData = {
  name: "Sumedh Gaikwad",
  title: "Backend Software Engineer",
  tagline:
    "Backend and systems software engineer building high-integrity architectures, real-time synchronization pipelines, and machine learning systems.",
  email: "sumedhgaikwad.dev@gmail.com",
  github: "https://github.com/SumedhGaikwad03",
  linkedin: "https://www.linkedin.com/in/sumedh-gaikwad-8b95292a6/",
  x: "https://x.com/Suuumedhh",
  resumeUrl: "/resume.pdf",
  location: "Pune, India",
};

export const statusData: StatusData = {
  state: "OPEN_TO_WORK",
  focus: "BACKEND → AI",
  role: "Backend / AI-ML Engineering",
};

export const summaryData: SummaryData = {
  paragraphs: [
    "I'm a backend-focused software engineer who specializes in distributed APIs, relational and document databases, and system architecture — with hands-on research experience applying reinforcement learning to cyber-physical systems.",
    "I've shipped production backend features during a software engineering internship, delivered a client project end-to-end, and taken a hackathon idea through to a peer-reviewed publication. I focus on building high-integrity systems where data precision, concurrency handling, and security boundaries are treated as first-class invariants.",
  ],
};

export const currentData: CurrentData = {
  building: {
    name: "Finance One",
    description:
      "A backend-first personal finance platform engineered for ledger correctness, budget locking, and bounded pgvector semantic queries.",
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
