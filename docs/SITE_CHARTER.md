# SITE CHARTER — CalcEditor Website Current Architecture

---

## 1. Purpose And Authority

This file is the current high-level architecture and ownership authority for the **CalcEditor Site project** (the `calceditor-site` repository) only.

`docs/SITE_RULES.md` is the sole executable governance authority for Site commands. This Charter is not a rules file and does not restate Git, sandbox, verification, audit, or stop-condition rules.

This Charter supersedes the calculator app's `docs/CHARTER.md` for all Site work. The calculator app's Charter has no authority over the Site and is not referenced by Site commands.

---

## 2. Site Project Boundary

The Site project is the independent repository `calceditor-site`, with its own Git history and its own remote (`github.com/omarahmadmzory/calceditor-site.git`, branch `main`). It is not a submodule of, and does not share build, source, or runtime with, the CalcEditor Flutter application repository (`calculator_app` / `CalcEditor.git`).

Site commands use the independent `S###` namespace (see `SITE_RULES.md`). Site documentation lives under `calceditor-site/docs/`, never under `docs/roadmap/`.

---

## 3. Product Relationship Between The App And The Website

The website is the public-facing informational and legal surface for the CalcEditor Android application. It does not run, embed, evaluate, or reimplement any part of the calculator's editing or evaluation engines. Its role is limited to: presenting the product, hosting the Privacy Policy, and providing tester/contact information.

Shared **facts** (app name, tagline, domain, public contact address) are sourced from `docs/SITE_ROADMAP_C_PROJECT_IDENTITY.md`, which in turn traces to the calculator app's identity record. The website does not own those facts; it displays them.

---

## 4. Current Website Source Ownership

Verified from the current repository tree (`calceditor-site`, inspected 2026-07-29):

| Path | Role |
|---|---|
| `index.html` | English home page |
| `index_ar.html` | Arabic home page (`lang="ar" dir="rtl"`) |
| `privacy-policy/index.html` | English Privacy Policy |
| `privacy-policy/index_ar.html` | Arabic Privacy Policy |
| `assets/site.css` | Shared stylesheet |
| `assets/site.js` | Shared client-side script |
| `CNAME` | GitHub Pages custom-domain binding (`calceditor.app`) |
| `README.md` | Repository description |

No build tool, package manager, or CI workflow file was found in the repository (no `package.json`, no `.github/workflows/`, no bundler config). The site is a plain static HTML/CSS/vanilla-JS site as currently observed. This Charter does not assume a framework will be introduced; that decision is deferred to a future planning command.

---

## 5. Page / Rendering Responsibility

Each page is a self-contained static HTML file. There is no server-side rendering and no client-side templating framework in the current source. Shared chrome (navigation, theme toggle, hamburger menu) is applied at runtime by `assets/site.js` (`renderNav()`, `bindThemeToggle()`, `bindHamburger()`), reading `data-site-lang`, `data-site-page`, and `data-site-root` attributes set on each page's `<html>` tag.

---

## 6. Navigation Responsibility

Navigation rendering is owned by `assets/site.js`. Path resolution is relative, driven by the `data-site-root` attribute per page (e.g. `"."` at the site root, `".."` under `privacy-policy/`), not by an absolute-path or framework router.

---

## 7. Localization Responsibility

The site currently ships parallel English and Arabic pages (`index.html` / `index_ar.html`, `privacy-policy/index.html` / `privacy-policy/index_ar.html`) rather than a single templated bilingual page. Language switching is handled by `assets/site.js` (`siblingPath()`, `routeLanguage()`), which maps between the English and Arabic sibling file for the current page.

---

## 8. RTL/LTR Responsibility

Arabic pages set `dir="rtl"` at the `<html>` level (confirmed in `index_ar.html`); English pages set no `dir` attribute (default LTR). Direction is a per-page HTML attribute, not a runtime toggle. Any RTL/LTR change must preserve this per-page-file model unless a dedicated Site command changes the architecture.

---

## 9. Content Ownership

User-facing marketing and product copy (home pages) and legal copy (Privacy Policy pages) are owned by the Site repository directly — there is no CMS or external content source currently in evidence.

---

## 10. Asset Ownership

Static assets (`assets/site.css`, `assets/site.js`) are owned and versioned inside `calceditor-site`. No third-party asset CDN, web-font service, or external script tag was found in the current source.

---

## 11. SEO And Metadata Ownership

Currently minimal: `index.html` carries a single `<meta name="description">` tag. No Open Graph, Twitter Card, or `<link rel="canonical">` tags were found in the inspected source. This Charter records the current state only; it does not define a target SEO architecture — that is deferred to a future planning command (S002 or later).

---

## 12. Privacy / Legal Ownership

The Privacy Policy is owned and hosted by this repository at `privacy-policy/index.html` (English) and `privacy-policy/index_ar.html` (Arabic), with contact address `Omarahmadmzory@gmail.com` (verified live in both pages). Legal/platform governance detail lives in `docs/SITE_ROADMAP_G_LEGAL_AND_PLATFORM.md`, not in this Charter.

---

## 13. Deployment Ownership

Verified from the repository only: `CNAME` binds the site to `calceditor.app`, consistent with GitHub Pages hosting. No deployment workflow file (e.g. GitHub Actions) was found in the repository, so the deployment mechanism beyond the `CNAME` binding is not asserted here. `docs/SITE_ROADMAP_C_PROJECT_IDENTITY.md` records the release-status facts already verified elsewhere; this Charter does not restate them.

---

## 14. Future Advertising Boundary

The current live site and Privacy Policy explicitly state no ads, no analytics, no tracking, and no advertising SDKs (verified in `index.html` and `privacy-policy/index.html`, e.g. "No accounts. No cloud sync. No analytics. No ads."). This Charter does not authorize any advertising, analytics, or tracking integration. Any future Google AdSense or analytics work requires a separate, explicitly approved Site command and is governed by `docs/SITE_ROADMAP_G_LEGAL_AND_PLATFORM.md`.

---

## 15. Production Authority Versus Planning / Reference Documents

| Document | Status |
|---|---|
| Live files under repository root (`index.html`, `index_ar.html`, `privacy-policy/`, `assets/`) | Production authority — the actual deployed site |
| `docs/SITE_CHARTER.md` (this file) | Current architecture reference, not itself production code |
| `docs/SITE_ROADMAP.md` | Placeholder only; full planning deferred to S002 |
| `docs/SITE_ROADMAP_C_PROJECT_IDENTITY.md`, `docs/SITE_ROADMAP_D_GOVERNANCE_AND_PROCESS.md`, `docs/SITE_ROADMAP_G_LEGAL_AND_PLATFORM.md` | Reference/governance documents, not production code |

Changing this Charter never changes production site behavior by itself; only changes to the actual HTML/CSS/JS files do.

---

## 16. Explicit Exclusion Of Calculator Architecture

The following CalcEditor Flutter-application concepts are **outside** Site architecture and are not referenced, inherited, or reused by any Site document: `Expr`, `CursorAddress`, `MathInputController`, `EditingEngine`, `NavigationEngine`, `MathDisplay`, `MathLayoutEngine`, `MathPainter`, Standard/Advanced evaluation authority, `TreeWalkingNumericEngine`, `CalculatorEngine`, Flutter widget/theme tokens, mobile editor/cursor/viewport internals, and any Dart-specific rule or contract. The calculator app's `docs/CHARTER.md` remains authoritative for the Flutter app only and has no bearing on this Site.
