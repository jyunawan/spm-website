import { createFileRoute } from "@tanstack/react-router";
import { PackageSearch } from "lucide-react";

import { ProductTable } from "#/components/products/ProductTable";
import * as m from "#/paraglide/messages";

export const Route = createFileRoute("/products")({ component: Products });

function Products() {
  return (
    <main className="min-h-screen bg-[#f6f5f1] text-[#15171a]">
      <section className="bg-[#15171a] text-white">
        <div className="mx-auto flex min-h-[38svh] max-w-7xl items-end px-5 py-14 lg:px-8 lg:py-18">
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex items-center gap-2 border-l-4 border-[#d92932] bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.14em] text-white/85">
              <PackageSearch className="h-4 w-4" aria-hidden="true" />
              {m.products_hero_kicker()}
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] text-white sm:text-6xl">
              {m.products_hero_title()}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
              {m.products_hero_body()}
            </p>
          </div>
        </div>
      </section>
      <div className="mt-15">
        <ProductTable />
      </div>
    </main>
  );
}
