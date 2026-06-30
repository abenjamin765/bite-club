**TL;DR:** A Daily Check-In is the client's hub object — the primary landing page each day — where they confirm adherence to their approved [Weekly Meal Plan](weekly-meal-plan.md) meal by meal via [Meal Adherence Records](meal-adherence-record.md). It is the primary signal coaches see in the [Group](group.md) digest view.

---

## Definition

A **Daily Check-In** is a client's daily record of how closely they followed their approved meal plan, containing one [Meal Adherence Record](meal-adherence-record.md) per planned meal and submitted once at the end of the day.

---

## SIP Validation

| Criterion | Result | Evidence |
| --- | --- | --- |
| **Structure** | ✅ | date, status, plan reference, meal adherence records, daily notes, submitted date |
| **Instances** | ✅ | "Sarah's check-in Jun 30", "Aaron Mon Jul 1 — all followed", "Coach Mike Jun 30 digest row" |
| **Purpose** | ✅ | Client confirms adherence; coach receives exception summary; drives digest and attention-sort |

**Verdict:** Core system object — **client hub**. The client's primary daily interaction point.

---

## Synonyms / Also Known As

| Term | Context | Notes |
| --- | --- | --- |
| "Check-in" | In-app shorthand | Used in UI labels |
| "Daily log" | User mental model | Avoid in product copy — implies open-ended re-logging |

---

## Attributes

| # | Attribute | Data Type | Required | Source | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | **Date** | Date | Yes | System | Calendar date of the check-in |
| 2 | **Status** | Enum | Yes | System | Not Started / In Progress / Submitted / Missed |
| 3 | **Weekly Meal Plan** | Reference → Weekly Meal Plan | Yes | System | The approved plan being checked against |
| 4 | **Daily Notes** | Text | No | Manual | Optional free-text from client |
| 5 | **Submitted Date** | DateTime | No | System | Set on submit |
| 6 | **Client** | Reference → Account | Yes | System | |
| 7 | **Coach** | Reference → Account | Yes | System | |
| 8 | **Group** | Reference → Group | Yes | System | |

---

## Nested Objects

| Nested Object | Relationship | How It Gets There |
| --- | --- | --- |
| [**Meal Adherence Record**](meal-adherence-record.md) | One-to-many | Auto-created per planned meal when check-in is opened |

---

## Calls-to-Action (CTAs)

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **Open today's check-in** | Client | Read | No | Client hub landing — primary home CTA |
| 2 | **View check-in** | Client, Coach | Read | No | Coach: own clients only |
| 3 | **Mark meal followed** | Client | Write | Yes → Meal Adherence Record | Sets status = Followed |
| 4 | **Mark meal modified** | Client | Write | Yes → Meal Adherence Record | Opens deviation capture |
| 5 | **Mark meal skipped** | Client | Write | Yes → Meal Adherence Record | Optional note |
| 6 | **Add deviation detail** | Client | Write | No | Type, notes, macro delta estimate |
| 7 | **Submit check-in** | Client | Write | No | End-of-day; all meals must be marked |
| 8 | **View check-in history** | Client | Read | No | Past days |

---

## Relationship Specs (MCSFD)

### Daily Check-In → Meal Adherence Record

| Dimension | Specification |
| --- | --- |
| **M - Mechanics** | One MAR auto-created per planned meal when client opens their check-in for the day |
| **C - Cardinality** | One-to-many; count equals number of meals in approved Day Plan |
| **S - Sorts** | Meal type order (breakfast → lunch → dinner → snack → other) |
| **F - Filters** | None on detail view |
| **D - Dependencies** | MARs are deleted with their parent Daily Check-In |

### Daily Check-In → Group (digest view)

| Dimension | Specification |
| --- | --- |
| **M - Mechanics** | System aggregates all client check-ins for the group at digest time |
| **C - Cardinality** | Many check-ins summarized per Group digest view |
| **S - Sorts** | Attention-needed first: Missed > Deviated > Followed |
| **F - Filters** | Status (submitted / missed / in-progress) |
| **D - Dependencies** | Digest view is generated; Daily Check-In data persists independently |

---

## User Stories

### Client completes daily check-in

> As a **Client**,
> I want to **mark each meal's adherence and submit my check-in**
> so that my coach can see how I did today without me re-logging everything from scratch.
>
> When all meals are marked and I hit submit, my coach should receive this in their digest. The flow should take under one minute if I followed the plan.

### Coach sees who checked in

> As a **Coach**,
> I want to **view the daily digest** generated from my clients' Daily Check-Ins
> so that I can immediately identify who missed a check-in or had a significant deviation.

---

## Business Rules

1. **One per client per day:** A client can only have one Daily Check-In per calendar date.
2. **Requires approved plan:** A Daily Check-In can only be opened for a day covered by an Approved Weekly Meal Plan.
3. **Auto-populated MARs:** Meal Adherence Records are auto-created from the approved plan's meals — client cannot add meals to the check-in.
4. **End-of-day submit (MVP):** Check-in is submitted once; no meal-by-meal submission in MVP (A-008).
5. **Missed if not submitted:** A check-in not submitted by end of day is marked Missed by the system.
6. **Neutral deviation language:** UI copy must use neutral language for Modified and Skipped to reduce shame-avoidance (requirements §19, research.md).
7. **Planned meal is preserved:** Submitting a modified check-in never changes the original planned Meal.

---

## Status / Lifecycle

```
Not Started → In Progress → Submitted
                          ↓ (end of day without submit)
                          Missed
```

| Status | Description | Triggers |
| --- | --- | --- |
| **Not Started** | Check-in exists but client hasn't opened it | Approved plan exists for today |
| **In Progress** | Client has marked at least one meal | Client opens and marks a meal |
| **Submitted** | Complete; visible in digest | Client taps Submit |
| **Missed** | Day passed without submission | System (EOD) |

---

## Object Card Specification

| Element | Specification |
| --- | --- |
| **Distinguishing Attributes** | Date, status badge, meals followed/modified/skipped counts |
| **Visual Signature** | Today's date prominent; status color (green submitted, amber in-progress, red missed) |
| **Contextual CTAs** | Not Started: "Start check-in"; In Progress: "Continue"; Submitted: "View" |
| **Nested Object Indicators** | Meals marked / total meals |

## Shapeshifter Matrix

| Context | Date | Status | Meal counts | Notes | CTAs | Card Shape |
| --- | --- | --- | --- | --- | --- | --- |
| Client home (hub) | ✓ | ✓ | ✓ | — | Start / Continue / View | Full hero card |
| Check-in history | ✓ | ✓ | ✓ | — | View | Compact row |
| Coach group digest | ✓ | ✓ | ✓ | — | Open client detail | Attention-sorted row |

---

## See Also

* [Object Library](../) — All objects at a glance
* [Meal Adherence Record](meal-adherence-record.md)
* [Weekly Meal Plan](weekly-meal-plan.md)
* [Group](group.md)
* [Account](account.md)
