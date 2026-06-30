# Privacy Impact Brief: Coach-Led Meal Planning MVP

**Dash:** coach-meal-planning-mvp  
**Date:** 2026-06-29  
**Prepared by:** Aaron

## What is changing

New product surface collects and displays personal and health-adjacent behavioral data (meal plans, macros, daily adherence, deviations) in a coach-client workflow. Data visibility is role-based (client self data, coach assigned clients).

## Applicable regulation(s)

- **GDPR (baseline)** — default strict baseline until geography is finalized.
- **CCPA/CPRA (potential)** — if California residents are included.
- **HIPAA (conditional)** — only if used by covered entities/business associates in US healthcare contexts.
- **COPPA (conditional)** — if users under 13 are in scope.

## Data involved

| Data element | Source | Who has access | Retention | Used for |
|---|---|---|---|---|
| Name, email, role, timezone | Account setup | user self, assigned coach, system | TBD | Authentication, identity, reminders |
| Group membership | Invite join | coach + member user | TBD | Program roster |
| Weekly meal plans + ingredients + macros | Client input / optional lookup | client + assigned coach | TBD | Planning and coach review |
| Daily check-in statuses + deviation notes | Client input | client + assigned coach | TBD | Adherence monitoring, digest |
| Digest summaries | System aggregate from check-ins | assigned coach | Derived view | Exception triage |

## New exposure vs existing baseline

Greenfield MVP; all listed data surfaces are new.

## Third-party involvement

- Optional food lookup providers: USDA FoodData Central / Open Food Facts.
- No ad/behavioral tracking integrations planned.

## DPA status

Not yet confirmed. Requires review of service terms and DPA obligations before production use.

## Proposed mitigations

1. Private-by-default UI and authorization model (already in wireframe).
2. Consent + policy entry points in onboarding/settings (to add in P8 adjustments).
3. Role enforcement tests for every data view.
4. Data minimization: no social feed, no public profile sharing, no nonessential demographic fields.
5. Define retention/deletion workflow and include account data controls.

## Privacy gate outcome (current)

```yaml
privacy_gate:
  triggered: true
  applicable_regulations: [GDPR-baseline, CCPA-conditional, HIPAA-conditional, COPPA-conditional]
  path: legal_escalation
  self_check_status: escalated
  legal_sign_off:
    status: pending
    reviewer: "TBD"
    evidence_link: "TBD"
    date: "TBD"
  tier_forced: high-stakes
  notes: "Personal health-adjacent data present; compliance closure required before launch beyond pilot."
```
