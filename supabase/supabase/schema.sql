-- RD Agent Helper - Supabase schema
-- Run this once in your Supabase project: SQL Editor > New query > paste > Run.

-- Records table ------------------------------------------------------------
create table if not exists public.records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  alias integer not null,
  name text not null default '',
  phone text not null default '',
  ref text not null default '',
  amount numeric not null default 0,
  date date,
  notes text not null default '',
  paid jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create unique index if not exists records_user_alias on public.records (user_id, alias);
create unique index if not exists records_user_ref on public.records (user_id, ref) where ref <> '';

-- Profiles (one per agent; role is 'agent' or 'admin') ---------------------
create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text,
  role text not null default 'agent' check (role in ('agent', 'admin')),
  created_at timestamptz not null default now()
);

-- Admin check without recursive RLS on profiles.
create or replace function public.is_admin() returns boolean
language sql security definer stable set search_path = public as
$$ select exists (select 1 from public.profiles where user_id = auth.uid() and role = 'admin') $$;

-- Every new sign-up automatically gets an agent profile.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as
$$ begin
  insert into public.profiles (user_id, email) values (new.id, new.email)
  on conflict (user_id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row-level security --------------------------------------------------------
alter table public.records enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "own rows" on public.records;
drop policy if exists "own rows or admin" on public.records;
create policy "own rows or admin" on public.records
  for all
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "profiles read" on public.profiles;
create policy "profiles read" on public.profiles
  for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "profiles insert own" on public.profiles;
create policy "profiles insert own" on public.profiles
  for insert with check (auth.uid() = user_id);

-- NOTE: roles can only be changed with the service role (SQL Editor), never
-- from the app. To make someone an admin, sign them up in the app first, then
-- run in the SQL Editor:
--   update public.profiles set role = 'admin'
--   where user_id = (select id from auth.users where email = 'their@email');
