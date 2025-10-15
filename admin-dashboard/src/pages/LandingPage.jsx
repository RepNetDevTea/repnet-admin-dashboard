import LandingPageNavigationMenu from '@/components/LandingPageNavigationMenu'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';

export default function LandingPage() {
  return (
    <>
      <BackgroundRippleEffect />
      <div className='w-full flex flex-col flex-none items-center gap-y-10 absolute top-5'>
        <div 
          className='z-10 bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600 text-7xl text-transparent text-center pb-10 font-bold'
        >
          RepNet Dashboard
        </div>
        <LandingPageNavigationMenu />
        <img
          className='md:w-[15vw] mt-15  z-10'
          src={'./src/assets/rs-logo.png'} 
        />
      </div>
    </>
  );
}