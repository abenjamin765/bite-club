# MVP Requirements: Coach-Led Meal Planning & Daily Check-In PWA

## 1. Product Summary

The MVP is a Progressive Web App for coach-led nutrition programs. Clients create accurate weekly meal plans with ingredients, measurements, and macros; submit those plans to a coach for approval; then check in each day by confirming whether they followed the approved plan or deviated from it.

The coach receives daily group check-in summaries so they can quickly identify which clients are on track, which clients deviated, and which clients did not check in.

## 2. MVP Product Thesis

Clients do not need another open-ended food diary. They need a clear plan, an easy way to confirm whether they followed it, and a coach-visible record of where reality diverged from the plan.

The app should reduce daily logging burden by making the approved meal plan the source of truth. Daily check-ins should be delta-based: users only need to report what changed.

## 3. Primary Users

### Client

A person participating in a coach-led meal planning or nutrition program.

The client needs to:

- Plan meals for the week.
- Enter ingredients, measurements, and macros.
- Submit the plan for coach approval.
- See whether the plan is approved or needs changes.
- Check in daily.
- Indicate whether each meal was followed, modified, or skipped.
- Note deviations from the plan.
- Share accurate adherence information with their coach.

### Coach

A nutritionist, dietitian, health coach, macro coach, or program leader managing a group of clients.

The coach needs to:

- Review submitted weekly meal plans.
- Approve plans or request changes.
- See client check-ins.
- Receive a daily group summary.
- Quickly identify who needs attention.
- Review deviations from plan.

## 4. Core MVP Workflow

### Weekly Planning Loop

1. Client starts a weekly meal plan.
2. Client adds meals for each day.
3. Client adds ingredients, measurements, and macros for each meal.
4. App calculates meal, day, and week macro totals.
5. Client submits the weekly plan to their coach.
6. Coach reviews the plan.
7. Coach approves the plan or requests changes.
8. Client revises and resubmits if needed.
9. Approved plan becomes the active plan for the week.

### Daily Check-In Loop

1. Client opens the app and sees today’s approved meal plan.
2. For each meal, client indicates:
   - Followed as planned
   - Modified
   - Skipped

3. If modified, client notes what changed.
4. App captures deviation details and recalculates estimated macro difference when possible.
5. Client submits daily check-in.
6. Coach receives the check-in as part of the daily group summary.

### Coach Review Loop

1. Coach receives a daily digest for each group.
2. Digest shows:
   - Who checked in
   - Who did not check in
   - Who followed plan
   - Who deviated
   - Which clients need attention

3. Coach can open a client’s check-in to review details.
4. Coach can leave feedback if comments are included in MVP scope.

## 5. MVP Scope

### In Scope

The MVP includes:

- Client account access
- Coach account access
- Coach-created group
- Client membership in a group
- Weekly meal planning
- Meal creation by day
- Ingredient entry
- Measurement entry
- Macro entry/calculation
- Meal, day, and week macro summaries
- Submit weekly plan for coach approval
- Coach approval workflow
- Daily adherence check-in
- Deviation capture
- Daily coach group digest
- Basic notifications
- Private coach-client visibility
- PWA installability
- Mobile-first responsive experience

### Out of Scope for MVP

The MVP does not include:

- Public group feed
- Group-visible meal logs
- Recipe sharing
- Photo-based food recognition
- AI meal generation
- Grocery lists
- In-app coach-client chat
- Advanced nutrition recommendations
- Wearable integrations
- Payment processing
- Full nutrition coaching curriculum
- Meal delivery integrations
- Complex habit tracking
- Leaderboards or streaks

## 6. Key Product Principles

### Plan First, Log Less

The weekly plan should reduce daily logging. The user should not need to recreate meals every day.

### Accuracy Through Structure

The app should prioritize accurate ingredient, measurement, and macro data during planning.

### Daily Check-Ins Should Be Fast

Daily check-ins should feel like confirming a checklist, not filling out a food diary.

### Deviations Matter More Than Perfect Logs

The coach needs to know where reality diverged from the plan.

### Private by Default

Meal plans, check-ins, deviations, and coach feedback should be private between the client and coach.

### Coach Attention Should Be Exception-Based

The coach dashboard and digest should prioritize clients who need review, not force coaches to inspect every detail manually.

## 7. Core Data Objects

### User

Fields:

- User ID
- Name
- Email
- Role: client or coach
- Time zone
- Notification preferences
- Created date

### Group

Fields:

- Group ID
- Group name
- Coach ID
- Client IDs
- Program start date
- Program end date, optional
- Check-in settings
- Digest settings

### Weekly Meal Plan

Fields:

- Plan ID
- Client ID
- Coach ID
- Group ID
- Week start date
- Week end date
- Status
- Submitted date
- Approved date
- Created date
- Updated date

Statuses:

- Draft
- Submitted
- Needs changes
- Approved
- Active
- Completed
- Changed after approval

### Day Plan

Fields:

- Day ID
- Plan ID
- Date
- Meals
- Total calories
- Total protein
- Total carbs
- Total fat
- Optional fiber
- Completion status

### Meal

Fields:

- Meal ID
- Day ID
- Meal name
- Meal type: breakfast, lunch, dinner, snack, other
- Ingredients
- Meal notes
- Calories
- Protein
- Carbs
- Fat
- Optional fiber

### Ingredient

Fields:

- Ingredient ID
- Meal ID
- Ingredient name
- Quantity
- Unit
- Calories
- Protein
- Carbs
- Fat
- Optional fiber
- Source, optional
- User-confirmed flag

### Daily Check-In

Fields:

- Check-in ID
- Client ID
- Coach ID
- Group ID
- Date
- Plan ID
- Status
- Submitted date
- Meal adherence records
- Daily notes

Statuses:

- Not started
- In progress
- Submitted
- Missed

### Meal Adherence Record

Fields:

- Meal ID
- Planned meal reference
- Adherence status
- Deviation type
- Deviation notes
- Adjusted calories
- Adjusted protein
- Adjusted carbs
- Adjusted fat

Adherence statuses:

- Followed as planned
- Mostly followed
- Modified
- Skipped

Deviation types:

- Ingredient swap
- Portion change
- Added food
- Removed food
- Different meal
- Ate at different time
- Missed meal
- Other

### Coach Feedback

Fields:

- Feedback ID
- Coach ID
- Client ID
- Related plan ID
- Related meal ID, optional
- Related check-in ID, optional
- Comment text
- Created date
- Read status

## 8. Client Requirements

### 8.1 Client Onboarding

The client must be able to:

- Create or access an account.
- Join a coach’s group through an invite link or code.
- Confirm their name and basic profile details.
- See the current program/group they belong to.

Acceptance criteria:

- A client can join a group from a coach-provided invite.
- A client cannot see other clients’ meal plans or check-ins.
- A client lands on either the current week plan or today’s check-in after login.

### 8.2 Weekly Plan Creation

The client must be able to:

- Create a meal plan for a specific week.
- Add meals to each day.
- Label meals by type.
- Add ingredients to each meal.
- Enter ingredient quantities and units.
- Enter or confirm macros for each ingredient.
- See calculated macros at meal, day, and week levels.

Acceptance criteria:

- A client can create a complete weekly meal plan.
- A client can see whether any meals are missing macros or measurements.
- The app calculates totals automatically from ingredient-level data.
- The client can save a draft before submitting.

### 8.3 Reuse and Duplication

The client must be able to:

- Copy a meal to another day.
- Copy an entire day to another day.
- Save a meal for reuse.
- Reuse a saved meal in the current week.

Acceptance criteria:

- A client can duplicate common meals without rebuilding them from scratch.
- Duplicated meals preserve ingredients, measurements, and macros.
- The client can edit duplicated meals without changing the original saved meal.

### 8.4 Submit Plan for Approval

The client must be able to:

- Review the weekly plan before submission.
- See macro totals by day and week.
- Submit the plan to their coach.
- See submission status.

Acceptance criteria:

- A client cannot submit a plan if required meal data is missing.
- After submission, the plan status changes to Submitted.
- The coach receives a notification or dashboard item for the submitted plan.
- The client can see when the plan is Approved or Needs changes.

### 8.5 Daily Check-In

The client must be able to:

- Open today’s approved plan.
- Mark each planned meal as followed, mostly followed, modified, or skipped.
- Add notes when a meal was modified or skipped.
- Submit the daily check-in.

Acceptance criteria:

- A client can complete a daily check-in in under one minute if they followed the plan.
- A client only needs to enter deviation details when something changed.
- The app clearly shows whether today’s check-in has been submitted.
- The coach can see the submitted check-in.

### 8.6 Deviation Capture

When a client deviates from the plan, the app must allow them to record:

- What changed
- Which meal changed
- Whether the change affected ingredients or portions
- Optional notes
- Optional updated macro estimate

Acceptance criteria:

- A deviation is tied to a specific planned meal.
- The original planned meal remains preserved.
- The coach can compare the planned meal to the actual/deviated meal.
- If adjusted macros are entered, the app shows the macro delta.

## 9. Coach Requirements

### 9.1 Coach Onboarding

The coach must be able to:

- Create or access a coach account.
- Create a group.
- Invite clients to the group.
- View clients in the group.

Acceptance criteria:

- A coach can create at least one group.
- A coach can generate an invite link or invite code.
- A coach can see which clients have joined.

### 9.2 Plan Review

The coach must be able to:

- See submitted weekly plans.
- Open a client’s submitted plan.
- Review meal, day, and week macro totals.
- Review ingredients and measurements.
- Approve the plan.
- Request changes.
- Leave comments, if included in MVP.

Acceptance criteria:

- A coach can approve a submitted plan.
- A coach can mark a plan as Needs changes.
- A client is notified when the coach takes action.
- Approved plans become active for daily check-ins.

### 9.3 Coach Group Dashboard

The coach must be able to see:

- All clients in a group.
- Current weekly plan status for each client.
- Current day check-in status for each client.
- Which clients have not submitted plans.
- Which clients need plan review.
- Which clients missed daily check-in.
- Which clients deviated from plan.

Acceptance criteria:

- The coach dashboard prioritizes clients needing attention.
- The coach can filter by plan status and check-in status.
- The coach can open a client record from the dashboard.

### 9.4 Daily Group Digest

The coach must receive a daily summary of group check-ins.

Digest should include:

- Total clients in group
- Number checked in
- Number not checked in
- Number who followed plan
- Number who mostly followed plan
- Number who modified meals
- Number who skipped meals
- Clients needing attention

Acceptance criteria:

- A digest is generated once per day.
- Digest timing is configurable by the coach.
- The digest links to the group dashboard.
- The digest does not send a separate alert for every individual check-in by default.

## 10. Notifications

### Client Notifications

The system should notify clients when:

- Their plan is approved.
- Their plan needs changes.
- A daily check-in is due.
- A daily check-in was missed.
- The coach leaves feedback, if comments are included.

### Coach Notifications

The system should notify coaches when:

- A client submits a weekly plan.
- A plan needs coach review.
- The daily group digest is ready.
- A client has a major deviation, if urgent alerts are included later.

MVP recommendation:

- Use digest-first coach notifications.
- Avoid instant notifications for every client check-in.

## 11. Privacy and Access Requirements

The system must:

- Keep client plans private between the client and coach.
- Prevent clients from viewing other clients’ meal plans or check-ins.
- Make group-level sharing unavailable in the MVP.
- Clearly communicate who can see submitted plans and check-ins.
- Require authentication for coach and client access.
- Protect private nutrition and behavior data.

Acceptance criteria:

- A client can only access their own plans and check-ins.
- A coach can only access groups and clients assigned to them.
- Group members cannot browse each other’s logs.
- Shared links, if used, must be private and revocable.

## 12. PWA Requirements

The app should be:

- Mobile-first
- Installable as a PWA
- Responsive for desktop coach workflows
- Usable in modern mobile browsers
- Capable of push notifications where supported
- Designed for fast daily check-ins

Recommended PWA capabilities:

- Add to home screen
- Service worker caching
- Offline-safe draft editing
- Background sync for check-ins when connection returns
- Push notifications for reminders and coach updates

## 13. MVP Screen Inventory

### Client Screens

- Login / Sign up
- Join group
- Client home
- Weekly plan overview
- Day plan detail
- Meal editor
- Ingredient editor
- Saved meals
- Submit plan review
- Plan approval status
- Today’s check-in
- Deviation detail
- Check-in submitted confirmation
- Notifications / feedback

### Coach Screens

- Coach login
- Coach dashboard
- Group overview
- Client list
- Submitted plans queue
- Weekly plan review
- Client profile
- Daily check-in detail
- Daily group digest
- Group settings
- Invite clients

## 14. Primary Client Screens

### Client Home

Purpose:

Show the client what matters now.

Should include:

- Current group/program
- Current week plan status
- Today’s check-in status
- Primary action:
  - Create plan
  - Continue plan
  - Submit plan
  - Complete check-in

### Weekly Plan Overview

Purpose:

Help the client build and review their weekly plan.

Should include:

- Days of the week
- Meals per day
- Macro totals by day
- Plan completion status
- Submit button
- Copy/reuse actions

### Day Plan Detail

Purpose:

Let the client plan one day at a time.

Should include:

- Meal cards
- Meal type
- Meal macro total
- Add meal button
- Copy meal button
- Day macro total

### Meal Editor

Purpose:

Let the client build an accurate meal.

Should include:

- Meal name
- Meal type
- Ingredient list
- Add ingredient
- Measurement fields
- Macro fields
- Meal total
- Save meal option

### Today’s Check-In

Purpose:

Let the client quickly confirm adherence.

Should include:

- Today’s planned meals
- Per-meal adherence buttons
- Deviation prompt only when needed
- Daily macro summary
- Submit check-in button

## 15. Primary Coach Screens

### Coach Dashboard

Purpose:

Show what needs attention.

Should include:

- Groups
- Submitted plans awaiting review
- Clients missing plans
- Clients missing check-ins
- Clients with deviations
- Daily digest summary

### Plan Review Screen

Purpose:

Let the coach approve or request changes.

Should include:

- Client name
- Week dates
- Daily macro totals
- Meal details
- Ingredients and measurements
- Comments
- Approve button
- Request changes button

### Daily Group Digest

Purpose:

Summarize group adherence.

Should include:

- Check-in completion rate
- Followed plan count
- Modified count
- Skipped count
- Missed check-in count
- Attention-needed list
- Links to client details

## 16. Macro and Nutrition Requirements

The app must calculate macros from planned meal data.

Minimum macro fields:

- Calories
- Protein
- Carbs
- Fat

Recommended additional field:

- Fiber

The app should support:

- Ingredient-level macro entry
- Meal-level macro totals
- Day-level macro totals
- Week-level macro totals
- Planned vs. actual/deviation macro comparison

MVP nutrition data options:

- Manual macro entry
- Searchable ingredient database
- Barcode lookup for packaged foods, if feasible
- Saved client meals

For MVP accuracy, every planned ingredient should have:

- Food name
- Quantity
- Unit
- Macro values
- Confirmation state

## 17. State Model

### Weekly Plan States

- Draft
- Submitted
- Needs changes
- Approved
- Active
- Completed
- Changed after approval

Rules:

- A draft plan is editable by the client.
- A submitted plan is awaiting coach review.
- A plan marked Needs changes requires client revision.
- An approved plan becomes the source of truth for daily check-ins.
- Edits after approval should create a Changed after approval state or a new revision.

### Daily Check-In States

- Not started
- In progress
- Submitted
- Missed

Rules:

- A daily check-in is generated from the approved plan.
- A client can submit one check-in per day.
- The original planned meals remain preserved.
- Deviations are recorded separately from the approved plan.

## 18. Success Metrics

### Client Metrics

- Percentage of clients who submit a weekly plan
- Time to create first weekly plan
- Percentage of plans approved without changes
- Daily check-in completion rate
- Average time to complete daily check-in
- Percentage of meals marked followed as planned
- Percentage of meals with deviations
- Repeat usage week over week

### Coach Metrics

- Number of plans reviewed per week
- Average time to approve a plan
- Number of clients reviewed per digest
- Percentage of clients needing attention
- Coach response rate to plan submissions
- Coach retention by group

### Product Metrics

- Weekly active clients
- Weekly active coaches
- Plan submission rate
- Check-in submission rate
- Notification open rate
- Plan revision rate
- Missed check-in rate

## 19. MVP Risks

### Planning Burden

Creating a full weekly plan with ingredients, measurements, and macros may feel heavy.

Mitigation:

- Support copying meals.
- Support copying days.
- Support saved meals.
- Support previous-week reuse.

### Nutrition Accuracy

Macro data may be inaccurate if users enter incorrect measurements or values.

Mitigation:

- Require explicit measurements.
- Show missing macro warnings.
- Support barcode or database lookup where feasible.
- Preserve coach review before plan activation.

### Coach Overload

Coaches may become overwhelmed if every client action generates a notification.

Mitigation:

- Use daily digest by default.
- Prioritize exception-based review.
- Sort by attention needed.

### Client Shame or Avoidance

Clients may avoid check-ins when they deviate from plan.

Mitigation:

- Use neutral language.
- Make deviations normal and easy to report.
- Avoid public group visibility.
- Avoid punitive streaks or rankings.

## 20. Open Questions

1. Should coaches be able to create meal templates for clients?
2. Should clients be able to use the app without a coach?
3. Should coach comments be included in the first MVP or added immediately after?
4. Should barcode scanning be included in MVP or phase two?
5. Should macro data come from manual entry, a nutrition database, or both?
6. Should clients be able to edit an approved plan, or should every change become a deviation?
7. Should check-ins be submitted meal-by-meal or once at the end of the day?
8. Should coaches receive only a daily digest or also urgent alerts for major deviations?
9. Should the app support multiple groups per coach in MVP?
10. Should the client see weekly adherence trends in MVP?

## 21. Recommended MVP Build Order

### Phase 1: Foundation

- User accounts
- Coach/client roles
- Groups
- Client invites
- Basic permissions

### Phase 2: Weekly Planning

- Weekly plan creation
- Day and meal structure
- Ingredient entry
- Macro totals
- Save draft
- Submit plan

### Phase 3: Coach Approval

- Coach plan review
- Approve plan
- Request changes
- Plan status tracking
- Client notifications

### Phase 4: Daily Check-In

- Generate daily check-in from approved plan
- Followed/modified/skipped statuses
- Deviation notes
- Submit check-in
- Check-in status tracking

### Phase 5: Coach Digest

- Group daily summary
- Missed check-ins
- Deviations
- Attention-needed sorting
- Coach notification

### Phase 6: Reuse and Accuracy Improvements

- Saved meals
- Copy meal
- Copy day
- Copy week
- Optional barcode support
- Improved ingredient database support

## 22. MVP Definition of Done

The MVP is complete when:

- A coach can create a group and invite clients.
- A client can create a weekly meal plan with ingredients, measurements, and macros.
- A client can submit the weekly plan to the coach.
- A coach can approve the plan or request changes.
- An approved plan becomes the basis for daily check-ins.
- A client can indicate each day whether they followed or deviated from the plan.
- A coach receives a daily group summary of check-ins.
- Client data is private between client and coach.
- The app works well on mobile as a PWA.
