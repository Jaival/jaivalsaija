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
- **Series**: an optional `series: '<id>'` in a post's metadata, where the id must be defined in
  `content/series.ts` (title, description, optional repo URL). Parts are numbered by date, oldest
  first, after drafts are filtered out, so a draft never leaves a gap. Each series with a visible
  part gets `/blog/series/<id>`; posts in one show "Part n" and previous/next links. There's no "of
  N" total: a planned count goes stale the moment a part is added or dropped.
- **Reading time** on long posts only ("4 min read"), from the MDX source at 220 words a minute,
  leaving out the metadata export and fenced code. Updates skip it: they're a paragraph or two.
- **Cover image** is optional: `cover: { src: '/blog/<slug>/cover.webp', alt: '...' }`. The file
  lives in `public/`, the build fails if it's missing, and `alt` is required. It shows at 16:9 on
  the post page, above the post in the feed, and at the top of the home card. The OG card stays the
  generated one, so every post has a preview whether or not it has a cover.
- **RSS** at `/blog/rss.xml`: title, summary, date and categories (type, series) per entry, built
  statically. Every page advertises it in `<head>`, and `/blog` links to it.
- **Sitemap and robots**: `app/sitemap.ts` lists the pages, every post (with its date and cover) and
  every series. `app/robots.ts` allows everything and points to the sitemap.
- **Home page**: a "Recently" list of the latest 3 entries under the hero, one `<Reveal>` per item.

## Layout

```txt
content/posts/<slug>.mdx           one file per entry; the file name is the URL
mdx-components.tsx                 element -> styled component map (required by @next/mdx)
utils/posts.ts                     getPosts() / getPost(slug): read, validate, filter drafts, sort
app/blog/page.tsx                  the feed
app/blog/[slug]/page.tsx           the post page, generateStaticParams + dynamicParams = false
app/blog/[slug]/opengraph-image.tsx
content/series.ts                  series registry: id -> title, description, url
app/blog/series/[series]/page.tsx  one series, oldest part first
components/postTimeline.tsx        the timeline shared by the feed and series pages
components/seriesNav.tsx           previous / next part at the end of a post
components/recentPosts.tsx         the home "Recently" list
components/postCover.tsx           16:9 cover image
app/blog/rss.xml/route.ts          RSS 2.0 feed
app/sitemap.ts, app/robots.ts      sitemap.xml and robots.txt
utils/site.ts                      the canonical site URL, for absolute links
```

## Turbopack constraint

Turbopack runs the MDX compiler in Rust, so remark/rehype plugins in `next.config.js` must be named
by string with JSON-serialisable options (`['rehype-pretty-code', { theme: {...} }]`). Plugins that
need a function option (e.g. a custom `onVisitLine`) won't work until that changes.

## Writing a post

1. Add `content/posts/my-slug.mdx` with the `metadata` export above.
2. Keep `draft: true` while writing; check it on `bun dev` at `/blog/my-slug`.
3. To add it to a series, set `series: '<id>'`; a new series needs an entry in `content/series.ts`
   first.
4. Remove `draft`, push. Code fences take a language: ` ```ts `.

## Not built yet

Tags (once there are ~10 posts), comments, view counts. All of these fit on top of the file-based
setup later without moving content.
