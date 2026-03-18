import { useMemo } from 'react'
import type { CSSProperties } from 'react'

// Deterministic seeded pseudo-random (same approach as PetalField)
function seededValue(seed: number) {
  const value = Math.sin(seed * 9999) * 10000
  return value - Math.floor(value)
}

interface SectionPetalsProps {
  /** Unique numeric offset so each section has different petal positions (avoid clashes with PetalField seeds 1-61) */
  seedOffset: number
  count?: number
  reducedMotion?: boolean
}

export function SectionPetals({ seedOffset, count = 6, reducedMotion = false }: SectionPetalsProps) {
  const petals = useMemo(
    () =>
      Array.from({ length: reducedMotion ? 0 : count }, (_, i) => {
        const s = seedOffset + i * 7
        const left = seededValue(s + 1)
        const top = seededValue(s + 2)
        const size = seededValue(s + 3)
        const duration = seededValue(s + 4)
        const delay = seededValue(s + 5)
        const drift = seededValue(s + 6)
        const opacity = seededValue(s + 7)

        return {
          id: i,
          left: left * 100,
          top: top * 100,
          size: 10 + size * 14,
          duration: 10 + duration * 14,
          delay: delay * 8,
          drift: -60 + drift * 120,
          opacity: 0.15 + opacity * 0.3,
        }
      }),
    [reducedMotion, count, seedOffset],
  )

  if (petals.length === 0) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => {
        const style = {
          '--petal-left': `${petal.left}%`,
          '--petal-size': `${petal.size}px`,
          '--petal-duration': `${petal.duration}s`,
          '--petal-delay': `${petal.delay}s`,
          '--petal-drift': `${petal.drift}px`,
          '--petal-opacity': petal.opacity,
          top: `${petal.top}%`,
          position: 'absolute',
        } as CSSProperties

        return <span key={petal.id} className="petal" style={style} />
      })}
    </div>
  )
}
