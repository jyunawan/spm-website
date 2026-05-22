import { ChevronDown, ChevronRight } from "lucide-react";

import type { Product } from "./product-data";
import { ProductRow } from "./ProductRow";

export function ProductCategoryRows({
  category,
  products,
  isOpen,
  openProductId,
  onToggle,
  onProductToggle,
}: {
  category: string;
  products: Product[];
  isOpen: boolean;
  openProductId: string | null;
  onToggle: () => void;
  onProductToggle: (productId: string) => void;
}) {
  return (
    <>
      <tr>
        <td colSpan={21} className="p-0">
          <button
            type="button"
            onClick={onToggle}
            className="flex h-12 w-full items-center gap-3 bg-[#15171a] px-5 text-left text-white transition hover:bg-[#2c3136]"
          >
            {isOpen ? (
              <ChevronDown className="h-5 w-5 flex-none" aria-hidden="true" />
            ) : (
              <ChevronRight className="h-5 w-5 flex-none" aria-hidden="true" />
            )}
            <span className="h-1.5 w-1.5 rounded-full bg-[#f4c044]" />
            <span className="text-xs font-black uppercase tracking-[0.18em]">
              {category}
            </span>
            <span className="rounded-full bg-white/12 px-2.5 py-0.5 text-[11px] font-black text-white/82">
              {products.length} products
            </span>
          </button>
        </td>
      </tr>
      {isOpen
        ? products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              isOpen={openProductId === product.id}
              onToggle={() => onProductToggle(product.id)}
            />
          ))
        : null}
    </>
  );
}
