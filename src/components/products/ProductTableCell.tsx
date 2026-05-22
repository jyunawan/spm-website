import type { ReactNode } from "react";

export function HeaderCell({
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

export function BodyCell({
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
