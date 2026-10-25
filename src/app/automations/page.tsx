import { PageHeading } from "@/components/shell/page-heading";
import { SectionPlaceholder } from "@/components/ui/section-placeholder";

export default function AutomationsPage() {
  return (
    <>
      <PageHeading title="Automations" />
      <SectionPlaceholder
        viewName="automations"
        title="Workflow Automations"
        description="Trigger flows for abandoned cart recovery, low-stock reorders, and welcome discounts."
        icon="zap"
      />
    </>
  );
}
