import { History, QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useHistoryStore } from "@/store/historyStore";

export function Header({ onOpenHistory }: { onOpenHistory: () => void }) {
  const count = useHistoryStore((s) => s.items.length);

  return (
    <header className="sticky top-3 z-40 mx-auto w-full max-w-6xl px-3 sm:top-4 sm:px-4">
      <div className="glass-surface glass-highlight flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-violet-500 text-white shadow-sm">
            <QrCode className="size-5" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold sm:text-base">QR Studio</p>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Premium QR generator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onOpenHistory}>
            <History className="size-4" />
            <span className="hidden sm:inline">History</span>
            {count > 0 && (
              <span className="ml-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-semibold text-accent-foreground">
                {count}
              </span>
            )}
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
