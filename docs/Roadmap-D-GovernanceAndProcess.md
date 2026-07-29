# Roadmap D — Governance & Process
*Split from ROADMAP_INDEX.md. Read when writing/structuring a new command, or asking "where does X belong?"*

---

## Canonical Documentation Map

*Where to find things. Do not duplicate content across files — use compact cross-references.*

| File | Role | What belongs here | Reading rule |
|------|------|------------------|-------------|
| `docs/roadmap/ROADMAP_INDEX.md` | `CURRENT_BOOTSTRAP_AND_OPERATIONAL_INDEX` | Current command, next command, and the section index pointing to `Roadmap-*.md` files | Always read fully first (`K-CTX-1`) — now a lean pointer |
| `docs/roadmap/Roadmap-*.md` | Topic-scoped roadmap sections | Validation baseline, active work, architecture, identity, migration methodology, feature roadmap, risks, etc. — split by topic | Read only the file(s) relevant to current command scope |
| `docs/CHARTER.md` | `CURRENT_HIGH_LEVEL_ARCHITECTURE_AUTHORITY` | Current Standard/Advanced architecture, expression/editing/cursor/rendering/evaluation roles, visible-result authority, verifier/shadow/diagnostic terms | Targeted relevant sections for architecture commands |
| `docs/roadmap/RULES.md` | `SOLE_EXECUTABLE_GOVERNANCE_AUTHORITY` | Scope, execution, Git, sandbox, testing, verification, audit, stop-condition, architecture-change, AI governance | Always read fully during normal startup |
| `docs/roadmap/MATH_INPUT_ARCHITECTURE_CONTRACT_v2.1.md` | Detailed and historical Math Input technical reference | Detailed Math Input contracts, older scope statements, previous contracts, deferred designs, and still-useful technical notes | Targeted relevant sections only; not normal bootstrap |
| `docs/KNOWLEDGE.md` | Lessons learned and long-form project knowledge | Failures, historical warnings, project experience, durable non-rule knowledge | Targeted relevant sections only; not governance and not normal bootstrap |
| `DEFERRED_WORK.md` | Deferred work registry | All deferred items with D-IDs and resume conditions | Read by D-ID only |
| `AGENT_SESSION_LOG.md` | Rolling execution context | Last ~30–50 command entries; archive when >300 lines | Read by command number only |
| `docs/roadmap/archive/` | Historical reference — immutable | Completed closures, migration checkpoints, past contract locks, session archives | Read one file at a time; never modify |
| `docs/audits/` | Active non-historical audits | Current audit reports, implementation locks, parity maps, active architecture decisions | Read one file at a time |
| `docs/roadmap/ADVANCED_SCIENTIFIC_UX_ARCHITECTURE.md` | Targeted Advanced UX/design reference | Layer architecture, F-1 to F-6 deferred features, HYP/Catalog/cursor plan, blockers B-1 to B-5 | Targeted section only; does not override `docs/CHARTER.md` or newer audits |
| `CLAUDE.md` | Claude Code bootstrap entrypoint | Compact startup preload; redirects to ROADMAP_INDEX; not a canonical source | Auto-read at session start |
| `AGENTS.md` | Codex/agent bootstrap entrypoint | Compact startup preload; redirects to ROADMAP_INDEX; not a canonical source | Auto-read at session start |

**Current high-level architecture authority lives in `docs/CHARTER.md`. `docs/roadmap/ADVANCED_SCIENTIFIC_UX_ARCHITECTURE.md` remains a targeted Advanced UX/design reference and must not override the current Charter or newer audits.**

**Governance rules live in `RULES.md`. Reference rule IDs rather than re-explaining rules in other files.**

**Rule IDs referenced here are mandatory, not optional. Agents must resolve referenced rule IDs from `docs/roadmap/RULES.md` before executing tasks that touch their scope.**

**CLAUDE.md and AGENTS.md are bootstrap entrypoints only. ROADMAP_INDEX remains the authoritative operational/bootstrap source; it is not the architecture or executable-governance authority.**

---

## Command Template for GPT / Codex

This section defines how commands are structured, resolved, and reported. Future GPT/Codex sessions must inherit these standards.

### Command Structure

```
<NUMBER> - <COMMAND-NAME>

GOAL:
<One paragraph describing the objective.>

CONTEXT:
<Key findings from prior audits or rolling session log.>

MANDATORY READING:
- docs/roadmap/ROADMAP_INDEX.md
- docs/roadmap/RULES.md
- docs/CHARTER.md (targeted sections) — always included as a baseline alongside the two files above. Do not decide case-by-case whether this command "counts" as architecture-relevant; that judgment call is exactly what got missed in past commands even when K-CTX-2 was cited in the rule list. Reading the targeted section costs little; omitting it when it turns out to matter costs a redo.
- <other explicit full file path(s) only — never "the latest relevant file," "relevant source," "at most one directly relevant audit if one exists," or any other unnamed/implied reference. If no such file currently exists, state that explicitly instead of leaving the line vague.>

Resolve only the referenced rule IDs from docs/roadmap/RULES.md:
- RULE-ID-1
- RULE-ID-2

SCOPE:
Allowed:
<Explicit file paths and areas where production changes are permitted.>
Forbidden:
<Explicit file paths, subsystems, or behaviors that must not change.>

TASKS:
1. <Step one>
2. <Step two>

STOP CONDITIONS:
<When to stop and report instead of proceeding.>

VERIFICATION:
<Exact test files or analyzer commands to run.>

DOCUMENTATION:
Create audit: YES/NO — state explicitly, never leave implicit.
<If YES: exact audit file path and required report sections. If NO: which files are updated instead (typically ROADMAP_INDEX.md + AGENT_SESSION_LOG.md only).>

OUTPUT:
<What to report upon completion. Do not restate documentation updates already covered by DOCUMENTATION unless an error occurred or they were explicitly requested.>

END <NUMBER>
```

SCOPE is mandatory, not optional, in every command — never omit it and never leave it as a general area without an explicit Allowed/Forbidden split.

### Command Length & Conciseness Policy

Commands grew steadily longer across the 2193–2235 series as each newly discovered gap (vague MANDATORY READING, missing SCOPE, undecided DOCUMENTATION) was patched by adding more text rather than by removing anything. Some of that growth is justified — SCOPE, STOP CONDITIONS, and MANDATORY READING should stay thorough, since each additional line there prevents a real failure mode. But growth inside TASKS and OUTPUT is often pure repetition, not added safety, and should be actively trimmed. Apply these rules to every command:

- **Say a constraint once.** If a constraint (e.g. "do not change Standard calculator behavior") belongs in SCOPE or STOP CONDITIONS, state it there and do not restate it again in CONTEXT, TASKS, and VERIFICATION in slightly different words. Repetition across sections is the single biggest source of avoidable length.
- **Tabulate repeated question patterns.** If a TASK would otherwise list more than 5-6 near-identical sub-questions (e.g. "does X do A? does X do B? does X do C?..."), express it as a compact table (column per attribute) instead of prose bullets.
- **OUTPUT reports only what DOCUMENTATION does not already cover.** Do not restate the same file list or the same completion facts once in DOCUMENTATION and again in OUTPUT.
- **Length is fine when it reflects genuine problem complexity** (e.g. an ownership/architecture gap analysis with five real repair options), and is a defect when it reflects the same constraint said four different ways. Before finalizing a command, scan it once for sentences that duplicate a point already made elsewhere, and delete the duplicate rather than keeping "extra emphasis."

### Governance Resolution Policy

Resolve executable governance from [RULES.md](RULES.md) only. Command bodies may list the rule IDs that apply to the scope, but they must not duplicate rule text outside `RULES.md`. `ROADMAP_INDEX.md` stays the bootstrap pointer and navigation map.

### Governance Rule References

Preferred style:

Resolve only the referenced rule IDs from docs/roadmap/RULES.md:

- K-CTX-1
- K-SCOPE-1
- K-THEME-1

Avoid unrelated rule lists.

### Presentation Format Policy

- **Required:** Deliver CalcEditor commands inside a Writing Block so the user can easily copy, reuse, or store them as named documents.
- **Fallback:** Use a standard **code block** only if the client does not support Writing Blocks. Do not mix both formats.

### Final Report Policy

If verification passes, keep the report extremely brief. Report only:
1. Files changed
2. Primary behavior confirmation
3. Verification results (format/analyze/test pass)

- Do not report theme, RTL/LTR, localization, accessibility, or styling details unless a problem is found.
- Avoid long narrative summaries or restating what the code does.
- Final reports must **NOT** reproduce `END <NUMBER>`, the command body, or future command bodies.

### Next Command Policy

- Do **not** generate a complete future command unless explicitly requested.
- Recommend the next step using only the following format:

NEXT:
<number> - <short title>

- `NEXT` lines are recommendations only, not approved implementation plans.
- They must **not** include `GOAL`, `CONTEXT`, `TASKS`, `STOP CONDITIONS`, `VERIFICATION`, `OUTPUT`, or `END <NUMBER>`.

### Documentation Update Requirements

Completion documentation requirements are governed by `K-DOC-1`, `K-ARCH-1`, and `G-SESSION-1` in [RULES.md](RULES.md). Keep command output scoped: update the active pointer, session log, and audit files only as required by those rules and by the approved command scope.

---

## Governance Rules Pointer

Active executable governance rules live in [RULES.md](RULES.md). Normal bootstrap sequence is:

```text
ROADMAP_INDEX.md
RULES.md
Work
```

Agents must read `RULES.md` during normal startup and apply all active governance rules from `RULES.md`. Governance resolution comes from `RULES.md` exclusively. Agents must not use `KNOWLEDGE.md` for governance resolution.

`KNOWLEDGE.md` remains the long-form source for lessons learned, project history, architecture memory, experience, audit learnings, and long-form project knowledge.

Do not duplicate rule bodies in `ROADMAP_INDEX.md`. If a rule changes, update [RULES.md](RULES.md) and reference its rule ID here or in the command body. Key governance pointers: startup/context `K-CTX-1`; architecture-charter baseline reading `K-CTX-2` (now unconditional per the Command Structure above — see Command Length & Conciseness Policy note), `G-SESSION-1`; documentation placement/update `K-ARCH-1`, `K-DOC-1`; sandbox/scoped verification `K-SBX-1`, `G-CODEX-VERIFY-1`; architecture/frozen boundaries `K-NEW-4`, `K-NEW-6`, `G-FROZEN-1`; shadow migration `G-SHADOW-1`; statistics `G-STATS-1`; legal/license `G-LEGAL-1`; AI `G-AI-1`.
