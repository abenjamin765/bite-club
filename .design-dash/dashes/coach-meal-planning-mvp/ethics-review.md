# Ethics & Equity Review - Coach-Led Meal Planning MVP

**Date:** 2026-06-29  
**Artifact reviewed:** `wireframe.html`  
**Audience:** Coach-led nutrition clients and coaches (soft launch ~12 users)  
**Tier at review time:** Standard  
**Touches personal/health data:** Yes  
**AI/algorithmic decisions:** No

---

## Section A - Dark pattern audit

| # | Check | Design decision cited | Result | Notes |
|---|---|---|---|---|
| A1 | No manufactured urgency | No countdown timers in check-in/plan flows | Pass | Reminder exists but no urgency framing |
| A2 | No guilt-trip opt-outs | Status labels are "Followed / Modified / Skipped"; neutral language banner in check-in | Pass | No confirmshaming text |
| A3 | No misleading defaults | No pre-checked sharing; private-by-default is explicit | Pass | |
| A4 | No confirmshaming | Deviation copy avoids moralized terms | Pass | |
| A5 | No hidden costs/info asymmetry | No pricing/paywall surfaces in MVP wireframe | N/A | Out of scope |
| A6 | No roach motel patterns | Account deletion/cancellation flow not yet designed | Flag | Add account/data deletion path in P8 |
| A7 | No disguised ads | No sponsored content in MVP | N/A | |

## Section B - Vulnerable user protections

| # | Check | Design decision cited | Result | Notes |
|---|---|---|---|---|
| B1 | No exploitative engagement mechanics | No streaks/leaderboards; one daily reminder only | Pass | Aligns with requirements non-goals |
| B2 | Time-in-product not framed as success | Metrics focus on completion + task duration guardrail | Pass | |
| B3 | Notifications avoid compulsion loops | Digest-first coach model; no per-client alert flood | Pass | |
| B4 | Rewards tied to outcomes not time | No rewards/badges in MVP | N/A | |
| B5 | No stress exploitation | Deviation flow uses neutral language and optional notes | Pass | |
| B6 | Minors safeguards | Minor-specific consent flow not present | Flag | If minors are in scope, COPPA/age-gating required |

## Section C - Data privacy compliance

| # | Check | Design decision cited | Result | Notes |
|---|---|---|---|---|
| C1 | Data minimization | Collects plan, check-in, macro data for coaching purpose only | Pass | Still requires data map |
| C2 | Applicable regulation identified | Geography and legal posture listed as TBD in scope | Flag | Must identify applicable law set before launch |
| C3 | Consent path exists | No explicit privacy consent screen in wireframe | Flag | Add consent + privacy notice entry point |
| C4 | User rights supported (access/correct/delete/portability) | Not surfaced in current wireframe | Flag | Add account data rights surface in settings |
| C5 | Retention/deletion policy defined | Not defined yet | Flag | Create and expose retention policy |
| C6 | Role-based access enforced | Client cannot view peers; coach scoped to own group | Pass | Must be backend-enforced |
| C7 | Third-party sharing controls | USDA/Open Food Facts lookup planned; DPA/legal basis not documented | Flag | Confirm vendor data terms + DPA need |

## Section D - Localization & language accessibility

| # | Check | Design decision cited | Result | Notes |
|---|---|---|---|---|
| D1 | Translation-ready labels | Current copy is plain and short, no idioms in key CTAs | Pass | Externalize strings before build |
| D2 | Lower literacy support | Minimal jargon; direct verbs (Start check-in, Submit plan) | Pass | |
| D3 | Reading level | Mostly grade-8 level copy | Pass | |
| D4 | Low-bandwidth usability | Offline draft + retry states shown in edge-state gallery | Pass | |
| D5 | RTL support | Not yet addressed | Flag | Defer to post-MVP or define scope as LTR-only launch |

## Section E - Age/context/equity

| # | Check | Design decision cited | Result | Notes |
|---|---|---|---|---|
| E1 | Context-appropriate interactions | Professional coach-client workflow with private defaults | Pass | |
| E2 | Avoid inequity amplification | No public ranking; exception-based coach view | Pass | |
| E3 | Disability inclusion | Initial wireframe has keyboard labels and text statuses; full a11y in separate audit | Partial | See `a11y-audit.md` |
| E4 | Avoid stigmatizing exposure | No peer visibility of check-ins/deviations | Pass | |
| E5 | Equity hypothesis documented | Not yet explicit by subgroup | Flag | Add subgroup risk hypothesis in research plan |

## Section F - AI/algorithmic fairness

No AI or automated scoring in MVP. **N/A**.

---

## Summary

| Section | Flagged items | Tier impact | Requires real sign-off? |
|---|---|---|---|
| A — Dark patterns | 1 | None | No |
| B — Vulnerable user protections | 1 | Possible (if minors included) | Yes if minors |
| C — Data privacy | 5 | **Any C flag implies high-risk compliance path** | **Yes — privacy/legal** |
| D — Localization | 1 | None | No |
| E — Age/context/equity | 1 | None | No |
| F — AI fairness | 0 | None | No |

**Gate result:** Conditionally passed for design quality, **blocked for compliance closure** until privacy/legal items are resolved.

## Required fixes before launch

1. Define applicable regulations by target geography and user segment.
2. Add explicit privacy consent and policy access in account onboarding/settings.
3. Define and expose retention/deletion rights flow.
4. Confirm vendor/privacy posture for nutrition data lookups.
5. Decide whether minors are in scope; if yes, add age/consent controls.
