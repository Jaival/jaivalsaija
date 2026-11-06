# Site revamp: the Pipeline look on every page

Status: planned, not started. Tracked in issue #33 (label `ready-for-human`); switch the label to
`ready-for-agent` to start. Mockup of all six pages: `plans/site-revamp-mockup.html` (open it in a
browser).

## Problem Statement

My CV now has its own look ("A · Pipeline": an engineer's terminal, with mono accents, lowercase
section labels, title lines with the date on the right and an accent timeline beside the jobs). The
`/cv` page already follows it. The rest of the site still uses the older card look: gradient titles,
rough-notation hero lines, background shapes and card grids. A recruiter who opens the CV and then
the site sees two different people. The experience and skills on the site also come from older text
than the CV.

## Solution

Every page gets the Pipeline look, built from one small set of shared parts, and the CV facts on the
site come from one source. Each page opens with a decorative command line (`$ whoami`,
`$ ls ~/projects --sort=devops`, `$ git log --career`, `$ tail -f ~/blog`, `$ ping jaival`), then a
lowercase mono section label as its title. The navbar becomes a `jaival@saija:~$` logo with
lowercase mono links. The blog keeps its git-style version history (commits, `main`/`HEAD`, release
tags) and restyles it in the same language.

## User Stories

1. As a recruiter, I want the site to look like the CV I just read, so that I trust both come from
   the same person.
2. As a recruiter, I want each page to open with a clear title, so that I know where I am at a
   glance.
3. As a recruiter, I want dates in MM/YYYY at the right of each title line, so that I can scan a
   timeline fast.
4. As a recruiter, I want the jobs on an accent timeline, with the career break above it, so that
   the gap reads as explained, not hidden.
5. As a recruiter, I want the home page to show my status (looking for, hours, start, permit,
   languages) as label/value rows, so that I can check fit before reading anything else.
6. As a recruiter, I want "Download CV" on the home page, so that I get the exact PDF I would get by
   email.
7. As a recruiter, I want the experience page to say the same as the CV, so that I find no
   contradictions.
8. As a recruiter, I want the about page skills in the same rows as the CV, with "learning:" items
   marked, so that I see what is claimed and what is in progress.
9. As a hiring engineer, I want every project row to show name, stack, dates, repo link and a
   "ships:" line, so that I can judge the infrastructure work, not only the app.
10. As a hiring engineer, I want every project on the accent timeline, so that the projects page
    reads as one list.
11. As a hiring engineer, I want a small thumbnail at the right of a project row that has an image,
    so that I see the product without the image taking over the row.
12. As a hiring engineer, I want a project with no image to show no empty thumbnail, so that the
    rows stay clean.
13. As a reader of the blog, I want the post list as rows with a kind label and the date on the
    right, so that I can find a post fast.
14. As a reader of the blog, I want series shown as label/value rows, so that I see what each series
    covers.
15. As a reader of a post, I want the version history to keep its git language (commits on one
    branch, `main`, `HEAD`, release tags), so that the history stays as clear as now.
16. As a reader of a post, I want the post page in the same mono-accent style, so that the blog
    feels part of the site.
17. As a visitor, I want the contact page to list email, LinkedIn, GitHub and location as
    label/value rows, so that I can reach Jaival without the form.
18. As a visitor, I want the contact form to work as it does now, with `--name`, `--email` and
    `--message` labels, so that the look changes and nothing breaks.
19. As a visitor, I want the navbar as `jaival@saija:~$` with lowercase mono links and the active
    page underlined, so that the site feels like one terminal.
20. As a mobile visitor, I want the navbar sheet to use the same lowercase mono links, so that phone
    and desktop match.
21. As a mobile visitor, I want title lines to put the date under the title, so that nothing
    overflows.
22. As a visitor in dark mode, I want every new part to use the theme tokens, so that dark mode
    works on every page.
23. As a screen-reader user, I want the `$` command lines hidden from me and a real `<h1>` on every
    page, so that I hear a clean title.
24. As a visitor who prefers reduced motion, I want the home cursor to stay still, so that nothing
    blinks at me.
25. As a visitor, I want the home tagline to end in a blinking block cursor, so that the terminal
    idea is clear.
26. As a visitor who lands on a missing page, I want a terminal-style not-found (`$ cd /page` →
    `no such file or directory`) with a link home, so that the error fits the site.
27. As a visitor, I want the footer as one mono line of links separated by `·`, so that it matches
    the rest.
28. As Jaival, I want CV facts (experience, education, skills) in one module, so that one edit
    updates `/cv`, `/experience` and `/aboutme`.
29. As Jaival, I want each phase to be its own PR, so that I can stop after any page.
30. As Jaival, I want a data test that fails on a wrong date format, so that a typo never reaches
    the site.

## Implementation Decisions

**Phases, one PR each, in this order.** Each phase is done when build, type-check, `lint:strict` and
`bun run test` pass and the page matches its mockup in light and dark mode at phone and desktop
width.

1. **Foundation**: the mono font for the whole site, the shared parts, the navbar, the footer, the
   not-found and loading screens, and the data test. No page changes yet except these.
2. **Home**: hero (name, `$` tagline with cursor, short profile, photo), status rows, the two CTAs,
   recent posts as rows.
3. **Experience**: experience and education from the CV module, with the timeline.
4. **Projects**: all projects as timeline rows with thumbnails.
5. **About**: `$ whoami` lead line, the story, skill rows from the CV module.
6. **Blog**: list page, series page and post page, with the version history restyled.
7. **Contact**: contact rows, a terminal box with the CV download, the restyled form.

**Shared parts** (built in Foundation, used by every page; the `/cv` page moves to them too):

- _Command line_: mono, accent colour, `aria-hidden`. Decoration only.
- _Section label_: lowercase mono bold accent, with a rule that fills the rest of the line. On
  sub-pages the first one is the page's `<h1>`; on home the `<h1>` is the name.
- _Title line_: semibold title, `·` and the org or stack in muted text, the date in mono muted at
  the right. On phones the date goes under the title.
- _Label/value rows_: a definition list; mono accent label column, plain value. Used for skills,
  status, series and contact.
- _Timeline_: a 2 px accent left border with padding, around a job or a project row.
- _Kind tag_: a small mono bordered tag (`release`, `update`) for blog rows.

**Fonts and colours.** Space Grotesk stays the body font. JetBrains Mono becomes the site
`--font-mono` (it replaces the `/cv`-only load). The Tidewater tokens stay for light and dark; no
new palette.

**Removed.** The rough-notation hero and its component (the `react-rough-notation` project stays in
the projects list), the gradient title text, the background shapes, and the 4 rotating role lines.

**Data.**

- The CV module (`cv`) becomes the single source for experience, education and skills. `/experience`
  and `/aboutme` read from it. The site data module keeps projects, the about story and
  availability; its old experience, education, skills and learning fields go.
- Every project gets two new required fields: `dates` (MM/YYYY – MM/YYYY, or "– present") and
  `stack` (string list). Take the dates from each repo's first and last commit; show Jaival the list
  before it ships.
- Status rows on home come from the availability data; reword them to the CV's facts (20 h/week in
  semester, up to 40 in breaks; available immediately; §16b AufenthG; English C1 · German A1).
- `public/cv.pdf` is the master CV, built outside this repo. It is never regenerated as part of this
  work.

**Motion.** The rules in AGENTS.md hold: `animate-enter` above the fold, one `<Reveal>` per row
below it. The only new animation is the cursor: one CSS blink, still under `prefers-reduced-motion`.

**Contact form.** Look only. Validation, sending and messages stay as they are.

## Testing Decisions

- A good test checks what a visitor or Jaival would notice, through public data, not component
  internals.
- One new seam: a data test over the CV module and the site data module. Every project and CV entry
  has a date in MM/YYYY form, as a range, with "– present" or "(expected)" as the only allowed
  endings; every project has a non-empty stack.
- Prior art: the blog tests, which load data from memory and check it with `bun test`.
- Layout is checked by eye per phase against the mockup, in light and dark, at phone and desktop
  width. No snapshot or visual-regression tests.

## Out of Scope

- OG images (a later issue of their own).
- The RSS feed.
- Blog content and MDX parts.
- The content of the CV PDF, and regenerating it with react-pdf.
- New pages or sections.

## Further Notes

- The `/cv` page (PR #32) is the reference build of this look; the shared parts are extracted from
  it.
- Mockup: `plans/site-revamp-mockup.html`. Blog post titles in it are real; the summaries marked
  "(summary from the post)" are placeholders.
