"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import Decimal from "decimal.js";
import { useState } from "react";
import { AntibioticForm } from "../types/AntibioticForm";
import { AntibioticUnit } from "../types/AntibioticUnits";
import QuestionBlock from "./QuestionBlock";
import ToggleButton from "./ToggleButton";

const AntibioticCalculator = () => {
  const [initialConcentration, setInitialConcentration] = useState("0");
  const [finalConcentration, setFinalConcentration] = useState("0");
  const [volume, setVolume] = useState("0");

  const [antibioticForm, setAntibioticForm] =
    useState<AntibioticForm>("liquid");

  const [antibioticUnit, setAntibioticUnit] = useState<AntibioticUnit>("units");

  const [parent, enable] = useAutoAnimate();

  const liquidFormula = (ci: Decimal, cf: Decimal, v: Decimal): Decimal => {
    const answer = cf.times(v).dividedBy(ci);

    return answer;
  };

  const powderFormula = (c: Decimal, v: Decimal): Decimal => {
    const mass = c.times(v).dividedBy(1000);

    return mass;
  };

  const getAnswer = (): string => {
    if (antibioticForm === "liquid") {
      const ci = () => {
        try {
          return new Decimal(initialConcentration);
        } catch (err) {
          return new Decimal(0);
        }
      };

      const cf = () => {
        try {
          return new Decimal(finalConcentration);
        } catch (err) {
          return new Decimal(0);
        }
      };

      const v = () => {
        try {
          return new Decimal(volume);
        } catch (err) {
          return new Decimal(0);
        }
      };

      const answer = liquidFormula(ci(), cf(), v());

      if (answer.isNaN()) {
        return "0.00";
      }

      return answer.toFixed(2);
    }

    if (antibioticForm === "powder") {
      const c = () => {
        try {
          return new Decimal(finalConcentration);
        } catch (err) {
          return new Decimal(0);
        }
      };

      const v = () => {
        try {
          return new Decimal(volume);
        } catch (err) {
          return new Decimal(0);
        }
      };

      return powderFormula(c(), v()).toFixed(2);
    }

    return "0";
  };

  const toggleLiquid = () => {
    setAntibioticForm("liquid");
  };

  const togglePowder = () => {
    setAntibioticForm("powder");
  };

  const toggleUnits = () => {
    setAntibioticUnit("units");
  };

  const toggleMicro = () => {
    setAntibioticUnit("micro");
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-center text-3xl font-bold">Antibiotic Calculator</h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="">What form is your antibiotic?</p>

          <div className="grid grid-cols-2 gap-4">
            <ToggleButton
              label="Liquid"
              onClick={toggleLiquid}
              active={antibioticForm === "liquid"}
            />

            <ToggleButton
              label="Powder"
              onClick={togglePowder}
              active={antibioticForm === "powder"}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="">What concentration units do you need?</p>

          <div className="grid grid-cols-2 gap-4">
            <ToggleButton
              label="units/mL"
              onClick={toggleUnits}
              active={antibioticUnit === "units"}
            />

            <ToggleButton
              label="μg/mL"
              onClick={toggleMicro}
              active={antibioticUnit === "micro"}
            />
          </div>
        </div>
      </div>

      <div
        ref={parent}
        className="flex max-w-lg flex-col items-start gap-8 rounded-md bg-lilac-700 p-4 lg:px-16"
      >
        {antibioticForm === "liquid" && (
          <QuestionBlock
            id="starting-conc"
            question="What is your starting concentration?"
            value={initialConcentration}
            setValue={setInitialConcentration}
            unit={antibioticUnit === "units" ? "units/mL" : "μg/mL"}
          />
        )}

        <QuestionBlock
          id="final-conc"
          question="What concentration do you need?"
          value={finalConcentration}
          setValue={setFinalConcentration}
          unit={antibioticUnit === "units" ? "units/mL" : "μg/mL"}
        />

        <QuestionBlock
          id="final-vol"
          question="What is the final volume you need?"
          value={volume}
          setValue={setVolume}
          unit="mL"
        />
      </div>

      <div className="flex w-full max-w-lg flex-col items-start gap-8 rounded-md bg-lilac-700 p-4 lg:px-16">
        <div className="flex flex-col gap-2">
          <p className="text-lg">You should put this amount of antibiotic:</p>

          <div className="grid grid-cols-4 gap-x-2">
            <div className="col-span-3">
              <input
                disabled
                readOnly
                type="text"
                value={getAnswer()}
                className="w-full rounded-sm bg-zinc-100 px-2 text-right text-2xl font-semibold text-black"
              />
            </div>

            <span className="col-span-1 self-end">
              {antibioticForm === "liquid" ? "mL" : "mg"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntibioticCalculator;
