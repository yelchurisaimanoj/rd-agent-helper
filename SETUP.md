# Setup and publishing

This repository contains code only. Never commit client files, exports, passwords, or secret API keys. Setup time varies. Supabase and GitHub free plans have their own provider limits.

## Backend

1. Create a Supabase project on its free plan, or use your existing project.
2. Run `supabase/schema.sql` in its SQL Editor. It installs records, profiles, row-level security, and a signup trigger. The schema is transactional.
3. Keep email confirmation enabled for real users. Create users through the app, or use Authentication > Users > Add user in the trusted dashboard. Ordinary users receive the agent role.
4. Set `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `config.js` to that project's URL and publishable key. Only a publishable/anon key belongs here. Never use a secret/service-role key in the site.
5. Set Authentication > URL Configuration to your deployed website URL, with its trailing slash. Add the same URL to allowed redirects.

## Publishing

Publish the code repository with GitHub Pages using the main branch, root folder. The site requires no build step. Wait for the Pages deployment to finish successfully and open the resulting website. Check that login and cloud saves work before importing private data.

## Super admin

Create the intended owner's account first. In the trusted Supabase SQL Editor, review the exact email and then run:

```sql
update public.profiles set role = 'admin'
where user_id = (select id from auth.users where email = 'replace-with-owner-email');
```

Sign out and back in. Admins can view agent lists and records. Ordinary agents can only access their own records. Profile role changes and account administration require the trusted dashboard; the browser app cannot grant roles. Treat admin access as access to all records in this project.

## Private import

Sign in as the intended record owner. Use Import data file with a JSON, CSV or Excel file. Review the column mapping and preview. Preserve Sno as Alias; map Ref, Name and Amount. Ignore IsNeedTOpay unless you deliberately choose otherwise. Missing opening dates remain blank. Import saves records to that signed-in account's database, not to GitHub. Exported backups contain private client information and must be kept private.

Before using real records, create two temporary test agents, save synthetic data with one and check the other cannot read it. Check signed-out reads too. Remove test accounts afterward.

## Storage and backups

Cloud mode is online-only. Client records are not cached in browser localStorage; login sessions remain until sign-out. Use trusted devices and sign out after use. The service worker caches only the app shell. Device-only mode without a configured backend has no login protection and stores data in the browser. It is not appropriate for shared devices.

Keep regular private exports and verify recovery in a separate test environment. Monthly payment status is agent-entered tracking, not official India Post confirmation. Portal API access and automation terms have not been verified. The WhatsApp share button is not a chatbot.
