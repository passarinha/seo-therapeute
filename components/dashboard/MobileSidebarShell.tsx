"use client";

import { useMobileSidebar } from "./MobileSidebarContext";

export function MobileSidebarShell({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useMobileSidebar();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 flex h-full flex-col bg-white shadow-lg transition-transform duration-200 md:static md:z-auto md:h-auto md:translate-x-0 md:bg-transparent md:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-2 md:hidden">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer le menu"
            className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </>
  );
}
