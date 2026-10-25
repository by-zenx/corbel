import { PageHeading } from "@/components/shell/page-heading";
import { SectionPlaceholder } from "@/components/ui/section-placeholder";

export default function WorkspacePage() {
  return (
    <>
      <PageHeading title="Workspace" />
      <SectionPlaceholder
        viewName="workspace"
        title="Project Boards"
        description="Kanban task boards for brand refresh, store opening checklists, and summer campaigns."
        icon="board"
      />
    </>
  );
}
