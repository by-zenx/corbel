import { AppShell } from "@/components/shell/app-shell";
import { PageHeading } from "@/components/shell/page-heading";
import { SectionPlaceholder } from "@/components/ui/section-placeholder";

export default function FeedbackPage() {
  return (
    <AppShell>
      <PageHeading title="Feedback" />
      <SectionPlaceholder
        viewName="feedback"
        title="Customer Feedback"
        description="Review ratings, customer surveys, and response sentiments."
        icon="feedback"
      />
    </AppShell>
  );
}
