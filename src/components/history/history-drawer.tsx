import { Clock, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TypeIcon } from "@/components/qr/type-icon";
import { getTypeMeta } from "@/lib/qr/types";
import { useHistoryStore, type HistoryItem } from "@/store/historyStore";
import { useWizardStore } from "@/store/wizardStore";

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function HistoryDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const items = useHistoryStore((s) => s.items);
  const remove = useHistoryStore((s) => s.remove);
  const clear = useHistoryStore((s) => s.clear);

  const setType = useWizardStore((s) => s.setType);
  const setFormData = useWizardStore((s) => s.setFormData);
  const setCustomization = useWizardStore((s) => s.setCustomization);
  const setStep = useWizardStore((s) => s.setStep);

  const restore = (item: HistoryItem) => {
    setType(item.type);
    setFormData(item.formData, true);
    setCustomization(item.customization);
    setStep(3);
    onOpenChange(false);
    toast.success("Restored from history");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent side="right" className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>History</DialogTitle>
          <DialogDescription>
            Your recently generated QR codes, stored locally.
          </DialogDescription>
        </DialogHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-muted-foreground">
            <Clock className="size-10 opacity-40" />
            <p className="text-sm">No QR codes yet. Generate one to see it here.</p>
          </div>
        ) : (
          <>
            <div className="-mr-2 flex-1 space-y-2 overflow-y-auto pr-2">
              {items.map((item) => {
                const meta = getTypeMeta(item.type);
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-2.5"
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={`${meta.label} QR thumbnail`}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <TypeIcon name={meta.icon} className="size-5 text-slate-700" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1.5 text-sm font-medium">
                        <TypeIcon name={meta.icon} className="size-3.5 text-accent" />
                        {meta.label}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {item.content}
                      </p>
                      <p className="text-[11px] text-muted-foreground/70">
                        {timeAgo(item.createdAt)}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        aria-label="Restore"
                        onClick={() => restore(item)}
                      >
                        <RotateCcw className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-destructive hover:text-destructive"
                        aria-label="Delete"
                        onClick={() => remove(item.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button variant="outline" onClick={clear}>
              <Trash2 className="size-4" />
              Clear all
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
