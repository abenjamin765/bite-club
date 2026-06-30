**TL;DR:** A Day Plan is one calendar day within a [Weekly Meal Plan](weekly-meal-plan.md), containing a list of [Meals](meal.md) with aggregated macro totals for that day.

---

## Definition

A **Day Plan** is a single day's planned meals within a Weekly Meal Plan, aggregating the nutritional totals of all planned [Meals](meal.md) for that date.

---

## SIP Validation

| Criterion | Result | Evidence |
| --- | --- | --- |
| **Structure** | ✅ | date, meals, day macro totals, completion status |
| **Instances** | ✅ | "Monday Jun 30", "Tuesday Jul 1", "Saturday (rest day)" |
| **Purpose** | ✅ | Client plans one day at a time; coach reviews per-day totals; check-in drives off the day's meals |

**Verdict:** Core nested object — always appears within a Weekly Meal Plan.

---

## Attributes

| # | Attribute | Data Type | Required | Source | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | **Date** | Date | Yes | System | Calendar date this plan day represents |
| 2 | **Day of Week** | String | Computed | System | "Monday", "Tuesday", etc. |
| 3 | **Daily Calories** | Number | Computed | System | Sum of all meal calories |
| 4 | **Daily Protein (g)** | Number | Computed | System | |
| 5 | **Daily Carbs (g)** | Number | Computed | System | |
| 6 | **Daily Fat (g)** | Number | Computed | System | |
| 7 | **Daily Fiber (g)** | Number | Computed | System | Optional |
| 8 | **Completion Status** | Enum | Computed | System | Has meals / Missing data / No meals |
| 9 | **Weekly Meal Plan** | Reference → Weekly Meal Plan | Yes | System | Parent plan |

---

## Nested Objects

| Nested Object | Relationship | How It Gets There |
| --- | --- | --- |
| [**Meal**](meal.md) | One-to-many | Client adds meals to this day |

---

## Calls-to-Action (CTAs)

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **View day plan** | Client, Coach | Read | No | |
| 2 | **Add meal** | Client | Write | Yes → Meal | Creates a new Meal on this day |
| 3 | **Copy day to another day** | Client | Write | Yes → Day Plan | Duplicates all Meals to target day |
| 4 | **View day macro totals** | Client, Coach | Read | No | Calculated; updates on ingredient change |

---

## Relationship Specs (MCSFD)

### Day Plan → Meal

| Dimension | Specification |
| --- | --- |
| **M - Mechanics** | Client adds a meal via "Add meal" CTA; selects type (breakfast/lunch/dinner/snack) |
| **C - Cardinality** | One Day Plan to many Meals; no hard limit in MVP |
| **S - Sorts** | By meal type order: breakfast → lunch → dinner → snack → other |
| **F - Filters** | None on Day Plan detail |
| **D - Dependencies** | Deleting a Day Plan deletes all nested Meals and Ingredients |

---

## User Stories

### Client plans a single day

> As a **Client**,
> I want to **add meals to a Day Plan**
> so that I have a complete nutritional picture for that day before submitting my weekly plan.
>
> When I add an ingredient to any meal, the day macro totals should update automatically.

### Client copies a productive day

> As a **Client**,
> I want to **copy a Day Plan to another day**
> so that I don't have to re-enter the same meals multiple times.
>
> When I copy, the target day should have identical meals that I can then edit independently.

---

## Business Rules

1. **One per calendar date:** A Day Plan can only exist once per date within a given Weekly Meal Plan.
2. **Auto-created:** A Day Plan is created implicitly when a client adds their first meal to that date.
3. **Cascading delete:** Deleting a Day Plan removes all nested Meals and Ingredients.
4. **Copy independence:** Copied Day Plans and their Meals are independent; editing a copy does not affect the original.

---

## Status / Lifecycle

```
(implicitly created) → has meals → complete (all meals have macros) / incomplete (missing data)
```

| Status | Description | Triggers |
| --- | --- | --- |
| **No meals** | Day exists in plan week but no meals added | Default |
| **Has meals** | At least one Meal added | Client adds first meal |
| **Missing data** | Meals exist but some lack required macro data | System check on submit |

---

## Object Card Specification

| Element | Specification |
| --- | --- |
| **Distinguishing Attributes** | Day of week, date, meal count, day macro totals |
| **Visual Signature** | Day label ("Mon"), date, progress indicator |
| **Contextual CTAs** | "Add meal", "Copy day" |
| **Nested Object Indicators** | Meal count; warning badge if missing macro data |

---

## See Also

* [Object Library](../) — All objects at a glance
* [Weekly Meal Plan](weekly-meal-plan.md)
* [Meal](meal.md)
