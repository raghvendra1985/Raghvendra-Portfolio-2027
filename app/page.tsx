import HomeHero from "@/components/home/HomeHero";
import SelectedImpact from "@/components/home/SelectedImpact";
import LeadershipWork from "@/components/home/LeadershipWork";
import AiNativeWorld from "@/components/home/AiNativeWorld";
import IntelligentPrinciples from "@/components/home/IntelligentPrinciples";
import HowILead from "@/components/home/HowILead";
import LeadershipTestimonial from "@/components/home/LeadershipTestimonial";
import AboutPreview from "@/components/home/AboutPreview";
import HomeClose from "@/components/home/HomeClose";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <SelectedImpact />
      <LeadershipWork />
      <AiNativeWorld />
      <IntelligentPrinciples />
      <HowILead />
      <LeadershipTestimonial />
      <AboutPreview />
      <HomeClose />
    </>
  );
}
