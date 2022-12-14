import { KeyboardEventHandler, useEffect, useState } from "react";
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

  const hasChosenState = isLiquid || isPowder;
  const hasChosenUnits = isUnits || isMicro;
  const isValid = hasChosenState && hasChosenUnits;

  const toggleLiquid = () => {
    if (isPowder) setIsPowder(false);

    setIsLiquid(!isLiquid);
  };

  const handleLiquidKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      toggleLiquid();
    }
  };

  const togglePowder = () => {
    if (isLiquid) setIsLiquid(false);

    setIsPowder(!isPowder);
  };

  const handlePowderKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      togglePowder();
    }
  };

  const toggleUnits = () => {
    if (isMicro) setIsMicro(false);

    setIsUnits(!isUnits);
  };

  const handleUnitsKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      toggleUnits();
    }
  };

  const toggleMicro = () => {
    if (isUnits) setIsUnits(false);

    setIsMicro(!isMicro);
  };

  const handleMicroKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      toggleMicro();
    }
  };

  const liquidFormula = (ci: number, cf: number, v: number) => {
    const answer = (cf * v) / ci;

    if (!answer) {
      return 0;
    }

    return answer;
  };

  const powderFormula = (c: number, v: number) => {
    const mass = (c * v) / 1000;

    if (!mass) {
      return 0;
    }

    return mass;
  };

  useEffect(() => {
    const ci = parseFloat(initialConcentration);
    const cf = parseFloat(finalConcentration) || 0;
    const v = parseFloat(volume) || 0;

    if (isLiquid) {
      setAnswer(liquidFormula(ci, cf, v).toFixed(2).toString());
    }

    if (isPowder) {
      const c = parseFloat(finalConcentration) || 0;
      const v = parseFloat(volume) || 0;
      setAnswer(powderFormula(c, v).toFixed(2));
    }
  }, [initialConcentration, finalConcentration, volume, isLiquid, isPowder]);

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-center text-3xl font-bold">Antibiotic Calculator</h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="">What form is your antibiotic?</p>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <ToggleButton
              label="Liquid"
              onClick={toggleLiquid}
              onKeyDown={handleLiquidKeyDown}
              active={isLiquid}
            />

            <ToggleButton
              label="Powder"
              onClick={togglePowder}
              onKeyDown={handlePowderKeyDown}
              active={isPowder}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="">What concentration units do you need?</p>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <ToggleButton
              label="units/mL"
              onClick={toggleUnits}
              onKeyDown={handleUnitsKeyDown}
              active={isUnits}
            />

            <ToggleButton
              label="??g/mL"
              onClick={toggleMicro}
              onKeyDown={handleMicroKeyDown}
              active={isMicro}
            />
          </div>
        </div>
      </div>

      <p
        className={`${
          isValid ? "-my-4 h-0 opacity-0" : ""
        } text-center text-lg text-red-400 transition-all ease-in-out`}
      >
        Please select an option for all questions
      </p>

      <div className="flex max-w-lg flex-col items-start gap-8 rounded-md bg-lilac-700 p-4 lg:px-16">
        {isLiquid && (
          <QuestionBlock
            question="What is your starting concentration?"
            value={initialConcentration}
            setValue={setInitialConcentration}
            unit={isUnits ? "units/mL" : "??g/mL"}
            disabled={!isValid}
          />
        )}

        <QuestionBlock
          question="What concentration do you need?"
          value={finalConcentration}
          setValue={setFinalConcentration}
          unit={isUnits ? "units/mL" : "??g/mL"}
          disabled={!isValid}
        />

        <QuestionBlock
          question="What is the final volume you need?"
          value={volume}
          setValue={setVolume}
          unit="mL"
          disabled={!isValid}
        />
      </div>

      <div className="flex w-full max-w-lg flex-col items-start gap-8 rounded-md bg-lilac-700 p-4 lg:px-16">
        <div className="flex flex-col gap-2">
          <p className="text-lg">You should put this amount of antibiotic:</p>
          <div className="grid grid-cols-4 gap-x-2">
            <div className="col-span-2">
              <input
                readOnly
                type="text"
                value={answer}
                className="w-full rounded-sm bg-zinc-100 px-2 text-right text-2xl font-semibold text-black disabled:bg-zinc-400"
                disabled={!isValid}
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
