import React, { useMemo, useState } from "react";
import { exportCsv, loadItems, saveItems } from "../lib/storage";

const KEY = "verge-chartering-positions";
const empty = { vessel: "", type: "AHTS", location: "", availability: "", rate: "", status: "New", publicNotes: "", privateNotes: "" };
const cps = ["SUPPLYTIME", "TOWCON", "TOWHIRE", "BARECON", "HEAVYCON", "PROJECTCON", "GENCON", "NYPE", "WINDTIME"];

function buildRequest(item) {
  return `Good day,\n\nPlease advise whether below unit may be available basis indication:\n\nVessel / Ref: ${item.vessel || "TBA"}\nType: ${item.type || "TBA"}\nLocation: ${item.location || "TBA"}\nAvailability: ${item.availability || "TBA"}\nRate indication: ${item.rate || "TBA"}\nPublic notes: ${item.publicNotes || "TBA"}\n\nAll details are given in good faith, subject to owners' final confirmation, availability and contract terms.\n\nAlways at your disposal.`;
}

export default function Chartering() {
  const [items, setItems] = useState(() => loadItems(KEY));
  const [form, setForm] = useState(empty);
  const [template, setTemplate] = useState("Select a vessel position and copy an owner/client message.");
  const stats = useMemo(() => ({ total: items.length, hot: items.filter((x) => x.status === "Hot").length, fixed: items.filter((x) => x.status === "Fixed").length }), [items]);
  function update(field, value) { setForm((current) => ({ ...current, [field]: value })); }
  function save(e) { e.preventDefault(); const next = [{ ...form, id: Date.now() }, ...items]; setItems(next); saveItems(KEY, next); setForm(empty); }
  function remove(id) { const next = items.filter((item) => item.id !== id); setItems(next); saveItems(KEY, next); }
  function copy(item) { const text = buildRequest(item); setTemplate(text); navigator.clipboard?.writeText(text); }

  return (
    <div className="v-page"><div className="v-page-inner space-y-5">
      <section className="v-surface v-card"><p className="v-eyebrow">Chartering desk</p><h1 className="v-title">Vessel positions and chartering leads.</h1><p className="v-muted max-w-3xl">Track offshore support, towage, PSV, AHTS, barges and project vessel opportunities inside the Verge-App parent system.</p></section>
      <section className="v-grid-3"><div className="v-surface v-card"><p className="v-eyebrow">Total</p><h2 className="text-4xl font-black">{stats.total}</h2><p className="v-muted">Positions</p></div><div className="v-surface v-card"><p className="v-eyebrow">Hot</p><h2 className="text-4xl font-black">{stats.hot}</h2><p className="v-muted">High potential</p></div><div className="v-surface v-card"><p className="v-eyebrow">Fixed</p><h2 className="text-4xl font-black">{stats.fixed}</h2><p className="v-muted">Successful</p></div></section>
      <section className="v-grid-2">
        <form onSubmit={save} className="v-surface v-card v-form">
          <label className="v-label">Vessel / Ref<input className="v-input" value={form.vessel} onChange={(e) => update("vessel", e.target.value)} required /></label>
          <label className="v-label">Type<select className="v-input" value={form.type} onChange={(e) => update("type", e.target.value)}><option>AHTS</option><option>AHT / Tug</option><option>PSV</option><option>MPSV / OSV</option><option>Barge</option><option>Crew Boat / FSV</option><option>Survey Vessel</option><option>DSV</option><option>Other</option></select></label>
          <label className="v-label">Region / Location<input className="v-input" value={form.location} onChange={(e) => update("location", e.target.value)} /></label>
          <label className="v-label">Availability<input className="v-input" value={form.availability} onChange={(e) => update("availability", e.target.value)} /></label>
          <label className="v-label">Rate indication<input className="v-input" value={form.rate} onChange={(e) => update("rate", e.target.value)} /></label>
          <label className="v-label">Status<select className="v-input" value={form.status} onChange={(e) => update("status", e.target.value)}><option>New</option><option>Hot</option><option>Checking</option><option>Quoted</option><option>Fixed</option><option>Closed</option></select></label>
          <label className="v-label v-wide">Public specs / notes<textarea className="v-input" value={form.publicNotes} onChange={(e) => update("publicNotes", e.target.value)} /></label>
          <label className="v-label v-wide">Internal notes<textarea className="v-input" value={form.privateNotes} onChange={(e) => update("privateNotes", e.target.value)} /></label>
          <button className="v-button" type="submit">Save position</button>
        </form>
        <div className="v-surface v-card"><p className="v-eyebrow">Message builder</p><h2 className="text-xl font-black mb-3">Copy-ready message</h2><pre className="v-template">{template}</pre></div>
      </section>
      <section className="v-surface v-card"><div className="v-toolbar"><h2 className="text-xl font-black">Position board</h2><button className="v-button v-button-secondary" onClick={() => exportCsv("vessel-positions.csv", items)} type="button">Export CSV</button></div><div className="v-table-wrap"><table className="v-table"><thead><tr><th>Vessel</th><th>Type</th><th>Location</th><th>Availability</th><th>Rate</th><th>Status</th><th>Action</th></tr></thead><tbody>{items.length ? items.map((item) => <tr key={item.id}><td><span className="v-main">{item.vessel}</span><span className="v-note">{item.publicNotes}</span></td><td>{item.type}</td><td>{item.location || "TBA"}</td><td>{item.availability || "TBA"}</td><td>{item.rate || "TBA"}</td><td><span className={`v-badge ${item.status === "Hot" ? "v-badge-hot" : item.status === "Fixed" ? "v-badge-good" : ""}`}>{item.status}</span></td><td><div className="v-row-actions"><button className="v-link-button" onClick={() => copy(item)} type="button">Copy</button><button className="v-link-button" onClick={() => remove(item.id)} type="button">Delete</button></div></td></tr>) : <tr><td colSpan="7">No vessel positions yet.</td></tr>}</tbody></table></div></section>
      <section className="v-surface v-card"><p className="v-eyebrow">Charterparty references</p><div className="v-grid-3">{cps.map((name) => <div key={name} className="v-surface-flat p-4"><h3 className="font-black text-ink-50">{name}</h3><p className="v-muted text-sm">Reference only. Verify form, rider clauses and latest wording before use.</p></div>)}</div></section>
    </div></div>
  );
}
