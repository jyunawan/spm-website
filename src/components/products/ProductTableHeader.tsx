import { chemicalColumns } from "./product-table-constants";
import { HeaderCell } from "./ProductTableCell";

export function ProductTableHeader() {
  return (
    <thead>
      <tr className="sticky top-0 z-20 bg-[#202326] text-[11px] font-black uppercase tracking-[0.14em] text-white shadow-sm">
        <th
          className="border-b border-white/10 px-3 py-2.5 text-left"
          colSpan={2}
        >
          Product
        </th>
        <th
          className="border-b border-l border-white/10 px-3 py-2.5 text-center"
          colSpan={chemicalColumns.length}
        >
          Chemical Composition (%)
        </th>
        <th
          className="border-b border-l border-white/10 px-3 py-2.5 text-left"
          colSpan={11}
        >
          Application
        </th>
      </tr>
      <tr className="sticky top-[38px] z-20 bg-[#f6f5f1] text-[11px] font-black uppercase tracking-[0.04em] text-[#4a5058] shadow-sm">
        <HeaderCell>Steel Grade</HeaderCell>
        <HeaderCell>International</HeaderCell>
        {chemicalColumns.map((column) => (
          <HeaderCell key={column} align="center">
            {column}
          </HeaderCell>
        ))}
        <HeaderCell colSpan={11}>Recommended Uses</HeaderCell>
      </tr>
    </thead>
  );
}
