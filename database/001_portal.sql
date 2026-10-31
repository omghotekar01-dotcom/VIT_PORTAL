-- VIT D Portal: run in the SQL editor of a NEW, dedicated Supabase project.
-- Does not reference or change any other user's Supabase project.
-- Only a trusted SQL editor/database owner may grant the first admin account.

create schema if not exists portal_private;
revoke all on schema portal_private from public, anon;
grant usage on schema portal_private to authenticated;

create table if not exists public.portal_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  granted_at timestamptz not null default now()
);

create table if not exists public.portal_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null check (char_length(trim(full_name)) between 3 and 100),
  prn text not null unique check (prn ~ '^[0-9]{10}$'),
  roll_no text unique check (roll_no is null or roll_no ~ '^[0-9]{1,15}$'),
  division text not null default 'D' check (division = 'D'),
  batch text not null check (batch in ('1','2','3')),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint portal_vit_email check (email = lower(email) and email like '%@vit.edu')
);

create table if not exists public.portal_sessions (
  id bigint generated always as identity primary key,
  division text not null default 'D' check (division='D'),
  batch text check (batch is null or batch in ('1','2','3')),
  weekday smallint not null check (weekday between 0 and 6),
  start_time time without time zone not null,
  end_time time without time zone not null,
  subject text not null check (char_length(trim(subject)) between 1 and 160),
  kind text not null default 'Lecture' check (kind in ('Lecture','Lab','Tutorial','Seminar','Other')),
  room text,
  faculty text,
  valid_from date,
  valid_to date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint portal_session_time check (end_time > start_time),
  constraint portal_session_date check (valid_from is null or valid_to is null or valid_from <= valid_to)
);
create index if not exists portal_sessions_day_idx on public.portal_sessions(weekday,start_time,batch);

create table if not exists public.portal_exceptions (
  id bigint generated always as identity primary key,
  session_id bigint not null references public.portal_sessions(id) on delete cascade,
  date date not null,
  cancelled boolean not null default false,
  subject text,
  room text,
  faculty text,
  start_time time without time zone,
  end_time time without time zone,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(session_id,date),
  constraint portal_exception_time check (start_time is null or end_time is null or end_time > start_time)
);
create index if not exists portal_exceptions_date_idx on public.portal_exceptions(date);

create table if not exists public.portal_notices (
  id bigint generated always as identity primary key,
  title text not null check (char_length(trim(title)) between 1 and 180),
  body text not null check (char_length(trim(body)) between 1 and 8000),
  category text not null default 'Academic' check (category in ('Academic','Exam','Class update','Event','Other')),
  published boolean not null default false,
  pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists portal_notices_published_idx on public.portal_notices(published,pinned,created_at desc);

-- Authorization helpers use a private, unexposed schema and a fixed search_path.
-- They are SECURITY DEFINER only to examine admin/member tables without RLS recursion.
create or replace function portal_private.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select (select auth.uid()) is not null and exists (
    select 1 from public.portal_admins a where a.user_id = (select auth.uid())
  );
$$;
create or replace function portal_private.is_approved()
returns boolean language sql stable security definer set search_path = '' as $$
  select (select auth.uid()) is not null and exists (
    select 1 from public.portal_members m
    where m.user_id = (select auth.uid()) and m.status = 'approved'
  );
$$;
create or replace function portal_private.my_batch()
returns text language sql stable security definer set search_path = '' as $$
  select m.batch from public.portal_members m
  where m.user_id=(select auth.uid()) and m.status='approved';
$$;
revoke all on function portal_private.is_admin() from public, anon;
revoke all on function portal_private.is_approved() from public, anon;
grant execute on function portal_private.is_admin() to authenticated;
grant execute on function portal_private.is_approved() to authenticated;
revoke all on function portal_private.my_batch() from public, anon;
grant execute on function portal_private.my_batch() to authenticated;

alter table public.portal_admins enable row level security;
alter table public.portal_members enable row level security;
alter table public.portal_sessions enable row level security;
alter table public.portal_exceptions enable row level security;
alter table public.portal_notices enable row level security;

-- Data API privileges are separate from RLS.
revoke all on public.portal_admins, public.portal_members, public.portal_sessions,
  public.portal_exceptions, public.portal_notices from anon;
grant select on public.portal_admins, public.portal_members to authenticated;
grant update(status,batch,roll_no) on public.portal_members to authenticated;
grant select, insert, update, delete on public.portal_sessions,
  public.portal_exceptions, public.portal_notices to authenticated;

-- The signed-in user can see their profile, but other students' data is admin-only.
drop policy if exists "own or admin member view" on public.portal_members;
create policy "own or admin member view" on public.portal_members
  for select to authenticated using (user_id = (select auth.uid()) or (select portal_private.is_admin()));
drop policy if exists "admin approves members" on public.portal_members;
create policy "admin approves members" on public.portal_members
  for update to authenticated
  using ((select portal_private.is_admin()))
  with check ((select portal_private.is_admin()));
drop policy if exists "admin checks own role" on public.portal_admins;
create policy "admin checks own role" on public.portal_admins
  for select to authenticated using (user_id = (select auth.uid()));

drop policy if exists "approved students or admin can read class schedule" on public.portal_sessions;
create policy "approved students or admin can read class schedule" on public.portal_sessions
  for select to authenticated using ((select portal_private.is_admin()) or ((select portal_private.is_approved()) and (batch is null or batch = (select portal_private.my_batch()))));
drop policy if exists "admin inserts class schedule" on public.portal_sessions;
create policy "admin inserts class schedule" on public.portal_sessions
  for insert to authenticated with check ((select portal_private.is_admin()));
drop policy if exists "admin updates class schedule" on public.portal_sessions;
create policy "admin updates class schedule" on public.portal_sessions
  for update to authenticated using ((select portal_private.is_admin())) with check ((select portal_private.is_admin()));
drop policy if exists "admin deletes class schedule" on public.portal_sessions;
create policy "admin deletes class schedule" on public.portal_sessions
  for delete to authenticated using ((select portal_private.is_admin()));

drop policy if exists "approved students or admin can read class exceptions" on public.portal_exceptions;
create policy "approved students or admin can read class exceptions" on public.portal_exceptions
  for select to authenticated using ((select portal_private.is_admin()) or ((select portal_private.is_approved()) and exists (
    select 1 from public.portal_sessions ps where ps.id=portal_exceptions.session_id
      and (ps.batch is null or ps.batch=(select portal_private.my_batch()))
  )));
drop policy if exists "admin inserts exceptions" on public.portal_exceptions;
create policy "admin inserts exceptions" on public.portal_exceptions
  for insert to authenticated with check ((select portal_private.is_admin()));
drop policy if exists "admin updates exceptions" on public.portal_exceptions;
create policy "admin updates exceptions" on public.portal_exceptions
  for update to authenticated using ((select portal_private.is_admin())) with check ((select portal_private.is_admin()));
drop policy if exists "admin deletes exceptions" on public.portal_exceptions;
create policy "admin deletes exceptions" on public.portal_exceptions
  for delete to authenticated using ((select portal_private.is_admin()));

drop policy if exists "approved students read published notices" on public.portal_notices;
create policy "approved students read published notices" on public.portal_notices
  for select to authenticated using ((select portal_private.is_admin()) or (published and (select portal_private.is_approved())));
drop policy if exists "admin creates notices" on public.portal_notices;
create policy "admin creates notices" on public.portal_notices
  for insert to authenticated with check ((select portal_private.is_admin()));
drop policy if exists "admin edits notices" on public.portal_notices;
create policy "admin edits notices" on public.portal_notices
  for update to authenticated using ((select portal_private.is_admin())) with check ((select portal_private.is_admin()));
drop policy if exists "admin deletes notices" on public.portal_notices;
create policy "admin deletes notices" on public.portal_notices
  for delete to authenticated using ((select portal_private.is_admin()));

-- Member rows are CREATED ONLY on auth.users INSERT, never from the browser.
-- User-editable auth metadata is read once at signup and is NOT used for authorization.
create or replace function portal_private.handle_new_student()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  full_name text := trim(coalesce(new.raw_user_meta_data->>'full_name',''));
  prn text := trim(coalesce(new.raw_user_meta_data->>'prn',''));
  batch text := trim(coalesce(new.raw_user_meta_data->>'batch',''));
  roll text := trim(coalesce(new.raw_user_meta_data->>'roll_no',''));
begin
  if lower(coalesce(new.email,'')) !~ '^[a-z0-9._%+\-]+@vit\.edu$' then
    raise exception 'Only official VIT college email addresses are accepted';
  end if;
  if char_length(full_name) not between 3 and 100 or prn !~ '^[0-9]{10}$' or batch not in ('1','2','3') or (roll <> '' and roll !~ '^[0-9]{1,15}$') then
    raise exception 'Invalid student registration details';
  end if;
  insert into public.portal_members(user_id,email,full_name,prn,roll_no,division,batch,status)
  values(new.id,lower(new.email),full_name,prn,nullif(roll,''),'D',batch,'pending');
  return new;
end;
$$;
revoke all on function portal_private.handle_new_student() from public, anon, authenticated;
drop trigger if exists portal_create_student_on_signup on auth.users;
create trigger portal_create_student_on_signup after insert on auth.users
  for each row execute function portal_private.handle_new_student();

-- NOTE: For full protection configure Supabase Auth > Email > Confirm email ON.
-- NOTE: Do not configure a student/admin permission using raw_user_meta_data or a frontend email check.
-- NOTE: Do NOT grant service_role to this frontend. The publishable/anon key is sufficient with RLS.
