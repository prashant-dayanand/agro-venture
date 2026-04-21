import ApplyPartner from "@/components/apply-section";
import HeroSection from "@/components/hero-section";
import IPOTimeline from "@/components/ipo-timeline";
import OwnershipSimulator from "@/components/ownership-simulator";
import PartnerEconomics from "@/components/partners-section";
import WhySections from "@/components/why-section";
import ProcessSection from "@/components/work-section";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
      <WhySections />
      <ProcessSection  />
      <PartnerEconomics />
      <IPOTimeline />
      <ApplyPartner />
    </div>
  );
}
