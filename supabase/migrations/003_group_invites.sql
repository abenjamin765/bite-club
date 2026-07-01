-- 003_group_invites.sql
-- Adds shareable invite codes to groups and a safe self-join path for clients.
--
-- Why an RPC: group_members RLS (002) only allows a coach to insert members.
-- A client joining by code needs to insert their own membership without being
-- able to add anyone else. A SECURITY DEFINER function scoped to auth.uid()
-- is the standard Supabase pattern for this.

alter table public.groups
  add column if not exists invite_code text;

-- Backfill any existing groups with a code, then enforce presence + uniqueness.
update public.groups
  set invite_code = upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6))
  where invite_code is null;

alter table public.groups
  alter column invite_code set not null;

create unique index if not exists groups_invite_code_key
  on public.groups (invite_code);

-- Self-join by code. Runs as definer so the membership insert bypasses the
-- coach-only write policy, but only ever inserts the *calling* user.
create or replace function public.join_group_by_code(code text)
returns public.groups
language plpgsql
security definer
set search_path = public
as $$
declare
  target public.groups;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  select * into target
  from public.groups
  where invite_code = upper(trim(code));

  if not found then
    raise exception 'No group found for that code';
  end if;

  insert into public.group_members (group_id, user_id)
  values (target.id, auth.uid())
  on conflict (group_id, user_id) do nothing;

  return target;
end;
$$;

grant execute on function public.join_group_by_code(text) to authenticated;
