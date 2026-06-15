import React from "react";

export default function Settings() {
  return (
    <div className="v-page"><div className="v-page-inner space-y-5">
      <section className="v-surface v-card"><p className="v-eyebrow">Settings</p><h1 className="v-title">Demo settings.</h1><p className="v-muted max-w-3xl">This version is a front-end demo using local browser storage. Before real use, add user accounts, database, permission levels, activity log and hosting.</p></section>
      <section className="v-grid-2">
        <div className="v-surface v-card"><h2 className="text-xl font-black mb-2">Current build</h2><p className="v-muted">Imported from the Verge-App parent structure and extended with Repair, Products and Chartering modules.</p></div>
        <div className="v-surface v-card"><h2 className="text-xl font-black mb-2">Next build</h2><p className="v-muted">Connect the three desks to a backend so records are shared between users instead of saved locally.</p></div>
      </section>
    </div></div>
  );
}
