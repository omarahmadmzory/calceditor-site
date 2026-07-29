# CHARTER - CalcEditor Current Architecture
# ميثاق المشروع - المعمارية الحالية فقط

---

## 1. Purpose

هذا الملف هو السلطة العليا للمعمارية الحالية عالية المستوى في CalcEditor.

`docs/roadmap/RULES.md` هو المصدر الوحيد للقواعد التنفيذية الحاكمة. هذا الميثاق ليس ملف قواعد ثانياً، ولا يكرر قواعد Git أو sandbox أو verification أو audit أو stop conditions.

---

## 2. Ownership And Communication

| الدور | المسؤولية |
|---|---|
| Owner | عمر |
| Implementation Agent | يقرأ الكود الفعلي ويعدله عند التصريح |
| Strategic Reasoning Agent | يحلل القرارات المعمارية ويقترح الحدود |

جميع الردود الخاصة بالمشروع تكون بالعربية ما لم يطلب عمر غير ذلك.

---

## 3. Product Identity

CalcEditor هو تطبيق ومنصة رياضيات تطبيقية تستخدم واجهة حاسبة علمية ومحرر رياضيات منظم فوق محركات deterministic.

الرؤية العامة:

```text
Casio-style input
+ structured math editor
+ deterministic numeric/symbolic engines
+ graphing and educational tools
```

المنتج يستلهم الفكرة العامة من Desmos وWolfram Alpha وCasio UX دون نسخ واجهات أو نصوص أو سلوكيات محمية.

---

## 4. Document Responsibility Model

| الملف | الدور |
|---|---|
| `docs/CHARTER.md` | `CURRENT_HIGH_LEVEL_ARCHITECTURE_AUTHORITY` |
| `docs/roadmap/RULES.md` | `SOLE_EXECUTABLE_GOVERNANCE_AUTHORITY` |
| `docs/roadmap/ROADMAP_INDEX.md` | `CURRENT_BOOTSTRAP_AND_OPERATIONAL_INDEX` |
| `docs/roadmap/MATH_INPUT_ARCHITECTURE_CONTRACT_v2.1.md` | `DETAILED_MATH_INPUT_TECHNICAL_AND_HISTORICAL_REFERENCE` |
| `docs/KNOWLEDGE.md` | `LESSONS_LEARNED_AND_LONG_FORM_PROJECT_KNOWLEDGE` |
| `docs/audits/` | أحدث أدلة الأوامر والقرارات |
| `docs/roadmap/AGENT_SESSION_LOG.md` | سجل التنفيذ المتداول |
| `docs/roadmap/archive/` | التاريخ المغلق غير القابل للتعديل |

عند اختلاف الوثائق: لا يُحذف أو يُعاد تفسير محتوى فريد تلقائياً. يجب فحص أحدث audit ذي صلة، ثم عرض التناقض وانتظار قرار صريح قبل النقل أو الحذف أو إعادة الصياغة.

---

## 5. Current Architecture Summary

CalcEditor يعمل حالياً كحاسبة ومحرر رياضي منظم فوق نموذج `Expr` ومؤشر `CursorAddress(path, gap)`.

سلطة التحرير النشطة حيث ثبتت هي `MathInputController` مع `EditingEngine` و`NavigationEngine`. العرض للسطح المشترك النشط يمر عبر `MathDisplay -> MathLayoutEngine -> MathPainter`.

Standard وAdvanced يشتركان في أجزاء مثبتة من مسار التعبير والمؤشر والتحرير والعرض للسطح المشترك النشط. هذا لا يعني أن كل مسار تاريخي أو fallback أزيل.

النتيجة المرئية الحالية في المسارات المدققة تنتج من:

- Standard normal: `TreeWalkingNumericEngine`
- Advanced normal: `AdvancedSharedEvaluationAuthority -> TreeWalkingNumericEngine`
- Advanced derivative/integral: `StandardPrimaryRuntimeApplication -> StandardPrimaryCalculusDispatchAdapter -> standardOutput`

Compatibility and fallback components may remain for bounded runtime, migration, validation, or diagnostic responsibilities. Their exact ownership and removal eligibility require dedicated evidence.

Cursor touch geometry note: `CaretStop` is an active touch/cursor-geometry support record where proven. It helps hit testing resolve visible gaps and placeholder/body entry regions to the correct `CursorAddress(path, gap)`. It is not the runtime cursor, does not replace `CursorAddress`, does not activate `CursorAnchor`, and does not change AST or editing-engine cursor semantics.

---

## 6. Runtime Flow

```text
User input
  -> MathInputController
  -> EditingEngine / NavigationEngine
  -> Expr + CursorAddress

Expr
  |-> MathDisplay -> MathLayoutEngine -> MathPainter -> visible expression
  `-> approved evaluation authority -> VISIBLE_STATE_WRITER -> visible result
```

التقييم لا يمر عبر `MathDisplay`. `MathDisplay` يملك عرض التعبير والتفاعل البصري، بينما التقييم يقرأ التعبير عبر السلطة المعتمدة للمسار ثم ينشر النتيجة عبر كاتب الحالة المرئية.

---

## 7. Shared Standard And Advanced Responsibilities

هذا القسم يصف ما تشترك فيه Standard وAdvanced حيث ثبت ذلك للسطح المشترك النشط فقط. الصياغة هنا bounded ولا تثبت إزالة legacy أو fallback أو compatibility routes.

| المسؤولية | المكون أو المسار | Standard usage | Advanced usage where proven | الحالة والحدود |
|---|---|---|---|---|
| Expression | `Expr` | active typed expression model | used where proven for the active shared surface | shared active expression model where proven |
| Editing | `MathInputController`, `EditingEngine` | active typed editing authority | shared controller/gateway routes where proven for the active shared surface | shared editing routes are bounded by proven actions |
| Navigation | `NavigationEngine` | structural cursor/navigation | structural navigation where proven for the active shared surface | legacy cursor adapters may still exist |
| Cursor | `CursorAddress(path, gap)` | runtime cursor model | runtime cursor model where proven for the active shared surface | `NodeId`, `AstIndex`, `CursorAnchor` are not current cursor authority here |
| Touch cursor geometry | `CaretStop`, cursor maps, hit maps, structural interaction records | support records that resolve touchable gaps/body entries to `CursorAddress` | where proven for the active shared surface | not a synthetic cursor address and not a replacement for `CursorAddress` |
| Fractions and nested fractions | `Expr` fraction nodes, `MathDisplay`, layout/paint/hit maps | structural fraction representation and display | where proven for the active shared surface | compatibility/fallback ownership requires dedicated evidence |
| Roots and indexed roots | structural radical routes, `MathDisplay` | root rendering/editing | square root, cube root, nth root where proven for the active shared surface | unsupported or historical payload handling is not removal evidence |
| Powers | structural power/exponent route | typed power route | approved power routes where proven for the active shared surface | invalid/no-op guidance is mapped outside editor authority |
| Factorial | postfix structural factorial | structural node/action | structural route proven | fresh supported action is structural |
| Absolute value | structural absolute-value bars | structural action/rendering | structural route proven | no fresh generic function fallback is approved as authority |
| Functions and delimiters | typed function/delimited expression model | structured editing where supported | where proven for the active shared surface | historical raw text/function compatibility may remain |
| Multiplication/division presentation | `MathLayoutEngine` presentation mapping | internal `*` and `/` can render as `×` and `÷` | same presentation expectation where proven | presentation mapping, not a structural editing route |
| Rendering | `MathDisplay` | active expression rendering surface | active shared surface where proven | legacy renderers may still exist elsewhere |
| Layout | `MathLayoutEngine` | mathematical geometry | active shared surface where proven | layout/fallback code removal is unproven |
| Painting | `MathPainter` | draws calculated layout | active shared surface where proven | old painters are not declared removable |
| Hit testing | `TapResolver`, cursor maps, hit maps | tap/cursor interaction maps | where proven for the active shared surface | exact fallback ownership requires evidence |
| Viewport | `MathDisplay` viewport responsibility | cursor visibility and scroll behavior | where proven for the active shared surface | phone validation work can remain open |
| Normal evaluation | `TreeWalkingNumericEngine` | `VISIBLE_RESULT_AUTHORITY` for inspected normal path | accepted through `AdvancedSharedEvaluationAuthority` for inspected normal path | not proof every legacy evaluator is removable |
| Calculus evaluation | `StandardPrimaryRuntimeApplication`, `StandardPrimaryCalculusDispatchAdapter` | Standard-primary runtime boundary | accepted derivative/integral `standardOutput` in inspected paths | `CalculatorEngine` may run diagnostically |
| Visible-state publication | screen visible writers | `CalculatorScreen._handleEquals` | `AdvancedScientificScreen._applyEngineOutput` | explicit `VISIBLE_STATE_WRITER` boundary |
| Verification and comparison | monitor/comparison components | verifier/reference outputs do not publish visible result | diagnostic comparison reports only | no authority transfer implied |

---

## 8. Component Types And Authority Roles

| Component | Type | Current Role |
|---|---|---|
| `TreeWalkingNumericEngine` | typed numeric evaluation engine | `VISIBLE_RESULT_AUTHORITY` for the inspected Standard normal path and accepted numeric source for inspected Advanced normal through wrapper |
| `AdvancedSharedEvaluationAuthority` | Advanced evaluation orchestrator/wrapper | packages the accepted Advanced normal result from `TreeWalkingNumericEngine` |
| `StandardPrimaryRuntimeApplication` | runtime orchestration boundary | returns the accepted Standard-primary output for inspected Advanced non-normal paths |
| `StandardPrimaryCalculusDispatchAdapter` | specialized calculus adapter | produces accepted derivative/integral `standardOutput` |
| `CalculatorEngine` | legacy/reference evaluation engine | `VERIFIER_ONLY_EXECUTION` or reference/diagnostic execution in inspected paths; not current `VISIBLE_RESULT_AUTHORITY` |
| `StandardPrimaryRuntimeMonitor` | diagnostic monitor | `DIAGNOSTIC_ONLY_EXECUTION`; records comparison and mismatch information |
| `ModeAwareShadowComparison` | diagnostic comparison system | `COMPARISON_LOCAL_REFERENCE_SIDE` and `SHADOW_OR_CANDIDATE_SIDE` reporting only |
| `MathInputController` | typed editing controller | active expression/cursor mutation authority where proven |
| `EditingEngine` | AST editing engine | applies structural edits |
| `NavigationEngine` | structural navigation engine | performs cursor/navigation operations |
| `MathDisplay` | structural rendering and interaction surface | renders typed expressions and owns active interaction maps where proven |
| `MathLayoutEngine` | layout/geometry engine | computes mathematical geometry and presentation mappings such as `×` and `÷` |
| `MathPainter` | painter | draws the calculated layout |
| `CursorAddress` | runtime cursor model | active structural cursor |
| `CaretStop` | touch/cursor geometry support record | active support for hit-tested cursor entry where proven; resolves toward `CursorAddress`, not a cursor authority itself |
| `Expr` | typed expression model | active structural expression tree |

---

## 9. Engine Authority, Shadow, And Retirement Terms

The inspected Standard normal and Advanced normal paths use `TreeWalkingNumericEngine` as the accepted numeric evaluation source.

The inspected Advanced derivative/integral paths use `StandardPrimaryCalculusDispatchAdapter` through `StandardPrimaryRuntimeApplication`.

`CalculatorEngine` remains active for verifier, reference-side, diagnostic, or comparison responsibilities in the inspected paths. It does not own the inspected active visible result. It is not dead. It is not unused. It is not currently approved for deletion.

Future retirement is possible only after a dedicated audit proves that no runtime, compatibility, fallback, verification, diagnostic, or comparison path still requires it.

Absence of visible-result authority is not removal evidence.

Current retirement classification:

- REMOVAL_NOT_PROVEN
- CANDIDATE_ONLY_AFTER_DEDICATED_RETIREMENT_AUDIT

`CalculatorEngine` -> `REMOVAL_NOT_PROVEN` / `CANDIDATE_ONLY_AFTER_DEDICATED_RETIREMENT_AUDIT`

Terminology:

| مصطلح | المعنى |
|---|---|
| `VISIBLE_RESULT_AUTHORITY` | المكون الذي ينتج القيمة المقبولة للعرض للمستخدم في المسار المدقق |
| `VISIBLE_STATE_WRITER` | الشاشة أو الحد الذي يكتب الحالة المرئية فعلياً |
| `VERIFIER_ONLY_EXECUTION` | تنفيذ للمقارنة أو التحقق لا يملك النتيجة المرئية |
| `COMPARISON_LOCAL_REFERENCE_SIDE` | جانب مرجعي داخل comparison فقط |
| `SHADOW_OR_CANDIDATE_SIDE` | تنفيذ مرشح أو shadow لا ينشر نتيجة للمستخدم |
| `DIAGNOSTIC_ONLY_EXECUTION` | تسجيل أو تقرير أو mismatch analysis فقط |
| `REMOVAL_NOT_PROVEN` | لا يوجد دليل كاف للحذف أو التقاعد |

داخل `ModeAwareShadowComparison`، كلمة `production` تعني `COMPARISON_LOCAL_REFERENCE_SIDE` ولا تعني `APP_LEVEL_VISIBLE_RESULT_AUTHORITY`.

أي authority transfer أو retirement يحتاج أمراً صريحاً وأدلة منفصلة.

---

## 10. Compact Current/Historical Context

هذا ملخص حدودي فقط: `previous -> current -> remaining`. لا يوثق تاريخ الهجرة التفصيلي.

| المجال | previous | current | remaining |
|---|---|---|---|
| Standard evaluation | `MathInputController -> Expr -> expr_to_compute -> TreeWalkingNumericEngine -> NumericResult -> Standard visible result` | Standard normal -> `TreeWalkingNumericEngine` | verifier/diagnostic paths remain separate from visible authority |
| Advanced normal evaluation | `AdvancedScientificScreen -> CalculatorEngine -> EngineOutput -> ExactResult -> Advanced visible result` | Advanced normal -> `AdvancedSharedEvaluationAuthority -> TreeWalkingNumericEngine` | compatibility, fallback, verifier, and diagnostic responsibilities require dedicated evidence |
| Advanced calculus | Advanced non-normal path required a specialized boundary | Advanced calculus -> `StandardPrimaryRuntimeApplication -> StandardPrimaryCalculusDispatchAdapter -> standardOutput` | `CalculatorEngine` may remain diagnostic/reference in inspected paths |
| Expression model | Standard used typed `Expr`; Advanced has bounded shared structural routes now proven | active shared structural ownership where proven -> `Expr` | old payload compatibility and unsupported paths are not removal evidence |
| Cursor | active runtime cursor for the shared surface -> `CursorAddress(path, gap)` | `CursorAddress(path, gap)` remains current runtime cursor | `NodeId`, `AstIndex`, `CursorAnchor` remain deferred identity model here |
| Editing | shared typed edits where proven | `MathInputController`, `EditingEngine`, `NavigationEngine` | route parity remains bounded by proven actions |
| Rendering | active shared expression surface uses `MathDisplay` where proven | `MathDisplay -> MathLayoutEngine -> MathPainter` | legacy render/fallback removal is unproven |
| Structural fractions/roots/functions | shared structural behavior is proven only for bounded active routes | approved shared structural routes are used where proven for the active shared surface | compatibility and fallback exact ownership require dedicated evidence |

---

## 11. DEFERRED_IDENTITY_MODEL

هذه المكونات موثقة أو موجودة في المستودع، لكنها لا تُعرض هنا كسلطة runtime مساوية لـ `CursorAddress` إلا إذا أثبت أمر لاحق ذلك:

| المكون | الحالة |
|---|---|
| `NodeId` | نموذج هوية/تتبع مؤجل أو داعم؛ ليس بديل المؤشر الحي المثبت هنا |
| `AstIndex` | فهرسة/هوية موثقة؛ ليست سلطة cursor runtime الحالية |
| `CursorAnchor` | مؤجل؛ لم يثبت كمسار runtime حالي |

المؤشر الحي الحالي هو `CursorAddress(path, gap)`.

---

## 12. Architectural Principles

- Deterministic evaluation layers remain independent from Flutter UI.
- UI surfaces use approved controller and gateway boundaries.
- Editing, rendering, evaluation, and visible-state publication remain separate responsibilities.
- `Expr`, `CursorAddress`, and `MathInputController` define active shared structural ownership where proven.
- Executable governance is defined only by `docs/roadmap/RULES.md`.

---

## 13. AI Boundary

AI في CalcEditor يشرح ويوجه فقط. المحركات deterministic هي مصدر الحقيقة للحساب.

أي تفاصيل تنفيذية حول AI، السلامة، أو الإطلاق تُحل من `RULES.md` والأوامر المخصصة، لا من هذا الميثاق.

---

## 14. Documentation Map

| الملف | الدور |
|---|---|
| `docs/CHARTER.md` | السلطة العليا للمعمارية الحالية عالية المستوى |
| `docs/roadmap/RULES.md` | المصدر الوحيد للقواعد التنفيذية |
| `docs/roadmap/ROADMAP_INDEX.md` | bootstrap تشغيلي ومؤشر الحالة الحالية |
| `docs/roadmap/MATH_INPUT_ARCHITECTURE_CONTRACT_v2.1.md` | مرجع تقني/تاريخي تفصيلي لمسارات Math Input؛ ليس قراءة bootstrap عادية |
| `docs/KNOWLEDGE.md` | دروس وخبرة وتاريخ طويل؛ ليس governance ولا bootstrap |
| `docs/audits/VISIBLE_RESULT_AUTHORITY_VS_SHADOW_COMPARISON_ROLE_AUDIT_2051_2026-07-14.md` | دليل سلطة النتيجة المرئية مقابل التشخيص |

---

## 15. Deferred Documentation Work

التاريخ التفصيلي للهجرة لا يوثق هنا.

تصنيف مؤجل:

`FUTURE_PLAN_MOVE_LATER - ARCHITECTURE_EVOLUTION_HISTORY`

أي خطط حذف أو تقاعد أو نقل ملكية مستقبلية تحتاج أمراً مخصصاً ولا تُستنتج من هذا الميثاق.
