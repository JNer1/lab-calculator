"use client";

import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { calculateAgar, calculateMedium } from "../lib/calculations";
import QuestionBlock from "./QuestionBlock";
import ToggleButton from "./ToggleButton";
import CalculationResult from "./CalculationResult";

const AgarCalculator = () => {
  const [withAgar, setWithAgar] = useState(false);
  const [recipeValue, setRecipeValue] = useState("");
  const [volumeValue, setVolumeValue] = useState("");
  const [agarPercentValue, setAgarPercentValue] = useState("1.5");
  const [parent] = useAutoAnimate();
  const medium = calculateMedium(recipeValue, volumeValue);
  const agar = calculateAgar(agarPercentValue, volumeValue);

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-center text-3xl font-bold">Lab Calculator</h1>
      <div className="flex flex-col gap-2">
        <p>Will you be adding agar powder?</p>
        <div className="grid grid-cols-2 gap-4">
          <ToggleButton
            label="Yes"
            onClick={() => setWithAgar(true)}
            active={withAgar}
          />
          <ToggleButton
            label="No"
            onClick={() => setWithAgar(false)}
            active={!withAgar}
          />
        </div>
      </div>
      <div
        ref={parent}
        className="flex w-full max-w-lg flex-col items-start gap-8 rounded-md bg-lilac-700 p-4 lg:px-16"
      >
        <QuestionBlock
          id="agar-recipe"
          question="What is the medium recipe?"
          value={recipeValue}
          setValue={setRecipeValue}
          unit="g/L"
          validation={medium.recipe}
        />
        <QuestionBlock
          id="final-vol"
          question="What is the final volume you need?"
          value={volumeValue}
          setValue={setVolumeValue}
          unit="mL"
          validation={medium.volume}
        />
        {withAgar && (
          <>
            <QuestionBlock
              id="agar-percentage"
              question="What agar concentration do you need?"
              value={agarPercentValue}
              setValue={setAgarPercentValue}
              unit="% w/v"
              validation={agar.percent}
            />
            <p className="text-sm">
              Use an agar-free medium base when adding agar here. The
              calculation assumes the medium contains no agar. Percent w/v means
              grams per 100 mL of final preparation.
            </p>
          </>
        )}
      </div>
      <div className="flex w-full max-w-lg flex-col items-start gap-8 rounded-md bg-lilac-700 p-4 lg:px-16">
        <CalculationResult
          id="medium-result"
          label="Medium to weigh:"
          value={medium.mass}
          unit="g"
        />
        {withAgar && (
          <CalculationResult
            id="agar-result"
            label="Agar to weigh:"
            value={agar.mass}
            unit="g"
          />
        )}
        <p className="text-sm">Prepare to the requested final volume.</p>
      </div>
    </div>
  );
};

export default AgarCalculator;
