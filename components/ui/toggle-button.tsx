"use client";

import React, { useState, MouseEvent } from "react";

interface ToggleButtonProps {
  iconA: JSX.Element;
  iconB: JSX.Element;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ iconA, iconB }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent the default button action
    setIsToggled((prev) => !prev);
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 bg-none border text-white rounded-md flex items-center justify-center hover:bg-slate-100"
    >
      <span className="text-xl">{isToggled ? iconB : iconA}</span>
    </button>
  );
};

export default ToggleButton;
