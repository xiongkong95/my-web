import { AuthGuard } from "@/components/dashboard/auth-guard";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <main className="relative flex flex-1 gap-4 overflow-hidden p-4">
        <div className="pointer-events-none absolute -top-40 right-0 size-120 rounded-full bg-primary/10 blur-3xl" />

        <Sidebar />

        <DashboardContent />
      </main>
    </AuthGuard>
  );
}
