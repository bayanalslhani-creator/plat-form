import Navbar from "@/components/Navbar";
import LightLeak from "@/components/LightLeak";
import VideoHero from "@/components/VideoHero";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import PartnersSection from "@/components/PartnersSection";
import SiteFooter from "@/components/SiteFooter";
import { SiteContentProvider } from "@/hooks/useSiteContent";

export default function Home() {
  return (
    <main className="bg-obsidian">
      <LightLeak />
      <Navbar />
      <SiteContentProvider>
        <VideoHero />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <PartnersSection />
        <SiteFooter />
      </SiteContentProvider>
    </main>
  );
}