-- 001_schema.sql
-- Core schema for Coach-Led Meal Planning MVP.

create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type app_role as enum ('client', 'coach');
  end if;

  if not exists (select 1 from pg_type where typname = 'plan_status') then
    create type plan_status as enum (
      'draft',
      'submitted',
      'needs_changes',
      'approved',
      'active',
      'completed',
      'changed_after_approval'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'checkin_status') then
    create type checkin_status as enum ('not_started', 'in_progress', 'submitted');
  end if;

  if not exists (select 1 from pg_type where typname = 'mar_status') then
    create type mar_status as enum ('followed', 'modified', 'skipped');
  end if;
end
$$;

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  name text not null,
  role app_role not null,
  time_zone text not null default 'UTC',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid not null references public.users (id) on delete restrict,
  name text not null,
  digest_time time not null default time '20:00',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.group_members (
  group_id uuid not null references public.groups (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (group_id, user_id)
);

create table if not exists public.weekly_meal_plans (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.users (id) on delete cascade,
  group_id uuid not null references public.groups (id) on delete cascade,
  week_start date not null,
  week_end date not null,
  status plan_status not null default 'draft',
  submitted_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint week_dates_valid check (week_end >= week_start),
  unique (client_id, week_start)
);

create table if not exists public.day_plans (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.weekly_meal_plans (id) on delete cascade,
  date date not null,
  position smallint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (plan_id, date)
);

create table if not exists public.meals (
  id uuid primary key default gen_random_uuid(),
  day_plan_id uuid not null references public.day_plans (id) on delete cascade,
  name text not null,
  type text not null,
  position smallint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ingredients (
  id uuid primary key default gen_random_uuid(),
  meal_id uuid not null references public.meals (id) on delete cascade,
  name text not null,
  quantity numeric(10, 2) not null default 0,
  unit text not null default 'serving',
  calories numeric(10, 2) not null default 0,
  protein numeric(10, 2) not null default 0,
  carbs numeric(10, 2) not null default 0,
  fat numeric(10, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.saved_meals (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.users (id) on delete cascade,
  name text not null,
  ingredients jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.daily_check_ins (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.users (id) on delete cascade,
  plan_id uuid not null references public.weekly_meal_plans (id) on delete cascade,
  date date not null,
  status checkin_status not null default 'not_started',
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, date)
);

create table if not exists public.meal_adherence_records (
  id uuid primary key default gen_random_uuid(),
  check_in_id uuid not null references public.daily_check_ins (id) on delete cascade,
  meal_id uuid not null references public.meals (id) on delete cascade,
  status mar_status,
  deviation_type text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (check_in_id, meal_id)
);

create index if not exists idx_groups_coach on public.groups (coach_id);
create index if not exists idx_group_members_user on public.group_members (user_id);
create index if not exists idx_plans_client on public.weekly_meal_plans (client_id, week_start);
create index if not exists idx_day_plans_plan on public.day_plans (plan_id, date);
create index if not exists idx_meals_day on public.meals (day_plan_id, position);
create index if not exists idx_ingredients_meal on public.ingredients (meal_id);
create index if not exists idx_saved_meals_client on public.saved_meals (client_id);
create index if not exists idx_checkins_client_date on public.daily_check_ins (client_id, date);
create index if not exists idx_mar_checkin on public.meal_adherence_records (check_in_id);
