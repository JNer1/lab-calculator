import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";

const Calculator = () => {
  const [recipeValue, setRecipeValue] = useState("0");
  const [volumeValue, setVolumeValue] = useState("0");
  const [massValue, setMassValue] = useState("0");

  const handleRecipeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecipeValue(e.target.value);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolumeValue(e.target.value);
  };

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
    <div className="flex w-full max-w-lg flex-col items-start gap-8 rounded-md bg-zinc-800 py-4 px-16">
      <div className="flex flex-col gap-2">
        <p className="text-lg">What is the agar recipe?</p>
        <div className="flex gap-2">
          <input
            type="number"
            value={recipeValue}
            onChange={handleRecipeChange}
            className="w-full rounded-sm bg-zinc-100 px-2 text-2xl font-semibold text-black "
          />
          <span>g/L</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg">What is the final volume you need?</p>
        <div className="flex gap-2">
          <input
            type="number"
            value={volumeValue}
            onChange={handleVolumeChange}
            className="w-full rounded-sm bg-zinc-100 px-2 text-2xl font-semibold text-black "
          />
          <span>mL</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg">You should put this amount of powder:</p>
        <div className="flex gap-2">
          <input
            readOnly
            disabled
            type="number"
            value={massValue}
            className="w-full rounded-sm bg-zinc-100 px-2 text-2xl font-semibold text-black "
          />
          <span>g</span>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
