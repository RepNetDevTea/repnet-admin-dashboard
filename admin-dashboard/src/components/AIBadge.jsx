import { BrainCircuit } from 'lucide-react'

export default function AIBadge() {
  return(
    <div className='relative inline-flex h-12 overflow-hidden rounded-full p-[1px]'> 
      <span 
        className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]'
      /> 
      <span
        className='inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl'
      > 
        <BrainCircuit color='#9177c7'/> <span className='ml-2'>Asistido por IA</span>
      </span> 
    </div>
  );
}