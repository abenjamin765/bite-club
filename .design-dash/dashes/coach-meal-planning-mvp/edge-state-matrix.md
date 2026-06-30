# Edge State Matrix

**Dash:** Coach-Led Meal Planning PWA  
**Dash ID:** coach-meal-planning-mvp  
**Last updated:** 2026-06-29  
**Owner:** Aaron

> Rendered in `wireframe.html` § Edge States (mobile key surfaces).

---

## Matrix

| page | empty-state | loading-state | error-state | permission-denied-state | at-scale-state |
|---|---|---|---|---|---|
| Food Log | No approved week — Go to Plan CTA; meal cards locked | Skeleton meal cards; submit disabled | Could not load today's meals + Retry; preserve local selections | Cannot view another client's check-in | >10 meals: collapse by type; sticky submit visible |
| Plan Wizard | No meals for [day] — Add meal CTA | Skeleton saved-meals list | Save failed — draft saved locally + Sync now | Submitted/approved: read-only locked banner | Saved meal picker: search + pagination at 100+ |
| Coach Dashboard | No clients yet — Invite client CTA | Skeleton digest counts + client rows | Digest unavailable — last snapshot fallback | Coach-only dashboard; role required | 100+ clients: sortable table + server pagination |
| Coach Plan Review | No submitted plans in queue | Skeleton day/meal rows | Could not load plan detail + Retry | Restrict to own group's clients only | Long plans: collapsible day sections + sticky macro summary |
| Auth | — | — | Invalid credentials + retry | — | — |

---

## Design debt

| page | unrendered-state | due-by | owner |
|---|---|---|---|
| Account Settings | empty / error / permission | 2026-07-18 | Aaron |

*A11y implementation debt tracked in A-022 and `a11y-audit.md`.*
