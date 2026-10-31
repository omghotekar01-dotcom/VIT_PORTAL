-- Run AFTER you register and verify YOUR OWN account through the website.
-- Replace the placeholder with your exact college account email.
-- Run ONLY in your dedicated VIT D Portal project, using the Supabase SQL Editor.
-- No frontend code or student can grant admin access.

insert into public.portal_admins (user_id)
select u.id from auth.users u
where lower(u.email) = lower('YOUR_VERIFIED_ADMIN_EMAIL@vit.edu')
  and u.email_confirmed_at is not null
on conflict (user_id) do nothing;

-- Verify: this should show exactly one row after the substitution and registration.
select m.full_name, m.email, a.granted_at
from public.portal_admins a join public.portal_members m on m.user_id = a.user_id;
