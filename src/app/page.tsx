import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SectionReveal from "@/components/ui/SectionReveal";
import AboutSection from "@/sections/AboutSection";
import ContactSection from "@/sections/ContactSection";
import HeroSection from "@/sections/HeroSection";
import SkillsSection from "@/sections/SkillsSection";
import WorkSection from "@/sections/WorkSection";

export default function Home() {
  return (
    <div className="wrap">
      <Header />
      <main id="top">
        <HeroSection />
        <SectionReveal>
          <WorkSection />
        </SectionReveal>
        <SectionReveal>
          <SkillsSection />
        </SectionReveal>
        <SectionReveal>
          <AboutSection />
        </SectionReveal>
        <SectionReveal>
          <ContactSection />
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
}
