import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {}

const Input = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <textarea
        // type={type}
        className={cn(
          "w-full bg-background text-base placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
