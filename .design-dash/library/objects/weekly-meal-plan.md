**TL;DR:** A Weekly Meal Plan is the client's nutritional intention for one week — containing [Day Plans](day-plan.md) — submitted to a [Coach](account.md) for approval and then used as the source of truth for each day's [Daily Check-In](daily-check-in.md).

---

## Definition

A **Weekly Meal Plan** is a client's structured record of planned meals, ingredients, and macros for a specific calendar week, which must be approved by their coach before it becomes the basis for daily adherence check-ins.

---

## SIP Validation

| Criterion | Result | Evidence |
| --- | --- | --- |
| **Structure** | ✅ | week dates, status, macro totals, submission/approval dates, client/coach/group refs |
| **Instances** | ✅ | "Sarah's plan for Jun 30–Jul 6", "Week 12 — Aaron's plan", "Coach Mike's Q3 week 1 review" |
| **Purpose** | ✅ | Client builds it to plan ahead; coach approves it to set expectations; it anchors check-ins |

**Verdict:** Core system object — the primary planning artifact and source of truth for the week.

---

## Synonyms / Also Known As

| Term | Context | Notes |
| --- | --- | --- |
| "Plan" | In-app shorthand | Acceptable in UI labels; full name used in system |
| "Meal plan" | Colloquial | Unambiguous in context |

---

## Attributes

| # | Attribute | Data Type | Required | Source | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | **Status** | Enum | Yes | System | Draft / Submitted / Needs Changes / Approved / Active / Completed / Changed After Approval |
| 2 | **Week Start Date** | Date | Yes | System (Monday) | Defines the week |
| 3 | **Week End Date** | Date | Yes | System (Sunday) | Computed from start |
| 4 | **Total Calories** | Number | Computed | System | Sum of all ingredient calories |
| 5 | **Total Protein (g)** | Number | Computed | System | |
| 6 | **Total Carbs (g)** | Number | Computed | System | |
| 7 | **Total Fat (g)** | Number | Computed | System | |
| 8 | **Total Fiber (g)** | Number | Computed | System | Optional |
| 9 | **Client** | Reference → Account | Yes | System | Owner of the plan |
| 10 | **Coach** | Reference → Account | Yes | System | Assigned at Group join |
| 11 | **Group** | Reference → Group | Yes | System | Context |
| 12 | **Submitted Date** | DateTime | No | System | Set on submit |
| 13 | **Approved Date** | DateTime | No | System | Set on coach approval |
| 14 | **Created Date** | DateTime | Yes | System | |
| 15 | **Updated Date** | DateTime | Yes | System | |

---

## Nested Objects

| Nested Object | Relationship | How It Gets There |
| --- | --- | --- |
| [**Day Plan**](day-plan.md) | One-to-many (7 days) | Created when client adds meals for a day |

---

## Calls-to-Action (CTAs)

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **Create weekly plan** | Client | Write | No | For a specific week; one per week |
| 2 | **View weekly plan** | Client, Coach | Read | No | Coach: submitted/approved only |
| 3 | **Edit weekly plan** | Client | Write | No | Draft or Needs Changes status only |
| 4 | **Save draft** | Client | Write | No | Offline-safe; no submission required |
| 5 | **Submit for approval** | Client | Write | No | Validates required data before submit |
| 6 | **Copy previous week** | Client | Write | Yes → Day Plan, Meal | Creates editable copy |
| 7 | **Approve plan** | Coach | Write | No | Status → Approved; notifies client |
| 8 | **Request changes** | Coach | Write | No | Status → Needs Changes; notifies client |
| 9 | **View plan status** | Client, Coach | Read | No | Shows current status label |

---

## Relationship Specs (MCSFD)

### Weekly Meal Plan → Day Plan

| Dimension | Specification |
| --- | --- |
| **M - Mechanics** | Client adds meals to a day; Day Plan is auto-created if it doesn't exist |
| **C - Cardinality** | One-to-seven (one per calendar day); not all 7 required in MVP |
| **S - Sorts** | Always in date order Mon → Sun |
| **F - Filters** | None on detail view; plan status filters apply on coach queue |
| **D - Dependencies** | Deleting a Weekly Meal Plan deletes all nested Day Plans, Meals, and Ingredients |

### Weekly Meal Plan → Daily Check-In

| Dimension | Specification |
| --- | --- |
| **M - Mechanics** | Approved plan is referenced by each day's Daily Check-In; not duplicated |
| **C - Cardinality** | One-to-seven (one check-in per plan day) |
| **S - Sorts** | By date |
| **F - Filters** | N/A — linked, not nested |
| **D - Dependencies** | Check-ins reference the plan at approval time; subsequent "Changed After Approval" status is visible but does not alter submitted check-ins |

---

## User Stories

### Client builds and submits a plan

> As a **Client**,
> I want to **create and submit a Weekly Meal Plan**
> so that my coach can approve my intended eating for the week.
>
> When I submit, I should see the status change to Submitted and receive confirmation that my coach was notified.

### Coach approves a plan

> As a **Coach**,
> I want to **approve a Weekly Meal Plan**
> so that it becomes the source of truth for the client's daily check-ins.
>
> When I approve, the client should be notified and the plan status should change to Approved.

---

## Business Rules

1. **One plan per week:** A client may have only one Weekly Meal Plan per calendar week.
2. **Submit validation:** A plan cannot be submitted if any meal is missing macros or measurements (required fields per requirements §8.4).
3. **Approved plan is source of truth:** Once Approved, the plan drives daily check-in structure.
4. **Edit locked after submit:** A submitted plan cannot be edited by the client until it receives "Needs Changes" or is approved.
5. **Changed After Approval:** If a client modifies a meal on an Approved plan, the status becomes "Changed After Approval" — visible to the coach (A-009).
6. **Copy preserves structure:** Copying a previous week copies Day Plans, Meals, and Ingredients; the copy starts in Draft status.

---

## Status / Lifecycle

```
Draft → Submitted → Needs Changes → Submitted (resubmit)
                  → Approved → Active → Completed
                  → Changed After Approval
```

| Status | Description | Triggers |
| --- | --- | --- |
| **Draft** | Being built; not yet sent to coach | Client creates plan |
| **Submitted** | Sent to coach; awaiting review | Client submits |
| **Needs Changes** | Coach returned for edits | Coach action |
| **Approved** | Coach accepted; drives check-ins | Coach action |
| **Active** | Current week's approved plan | Week start (when Approved) |
| **Completed** | Week has ended | System (week end) |
| **Changed After Approval** | Client modified after coach approved | Client edit post-approval |

---

## Object Card Specification

| Element | Specification |
| --- | --- |
| **Distinguishing Attributes** | Week dates, status badge, macro totals summary |
| **Visual Signature** | Week label ("Jun 30 – Jul 6"), status color badge |
| **Contextual CTAs** | Draft: "Continue editing", "Submit"; Needs Changes: "Revise"; Approved: "View" |
| **Nested Object Indicators** | Day count, meals count, completeness warning if missing data |

---

## See Also

* [Object Library](../) — All objects at a glance
* [Day Plan](day-plan.md)
* [Daily Check-In](daily-check-in.md)
* [Account](account.md)
* [Group](group.md)
