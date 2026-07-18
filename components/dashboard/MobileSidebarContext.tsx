"use client";

import { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";

interface MobileSidebarState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MobileSidebarContext = createContext<MobileSidebarState | null>(null);

export function MobileSidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Ferme automatiquement le menu après avoir suivi un lien sur mobile.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  return (
    <MobileSidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </MobileSidebarContext.Provider>
  );
}

export function useMobileSidebar() {
  const ctx = useContext(MobileSidebarContext);
  if (!ctx) throw new Error("useMobileSidebar must be used within MobileSidebarProvider");
  return ctx;
}
