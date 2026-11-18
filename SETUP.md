# Setup and publish guide

Two parts: (A) the free backend on Supabase, (B) publishing the site on GitHub Pages. About 20 minutes total. No cost.

## A. Backend (Supabase free tier)

1. Go to https://supabase.com and sign up (free, can use your GitHub account).
2. Click **New project**. Pick any name, set a strong database password (save it), region closest to you (e.g. Mumbai / Singapore). Free plan is fine.
3. When the project is ready, open **SQL Editor** (left menu) > **New query**. Paste the whole contents of `supabase/schema.sql` from this repo and click **Run**. You should see "Success".
4. Open **Authentication** > **Providers**. Make sure **Email** is enabled (it is by default). For testing you may disable "Confirm email" under Email settings; for real use keep it enabled.
5. Open **Project Settings** > **API**. Copy:
   - **Project URL**
   - **anon public** key (NOT the service_role key - that one stays secret and is never used here)
6. In your copy of this repo, copy `config.example.js` to `config.js` and paste those two values in.

Security: the anon key is safe to publish in the website because row-level security (set up by schema.sql) means every logged-in agent can only read and write their own rows. Nobody can see another agent's data.

## B. Publish the site (GitHub Pages)

1. Sign in to https://github.com and click **New repository**. Name it e.g. `rd-agent-helper`. Choose **Public** (needed for free Pages). Create it.
2. Upload the files: on the repo page click **Add file > Upload files**, then drag in ALL files from this folder: `index.html`, `app.js`, `styles.css`, `sw.js`, `config.js` (the one you just filled in), `README.md`, `LICENSE`, `SETUP.md`, and the `supabase` folder. Commit.
3. Go to **Settings > Pages**. Under "Build and deployment" choose **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. Wait 1-2 minutes. Your site is live at `https://<your-username>.github.io/rd-agent-helper/`.
5. In Supabase, open **Authentication > URL Configuration** and add that site URL under **Site URL** / redirect URLs so login emails point back to your site.

## C. First use

1. Open your site. Create an agent account with email + password (Sign up).
2. Load your existing client list - two private options:
   - **In the app (easiest)**: sign in, open **Import data file**, choose your JSON/CSV/Excel file. The wizard auto-matches columns (Sno -> alias, Ref -> reference, Name, Amount; IsNeedTOpay is ignored), shows a preview, then imports. The file never leaves your device except into your own Supabase project.
   - **One-time seed script**: run `supabase/seed.js` on your own computer (see the header comment in that file for the exact command). It signs in as you and upserts all records with Sno as the alias.

**Privacy: never commit or upload your data file to GitHub.** Only the code goes in the repo. If the file is ever inside the repo folder, delete it before committing (or add its name to a `.gitignore`).
3. Every agent who uses the site signs up with their own email - each sees only their own records.

## D. Updating the site later

Edit files in the GitHub repo (or upload replacements) - Pages redeploys automatically within a minute.
