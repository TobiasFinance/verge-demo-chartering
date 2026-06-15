import React from "react";
import { Link } from "react-router-dom";
import { Wrench, Package, Anchor } from "@phosphor-icons/react";

const cards = [
  { to: "/repair", title: "Repair", icon: Wrench, text: "Underwater, afloat repair, shipyard support and technical service cases." },
  { to: "/products", title: "Products", icon: Package, text: "Spare parts enquiries with maker, model, part number and delivery tracking." },
  { to: "/chartering", title: "Chartering", icon: Anchor, text: "Offshore vessel positions, project leads and charterparty reference." },
];

export default function Home() {
  return (
    <div className="v-page">
      <div className="v-page-inner space-y-5">
        <section className="v-surface v-card">
          <p className="v-eyebrow">Verge parent system</p>
          <h1 className="v-title">One software for Repair, Products and Chartering.</h1>
          <p className="v-muted max-w-3xl">This is the combined Verge app concept. It keeps the original Verge-App shell and divides the work into three desks, so enquiries, product requests and vessel opportunities are handled in one system.</p>
        </section>
        <section className="v-grid-3">
          {cards.map(({ to, title, text, icon: Icon }) => (
            <Link key={title} to={to} className="v-surface v-card block no-underline hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-2xl bg-[#1a2e5c] text-white flex items-center justify-center mb-4"><Icon size={20} /></div>
              <h2 className="text-xl font-black tracking-[-0.04em] mb-2 text-ink-50">{title}</h2>
              <p className="v-muted">{text}</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
