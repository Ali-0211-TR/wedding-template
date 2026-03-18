import { useMemo } from 'react'
import type { CSSProperties } from 'react'

interface PetalFieldProps {
  reducedMotion: boolean
}

function seededValue(seed: number) {
  const value = Math.sin(seed * 9999) * 10000
  return value - Math.floor(value)
}

export function PetalField({ reducedMotion }: PetalFieldProps) {
  const petals = useMemo(
    () =>
      Array.from({ length: reducedMotion ? 5 : 12 }, (_, index) => {
        const left = seededValue(index + 1)
        const size = seededValue(index + 11)
        const duration = seededValue(index + 21)
        const delay = seededValue(index + 31)
        const drift = seededValue(index + 41)
        const opacity = seededValue(index + 51)

        return {
          id: index,
          left: left * 100,
          size: 12 + size * 18,
          duration: 14 + duration * 16,
          delay: delay * 10,
          drift: -80 + drift * 160,
          opacity: 0.2 + opacity * 0.35,
        }
      }),
    [reducedMotion],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => {
        const style = {
          '--petal-left': `${petal.left}%`,
          '--petal-size': `${petal.size}px`,
          '--petal-duration': `${petal.duration}s`,
          '--petal-delay': `${petal.delay}s`,
          '--petal-drift': `${petal.drift}px`,
          '--petal-opacity': petal.opacity,
        } as CSSProperties

        return <span key={petal.id} className="petal" style={style} />
      })}
    </div>
  )
}
