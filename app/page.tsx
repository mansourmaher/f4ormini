import { getAllCars } from "@/actions/car/car";
import { CallToAction } from "./_landing_component/call-to-action";
import { FeaturedCars } from "./_landing_component/featured-cars";
import { Features } from "./_landing_component/features";
import { Footer } from "./_landing_component/footer";
import { Header } from "./_landing_component/header";
import { Hero } from "./_landing_component/hero";
import { Stats } from "./_landing_component/stats";
import { TrustBadges } from "./_landing_component/trust-badges";

import { auth } from "@/auth";

const Home = async () => {
  const cars = await getAllCars({ status: "published" });
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Stats />
        <FeaturedCars cars={cars} />
        <Features />
        <TrustBadges />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
