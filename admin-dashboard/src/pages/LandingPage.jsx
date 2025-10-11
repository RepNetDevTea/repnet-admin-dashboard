import { AuroraBackground } from '@/components/ui/aurora-background'
import LandingPageNavigationMenu from '@/components/LandingPageNavigationMenu'

export default function LandingPage() {
  return (
      <AuroraBackground className='relative'>
        <div className='flex flex-col flex-none items-center gap-y-10 absolute top-5'>
          <div 
            className='bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600 text-7xl text-transparent text-center pb-10 font-bold'
          >
            RepNet Dashboard
          </div>
          <LandingPageNavigationMenu />
        </div>
      </AuroraBackground>
  );
}