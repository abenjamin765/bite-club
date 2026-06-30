**TL;DR:** A Saved Meal is a client-owned reusable snapshot of a [Meal](meal.md) — ingredients and macros preserved at save time — that can be added to any [Day Plan](day-plan.md) without rebuilding from scratch.

---

## Definition

A **Saved Meal** is a named snapshot of a [Meal](meal.md)'s ingredients and macro totals, stored in a client's personal library and available to copy into future meal plans without re-entering ingredient data.

---

## SIP Validation

| Criterion | Result | Evidence |
| --- | --- | --- |
| **Structure** | ✅ | name, ingredient snapshot, macro snapshot, saved date, owner |
| **Instances** | ✅ | "My overnight oats", "Chicken and rice bowl", "Pre-workout snack" |
| **Purpose** | ✅ | Reduces daily planning burden; central to the reuse mechanic (requirements §8.3; research.md) |

**Verdict:** Core system object — key to the plan-first / low-daily-burden thesis.

---

## Synonyms / Also Known As

| Term | Context | Notes |
| --- | --- | --- |
| "Saved recipe" | User mental model | Avoid — "recipe" implies a different scope; use "saved meal" |
| "Template" | General | Distinct from coach-provided templates (deferred) |

---

## Attributes

| # | Attribute | Data Type | Required | Source | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | **Name** | String | Yes | Manual | Client names the saved meal |
| 2 | **Calories** | Number | Computed at save | Snapshot | Total at time of save |
| 3 | **Protein (g)** | Number | Computed at save | Snapshot | |
| 4 | **Carbs (g)** | Number | Computed at save | Snapshot | |
| 5 | **Fat (g)** | Number | Computed at save | Snapshot | |
| 6 | **Fiber (g)** | Number | Computed at save | Snapshot | Optional |
| 7 | **Saved Date** | DateTime | Yes | System | When the snapshot was taken |
| 8 | **Owner** | Reference → Account | Yes | System | The client who saved it |

---

## Nested Objects

| Nested Object | Relationship | How It Gets There |
| --- | --- | --- |
| [**Ingredient**](ingredient.md) | One-to-many (snapshot) | Copied from Meal at save time; read-only in library |

---

## Calls-to-Action (CTAs)

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **View saved meals** | Client | Read | No | Library list |
| 2 | **Save meal** | Client | Write | Yes → Meal | Creates snapshot from current Meal |
| 3 | **Use saved meal** | Client | Write | Yes → Meal | Copies ingredients into target Meal |
| 4 | **Edit saved meal** | Client | Write | No | Edits the saved version only; does not affect plan copies |
| 5 | **Delete saved meal** | Client | Write | No | Does not affect meals already added to plans |

---

## Relationship Specs (MCSFD)

### Saved Meal → Meal (source)

| Dimension | Specification |
| --- | --- |
| **M - Mechanics** | Client taps "Save to library" on a Meal; a snapshot is created |
| **C - Cardinality** | One Meal can produce many Saved Meal snapshots over time (if saved again after editing); one Saved Meal references the moment it was saved |
| **S - Sorts** | N/A |
| **F - Filters** | N/A |
| **D - Dependencies** | Snapshot is independent — deleting the source Meal does not delete the Saved Meal |

### Saved Meal → Meal (use)

| Dimension | Specification |
| --- | --- |
| **M - Mechanics** | Client selects "Add from saved" on a Day Plan; chooses a Saved Meal; its ingredients are copied into a new Meal |
| **C - Cardinality** | One Saved Meal can be used in many Meals; copies are independent |
| **S - Sorts** | Saved Meals list: recency (most recently used first) or alphabetical — TBD |
| **F - Filters** | Name search in MVP |
| **D - Dependencies** | Editing or deleting a Saved Meal does not affect previously added Meals |

---

## User Stories

### Client saves a meal for reuse

> As a **Client**,
> I want to **save a meal to my library**
> so that I can add it to next week's plan without rebuilding it from scratch.
>
> When I tap "Save to library", the meal name and ingredients should be snapshotted and appear in my saved meals list.

### Client adds a saved meal to a day

> As a **Client**,
> I want to **add a saved meal to today's plan**
> so that I can plan a common meal without re-entering ingredients.
>
> When I add it, the ingredients should appear in the current day's meal, and I should be able to edit them without changing the saved version.

---

## Business Rules

1. **Snapshot semantics:** A Saved Meal is a point-in-time copy. Editing the original Meal later does not update the saved version, and vice versa.
2. **Adding creates a copy:** Using a Saved Meal inserts independent copies of its ingredients into the target Meal.
3. **Client-owned:** Saved Meals are visible only to the client who created them. (Coach templates are out of MVP scope — A-006.)
4. **Delete independence:** Deleting a Saved Meal does not affect plan Meals that were built from it.
5. **Name required:** A Saved Meal must have a name before saving.

---

## Object Card Specification

| Element | Specification |
| --- | --- |
| **Distinguishing Attributes** | Name, macro summary (cal / P / C / F), saved date |
| **Visual Signature** | Compact card with macro badge; saved date in subdued text |
| **Contextual CTAs** | "Use" (primary), "Edit", "Delete" |
| **Nested Object Indicators** | Ingredient count |

---

## See Also

* [Object Library](../) — All objects at a glance
* [Meal](meal.md)
* [Ingredient](ingredient.md)
* [Day Plan](day-plan.md)
