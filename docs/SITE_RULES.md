# SITE RULES — CalcEditor Website Governance

Purpose: `docs/SITE_RULES.md` is the sole executable governance authority for Site (`S###`) commands. Normal bootstrap is:

```text
SITE_ROADMAP_INDEX.md
SITE_RULES.md
Work
```

This file governs the `calceditor-site` repository only. It does not govern, and is not governed by, the calculator app's `docs/roadmap/RULES.md`.

## Rule Index

Active Site rules: S-CTX-1, S-SCOPE-1, S-SRC-1, S-DOC-1, S-LOG-1, S-ENC-1, S-SBX-1, S-EXEC-1, S-LEGAL-1, S-LOC-DIR-1, S-VERIFY-1, S-NUM-1.

Referenced / Definition Missing: None.

---

## K-SOURCE-1 Reference Resolution

S000 named `K-SOURCE-1` as a mandatory rule to review. It does not exist anywhere in the copied calculator `RULES.md` (its own Rule Index lists no such ID, and its file states "Referenced / Definition Missing: None"). Per S001 instruction, this reference is **not** fabricated. Instead, the genuinely needed capability — verifying a claim against the real repository/live content before recording it as fact — is defined below as a new, Site-owned rule: **S-SRC-1**. The old `K-SOURCE-1` reference is recorded as invalid and is not carried forward under any name.

---

## S-CTX-1 — Site Context Reading Discipline

- Rule Summary: Read narrow, load Site documentation lazily.
- Applies When: Every Site (`S###`) session and command.
- Required Behavior: Read `docs/SITE_ROADMAP_INDEX.md` fully first, then `docs/SITE_RULES.md` fully, then open only the targeted `docs/SITE_ROADMAP_*.md` or `docs/SITE_CHARTER.md` section the current command's scope needs.
- Forbidden Behavior: Do not preemptively load every `SITE_*` file "just in case." Do not read the calculator app's `docs/roadmap/` files for Site governance.
- Verification Notes: If a needed Site document does not exist yet, report the gap instead of inventing its content.

## S-SCOPE-1 — Site Scope Escalation Discipline

- Rule Summary: Start from the narrowest Site source and widen only when required.
- Applies When: Any Site audit, investigation, or command preparation.
- Required Behavior: Default order is newest relevant `docs/audits/` entry, `SITE_ROADMAP_INDEX.md`, targeted `SITE_CHARTER.md`/`SITE_ROADMAP_*.md` section, `SITE_AGENT_SESSION_LOG.md` by command number, then live repository files only as needed.
- Forbidden Behavior: Do not jump to broad repository scans when a Site document already answers the question. Stop and ask before widening beyond the command's stated scope.

## S-SRC-1 — Source-Of-Truth Verification Rule

- Rule Summary: A path, fact, or identity claim in Site documentation must be verified against the actual repository tree or live file content before being recorded as current; unverifiable claims are marked `OWNER_DECISION_REQUIRED` rather than guessed.
- Applies When: Recording file paths, contact details, domain/identity facts, deployment claims, or any statement inherited from a copied or historical document.
- Required Behavior: Inspect the real file (`ls`/`grep`/read) before asserting it exists or contains a given fact. When a referenced path resolves in a different repository than the one being documented, state that explicitly rather than silently adopting or silently dropping it.
- Forbidden Behavior: Do not copy a path or fact from an old document into a Site canonical document without checking it against the current repository. Do not resolve an ambiguous cross-repository reference by guessing which repository owns it.
- Verification Notes: This rule replaces the invalid `K-SOURCE-1` reference (see resolution note above) with genuine Site-specific content.

## S-DOC-1 — Site Documentation Placement Rule

- Rule Summary: Site documentation lives in a flat structure directly under `calceditor-site/docs/`.
- Applies When: Creating, updating, or reading Site roadmap, rules, charter, audit, or session-log documents.
- Required Behavior: Canonical Site governance/reference documents use the `SITE_` prefix directly under `docs/`. Active Site audits go in `docs/audits/`.
- Forbidden Behavior: Do not create `docs/roadmap/` inside the Site repository. Do not use calculator-oriented canonical filenames (`CHARTER.md`, `RULES.md`, `Roadmap-<letter>-<topic>.md`) as active Site authorities after migration.

## S-LOG-1 — Site Session Logging And Pointer Update Rule

- Rule Summary: Every completed Site command updates the pointer and prepends a session-log entry.
- Applies When: Completing any `S###` command.
- Required Behavior: Update `docs/SITE_ROADMAP_INDEX.md`'s pointer fields by replacing (not appending to) `Latest completed` / `Current` / `Status` / `Next`. Prepend a compact entry to `docs/SITE_AGENT_SESSION_LOG.md`. Create an audit file in `docs/audits/` when the command's DOCUMENTATION section requires one.
- Forbidden Behavior: Do not let the pointer table accumulate history rows. Do not mark a command complete in the pointer if its verification failed or is incomplete. Do not copy calculator numeric command history into the Site session log.

## S-ENC-1 — UTF-8 And Arabic Text Safety Rule

- Rule Summary: Bilingual EN/AR Site content must be read, written, and verified with explicit UTF-8 handling and scanned for mojibake after edits.
- Applies When: Reading or writing any Site page or document containing Arabic text (e.g. `index_ar.html`, `privacy-policy/index_ar.html`) or other non-ASCII content.
- Required Behavior: Use explicit UTF-8 reads/writes. After editing, re-read the file and scan for mojibake indicators (e.g. `â€”`, `Ø`/`Ù` corruption patterns). Preserve valid Arabic, English, and punctuation content exactly.
- Forbidden Behavior: Do not use encoding-naive tooling on bilingual files. Do not guess the intended text of a corrupted Arabic sequence.

## S-SBX-1 — Sandbox And Bounded-Command Safety Rule

- Rule Summary: Avoid repeated broad operations; keep Site commands bounded.
- Applies When: Any Site command that could otherwise trigger recursive traversal or repository-wide search.
- Required Behavior: Use targeted search first. If an operation stalls, stop, report the limitation, and narrow scope.
- Forbidden Behavior: Do not run broad scans, builds, or tests without explicit command scope authorizing them.

## S-EXEC-1 — Site Execution Workflow Rule

- Rule Summary: Default Site workflow is audit, implement, verify, document.
- Applies When: Any Site command involving change, not pure research.
- Required Behavior: Audit/research first when scope is unclear; implement narrowly within the command's Allowed scope; verify with the checks the command specifies; document at command completion per `S-LOG-1`.
- Forbidden Behavior: Do not skip verification or documentation for a command that changed files. Do not treat a documentation-only command as requiring build/test verification it does not need.

## S-LEGAL-1 — Site Legal, Copyright, Attribution, Privacy, And Third-Party Integration Safety Rule

- Rule Summary: Avoid copyright, licensing, attribution, privacy, and consent risk on the public website.
- Applies When: Adding or changing fonts, images, third-party embeds, scripts, analytics, tracking, cookies, or advertising on the Site.
- Required Behavior: Verify commercial/legal permission, attribution requirements, and privacy/consent implications before integrating any external asset or service. Preserve existing no-ads/no-tracking/no-analytics statements on the live site and Privacy Policy unless a dedicated, explicitly approved command changes them.
- Forbidden Behavior: Do not copy proprietary code, UI, branding, or content. Do not add analytics, tracking, cookies, or advertising (including Google AdSense) outside a dedicated approved command. Do not silently alter existing no-ads/no-tracking/no-analytics language.
- Verification Notes: Full detail lives in `docs/SITE_ROADMAP_G_LEGAL_AND_PLATFORM.md`.

## S-LOC-DIR-1 — Site RTL/LTR And Bilingual Content Rule

- Rule Summary: Bilingual pages must use localization-correct content and preserve the per-page direction model.
- Applies When: Any change to `index.html`/`index_ar.html`, `privacy-policy/index.html`/`privacy-policy/index_ar.html`, or any future bilingual page.
- Required Behavior: Keep English and Arabic content accurate and in sync in meaning. Preserve the current per-page-file direction model (`dir="rtl"` on Arabic pages, default LTR on English pages) documented in `docs/SITE_CHARTER.md` §8, unless a dedicated command changes the architecture. Mathematical/product values referenced in copy must stay readable in their correct order.
- Forbidden Behavior: Do not hardcode direction assumptions that break if the direction model changes. Do not publish an English-only or Arabic-only update to shared content without updating its sibling page.
- Verification Notes: There is no "main calculator surface" on the Site; the calculator app's keypad/live-result RTL-stability carve-out (`K-LOC-DIR-1`) does not apply here and is intentionally not carried forward.

## S-VERIFY-1 — Site Verification Scope Rule

- Rule Summary: Verification must match the Site's actual, currently-detected technology — not an assumed one.
- Applies When: Any Site command that changes files and requires verification.
- Required Behavior: As of S001, the Site is verified static HTML/CSS/vanilla-JS with no build tooling or test framework present (no `package.json`, no CI workflow found). Verification is limited to what genuinely applies today: internal link resolution, encoding/mojibake scan (`S-ENC-1`), and `git diff --check`. If a build tool, linter, or test framework is introduced later, this rule's required checks must be updated accordingly by a dedicated command.
- Forbidden Behavior: Do not invent or run verification commands for tooling that is not present in the repository (e.g. do not assume a JS test runner exists).

## S-NUM-1 — Independent Site Command Numbering Rule

- Rule Summary: Site commands use their own sequence, fully independent of the calculator app's numbering.
- Applies When: Numbering, referencing, or scheduling any Site command.
- Required Behavior: Site commands use `S001`, `S002`, `S003`, ... sequentially. `S` means "Site." The Site sequence starts independently at `S001` (with `S000` as the preceding read-only review) and is never merged with, offset by, or made contingent on the calculator app's global numeric command sequence (currently in the thousands, tracked in the calculator app's own `AGENT_SESSION_LOG.md`).
- Forbidden Behavior: No Site command may consume, replace, renumber, or update the calculator app's numeric sequence, its `ROADMAP_INDEX.md`, or its `AGENT_SESSION_LOG.md`. No calculator command may renumber the Site's `S###` sequence.
- Verification Notes: This rule directly resolves the conflict identified in the S000 report between the calculator's global numeric "Command Numbering Convention" and the Site's `S###` namespace: the two are declared independent by this rule, not reconciled into one sequence.

---

## Rules Explicitly Excluded From Site Governance

The following calculator-only rules from the copied `docs/RULES.md` are **not** carried forward as active Site governance. They remain valid for the calculator app under its own `docs/roadmap/RULES.md` and are listed here only so no Site command mistakes their absence for an oversight:

| Excluded rule(s) | Reason |
|---|---|
| `K-CTX-2` (in its calculator-specific form) | Triggers on Flutter rendering/layout/cursor/evaluation-authority subsystems that do not exist on the Site |
| `K-THEME-1` through `K-THEME-5` | Flutter/Material `AppTheme`, `ColorScheme`, `AlertDialog`/`LicensePage` token rules |
| `K-NEW-1` through `K-NEW-9` | Dart/Flutter editor-controller internals (`EditResult`, `EditActionResult`, undo/dirty state, `NodeId`) |
| `G-CODEX-VERIFY-1` | Names `dart format` / `dart analyze` / `flutter test`; superseded for the Site by `S-VERIFY-1` |
| `G-ARCH-COMPAT-1` | Concerns CalcEditor engine/contract architecture decisions |
| `G-SHADOW-1` | Concerns Standard/Advanced evaluation-engine migration |
| `G-STATS-1` | Concerns the calculator's statistics-inference modules |
| `G-AI-1` | Concerns the calculator's AI product boundary; not carried forward unless a future command defines an actual Site AI feature |
| `G-FROZEN-1` | Names calculator-only frozen boundaries (`D-35`, `FractionGap`, `CursorAnchor`, core math input/editor/cursor/viewport/stack) |

`G-EXEC-1`, `G-ACCEL-1`, `K-SBX-1`, `K-ENC-1`, `K-ARCH-1`, `K-DOC-1`, `G-SESSION-1`, `K-SCOPE-1`, `K-CTX-1`, `K-LOC-DIR-1` (general form), and `G-LEGAL-1` were the general-governance source material; their reusable content has been re-expressed above as `S-EXEC-1`, `S-SBX-1`, `S-ENC-1`, `S-DOC-1`, `S-LOG-1`, `S-SCOPE-1`, `S-CTX-1`, `S-LOC-DIR-1`, and `S-LEGAL-1` respectively, scoped to the Site's real file structure and technology.
