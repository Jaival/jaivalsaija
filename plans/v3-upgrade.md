# Portfolio v3 — Motion, Polish & Mobile-Native Upgrade

- **Baseline commit:** `aaa0700` (v2.0.0)
- **Target version:** 3.0.0
- **Stack:** Next.js 16 (App Router) · React 19 · Tailwind v4 · framer-motion 13 · Radix · next-themes

## 0. Skills used to build this plan

| Skill | Available | Used for |
| --- | --- | --- |
| `emil-design-eng` | ✅ | Animation decision framework, easing/duration tokens, press feedback, Before/After review format |
| `animate` | ✅ | Building each replacement animation (gate → purpose → tool → properties → curve → exit) |
| `review-animations` | ❌ not installed | — (its bar is the same Emil bar; `animate`'s "Never Ship" table covers it) |
| `improve-animations` | ✅ | Recon → audit → prioritized findings (sections 2–3) |
| `find-animation-opportunities` | ✅ | Missed opportunities and the **rejected** list (section 5) |
| `animation-vocabulary` | ✅ | Naming only (e.g. "circular reveal", "pop in", "stagger") — no code impact |
| `apple-design` | ✅ | Springs (critically damped by default), typography tracking/leading, materials, reduced transparency |
| `mobile-native` | ✅ | Tap highlight, `svh`, `touch-action`, `theme-color`, button text selection |

## 1. Recon

- **Personality:** personal portfolio — a marketing-style site seen occasionally, not a daily tool. Entrances
  and a little delight are allowed; hover and nav chrome must stay crisp.
- **Frequency map:**
  - _Every page view:_ navbar, page header entrance, footer.
  - _Tens per visit:_ nav link hover, card hover, social icon hover, tooltips.
  - _Occasional:_ mobile menu, theme toggle, form submit.
  - _Rare:_ first hero load ("That's me" badge, rough-notation highlight), error boundary.
- **Where motion lives today:** `utils/animations.ts` (framer variants, no curve tokens — everything uses
  framer's default easing), inline `motion.*` props in every component, Tailwind `transition-all duration-300`
  classes, `hooks/useViewTransitionTheme.ts` (View Transition circular reveal).
- **No shared easing tokens exist.** v3 introduces one set and every file uses it.

## 2. Vetted findings (ordered by leverage)

| # | Sev | Category | Location | Finding | Fix summary |
| --- | --- | --- | --- | --- | --- |
| 1 | HIGH | Performance | every page (`initial='hidden'` on SSR'd sections) | Above-the-fold content is server-rendered at `opacity: 0` and only appears after JS hydrates — hurts LCP and shows a blank page on slow networks | Above-the-fold entrances move to a CSS keyframe (`.animate-enter`) that runs without JS, off the main thread |
| 2 | HIGH | Easing & duration | `utils/animations.ts` | 600–1000ms durations with framer's default ease; headers enter from `scale(0.8)` | Tokens: `--ease-out: cubic-bezier(0.23,1,0.32,1)`, entrances 500ms, UI 150–250ms, `scale(0.96)` minimum |
| 3 | HIGH | Purpose & frequency | `navbar.tsx` | Navbar (chrome seen on every visit) staggers in over 0.8s; nav links lift on hover with a spring | No navbar entrance; hover is color only |
| 4 | HIGH | Correctness | `hero.tsx` CTAs | `motion.a href='/projects'` causes a full page reload; framer `whileHover` scale fights CSS `hover:-translate-y-1` and `active:scale-95` on the same `transform` | `next/link`, CSS-only transform, one owner per property |
| 5 | HIGH | Performance | `backgroundElements.tsx`, `hero.tsx`, `experience.tsx`, `contactme.tsx`, `aboutme.tsx` | ~15 infinite JS loops (pulsing blurred blobs, rotating blurred rings, 6s float ≈0.17 Hz vestibular trigger, ping dots, wiggling emoji, nudging chevrons) running on the main thread | Static glows; loops removed. Hover-triggered nudge instead of perpetual nudge |
| 6 | HIGH | Correctness | `globals.css` `.app-bg` | `var(--ring) / 0.18` is invalid inside `radial-gradient` → the whole background-image is dropped; `background-attachment: fixed` repaints on scroll | `color-mix(in oklch, …)` on a fixed `::before` layer |
| 7 | MED | Interruptibility / double animation | `projects.tsx`, `experience.tsx` | Items are animated twice (parent variant **and** child `whileInView`), with stacked delays | One `Reveal` per item |
| 8 | MED | Accessibility | global | Only `LoadingSpinner` checks reduced motion; `scroll-behavior: smooth` is unconditional | `<MotionConfig reducedMotion='user'>` + CSS `prefers-reduced-motion` fallbacks (fade only) |
| 9 | MED | Physicality | `navbar.tsx` mobile menu | Animates `height: auto` + scale + nested `y: -30` + items `x: -30, scale: 0.9` over 400ms+; pushes the page down | Absolutely-positioned panel, `opacity` + `scale(0.96)` + `translateY(-8px)` from the top-right trigger, 200ms in / 150ms out, 30ms item stagger; closes on Escape and route change |
| 10 | MED | Easing | `navbar.tsx` theme toggle | Icon swap waits for exit (`mode='wait'`, 2×300ms, ±180° spin); toggle uses `theme` instead of `resolvedTheme` (wrong when theme is `system`); debug `console.log` | Blur+scale crossfade 200ms with `popLayout`; `resolvedTheme`; remove logging |
| 11 | MED | Interruptibility | `components/ui/tooltip.tsx` | Every tooltip creates its own `Provider`, so "skip delay on the next tooltip" never works; 200ms enter | One app-level `TooltipProvider`; 150ms enter / 100ms exit; `instant-open` has no animation |
| 12 | MED | Performance | `LoadingSpinner.tsx` | JS spinner + 4 floating shapes + pulsing glow animate exactly when the main thread is busiest (route loading); appears instantly and flashes on fast loads | CSS-only ring at 700ms/rev, fades in after 200ms delay |
| 13 | MED | Physicality | `aboutme.tsx` | Non-clickable content cards scale on hover (false affordance) | Remove |
| 14 | MED | Correctness | `experience.tsx` | Timeline connector animates `height` (layout); year badge is an `<h1>` (multiple h1s per page) | `scaleY` from `origin-top`; `<span>` |
| 15 | LOW | Press feedback | buttons & cards | Mixed `active:scale-95`, `whileTap 0.95`, none on cards | `active:scale-[0.97]` on buttons, `0.98` on cards, 160ms ease-out |
| 16 | LOW | Cohesion | many | `transition-all duration-300/500/700` | Name properties: `transition-[color,background-color,border-color,box-shadow,transform]`, 200ms |
| 17 | LOW | Typography | `utils/styles.ts` titles | Display sizes (up to `text-9xl`) use default tracking and `leading-tight` | `tracking-tight` / `tracking-tighter` + `leading-[0.95]` on display text |

### Mobile-native findings

| Symptom | Fix |
| --- | --- |
| Gray flash on tap (iOS/Android) | `html { -webkit-tap-highlight-color: transparent }` — every control gets an `:active` state to replace it |
| `min-h-screen` (100vh) hero overflows under the URL bar | `min-h-svh` |
| Long-press selects button labels | `user-select: none` on `button`, `[role=button]` only (never body) |
| Tap delay on some iOS elements | `touch-action: manipulation` on `a, button` |
| Status bar color is fixed | `viewport.themeColor` per scheme (`#ffffff` / `#020618`) and synced on manual theme toggle |
| Font inflation in landscape | `-webkit-text-size-adjust: 100%` |
| Form keyboards | `autoComplete`, `inputMode='email'`, `enterKeyHint` on contact inputs (already 16px → no zoom ✅) |

### Apple-design findings

- **Materials:** nav + mobile menu are translucent (good). Add `prefers-reduced-transparency` → solid surface, no blur.
- **Springs:** the one spring that stays (nav active-pill `layoutId`) becomes critically damped: `{ type: 'spring', bounce: 0, duration: 0.35 }`.
  Bounce (0.25) is spent only on the rare "That's me" badge.
- **Theme change:** keep the circular reveal (delight, occasional, respects reduced motion) but with the strong
  ease-in-out token (on-screen movement).

## 3. Motion tokens (single source of truth)

CSS (`app/globals.css`):

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

JS (`utils/animations.ts`):

```ts
easeOut = [0.23, 1, 0.32, 1]; easeInOut = [0.77, 0, 0.175, 1];
durations = { press: 0.16, fast: 0.2, base: 0.3, enter: 0.5 };
stagger = 0.06; // seconds between siblings
spring = { type: 'spring', bounce: 0, duration: 0.35 };        // default, critically damped
springPlayful = { type: 'spring', bounce: 0.25, duration: 0.5 }; // rare delight only
```

Entrance recipe: `opacity 0 → 1`, `translateY(12px) → 0`, 500ms `--ease-out`, stagger 60ms. Reduced motion: opacity
only, 200ms.

## 4. Implementation phases

1. **Foundation** — `globals.css` (tokens, `.animate-enter`, background fix, mobile baseline, reduced
   motion/transparency), `utils/animations.ts` (rewrite as tokens), `utils/provider.tsx` (`MotionConfig` +
   `TooltipProvider`), `app/layout.tsx` (`viewport` export, `min-h-svh`).
2. **Shared components** — new `components/Reveal.tsx` (scroll reveal, transform-string for HW accel);
   `PageHeader.tsx` (CSS entrance); `LoadingSpinner.tsx` (CSS); `footer.tsx` (static, server component);
   `backgroundElements.tsx` (static glows, server-safe); `ui/tooltip.tsx`.
3. **Navbar & theme** — remove entrance, CSS hover underline, critically damped active pill, new mobile menu,
   icon crossfade, `resolvedTheme`, theme-color sync, remove debug code.
4. **Pages** — hero, about, projects, experience (reuse `PageHeader`), contact, error boundary.
5. **Verify** — `type-check`, `lint`, `build`, run in browser (light/dark, mobile width, reduced motion).
6. **Version** — `package.json` → `3.0.0`.

## 5. Rejected candidates (deliberately not animated)

- **Route/page transitions (View Transitions between pages)** — _Frequency_: core navigation, repeated each visit;
  the per-page header entrance already bridges the change. Adds complexity for little gain.
- **Nav link hover lift** — _Frequency_: tens per visit; color change is enough.
- **Hero avatar float / rotating rings** — _Purpose_: none named; slow ~0.2 Hz oscillation is a known vestibular trigger.
- **Perpetual chevron nudge on About social links** — _Purpose_: none; replaced by hover-triggered nudge (feedback).
- **Mouse-tracking tilt on project cards** — _Function_: cards carry text people read; decoration hinders.
- **`viewport-fit=cover` + safe-area padding** — this is a scrolling document, not an app shell; letterboxing
  is fine and cover would require left/right inset padding everywhere in landscape.

## 6. Out of scope for v3

- Wiring the contact form to a real backend (still simulated + "Under Construction" note).
- Deleting unused `utils/variant-examples.ts` / unused style presets.
- Content/copy changes.

## 7. Verification checklist

- [x] `npm run type-check` and `npm run build` pass
- [x] Lint clean — `npx eslint .` reports 0 errors (one pre-existing warning: `window.location.href`
      in `ErrorBoundary`, kept deliberately — a hard reload is the right recovery when React state broke).
      Note: `npm run lint` itself is broken on Next 16 (`next lint` was removed); the script still needs updating.
- [x] Home, About, Projects, Experience, Contact render content **before** JS hydrates — above-the-fold
      entrances are the CSS `.animate-enter` utility, not framer variants
- [x] Hero CTAs are `next/link` — client-side navigation, no full reload
- [x] Mobile menu (390px): opens from the top-right, absolutely positioned so it never pushes content,
      icon morphs to an X, active item marked; closes on link tap, Escape, and route change
- [x] Theme toggle: icon crossfade is CSS (correct icon server-rendered, no hydration flash);
      `resolvedTheme` means it works when the stored theme is `system`; circular reveal preserved
- [x] Light and dark both render correctly (checked at 1280px and 390px)
- [x] No console errors (the `<path d="undefined">` warning from the menu icon was fixed with a static `d`)
- [ ] Emulate `prefers-reduced-motion: reduce` → no movement, only fades
- [ ] Feel-check at 5× slowdown in DevTools Animations panel (entrance stagger, menu, icon swap)
- [ ] **Needs a real phone:** tap highlight gone, no sticky hover, `svh` hero fits under the URL bar, status bar color

## 8. Changes beyond the original findings

Small corrections found while implementing:

- `next-themes` needs `suppressHydrationWarning` on `<html>` — it was missing.
- Next 16 warns unless `scroll-behavior: smooth` is paired with `data-scroll-behavior='smooth'`.
- The theme toggle's `mounted` flag is gone entirely: both icons ship in the markup and CSS picks one,
  which also removes a `setState`-in-effect lint error.
- Mobile menu close-on-route-change is a render-time state adjustment rather than an effect,
  so the menu is already closed in the commit that paints the new route.
- `styles.ts` `containerStyles.page` moved from `min-h-screen` to `min-h-svh` along with the rest.
