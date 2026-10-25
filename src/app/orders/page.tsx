import { PageHeading } from "@/components/shell/page-heading";
import { SectionPlaceholder } from "@/components/ui/section-placeholder";

export default function OrdersPage() {
  return (
    <>
      <PageHeading title="Orders" />
      <SectionPlaceholder
        viewName="orders"
        title="Order Management"
        description="Browse orders across online and in-store channels, track fulfillment status, and inspect customer order slips."
        icon="cart"
      />
    </>
  );
}
