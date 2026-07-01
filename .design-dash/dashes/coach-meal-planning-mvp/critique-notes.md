# Panel Review: Coach-Led Meal Planning — Mobile Wireframes

**Date**: 2026-06-29
**Reviewed by**: Adversarial Panel (7 arguing voices + Sage)
**Roster**: sophia (standard), pat (standard), mira (standard), ace (ruthless), mobile-user (standard), skeptic (standard), newcomer (standard) + sage
**Source**: `dashes/coach-meal-planning-mvp/wireframe.html`
**Question on the table**: What enhancements or changes should we make before progressing to build?
**Stance**: standard (per-persona override: Ace ruthless for a11y gate)

---

## TL;DR Decision

The wireframes are structurally ready to progress **once three things are fixed**: remove the pre-selected "Followed" default (replace with an explicit fast-path), restore a mode identity to the header while keeping the week range as context, and clear the mobile/a11y defects (inactive-day contrast, day-row overflow, meal-name scale). Everything else is a polish backlog, not a blocker. We gain trustworthy data and an accessible, reachable mobile UI; we sacrifice some of the header's minimalism and the card's visual drama.

---

## Opening Statements

### Sophia — OOUX/ORCA Facilitator
> "The design tells us what it values. Right now the meal card tells me 'macros' louder than it tells me 'did you follow this?'"
- **Defends**: Meal Adherence Record correctly nested in the Meal card; Followed/Modified/Skipped consistent with locked CTA vocabulary.
- **Concerns**: No path from Food Log meal card to planned Meal ingredients (Isolated Object — B1). Skipped state shows no deviation capture while coach detail shows a "Not hungry" note (Shapeshifter — attribute lost between contexts).

### Pat — UX Designer
> "What user goal does this serve? A default that pre-answers the question fights the goal of honest adherence."
- **Defends**: Approved-vs-unapproved hub switch is real behavioral logic; in-progress → submit → confirmation flow is coherent.
- **Concerns**: State A pre-selects every meal as Followed → manufactures adherence data, threatens SC-6 and M-002. Macro tiles don't say planned vs actual.

### Mira — Visual Designer
> "The eye hits a 52px meal name and a big macro grid before it finds the task."
- **Defends**: Strong, memorable card system; the state matrix is genuinely scannable.
- **Concerns**: Giant meal name eats the viewport (~2 cards fit, dinner below fold); orange-on-translucent-white text is decorative, not communicative.

### Ace — Accessibility Expert (ruthless)
> "Several of these would fail a WCAG 2.2 AA audit today, and A-022 is still open."
- **Defends**: `role="radiogroup"` + `aria-checked` is the right base; 44px min-heights present.
- **Concerns**: Inactive weekday text `rgba(255,255,255,0.45)` on `#ff6a00` fails 1.4.3. Remove "−" and "Add modification" lean on color/shape. Pre-selected Followed + always-enabled submit is a cognitive + data-integrity trap.

### Mobile User
> "One-handed on a train at 375px — show me what I actually get."
- **Defends**: Sticky bottom submit is in the thumb zone.
- **Concerns**: Weekday row is `overflow:hidden`, shows 3 of 7 days — can't reach Saturday. Huge meal name forces constant scrolling. Submit floats over card content with no scrim.

### Skeptic — Reluctant User
> "Apparently every meal is already marked 'Followed' — so the fast path is to lie by doing nothing."
- **Defends**: If I genuinely followed everything, saved taps are real value.
- **Concerns**: Positive default trains rubber-stamping; coach stops trusting the data.

### Newcomer — First-Time User
> "I logged in and the top bar says 'Jun 28 – Jul 06.' I don't know what screen I'm on."
- **Defends**: Plan sheet's "complete planning to unlock check-ins" copy orients well.
- **Concerns**: Auth shows a week range before a week exists; title no longer names the screen; "Add modification" doesn't read as a button.

---

## Contested Points

### 1. Pre-selected "Followed" default (speed vs data integrity)
- **Skeptic** argues: A positive default manufactures compliance and erodes coach trust.
- **Pat** counters: Worse — it threatens SC-6 and the meaning of M-002; a pre-answered question isn't a check-in.
- **Skeptic** (rebuttal): Don't overcorrect into three forced taps when I really did follow — give an explicit fast path.
- **Ace** adds: It's a misleading-default pattern; submit is enabled before any decision.
- **Sage's read**: Strong convergence to remove the silent default. Unresolved: the exact shape of the fast path.

### 2. Week-range as screen title (orientation vs minimal header)
- **Newcomer** argues: Header stopped telling me what screen I'm on; auth shows a non-existent week.
- **Sophia** counters: Masked-screen risk — Food Log and Plan share near-identical chrome.
- **Mira** (partial defense): Week range is the right context anchor, but not the screen identity — pair with a small mode label.
- **Sage's read**: Week range stays as context; add a lightweight mode signal; fix auth. Convergent.

### 3. Visual ambition vs mobile reality (name scale, contrast, day overflow)
- **Mira** argues: 52px name spends the viewport on identity; task sinks below the fold.
- **Mobile User** counters: Day row clipped at `overflow:hidden` — back half of the week unreachable.
- **Ace** (ruthless): Inactive-day contrast fails 1.4.3 — a defect, not a preference.
- **Mira** (concession): Cap name size, scrollable day strip, darker inactive state.
- **Sage's read**: Converged on direction; tradeoff is a calmer hero for reachability and conformance.

---

## Synthesis

### Strongest evidence
- Pre-filled positive defaults corrupt the exact signal the product exists to produce (Pat + Skeptic; SC-6 / M-002).
- Inactive-day contrast on orange fails WCAG 1.4.3, A-022 already open (Ace).
- `overflow:hidden` on a 3-of-7 day strip is unreachable content at 375px (Mobile User).

### Tradeoffs being made
- Honest data over one-tap speed: explicit "Mark all followed" costs one deliberate tap.
- Orientation over minimalism: a mode label slightly busies the simplified header.
- Reachability over drama: capping meal-name size reduces visual impact to fit the task above the fold.

### Open questions (panel did not converge)
- Fast-path shape for a genuinely-followed day: explicit "Mark all followed" button vs per-meal default + confirm? (Decide + test in P8.)
- Are macro tiles planned or actual-after-modification? (Product decision; affects labeling and coach trust.)

### Recommended next steps
- [ ] Remove silent "Followed" default; add explicit all-followed path — owner: Aaron
- [ ] Header mode label + fix auth header — owner: Aaron
- [ ] A11y/mobile defect pass (contrast, day overflow, name scale) — owner: Aaron
- [ ] Add Skipped-state reason capture to match coach detail — owner: Aaron
- [ ] Label macro tiles (planned vs actual) — owner: Aaron

---

## Panel composition for this review
sophia (standard), pat (standard), mira (standard), ace (ruthless — user override for a11y gate), mobile-user (standard), skeptic (standard), newcomer (standard), sage (synthesizer). No personas dropped; within 7-voice cap.

---

# Action Plan: Pre-Progression Wireframe Fixes

**Date**: 2026-06-29
**Source memo**: this file (above)
**Goal**: Clear blocking concerns so the wireframe set can advance to build-spec with trustworthy data and AA-baseline mobile UX.
**Scope**: `wireframe.html` + doc sync (`requirements.md`, `assumptions.md`). Out of scope: visual restyle beyond named fixes; coach feature additions.
**Constraints**: Keep current styling language; minimal detail; mobile-only.

## Milestones
- **M1 — Data integrity**: Adherence reflects real user choice.
- **M2 — Orientation**: Users always know what screen/mode they're on.
- **M3 — Conformance/reach**: AA contrast + one-handed reachability at 375px.
- **M4 — OOUX integrity**: No attribute appears on coach that the client never captured.

## Tasks

### Task 1: Remove pre-selected adherence default — M1
**Owner**: Aaron · **Source panelist(s)**: Skeptic + Pat + Ace
**Steps**:
- [ ] Default all meal cards to Unselected in State A
- [ ] Keep submit disabled until every meal has a status
- [ ] Add explicit "Mark all followed" fast-path at top of the day's card stack
**Success criterion**: No card renders a pre-checked status; followed-day completable in ≤2 deliberate taps + submit.

### Task 2: Restore screen identity in header — M2
**Owner**: Aaron · **Source panelist(s)**: Newcomer + Sophia + Mira
**Steps**:
- [ ] Add small mode label ("Food Log" / "Plan") with the week range
- [ ] Replace week range on auth screen with product name
**Success criterion**: First-time user can name the mode without reading body content; auth shows no phantom week.

### Task 3: Mobile + a11y defect pass — M3
**Owner**: Aaron · **Source panelist(s)**: Ace + Mobile User + Mira
**Steps**:
- [ ] Darken inactive weekday text to meet 1.4.3 (≥4.5:1 on orange)
- [ ] Make weekday strip horizontally scrollable with a visible affordance
- [ ] Cap `.meal-name` size so ≥2 full cards + active task fit above the fold at 375px
- [ ] Give sticky submit a scrim/background so it doesn't overlap card text
**Success criterion**: All 7 days reachable one-handed at 375px; inactive text passes contrast.

### Task 4: Close object-consistency gaps — M4
**Owner**: Aaron · **Source panelist(s)**: Sophia + Pat
**Steps**:
- [ ] Add Skipped-state reason capture on the client card
- [ ] Label macro tiles as Planned; show actual/delta only in Modified
- [ ] Add a path from Food Log meal card to planned ingredients, or document deferral
**Success criterion**: Skipped and Modified capture what the coach detail displays.

## Verification checkpoint
- [ ] Every panelist concern maps to a task or open question
- [ ] Open questions (fast-path shape, macro semantics) logged in `assumptions.md` for the P8 test
- [ ] Success criteria verifiable by someone other than Aaron (375px visual check + contrast tool)

## Open follow-ups not in this plan
- "Mark all followed" vs per-meal confirm performance — defer to P8 usability test (re-entry trigger set for A-002/A-019).

---
---

# Panel Review: Bite Club — Launch Readiness for Beta Cohort

**Date**: 2026-06-30
**Reviewed by**: Adversarial Panel (7 arguing voices + Sage)
**Roster**: sophia, pat, dev, ace, mobile-user, newcomer, skeptic (+ sage) — all `ruthless`
**Source**: `/app/**` (built PWA), `supabase/migrations/**`, dash artifacts
**Question on the table**: Are we ready to launch to the ~12-user beta cohort (1 coach + ~11 clients)?
**Stance**: `ruthless` (pre-ship gate)

## TL;DR Decision

**No-Go as-is.** The core value loop is half-connected: plan submission writes to Supabase, but
check-in submit only writes to `localStorage`, the coach digest is hardcoded sample data, and the
"Approve Plan" button has no handler. SC-3 (real digest) and SC-4 (full loop) fail today. Privacy
architecture (RLS) is well-designed; a11y and offline have real but pilot-survivable gaps. Hold ~1
week to wire the loop, verify the backend, and close the demo-auth bypass.

## Blocking findings (grounded)

1. **Check-in does not persist** — `app/client/checkin/index.html` submit is `localStorage.setItem`
   with a `// Integration point` comment. No `daily_check_ins` / `meal_adherence_records` insert.
2. **Coach digest is fixtures** — `app/coach/digest.html` and `home.html` render hardcoded clients
   (Taylor M., Jordan P., Alex R., Jamie K.). Coach never sees real check-ins. SC-3 fails.
3. **Coach approval is a no-op** — `app/coach/plan-review.html` "Approve Plan" / "Request Changes"
   have no click handlers and the page is hardcoded to "Alex R.".
4. **Meal/ingredient creation does not persist** — `plan/day.html` navigates without writing.
5. **No group / membership foundation** — only one `group_id` reference in the whole app, reading an
   unset `localStorage("demo.groupId")`. `weekly_meal_plans.group_id` is `NOT NULL` and RLS
   coach-visibility is keyed on group membership, so the loop cannot run on a real backend until a
   group create/invite/join flow exists. (Discovered during execution; larger than initial estimate.)
6. **Backend unverifiable / wrong project connected** — app points to Supabase project
   `marhszyalzvqwbdcbkqn`; the Supabase MCP is connected to an unrelated project
   `ylmqmxbbxurccnexylqx` (an LMS). The Bite Club schema + RLS migrations cannot be confirmed
   deployed via current tooling. **Open question — owner: Aaron.**
7. **Demo-auth bypass** — with no Supabase config, `signIn` accepts any email/password and
   `getProfile` reads role from `localStorage` (a client can self-assign `coach`). Must fail closed
   in production.
8. **a11y** — every page shipped `maximum-scale=1.0, user-scalable=no` (WCAG 1.4.4). Skip-link /
   `aria-live` parity inconsistent across pages. Built pages never re-audited.
9. **PWA offline claim unmet** — service worker caches only `index.html` + 3 CSS files; no app pages
   or JS. Scope promised offline draft editing.

## Strengths defended
- RLS migration `002_rls.sql` is comprehensive and correct (client-owns / coach-scoped-through-group).
- Plan submit is correctly wired with `onConflict`.
- Check-in UX (All-followed shortcut, segmented control, progressive deviation capture) supports SC-1.
- Neutral adherence language and non-color-only status are faithful to research and the a11y floor.

## Contested points
1. **Launchable product vs clickable prototype** (Dev ↔ Pat): converged — remaining work is small in
   code but a hard blocker until done; from the user's seat "unfinished wiring" == "doesn't work".
2. **Digest theater** (Skeptic ↔ Pat): converged — digest must read live data AND show an honest
   empty state; fixtures risk cohort collapse through the coach.
3. **Pilot exceptions for a11y/offline** (Ace + Mobile ↔ Dev): zoom fix non-negotiable (trivial);
   offline deferrable only if the scope claim is explicitly amended.

## Action plan status (as executed 2026-06-30)
- [x] Task 5 — Removed zoom-disable from all 12 app pages (WCAG 1.4.4).
- [x] Task 7 — Amended scope §2.5 (offline deferred for pilot) + added consent entry on auth +
      created `app/legal/privacy.html` pilot privacy summary.
- [ ] Task 1 — Wire check-in persistence. **Blocked** on backend confirmation (finding 6) + group
      foundation (finding 5).
- [ ] Task 2 — Wire coach approve / request-changes. **Blocked** same root cause.
- [ ] Task 3 — Digest/dashboard read live data + empty states. **Blocked** same root cause.
- [ ] Task 4 — Verify RLS deployed + close demo-auth bypass. **Open question** — MCP points to the
      wrong project; needs Aaron to confirm/connect the Bite Club project.
- [ ] Task 6 — First-run empty states. **Blocked** same root cause (depends on real data pipeline).

## Open questions (panel did not converge / needs Aaron)
- Which Supabase project is canonical for Bite Club, and are `001_schema.sql` + `002_rls.sql` applied?
- Is there an intended group create/invite/join flow, or should clients be pre-provisioned for the pilot?
- Is consented-pilot legal posture sufficient given privacy gate is `escalated` / sign-off `pending`?
