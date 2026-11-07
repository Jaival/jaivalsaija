# Handoff: v4 phase 6, Blog (2026-11-07)

Branch `revamp/v4-blog` → PR into `revamp/v4`, on top of phases 1–5 (#48–#52, merged). Spec:
`plans/site-revamp.md` (issue #33), mockup `plans/site-revamp-mockup.html` ("5 · Blog").

## Done

- **`/blog`** (`app/blog/page.tsx`): `$ tail -f ~/blog` `CommandLine`, `SectionLabel as='h1'`
  "blog", the old subtitle as the lead, a mono "follow with rss" link. "series" as `Rows` (id →
  title link · contents, e.g. "setup guide + 4 releases · v0.3.0 → v1.0.0"), then "all posts": every
  visible post, newest first, as rows with `KindTag`, the date right (`TitleLine`) and the summary
  under it (`components/postRows.tsx`). Updates no longer show their full body in the list.
- **Series page**: back link, `$ ls ~/blog/series/<id>`, the series title as a lowercase
  `SectionLabel as='h1'`, the description as the lead, `repo` / `start here` rows, then "parts" as
  the same post rows with `part n · date` at the right.
- **Post page** (`components/postArticle.tsx`): back link, `$ cat ~/blog/<slug>.mdx` (an older
  version: `$ git show v<n>:blog/<slug>.mdx`), mono meta line (kind tag · date · updated · read time
  · "part n of <series>"), plain foreground h1 (no gradient). `max-w-4xl` container so the left edge
  lines up with the nav; text keeps `max-w-3xl`.
- **Version history** (`components/postVersions.tsx`): same git language, restyled. Refs are square
  mono tags like `KindTag` (`main`, `HEAD`, `tag: v1.0.0`, as `git log --decorate` prints them); no
  icons; the history is a "history" `SectionLabel` plus the graph rows, no card. On phones the date
  goes under the row. The branch line wraps on phones.
- **Series nav**: series title as a `SectionLabel`, previous/next as plain links, "all n parts →".
- **Release kind**: `postKind()` in `utils/blog/kind.ts`. A post with `release` **and** `series` is
  a release; the guide (has `release`, no series) stays a post. No content-model change. Home recent
  posts use it too, so home and blog show the same tag. RSS categories and the OG image still use
  `type` (out of scope).
- **Removed**: `components/PageHeader.tsx`, `components/postTimeline.tsx` (and `SeriesMeta`),
  `utils/styles.ts` (nothing imported it any more), `BackgroundElements` from every blog page.
  `BackgroundElements` now only serves `components/contactme.tsx`.
- **Moved**: `BareUrl` from `components/projects.tsx` to `components/pipeline.tsx` (series page uses
  it too).
- **Readability**: all blog mono text is `text-sm`+ (version tags, dates, the back-to-top rail
  label). Contrast on the background: muted 5.7:1 light / 7.6:1 dark; amber (`highlight-strong`,
  older-version text and `HEAD`) 5.0:1 light / 9.7:1 dark; muted on the history row hover 5.2 / 6.1.
  No token change.
- **Motion**: back link, command line, h1, lead and the first two rows use `animate-enter`; other
  rows one `<Reveal>` each; history and series nav one `<Reveal>` each.

## Decided (by the agent, check in review)

- Command lines on the series and post pages (`ls`, `cat`, `git show`) are my wording.
- "all posts" lists every post, series parts too (the mockup shows the kubernetes part there). The
  `feed` (series collapsed) is now used only by home.
- Series h1 is the series title, lowercased in CSS; the blog list labels series by id.

## Next: phase 7, Contact

- Contact rows (email, LinkedIn, GitHub, location), a decorative terminal box with the CV download
  and a plain "Download CV" button beside it, the form restyled with `--name`, `--email`,
  `--message` labels. Look only; validation and sending stay.
- Remove `BackgroundElements` from `components/contactme.tsx`, then delete
  `components/backgroundElements.tsx`. `ui/card` may go too if contact was its last user.
- `availability.role` is read only by contact; drop it if contact stops using it.
- `$ ping jaival` command line; `SectionLabel as='h1'`; `max-w-4xl`.

## Open

- jobhunt-agent dates: repo starts 10/2026, `utils/cv.ts` (and likely `public/cv.pdf`) say 09/2026.
- `public/cv.pdf` still says "actively learning" for German; update it to "learning A2" there.
- The v1.0.0 summary shows literal backticks (`` `why <job>` ``) in the rows: content, out of scope.
- Screenshots: headless Chrome over CDP against `next start` on a free port, own `--user-data-dir`;
  log the Chrome PID and kill only it. Find the server PID by local address
  (`netstat -ano | grep -E "^ *TCP +[^ ]+:PORT "`) and confirm the command line before stopping it.
  Element clips (`querySelector(...)` top) beat full-page shots past 6000 px.
- Merge `main` into `revamp/v4` from time to time.
