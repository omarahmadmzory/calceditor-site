# Roadmap G — Legal, Platform & Tooling
*Split from ROADMAP_INDEX.md. Read for legal/licensing/release-gate questions, or platform-direction questions.*

---

## Release Legal / Privacy / IP Compliance Gate

**Current status:** RELEASE BLOCKED - final legal/privacy/IP/release revalidation is required before any public release.

**Current operational locks:**
- Current privacy/OCR/API-key lock: [archive/PRIVACY_DATA_SAFETY_OCR_API_KEY_RELEASE_GATE_LOCK.md](archive/PRIVACY_DATA_SAFETY_OCR_API_KEY_RELEASE_GATE_LOCK.md)
- Current release identity/signing/build-process lock: [archive/RELEASE_IDENTITY_SIGNING_BUILD_PROCESS_GATE_LOCK.md](archive/RELEASE_IDENTITY_SIGNING_BUILD_PROCESS_GATE_LOCK.md)
- Current licensing/NOTICE/provider-terms lock: [archive/LICENSING_NOTICE_THIRD_PARTY_TERMS_GATE_LOCK.md](archive/LICENSING_NOTICE_THIRD_PARTY_TERMS_GATE_LOCK.md)
- Current performance/beta-stability lock: [archive/PERFORMANCE_BETA_STABILITY_GATE_LOCK.md](archive/PERFORMANCE_BETA_STABILITY_GATE_LOCK.md)
- Current competitor-brand wording/iconography cleanup checkpoint: [archive/COMPETITOR_BRAND_WORDING_AND_ICONOGRAPHY_CLEANUP_CHECKPOINT.md](archive/COMPETITOR_BRAND_WORDING_AND_ICONOGRAPHY_CLEANUP_CHECKPOINT.md)

Current privacy posture, identity, signing model, release status, and privacy-policy assets remain in [Roadmap-C-ProjectIdentity.md](Roadmap-C-ProjectIdentity.md).

Historical Release / Privacy / Legal timeline: [docs/RELEASE_PRIVACY_LEGAL_HISTORY.md](../RELEASE_PRIVACY_LEGAL_HISTORY.md)

**Final pre-release revalidation requirements:** before public release, rerun the legal/IP/privacy audit; verify OCR/API-key removal or disclosure; verify third-party terms, licenses, NOTICE/ATTRIBUTIONS, STIX font provenance, permissions, health/statistics disclaimers, Play Data Safety, Apple App Privacy, app-store metadata, release artifact proof, and feature-scope/store-claim accuracy; do not claim patent clearance without professional legal review.

---

## Legal Safety / Reference And License Rule

Executable legal/license governance lives in [RULES.md](RULES.md), especially `G-LEGAL-1`. Compact project reminders and the Currency provider note remain here because they are practical Roadmap knowledge.

- Avoid patent, copyright, licensing, redistribution, or app-takedown risk.
- Use public mathematical formulas and independently implemented algorithms.
- Do not copy proprietary code, UI, workflows, datasets, tables, branding, product text, or model assets.
- APA-style or academic references may document formulas but do not grant code/license rights.
- Third-party code, packages, datasets, and AI models require explicit license and redistribution audit before use.
- No external API, SDK, package, model, asset, font, dataset, data source, or service may be integrated into CalcEditor until it is verified for legal/commercial usage permission, attribution/license requirements, privacy implications, Google Play compatibility, offline fallback behavior where relevant, rate limits/service stability, and maintenance risk.
- Current Currency Beta provider note: `https://open.er-api.com/v6/latest/USD` is used only as a bounded live-rate source with ExchangeRate-API attribution (`https://www.exchangerate-api.com/docs/free`). Keep manual refresh plus optional update-on-open bounded, preserve offline cached/default/manual behavior and custom IQD priority, and re-check provider terms/limits before public launch or larger-scale use.
- If patent, license, copyright, redistribution, or source status is unclear: STOP and recommend a legal-safety audit.
- For numerical methods: cite public references, keep implementation independent, do not copy from unvetted sources.

---

## Platform Vision

Mobile applied scientific calculator platform: education, engineering, medicine / clinical research, statistics, calculus, algebra, probability, graphing, programming / scripting. Product identity: **Desmos + Wolfram Alpha + Casio UX**.

**AI rule:** executable AI governance lives in [RULES.md](RULES.md), especially `G-AI-1`. Project direction: AI guides and explains. Deterministic engines/modules calculate. Engine output is source of truth. AI Applied Math & Domain Guidance Layer is deferred — see [DEFERRED_WORK.md](DEFERRED_WORK.md) D-25.
**Anti-bubble rule:** AI must not be added as a generic chatbot disconnected from tools. AI is useful only when grounded in `EngineExplanation` metadata, deterministic engine output, explicit assumptions/warnings, and user-provided inputs.
**Competitive inspiration rule:** Learn from Casio, Photomath, Desmos, Wolfram Alpha. Do not copy proprietary UI, wording, workflows, branding, or protected content.

---

## Tooling Rules

Active tooling and verification governance lives in [RULES.md](RULES.md). This section is a pointer only; do not duplicate rule bodies here. Common tooling rule IDs include `K-SBX-1`, `G-CODEX-VERIFY-1`, `G-EXEC-1`, `G-ACCEL-1`, `G-ARCH-COMPAT-1`, `K-THEME-1` through `K-THEME-5`, and `K-LOC-DIR-1`.

---

## Command Numbering Convention

Every command has a global sequence number incrementing by 1. The `END` line must use the same number. Sub-commands use suffixes (e.g., `823.1`, `1030A`).

**Command history in archive:**
- Commands 1–672: [archive/PHASE_2_CLOSURE.md](archive/PHASE_2_CLOSURE.md) · [archive/PHASE_3_RESULT_MODEL_CLOSURE.md](archive/PHASE_3_RESULT_MODEL_CLOSURE.md)
- Commands 672–795: [archive/PHASE_4_CLOSURE.md](archive/PHASE_4_CLOSURE.md) · [archive/PHASE_5_STATISTICS_NORMAL_Z_AND_SAMPLE_SIZE.md](archive/PHASE_5_STATISTICS_NORMAL_Z_AND_SAMPLE_SIZE.md)
- Commands 796–1160: [archive/SESSION_LOG_ARCHIVE_1047_1160.md](archive/SESSION_LOG_ARCHIVE_1047_1160.md)
- Commands 1161–2049: [AGENT_SESSION_LOG.md](AGENT_SESSION_LOG.md)
- Commands 2050–2191 (frozen at the 2026-07-25 documentation split): [archive/Roadmap-A-CommandHistory.md](archive/Roadmap-A-CommandHistory.md)
- Commands 2192–present: [AGENT_SESSION_LOG.md](AGENT_SESSION_LOG.md) only — the pointer table in `ROADMAP_INDEX.md` is a snapshot, not a log (see `K-DOC-1`)
