import { PageHeading } from "@/components/shell/page-heading";
import { SectionPlaceholder } from "@/components/ui/section-placeholder";

export default function IntegrationsPage() {
  return (
    <>
      <PageHeading title="Integrations" />
      <SectionPlaceholder
        viewName="integrations"
        title="App Integrations"
        description="Connected apps and services including Shopify, Stripe, Slack, and Klaviyo."
        icon="plug"
      />
    </>
  );
}
