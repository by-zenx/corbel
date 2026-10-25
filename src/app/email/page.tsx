import { PageHeading } from "@/components/shell/page-heading";
import { SectionPlaceholder } from "@/components/ui/section-placeholder";

export default function EmailPage() {
  return (
    <>
      <PageHeading title="Email" />
      <SectionPlaceholder
        viewName="email"
        title="Email Campaigns"
        description="Newsletter broadcasts, automated receipts, and promotional campaigns."
        icon="mail"
      />
    </>
  );
}
