# AGENTS.md

## Build & Run
- `npm run dev` — Start dev server (Next.js 16, React 19)
- `npm run build` — Production build
- `npm run lint` — ESLint (next/core-web-vitals + next/typescript)

## Architecture
- **Next.js App Router** site — A premium, high-end React library suite focused on physical interactions, cryptography, and illumination (`AuraBitz`).
- **`/docs`** — The pure atomic components. These are small UI elements (Text effects, buttons, spot cards).
- **`/blocks`** — Full Landing Page Blocks (Hero Sections, Pricing Tables). These compose atomic components together into high-converting layouts.
- **`src/components/ui/`** — Where the raw source code of elements live. 
- **`src/components/site/`** — Site shell: header, sidebar, mobile-nav, CodePreview.
- **Code preview source system** — Docs and block pages must use static source strings from `src/generated/source-registry.ts` through `getComponentSource()` / `getBlockSource()` in `src/lib/source.ts`. Do not reintroduce runtime file reads or `/api/code` fetching for previews.

## Source Registry Maintenance
- When adding a new UI component doc page:
  1. Add the component path/key to `scripts/generate-source-registry.mjs`
  2. Run `node scripts/generate-source-registry.mjs`
  3. In the route, load source with `getComponentSource("component-name")`
  4. Pass it to `<CodePreview code={sourceCode}>`
- When adding a new block page:
  1. Add the block file/key to `scripts/generate-source-registry.mjs`
  2. Run `node scripts/generate-source-registry.mjs`
  3. In the route, load source with `getBlockSource("block-file.tsx")`
  4. Pass it to `<CodePreview code={sourceCode}>`
- If a page uses a client wrapper, compute `sourceCode` in the server `page.tsx` file and pass it down as a string prop.
- Why this exists:
  - production-safe: no dependency on runtime filesystem access
  - faster: no extra client fetch or API hop
  - safer: exact generated source is controlled at build time

## Strict Design & Aesthetic Rules (ANTI-LAZY AI)
- **Extreme Minimalism:** We do NOT build generic SaaS templates, boring rounded white cards, or generic 2018 blue-gradients. Every design must feel like a premium, unreleased Apple or Framer presentation.
- **Color Palette:** Pure black `bg-black` backgrounds. Borders should be strictly `border-white/10` or `border-white/[0.05]`. Text should exclusively use white alphas (`text-white/40` for inactive, `text-white/90` for headers) unless highlighting data.
- **Physics:** Do not use simple CSS transitions for layout bounds. Utilize `framer-motion` springs, mass, damping, and blur effects (`filter: "blur(10px)"` to zero).
- **No Lazy Placeholders:** Write actual code. Do not leave "TODO" blocks or "Coming Soon" comments under the assumption a human will fill it in. If a block is requested, engineer the physics-backed animation down to the granular level.

## Code Style
- TypeScript strict mode. Use `@/*` path alias for `src/` imports.
- Styling: Tailwind CSS v4 (via PostCSS). You must use `cn()` from `@/lib/utils` for conditional classes gracefully merged via `tailwind-merge`.
- Do not add random arbitrary dependencies without explicitly confirming. Stick strictly to Framer Motion and Lucide Icons.


