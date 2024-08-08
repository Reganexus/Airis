"use client";

import React, { useState, MouseEvent } from "react";
import Tooltip from "../component/tooltip";

interface ToggleButtonProps {
  iconA: JSX.Element;
  iconB: JSX.Element;
  className?: string;
  changeModel: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  iconA,
  iconB,
  className,
  changeModel,
}) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent the default button action
    changeModel();
    setIsToggled((prev) => !prev);
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 bg-none border text-slate-700 dark:bg-slate-600 dark:text-slate-300 dark:border-slate-500 dark:hover:bg-slate-800 rounded-md flex items-center justify-center hover:bg-slate-100 ${className}`}
    >
      <span className="text-xl">{isToggled ? iconB : iconA}</span>
    </button>
  );
};

export default ToggleButton;
