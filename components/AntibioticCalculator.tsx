import { ChangeEvent, useEffect, useState } from "react";
import UserInput from "./UserInput";

const AntibioticCalculator = () => {
  const [recipeValue, setRecipeValue] = useState("0");
  const [volumeValue, setVolumeValue] = useState("0");
  const [massValue, setMassValue] = useState("0");

  const [isLiquid, setIsLiquid] = useState(false);
  const [isPowder, setIsPowder] = useState(false);

  const handleLiquidChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isPowder) setIsPowder(false);

    setIsLiquid(e.target.checked);
  };

  const handlePowderChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isLiquid) setIsLiquid(false);

    setIsPowder(e.target.checked);
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
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-center text-3xl font-bold">Antibiotic Calculator</h1>

      <div className="flex gap-8">
        <p>What state is your antibiotic?</p>

        <div className="flex gap-4">
          <input
            id="isLiquid"
            type="checkbox"
            checked={isLiquid}
            onChange={handleLiquidChange}
          />
          <label htmlFor="isLiquid">Liquid</label>
        </div>

        <div className="flex gap-4">
          <input
            id="isPowder"
            type="checkbox"
            checked={isPowder}
            onChange={handlePowderChange}
          />
          <label htmlFor="isLiquid">Powder</label>
        </div>
      </div>

      <div className="flex w-full max-w-lg flex-col items-start gap-8 rounded-md bg-zinc-800 py-4 px-16">
        <div className="flex flex-col gap-2">
          <p className="text-lg">What is the agar recipe?</p>
          <div className="flex gap-2">
            <UserInput value={recipeValue} setValue={setRecipeValue} />
            <span>g/L</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-lg">What is the final volume you need?</p>
          <div className="flex gap-2">
            <UserInput value={volumeValue} setValue={setVolumeValue} />
            <span>mL</span>
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-lg flex-col items-start gap-8 rounded-md bg-zinc-800 py-4 px-16">
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

export default AntibioticCalculator;
