"use client";

import { useMobileSidebar } from "./MobileSidebarContext";

export function MobileSidebarToggleButton() {
  const { setOpen } = useMobileSidebar();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Ouvrir le menu"
      className="flex items-center gap-2 rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 md:hidden"
    >
      <span aria-hidden>☰</span> Menu
    </button>
  );
}
