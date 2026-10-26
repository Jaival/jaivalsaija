# jaivalsaija.vercel.app

My portfolio and blog. I'm Jaival Saija, a DevOps engineer doing an M.Sc. in Computer Science at
RPTU Kaiserslautern.

**Live site:** [jaivalsaija.vercel.app](https://jaivalsaija.vercel.app) · **CV:**
[cv.pdf](https://jaivalsaija.vercel.app/cv.pdf) · **LinkedIn:**
[jaivalsaija](https://www.linkedin.com/in/jaivalsaija/) · **Email:**
[saijajaival@gmail.com](mailto:saijajaival@gmail.com)

## What I'm looking for

A working student or junior role in DevOps, cloud or AI automation, anywhere in Germany.

- **Hours:** 20 h/week in semester, up to 40 in breaks
- **Start:** as soon as possible
- **Permit:** §16b AufenthG student residence permit, working student OK
- **Languages:** English C1, German A1

## Where to look first

If you have five minutes, these show the most:

- **[jobhunt-agent](https://github.com/Jaival/jobhunt-agent)**: an LLM agent that runs my job search
  every day as a Claude Code scheduled task. Job ad text is treated as untrusted input, and a Python
  builder refuses drafts that break its rules. Nothing is sent automatically.
- **[react-rough-notation](https://github.com/Jaival/react-rough-notation)**: my maintained npm
  package. Releases go out through GitHub Actions with npm trusted publishing over OIDC, so no npm
  token is stored anywhere. I wrote up how in
  [a blog post](https://jaivalsaija.vercel.app/blog/npm-trusted-publishing).
- **[Kubernetes Learning Lab](https://github.com/Jaival/kubernetes-learning-lab)**: where I'm
  learning Kubernetes on a local three-node kind cluster, through Helm, Prometheus and Argo CD.
  Started October 2026, still in progress.
- **Experience**: about a year as a Junior DevOps Engineer at Maven Infosoft, running AWS for a .NET
  CMS across dev, stage and production. 50+ incidents resolved in the first six months, GitHub
  Actions pipelines for 3 products. The details are on the
  [experience page](https://jaivalsaija.vercel.app/experience).

All projects, with how each one is built, tested and released, are on the
[projects page](https://jaivalsaija.vercel.app/projects).

## About this repo

The site itself is a Next.js app deployed on Vercel. Some choices I made for it:

- **Blog without a database.** Posts are MDX files in `content/posts`, compiled at build time.
  Publishing is a git push, and every page is prerendered. Post metadata is checked with zod, so a
  typo fails the build instead of shipping a broken page. The reasoning is in
  [Building this blog without a database](https://jaivalsaija.vercel.app/blog/building-this-blog).
- **Content in one file.** All site copy lives in `utils/data.ts`, typed, so updating the CV and the
  site is the same edit.
- **Security headers** on every route (`X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`), set in `next.config.js`.
- **Discoverable.** Sitemap, `robots.txt`, an RSS feed at `/blog/rss.xml` and a generated Open Graph
  image per post.
- **Works before JavaScript loads.** Above-the-fold entrances are CSS animations, so the first paint
  doesn't wait for hydration. They respect `prefers-reduced-motion`.
- **Deploys.** Vercel builds a preview for each branch and deploys production from `main`.

### Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · MDX with
rehype-pretty-code and Shiki · framer-motion · Radix UI · zod · react-hook-form · Vercel

### Run it locally

Needs [Bun](https://bun.sh).

```bash
bun install
bun run dev        # http://localhost:3000
```

Checks before a push:

```bash
bun run lint:strict   # ESLint, zero warnings allowed
bun run type-check    # tsc --noEmit
bun run build
```

### Layout

```text
app/             routes: home, about, experience, projects, blog, contact, RSS, sitemap
components/      page sections and shadcn/Radix UI primitives
content/posts/   blog posts as MDX
utils/data.ts    all site copy: projects, experience, skills, links
public/          CV, headshot, project images
plans/           design notes and the roadmap behind the site
```
