import { useMemo } from 'react'
import type { CSSProperties } from 'react'

function seededValue(seed: number) {
  const value = Math.sin(seed * 9999) * 10000
  return value - Math.floor(value)
}

interface SectionPetalsProps {
  seedOffset: number
  count?: number
  reducedMotion?: boolean
}

export function SectionPetals({ seedOffset, count = 6, reducedMotion = false }: SectionPetalsProps) {
  const petals = useMemo(
    () =>
      Array.from({ length: reducedMotion ? 0 : count }, (_, i) => {
        const s = seedOffset + i * 7
        return {
          id: i,
          left: seededValue(s + 1) * 100,
          top: seededValue(s + 2) * 100,
          size: 10 + seededValue(s + 3) * 14,
          duration: 10 + seededValue(s + 4) * 14,
          delay: seededValue(s + 5) * 8,
          drift: -60 + seededValue(s + 6) * 120,
          opacity: 0.15 + seededValue(s + 7) * 0.3,
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
