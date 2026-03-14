import React from "react";
import { cn } from "@ui/lib/utils";

export interface TagChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  className?: string;
  key?: React.Key;
}

export function TagChip({ label, className = '', ...props }: TagChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-800 border border-neutral-200",
        className
      )}
      {...props}
    >
      {label}
    </span>
  );
}
