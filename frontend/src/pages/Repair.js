import React, { useMemo, useState } from "react";
import { exportCsv, loadItems, saveItems } from "../lib/storage";

const KEY = "verge-repair-cases";
const empty = { vessel: "", port: "", type: "Underwater", eta: "", status: "Received", priority: "Normal", scope: "", notes: "" };

function buildRequest(item) {
  return `Good day,\n\nPlease advise availability and offer basis below request:\n\n***Q***\nVessel / Ref: ${item.vessel || "TBA"}\nPort / Area: ${item.port || "TBA"}\nETA / Window: ${item.eta || "TBA"}\nService type: ${item.type || "TBA"}\nScope: ${item.scope || "TBA"}\n***UQ***\n\nKindly advise availability, cost, time required, restrictions, required notice and documentation to be provided.\n\nPlease consider 10% commission for our office and 30 days payment terms.\n\nAlways at your disposal.`;
}

export default function Repair() {
  const [items, setItems] = useState(() => loadItems(KEY));
  const [form, setForm] = useState(empty);
  const [template, setTemplate] = useState("Select a case and copy a supplier request.");
  const stats = useMemo(() => ({ total: items.length, urgent: items.filter((x) => x.priority !== "Normal").length, quoted: items.filter((x) => x.status === "Quoted").length }), [items]);

  function update(field, value) { setForm((current) => ({ ...current, [field]: value })); }
  function save(e) { e.preventDefault(); const next = [{ ...form, id: Date.now() }, ...items]; setItems(next); saveItems(KEY, next); setForm(empty); }
  function remove(id) { const next = items.filter((item) => item.id !== id); setItems(next); saveItems(KEY, next); }
  function copy(item) { const text = buildRequest(item); setTemplate(text); navigator.clipboard?.writeText(text); }

  return (
    <div className="v-page">
      <div className="v-page-inner space-y-5">
        <section className="v-surface v-card">
          <p className="v-eyebrow">Repair desk</p>
          <h1 className="v-title">Marine repair case register.</h1>
          <p className="v-muted max-w-3xl">Use this for underwater services, afloat repairs, shipyard support and technical attendance. Keep scope, port, timing, status and supplier request text in one place.</p>
        </section>
        <section className="v-grid-3">
          <div className="v-surface v-card"><p className="v-eyebrow">Total</p><h2 className="text-4xl font-black">{stats.total}</h2><p className="v-muted">Repair cases</p></div>
          <div className="v-surface v-card"><p className="v-eyebrow">Urgency</p><h2 className="text-4xl font-black">{stats.urgent}</h2><p className="v-muted">Urgent or critical</p></div>
          <div className="v-surface v-card"><p className="v-eyebrow">Quoted</p><h2 className="text-4xl font-black">{stats.quoted}</h2><p className="v-muted">Offer sent</p></div>
        </section>
        <section className="v-grid-2">
          <form onSubmit={save} className="v-surface v-card v-form">
            <label className="v-label">Vessel / Ref<input className="v-input" value={form.vessel} onChange={(e) => update("vessel", e.target.value)} required /></label>
            <label className="v-label">Port / Area<input className="v-input" value={form.port} onChange={(e) => update("port", e.target.value)} /></label>
            <label className="v-label">Type<select className="v-input" value={form.type} onChange={(e) => update("type", e.target.value)}><option>Underwater</option><option>Afloat repair</option><option>Shipyard support</option><option>Inspection</option><option>Other</option></select></label>
            <label className="v-label">ETA / Window<input className="v-input" value={form.eta} onChange={(e) => update("eta", e.target.value)} /></label>
            <label className="v-label">Status<select className="v-input" value={form.status} onChange={(e) => update("status", e.target.value)}><option>Received</option><option>Clarifying</option><option>Sourcing</option><option>Quoted</option><option>Ordered</option><option>Completed</option></select></label>
            <label className="v-label">Priority<select className="v-input" value={form.priority} onChange={(e) => update("priority", e.target.value)}><option>Normal</option><option>Urgent</option><option>Critical</option></select></label>
            <label className="v-label v-wide">Scope<textarea className="v-input" value={form.scope} onChange={(e) => update("scope", e.target.value)} /></label>
            <label className="v-label v-wide">Internal notes<textarea className="v-input" value={form.notes} onChange={(e) => update("notes", e.target.value)} /></label>
            <button className="v-button" type="submit">Save repair case</button>
          </form>
          <div className="v-surface v-card">
            <div className="v-toolbar"><div><p className="v-eyebrow">Supplier request</p><h2 className="text-xl font-black">Copy-ready message</h2></div></div>
            <pre className="v-template">{template}</pre>
          </div>
        </section>
        <section className="v-surface v-card">
          <div className="v-toolbar"><h2 className="text-xl font-black">Repair board</h2><button className="v-button v-button-secondary" onClick={() => exportCsv("repair-cases.csv", items)} type="button">Export CSV</button></div>
          <div className="v-table-wrap"><table className="v-table"><thead><tr><th>Vessel</th><th>Type</th><th>Port</th><th>Window</th><th>Status</th><th>Priority</th><th>Action</th></tr></thead><tbody>{items.length ? items.map((item) => <tr key={item.id}><td><span className="v-main">{item.vessel}</span><span className="v-note">{item.scope}</span></td><td>{item.type}</td><td>{item.port || "TBA"}</td><td>{item.eta || "TBA"}</td><td><span className="v-badge">{item.status}</span></td><td><span className={`v-badge ${item.priority !== "Normal" ? "v-badge-urgent" : ""}`}>{item.priority}</span></td><td><div className="v-row-actions"><button className="v-link-button" onClick={() => copy(item)} type="button">Copy</button><button className="v-link-button" onClick={() => remove(item.id)} type="button">Delete</button></div></td></tr>) : <tr><td colSpan="7">No repair cases yet.</td></tr>}</tbody></table></div>
        </section>
      </div>
    </div>
  );
}
