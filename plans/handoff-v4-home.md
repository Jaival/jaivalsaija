# Handoff: v4 phase 2, Home (2026-11-07)

Branch `revamp/v4-home` → PR #49 into `revamp/v4`, on top of phase 1 (#48, merged). Spec:
`plans/site-revamp.md` (issue #33), mockup `plans/site-revamp-mockup.html` ("1 · Home").

## Done

- **Hero** (`components/hero.tsx`, now a server component): name as the `<h1>`, `cv.tagline` in
  `CommandLine` ending in `<Cursor />`, the short profile (`userData.intro`), photo. Same header
  layout as `/cv` (photo above the name on phones). CSS `animate-enter`, stagger 1–3.
- **Status**: `Rows` from `userData.availability.facts`; labels shown as shell flags (`Looking for`
  → `looking_for`). A green dot before the `Start` value.
- **CTAs**: plain solid "Download CV" (`<a download>`) and outlined "View my work".
- **Recent posts** (`components/recentPosts.tsx`): the 3 newest feed entries as rows, `KindTag`
  (`kindLabel`) before the title, `formatPostDate` on the right via `TitleLine`; one `<Reveal>` per
  row; "all posts →" link under them. A series counts once, as its newest part; a part with
  `ownCard` that is also its series' newest part shows once. The hand-picked `PINNED` list is gone.
- **Width**: `max-w-4xl`, in line with nav, footer and `/cv`.
- **Removed**: `roughNotationHero.tsx` and the `@jaivalsaija/react-rough-notation` dependency (the
  project stays in the projects list), gradient title, rotating roles, the `hero` variant of
  `BackgroundElements` (and its unused `className` prop), `springPlayful`, `titleStyles.hero`, the
  `--mark-*` tokens.
- **Readability**: mono text is `text-sm` or larger; no token change (muted passes AA, see phase 1).

## Decided

- Status wording (Jaival, 2026-11-07): looking for "Working student or junior role · DevOps, cloud,
  platform · anywhere in Germany"; hours "20 h/week in semester · up to 40 in breaks"; start
  "Available immediately"; permit "§16b AufenthG student permit, valid until 07/2028"; languages
  "English C1 · German A2 (learning)". The "Graduation" fact is gone.
- The facts are shared, so About and Contact show the new wording too (accepted). About now shows
  "looking for" twice (the `role` sentence and the first fact); phase 5 fixes that.
- Kind tags show `post`/`update` from `PostType`; `release` stays open for phase 6.

## Next: phase 3, Experience

- Experience and education from the CV module (`utils/cv.ts`), with `Timeline` around jobs and the
  career break above it. `$ git log --career` command line, `SectionLabel as='h1'`.
- Drop the old `experience`/`education` fields from `utils/data.ts` once `/experience` reads `cv`
  (check `/aboutme` still builds; it moves to `cv` in phase 5).
- `max-w-4xl`, no `BackgroundElements`/`PageHeader` on the page.

## Open

- `utils/cv.ts` says "German A1 (Goethe certificate)"; the site now says A2 (learning). Align the CV
  module (and the PDF, built outside this repo) or the site.
- Old pages still use the card look and wider containers until their phases.
- Screenshots: headless Chrome over CDP against `next start` (a throwaway script in the temp dir,
  phone 390 px and desktop 1280 px, light and dark). Emulate `prefers-reduced-motion: reduce` to
  catch the cursor solid; otherwise a shot can land on its "off" blink phase.
- Merge `main` into `revamp/v4` from time to time.
