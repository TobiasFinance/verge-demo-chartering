import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { House, Wrench, Package, Anchor, ChartBar, Gear, SignOut } from "@phosphor-icons/react";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

const NAV = [
  { to: "/home", label: "Home", icon: House },
  { to: "/repair", label: "Repair", icon: Wrench },
  { to: "/products", label: "Products", icon: Package },
  { to: "/chartering", label: "Chartering", icon: Anchor },
  { to: "/reports", label: "Reports", icon: ChartBar },
  { to: "/settings", label: "Settings", icon: Gear },
];

export default function AppShell() {
  const { user, wsStatus } = useAuth();
  const liveColor = wsStatus === "open" ? "bg-emerald-400" : wsStatus === "connecting" ? "bg-amber-400" : "bg-rose-400";
  const liveLabel = wsStatus === "open" ? "Live" : wsStatus === "connecting" ? "Connecting" : "Offline";
  const initials = (user?.name || "?").split(" ").map((p) => p[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#0d1a2e]">
      <aside className="v-sidebar w-56 shrink-0 flex flex-col py-5 pl-5 pr-3 relative overflow-hidden" data-testid="sidebar">
        <img src="/badge.svg" alt="" aria-hidden="true" className="pointer-events-none absolute opacity-[0.15]" style={{ top: "20%", left: "-30%", width: "200%", zIndex: 0 }} />
        <div className="mb-8 pl-1 relative z-10">
          <img src="/logo.svg" alt="Verge Shipbrokers" className="h-7" />
          <p className="text-[9px] uppercase tracking-[0.18em] font-bold v-sb-faint mt-3">Combined Desk</p>
        </div>
        <nav className="flex-1 space-y-0.5 relative z-10" data-testid="nav">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/home"} className={({ isActive }) => `v-nav-item ${isActive ? "v-nav-item--active" : ""}`}>
              <Icon size={15} weight="regular" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <header className="h-12 shrink-0 flex items-center justify-between px-5 border-b border-white/10 bg-[#0a1424] relative z-40" data-testid="top-bar">
          <div className="flex items-center gap-2 text-[11.5px] font-semibold text-ink-200 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10" title={wsStatus}>
              <span className={`w-1.5 h-1.5 rounded-full ${liveColor} ${wsStatus === "open" ? "animate-pulse" : ""}`} />
              <span className="text-[10.5px] uppercase tracking-[0.10em] font-bold">{liveLabel}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <NotificationBell />
            <div className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-colors">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1a2e5c] text-white text-[10.5px] font-bold">{initials}</span>
              <div className="text-[11.5px] leading-tight min-w-0 max-w-[180px]">
                <p className="text-ink-50 font-bold truncate">{user?.name}</p>
                <p className="text-ink-300 truncate font-medium text-[10px]">{user?.email}</p>
              </div>
            </div>
            <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-ink-200 text-[11px] font-bold transition-colors" title="Sign out" type="button">
              <SignOut size={12} />
              <span className="hidden md:inline">Demo</span>
            </button>
          </div>
        </header>
        <main className="flex-1 min-w-0 flex flex-col overflow-hidden v-canvas relative">
          <img src="/badge.svg" alt="" aria-hidden="true" className="pointer-events-none absolute opacity-[0.15]" style={{ top: "-15%", right: "-25%", width: "130%", zIndex: 0 }} />
          <img src="/badge.svg" alt="" aria-hidden="true" className="pointer-events-none absolute opacity-[0.15]" style={{ bottom: "-20%", left: "-15%", width: "100%", transform: "rotate(8deg)", zIndex: 0 }} />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
