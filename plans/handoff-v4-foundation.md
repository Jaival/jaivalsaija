# Handoff: v4 phase 1, Foundation (2026-11-07)

Branch `revamp/v4-foundation` → PR into `revamp/v4`. Spec: `plans/site-revamp.md` (issue #33),
mockup `plans/site-revamp-mockup.html`.

## Done

- **Mono font.** JetBrains Mono (variable, via `next/font` in `app/layout.tsx`) is the site
  `--font-mono` (`app/globals.css`). The `/cv`-only load is gone. Ligatures on (font default).
- **Shared parts** in `components/pipeline.tsx`, extracted from `/cv`, which now uses them:
  - `CommandLine`: `aria-hidden` `$ …` line, mono accent.
  - `Cursor`: block cursor, `animate-blink` (CSS); solid under reduced motion.
  - `SectionLabel`: lowercase mono label + rule; `as='h1'` on sub-pages; optional muted `count`.
  - `TitleLine`: title · org, date right in mono; date drops under the title below `sm`.
  - `Rows`: `<dl>` label/value rows; `labelWidth` sets the label column (default 11rem).
  - `Timeline`: 2 px accent left border.
  - `KindTag`: bordered mono tag, takes a string (lowercased).
- **Navbar**: `jaival@saija:~$` logo, lowercase mono links, active link underlined (slides with
  `layoutId`), same links in the mobile menu with an underline. Flat sticky bar with a bottom rule.
- **Footer**: one mono line, `·` separated (© · email · linkedin · github · cv).
- **Not-found** (`app/not-found.tsx`): `$ cd /path` → `cd: /path: no such file or directory`, h1
  "not found", plain "Back to home" button. The path comes from `components/missingPath.tsx`
  (prerendered as `…`, filled in after hydration, no mismatch).
- **Loading** (`components/LoadingSpinner.tsx`): `$ loading` + cursor, fades in after 200 ms. The
  old spin keyframes are removed.
- **Data test** `utils/cv.test.ts`: every CV experience, education and project date is
  `MM/YYYY – MM/YYYY`, `– present` or `(expected)`; every CV project has a non-empty stack.
- **Readability**: mono text ≥ 14 px in the new parts. Muted text already passes AA: light 5.7:1,
  dark 7.6:1 on the background. No token change.
- Nav and footer use `max-w-4xl`, the content width of `/cv` and the mockup.

## Decided

- Data test (open decision in `handoff-v4-planning.md`): option A. Test the CV module now; phase 4
  adds `dates` and `stack` to the projects in `utils/data.ts` and extends the test to them.

## Next: phase 2, Home

- Hero: name as `<h1>`, `CommandLine` tagline ending in `<Cursor />`, short profile, photo.
- Status `Rows` from the availability data, reworded to the CV's facts (spec, "Data").
- Two CTAs (Download CV, View my work); recent posts as rows with `KindTag` and date right.
- Remove the rough-notation hero, gradient title, background shapes and rotating roles.
- Width: use `max-w-4xl` so the page lines up with the nav and footer.

## Open

- Home, projects, about, experience, blog and contact still use the old look and wider containers
  until their phases; they look out of line with the new nav until then.
- Old pages still have mono text below 14 px (`postVersions`, `backToTop`); fix in their phases.
- `KindTag` labels: the spec shows `release`/`update`, but `PostType` is `post | update`. Phase 6
  decides how a release is told apart.
- Not added: a check that a range's start is before its end (~4 lines). Add it if wanted.
- Screenshots: the T3 preview timed out; a headless-Chrome CDP script worked. The site sends
  `X-Frame-Options: DENY`, so iframe wrappers fail. In Git Bash set `MSYS_NO_PATHCONV=1`, or `/cv`
  becomes a Windows path.
- Merge `main` into `revamp/v4` from time to time.
