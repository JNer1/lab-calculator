import "./dom";
import React from "react";
import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AgarCalculator from "../components/AgarCalculator";
import AntibioticCalculator from "../components/AntibioticCalculator";

afterEach(cleanup);

test("blank fields wait for blur; malformed text is preserved and blocks stale results", async () => {
  const user = userEvent.setup();
  render(<AgarCalculator />);
  const recipe = screen.getByLabelText("What is the medium recipe?");
  const volume = screen.getByLabelText("What is the final volume you need?");
  const result = screen.getByLabelText("Medium to weigh:");
  assert.equal(screen.queryByText("Enter a number."), null);
  await user.click(recipe);
  await user.tab();
  assert.equal(recipe.getAttribute("aria-invalid"), "true");
  assert.ok(screen.getByText("Enter a number."));
  await user.type(recipe, "40");
  await user.type(volume, "500");
  assert.equal(result.textContent, "20 g");
  await user.type(recipe, "..5");
  assert.equal((recipe as HTMLInputElement).value, "40..5");
  assert.equal(result.textContent, "— g");
  assert.equal(recipe.getAttribute("aria-invalid"), "true");
  assert.ok(screen.getByText("Enter a decimal number, such as 12.5."));
  await user.clear(recipe);
  await user.type(recipe, "40");
  assert.equal(recipe.getAttribute("aria-invalid"), "false");
  assert.equal(result.textContent, "20 g");
  await user.clear(volume);
  assert.equal(result.textContent, "— g");
  assert.equal((volume as HTMLInputElement).value, "");
});

test("dilution feedback rejects impossible concentrations and shows small doses in microliters", async () => {
  const user = userEvent.setup();
  render(<AntibioticCalculator />);
  const stock = screen.getByLabelText("What is your stock concentration?");
  const target = screen.getByLabelText("What concentration do you need?");
  await user.type(stock, "0");
  assert.ok(screen.getByText("Enter a value greater than zero."));
  await user.clear(stock);
  await user.type(stock, "10");
  await user.type(target, "50");
  await user.type(
    screen.getByLabelText("What is the final volume you need?"),
    "1",
  );
  assert.ok(
    screen.getByText(
      "The target concentration cannot exceed the stock concentration.",
    ),
  );
  assert.equal(
    screen.getByLabelText("Stock volume to use:").textContent,
    "— mL",
  );
  await user.clear(stock);
  await user.type(stock, "50000");
  assert.equal(
    screen.getByLabelText("Stock volume to use:").textContent,
    "1 μL",
  );
  await user.click(screen.getByRole("button", { name: "units/mL" }));
  assert.equal(
    (
      screen.getByLabelText(
        "What is your stock concentration?",
      ) as HTMLInputElement
    ).value,
    "",
  );
  assert.equal(
    (
      screen.getByLabelText(
        "What concentration do you need?",
      ) as HTMLInputElement
    ).value,
    "",
  );
  assert.equal(
    screen.getByLabelText("Stock volume to use:").textContent,
    "— mL",
  );
});

test("activity powder requires potency, while inactive stock fields do not block powder calculations", async () => {
  const user = userEvent.setup();
  render(<AntibioticCalculator />);
  await user.click(screen.getByRole("button", { name: "Powder" }));
  await user.click(screen.getByRole("button", { name: "units/mL" }));
  await user.type(
    screen.getByLabelText("What concentration do you need?"),
    "100",
  );
  await user.type(
    screen.getByLabelText("What is the final volume you need?"),
    "100",
  );
  assert.equal(
    screen.getByLabelText("Powder mass to weigh:").textContent,
    "— mg",
  );
  await user.type(
    screen.getByLabelText("What is the powder’s potency?"),
    "500",
  );
  assert.equal(
    screen.getByLabelText("Powder mass to weigh:").textContent,
    "20 mg",
  );
});
