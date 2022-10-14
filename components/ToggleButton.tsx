import { EventHandler, KeyboardEventHandler, MouseEventHandler } from "react";

interface ToggleButtonProps {
  onClick: MouseEventHandler;
  onKeyDown: KeyboardEventHandler;
  active: boolean;
  label: string;
}

const ToggleButton = (props: ToggleButtonProps) => {
  const { onClick, onKeyDown, label, active } = props;

  return (
    <div
      onClick={onClick}
      className={`${
        active ? " bg-teal-200 text-lilac-900" : "bg-lilac-700"
      } cursor-pointer rounded-md p-1 text-center font-semibold transition duration-[120ms] ease-in-out hover:bg-teal-200 hover:text-lilac-900`}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {label}
    </div>
  );
};

export default ToggleButton;
