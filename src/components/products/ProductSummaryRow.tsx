import { ChevronDown, ChevronRight } from "lucide-react";

import type { Product } from "./product-data";
import { BodyCell } from "./ProductTableCell";
import { chemicalColumns } from "./product-table-constants";
import { formatChemicalValue, formatValue } from "./product-table-format";

export function ProductSummaryRow({
  product,
  isOpen,
  onToggle,
}: {
  product: Product;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const hasChemicalComposition = chemicalColumns.some(
    (column) => product.chemicalComposition[column],
  );
  const showSpecialCompositionAcrossChemistry =
    !hasChemicalComposition && product.specialChemicalComposition;

  return (
    <tr
      className={`group cursor-pointer align-middle even:bg-[#faf9f6] hover:bg-[#fff8ec] ${
        isOpen ? "bg-[#fff8ec]" : ""
      }`}
      onClick={onToggle}
    >
      <BodyCell>
        <div className="flex items-center gap-2">
          {isOpen ? (
            <ChevronDown
              className="h-4 w-4 flex-none text-[#b4232a]"
              aria-hidden="true"
            />
          ) : (
            <ChevronRight
              className="h-4 w-4 flex-none text-[#657080]"
              aria-hidden="true"
            />
          )}
          <div className="min-w-0 font-black text-[#15171a]">
            {product.steelGrade}
          </div>
        </div>
      </BodyCell>
      <BodyCell>{formatValue(product.internationalGrade)}</BodyCell>
      {showSpecialCompositionAcrossChemistry ? (
        <BodyCell colSpan={chemicalColumns.length} align="center">
          <span className="line-clamp-1 text-[#4a5058]">
            {product.specialChemicalComposition}
          </span>
        </BodyCell>
      ) : (
        chemicalColumns.map((column) => (
          <BodyCell key={column} align="center">
            {formatChemicalValue(product.chemicalComposition[column])}
          </BodyCell>
        ))
      )}
      <BodyCell colSpan={11}>
        <p
          className="line-clamp-1 leading-5 text-[#4b5869]"
          title={product.application}
        >
          {formatValue(product.application)}
        </p>
      </BodyCell>
    </tr>
  );
}
