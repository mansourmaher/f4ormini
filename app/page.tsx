import Image from "next/image";
import { Header } from "./_landingPageComponents/Header";
import { PrimaryFeatures } from "./_landingPageComponents/PrimaryFeatures";
import { SecondaryFeatures } from "./_landingPageComponents/SecondaryFeatures";
import { CallToAction } from "./_landingPageComponents/CallToAction";
import { Testimonials } from "./_landingPageComponents/Testimonials";
import { Pricing } from "./_landingPageComponents/Pricing";
import { Faqs } from "./_landingPageComponents/Faqs";
import { Footer } from "./_landingPageComponents/Footer";
import Hero from "./_landingPageComponents/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
