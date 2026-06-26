import { useState } from "react";
import { Layers, QrCode } from "lucide-react";

import { ThemeProvider } from "@/hooks/use-theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassBackground } from "@/components/glass/glass-background";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WizardShell } from "@/components/wizard/wizard-shell";
import { QRPreview } from "@/components/qr/qr-preview";
import { BatchGenerator } from "@/components/batch/batch-generator";
import { HistoryDrawer } from "@/components/history/history-drawer";
import { useWizardStore } from "@/store/wizardStore";

function SingleMode() {
  const stepIndex = useWizardStore((s) => s.stepIndex);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <WizardShell />
      <div
        className={
          stepIndex >= 1
            ? "block lg:sticky lg:top-24 lg:self-start"
            : "hidden lg:sticky lg:top-24 lg:block lg:self-start"
        }
      >
        <QRPreview />
      </div>
    </div>
  );
}

export default function App() {
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={200}>
        <GlassBackground />
        <Toaster position="bottom-center" />
        <HistoryDrawer open={historyOpen} onOpenChange={setHistoryOpen} />

        <div className="flex min-h-screen flex-col">
          <Header onOpenHistory={() => setHistoryOpen(true)} />

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-10 sm:pt-14">
            {/* Hero */}
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md">
                <QrCode className="size-3.5 text-accent" />
                12 data types - fully customizable
              </span>
              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Beautiful QR codes,
                <span className="bg-gradient-to-r from-emerald-400 to-violet-500 bg-clip-text text-transparent">
                  {" "}
                  made simple
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-balance text-base text-muted-foreground">
                Generate, style and export premium QR codes in a few smooth
                steps. No sign-up, everything runs in your browser.
              </p>
            </div>

            {/* Mode tabs */}
            <Tabs defaultValue="single" className="w-full">
              <div className="mb-6 flex justify-center">
                <TabsList>
                  <TabsTrigger value="single">
                    <QrCode className="size-4" />
                    Single
                  </TabsTrigger>
                  <TabsTrigger value="batch">
                    <Layers className="size-4" />
                    Batch
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="single">
                <SingleMode />
              </TabsContent>
              <TabsContent value="batch">
                <BatchGenerator />
              </TabsContent>
            </Tabs>
          </main>

          <Footer />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
