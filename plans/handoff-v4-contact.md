# Handoff: v4 phase 7, Contact (2026-11-07)

Branch `revamp/v4-contact` → PR into `revamp/v4`, on top of phases 1–6 (#48–#53, merged). Spec:
`plans/site-revamp.md` (issue #33), mockup `plans/site-revamp-mockup.html` ("6 · Contact"). This is
the last page phase.

## Done

- **`/contactme`** (`components/contactme.tsx`, now a server component): `$ ping jaival`
  `CommandLine`, `SectionLabel as='h1'` "contact", the old "Mail reaches me fastest…" line as the
  lead. `max-w-4xl`. Two columns from `md` (1fr / 1.3fr, as the mockup), stacked on phones.
- **Contact rows** (`Rows`, 6rem labels): email (mailto), linkedin (`in/jaivalsaija`, from the URL),
  github (`Jaival`), location ("Kaiserslautern, Germany, open to relocating").
- **CV**: an `aria-hidden` terminal box (`$ curl -O <host>/cv.pdf` → `✓ saved cv.pdf · 2 pages`),
  with a plain solid "Download CV" button under it. The host comes from `siteUrl`, so a local build
  shows `localhost:3000` and production shows the Vercel domain.
- **Form** (`components/contactForm.tsx`, the only client part): mono accent labels `--name`,
  `--email`, `--subject`, `--message`; plain bordered fields (text stays 16 px, no iOS zoom); the
  "sends through your email app" note as muted text; solid "Send via email" button. Schema,
  `mailto:` sending, placeholders and all message texts are unchanged. The success / error notes now
  carry `role='status'` / `role='alert'`.
- **Removed**: `components/backgroundElements.tsx`, `components/ui/card.tsx`,
  `components/SocialLinks.tsx` (contact was the last user of all three), `availability.role`, and
  `socialLinks.instagram` / `twitter` in `utils/data.ts` (nothing read them any more). The old
  "Availability" card is gone (home and about show the same facts).
- **Readability**: mono text is `text-sm`+. Contrast: muted on background 5.7:1 light / 7.6:1 dark;
  in the terminal box, text 15.9 / 13.4, `$` 5.0 / 8.9, `✓` 4.6 / 7.9. No token change.
- **Motion**: command line + h1, lead, left column, form: CSS `animate-enter` (stagger 1–4). No
  `<Reveal>`: on desktop all of it is above the fold. The button label swap and notes keep their
  framer-motion transitions.

## Decided (by the agent, check in review)

- The form keeps its `subject` field (`--subject`), which the mockup does not show: dropping it
  would change validation and the mail it sends.
- Terminal text says `curl -O …/cv.pdf` → `saved cv.pdf`, not the mockup's `Jaival_Saija_CV.pdf`:
  `-O` keeps the server's file name. The button still downloads as `Jaival_Saija_CV.pdf`.
- Twitter (X) and Instagram are no longer on the site. The spec lists only email, LinkedIn, GitHub
  and location. `app/layout.tsx` keeps `twitter.creator: '@Jaival469'` (card metadata).
- "open to relocating" stays on the location row (old copy, not in the mockup).
- Lead line reuses the old "Let's Connect" paragraph; the old `role` sentence and "say hello" line
  are gone.

## Left before `revamp/v4` merges into `main`

1. Review and merge this PR.
2. Old-look leftovers outside the page phases: `components/cv/cvDownload.tsx` (gradient "Download
   PDF" button on `/cv`) and `components/ErrorBoundary.tsx` (gradient button, `rounded-xl`). Make
   both plain solid buttons like the rest.
3. Content, open since earlier phases:
   - jobhunt-agent dates: the repo starts 10/2026, `utils/cv.ts` (and likely `public/cv.pdf`) say
     09/2026.
   - `public/cv.pdf` (built outside this repo) still says "actively learning" for German; make it
     "learning A2".
   - The jobhunt-agent v1.0.0 summary shows literal backticks (`` `why <job>` ``) in blog rows.
4. RSS categories and the OG image still use `type`, not `postKind()`; decide if a release should
   show as `release` there too.
5. Merge `main` into `revamp/v4` (no new commits on `main` today), then one full pass over every
   page in light and dark, phone and desktop, plus a Lighthouse run.
6. Open the `revamp/v4` → `main` PR (closes #33); after merge, delete the `revamp/v4*` branches
   (keep only main/v1/v2/v3).

## Open

- Screenshots: headless Chrome over CDP against `next start` on a free port (3401 here), own
  `--user-data-dir`; the script kills the Chrome it spawned by PID. Find the server PID by local
  address (`netstat -ano | grep -E "^ *TCP +[^ ]+:PORT "`; it shows `FIN_WAIT_1`, not `LISTENING`,
  after the client closes) and confirm its command line before stopping it.
