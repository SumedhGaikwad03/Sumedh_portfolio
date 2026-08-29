# Sumedh Gaikwad
### Backend-focused Full Stack Engineer • Systems & Applied AI

> I build software systems with an obsession for correctness, architecture, and the details users actually notice.

<div align="left">
  <a href="https://sumedhgaikwad.com"><strong>🌐 Live Portfolio</strong></a> &bull;
  <a href="https://sumedhgaikwad.com/resume.pdf"><strong>📄 Resume (PDF)</strong></a> &bull;
  <a href="https://linkedin.com/in/sumedh-gaikwad"><strong>💼 LinkedIn</strong></a> &bull;
  <a href="https://github.com/SumedhGaikwad03"><strong>🐙 GitHub</strong></a> &bull;
  <a href="mailto:sumedhgaikwad03@gmail.com"><strong>📧 Email</strong></a>
</div>

---

## ⚡ The Dual-Mode Portfolio Architecture

This repository is built as a **dual-layer interactive software system**, serving two distinct audiences from a single canonical data architecture:

```text
STANDARD MODE (Recruiter-Oriented)
┌─────────────────────────────────────────────────────────────┐
│ Fast understanding in 30–60 seconds                         │
│ Summary → Selected Work → Experience → Stack → Contact      │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼  [ Deliberate Transition ]
ENGINEERING MODE (Technical Workstation)
┌─────────────────────────────────────────────────────────────┐
│ Deep architectural inspection                               │
│ Terminal → Systems Map → Technical DNA → Invariants → Probes │
└─────────────────────────────────────────────────────────────┘
```

* **Standard View:** A clear, concise, recruiter-friendly overview focusing on problem framing, delivered solutions, verified outcome metrics, and career timeline.
* **Engineering View:** A technical workstation that lowers the abstraction layer to expose mathematical invariants, concurrency models, security boundaries, capability matrices, and interactive simulation probes.

---

## 🎯 What This Portfolio Is

Rather than treating a portfolio as a static resume mirror, this project is engineered as an interactive product demonstrating production design disciplines:

* **Dual Viewing Modes:** Seamless toggling between high-level summary and low-level engineering specification.
* **Mode-Aware Navigation:** Header navigation and section indexing that adapt dynamically based on the active viewing layer.
* **Deliberate Transition Sequence:** A cinematic, data-driven transition logging the mounting of architecture and telemetry before rendering the engineering workstation.
* **Session-Aware Boot Sequence:** An intentional introductory terminal sequence for first-time desktop sessions that respects returning visitors and `prefers-reduced-motion`.
* **Interactive CLI Terminal (`sumedh@portfolio:~`):** A read-only command console for executing queries like `projects`, `systems`, `dna`, and `open <slug>`.
* **Deep Case Study Dossiers:** Dedicated technical dossiers for each canonical project with architecture diagrams, decision trade-offs, and cross-dossier pagination.
* **Client-Side Simulation Probes:** Live interactive widgets demonstrating specific system invariants (floating-point precision, presence counting, SSRF defense, and simulation step-synchronization).
* **Typed Modular Data Layer:** Centralized single-source-of-truth TypeScript records preventing state drift between standard cards, engineering tables, and terminal queries.
* **Accessibility & Motion Safeguards:** Keyboard focusability, semantic landmarks, ARIA live regions, and instantaneous fallback execution under reduced-motion preferences.

---

## 🏛️ Featured Engineering Systems

The portfolio showcases four verified systems with concrete architectural claims and proofs:

| System | Primary Domain | Core Architecture | Key Engineering Demonstrations |
| :--- | :--- | :--- | :--- |
| [**Finance One**](https://sumedhgaikwad.com/projects/finance-one) | Financial Ledgers & Transactions | 5-Tier Domain Monolith (Express &bull; PostgreSQL &bull; Prisma) | Strict `Prisma.Decimal` arithmetic eliminating IEEE-754 floating-point drift; `BudgetLockedError` domain boundary preventing post-closing record mutations; multi-tenant 404 anti-enumeration; pgvector 2560-dim intent routing with 0.70 confidence gating. |
| [**Atrio**](https://sumedhgaikwad.com/projects/atrio) | Real-Time Collaboration | Dual-Channel Architecture (Express 5 &bull; Socket.io &bull; MongoDB) | Dual-channel state isolation decoupling stateless HTTP CRUD from in-process WebSocket streams; in-memory `Map<roomId, Map<userId, socketCount>>` presence tracking eliminating multi-tab flicker; stateless JWT revocation via `passwordChangedAt` timestamp checking. |
| [**Virtual2Reality**](https://sumedhgaikwad.com/projects/virtual2reality) | Commercial Monolith & Security | 6-Tier Modular Monolith (React 19 &bull; Express 5 &bull; Prisma 7) | 64-bit `BigInt` paise normalization for zero currency roundoff; pre-flight DNS IP resolution blocking RFC 1918 private subnets and loopback addresses against SSRF; stateless memory buffer streaming to Cloudinary; multi-tier draft/live publication filtering. |
| [**Smart Traffic Management System**](https://sumedhgaikwad.com/projects/smart-traffic-management-system) | Cyber-Physical RL Optimization | Step-Locked Simulation (Python &bull; FastAPI &bull; SUMO &bull; PyTorch) | Dual parallel micro-simulation (`DualSimManager`) running Baseline and PyTorch DDQN in 0.1s lockstep across TraCI ports 8813 & 8814; 23.2% delay reduction on FHWA NGSIM US-101 demand; physical timing safety invariants (10s min hold, 60s starvation override); peer-reviewed research published in IJIRT. |

---

## 📐 Engineering Architecture

```text
                               ┌─────────────────────────┐
                               │         App.tsx         │
                               └────────────┬────────────┘
                                            │
                     ┌──────────────────────┴──────────────────────┐
                     │                                             │
          ┌──────────▼──────────┐                       ┌──────────▼──────────┐
          │   ViewModeProvider  │                       │    React Router     │
          │  (Standard / Eng)   │                       │  (Lazy Dossier View)│
          └──────────┬──────────┘                       └──────────┬──────────┘
                     │                                             │
        ┌────────────┴────────────┐                      ┌─────────┴─────────┐
        │                         │                      │   ProjectDetail   │
 ┌──────▼───────┐          ┌──────▼───────┐              ├───────────────────┤
 │ STANDARD     │          │ ENGINEERING  │              │ • FinanceOne      │
 ├──────────────┤          ├──────────────┤              │ • Atrio           │
 │ • Hero       │          │ • Hero/Probe │              │ • Virtual2Reality │
 │ • Summary    │          │ • Terminal   │              │ • SmartTraffic    │
 │ • Projects   │          │ • SystemsMap │              │ • Navigation      │
 │ • Experience │          │ • TechDNA    │              └───────────────────┘
 │ • Tech Stack │          │ • Projects   │
 │ • Academics  │          │ • Experience │
 │ • Current    │          │ • Tech Stack │
 │ • Contact    │          │ • Contact    │
 └──────────────┘          └──────────────┘
```

### Key Application Layers:
* **Context Layer (`src/context/`):** Manages `mode` state (`"STANDARD"` | `"ENGINEERING"`), transition clocks, and localStorage persistence.
* **Component Layer (`src/components/`):** Houses mode-aware section primitives, interactive simulation probes, the CLI terminal, and the autonomous mascot companion.
* **Page Layer (`src/pages/`):** Declarative composition hubs (`Home.tsx` for mode branching, `ProjectDetail.tsx` for deep dossier routing).
* **Data Layer (`src/data/`):** Centralized, strongly-typed single-source-of-truth records for profile, projects, invariants, experience, and technologies.

---

## 🛠️ Technology Stack

### Application Implementation
* **Framework & Runtime:** React 19, TypeScript, Vite
* **Styling & Design System:** Tailwind CSS v4, Custom CSS Variables, IBM Plex Mono, Inter
* **Animation & Interactions:** Framer Motion, Custom Canvas/SVG Schematics
* **Icons & Assets:** Lucide React
* **Static Analysis:** Oxlint

### Verified Systems Surface
* **Backend Frameworks:** Node.js, Express.js (v5), FastAPI (Python 3.13)
* **Databases & ORMs:** PostgreSQL, MongoDB, Prisma ORM (v7), pgvector, Mongoose
* **Real-Time & Micro-Simulation:** Socket.io, WebSockets, Eclipse SUMO, TraCI
* **Machine Learning:** PyTorch (Double Deep Q-Networks), Experience Replay, Huber Loss
* **DevOps & Infrastructure:** Docker, Git, Postman, Linux / Bash

---

## 💡 Design & Implementation Philosophy

1. **Recruiter Clarity in Standard Mode:** Deliver who I am, what I build, where I worked, and how to reach me within 30 seconds without diagnostic friction.
2. **Technical Depth in Engineering Mode:** Expose how systems work, what architectural trade-offs were made, and what invariants protect production stability.
3. **Evidence Over Generic Claims:** Replace vague buzzwords with concrete numbers, repository architectures, formal constraints, and reproducible proofs.
4. **Inspectable Decisions:** Every architecture diagram, decision card, and simulation probe must reflect real code and verified system behaviors.
5. **State-Communicative Interactions:** Visual transitions and hover states should communicate meaningful system context rather than decorative visual noise.
6. **Accessibility First:** Respect user motion settings, support full keyboard navigability, and maintain responsive fluidity from 320px mobile screens to ultrawide monitors.

---

## 🗄️ Single-Source-of-Truth Data Architecture

To prevent narrative and metric drift between standard cards, deep engineering tables, terminal queries, and case study dossiers, all content is maintained in modular TypeScript data files:

```text
src/data/
├── profile.ts          # Core identity, bio summary, location, and contact metadata
├── projects.ts         # Canonical project records, problem/solution narratives, and screenshots
├── projectEvidence.ts  # Typed matrix of Standard proof metrics and Engineering invariant specs
├── experience.ts       # Career history, verified accomplishment bullets, and delivery contexts
├── academics.ts        # Degree honors, credentials, certifications, and peer-reviewed research
├── technologies.ts     # Curated core stack and full engineering surface categories
└── mascotTips.ts       # Contextual discovery tips, prompt triggers, and action contracts
```

---

## 🎮 Interactive Engineering Features

```text
┌──────────────────────────────────────┐  ┌──────────────────────────────────────┐
│ ⌨️ Interactive CLI Terminal          │  │ 🕸️ Systems Architecture Map          │
│ Read-only workstation console for    │  │ Interactive graph mapping 6          │
│ running commands and opening systems │  │ capability domains across projects    │
└──────────────────────────────────────┘  └──────────────────────────────────────┘
┌──────────────────────────────────────┐  ┌──────────────────────────────────────┐
│ 🧬 Technical DNA Framework           │  │ 🔬 4 Live Simulation Probes          │
│ 5 core engineering profiles backed   │  │ Sandboxes demonstrating precision,    │
│ by concrete implementation threads   │  │ SSRF defense, presence, and lockstep │
└──────────────────────────────────────┘  └──────────────────────────────────────┘
┌──────────────────────────────────────┐  ┌──────────────────────────────────────┐
│ 🤖 Companion Daemon (pid_4096)       │  │ ⏳ Deliberate View Transitions       │
│ Autonomous wandering guide with      │  │ Cinematic progression logging the    │
│ contextual edge-clamped tips         │  │ change in system abstraction level   │
└──────────────────────────────────────┘  └──────────────────────────────────────┘
```

---

## 🧠 Engineering Mindset

> I don't want a portfolio that simply claims I know backend engineering. I want one where you can directly inspect the architectural decisions, constraints, and verified evidence.

---

## 📁 Repository Structure

```text
sumedh-portfolio/
├── docs/
│   └── audits/                   # Internal audit reports and interaction verifications
├── public/                       # Static assets and resume PDF
├── src/
│   ├── components/               # UI components, layout headers, and navigation
│   │   ├── atrio/                # Atrio architectural diagrams and presence probes
│   │   ├── finance-one/          # Finance One diagrams, decision cards, and probes
│   │   ├── smart-traffic/        # Traffic simulation diagrams and DDQN explorers
│   │   └── virtual2reality/      # V2R monolith diagrams and SSRF defense probes
│   ├── context/                  # ViewModeContext state provider and hooks
│   ├── data/                     # Typed data modules (single source of truth)
│   ├── pages/                    # Home and ProjectDetail routing views
│   ├── App.tsx                   # Top-level application router and suspense fallback
│   ├── index.css                 # Global design system variables and Tailwind styles
│   └── main.tsx                  # Application entry point
├── PORTFOLIO_HANDOFF.md          # 26-topic technical handoff & operational documentation
├── package.json
└── vite.config.ts
```

---

## 🚀 Local Setup & Development

```bash
# 1. Clone the repository
git clone https://github.com/SumedhGaikwad03/Sumedh_portfolio.git
cd Sumedh_portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Type check and build production bundle
npm run build

# 5. Run static lint analysis
npm run lint
```

---

## 🕵️ Hidden Layer

The portfolio contains a small set of intentionally undocumented interactions for visitors who explore beyond the primary interface:

* **Terminal Discovery Commands:** Undocumented flags and query tools embedded in the engineering console.
* **Keyboard Navigation Interface:** Fast jump shortcuts and a dedicated shortcut panel.
* **Companion Daemon Curiosity:** Interaction progression tracking for visitors exploring the ambient mascot.
* **Legacy Input Sequence:** Subtle acknowledgment of classic developer inputs.
* **Classified Project 404:** A fictional unindexed project node.

*Nothing in the hidden layer is required to evaluate the portfolio's verified work; it exists purely as a reward for curiosity.*

---

## 📌 Status

The portfolio is stable, feature-complete, and verified:
* **STANDARD Mode:** Recruiter-optimized fast-scan experience.
* **ENGINEERING Mode:** Deep technical workstation with interactive terminal, systems graph, and invariant dossiers.
* **Case Studies:** 4 exhaustive project deep-dives with interactive invariant probes.
* **Quality Assurance:** 0 build errors, 0 lint warnings, fully responsive across 320px–1920px viewports, and reduced-motion compliant.

---

## 📬 Contact & Links

* **Live Portfolio:** [sumedhgaikwad.com](https://sumedhgaikwad.com)
* **Resume:** [sumedhgaikwad.com/resume.pdf](https://sumedhgaikwad.com/resume.pdf)
* **LinkedIn:** [linkedin.com/in/sumedh-gaikwad](https://linkedin.com/in/sumedh-gaikwad)
* **GitHub:** [github.com/SumedhGaikwad03](https://github.com/SumedhGaikwad03)
* **Email:** [sumedhgaikwad03@gmail.com](mailto:sumedhgaikwad03@gmail.com)

---

<div align="center">
  <sub>Built to be read by recruiters. Built to be inspected by engineers.</sub>
</div>
