import { FocusEvent, SetStateAction, Dispatch, ChangeEvent } from "react";

interface UserInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const UserInput = (props: UserInputProps) => {
  const { value, setValue } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;

    if (e.target.value === "" || regex.test(e.target.value)) {
      setValue(e.target.value);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setValue("0");
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      className="w-full rounded-sm bg-zinc-100 px-2 text-2xl font-semibold text-black "
    />
  );
};

export default UserInput;