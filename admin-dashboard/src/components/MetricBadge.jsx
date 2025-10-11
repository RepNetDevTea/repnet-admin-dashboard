import { cn } from "@/lib/utils";

export default function MetricBadge({ className, metricName }) {
  return (
    <div 
      className={cn('bg-slate-800 group relative rounded-full p-px leading-6 inline-block', className)}
    >
      <span className='absolute inset-0 rounded-full overflow-hidden'>
        <span 
          className='absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,#393BB2_0%,rgba(56,189,248,0)_75%)]' 
        />
      </span>
      <div className='relative rounded-full py-0.5 px-4 flex items-center space-x-2 bg-zinc-950 ring-2 ring-white/10'>
        <span>{metricName}</span>
      </div>
      <span 
        className='h-px w-[calc(100%-2.25rem)] absolute -bottom-0 left-[1.125rem] bg-gradient-to-r from-violet-400/0 via-violet-400/90 to-violet-400/0'
      />
    </div>
  );
}