# RD Agent Helper

Open-source reference tracker for India Post RD agents. Independent tool, not affiliated with India Post.

## Features

- Email/password login with Supabase Auth.
- Per-agent records protected by PostgreSQL row-level security.
- Automatic aliases, comma-separated alias search, matching table and total.
- WhatsApp share button prepares only the selected comma-separated reference numbers. The agent chooses the recipient and sends the message.
- Name, reference, monthly amount, optional opening date, phone and notes.
- Monthly collection status, dashboard, account editing and deletion.
- JSON, CSV and Excel import with column mapping and preview. Existing Sno aliases can be preserved. IsNeedTOpay is ignored by default.
- JSON/CSV exports. Keep backups private.
- English, Hindi and Telugu labels; newer controls currently fall back to English.
- Admin role can list agents and view records. Admin appointment requires trusted database access, never a browser-supplied role.

## Privacy and safety

The published repository contains code only, no client data. Cloud records require a connection and are not stored in browser localStorage. A signed-out user cannot load records. Only a publishable Supabase key belongs in config.js; never publish a secret or service-role key. Cloud login sessions remain in the browser until sign-out, so use trusted devices and sign out after use.

The offline service worker caches only the application shell, never API data. Device-only mode is available when no backend is configured, but is not login-protected. Do not use device-only mode on shared devices.

Payment status is agent-entered tracking, not confirmation from India Post. Maturity reminders are estimated from opening date and need checking against official account records. Missing opening dates prevent maturity estimates.

## Portal and chatbot

The app links to the official DOP agent portal and accepts agent-provided files. Compatibility with a particular portal report needs checking with a sample. No official integration or automated portal access is implemented, and no portal credentials are requested. Public API availability and automation terms have not been verified.

A WhatsApp chatbot is not implemented. It needs a separately configured official messaging service, secure user-to-account mapping and a webhook. Provider pricing, number requirements and template rules must be checked before setup.

## Setup

See SETUP.md. Hosting and database free plans have provider limits; setup time estimates are not usage limits. No build step is required. Production readiness requires live login, data isolation, imports and backup testing in your own deployment.

MIT License.
