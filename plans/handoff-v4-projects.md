# Handoff: v4 phase 4, Projects (2026-11-07)

Branch `revamp/v4-projects` → PR into `revamp/v4`, stacked on phase 3 (#50) and phase 2 (#49),
neither merged yet. Spec: `plans/site-revamp.md` (issue #33), mockup `plans/site-revamp-mockup.html`
("3 · Projects").

## Done

- **`/projects`** (`components/projects.tsx`, now a server component):
  `$ ls ~/projects --sort=devops` `CommandLine`, then `SectionLabel as='h1'` "projects" with
  `count`. One `Timeline` row per project in `userData.projects`: `TitleLine` (title · stack ·
  dates), the repo as `github.com/Jaival/x` plus the site link (lowercase label), the description, a
  `ships:` line in muted text. `max-w-4xl`, no `PageHeader`, `BackgroundElements` or gradient title.
  A "more on github.com/Jaival →" link closes the list.
- **Thumbnail**: only for a project with `imgUrl`, at the right of the description (below the title
  line, so it never squeezes the stack or date). Hidden below `sm`; on a 390 px phone it squeezed
  the text.
- **Repo links** wrap after a `/` (`<wbr>`), not inside a name.
- **Data**: `Project` has required `dates` and `stack`. The data test (`utils/cv.test.ts`) checks
  the site projects' dates and stacks as well as the CV's.
- **Motion**: command line and the first two rows use CSS `animate-enter` (stagger 1–3); the other
  rows and the GitHub link get one `<Reveal>` each.
- **Removed**: the card grid, number badges, image fade state, gradient GitHub button. Nothing
  shared deleted: `BackgroundElements`/`PageHeader` stay for blog, about and contact; `ui/card`
  stays for contact.
- **Readability**: mono text is `text-sm` or larger; no token change.

## Decided

- Dates (Jaival, 2026-11-07), from the first and last commit on each default branch; "present" when
  the last commit is this month or the project says it is in progress: mdgloss 09/2026 – present ·
  jobhunt-agent 10/2026 – present · Kubernetes Learning Lab 10/2026 – present · react-rough-notation
  12/2024 – present (fork 11/2024, first own commit 12/2024) · NextGleis 08/2026 – 10/2026 ·
  Invoicely 12/2023 – present · Taskly 02/2021 – 10/2026.
- Stacks approved as in `utils/data.ts`.
- react-rough-notation copy no longer says "the hand-drawn highlights on this page" (the hero lost
  them in phase 2): now "which draws hand-drawn highlights on a web page".
- Project order stays the hand-picked one in `utils/data.ts`, not the mockup's.
- Taskly: the internship was 2020 (site copy and CV are right); the repo starts 02/2021 because it
  was the final-year submission.

## Next: phase 5, About

- `$ whoami` lead line, the story (`userData.about`), skill rows from the CV module (`Rows`, with
  "learning:" items marked). `SectionLabel as='h1'`.
- About shows "looking for" twice (the `role` sentence and the first availability fact); fix it.
- Drop the old `skills` / `learning` fields in `utils/data.ts` once `/aboutme` reads `cv`.
- `max-w-4xl`; drop `PageHeader` from `components/aboutme.tsx`. `PageHeader` is then used only by
  `app/blog/page.tsx` (phase 6), so keep it until then.

## Open

- jobhunt-agent: the repo starts 10/2026, `utils/cv.ts` (and likely `public/cv.pdf`) say 09/2026.
  Align the CV or the site.
- `public/cv.pdf` still says "actively learning" for German; update it to "learning A2" there.
- Screenshots: headless Chrome over CDP against `next start` on a free port. When you kill the
  server by port, match the local address only (`netstat -ano | grep -E "^ *TCP +[^ ]+:PORT "`), or
  you pick up PID 0/4 from other columns. Kill the headless Chrome after each run.
- Merge `main` into `revamp/v4` from time to time.
