import { PageHeading } from "@/components/shell/page-heading";
import { SectionPlaceholder } from "@/components/ui/section-placeholder";

export default function ProductsPage() {
  return (
    <>
      <PageHeading title="Products" />
      <SectionPlaceholder
        viewName="products"
        title="Product Catalog"
        description="Inspect inventory, edit product descriptions, check variant levels and monitor stock across both retail locations."
        icon="box"
      />
    </>
  );
}
