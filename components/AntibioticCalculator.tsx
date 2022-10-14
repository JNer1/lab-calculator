import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from "react";
import QuestionBlock from "./QuestionBlock";
import ToggleButton from "./ToggleButton";

const AntibioticCalculator = () => {
  const [initialConcentration, setInitialConcentration] = useState("0");
  const [finalConcentration, setFinalConcentration] = useState("0");
  const [volume, setVolume] = useState("0");
  const [answer, setAnswer] = useState("0");

  const [isLiquid, setIsLiquid] = useState(true);
  const [isPowder, setIsPowder] = useState(false);

  const [isUnits, setIsUnits] = useState(true);
  const [isMicro, setIsMicro] = useState(false);

  const handleLiquidChange = () => {
    if (isPowder) setIsPowder(false);

    setIsLiquid(!isLiquid);
  };

  const handleLiquidKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      if (isPowder) setIsPowder(false);
      setIsLiquid(!isLiquid);
    }
  };

  const handlePowderChange = () => {
    if (isLiquid) setIsLiquid(false);

    setIsPowder(!isPowder);
  };

  const handlePowderKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      if (isLiquid) setIsLiquid(false);
      setIsPowder(!isPowder);
    }
  };

  const handleUnitsChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isMicro) setIsMicro(false);

    setIsUnits(e.target.checked);
  };
  const handleMicroChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isUnits) setIsUnits(false);

    setIsMicro(e.target.checked);
  };

  const liquidFormula = (ci: number, cf: number, v: number) => {
    const answer = (cf * v) / ci;

    if (!answer) {
      return 0;
    }

    return answer;
  };

  useEffect(() => {
    const ci = parseFloat(initialConcentration);
    const cf = parseFloat(finalConcentration) || 0;
    const v = parseFloat(volume) || 0;

    if (isLiquid) {
      setAnswer(liquidFormula(ci, cf, v).toFixed(2).toString());
    }
  }, [initialConcentration, finalConcentration, volume, isLiquid]);

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-center text-3xl font-bold">Antibiotic Calculator</h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="">What state is your antibiotic?</p>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <ToggleButton
              label="Liquid"
              onClick={handleLiquidChange}
              onKeyDown={handleLiquidKeyDown}
              active={isLiquid}
            />

            <ToggleButton
              label="Powder"
              onClick={handlePowderChange}
              onKeyDown={handlePowderKeyDown}
              active={isPowder}
            />
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

      <div className="flex max-w-lg flex-col items-start gap-8 rounded-md bg-lilac-700 p-4 lg:px-16">
        {isLiquid && (
          <QuestionBlock
            question="What is your starting concentration?"
            value={initialConcentration}
            setValue={setInitialConcentration}
            unit={isUnits ? "units/mL" : "μg/mL"}
          />
        )}

        <QuestionBlock
          question="What concentration do you need?"
          value={finalConcentration}
          setValue={setFinalConcentration}
          unit={isUnits ? "units/mL" : "μg/mL"}
        />

        <QuestionBlock
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
            <div className="col-span-2">
              <input
                readOnly
                disabled
                type="number"
                value={answer}
                className="w-full rounded-sm bg-zinc-100 px-2 text-right text-2xl font-semibold text-black"
              />
            </div>
            <span className="col-span-1 self-end">
              {isLiquid ? "mL" : "mg"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntibioticCalculator;
