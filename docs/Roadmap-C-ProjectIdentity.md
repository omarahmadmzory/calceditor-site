# Roadmap C — Project Identity Snapshot
*Split from ROADMAP_INDEX.md. Operational reference for future sessions. Values confirmed through 1421. Do not modify without a dedicated identity-change command. ROADMAP_INDEX is the authoritative operational/bootstrap source; current high-level architecture belongs to `docs/CHARTER.md`, and executable governance belongs to `docs/roadmap/RULES.md`.*

---

## App Identity

| Field | Value |
|-------|-------|
| App name | CalcEditor |
| Tagline | The Scientific Math Editor |
| Organization / publisher label | O.A.Kurdi |
| Android `applicationId` | `com.atroshy.calceditor` |
| iOS bundle ID | `com.example.calculatorApp` — **deferred; must be updated before any iOS release** |
| Version (current) | 1.0.0 |
| Official domain | `calceditor.app` |
| Developer / public attribution | Omar A. Kurdi |

## Contacts and Accounts

| Role | Address | Notes |
|------|---------|-------|
| **Public support / contact (user-facing)** | `Omarahmadmzory@gmail.com` | Use in privacy policy, tester instructions, About & Legal, Play store contact |
| Google Play developer account login | `omaratroshy656@gmail.com` | Play Console login only — do not use as public support address |

These are two separate roles. Never conflate them. Always use `Omarahmadmzory@gmail.com` for any user-visible contact reference.

## Signing Model

Production release signing is configured. Signing materials (keystore file, `key.properties`, passwords, key aliases) are stored **outside the Flutter repository and workspace** in external secure local storage. Do **not** commit keystores, `key.properties`, passwords, or any signing secrets to the repository. No signing paths, passwords, or certificate details are recorded here.

## Privacy Posture (v1 — local-only)

| Area | Status |
|------|--------|
| Data architecture | Local-only — all calculations, history, settings stored on-device only |
| Analytics | None intentionally added |
| Ads | None |
| Cloud OCR (Google Vision / MathPix) | Removed from release build (confirmed 1404) |
| User accounts / cloud sync | None |
| Tracking SDKs | None intentionally added |
| INTERNET permission | Present — from dependency / runtime model-download behavior (ML Kit); must be disclosed in privacy policy unless removed |

Any addition of analytics, crash reporting, ads, cloud OCR, accounts, or tracking must reopen the privacy/Data Safety gate before reaching any Play testing track.

## Release Status

| Track | Status | Remaining |
|-------|--------|-----------|
| Internal testing | **GO** | — |
| Closed beta | **Pending owner actions** | All code/docs ready. Owner must: deploy calceditor-site, verify HTTPS, enter URL in Play Console, complete Data Safety + Health + content-rating forms, create tester track, upload AAB (see 1418 audit items O1–O14) |
| Public release | **NO-GO** | Full store/legal/release-artifact gate not yet closed |

## Privacy Policy Assets

| Asset | Location |
|-------|----------|
| Privacy policy draft | `docs/legal/PRIVACY_POLICY_CALCEDITOR_V1_DRAFT.md` |
| Play Data Safety answer sheet | `docs/legal/PLAY_DATA_SAFETY_ANSWERS_CALCEDITOR_V1_DRAFT.md` |
| Hosting plan + Play Console sequence | `docs/audits/PRIVACY_POLICY_HOSTING_CLOSED_BETA_SETUP_1413_2026-05-19.md` |
| Hosting backend | GitHub Pages (`calceditor-site` repository — separate from Flutter source repo) |
| Official public URL | `https://calceditor.app/privacy-policy` (target; pending DNS + deployment) |
| Fallback URL during propagation | `https://<username>.github.io/calceditor-site/privacy-policy` |
| HTML file (deploy-ready) | `docs/legal/privacy-policy.html` |
| Hosting setup guide | `docs/audits/GITHUB_PAGES_DOMAIN_PRIVACY_POLICY_HOSTING_SETUP_1415_2026-05-19.md` |
| Live status | **Not yet deployed — owner action required** |
| Infrastructure / recovery baseline | `docs/audits/PUBLIC_INFRASTRUCTURE_OWNERSHIP_AND_RECOVERY_BASELINE_1417_2026-05-19.md` |
| Closed-beta final readiness audit | `docs/audits/CLOSED_BETA_FINAL_READINESS_AUDIT_1418_2026-05-19.md` |
| Landing page (deploy-ready) | `docs/site/index.html` — for `https://calceditor.app` |
| Landing page setup guide | `docs/audits/CALCEDITOR_SITE_LANDING_PAGE_SETUP_1419_2026-05-19.md` |
| DNS + GitHub Pages setup guide (definitive) | `docs/audits/CALCEDITOR_DOMAIN_DNS_GITHUB_PAGES_SETUP_1420_2026-05-19.md` |
