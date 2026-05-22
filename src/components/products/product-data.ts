import productCsv from "#/data/product.csv?raw";

export type Product = {
  id: string;
  steelType: string;
  steelGrade: string;
  internationalGrade: string;
  specialChemicalComposition: string;
  chemicalComposition: Record<ChemicalKey, string>;
  steelProperties: string;
  deliveryCondition: string;
  austenitizingTemperature: string;
  quenchingMedia: string;
  temperingHardness: Record<HardnessKey, string>;
  tensileStrength: string;
  yieldStrength: string;
  application: string;
};

export type ChemicalKey = "C" | "Si" | "Mn" | "Cr" | "Mo" | "Ni" | "V" | "W";
export type HardnessKey = "200" | "300" | "400" | "500" | "550" | "600";

const chemicalKeys: ChemicalKey[] = ["C", "Si", "Mn", "Cr", "Mo", "Ni", "V", "W"];
const hardnessKeys: HardnessKey[] = ["200", "300", "400", "500", "550", "600"];

export const products = parseCsv(productCsv).map((row, index) => {
  const lowerAustenitizing = cleanValue(
    row["Austenitizing Temperature Bottom Range (C)"],
  );
  const upperAustenitizing = cleanValue(
    row["Austenitizing Temperature Upper Range (C)"],
  );
  const tensileLower = cleanValue(row["Tensile Strength Lower Range (N/mm2)"]);
  const tensileUpper = cleanValue(row["Tensile Strength Upper Range (N/mm2)"]);

  return {
    id: `${row["Steel Type"]}-${row["Steel Grade"]}-${index}`,
    steelType: cleanValue(row["Steel Type"]),
    steelGrade: cleanValue(row["Steel Grade"]),
    internationalGrade: cleanValue(row["International Grade"]),
    specialChemicalComposition: cleanValue(row["Special Chemical Composition"]),
    chemicalComposition: Object.fromEntries(
      chemicalKeys.map((key) => [key, cleanValue(row[key])]),
    ) as Record<ChemicalKey, string>,
    steelProperties: cleanValue(row["Steel Properties"]),
    deliveryCondition: cleanValue(row["Delivery Condition (HB)"]),
    austenitizingTemperature:
      lowerAustenitizing && upperAustenitizing
        ? `${lowerAustenitizing}-${upperAustenitizing}`
        : lowerAustenitizing || upperAustenitizing,
    quenchingMedia: cleanValue(row["Quenching Media"]),
    temperingHardness: Object.fromEntries(
      hardnessKeys.map((key) => [key, cleanValue(row[key])]),
    ) as Record<HardnessKey, string>,
    tensileStrength:
      tensileLower && tensileUpper
        ? `${tensileLower}-${tensileUpper}`
        : tensileLower || tensileUpper,
    yieldStrength: cleanValue(row["Yield Strength (N/mm2)"]),
    application: cleanValue(row.Application),
  } satisfies Product;
});

export const productCategories = Array.from(
  new Set(products.map((product) => product.steelType)),
);

function cleanValue(value: string | undefined) {
  return value?.trim() ?? "";
}

function parseCsv(csv: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let isQuoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const nextChar = csv[index + 1];

    if (char === '"' && isQuoted && nextChar === '"') {
      field += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      isQuoted = !isQuoted;
      continue;
    }

    if (char === "," && !isQuoted) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !isQuoted) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  if (field || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const [headers, ...bodyRows] = rows.filter((csvRow) =>
    csvRow.some((value) => value.trim()),
  );

  return bodyRows.map((csvRow) =>
    Object.fromEntries(
      headers.map((header, index) => [header.trim(), csvRow[index] ?? ""]),
    ),
  );
}
