**TL;DR:** A Meal is a single planned eating occasion within a [Day Plan](day-plan.md), containing [Ingredients](ingredient.md) with calculated macro totals. Meals can be saved to the [Saved Meal](saved-meal.md) library for reuse and are referenced by [Meal Adherence Records](meal-adherence-record.md) during check-in.

---

## Definition

A **Meal** is a named eating occasion — breakfast, lunch, dinner, snack, or other — that belongs to one [Day Plan](day-plan.md) and contains a list of [Ingredients](ingredient.md) from which macro totals are calculated.

---

## SIP Validation

| Criterion | Result | Evidence |
| --- | --- | --- |
| **Structure** | ✅ | name, type, ingredients, macro totals, meal notes |
| **Instances** | ✅ | "Overnight oats (breakfast)", "Chicken and rice (lunch)", "Greek yogurt (snack)" |
| **Purpose** | ✅ | Client builds meals to populate a plan; coach reviews per-meal detail; check-in marks each meal's adherence |

**Verdict:** Core nested object — central to both planning and check-in flows.

---

## Attributes

| # | Attribute | Data Type | Required | Source | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | **Meal Name** | String | Yes | Manual | Descriptive label (e.g., "Overnight oats") |
| 2 | **Meal Type** | Enum | Yes | Manual | breakfast / lunch / dinner / snack / other |
| 3 | **Calories** | Number | Computed | System | Sum of ingredient calories |
| 4 | **Protein (g)** | Number | Computed | System | |
| 5 | **Carbs (g)** | Number | Computed | System | |
| 6 | **Fat (g)** | Number | Computed | System | |
| 7 | **Fiber (g)** | Number | Computed | System | Optional |
| 8 | **Meal Notes** | Text | No | Manual | Free-text notes to client or coach |
| 9 | **Day Plan** | Reference → Day Plan | Yes | System | Parent |
| 10 | **Saved From** | Reference → Saved Meal | No | System | Set if meal was added from saved meal library |

---

## Nested Objects

| Nested Object | Relationship | How It Gets There |
| --- | --- | --- |
| [**Ingredient**](ingredient.md) | One-to-many | Client adds ingredients manually or via lookup |

---

## Calls-to-Action (CTAs)

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **Create meal** | Client | Write | No | Choose type, name |
| 2 | **View meal** | Client, Coach | Read | No | |
| 3 | **Edit meal** | Client | Write | No | Only on Draft / Needs Changes plan |
| 4 | **Delete meal** | Client | Write | No | Removes from Day Plan |
| 5 | **Add ingredient** | Client | Write | Yes → Ingredient | |
| 6 | **Save meal to library** | Client | Write | Yes → Saved Meal | Creates snapshot in Saved Meal |
| 7 | **Add from saved meal** | Client | Write | Yes → Saved Meal | Inserts ingredient copy |
| 8 | **Copy meal to another day** | Client | Write | Yes → Meal | Duplicates to target Day Plan |

---

## Relationship Specs (MCSFD)

### Meal → Ingredient

| Dimension | Specification |
| --- | --- |
| **M - Mechanics** | Client adds ingredients one at a time; manual or via database lookup |
| **C - Cardinality** | One Meal to many Ingredients; no hard limit |
| **S - Sorts** | Entry order (default); no user-reorder required in MVP |
| **F - Filters** | None on Meal detail |
| **D - Dependencies** | Deleting a Meal deletes all nested Ingredients |

### Meal → Saved Meal

| Dimension | Specification |
| --- | --- |
| **M - Mechanics** | "Save to library" creates a snapshot Saved Meal; "Add from saved" copies ingredients into current Meal |
| **C - Cardinality** | One Meal can be saved as one Saved Meal; one Saved Meal can be added to many Meals |
| **S - Sorts** | N/A |
| **F - Filters** | N/A |
| **D - Dependencies** | Saving is a snapshot — editing a Saved Meal does not affect previously added Meals |

---

## User Stories

### Client adds a meal and its ingredients

> As a **Client**,
> I want to **add ingredients to a Meal**
> so that my macro totals are accurate and my coach can see exactly what I planned.
>
> When I add each ingredient, the meal macro totals should update instantly.

### Client reuses a meal from the library

> As a **Client**,
> I want to **add a meal from my saved library**
> so that I don't have to re-enter common meals every week.
>
> When I select a saved meal, its ingredients should be copied into the current day.

---

## Business Rules

1. **At least one ingredient for submission:** A meal with no ingredients will trigger a missing-data warning on plan submit.
2. **Macros required for submission:** Each ingredient must have at least calorie data; protein/carbs/fat required for full macro tracking.
3. **Edit lock:** Meals on Submitted or Approved plans cannot be edited (triggers "Changed After Approval" status on the plan).
4. **Saved meal independence:** A Saved Meal is a snapshot; editing the plan's meal after saving does not update the saved version.
5. **Type sorting:** Meals are displayed in type order (breakfast → lunch → dinner → snack → other) regardless of entry order.

---

## Status / Lifecycle

Meals do not have their own status; their editability is governed by the parent Weekly Meal Plan's status.

---

## Object Card Specification

| Element | Specification |
| --- | --- |
| **Distinguishing Attributes** | Meal name, type, macro summary (cal / P / C / F) |
| **Visual Signature** | Meal type icon; macro bar or badge |
| **Contextual CTAs** | "Add ingredient", "Save to library", "Copy to day" |
| **Nested Object Indicators** | Ingredient count; missing data warning |

---

## Shapeshifter Matrix

| Context | Name | Type | Macros | Notes | CTAs | Card Shape |
| --- | --- | --- | --- | --- | --- | --- |
| Day Plan (client editing) | ✓ | ✓ | ✓ | ✓ | Add ingredient, Save, Copy, Delete | Expandable card |
| Weekly Plan review (coach) | ✓ | ✓ | ✓ | ✓ | View only | Read-only card |
| Daily Check-In | ✓ | ✓ | ✓ (planned) | — | Mark status | Adherence row |

---

## See Also

* [Object Library](../) — All objects at a glance
* [Day Plan](day-plan.md)
* [Ingredient](ingredient.md)
* [Saved Meal](saved-meal.md)
* [Meal Adherence Record](meal-adherence-record.md)
