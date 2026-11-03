import { formatQuantity } from "../lib/calculations";
import type Decimal from "decimal.js";

export default function CalculationResult({
  id,
  label,
  value,
  unit,
}: {
  id: string;
  label: string;
  value: Decimal | null;
  unit: "g" | "mg" | "mL";
}) {
  const formatted = formatQuantity(value, unit);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-lg">
        {label}
      </label>
      <output
        id={id}
        className="text-2xl font-semibold"
        aria-live="polite"
        aria-atomic="true"
      >
        {formatted.text} {formatted.unit}
      </output>
    </div>
  );
}
