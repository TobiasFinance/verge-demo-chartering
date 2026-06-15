import React from "react";
import { loadItems } from "../lib/storage";

export default function Reports() {
  const repair = loadItems("verge-repair-cases");
  const products = loadItems("verge-product-enquiries");
  const chartering = loadItems("verge-chartering-positions");
  const blocks = [
    ["Repair cases", repair.length],
    ["Product enquiries", products.length],
    ["Vessel positions", chartering.length],
    ["Total records", repair.length + products.length + chartering.length],
  ];
  return (
    <div className="v-page"><div className="v-page-inner space-y-5">
      <section className="v-surface v-card"><p className="v-eyebrow">Reports</p><h1 className="v-title">Desk overview.</h1><p className="v-muted max-w-3xl">Simple local report view for the combined Verge desk app. This reads from browser storage only.</p></section>
      <section className="v-grid-3">{blocks.map(([label, value]) => <div key={label} className="v-surface v-card"><p className="v-eyebrow">{label}</p><h2 className="text-4xl font-black">{value}</h2></div>)}</section>
    </div></div>
  );
}
