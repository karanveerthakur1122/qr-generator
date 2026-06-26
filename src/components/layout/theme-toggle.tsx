import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative flex size-10 cursor-pointer items-center justify-center rounded-xl border border-border/70 bg-background/40 text-foreground/80 hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
    </button>
  );
}
