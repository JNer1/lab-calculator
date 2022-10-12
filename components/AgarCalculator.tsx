import { useEffect, useState } from "react";
import QuestionBlock from "./QuestionBlock";
import UserInput from "./UserInput";

const AgarCalculator = () => {
  const [recipeValue, setRecipeValue] = useState("0");
  const [volumeValue, setVolumeValue] = useState("0");
  const [massValue, setMassValue] = useState("0");

  useEffect(() => {
    const concentration = parseFloat(recipeValue) || 0;
    const finalvol = parseFloat(volumeValue) || 0;

    const getMassFormula = (concentration * finalvol) / 1000;

    const getMassValue = () => {
      setMassValue(getMassFormula.toFixed(2).toString());
    };

    getMassValue();
  }, [recipeValue, volumeValue]);

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-center text-3xl font-bold">Lab Calculator</h1>

      <div className="flex w-full max-w-lg flex-col items-start gap-8 rounded-md bg-lilac-700 p-4 lg:px-16">
        <QuestionBlock
          question="What is the agar recipe?"
          value={recipeValue}
          setValue={setRecipeValue}
          unit="g/L"
        />

        <QuestionBlock
          question="What is the final volume you need?"
          value={volumeValue}
          setValue={setVolumeValue}
          unit="mL"
        />
      </div>

      <div className="flex w-full max-w-lg flex-col items-start gap-8 rounded-md bg-lilac-700 p-4 lg:px-16">
        <div className="flex flex-col gap-2">
          <p className="text-lg">You should put this amount of powder:</p>
          <div className="flex gap-2">
            <div>
              <input
                readOnly
                disabled
                type="number"
                value={massValue}
                className="w-full rounded-sm bg-zinc-100 px-2 text-2xl font-semibold text-black"
              />
            </div>
            <span>g</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgarCalculator;
