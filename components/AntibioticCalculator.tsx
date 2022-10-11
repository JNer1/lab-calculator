import { ChangeEvent, useEffect, useState } from "react";
import UserInput from "./UserInput";

const AntibioticCalculator = () => {
  const [recipeValue, setRecipeValue] = useState("0");
  const [volumeValue, setVolumeValue] = useState("0");
  const [massValue, setMassValue] = useState("0");

  const [isLiquid, setIsLiquid] = useState(false);
  const [isPowder, setIsPowder] = useState(false);

  const [isUnits, setIsUnits] = useState(false);
  const [isMicro, setIsMicro] = useState(false);

  const handleLiquidChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isPowder) setIsPowder(false);

    setIsLiquid(e.target.checked);
  };

  const handlePowderChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isLiquid) setIsLiquid(false);

    setIsPowder(e.target.checked);
  };

  const handleUnitsChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isMicro) setIsMicro(false);

    setIsUnits(e.target.checked);
  };
  const handleMicroChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isUnits) setIsUnits(false);

    setIsMicro(e.target.checked);
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

      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <p className="">What state is your antibiotic?</p>

          <div className="grid grid-cols-2 lg:grid-cols-3">
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
              <label htmlFor="isPowder">Powder</label>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="">What concentration units do you need?</p>

          <div className="grid grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-4">
              <input
                id="isUnits"
                type="checkbox"
                checked={isUnits}
                onChange={handleUnitsChange}
              />
              <label htmlFor="isUnits">units/mL</label>
            </div>
            <div className="flex gap-4">
              <input
                id="isMicro"
                type="checkbox"
                checked={isMicro}
                onChange={handleMicroChange}
              />
              <label htmlFor="isMicro">μg/mL</label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-w-lg flex-col items-start gap-8 rounded-md bg-zinc-800 p-4 lg:px-16">
        <div className="flex flex-col gap-2">
          <p className="text-lg">What conentration do you need?</p>
          <div className="grid w-full grid-cols-4 place-content-end gap-x-2">
            <UserInput
              width="col-span-2"
              value={recipeValue}
              setValue={setRecipeValue}
            />
            <span className="col-span-1 self-end">
              {isUnits ? "units/mL" : "μg/mL"}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-lg">What is the final volume you need?</p>
          <div className="grid w-full grid-cols-4 place-content-end gap-x-2">
            <UserInput
              width="col-span-2"
              value={volumeValue}
              setValue={setVolumeValue}
            />
            <span className="col-span-1 self-end">mL</span>
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-lg flex-col items-start gap-8 rounded-md bg-zinc-800 p-4 lg:px-16">
        <div className="flex flex-col gap-2">
          <p className="text-lg">You should put this amount of powder:</p>
          <div className="grid grid-cols-4 gap-x-2">
            <div className="col-span-2">
              <input
                readOnly
                disabled
                type="number"
                value={massValue}
                className="w-full rounded-sm bg-zinc-100 px-2 text-right text-2xl font-semibold text-black"
              />
            </div>
            <span className="col-span-1">g</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntibioticCalculator;
