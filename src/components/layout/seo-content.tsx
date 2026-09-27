import { QR_TYPES } from "@/lib/qr/types";
import { FAQ, STEPS } from "@/lib/seo";

export function SeoContent() {
  return (
    <section aria-label="About this QR code generator" className="mx-auto mt-20 w-full max-w-3xl text-left">
      <p className="text-sm leading-relaxed text-muted-foreground">
        QR Studio is a free QR code generator for links, Wi-Fi, contacts, and
        payments. Style the code, then download it. No sign-up.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight">QR code types</h2>
      <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {QR_TYPES.map((type) => (
          <li key={type.id} className="text-sm leading-relaxed">
            <span className="font-medium">{type.label}.</span>{" "}
            <span className="text-muted-foreground">{type.description}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight">How to make a QR code</h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        {STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight">Common questions</h2>
      <div className="mt-4 space-y-5">
        {FAQ.map((item) => (
          <div key={item.q}>
            <h3 className="text-base font-medium">{item.q}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
