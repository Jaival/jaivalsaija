# Handoff: issue #35 (content and proof fixes)

Written 2026-11-07 at the end of the grilling + first implementation thread. Start the next thread
from here.

## Done

| What                                                                           | Where | State                  |
| ------------------------------------------------------------------------------ | ----- | ---------------------- |
| Copy and facts (role, permit, German, 7 projects, home cards)                  | #38   | Open, all checks green |
| CSP (Report-Only), HSTS, canonicals, CodeQL, Lighthouse CI, Dependabot, badges | #39   | Open, all checks green |
| Docker write-up issue                                                          | #40   | `ready-for-agent`      |
| Kubernetes lab progress issue                                                  | #41   | `ready-for-human`      |
| Post-mortem issue                                                              | #42   | `ready-for-human`      |
| Split comment on #35                                                           | #35   | Posted                 |

#38 and #39 are independent; merge in either order. Delete each branch after merge (branch policy:
only `main`, `v1`, `v2` stay).

## Decisions made (don't re-open)

- **Headline role:** "Junior DevOps & Cloud Engineer" everywhere. No "AI Automation".
- **Projects:** exactly 7, in order: mdgloss, jobhunt-agent, Kubernetes Learning Lab,
  react-rough-notation, NextGleis, Invoicely, Taskly. Others only via "View More on GitHub". The CV
  order (`components/cv/cvPdfPipeline.tsx`) does **not** need to match.
- **Home "Writing" cards** are pinned in `components/recentPosts.tsx` (`PINNED`): npm OIDC post,
  kubernetes-lab series, jobhunt-agent series. New posts do not appear on home until added there.
- **Permit:** §16b AufenthG, valid until 07/2028; 20 h/week in semester, full-time in breaks;
  renewable for the Master's, then the 18-month §20 job-seeker permit. Wording checked against the
  March 2024 §16b(3) rule (140 full / 280 half days; a week of up to 20 h in lectures counts as 2.5
  days).
- **Languages:** English C1 (work language), German A2 (learning).
- **Canonical host:** `https://www.jaivalsaija.dev` (the apex already 308s to www). Canonicals are
  set per page, never in the root layout.
- **CSP:** static, no nonces (pages stay prerendered), `'unsafe-inline'` scripts, `vercel.live`
  allowed for the preview toolbar.
- **HSTS:** 2 years, `includeSubDomains`, no preload.
- **Post-mortem:** Maven work is under NDA, so no Maven incidents. Use the owner's own systems or a
  staged Kubernetes lab failure. "50+ incidents" stays a CV/interview claim.
- **Out of scope for #35:** layout (#33), regenerating `public/cv.pdf`, Impressum/Datenschutz.

## Next

1. Owner: confirm the exact permit expiry month (07/2028 is on the site) against the permit card,
   then merge #38.
2. Merge #39.
3. Owner, in the Vercel dashboard: redirect `jaivalsaija.vercel.app` → `www.jaivalsaija.dev` (308)
   under Project → Settings → Domains.
4. About a week after #39 is live: open the site with DevTools, check the console for CSP
   violations. If there are none, rename the header key in `next.config.js` from
   `Content-Security-Policy-Report-Only` to `Content-Security-Policy` (one-line PR).
5. Hand #40 (Docker) to an agent. It spans two repos: `Jaival/invoicely` first, then the post here.
6. Owner works on #41 (Kubernetes lab) and #42 (post-mortem).
7. Lighthouse: home scored 0.46 performance in a local run (warnings only). Look at the report from
   the `lighthouse` job on the next PR before deciding if it needs an issue.

## Open / on hold

- **IaC project in `aws-projects`:** on hold. The owner is revamping that repo. Once that is done,
  create the child issue (`ready-for-agent`): Terraform on AWS (VPC, EC2 or ECS, ALB), remote state,
  GitHub OIDC deploy role, `plan` on PR, architecture diagram, cost note; then link it from the site
  and CV.
- When #40–#42 and the IaC issue are all closed, close #35.
