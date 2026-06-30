**Project:** Coach-Led Meal Planning MVP

---

## How to Read This Matrix

Read each row as: "When I'm looking at [row object], do I see [column object] nested inside it?"

* ✅ = Yes, the column object appears nested inside the row object
* Ref = Linked reference (navigate to detail, not a nested list)
* Count = Aggregate count or summary only
* Empty = Relationship not surfaced in this context

---

## NOM (9×9)

| Parent / Nested → | Account | Group | Weekly Meal Plan | Day Plan | Meal | Ingredient | Daily Check-In | Meal Adherence Record | Saved Meal |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Account** | — | ✅ | ✅ | | | | ✅ | | ✅ |
| **Group** | ✅ | — | Count | | | | Count | | |
| **Weekly Meal Plan** | Ref | Ref | — | ✅ | | | | | |
| **Day Plan** | | | Ref | — | ✅ | | | | |
| **Meal** | | | Ref | Ref | — | ✅ | | | Ref |
| **Ingredient** | | | | Ref | Ref | — | | | |
| **Daily Check-In** | Ref | Ref | Ref | | Ref | | — | ✅ | |
| **Meal Adherence Record** | | | | | Ref | | Ref | — | |
| **Saved Meal** | Ref | | | | | ✅ | | | — |

---

## Row-by-Row Explanation

### Account Row

When looking at an **Account**:

| Nested Object | How It Appears | Notes |
| --- | --- | --- |
| **Group** ✅ | Coach: groups they manage. Client: group they belong to | MVP assumes one group per client |
| **Weekly Meal Plan** ✅ | Client account only — list of weekly plans | Coach sees plans via Group, not nested on Account |
| **Daily Check-In** ✅ | Client account only — check-in history | Hub object lives here for client home |
| **Saved Meal** ✅ | Client account only — saved meal library | Reuse mechanic |

### Group Row

When looking at a **Group**:

| Nested Object | How It Appears | Notes |
| --- | --- | --- |
| **Account** ✅ | Coach (owner) + client roster | Primary coach workspace |
| **Weekly Meal Plan** Count | Per-client plan status summary | Drill into client → plan |
| **Daily Check-In** Count | Per-client today's check-in status + digest view | Generated digest, not persisted object |

### Weekly Meal Plan Row

When looking at a **Weekly Meal Plan**:

| Nested Object | How It Appears | Notes |
| --- | --- | --- |
| **Day Plan** ✅ | 7 day cards with macro totals | Primary planning surface |
| **Account** Ref | Client name (coach review context) | Attribute + link |
| **Group** Ref | Program context | Attribute + link |

### Day Plan Row

When looking at a **Day Plan**:

| Nested Object | How It Appears | Notes |
| --- | --- | --- |
| **Meal** ✅ | Meal cards for breakfast/lunch/dinner/snack | |
| **Weekly Meal Plan** Ref | Parent week breadcrumb | Navigation |

### Meal Row

When looking at a **Meal**:

| Nested Object | How It Appears | Notes |
| --- | --- | --- |
| **Ingredient** ✅ | Ingredient list with qty, unit, macros | |
| **Saved Meal** Ref | "Save this meal" / "Add from saved" | Cross-object CTA |
| **Day Plan / Weekly Meal Plan** Ref | Breadcrumb context | |

### Ingredient Row

When looking at an **Ingredient**:

| Nested Object | How It Appears | Notes |
| --- | --- | --- |
| **Meal** Ref | Parent meal | Leaf object — simple detail |
| **Saved Meal** | | Snapshot copy only, not live nest |

### Daily Check-In Row (Client hub)

When looking at a **Daily Check-In**:

| Nested Object | How It Appears | Notes |
| --- | --- | --- |
| **Meal Adherence Record** ✅ | One row per planned meal today | Followed / Modified / Skipped |
| **Weekly Meal Plan** Ref | Approved plan being checked against | Read-only context |
| **Meal** Ref | Via adherence record → planned meal | Compare plan vs. actual |

### Meal Adherence Record Row

When looking at a **Meal Adherence Record**:

| Nested Object | How It Appears | Notes |
| --- | --- | --- |
| **Meal** Ref | Planned meal reference | Original preserved |
| **Daily Check-In** Ref | Parent check-in | Leaf object |
| Deviation attributes | On Modified/Skipped | Type, notes, macro delta — not separate object |

### Saved Meal Row

When looking at a **Saved Meal**:

| Nested Object | How It Appears | Notes |
| --- | --- | --- |
| **Ingredient** ✅ | Snapshot ingredient list (read-only) | Copied at save time |
| **Account** Ref | Owner | |

---

## Key Observations

1. **Hub objects:** **Daily Check-In** (client — today's task + adherence list) and **Group** (coach — roster + exception summaries).
2. **Planning spine:** Weekly Meal Plan → Day Plan → Meal → Ingredient (deep nest, client builds here).
3. **Check-in spine:** Daily Check-In → Meal Adherence Record → ref Meal (client confirms here).
4. **Popular nested objects:** Account (appears on Group), Meal (Day Plan + refs), Ingredient (Meal + Saved Meal snapshot).
5. **Leaf objects:** Ingredient, Meal Adherence Record — simple detail, few outbound nests.
6. **Isolated objects:** None — Saved Meal connects via Meal CTAs and Account library. ✅
7. **Digest:** Modeled as Count/summary on Group row, not a matrix object (A-018).

---

## See Also

* `object-discovery.md` — Validated object list
* `cta-matrix.md` — Action inventory
* `object-map.md` — Attribute + CTA overview
