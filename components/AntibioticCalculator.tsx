"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import type { AntibioticForm } from "../types/AntibioticForm";
import type { AntibioticUnit } from "../types/AntibioticUnits";
import { calculateAntibiotic } from "../lib/calculations";
import QuestionBlock from "./QuestionBlock";
import ToggleButton from "./ToggleButton";
import CalculationResult from "./CalculationResult";

const AntibioticCalculator = () => {
  const [initialConcentration, setInitialConcentration] = useState("");
  const [finalConcentration, setFinalConcentration] = useState("");
  const [volume, setVolume] = useState("");
  const [potency, setPotency] = useState("");
  const [antibioticForm, setAntibioticForm] =
    useState<AntibioticForm>("liquid");
  const [antibioticUnit, setAntibioticUnit] = useState<AntibioticUnit>("micro");
  const [parent] = useAutoAnimate();
  const result = calculateAntibiotic({
    form: antibioticForm,
    unit: antibioticUnit,
    stock: initialConcentration,
    target: finalConcentration,
    volume,
    potency,
  });
  const concentrationUnit = antibioticUnit === "units" ? "units/mL" : "μg/mL";

  const changeUnit = (unit: AntibioticUnit) => {
    if (unit === antibioticUnit) return;
    setAntibioticUnit(unit);
    // Biological activity cannot be converted to mass without product potency.
    setInitialConcentration("");
    setFinalConcentration("");
    setPotency("");
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-center text-3xl font-bold">Antibiotic Calculator</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p>What form is your antibiotic?</p>
          <div className="grid grid-cols-2 gap-4">
            <ToggleButton
              label="Liquid"
              onClick={() => setAntibioticForm("liquid")}
              active={antibioticForm === "liquid"}
            />
            <ToggleButton
              label="Powder"
              onClick={() => setAntibioticForm("powder")}
              active={antibioticForm === "powder"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p>What concentration units do you need?</p>
          <div className="grid grid-cols-2 gap-4">
            <ToggleButton
              label="units/mL"
              onClick={() => changeUnit("units")}
              active={antibioticUnit === "units"}
            />
            <ToggleButton
              label="μg/mL"
              onClick={() => changeUnit("micro")}
              active={antibioticUnit === "micro"}
            />
          </div>
          <p className="text-sm">
            Switching between units/mL and μg/mL clears the concentration
            fields.
          </p>
        </div>
      </div>
      <div
        ref={parent}
        className="flex w-full max-w-lg flex-col items-start gap-8 rounded-md bg-lilac-700 p-4 lg:px-16"
      >
        {antibioticForm === "liquid" && (
          <QuestionBlock
            key={`stock-${antibioticUnit}`}
            id="starting-conc"
            question="What is your stock concentration?"
            value={initialConcentration}
            setValue={setInitialConcentration}
            unit={concentrationUnit}
            validation={result.stock}
          />
        )}
        <QuestionBlock
          key={`target-${antibioticUnit}`}
          id="final-conc"
          question="What concentration do you need?"
          value={finalConcentration}
          setValue={setFinalConcentration}
          unit={concentrationUnit}
          validation={result.target}
        />
        <QuestionBlock
          id="final-vol"
          question="What is the final volume you need?"
          value={volume}
          setValue={setVolume}
          unit="mL"
          validation={result.volume}
        />
        {antibioticForm === "powder" && antibioticUnit === "units" && (
          <>
            <QuestionBlock
              id="potency"
              question="What is the powder’s potency?"
              value={potency}
              setValue={setPotency}
              unit="units/mg"
              validation={result.potency}
            />
            <p className="text-sm">
              Use the potency from your product’s label or lot certificate.
              Activity units alone cannot determine a mass.
            </p>
          </>
        )}
      </div>
      <div className="flex w-full max-w-lg flex-col items-start gap-8 rounded-md bg-lilac-700 p-4 lg:px-16">
        <CalculationResult
          id="antibiotic-result"
          label={
            antibioticForm === "liquid"
              ? "Stock volume to use:"
              : "Powder mass to weigh:"
          }
          value={result.amount}
          unit={antibioticForm === "liquid" ? "mL" : "mg"}
        />
        <p className="text-sm">
          {antibioticForm === "liquid"
            ? "Add stock and diluent to reach the requested final volume."
            : "Dissolve, then bring to the requested final volume."}
        </p>
        {antibioticForm === "powder" && antibioticUnit === "micro" && (
          <details className="text-sm">
            <summary className="cursor-pointer">About this mass</summary>
            <p className="mt-2">
              Assumes the concentration refers to the product as weighed. For
              active ingredient equivalents, account for purity or potency.
            </p>
          </details>
        )}
      </div>
    </div>
  );
};

export default AntibioticCalculator;
