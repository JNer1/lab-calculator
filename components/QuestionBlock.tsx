import { useState, type Dispatch, type SetStateAction } from "react";
import type { ParsedDecimal } from "../lib/calculations";
import UserInput from "./UserInput";

interface QuestionBlockProps {
  id: string;
  question: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  unit: string;
  validation: ParsedDecimal;
  disabled?: boolean;
}

const QuestionBlock = ({
  id,
  question,
  value,
  setValue,
  unit,
  validation,
  disabled,
}: QuestionBlockProps) => {
  const [touched, setTouched] = useState(false);
  const error =
    validation.status === "invalid" ||
    (touched && validation.status === "incomplete")
      ? validation.message
      : undefined;

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-lg">
        {question}
      </label>
      <div className="grid w-full grid-cols-4 place-content-end gap-x-2">
        <UserInput
          id={id}
          width="col-span-3"
          value={value}
          setValue={setValue}
          disabled={disabled}
          error={error}
          onBlur={() => setTouched(true)}
        />
        <span id={`${id}-unit`} className="col-span-1 self-end">
          {unit}
        </span>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-rose" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
};

export default QuestionBlock;
