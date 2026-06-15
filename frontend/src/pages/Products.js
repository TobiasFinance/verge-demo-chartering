import React, { useMemo, useState } from "react";
import { exportCsv, loadItems, saveItems } from "../lib/storage";

const KEY = "verge-product-enquiries";
const empty = { vessel: "", equipment: "", maker: "", model: "", partNumber: "", delivery: "", status: "Received", priority: "Normal", notes: "" };

function buildRequest(item) {
  return `Good day,\n\nPlease advise price and availability for below spare parts enquiry:\n\n***Q***\nVessel / Ref: ${item.vessel || "TBA"}\nEquipment: ${item.equipment || "TBA"}\nMaker: ${item.maker || "Please confirm"}\nModel: ${item.model || "Please confirm"}\nPart number: ${item.partNumber || "Please confirm"}\nRequired delivery time: ${item.delivery || "Please confirm"}\nNotes: ${item.notes || "TBA"}\n***UQ***\n\nPlease confirm maker, model, part number, and required delivery time.\n\nKindly advise price, availability, delivery basis, validity and whether genuine, OEM or alternative parts are offered.\n\nPlease consider 10% commission for our office and 30 days payment terms.\n\nAlways at your disposal.`;
}

export default function Products() {
  const [items, setItems] = useState(() => loadItems(KEY));
  const [form, setForm] = useState(empty);
  const [template, setTemplate] = useState("Select a product enquiry and copy a supplier request.");
  const stats = useMemo(() => ({ total: items.length, missing: items.filter((x) => x.status === "Missing details").length, urgent: items.filter((x) => x.priority !== "Normal").length }), [items]);
  function update(field, value) { setForm((current) => ({ ...current, [field]: value })); }
  function save(e) { e.preventDefault(); const next = [{ ...form, id: Date.now() }, ...items]; setItems(next); saveItems(KEY, next); setForm(empty); }
  function remove(id) { const next = items.filter((item) => item.id !== id); setItems(next); saveItems(KEY, next); }
  function copy(item) { const text = buildRequest(item); setTemplate(text); navigator.clipboard?.writeText(text); }

  return (
    <div className="v-page"><div className="v-page-inner space-y-5">
      <section className="v-surface v-card"><p className="v-eyebrow">Products desk</p><h1 className="v-title">Spare parts and product register.</h1><p className="v-muted max-w-3xl">Track product enquiries by vessel, equipment, maker, model, part number, delivery time, status and supplier message.</p></section>
      <section className="v-grid-3"><div className="v-surface v-card"><p className="v-eyebrow">Total</p><h2 className="text-4xl font-black">{stats.total}</h2><p className="v-muted">Product enquiries</p></div><div className="v-surface v-card"><p className="v-eyebrow">Missing</p><h2 className="text-4xl font-black">{stats.missing}</h2><p className="v-muted">Need details</p></div><div className="v-surface v-card"><p className="v-eyebrow">Urgent</p><h2 className="text-4xl font-black">{stats.urgent}</h2><p className="v-muted">Urgent or critical</p></div></section>
      <section className="v-grid-2">
        <form onSubmit={save} className="v-surface v-card v-form">
          <label className="v-label">Vessel / Ref<input className="v-input" value={form.vessel} onChange={(e) => update("vessel", e.target.value)} /></label>
          <label className="v-label">Equipment<input className="v-input" value={form.equipment} onChange={(e) => update("equipment", e.target.value)} required /></label>
          <label className="v-label">Maker<input className="v-input" value={form.maker} onChange={(e) => update("maker", e.target.value)} /></label>
          <label className="v-label">Model<input className="v-input" value={form.model} onChange={(e) => update("model", e.target.value)} /></label>
          <label className="v-label">Part number<input className="v-input" value={form.partNumber} onChange={(e) => update("partNumber", e.target.value)} /></label>
          <label className="v-label">Required delivery time<input className="v-input" value={form.delivery} onChange={(e) => update("delivery", e.target.value)} /></label>
          <label className="v-label">Status<select className="v-input" value={form.status} onChange={(e) => update("status", e.target.value)}><option>Received</option><option>Missing details</option><option>Sourcing</option><option>Quoted</option><option>Ordered</option><option>Delivered</option></select></label>
          <label className="v-label">Priority<select className="v-input" value={form.priority} onChange={(e) => update("priority", e.target.value)}><option>Normal</option><option>Urgent</option><option>Critical</option></select></label>
          <label className="v-label v-wide">Quantity / Notes<textarea className="v-input" value={form.notes} onChange={(e) => update("notes", e.target.value)} /></label>
          <button className="v-button" type="submit">Save product enquiry</button>
        </form>
        <div className="v-surface v-card"><p className="v-eyebrow">Supplier request</p><h2 className="text-xl font-black mb-3">Copy-ready message</h2><pre className="v-template">{template}</pre></div>
      </section>
      <section className="v-surface v-card"><div className="v-toolbar"><h2 className="text-xl font-black">Product board</h2><button className="v-button v-button-secondary" onClick={() => exportCsv("product-enquiries.csv", items)} type="button">Export CSV</button></div><div className="v-table-wrap"><table className="v-table"><thead><tr><th>Equipment</th><th>Maker</th><th>Model</th><th>Part no.</th><th>Delivery</th><th>Status</th><th>Action</th></tr></thead><tbody>{items.length ? items.map((item) => <tr key={item.id}><td><span className="v-main">{item.equipment}</span><span className="v-note">{item.notes}</span></td><td>{item.maker || "TBA"}</td><td>{item.model || "TBA"}</td><td>{item.partNumber || "TBA"}</td><td>{item.delivery || "TBA"}</td><td><span className="v-badge">{item.status}</span></td><td><div className="v-row-actions"><button className="v-link-button" onClick={() => copy(item)} type="button">Copy</button><button className="v-link-button" onClick={() => remove(item.id)} type="button">Delete</button></div></td></tr>) : <tr><td colSpan="7">No product enquiries yet.</td></tr>}</tbody></table></div></section>
    </div></div>
  );
}
