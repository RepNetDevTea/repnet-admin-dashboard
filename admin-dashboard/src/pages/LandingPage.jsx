import { AuroraBackground } from "@/components/ui/aurora-background";
import LandingPageNavigationMenu from "@/components/LandingPageNavigationMenu";

export default function LandingPage() {
  return (
      <AuroraBackground className="relative">
        <div className="absolute top-5 flex flex-col flex-none items-center gap-y-15">
          <div className="text-3xl md:text-7xl font-bold text-white text-center">
            RepNet Dashboard
          </div>
          <LandingPageNavigationMenu />
        </div>
      </AuroraBackground>
  );
}