/**
 * GlassBackground - soft aurora field behind all glass.
 * No filter:blur (radial gradients are already soft) so the layer is cheap to
 * composite and does not force backdrop-filter surfaces to re-blur each frame.
 * Animation is transform-only on a promoted layer.
 */
export function GlassBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/40" />

      <div
        className="absolute -left-[10%] -top-[15%] h-[45vmax] w-[45vmax] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle at center, rgb(var(--aurora-1) / 0.55), transparent 62%)",
        }}
      />
      <div
        className="absolute right-[-12%] bottom-[-10%] h-[42vmax] w-[42vmax] rounded-full opacity-45"
        style={{
          background:
            "radial-gradient(circle at center, rgb(var(--aurora-2) / 0.5), transparent 62%)",
        }}
      />
    </div>
  );
}
