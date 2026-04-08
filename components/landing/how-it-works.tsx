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
    <section id="how-it-works" className="relative px-6 py-20 md:py-28">
      <div
        className="absolute top-0 left-0 z-0 h-full w-full bg-cover bg-fixed bg-center"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      >
        {/* <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
          <Image src={"/images/bg.jpg"} alt="" fill className="object-cover" />
        </div> */}
        <div className="bg-background/80 absolute inset-0 backdrop-blur-sm" />
      </div>
      <div className="max-w-6x relative z-10 mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Three steps. That&apos;s it.
          </h2>
          <p className="text-muted-foreground mt-4 text-pretty">
            No training required. No learning curve. Start tracking in minutes.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="bg-border absolute top-8 left-1/2 hidden h-px w-full -translate-x-1/2 md:block" />
              )}
              <div className="relative flex flex-col items-center text-center">
                <div className="border-border bg-background text-muted-foreground mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 text-xl font-semibold">
                  {step.number}
                </div>
                <h3 className="text-foreground mb-2 text-lg font-medium">
                  {step.title}
                </h3>
                <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
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
