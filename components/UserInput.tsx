import { FocusEvent, SetStateAction, Dispatch, ChangeEvent } from "react";

interface UserInputProps {
  id: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  width?: string;
  disabled?: boolean;
}

const UserInput = (props: UserInputProps) => {
  const { id, value, setValue, width, disabled } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9.]+$/;

    if (e.target.value === "" || regex.test(e.target.value)) {
      setValue(e.target.value);
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      setValue("");
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setValue("0");
    }
  };

  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={handleChange}
      // onFocus={handleFocus}
      onBlur={handleBlur}
      className={`${
        width ? width : "w-full"
      } rounded-sm bg-zinc-100 px-2 text-right text-2xl font-semibold text-black disabled:bg-zinc-400`}
      disabled={disabled}
    />
  );
};

export default UserInput;
