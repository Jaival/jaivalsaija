# Dependency major bumps — research, 2026-11-02

Read-only research. No code, `package.json` or lockfile changed. Registry data from `npm view` on
2026-11-02. Repo: Next 16.4.4, React 19.3.1, zod 4.6, bun 1.3.14, Node 26.12.1.

## Summary table

| Package             | From -> To       | Verdict                                                 | Effort                   |
| ------------------- | ---------------- | ------------------------------------------------------- | ------------------------ |
| @hookform/resolvers | 5.9.2 -> 7.0.1   | Upgrade now                                             | ~0 lines, 1 file checked |
| framer-motion       | 13.5.1 -> 14.9.0 | Upgrade now                                             | ~0 lines                 |
| typescript          | 5.9.3 -> 7.0.2   | Blocked (typescript-eslint). Step to 6.0.x first        | S for 6.0, M for 7       |
| eslint + @eslint/js | 9.39.5 -> 10.x   | Blocked (eslint-plugin-react, -import, -jsx-a11y peers) | S once unblocked         |

---

## 1. @hookform/resolvers 5.9.2 -> 7.0.1

### Breaking changes

- v6.0.0 (2026-10-19): effect-ts resolver needs Effect v4. Error `type` names renamed (`Type` ->
  `InvalidType`, etc.). Default messages changed.
- v7.0.0 (2026-10-31): typebox resolver needs `typebox` ^1.0.0 (replaces `@sinclair/typebox`).
  `TypeCompiler.Compile` -> `Compile` from `typebox/compile`. Typebox error types are now keyword
  names.
- v7.0.1: bug fix for fluentvalidation-ts only.
- Source: https://github.com/react-hook-form/resolvers/releases
- No zod resolver change is listed in these notes.

### Peer dependencies (npm)

- `npm view @hookform/resolvers@7.0.1 peerDependencies`: `zod ^3.25.0 || ^4.0.0`,
  `react-hook-form ^7.55.0`, `@standard-schema/spec ^1.0.0`.
- Repo has zod 4.6.7 and react-hook-form 7.91.0. Both satisfy the range. No blocker.
- Registry: https://www.npmjs.com/package/@hookform/resolvers

### Repo impact

- Only use: `components/contactme.tsx:7` (`import { zodResolver } from '@hookform/resolvers/zod'`)
  and `components/contactme.tsx:95` (`resolver: zodResolver(contactFormSchema)`).
- Schema at `components/contactme.tsx:26-41` uses plain `z.object` with `z.string().min()` /
  `.email()`. Not touched by the effect or typebox changes.
- Does not apply: effect, typebox, error-type renames (the form reads zod issue messages, not
  resolver type codes).

### Action

Upgrade now. Bump, run `bun run type-check`, submit the form once in the browser. Effort: minutes.

---

## 2. framer-motion 13.5.1 -> 14.9.0

### Breaking changes

- 14.0.0 (2026-10-02), the only entry labelled "Changed": removed internal APIs that 13.5.1 had
  restored for compatibility with framer-motion 13.0–13.4. Internal dependencies are now pinned.
- 14.1–14.9 list only additions and fixes (hardware-accelerated independent transforms in 14.2.0,
  `transition.out` in 14.7.0, `useScroll` gets `scrollXLength`/`scrollYLength` in 14.7.0, several
  `AnimatePresence`/`layoutId`/`useTransform` fixes).
- Source: https://github.com/motiondivision/motion/blob/main/CHANGELOG.md (raw:
  https://raw.githubusercontent.com/motiondivision/motion/main/CHANGELOG.md). I read versions
  14.0.0–14.9.0 and 13.x; the last ~34k characters of the file were not read, but those are older
  versions.
- Older 13.x changes (13.0.0 `isValidProp`, 13.2.0 `set()` arg) already apply to the repo's current
  13.5.1. They do not apply here.

### Peer dependencies (npm)

- `framer-motion@14.9.0`: `react ^18 || ^19`, `react-dom ^18 || ^19`, `remix ^3.1.0` (optional Remix
  peer). React 19.3.1 is fine.
- Registry: https://www.npmjs.com/package/framer-motion

### Repo impact (all imports are from the public `framer-motion` root; no deep imports)

- `components/backToTop.tsx:3,47,54,75-120`: `motion`, `useTransform`, `useMotionValueEvent`.
- `hooks/useBackToTop.ts:3,17,20`: `useScroll`, `useMotionValueEvent`.
- `components/contactme.tsx:4,394-492`: `AnimatePresence` (`mode='popLayout'`, `initial={false}`),
  `motion.span`/`motion.div`.
- `components/navbar.tsx:3,43,220-265`: `layoutId='navbar-pill'`, `AnimatePresence`.
- `components/hero.tsx:5`, `components/experience.tsx:4`, `components/Reveal.tsx:3`: `motion`.
- `utils/provider.tsx:4,16`: `MotionConfig reducedMotion='user'`.
- Does not apply: the 14.0.0 internal removals. The repo uses none of those internals.
- Watch: 14.x fixes touch `AnimatePresence` exit timing and `layoutId` (14.3.1, 14.7.0), and
  accelerated transforms (14.2.0). These can change motion slightly. The `AGENTS.md` rule "one owner
  per CSS property" matters here: hover `transform` stays CSS or framer, not both. Re-check
  `plans/v3-upgrade.md` rules after the bump.

### Action

Upgrade now. Bump, type-check, then click through navbar pill, mobile menu, contact form
success/error, back-to-top ring. Effort: ~15 min, mostly visual check.

---

## 3. typescript 5.9.3 -> 7.0.2

### Breaking changes

TS 7 is the native (Go) port. `npm i -D typescript` installs the 7.0 `tsc`. Source:
https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/

- CLI: new `--checkers`, `--builders`, `--singleThreaded`. Passing file paths on the command line
  with a `tsconfig.json` present is an error unless `--ignoreConfig`.
- Defaults change (these started in 6.0,
  https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/): `strict` true, `module`
  esnext, `target` current stable ES, `rootDir` = tsconfig dir, `types` = `[]`,
  `noUncheckedSideEffectImports` true, `libReplacement` false.
- Now errors: `target: es5`, `downlevelIteration`, `baseUrl`,
  `moduleResolution: node/node10/classic`, `module: amd/umd/systemjs/none`,
  `esModuleInterop: false`, `allowSyntheticDefaultImports: false`, `alwaysStrict: false`, `outFile`,
  `module` keyword for namespaces, `asserts` on imports.
- No programmatic JS Compiler API in 7.0. A new API is expected in 7.1. `@typescript/typescript6`
  re-exports the 6.0 API for tools such as typescript-eslint.
- JS/JSDoc handling reworked to match `.ts`.
- Vue, MDX, Astro, Svelte, Angular template checking cannot use 7.0 yet (same announcement). Not
  relevant to the TS code here, but the repo uses MDX (`@next/mdx`, `mdx-components.tsx`), and MDX
  editor support is listed as unsupported. Build is not affected.

### Repo impact (`tsconfig.json`)

- Already fine: `target ES2017` (>= ES2015), `moduleResolution: bundler`, `esModuleInterop: true`,
  `strict: true`, `module: esnext`, `isolatedModules`, `noEmit`. No `baseUrl`, no
  `downlevelIteration`, no `outFile`.
- `paths` without `baseUrl` is the form 6.0 asks for. OK.
- `types` is not set. With TS >= 6, `types` defaults to `[]`, so ambient globals from `@types/node`
  stop loading automatically. Likely to need `"types": ["node"]` (or `["*"]`) if any file uses
  `process`, `Buffer` or similar, e.g. `scripts/cv-pdf.tsx`, `next.config.js` is JS and not checked
  for types beyond `allowJs`. Run `tsc --noEmit` to find out; I did not run it (read-only task).
- `rootDir` default is the tsconfig dir, which is the repo root. No change expected.
- `plugins: [{ "name": "next" }]` (`tsconfig.json`): this is a language-service plugin for editors.
  I found no source saying whether the TS 7 language server loads TS plugins. Unverified. Worst case
  the editor loses Next hints; `tsc` and build are not affected.
- `allowJs: true` with 3 tracked JS/MJS files (`next.config.js`, `postcss.config.js`,
  `eslint.config.mjs`). JSDoc rework could change checking of them only if they carry JSDoc types.
  They have none that I saw in `next.config.js`.
- `package.json` script `type-check: tsc --noEmit` works unchanged (CLI is still `tsc`).

### Next.js 16.4 support

- Docs: since Next 16.3 `next build` runs the project-local `tsc` by default
  (`experimental.useTypeScriptCli`, default on). This "enables TypeScript 7". If you set it to
  `false` under TS 7, `next build` exits. Source:
  https://nextjs.org/docs/pages/api-reference/config/next-config-js/useTypeScriptCli (doc
  `lastUpdated: 2026-07-10`).
- `next.config.js` here does not set `useTypeScriptCli`, so the default applies. Next.js 16.4.4 is
  on this path. I did not run a build on TS 7.
- Older lines reject TS >= 7 with an error: https://github.com/vercel/next.js/pull/96110. Not
  relevant at 16.4.4.
- Next prints raw `tsc` diagnostics, without its code frames.

### Peer-dependency blockers (hard)

- `typescript-eslint@8.72.1` and `@typescript-eslint/parser@8.72.1`: `typescript >=4.8.4 <6.1.0`
  (`npm view`). TS 7.0.2 is out of range.
- `eslint-config-next@16.4.4` depends on `typescript-eslint ^8.56.0`
  (`npm view eslint-config-next@16.4.4 dependencies`), so `bun run lint` on a TS 7 install loads
  typescript-eslint against TS 7.
- Runtime failure confirmed upstream: typescript-eslint crashes in `typescript-estree` with TS 7 (no
  JS API). Issue closed "not planned"; blocked by
  https://github.com/typescript-eslint/typescript-eslint/issues/10940. Thread:
  https://github.com/typescript-eslint/typescript-eslint/issues/12518
- Documented workaround: keep `typescript` at 6.0.x for ESLint and install TS 7 as an alias, e.g.
  `"typescript7": "npm:typescript@^7.0.2"`, and run its `tsc` for type-checks. This is from the same
  issue thread. I did not test it with bun.
- Note: `typescript` is in `dependencies` in `package.json` (not devDependencies). Not a blocker.

### Action

Blocked by typescript-eslint (and so by eslint-config-next). Do this:

1. Now: 5.9.3 -> 6.0.x. Peer range of typescript-eslint allows it. Fix `types` if type-check
   complains. Effort: S (< 1 h).
2. Later: when typescript-eslint supports TS 7 (watch #10940), move to 7. Or sooner, add the alias
   for a faster `type-check` only. Effort: S for the alias, M for the full move.

---

## 4. eslint 9.39.5 + @eslint/js 9.39.5 -> 10.x

### Breaking changes

Source: https://eslint.org/docs/latest/use/migrate-to-10.0.0

- Node: needs `^20.19.0 || ^22.13.0 || >=24`. Node 21 and 23 dropped. Repo runs Node 26.12.1: fine.
- jiti below 2.2.0 unsupported for TS config files.
- `.eslintrc` removed, `FlatESLint`/`LegacyESLint` removed. Only `eslint.config.*`.
- Config lookup starts from each linted file's directory (flag `v10_config_lookup_from_file`
  removed).
- `/* eslint-env */` comments are errors.
- `eslint:recommended` adds `no-unassigned-vars`, `no-useless-assignment`, `preserve-caught-error`.
- `radix` options deprecated, `no-shadow-restricted-names` reports `globalThis` by default,
  `func-names` and `no-invalid-regexp` schema tightening.
- JSX identifiers now tracked as references (may surface new `no-unused-vars` / `no-undef` reports).
- `@eslint/js` configs have `name` again.
- Plugin API: removed `context.getCwd/getFilename/getPhysicalFilename/getSourceCode`,
  `parserOptions`, `parserPath`; removed `SourceCode#getTokenOrCommentBefore/After`,
  `isSpaceBetweenTokens`, `getJSDocComment`; RuleTester `type` removed.
- Codemod: `npx codemod @eslint/v9-to-v10`.

### Repo impact (`eslint.config.mjs`)

- Already flat config, `export default [...]`. No `.eslintrc`. No `eslint-env` comments seen in
  config.
- `@eslint/js` is in `devDependencies` but `eslint.config.mjs` does not import it (grep: no match).
  It is not used directly; `eslint-config-next` supplies the rules. Candidate to drop instead of
  bumping.
- Core style rules used (`quotes`, `indent`, `semi`, `comma-dangle`, `brace-style`, etc.) are not in
  the v10 removal list.
- `ignores` includes `**/*.config.mjs`, so the config file itself is not linted.
- New recommended rules matter only if `@eslint/js` recommended is used. It is not here.
  `eslint-config-next` may enable its own set; unknown until run.
- `package.json` `lint:strict` uses `--ext`. Not listed in the v10 notes; unverified. Not an ESLint
  10 issue by itself.

### Peer-dependency check (`npm view <pkg> peerDependencies`, latest version at the time)

| Package                    | Version         | eslint peer              | ESLint 10 OK?                    |
| -------------------------- | --------------- | ------------------------ | -------------------------------- |
| eslint-config-next         | 16.4.4          | `>=9.0.0`                | Peer yes (but see plugins below) |
| @next/eslint-plugin-next   | 16.4.4          | none declared            | n/a                              |
| eslint-plugin-prettier     | 5.5.7           | `>=8.0.0`                | Yes                              |
| eslint-config-prettier     | 10.1.8          | `>=7.0.0`                | Yes                              |
| typescript-eslint / parser | 8.72.1          | `^8.57 \|\| ^9 \|\| ^10` | Yes                              |
| eslint-plugin-react-hooks  | 7.1.1           | up to `^10.0.0`          | Yes                              |
| **eslint-plugin-react**    | 7.37.5 (latest) | `^3 ... ^9.7`            | **No**                           |
| **eslint-plugin-import**   | 2.32.0 (latest) | `... ^8 \|\| ^9`         | **No**                           |
| **eslint-plugin-jsx-a11y** | 6.10.2 (latest) | `... ^8 \|\| ^9`         | **No**                           |
| @eslint/js                 | 10.0.1          | `eslint ^10.0.0`         | Yes (needs Node 20.19+)          |
| eslint                     | 10.x            | jiti `*` (optional)      | n/a                              |

- `eslint-config-next@16.4.4` bundles react, import and jsx-a11y plugins (dependencies list from
  `npm view`). All three cap their peer range at ESLint 9.
- Runtime risk, not just a warning: the installed eslint-plugin-react 7.37.2 here still calls
  removed APIs, e.g. `context.getFilename()` in
  `node_modules/eslint-plugin-react/lib/rules/jsx-filename-extension.js:64` and
  `lib/util/version.js:31`, and `context.getSourceCode()` in `lib/rules/forward-ref-uses-ref.js:59`.
  The ESLint 10 guide removes both. Third-party reports of the resulting crash:
  https://github.com/techquestsdev/beer/pull/9 (secondary source, not the plugin's own tracker).
- `eslint-plugin-import` 2.32.0 uses a compat helper (`contextCompat.getFilename`) in
  `lib/rules/named.js:126`, so it may survive; not verified.
- I did not find an eslint-plugin-react release or issue that declares ESLint 10 support. Its own
  repo should be checked before upgrading.

### Action

Blocked by eslint-plugin-react (and the peer caps on -import and -jsx-a11y), pulled in through
`eslint-config-next`. Wait for a `eslint-config-next` release that lists ESLint 10 and a compatible
react plugin. Meanwhile stay on 9.39.x. Optionally drop unused `@eslint/js`. Effort once unblocked:
S (bump, run `bun run lint`, fix new reports; run the codemod).

---

## Recommended order

1. @hookform/resolvers -> 7.0.1. No impact.
2. framer-motion -> 14.9.0. Visual check of 5 components.
3. typescript -> 6.0.x (not 7). Prepares for 7 and stays inside the typescript-eslint peer range.
4. Wait on eslint 10 until `eslint-config-next` and eslint-plugin-react/import/jsx-a11y support it.
   Re-check with `npm view eslint-plugin-react peerDependencies`.
5. typescript 7 after typescript-eslint supports it (#10940). Optional earlier: TS 7 alias for
   faster `type-check` only.

Run `bun run lint`, `bun run type-check`, `bun run build` after each step. Do one bump per commit.

## Gaps

- No upgrade was run. Impact is from docs, peer ranges and code reading. `tsc` on TS 6/7 and
  `next build` on TS 7 were not executed.
- TS 7 language-service plugin support (`plugins: next`) is not confirmed by any source I read.
- ESLint 10 status of `eslint-config-next` and its bundled plugins comes from npm peer ranges and
  installed source. No official statement found.
