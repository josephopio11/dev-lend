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
      className="border-border bg-card border-t px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Everything you need,
            <br />
            nothing you don&apos;t
          </h2>
          <p className="text-muted-foreground mt-4 text-pretty">
            Built to solve one problem well: keeping track of who has your
            devices.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group border-border bg-background hover:border-accent/50 rounded-xl border p-6 shadow-xl transition-colors"
            >
              <div className="bg-muted group-hover:bg-accent/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-colors">
                <feature.icon className="text-muted-foreground group-hover:text-accent h-6 w-6 transition-colors" />
              </div>
              <h3 className="text-foreground mb-2 text-lg font-medium">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
