import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 py-10 text-center">
      <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        Crafted with
        <Heart className="size-3.5 fill-rose-500 text-rose-500" />
        by Karan Veer Thakur
      </p>
      <p className="mt-1 text-xs text-muted-foreground/70">
        QR Studio - all generation happens locally in your browser.
      </p>
    </footer>
  );
}
