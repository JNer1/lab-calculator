import { Dispatch, SetStateAction } from "react";
import UserInput from "./UserInput";

interface QuestionBlockProps {
  question: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  unit: string;
}

const QuestionBlock = (props: QuestionBlockProps) => {
  const { question, value, setValue, unit } = props;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg">{question}</p>
      <div className="grid w-full grid-cols-4 place-content-end gap-x-2">
        <UserInput width="col-span-2" value={value} setValue={setValue} />
        <span className="col-span-1 self-end">{unit}</span>
      </div>
    </div>
  );
};

export default QuestionBlock;
