import { SectionPetals } from './SectionPetals'

interface BackgroundDecorProps {
  seedOffset?: number
}

export function BackgroundDecor({ seedOffset = 100 }: BackgroundDecorProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Орбы */}
      <div className="floating-orb blush left-[-7rem] top-[8rem] h-56 w-56 sm:h-72 sm:w-72" />
      <div className="floating-orb sage right-[-8rem] top-[22rem] h-64 w-64 sm:h-80 sm:w-80" />
      <div className="floating-orb beige bottom-[-5rem] left-[12%] h-48 w-48 sm:h-64 sm:w-64" />

      {/* Лепестки */}
      <SectionPetals seedOffset={seedOffset} count={8} />

      {/* Лёгкие декоративные градиенты */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 via-white/10 to-transparent" />
      <div className="cinematic-noise absolute inset-0 opacity-[0.16]" />
    </div>
  )
}