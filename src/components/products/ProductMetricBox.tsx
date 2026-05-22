import { formatValue } from "./product-table-format";

export function ProductMetricBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
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
