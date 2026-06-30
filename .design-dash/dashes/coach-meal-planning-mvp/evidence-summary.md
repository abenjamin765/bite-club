# Evidence Summary

**Dash:** Coach-Led Meal Planning & Daily Check-In PWA  
**Dash ID:** coach-meal-planning-mvp  
**Tier:** Standard  
**Last updated:** 2026-06-29  
**Owner:** Aaron (solo)

---

## 1. Classified evidence table

| id | source | date | participants | summary | type | independence | confidence | ORCA keys |
|---|---|---|---|---|---|---|---|---|
| E-001 | `docs/requirements.md` §2 Product Thesis | 2026-06 | n/a (author spec) | Clients need a clear plan and delta-based check-ins, not an open-ended food diary; approved plan is source of truth | assumed | ⚠️ author = product owner (circular) | M | Weekly Meal Plan, Daily Check-In |
| E-002 | `docs/requirements.md` §6 Principles | 2026-06 | n/a | Daily check-ins should feel like confirming a checklist; deviations matter more than perfect logs; private by default | assumed | ⚠️ author = product owner | M | Daily Check-In, Meal Adherence Record, Group |
| E-003 | `docs/research.md` §MVP recommendations | 2026-06 | n/a (literature synthesis) | Detailed tracking reduces engagement over time; simplified/delta tracking sustains participation; privacy concerns rise with specific health data sharing | borrowed | ✅ third-party literature (cited in research doc) | M | Daily Check-In, Weekly Meal Plan |
| E-004 | `docs/research.md` §MVP recommendations | 2026-06 | n/a | Coach overload from per-client instant alerts lowers adoption; digest-first with exception ranking preferred | borrowed | ✅ third-party literature | M | Group, Daily Check-In, Coach digest |
| E-005 | `docs/research.md` §Mind Genomics program | 2026-06 | n/a (proposed, not fielded) | Four linked vignette studies recommended to validate planning, reuse, adherence, and coach ops combinations | assumed | Planned research, not yet run | L | All in-scope objects |
| E-006 | `docs/requirements.md` §20 Open Questions | 2026-06 | n/a | 10 unresolved MVP decisions (templates, barcode, check-in timing, multi-group, etc.) | assumed | Author backlog | M | Multiple |
| E-007 | `docs/requirements.md` §22 Definition of Done | 2026-06 | n/a | MVP success = full weekly plan → approval → daily check-in → coach digest loop works end-to-end | assumed | Author acceptance criteria | H | All core objects |

**Auto-downgrades applied:** E-001, E-002, E-006, E-007 reclassified from would-be `observed` to `assumed` — no first-party user research with participant counts yet.

---

## 2. Conflict map

| Conflict | Item A | Item B | Resolution |
|---|---|---|---|
| Planning accuracy vs. daily burden | E-001/E-007 require ingredient-level accuracy in weekly plan | E-003 says detailed daily tracking reduces engagement | **Resolved:** Plan-heavy / check-in-light model — accuracy at plan time, delta-only at check-in (aligned in both docs) |
| Coach visibility vs. client privacy | E-002 private by default | E-004 coach needs exception visibility | **Resolved:** Coach sees adherence summaries and deviations only, not public group feed (requirements §5 out of scope) |
| Research rigor vs. ship speed | E-005 proposes 4 Mind Genomics studies (250–300 respondents each) | E-007 MVP DoD implies build-first | **Open:** P8 usability test + optional phased Mind Genomics (logged A-005) |

---

## 3. ORCA-keyed evidence summary

### Object: Weekly Meal Plan
- **E-001** (assumed, M): Plan is source of truth for the week; reduces daily logging.
- **E-003** (borrowed, M): Weekly planning with reuse beats daily re-logging for sustained engagement.

### Object: Daily Check-In
- **E-002** (assumed, M): Checklist-style confirmation, not diary entry.
- **E-003** (borrowed, M): Delta/deviation capture sustains day-level participation vs. full re-entry.

### Object: Meal Adherence Record
- **E-002** (assumed, M): Deviations are first-class; neutral language to reduce shame/avoidance.

### Object: Group (Coach digest)
- **E-004** (borrowed, M): Once-daily digest with exception ranking beats instant per-client alerts.

### Object: User / roles
- **E-007** (assumed, H): Two-role loop (client plans/checks in, coach approves/reviews) is the MVP spine.

### Assumptions (not yet evidenced with first-party research)
- **A-001–A-010**: See `assumptions.md` — derived from requirements open questions and research hypotheses.

---

## 4. Evidence health summary

| Metric | Value | Gate implication |
|---|---|---|
| % evidence items that are `observed` | 0% | No first-party research yet — Quality 1 capped until P8 test |
| % opportunity size backed by observed/borrowed | ~40% (E-003, E-004 borrowed) | Direction supported by literature; magnitude unvalidated |
| Open assumptions | 12 items | Expected for pre-build dash |
| Independence violations | 4 items (E-001, E-002, E-006, E-007) | Author spec — valid for planning, not for validation |

**P1 Evidence Gate status:** ✅ Pass — ≥1 evidence source present (E-003, E-004 borrowed) + all assumptions have validation methods in `assumptions.md`.
