**TL;DR:** A Group is the coach's program container — the roster of [Accounts](account.md) (clients) managed by one coach, where [Weekly Meal Plans](weekly-meal-plan.md) are submitted for approval and [Daily Check-Ins](daily-check-in.md) are summarized in the daily digest view.

---

## Definition

A **Group** is a coach-owned container that organizes a set of client Accounts into a nutrition program, providing the coach with a unified view of plan status and daily adherence.

---

## SIP Validation

| Criterion | Result | Evidence |
| --- | --- | --- |
| **Structure** | ✅ | name, coach, clients, program dates, digest settings, check-in settings |
| **Instances** | ✅ | "Coach Mike's Spring Program", "Aaron's Test Group", "Macro Coaching Q3" |
| **Purpose** | ✅ | Coach's primary workspace — roster, plan queue, daily digest |

**Verdict:** Core system object — the organizational unit that connects Coach to Clients.

---

## Attributes

| # | Attribute | Data Type | Required | Source | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | **Group Name** | String | Yes | Manual (coach) | Program display name |
| 2 | **Coach** | Reference → Account | Yes | System | Owning coach; set at creation |
| 3 | **Program Start Date** | Date | No | Manual | Used for context; not enforced |
| 4 | **Program End Date** | Date | No | Manual | Optional; soft boundary |
| 5 | **Digest Time** | Time | Yes | Manual (coach) | When daily digest is generated/sent |
| 6 | **Check-in Settings** | JSON | No | Manual | Reminder enabled/disabled, reminder time |
| 7 | **Invite Code / Link** | String | Yes | System-generated | Used by clients to join |

---

## Nested Objects

| Nested Object | Relationship | How It Gets There |
| --- | --- | --- |
| [**Account**](account.md) (coach) | One | Created with the Group |
| [**Account**](account.md) (clients) | One-to-many | Clients join via invite |
| Weekly Meal Plan summaries | Aggregated view | Per client — plan status count |
| Daily Check-In summaries | Aggregated view (digest) | Generated at digest time; not a persisted object |

---

## Calls-to-Action (CTAs)

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **Create group** | Coach | Write | No | MVP: one group per coach |
| 2 | **View group** | Coach, Client | Read | No | Coach: full roster; client: own status |
| 3 | **Edit group settings** | Coach | Write | No | Name, digest time |
| 4 | **Invite client** | Coach | Write | Yes → Account | Generates invite link/code |
| 5 | **View client roster** | Coach | Read | Yes → Account | Sorted by attention needed |
| 6 | **View daily digest** | Coach | Read | Yes → Daily Check-In | Generated view; not persisted |
| 7 | **Filter by attention needed** | Coach | Read | No | Missed check-in, deviations, unapproved |

---

## Relationship Specs (MCSFD)

### Group → Account (clients)

| Dimension | Specification |
| --- | --- |
| **M - Mechanics** | Coach generates invite link; client clicks link and joins |
| **C - Cardinality** | One Group to many Accounts; MVP ~11 clients per group |
| **S - Sorts** | Default: attention-needed first (missed check-in > deviation > unapproved plan) |
| **F - Filters** | Plan status (submitted/approved/none), check-in status (done/missed/not started) |
| **D - Dependencies** | Removing a client from the Group does not delete their data — retention TBD |

---

## User Stories

### Coach views daily digest

> As a **Coach**,
> I want to **view the daily digest** on my Group
> so that I can quickly see who followed their plan, who deviated, and who missed their check-in.
>
> When I open the Group dashboard, I should see a summary sorted by who needs attention first.

### Coach invites a client

> As a **Coach**,
> I want to **invite a client** to my Group
> so that they can submit weekly plans and I can review their adherence.
>
> When I generate an invite link, I should be able to share it; the client lands in my roster after joining.

---

## Business Rules

1. **One group per coach (MVP):** A Coach Account can create exactly one Group in the MVP.
2. **Invite required:** Clients cannot discover or join a Group without a coach-provided invite link or code.
3. **Private roster:** Clients cannot see other clients in the roster.
4. **Digest is generated, not stored:** The daily digest view is computed from check-in data at digest time; it is not a persisted object.
5. **Digest timing:** One digest per day, sent at the coach-configured time.

---

## Status / Lifecycle

```
Draft → Active → (optional) Closed
```

| Status | Description | Triggers |
| --- | --- | --- |
| **Active** | Accepting clients and check-ins | Created by coach |
| **Closed** | No new submissions (future state — not in MVP) | Manual coach action |

---

## Object Card Specification

| Element | Specification |
| --- | --- |
| **Distinguishing Attributes** | Group name, client count, today's check-in completion count |
| **Visual Signature** | Group icon or initial; coach name |
| **Contextual CTAs** | "View digest", "Invite client" |
| **Nested Object Indicators** | Clients checked in / total; plans pending review |

---

## See Also

* [Object Library](../) — All objects at a glance
* [Account](account.md)
* [Daily Check-In](daily-check-in.md)
* [Weekly Meal Plan](weekly-meal-plan.md)
