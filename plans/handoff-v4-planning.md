# Handoff: v4 revamp planning (2026-11-07)

## Done

- `v3` branch: frozen snapshot of the site before the v4 revamp (cut from `main` at `7124ce6`).
- `revamp/v4`: integration branch off `main`. Each phase is one PR into it; one final PR `revamp/v4`
  → `main` ships the whole revamp at once.
- `revamp/v4-foundation`: phase 1 branch, off `revamp/v4`. Holds only the saved mockups so far.
- Design: v4 follows `plans/site-revamp.md` (issue #33, now `ready-for-agent`) and its mockup
  `plans/site-revamp-mockup.html`.
- Fonts: Space Grotesk (body) + JetBrains Mono as the site `--font-mono`, ligatures on.
- Saved for a later revamp, not used in v4: `plans/mockups/design-directions.html` (Editorial,
  Blueprint, Bento) and `plans/mockups/mono-font-comparison.html`.

## Next

Phase order from the spec, one PR each into `revamp/v4`:

1. Foundation: site-wide mono font, shared parts, navbar, footer, not-found and loading screens,
   data test.
2. Home
3. Experience
4. Projects
5. About
6. Blog
7. Contact

Each phase is done when build, type-check, `lint:strict` and `bun run test` pass and the page
matches the mockup in light and dark at phone and desktop width.

## Open decisions

- Data test in phase 1: projects get `dates` and `stack` only in phase 4. Either test the CV module
  now and extend the test in phase 4, or add the project fields in phase 1.
- Merge `main` into `revamp/v4` from time to time so Dependabot and content PRs don't drift.
