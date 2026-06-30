# Assumptions Register

**Dash:** Coach-Led Meal Planning & Daily Check-In PWA  
**Dash ID:** coach-meal-planning-mvp  
**Tier:** Standard  
**Last updated:** 2026-06-29  
**Owner:** Aaron (solo)

> **Governance:** Append-only. Status changes require an evidence-link.

---

## Register

| id | statement | type | confidence | validation-method | owner | status | linked-decision | evidence-link | due-by |
|---|---|---|---|---|---|---|---|---|---|
| A-001 | Clients in coach-led programs will complete weekly meal plans if ingredient-level planning is structured and reusable | assumed | M | P8 usability test: 5 clients complete a full weekly plan in ≤20 min | Aaron | open | P1 opportunity size | — | 2026-08-15 |
| A-002 | Delta-based daily check-ins (followed/changed/skipped) sustain higher day-level completion than full meal re-logging | borrowed | M | Literature (research.md E-003); confirm in P8 task-based test | Aaron | open | Daily Check-In design | docs/research.md §MVP recommendations | 2026-08-15 |
| A-003 | Coaches will adopt a once-daily digest over instant per-client notifications | borrowed | M | P8 coach usability test: 5 coaches prefer digest in scenario walkthrough | Aaron | open | Coach digest design | docs/research.md E-004 | 2026-08-15 |
| A-004 | Private coach-client visibility is sufficient for MVP; group feed is not needed | assumed | M | P8 interview: 0/5 clients expect peer visibility of meal logs | Aaron | open | Privacy defaults | docs/requirements.md §5 | 2026-08-15 |
| A-005 | Mind Genomics vignette studies are worth running before or shortly after MVP | assumed | L | Decision after P8 usability test; optional Study 3 (adherence) if check-in pattern unclear | Aaron | open | Research roadmap | docs/research.md | 2026-09-01 |
| A-006 | Coach templates for meals are out of MVP scope for soft launch; Saved Meal reuse only | assumed | M | P4 SIP + build order | Aaron | open | MVP scope cut | docs/requirements.md §8.3 | — |
| A-013 | Coach comments deferred — feedback happens outside app (text/email) | assumed | H | Locked P2; no in-app comment UI in MVP | Aaron | confirmed | P2 scope | P2 checkpoint | — |
| A-014 | Adherence statuses limited to Followed / Modified / Skipped (no "Mostly followed") | assumed | H | Locked P2 | Aaron | confirmed | Daily Check-In | P2 checkpoint | — |
| A-015 | Client hub object is Daily Check-In (today-centric home) | assumed | H | Locked P2 | Aaron | confirmed | IA / nav | P2 checkpoint | — |
| A-016 | Nutrition entry supports manual input plus optional USDA/Open Food Facts lookup | assumed | M | Build + P8 accuracy spot-check | Aaron | confirmed | Ingredient object | P2 checkpoint | — |
| A-017 | MVP built with vanilla HTML/CSS/JS on free-tier services only | assumed | H | Locked P2 | Aaron | confirmed | Engineering | P2 checkpoint | — |
| A-018 | Daily Group Digest is a generated Group view, not a persisted standalone object | assumed | H | Locked P4 SIP | Aaron | confirmed | Object model / coach digest | P4 checkpoint | — |
| A-019 | A guided day-by-day wizard reduces plan abandonment more than a week-grid canvas for new mobile users | assumed (design-hypothesis) | M | P8 usability test: compare task completion + time for first plan | Aaron | open | P6 concept B selection | docs/research.md (burden findings) | 2026-08-15 |
| A-020 | Reuse accelerators ("copy last week", "add from saved") at wizard start satisfy power users without a separate canvas mode | assumed (design-hypothesis) | M | P8 test with a returning-user task scenario | Aaron | open | P6 concept B+C blend | docs/research.md (reuse findings) | 2026-08-15 |
| A-007 | Barcode scanning can wait until Phase 2 | assumed | M | P6 scope decision; validate in P8 if accuracy complaints emerge | Aaron | open | MVP scope cut | docs/requirements.md §20 Q4 | — |
| A-008 | Daily check-in is submitted once at end of day (not meal-by-meal) | assumed | M | P6 concept selection + P8 timed task test | Aaron | open | Check-in flow | docs/requirements.md §20 Q7 | — |
| A-009 | Approved plan edits become deviations, not silent plan changes | assumed | H | Locked in requirements; validate coach trust in P8 | Aaron | open | Plan status model | docs/requirements.md §7 | 2026-08-15 |
| A-010 | MVP supports one group per coach (not multi-group) | assumed | M | P2 scope confirmation | Aaron | open | MVP scope | docs/requirements.md §20 Q9 | — |
| A-011 | Soft launch with ~12 users (1 coach group, ~11 clients) | assumed | H | Track at launch; escalate tier if scaling past 500 or entering HIPAA context | Aaron | open | P0 tier / P1 reach | — | — |
| A-012 | Tier external reviewer waived — solo builder self-certifies privacy/ethics at P7 | debt | H | Complete P7 privacy + ethics gates; re-review before public launch | Aaron | debt | P0 tier confirmation | — | 2026-08-15 |
| A-021 | Compliance model for soft launch can proceed under GDPR-baseline controls while legal sign-off is pending | assumed (compliance-hypothesis) | L | Obtain real privacy/legal review documented in `privacy-review.md` before wider launch | Aaron | debt | P7 privacy gate | dashes/coach-meal-planning-mvp/privacy-review.md | 2026-08-15 |
| A-022 | Current wireframe accessibility issues (landmarks, focus, touch target, error linkage) can be resolved in implementation before release | assumed (design-hypothesis) | M | Re-run `a11y-audit` on implemented UI before release candidate | Aaron | open | P7 a11y gate | dashes/coach-meal-planning-mvp/a11y-audit.md | 2026-08-15 |
| A-023 | "Meal Plan" is a placeholder product/brand name used on the Auth screen; final brand TBD | assumed | L | Decide brand before release candidate | Aaron | open | Auth header (panel review) | dashes/coach-meal-planning-mvp/critique-notes.md | — |
| A-024 | A bulk "Mark all followed" action serves the followed-everything happy path better than a pre-selected per-meal default (which would manufacture adherence data) | assumed (design-hypothesis) | M | P8 usability test: compare 1-tap bulk vs per-meal confirm for completion time + data honesty | Aaron | open | Daily Check-In default (panel review) | dashes/coach-meal-planning-mvp/critique-notes.md | 2026-08-15 |
| A-025 | Meal macro tiles represent the PLANNED baseline only; post-modification actuals are shown as deltas in the Modified state, not by mutating the planned tiles | assumed | M | Confirm coach trust in planned-vs-actual reading during P8 | Aaron | open | Meal card macro semantics (panel review) | dashes/coach-meal-planning-mvp/critique-notes.md | 2026-08-15 |


---

## Evidence debt log

| id | gate-dependency | due-by | owner | cap |
|---|---|---|---|---|
| A-012 | P0 tier (solo waiver) | 2026-08-15 | Aaron | High-stakes escalation required before scale launch |
| A-001 | P8 Learning Gate | 2026-08-15 | Aaron | Quality 1 capped until first-party test |
| A-021 | P7 Privacy Gate | 2026-08-15 | Aaron | Compliance unresolved until legal sign-off |
| A-022 | P7 A11y Gate | 2026-08-15 | Aaron | Accessibility closure required before release |
| A-002 | P8 Learning Gate | 2026-08-15 | Aaron | Check-in pattern unvalidated |
