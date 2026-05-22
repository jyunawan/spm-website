import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";

import {
  productCategories,
  products,
  type ChemicalKey,
  type HardnessKey,
  type Product,
} from "./product-data";
import * as m from "#/paraglide/messages";

const chemicalColumns: ChemicalKey[] = [
  "C",
  "Si",
  "Mn",
  "Cr",
  "Mo",
  "Ni",
  "V",
  "W",
];
const hardnessColumns: HardnessKey[] = [
  "200",
  "300",
  "400",
  "500",
  "550",
  "600",
];

export function ProductTable() {
  const [openCategories, setOpenCategories] = useState(
    () => new Set(productCategories),
  );
  const [openProductId, setOpenProductId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) =>
      [
        product.steelType,
        product.steelGrade,
        product.internationalGrade,
        product.specialChemicalComposition,
        product.steelProperties,
        product.application,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const productsByCategory = useMemo(() => {
    return productCategories.map((category) => ({
      category,
      products: filteredProducts.filter(
        (product) => product.steelType === category,
      ),
    }));
  }, [filteredProducts]);

  function toggleCategory(category: string) {
    setOpenCategories((currentCategories) => {
      const nextCategories = new Set(currentCategories);
      if (nextCategories.has(category)) {
        nextCategories.delete(category);
      } else {
        nextCategories.add(category);
      }
      return nextCategories;
    });
  }

  function toggleProduct(productId: string) {
    setOpenProductId((currentProductId) =>
      currentProductId === productId ? null : productId,
    );
  }

  return (
    <section className="bg-[#f6f5f1] px-5 pb-20 lg:px-8 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#b4232a]">
              {m.products_range_kicker()}
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-[#15171a] sm:text-5xl">
              {m.products_range_title()}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#5b626b]">
              {m.products_range_body()}
            </p>
          </div>

          <label className="relative block w-full lg:w-90">
            <span className="sr-only">Search products</span>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#657080]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search grade, standard, application"
              className="h-12 w-full border border-black/10 bg-white pl-11 pr-11 text-sm font-semibold text-[#15171a] outline-none transition placeholder:text-[#87909d] focus:border-[#b4232a] focus:ring-4 focus:ring-[#b4232a]/10"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-[#657080] transition hover:bg-[#edf0f1] hover:text-[#15171a]"
                aria-label="Clear product search"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
          </label>
        </div>

        <div className="max-h-[72svh] overflow-auto border border-black/10 bg-white shadow-2xl shadow-slate-950/10">
          <div className="min-w-[1480px]">
            <div className="border-b border-white/12 bg-[#15171a] px-6 py-4 text-white">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f4c044]">
                Grade Reference
              </p>
              <h2 className="mt-1.5 text-xl font-black">
                Chemical Composition, Heat Treatment & Application
              </h2>
            </div>

            <table className="w-full table-fixed border-separate border-spacing-0 text-sm">
              <colgroup>
                <col className="w-[13%]" />
                <col className="w-[10%]" />
                {chemicalColumns.map((column) => (
                  <col key={column} className="w-[4.5%]" />
                ))}
                <col className="w-[7.2%]" />
                <col className="w-[7%]" />
                {hardnessColumns.map((column) => (
                  <col key={column} className="w-[3.7%]" />
                ))}
                <col className="w-[7.2%]" />
                <col className="w-[6.4%]" />
                <col className="w-[17%]" />
              </colgroup>
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
              <tbody>
                {productsByCategory.map(({ category, products }) =>
                  products.length > 0 ? (
                    <CategoryRows
                      key={category}
                      category={category}
                      products={products}
                      isOpen={openCategories.has(category)}
                      openProductId={openProductId}
                      onToggle={() => toggleCategory(category)}
                      onProductToggle={toggleProduct}
                    />
                  ) : null,
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryRows({
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

function ProductRow({
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

function ProductSummaryRow({
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

function ProductDetailRow({ product }: { product: Product }) {
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
                <MetricBox
                  key={column}
                  label={column}
                  value={formatChemicalValue(
                    product.chemicalComposition[column],
                  )}
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
                    <MetricBox
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

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-black/10 bg-[#faf9f6] px-2 py-1.5 text-center">
      <div className="text-[11px] font-black uppercase text-[#657080]">
        {label}
      </div>
      <div className="mt-0.5 text-[13px] font-black text-[#15171a]">
        {formatValue(value)}
      </div>
    </div>
  );
}

function HeaderCell({
  children,
  align = "left",
  colSpan,
}: {
  children: ReactNode;
  align?: "left" | "center";
  colSpan?: number;
}) {
  return (
    <th
      colSpan={colSpan}
      className={`border-b border-black/10 px-3 py-2 align-middle ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function BodyCell({
  children,
  align = "left",
  colSpan,
}: {
  children: ReactNode;
  align?: "left" | "center";
  colSpan?: number;
}) {
  return (
    <td
      colSpan={colSpan}
      className={`border-b border-black/6 px-3 py-1.5 align-middle text-[13px] font-semibold leading-5 text-[#5b6676] ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {children}
    </td>
  );
}

function formatValue(value: string) {
  return value || "-";
}

function formatChemicalValue(value: string) {
  if (!value) {
    return "-";
  }

  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue.toFixed(2) : value;
}
