# Handoff: blog module refactor (2026-11)

Three PRs from one architecture review of the blog code.

## Done

- **#28 Content types once.** Site types (`Project`, `Experience`, ...) live only in
  `utils/data.ts`. Dead helpers and `utils/variant-examples.ts` are gone.
- **#29 One blog module.** `utils/posts.ts` became `utils/blog/`:
  - `index.ts`: `getBlog()` (React `cache()`) / `loadBlog(reader)`. Reads and validates all of
    `content/` once, then answers `posts`, `post`, `series`, `feed`, `versions`, `version` and
    `guideFor` from memory. Every post has `seriesPart`; every version has `isCurrent`.
  - `reader.ts`: the `BlogReader` seam. `fsReader` reads MDX from disk; tests pass posts from
    memory.
  - `paths.ts`: every `/blog/...` URL.
  - The OG image route has `dynamicParams = false`, so every blog route is prerendered.
  - First test suite: `bun run test` (`bun test`, `server-only` stubbed in `test/setup.ts`).
- **PR C: post kind.** `utils/blog/kind.ts` holds the type label (`kindLabel`) and the calendar-day
  date helpers (`calendarDay`, `formatPostDate`). The meta line, version history, OG image and RSS
  feed all use it. The OG image of a standalone post now says "Post", not "Blog".

Each PR was checked by building `main` and the branch and comparing `.next/server/app`: page text,
links, RSS, sitemap and OG images. #28 and #29 changed nothing; PR C changed only the three
standalone-post OG images.

## Next

- **CI.** Done: `.github/workflows/ci.yml` runs `bun install --frozen-lockfile`,
  `bun run code-quality` and `bun run build` on every pull request and on `main`. Make the `check`
  job a required status check in the branch protection for `main`.
- **CV variants** (review candidate 5) were left for later.

## Open decisions

- A content mistake now fails the whole build, not only the page that reads it. That is the intent;
  revisit if drafts in progress start blocking deploys.
- An old version of a post inherits the current version's `seriesPart`. No versioned post is in a
  series today.
