-- 005_user_profile_and_coach_visibility.sql
-- 1. Auto-create public.users row when auth.users is inserted (admin API, signup).
-- 2. Let coaches read profiles of clients in their groups.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role app_role;
begin
  begin
    v_role := coalesce((new.raw_user_meta_data->>'role')::app_role, 'client');
  exception
    when others then
      v_role := 'client';
  end;

  insert into public.users (id, email, name, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(
      nullif(trim(new.raw_user_meta_data->>'name'), ''),
      split_part(coalesce(new.email, 'user'), '@', 1)
    ),
    v_role
  )
  on conflict (id) do update
    set
      email = excluded.email,
      name = case
        when public.users.name = '' or public.users.name is null then excluded.name
        else public.users.name
      end;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Coaches need client names for digest, dashboard, and plan review.
drop policy if exists users_coach_select_group_members on public.users;
create policy users_coach_select_group_members
  on public.users
  for select
  using (
    id = auth.uid()
    or exists (
      select 1
      from public.group_members gm
      join public.groups g on g.id = gm.group_id
      where gm.user_id = users.id
        and g.coach_id = auth.uid()
    )
  );
