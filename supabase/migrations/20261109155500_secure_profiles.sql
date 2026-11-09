begin;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null
    check (char_length(btrim(full_name)) between 1 and 120),
  terms_version text not null,
  terms_accepted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

revoke all on table public.profiles from anon, authenticated;
grant select on table public.profiles to authenticated;
grant update (full_name) on table public.profiles to authenticated;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  submitted_name text;
  submitted_terms_version text;
begin
  submitted_name := left(btrim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), 120);
  submitted_terms_version := new.raw_user_meta_data ->> 'terms_version';

  if submitted_name = ''
    or new.raw_user_meta_data ->> 'terms_accepted' is distinct from 'true'
    or submitted_terms_version is distinct from '2026-11-09-v1' then
    raise exception 'Required profile and terms acceptance data is missing.';
  end if;

  insert into public.profiles (id, full_name, terms_version, terms_accepted_at)
  values (new.id, submitted_name, submitted_terms_version, statement_timestamp());

  return new;
end;
$$;

revoke all on function public.create_profile_for_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute function public.create_profile_for_new_user();

commit;
