export function formatValue(value: string) {
  return value || "-";
}

export function formatChemicalValue(value: string) {
  if (!value) {
    return "-";
  }

  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue.toFixed(2) : value;
}
