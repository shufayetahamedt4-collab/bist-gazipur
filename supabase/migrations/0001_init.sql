-- ============================================================================
-- BIST Gazipur — Phase 1 schema
--
-- One row per person, with a variable number of roles. 39 faculty + 8 officers
-- in the mirrored roster resolve to 39 people, because every officer also
-- appears in the teaching roster. Modelling people and roles separately is what
-- makes a single profile page able to show both.
--
-- Apply with either:
--   supabase db push                       (CLI, linked project)
--   or paste this file into the SQL editor (dashboard)
--
-- Everything below is idempotent, so re-running it is safe.
-- ============================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Staff allow-list
--
-- Membership of this table is what "is a member of staff" means. It is the only
-- place a role is granted, so a client can never promote itself by sending a
-- role in a request body.
-- ---------------------------------------------------------------------------
create table if not exists public.staff (
  user_id      uuid primary key references auth.users (id) on delete cascade,
  app_role     text not null default 'editor' check (app_role in ('editor', 'admin')),
  display_name text,
  created_at   timestamptz not null default now()
);

-- Security definer so policies elsewhere can call these without the caller
-- needing (or being able to read) the staff table directly.
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.staff where user_id = auth.uid());
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.staff where user_id = auth.uid() and app_role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- Units: programmes and offices
-- ---------------------------------------------------------------------------
create table if not exists public.units (
  code          text primary key,
  name_en       text not null,
  name_bn       text,
  kind          text not null check (kind in ('department', 'office')),
  display_order int not null default 0,
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- People
-- ---------------------------------------------------------------------------
create table if not exists public.people (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name_en       text not null,
  name_bn       text,
  qualifications text,
  status_flags  text[] not null default '{}',
  photo_url     text,
  cv_url        text,
  short_bio_en  text,
  short_bio_bn  text,
  full_bio_en   text,
  full_bio_bn   text,
  email         text,
  phone         text,
  room_no       text,
  profile_url   text,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  updated_by    uuid references auth.users (id)
);

create index if not exists people_slug_idx      on public.people (slug);
create index if not exists people_published_idx on public.people (is_published);

-- ---------------------------------------------------------------------------
-- Roles: a person may teach and administrate at the same time
-- ---------------------------------------------------------------------------
create table if not exists public.person_roles (
  id              uuid primary key default gen_random_uuid(),
  person_id       uuid not null references public.people (id) on delete cascade,
  unit_code       text references public.units (code),
  role            text not null check (role in ('faculty', 'officer', 'leadership')),
  designation_en  text not null,
  designation_bn  text,
  responsibilities_en text,
  responsibilities_bn text,
  employment_type text,
  display_order   int not null default 0,
  is_primary      boolean not null default false,
  -- The id this role carried before the roster was unified, so existing links
  -- and React keys survive the migration.
  legacy_id       text,
  created_at      timestamptz not null default now(),
  unique (person_id, unit_code, role)
);

create index if not exists person_roles_person_idx on public.person_roles (person_id);
create index if not exists person_roles_unit_idx   on public.person_roles (unit_code);

-- ---------------------------------------------------------------------------
-- Repeatable profile sections
-- ---------------------------------------------------------------------------
create table if not exists public.education (
  id              uuid primary key default gen_random_uuid(),
  person_id       uuid not null references public.people (id) on delete cascade,
  degree          text not null,
  group_major     text,
  board_institute text,
  country         text,
  passing_year    int,
  display_order   int not null default 0
);

create table if not exists public.experience (
  id           uuid primary key default gen_random_uuid(),
  person_id    uuid not null references public.people (id) on delete cascade,
  role         text not null,
  organization text not null,
  from_year    int,
  to_year      int,
  is_current   boolean not null default false,
  display_order int not null default 0
);

create table if not exists public.publications (
  id        uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people (id) on delete cascade,
  title     text not null,
  venue     text,
  year      int,
  doi       text,
  url       text
);

create table if not exists public.awards (
  id        uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people (id) on delete cascade,
  title     text not null,
  body      text,
  year      int
);

create table if not exists public.memberships (
  id        uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people (id) on delete cascade,
  body      text not null,
  role      text,
  year      int
);

create table if not exists public.research_areas (
  id            uuid primary key default gen_random_uuid(),
  person_id     uuid not null references public.people (id) on delete cascade,
  label         text not null,
  display_order int not null default 0
);

create table if not exists public.identity_links (
  id        uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people (id) on delete cascade,
  kind      text not null check (kind in ('scholar', 'orcid', 'linkedin', 'scopus', 'researchgate')),
  url       text not null
);

create index if not exists education_person_idx      on public.education (person_id);
create index if not exists experience_person_idx     on public.experience (person_id);
create index if not exists publications_person_idx   on public.publications (person_id);
create index if not exists awards_person_idx         on public.awards (person_id);
create index if not exists memberships_person_idx    on public.memberships (person_id);
create index if not exists research_areas_person_idx on public.research_areas (person_id);
create index if not exists identity_links_person_idx on public.identity_links (person_id);

-- ---------------------------------------------------------------------------
-- updated_at maintenance
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists people_touch_updated_at on public.people;
create trigger people_touch_updated_at
  before update on public.people
  for each row execute function public.touch_updated_at();

-- ===========================================================================
-- Row Level Security
--
-- Every table is enabled and default-deny first, then granted explicitly.
-- A table left without RLS is readable AND writable by anyone holding the
-- public anon key, so the block at the end of this file asserts that none is.
-- ===========================================================================

alter table public.staff          enable row level security;
alter table public.units          enable row level security;
alter table public.people         enable row level security;
alter table public.person_roles   enable row level security;
alter table public.education      enable row level security;
alter table public.experience     enable row level security;
alter table public.publications   enable row level security;
alter table public.awards         enable row level security;
alter table public.memberships    enable row level security;
alter table public.research_areas enable row level security;
alter table public.identity_links enable row level security;

-- staff: a member may read their own row; admins manage the list.
drop policy if exists staff_read_self on public.staff;
create policy staff_read_self on public.staff
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists staff_admin_write on public.staff;
create policy staff_admin_write on public.staff
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- units: public read, staff write.
drop policy if exists units_public_read on public.units;
create policy units_public_read on public.units
  for select to anon, authenticated
  using (true);

drop policy if exists units_staff_write on public.units;
create policy units_staff_write on public.units
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- people: anonymous visitors see published people only.
drop policy if exists people_public_read on public.people;
create policy people_public_read on public.people
  for select to anon, authenticated
  using (is_published or public.is_staff());

drop policy if exists people_staff_write on public.people;
create policy people_staff_write on public.people
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- person_roles: readable when the parent person is readable. The subquery on
-- people is itself filtered by people_public_read, which is what keeps an
-- unpublished person's roles out of the anon API.
drop policy if exists person_roles_public_read on public.person_roles;
create policy person_roles_public_read on public.person_roles
  for select to anon, authenticated
  using (
    exists (
      select 1 from public.people p
      where p.id = person_roles.person_id and p.is_published
    )
  );

drop policy if exists person_roles_staff_write on public.person_roles;
create policy person_roles_staff_write on public.person_roles
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- Child sections: same visibility rule as the parent person.
do $$
declare
  t text;
  child_tables text[] := array[
    'education', 'experience', 'publications', 'awards',
    'memberships', 'research_areas', 'identity_links'
  ];
begin
  foreach t in array child_tables loop
    execute format('drop policy if exists %I_public_read on public.%I', t, t);
    execute format($f$
      create policy %I_public_read on public.%I
        for select to anon, authenticated
        using (
          exists (
            select 1 from public.people p
            where p.id = %I.person_id and p.is_published
          )
        )
    $f$, t, t, t);

    execute format('drop policy if exists %I_staff_write on public.%I', t, t);
    execute format($f$
      create policy %I_staff_write on public.%I
        for all to authenticated
        using (public.is_staff())
        with check (public.is_staff())
    $f$, t, t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Storage: portraits and downloadable CVs
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('portraits', 'portraits', true), ('cvs', 'cvs', true)
on conflict (id) do nothing;

drop policy if exists media_public_read on storage.objects;
create policy media_public_read on storage.objects
  for select to anon, authenticated
  using (bucket_id in ('portraits', 'cvs'));

drop policy if exists media_staff_insert on storage.objects;
create policy media_staff_insert on storage.objects
  for insert to authenticated
  with check (bucket_id in ('portraits', 'cvs') and public.is_staff());

drop policy if exists media_staff_update on storage.objects;
create policy media_staff_update on storage.objects
  for update to authenticated
  using (bucket_id in ('portraits', 'cvs') and public.is_staff())
  with check (bucket_id in ('portraits', 'cvs') and public.is_staff());

drop policy if exists media_staff_delete on storage.objects;
create policy media_staff_delete on storage.objects
  for delete to authenticated
  using (bucket_id in ('portraits', 'cvs') and public.is_staff());

-- ===========================================================================
-- Assertion: fails loudly if any table we just created is missing RLS.
-- ===========================================================================
do $$
declare
  t text;
  without_rls text[] := '{}';
  our_tables text[] := array[
    'staff', 'units', 'people', 'person_roles', 'education', 'experience',
    'publications', 'awards', 'memberships', 'research_areas', 'identity_links'
  ];
begin
  foreach t in array our_tables loop
    if not exists (
      select 1 from pg_tables
      where schemaname = 'public' and tablename = t and rowsecurity = true
    ) then
      without_rls := without_rls || t;
    end if;
  end loop;

  if array_length(without_rls, 1) > 0 then
    raise exception 'Row Level Security is NOT enabled on: %', array_to_string(without_rls, ', ');
  end if;

  raise notice 'Phase 1 schema applied; RLS enabled on all % tables.', array_length(our_tables, 1);
end $$;
