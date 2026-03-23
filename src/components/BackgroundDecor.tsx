import { SectionPetals } from './SectionPetals'

export function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Orbs */}
      <div className="floating-orb blush -left-20 top-32 h-48 w-48 sm:h-72 sm:w-72" />
      <div className="floating-orb sage -right-24 top-[40%] h-56 w-56 sm:h-80 sm:w-80" style={{ animationDelay: '-4s' }} />
      <div className="floating-orb beige -left-8 bottom-20 h-40 w-40 sm:h-64 sm:w-64" style={{ animationDelay: '-8s' }} />

      {/* Petals */}
      <SectionPetals seedOffset={100} count={6} />

      {/* Top fade & noise */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/50 to-transparent" />
      <div className="cinematic-noise absolute inset-0 opacity-[0.14]" />
    </div>
  )
}
