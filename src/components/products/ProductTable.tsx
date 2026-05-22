import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import { ProductCategoryRows } from "./ProductCategoryRows";
import { ProductTableHeader } from "./ProductTableHeader";
import { chemicalColumns, hardnessColumns } from "./product-table-constants";
import { productCategories, products } from "./product-data";
import * as m from "#/paraglide/messages";

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
              <ProductTableHeader />
              <tbody>
                {productsByCategory.map(({ category, products }) =>
                  products.length > 0 ? (
                    <ProductCategoryRows
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
