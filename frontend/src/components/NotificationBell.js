import React, { useState } from "react";
import { Bell } from "@phosphor-icons/react";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((value) => !value)}
        className="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 hover:bg-white/[0.10] transition-colors text-ink-100"
        title="Notifications"
        type="button"
      >
        <Bell size={14} />
        <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center border border-[#0a1424] leading-none">3</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0a1424] border border-white/10 shadow-2xl p-3 z-50">
          <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-ink-300 mb-2">Desk reminders</p>
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-ink-100 leading-relaxed">Confirm scope, approval and documentation.</div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-ink-100 leading-relaxed">Confirm maker, model, part number and delivery time.</div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-ink-100 leading-relaxed">Keep commercial chain details in private notes.</div>
          </div>
        </div>
      )}
    </div>
  );
}
