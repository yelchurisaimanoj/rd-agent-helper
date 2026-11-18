# RD Agent Helper

A free, open-source, mobile-friendly web app for **India Post RD (Recurring Deposit) agents** to track client RD accounts, prepare monthly schedules, and share reference lists on WhatsApp.

## Features

- **Secure agent login** (email + password) backed by Supabase. Every agent sees only their own records (row-level security). Runs without the backend too, in device-only mode.
- **Import data file**: load an existing client list from **CSV or Excel** (including a report downloaded from the DOP agent portal). Column mapping with auto-detection and a preview before import; duplicates are skipped.
- **Add RD accounts**: client name, phone, reference/account number, monthly amount, opening date, notes. Duplicate reference check.
- **Auto alias numbers** (1, 2, 3, ...) for every record.
- **Alias search**: comma-separated aliases (e.g. `1,2,5`) give a table of matching records, the **total amount**, and a **WhatsApp button** whose message contains only the comma-separated reference numbers.
- **Monthly schedule**: pick a month, mark accounts **Paid / Pending**, see collected and pending totals.
- **Dashboard**: total accounts, monthly RD value, collected vs pending this month, new accounts this month, maturities due in the next 60 days (RD matures 5 years from opening).
- **Languages**: English, हिंदी, తెలుగు.
- **Offline-friendly**: last synced data stays available offline; changes sync when back online (cloud mode).
- **Backup**: export JSON or CSV anytime.

## Setup and publishing

See **[SETUP.md](SETUP.md)** - Supabase backend (~10 min, free) and GitHub Pages publishing (~5 min, free), step by step.

## Security notes

- Client financial data is sensitive. This app stores it in your own Supabase project; row-level security means each agent's login can only reach their own rows.
- Only the **anon public** key goes in `config.js` - it is safe to publish. **Never** put the Supabase service-role key in this repo or the website.
- No passwords, OTPs, or portal credentials are ever requested. The app does not access dopagent.indiapost.gov.in automatically; agents download their own reports and import them.
- Keep "Confirm email" enabled in Supabase Auth for real use.

## India Post DOP agent portal

No official public API exists for the DOP agent portal, and automated access is not permitted - so integration is: a deep link to the portal + import of CSV/Excel reports the agent downloads from it.

## WhatsApp chatbot (future option)

The data model is cloud-based and versioned, so a bot can plug in later via the official WhatsApp Business Cloud API (Meta business account, dedicated number, template approval, per-conversation pricing, small webhook server). Unofficial WhatsApp libraries violate terms and risk bans, so they are not used. The in-app WhatsApp share button covers the common case today at zero cost.

## License

MIT - see [LICENSE](LICENSE).
