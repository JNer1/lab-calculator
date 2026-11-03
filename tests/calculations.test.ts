import assert from "node:assert/strict";
import { test } from "node:test";
import Decimal from "decimal.js";
import {
  calculateAgar,
  calculateAntibiotic,
  calculateMedium,
  formatQuantity,
  parseDecimal,
  type AntibioticInputs,
} from "../lib/calculations";

const dilution: AntibioticInputs = {
  form: "liquid",
  unit: "micro",
  stock: "50000",
  target: "50",
  volume: "1",
  potency: "",
};

test("parses ordinary decimal input directly, retaining precision and edit states", () => {
  for (const raw of ["", "  ", "."])
    assert.equal(parseDecimal(raw).status, "incomplete");
  for (const raw of [
    "1..5",
    "NaN",
    "Infinity",
    "-1",
    "1e3",
    "0x10",
    "1,5",
    "1".repeat(101),
  ]) {
    assert.equal(parseDecimal(raw).status, "invalid", raw);
  }
  for (const raw of [".5", "12.", " 12.5 "])
    assert.equal(parseDecimal(raw).status, "valid", raw);
  const precise = parseDecimal("0.1234567890123456789");
  assert.equal(precise.status, "valid");
  if (precise.status === "valid")
    assert.equal(precise.value.toString(), "0.1234567890123456789");
});

test("zero is permitted only for fields where it has a physical meaning", () => {
  assert.equal(parseDecimal("0").status, "invalid");
  assert.equal(parseDecimal("0", true).status, "valid");
  assert.equal(calculateMedium("40", "0").mass, null);
  assert.equal(calculateAgar("0", "500").mass?.toString(), "0");
  assert.equal(
    calculateAntibiotic({ ...dilution, target: "0" }).amount?.toString(),
    "0",
  );
});

test("medium mass and weight/volume agar scale correctly", () => {
  assert.equal(calculateMedium("40", "500").mass?.toString(), "20");
  assert.equal(calculateAgar("1.5", "500").mass?.toString(), "7.5");
  assert.equal(calculateMedium("0.1", "0.2").mass?.toString(), "0.00002");
  assert.equal(calculateMedium("1..5", "500").mass, null);
  assert.equal(calculateAgar(".", "500").mass, null);
});

test("dilution returns a nonzero microliter dose and works for either concentration unit", () => {
  const micro = calculateAntibiotic(dilution).amount;
  assert.equal(micro?.toString(), "0.001");
  assert.deepEqual(formatQuantity(micro, "mL"), { text: "1", unit: "μL" });
  assert.equal(
    calculateAntibiotic({ ...dilution, unit: "units" }).amount?.toString(),
    "0.001",
  );
  assert.equal(
    calculateAntibiotic({
      ...dilution,
      target: dilution.stock,
    }).amount?.toString(),
    "1",
  );
});

test("rejects absent, malformed, zero, and insufficiently concentrated stock", () => {
  for (const stock of ["", ".", "0", "1..5", "NaN", "Infinity", "-1", "10"]) {
    const result = calculateAntibiotic({ ...dilution, stock });
    assert.equal(result.amount, null, stock);
  }
  const impossible = calculateAntibiotic({ ...dilution, stock: "10" });
  assert.equal(impossible.target.status, "invalid");
  assert.equal(calculateAntibiotic({ ...dilution, volume: "" }).amount, null);
});

test("powder mass uses micrograms or product-specific activity potency", () => {
  const powder: AntibioticInputs = {
    ...dilution,
    form: "powder",
    target: "100",
    volume: "100",
  };
  assert.equal(calculateAntibiotic(powder).amount?.toString(), "10");
  const activity = { ...powder, unit: "units" as const };
  assert.equal(calculateAntibiotic(activity).amount, null);
  assert.equal(calculateAntibiotic({ ...activity, potency: "0" }).amount, null);
  assert.equal(
    calculateAntibiotic({ ...activity, potency: "500" }).amount?.toString(),
    "20",
  );
  assert.equal(
    calculateAntibiotic({ ...activity, potency: "1000" }).amount?.toString(),
    "10",
  );
});

test("formatting adapts mass units, rounds only at display, and never hides a tiny positive quantity", () => {
  assert.deepEqual(formatQuantity(new Decimal("0.001"), "g"), {
    text: "1",
    unit: "mg",
  });
  assert.deepEqual(formatQuantity(new Decimal("0.000001"), "g"), {
    text: "1",
    unit: "μg",
  });
  assert.deepEqual(formatQuantity(new Decimal("0.001"), "mg"), {
    text: "1",
    unit: "μg",
  });
  assert.deepEqual(formatQuantity(new Decimal(0), "mg"), {
    text: "0",
    unit: "mg",
  });
  assert.deepEqual(formatQuantity(new Decimal("1.23456"), "g"), {
    text: "1.235",
    unit: "g",
  });
  assert.equal(formatQuantity(new Decimal("1e-30"), "mL").text, "1e-27");
  for (const value of [
    null,
    new Decimal(Infinity),
    new Decimal(NaN),
    new Decimal(-1),
  ]) {
    assert.equal(formatQuantity(value, "g").text, "—");
  }
});
