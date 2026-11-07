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

1. Review and merge this PR and #55. #55 fixes the old gradient buttons (`/cv` "Download PDF",
   error boundary), the v1.0.0 summary backticks, and RSS / OG kinds (now `postKind()`). It also
   sets jobhunt-agent to 09/2026 on the site and in `utils/cv.ts` (Jaival: v0.0.1 was local only,
   so the repo starts a month later).
2. `public/cv.pdf`: Jaival changes German "actively learning" to "learning A2" in the Word source
   and exports the PDF again.
3. Merge `main` into `revamp/v4` (no new commits on `main` today), then one full pass over every
   page in light and dark, phone and desktop, plus a Lighthouse run.
4. Open the `revamp/v4` → `main` PR (closes #33); after merge, delete the `revamp/v4*` branches
   (keep only main/v1/v2/v3).

## Open

- Screenshots: headless Chrome over CDP against `next start` on a free port (3401 here), own
  `--user-data-dir`; the script kills the Chrome it spawned by PID. Find the server PID by local
  address (`netstat -ano | grep -E "^ *TCP +[^ ]+:PORT "`; it shows `FIN_WAIT_1`, not `LISTENING`,
  after the client closes) and confirm its command line before stopping it.
