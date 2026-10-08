<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio

Jaival Saija's personal site. Edit outside the block above; `next dev` owns it.

## Content

- All site copy (projects, about, experience, links) lives in `utils/data.ts`. Content changes
  usually touch only that file.
- Project card images go in `public/projects/`. `imgUrl` is optional: a card without one shows its
  title on a gradient, so leave it out rather than adding a placeholder.
- The data types are declared twice, in `utils/data.ts` and `utils/interface.ts` (components import
  props from the latter). Change a field in both.
- Copy voice: first person, plain and concrete (real numbers, real stack names). Match the existing
  entries; write project descriptions from the project's own README.

## Motion

- Above-the-fold entrances use the CSS `animate-enter` utility, so they show before hydration.
- Below the fold, wrap each item in one `<Reveal>`; never nest it inside a staggering parent.
- Easing and duration tokens live in `utils/animations.ts` and mirror CSS variables in
  `app/globals.css`; change both together.
- One owner per CSS property: a hover `transform` is CSS or framer-motion, never both.
- `plans/v3-upgrade.md` has the reasoning behind these rules; read it before reworking animation.

## Checks

- With `core.autocrlf=true` on Windows, `prettier --check` flags untouched CRLF files. Judge a
  formatting failure only on files you changed.
