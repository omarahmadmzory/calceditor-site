# S005 Audit — Home Page Rebuild

**Command:** `S005 - SITE_HOME_PAGE_REBUILD`
**Date:** 2026-07-29
**Repository:** `D:\Projects\calculator_app\calceditor-site` (verified exact match)

---

## 1. Executive Summary

Rebuilt the CalcEditor Home page (English and Arabic) onto the S003 design-system tokens and S004 shell, applying strict color restraint per Owner feedback: every section background is a neutral token, the copper accent appears only at a few deliberate points. Fixed the S004B residual (hardcoded navy header/mobile-panel backgrounds), scoped exactly to the two background declarations as instructed. Verification surfaced and fixed a more significant latent defect: production `<body>` never carried the `cx-shell` class, so the page background was still rendering from the old, blue-tinted `site.css` token underneath all the new components. All existing Home copy was preserved verbatim; nothing was invented.

## 2. GO / CONDITIONAL_GO / NO-GO

**CONDITIONAL_GO.** No blocking defect. Non-blocking items: the same focus-visible live-verification limitation documented in S004 (environment does not grant real focus to `.focus()` calls — the underlying CSS rule is confirmed present and correctly scoped), and the Privacy Policy pages' `cx-shell` gap is explicitly deferred (out of this command's file scope).

## 3. Exact Repository Root

`D:/Projects/calculator_app/calceditor-site` — confirmed via `git rev-parse --show-toplevel`.

## 4. Baseline Home-Content Inventory

Read in full before writing: `index.html`/`index_ar.html` (post-S004 state — hero, trust strip, 6 feature cards, privacy section, beta CTA, beta modal, all wrapped in `<main>` from S004, otherwise unchanged since S002). No screenshot/logo/icon assets exist anywhere in `assets/` beyond the CSS/JS files already built in S003/S004 — confirmed via directory listing before proposing the product-presentation placeholder. No stats, download counts, or user numbers exist anywhere in the copy or in `docs/SITE_ROADMAP_C_PROJECT_IDENTITY.md` — none were invented.

**Preserved verbatim (facts, wording):** hero badge/heading/tagline/description, both CTA labels and destinations, all 5 trust-strip items, all 6 feature card titles/descriptions, the privacy section's body text and 7 chips, the beta section's body text and contact line, the beta modal (untouched, out of scope). **Restructured (presentation only):** every section now uses S003 component classes (`cx-display`, `cx-lead`, `cx-body`, `cx-card`, `cx-badge`, `cx-btn`) instead of the old `assets/site.css` classes; the hero's manual `<br>` line break was removed in favor of natural fluid wrapping (a presentation choice, not a copy change). **Added (new, per Owner-approved task 2):** a product-presentation section using the S003 `.cx-media-frame` placeholder, since no verified screenshot asset exists — honestly labeled "Product screenshot coming soon" / "لقطة شاشة للتطبيق قريباً", not a fabricated screenshot. **Deferred:** sourcing a real app screenshot (already an open Owner decision from the S002 roadmap, unchanged).

## 5. Exact Files Created

- `assets/css/site-home.css`

## 6. Exact Files Modified

- `index.html`
- `index_ar.html`
- `assets/css/site-shell.css` (two background declarations only — see §11)
- `docs/SITE_ROADMAP_INDEX.md`
- `docs/SITE_AGENT_SESSION_LOG.md`

`assets/site.js` and `assets/css/site-design-system.css` are confirmed **unchanged** (`git diff --stat` empty for both). `privacy-policy/index.html`, `privacy-policy/index_ar.html`, and `CNAME` are confirmed unchanged.

## 7. Skills Used

- **`frontend-design`** — Home structure/hierarchy pass: neutral-background rhythm throughout (no dominant colored/gradient section, directly reversing the old full-navy-gradient hero), a single accent-colored word in the H1, generous spacing, one clear focal element per section.
- **`review`** — not invoked; established GitHub-PR-only in S003/S004, unsuitable for this local diff per this command's own instruction. Documented local review performed instead (§16).
- **`run`** — no dev-server command exists for this static site; a temporary, non-repository `python -m http.server` was used for live verification and stopped afterward.

## 8. Home-Page Section-By-Section Summary

| Section | English | Arabic | Notes |
|---|---|---|---|
| Hero | "The **Scientific** Math Editor" | "محرّر الرياضيات **العلمي**" | One accent-colored word each; neutral background (inherits page `--cx-color-bg`, verified `rgba(0,0,0,0)` — no explicit section color) |
| Trust strip | 5 items | 5 items | `.home-surface-subtle` neutral band |
| Product presentation | Placeholder frame | Placeholder frame | `.cx-media-frame`, honest "coming soon" label, `role="img"` + `aria-label` |
| Features | 6 cards | 6 cards | `.cx-grid` + `.cx-card--feature`, all copy preserved |
| Privacy/trust | Body + 7 badges + policy link | Same | `.cx-container-narrow`, neutral background |
| Beta CTA | Badge + heading + Play-badge link | Same | `.home-surface-subtle` neutral band |
| Footer | Unchanged (S004) | Unchanged (S004) | Verified still integrates correctly |

## 9. Color-Restraint Compliance Evidence

Live-measured on the actual rendered Home page (not estimated):

| Element | Dark mode | Light mode |
|---|---|---|
| Page/body background | `rgb(18,18,18)` (`--cx-ink-900`, neutral) | `rgb(250,250,250)` (`--cx-paper-50`, neutral) |
| Hero section background | `rgba(0,0,0,0)` — transparent, inherits neutral body | same |
| Features section background | `rgb(23,23,23)` (`--cx-color-surface-subtle`, neutral) | neutral equivalent |
| Hero accent word | `rgb(226,160,119)` (light copper tint) | `rgb(168,70,10)` (copper) |
| Primary CTA background | `rgb(168,70,10)` (copper) | same |

No gradient, glow, or glass effect was added anywhere in `site-home.css`; the header/mobile-panel's existing `backdrop-filter: blur()` (S004, unmodified in structure) is the only translucency effect on the page, and its background color is now neutral (§11).

## 10. Header/Mobile-Menu Fix — Before/After And Contrast

| Selector | Before | After |
|---|---|---|
| `.cx-site-header` background | `rgba(15,20,36,.97)` (hardcoded navy) | `color-mix(in srgb, var(--cx-ink-900) 97%, transparent)` |
| `.cx-mobile-panel` background | `rgba(15,20,36,.99)` (hardcoded navy) | `color-mix(in srgb, var(--cx-ink-900) 99%, transparent)` |

Live-verified rendered background on both: `[18,18,18]` (`#121212`) — now identical to the footer's `var(--cx-ink-900)`, all three shell surfaces perfectly consistent. Contrast re-verification: nav-link text (`rgb(255,255,255)`) on the new header background = **18.73:1** (AAA). No other declaration in `site-shell.css` was touched — confirmed via `git diff` showing exactly these two lines changed.

## 11. Contrast Re-Verification Table

| Pairing | Result |
|---|---|
| Header/footer text on new background (dark, theme-invariant) | 18.73:1 |
| Hero H1 on body background (dark) | 16.68:1 |
| Hero lead/description on body background (dark) | 11.05:1 |
| Card title on body background (dark) | 16.68:1 |
| Accent word on body background (light) | 5.67:1 |
| CTA text on CTA background (both themes) | 5.92:1 |

All pass AA; most pass AAA.

## 12. Bilingual-Parity Findings

Identical section-class sequence confirmed between `index.html` and `index_ar.html` (`cx-section home-hero` → `cx-section home-product` → `cx-section` (features) → `cx-section` (privacy) → `cx-section home-beta`). Identical `href` sets except the expected language-specific Privacy Policy target and language-specific `mailto`/anchor equivalents. No structural divergence. No machine translation was used or needed — all Arabic copy is the pre-existing, previously human-authored content, only restructured.

## 13. Responsive Findings

No horizontal overflow at 320/360/390/430/768/1024/1366/1440/1920px on **both** `index.html` and `index_ar.html`, live-verified via `document.documentElement.scrollWidth` against `window.innerWidth` at each width. Mobile menu confirmed to open/close correctly on the rebuilt Home page without introducing overflow (panel right edge exactly at viewport width when open).

## 14. Accessibility Findings

Single `<h1>` in the hero, three `<h2>`s for the remaining sections, no skipped levels (verified scoped to `<main>` — the pre-existing, out-of-scope beta-modal `<h3>` sits outside `<main>` and was not touched). Skip link (`#main-content`) target confirmed present. All meaningful SVG icons carry `aria-hidden="true"` (purely decorative, paired with adjacent text). The product placeholder uses `role="img"` + a descriptive `aria-label` explicitly stating it's a placeholder. No inline event handlers were added anywhere. `prefers-reduced-motion` handling is inherited unchanged from S003 (no new transition/animation was introduced by this command).

**Known environment limitation**: live `:focus-visible` verification via synthetic `.focus()` calls does not work in this browser-automation environment (`document.activeElement` does not update — same finding as S004). The `.cx-shell :focus-visible` rule was confirmed present and correctly scoped in the loaded stylesheet by inspecting `document.styleSheets` directly, not assumed.

## 15. Review Findings And Resolutions

1. **Inline styles** — two `style="background:var(--cx-color-surface-subtle)"` attributes were used for section-background alternation; replaced with a `.home-surface-subtle` class in `site-home.css` before completion (avoidable, not "unavoidable" per the forbidden-scope wording).
2. **`<body>` missing `cx-shell` class** — found during contrast re-verification, not assumed: the actual rendered `body` background was `rgb(19,17,28)` (the old `assets/site.css` dark-mode `--bg` token, `#13111c`, itself blue/purple-tinted), not the new neutral token, because production `<body>` never carried the `class="cx-shell"` that S003's base rules target. Fixed by adding the class to both Home pages' `<body>` tags. Re-verified live post-fix: `rgb(18,18,18)` / `rgb(250,250,250)` (neutral) in dark/light respectively, and the Arabic page's font-stack/line-height rule (`[dir="rtl"] .cx-shell`) now also correctly activates for the first time. **Deferred**: the same gap exists on `privacy-policy/index.html`/`index_ar.html`, which are outside S005's file scope — flagged for a future command (S006 or a dedicated fix).
3. No dead links, no invented page references, no structural EN/AR divergence, no Privacy Policy change, no generic/templated visual treatment, no recognizable Apple/Calculator.net copying — all confirmed by direct inspection, no findings.

## 16. Deferred Findings

- Real app screenshot sourcing (pre-existing open Owner decision from S002 roadmap §36, unchanged by this command).
- `privacy-policy/index.html`/`index_ar.html` missing `class="cx-shell"` on `<body>` — same defect class as §15 item 2, out of S005's file scope, needs a dedicated small fix in a future command.
- Beta-modal's own styling (`.modal`, `.modal-content`) still uses the old `assets/site.css` dark-navy-ish treatment — not in this command's task list, not touched.

## 17. Commands Run

`git rev-parse --show-toplevel`; file reads/greps for baseline inventory and post-edit verification; `python -m http.server 8746`/`8747` (temporary, stopped after use each time); Browser tool `navigate`/`resize_window`/`javascript_exec`/`read_console_messages`/`read_network_requests`/`computer screenshot` for live verification; `git diff --stat`, `git status --short`, `git diff --check`, `git diff -- assets/css/site-shell.css`.

## 18. Skipped Checks And Exact Reasons

- **Visual screenshot capture**: attempted repeatedly; the Browser pane reported "not displayed, so the page is not compositing frames" each time, same as S004. All verification was via JavaScript DOM/CSS inspection instead.
- **Live focus-visible verification**: `.focus()` does not transfer real focus in this automation environment (confirmed independently again this command) — the CSS rule's presence and correct scope was verified via stylesheet inspection instead of live focus transfer.
- No linter/formatter/test command exists in the repository — none was skipped; none exists to run.

## 19. `git diff --check` Result

Exit code 0. Only harmless LF→CRLF line-ending notices on the modified text files.

## 20. Confirmation That S006 Did Not Begin

No new content page was created. No calculator/tool work began. Privacy Policy files are byte-identical to before this command. `docs/roadmap` was not created. No file outside `calceditor-site` was touched.
