import { AppShell } from "@/components/shell/app-shell";
import { PageHeading } from "@/components/shell/page-heading";
import { SectionPlaceholder } from "@/components/ui/section-placeholder";

export default function AnalyticsPage() {
  return (
    <AppShell>
      <PageHeading title="Analytics" />
      <SectionPlaceholder
        viewName="analytics"
        title="Store & Channel Analytics"
        description="Comprehensive sales analytics, traffic channels, customer lifetime value, and forecasting."
        icon="chart"
      />
    </AppShell>
  );
}
