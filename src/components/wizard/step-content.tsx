import { TypeIcon } from "@/components/qr/type-icon";
import { QRForm } from "@/components/forms/qr-form";
import { getTypeMeta } from "@/lib/qr/types";
import { useWizardStore } from "@/store/wizardStore";

export function StepContent() {
  const type = useWizardStore((s) => s.type);
  const formData = useWizardStore((s) => s.formData);
  const setFormData = useWizardStore((s) => s.setFormData);
  const meta = getTypeMeta(type);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
          <TypeIcon name={meta.icon} className="size-5" />
        </span>
        <div>
          <h2 className="text-xl font-semibold">{meta.label} details</h2>
          <p className="text-sm text-muted-foreground">{meta.description}</p>
        </div>
      </div>

      <QRForm
        key={type}
        type={type}
        initialData={formData}
        onChange={setFormData}
      />
    </div>
  );
}
