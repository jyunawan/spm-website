type LogoWallItem = {
  name: string;
  logo: string;
};

export function LogoWall({ items }: { items: LogoWallItem[] }) {
  const firstRow = items.filter((_, index) => index % 2 === 0);
  const secondRow = items.filter((_, index) => index % 2 === 1);

  return (
    <div className="relative overflow-hidden border-y border-black/10 py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-white to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-white to-transparent sm:w-28" />
      <LogoWallRow items={firstRow} direction="normal" />
      <LogoWallRow items={secondRow} direction="reverse" />
    </div>
  );
}

function LogoWallRow({
  items,
  direction,
}: {
  items: LogoWallItem[];
  direction: "normal" | "reverse";
}) {
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div className="logo-wall-row" style={{ animationDirection: direction }}>
      {repeatedItems.map((item, index) => (
        <div
          key={`${item.name}-${index}`}
          className="flex h-28 w-52 flex-none items-center justify-center border border-black/10 bg-white p-6 sm:h-32 sm:w-60"
        >
          <img
            src={item.logo}
            alt={item.name}
            className="max-h-20 w-full object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
