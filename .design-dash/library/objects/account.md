**TL;DR:** An Account is the identity record for every person in the system — either a Client or a Coach. Accounts belong to a [Group](group.md) and own [Weekly Meal Plans](weekly-meal-plan.md), [Daily Check-Ins](daily-check-in.md), and [Saved Meals](saved-meal.md).

---

## Definition

An **Account** is a registered user identity — either a Client participating in a nutrition program or a Coach running one — that controls what data a person can see and act on in the app.

---

## SIP Validation

| Criterion | Result | Evidence |
| --- | --- | --- |
| **Structure** | ✅ | name, email, role, time zone, notification prefs, created date |
| **Instances** | ✅ | "Sarah Chen (client)", "Coach Mike (coach)", "Aaron (client)" |
| **Purpose** | ✅ | Controls authentication, role-based access, and surfaces correct home view |

**Verdict:** Core system object — every person in the app is an Account.

---

## Synonyms / Also Known As

| Term | Context | Notes |
| --- | --- | --- |
| User | Requirements doc §7 | Renamed to Account in P4 SIP to avoid ambiguity with generic "user" |

---

## Attributes

| # | Attribute | Data Type | Required | Source | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | **Role** | Enum (`client` / `coach`) | Yes | Manual (sign-up) | Determines home view, permissions, and available objects |
| 2 | **Name** | String | Yes | Manual | Display name shown to coach and in digest |
| 3 | **Email** | String | Yes | Manual | Authentication identifier; must be unique |
| 4 | **Time Zone** | String | Yes | Manual / auto-detect | Used for check-in reminders and digest timing |
| 5 | **Notification Preferences** | JSON | No | Manual | Push/email toggles for check-in reminders, plan status changes |
| 6 | **Created Date** | DateTime | Yes | System | Auto-set on sign-up |

---

## Nested Objects

| Nested Object | Relationship | How It Gets There |
| --- | --- | --- |
| [**Group**](group.md) | Many-to-one (client) / one-to-many (coach) | Joined via invite link; coach creates |
| [**Weekly Meal Plan**](weekly-meal-plan.md) | One-to-many | Client creates; coach sees via Group |
| [**Daily Check-In**](daily-check-in.md) | One-to-many | Client submits; coach sees via Group |
| [**Saved Meal**](saved-meal.md) | One-to-many | Client saves from Meal editor |

---

## Calls-to-Action (CTAs)

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **Sign up** | Guest | Write | No | Email + role selection |
| 2 | **Log in** | Guest | Read | No | |
| 3 | **Log out** | Client, Coach | Write | No | |
| 4 | **Edit profile** | Client, Coach (self only) | Write | No | Name, time zone, notification prefs |
| 5 | **Join group** | Client | Write | Yes → Group | Via invite link or code |

---

## Relationship Specs (MCSFD)

### Account → Group

| Dimension | Specification |
| --- | --- |
| **M - Mechanics** | Client joins via coach-generated invite link/code; coach creates the Group |
| **C - Cardinality** | Client: belongs to one Group in MVP. Coach: owns one Group in MVP |
| **S - Sorts** | Alphabetical by name on coach roster |
| **F - Filters** | By check-in status, plan status |
| **D - Dependencies** | If Account is deleted, associated plans and check-ins are considered orphaned — retention policy TBD |

---

## User Stories

### Client joins a program

> As a **Client**,
> I want to **join a Group** using an invite link
> so that my coach can see my meal plans and check-ins.
>
> When I click the invite link, I should be prompted to sign up or log in, then land on my client home.

### Coach reviews their roster

> As a **Coach**,
> I want to **view the client roster** on my Group
> so that I can see who is active and who needs attention today.

---

## Business Rules

1. **Unique email:** Each Account must have a unique email address across all roles.
2. **Role is immutable:** Role cannot be changed after account creation in MVP.
3. **One group per client (MVP):** A Client Account may belong to only one Group at a time.
4. **Coach owns group:** The Coach Account that creates a Group is its permanent owner in MVP.
5. **Private by default:** A Client Account can only view its own plans and check-ins; never another client's.

---

## Status / Lifecycle

```
Guest → (sign up) → Active → (log out) → Inactive session
```

| Status | Description | Triggers |
| --- | --- | --- |
| **Active** | Authenticated, in a group | Successful login |
| **Inactive session** | Logged out | Explicit log-out or session expiry |

---

## Object Card Specification

| Element | Specification |
| --- | --- |
| **Distinguishing Attributes** | Name, role badge (Client / Coach), group name |
| **Visual Signature** | Initials avatar; role color badge |
| **Contextual CTAs** | Coach roster: "View plans", "View check-ins" |
| **Nested Object Indicators** | Check-in status badge (today); plan status badge (this week) |

---

## See Also

* [Object Library](../) — All objects at a glance
* [Group](group.md)
* [Daily Check-In](daily-check-in.md)
* [Weekly Meal Plan](weekly-meal-plan.md)
