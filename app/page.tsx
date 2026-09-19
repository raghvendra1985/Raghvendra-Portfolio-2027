import HomeHero from "@/components/home/HomeHero";
import SelectedImpact from "@/components/home/SelectedImpact";
import LeadershipWork from "@/components/home/LeadershipWork";
import CapabilityModel from "@/components/home/CapabilityModel";
import BuilderSection from "@/components/home/BuilderSection";
import BuilderProof from "@/components/home/BuilderProof";
import TeachPreview from "@/components/home/TeachPreview";
import LeadershipTestimonial from "@/components/home/LeadershipTestimonial";
import AboutPreview from "@/components/home/AboutPreview";
import HomeClose from "@/components/home/HomeClose";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <SelectedImpact />
      <LeadershipWork />
      <CapabilityModel />
      <BuilderSection />
      <BuilderProof />
      <TeachPreview />
      <LeadershipTestimonial />
      <AboutPreview />
      <HomeClose />
    </>
  );
}
