const steps = [
  {
    number: "01",
    title: "Add your devices",
    description:
      "Enter your equipment into the system. Add names, serial numbers, or any details that help you identify them.",
  },
  {
    number: "02",
    title: "Log a loan",
    description:
      "When someone borrows a device, record their name and the date. It takes seconds.",
  },
  {
    number: "03",
    title: "Mark as returned",
    description:
      "When the device comes back, mark it as returned. Your inventory stays up to date.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Three steps. That&apos;s it.
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            No training required. No learning curve. Start tracking in minutes.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-px w-full -translate-x-1/2 bg-border md:block" />
              )}
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-background text-xl font-semibold text-muted-foreground">
                  {step.number}
                </div>
                <h3 className="mb-2 text-lg font-medium text-foreground">
                  {step.title}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
