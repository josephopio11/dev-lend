import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-border border-t px-6 py-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-md">
              <svg
                className="text-primary-foreground h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <span className="text-foreground text-lg font-semibold">
              {process.env.APP_NAME || "DevMGMT.msc"}
            </span>
          </div>

          <div className="flex items-center gap-8">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="border-border mt-8 border-t pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            Built because someone needed to remember who took what.
          </p>
        </div>
      </div>
    </footer>
  );
}
