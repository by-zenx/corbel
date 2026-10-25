import { AppShell } from "@/components/shell/app-shell";
import { PageHeading } from "@/components/shell/page-heading";
import { SectionPlaceholder } from "@/components/ui/section-placeholder";

export default function IntegrationsPage() {
  return (
    <AppShell>
      <PageHeading title="Integrations" />
      <SectionPlaceholder
        viewName="integrations"
        title="App Integrations"
        description="Connected apps and services including Shopify, Stripe, Slack, and Klaviyo."
        icon="plug"
      />
    </AppShell>
  );
}
