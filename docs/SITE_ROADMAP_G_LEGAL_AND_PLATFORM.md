# SITE ROADMAP G — Legal & Platform (Site Scope)

*Read for legal/licensing/content questions, or before integrating any third-party script, font, or service into the Site.*

---

## Legal Safety / Reference And License Rule (Pointer)

Executable legal/license governance for the Site lives in `docs/SITE_RULES.md`, specifically `S-LEGAL-1`. This section holds practical, Site-specific detail only; it does not restate the rule body.

- **Copyright and licensing**: Do not copy proprietary code, layout, wording, or branding from other products (see the Platform Vision note below). Independently write all Site copy and markup.
- **Fonts and image licensing**: Any web font or image added to `assets/` must be verified for commercial/redistribution permission before use. None currently in evidence beyond system/default fonts in `assets/site.css` (not independently re-verified by this command — check at time of any font addition).
- **Trademark and trade-dress safety**: Do not imitate the protected visual identity, iconography, or trade dress of Casio, Photomath, Desmos, Wolfram Alpha, or any other competitor product referenced for inspiration.
- **External embeds**: Any embedded third-party widget, iframe, or script requires a license/privacy check under `S-LEGAL-1` before integration.
- **Analytics and tracking**: None present today (verified — see below). Do not add without a dedicated, explicitly approved command.
- **Cookies and consent**: The Site currently sets no cookies and requires no consent banner, consistent with "no tracking" claims. Any future cookie-setting mechanism (including a consent banner itself, if it stores a preference) must be reviewed under `S-LEGAL-1` before implementation.
- **Privacy Policy alignment**: The Privacy Policy (`privacy-policy/index.html`, `privacy-policy/index_ar.html`) must stay accurate to what the app and site actually do. Do not edit its data-collection claims without verifying them against actual app/site behavior first.
- **Contact/support data handling**: The only public contact channel is `mailto:Omarahmadmzory@gmail.com` (see `docs/SITE_ROADMAP_C_PROJECT_IDENTITY.md`). The Site does not currently collect form submissions, so there is no server-side contact-data handling to govern.
- **Third-party scripts**: None found in `index.html`, `index_ar.html`, `assets/site.js`, or the privacy-policy pages as of this command. Adding any third-party script (CDN library, embed, widget) requires a `S-LEGAL-1` check first.
- **Future Google AdSense review boundary**: Explicitly out of scope for any command other than a dedicated, separately approved AdSense-integration command. See the dedicated section below.
- **Hosting/domain ownership**: Hosting is GitHub Pages with a custom domain bound via the repository's `CNAME` file (`calceditor.app`). No other hosting mechanism was found in the repository.
- **Deployment approval**: Any change to `CNAME`, DNS-facing configuration, or the deployment mechanism itself requires explicit Owner approval — this is a hosting/domain change, not an ordinary content edit.
- **Accessibility and legal content ownership**: Legal content (Privacy Policy) is owned by this repository; general accessibility posture has not been separately audited by this command and is not asserted here.

---

## Current Verified No-Ads / No-Tracking / No-Analytics Statements

The following statements are live in the repository as of this command and must **not** be changed silently by any future command:

- `index.html` meta description: "Local-only. No tracking. No accounts."
- `index.html`: "No accounts. No cloud sync. No analytics. No ads." and a "No analytics" chip.
- `privacy-policy/index.html` §7 ("Analytics, Advertising, and Crash Reporting"): "CalcEditor does not include analytics SDKs, advertising SDKs, tracking SDKs, or crash-reporting SDKs... No advertising, behavioral profiling, cross-app tracking, or data monetization occurs."
- `privacy-policy/index.html`: "CalcEditor v1 does not use Google Cloud Vision, MathPix, Firebase, AdMob, Google Analytics, Crashlytics, or similar cloud or analytics services."

Any command that adds analytics, tracking, or advertising must update these statements consistently and truthfully as part of that same explicitly approved command — not as a side effect of an unrelated change.

---

## Future Google AdSense Boundary

- Actual Google AdSense integration (script inclusion, ads.txt, ad placement) **requires a separate, explicitly approved Site command**. It is not authorized by S001 and must not be started under S002's research/planning scope either, unless S002 itself is explicitly scoped to include it.
- Privacy and consent implications (cookie/consent banner requirements, Privacy Policy updates, GDPR/CCPA disclosure updates) must be reviewed and resolved **before** any ad or tracking script is added, not after.
- Any AdSense-integration command must explicitly update the no-ads/no-tracking/no-analytics statements listed above as part of its own scope.

---

## Platform Vision (Site-Relevant Portion)

The Site represents a product positioned as an educational scientific calculator, informed by (not copying) Casio, Photomath, Desmos, and Wolfram Alpha UX conventions. Competitive inspiration is limited to general UX learning; proprietary UI, wording, workflows, branding, or protected content must not be copied (see `S-LEGAL-1`).

**AI rule (forward-looking only)**: The Site currently has no AI feature. If one is ever proposed, it must be governed by a rewritten Site-specific AI rule defined in a dedicated command, not by the calculator app's `G-AI-1`, which is excluded from Site governance per `docs/SITE_RULES.md`.

---

## Site Command Numbering

The Site's command-numbering convention is governed by `S-NUM-1` in `docs/SITE_RULES.md`: Site commands use `S001`, `S002`, `S003`, ... sequentially and independently of the calculator app's global numeric command sequence. This document does not restate that rule's body — see `docs/SITE_RULES.md` → `S-NUM-1`.

The calculator app's "every command has a global sequence number incrementing by 1" convention (previously copied into this repository) has been removed from Site governance as of S001; it does not apply to `S###` commands.
