# Blog

A place on the site for what I'm building and learning: long posts and short updates in one feed.

## Decisions

- **No database.** Posts are MDX files in the repo, compiled at build time with `@next/mdx`.
  Publishing is a git push; Vercel prerenders every page. At a few posts a month with no comments or
  likes, a database is cost with no payoff.
- **One feed at `/blog`**, nav label "Blog". Each entry has a `type`:
  - `post`: title, summary and a "Read" link in the feed.
  - `update`: full text inline in the feed, timeline style, and still gets its own permalink.
- **Metadata is an exported object**, not YAML frontmatter, so it needs no extra plugin:

  ```mdx
  export const metadata = {
    title: 'Building this blog',
    date: '2026-10-22',
    summary: 'One line for the feed and the link preview.',
    type: 'post',
    draft: true,
  };
  ```

  `utils/posts.ts` checks it with zod, so a typo fails the build instead of shipping a broken page.

- **Drafts** (`draft: true`) show in `next dev` only. Production leaves them out of the feed, the
  home list, the static pages and the OG images.
- **Typography** comes from our own `mdx-components.tsx` (Tidewater tokens, Space Grotesk), not
  `@tailwindcss/typography`, so posts look like the rest of the site.
- **Code highlighting**: Shiki through `rehype-pretty-code` at build time. Both themes are baked
  into the HTML as CSS variables and the `.dark` class picks one, so there is no flash on theme
  change and no client JS.
- **Per-post OG card**: `app/blog/[slug]/opengraph-image.tsx`, the same look as the site card with
  the post title.
- **Home page**: a "Recently" list of the latest 3 entries under the hero, one `<Reveal>` per item.

## Layout

```txt
content/posts/<slug>.mdx           one file per entry; the file name is the URL
mdx-components.tsx                 element -> styled component map (required by @next/mdx)
utils/posts.ts                     getPosts() / getPost(slug): read, validate, filter drafts, sort
app/blog/page.tsx                  the feed
app/blog/[slug]/page.tsx           the post page, generateStaticParams + dynamicParams = false
app/blog/[slug]/opengraph-image.tsx
components/recentPosts.tsx         the home "Recently" list
```

## Turbopack constraint

Turbopack runs the MDX compiler in Rust, so remark/rehype plugins in `next.config.js` must be named
by string with JSON-serialisable options (`['rehype-pretty-code', { theme: {...} }]`). Plugins that
need a function option (e.g. a custom `onVisitLine`) won't work until that changes.

## Writing a post

1. Add `content/posts/my-slug.mdx` with the `metadata` export above.
2. Keep `draft: true` while writing; check it on `bun dev` at `/blog/my-slug`.
3. Remove `draft`, push. Code fences take a language: ` ```ts `.

## Not in v1

RSS, tags, comments, view counts, sitemap, reading time, cover images. All of these fit on top of
the file-based setup later without moving content.
