import { MessagesView } from "@/components/messages/messages-view";
import { PageHeading } from "@/components/shell/page-heading";

export default function MessagesPage() {
  return (
    <>
      <PageHeading title="Messages" />
      <MessagesView />
    </>
  );
}
