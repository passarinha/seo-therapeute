import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/session";
import { signOut } from "@/app/(auth)/login/actions";
import { Sidebar } from "@/components/dashboard/Sidebar";

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
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
        <span className="text-sm font-semibold text-slate-900">
          SEO Local Therapist Dashboard
        </span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">{user.email}</span>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm text-slate-500 hover:text-slate-900"
            >
              Se déconnecter
            </button>
          </form>
        </div>
      </header>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
