// components/Tooltip.tsx
import React, { ReactNode } from "react";
import "./tooltip.css";

interface TooltipProps {
  content: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = "right",
  className,
  children,
}) => {
  const tooltipClassName = `tooltip ${position} ${className ? className : ""}`;

  return (
    <div className="relative inline-block">
      <div className={tooltipClassName}>
        <div className="tooltip-content">{content}</div>
      </div>
      {children}
    </div>
  );
};

export default Tooltip;
