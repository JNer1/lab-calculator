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
        active
          ? "border-2 border-teal-200"
          : "border-2 border-lilac-700 bg-lilac-700"
      } cursor-pointer rounded-md  text-center font-semibold hover:border-teal-200`}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {label}
    </div>
  );
};

export default ToggleButton;
