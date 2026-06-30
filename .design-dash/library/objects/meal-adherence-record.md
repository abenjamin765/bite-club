**TL;DR:** A Meal Adherence Record is the per-meal status entry within a [Daily Check-In](daily-check-in.md), capturing whether the client followed, modified, or skipped each planned [Meal](meal.md) and preserving the original plan for coach comparison.

---

## Definition

A **Meal Adherence Record** is the client's per-meal declaration within a [Daily Check-In](daily-check-in.md) — Followed, Modified, or Skipped — that preserves the original planned [Meal](meal.md) and optionally captures deviation type, notes, and adjusted macro estimates.

---

## SIP Validation

| Criterion | Result | Evidence |
| --- | --- | --- |
| **Structure** | ✅ | adherence status, planned meal ref, deviation type, deviation notes, adjusted macros, macro delta |
| **Instances** | ✅ | "Monday lunch — Modified (portion change)", "Tuesday dinner — Skipped", "Breakfast — Followed" |
| **Purpose** | ✅ | Gives the coach per-meal precision; anchors delta-based check-in model; preserves plan integrity |

**Verdict:** Core nested object — always lives inside a Daily Check-In.

---

## Attributes

| # | Attribute | Data Type | Required | Source | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | **Adherence Status** | Enum | Yes | Manual (client) | Followed / Modified / Skipped |
| 2 | **Planned Meal** | Reference → Meal | Yes | System | The meal from the approved plan; never mutated |
| 3 | **Daily Check-In** | Reference → Daily Check-In | Yes | System | Parent |
| 4 | **Deviation Type** | Enum | No (required if Modified) | Manual | ingredient-swap / portion-change / added-food / removed-food / different-meal / different-time / missed-meal / other |
| 5 | **Deviation Notes** | Text | No | Manual | Free-text explanation |
| 6 | **Adjusted Calories** | Number | No | Manual | What client actually consumed (estimate) |
| 7 | **Adjusted Protein (g)** | Number | No | Manual | |
| 8 | **Adjusted Carbs (g)** | Number | No | Manual | |
| 9 | **Adjusted Fat (g)** | Number | No | Manual | |
| 10 | **Macro Delta** | Computed | No | System | Adjusted - Planned per macro; shown when adjusted macros are entered |

---

## Nested Objects

None — leaf object. References planned Meal but does not nest it.

---

## Calls-to-Action (CTAs)

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **Set adherence status** | Client | Write | No | Followed / Modified / Skipped |
| 2 | **View planned vs. actual** | Client, Coach | Read | Yes → Meal | Original Meal displayed alongside actual |
| 3 | **Edit deviation notes** | Client | Write | No | Before check-in is submitted |
| 4 | **View macro delta** | Client, Coach | Read | No | Only when adjusted macros entered |

---

## Relationship Specs (MCSFD)

### Meal Adherence Record → Meal (planned)

| Dimension | Specification |
| --- | --- |
| **M - Mechanics** | Reference is set by the system when the check-in is opened; never changed by client |
| **C - Cardinality** | Each MAR references exactly one planned Meal |
| **S - Sorts** | N/A — MAR inherits Meal's type-based sort order |
| **F - Filters** | N/A |
| **D - Dependencies** | Planned Meal is preserved regardless of adherence status; MAR holds the delta, Meal holds the original |

---

## User Stories

### Client marks a meal as modified

> As a **Client**,
> I want to **mark a meal as Modified and add a note**
> so that my coach knows what actually changed without me having to re-enter the entire meal.
>
> When I select Modified, I should be prompted to choose a deviation type and optionally add a note or adjusted macros. The original planned meal should remain visible for comparison.

### Coach reviews a deviation

> As a **Coach**,
> I want to **view the planned vs. actual comparison** for a deviated meal
> so that I can give targeted feedback at the next check-in or plan review.

---

## Business Rules

1. **One per planned meal:** One Meal Adherence Record is auto-created for each Meal in the approved Day Plan when the client opens their check-in.
2. **Deviation type required when Modified:** If status = Modified, a deviation type must be selected before submission.
3. **Planned meal is immutable:** Setting a MAR to Modified or Skipped never changes the planned Meal record.
4. **Adjusted macros are optional:** Client may provide macro estimates for Modified meals but is not required to.
5. **Macro delta is computed:** When adjusted macros are entered, the system computes delta = adjusted − planned per macro.
6. **Locked on submit:** Meal Adherence Records cannot be edited after the parent Daily Check-In is submitted.
7. **Neutral language in UI:** Status labels must use non-judgmental language (no "Failed", "Cheated", etc.).

---

## Status / Lifecycle

MARs do not have their own status lifecycle; their state is determined by the `Adherence Status` enum and the submission state of their parent Daily Check-In.

---

## Object Card Specification

| Element | Specification |
| --- | --- |
| **Distinguishing Attributes** | Planned meal name and type; adherence status badge; deviation type if modified |
| **Visual Signature** | Status badge (green = Followed, amber = Modified, grey = Skipped); planned macro summary |
| **Contextual CTAs** | Tap to expand; select status; add deviation note |
| **Nested Object Indicators** | Macro delta summary if adjusted macros present |

---

## See Also

* [Object Library](../) — All objects at a glance
* [Daily Check-In](daily-check-in.md)
* [Meal](meal.md)
