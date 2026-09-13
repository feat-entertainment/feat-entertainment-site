import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { AboutSection } from "@/components/sections/AboutSection";
import { ValueSection } from "@/components/sections/ValueSection";
import { BusinessSection } from "@/components/sections/BusinessSection";
import { WorksSection } from "@/components/sections/WorksSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { CompanySection } from "@/components/sections/CompanySection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <AboutSection />
        <ValueSection />
        <BusinessSection />
        <WorksSection />
        <PhilosophySection />
        <CompanySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
