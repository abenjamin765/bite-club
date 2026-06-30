# Accessibility Audit: Coach-Led Meal Planning Wireframe

**Date:** 2026-06-29  
**Artifact:** `dashes/coach-meal-planning-mvp/wireframe.html`  
**Standard:** WCAG 2.2 AA  
**Target user population:** General adults in coach-led nutrition programs  
**Gate type:** Review pass (pre-build wireframe)

---

## Summary

| Category | Pass | Fail | N/A |
|---|---:|---:|---:|
| Landmarks & structure | 1 | 3 | 0 |
| Focus management | 2 | 4 | 0 |
| Color & contrast | 4 | 0 | 0 |
| Interactive elements | 4 | 2 | 0 |
| Motion & time | 1 | 2 | 0 |
| Semantics | 2 | 2 | 0 |
| Cognitive accessibility | 4 | 0 | 0 |
| ui-rule TBD | 1 | 0 | 0 |

**Blocking issues (ship/no-ship equivalent):** 6  
**Recommended fixes:** 5  
**Open TBD items:** 0

---

## Blocking Issues

### Missing `<main>` and structural landmarks — WCAG 1.3.1 / 2.4.1
**What's wrong:** Wireframe uses generic `<div>` containers only; no `<main>`, `<header>`, `<nav>`, `<section>` landmarks.  
**Where:** Entire document structure.  
**Remediation:** Refactor shell into semantic landmarks and wrap content in one `<main id="main-content">`.

### No skip link for repeated nav — WCAG 2.4.1
**What's wrong:** Keyboard users must tab through top shell actions each time.  
**Where:** Page top.  
**Remediation:** Add visually hidden focusable "Skip to main content" link.

### Focus ring style missing — WCAG 2.4.7
**What's wrong:** No explicit `:focus-visible` style in CSS. Browser defaults are unreliable/inconsistent.  
**Where:** All interactive controls.  
**Remediation:** Add `:focus-visible { outline: 2px solid #000; outline-offset: 2px; }` for buttons, links, inputs.

### Touch target sizing not guaranteed — WCAG 2.5.8
**What's wrong:** Some tertiary buttons and badges appear below 44x44 target size.  
**Where:** Check-in table actions and tertiary controls.  
**Remediation:** Enforce min-height/min-width 44px for all actionable targets.

### Form error association not defined — WCAG 3.3.1 / 3.3.3
**What's wrong:** Inputs are present but error messages are not linked via `aria-describedby` and invalid states are not shown.  
**Where:** Meal editor and ingredient entry fields.  
**Remediation:** Add inline error text IDs and `aria-invalid="true"` patterns.

### Reduced motion handling absent — WCAG 2.2.2 / 2.3.3 advisory
**What's wrong:** CSS has no `prefers-reduced-motion` handling guidance.  
**Where:** Global styles.  
**Remediation:** Add reduced motion media query for transitions/animations used in final build.

---

## Recommended Fixes (non-blocking)

1. Add `aria-live="polite"` region for check-in submit success and digest update notices.
2. Convert badge-only status blocks into `<span role="status">` where dynamic.
3. Ensure table headers have explicit scope attributes (`scope="col"`).
4. Ensure modal/dialog patterns include focus trap + Escape return focus behavior.
5. Add language to copy style guide to keep reading level <= grade 8.

---

## Open ui-rule TBD Items

No `ui-rule: TBD` annotations detected in `wireframe.html`.

---

## Passed checks

- Status is not color-only; each state includes explicit text labels (Followed/Modified/Skipped/Missed).
- Interactive elements generally have visible text labels (no icon-only primary actions).
- Edge states are explicitly represented for all key surfaces (empty/loading/error/permission/at-scale).
- Collection-level sort/filter controls are present in coach digest view.
