# SUMEDH GAIKWAD — ENGINEERING PORTFOLIO ARCHITECTURE & HANDOFF

This document serves as the authoritative architectural handoff for the Sumedh Gaikwad Engineering Portfolio codebase. It provides a complete map of the application's runtime lifecycle, data layer, state management, presentation modes, and extension patterns.

---

## 1. Project Purpose

The portfolio is designed as an interactive, proof-first engineering diagnostic system. Rather than behaving as a static resume or a generic marketing landing page, it communicates **how Sumedh engineers systems** through dual abstraction viewing modes:
* **STANDARD Mode (Recruiter / Fast Scan):** Delivers clean, scannable career history, verified metrics, project outcomes, and core technologies within a 15–30 second evaluation window.
* **ENGINEERING Mode (Deep Technical Inspection):** Exposes formal architectural invariants, concurrency models, security boundaries, step-synchronized simulation telemetry, and an interactive CLI command interface.

---

## 2. High-Level Architecture

The application is built on React 19 + TypeScript + Vite with Tailwind CSS v4 and Framer Motion:

```text
┌──────────────────────────────────────────────────────────────────────────┐
│                                App.tsx                                   │
│  ├── ViewModeProvider (localStorage persistence: "portfolio_view_mode")  │
│  │   ├── BrowserRouter                                                   │
│  │   │   ├── CustomCursor (Desktop requestAnimationFrame precision dot)  │
│  │   │   ├── PortfolioBoot (Initial ~1.3s non-blocking runtime reveal)   │
│  │   │   ├── ViewModeTransition (Deliberate terminal progress overlay)   │
│  │   │   ├── PortfolioMascot (Autonomous daemon:pid_4096 discovery egg)  │
│  │   │   ├── KeyboardShortcutsModal (Global key interface & Konami toast)│
│  │   │   ├── Nav (Sticky mode-aware header & segmented toggle)          │
│  │   │   ├── Routes:                                                     │
│  │   │   │   ├── Home.tsx (Mode-stratified section composition)          │
│  │   │   │   └── ProjectDetail.tsx (React.lazy() loaded dossier pages)   │
│  │   │   └── Footer                                                      │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 3. App Entry Flow & Lifecycle

1. **DOM Hydration:** `index.html` loads and initializes `src/main.tsx`.
2. **View Mode Initialization:** `ViewModeProvider` reads `localStorage.getItem("portfolio_view_mode")`. Defaults to `"STANDARD"`.
3. **Session Boot Check:** `PortfolioBoot` inspects `sessionStorage.getItem("portfolio_boot_seen")`:
   - If first visit in browser session: Displays the progressive ~1.3s runtime boot overlay while the application hydrates beneath.
   - If returning session or direct deep-link route (e.g. `/projects/finance-one`): Bypasses boot immediately.
4. **Active Route Mount:** `Home.tsx` evaluates `mode` and conditionally renders the section hierarchy.

---

## 4. Routing Architecture

Managed via `react-router-dom` v7:
* `/`: `Home.tsx` (Homepage with mode-aware section composition).
* `/projects/:slug`: `ProjectDetail.tsx` (Deep technical case studies code-split via `React.lazy()` and wrapped in `<Suspense>`).
* `*`: Fallback redirecting to `/`.
* Direct hash scrolling (`#about`, `#projects`, `#experience`, `#systems-map`, `#technical-dna`, `#terminal`, `#contact`) is handled via standard DOM IDs with `scroll-mt-16`.

---

## 5. Standard vs. Engineering Modes

The two modes represent two distinct levels of abstraction derived from the exact same underlying canonical data:

| Dimension | STANDARD Mode (Recruiter View) | ENGINEERING Mode (Inspection View) |
| :--- | :--- | :--- |
| **Primary Goal** | 15–30s fast scanning, verified outcomes, stack | Deep architectural invariants, security, concurrency |
| **Section Count** | 7 Primary Sections + Unlock Banner | 10 Technical Sections |
| **Section Ordering** | `Hero` &rarr; `Summary` &rarr; `Projects` &rarr; `Experience` &rarr; `Tech` &rarr; `Academics` &rarr; `Current` &rarr; `Contact` | `Hero/Probe` &rarr; `Terminal` &rarr; `Systems Map` &rarr; `Technical DNA` &rarr; `Projects` &rarr; `Experience` &rarr; `Tech` &rarr; `Academics` &rarr; `Current` &rarr; `Contact` |
| **Project Cards** | Problem, Solution, Key Metric, Stack, Probes | System Model, Invariants, Security, Concurrency, Probes |
| **Experience** | 3 Verified Accomplishment Bullets | `// ENGINEERING_DELIVERY_CONTEXT` (Systems, Architecture, Surface) |
| **Navigation** | `.about`, `.projects`, `.experience`, `.tech`, `.contact` | `.terminal`, `.systems`, `.dna`, `.projects`, `.experience`, `.contact` |

---

## 6. ViewModeContext Architecture

* **Location:** `src/context/ViewModeContext.tsx`, `useViewMode.ts`, `viewModeTypes.ts`
* **State Values:**
  - `mode: ViewMode` (`"STANDARD"` | `"ENGINEERING"`)
  - `isTransitioning: boolean`
  - `transitionTarget: ViewMode | null`
* **API:**
  - `setMode(newMode)`: Initiates transition timer ($4800\text{ms}$ for STD &rarr; ENG, $2800\text{ms}$ for ENG &rarr; STD) or switches immediately if `prefers-reduced-motion` is active.
  - `toggleMode()`: Toggles between Standard and Engineering.
* **Storage Key:** `portfolio_view_mode` in `localStorage`.

---

## 7. ViewModeTransition Component

* **Location:** `src/components/ViewModeTransition.tsx`
* **Behavior:** Fixed overlay (`z-50`) triggered when `isTransitioning === true`.
* **Standard &rarr; Engineering Sequence (~4800ms):**
  1. `$ mode --switch ENGINEERING // VIEW MODE CHANGE DETECTED`
  2. `> switching abstraction layer... (600ms)`
  3. `> loading system architecture... (1200ms)`
  4. `> mounting capability graph... (1800ms)`
  5. `> loading engineering principles... (2500ms)`
  6. `> exposing invariant specifications... (3200ms)`
  7. `> enabling technical telemetry... (3900ms)`
  8. `[████████████████████] 100% // MODE::ENGINEERING READY (4400ms)`
* **Engineering &rarr; Standard Sequence (~2800ms):**
  1. `$ mode --switch STANDARD`
  2. `> restoring standard abstraction... (600ms)`
  3. `> collapsing telemetry & invariant specs... (1200ms)`
  4. `> restoring recruiter overview... (1900ms)`
  5. `[████████████████████] 100% // MODE::STANDARD READY (2400ms)`

---

## 8. PortfolioBoot Component

* **Location:** `src/components/PortfolioBoot.tsx`
* **Behavior:** First-visit session overlay (`sessionStorage: portfolio_boot_seen`).
* **Duration:** $3500\text{ms}$ on desktop, $2200\text{ms}$ on mobile ($<640\text{px}$). Immediate ($0\text{ms}$) on `prefers-reduced-motion`.
* **Execution:** Renders terminal log lines (`initializing runtime...`, `loading project registry...`, `loading engineering profile...`, `mounting interface...`, `system status... READY`), then smoothly fades to reveal the already-rendered Standard portfolio.

---

## 9. PortfolioMascot Component

* **Location:** `src/components/PortfolioMascot.tsx` & `src/data/mascotTips.ts`
* **Entity:** Autonomous $22\text{px} \times 22\text{px}$ daemon (`daemon:pid_4096`) wandering in safe viewport perimeter margins (`x: 6–12%` or `86–94%`, `y: 78–92%`).
* **Dynamic Clamping:** Tooltip aligns to right edge if `x >= 50%` and left edge if `x < 50%`, with multi-line natural text wrapping and zero clipping.
* **Mode-Specific Actions:**
  - `[ SWITCH TO ENGINEERING ]`: Calls `setMode("ENGINEERING")`.
  - `[ OPEN TERMINAL ]`: Smoothly scrolls to `#terminal`.
  - `[ VIEW PROJECTS ]`: Smoothly scrolls to `#projects`.
  - `[ VIEW SYSTEMS ]`: Smoothly scrolls to `#systems-map`.

---

## 10. TerminalInterface Component

* **Location:** `src/components/TerminalInterface.tsx`
* **Commands Supported:**
  - `help`: Lists all available commands.
  - `whoami`: Professional positioning and bio.
  - `projects` / `ls`: Lists verified projects with status and domain.
  - `open <slug>`: Navigates directly to project dossier (`/projects/:slug`).
  - `systems`: Summarizes the 6 capability domains.
  - `dna`: Displays the 5 engineering principles.
  - `stack`: Outputs categorized language and backend technologies.
  - `status`: Displays current availability and engineering focus.
  - `contact`: Outputs email, LinkedIn, and GitHub links.
  - `mode [std|eng]`: Switches viewing mode directly from the CLI.
  - `clear`: Clears command output history.
* **Features:** Arrow up/down command history recall, auto-scroll to bottom, quick shortcut chips.

---

## 11. Project Case Study & Technical Dossier Architecture

The portfolio features four canonical systems, each with dedicated deep architectural dossiers:
1. **Finance One (`finance-one`):** 5-tier Express/Prisma REST backend enforcing Decimal arithmetic and budget locking with pgvector semantic query gating.
   - Component: `src/components/finance-one/FinanceOneDossier.tsx`
   - Key Probes: `FinanceIntegrityProbe.tsx` (simulates floating-point drift vs Decimal precision & budget immutability), `SystemArchitectureDiagram.tsx`, `TransactionQueryFlow.tsx`.
2. **Atrio (`atrio`):** Dual-channel collaborative workspace pairing Express REST persistence with stateful Socket.io and in-memory connection-counted presence.
   - Component: `src/components/atrio/AtrioDossier.tsx`
   - Key Probes: `AtrioPresenceProbe.tsx` (simulates multi-tab connection count map preventing presence flapping), `AtrioArchitectureDiagram.tsx`, `RealtimeSyncFlow.tsx`.
3. **Virtual2Reality (`virtual2reality`):** 6-tier commercial modular monolith featuring BigInt paise currency modeling and SSRF-hardened DNS pre-flight scrapers.
   - Component: `src/components/virtual2reality/Virtual2RealityDossier.tsx`
   - Key Probes: `SSRFDefenseProbe.tsx` (simulates DNS preflight IP resolution blocking RFC 1918 subnets), `CurrencyModelingSpotlight.tsx`, `PublicationBoundaryDiagram.tsx`.
4. **Smart Traffic Management System (`smart-traffic-management-system`):** Research platform co-orchestrating two step-locked Eclipse SUMO simulations at 0.1s ticks with PyTorch DDQN neural policy controllers.
   - Component: `src/components/smart-traffic/SmartTrafficDossier.tsx`
   - Key Probes: `SimulationSyncProbe.tsx` (simulates TraCI dual-clock lockstep step advancement), `DDQNStateExplorer.tsx`, `SafetyInvariantPanel.tsx`, `EmergencyPreemptionFlow.tsx`.

### Dossier Design & Hierarchy
* **Routing:** `/projects/:slug` loaded via `React.lazy()` in `App.tsx` and resolved in `ProjectDetail.tsx`.
* **Universal Cross-Dossier Navigation:** Every dossier ends with `ProjectNavigation.tsx` offering previous/next project stepping and a direct return link to `#projects` on the home page.
* **Progressive Technical Disclosure:** Key metrics, architecture diagrams, verified decision tradeoffs, and interactive simulation probes are structured sequentially to allow both rapid evaluation and exhaustive code verification.

---

## 12. Project Evidence System

* **Location:** `src/data/projectEvidence.ts`
* Strongly-typed matrix mapping each project slug to:
  - `standardProof`: `problemBrief`, `solutionBrief`, `keyMetric` (`value` + `label`).
  - `engineeringSpecs`: `systemModel`, `architecture`, `invariant`, `securityBoundary`, `concurrencyState`, `aiBoundary`, `implementationEvidence`.
* Rendered dynamically inside `src/components/Projects.tsx` based on `mode`.

---

## 13. Data Architecture Map

```text
src/data/
├── profile.ts          → ProfileData, StatusData, SummaryData, CurrentData
├── projects.ts         → Project canonical array & case-study narratives
├── projectEvidence.ts  → ProjectEvidence matrix (Standard Proof vs Engineering Dossier)
├── experience.ts       → ExperienceItem canonical career timeline & delivery context
├── academics.ts        → EducationData, CertificationData, PublicationData
├── technologies.ts     → TechCategory array with coreItems vs full surface
├── mascotTips.ts       → MascotTip array & action routing contracts
├── content.ts          → Unified re-export hub for backward compatibility
└── index.ts            → Data barrel export
```

---

## 14. Navigation Architecture

* **Desktop Header (`Nav.tsx`):**
  - Left: Brand link `~/sumedh`.
  - Center: Mode-dependent section links (`.about`, `.projects`... in STD; `.systems`, `.dna`... in ENG).
  - Right: High-contrast `[ STD | ENG ]` segmented toggle + `[ RESUME ↗ ]` button.
* **IntersectionObserver:** Tracks active sections on scroll with `-20% 0px -65% 0px` root margins.
* **Mobile Drawer:** Displays all mode-relevant sections with numbering and direct resume access.

---

## 15. Responsive Breakpoint Standards

* `320px – 390px` (Mobile): Single-column stacks, full tap targets ($44\text{px}$), mascot disabled (`hover: none`), compact boot sequence ($750\text{ms}$).
* `768px` (Tablet): Two-column grids for Academics and Technologies, side-by-side action buttons.
* `1024px – 1440px` (Desktop): Full systems map interactive matrix, hover-reactive telemetry fragments, sticky navigation.
* `1920px` (Ultrawide): Centered `max-w-5xl` container with clean margin clamping and no horizontal overflow.

---

## 16. Accessibility Conventions

* **Semantic HTML:** Native `<nav>`, `<main>`, `<section>`, `<aside>`, `<header>`, `<footer>`.
* **Keyboard Accessibility:** All buttons and interactive links carry visible `:focus-visible` outline rings.
* **ARIA Semantics:** `aria-pressed` on mode toggles, `aria-expanded` on accordion drawers, `aria-live="polite"` on terminal outputs, and `aria-hidden="true"` on decorative visual layers.

---

## 17. Reduced-Motion Safeguards

* All animated components check `window.matchMedia("(prefers-reduced-motion: reduce)").matches`.
* When reduced motion is enabled:
  - `PortfolioBoot`: Bypasses sequence immediately.
  - `ViewModeTransition`: Switches mode instantaneously without delay.
  - `PortfolioMascot`: Unmounts completely.
  - Cursor telemetry: Disables mouse tracking and parallax translation.

---

## 18. Animation & Styling Conventions

* **Theme Variables:** Defined in `src/index.css` (`--color-bg`, `--color-surface`, `--color-terminal`, `--color-accent`, `--color-ink`, `--color-slate`).
* **Typography:** `Geist Sans` for UI text, `Geist Mono` / `JetBrains Mono` for code, telemetry, and terminal elements.
* **Motion:** Framer Motion with standard `easeOut` curves and durations between $0.15\text{s} - 0.45\text{s}$.

---

## 19. How to Add a New Project

1. Add the project narrative record to `src/data/projects.ts`.
2. Add the corresponding proof and invariant entry to `PROJECT_EVIDENCE` in `src/data/projectEvidence.ts`.
3. Add telemetry fragments to `PROJECT_TELEMETRY` in `src/components/Projects.tsx`.
4. (Optional) Create an interactive probe component under `src/components/<slug>/` and mount inside `Projects.tsx`.
5. Run `npm run build && npm run lint` to verify.

---

## 20. How to Update Resume / Career Information

1. Update the authoritative entries in `src/data/experience.ts`, `src/data/academics.ts`, or `src/data/technologies.ts`.
2. Update the resume PDF in `public/resume.pdf`.
3. All components (`Experience.tsx`, `Academics.tsx`, `Technologies.tsx`, `Nav.tsx`, `Contact.tsx`) update automatically from the canonical data modules.

---

## 21. How to Update Engineering Evidence

1. Locate the project entry in `src/data/projectEvidence.ts`.
2. Edit `engineeringSpecs` fields: `systemModel`, `architecture`, `invariant`, `securityBoundary`, `concurrencyState`, `aiBoundary`, `implementationEvidence`.
3. Changes immediately reflect in the Engineering Mode dossier tables and terminal queries.

---

## 22. How to Modify Standard Presentation

1. To change recruiter-facing card metrics, modify `standardProof` in `src/data/projectEvidence.ts`.
2. To change standard section ordering, modify `Home.tsx` inside the `mode === "STANDARD"` branch.
3. To change standard header navigation links, modify `STANDARD_LINKS` in `src/components/Nav.tsx`.

---

## 23. How to Modify Engineering Presentation

1. To change engineering dossier layouts, modify `ProjectCardItem` in `src/components/Projects.tsx`.
2. To change engineering section ordering, modify `Home.tsx` inside the `mode === "ENGINEERING"` branch.
3. To change engineering header navigation links, modify `ENGINEERING_LINKS` in `src/components/Nav.tsx`.

---

## 24. How Mode-Specific Section Ordering Works

Inside `src/pages/Home.tsx`, the layout is conditionally rendered using `useViewMode()`:
* In `STANDARD` mode: `Hero` &rarr; `Summary` &rarr; `Projects` &rarr; `Experience` &rarr; `Technologies` &rarr; `Academics` &rarr; `Current` &rarr; `Unlock Banner` &rarr; `Contact`.
* In `ENGINEERING` mode: `Hero/Probe` &rarr; `Terminal` &rarr; `SystemsMap` &rarr; `TechnicalDNA` &rarr; `Projects` &rarr; `Experience` &rarr; `Technologies` &rarr; `Academics` &rarr; `Current` &rarr; `Contact`.

---

## 25. Build & Lint Commands

```bash
# Type check and build client production assets
npm run build

# Run fast Oxlint static analysis
npm run lint

# Start local development server
npm run dev
```

---

## 26. Invariants & Constraints (Do Not Break)

1. **Source Repository Isolation:** The external project repositories (`Smart-Traffic-management-system-BE`, `notesy`, `virtual2reality`) must remain strictly untouched and read-only.
2. **Single Source of Truth:** Never hardcode project facts, metrics, or career history directly inside JSX components. Always import from `src/data/`.
3. **No Heavy Animation Libraries:** Do not add Three.js, GSAP, Canvas, or WebGL libraries. Maintain the lightweight React + Framer Motion / CSS infrastructure.
4. **Standard Default:** `STANDARD` mode must always remain the initial default viewing mode.
5. **No Forced Sound or Full-Screen Interruptions:** The portfolio must remain a calm, professional engineering workstation experience.

---

## 27. Easter Egg & Hidden Interaction System

### Architecture
The Easter egg registry and progression milestones are centralized in `src/data/easterEggs.ts`, with keyboard listening managed in `src/components/KeyboardShortcutsModal.tsx` and interactive command resolution inside `src/components/TerminalInterface.tsx` and `src/components/PortfolioMascot.tsx`.

### Undocumented Terminal Commands
* **`whoami --deep` (or `-d`):** Renders an in-depth breakdown of engineering bias (`correctness > cleverness`, `evidence > claims`, `explicit state > hidden magic`, `boring infrastructure > mysterious infrastructure`), primary systems, and current architectural objective.
* **`sudo hire sumedh` (or `sudo hire`, `hire`):** Simulates a playful recruiter access check bypassing authorization, verifying systems and engineering evidence, and presenting direct email/LinkedIn contact buttons.
* **`status --verbose` (or `-v`):** Exposes system diagnostics along with human factor indicators (`sleep: DEGRADED`, `coffee: REQUIRED`, `deadlines: PRESENT`, `bugs: INEVITABLE`, `confidence: HIGH`).
* **`open 404` (or `project-404`, `classified`):** Unveils a classified fictional project acknowledging that the user discovered an unindexed sector, with a button to return to known systems.

### Mascot Interaction Progression
`PortfolioMascot.tsx` tracks session clicks (`clickCountRef`) to reward continuous curiosity at specific thresholds:
* **3 clicks:** `> You've clicked me 3 times. Checking your clearance level...`
* **7 clicks:** `> You've clicked me 7 times. This is becoming a concerning use of your time.`
* **12 clicks:** `> Okay. I like you. You're actually exploring.`
* **18+ clicks:** `HUMAN CURIOSITY INDEX: 97.4% // Acceptable engineer detected.`

### Keyboard Shortcuts Modal & Konami Sequence
* **Shortcut Panel (`?` or Shift+/):** Opens a fast keyboard interface documenting navigation keys:
  - `[T]` &rarr; Jump to Terminal workstation
  - `[E]` &rarr; Switch to Engineering Mode
  - `[S]` &rarr; Switch to Standard Mode
  - `[R]` &rarr; Open verified Resume (PDF)
  - `[?]` &rarr; Toggle shortcuts modal
  - `[ESC]` &rarr; Close active overlays
* **Konami Legacy Sequence (`↑ ↑ ↓ ↓ ← → ← → B A`):** Triggers a subtle notification acknowledging `// developer mode++ [ 30 LIVES GRANTED • ZERO PRODUCTION OVERHEAD ]`.

### P2.22 — Terminal UX & Daemon Status Easter Egg
* **Terminal Scroll Isolation:** Replaced window-level `scrollIntoView()` with container-level `outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight`, and added `preventScroll: true` on input focus. This ensures pressing Enter or executing commands never jumps or displaces the document scroll position while keeping the terminal visually anchored.
* **Daemon Status Reveal:** Hovering continuously for 2.0s over `● SYSTEM READY` during the `PortfolioBoot` sequence triggers a subtle reveal of `daemon: curious`. Moving the pointer away before 2.0s cancels the timer, and re-entry restarts it fresh.
* **Reduced Motion & Privacy:** Respects `prefers-reduced-motion` and operates with zero analytics, tracking, or network calls.

### Custom Cursor & Hero Identity Architecture
* **Direct DOM & requestAnimationFrame Cursor:** Custom cursor operates with zero React state updates on mouse movement, updating DOM transforms directly through `requestAnimationFrame`. Center hotspot tracks hardware pointer at 1:1 with zero lag, while a subtle reactive orbit ring scales smoothly on interactive targets without text or floating character artifacts. The native pointer is hidden only on desktop fine-pointer devices via `html.has-custom-cursor`.
* **Terminal Hero Identity Reveal:** Progressively reveals `"Sumedh Gaikwad"` across ~1.4s with a temporary terminal pulse caret that gracefully dismisses upon completion. Layout footprint is reserved by an invisible anchor element to guarantee zero vertical or horizontal layout shifts. Screen readers immediately read full semantic heading content via `aria-label`. Respects `prefers-reduced-motion: reduce` by presenting the complete name instantaneously.

### Safety & Privacy Guarantees
* **Zero Arbitrary Execution:** All terminal inputs are resolved deterministically against static React component templates.
* **No Password Collection:** Simulated sudo prompts never capture, store, or transmit user keystrokes.
* **Zero Network Tracking:** No external analytics, trackers, or cookies are utilized for Easter egg triggers.
* **Accessibility:** All global listeners ignore keyboard input while focused inside input fields, textareas, or selects. Escape key safely dismisses overlays.

