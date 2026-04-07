import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10 flex flex-col items-center gap-4 justify-center text-center">
        <h1 className="text-5xl text-muted-foreground">404 - Page Not Found</h1>
        <p className="text-muted-foreground text-lg">
          The page you are looking for does not exist.
        </p>
      </main>
      <Footer />
    </div>
  );
}
