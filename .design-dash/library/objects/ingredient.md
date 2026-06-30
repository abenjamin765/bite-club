**TL;DR:** An Ingredient is the atomic nutrition unit within a [Meal](meal.md), carrying the quantity, unit, and macro values that roll up to meal, day, and week totals. Entered manually or via USDA / Open Food Facts lookup.

---

## Definition

An **Ingredient** is a single food item with a specific quantity and unit added to a [Meal](meal.md), from which calorie and macro values are recorded and summed into parent totals.

---

## SIP Validation

| Criterion | Result | Evidence |
| --- | --- | --- |
| **Structure** | ✅ | name, quantity, unit, calories, protein, carbs, fat, fiber, source, user-confirmed flag |
| **Instances** | ✅ | "100g rolled oats", "1 tbsp almond butter", "1 scoop whey protein" |
| **Purpose** | ✅ | Ingredient-level accuracy is the product's core accuracy promise; coaches review at this level |

**Verdict:** Core nested object — the leaf of the planning spine.

---

## Attributes

| # | Attribute | Data Type | Required | Source | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | **Ingredient Name** | String | Yes | Manual / API | Food item name |
| 2 | **Quantity** | Number | Yes | Manual | Numeric amount |
| 3 | **Unit** | String | Yes | Manual | e.g., g, oz, tbsp, cup, slice |
| 4 | **Calories** | Number | Yes | Manual / API | Per entered quantity |
| 5 | **Protein (g)** | Number | Yes | Manual / API | |
| 6 | **Carbs (g)** | Number | Yes | Manual / API | |
| 7 | **Fat (g)** | Number | Yes | Manual / API | |
| 8 | **Fiber (g)** | Number | No | Manual / API | Optional |
| 9 | **Source** | Enum | No | System | `manual` / `usda` / `open-food-facts` |
| 10 | **User Confirmed** | Boolean | No | Manual | Client explicitly verified macros; shown as badge |
| 11 | **Meal** | Reference → Meal | Yes | System | Parent |

---

## Nested Objects

None — Ingredient is a leaf object.

---

## Calls-to-Action (CTAs)

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **Add ingredient manually** | Client | Write | No | Name, qty, unit, macros |
| 2 | **Lookup ingredient** | Client | Write | No | USDA / Open Food Facts search; pre-fills fields |
| 3 | **Edit ingredient** | Client | Write | No | Only on editable plan |
| 4 | **Remove ingredient** | Client | Write | No | Recalculates meal totals |
| 5 | **Confirm macros** | Client | Write | No | Sets user-confirmed flag |

---

## Relationship Specs (MCSFD)

### Ingredient → Meal

| Dimension | Specification |
| --- | --- |
| **M - Mechanics** | Client adds via manual entry form or database lookup |
| **C - Cardinality** | Many ingredients per Meal; no hard cap |
| **S - Sorts** | Entry order |
| **F - Filters** | None |
| **D - Dependencies** | Ingredient is deleted with its parent Meal; no orphan ingredients |

---

## User Stories

### Client adds an ingredient manually

> As a **Client**,
> I want to **add an ingredient manually** to a Meal
> so that I can record exactly what I plan to eat with the right quantities.
>
> When I save the ingredient, the meal macro totals should update immediately.

### Client uses database lookup

> As a **Client**,
> I want to **look up an ingredient** from the USDA or Open Food Facts database
> so that I get accurate macro values without typing every number by hand.
>
> When I search and select a food, the name and macros should pre-fill; I can then adjust the quantity.

---

## Business Rules

1. **Required for plan submission:** A Meal flagged as "missing data" (no ingredients, or ingredient missing calories) blocks plan submission.
2. **Lookup is optional:** Database lookup is offered but never forced — manual entry is always available.
3. **Snapshot in Saved Meal:** When a Meal is saved to the library, its ingredients are copied as a snapshot; the Saved Meal's ingredients are independent of the originals.
4. **Unit flexibility:** Any unit string is accepted (household or metric); no forced conversion in MVP.
5. **Edit lock:** Ingredients on a Submitted or Approved plan cannot be edited.

---

## Object Card Specification

| Element | Specification |
| --- | --- |
| **Distinguishing Attributes** | Name, quantity + unit, macro summary (cal/P/C/F) |
| **Visual Signature** | Compact row; confirmed badge if user-confirmed |
| **Contextual CTAs** | Edit, Remove, Confirm macros |
| **Nested Object Indicators** | None (leaf) |

---

## See Also

* [Object Library](../) — All objects at a glance
* [Meal](meal.md)
* [Saved Meal](saved-meal.md)
