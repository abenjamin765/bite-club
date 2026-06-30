# Coach-Led Meal Planning PWA — Product Requirements

**Dash slug:** coach-meal-planning-mvp  
**Date:** 2026-06-29  
**Tier:** Standard  
**Status:** Plan (P8 complete)

---

## 1. Context & background

Greenfield MVP for a coach-led nutrition program: a mobile-first PWA where clients build accurate weekly meal plans, submit them for coach approval, then confirm daily adherence with delta-only check-ins. Coaches review plans and monitor group adherence through an exception-based dashboard and once-daily digest.

Built by a solo developer for a soft launch of ~12 users (1 coach, ~11 clients). Technical constraints: vanilla HTML/CSS/JS, free-tier infrastructure only. No existing codebase — `docs/requirements.md` is the product brief.

---

## 2. Problem statement

Clients in coach-led nutrition programs are stuck re-logging meals in open-ended trackers, producing incomplete data and leaving coaches without clear adherence signal. The MVP makes the approved weekly plan the source of truth and limits daily work to delta check-ins (Followed / Modified / Skipped), with coaches reviewing exceptions via a daily digest.

**Confidence:** Medium  
**Evidence sources:** `docs/research.md` (borrowed — engagement/privacy literature); `docs/requirements.md` (assumed — owner product thesis); see `evidence-summary.md`

---

## 3. Goals

### 3.1 Primary goals

1. **Daily check-in completion ≥60%** on eligible plan days (M-002)
2. **Median check-in duration ≤3 minutes** — validates fast checklist UX (M-003)
3. **Full workflow functional:** weekly plan → coach approval → daily check-in → coach digest (SC-4)
4. **Private by default:** clients cannot see peer meal plans or check-ins (SC-5)

### 3.2 Non-goals (explicitly out of scope)

- Public group feed, recipe sharing, leaderboards/streaks
- In-app coach-client chat and **in-app coach comments** (deferred — feedback outside app)
- AI meal generation, grocery lists, payments, wearables
- Photo-based food recognition
- Barcode scanning (Phase 2 — A-007)
- Framework-heavy frontend (MVP is vanilla HTML/CSS/JS)

---

## 4. Users

### 4.1 Primary users

**Role:** Client  
**Context:** Mobile, daily — planning weekly on phone, checking in once per day  
**Goals:** Build an accurate weekly plan quickly; confirm daily adherence without re-logging; share honest deviations with coach  
**Pain points:** Open-ended food diaries are tedious; shame when deviating; unclear whether coach sees the full picture

### 4.2 Secondary users & stakeholders

| Role | How affected | Notes |
|---|---|---|
| Coach | Reviews weekly plans; monitors daily adherence via digest and dashboard | Exception-based attention; digest-first notifications |
| Soft-launch cohort | ~12 users in one group | Validates MVP before broader rollout |

**Client hub object:** Daily Check-In (today-centric home)

---

## 5. Object model summary

*Validated in P4; guides in `library/objects/`.*

| Object | Definition | Key attributes | Key actions (CTAs) |
|---|---|---|---|
| Account | A registered user (client or coach) | name, email, role, time zone | sign up, log in, join group |
| Group | A coach-managed roster for one program | name, coach, clients, digest settings | create, invite client, view roster |
| Weekly Meal Plan | A client's planned meals and macros for one week | week dates, status, macro totals | create, edit, submit, copy week |
| Day Plan | One day's meals within a weekly plan | date, meals, day macro totals | add meal, copy day |
| Meal | A planned eating occasion | name, type, ingredients, macros | add ingredient, save meal, copy meal |
| Ingredient | A food item with quantity and nutrition | name, quantity, unit, macros, source | enter manually, lookup from database |
| Daily Check-In | Client's daily adherence record against approved plan | date, status, meal adherence records | mark meal, note deviation, submit |
| Meal Adherence Record | Per-meal adherence within a check-in | status (Followed/Modified/Skipped), deviation | mark status, add deviation detail |
| Saved Meal | A reusable meal template for copy-forward | name, ingredients, macros | save, reuse, edit copy |
| Daily Group Digest view | Generated coach view on Group, computed from daily check-ins | date, counts, attention list | view, open client detail |

*Full object guides: see `library/objects/`. Daily Group Digest is a generated Group view, not a standalone object guide.*

---

## 6. Concept selection

*Full scoring: `concepts.md`*

**Selected: Concept B — Guided Day Wizard** (with Concept C reuse accelerators folded in).

A step-by-step, one-day-at-a-time planning wizard optimized for mobile and vanilla JS, with "copy last week" / "add from saved" shortcuts at the start for returning users. Chosen over the Week Grid (Concept A — too complex/dense for mobile + vanilla JS) and Reuse-First (Concept C — cold-start problem on day one, but its accelerators are absorbed).

| | A: Week Grid | B: Day Wizard | C: Reuse-First |
|---|---|---|---|
| User criteria | 16 | **22** | 18 |
| Business metric | Med | **High** | Med |
| Effort (vanilla JS) | High | **Low–Med** | Med |

**Selection Gate:** Passed — scored on user criteria + outcome-linked business metric; concepts panel-verified as structurally distinct.

---

## 7. Flows & scenarios

*Full detail: `flow.md`*

| # | Scenario | Actor | Maps to |
|---|---|---|---|
| S1 | Client builds and submits first weekly plan | Client | SC-4, SC-2 |
| S2 | Daily check-in — followed plan (target: <1 min) | Client | SC-1, SC-2 |
| S3 | Daily check-in — with deviation (Skipped + Modified) | Client | SC-6, SC-1 |
| S4 | Coach reviews and approves a submitted plan | Coach | SC-4 |
| S5 | Coach reviews daily group digest, opens one deviation | Coach | SC-3, SC-4 |
| S6 | Client reuses a saved meal in next week's plan | Client | SC-4 |

**Page count:** ~24 screens (15 client incl. explicit check-in states, 8 coach, 1 shared auth).

---

## 8. IA & page anatomy

*See wireframe artifact: `wireframe.html` · Visual system: `style-guide.html` · Tokens: `styles/tokens.css`*

- IA follows the selected **Guided Day Wizard** concept:
  - Client mobile shell uses **state-based primary focus**:
    - Center header shows a **mode label** (`Food Log` / `Plan`) that names the current screen, with the **active week date range** (e.g. Jun 28 – Jul 06) beneath it as context. The week range is context, not screen identity. The shared Auth screen shows the product name, not a week range.
    - `Food Log` is the primary mode when the weekly plan is approved.
    - `Plan` is the primary mode when the week is not planned/approved.
    - The day-of-week selector sits below the header and **scrolls horizontally across all 7 days**; inactive-day text meets WCAG 1.4.3 contrast (≥4.5:1 on the orange surface).
  - Weekly planning uses a day-by-day wizard spine with reuse shortcuts.
  - Daily check-in uses meal-card segmented status controls with four explicit UI states:
    - **Unselected (default):** no adherence decision yet — **no status is pre-answered**; the daily submit stays disabled until every meal is marked.
    - **Followed:** meal confirmed as planned; no modification detail required.
    - **Modified:** meal deviated; inline modification details and macro delta shown.
    - **Skipped:** meal not eaten as planned; status captured with an **optional reason field** (the same reason the coach check-in detail displays).
  - A **"Mark all followed"** bulk action at the top of the day's card stack serves the happy path (1 tap + submit) without pre-answering individual meals.
  - Meal macro tiles are labeled **"Planned"**; actual values / deltas appear only in the Modified state. Each meal card links out to its **planned ingredients** (no Isolated Object).
  - The segmented control labels remain `Followed` / `Modified` / `Skipped` (no alternate status labels).
  - Coach IA centers on Group dashboard + generated daily digest view.
- **Wireframe screen inventory (mobile):**
  - **Shared:** Auth (sign up / log in)
  - **Client:** Plan hub (draft), Day/meal editor, Plan submitted (locked), Food Log hub (default), Food Log Modified state, Food Log Skipped state (with reason), Food Log completed/all-followed state, Meal card state matrix (Unselected/Followed/Modified/Skipped), Check-in submitted confirmation
  - **Coach:** Group dashboard + digest, Plan review/approve, Client check-in detail (planned vs actual)
- Page anatomy is modeled with explicit page / collection / instance layers and `ui-rule` annotations in `wireframe.html`.
- **Design system:** `style-guide.html` documents the production iOS UI (native patterns, brand tint, components, screen map, a11y). Live kit: `app/style-guide.html`. CSS: `app/assets/css/tokens.css`, `app/assets/css/app.css`. Wireframe-era styles remain in `styles/components.css` for reference only.
- Edge states are explicitly rendered (empty/loading/error/permission/at-scale) for Food Log, Plan Wizard, Coach Dashboard, Coach Plan Review, and Auth in the wireframe artifact.
- **Open product decisions** surfaced by the P8-pre panel review (`critique-notes.md`): (a) final shape of the followed-everything fast path — bulk "Mark all followed" vs per-meal confirm — to be validated in the P8 usability test; (b) confirm whether macro tiles should ever show post-modification *actual* totals in addition to the planned baseline. Working brand name "Meal Plan" on Auth is a placeholder (A-023).

---

## 10. Open questions & assumptions

*Full register: `assumptions.md`*

| # | Question / Assumption | Type | Confidence | Validation method |
|---|---|---|---|---|
| A-008 | Check-in submitted once at end of day | assumed | M | P6 + P8 test |
| A-010 | One group per coach in MVP | assumed | M | P2 confirmed scope |
| A-006 | Coach templates in MVP | assumed | L | P4 scope |

---

## 11. Success metrics

*Full register: `metrics.md`*

| Metric | Type | Baseline | Target | Measurement source |
|---|---|---|---|---|
| Daily check-in completion rate (M-002) | north-star | TBD | ≥60% | App analytics |
| Median check-in duration (M-003) | guardrail | TBD | ≤3 min | App analytics |
| Weekly plan submission rate (M-001) | north-star | TBD | ≥70% | App analytics |
| Coach digest open rate (M-004) | north-star | TBD | ≥80% | App analytics |

---

## 12. Out-of-scope / future work

- In-app coach comments and feedback thread
- Barcode scanning and advanced nutrition database integrations
- Multi-group per coach
- Mind Genomics vignette studies (optional post-MVP — A-005)
- Paid infrastructure tier migration when scaling past soft launch

---

*Generated by Design Dash · 2026-06-29*  
*See also: `summary.html` · `wireframe.html` · `flow.md`*
