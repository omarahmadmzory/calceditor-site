# SITE ROADMAP D — Governance & Process (Site Scope)

*Read when writing/structuring a new `S###` command, or asking "where does X belong?" for the Site project.*

---

## Canonical Site Documentation Map

*Where to find things in `calceditor-site`. Do not duplicate content across files — cross-reference instead.*

| File | Role | What belongs here | Reading rule |
|---|---|---|---|
| `docs/SITE_ROADMAP_INDEX.md` | Current bootstrap and operational index | Current command, next command, lean status pointer | Always read fully first (`S-CTX-1`) |
| `docs/SITE_RULES.md` | Sole executable governance authority | Scope, execution, documentation-placement, verification, numbering, stop-condition rules | Always read fully during normal startup |
| `docs/SITE_CHARTER.md` | Current high-level Site architecture authority | Site boundary, source ownership, rendering/navigation/localization/RTL responsibility, advertising boundary | Targeted relevant sections for architecture-relevant commands |
| `docs/SITE_ROADMAP_C_PROJECT_IDENTITY.md` | Shared product-identity reference | App name, domain, public contact, Privacy Policy URL, resolved path references | Read when identity/contact/URL facts are needed |
| `docs/SITE_ROADMAP_G_LEGAL_AND_PLATFORM.md` | Legal/platform reference | Copyright, licensing, fonts/images, embeds, analytics/ads boundary, hosting/domain notes | Read for legal/licensing/ads/tracking questions |
| `docs/SITE_ROADMAP.md` | Minimal planning placeholder | Statement that full Site planning is deferred to S002 | Read only when checking planning status |
| `docs/SITE_AGENT_SESSION_LOG.md` | Rolling execution context | Compact entry per completed `S###` command | Read by command number only |
| `docs/audits/` | Active Site audits | Current audit reports for completed Site commands | Read one file at a time |

**Current high-level Site architecture authority lives in `docs/SITE_CHARTER.md`. Executable Site governance lives in `docs/SITE_RULES.md`. Neither the calculator app's `docs/CHARTER.md` nor its `docs/roadmap/RULES.md` governs the Site.**

**Rule IDs referenced here are mandatory, not optional. Resolve referenced Site rule IDs from `docs/SITE_RULES.md` before executing tasks that touch their scope.**

---

## Site Command Template

```text
S<NUMBER> - <COMMAND-NAME>

GOAL:
<One paragraph describing the objective.>

CONTEXT:
<Key findings from the prior Site audit or session log.>

MANDATORY READING:
- docs/SITE_ROADMAP_INDEX.md
- docs/SITE_RULES.md
- docs/SITE_CHARTER.md (targeted sections) if the command scope is architecture-relevant
- <other explicit full file path(s) only — never an unnamed/implied reference>

Resolve only the referenced rule IDs from docs/SITE_RULES.md:
- RULE-ID-1
- RULE-ID-2

SCOPE:
Allowed:
<Explicit file paths and areas where changes are permitted.>
Forbidden:
<Explicit file paths, subsystems, or behaviors that must not change.>

TASKS:
1. <Step one>
2. <Step two>

STOP CONDITIONS:
<When to stop and report instead of proceeding.>

VERIFICATION:
<Exact checks to run, scoped per S-VERIFY-1 to the Site's actually-detected technology.>

DOCUMENTATION:
Create audit: YES/NO — state explicitly.
<If YES: exact audit file path. If NO: which files are updated instead — typically SITE_ROADMAP_INDEX.md + SITE_AGENT_SESSION_LOG.md only.>

OUTPUT:
<What to report upon completion.>

END S<NUMBER>
```

SCOPE is mandatory in every Site command — never omit it, never leave it without an explicit Allowed/Forbidden split.

## Site Startup Reading Order

1. `docs/SITE_ROADMAP_INDEX.md`
2. `docs/SITE_RULES.md`
3. Targeted `docs/SITE_CHARTER.md` section or targeted `docs/SITE_ROADMAP_*.md` file, per the command's scope
4. Work

## Command Conciseness Policy

- State a constraint once, in `SCOPE` or `STOP CONDITIONS`; do not restate it in `CONTEXT`, `TASKS`, and `VERIFICATION` in different words.
- Tabulate repeated question patterns instead of long prose-bullet lists.
- `OUTPUT` reports only what `DOCUMENTATION` does not already cover.
- Length is fine when it reflects real complexity; it is a defect when it repeats the same constraint multiple ways.

## Final Report Policy

If verification passes, keep the report brief. Report only:
1. Files changed
2. Primary behavior confirmation
3. Verification results

Do not restate the command body or reproduce `END S<NUMBER>` in the final report.

## Next Command Policy

- Do not generate a complete future `S###` command unless explicitly requested.
- Recommend the next step using only:

```text
NEXT:
S<number> - <short title>
```

- `NEXT` lines are recommendations only, not approved implementation plans.

## Writing Block Delivery Requirement

Deliver Site commands inside a Writing Block so the Owner can copy, reuse, or store them as named documents. Use a standard code block only as a fallback if the client does not support Writing Blocks. Do not mix both formats.

## Documentation Update Requirements

Completion documentation requirements are governed by `S-DOC-1`, `S-LOG-1`, and `S-EXEC-1` in `docs/SITE_RULES.md`. Keep command output scoped: update the pointer, session log, and audit files only as required by those rules and the approved command scope.

---

## Governance Rules Pointer

Active executable Site governance rules live in `docs/SITE_RULES.md`. Normal bootstrap sequence is:

```text
SITE_ROADMAP_INDEX.md
SITE_RULES.md
Work
```

Do not duplicate rule bodies in `SITE_ROADMAP_INDEX.md`. If a Site rule changes, update `SITE_RULES.md` and reference its rule ID here or in the command body.
