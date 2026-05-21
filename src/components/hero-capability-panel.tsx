import type { ComponentType } from "react";

type HeroCapability = {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  body: string;
};

export function HeroCapabilityPanel({ items }: { items: HeroCapability[] }) {
  return (
    <div className="mx-auto w-full max-w-5xl overflow-hidden border border-white/16 bg-[#15171a]/70 backdrop-blur">
      <div className="grid divide-y divide-white/12 md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map((item) => (
          <div
            key={item.title}
            className="grid grid-cols-[auto_1fr] gap-3 px-5 py-3 sm:px-6"
          >
            <div className="mt-1 flex h-9 w-9 flex-none items-center justify-center text-[#f04a52]">
              <item.icon className="h-7 w-7" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-black text-white sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-0.5 text-xs font-medium leading-4 text-white/66">
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
