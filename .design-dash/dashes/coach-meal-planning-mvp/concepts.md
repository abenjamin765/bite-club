# Concept Divergence — Coach-Led Meal Planning MVP

**Dash:** coach-meal-planning-mvp  
**Date:** 2026-06-29  
**Phase:** P6 — Divergence + Selection Gate

> Note: The **client hub object (Daily Check-In)** and **adherence model (Followed/Modified/Skipped)** are locked from P2 and are not re-litigated here. Divergence focuses on the **flow spine** and **primary action / IA model** — the dimensions that most change how clients build plans and how coaches work.

---

## 5.1 Declared structural dimensions

| Dimension | Why it matters here |
|---|---|
| **Flow spine** (primary) | How a client constructs a weekly plan — the heaviest, most abandonment-prone task. Wizard vs. canvas vs. reuse-first radically changes effort and accuracy. |
| **Primary action / IA model** (secondary) | What the app pushes the client toward first — building from scratch, copying forward, or confirming. Shapes the whole information hierarchy. |

Both concepts below keep the locked Daily Check-In hub but differ structurally on these two dimensions.

---

## 5.2 Concepts

### Concept A — "Week Grid Builder" (canvas-first)

**Structural signature:** Flow spine = single-page week canvas. Primary action = "Build the week."

The client's planning surface is a 7-day grid (days × meal slots). The client fills cells directly, seeing day and week macro totals update live in a persistent totals bar. Building is the central act; reuse (saved meals, copy day) is available but secondary. Coach review mirrors the same grid read-only.

**Trade-off:** Powerful for desktop and motivated planners; dense and potentially overwhelming on a small mobile screen for first-time users.

**Pages redesigned from `flow.md`:**
- Weekly Plan Overview → becomes the primary editing canvas (not just an overview)
- Day Plan Detail → collapses into the grid (tap a column to expand)
- Meal Editor → inline cell expansion rather than a separate screen

---

### Concept B — "Guided Day Wizard" (wizard-first)

**Structural signature:** Flow spine = step-by-step wizard. Primary action = "Plan today, then next day."

The client builds one day at a time through a guided flow: pick day → add meals → add ingredients → confirm day totals → advance. The app leads; the client follows a rail. Mobile-optimized, low cognitive load, strong for first-timers. Week overview is a summary you reach after building, not the workspace.

**Trade-off:** Lowest friction for novices and mobile; slower and more tedious for power users planning a full week or repeating meals across days.

**Pages redesigned from `flow.md`:**
- Day Plan Detail → becomes the central wizard step
- Weekly Plan Overview → demoted to a read-only progress summary
- Meal Editor / Ingredient Entry → sequential wizard sub-steps

---

### Concept C — "Reuse-First Library" (template/copy-first)

**Structural signature:** Flow spine = assemble from saved building blocks. Primary action = "Add from your meals" / "Copy last week."

The planning surface leads with the client's Saved Meal library and "copy last week." Building from scratch is the fallback, not the default. The mental model is assembling a week from known blocks. Directly operationalizes the research.md finding that reuse mechanics matter more than capture tricks.

**Trade-off:** Fastest for returning users with a stocked library; weak on day one when the library is empty (cold-start problem) — first week still requires from-scratch building.

**Pages redesigned from `flow.md`:**
- Saved Meal Library → promoted to a primary planning entry point
- Weekly Plan Overview → leads with "Copy last week" and "Add from saved" CTAs
- Meal Editor → still available but reached secondarily

---

## 5.3 Panel distinctness verification

| Concept pair | Differ on declared dimension? | Verdict |
|---|---|---|
| A vs. B | Flow spine: canvas vs. wizard | ✅ Distinct |
| A vs. C | Primary action: build vs. reuse; IA: grid vs. library | ✅ Distinct |
| B vs. C | Flow spine: linear wizard vs. assembly; primary action differs | ✅ Distinct |

**Panel verdict:** All three are structurally distinct theories of how clients should build a plan — not cosmetic variants. Distinctness confirmed.

---

## 5.4 Scoring — user success criteria

Rating: Strong fit (3) · Partial (2) · Weak (1) · Conflicts (0)

| Success criterion | A: Week Grid | B: Day Wizard | C: Reuse-First |
|---|---|---|---|
| SC-1: Check-in <1 min | 2 | 2 | 2 | *(equal — check-in hub is shared)* |
| SC-2: ≥60% check-in completion | 2 | 3 | 2 | Wizard's low-friction onboarding aids habit formation |
| SC-3: One daily digest | 2 | 2 | 2 | *(equal — coach side unchanged)* |
| SC-4: Full loop works | 3 | 3 | 2 | C's cold-start weakens first-week loop |
| SC-5: Privacy | 2 | 2 | 2 | *(equal)* |
| SC-6: Deviations captured | 2 | 2 | 2 | *(equal)* |
| **Planning completion (proxy for accuracy)** | 2 | 3 | 2 | Wizard's guardrails reduce missing-data submissions |
| **Mobile-first fit (constraint)** | 1 | 3 | 2 | Grid is dense on mobile; wizard is built for it |
| **Total** | **16** | **22** | **18** |

---

## 5.5 Scoring — business metric

North-star: **M-002 Daily check-in completion rate** (outcome-linked, not engagement-proxy) and **M-001 Weekly plan submission rate**.

| Business metric | A: Week Grid | B: Day Wizard | C: Reuse-First |
|---|---|---|---|
| M-001 Weekly plan submission (≥70%) | 2 | 3 | 2 |
| M-002 Daily check-in completion (≥60%) | 2 | 3 | 2 |
| **Value (north-star impact)** | Med | High | Med |
| **Effort (vanilla JS build)** | High (live grid is complex) | Low–Med | Med |

The wizard concept best supports plan submission (lower abandonment) which feeds the whole loop. It is also the lowest build effort in vanilla HTML/CSS/JS — no complex live-grid state management.

---

## 5.6 Selection Gate

| | A: Week Grid | B: Day Wizard | C: Reuse-First |
|---|---|---|---|
| User criteria total | 16 | **22** | 18 |
| Business metric | Med | **High** | Med |
| Value/effort | High effort / Med value | **Low effort / High value** | Med / Med |
| **Recommendation** | — | ✅ **Select** | Runner-up |

**Gate checks:**
1. Scoring references both user criteria and business metric — ✅
2. Concepts panel-verified as structurally distinct — ✅
3. Winning north-star (check-in completion, plan submission) is outcome-linked, not engagement proxy — ✅

**Selection Gate: PASSED ✅**

---

## Selected concept

**Concept B — Guided Day Wizard**, with a **reuse accelerator borrowed from Concept C.**

**Rationale:** The wizard's step-by-step spine best fits the mobile-first, vanilla-JS, low-friction constraints and most directly drives the north-star metrics (plan submission and check-in completion) by reducing abandonment for the soft-launch cohort of mostly new users. To address its weakness against power users, we fold in Concept C's "copy last week" and "add from saved" as **accelerator shortcuts** available at the start of the wizard — so returning users skip ahead while first-timers get the guided rail.

**Runner-up: Concept C (Reuse-First)** — strong for retention but loses on the day-one cold-start problem when the library is empty. Its best ideas are absorbed as accelerators into B.

**Not selected: Concept A (Week Grid)** — highest build complexity in vanilla JS and weakest mobile fit; revisit as a desktop "power planner" enhancement post-MVP.

---

## 5.7 New assumptions

See `assumptions.md` A-019, A-020.
