import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/session";
import { signOut } from "@/app/(auth)/login/actions";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileSidebarProvider } from "@/components/dashboard/MobileSidebarContext";
import { MobileSidebarToggleButton } from "@/components/dashboard/MobileSidebarToggleButton";
import { MobileSidebarShell } from "@/components/dashboard/MobileSidebarShell";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <MobileSidebarProvider>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <header className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <MobileSidebarToggleButton />
            <span className="text-sm font-semibold text-slate-900">
              SEO Local Therapist Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-slate-500 sm:inline">{user.email}</span>
            <form action={signOut}>
              <button type="submit" className="text-sm text-slate-500 hover:text-slate-900">
                Se déconnecter
              </button>
            </form>
          </div>
        </header>
        <div className="flex flex-1">
          <MobileSidebarShell>
            <Sidebar />
          </MobileSidebarShell>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
        <ScrollToTopButton />
      </div>
    </MobileSidebarProvider>
  );
}
