import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Showcase from "@/components/Showcase";
import Services from "@/components/Services";
import Comparison from "@/components/Comparison";
import Features from "@/components/Features";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="main-content" className="relative">
      <ScrollProgress />
      <Navigation />
      <Hero />
      <Stats />
      <Showcase />
      <Services />
      <Comparison />
      <Features />
      <Process />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
