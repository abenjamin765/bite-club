# Metrics Register

**Dash:** Coach-Led Meal Planning & Daily Check-In PWA  
**Dash ID:** coach-meal-planning-mvp  
**Tier:** Standard  
**Last updated:** 2026-06-29  
**Owner:** Aaron (solo)

---

## Register

| id | success-metric | classification | event-or-measure | source | baseline | target | status | notes |
|---|---|---|---|---|---|---|---|---|
| M-001 | Weekly plan submission rate | north-star | % of active clients who submit a weekly plan before week start | App analytics (post-launch) | TBD | ≥70% of active clients within 4 weeks of onboarding | planned | Measures plan-first loop adoption |
| M-002 | Daily check-in completion rate | north-star | % of plan days where client submits check-in by end of day | App analytics | TBD | ≥60% of eligible plan days | planned | Core habit loop |
| M-003 | Median daily check-in duration | guardrail | Time from open check-in to submit (seconds) | App analytics | TBD | ≤3 minutes (median) | planned | ↓ lower = better; validates "fast checklist" thesis |
| M-004 | Coach digest open rate | north-star | % of daily digests opened within 24h | App analytics / email | TBD | ≥80% on coaching days | planned | Coach-side adoption |
| M-005 | Deviation reporting rate (when deviated) | guardrail | % of "modified/skipped" meals that include a deviation note | App analytics | TBD | ≥50% when status ≠ followed | planned | Validates deviation capture without shame |
| M-006 | Client 4-week retention | guardrail | % of onboarded clients active in week 4 | App analytics | TBD | ≥50% | planned | Bounds north-star; literature suggests tracking burden kills retention |
| M-007 | Plan approval turnaround | guardrail | Median hours from submit to approve/request-changes | App analytics | TBD | ≤24 hours | planned | Coach responsiveness |

---

## North-star / guardrail split

| North-star metric(s) | Guardrail metric(s) | Vanity (excluded from decision) |
|---|---|---|
| M-001 Weekly plan submission · M-002 Daily check-in completion · M-004 Coach digest open | M-003 Check-in duration (must stay low) · M-005 Deviation note rate · M-006 4-week retention · M-007 Approval turnaround | Total app opens · Session count · Feature click heatmaps |

---

## P1 problem statement (draft)

**Current state:** Clients in coach-led nutrition programs often use open-ended food diaries or unstructured tracking apps that require re-logging meals daily, producing incomplete data and coach blind spots.

**Affected roles:** Client (primary burden), Coach (secondary — review overload or missing signal).

**Evidence:** Borrowed literature suggests detailed daily tracking reduces engagement while simplified/delta monitoring sustains it (`docs/research.md` E-003). Product thesis documented in `docs/requirements.md` (assumed, owner-authored).

**Magnitude/reach:** Soft launch with ~12 users (1 coach, ~11 clients) (A-011).

**Cost of inaction:** Clients abandon logging; coaches lose adherence visibility; programs fail to show ROI.

**Desired outcome:** Clients plan once per week with structured accuracy; confirm daily via delta check-ins; coaches review exceptions via daily digest.

**Success metric:** M-002 daily check-in completion ≥60% + M-003 median check-in ≤3 min.

**Confidence:** Medium — direction supported by borrowed research; no first-party validation yet.
