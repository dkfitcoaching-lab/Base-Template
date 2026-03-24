import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Process from "@/components/Process";
import Comparison from "@/components/Comparison";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Showcase />
      <Services />
      <Features />
      <Process />
      <Comparison />
      <CTA />
      <Footer />
    </main>
  );
}
