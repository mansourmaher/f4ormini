import { Header } from "@/app/_landing_component/header";
import { SellCarForm } from "../_components/sell-car-form";
import { Footer } from "@/app/_landing_component/footer";

export default function SellPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">Sell Your Car</h1>
            <p className="text-lg text-muted-foreground">
              List your vehicle in minutes and reach thousands of potential
              buyers
            </p>
          </div>
          <SellCarForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
