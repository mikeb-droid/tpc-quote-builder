import { useState, useRef } from "react";

const GOLD = "#F5A800";
const BLACK = "#111111";
const WHITE = "#ffffff";
const LIGHT_GRAY = "#f7f7f5";
const MID_GRAY = "#e8e6e1";

// Drop your logo file into src/assets/ and update this import
// import logo from './assets/logo.png'
// For now we use a text fallback — replace with: <img src={logo} ... />
const PHONE = "(904) 426-3977";

const COCKROACH_SVG = `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="80" rx="22" ry="16" fill="FILL"/>
  <ellipse cx="100" cy="80" rx="16" ry="11" fill="FILL2"/>
  <ellipse cx="93" cy="76" rx="7" ry="8" fill="FILL2"/>
  <ellipse cx="107" cy="76" rx="7" ry="8" fill="FILL2"/>
  <circle cx="92" cy="74" r="3" fill="white"/>
  <circle cx="108" cy="74" r="3" fill="white"/>
  <circle cx="93" cy="74" r="1.5" fill="black"/>
  <circle cx="109" cy="74" r="1.5" fill="black"/>
  <path d="M90 66 Q82 50 72 40" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M112 66 Q120 50 130 40" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="100" cy="150" rx="28" ry="52" fill="FILL"/>
  <ellipse cx="100" cy="145" rx="22" ry="44" fill="FILL2"/>
  <line x1="84" y1="122" x2="84" y2="142" stroke="STROKE2" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="100" y1="116" x2="100" y2="144" stroke="STROKE2" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="116" y1="122" x2="116" y2="142" stroke="STROKE2" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M74 112 Q50 102 28 108" stroke="STROKE" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M74 130 Q48 128 24 130" stroke="STROKE" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M74 150 Q50 154 28 164" stroke="STROKE" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M126 112 Q150 102 172 108" stroke="STROKE" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M126 130 Q152 128 176 130" stroke="STROKE" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M126 150 Q150 154 172 164" stroke="STROKE" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M28 108 Q18 104 12 98" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M24 130 Q14 130 8 124" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M28 164 Q18 170 14 180" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M172 108 Q182 104 188 98" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M176 130 Q186 130 192 124" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M172 164 Q182 170 186 180" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
</svg>`;

const TERMITE_SVG = `<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="52" rx="20" ry="24" fill="FILL"/>
  <ellipse cx="93" cy="46" rx="6" ry="7" fill="FILL2"/>
  <ellipse cx="107" cy="46" rx="6" ry="7" fill="FILL2"/>
  <circle cx="92" cy="44" r="2.5" fill="white"/>
  <circle cx="108" cy="44" r="2.5" fill="white"/>
  <circle cx="93" cy="44" r="1.2" fill="black"/>
  <circle cx="109" cy="44" r="1.2" fill="black"/>
  <path d="M88 30 Q80 16 72 8" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M112 30 Q120 16 128 8" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="100" cy="120" rx="26" ry="30" fill="FILL"/>
  <ellipse cx="100" cy="118" rx="20" ry="24" fill="FILL2"/>
  <line x1="86" y1="104" x2="86" y2="118" stroke="STROKE2" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="100" y1="100" x2="100" y2="122" stroke="STROKE2" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="114" y1="104" x2="114" y2="118" stroke="STROKE2" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M76 105 Q52 96 30 102" stroke="STROKE" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M75 120 Q50 120 26 120" stroke="STROKE" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M124 105 Q148 96 170 102" stroke="STROKE" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M125 120 Q150 120 174 120" stroke="STROKE" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M30 102 Q20 98 14 92" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M26 120 Q16 120 10 114" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M170 102 Q180 98 186 92" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M174 120 Q184 120 190 114" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="100" cy="210" rx="22" ry="32" fill="FILL"/>
  <ellipse cx="100" cy="208" rx="16" ry="26" fill="FILL2"/>
</svg>`;

const MOSQUITO_SVG = `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="130" rx="10" ry="28" fill="FILL"/>
  <ellipse cx="100" cy="76" rx="14" ry="18" fill="FILL"/>
  <ellipse cx="94" cy="70" rx="5" ry="6" fill="FILL2"/>
  <ellipse cx="106" cy="70" rx="5" ry="6" fill="FILL2"/>
  <circle cx="93" cy="69" r="2" fill="white"/>
  <circle cx="107" cy="69" r="2" fill="white"/>
  <circle cx="94" cy="69" r="1" fill="black"/>
  <circle cx="108" cy="69" r="1" fill="black"/>
  <path d="M100 60 Q98 44 96 28" stroke="STROKE" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M100 60 Q102 44 104 28" stroke="STROKE" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M88 82 Q60 62 24 68" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M88 88 Q60 74 22 76" stroke="STROKE" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <path d="M112 82 Q140 62 176 68" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M112 88 Q140 74 178 76" stroke="STROKE" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <path d="M90 108 Q66 120 42 140" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M110 108 Q134 120 158 140" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M90 116 Q68 130 48 154" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M110 116 Q132 130 152 154" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M100 158 Q97 178 94 200" stroke="STROKE" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M100 158 Q100 178 100 198" stroke="STROKE" stroke-width="1" fill="none" stroke-linecap="round"/>
</svg>`;

const RODENT_SVG = `<svg viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="85" cy="110" rx="60" ry="45" fill="FILL"/>
  <ellipse cx="85" cy="106" rx="50" ry="36" fill="FILL2"/>
  <ellipse cx="155" cy="75" rx="36" ry="32" fill="FILL"/>
  <ellipse cx="155" cy="74" rx="28" ry="24" fill="FILL2"/>
  <ellipse cx="142" cy="46" rx="14" ry="20" fill="FILL"/>
  <ellipse cx="166" cy="42" rx="12" ry="18" fill="FILL"/>
  <ellipse cx="141" cy="45" rx="10" ry="15" fill="FILL2"/>
  <ellipse cx="166" cy="41" rx="9" ry="14" fill="FILL2"/>
  <circle cx="162" cy="72" r="5" fill="white"/>
  <circle cx="163" cy="71" r="2.5" fill="black"/>
  <path d="M172 80 Q186 74 198 68" stroke="STROKE" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M174 86 Q188 85 200 84" stroke="STROKE" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M172 92 Q186 96 198 102" stroke="STROKE" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M198 68 Q206 64 210 60" stroke="STROKE" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <path d="M200 84 Q208 83 212 82" stroke="STROKE" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <path d="M198 102 Q206 106 210 110" stroke="STROKE" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <path d="M28 128 Q10 142 6 160 Q22 152 28 138" fill="FILL" stroke="none"/>
  <path d="M34 136 Q16 152 14 170 Q30 160 34 146" fill="FILL2" stroke="none"/>
</svg>`;

function makeSvg(template, dark) {
  if (dark) {
    return template
      .replace(/FILL2/g, "#c88500")
      .replace(/FILL/g, "#F5A800")
      .replace(/STROKE2/g, "#e09500")
      .replace(/STROKE/g, "#F5A800");
  }
  return template
    .replace(/FILL2/g, "#2e2e2e")
    .replace(/FILL/g, "#1a1a1a")
    .replace(/STROKE2/g, "#444")
    .replace(/STROKE/g, "#1a1a1a");
}

const SVGS = {
  general: COCKROACH_SVG,
  termite: TERMITE_SVG,
  mosquito: MOSQUITO_SVG,
  rodent: RODENT_SVG,
};

const SERVICES = [
  {
    id: "general", label: "General Pest Control",
    findings: ["No Activity Observed", "Minor Activity", "Moderate Activity", "Heavy Activity"],
    pests: ["Ants", "Cockroaches", "Spiders", "Silverfish", "Earwigs", "Stink Bugs", "Other"],
  },
  {
    id: "termite", label: "Termite Control",
    findings: ["No Evidence of Active Termites", "Termite Damage (Old)", "Active Infestation", "Evidence of Previous Treatment"],
    pests: ["Subterranean Termites", "Drywood Termites", "Formosan Termites"],
  },
  {
    id: "mosquito", label: "Mosquito, Flea & Tick",
    findings: ["No Activity Observed", "Adult Mosquitoes Present", "Breeding Sites Found", "Conducive Conditions"],
    pests: ["Mosquitoes", "Fleas", "Ticks"],
  },
  {
    id: "rodent", label: "Rodent & Wildlife",
    findings: ["No Visible Activity", "Droppings Found", "Entry Points Identified", "Active Infestation"],
    pests: ["Mice", "Rats", "Squirrels", "Raccoons", "Other Wildlife"],
  },
];

const initService = () => ({
  included: false, finding: "", pestsFound: [], notes: "",
  photos: [], label: "", initial: "", recurring: "", freq: "Monthly",
});

export default function App() {
  const [form, setForm] = useState({
    inspector: "",
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    customer: { name: "", address: "", city: "", phone: "", email: "" },
    structureType: "Slab",
    services: Object.fromEntries(SERVICES.map((s) => [s.id, initService()])),
    overallNotes: "",
  });
  const [view, setView] = useState("form");
  const fileRefs = useRef({});

  const updateCustomer = (f, v) => setForm((p) => ({ ...p, customer: { ...p.customer, [f]: v } }));
  const updateService = (id, f, v) => setForm((p) => ({ ...p, services: { ...p.services, [id]: { ...p.services[id], [f]: v } } }));
  const updatePricing = (id, f, v) => setForm((p) => ({ ...p, services: { ...p.services, [id]: { ...p.services[id], [f]: v } } }));
  const togglePest = (id, pest) => {
    const cur = form.services[id].pestsFound;
    updateService(id, "pestsFound", cur.includes(pest) ? cur.filter((p) => p !== pest) : [...cur, pest]);
  };
  const handlePhotos = (id, files) => {
    Promise.all(Array.from(files).map((f) => new Promise((res) => { const r = new FileReader(); r.onload = (e) => res(e.target.result); r.readAsDataURL(f); })))
      .then((imgs) => updateService(id, "photos", [...form.services[id].photos, ...imgs]));
  };
  const removePhoto = (id, idx) => updateService(id, "photos", form.services[id].photos.filter((_, i) => i !== idx));

  const activeServices = SERVICES.filter((s) => form.services[s.id].included);
  const totalInitial = activeServices.reduce((s, svc) => s + (parseFloat(form.services[svc.id].initial) || 0), 0);
  const quoteId = "TPC-" + Date.now().toString().slice(-6);

  const isBad = (f) => /active|heavy|moderate|infestation|breeding|droppings/i.test(f);
  const fmt = (n) => n ? "$" + parseFloat(n).toFixed(2) : "—";

  const IconEl = ({ id, dark, size = 40 }) => (
    <span
      style={{ display: "inline-flex", alignItems: "center", width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: makeSvg(SVGS[id], dark).replace('<svg ', `<svg width="${size}" height="${size}" `) }}
    />
  );

  // ── STYLES ──
  const s = {
    topBar: { background: BLACK, padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `3px solid ${GOLD}`, position: "sticky", top: 0, zIndex: 100 },
    topTitle: { color: GOLD, fontWeight: 800, fontSize: 16, letterSpacing: 1, textTransform: "uppercase" },
    tab: (on) => ({ padding: "7px 18px", borderRadius: 6, border: `2px solid ${GOLD}`, background: on ? GOLD : "transparent", color: on ? BLACK : GOLD, fontWeight: 700, cursor: "pointer", fontSize: 12 }),
    body: { maxWidth: 860, margin: "0 auto", padding: "24px 16px 60px" },
    card: { background: WHITE, borderRadius: 10, boxShadow: "0 2px 10px rgba(0,0,0,.07)", marginBottom: 16, overflow: "hidden" },
    cardHead: { background: BLACK, color: GOLD, padding: "12px 18px", fontWeight: 800, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" },
    cardBody: { padding: 18 },
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 },
    lbl: { display: "block", fontSize: 10, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: .8, marginBottom: 4 },
    input: { width: "100%", padding: "8px 11px", border: "1.5px solid #ddd", borderRadius: 7, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" },
    textarea: { width: "100%", padding: "8px 11px", border: "1.5px solid #ddd", borderRadius: 7, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box", minHeight: 64, resize: "vertical" },
    select: { width: "100%", padding: "8px 11px", border: "1.5px solid #ddd", borderRadius: 7, fontSize: 13, fontFamily: "inherit", outline: "none", background: WHITE, boxSizing: "border-box" },
    toggle: (on) => ({ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", cursor: "pointer", borderBottom: `2px solid ${on ? GOLD : "transparent"}`, background: on ? "#fffbf0" : WHITE, userSelect: "none" }),
    switch: (on) => ({ width: 38, height: 20, borderRadius: 10, background: on ? GOLD : "#ccc", position: "relative", marginLeft: "auto", flexShrink: 0 }),
    knob: (on) => ({ position: "absolute", top: 2, left: on ? 20 : 2, width: 16, height: 16, borderRadius: "50%", background: WHITE, boxShadow: "0 1px 3px rgba(0,0,0,.25)", transition: "left .15s" }),
    chip: (on) => ({ display: "inline-flex", padding: "3px 10px", borderRadius: 16, border: `1.5px solid ${on ? GOLD : "#ddd"}`, background: on ? "#fffbf0" : WHITE, color: on ? "#b07800" : "#888", fontWeight: on ? 700 : 400, fontSize: 11, cursor: "pointer", margin: "3px 4px 3px 0" }),
    pricingRow: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 8, marginTop: 10, padding: 12, background: "#f9f9f7", borderRadius: 7, border: `1px solid ${MID_GRAY}` },
    photoGrid: { display: "flex", flexWrap: "wrap", gap: 7, marginTop: 8 },
    thumb: { position: "relative", width: 72, height: 72, borderRadius: 7, overflow: "hidden", border: `2px solid ${MID_GRAY}` },
    uploadBtn: { display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 12px", border: `1.5px dashed ${GOLD}`, borderRadius: 7, background: "#fffbf0", color: "#b07800", fontWeight: 600, fontSize: 11, cursor: "pointer" },
    genBtn: { display: "block", width: "100%", padding: 14, background: GOLD, color: BLACK, border: "none", borderRadius: 9, fontWeight: 800, fontSize: 14, letterSpacing: 1, cursor: "pointer", textTransform: "uppercase", marginTop: 6 },
  };

  const ps = {
    page: { background: WHITE, maxWidth: 860, margin: "0 auto", fontFamily: "'Segoe UI', system-ui, sans-serif" },
    header: { background: BLACK, padding: "22px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" },
    logoText: { color: GOLD, fontWeight: 900, fontSize: 24, letterSpacing: 2, textTransform: "uppercase", lineHeight: 1 },
    logoSub: { color: "#aaa", fontSize: 10, letterSpacing: 1, marginTop: 3 },
    infoBar: { background: "#1e1e1e", padding: "14px 32px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, borderBottom: `3px solid ${GOLD}` },
    infoLbl: { fontSize: 9, color: GOLD, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginBottom: 2 },
    infoVal: { fontSize: 12, fontWeight: 500, color: WHITE },
    infoSub: { fontSize: 10, color: "#aaa", marginTop: 1 },
    sections: { padding: "0 32px 20px" },
    secHead: { background: BLACK, color: GOLD, padding: "10px 16px", fontWeight: 800, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8, marginTop: 18, borderRadius: "7px 7px 0 0" },
    secBody: { border: `1.5px solid ${MID_GRAY}`, borderTop: "none", borderRadius: "0 0 7px 7px", padding: "14px 16px" },
    badge: (bad) => ({ display: "inline-block", padding: "3px 10px", borderRadius: 16, fontWeight: 700, fontSize: 11, marginBottom: 8, background: bad ? "#fff3cd" : "#e8f5e9", color: bad ? "#856404" : "#2e7d32", border: `1px solid ${bad ? "#ffc107" : "#66bb6a"}` }),
    detailLbl: { fontSize: 9, color: "#aaa", textTransform: "uppercase", letterSpacing: .7, fontWeight: 700, marginBottom: 3 },
    pestTag: { background: "#f5f5f5", border: `1px solid #ddd`, borderRadius: 3, padding: "2px 7px", fontSize: 10, color: "#444", marginRight: 4, marginBottom: 4, display: "inline-block" },
    pricingBox: { marginTop: 12, padding: "11px 14px", background: "#fffbf0", borderRadius: 7, border: `1.5px solid ${GOLD}` },
    table: { width: "100%", borderCollapse: "collapse", marginTop: 18, fontSize: 12 },
    th: { background: "#f0f0ee", padding: "7px 10px", textAlign: "left", fontSize: 9, textTransform: "uppercase", letterSpacing: .7, color: "#666", fontWeight: 700 },
    td: { padding: "9px 10px", borderBottom: `1px solid ${MID_GRAY}` },
    footer: { background: BLACK, padding: "18px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 },
    disc: { fontSize: 9, color: "#999", lineHeight: 1.6, padding: "14px 32px", borderTop: `1px solid ${MID_GRAY}` },
    printBar: { maxWidth: 860, margin: "0 auto", padding: "16px 14px 8px", display: "flex", gap: 8 },
    printBtn: { padding: "10px 24px", background: BLACK, color: GOLD, border: `2px solid ${GOLD}`, borderRadius: 7, fontWeight: 800, fontSize: 12, cursor: "pointer" },
    backBtn: { padding: "10px 24px", background: "transparent", color: "#555", border: "2px solid #ccc", borderRadius: 7, fontWeight: 700, fontSize: 12, cursor: "pointer" },
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: LIGHT_GRAY, minHeight: "100vh" }}>
      {/* Top Bar */}
      <div style={s.topBar}>
        <div style={s.topTitle}>⚡ TPC Quote Builder</div>
        <div style={{ display: "flex", gap: 6 }}>
          <button style={s.tab(view === "form")} onClick={() => setView("form")}>Form</button>
          <button style={s.tab(view === "preview")} onClick={() => setView("preview")}>Preview</button>
        </div>
      </div>

      {/* ── FORM ── */}
      {view === "form" && (
        <div style={s.body}>
          {/* Inspector */}
          <div style={s.card}>
            <div style={s.cardHead}>📋 Inspector & Date</div>
            <div style={s.cardBody}>
              <div style={s.grid2}>
                <div><label style={s.lbl}>Inspector Name</label><input style={s.input} value={form.inspector} onChange={(e) => setForm((p) => ({ ...p, inspector: e.target.value }))} placeholder="Your name" /></div>
                <div><label style={s.lbl}>Date</label><input style={s.input} value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} /></div>
              </div>
            </div>
          </div>

          {/* Customer */}
          <div style={s.card}>
            <div style={s.cardHead}>👤 Customer Information</div>
            <div style={s.cardBody}>
              <div style={s.grid2}>
                <div><label style={s.lbl}>Customer Name</label><input style={s.input} value={form.customer.name} onChange={(e) => updateCustomer("name", e.target.value)} placeholder="Full name" /></div>
                <div><label style={s.lbl}>Phone</label><input style={s.input} value={form.customer.phone} onChange={(e) => updateCustomer("phone", e.target.value)} placeholder="(904) 000-0000" /></div>
              </div>
              <div style={{ marginBottom: 12 }}><label style={s.lbl}>Email</label><input style={s.input} value={form.customer.email} onChange={(e) => updateCustomer("email", e.target.value)} placeholder="email@example.com" /></div>
              <div style={s.grid2}>
                <div><label style={s.lbl}>Street Address</label><input style={s.input} value={form.customer.address} onChange={(e) => updateCustomer("address", e.target.value)} placeholder="123 Main St" /></div>
                <div><label style={s.lbl}>City, ZIP</label><input style={s.input} value={form.customer.city} onChange={(e) => updateCustomer("city", e.target.value)} placeholder="Jacksonville, FL 32256" /></div>
              </div>
              <div>
                <label style={s.lbl}>Structure Type</label>
                <select style={s.select} value={form.structureType} onChange={(e) => setForm((p) => ({ ...p, structureType: e.target.value }))}>
                  {["Slab", "Crawl Space", "Basement", "Pier & Beam", "Mixed"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Services */}
          {SERVICES.map((svc) => {
            const d = form.services[svc.id];
            return (
              <div key={svc.id} style={s.card}>
                <div style={s.toggle(d.included)} onClick={() => updateService(svc.id, "included", !d.included)}>
                  <IconEl id={svc.id} dark={false} size={36} />
                  <span style={{ fontWeight: 700, fontSize: 14, color: d.included ? BLACK : "#888" }}>{svc.label}</span>
                  <div style={s.switch(d.included)}><div style={s.knob(d.included)} /></div>
                </div>
                {d.included && (
                  <div style={s.cardBody}>
                    <div style={{ marginBottom: 12 }}>
                      <label style={s.lbl}>Inspection Finding</label>
                      <select style={s.select} value={d.finding} onChange={(e) => updateService(svc.id, "finding", e.target.value)}>
                        <option value="">— Select finding —</option>
                        {svc.findings.map((f) => <option key={f}>{f}</option>)}
                      </select>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <label style={s.lbl}>Pests / Activity Observed</label>
                      <div>{svc.pests.map((pest) => <span key={pest} style={s.chip(d.pestsFound.includes(pest))} onClick={() => togglePest(svc.id, pest)}>{pest}</span>)}</div>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <label style={s.lbl}>Inspector Notes</label>
                      <textarea style={s.textarea} value={d.notes} onChange={(e) => updateService(svc.id, "notes", e.target.value)} placeholder="Observations, recommendations..." />
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <label style={s.lbl}>Photos</label>
                      <div style={s.photoGrid}>
                        {d.photos.map((src, i) => (
                          <div key={i} style={s.thumb}>
                            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <button onClick={() => removePhoto(svc.id, i)} style={{ position: "absolute", top: 2, right: 2, background: "rgba(0,0,0,.6)", color: WHITE, border: "none", borderRadius: "50%", width: 16, height: 16, fontSize: 9, cursor: "pointer" }}>✕</button>
                          </div>
                        ))}
                        <div style={s.uploadBtn} onClick={() => fileRefs.current[svc.id]?.click()}>📷 Add Photos</div>
                        <input ref={(el) => (fileRefs.current[svc.id] = el)} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => handlePhotos(svc.id, e.target.files)} />
                      </div>
                    </div>
                    <div style={s.pricingRow}>
                      <div><label style={s.lbl}>Plan / Label</label><input style={s.input} value={d.label} onChange={(e) => updatePricing(svc.id, "label", e.target.value)} placeholder="e.g. Quarterly Plan" /></div>
                      <div><label style={s.lbl}>Initial ($)</label><input style={s.input} type="number" value={d.initial} onChange={(e) => updatePricing(svc.id, "initial", e.target.value)} placeholder="99" /></div>
                      <div><label style={s.lbl}>Recurring ($)</label><input style={s.input} type="number" value={d.recurring} onChange={(e) => updatePricing(svc.id, "recurring", e.target.value)} placeholder="49" /></div>
                      <div>
                        <label style={s.lbl}>Frequency</label>
                        <select style={s.select} value={d.freq} onChange={(e) => updatePricing(svc.id, "freq", e.target.value)}>
                          {["Monthly", "Quarterly", "Annually", "One-Time"].map((f) => <option key={f}>{f}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Overall Notes */}
          <div style={s.card}>
            <div style={s.cardHead}>📝 Overall Notes</div>
            <div style={s.cardBody}>
              <textarea style={s.textarea} value={form.overallNotes} onChange={(e) => setForm((p) => ({ ...p, overallNotes: e.target.value }))} placeholder="General observations for the customer..." />
            </div>
          </div>

          <button style={s.genBtn} onClick={() => setView("preview")}>Generate Customer Quote →</button>
        </div>
      )}

      {/* ── PREVIEW ── */}
      {view === "preview" && (
        <div>
          <div style={ps.printBar}>
            <button style={ps.printBtn} onClick={() => window.print()}>🖨️ Print / Save PDF</button>
            <button style={ps.backBtn} onClick={() => setView("form")}>← Back to Edit</button>
          </div>
          <div style={ps.page} id="quote-preview">
            <div style={ps.header}>
              {/* LOGO: Replace the div below with <img src={logo} style={{height:72}} alt="The Pest Company" /> after adding logo to src/assets/ */}
              <div>
                <div style={ps.logoText}>The Pest Company</div>
                <div style={ps.logoSub}>Jacksonville, FL · License #JB500238 · pestcofl.com</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: WHITE, fontWeight: 800, fontSize: 18, letterSpacing: 1 }}>INSPECTION REPORT & QUOTE</div>
                <div style={{ color: GOLD, fontSize: 11, marginTop: 3 }}>Quote #{quoteId}</div>
                <div style={{ color: "#aaa", fontSize: 10, marginTop: 2 }}>{form.date}</div>
              </div>
            </div>

            <div style={ps.infoBar}>
              <div><div style={ps.infoLbl}>Customer</div><div style={ps.infoVal}>{form.customer.name || "—"}</div><div style={ps.infoSub}>{form.customer.phone}</div></div>
              <div><div style={ps.infoLbl}>Property</div><div style={ps.infoVal}>{form.customer.address || "—"}</div><div style={ps.infoSub}>{form.customer.city}</div></div>
              <div><div style={ps.infoLbl}>Structure / Inspector</div><div style={ps.infoVal}>{form.structureType}</div><div style={ps.infoSub}>{form.inspector || "—"}</div></div>
            </div>

            <div style={ps.sections}>
              {activeServices.length === 0 && <div style={{ padding: 40, textAlign: "center", color: "#aaa" }}>No services selected.</div>}
              {activeServices.map((svc) => {
                const d = form.services[svc.id];
                const bad = isBad(d.finding);
                return (
                  <div key={svc.id}>
                    <div style={ps.secHead}>
                      <IconEl id={svc.id} dark={true} size={24} />
                      {svc.label}
                    </div>
                    <div style={ps.secBody}>
                      {d.finding && <span style={ps.badge(bad)}>{d.finding}</span>}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                        {d.pestsFound.length > 0 && <div><div style={ps.detailLbl}>Activity / Pests Observed</div><div>{d.pestsFound.map((p) => <span key={p} style={ps.pestTag}>{p}</span>)}</div></div>}
                        {d.notes && <div><div style={ps.detailLbl}>Inspector Notes</div><div style={{ fontSize: 12, color: "#333" }}>{d.notes}</div></div>}
                      </div>
                      {d.photos.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 10 }}>{d.photos.map((src, i) => <img key={i} src={src} alt="" style={{ width: 90, height: 72, objectFit: "cover", borderRadius: 5, border: `2px solid ${MID_GRAY}` }} />)}</div>}
                      {(d.initial || d.recurring) && (
                        <div style={ps.pricingBox}>
                          <div style={{ fontWeight: 700, fontSize: 12, color: BLACK, marginBottom: 6 }}>{d.label || svc.label}</div>
                          <div style={{ display: "flex", gap: 20 }}>
                            {d.initial && <div><div style={ps.detailLbl}>Initial / One-Time</div><div style={{ fontWeight: 800, fontSize: 17 }}>{fmt(d.initial)}</div></div>}
                            {d.recurring && <div><div style={ps.detailLbl}>Recurring</div><div style={{ fontWeight: 800, fontSize: 17 }}>{fmt(d.recurring)}<span style={{ fontSize: 10, fontWeight: 400, color: "#888" }}> / {d.freq}</span></div></div>}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {activeServices.length > 0 && (
                <table style={ps.table}>
                  <thead>
                    <tr>
                      <th style={ps.th}>Service</th>
                      <th style={{ ...ps.th, textAlign: "right" }}>Initial</th>
                      <th style={{ ...ps.th, textAlign: "right" }}>Recurring</th>
                      <th style={{ ...ps.th, textAlign: "right" }}>Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeServices.map((svc) => {
                      const d = form.services[svc.id];
                      return (
                        <tr key={svc.id}>
                          <td style={ps.td}>{d.label || svc.label}</td>
                          <td style={{ ...ps.td, textAlign: "right" }}>{fmt(d.initial)}</td>
                          <td style={{ ...ps.td, textAlign: "right" }}>{fmt(d.recurring)}</td>
                          <td style={{ ...ps.td, textAlign: "right", fontSize: 10, color: "#888" }}>{d.recurring ? d.freq : "—"}</td>
                        </tr>
                      );
                    })}
                    <tr style={{ background: BLACK }}>
                      <td style={{ ...ps.td, color: WHITE, fontWeight: 800, borderBottom: "none" }}>Total Due Today</td>
                      <td colSpan={3} style={{ ...ps.td, textAlign: "right", color: GOLD, fontSize: 16, fontWeight: 800, borderBottom: "none" }}>${totalInitial.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              )}

              {form.overallNotes && (
                <div style={{ marginTop: 16, padding: "13px 15px", background: "#f9f9f7", borderRadius: 7, border: `1px solid ${MID_GRAY}` }}>
                  <div style={ps.detailLbl}>Additional Notes</div>
                  <div style={{ fontSize: 12, color: "#444", lineHeight: 1.6 }}>{form.overallNotes}</div>
                </div>
              )}
            </div>

            <div style={ps.disc}>
              This report includes findings from accessible and visible areas only. Wood destroying organisms may infest or become active at any time. No warranty is provided as part of this inspection. It should be assumed that most homes in Florida will at some point be infested by termites and/or other wood destroying organisms.
            </div>

            <div style={ps.footer}>
              <div>
                <div style={{ color: GOLD, fontWeight: 700, fontSize: 12 }}>The Pest Company</div>
                <div style={{ color: "#aaa", fontSize: 10, marginTop: 2 }}>pestcofl.com · License #JB500238</div>
                <div style={{ color: "#aaa", fontSize: 10, marginTop: 2 }}>BBB Accredited · FPMA & NPMA Member</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: GOLD, fontWeight: 700, fontSize: 11 }}>Questions? Call or text us</div>
                <div style={{ color: WHITE, fontSize: 14, fontWeight: 600, marginTop: 4 }}>{PHONE}</div>
                <div style={{ color: "#aaa", fontSize: 10, marginTop: 2 }}>pestcofl.com</div>
              </div>
            </div>
          </div>
          <style>{`@media print { body > *:not(#root) { display: none; } .print-hide { display: none !important; } #quote-preview * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } }`}</style>
        </div>
      )}
    </div>
  );
}
