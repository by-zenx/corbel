import { AppShell } from "@/components/shell/app-shell";
import { PageHeading } from "@/components/shell/page-heading";
import { SectionPlaceholder } from "@/components/ui/section-placeholder";

export default function CustomersPage() {
  return (
    <AppShell>
      <PageHeading title="Customers" />
      <SectionPlaceholder
        viewName="customers"
        title="Customer Profiles"
        description="View customer directory, customer spend rankings, and feedback reviews."
        icon="users"
      />
    </AppShell>
  );
}
