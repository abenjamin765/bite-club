# Flow — Coach-Led Meal Planning MVP

**Dash:** coach-meal-planning-mvp  
**Date:** 2026-06-29  
**User roles:** Client (primary), Coach (secondary)  
**In-scope objects:** account, group, weekly-meal-plan, day-plan, meal, ingredient, daily-check-in, meal-adherence-record, saved-meal

---

## Mental models

| Object | Role | Mental model (1 sentence) | Tag |
|---|---|---|---|
| Daily Check-In | Client | "Did I do what I planned today? Let me tick off each meal fast." | assumed |
| Daily Check-In | Coach | "Which of my clients didn't check in or went off-plan today?" | assumed |
| Weekly Meal Plan | Client | "I build my meals for the whole week up front so I don't have to think about it each day." | assumed |
| Weekly Meal Plan | Coach | "I review the plan once and approve it; then it's the client's contract for the week." | assumed |
| Meal | Client | "A meal is one eating occasion — I name it, add what's in it, and see the macros." | assumed |
| Ingredient | Client | "An ingredient is one food with a quantity; the app adds up the numbers." | assumed |
| Saved Meal | Client | "My saved meals are my go-to meals I don't want to re-type every week." | assumed |
| Group | Coach | "My group is my client roster — I see everyone's status at a glance." | assumed |
| Meal Adherence Record | Client | "For each meal I mark done, changed, or skipped — I only type if something changed." | borrowed |
| Meal Adherence Record | Coach | "I see the delta: what they planned vs. what actually happened." | assumed |
| Account | Client | "My profile is just how I log in and set my timezone." | assumed |
| Account | Coach | "My account is how I log in; my group is where I actually work." | assumed |

**Reconciliation notes (P5 gate):**

| Divergence | User mental model | System model | Resolution |
|---|---|---|---|
| Client uses "meals" to mean any eating occasion | Meal = breakfast / lunch / dinner / snack | Object: Meal with type enum | Aligned — use "meal" in all UI labels |
| Client expects to see "today" first | Check-in hub is landing after login | Daily Check-In is hub object | Aligned — confirmed P2 |
| Client expects editing after approval to work | Silent edit assumed | Status → "Changed After Approval" | **Potential surprise** — onboarding copy must explain this; A-009 flags for P8 test |
| Coach expects one summary, not one alert per client | Digest-first expectation | Group digest is a generated view | Aligned — borrowed from research.md |
| Client may expect macros to auto-calculate from a food name | "Just type chicken breast and it knows" | Manual entry required; DB lookup optional | **Label framing needed** — show search icon and fallback; A-016 |

---

## Scenarios

### Scenario 1: Client builds and submits their first weekly plan
*Maps to SC-4 (full loop works) + SC-2 (≥60% check-in completion)*

**Trigger:** It's Sunday evening and the coach has asked the client to submit their week's plan before Monday.

**Goal:** Client creates a weekly meal plan with at least three days of meals, adds ingredients and macros, and submits to the coach.

**Outcome:** Plan status changes to Submitted; coach sees it in their queue; client can see confirmation.

---

### Scenario 2: Client completes a daily check-in (followed plan)
*Maps to SC-1 (under 1 minute when following) + SC-2 (≥60% completion)*

**Trigger:** It's 8pm and the client gets a reminder notification. They followed their plan today.

**Goal:** Client opens check-in, marks all meals as Followed, submits.

**Outcome:** Check-in status → Submitted in under 60 seconds; coach receives it in tonight's digest.

---

### Scenario 3: Client completes a daily check-in with a deviation
*Maps to SC-6 (deviations captured with planned meal preserved) + SC-1*

**Trigger:** It's 8pm. The client skipped lunch and swapped their dinner.

**Goal:** Client marks lunch Skipped, marks dinner Modified, selects deviation type "ingredient swap", adds a brief note.

**Outcome:** Check-in submitted; original planned meals are preserved; coach sees the delta in the digest.

---

### Scenario 4: Coach reviews client plans and approves
*Maps to SC-4 (full loop works) + SC-3 (digest not per-client alerts)*

**Trigger:** Coach receives a notification that a client has submitted a plan.

**Goal:** Coach opens the submitted plan, reviews macro totals and ingredients, approves it.

**Outcome:** Plan status → Approved; client is notified; plan becomes the check-in source of truth for the week.

---

### Scenario 5: Coach reviews the daily group digest
*Maps to SC-3 (one daily digest) + SC-4 (full loop)*

**Trigger:** Coach receives the daily digest at their configured time.

**Goal:** Coach quickly identifies who checked in, who missed, who deviated; opens one client's check-in for detail.

**Outcome:** Coach has the exception information they need without reviewing every client individually.

---

### Scenario 6: Client reuses a saved meal
*Maps to SC-4 (full loop — reuse reduces planning burden)*

**Trigger:** Client is building next week's plan and Monday lunch is the same as last week.

**Goal:** Client opens their saved meals, adds "Chicken and rice bowl" to Monday lunch, adjusts the portion.

**Outcome:** Meal appears in Day Plan with ingredients copied; macros update; no re-entry required.

---

## Flow steps

### Scenario 1 — First weekly plan

| Step # | Actor | Action | Object touched | State change |
|---|---|---|---|---|
| 1 | Client | Signs up or logs in | Account | Session created; lands on client home |
| 2 | Client | Joins group via invite link | Group, Account | Account added to Group roster |
| 3 | Client | Taps "Create plan" on client home | Weekly Meal Plan | New Weekly Meal Plan created (Draft) |
| 4 | Client | Selects Monday, taps "Add meal" | Day Plan, Meal | Day Plan for Monday created; Meal creation form opens |
| 5 | Client | Names meal "Overnight oats", selects type Breakfast | Meal | Meal saved to Monday Day Plan |
| 6 | Client | Taps "Add ingredient", types "rolled oats" or uses lookup | Ingredient | Ingredient added; meal macros update |
| 7 | Client | Repeats steps 6 for each ingredient | Ingredient | Meal macro totals accumulate |
| 8 | Client | Repeats steps 4–7 for each meal and day | Day Plan, Meal, Ingredient | Plan fills out; weekly macro totals update |
| 9 | Client | Taps "Submit plan" | Weekly Meal Plan | Validation runs; status → Submitted; coach notified |
| 10 | Client | Views confirmation and status | Weekly Meal Plan | Sees "Submitted — awaiting coach review" |

---

### Scenario 2 — Daily check-in (followed plan)

| Step # | Actor | Action | Object touched | State change |
|---|---|---|---|---|
| 1 | Client | Opens app (notification or direct) | Account | Session resumed; lands on client home |
| 2 | Client | Sees today's check-in card — "Not started" | Daily Check-In | — |
| 3 | Client | Taps "Start check-in" | Daily Check-In | Status → In Progress; MAR list loads from approved plan |
| 4 | Client | Taps "Followed" on Breakfast | Meal Adherence Record | MAR status = Followed |
| 5 | Client | Taps "Followed" on Lunch | Meal Adherence Record | MAR status = Followed |
| 6 | Client | Taps "Followed" on Dinner | Meal Adherence Record | MAR status = Followed |
| 7 | Client | Taps "Submit check-in" | Daily Check-In | Status → Submitted; coach digest updated |

---

### Scenario 3 — Daily check-in (with deviation)

| Step # | Actor | Action | Object touched | State change |
|---|---|---|---|---|
| 1 | Client | Opens app, taps "Continue check-in" | Daily Check-In | Status = In Progress |
| 2 | Client | Taps "Followed" on Breakfast | Meal Adherence Record | MAR = Followed |
| 3 | Client | Taps "Skipped" on Lunch | Meal Adherence Record | MAR = Skipped; optional note field appears |
| 4 | Client | Adds note "Not hungry at lunch" | Meal Adherence Record | Note saved |
| 5 | Client | Taps "Modified" on Dinner | Meal Adherence Record | MAR = Modified; deviation form opens |
| 6 | Client | Selects "Ingredient swap", adds "Had salmon instead of chicken" | Meal Adherence Record | Deviation type + notes saved |
| 7 | Client | Taps "Submit check-in" | Daily Check-In | Status → Submitted; planned meals preserved |

---

### Scenario 4 — Coach approves a plan

| Step # | Actor | Action | Object touched | State change |
|---|---|---|---|---|
| 1 | Coach | Opens app or taps notification "Client submitted a plan" | Weekly Meal Plan | — |
| 2 | Coach | Opens Group dashboard, sees submitted plan queue | Group, Weekly Meal Plan | — |
| 3 | Coach | Taps client name / plan card | Weekly Meal Plan | Plan detail opens |
| 4 | Coach | Reviews Day Plan macro totals, expands meals | Day Plan, Meal, Ingredient | Read-only view |
| 5 | Coach | Taps "Approve" | Weekly Meal Plan | Status → Approved; client notified |

---

### Scenario 5 — Coach reviews daily digest

| Step # | Actor | Action | Object touched | State change |
|---|---|---|---|---|
| 1 | Coach | Receives digest notification | Group | — |
| 2 | Coach | Opens digest view on Group | Group (digest view), Daily Check-In | Digest loaded: counts + attention list |
| 3 | Coach | Sees one client is Missed, two are Modified | Daily Check-In | — |
| 4 | Coach | Taps client with deviation to see detail | Daily Check-In, Meal Adherence Record | Client check-in detail opens |
| 5 | Coach | Reviews planned vs. actual meals | Meal Adherence Record, Meal | Deviation type + notes visible |
| 6 | Coach | Returns to digest | Group (digest view) | — |

---

### Scenario 6 — Client reuses a saved meal

| Step # | Actor | Action | Object touched | State change |
|---|---|---|---|---|
| 1 | Client | Is building Monday's plan, taps "Add meal" on lunch | Day Plan | Meal form opens |
| 2 | Client | Taps "Add from saved" | Saved Meal | Saved meal library opens |
| 3 | Client | Selects "Chicken and rice bowl" | Saved Meal | Ingredients copied into new Meal |
| 4 | Client | Edits quantity on rice ingredient | Ingredient | Portion adjusted; macros update |
| 5 | Client | Saves meal to plan | Meal | Meal added to Monday Day Plan |

---

## Pages / screens / modals

### Client surfaces

| Name | Type | Trigger (step #) | Objects present |
|---|---|---|---|
| Sign Up / Log In | form | S1:1 | Account |
| Client Home | dashboard | S1:1, S2:1, S3:1 | Daily Check-In (hub), Weekly Meal Plan (status) |
| Weekly Plan Overview | detail | S1:3 | Weekly Meal Plan, Day Plan[] |
| Day Plan Detail | detail | S1:4 | Day Plan, Meal[] |
| Meal Editor | form | S1:5 | Meal, Ingredient[] |
| Ingredient Entry | form / modal | S1:6 | Ingredient |
| Database Ingredient Lookup | modal | S1:6 | Ingredient |
| Saved Meal Library | list | S6:2 | Saved Meal[] |
| Submit Plan Review | detail | S1:9 | Weekly Meal Plan, Day Plan[] |
| Plan Status | detail | S1:10 | Weekly Meal Plan |
| Today's Check-In | detail | S2:3, S3:1 | Daily Check-In, Meal Adherence Record[] |
| Deviation Capture | modal | S3:5 | Meal Adherence Record |
| Check-In Submitted Confirmation | landing | S2:7, S3:7 | Daily Check-In |
| Check-In History | list | — | Daily Check-In[] |

### Coach surfaces

| Name | Type | Trigger (step #) | Objects present |
|---|---|---|---|
| Coach Log In | form | S4:1 | Account |
| Group Dashboard | dashboard | S4:2, S5:2 | Group, Account[], Weekly Meal Plan summaries |
| Submitted Plans Queue | list | S4:2 | Weekly Meal Plan[] |
| Client Plan Review | detail | S4:3 | Weekly Meal Plan, Day Plan[], Meal[], Ingredient[] |
| Daily Digest View | dashboard | S5:2 | Group (digest), Daily Check-In summaries |
| Client Check-In Detail | detail | S5:4 | Daily Check-In, Meal Adherence Record[], Meal[] |
| Group Settings | form | — | Group |
| Invite Clients | modal | — | Group, Account |

---

## Goal-page map

| Success criterion | Page / component | Notes |
|---|---|---|
| SC-1: Check-in under 1 minute when following | Today's Check-In — MAR list | Max 3 taps (one per meal) + Submit; no required text when Followed |
| SC-2: ≥60% daily check-in completion | Client Home — check-in status card + Check-In Submitted Confirmation | Home must surface today's check-in immediately; notification drives re-engagement |
| SC-3: One daily digest (not per-client alerts) | Daily Digest View on Group | Generated once per day; exception-sorted; not per-client push |
| SC-4: Full loop functional | All client + coach surfaces | No orphaned screens — every step above has a page |
| SC-5: Client cannot see peer data | Client Home, Group Dashboard | Privacy enforced at auth layer; no peer names/plans visible anywhere in client surfaces |
| SC-6: Deviations captured, plan preserved | Deviation Capture modal + Client Check-In Detail | Planned Meal displayed read-only alongside deviation input; original never mutated |

**Gate result:** All 6 success criteria mapped. ✅

---

## Constraints log

| Constraint | Design move forced in P6/P7 |
|---|---|
| Mobile-first PWA | Thumb-zone CTAs (bottom sheet or bottom nav); no hover-only interactions; tap targets ≥44px |
| Vanilla HTML/CSS/JS only | No React/Vue component libraries; UI built with semantic HTML + CSS custom properties; interactive states via JS class toggles |
| Free-tier infrastructure | No real-time websocket for check-in updates — polling or server-sent events acceptable; digest generated server-side on schedule |
| Offline-safe draft editing | Weekly plan edits must queue locally (service worker) and sync when connection returns; show "saved locally" state |
| Daily check-in under 1 minute | Today's Check-In must open to MAR list immediately — no loading screens or extra taps before mark-status interaction |
| Neutral deviation language | UI copy: "Modified" not "Cheated"; "Skipped" not "Missed a meal"; no red error styling on deviation entries |
| Private by default | No client names visible to other clients; coach sees all; all data authenticated before display |
| End-of-day single submit (A-008) | Submit button only appears after all MARs are marked; partial state is savable (In Progress) without submitting |
| Changed After Approval state (A-009) | Plan editor must show "This plan is Approved — changes will be flagged" banner before allowing any edit post-approval |

---

## Page count summary

| Role | Surface count |
|---|---|
| Client | 14 screens |
| Coach | 8 screens |
| Shared (auth) | 1 screen |
| **Total** | **23 screens** |

*Matches requirements §13 (Client: 14, Coach: 11 — 3 coach screens collapsed into Group Dashboard + Digest View for MVP).*
