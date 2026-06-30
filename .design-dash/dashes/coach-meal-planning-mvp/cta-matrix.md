**Project:** Coach-Led Meal Planning MVP

---

## How to Read This Matrix

Every CTA is tied to a specific object. Roles: **Client**, **Coach**, **System**.

PSTQ ranking deferred to P4.5 / prioritization — this is discovery inventory.

---

## Account CTAs

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **Sign up** | Guest | Write | | Email + role selection |
| 2 | **Log in** | Guest | Read | | |
| 3 | **Log out** | Client, Coach | Write | | |
| 4 | **Edit profile** | Client, Coach (self) | Write | | Name, time zone, notification prefs |
| 5 | **Join group** | Client | Write | ✓ → Group | Via invite link/code |

---

## Group CTAs

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **Create group** | Coach | Write | | MVP: one group |
| 2 | **View group** | Coach, Client | Read | | |
| 3 | **Edit group settings** | Coach | Write | | Name, digest timing |
| 4 | **Invite client** | Coach | Write | ✓ → Account | Generates link/code — not separate object |
| 5 | **View client roster** | Coach | Read | ✓ → Account | Dashboard entry |
| 6 | **View daily digest** | Coach | Read | ✓ → Daily Check-In | Generated view on Group |
| 7 | **Filter by attention needed** | Coach | Read | | Exception-based sort |

---

## Weekly Meal Plan CTAs

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **Create weekly plan** | Client | Write | | For specific week |
| 2 | **View weekly plan** | Client, Coach | Read | | Coach: submitted/active only |
| 3 | **Edit weekly plan** | Client | Write | | Draft or Needs changes only |
| 4 | **Save draft** | Client | Write | | Offline-safe |
| 5 | **Submit for approval** | Client | Write | | Validates required data |
| 6 | **Copy previous week** | Client | Write | ✓ → Day Plan, Meal | Reuse mechanic |
| 7 | **Approve plan** | Coach | Write | | Status → Approved |
| 8 | **Request changes** | Coach | Write | | Status → Needs changes; notify client |
| 9 | **View plan status** | Client, Coach | Read | | Draft/Submitted/Approved/etc. |

---

## Day Plan CTAs

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **View day plan** | Client, Coach | Read | | |
| 2 | **Add meal** | Client | Write | ✓ → Meal | |
| 3 | **Copy day to another day** | Client | Write | ✓ → Day Plan | Within same week |
| 4 | **View day macro totals** | Client, Coach | Read | | Calculated |

---

## Meal CTAs

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **Create meal** | Client | Write | | Type: breakfast/lunch/dinner/snack |
| 2 | **View meal** | Client, Coach | Read | | |
| 3 | **Edit meal** | Client | Write | | Draft/Needs changes plan only |
| 4 | **Delete meal** | Client | Write | | |
| 5 | **Add ingredient** | Client | Write | ✓ → Ingredient | |
| 6 | **Save meal to library** | Client | Write | ✓ → Saved Meal | Creates Saved Meal snapshot |
| 7 | **Add from saved meal** | Client | Write | ✓ → Saved Meal | Copies into current meal |
| 8 | **Copy meal to another day** | Client | Write | ✓ → Meal | Duplicate |

---

## Ingredient CTAs

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **Add ingredient manually** | Client | Write | | Name, qty, unit, macros |
| 2 | **Lookup ingredient** | Client | Write | | Optional USDA / Open Food Facts |
| 3 | **Edit ingredient** | Client | Write | | |
| 4 | **Remove ingredient** | Client | Write | | |
| 5 | **Confirm macros** | Client | Write | | user-confirmed flag |

---

## Daily Check-In CTAs (Client hub)

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **Open today's check-in** | Client | Read | | Hub landing |
| 2 | **View check-in** | Client, Coach | Read | | Coach: own clients only |
| 3 | **Mark meal followed** | Client | Write | ✓ → Meal Adherence Record | |
| 4 | **Mark meal modified** | Client | Write | ✓ → Meal Adherence Record | Opens deviation capture |
| 5 | **Mark meal skipped** | Client | Write | ✓ → Meal Adherence Record | Optional note |
| 6 | **Add deviation detail** | Client | Write | | Type, notes, macro delta |
| 7 | **Submit check-in** | Client | Write | | End-of-day (A-008) |
| 8 | **View check-in history** | Client | Read | | Past days |

---

## Meal Adherence Record CTAs

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **Set adherence status** | Client | Write | | Followed / Modified / Skipped |
| 2 | **View planned vs. actual** | Client, Coach | Read | ✓ → Meal | Planned meal preserved |
| 3 | **Edit deviation notes** | Client | Write | | Before check-in submit |
| 4 | **View macro delta** | Client, Coach | Read | | When modified + estimate entered |

---

## Saved Meal CTAs

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **View saved meals** | Client | Read | | Library list |
| 2 | **Save meal** | Client | Write | ✓ → Meal | From meal editor |
| 3 | **Use saved meal** | Client | Write | ✓ → Meal | Inserts copy into plan |
| 4 | **Edit saved meal** | Client | Write | | Does not affect plan copies |
| 5 | **Delete saved meal** | Client | Write | | |

---

## System / Cross-cutting CTAs

| # | CTA | User Roles | Permission | Cross-Object? | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | **Send plan approved notification** | System | System | ✓ → Weekly Meal Plan | Push/email |
| 2 | **Send plan needs changes notification** | System | System | ✓ → Weekly Meal Plan | |
| 3 | **Send check-in reminder** | System | System | ✓ → Daily Check-In | Configurable |
| 4 | **Generate daily digest** | System | System | ✓ → Group | Once per day |
| 5 | **Install PWA** | Client, Coach | Read | | Add to home screen |

---

## CTA Summary

| Object | Total CTAs | Read | Write | Navigation |
| --- | --- | --- | --- | --- |
| **Account** | 5 | 1 | 4 | 1 |
| **Group** | 7 | 4 | 3 | 3 |
| **Weekly Meal Plan** | 9 | 2 | 7 | 2 |
| **Day Plan** | 4 | 2 | 2 | 1 |
| **Meal** | 8 | 1 | 7 | 3 |
| **Ingredient** | 5 | 0 | 5 | 0 |
| **Daily Check-In** | 8 | 3 | 5 | 2 |
| **Meal Adherence Record** | 4 | 2 | 2 | 1 |
| **Saved Meal** | 5 | 1 | 4 | 2 |
| **System** | 5 | 1 | 4 | — |
| **Total** | **60** | **17** | **43** | **15** |

---

## Key Observations

1. **Primary client verbs:** Mark adherence, submit check-in, build/submit plan, reuse meals.
2. **Primary coach verbs:** Approve/request changes, view digest, filter attention-needed.
3. **No in-app coach comment CTAs** — deferred P2.
4. **Cross-object hotspots:** Meal ↔ Saved Meal, Group ↔ Account, Check-In ↔ Adherence Record.
5. **Broken object check:** All 9 objects have ≥1 write CTA. ✅

---

## See Also

* `nom.md` — Nesting relationships
* `object-map.md` — Visual overview
