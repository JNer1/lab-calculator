import Decimal from "decimal.js";
import type { AntibioticForm } from "../types/AntibioticForm";
import type { AntibioticUnit } from "../types/AntibioticUnits";

// Keep arithmetic policy local. Round for display only; never convert via Number.
const LabDecimal = Decimal.clone({
  precision: 20,
  rounding: Decimal.ROUND_HALF_UP,
});

export type ParsedDecimal =
  | { status: "incomplete" | "invalid"; message: string }
  | { status: "valid"; value: Decimal };

export function parseDecimal(raw: string, allowZero = false): ParsedDecimal {
  const text = raw.trim();
  if (text === "" || text === ".") {
    return { status: "incomplete", message: "Enter a number." };
  }
  if (text.length > 100) {
    return {
      status: "invalid",
      message: "Enter a number with at most 100 characters.",
    };
  }
  if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) {
    return {
      status: "invalid",
      message: "Enter a decimal number, such as 12.5.",
    };
  }
  const value = new LabDecimal(text);
  if (!value.isFinite() || (allowZero ? value.lt(0) : value.lte(0))) {
    return {
      status: "invalid",
      message: allowZero
        ? "Enter zero or a positive number."
        : "Enter a value greater than zero.",
    };
  }
  return { status: "valid", value };
}

export function calculateMedium(recipeText: string, volumeText: string) {
  const recipe = parseDecimal(recipeText);
  const volume = parseDecimal(volumeText);
  const mass =
    recipe.status === "valid" && volume.status === "valid"
      ? recipe.value.times(volume.value).div(1000)
      : null;
  return { recipe, volume, mass }; // g/L × mL / 1000 = g
}

export function calculateAgar(percentText: string, volumeText: string) {
  const percent = parseDecimal(percentText, true);
  const volume = parseDecimal(volumeText);
  const mass =
    percent.status === "valid" && volume.status === "valid"
      ? percent.value.times(volume.value).div(100)
      : null;
  return { percent, volume, mass }; // % w/v = g per 100 mL of final preparation
}

export interface AntibioticInputs {
  form: AntibioticForm;
  unit: AntibioticUnit;
  stock: string;
  target: string;
  volume: string;
  potency: string;
}

export function calculateAntibiotic(inputs: AntibioticInputs) {
  const stock = parseDecimal(inputs.stock);
  let target = parseDecimal(inputs.target, true);
  const volume = parseDecimal(inputs.volume);
  const potency = parseDecimal(inputs.potency);
  let amount: Decimal | null = null;

  if (
    inputs.form === "liquid" &&
    stock.status === "valid" &&
    target.status === "valid" &&
    target.value.gt(stock.value)
  ) {
    target = {
      status: "invalid",
      message:
        "The target concentration cannot exceed the stock concentration.",
    };
  }

  if (target.status === "valid" && volume.status === "valid") {
    if (inputs.form === "liquid" && stock.status === "valid") {
      amount = target.value.times(volume.value).div(stock.value); // mL
    } else if (inputs.form === "powder") {
      if (inputs.unit === "micro") {
        amount = target.value.times(volume.value).div(1000); // μg to mg
      } else if (potency.status === "valid") {
        amount = target.value.times(volume.value).div(potency.value); // units / (units/mg)
      }
    }
  }

  return { stock, target, volume, potency, amount };
}

export type QuantityUnit = "g" | "mg" | "μg" | "mL" | "μL";

export function formatQuantity(
  value: Decimal | null,
  baseUnit: "g" | "mg" | "mL",
) {
  if (value === null || !value.isFinite() || value.lt(0)) {
    return { text: "—", unit: baseUnit };
  }
  let scaled = value;
  let unit: QuantityUnit = baseUnit;
  if (!value.isZero() && value.lt(1)) {
    scaled = value.times(1000);
    unit = baseUnit === "mL" ? "μL" : baseUnit === "g" ? "mg" : "μg";
    if (baseUnit === "g" && scaled.lt(1)) {
      scaled = scaled.times(1000);
      unit = "μg";
    }
  }
  // Four significant digits, retaining nonzero values through scientific notation
  // outside a readable decimal range. This does not imply instrument accuracy.
  return {
    text: scaled.toSignificantDigits(4, LabDecimal.ROUND_HALF_UP).toString(),
    unit,
  };
}
