import type { SetStateAction, Dispatch } from "react";

interface UserInputProps {
  id: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  width?: string;
  disabled?: boolean;
  error?: string;
  onBlur?: () => void;
}

const UserInput = ({
  id,
  value,
  setValue,
  width,
  disabled,
  error,
  onBlur,
}: UserInputProps) => (
  <input
    id={id}
    type="text"
    inputMode="decimal"
    autoComplete="off"
    spellCheck={false}
    value={value}
    onChange={(event) => setValue(event.target.value)}
    onBlur={onBlur}
    aria-invalid={Boolean(error)}
    aria-describedby={`${id}-unit${error ? ` ${id}-error` : ""}`}
    className={`${width ?? "w-full"} rounded-sm bg-zinc-100 px-2 text-right text-2xl font-semibold text-black disabled:bg-zinc-400`}
    disabled={disabled}
  />
);

export default UserInput;
