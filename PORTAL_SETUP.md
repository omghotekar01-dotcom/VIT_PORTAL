# VIT D Portal — AIML Division D

Student-made, independent, database-backed timetable and announcement portal for VIT Pune AIML Division D. Designed for an initial student-only release. This is **not** an official VIT Pune, VIERP or college authentication service.

## First release — what's real

- Student signup: `@vit.edu` email confirmation (when enabled) + new password, full name, PRN, optional roll number, and batch (B1/B2/B3).
- Supabase Auth sessions: no hard-coded demo users; password is never saved by this application.
- Database-generated, persistent student profile in **pending** state; only the designated portal administrator can approve/reject it.
- Admin-only students directory, timetable publisher and notice publisher. Database RLS enforces authorization; a hidden button is not considered security.
- Timetable: shared lectures, **three independent batch sections (B1/B2/B3)**, labs and tutorials; today and weekly views; date-effective entries, one-day cancellations/changes, room/faculty; sync every 30 seconds while open. Database RLS restricts students to their batch plus shared sessions.
- Notices: write drafts or publish announcements, pin them, and delete them.
- Responsive browser site installable as a PWA. Supabase/API requests are NEVER cached by the service worker.
- Published timetable and notices start **empty**. The timetable screenshots establish that B1/B2/B3 have distinct sessions, but individual session names, rooms, and timings must be checked carefully before publication. No schedule records have been invented.

## Hosting plan: free GitHub Pages + a separate Supabase project

Hosting is free on GitHub Pages for a public repository. A small class may fit Supabase's free tier, subject to its current usage limits and inactivity/pause rules. Neither is a paid uptime SLA. The static frontend needs no permanently running Express server, MongoDB or Vercel plan.

The existing Next.js/Express portal remains completely untouched; the new live application lives under `docs/`. This avoids the existing demo logins and mock student records without destroying the original code.

## 1. Create a dedicated Supabase project

Open https://supabase.com/dashboard, create **a NEW project** named, for example, `vit-d-portal`, and choose an India region if available. **Do not use or modify the existing `lost-and-found` project.**

Open **SQL Editor** inside the new project and run **`database/001_portal.sql`**. Verify that these five tables now exist:

- `portal_admins`
- `portal_members`
- `portal_sessions`
- `portal_exceptions`
- `portal_notices`

In **Authentication > Providers > Email**, keep **Confirm email ON**. The app requires a new, unique password; PRN is not a password. In **Authentication > URL Configuration** set the Site URL and redirect allow-list to your final GitHub Pages URL: `https://omghotekar01-dotcom.github.io/VIT_PORTAL/`.

In project **Connect** or **Settings > API keys**, copy the **Project URL** and the **publishable API key** (`sb_publishable_...`; legacy anon public key also works). Never copy `service_role` or `sb_secret_...` to the site. The public key is safe to publish only because RLS is enabled on all application tables.

Update `docs/config.js`:

```js
window.VIT_PORTAL_CONFIG = {
  supabaseUrl: 'https://YOUR_PROJECT_REF.supabase.co',
  publishableKey: 'sb_publishable_YOUR_PUBLIC_KEY'
};
```

`docs/config.js` is deliberately a public configuration file, **not a secret**. Never place a database password, service role, secret key, OAuth token, personal access token or server credential there.

## 2. Create your ONLY admin account

Once the website is configured, use **Create student account** and sign up with your own verified `@vit.edu` email, not a GitHub identity. Verify the confirmation email if required.

Then go back to the new Supabase project's **SQL Editor** and run `database/002_grant_owner_template.sql`, replacing `YOUR_VERIFIED_ADMIN_EMAIL@vit.edu` with your actual verified account. Only the SQL Editor/database owner can do this. The final SELECT must show exactly **one** admin row and the email must be yours.

Sign out and sign in. You should reach the admin dashboard, where new classmate registrations appear as *pending* and cannot view timetable/notices until approved.

**Security rule:** being logged into GitHub as `omghotekar01-dotcom` does NOT confer portal admin rights. Only an entry in `portal_admins` for the verified Supabase user ID does.

## 3. Start locally for testing

From the repo root, run:

```powershell
cd docs
py -m http.server 8080
```

Open http://localhost:8080. You do not need `npm install`, Next.js or MongoDB to test this standalone app. Browser login still requires internet access to the Supabase project.

## 4. Deploy with GitHub Pages

1. Commit and push the `docs/` and `database/` changes to a feature branch using the included PowerShell script (see below).
2. Open a Pull Request and merge the reviewed feature branch into `main`.
3. In GitHub repo **Settings > Pages**, choose **Deploy from a branch**; branch `main`, folder `/docs`, then **Save**.
4. GitHub Pages URL: `https://omghotekar01-dotcom.github.io/VIT_PORTAL/` (this URL is the planned address, not a claim the site is currently deployed).
5. In Supabase Authentication URL Configuration, confirm the Pages origin/path is allowed.
6. Wait for the GitHub Pages workflow to report successful deployment and open the page. Do not announce it as live until it loads.

GitHub Pages is free for this public repo; Supabase free projects may pause from inactivity. Test uptime before committing to any strict reliability requirement.

### One-command safe Git upload (PowerShell 5.1)

Download and extract the `VIT_PORTAL_upgrade.zip`. In the extracted directory, open PowerShell and run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\INSTALL-AND-PUSH.ps1 -RepoPath "$env:USERPROFILE\Desktop\VIT_PORTAL"
```

The script clones the repo if missing, creates/switches a dedicated feature branch, copies only this portal's files, verifies your Git author/committer identity as `Om Ghotekar <omghotekar01@gmail.com>`, commits, pushes, and checks the remote branch SHA. It refuses to operate on an existing dirty worktree. It does not force-push or overwrite `main`.

For subsequent releases, edit and commit locally with the same identity, and push the feature branch. Test via GitHub Pages after the branch is merged into `main`.

### Opening the PR

After upload, on GitHub open `https://github.com/omghotekar01-dotcom/VIT_PORTAL/compare/main...feat/aiml-d-student-portal-20261031` and create a PR. If your Pages configuration already builds a preview from branches, check it; by default GitHub Pages builds from the selected production branch/folder only.

## 5. Load the verified AIML Division D timetable

After signing in as admin, open **Timetable**. Enter a weekday, start and end time, batch (All / B1 / B2 / B3), session type, subject, room and faculty. Publish a session to save it permanently. When a practical changes only for one date, use **One-day changes** to move/cancel it without altering the weekly template. Multiple sessions on a day are supported. The student view always uses the student's approved batch and local India time. Admin batch tabs show **Shared lectures**, **Batch B1**, **Batch B2**, **Batch B3**; the three batch tabs include applicable shared sessions. The owner can change a self-declared batch during approval. Unapproved students never see the timetable.

**No actual AIML-D subject, room, teacher or timetable data has been published yet.** The uploaded images confirm three distinct practical batches; verify every slot before import. Use the provided `import-templates/AIML-D-B1-B2-B3-timetable-template.csv` format (or click **Download blank template** in the admin timetable screen), then upload the completed CSV through **Admin > Timetable > Bulk import**. The preview validates B1/B2/B3, common lectures, times, date ranges and duplicate records before publication. This app does not copy first-year timetable data from another developer's site; that data may be inaccurate for second-year AIML-D.

## Student roster (to import after you provide it)

Fill `import-templates/students-roster-template.csv` using `full_name,roll_no,prn,email,batch`; use **B1**, **B2** or **B3**. Do not include passwords, tokens or VIERP credentials. This initial version keeps the roster private and accepts self-registration subject to admin approval, rather than pre-creating fake accounts. When you provide the verified roster, the system can be extended to match signups against it and flag mismatches. The template is not automatically ingested yet.

## 6. First release acceptance checklist

- [ ] Student registration requires `@vit.edu`, 10-digit PRN, B1/B2/B3 and password; optionally accepts roll number.
- [ ] Email confirmation link works and points to the deployed site.
- [ ] Student remains pending until approved by the administrator.
- [ ] Normal students cannot see another student's profile or the student directory (RLS).
- [ ] Students cannot create/edit timetable sessions or notices, even with manually crafted REST requests.
- [ ] Only your verified ID is present in `portal_admins`.
- [ ] Admin can approve a real test student and see their status change.
- [ ] Admin adds a valid shared session and B1/B2/B3-specific sessions; each student sees shared sessions and only their own batch.
- [ ] Admin CSV import validates batch tags and date/time values and skips existing identical session records.
- [ ] Admin can correct a student's batch without giving them admin privileges.
- [ ] Admin publishes a one-day cancellation; the student view reflects it.
- [ ] Admin publishes a notice; approved students see it.
- [ ] Sign out and sign in on a new device; student profile survives.
- [ ] Mobile viewport, dates, blank states and offline app shell are usable.

## Security and known limitations

- This is an independent class project. No official VIT integration or verified institution roster exists yet; admin approval is essential, and knowing a valid PRN does not prove enrollment.
- Session tokens are stored in browser localStorage. For a larger production rollout, migrate to hardened cookie-based SSR auth, add stricter CSP and security monitoring, and conduct a security review. Do not use VIERP passwords.
- The frontend auto-refreshes every 30 seconds while open: it is **database-synced**, not actual live room occupancy, a WebSocket feed, or official last-minute confirmation.
- Offline shell may open, but login, approvals, schedule sync and notices require connectivity.
- Auth provider email confirmation and outbound email quotas may be limited on free Supabase plans; confirm those limits and configure custom SMTP if needed later.
- Free Supabase projects can be paused. Back up data and monitor usage; always-on guaranteed backend uptime generally requires a paid service.
- The original Next.js screens remain under `frontend/`, but are NOT deployed as part of this standalone portal. This avoids exposing existing hard-coded demo account credentials.

## Code ownership

Original VIT_PORTAL repository by Om Ghotekar. The reference timetable app is a product reference only, not source copied into this project. Commit identity: `Om Ghotekar <omghotekar01@gmail.com>`.
