import { TypeIcon } from "@/components/qr/type-icon";
import { QR_TYPES, type QRCategory } from "@/lib/qr/types";
import { useWizardStore } from "@/store/wizardStore";
import { cn } from "@/lib/utils";

const CATEGORIES: QRCategory[] = ["Basic", "Contact", "Network", "Payment"];

export function StepType() {
  const type = useWizardStore((s) => s.type);
  const setType = useWizardStore((s) => s.setType);
  const next = useWizardStore((s) => s.next);

  const handleSelect = (id: typeof type) => {
    setType(id);
    next();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">What are you encoding?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a content type to get started. You can change it anytime.
        </p>
      </div>

      {CATEGORIES.map((category) => (
        <div key={category} className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {category}
          </span>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {QR_TYPES.filter((t) => t.category === category).map((t) => {
              const active = t.id === type;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleSelect(t.id)}
                  className={cn(
                    "group flex cursor-pointer flex-col items-start gap-2 rounded-2xl border p-4 text-left",
                    active
                      ? "border-accent bg-accent/10"
                      : "border-border/70 bg-background/40 hover:bg-secondary"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-xl transition-colors",
                      active
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-foreground/80 group-hover:bg-background"
                    )}
                  >
                    <TypeIcon name={t.icon} className="size-5" />
                  </span>
                  <span className="text-sm font-semibold">{t.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {t.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
