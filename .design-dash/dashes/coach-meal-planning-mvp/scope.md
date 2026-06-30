# Scope — Coach-Led Meal Planning MVP

**Dash ID:** coach-meal-planning-mvp  
**Last updated:** 2026-06-29  
**Owner:** Aaron (solo)  
**Tier:** Standard  
**Facilitation mode:** Solo

---

## 2.1 Problem statement + scope

**Problem (confirmed P1):** Clients in coach-led nutrition programs are stuck re-logging meals in open-ended trackers, producing incomplete data and leaving coaches without clear adherence signal.

**Scope:** MVP Progressive Web App for a single coach-led group workflow:
- Client weekly meal planning (ingredients, measurements, macros)
- Coach approval workflow
- Daily delta-based adherence check-ins
- Coach daily group digest and exception-based dashboard

**Out of scope:** Public group feed, recipe sharing, AI meal generation, grocery lists, in-app chat, payments, wearables, leaderboards/streaks, **in-app coach comments** (deferred — coach replies outside app for soft launch).

---

## 2.2 User roles

| Role | Description |
|---|---|
| **Client** (primary) | Person in a coach-led nutrition program; plans weekly meals, submits for approval, checks in daily |
| **Coach** (secondary) | Nutritionist, dietitian, health coach, or program leader; reviews plans, monitors adherence via digest |

**Soft launch cohort:** ~12 users — 1 coach, ~11 clients in one group (A-011).

---

## 2.3 Build mode

**New** — greenfield PWA. No existing coded product; requirements doc serves as product brief.

---

## 2.4 Facilitation

Solo dash. Owner simulates all disciplines. No group workshop.

---

## 2.5 Constraints

- **Platform:** Mobile-first PWA (installable, responsive desktop for coach)
- **Stack:** Vanilla HTML / CSS / JS — no framework requirement for MVP
- **Infrastructure:** Free-tier services only (hosting, auth, database, notifications)
- **Privacy:** Coach-client private by default; no peer visibility in MVP
- **Team:** Solo builder
- **Launch:** Soft launch ~12 users
- **PWA capabilities:** Service worker, offline draft editing, background sync, push notifications where supported
- **Nutrition data:** Manual entry with optional database lookup (USDA FoodData Central / Open Food Facts)
- **Billing, HIPAA posture, geography:** TBD / not blocking soft launch

---

## 2.6 Success criteria (concrete, checkable)

| # | Criterion | Measure |
|---|---|---|
| SC-1 | Client completes daily check-in in under 1 minute when following plan | P8 usability test + M-003 ≤3 min median |
| SC-2 | ≥60% daily check-in completion on eligible plan days | M-002 |
| SC-3 | Coach receives one daily digest (not per-client alerts) | Functional acceptance + M-004 |
| SC-4 | Full loop works: plan → submit → approve → check-in → digest | Definition of Done (requirements §22) |
| SC-5 | Client cannot see other clients' plans or check-ins | Privacy acceptance test |
| SC-6 | Deviations captured with planned meal preserved | Functional acceptance |

---

## 2.7 Page-scoping mode

**Journey** — scope follows the three core loops:
1. Weekly Planning Loop
2. Daily Check-In Loop
3. Coach Review Loop

**Client hub object:** **Daily Check-In** (today-centric). Client home prioritizes today's check-in task; weekly plan status is secondary context.

Screen inventory anchored to `docs/requirements.md` §13 (Client: 14 screens · Coach: 11 screens).

---

## 2.8 Object library check

**No existing guides** in `library/objects/`. All objects require SIP validation and guide authoring in P4.

---

## 2.9 Mental models

### Client — Daily Check-In (hub)

| Element | User expects | Library shows | Tag |
|---|---|---|---|
| Landing focus | "What do I need to do today?" — check-in first | — | **confirmed (P2)** |
| Meal statuses | Followed / Modified / Skipped only | — | **confirmed (P2)** |
| When I deviated | Only then explain what changed | — | borrowed |
| Neutral tone | Deviations are normal, not failures | — | borrowed |

### Client — Weekly Meal Plan

| Element | User expects | Library shows | Tag |
|---|---|---|---|
| Weekly schedule | Built ahead; source of truth for check-ins | — | assumed |
| Plan status | Draft → Submitted → Needs changes → Approved | — | assumed |
| Nutrition entry | Type manually or pick from food database | — | **confirmed (P2)** |
| After approval | Edits become deviations, not silent plan changes | — | assumed (A-009) |

### Coach — Group & Digest

| Element | User expects | Library shows | Tag |
|---|---|---|---|
| Feedback | Outside app for soft launch (text, email) | — | **confirmed (P2)** |
| Digest | One daily summary, exceptions first | — | borrowed |
| Visibility | Sees clients' data; clients don't see each other | — | assumed |

---

## 2.10 Existing-state review

Skipped — **new** build.

---

## 2.11 Supporting docs

| Doc | Path |
|---|---|
| MVP Requirements | `docs/requirements.md` |
| Mind Genomics Research | `docs/research.md` |

---

## 3. Framing lock-in (P3)

### 3.1 Problem statement (locked)

Clients in coach-led nutrition programs waste time re-logging meals in open-ended trackers, producing incomplete adherence data. Coaches lack a clear signal of who followed the plan and who deviated. The MVP makes the approved weekly plan the source of truth and limits daily work to delta check-ins (Followed / Modified / Skipped), with coaches reviewing exceptions via a daily digest. Soft launch targets ~12 users in one coach group.

**Confidence:** Medium · **Evidence:** `docs/research.md` (borrowed), `docs/requirements.md` (assumed)

### 3.2 In-scope objects (pending SIP — P4)

| Object | Source | Library guide | Notes |
|---|---|---|---|
| Account | requirements §7 User | — | Renamed from "User" for clarity |
| Group | requirements §7 | — | |
| Weekly Meal Plan | requirements §7 | — | |
| Day Plan | requirements §7 | — | Likely nested in Weekly Meal Plan |
| Meal | requirements §7 | — | |
| Ingredient | requirements §7 | — | Optional lookup from food database |
| Daily Check-In | requirements §7 | — | **Client hub object** |
| Meal Adherence Record | requirements §7 | — | Per-meal status within check-in |
| Saved Meal | requirements §8.3 | — | Reuse mechanic — confirm in SIP |
| ~~Daily Group Digest~~ | requirements §9.4 | — | Generated Group view, not a standalone object |
| ~~Coach Feedback~~ | — | — | **Out of scope** (deferred P2) |

### 3.3 Participant model (solo)

| Discipline | Responsible | Channel | Status |
|---|---|---|---|
| Product / Design | Aaron | Self-review at gates | Simulated |
| Engineering | Aaron | Self-review | Simulated |
| Research | Aaron | P8 usability test | Pending |

### 3.4 Decisions log

- P0: Standard tier, solo dash, reviewer waived (A-012)
- P1: Problem + metrics confirmed; ~12 user soft launch (A-011)
- P2: Client hub = **Daily Check-In** (today-centric)
- P2: Adherence statuses = **Followed / Modified / Skipped** only
- P2: Coach comments **deferred** (outside app)
- P2: Nutrition = **manual + optional database lookup**
- P2: Stack = **vanilla HTML/CSS/JS**, **free-tier services only**
- P4: SIP confirmed — 9 objects; digest = Group view (A-018)
- P4: NOM, CTA matrix, object map published

### 3.5 Open questions (remaining)

| # | Question | Linked assumption |
|---|---|---|
| Q1 | Is Saved Meal its own object or a CTA on Meal? | P4 SIP |
| Q2 | Daily Group Digest is a generated view on Group, not a standalone object | Confirmed P4 |
| Q3 | One group per coach in MVP? | A-010 |
| Q4 | End-of-day vs. meal-by-meal check-in submit? | A-008 |
| Q5 | Coach templates in MVP? | A-006 |

---

## Sign-off ledger

See §3.3. Full ledger in `sign-off-ledger.md` (to be created at P8).


---

## 4. Privacy gate record (P7)

```yaml
privacy_gate:
  triggered: true
  applicable_regulations:
    - GDPR-baseline
    - CCPA-conditional
    - HIPAA-conditional
    - COPPA-conditional
  path: legal_escalation
  self_check_status: escalated
  legal_sign_off:
    status: pending
    reviewer: "TBD"
    evidence_link: "dashes/coach-meal-planning-mvp/privacy-review.md"
    date: "TBD"
  tier_forced: high-stakes
  notes: "Personal health-adjacent data and coach visibility require compliance closure before scale launch."
```


---

## 5. Learning-close commitment (P8)

```yaml
learning_close:
  owner: "Aaron"
  deadline: "2026-07-18"
  sla_tier: "Standard"
  test_plan: "dashes/coach-meal-planning-mvp/research-plan.md"
  status: pending
  re_entry_trigger: "If A-019 or A-002 falsified → re-enter P5/P6"
```
