# Handoff: v4 phase 3, Experience (2026-11-07)

Branch `revamp/v4-experience` → PR into `revamp/v4`, stacked on phase 2 (#49, not merged yet). Spec:
`plans/site-revamp.md` (issue #33), mockup `plans/site-revamp-mockup.html` ("4 · Experience").

## Done

- **`/experience`** (`components/experience.tsx`, now a server component) reads `cv.experience` and
  `cv.education` from `utils/cv.ts`, the data `/cv` and the PDF use. `$ git log --career`
  `CommandLine`, then `SectionLabel as='h1'` "experience"; a second `SectionLabel` "education".
  `max-w-4xl`, no `PageHeader`, `BackgroundElements` or gradient title.
- **Timeline**: jobs (entries with bullets) sit on the accent `Timeline`; the career break and the
  degrees do not. The CV lists newest first, so the career break sits above the jobs.
- **Shared entry** `components/cvEntry.tsx`: the title line, italic context, details and bullets of
  one CV entry, moved out of `components/cv/cvPage.tsx`. `/cv` and `/experience` both use it.
- **Motion**: the command line, the career break and the first job use CSS `animate-enter` (stagger
  1–3); the internship and each degree get one `<Reveal>`.
- **Removed**: the old card timeline (gradient dots, drawn connectors, year badges), the
  `Experience` type and the `experience` / `education` fields in `utils/data.ts`. `/aboutme` did not
  read them. `PageHeader` and `BackgroundElements` stay: blog, about, contact and projects still use
  them.
- **Metadata**: description now says "the internship before it" (the CV has one internship).
- **Readability**: mono text is `text-sm` or larger (dates, labels, command line); no token change.

## Decided

- The site now shows what the CV shows. The old site-only entry "Mobile App Developer (In-house),
  Ganpat University, 05/2019 – 06/2019" is gone with the old data (spec story 7: no contradictions
  with the CV). Add it to `utils/cv.ts` if it should come back; it then shows on `/cv` and the PDF
  too.
- All bullets show; the mockup's "+ 5 more" was mockup brevity.

## Next: phase 4, Projects

- The curated projects in `utils/data.ts` as `Timeline` rows with thumbnails (mockup "2 ·
  Projects"). `CommandLine`, `SectionLabel as='h1'` with `count`.
- Add required `dates` (MM/YYYY – MM/YYYY or "– present", from each repo's first and last commit)
  and `stack` (string list) to `Project`. Show Jaival the date list before it ships.
- Extend `utils/cv.test.ts` (or a sibling test) to the site projects' `dates` and `stack`.
- `max-w-4xl`; drop `BackgroundElements` from `components/projects.tsx`. Check the blog pages before
  deleting it.

## Open

- `utils/cv.ts` still says "German A1 (Goethe certificate)"; the site says A2 (learning). Align the
  CV module (and the PDF, built outside this repo) or the site.
- About, projects, blog and contact still use the old look until their phases.
- Screenshots: headless Chrome over CDP against `next start` on a free port (3123 was taken; a busy
  port makes `next start` exit while an old server keeps answering). Kill the headless Chrome after
  each run, or its profile stays locked.
- Merge `main` into `revamp/v4` from time to time.
