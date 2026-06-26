import { CustomizationPanel } from "@/components/qr/customization-panel";

export function StepDesign() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Make it yours</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Style the QR with colors, shapes, a logo and presets. The preview
          updates live.
        </p>
      </div>
      <CustomizationPanel />
    </div>
  );
}
