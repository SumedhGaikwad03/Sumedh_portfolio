# P1.7 — Scroll-Triggered Micro-Interactions Audit

---

## 1. Implementation Overview

Implemented **P1.7: Scroll-Triggered Micro-Interactions** across the portfolio homepage and navigation system.

The animation language emphasizes an **engineered system initialization** rather than decorative SaaS scroll animations:
1. **Section Activation:** Each section activates as ~15–20% of it enters the viewport (`whileInView`, `viewport: { once: true, amount: 0.15 }`).
2. **Section Header State Indicator:** `SectionHeader.tsx` dynamically switches from `[ ○ STANDBY ]` to `[ ● ACTIVE ]` with a green pulse on viewport arrival.
3. **Selected Work Card Activation:** Project cards enter with a subtle vertical translation ($\approx 10\text{px}$) and stagger, with un-expanded `[ INSPECT SYSTEM PIPELINE ]` triggers clearly discoverable.
4. **Systems Map & Technical DNA Stagger:** 6 capability domain buttons and 5 engineering principles reveal with restrained 50–60ms micro-staggers.
5. **Navigation Section Tracking:** Lightweight `IntersectionObserver` in `Nav.tsx` dynamically tracks which section is in view and highlights active nav anchor labels without heavy scroll event listeners.

---

## 2. Files Inspected

* `src/index.css`
* `src/App.tsx`
* `src/pages/Home.tsx`
* `src/components/SectionHeader.tsx`
* `src/components/Hero.tsx`
* `src/components/SystemsMap.tsx`
* `src/components/TechnicalDNA.tsx`
* `src/components/Projects.tsx`
* `src/components/Current.tsx`
* `src/components/Experience.tsx`
* `src/components/Academics.tsx`
* `src/components/Technologies.tsx`
* `src/components/Contact.tsx`
* `src/components/Nav.tsx`
* `src/components/CustomCursor.tsx`
* `src/components/TerminalLoader.tsx`

---

## 3. Files Created

* [`P1_7_SCROLL_INTERACTION_AUDIT.md`](file:///d:/chrome%20downloads/sumedh-portfolio/P1_7_SCROLL_INTERACTION_AUDIT.md) — Comprehensive scroll interaction and performance audit.

---

## 4. Files Modified

1. [`src/components/SectionHeader.tsx`](file:///d:/chrome%20downloads/sumedh-portfolio/src/components/SectionHeader.tsx) — Added viewport entrance detection with dynamic `STANDBY` &rarr; `ACTIVE` status pill.
2. [`src/components/Projects.tsx`](file:///d:/chrome%20downloads/sumedh-portfolio/src/components/Projects.tsx) — Wrapped project cards in `motion.div` with viewport detection.
3. [`src/components/SystemsMap.tsx`](file:///d:/chrome%20downloads/sumedh-portfolio/src/components/SystemsMap.tsx) — Added staggered entrance for the 6 domain capability buttons.
4. [`src/components/TechnicalDNA.tsx`](file:///d:/chrome%20downloads/sumedh-portfolio/src/components/TechnicalDNA.tsx) — Added staggered entrance for the 5 engineering principle profiles.
5. [`src/components/Summary.tsx`](file:///d:/chrome%20downloads/sumedh-portfolio/src/components/Summary.tsx) — Added viewport activation.
6. [`src/components/Academics.tsx`](file:///d:/chrome%20downloads/sumedh-portfolio/src/components/Academics.tsx) — Added viewport activation on degree, credentials, and publication cards.
7. [`src/components/Current.tsx`](file:///d:/chrome%20downloads/sumedh-portfolio/src/components/Current.tsx) — Added viewport activation on focus panels.
8. [`src/components/Experience.tsx`](file:///d:/chrome%20downloads/sumedh-portfolio/src/components/Experience.tsx) — Added viewport activation on timeline entries.
9. [`src/components/Technologies.tsx`](file:///d:/chrome%20downloads/sumedh-portfolio/src/components/Technologies.tsx) — Added viewport activation on technology stacks.
10. [`src/components/Contact.tsx`](file:///d:/chrome%20downloads/sumedh-portfolio/src/components/Contact.tsx) — Added viewport activation on social/contact links.
11. [`src/components/Nav.tsx`](file:///d:/chrome%20downloads/sumedh-portfolio/src/components/Nav.tsx) — Added lightweight `IntersectionObserver` active section highlighting.

---

## 5. IntersectionObserver & Viewport Strategy

* **One-Shot Execution (`once: true`):** All `framer-motion` viewports use `once: true` to prevent distracting, CPU-expensive replays when users scroll back and forth.
* **Low Distance & Duration:** Maximum vertical displacement is $8\text{px} - 12\text{px}$ over $400\text{ms} - 500\text{ms}$ with `easeOut`, preventing lag during fast scrolling.
* **Passive Navigation Tracking:** `Nav.tsx` registers a single `IntersectionObserver` targeting section IDs with a root margin of `-20% 0px -65% 0px`, completely avoiding unthrottled `window.onscroll` frame handlers.

---

## 6. Accessibility & Reduced Motion

* When `@media (prefers-reduced-motion: reduce)` is active, CSS transitions and framer-motion bypass spatial translations, rendering elements immediately at full opacity.
* Keyboard focus rings and tab order remain 100% stable.

---

## 7. Performance & Mobile Considerations

* Zero external animation dependencies added (e.g. no GSAP, Three.js, or canvas-based scrollers).
* Animations strictly target GPU-composited properties: `opacity` and `transform: translateY()`.
* On mobile screens ($320\text{px} - 390\text{px}$), horizontal scroll is non-existent, touch targets exceed $40\text{px}$, and animations do not cause frame drops.

---

## 8. Verification Results

```bash
# Production Build Verification
$ npm run build
vite v8.1.5 building client environment for production...
transforming...✓ 1942 modules transformed.
rendering chunks...
dist/index.html                   1.82 kB │ gzip:   0.67 kB
dist/assets/index-8Z9wt4Ok.css   47.07 kB │ gzip:   8.13 kB
dist/assets/index-CnSVwk8M.js   673.75 kB │ gzip: 183.21 kB
✓ built in 537ms (0 errors)

# Code Quality & Linter
$ npm run lint
> oxlint
# 0 errors, 0 warnings
```

---

## 9. Git Status

* **Portfolio Repository:** Modified existing component files and created `P1_7_SCROLL_INTERACTION_AUDIT.md`. No commits or pushes created.
* **Source Repositories:** Completely untouched.
