import { BloomLottie } from './ui/BloomLottie'

interface BackgroundDecorProps {
  liteMode?: boolean
}

export function BackgroundDecor({ liteMode = false }: BackgroundDecorProps) {
  if (liteMode) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="floating-orb left-[-7rem] top-[8rem] h-48 w-48 bg-blush/45 blur-3xl" />
        <div className="floating-orb right-[-6rem] top-[22rem] h-56 w-56 bg-sage/35 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/55 via-white/10 to-transparent" />
      </div>
    )
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="floating-orb left-[-7rem] top-[8rem] h-56 w-56 bg-blush/55 blur-3xl sm:h-72 sm:w-72" />
      <div className="floating-orb right-[-8rem] top-[22rem] h-64 w-64 bg-sage/40 blur-3xl sm:h-80 sm:w-80" />
      <div className="floating-orb bottom-[-5rem] left-[12%] h-48 w-48 bg-beige/70 blur-3xl sm:h-64 sm:w-64" />
      <div className="floating-orb right-[18%] top-[8%] hidden h-32 w-32 bg-white/50 blur-2xl md:block" />
      <div className="absolute inset-x-[8%] top-[12%] h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-70" />
      <div className="absolute left-[8%] top-[18%] h-72 w-[28rem] rotate-[-14deg] rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.16),rgba(255,255,255,0))] blur-3xl" />
      <div className="absolute right-[5%] top-[35%] h-72 w-[24rem] rotate-[18deg] rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.18))] blur-3xl" />
      <div className="absolute left-1/2 top-[-10rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-white/35 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22),transparent_40%)]" />
      <div className="absolute -right-8 top-24 hidden rounded-full bg-white/20 p-6 shadow-bloom backdrop-blur-xl md:block">
        <BloomLottie className="h-28 w-28 opacity-70" />
      </div>
      <div className="absolute -left-12 bottom-16 hidden rounded-full bg-white/20 p-5 shadow-bloom backdrop-blur-xl lg:block">
        <BloomLottie className="h-24 w-24 opacity-60" />
      </div>
      <div className="absolute right-[16%] top-[58%] hidden rounded-full border border-white/35 bg-white/15 p-4 backdrop-blur-xl lg:block">
        <BloomLottie className="h-16 w-16 opacity-45" />
      </div>
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_42%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.35),transparent_28%)]" />
      <div className="cinematic-noise absolute inset-0 opacity-[0.16]" />
    </div>
  )
}
