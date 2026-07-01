-- 004_fix_groups_rls_recursion.sql
-- Break infinite recursion between groups ↔ group_members RLS policies.
--
-- groups SELECT checked group_members, whose SELECT checked groups again.
-- Security-definer helpers bypass RLS for the membership lookup only.

create or replace function public.is_group_member(p_group_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.group_members gm
    where gm.group_id = p_group_id
      and gm.user_id = auth.uid()
  );
$$;

create or replace function public.is_group_coach(p_group_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.groups g
    where g.id = p_group_id
      and g.coach_id = auth.uid()
  );
$$;

grant execute on function public.is_group_member(uuid) to authenticated;
grant execute on function public.is_group_coach(uuid) to authenticated;

drop policy if exists groups_client_or_coach_select on public.groups;
create policy groups_client_or_coach_select
  on public.groups
  for select
  using (
    coach_id = auth.uid()
    or public.is_group_member(id)
  );

drop policy if exists group_members_visibility on public.group_members;
create policy group_members_visibility
  on public.group_members
  for select
  using (
    user_id = auth.uid()
    or public.is_group_coach(group_id)
  );
