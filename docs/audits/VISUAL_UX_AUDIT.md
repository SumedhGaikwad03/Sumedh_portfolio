# Visual, Interaction, Responsive & UX Audit

**Target Repository:** `d:\chrome downloads\sumedh-portfolio`  
**Date:** August 2026  
**Auditor:** Antigravity AI Engineering Assistant  

---

## 1. Visual System Assessment

### Typography & Hierarchy
* **Primary Fonts:** `Inter` for prose and headings, `IBM Plex Mono` for technical labels, badges, snippets, and commands.
* **Hierarchy:** Clear distinction between section identifiers (`// 02`), page titles ($3\text{xl}$–$6\text{xl}$), section headers, and metadata chips.
* **Line Lengths:** Constrained with `max-w-3xl` and `max-w-2xl` wrappers to maintain comfortable reading spans ($65\text{–}75$ characters per line).

### Color & Contrast (Dark Mode Terminal System)
* **Background:** Deep obsidian `#0B0D0F` with subtle radial lighting and technical grid overlay (`rgba(255, 255, 255, 0.018)`).
* **Surface Hierarchy:**
  * Base Surface: `#111418` (`var(--color-surface)`)
  * Elevated Card: `#161A20` (`var(--color-surface-elevated)`)
  * Hover State: `#1A2027` (`var(--color-surface-hover)`)
* **Semantic Accents:**
  * Terminal Green `#7EE787`: Active status, command prompts, verified research, passing invariants.
  * Cyan Accent `#7AA2F7`: Active development badges, interactive feature indicators, external links.
* **Contrast Compliance:** All primary text (`#F2F4F5`) and muted text (`#8D969F`) exceed WCAG AA contrast standards ($\ge 4.5:1$ against surface backgrounds).

---

## 2. Homepage UX & First-Screen Scanability

### First Screen (0–10 Seconds)
```text
WHO              → Sumedh Gaikwad (Backend-focused Full Stack Engineer)
WHERE            → Pune, India // Open to Work
FOCUS            → High-integrity architectures, real-time sync, and ML systems
STATUS           → Currently building Finance One
NEXT ACTIONS     → [VIEW WORK] · [RESUME] · GitHub / LinkedIn / X / Email
```

### Selected Work Section (10–30 Seconds)
* **Category Filtering Added:**
  * `[ ALL (4) ]`
  * `[ FINANCIAL SYSTEMS (1) ]` &rarr; Highlights Finance One (Decimal correctness, budget locking, pgvector).
  * `[ REAL-TIME (1) ]` &rarr; Highlights Atrio (Dual-channel REST/WebSocket sync, connection-count presence).
  * `[ SECURITY & DOMAIN (1) ]` &rarr; Highlights Virtual2Reality (BigInt paise modeling, DNS SSRF defense).
  * `[ ML & RESEARCH (1) ]` &rarr; Highlights STMS (Dual SUMO simulation, PyTorch DDQN, safety invariants).
* **Domain Badges:** Every card features an explicit technical domain chip (`DOMAIN::FINANCIAL_LEDGER`, `DOMAIN::REAL_TIME_COLLAB`, `DOMAIN::COMMERCIAL_SECURITY`, `DOMAIN::CYBER_PHYSICAL_RL`) alongside its status badge.

---

## 3. Case-Study UX (3-Level Information Architecture)

All four project dossiers (**Finance One**, **Atrio**, **Virtual2Reality**, **Smart Traffic Management System**) strictly satisfy the 3-level comprehension model:

1. **Level 1 (5 Seconds — Identity & Angle):**
   * Taxonomic system header (`// DOSSIER::SYS_ARCH_01`, `// RESEARCH::TRAFFIC_CONTROL_01`).
   * Explicit status badges (`[MVP_1_READY]`, `[DEPLOYED_BETA]`, `[ACTIVE_DEVELOPMENT]`, `[PEER_REVIEWED_RESEARCH]`).
   * One-liner summary and tech stack chips.
2. **Level 2 (30 Seconds — Architecture & Results):**
   * Problem breakdown explaining physical and architectural constraints.
   * Interactive system architecture diagrams (5-tier backend, dual-channel sync, 6-tier modular monolith, lockstep dual simulation).
   * Verified performance metrics and empirical benchmarks.
3. **Level 3 (Deep Dive — Engineering Decisions & Invariants):**
   * Interactive state and flow visualizers (DDQN 25-state explorer, SSRF scraper pipeline, budget locking flow, presence state map).
   * Verified `DecisionCard` components with explicit **Decision**, **Why**, and **Tradeoff** sections.
   * "What the Experiment Taught Us" / Research limitations sections.
   * Honest milestone completion matrices.

---

## 4. Interaction Quality & Component Audits

| Component | Interactive State Feedback | Affordance & Accessibility |
| :--- | :--- | :--- |
| **DualSimulationDiagram** | Port switcher toggles between Port 8813 (Baseline) and Port 8814 (RL) with distinct border and glowing highlights. | Semantic `<button type="button">` with clear keyboard focus. |
| **DDQNStateExplorer** | Category list updates active feature slice, physical domain explanation, normalization formula, and tensor encoding. | Keyboard selectable with `ACTIVE` status indicator. |
| **SafetyInvariantPanel** | Interactive selector switches between `MIN_PHASE_STEPS`, `MAX_PHASE_STEPS`, and `STARVATION_LIMIT` with exact Python snippets. | High-contrast code displays with hazard prevention callouts. |
| **EmergencyPreemptionFlow** | 6-stage lifecycle ribbon tracks emergency vehicle detection through TraCI `moveTo()` teleport recovery. | Clear stage indicator and executing agent labels. |
| **PerformanceComparison** | Scenario toggle switches between isolated 4-way intersection and 3x3 urban arterial coordination boundary. | Trend arrows and delta percentages with domain explanation. |
| **SystemArchitectureDiagram** | 5-tier backend pipeline allows layer-by-layer inspection of responsibilities, invariants, and security rules. | Hover and click synchronized. |
| **SsrfScraperPipeline** | 4-step security pipeline walks through DNS pre-flight validation, IP blacklist filtering, and byte caps. | Visual warning and validation checkpoints. |

---

## 5. Responsive Audit

Tested across all key viewport widths:
* **Mobile (320px – 390px):**
  * All interactive explorer layouts collapse into single-column vertical stacks.
  * Code blocks and terminal outputs include `overflow-x-auto` to prevent horizontal viewport clipping.
  * Touch targets are sized at $\ge 36\text{px}$ height with adequate finger spacing.
* **Tablet (768px):**
  * Metric cards and decision cards organize into balanced 2-column grids.
* **Desktop (1024px – 1280px+):**
  * Side-by-side interactive explorers with persistent visual hierarchy and zero horizontal scrolling.

---

## 6. Accessibility & Navigation Quality

* **Scroll Restoration:** Added global `<ScrollToTop />` component ensuring route transitions to case studies automatically start at the top of the page ($y = 0$).
* **Focus Outlines:** Explicit `:focus-visible` styles with `1px solid var(--color-accent)` and `2px` offset.
* **Reduced Motion:** Full `@media (prefers-reduced-motion: reduce)` support in CSS, `CustomCursor.tsx`, and `TerminalLoader.tsx`.
* **Semantic Structure:** Native `<main>`, `<header>`, `<nav>`, `<article>`, `<section>`, and `<footer>` landmarks.

---

## 7. Performance & Build Status

* **Vite Production Build:** Completed in **401ms** with zero errors.
* **TypeScript Check:** Strict compilation passed with **zero errors**.
* **Linter (`oxlint`):** Passed with **zero errors and zero warnings**.
* **Zero External Bloat:** No unnecessary 3D canvas or heavy charting dependencies added; diagrams are built with performant CSS, SVG, and Lucide icons.

---

## 8. Summary of Changes Implemented

1. **Scroll-to-Top Navigation Fix:** Created and mounted `ScrollToTop.tsx` in `App.tsx` so case study transitions reset scroll position.
2. **Category Filter in Selected Work:** Implemented a lightweight filter bar in `Projects.tsx` (`ALL`, `FINANCIAL SYSTEMS`, `REAL-TIME`, `SECURITY & DOMAIN`, `ML & RESEARCH`).
3. **Explicit Domain Chips:** Added `DOMAIN::*` taxonomy tags to project card headers in `Projects.tsx`.
4. **Safety Invariant Copy Polish:** Corrected copy-paste reference in `SafetyInvariantPanel.tsx`.
5. **Hero Tagline & Summary Copy Refinement:** Elevated copy in `content.ts` to project an authoritative backend and systems engineer.
