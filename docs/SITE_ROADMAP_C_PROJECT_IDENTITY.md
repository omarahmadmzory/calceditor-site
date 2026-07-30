# SITE ROADMAP C — Project Identity (Site Scope)

*Site-scoped identity reference. Shared product facts are sourced from the calculator app's identity record and re-verified here against the live Site repository. Do not modify without a dedicated Site identity-change command. `docs/SITE_ROADMAP_INDEX.md` is the operational/bootstrap source; architecture belongs to `docs/SITE_CHARTER.md`; governance belongs to `docs/SITE_RULES.md`.*

---

## Product Identity (Shared)

| Field | Value | Verified against |
|---|---|---|
| App name | CalcEditor | `index.html`, `index_ar.html` `<title>` |
| Tagline | The Scientific Math Editor / محرّر الرياضيات العلمي | `index.html`, `index_ar.html` `<title>` |
| Official domain | `calceditor.app` | `CNAME` file at repository root |
| Developer / public attribution | Omar A. Kurdi | Carried from calculator app's identity record (not independently re-verifiable from Site source alone) |

## Public Contact (Site-Verified)

| Field | Value | Verified against |
|---|---|---|
| Public support / contact (user-facing) | `calceditorapp@gmail.com` | Live `mailto:` links in `index.html`, `index_ar.html`, `privacy-policy/index.html`, `privacy-policy/index_ar.html`, `support/index.html`, `support/index_ar.html` (updated S007; previously `Omarahmadmzory@gmail.com`) |

This is the only contact address that belongs on the website. Any other account credential (e.g. an app-store developer login) is out of Site scope by definition and is not recorded in this file — see `S-SRC-1` and the Exclusions section below.

## Relationship Between The App And The Website

The website is the public informational and legal surface for the CalcEditor Android app (see `docs/SITE_CHARTER.md` §3). It hosts the Privacy Policy and closed-beta tester instructions, and it is the intended target for the app's in-app/store privacy-policy link. It does not host, run, or duplicate any app functionality.

## Privacy Policy Public URL

| Field | Value | Status |
|---|---|---|
| Live path in this repository | `privacy-policy/index.html` (EN), `privacy-policy/index_ar.html` (AR) | Verified present |
| Intended public URL | `https://calceditor.app/privacy-policy` | Consistent with `CNAME` binding; live HTTPS/DNS reachability was not checked by this command (out of scope — see Unresolved Owner Decisions) |

## Release / Beta Wording (Verified Portion Only)

The Site's own repository shows a populated, bilingual home page and a complete bilingual Privacy Policy with closed-beta tester instructions (verified in `index.html` / `index_ar.html`, lines referencing "CalcEditor Closed Beta" and the Google-account testing-list process). This confirms the Site content itself is written and present. This document does not restate the calculator app's Play Console / Data Safety / tester-track checklist, since those items are app-store-only and outside Site scope (see Exclusions).

## Resolved Path References

S000 flagged two paths from the copied `Roadmap-C-ProjectIdentity.md` as needing verification:

| Referenced path | Exists in `calceditor-site`? | Exists in `calculator_app` (the Flutter repo)? | Resolution |
|---|---|---|---|
| `docs/site/index.html` | No | Yes (`D:\Projects\calculator_app\docs\site\index.html`) | This path belongs to the **calculator app repository**, not the Site. It is a source/draft file prepared there, distinct from this repository's actual deployed `index.html` at repo root. |
| `docs/legal/privacy-policy.html` | No | Yes (`D:\Projects\calculator_app\docs\legal\privacy-policy.html`) | Same resolution: this path belongs to the **calculator app repository**. The Site's actual deployed equivalents are `privacy-policy/index.html` and `privacy-policy/index_ar.html` at this repository's root. |

Both references are resolved, not ambiguous: they point to the calculator app repository's draft/source copies, not to anything missing from the Site. No `OWNER_DECISION_REQUIRED` flag is needed for these two specific paths.

## Excluded From This Document

Per S001 scope, the following calculator-app-only facts are intentionally **not** carried into Site identity documentation:

- Android `applicationId` (`com.atroshy.calceditor`)
- iOS bundle identifier
- Flutter release signing model (keystore, `key.properties`)
- Mobile OCR / ML Kit permission disclosures
- Google Play Console login address and any app-store-only release-track gate
- Any calculator-app-only source path

These remain accurate in the calculator app's own `docs/roadmap/Roadmap-C-ProjectIdentity.md` and are not duplicated here.

## Unresolved Owner Decisions

- **Live deployment/HTTPS status**: This command verified the `CNAME` file and repository content only. It did not perform a live network check of `https://calceditor.app` or `https://calceditor.app/privacy-policy` reachability — that is outside a documentation-migration command's scope. Record as `OWNER_DECISION_REQUIRED` / owner-verification-required until confirmed through an explicit deployment-status command.
