import * as React from "react";
import { cn } from "../../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "success";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-ring",
        {
          "border-transparent bg-primary text-primary-foreground shadow-xs": variant === "default",
          "border-transparent bg-secondary text-secondary-foreground": variant === "secondary",
          "text-foreground border-border bg-background": variant === "outline",
          "border-transparent bg-destructive text-destructive-foreground": variant === "destructive",
          "border-border bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100": variant === "success",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
