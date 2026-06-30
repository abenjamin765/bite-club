# Ethics & Equity Checklist

**Dash:** Coach-Led Meal Planning PWA  
**Dash ID:** coach-meal-planning-mvp  
**Tier:** Standard  
**Reviewed at gate:** P7 Edge/Ethics/Equity  
**Reviewer:** Aaron (solo)  
**Date:** 2026-06-29

> Full narrative review: `ethics-review.md`. Privacy detail: `privacy-review.md`.

---

## Section A — Dark pattern audit

| # | Check | Design decision cited | Result |
|---|---|---|---|
| A1 | No manufactured urgency | No countdown timers in plan/check-in flows | Pass |
| A2 | No guilt-trip opt-outs | Neutral Followed/Modified/Skipped labels | Pass |
| A3 | No misleading defaults | Private-by-default; no pre-checked sharing | Pass |
| A4 | No confirmshaming | Deviation copy avoids moralized terms | Pass |
| A5 | No hidden costs | No pricing surfaces in MVP | N/A |
| A6 | No roach motel | Account deletion flow not yet designed | Flag |

---

## Section B — User vulnerability & engagement guardrails

| # | Check | Design decision cited | Result |
|---|---|---|---|
| B1 | Streaks not primary motivator | No streaks/leaderboards in requirements non-goals | Pass |
| B2 | Time-in-app not success metric | North stars: completion rate + duration guardrail | Pass |
| B3 | Notifications not compulsive | One daily reminder; digest-first coach model | Pass |
| B4 | North-star direction rule | M-002 completion, not time-on-app | Pass |
| B5 | Rewards tied to outcomes | No badges/rewards in MVP | N/A |
| B6 | Age-appropriateness | Minor consent flow not present | Flag |

---

## Section C — Data privacy

| # | Check | Design decision cited | Result |
|---|---|---|---|
| C1 | Data minimization | Plan, check-in, macro data for coaching only | Pass |
| C2 | Consent path | No privacy consent screen in wireframe yet | Flag |
| C3 | Sensitive records protected | No peer visibility; coach scoped to group | Pass |
| C4 | Regulations identified | Geography/legal posture TBD in scope | Flag |
| C5 | Role-based access | Client/coach permission model in wireframe | Pass |
| C6 | Retention/deletion policy | Not defined yet | Flag |
| C7 | Third-party sharing | USDA/Open Food Facts — DPA not documented | Flag |

---

## Section D — Localization & accessibility

| # | Check | Design decision cited | Result |
|---|---|---|---|
| D1 | Translation-ready labels | Plain short CTAs; glossary.md created | Pass |
| D2 | Minimal jargon | Direct verbs (Start check-in, Submit plan) | Pass |
| D3 | Reading level | ~grade 8 in key flows | Pass |
| D4 | Low-bandwidth | Offline draft + retry in Plan Wizard edge states | Pass |
| D5 | RTL support | Not addressed | Flag (defer LTR-only launch) |

---

## Section E — Equity across user subgroups

| # | Check | Design decision cited | Result |
|---|---|---|---|
| E1 | No inequity amplification | No public ranking; exception-based coach view | Pass |
| E2 | Accessibility needs | Partial — see `a11y-audit.md` (6 blocking items) | Partial |
| E3 | No stigmatizing exposure | No peer visibility of deviations | Pass |
| E4 | Equity hypothesis | Added to `research-plan.md` instrumentation | Flag |
| E5 | Context-appropriate | Professional coach-client workflow | Pass |

---

## Gate summary

| Section | Flagged items | Tier impact | Real sign-off required? |
|---|---|---|---|
| A — Dark patterns | 1 | None | No |
| B — Vulnerability guardrails | 1 | If minors in scope | Yes if minors |
| C — Data privacy | 5 | Compliance path required | **Yes — privacy/legal** |
| D — Localization | 1 | None | No |
| E — Equity | 2 | None | No |

**Gate result:** P7 conditionally passed — Section C flags logged as assumptions A-021, A-022; privacy legal sign-off pending before scale launch.
