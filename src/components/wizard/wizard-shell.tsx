import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/glass/glass-card";
import { Stepper } from "@/components/wizard/stepper";
import { StepType } from "@/components/wizard/step-type";
import { StepContent } from "@/components/wizard/step-content";
import { StepDesign } from "@/components/wizard/step-design";
import { StepExport } from "@/components/wizard/step-export";
import { useWizardStore, WIZARD_STEPS } from "@/store/wizardStore";

const STEP_COMPONENTS = [StepType, StepContent, StepDesign, StepExport];

export function WizardShell() {
  const stepIndex = useWizardStore((s) => s.stepIndex);
  const isContentValid = useWizardStore((s) => s.isContentValid);
  const next = useWizardStore((s) => s.next);
  const prev = useWizardStore((s) => s.prev);
  const setStep = useWizardStore((s) => s.setStep);
  const reset = useWizardStore((s) => s.reset);

  const Current = STEP_COMPONENTS[stepIndex];
  const isLast = stepIndex === WIZARD_STEPS.length - 1;

  // Step 1 (content) requires valid form data before advancing.
  const canAdvance = stepIndex === 1 ? isContentValid : true;
  // Highest step the user may jump to (gated on content validity).
  const maxReached = isContentValid ? WIZARD_STEPS.length - 1 : 1;

  return (
    <GlassCard className="flex flex-col gap-6 p-5 sm:p-7">
      <Stepper current={stepIndex} maxReached={maxReached} onStepClick={setStep} />

      <div>
        <Current />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-5">
        <div>
          {stepIndex > 0 && (
            <Button variant="ghost" onClick={prev}>
              <ArrowLeft className="size-4" />
              Back
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isLast ? (
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="size-4" />
              New QR
            </Button>
          ) : (
            stepIndex > 0 && (
              <Button variant="accent" disabled={!canAdvance} onClick={next}>
                Continue
                <ArrowRight className="size-4" />
              </Button>
            )
          )}
        </div>
      </div>
    </GlassCard>
  );
}
