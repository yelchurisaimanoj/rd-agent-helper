// One-time PRIVATE data seed for your own Supabase project.
// Run this on your own computer only. Never commit or upload your data file.
//
// Usage (Node 18+):
//   SUPABASE_URL="https://xxxx.supabase.co" \
//   SUPABASE_ANON_KEY="your-anon-key" \
//   AGENT_EMAIL="you@example.com" \
//   AGENT_PASSWORD="your-app-password" \
//   node supabase/seed.js /path/to/your-data.json
//
// The JSON must be an array of objects with: Sno, Ref, Name, Amount (IsNeedTOpay
// is ignored per the owner - all records start with no payment status for the month).
// Sno becomes the alias. Sign up in the app FIRST so this account exists.

const { SUPABASE_URL, SUPABASE_ANON_KEY, AGENT_EMAIL, AGENT_PASSWORD } = process.env;
const file = process.argv[2];
if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !AGENT_EMAIL || !AGENT_PASSWORD || !file) {
  console.error("Missing env vars or file path. See the header comment in this file.");
  process.exit(1);
}

const rows = JSON.parse(require("fs").readFileSync(file, "utf8"));
if (!Array.isArray(rows) || !rows.length) { console.error("JSON must be a non-empty array"); process.exit(1); }

async function main() {
  // 1. Sign in as the agent (row-level security allows only this user's rows).
  const auth = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: SUPABASE_ANON_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email: AGENT_EMAIL, password: AGENT_PASSWORD })
  }).then(r => r.json());
  if (!auth.access_token) { console.error("Login failed:", auth.error_description || auth); process.exit(1); }

  const seen = new Set();
  const records = [];
  for (const r of rows) {
    const alias = parseInt(r.Sno, 10);
    const ref = String(r.Ref || "").trim();
    if (!isFinite(alias) || !ref || seen.has(ref)) continue;
    seen.add(ref);
    records.push({
      user_id: auth.user.id,
      alias,
      name: String(r.Name || "").trim(),
      phone: "",
      ref,
      amount: parseFloat(r.Amount) || 0,
      date: null,
      notes: "",
      paid: {}
    });
  }
  console.log(`Seeding ${records.length} records...`);

  // 2. Upsert in batches, keyed on (user_id, alias).
  for (let i = 0; i < records.length; i += 100) {
    const batch = records.slice(i, i + 100);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/records?on_conflict=user_id,alias`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${auth.access_token}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates"
      },
      body: JSON.stringify(batch)
    });
    if (!res.ok) { console.error("Insert failed:", res.status, await res.text()); process.exit(1); }
    console.log(`  ${Math.min(i + 100, records.length)}/${records.length}`);
  }
  console.log("Done. Open the app, sign in, and verify the records appear.");
}
main().catch(e => { console.error(e); process.exit(1); });
