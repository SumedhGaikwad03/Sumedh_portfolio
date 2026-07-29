# Sumedh Gaikwad — Portfolio

Backend/AI-ML engineering portfolio. React + TypeScript + Tailwind CSS v4 + React Router.

## Local development

```bash
npm install
npm run dev
```

## Editing content

Almost everything on the site — name, projects, experience, publication, tech
stack — lives in one file: `src/data/content.ts`. Edit that file and the
site updates; no component changes needed for text updates.

Resume file: replace `public/resume.pdf` with an updated PDF (same filename).

## Deploying to Vercel

### Option A — Vercel CLI (fastest)

```bash
npm install -g vercel
vercel login
vercel        # deploy a preview
vercel --prod # deploy to production
```

Vercel auto-detects this as a Vite project (build command `npm run build`,
output directory `dist`). The included `vercel.json` adds a rewrite rule so
client-side routes like `/projects/atrio` work on page refresh and direct
links (required because this uses React Router).

### Option B — Vercel dashboard (GitHub)

1. Push this project to a GitHub repository.
2. Go to https://vercel.com/new and import the repository.
3. Framework preset: Vite (auto-detected). Build command: `npm run build`.
   Output directory: `dist`.
4. Deploy. Every push to the main branch redeploys automatically.

## Build

```bash
npm run build   # outputs to dist/
npm run preview # preview the production build locally
```
