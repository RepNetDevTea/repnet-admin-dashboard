import { BackgroundBeams } from "@/components/ui/background-beams";
import SignInForm from "@/components/SignInForm";

export default function SignIn() {
  return (
    <div className="min-h-[100vh] w-full rounded-md relative flex flex-col items-center justify-center antialiased">
      <div className="mx-auto p-4 z-10">
        <h1 className="relative z-10 text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 pb-3 text-center font-sans font-bold">
          Regístrate
        </h1>
        <SignInForm />
      </div>
      <BackgroundBeams />
    </div>
  );
}