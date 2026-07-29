# RULES - Calculator App Governance

Purpose: `docs/roadmap/RULES.md` is the authoritative source for active executable governance rules. Normal bootstrap is:

```text
ROADMAP_INDEX.md
RULES.md
Work
```

Do not use `docs/KNOWLEDGE.md` for governance resolution. `KNOWLEDGE.md` remains the long-form project knowledge, history, lessons, architecture memory, audit learnings, and experience repository.

## Rule Index

Active K-rules: K-CTX-1, K-CTX-2, K-SCOPE-1, K-ARCH-1, K-ENC-1, K-DOC-1, K-SBX-1, K-THEME-1, K-THEME-2, K-THEME-3, K-THEME-4, K-THEME-5, K-LOC-DIR-1, K-NEW-1, K-NEW-2, K-NEW-3, K-NEW-4, K-NEW-5, K-NEW-6, K-NEW-7, K-NEW-8, K-NEW-9.

Additional active project rules: G-CODEX-VERIFY-1, G-EXEC-1, G-ACCEL-1, G-ARCH-COMPAT-1, G-SHADOW-1, G-STATS-1, G-LEGAL-1, G-AI-1, G-FROZEN-1, G-SESSION-1.

Referenced / Definition Missing: None.

## K-CTX-1 - Context Reading Budget Rule

- Rule Summary: Agents must not read large roadmap/support files in full by default. `ROADMAP_INDEX.md` is now a lean bootstrap pointer; detailed roadmap content lives in topic-scoped `docs/roadmap/Roadmap-<letter>-<topic>.md` files that must be loaded lazily, one at a time, only when the current command's scope needs them.
- Applies When: Every session and every command that needs project context.
- Required Behavior:
  1. Read `docs/roadmap/ROADMAP_INDEX.md` fully first (it is short: current command pointer + the section index table).
  2. Read `docs/roadmap/RULES.md` fully.
  3. From the section index table in `ROADMAP_INDEX.md`, identify which `Roadmap-<letter>-<topic>.md` file(s) match the current command's scope and open only those. `Roadmap-B-ActiveFocusAndOpenWork.md` is the default "current status" file and is read in most commands; open exactly one additional section file only if the command scope clearly requires it (architecture → `Roadmap-H`, migration → `Roadmap-E`, identity/release → `Roadmap-C`, legal → `Roadmap-G`, statistics/business tracks → `Roadmap-F`, command-writing/process → `Roadmap-D`, feature planning/dead-code/risk → `Roadmap-I`, detailed historical command number → `Roadmap-A`).
  4. Follow further links only as required by current scope. Read `DEFERRED_WORK.md` by D-ID, `AGENT_SESSION_LOG.md` by command number, archive files one at a time, audits one file at a time, and source files only when needed.
- Forbidden Behavior: Do not load all `Roadmap-*.md` section files "just in case." Do not preemptively load `DEFERRED_WORK.md`, `AGENT_SESSION_LOG.md`, archive logs, source trees, or `KNOWLEDGE.md` in full for normal startup.
- Verification Notes: If context cannot be located, report the missing item and file instead of inventing history. If a command's scope turns out to need a `Roadmap-*.md` file not opened at startup, open it mid-command rather than guessing from memory.

## K-CTX-2 - Architecture Charter Trigger Rule

- Rule Summary: Any command that touches an architecture-relevant subsystem must read the targeted relevant section(s) of `docs/CHARTER.md`, even if `docs/CHARTER.md` is not explicitly listed in the command's `MANDATORY READING`.
- Applies When: The command scope touches rendering, layout, painting, hit testing, viewport, cursor, expression/editing model, evaluation authority, or any other subsystem listed in `docs/CHARTER.md` section 7 ("Shared Standard And Advanced Responsibilities") or in `Roadmap-H-Architecture.md`'s Subsystem Map.
- Required Behavior:
  1. Before implementation, check whether the command's scope matches an architecture-relevant subsystem per the definition above.
  2. If it does, read the targeted relevant section(s) of `docs/CHARTER.md` — not the whole file by default — before making production changes, regardless of whether the command author remembered to list it.
  3. If the command's `MANDATORY READING` omits `docs/CHARTER.md` but the scope is architecture-relevant, note this in the audit/session summary rather than silently skipping the Charter check.
- Forbidden Behavior: Do not treat the absence of `docs/CHARTER.md` from a command's `MANDATORY READING` list as permission to skip it when the scope is architecture-relevant. Do not read the full Charter when only a targeted section is needed.
- Verification Notes: The audit or final summary must state whether `docs/CHARTER.md` was consulted and which section, for any command touching an architecture-relevant subsystem.

## K-SCOPE-1 - Audit Scope Escalation Discipline

- Rule Summary: Start from the narrowest source and widen only when required.
- Applies When: Any audit, investigation, command preparation, or implementation that needs more context.
- Required Behavior: Default order is newest relevant `docs/audits/` report, targeted `ROADMAP_INDEX.md`, targeted architecture section, targeted `DEFERRED_WORK.md` D-ID, targeted `AGENT_SESSION_LOG.md` command, one archive file, one source file, then multiple source files only with permission.
- Forbidden Behavior: Do not jump straight to broad source or archive reads when documentation can answer the question. Stop and ask before widening scope beyond what the command clearly requires.
- Verification Notes: State scope decisions in the audit/session summary when scope control affected execution.

## K-ARCH-1 - Documentation Space Responsibilities

- Rule Summary: Put documentation in the correct project space and keep archive files immutable.
- Applies When: Creating, updating, moving, or reading roadmap, audit, archive, rules, or deferred-work docs.
- Required Behavior: Active audits and verification reports go in `docs/audits/`. Rolling command context goes in `docs/roadmap/AGENT_SESSION_LOG.md`. Active governance rules go in `docs/roadmap/RULES.md`. Historical closed records go in `docs/roadmap/archive/` only when justified.
- Forbidden Behavior: Do not modify `docs/roadmap/archive/`. Do not place active audits or pending locks in archive. Do not use `KNOWLEDGE.md` as the governance rule authority.
- Verification Notes: Confirm new audit files are under `docs/audits/`.

## K-ENC-1 - UTF-8 Encoding And Mojibake Safety Rule

- Rule Summary: Canonical multilingual and Unicode documentation must be read, written, and verified using explicit UTF-8 handling, and edited documentation must not retain known mojibake.
- Applies When: Reading or writing canonical Markdown or text documentation containing Arabic, Kurdish, arrows, dashes, check marks, mathematical symbols, box-drawing characters, emoji, or any other non-ASCII content.
- Required Behavior:
  1. Use explicit UTF-8 reads.
  2. Use UTF-8 without BOM writes.
  3. For PowerShell, use explicit APIs such as:
     - `[System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)`
     - `[System.IO.File]::WriteAllText($path, $text, [System.Text.UTF8Encoding]::new($false))`
  4. After modifying any canonical Markdown or text file, scan the complete edited file for probable mojibake.
  5. At normal startup, after reading `docs/roadmap/ROADMAP_INDEX.md`, check it for probable mojibake before relying on corrupted excerpts.
  6. If mojibake is found in a file outside the current command scope, do not modify it. Report `ENCODING_REPAIR_REQUIRED` with the file path and exact excerpts.
  7. If mojibake is found in an allowed file, repair only transformations whose intended Unicode text can be recovered unambiguously.
  8. Preserve valid Arabic, Kurdish, English, mathematical notation, punctuation, emoji, and box-drawing characters.
  9. Re-read and re-scan the complete file after writing.
  10. Report all repaired and unresolved encoding excerpts.
- Forbidden Behavior:
  1. Do not use default PowerShell `Get-Content`, `Set-Content`, or `Out-File` pipelines for multilingual files.
  2. Do not guess the intended text of an ambiguous corrupted Arabic, Kurdish, or multilingual sequence.
  3. Do not replace all appearances of individual valid characters such as `Ø`, `Ù`, `Ã`, or `â` blindly.
  4. Do not rewrite, translate, summarize, reorder, normalize, or otherwise change surrounding project content during an encoding-only repair.
  5. Do not treat valid Unicode symbols as forbidden merely because they are non-ASCII.
  6. Do not complete a documentation command while confirmed mojibake remains in an edited file without reporting it.
- Probable Mojibake Indicators:
  - sequences beginning with `â†`
  - `â€”`
  - `â€“`
  - `âœ`
  - `â`
  - `â”`
  - `ï»¿`
  - repeated Arabic mojibake patterns involving combinations of `Ø` and `Ù`
  - other text that is demonstrably UTF-8 decoded through an incompatible legacy encoding
- Common Unambiguous Repairs:
  - `â†’` -> `→`
  - `â€”` -> `—`
  - `â€“` -> `–`
  - `âœ…` -> `✅`
  - `âŒ` -> `❌`
- Verification Notes:
  - The final byte encoding alone is not sufficient; UTF-8 files may still contain previously corrupted text.
  - Validate both encoding and visible text content.
  - For bulk documentation operations, full-file mojibake scanning is mandatory for every edited file.

## K-DOC-1 - Documentation Update Workflow

- Rule Summary: Every completed command updates the active pointer, session log, and required audit records. The pointer is a fixed-size snapshot, not a growing log.
- Applies When: Completing any roadmap command.
- Required Behavior:
  1. Update `ROADMAP_INDEX.md`'s "Current Command Pointer" table by **replacing** the `Latest completed` / `Current` / `Current status` fields with the new command's values. The table must never hold more than the latest completed command and the current/next command.
  2. Prepend a compact `AGENT_SESSION_LOG.md` entry for the completed command — this, not the pointer, is the rolling history.
  3. Create active audit/verification files in `docs/audits/` when required by command output.
- Forbidden Behavior:
  - Do not append the outgoing command to the pointer table before overwriting it — it does not accumulate rows or history entries.
  - Do not mark the pointer complete if verification failed or is incomplete.
  - Do not create archive reports for ordinary task records.
  - Do not duplicate command history between `ROADMAP_INDEX.md` and `AGENT_SESSION_LOG.md` — the pointer holds only the current snapshot; the session log holds the rolling history.
- Verification Notes: Final summary must report documentation updates and applied rules. If the pointer table is found to contain more than the latest completed + current/next command, that is a documentation defect to fix as part of `K-ARCH-1` housekeeping, not a pattern to continue.

## K-SBX-1 - Sandbox Hang-Protection Rule

- Rule Summary: Avoid repeated broad operations that stall inside constrained execution.
- Applies When: A task requires recursive traversal, archive reconstruction, repository-wide search, broad docs traversal, or scoped verification.
- Required Behavior: Use targeted search first. If execution stalls or times out, stop retrying, report the limitation, and proceed with narrower scope or approved outside-sandbox execution. Codex scoped verification follows G-CODEX-VERIFY-1.
- Forbidden Behavior: Do not retry stalled broad scans in a loop. Do not run broad scans/tests/builds without explicit scope.
- Verification Notes: Report any skipped or narrowed verification clearly.

## K-THEME-1 - Surface/Text Token Contract

- Rule Summary: Foreground tokens must match the actual painted surface.
- Applies When: Adding or changing text, icons, dividers, borders, hints, placeholders, disabled states, cards, dialogs, sheets, Material pages, or themed UI.
- Required Behavior: Identify the nearest painted background first. Use display-safe tokens on display/background surfaces, tool tokens on tool/card surfaces, dialog tokens on dialogs, keypad/control tokens on controls, and proven on-fill tokens on filled accents.
- Forbidden Behavior: Do not use global foreground choices, fixed `Colors.white`, `Colors.black`, `Colors.grey`, arbitrary opacity foregrounds, or a token family from one surface on another because it works in one theme.
- Verification Notes: Domino, dark, and light readability must be explicitly considered for themed UI changes.

## K-THEME-2 - Icons, Dividers, Borders Surface Contract

- Rule Summary: Icons, dividers, and borders obey the same surface ownership as text.
- Applies When: Changing icon colors, divider colors, border colors, outlines, or reusable themed controls.
- Required Behavior: Use background, tool, dialog, or role-specific border/icon tokens that match the painted container.
- Forbidden Behavior: Do not use fixed gray/white/black borders, `Colors.white12`, `Colors.black12`, or arbitrary opacity borders without contrast reason.
- Verification Notes: Static token inspection is required for touched surfaces.

## K-THEME-3 - No Contrast-Destroying Opacity Overlays

- Rule Summary: Do not put readable foregrounds on semi-transparent surfaces unless final blended contrast is checked.
- Applies When: Adding opacity to surfaces that carry text/icons or changing cards, chips, panels, sheets, overlays, disabled states, or press states.
- Required Behavior: Prefer opaque semantic surfaces for readable content. Use opacity only where contrast remains readable or the element is intentionally non-informational.
- Forbidden Behavior: Do not place tool/dialog/text tokens on half-alpha surfaces without theme-family contrast review.
- Verification Notes: Domino grey-on-grey and dark-on-black failures must be considered.

## K-THEME-4 - Material Default Pages Must Be Themed Or Replaced

- Rule Summary: Framework pages/widgets must not rely on incomplete Material defaults inside AppTheme-driven UI.
- Applies When: Using `LicensePage`, `showLicensePage`, `AlertDialog`, bottom sheets, popup/dropdown menus, pickers, generated routes, or framework widgets that paint their own surfaces.
- Required Behavior: Wrap with local `ThemeData` mapping scaffold, app bar, surface/onSurface, primary/onPrimary, text, icon, divider, card, list tile, dialog, and sheet roles, or replace with an AppTheme-native route.
- Forbidden Behavior: Do not set only `ColorScheme.primary` and assume the framework page is themed.
- Verification Notes: Check foreground/background/border ownership for all framework-rendered surfaces.

## K-THEME-5 - Theme Audit Checklist For New UI

- Rule Summary: Themed UI is incomplete until token ownership and contrast are checked.
- Applies When: Completing any themed UI change.
- Required Behavior: Check painted surfaces; primary/secondary text; icons; dividers; borders; hints; placeholders; disabled states; fixed colors; semi-transparent readable surfaces; Material defaults; Domino, dark, and light readability.
- Forbidden Behavior: Do not complete themed UI work without the checklist or without documenting any unusual token pairing.
- Verification Notes: Static token inspection first; targeted visual/widget verification when user-visible.

## K-LOC-DIR-1 - Localization Directionality Rule

- Rule Summary: UI-facing strings must use localization resources, sub-screens must respect active app directionality, the main calculator surface must remain calculator-stable, and mathematical values must preserve mathematical order.
- Applies When: Any UI-facing command introduces or changes labels, buttons, dialogs, sheets, menus, settings, panels, explorers, warnings, errors, informational text, rows, icons, copy layouts, calculator-surface layout, result displays, or mathematical payloads.
- Required Behavior: Apply the label, surface, sub-screen, and math-value rules below. Treat missing localization or unverified directionality as incomplete work.
- Forbidden Behavior: Do not hardcode user-visible strings, bypass localization resources, omit English or Arabic localization, mirror the main calculator surface based on RTL/LTR, hardcode left/right assumptions in sub-screens, weaken the RTL/LTR setting, infer math-value ordering from language, or mark UI work complete when RTL/LTR compliance is unverified.
- Verification Notes: UI tasks are incomplete if hardcoded user-visible strings remain, new labels bypass localization, English or Arabic localization is missing, main calculator surface stability is not preserved, math values can reorder incorrectly, or RTL/LTR behavior was not explicitly verified after sub-screen layout changes.

### MAIN CALCULATOR SURFACE RULE

The main calculator surface must remain direction-stable and calculator-oriented. Do not mirror these surfaces based on RTL/LTR:

- keypad/button grid
- calculator input
- live result area
- committed result area
- main expression editing surface

These surfaces must remain stable like a physical calculator.

### SUB-SCREEN DIRECTIONALITY RULE

Sub-screens, overlays, and auxiliary UI must follow the active application direction setting, LTR or RTL. Examples include:

- dialogs
- sheets
- Quick Panel
- Full Result Explorer
- settings screens
- menus
- auxiliary panels

Sub-screen layout follows active app direction.

### LABEL LOCALIZATION RULE

All user-visible labels must use localization resources. English and Arabic must both be supported. Do not hardcode user-visible strings.

### MATH VALUE STABILITY RULE

Mathematical values must preserve mathematical order in all directions. Examples must remain stable:

- `4 1/2`
- `9/2`
- `1.333333333`
- `sin(30)`
- `log(10)`
- `x²`

Invalid example: `1/2 4`.

Use approved math-safe direction handling where needed.

### LABEL VS VALUE RULE

Labels are localized, direction-aware, and follow active app direction in sub-screens.

Values are math-safe, preserve mathematical order, and are usually explicit LTR when displayed as math payloads.

## K-NEW-1 - Verification Tooling Rule

- Rule Summary: Verification must remain scoped and tool-safe.
- Applies When: Running Flutter/Dart verification.
- Required Behavior: Use the current Codex scoped verification authority in G-CODEX-VERIFY-1 for Codex. Prefer focused verification tied to touched files and touched tests.
- Forbidden Behavior: Do not run broad tests, broad analyzer sweeps, or golden tests unless explicitly requested.
- Verification Notes: Earlier Codex restrictions from command 662 are superseded for Codex by the newer scoped verification rule recorded in `ROADMAP_INDEX.md` and G-CODEX-VERIFY-1.

## K-NEW-2 - No-Op Edit Actions Must Not Pollute Undo/Dirty State

- Rule Summary: No-op controller actions must not mutate undo, dirty, or notification state.
- Applies When: Adding or changing controller actions that may return `changed == false`.
- Required Behavior: Return early for true no-ops without recording undo, setting expression dirty, or notifying listeners.
- Forbidden Behavior: Do not create undo entries or recompute previews for actions that did nothing.
- Verification Notes: Focused controller tests should cover no-op undo/dirty behavior when touched.

## K-NEW-3 - Result Bridge Migration Rule

- Rule Summary: Bool edit APIs must delegate to result-returning APIs.
- Applies When: Adding `applyXResult()` alongside existing `applyX()` methods.
- Required Behavior: Put all logic in `applyXResult()` and make `applyX()` a one-line `.changed` wrapper.
- Forbidden Behavior: Do not duplicate operand capture, custom edit, undo, dirty, or side-effect logic across bool/result paths.
- Verification Notes: Test both public entry points when changing bridge behavior.

## K-NEW-4 - Phase Implementation Order

- Rule Summary: Risky phases follow audit, contract, lock tests, then implementation.
- Applies When: Changing controller, editor, display contracts, runtime authority, or other high-risk phase boundaries.
- Required Behavior: Audit first, define contracts and invariants, lock expected behavior/tests, then implement narrowly.
- Forbidden Behavior: Do not implement risky behavior before the contract and locks exist.
- Verification Notes: Safe small docs or low-risk fixes may remain bounded under K-NEW-9.

## K-NEW-5 - No Large File Accumulation Rule

- Rule Summary: Do not grow already-large files as a quick fix.
- Applies When: Adding significant logic to large files such as display, editor, controller, screen, or tool-shell mega-modules.
- Required Behavior: Check ownership and decomposition risk first. If no safe owner exists, write an audit/contract command before implementation.
- Forbidden Behavior: Do not add temporary logic without naming it temporary and documenting the future owner.
- Verification Notes: Mention decomposition decision for sizeable additions.

## K-NEW-6 - STOP Rule For Responsibility Boundary Crossings

- Rule Summary: Stop when a change crosses subsystem ownership under uncertainty.
- Applies When: Work touches multiple responsibility branches, cursor/stack semantics, hit/tap behavior, viewport/scroll behavior, or undocumented assumptions.
- Required Behavior: Stop and write/report an audit need unless the command explicitly authorizes the cross-boundary work.
- Forbidden Behavior: Do not implement speculative multi-subsystem fixes under uncertainty.
- Verification Notes: Report the stop condition rather than guessing.

## K-NEW-7 - Deferred Work Must Include Resume Condition

- Rule Summary: Deferred items need explicit re-entry criteria.
- Applies When: Deferring work during audits, closures, command completion, or implementation.
- Required Behavior: Record what is deferred, why, resume condition, and suggested future command.
- Forbidden Behavior: Do not leave vague backlog items without a safe resume condition.
- Verification Notes: Check deferred docs by D-ID when adding or updating deferred items.

## K-NEW-8 - Result Model Type Ownership

- Rule Summary: Result/error/feedback types must stay in their owning layer.
- Applies When: Adding or changing edit results, action results, no-op kinds, expression errors, input feedback, or evaluation errors.
- Required Behavior: Keep `EditResult` UI-text-free in the editor layer. Keep `EditActionResult` at the controller boundary. Map `NoopKind` and future feedback to localized UI text only in UI/adapters. Keep evaluation errors in the engine/evaluation layer.
- Forbidden Behavior: Do not leak localized strings, Snackbar text, inline rendering, or UI feedback responsibilities into engines/editors.
- Verification Notes: Localization changes must also satisfy K-LOC-DIR-1.

## K-NEW-9 - Command Size Must Match Risk

- Rule Summary: Command batching must match architectural risk.
- Applies When: Planning or executing any command.
- Required Behavior: Separate audit, lock, and implementation for high-risk work. Medium-risk bounded work may combine audit/implementation/targeted verify only when source of truth is clear. Low-risk docs/test/checkpoint work may be batched only when all parts serve the same goal.
- Forbidden Behavior: Do not batch runtime migrations, evaluation switches, authority changes, casual `EditingEngine` expansion, or unrelated work.
- Verification Notes: Ask what architectural gate the work opens.

## G-CODEX-VERIFY-1 - Codex Scoped Verification Rule

- Rule Summary: Codex runs approved scoped verification outside the sandbox when verification is required.
- Applies When: Codex verifies touched Dart/Flutter files or focused touched tests.
- Required Behavior: For approved scoped verification, Codex must request elevated execution before the first verification command, execute approved scoped verification outside the sandbox, avoid attempting sandbox execution first, and avoid waiting for sandbox timeout before requesting elevation. The approved verification scope remains unchanged: run `dart format` on touched files only, `dart analyze` on touched files only, and `flutter test` on focused touched test files only when in scope.
- Forbidden Behavior: Codex must not make an initial sandbox verification attempt for approved scoped verification and must not retry the same verification after a sandbox timeout before requesting elevation. Do not run broad analyzer sweeps, full project tests, builds, release/publish commands, `git reset`, `git clean`, destructive repository operations, unrelated tests, or unrelated files without an explicit dedicated command.
- Codex Execution Boundary: This refinement applies exclusively to Codex execution. It does not apply to ChatGPT, Claude, or any other implementation agent unless they explicitly adopt the same execution model.
- Rationale: Approved scoped verification commands such as `dart format`, `dart analyze`, and focused `flutter test` may experience sandbox delays or timeouts in some execution environments. In environments where sandbox execution is known to delay or time out, requesting elevated execution before approved scoped verification avoids unnecessary waiting while preserving verification scope, project governance, and architectural methodology. This rationale explains the Codex execution policy only; it does not authorize additional verification commands, change the approved verification scope, or apply outside Codex execution.
- Verification Notes: Documentation-only commands do not require evaluator, parser, UI, or Flutter tests unless requested. K-SBX-1 remains responsible for general sandbox hang protection; this rule is responsible only for Codex execution policy during approved scoped verification.

## G-EXEC-1 - Execution Discipline Rule

- Rule Summary: Default workflow is audit, lock, fix, verify, document, then defer or close.
- Applies When: Work is unclear, architectural, behavioral, or risk-bearing.
- Required Behavior: Audit first for unclear/architectural issues; lock before risky fixes; fix narrowly; verify with targeted tests/analyze; document at phase, milestone, break, direction-change, release, or architecture-decision boundaries.
- Forbidden Behavior: Do not document every tiny fix as a major milestone. Do not skip audit/lock for risky work.
- Verification Notes: Pair with K-NEW-9 for risk sizing.

## G-ACCEL-1 - Safe Acceleration Rule

- Rule Summary: Low-risk bounded work may combine tests, implementation, and verification.
- Applies When: Work reuses locked architecture and introduces no new numerical method, dependency, UI, AI, legal, medical, editor-core, or authority risk.
- Required Behavior: Keep separate audit/lock for high-risk domains such as named algorithms, dependency additions, source/license uncertainty, inferential UI, AI/model integration, medical claims, sample size/power, core editor/cursor/viewport/stack changes, legal/release work.
- Forbidden Behavior: Do not use acceleration to bypass contracts or mix unrelated work.
- Verification Notes: Explain why accelerated work is bounded when relevant.

## G-ARCH-COMPAT-1 - Architecture Compatibility Rule

- Rule Summary: Decide whether major feature work is local or shared/general before implementation.
- Applies When: Adding major features, shared contracts, engines, tools, modules, or AI-facing surfaces.
- Required Behavior: State `local by design`, `shared/general by design`, or `deferred until general contract exists`. Deterministic engines calculate; shared contracts describe; AI explains only.
- Forbidden Behavior: Do not create duplicate local contracts when a shared/general contract is required.
- Verification Notes: Architecture decisions should be documented in the appropriate audit or architecture doc.

## G-SHADOW-1 - Shadow-First Migration Strategy Rule

- Rule Summary: Engine migration should prefer Shadow Comparison before authority transfer or speculative readiness work when Shadow readiness is explicitly proven.
- Applies When: Planning or executing Standard Engine migration, runtime migration, diagnostic comparison, authority readiness, ownership readiness, restore readiness, Cursor/Fraction/metadata readiness, or blocker-ranking commands.
- Required Behavior: Treat the default migration-validation path as `Production Engine -> Standard Engine (Shadow) -> Output Comparison -> Divergence Collection -> Divergence Resolution -> Readiness Review -> Future Authority Transfer`. Before creating additional readiness, ownership, governance, or migration slices, determine whether Shadow Comparison can already operate safely. Do not assume the current top migration blocker blocks Shadow execution. A claimed Shadow blocker must explicitly prove impact on expression evaluation, output generation, output comparison, or divergence collection.
- Forbidden Behavior: Do not require authority transfer for Shadow Comparison. Do not let Shadow results affect production outputs, UI behavior, persistence, restore execution, or authority ownership. Do not automatically treat blockers that affect only restore, cursor restoration, selection restoration, editing-session restoration, authority transfer, or future migration phases as Shadow Comparison blockers.
- Verification Notes: When Shadow readiness is proven, prefer controlled Shadow Comparison activation over speculative readiness work. Shadow activation remains a dedicated command and must preserve Production Engine authority, Standard shadow-only status, no UI wiring, no persistence, no restore execution, no rollback execution, no runtime ownership changes, and no production result replacement.

## G-STATS-1 - Statistics Inference Safety Rules

- Rule Summary: Inferential statistics work must be contract-first and assumption-aware.
- Applies When: Adding or changing statistics inference modules, explanations, metadata, or UI integration.
- Required Behavior: Use contract-first workflow; carry explicit assumptions and limitations; require typed result contract, deterministic explanation adapter, validation behavior, and focused tests before inferential UI integration; use `knownPopulationSigma` terminology for population-sigma z modules.
- Forbidden Behavior: Do not imply study-design validation, clinical conclusions, or upstream estimate validation. Do not substitute sample SD for population sigma in z modules.
- Verification Notes: Sample-SD-only inputs defer to t-based modules.

## G-LEGAL-1 - Legal Safety / Reference And License Rule

- Rule Summary: Avoid patent, copyright, licensing, redistribution, privacy, and app-takedown risk.
- Applies When: Adding external APIs, SDKs, packages, models, assets, fonts, datasets, services, formulas, algorithms, release/legal docs, or store-facing claims.
- Required Behavior: Use public formulas and independent implementations. Verify commercial/legal permission, attribution, privacy, Play compatibility, offline fallback, rate limits, service stability, and maintenance risk before integration.
- Forbidden Behavior: Do not copy proprietary code, UI, workflows, datasets, tables, branding, product text, or model assets. Do not claim patent clearance without professional legal review.
- Verification Notes: If status is unclear, stop and recommend a legal-safety audit.

## G-AI-1 - AI Product Boundary Rule

- Rule Summary: AI may guide and explain; deterministic engines calculate.
- Applies When: Adding or discussing AI features, explanations, OCR/recognition, guidance, symbolic help, or domain advice.
- Required Behavior: Ground AI in deterministic `EngineExplanation` metadata, engine output, explicit assumptions/warnings, and user inputs. Keep engine output as source of truth.
- Forbidden Behavior: Do not add AI as a generic disconnected chatbot. Do not let AI become calculation authority.
- Verification Notes: AI Applied Math and Domain Guidance remains deferred unless a dedicated command reopens it.

## G-FROZEN-1 - Frozen Boundary Rule

- Rule Summary: Respect frozen work boundaries unless a dedicated command reopens them.
- Applies When: Work touches D-35, FractionGap, F1, CursorAnchor, preview-live, history-result, engine unification, core math input/editor/cursor/viewport/stack, or roadmap-frozen areas.
- Required Behavior: Stop unless the command explicitly authorizes the audit/lock/reopen scope.
- Forbidden Behavior: Do not modify frozen areas opportunistically during unrelated work.
- Verification Notes: Report preserved boundaries in final summaries when relevant.

## G-SESSION-1 - Bootstrap And Session Logging Rule

- Rule Summary: Agent sessions follow the bootstrap and completion protocol.
- Applies When: Starting or completing any command.
- Required Behavior: Read `ROADMAP_INDEX.md` first, read `RULES.md` during startup, apply all active rules, update roadmap pointer, prepend session log entry, create required audit files, and report applied rules.
- Forbidden Behavior: Do not use `KNOWLEDGE.md` for governance resolution. Do not mark incomplete work complete.
- Verification Notes: Normal bootstrap is `ROADMAP_INDEX.md` -> `RULES.md` -> work.
