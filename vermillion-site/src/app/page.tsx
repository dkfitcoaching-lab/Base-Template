import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import CursorSpotlight from "@/components/CursorSpotlight";
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
import MarqueeDivider from "@/components/MarqueeDivider";

export default function Home() {
  return (
    <div className="page-bg">
      {/* Circuit pattern overlay */}
      <div className="circuit-overlay" aria-hidden="true" />

      <main id="main-content" className="relative">
        <CursorSpotlight />
        <ScrollProgress />
        <Navigation />
        <Hero />
        <Stats />
        <MarqueeDivider text="CUSTOM SOFTWARE" speed={25} direction="left" />
        <Showcase />
        <Services />
        <MarqueeDivider text="FULL OWNERSHIP" speed={30} direction="right" />
        <Comparison />
        <Features />
        <Process />
        <MarqueeDivider text="SHIPPED IN DAYS" speed={22} direction="left" />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
