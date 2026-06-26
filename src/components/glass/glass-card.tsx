import * as React from "react";

import { cn } from "@/lib/utils";

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  highlight?: boolean;
  interactive?: boolean;
};

/** GlassCard - the primary frosted Liquid Glass surface. */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, highlight = true, interactive = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative rounded-2xl glass-surface",
        highlight && "glass-highlight",
        interactive && "hover:bg-[rgb(var(--glass-bg)/0.85)]",
        className
      )}
      {...props}
    />
  )
);
GlassCard.displayName = "GlassCard";

/**
 * GlassPanel - a lighter inset glass surface for nested content.
 */
export const GlassPanel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-border/60 bg-background/40 backdrop-blur-md",
      className
    )}
    {...props}
  />
));
GlassPanel.displayName = "GlassPanel";
