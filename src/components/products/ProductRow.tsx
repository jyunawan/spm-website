import type { Product } from "./product-data";
import { ProductDetailRow } from "./ProductDetailRow";
import { ProductSummaryRow } from "./ProductSummaryRow";

export function ProductRow({
  product,
  isOpen,
  onToggle,
}: {
  product: Product;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <ProductSummaryRow
        product={product}
        isOpen={isOpen}
        onToggle={onToggle}
      />
      {isOpen ? <ProductDetailRow product={product} /> : null}
    </>
  );
}
