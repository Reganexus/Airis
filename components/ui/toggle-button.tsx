"use client";

import React, { useState, MouseEvent } from "react";

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
      className={`p-2 bg-none border text-white rounded-md flex items-center justify-center hover:bg-slate-100 ${className}`}
    >
      <span className="text-xl">{isToggled ? iconB : iconA}</span>
    </button>
  );
};

export default ToggleButton;
