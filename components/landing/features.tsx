import { ClipboardList, Clock, Search, Users } from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "Simple Logging",
    description:
      "Record who borrowed what with just a few clicks. No complicated forms or unnecessary fields.",
  },
  {
    icon: Users,
    title: "Track Borrowers",
    description:
      "Keep a clear record of everyone who has borrowed equipment. See their history at a glance.",
  },
  {
    icon: Clock,
    title: "Loan History",
    description:
      "Full timeline of every device loan. Know when items were taken and returned.",
  },
  {
    icon: Search,
    title: "Quick Search",
    description:
      "Find any device or borrower instantly. No more digging through spreadsheets or papers.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="border-t border-border bg-card px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Everything you need,
            <br />
            nothing you don&apos;t
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Built to solve one problem well: keeping track of who has your
            devices.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group shadow-xl rounded-xl border border-border bg-background p-6 transition-colors hover:border-accent/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-accent/10">
                <feature.icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
