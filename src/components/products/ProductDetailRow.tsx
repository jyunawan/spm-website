import type { Product } from "./product-data";
import { chemicalColumns, hardnessColumns } from "./product-table-constants";
import { formatChemicalValue, formatValue } from "./product-table-format";
import { ProductMetricBox } from "./ProductMetricBox";

export function ProductDetailRow({ product }: { product: Product }) {
  const isMachinerySteel = product.steelType === "MACHINERY STEELS";
  const detailItems = [
    ["Steel Type", product.steelType],
    ["Steel Grade", product.steelGrade],
    ["International Grade", product.internationalGrade],
    ["Delivery Condition (HB)", product.deliveryCondition],
    ["Austenitizing Temperature (°C)", product.austenitizingTemperature],
    ["Quenching Media", product.quenchingMedia],
    ...(isMachinerySteel
      ? [
          ["Tensile Strength (N/mm²)", product.tensileStrength],
          ["Yield Strength (N/mm²)", product.yieldStrength],
        ]
      : []),
  ];

  return (
    <tr className="bg-[#fff8ec]">
      <td colSpan={21} className="border-b border-black/10 px-5 py-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1.2fr]">
          <div className="border border-black/10 bg-white p-4">
            <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#b4232a]">
              Full Product Details
            </h3>
            <dl className="mt-3 grid grid-cols-[0.9fr_1fr] gap-x-4 gap-y-2 text-[13px] leading-5">
              {detailItems.map(([label, value]) => (
                <div key={label} className="contents">
                  <dt className="font-black text-[#4a5058]">{label}</dt>
                  <dd className="font-semibold text-[#15171a]">
                    {formatValue(value)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border border-black/10 bg-white p-4">
            <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#b4232a]">
              Chemical Composition
            </h3>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {chemicalColumns.map((column) => (
                <ProductMetricBox
                  key={column}
                  label={column}
                  value={formatChemicalValue(product.chemicalComposition[column])}
                />
              ))}
            </div>

            {!isMachinerySteel ? (
              <>
                <h3 className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#b4232a]">
                  Surface Hardness
                </h3>
                <div className="mt-3 grid grid-cols-6 gap-2">
                  {hardnessColumns.map((column) => (
                    <ProductMetricBox
                      key={column}
                      label={column}
                      value={product.temperingHardness[column]}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>

          <div className="grid gap-3">
            <div className="border border-black/10 bg-white p-4">
              <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#b4232a]">
                Steel Properties
              </h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#4b5869]">
                {formatValue(product.steelProperties)}
              </p>
            </div>
            <div className="border border-black/10 bg-white p-4">
              <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#b4232a]">
                Application
              </h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#4b5869]">
                {formatValue(product.application)}
              </p>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
