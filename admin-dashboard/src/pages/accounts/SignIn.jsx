import { BackgroundBeams } from '@/components/ui/background-beams'
import SignInForm from '@/components/SignInForm'

export default function SignIn() {
  return (
    <div className='min-h-[100vh] w-full flex flex-col items-center justify-center antialiased'>
      <div className='mx-auto z-10'>
        <h1 
          className='pb-3 bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600 text-transparent text-7xl text-center font-bold'
        >
          Regístrate
        </h1>
        <SignInForm />
      </div>
      <BackgroundBeams />
    </div>
  );
}