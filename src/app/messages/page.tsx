import { AppShell } from "@/components/shell/app-shell";
import { PageHeading } from "@/components/shell/page-heading";
import { SectionPlaceholder } from "@/components/ui/section-placeholder";

export default function MessagesPage() {
  return (
    <AppShell>
      <PageHeading title="Messages" />
      <SectionPlaceholder
        viewName="messages"
        title="Inbox & Conversations"
        description="Customer support messages, WhatsApp inquiries, and live chat threads."
        icon="chat"
      />
    </AppShell>
  );
}
