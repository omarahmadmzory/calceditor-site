# SITE ROADMAP — CalcEditor Website Implementation Roadmap

## 1. Document Authority And Status

This document is the Site's implementation-planning authority, created by **S002 - SITE_RESEARCH_SKILLS_AND_ROADMAP_CREATION**, replacing the S001 placeholder. It is a planning document, not production code and not itself executable governance — governance remains `docs/SITE_RULES.md`; architecture-authority remains `docs/SITE_CHARTER.md`. This roadmap does not authorize implementation by itself; each phase below is executed only through its own dedicated, Owner-approved `S###` command.

**Planning status: CONDITIONAL_GO** (see §38).

## 2. Executive Summary

The Site is a small, well-built, static bilingual (EN/AR) single-page site plus a bilingual Privacy Policy, live at `https://calceditor.app` on GitHub Pages, verified reachable over HTTPS during this command. It is honest, fast, and privacy-accurate, but its navigation currently presents as anchor "tabs" on one long page rather than a scalable multi-page architecture, and it has no SEO metadata beyond a description tag, no accessibility audit, and no template for future calculator/tool pages. This roadmap defines an original CalcEditor design and information architecture — informed by, never copied from, Apple's presentation quality and Calculator.net's navigational scalability — and sequences the work so that a single shared visual/navigation foundation is built and Owner-approved **before** any calculator/tool content expansion begins, with expansion afterward proceeding through many small, bounded commands using a reusable tool-page template.

## 3. Current Repository And Technology Baseline

Verified by direct inspection of `D:\Projects\calculator_app\calceditor-site` during S002 (not inferred from filenames):

| Item | Finding |
|---|---|
| Independent Git repository | Yes — own `.git`, remote `github.com/omarahmadmzory/calceditor-site.git`, branch `main` |
| Production source root | Repository root (`index.html`, `index_ar.html`, `privacy-policy/`, `assets/`) |
| Technology stack | Static HTML5 + hand-written vanilla CSS (`assets/site.css`, one file) + vanilla JS (`assets/site.js`, one IIFE, no dependencies) |
| Framework | None. No `package.json`, no bundler config, no `node_modules`, no JSX/Vue/Astro/Next files found anywhere in the tree |
| Package manager | None in use |
| Build command | None exists — files are deployed as authored |
| Validation/lint command | None exists in the repository |
| Deployment configuration | `CNAME` file (`calceditor.app`) only; no GitHub Actions workflow file found — consistent with GitHub Pages serving the repository directly from `main` |
| Routing model | File-based: `index.html` / `index_ar.html` at root, `privacy-policy/index.html` / `privacy-policy/index_ar.html` in a subfolder. No client-side router |
| Localization model | Parallel sibling files per language (not a shared template with a translation layer). `assets/site.js` handles browser-language auto-redirect and an explicit-preference cookie-free `localStorage` flag (`lang_explicit`) |
| Content model | Content is hard-coded directly in each HTML file; no CMS, no data file, no templating |
| Asset/font model | No custom web fonts; system font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ...`) for both languages. Icons are inline hand-drawn SVGs (no icon font, no icon library) |
| Metadata/SEO model | One `<meta name="description">` and one `<meta name="robots" content="index, follow">` per page; no Open Graph, no Twitter Card, no canonical link, no `hreflang`, no `sitemap.xml`, no `robots.txt` found anywhere in the repository |

## 4. Current Live-Site Baseline

Verified live during S002 (read-only inspection, `https://calceditor.app/` and `https://calceditor.app/privacy-policy`):

- Both routes return HTTP 200 over HTTPS. `https://calceditor.app/` serves `index.html`/`index_ar.html`; `https://calceditor.app/privacy-policy` serves `privacy-policy/index.html`/`index_ar.html` (GitHub Pages folder-index resolution).
- Browser-language auto-detection redirected this session to the Arabic variant on first load, exactly matching the `routeLanguage()` logic in `assets/site.js`.
- No unexpected network requests were observed beyond `site.js`/`site.css` and the page document itself — no third-party scripts, no analytics, no ad requests.

## 5. Repository/Live-Site Mismatch Findings

**None found.** Live page text, structure, and asset requests match the repository source exactly (verified by comparing live `get_page_text` output against the repository's `index.html`/`index_ar.html`). The site is genuinely deployed and current — this resolves the "live deployment status" item S001 had flagged as unverified.

## 6. Governance Baseline

This roadmap operates under `docs/SITE_RULES.md` (`S-CTX-1, S-SCOPE-1, S-SRC-1, S-DOC-1, S-LOG-1, S-ENC-1, S-SBX-1, S-EXEC-1, S-LEGAL-1, S-LOC-DIR-1, S-VERIFY-1, S-NUM-1`) and `docs/SITE_CHARTER.md`. No governance document was changed by S002. All facts above were verified against real files/live responses per `S-SRC-1`, not assumed.

## 7. Installed Skills Inventory

Skills genuinely available in this session, inspected before any selection (exact installed names; nothing invented):

| Skill (exact name) | Relevant category match |
|---|---|
| `frontend-design` | Web/visual design |
| `humanizer` | Content design (removes AI-sounding prose) |
| `dataviz` | Data visualization (low relevance today) |
| `content-research-writer` (`anthropic-skills:content-research-writer`) | Content design/research |
| `quick-research` | Research/planning |
| `explainer-graphic`, `visual-page-builder`, `workflow-visualizer` | Diagram/illustration generation |
| `artifact-design`, `artifact-capabilities` | Claude.ai Artifact publishing (not production web code) |
| `web-artifacts-builder` (`anthropic-skills:web-artifacts-builder`) | React/Tailwind/shadcn Claude.ai artifacts (not this Site's static-HTML stack) |
| `review`, `security-review`, `simplify` | Code review / security review |
| `run` | Local preview/launch of a dev server or static site |
| `canvas-design`, `theme-factory`, `brand-guidelines` | Visual/brand design tools, but scoped to Anthropic-branded or generic artifact output, not an independent product's production identity |
| `docx`, `pdf`, `pptx`, `xlsx` | Document format tooling (not applicable to a website) |

No skill named exactly "SEO", "Accessibility", "Performance", "Internationalization/Localization", "RTL/LTR", "Browser testing", "Web testing", or "Static-site development" was found installed. No framework-specific skill exists because no framework is in use (§3). These gaps are reported honestly rather than filled with an invented name; accessibility/SEO/performance/RTL work will proceed under `S-LOC-DIR-1`, `S-VERIFY-1`, and this roadmap's own §22–24 requirements using ordinary review, not a dedicated Skill.

## 8. Selected Skills

| Skill | Purpose | Site phases | Expected contribution | Restrictions | Required reading |
|---|---|---|---|---|---|
| `frontend-design` | Primary visual-design skill — genuinely installed, relevant, no governance conflict | Phase 1 (design system, navigation, footer, Home) and all later visual work | Design: original token system, layout, typography, component design | Must not copy Apple/Calculator.net; must produce an original CalcEditor identity, not a generic template (§9, §12); must respect `S-LOC-DIR-1` bilingual/RTL requirements | `SITE_CHARTER.md`, `SITE_RULES.md` (`S-LOC-DIR-1`, `S-LEGAL-1`), this roadmap §9, §12 |
| `humanizer` | Polish EN/AR marketing and educational copy so it reads naturally, not AI-generated | Home copy refinement, future FAQ/About/tool-explanation content | Content: prose quality | Must not alter factual/privacy claims (§26); must preserve both language versions in parity | `SITE_ROADMAP_G_LEGAL_AND_PLATFORM.md` (no-ads/no-tracking statements) |
| `review` | Review implementation diffs for quality/consistency | Every implementation command from S003 onward | Code review | Advisory only; does not replace `S-VERIFY-1` checks | `SITE_RULES.md` |
| `security-review` | Dedicated review before any tracking/ads/third-party script is added | Any future AdSense/analytics-readiness command (not before) | Security/privacy review | Must not be used to justify adding tracking without Owner approval (§28) | `SITE_ROADMAP_G_LEGAL_AND_PLATFORM.md` |
| `run` | Launch/preview the static site locally for visual/interaction verification | Every implementation command that changes rendered output | Testing/verification | Read-only preview; must not be used to deploy | `SITE_RULES.md` (`S-VERIFY-1`) |

`quick-research` and `content-research-writer` are available and may assist future research-heavy commands (e.g. font-licensing checks, competitor scans) but are not pre-assigned to a specific phase here.

## 9. Skill Usage Matrix (Proposed S003+)

| Proposed command | Primary Skill(s) |
|---|---|
| S003 — Design system foundation (tokens/components) | `frontend-design` |
| S004 — Shared header/navigation/footer | `frontend-design`, `review` |
| S005 — Home page foundation rebuild | `frontend-design`, `humanizer`, `review` |
| S006 — Foundation responsive/accessibility/SEO verification | `run`, `review` |
| S007+ — Content pages (Support, FAQ, About) | `humanizer`, `content-research-writer`, `review` |
| S010 — Shared calculator/tool page template | `frontend-design`, `review` |
| S012+ — Individual calculator/tool commands | `review`, `run` (template reused, not redesigned) |
| Future AdSense-readiness command (not yet numbered) | `security-review`, `review` |

## 10. Apple Reference Analysis (Principles Only, Non-Copying)

| Principle | Why useful for CalcEditor | Original CalcEditor interpretation | What must not be copied |
|---|---|---|---|
| One clear message per section/card | Visitors grasp value fast | Each feature card keeps its current one-line value proposition; hero keeps one core promise | Apple's exact product-card copy, pricing-card layout, or imagery |
| Strong visual hierarchy via type scale | Guides the eye without clutter | Define a CalcEditor type scale (§21) distinct from Apple's San Francisco system | Apple's typeface, exact type-scale numbers, or iconography |
| Generous, consistent whitespace | Reads as premium and calm | Apply a defined spacing scale (§21) consistently across sections | Apple's exact spacing tokens or grid |
| Restrained motion | Feels refined, not gimmicky | Keep existing subtle hover/transition patterns; avoid heavy animation | Apple's specific transition curves/timings as a literal copy |
| Clear top-level category navigation | Helps visitors self-select their need | Inform the future Tools navigation model (§7 of governance doc; §17 below) | Apple's exact nav wording/order/icons |
| Confident, short calls to action | Reduces friction | Keep concise CTAs like "Get Early Access" | Apple's exact CTA phrasing |
| Mobile-first refinement | Site must work as well on a phone as on desktop | Apply to CalcEditor's responsive plan (§22) | Apple's exact breakpoints or component code |

## 11. Calculator.net Reference Analysis (Principles Only, Non-Copying)

| Principle | Why useful for CalcEditor | Original CalcEditor interpretation | What must not be copied |
|---|---|---|---|
| Category-grouped tool navigation (Financial / Fitness / Math / Other) | Scales to many tools without becoming unmanageable | CalcEditor's future Tools hub groups by category relevant to its own feature set (scientific, statistics, health) — see §27 | Calculator.net's exact category names, list order, or page copy |
| Flat, descriptive, keyword-bearing URLs (`/xxx-calculator.html` pattern) | Aids discoverability and predictability | Define a CalcEditor URL convention in §27, not identical to Calculator.net's | Calculator.net's literal URL slugs |
| Consistent per-tool page structure | Makes hundreds of pages maintainable | Basis for the shared tool template (§27) | Calculator.net's page layout, branding, or on-page text |
| Prominent search for tool discovery | Useful once tool count grows | Recommend search only once tool volume justifies it (§17) | Calculator.net's search UI/branding |
| Short "about us"/mission statement building trust | Establishes credibility simply | CalcEditor's own About page (deferred, §17) states its own mission | Calculator.net's actual wording |
| Free-to-use, no-registration framing | Matches CalcEditor's existing no-accounts stance | Reinforces CalcEditor's already-true privacy promise | Nothing — this principle is already native to CalcEditor |

## 12. Originality And Non-Copying Boundaries

- No Apple or Calculator.net source code, CSS, images, icons, fonts, trademarks, or trade dress may be copied, referenced by URL, or downloaded into this repository.
- No page structure may be reproduced section-for-section from either reference site.
- The design system (§21) must be derived from CalcEditor's own existing purple/navy identity (already present in `assets/site.css`) and content, not from a reference site's palette or type system.
- `frontend-design`'s own instructions already require an original design plan reviewed against generic-AI-design defaults before implementation (per that Skill's process) — this roadmap requires the same discipline additionally against the two named references specifically.

## 13. Product Audiences

| Audience | Need from the Site |
|---|---|
| Prospective Android users evaluating the app | Fast understanding of what CalcEditor does, trust signals (privacy, offline), a clear path to closed-beta access |
| Existing closed-beta testers | Contact/support path, confidence the product is actively maintained |
| Privacy-conscious visitors / reviewers (e.g. before granting permissions) | An accurate, easy-to-read Privacy Policy |
| Future: students/educators seeking specific calculators | Fast, discoverable, credible individual tool pages (deferred to later phases) |
| Future: Play Store / app-store reviewers or press | An About page and credible, professional presentation |

## 14. Content Strategy

Preserve all existing, verified-accurate copy (feature descriptions, privacy chips, beta instructions) as the factual basis for the redesigned Home page — rewrite presentation, not facts. Net-new content (FAQ, About, Support page, individual tool explanations) is written only when each respective page is actually implemented, not speculatively now. All new user-facing copy must exist in both English and Arabic before a page ships (`S-LOC-DIR-1`).

## 15. Information Architecture

Minimum evaluated set, with a phase-based decision per page (kept intentionally small at launch of the new architecture; see §17 for numbering):

| Candidate page | Decision |
|---|---|
| Home | Rebuild (Phase 1) |
| Features | Remain a Home section for Phase 1; promote to its own page only if content volume later justifies it (Owner decision, deferred) |
| Download / Beta | Remain a Home section/CTA for Phase 1; revisit once the app is actually live on Google Play (content trigger, deferred) |
| Support / Contact | Currently a `mailto:` link only; promote to a real page in Phase 2 once Phase 1 is approved |
| FAQ | New, Phase 2 (deferred) — only if real recurring questions exist to answer |
| About | New, Phase 2 (deferred) |
| Privacy Policy | Preserve content and URL; integrate into new navigation/footer (Phase 1 navigation change, zero content change) |
| Calculators / Tools hub | New, Phase 3 (deferred), gated on the shared template (§27) |
| Educational Tools | Folded into the Calculators/Tools architecture (§27), not a separate top-level page |

No page is added "for appearance only" — every new page above has a stated trigger or phase dependency.

## 16. Proposed Site Map

```text
/ (Home, EN)                          index.html
/?lang=ar → index_ar.html (Home, AR)  index_ar.html
/privacy-policy/                      privacy-policy/index.html
/privacy-policy/ (AR)                 privacy-policy/index_ar.html
[Phase 2, deferred] /support/ , /support/ (AR)
[Phase 2, deferred] /faq/ , /faq/ (AR)
[Phase 2, deferred] /about/ , /about/ (AR)
[Phase 3+, deferred] /tools/ (hub) , /tools/ (AR)
[Phase 3+, deferred] /tools/<category>/ , /tools/<category>/ (AR)
[Phase 4+, deferred] /tools/<category>/<tool>/ , (AR)
```

## 17. Page-By-Page Roadmap

| Page | Purpose | Audience | Primary goal | Main sections | Primary CTA | Secondary CTA | Header nav | Footer nav | EN route | AR route | SEO role | Content status | Phase | Dependencies |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Home | Introduce product, drive beta signup | Prospective users | Beta signup / understanding | Hero, trust strip, features, privacy, beta CTA | "Get Early Access" | "Explore Features" | Yes | Yes | `/` | `/?lang=ar` | Primary entry point, target of all inbound links | Rewrite presentation, preserve facts | Phase 1 (S005) | Design system (S003), nav/footer (S004) |
| Privacy Policy | Legal transparency | All visitors, reviewers | Inform | 15 sections + appendix (existing) | None (informational) | Contact link | Yes (footer/nav link) | Yes | `/privacy-policy/` | `/privacy-policy/` (AR file) | Indexed, linked from Home/footer | Existing, preserve content | Phase 1 nav integration only | S004 |
| Support/Contact | Give testers/users a clear contact path | Beta testers, users | Contact | Contact method(s), response expectation | `mailto:` link | — | Deferred to Phase 2 | Deferred to Phase 2 | `/support/` | `/support/` (AR) | Low | New | Phase 2 (deferred) | Phase 1 approved |
| FAQ | Answer recurring questions | Prospective/beta users | Reduce support load | Q&A list | — | Contact | Deferred | Deferred | `/faq/` | `/faq/` (AR) | Medium (long-tail search) | New, only if real questions accumulate | Phase 2 (deferred) | Phase 1 approved, real FAQ content |
| About | Credibility, story | Press, reviewers, users | Trust | Mission, developer, product story | — | Contact | Deferred | Deferred | `/about/` | `/about/` (AR) | Low-medium | New | Phase 2 (deferred) | Phase 1 approved |
| Calculators/Tools hub | Entry point to future tools | Students/general users | Tool discovery | Category grid | Search (if justified) | — | Deferred | Deferred | `/tools/` | `/tools/` (AR) | High (long-term) | New | Phase 3 (deferred) | Shared template (S010) |

## 18. Navigation Architecture

Replacing the current anchor-tab presentation with a scalable model:

| Aspect | Recommendation |
|---|---|
| Desktop/laptop header | Persistent (sticky) header: logo, primary links (Home, Features-anchor-or-page, Privacy), language switcher, theme toggle, primary CTA button — evolving the existing pattern rather than discarding it |
| Tablet | Same header, links may condense; test at 768–1024px explicitly (§22) |
| Mobile / small phone | Hamburger-triggered dropdown (existing mechanism), extended with clear focus/keyboard handling (§23) |
| Logo behavior | Always links Home; stays legible down to 320px (existing `text-overflow:ellipsis` guard reviewed, not assumed sufficient) |
| Active-page state | New requirement — current nav has no active-state styling; must be added |
| Language switcher | Keep existing `?lang=` + sibling-file model; make it keyboard/screen-reader accessible with an explicit current-language indication |
| Download/Beta CTA | Stays a persistent nav button until the app is live on Play, then re-evaluated |
| Tools navigation | Not built until Phase 3; when built, uses category structure from §27, not a flat dropdown of every tool |
| Footer navigation | Legal (Privacy Policy), Support/Contact, copyright — expand only as new pages ship |
| Breadcrumbs | Not justified while the site is single/few-page; revisit once `/tools/<category>/<tool>/` depth exists (Phase 3+) |
| Sticky header | Keep sticky (already implemented); verify it never overlaps content or obscures focus on small screens |
| Navigation depth | Maximum 2 levels at launch (top nav → page); 3 levels only once Tools categories exist (top nav → category → tool) |
| Keyboard/screen-reader/focus/menu-close/scroll behavior | New explicit requirements — see §23; current mobile menu has no documented keyboard/focus handling and must gain it |
| Search/filters for tools | Not justified today (few/no tools yet); revisit once tool count is large enough (informed by Calculator.net principle, §11) |

## 19. Arabic/English Architecture

| Aspect | Decision |
|---|---|
| Default locale | English at the root URL; Arabic served via sibling file, with automatic browser-language redirect already implemented (kept) |
| Locale route strategy | Continue the existing sibling-file model (`page.html` / `page_ar.html`) for consistency with current architecture; a directory-per-locale (`/en/`, `/ar/`) restructure is not justified by current evidence and is not recommended without a dedicated migration command |
| Language switcher behavior | Explicit link + `localStorage` "explicit preference" override (existing, kept) |
| Persistent preference / browser detection / fallback | Existing `lang_explicit` flag and `navigator.languages` detection verified working live; kept |
| Missing-translation behavior | Not applicable today (full parity exists); future pages must ship both languages together — a page must not go live in only one language |
| Document `lang`/`dir` | Existing per-file `lang="en"`/`lang="ar" dir="rtl"` model verified correct; kept |
| RTL/LTR CSS strategy | Continue and expand logical-property usage (`border-inline-start` already used in `.summary-box`); audit and convert remaining physical-direction properties as part of S003/S004 |
| Directional icon behavior | Existing manual `scaleX(-1)` flip pattern (seen on Play badge/arrow icons) kept but formalized as a documented pattern in the design system (§21) |
| Navigation mirroring | Nav flips via `dir="rtl"` at the document level (existing default browser/CSS behavior); verify explicitly per `S-LOC-DIR-1` |
| Numerals | Existing Arabic page uses Eastern Arabic numeral for the copyright year (`٢٠٢٦`); keep this as the established Arabic-numeral convention for date-like content, reviewed per page |
| Human translation requirement | All Arabic copy must be human-written or human-reviewed, matching the existing quality bar; machine translation is not acceptable as a final production source (per Owner requirement) |
| SEO metadata parity (`hreflang`, canonical, OG) | New requirement, defined in §24 |

## 20. RTL/LTR Architecture

Covered jointly with §19 above; key explicit additions required going forward: complete the logical-CSS-property audit (replace remaining `left`/`right`/`margin-left`/`margin-right` with `inset-inline-*`/`margin-inline-*` where found), and add automated-style manual verification of both directions to every future visual command's checklist (§23, §31).

## 21. Design-System Direction

| Aspect | Direction |
|---|---|
| Brand personality | Precise, calm, technically credible — "a scientific instrument that respects your privacy," not a playful consumer app |
| Visual tone | Keep the existing navy/purple identity already established in `assets/site.css` (`--navy`, `--purple` family) as the seed; refine rather than replace |
| English typography | System font stack (already in use); confirm no licensing exposure since no custom font file is shipped |
| Arabic typography | System font stack currently used for Arabic pages; evaluate during S003 whether a dedicated Arabic web font would improve legibility, with an explicit font-license check (`S-LEGAL-1`) before adopting one |
| Font licensing checks | Required before any new font is added; not needed for the current system-font baseline |
| Type scale, spacing scale, grid, max content width, breakpoints | To be formally defined as design tokens in S003 (not invented in this planning document — this is planning, not implementation, per S002 scope) |
| Cards, buttons, inputs, navigation, footer, icons | Evolve existing patterns (`.feature-card`, `.btn-primary`/`.btn-secondary`, inline SVG icons) into a documented, reusable token-driven system |
| Hero, product screenshots, feature sections, educational sections, tool cards, trust indicators | Hero/features/trust-strip patterns already exist and are reused; product screenshots are not yet present in the repository — evaluate sourcing real app screenshots as a content dependency for S005 |
| Backgrounds, borders, shadows, radius system, motion | Existing `--radius`, subtle `box-shadow` on card hover, and CSS transitions are the seed for a formal, documented system |
| Reduced-motion behavior | New requirement — no `prefers-reduced-motion` handling currently exists; must be added |
| Hover/focus/pressed/loading/empty/error states | Hover exists on several elements; focus-visible styling, pressed state, and loading/empty/error states are not currently defined and must be added |
| Color contrast | Must be verified against WCAG AA as part of §23, not assumed from current colors |
| Light/dark mode | Both already implemented (`prefers-color-scheme` + manual toggle via `localStorage`); keep both, verify contrast in both explicitly |
| Arabic/English visual consistency | Both language variants must use the same token system; verified per page, not assumed |

Future design execution uses the `frontend-design` Skill (§8), which must produce an original design per its own process discipline and per §12 above — not a generic template and not a reference-site copy.

## 22. Responsive Requirements

Breakpoints and conditions to validate (existing CSS already defines 640px and 360px breakpoints as a starting point; final breakpoint set is an implementation decision for S003/S004, not fixed here):

320px small phones · 360–430px phones · large phones · tablets (768–1024px) · small laptops · wide desktop · very wide screens · portrait · landscape · touch · mouse · keyboard · text zoom · browser zoom · long Arabic text · long English text · dynamic content height · mobile menu overflow · footer wrapping · card/grid collapse · images/screenshots · CTA wrapping · future tool lists · form fields · Privacy Policy readability (existing responsive table-to-card collapse pattern in `assets/site.css` is a good precedent to keep).

**Acceptance criteria** (apply to every implementation command touching layout): no horizontal page overflow · no clipped navigation · no unreadable text · no overlapping controls · no inaccessible menus · no layout shift from late-loading assets · stable reading order · correct RTL layout · correct LTR layout.

## 23. Accessibility Requirements

Semantic HTML · correct heading hierarchy (existing pages already use a mostly-correct `h1`→`h2` structure — verify, don't assume, per page) · landmarks (`<nav>`, `<main>`, `<footer>` — `<main>` is currently missing and should be added) · skip link (not currently present — new requirement) · full keyboard navigation · visible focus states (not currently defined — new requirement) · screen-reader labels for icon-only controls (theme toggle and hamburger currently have `aria-label`; extend this pattern everywhere) · accessible mobile menu and language switcher · accessible forms (none exist yet; required when Support/contact forms are ever added) · WCAG-AA color contrast · text resizing support · `prefers-reduced-motion` support (missing) · adequate touch target sizing · descriptive link purpose · image alt text (all current images are decorative inline SVG icons — confirm each is correctly marked decorative or labeled) · Arabic and English screen-reader behavior verified separately · Privacy Policy page readability.

**Conformance target**: aim for WCAG 2.1 AA as a practical working target for new/rebuilt pages. This roadmap does not claim certification — only a dedicated accessibility verification command (S006) can report actual conformance evidence.

## 24. SEO And Discoverability Requirements

Page titles and meta descriptions per page (existing, extend to new pages) · canonical URLs (missing, new requirement) · `hreflang` alternates between EN/AR siblings (missing, new requirement) · Open Graph + social preview image (missing, new requirement — needs a designed share image, a content dependency) · structured data (deferred until a concrete need, e.g. FAQ schema when the FAQ page ships) · `sitemap.xml` (missing, new requirement) · `robots.txt` (missing, new requirement) · internal links · breadcrumbs (deferred, §18) · semantic headings · alt text · localized metadata per language · consistent domain/HTTPS (already verified working) · redirect and 404 behavior (not yet verified — add to S006 verification scope) · no keyword-stuffed content.

## 25. Performance Requirements

HTML/CSS are already small (single files, no build step, no unused framework weight) — this is a genuine strength to preserve. JavaScript is minimal (one small IIFE, no dependencies). Requirements going forward: keep a strict JS budget (no framework runtime added without a dedicated, evidenced justification) · optimize any future screenshot/images (responsive `srcset`, compression, lazy-loading below the fold) · font-loading strategy only becomes relevant if a custom font is adopted (§21) · maintain layout stability (no CLS regressions) · leverage GitHub Pages' existing caching/compression · avoid third-party scripts entirely unless a dedicated, approved command adds one (§28) · plan Core Web Vitals checks into S006.

## 26. Privacy And Legal Requirements

Governed by `docs/SITE_ROADMAP_G_LEGAL_AND_PLATFORM.md` and `S-LEGAL-1`. No implementation command may alter the verified-accurate no-ads/no-tracking/no-analytics statements in `index.html`/`privacy-policy/index.html` without that being the explicit, approved purpose of the command. No cookie, consent, tracking, or analytics mechanism may be added incidentally to a design/navigation command.

## 27. Future Calculators/Tools Architecture

Long-term, the Site may eventually host dozens to hundreds of calculators/tools across multiple categories, in both languages, each needing consistent structure, related-tool links, metadata, and accessibility. This is only manageable through a **single reusable shared tool-page template**, created and Owner-approved once (S010) before any broad tool expansion begins. The template should eventually standardize: page structure · header/footer integration · tool title/description · input layout · result layout · validation/error states · educational explanation · formula/method explanation · related tools · FAQ · accessibility · Arabic/English parity · RTL/LTR behavior · metadata · structured data · canonical/alternate-language URLs · testing approach · responsive behavior · performance expectations.

Categories should be organized around CalcEditor's actual existing feature set as a starting point (scientific/math, statistics, health — mirroring the app's own feature cards in §11's comparison), not copied from Calculator.net's category list. URL convention: a flat, descriptive, per-tool path under `/tools/<category>/<tool-name>/` (both EN and AR), decided during S010, not invented here.

**Template-first discipline**: the template is created and approved before large-scale calculator expansion (S010, Phase 3). Every subsequent calculator command (S012 and onward) adds or updates only one calculator, or one tightly related small group, and reuses the template rather than redesigning each page. This is exactly how the roadmap keeps a potentially very long tail of future work (extending through S050, S100, and beyond as the tool library grows) manageable: the design decision is made once, and every later command is a small, bounded content-and-logic task, not a design task. Any future change to the shared template itself must be its own dedicated shared-architecture command, then propagated — never changed silently inside an individual tool command.

**Hard dependency, restated from Owner priority**: no individual calculator/tool page may be implemented before the Phase 1 shared visual/navigation foundation (S003–S006) is complete, verified, and Owner-approved, and no calculator/tool command may begin before the Phase 3 template (S010) exists and is Owner-approved.

## 28. Future Google AdSense Readiness

No ads are implemented now. Analysis only, per `docs/SITE_ROADMAP_G_LEGAL_AND_PLATFORM.md`:

| Page type | Recommendation |
|---|---|
| Home | Ad-free strongly preferred — first impression, trust-building |
| Privacy Policy | Must remain ad-free; ads here would undermine the page's own credibility |
| Support/Contact | Ad-free — transactional/trust page |
| Download/Beta | Ad-free — conversion-focused |
| Tool pages (future) | Only plausible future placement, and only after: content maturity, layout-shift-safe placement design, consent/cookie mechanism, and updated Privacy Policy language — all as one dedicated, separately approved command |
| Educational pages (future) | Same conditions as tool pages |

Mobile placement risk (accidental taps, CLS), desktop placement risk (content displacement), accessibility, and performance must all be evaluated in that future dedicated command, not assumed acceptable now. Consent/cookie/tracking implications and required Privacy Policy changes must be resolved before any ad request is even prepared for. The current no-ads/no-tracking/no-analytics statements must not change until that command explicitly changes them with Owner approval.

## 29. Technical Architecture Recommendation

**Recommendation: keep the current static HTML/CSS/vanilla-JS architecture and improve it incrementally.**

Evidence: the repository has zero build tooling, zero framework dependency, and already loads fast with a tiny JS/CSS footprint (§3, §25) — a genuine, evidenced strength for an informational/legal site of this size. Nothing in the current repository, the live site, or this roadmap's page count (single digits at Phase 1–2, growing gradually at Phase 3+) demonstrates a need a framework would solve; a template/component system can be achieved with disciplined, hand-authored HTML/CSS/JS plus the shared-template discipline in §27. A framework migration is explicitly **not recommended** at this time — it would add build tooling, dependency risk, and JS weight without a demonstrated problem it solves. This recommendation should be revisited only if a future audit finds concrete evidence of unmanageable duplication that the shared-template approach (§27) cannot solve.

## 30. Implementation Phases

| Phase | Goal | Included scope | Excluded scope | Dependencies | Skills | Verification | Entry criteria | Exit criteria | Stop conditions | Owner decisions |
|---|---|---|---|---|---|---|---|---|---|---|
| **Phase 1 — Shared visual foundation, navigation, footer, Home** (S003–S006) | Release-quality shared design system + professional navigation replacing the current tab presentation + shared footer + rebuilt Home page | Design tokens, header/nav, footer, Home rebuild, responsive/accessibility/SEO verification of that scope only | Any calculator/tool content, any new page beyond Home, AdSense, analytics | S002 roadmap approval | `frontend-design`, `review`, `run` | Manual responsive/RTL/LTR/accessibility pass, `git diff --check`, link check | Owner approves this roadmap | Owner reviews and approves Phase 1 output | Any production change attempted outside S003–S006's own approved scope | Visual direction sign-off |
| **Phase 2 — Content pages** (S007+) | Support, FAQ, About pages | New pages listed in §17 | Tools/calculators | **Phase 1 fully approved by Owner** | `humanizer`, `content-research-writer`, `review` | Same verification discipline as Phase 1, scoped per page | Phase 1 approved | Each page live, bilingual, linked from nav/footer | Phase 1 not yet approved | Real FAQ content source |
| **Phase 3 — Tools architecture** (S010–S011) | Shared tool-page template + Tools hub/category structure | Template design, hub page | Individual calculators | **Phase 1 approved**; Phase 2 not strictly required first but recommended | `frontend-design`, `review` | Template reviewed against §27 checklist | Phase 1 approved | Template approved by Owner | Template attempted before Phase 1 approval | Category taxonomy |
| **Phase 4 — Individual tools** (S012 onward, potentially through S050/S100+) | Add tools one (or one tightly related group) at a time | One calculator/tool per command, reusing the template | Template changes (own dedicated command only) | **Phase 3 template approved** | `review`, `run` | Per-tool functional + responsive + accessibility + bilingual check | Template approved | Tool live, correct, bilingual | Any attempt to batch many tools in one command | Tool prioritization order |
| **Phase 5 — AdSense readiness** (not yet numbered) | Prepare for possible future ads | Legal/consent/layout analysis only | Actual ad implementation | Owner-initiated, any time after Phase 1 | `security-review`, `review` | Legal/privacy review | Owner explicitly requests this phase | Analysis delivered, no ads live | Any ad code appearing outside this phase's own command | Whether to pursue ads at all |

**Explicit priority restated**: the first implementation phase after S002 is dedicated entirely to the shared visual system, navigation, footer, and Home page — not tools. No calculator/tool page may be implemented before this foundation is complete, verified, and Owner-approved.

## 31. Verification Strategy

Because no build/test tooling exists (§3, `S-VERIFY-1`), verification for every future implementation command relies on: manual responsive checks across the breakpoint set in §22, manual RTL/LTR checks per §20, manual accessibility checks per §23 (keyboard traversal, screen-reader labels, contrast), link/route verification, `git diff --check`, and live-preview inspection via the `run` skill / Browser tool. If a linter, formatter, or automated accessibility/performance tool is deliberately added later, `S-VERIFY-1` must be updated by a dedicated command before it's assumed available.

## 32. Browser/Device Validation Matrix

| Class | Examples | What to check |
|---|---|---|
| Small phone | 320–360px width | No overflow, readable text, tappable controls |
| Standard phone | 375–430px width | Hamburger menu, hero, cards stack correctly |
| Tablet | 768–1024px | Header condenses correctly, grid reflow |
| Laptop | 1280–1440px | Full desktop header, multi-column features grid |
| Wide desktop | 1920px+ | Max-content-width honored, no excessive line length |
| RTL (Arabic) | All above | Mirrored layout correct, no leftover LTR-only assumptions |
| LTR (English) | All above | Baseline correctness |
| Keyboard-only | Any width | Full navigation without a mouse, visible focus |
| Screen reader | Any width | Landmarks, labels, heading order announce correctly |

## 33. Risks

| Risk | Mitigation |
|---|---|
| Phase 1 scope creep into content expansion | §30 explicit phase gating; Owner approval required between phases |
| RTL regressions when adding new components | §20 logical-CSS-property discipline + mandatory RTL check per command |
| Accessibility debt accumulating silently (no automated tooling) | §23 explicit checklist required every command touching UI |
| Template designed too rigidly, blocking future tool needs | S010 explicitly reviewed/approved by Owner before broad reuse begins |
| AdSense pressure conflicting with current privacy promises | §28 hard-gates any ad work behind a dedicated, separately approved command |
| Font/asset licensing exposure if a new font is later adopted | §21 explicit license-check requirement before adoption |

## 34. Stop Conditions

Any future Site command must stop and report rather than proceed if: it would touch calculator-app files, it would touch anything outside `calceditor-site`, it would add tracking/ads/cookies without a dedicated approved command, it would begin tool-specific work before Phase 1/Phase 3 gates are met, or it would require guessing an Owner decision listed in §36.

## 35. Deferred Work

Support page, FAQ page, About page, Tools hub, individual calculators, custom Arabic web font evaluation, structured data, social preview image design, sitemap/robots.txt creation, AdSense-readiness analysis execution — all deferred to their respective phases above, not started by S002.

## 36. Open Owner Decisions

- Final visual-direction sign-off for the Phase 1 design system (to occur when `frontend-design` produces its plan during S003, per that Skill's own brainstorm-then-approve process).
- Whether/when to source real app screenshots for the Home page (content dependency for S005).
- Whether to adopt a dedicated Arabic web font (§21) — pending a license check if pursued.
- Tool category taxonomy and prioritization order (Phase 3/4).
- Whether and when to pursue Google AdSense at all (Phase 5 is Owner-initiated, not assumed).

None of these block starting Phase 1 planning/execution; they are decisions to be made at their respective points, not blockers to this roadmap's completion.

## 37. Proposed S003+ Command Sequence

| # | Title | Goal | Dependencies | Max tasks | Allowed scope | Forbidden scope | Skills | Verification | Audit | Owner approval |
|---|---|---|---|---|---|---|---|---|---|---|
| S003 | SITE_DESIGN_SYSTEM_FOUNDATION_TOKENS_AND_COMPONENTS | Define original design tokens (color, type, spacing, radius, motion) and core component styles (buttons, cards, states) | S002 roadmap approved | 5 | `assets/site.css` token layer, design documentation | Page content, nav/footer assembly, any calculator page | `frontend-design`, `review` | Manual visual review, contrast check, `git diff --check` | YES | Required before S004 |
| S004 | SITE_SHARED_HEADER_NAVIGATION_AND_FOOTER | Replace tab-style nav with the professional nav model (§18); build shared footer | S003 | 5 | `assets/site.js`/`site.css` nav+footer, both language variants | Home body content, tool pages | `frontend-design`, `review` | Responsive + RTL/LTR + keyboard + screen-reader check | YES | Required before S005 |
| S005 | SITE_HOME_PAGE_FOUNDATION_REBUILD | Rebuild Home using S003/S004 foundation, preserving verified facts | S003, S004 | 5 | `index.html`, `index_ar.html` | New pages, tools | `frontend-design`, `humanizer`, `review` | Full §22/§23/§24 checklist for Home only | YES | Required before S006 |
| S006 | SITE_FOUNDATION_RESPONSIVE_ACCESSIBILITY_SEO_VERIFICATION | Dedicated QA pass across §22–24 for the Phase 1 foundation before Owner sign-off | S003–S005 | 4 | Verification and fix-up only, no new features | New pages, tools | `run`, `review` | Full validation matrix (§32) | YES | **Phase 1 gate — required before any Phase 2/3 command** |
| S007 | SITE_SUPPORT_CONTACT_PAGE | Build dedicated Support/Contact page | Phase 1 approved | 4 | New `/support/` EN+AR pages | Tools | `humanizer`, `content-research-writer`, `review` | §22–24 for this page | YES | Phase 2 start |
| S008 | SITE_FAQ_PAGE | Build FAQ page from real recurring questions | Phase 1 approved, FAQ content sourced | 4 | New `/faq/` EN+AR pages | Tools | `humanizer`, `review` | §22–24 for this page | YES | Content sourcing |
| S009 | SITE_ABOUT_PAGE | Build About page | Phase 1 approved | 4 | New `/about/` EN+AR pages | Tools | `humanizer`, `review` | §22–24 for this page | YES | Story/content approval |
| S010 | SITE_SHARED_CALCULATOR_TOOL_PAGE_TEMPLATE | Design and approve the reusable tool-page template (§27) | Phase 1 approved | 5 | Template design + one placeholder instance for review only | Any real published calculator | `frontend-design`, `review` | Full §27 checklist | YES | **Phase 3 gate — required before any individual tool command** |
| S011 | SITE_TOOLS_HUB_AND_CATEGORY_STRUCTURE | Build the `/tools/` hub and category pages using the approved template | S010 approved | 4 | `/tools/` hub + category shells (no calculator logic yet) | Individual calculator logic | `frontend-design`, `review` | §22–24 for hub/category pages | YES | Category taxonomy |
| S012+ | *(one calculator/tool per command, e.g. `SITE_TOOL_BMI_CALCULATOR`)* | Add exactly one calculator or tightly related small group | S010, S011 | 5 | One tool's page + content | Template changes, other tools | `review`, `run` | Per-tool §22–24 checklist | YES | Per-tool content accuracy |

This sequence is expected to continue for many small commands beyond S012 as the tool library grows (potentially reaching S050, S100, and beyond); later command numbers are not pre-created here, only the pattern and gating discipline are fixed.

## 38. Planning GO / NO-GO

**CONDITIONAL_GO.** The roadmap is implementation-ready for Phase 1 (S003) without any blocking unresolved decision. The open items in §36 are non-blocking Owner preferences to be resolved at their respective, later decision points, not prerequisites for starting S003.
