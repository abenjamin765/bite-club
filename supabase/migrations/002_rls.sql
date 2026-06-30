-- 002_rls.sql
-- Row Level Security policies.

alter table public.users enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.weekly_meal_plans enable row level security;
alter table public.day_plans enable row level security;
alter table public.meals enable row level security;
alter table public.ingredients enable row level security;
alter table public.saved_meals enable row level security;
alter table public.daily_check_ins enable row level security;
alter table public.meal_adherence_records enable row level security;

drop policy if exists users_self_select on public.users;
create policy users_self_select
  on public.users
  for select
  using (id = auth.uid());

drop policy if exists users_self_update on public.users;
create policy users_self_update
  on public.users
  for update
  using (id = auth.uid())
  with check (id = auth.uid());

drop policy if exists users_self_insert on public.users;
create policy users_self_insert
  on public.users
  for insert
  with check (id = auth.uid());

drop policy if exists groups_client_or_coach_select on public.groups;
create policy groups_client_or_coach_select
  on public.groups
  for select
  using (
    coach_id = auth.uid()
    or exists (
      select 1
      from public.group_members gm
      where gm.group_id = groups.id and gm.user_id = auth.uid()
    )
  );

drop policy if exists groups_coach_write on public.groups;
create policy groups_coach_write
  on public.groups
  for all
  using (coach_id = auth.uid())
  with check (coach_id = auth.uid());

drop policy if exists group_members_visibility on public.group_members;
create policy group_members_visibility
  on public.group_members
  for select
  using (
    user_id = auth.uid()
    or exists (
      select 1
      from public.groups g
      where g.id = group_members.group_id and g.coach_id = auth.uid()
    )
  );

drop policy if exists group_members_manage_by_coach on public.group_members;
create policy group_members_manage_by_coach
  on public.group_members
  for all
  using (
    exists (
      select 1
      from public.groups g
      where g.id = group_members.group_id and g.coach_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.groups g
      where g.id = group_members.group_id and g.coach_id = auth.uid()
    )
  );

drop policy if exists plans_client_or_coach_select on public.weekly_meal_plans;
create policy plans_client_or_coach_select
  on public.weekly_meal_plans
  for select
  using (
    client_id = auth.uid()
    or exists (
      select 1
      from public.groups g
      where g.id = weekly_meal_plans.group_id and g.coach_id = auth.uid()
    )
  );

drop policy if exists plans_client_write on public.weekly_meal_plans;
create policy plans_client_write
  on public.weekly_meal_plans
  for all
  using (client_id = auth.uid())
  with check (client_id = auth.uid());

drop policy if exists plans_coach_update on public.weekly_meal_plans;
create policy plans_coach_update
  on public.weekly_meal_plans
  for update
  using (
    exists (
      select 1
      from public.groups g
      where g.id = weekly_meal_plans.group_id and g.coach_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.groups g
      where g.id = weekly_meal_plans.group_id and g.coach_id = auth.uid()
    )
  );

drop policy if exists day_plans_through_plan on public.day_plans;
create policy day_plans_through_plan
  on public.day_plans
  for all
  using (
    exists (
      select 1
      from public.weekly_meal_plans p
      where p.id = day_plans.plan_id
        and (
          p.client_id = auth.uid()
          or exists (
            select 1
            from public.groups g
            where g.id = p.group_id and g.coach_id = auth.uid()
          )
        )
    )
  )
  with check (
    exists (
      select 1
      from public.weekly_meal_plans p
      where p.id = day_plans.plan_id
        and (
          p.client_id = auth.uid()
          or exists (
            select 1
            from public.groups g
            where g.id = p.group_id and g.coach_id = auth.uid()
          )
        )
    )
  );

drop policy if exists meals_through_day on public.meals;
create policy meals_through_day
  on public.meals
  for all
  using (
    exists (
      select 1
      from public.day_plans dp
      join public.weekly_meal_plans p on p.id = dp.plan_id
      where dp.id = meals.day_plan_id
        and (
          p.client_id = auth.uid()
          or exists (
            select 1 from public.groups g
            where g.id = p.group_id and g.coach_id = auth.uid()
          )
        )
    )
  )
  with check (
    exists (
      select 1
      from public.day_plans dp
      join public.weekly_meal_plans p on p.id = dp.plan_id
      where dp.id = meals.day_plan_id
        and (
          p.client_id = auth.uid()
          or exists (
            select 1 from public.groups g
            where g.id = p.group_id and g.coach_id = auth.uid()
          )
        )
    )
  );

drop policy if exists ingredients_through_meal on public.ingredients;
create policy ingredients_through_meal
  on public.ingredients
  for all
  using (
    exists (
      select 1
      from public.meals m
      join public.day_plans dp on dp.id = m.day_plan_id
      join public.weekly_meal_plans p on p.id = dp.plan_id
      where m.id = ingredients.meal_id
        and (
          p.client_id = auth.uid()
          or exists (
            select 1 from public.groups g
            where g.id = p.group_id and g.coach_id = auth.uid()
          )
        )
    )
  )
  with check (
    exists (
      select 1
      from public.meals m
      join public.day_plans dp on dp.id = m.day_plan_id
      join public.weekly_meal_plans p on p.id = dp.plan_id
      where m.id = ingredients.meal_id
        and (
          p.client_id = auth.uid()
          or exists (
            select 1 from public.groups g
            where g.id = p.group_id and g.coach_id = auth.uid()
          )
        )
    )
  );

drop policy if exists saved_meals_owner on public.saved_meals;
create policy saved_meals_owner
  on public.saved_meals
  for all
  using (client_id = auth.uid())
  with check (client_id = auth.uid());

drop policy if exists checkins_client_or_coach_select on public.daily_check_ins;
create policy checkins_client_or_coach_select
  on public.daily_check_ins
  for select
  using (
    client_id = auth.uid()
    or exists (
      select 1
      from public.weekly_meal_plans p
      join public.groups g on g.id = p.group_id
      where p.id = daily_check_ins.plan_id
        and g.coach_id = auth.uid()
    )
  );

drop policy if exists checkins_client_write on public.daily_check_ins;
create policy checkins_client_write
  on public.daily_check_ins
  for all
  using (client_id = auth.uid())
  with check (client_id = auth.uid());

drop policy if exists mar_through_checkin on public.meal_adherence_records;
create policy mar_through_checkin
  on public.meal_adherence_records
  for all
  using (
    exists (
      select 1
      from public.daily_check_ins ci
      join public.weekly_meal_plans p on p.id = ci.plan_id
      join public.groups g on g.id = p.group_id
      where ci.id = meal_adherence_records.check_in_id
        and (
          ci.client_id = auth.uid()
          or g.coach_id = auth.uid()
        )
    )
  )
  with check (
    exists (
      select 1
      from public.daily_check_ins ci
      join public.weekly_meal_plans p on p.id = ci.plan_id
      join public.groups g on g.id = p.group_id
      where ci.id = meal_adherence_records.check_in_id
        and ci.client_id = auth.uid()
    )
  );
