(function () {
"use strict";
var STORE_KEY = "rdAgentRecords.v2", COUNTER_KEY = "rdAgentCounter.v2", LANG_KEY = "rdAgentLang";

var I18N = {
en: { appTitle:"RD Agent Helper", tagline:"For India Post RD agents - track client RD accounts, prepare schedules, share on WhatsApp.",
dashboard:"Dashboard", addTitle:"Add RD account", fName:"Client name", fPhone:"Client phone (optional)", fRef:"Reference / account number",
fAmount:"Monthly amount (Rs.)", fDate:"Opening date", fNotes:"Notes (optional)", saveBtn:"Add record", updateBtn:"Save changes", cancelEdit:"Cancel edit",
schedTitle:"Monthly schedule", schedMonth:"Month", schedShow:"Show schedule", schedCollected:"Collected", schedPending:"Pending",
searchTitle:"Search by alias numbers", searchLabel:"Alias numbers (comma separated)", searchBtn:"Search",
searchHint:"Enter the short alias numbers shown next to each record. One or many, separated by commas.",
totalAmount:"Total amount", waBtn:"Send reference numbers on WhatsApp", waHint:"The WhatsApp message contains only the comma-separated reference numbers.",
allTitle:"All records", filterPh:"Search by name or reference", allEmpty:"No records yet. Add your first RD account above.",
expJson:"Export backup (JSON)", expCsv:"Export CSV", impBackup:"Import backup",
privacyHint:"Your data stays on this device only (browser storage). Export a backup regularly - clearing browser data erases the records.",
dopTitle:"India Post agent portal", dopHint:"Open the official DOP agent portal, or import a report (CSV) you downloaded from it.",
dopOpen:"Open DOP agent portal", dopImport:"Import portal CSV",
footer:"Open source - MIT License. Works offline. Data never leaves your device.",
cAlias:"Alias", cName:"Name", cRef:"Reference", cAmount:"Amount", cDate:"Opening date", cStatus:"Status",
paid:"Paid", unpaid:"Pending", edit:"Edit", del:"Delete",
dAccounts:"Total accounts", dMonthly:"Total monthly RD value", dCollMonth:"Collected this month", dPendMonth:"Pending this month",
dNewMonth:"New accounts this month", dMat:"Maturities in next 60 days", maturesOn:"matures on",
errRef:"Please enter a reference number.", errName:"Please enter the client name.", errAmt:"Please enter a valid amount.", errDate:"Please choose the opening date.",
errDup:"This reference number is already saved.", savedAs:"Saved as alias ", updated:"Record updated.", noMatch:"No records matched those alias numbers.",
aliasMissing:"Alias not found: ", delConfirm:"Delete this record?", imported:"Imported ", notValid:"Could not import: not a valid file.",
recs:" records.", matured:"Matured" },
hi: { appTitle:"आरडी एजेंट हेल्पर", tagline:"इंडिया पोस्ट आरडी एजेंटों के लिए - खाते जोड़ें, शेड्यूल बनाएं, WhatsApp पर भेजें।",
dashboard:"डैशबोर्ड", addTitle:"आरडी खाता जोड़ें", fName:"ग्राहक का नाम", fPhone:"ग्राहक फ़ोन (वैकल्पिक)", fRef:"रेफरेंस / खाता संख्या",
fAmount:"मासिक राशि (रु.)", fDate:"खाता खोलने की तारीख", fNotes:"नोट (वैकल्पिक)", saveBtn:"रिकॉर्ड जोड़ें", updateBtn:"बदलाव सहेजें", cancelEdit:"रद्द करें",
schedTitle:"मासिक शेड्यूल", schedMonth:"महीना", schedShow:"शेड्यूल दिखाएं", schedCollected:"जमा हुआ", schedPending:"बाकी",
searchTitle:"उपनाम संख्या से खोजें", searchLabel:"उपनाम संख्याएं (कॉमा से अलग)", searchBtn:"खोजें",
searchHint:"हर रिकॉर्ड के सामने दिखने वाली छोटी उपनाम संख्या डालें। एक या अनेक, कॉमा से अलग।",
totalAmount:"कुल राशि", waBtn:"WhatsApp पर रेफरेंस नंबर भेजें", waHint:"WhatsApp संदेश में केवल कॉमा से अलग रेफरेंस नंबर होंगे।",
allTitle:"सभी रिकॉर्ड", filterPh:"नाम या रेफरेंस से खोजें", allEmpty:"अभी कोई रिकॉर्ड नहीं। ऊपर पहला खाता जोड़ें।",
expJson:"बैकअप निर्यात (JSON)", expCsv:"CSV निर्यात", impBackup:"बैकअप आयात",
privacyHint:"आपका डेटा केवल इसी डिवाइस पर रहता है। नियमित बैकअप लें - ब्राउज़र डेटा साफ करने से रिकॉर्ड मिट जाएंगे।",
dopTitle:"इंडिया पोस्ट एजेंट पोर्टल", dopHint:"आधिकारिक DOP एजेंट पोर्टल खोलें, या वहां से डाउनलोड की गई रिपोर्ट (CSV) आयात करें।",
dopOpen:"DOP एजेंट पोर्टल खोलें", dopImport:"पोर्टल CSV आयात करें",
footer:"ओपन सोर्स - MIT लाइसेंस। ऑफ़लाइन काम करता है। डेटा आपका डिवाइस नहीं छोड़ता।",
cAlias:"उपनाम", cName:"नाम", cRef:"रेफरेंस", cAmount:"राशि", cDate:"खुलने की तारीख", cStatus:"स्थिति",
paid:"जमा", unpaid:"बाकी", edit:"बदलें", del:"हटाएं",
dAccounts:"कुल खाते", dMonthly:"कुल मासिक आरडी राशि", dCollMonth:"इस माह जमा", dPendMonth:"इस माह बाकी",
dNewMonth:"इस माह नए खाते", dMat:"अगले 60 दिनों में परिपक्वता", maturesOn:"परिपक्वता तिथि",
errRef:"कृपया रेफरेंस नंबर डालें।", errName:"कृपया ग्राहक का नाम डालें।", errAmt:"कृपया सही राशि डालें।", errDate:"कृपया तारीख चुनें।",
errDup:"यह रेफरेंस नंबर पहले से सहेजा है।", savedAs:"उपनाम के रूप में सहेजा गया ", updated:"रिकॉर्ड अपडेट हुआ।", noMatch:"इन उपनाम संख्याओं से कोई रिकॉर्ड नहीं मिला।",
aliasMissing:"उपनाम नहीं मिला: ", delConfirm:"यह रिकॉर्ड हटाएं?", imported:"आयात हुए ", notValid:"आयात नहीं हुआ: फ़ाइल मान्य नहीं है।",
recs:" रिकॉर्ड।", matured:"परिपक्व" },
te: { appTitle:"ఆర్డీ ఏజెంట్ హెల్పర్", tagline:"ఇండియా పోస్ట్ ఆర్డీ ఏజెంట్ల కోసం - ఖాతాలు జోడించండి, షెడ్యూల్ తయారు చేయండి, WhatsApp లో పంపండి.",
dashboard:"డాష్‌బోర్డ్", addTitle:"ఆర్డీ ఖాతా జోడించండి", fName:"కస్టమర్ పేరు", fPhone:"కస్టమర్ ఫోన్ (ఐచ్ఛికం)", fRef:"రిఫరెన్స్ / ఖాతా నంబర్",
fAmount:"నెలవారీ మొత్తం (రు.)", fDate:"ఖాతా తెరిచిన తేదీ", fNotes:"గమనిక (ఐచ్ఛికం)", saveBtn:"రికార్డ్ జోడించండి", updateBtn:"మార్పులు సేవ్ చేయండి", cancelEdit:"రద్దు చేయండి",
schedTitle:"నెలవారీ షెడ్యూల్", schedMonth:"నెల", schedShow:"షెడ్యూల్ చూపండి", schedCollected:"వసూలైంది", schedPending:"బాకీ",
searchTitle:"మారుపేరు నంబర్లతో వెతకండి", searchLabel:"మారుపేరు నంబర్లు (కామాతో వేరు)", searchBtn:"వెతకండి",
searchHint:"ప్రతి రికార్డ్ పక్కన ఉన్న చిన్న మారుపేరు నంబర్ నమోదు చేయండి. ఒకటి లేదా అనేకం, కామాతో వేరు చేయండి.",
totalAmount:"మొత్తం", waBtn:"WhatsApp లో రిఫరెన్స్ నంబర్లు పంపండి", waHint:"WhatsApp సందేశంలో కామాతో వేరు చేసిన రిఫరెన్స్ నంబర్లు మాత్రమే ఉంటాయి.",
allTitle:"అన్ని రికార్డులు", filterPh:"పేరు లేదా రిఫరెన్స్‌తో వెతకండి", allEmpty:"ఇంకా రికార్డులు లేవు. పైన మీ మొదటి ఖాతా జోడించండి.",
expJson:"బ్యాకప్ ఎగుమతి (JSON)", expCsv:"CSV ఎగుమతి", impBackup:"బ్యాకప్ దిగుమతి",
privacyHint:"మీ డేటా ఈ పరికరంలోనే ఉంటుంది. క్రమం తప్పకుండా బ్యాకప్ తీయండి - బ్రౌజర్ డేటా తుడిస్తే రికార్డులు పోతాయి.",
dopTitle:"ఇండియా పోస్ట్ ఏజెంట్ పోర్టల్", dopHint:"అధికారిక DOP ఏజెంట్ పోర్టల్ తెరవండి, లేదా అక్కడి నుండి డౌన్‌లోడ్ చేసిన నివేదిక (CSV) దిగుమతి చేయండి.",
dopOpen:"DOP ఏజెంట్ పోర్టల్ తెరవండి", dopImport:"పోర్టల్ CSV దిగుమతి",
footer:"ఓపెన్ సోర్స్ - MIT లైసెన్స్. ఆఫ్‌లైన్‌లో పనిచేస్తుంది. డేటా మీ పరికరాన్ని వదలదు.",
cAlias:"మారుపేరు", cName:"పేరు", cRef:"రిఫరెన్స్", cAmount:"మొత్తం", cDate:"తెరిచిన తేదీ", cStatus:"స్థితి",
paid:"చెల్లించారు", unpaid:"బాకీ", edit:"మార్చండి", del:"తొలగించండి",
dAccounts:"మొత్తం ఖాతాలు", dMonthly:"మొత్తం నెలవారీ ఆర్డీ విలువ", dCollMonth:"ఈ నెల వసూలు", dPendMonth:"ఈ నెల బాకీ",
dNewMonth:"ఈ నెల కొత్త ఖాతాలు", dMat:"వచ్చే 60 రోజుల్లో మెచ్యూరిటీ", maturesOn:"మెచ్యూరిటీ తేదీ",
errRef:"దయచేసి రిఫరెన్స్ నంబర్ నమోదు చేయండి.", errName:"దయచేసి కస్టమర్ పేరు నమోదు చేయండి.", errAmt:"దయచేసి సరైన మొత్తం నమోదు చేయండి.", errDate:"దయచేసి తేదీ ఎంచుకోండి.",
errDup:"ఈ రిఫరెన్స్ నంబర్ ఇప్పటికే సేవ్ చేయబడింది.", savedAs:"మారుపేరుగా సేవ్ చేయబడింది ", updated:"రికార్డ్ నవీకరించబడింది.", noMatch:"ఆ మారుపేరు నంబర్లకు రికార్డులు దొరకలేదు.",
aliasMissing:"మారుపేరు దొరకలేదు: ", delConfirm:"ఈ రికార్డ్ తొలగించాలా?", imported:"దిగుమతి అయ్యాయి ", notValid:"దిగుమతి కాలేదు: ఫైల్ సరైనది కాదు.",
recs:" రికార్డులు.", matured:"మెచ్యూర్ అయ్యింది" }
};

// Extra strings (English; other languages fall back to English for these)
Object.assign(I18N.en, {
  loginTitle:"Agent login", fEmail:"Email", fPass:"Password", signIn:"Sign in", signUp:"Create account", signOut:"Sign out",
  signedInAs:"Signed in as ", authBad:"Login failed. Check email and password.", authDone:"Account created. If asked, confirm the email, then sign in.",
  impTitle:"Import data file", impHint:"Load your existing client list from a CSV or Excel file (including a report downloaded from the DOP agent portal). Match the columns, check the preview, then import.",
  impPick:"Choose CSV / Excel file", impMap:"Match each file column to a field:", impPreview:"Preview (first 5 rows):", impRun:"Import rows",
  fSkip:"Skip", fPhoneF:"Phone", impNone:"No file rows found.", impNeedRef:"Map at least the Reference or Name column.",
  impDone:" rows imported.", impDup:" duplicate reference(s) skipped.", impBadFile:"Could not read that file.",
  syncOff:"Offline - changes are saved on this device and will sync when you are back online.",
  syncOk:"Synced with your account.", colFile:"File column", colField:"Field", fAlias:"Alias number (Sno)", fNeedsPay:"Needs-to-pay flag",
  adminTitle:"Admin: all agents", adminEmail:"Agent", adminRecs:"Records", adminValue:"Monthly total", adminView:"View", adminHide:"Hide", adminNone:"No agents yet."
});

var lang = localStorage.getItem(LANG_KEY) || "en";
if (!I18N[lang]) lang = "en";
function t(k) { return (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k; }
function $(id) { return document.getElementById(id); }
function applyLang() {
  document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
  document.querySelectorAll("[data-i18n-ph]").forEach(function (el) { el.placeholder = t(el.getAttribute("data-i18n-ph")); });
  document.querySelectorAll(".lang-bar button").forEach(function (b) {
    b.classList.toggle("active", b.getAttribute("data-lang") === lang);
  });
  document.documentElement.lang = lang;
}
document.querySelectorAll(".lang-bar button").forEach(function (b) {
  b.addEventListener("click", function () {
    lang = b.getAttribute("data-lang");
    localStorage.setItem(LANG_KEY, lang);
    applyLang(); renderAll(); renderDash();
    if (lastSched) renderSched(lastSched);
  });
});
function escapeHtml(v) { var el=document.createElement("span"); el.textContent=String(v); return el.innerHTML; }
function fmtAmount(a) { return Number(a || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 }); }
function fmtDate(iso) {
  if (!iso) return "";
  var d = new Date(String(iso).slice(0, 10) + "T00:00:00");
  if (isNaN(d)) return String(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
function isoLocal(d) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function monthKey(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0"); }
function maturityOf(r) {
  var d = new Date(String(r.date).slice(0, 10) + "T00:00:00");
  if (isNaN(d)) return null;
  d.setFullYear(d.getFullYear() + 5);
  return d;
}
function isActiveIn(r, mk) {
  if (r.date && String(r.date).slice(0, 7) > mk) return false;
  var m = maturityOf(r);
  return !m || monthKey(m) >= mk;
}
function isPaid(r, mk) { return !!(r.paid && r.paid[mk]); }
function showMsg(el, text, ok) { el.textContent = text; el.className = "msg " + (ok ? "ok" : "err"); }

// --- Storage layer: localStorage mirror + optional Supabase cloud ---
function localLoad() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch (e) { return []; }
}
function localSave(r) { localStorage.setItem(STORE_KEY, JSON.stringify(r)); }
function cloudEnabled() { return typeof RD_CONFIG !== "undefined" && RD_CONFIG.SUPABASE_URL && RD_CONFIG.SUPABASE_ANON_KEY; }

var sb = null, session = null, cache = [], syncDirty = false;

function normalize(r) {
  return { id: r.id || null, alias: parseInt(r.alias, 10) || 0, name: String(r.name || ""),
    phone: String(r.phone || ""), ref: String(r.ref || ""), amount: parseFloat(r.amount) || 0,
    date: r.date ? String(r.date).slice(0, 10) : "", notes: String(r.notes || ""),
    paid: (r.paid && typeof r.paid === "object") ? r.paid : {} };
}
function loadRecords() { return JSON.parse(JSON.stringify(cache)); }
function nextAlias() {
  return cache.reduce(function (m, r) { return Math.max(m, r.alias || 0); }, 0) + 1;
}
var cloudReady = false, saving = false;
function setSyncNote(message) {
  $("syncNote").style.display = message ? "block" : "none";
  $("syncNote").textContent = message || "";
}
async function loadCloud() {
  cloudReady = false;
  var res = await sb.from("records").select("*").eq("user_id", session.user.id).order("alias");
  if (res.error) { cache = []; setSyncNote("Cannot load records. Check your connection and reload. Editing is disabled."); return; }
  cache = res.data.map(normalize); cloudReady = true;
  setSyncNote("Connected. Cloud records require an internet connection. No client records are saved in this browser.");
}
async function saveRecords(records) {
  if (!sb) { cache = records.map(normalize); localSave(cache); return true; }
  if (!session || !cloudReady || saving || !navigator.onLine) {
    alert("Not saved. Wait for the current save or reconnect, then try again."); return false;
  }
  saving = true;
  var before = loadRecords(), next = records.map(normalize), uid = session.user.id;
  setSyncNote("Saving...");
  try {
    var changed = next.filter(function(r) { var old=before.find(function(x){return x.alias===r.alias;}); return !old || JSON.stringify(old)!==JSON.stringify(r); });
    var inserted = changed.filter(function(r){return !before.some(function(x){return x.alias===r.alias;});});
    var updated = changed.filter(function(r){return before.some(function(x){return x.alias===r.alias;});});
    function row(r){return {user_id:uid,alias:r.alias,name:r.name,phone:r.phone,ref:r.ref,amount:r.amount,date:r.date||null,notes:r.notes,paid:r.paid};}
    if (inserted.length) { var ins=await sb.from("records").insert(inserted.map(row)); if(ins.error) throw ins.error; }
    for (var r of updated) { var up=await sb.from("records").update(row(r)).eq("user_id",uid).eq("alias",r.alias); if(up.error) throw up.error; }
    var removed=before.filter(function(r){return !next.some(function(x){return x.alias===r.alias;});});
    for(var r of removed){var del=await sb.from("records").delete().eq("user_id",uid).eq("alias",r.alias); if(del.error) throw del.error;}
    await loadCloud(); refreshViews(); return true;
  } catch(e) { alert("Save failed. Reloading server records. Check the record before trying again. " + (e.message||"")); await loadCloud(); refreshViews(); return false; }
  finally {saving=false;}
}

// --- Admin panel ---
var isAdmin = false;
async function loadRole() {
  isAdmin = false;
  if (!sb || !session) return;
  var res = await sb.from("profiles").select("role").eq("user_id", session.user.id).maybeSingle();
  isAdmin = !!(res.data && res.data.role === "admin");
  $("adminCard").style.display = isAdmin ? "block" : "none";
  if (isAdmin) renderAdmin();
}
var adminOpen = {};
async function renderAdmin() {
  var card = $("adminCard");
  var pr = await sb.from("profiles").select("user_id,email").order("created_at");
  var rr = await sb.from("records").select("user_id,alias,name,ref,amount,date").order("alias");
  var tb = $("adminTable").querySelector("tbody");
  tb.innerHTML = "";
  if (pr.error || !pr.data || !pr.data.length) {
    tb.innerHTML = "<tr><td colspan=4 class='empty'>" + t("adminNone") + "</td></tr>";
    return;
  }
  var byUser = {};
  (rr.data || []).forEach(function (r) {
    (byUser[r.user_id] = byUser[r.user_id] || []).push(r);
  });
  pr.data.forEach(function (p) {
    var recs = byUser[p.user_id] || [];
    var total = recs.reduce(function (s, r) { return s + Number(r.amount || 0); }, 0);
    var tr = document.createElement("tr");
    var td1 = document.createElement("td"); td1.textContent = p.email || p.user_id;
    var td2 = document.createElement("td"); td2.className = "num"; td2.textContent = recs.length;
    var td3 = document.createElement("td"); td3.className = "num"; td3.textContent = "Rs. " + fmtAmount(total);
    var td4 = document.createElement("td");
    var btn = document.createElement("button");
    btn.className = "btn btn-small"; btn.type = "button";
    btn.textContent = adminOpen[p.user_id] ? t("adminHide") : t("adminView");
    btn.addEventListener("click", function () {
      adminOpen[p.user_id] = !adminOpen[p.user_id];
      renderAdmin();
    });
    td4.appendChild(btn);
    tr.append(td1, td2, td3, td4);
    tb.appendChild(tr);
    if (adminOpen[p.user_id]) {
      var trd = document.createElement("tr");
      var tdd = document.createElement("td");
      tdd.colSpan = 4;
      var inner = document.createElement("table");
      inner.innerHTML = "<thead><tr><th>" + t("cAlias") + "</th><th>" + t("cName") + "</th><th>" + t("cRef") + "</th><th class='num'>" + t("cAmount") + "</th><th>" + t("cDate") + "</th></tr></thead>";
      var ib = document.createElement("tbody");
      recs.forEach(function (r) {
        var ir = document.createElement("tr");
        [r.alias, r.name || "", r.ref || "", fmtAmount(r.amount), fmtDate(r.date)].forEach(function (v, i) {
          var c = document.createElement("td");
          c.textContent = v;
          if (i === 3) c.className = "num";
          ir.appendChild(c);
        });
        ib.appendChild(ir);
      });
      if (!recs.length) ib.innerHTML = "<tr><td colspan=5 class='empty'>-</td></tr>";
      inner.appendChild(ib);
      tdd.appendChild(inner);
      trd.appendChild(tdd);
      tb.appendChild(trd);
    }
  });
}

// --- Auth UI ---
function updateAuthUI() {
  var cloud = cloudEnabled();
  $("authCard").style.display = cloud ? "block" : "none";
  if (!cloud) { $("appBody").style.display = "block"; return; }
  var inApp = !!session;
  $("authForm").style.display = inApp ? "none" : "block";
  $("authStatus").style.display = inApp ? "block" : "none";
  $("appBody").style.display = inApp ? "block" : "none";
  if (inApp) $("authWho").textContent = t("signedInAs") + (session.user.email || "");
}
async function doAuth(kind) {
  var email = $("emailInput").value.trim(), pass = $("passInput").value;
  var res = kind === "up"
    ? await sb.auth.signUp({ email: email, password: pass })
    : await sb.auth.signInWithPassword({ email: email, password: pass });
  if (res.error) showMsg($("authMsg"), t("authBad"), false);
  else if (kind === "up" && !res.data.session) showMsg($("authMsg"), t("authDone"), true);
}

// --- Add / edit form ---
var addForm = $("addForm"), addMsg = $("addMsg"), editAlias = $("editAlias");
addForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  var name = $("nameInput").value.trim(), phone = $("phoneInput").value.trim(),
      ref = $("refInput").value.trim(), amount = parseFloat($("amountInput").value),
      date = $("dateInput").value, notes = $("notesInput").value.trim();
  if (!name) return showMsg(addMsg, t("errName"), false);
  if (!ref) return showMsg(addMsg, t("errRef"), false);
  if (!isFinite(amount) || amount < 0) return showMsg(addMsg, t("errAmt"), false);

  var records = loadRecords(), editing = editAlias.value;
  if (records.some(function (r) { return r.ref === ref && String(r.alias) !== editing; }))
    return showMsg(addMsg, t("errDup"), false);
  if (editing) {
    records.forEach(function (r) {
      if (String(r.alias) === editing) { r.name = name; r.phone = phone; r.ref = ref; r.amount = amount; r.date = date; r.notes = notes; }
    });
    if (!(await saveRecords(records))) return; showMsg(addMsg, t("updated"), true); resetForm();
  } else {
    var alias = nextAlias();
    records.push({ alias: alias, name: name, phone: phone, ref: ref, amount: amount, date: date, notes: notes, paid: {} });
    if (!(await saveRecords(records))) return; showMsg(addMsg, t("savedAs") + alias + ".", true);
    addForm.reset(); $("nameInput").focus();
  }
  refreshViews();
});
function resetForm() {
  editAlias.value = ""; addForm.reset();
  $("addTitle").textContent = t("addTitle"); $("saveBtn").textContent = t("saveBtn");
  $("cancelEditBtn").style.display = "none";
}
$("cancelEditBtn").addEventListener("click", resetForm);
function startEdit(r) {
  editAlias.value = r.alias;
  $("nameInput").value = r.name || ""; $("phoneInput").value = r.phone || "";
  $("refInput").value = r.ref || ""; $("amountInput").value = r.amount;
  $("dateInput").value = r.date || ""; $("notesInput").value = r.notes || "";
  $("addTitle").textContent = t("edit") + " #" + r.alias;
  $("saveBtn").textContent = t("updateBtn"); $("cancelEditBtn").style.display = "block";
  $("addCard").scrollIntoView({ behavior: "smooth" });
}

// --- Dashboard ---
function renderDash() {
  var records = loadRecords(), now = new Date(), mk = monthKey(now);
  var active = records.filter(function (r) { return isActiveIn(r, mk); });
  var totalMonthly = active.reduce(function (s, r) { return s + Number(r.amount || 0); }, 0);
  var coll = 0, pend = 0, collN = 0, pendN = 0;
  active.forEach(function (r) {
    if (isPaid(r, mk)) { coll += Number(r.amount || 0); collN++; }
    else { pend += Number(r.amount || 0); pendN++; }
  });
  var newN = records.filter(function (r) { return String(r.date || "").slice(0, 7) === mk; }).length;
  var soon = new Date(now); soon.setDate(soon.getDate() + 60);
  var mats = records.filter(function (r) {
    var m = maturityOf(r); return m && m >= now && m <= soon;
  }).sort(function (a, b) { return maturityOf(a) - maturityOf(b); });
  var rows = [
    [t("dAccounts"), records.length],
    [t("dMonthly"), "Rs. " + fmtAmount(totalMonthly)],
    [t("dCollMonth"), "Rs. " + fmtAmount(coll) + " (" + collN + ")"],
    [t("dPendMonth"), "Rs. " + fmtAmount(pend) + " (" + pendN + ")"],
    [t("dNewMonth"), newN],
    [t("dMat"), mats.length]
  ];
  $("dashTable").querySelector("tbody").innerHTML = rows.map(function (r) {
    return "<tr><th>" + r[0] + "</th><td class='num'><b>" + r[1] + "</b></td></tr>";
  }).join("");
  $("maturityNotice").innerHTML = mats.length
    ? "<div class='notice'>" + mats.map(function (r) {
        return "#" + r.alias + " " + escapeHtml(r.name || r.ref) + " - " + t("maturesOn") + " " + fmtDate(isoLocal(maturityOf(r)));
      }).join("<br>") + "</div>"
    : "";
}

// --- Monthly schedule ---
var lastSched = null;
$("schedMonth").value = monthKey(new Date());
$("schedBtn").addEventListener("click", function () {
  lastSched = $("schedMonth").value;
  if (lastSched) renderSched(lastSched);
});
function renderSched(mk) {
  var records = loadRecords().filter(function (r) { return isActiveIn(r, mk); })
    .sort(function (a, b) { return a.alias - b.alias; });
  var tb = $("schedTable").querySelector("tbody");
  tb.innerHTML = "";
  var coll = 0, pend = 0;
  records.forEach(function (r) {
    var paid = isPaid(r, mk);
    if (paid) coll += Number(r.amount || 0); else pend += Number(r.amount || 0);
    var tr = document.createElement("tr");
    var tdA = document.createElement("td"), b = document.createElement("span");
    b.className = "badge"; b.textContent = r.alias; tdA.appendChild(b);
    var tdN = document.createElement("td"); tdN.textContent = r.name || "";
    var tdR = document.createElement("td"); tdR.textContent = r.ref || "";
    var tdM = document.createElement("td"); tdM.className = "num"; tdM.textContent = fmtAmount(r.amount);
    var tdS = document.createElement("td");
    var pill = document.createElement("span");
    pill.className = "pill " + (paid ? "paid" : "unpaid");
    pill.textContent = paid ? t("paid") : t("unpaid");
    pill.style.cursor = "pointer";
    pill.addEventListener("click", function () {
      var all = loadRecords();
      all.forEach(function (x) {
        if (x.alias === r.alias) { x.paid = x.paid || {}; if (x.paid[mk]) delete x.paid[mk]; else x.paid[mk] = true; }
      });
      saveRecords(all); renderSched(mk); renderDash();
    });
    tdS.appendChild(pill);
    tr.append(tdA, tdN, tdR, tdM, tdS);
    tb.appendChild(tr);
  });
  $("schedCollected").textContent = "Rs. " + fmtAmount(coll);
  $("schedPending").textContent = "Rs. " + fmtAmount(pend);
  $("schedWrap").style.display = "block";
}

// --- Alias search + WhatsApp ---
$("searchBtn").addEventListener("click", function () {
  var raw = $("searchInput").value.trim(), records = loadRecords();
  if (!raw) { $("resultsWrap").style.display = "none"; return; }
  var wanted = raw.split(",").map(function (s) { return parseInt(s.trim(), 10); }).filter(isFinite);
  var found = records.filter(function (r) { return wanted.indexOf(r.alias) !== -1; })
    .sort(function (a, b) { return a.alias - b.alias; });
  var missing = wanted.filter(function (n) { return !records.some(function (r) { return r.alias === n; }); });
  $("resultsWrap").style.display = "block";
  var tb = $("resultsTable").querySelector("tbody");
  tb.innerHTML = "";
  var total = 0;
  found.forEach(function (r) {
    total += Number(r.amount || 0);
    var tr = document.createElement("tr");
    var vals = [r.alias, r.name || "", r.ref || "", fmtAmount(r.amount), fmtDate(r.date)];
    vals.forEach(function (v, i) {
      var td = document.createElement("td");
      if (i === 0) { var s = document.createElement("span"); s.className = "badge"; s.textContent = v; td.appendChild(s); }
      else { td.textContent = v; if (i === 3) td.className = "num"; }
      tr.appendChild(td);
    });
    tb.appendChild(tr);
  });
  $("totalAmount").textContent = "Rs. " + fmtAmount(total);
  var waBtn = $("waBtn"), msg = $("searchMsg");
  if (!found.length) {
    showMsg(msg, t("noMatch"), false); waBtn.style.display = "none";
  } else {
    waBtn.style.display = "inline-block";
    waBtn.href = "https://wa.me/?text=" + encodeURIComponent(found.map(function (r) { return r.ref; }).join(","));
    if (missing.length) showMsg(msg, t("aliasMissing") + missing.join(", "), false);
    else { msg.className = "msg"; msg.textContent = ""; }
  }
});

// --- All records ---
function renderAll() {
  var q = ($("filterInput").value || "").trim().toLowerCase();
  var records = loadRecords().sort(function (a, b) { return a.alias - b.alias; });
  var shown = q ? records.filter(function (r) {
    return (r.name || "").toLowerCase().indexOf(q) !== -1 || (r.ref || "").toLowerCase().indexOf(q) !== -1;
  }) : records;
  var tb = $("allTable").querySelector("tbody");
  tb.innerHTML = "";
  $("countBadge").textContent = records.length;
  $("allEmpty").style.display = records.length ? "none" : "block";
  shown.forEach(function (r) {
    var tr = document.createElement("tr");
    var cells = [r.alias, r.name || "", r.ref || "", fmtAmount(r.amount), fmtDate(r.date)];
    cells.forEach(function (v, i) {
      var td = document.createElement("td");
      if (i === 0) { var s = document.createElement("span"); s.className = "badge"; s.textContent = v; td.appendChild(s); }
      else { td.textContent = v; if (i === 3) td.className = "num"; }
      if (i === 1 && r.notes) { var sub = document.createElement("div"); sub.className = "sub"; sub.textContent = r.notes; td.appendChild(sub); }
      tr.appendChild(td);
    });
    var tdA = document.createElement("td"), wrap = document.createElement("div");
    wrap.className = "row-actions";
    var be = document.createElement("button"); be.className = "btn btn-small"; be.type = "button"; be.textContent = t("edit");
    be.addEventListener("click", function () { startEdit(r); });
    var bd = document.createElement("button"); bd.className = "btn btn-small btn-danger"; bd.type = "button"; bd.textContent = t("del");
    bd.addEventListener("click", function () {
      if (!confirm(t("delConfirm") + " #" + r.alias)) return;
      saveRecords(loadRecords().filter(function (x) { return x.alias !== r.alias; }));
      refreshViews();
    });
    wrap.append(be, bd); tdA.appendChild(wrap); tr.appendChild(tdA);
    tb.appendChild(tr);
  });
}
$("filterInput").addEventListener("input", renderAll);
function refreshViews() { renderAll(); renderDash(); if (lastSched) renderSched(lastSched); }

// --- Export ---
function download(filename, text, mime) {
  var a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type: mime }));
  a.download = filename; a.click();
  setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
}
$("exportJsonBtn").addEventListener("click", function () {
  download("rd-agent-backup.json", JSON.stringify(loadRecords(), null, 2), "application/json");
});
$("exportCsvBtn").addEventListener("click", function () {
  var rows = [["Alias", "Name", "Phone", "Reference", "Amount", "OpeningDate", "Notes"]];
  loadRecords().forEach(function (r) { rows.push([r.alias, r.name || "", r.phone || "", r.ref, r.amount, r.date, r.notes || ""]); });
  download("rd-agent-records.csv", rows.map(function (row) {
    return row.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(",");
  }).join("\n"), "text/csv");
});

// --- Import wizard (CSV / Excel with column mapping + preview) ---
var impRows = [];
function parseCsv(text) {
  var rows = [], row = [], cur = "", inQ = false;
  for (var i = 0; i < text.length; i++) {
    var c = text[i];
    if (inQ) {
      if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else inQ = false; }
      else cur += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") { row.push(cur); cur = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cur); cur = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    } else cur += c;
  }
  if (cur !== "" || row.length) { row.push(cur); rows.push(row); }
  return rows;
}
function normDate(v) {
  var s = String(v || "").trim();
  var m = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
  if (m) { var y = m[3].length === 2 ? "20" + m[3] : m[3]; return y + "-" + m[2].padStart(2, "0") + "-" + m[1].padStart(2, "0"); }
  m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return s.slice(0, 10);
  var d = new Date(s);
  return isNaN(d) ? "" : isoLocal(d);
}
var FIELDS = [["", "fSkip"], ["alias", "fAlias"], ["name", "fName"], ["phone", "fPhoneF"], ["ref", "fRef"],
  ["amount", "fAmount"], ["date", "fDate"], ["notes", "fNotes"], ["needstopay", "fNeedsPay"]];
function guessField(head, sample) {
  var h = String(head || "").toLowerCase();
  if (/^(sno|s\.?no|serial|sl\.?no|alias)/.test(h)) return "alias";
  if (/name/.test(h)) return "name";
  if (/phone|mobile|contact/.test(h)) return "phone";
  if (/account|a\/c|ref|number|no\b/.test(h)) return "ref";
  if (/amount|amt|denomination|instal|install|rs/.test(h)) return "amount";
  if (/date|open/.test(h)) return "date";
  if (/note|remark/.test(h)) return "notes";
  return "";
}
$("pickFileBtn").addEventListener("click", function () { $("impFile").click(); });
$("impFile").addEventListener("change", function () {
  var f = this.files[0]; this.value = "";
  if (!f) return;
  $("impFileName").textContent = f.name;
  var done = function (rows) {
    impRows = (rows || []).filter(function (r) { return r && r.some(function (c) { return String(c).trim() !== ""; }); });
    if (!impRows.length) { showMsg($("impMsg"), t("impNone"), false); $("impWizard").style.display = "none"; return; }
    buildWizard(); $("impWizard").style.display = "block"; $("impMsg").className = "msg";
  };
  if (/\.json$/i.test(f.name)) {
    var rd3 = new FileReader();
    rd3.onload = function () {
      try {
        var data = JSON.parse(rd3.result);
        if (!Array.isArray(data) || !data.length) throw 0;
        var keys = [];
        data.forEach(function (o) {
          if (o && typeof o === "object")
            Object.keys(o).forEach(function (k) { if (keys.indexOf(k) === -1) keys.push(k); });
        });
        var rows = [keys].concat(data.map(function (o) {
          return keys.map(function (k) { var v = o ? o[k] : ""; return v === null || v === undefined ? "" : String(v); });
        }));
        done(rows);
      } catch (e) { showMsg($("impMsg"), t("impBadFile"), false); }
    };
    rd3.readAsText(f);
  } else if (/\.(xlsx|xls)$/i.test(f.name) && typeof XLSX !== "undefined") {
    var rd = new FileReader();
    rd.onload = function () {
      try {
        var wb = XLSX.read(rd.result, { type: "array" });
        var ws = wb.Sheets[wb.SheetNames[0]];
        done(XLSX.utils.sheet_to_json(ws, { header: 1, raw: false }));
      } catch (e) { showMsg($("impMsg"), t("impBadFile"), false); }
    };
    rd.readAsArrayBuffer(f);
  } else {
    var rd2 = new FileReader();
    rd2.onload = function () { done(parseCsv(rd2.result)); };
    rd2.readAsText(f);
  }
});
function buildWizard() {
  var ncols = Math.max.apply(null, impRows.map(function (r) { return r.length; }));
  var headRow = impRows[0], dataStart = 0;
  var looksHeader = headRow.some(function (c) { return /[a-zA-Z\u0900-\u0C7F]/.test(String(c)) && isNaN(parseFloat(c)); });
  if (looksHeader) dataStart = 1;
  var mtb = $("impMapTable").querySelector("tbody");
  mtb.innerHTML = "";
  var hr = document.createElement("tr");
  ["colFile", "colField"].forEach(function (k) { var th = document.createElement("th"); th.textContent = t(k); hr.appendChild(th); });
  mtb.appendChild(hr);
  for (var c = 0; c < ncols; c++) {
    (function (ci) {
      var tr = document.createElement("tr");
      var td1 = document.createElement("td");
      var label = looksHeader ? String(headRow[ci] || "") : "";
      var sample = impRows[dataStart] ? String(impRows[dataStart][ci] || "") : "";
      td1.textContent = (label || sample) ? (label ? label + " (e.g. " + sample + ")" : sample) : "Column " + (ci + 1);
      var td2 = document.createElement("td");
      var sel = document.createElement("select");
      sel.setAttribute("data-col", ci);
      FIELDS.forEach(function (fdef) {
        var o = document.createElement("option");
        o.value = fdef[0]; o.textContent = t(fdef[1]);
        sel.appendChild(o);
      });
      sel.value = guessField(label, sample);
      td2.appendChild(sel);
      tr.append(td1, td2);
      mtb.appendChild(tr);
    })(c);
  }
  var pt = $("impPreviewTable");
  pt.querySelector("thead").innerHTML = "";
  pt.querySelector("tbody").innerHTML = "";
  var ph = document.createElement("tr");
  for (var c2 = 0; c2 < ncols; c2++) { var th2 = document.createElement("th"); th2.textContent = "Col " + (c2 + 1); ph.appendChild(th2); }
  pt.querySelector("thead").appendChild(ph);
  impRows.slice(0, 5).forEach(function (row) {
    var tr2 = document.createElement("tr");
    for (var c3 = 0; c3 < ncols; c3++) { var td3 = document.createElement("td"); td3.textContent = row[c3] || ""; tr2.appendChild(td3); }
    pt.querySelector("tbody").appendChild(tr2);
  });
  pt.setAttribute("data-start", dataStart);
}
$("impRunBtn").addEventListener("click", async function () {
  var map = {};
  document.querySelectorAll("#impMapTable select").forEach(function (sel) {
    if (sel.value) map[sel.value] = parseInt(sel.getAttribute("data-col"), 10);
  });
  var msg = $("impMsg");
  if (map.ref === undefined && map.name === undefined) return showMsg(msg, t("impNeedRef"), false);
  var start = parseInt($("impPreviewTable").getAttribute("data-start") || "0", 10);
  var records = loadRecords();
  var alias = records.reduce(function (m, r) { return Math.max(m, r.alias || 0); }, 0);
  var added = 0, dup = 0;
  var curMk = monthKey(new Date());
  function truthy(v) {
    var s = String(v).trim().toLowerCase();
    return s === "1" || s === "true" || s === "yes";
  }
  impRows.slice(start).forEach(function (row) {
    var ref = map.ref !== undefined ? String(row[map.ref] || "").trim() : "";
    var name = map.name !== undefined ? String(row[map.name] || "").trim() : "";
    if (!ref && !name) return;
    if (ref && records.some(function (r) { return r.ref === ref; })) { dup++; return; }
    var amt = map.amount !== undefined ? parseFloat(String(row[map.amount]).replace(/[^0-9.]/g, "")) : NaN;
    var useAlias = alias + 1;
    if (map.alias !== undefined) {
      var parsed = parseInt(String(row[map.alias]).trim(), 10);
      if (isFinite(parsed) && parsed > 0 && !records.some(function (r) { return r.alias === parsed; })) useAlias = parsed;
    }
    var paid = {};
    if (map.needstopay !== undefined && !truthy(row[map.needstopay])) paid[curMk] = true;
    alias = Math.max(alias, useAlias);
    records.push({ alias: useAlias, name: name,
      phone: map.phone !== undefined ? String(row[map.phone] || "").trim() : "",
      ref: ref, amount: isFinite(amt) ? amt : 0,
      date: map.date !== undefined ? normDate(row[map.date]) : "",
      notes: map.notes !== undefined ? String(row[map.notes] || "").trim() : "", paid: paid });
    added++;
  });
  if (!(await saveRecords(records))) return; refreshViews();
  showMsg(msg, added + t("impDone") + (dup ? dup + t("impDup") : ""), added > 0);
  $("impWizard").style.display = added ? "none" : "block";
});

// --- Init ---
async function init() {
  applyLang();
  if (cloudEnabled()) {
    if(!window.supabase){ document.body.textContent="Login could not load. Check your connection and reload."; return; }
    sb = window.supabase.createClient(RD_CONFIG.SUPABASE_URL, RD_CONFIG.SUPABASE_ANON_KEY);
    $("signInBtn").addEventListener("click", function () { doAuth("in"); });
    $("signUpBtn").addEventListener("click", function () { doAuth("up"); });
    $("signOutBtn").addEventListener("click", async function () { await sb.auth.signOut(); });
    sb.auth.onAuthStateChange(function (ev, s) {
      if (session && s && session.user.id === s.user.id && ev === "TOKEN_REFRESHED") { session=s; return; }
      session=s; cache=[]; cloudReady=false; adminOpen={};
      $("adminTable").querySelector("tbody").textContent="";
      $("resultsWrap").style.display="none";
      resetForm(); refreshViews(); updateAuthUI();
      if(s) setTimeout(async function(){ await loadCloud(); await loadRole(); refreshViews(); },0);
      else {isAdmin=false; $("adminCard").style.display="none";}
    });
    var s = await sb.auth.getSession();
    session = s.data.session;
    if (session) { cache = []; await loadCloud(); await loadRole(); }
  } else {
    cache = localLoad();
  }
  updateAuthUI();
  refreshViews();
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
}
init();
})();
