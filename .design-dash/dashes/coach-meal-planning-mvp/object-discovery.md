# Object Discovery — Coach-Led Meal Planning MVP

**Dash ID:** coach-meal-planning-mvp  
**Date:** 2026-06-29  
**Status:** SIP confirmed — ready for NOM

---

## Noun forage sources

- `docs/requirements.md` §7 Core Data Objects, §8–9 requirements, §13 screen inventory
- `dashes/coach-meal-planning-mvp/scope.md` P3 framing
- `docs/research.md` (reuse, digest, adherence language)

---

## Candidates — SIP validation (proposed)

### ✅ Passed SIP (confirmed)

| Object | S — Structure | I — Instances | P — Purpose | Notes |
|---|---|---|---|---|
| **Account** | name, email, role, time zone, notification prefs | Many clients + coaches | Users manage identity and access | Renamed from "User" |
| **Group** | name, coach, clients, program dates, digest settings | One+ per coach (MVP: one) | Coach organizes program roster | |
| **Weekly Meal Plan** | week dates, status, macro totals, submission dates | One per client per week | Client builds and submits intended eating | |
| **Day Plan** | date, meals, day macro totals | 7 per weekly plan | Client plans one day at a time | **Nested** in Weekly Meal Plan |
| **Meal** | name, type, ingredients, meal macros | Many per day | Client defines eating occasions | **Nested** in Day Plan |
| **Ingredient** | name, qty, unit, macros, source, confirmed flag | Many per meal | Accuracy at ingredient level | **Nested** in Meal; optional DB lookup |
| **Daily Check-In** | date, status, plan reference, submitted date | One per client per day | **Client hub** — confirm daily adherence | |
| **Meal Adherence Record** | meal ref, status, deviation type/notes, macro delta | One per planned meal per check-in | Per-meal Followed/Modified/Skipped | **Nested** in Daily Check-In |
| **Saved Meal** | name, ingredients, macros (snapshot) | Many per client | Reuse without rebuilding | Copy-forward mechanic |

### ⚠️ Modeled as views, attributes, or CTAs

| Candidate | Decision |
|---|---|
| **Daily Group Digest** | Generated **view** on Group computed from Daily Check-Ins, not a persisted object |
| **Deviation** | Attributes on **Meal Adherence Record** when status = Modified or Skipped |
| **Notification** | System event / CTA surface, not a user-facing MVP object |
| **Invite** | CTA on **Group** ("Invite client"), not a separate object for MVP |

### ❌ Rejected / deferred

| Candidate | Reason |
|---|---|
| **Coach Feedback** | Deferred P2 — out of MVP scope |
| **Recipe** | Out of scope |
| **Template (coach-provided)** | Deferred — Saved Meal only for soft launch (A-006) |
| **Mostly followed** (status value) | Removed P2 — not an object, but status enum trimmed |

---

## Validated object list (9 core)

1. Account  
2. Group  
3. Weekly Meal Plan  
4. Day Plan *(nested)*  
5. Meal *(nested)*  
6. Ingredient *(nested)*  
7. Daily Check-In **← client hub**  
8. Meal Adherence Record *(nested)*  
9. Saved Meal

---

## Nesting preview (for P4.2 NOM)

```
Group
├── Account (coach)
├── Account (clients[])
Weekly Meal Plan
├── Day Plan[]
│   └── Meal[]
│       └── Ingredient[]
Daily Check-In
└── Meal Adherence Record[]
Saved Meal (standalone, referenced by Meal CTAs)
Group dashboard / daily digest view
└── generated from Group + Daily Check-In summaries
```

---

## Confirmation log

- 2026-06-29: Designer confirmed the 9 core objects.
- 2026-06-29: Daily Group Digest modeled as a generated Group view, not an object.
- 2026-06-29: Saved Meal confirmed as a standalone object.
- 2026-06-29: Day Plan / Meal / Ingredient and Meal Adherence Record nesting confirmed.
