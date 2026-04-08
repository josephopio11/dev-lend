import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen flex-col justify-between">
      <Header />
      <main className="relative z-10 container mx-auto flex flex-1 flex-col items-center justify-center gap-4 px-4 py-8 text-center">
        <h1 className="text-muted-foreground text-5xl">404 - Page Not Found</h1>
        <p className="text-muted-foreground text-lg">
          The page you are looking for does not exist.
        </p>
      </main>
      <Footer />
    </div>
  );
}
