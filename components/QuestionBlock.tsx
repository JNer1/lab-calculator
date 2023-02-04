import { Dispatch, SetStateAction } from "react";
import UserInput from "./UserInput";

interface QuestionBlockProps {
  id: string;
  question: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  unit: string;
  disabled?: boolean;
}

const QuestionBlock = (props: QuestionBlockProps) => {
  const { id, question, value, setValue, unit, disabled } = props;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-lg">
        {question}
      </label>
      <div className="grid w-full grid-cols-4 place-content-end gap-x-2">
        <UserInput
          id={id}
          width="col-span-2"
          value={value}
          setValue={setValue}
          disabled={disabled}
        />
        <span className="col-span-1 self-end">{unit}</span>
      </div>
    </div>
  );
};

export default QuestionBlock;
