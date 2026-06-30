# Usability Research Plan — Coach-Led Meal Planning MVP

**Dash:** Coach-Led Meal Planning PWA  
**Dash ID:** coach-meal-planning-mvp  
**Date:** 2026-06-29  
**Owner:** Aaron  
**Learning-close deadline:** 2026-07-18 (15 business days, Standard tier)

---

## Study type

Moderated remote usability test (soft launch cohort + 2–3 proxy participants if needed).

## Participant criteria

| Segment | n | Criteria |
|---|---:|---|
| Clients | 5 | In or joining a coach-led nutrition program; uses smartphone daily |
| Coach | 1 | Manages 5+ clients; reviews meal plans weekly |

## Tasks (mapped to success criteria)

| Task | Actor | Success criterion | Success threshold |
|---|---|---|---|
| T1: Build and submit a weekly plan (3+ days) | Client | SC-4 | Complete in ≤20 min; submit without blocking errors |
| T2: Complete daily check-in (all followed) | Client | SC-1, SC-2 | Complete in ≤3 min; all meals marked |
| T3: Complete check-in with one deviation | Client | SC-6 | Deviation captured; planned meal preserved |
| T4: Approve a submitted plan | Coach | SC-4 | Approve in ≤5 min |
| T5: Review daily digest and open one deviation | Coach | SC-3 | Identify attention-needed client in ≤2 min |

## Assumptions under test

- A-001: Weekly plan completion with structured wizard
- A-002: Delta check-ins sustain completion vs full logging
- A-019: Guided day wizard reduces plan abandonment
- A-020: Reuse accelerators satisfy returning users
- A-009: Changed-after-approval model is understandable

## Instrumentation

- Task completion (Y/N)
- Time on task
- Error count
- SUS or single ease rating (1–5) post-session
- Qualitative notes on shame/avoidance language

## Schedule

| Milestone | Date |
|---|---|
| P8 plan committed | 2026-06-29 |
| Recruit soft-launch users | 2026-07-07 |
| Run sessions | 2026-07-10 – 2026-07-17 |
| Synthesize + update assumptions | 2026-07-18 |

## Re-entry trigger

If A-019 or A-002 is **falsified**, re-enter at **P6 (Wireframe)** or **P5 (Concept selection)** per learning-loop matrix.
