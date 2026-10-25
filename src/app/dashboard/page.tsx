import { AppShell } from "@/components/shell/app-shell";
import { PageHeading } from "@/components/shell/page-heading";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export default function DashboardPage() {
  return (
    <AppShell>
      <PageHeading title="Dashboard" />
      <DashboardView />
    </AppShell>
  );
}
