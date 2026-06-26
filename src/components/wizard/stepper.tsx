import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const STEP_LABELS = ["Type", "Content", "Design", "Export"];

interface StepperProps {
  current: number;
  maxReached: number;
  onStepClick: (index: number) => void;
}

export function Stepper({ current, maxReached, onStepClick }: StepperProps) {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol className="flex items-center">
        {STEP_LABELS.map((label, index) => {
          const isComplete = index < current;
          const isActive = index === current;
          const isReachable = index <= maxReached;

          return (
            <li
              key={label}
              className={cn(
                "flex items-center",
                index < STEP_LABELS.length - 1 && "flex-1"
              )}
            >
              <button
                type="button"
                disabled={!isReachable}
                onClick={() => isReachable && onStepClick(index)}
                className={cn(
                  "group flex items-center gap-2.5",
                  isReachable ? "cursor-pointer" : "cursor-not-allowed"
                )}
              >
                <span className="relative flex size-9 items-center justify-center">
                  {(isActive || isComplete) && (
                    <span className="absolute inset-0 rounded-full bg-accent" />
                  )}
                  <span
                    className={cn(
                      "relative z-10 flex size-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                      isActive && "border-transparent text-accent-foreground",
                      isComplete && "border-transparent text-accent-foreground",
                      !isActive &&
                        !isComplete &&
                        "border-border bg-background/50 text-muted-foreground"
                    )}
                  >
                    {isComplete ? <Check className="size-4" /> : index + 1}
                  </span>
                </span>
                <span
                  className={cn(
                    "hidden text-sm font-medium transition-colors sm:block",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {label}
                </span>
              </button>

              {index < STEP_LABELS.length - 1 && (
                <span className="mx-2 h-px flex-1 overflow-hidden rounded-full bg-border sm:mx-3">
                  <span
                    className="block h-full bg-accent"
                    style={{ width: index < current ? "100%" : "0%" }}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
