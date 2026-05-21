import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm font-black uppercase tracking-[0.18em] text-[#b4232a]">
      {children}
    </p>
  );
}
