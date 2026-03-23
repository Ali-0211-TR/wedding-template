import { useMemo } from 'react'
import type { CSSProperties } from 'react'

interface PetalFieldProps {
  reducedMotion: boolean
}

function seededValue(seed: number) {
  const value = Math.sin(seed * 9999) * 10000
  return value - Math.floor(value)
}

/** Variety of petal colors for spring vibes */
const PETAL_GRADIENTS = [
  'radial-gradient(ellipse at 30% 25%, rgba(255,220,230,0.95), rgba(255,170,190,0.85) 50%, rgba(255,120,150,0.6))',
  'radial-gradient(ellipse at 30% 25%, rgba(255,235,240,0.9), rgba(255,200,210,0.8) 50%, rgba(255,160,175,0.5))',
  'radial-gradient(ellipse at 30% 25%, rgba(255,240,245,0.9), rgba(230,190,200,0.7) 50%, rgba(210,160,170,0.5))',
  'radial-gradient(ellipse at 30% 25%, rgba(240,230,240,0.9), rgba(210,180,210,0.7) 50%, rgba(190,150,190,0.5))',
  'radial-gradient(ellipse at 30% 25%, rgba(220,240,225,0.9), rgba(190,220,195,0.7) 50%, rgba(170,200,175,0.5))',
]

export function PetalField({ reducedMotion }: PetalFieldProps) {
  // Show petals even on mobile — just fewer
  const count = reducedMotion ? 4 : 14

  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const left = seededValue(index + 1)
        const size = seededValue(index + 11)
        const duration = seededValue(index + 21)
        const delay = seededValue(index + 31)
        const drift = seededValue(index + 41)
        const opacity = seededValue(index + 51)
        const gradientIdx = Math.floor(seededValue(index + 61) * PETAL_GRADIENTS.length)

        return {
          id: index,
          left: left * 100,
          size: 10 + size * 16,
          duration: 12 + duration * 18,
          delay: delay * 12,
          drift: -80 + drift * 160,
          opacity: 0.22 + opacity * 0.35,
          gradient: PETAL_GRADIENTS[gradientIdx],
        }
      }),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {petals.map((petal) => {
        const style = {
          '--petal-left': `${petal.left}%`,
          '--petal-size': `${petal.size}px`,
          '--petal-duration': `${petal.duration}s`,
          '--petal-delay': `${petal.delay}s`,
          '--petal-drift': `${petal.drift}px`,
          '--petal-opacity': petal.opacity,
          '--petal-bg': petal.gradient,
        } as CSSProperties

        return <span key={petal.id} className="petal" style={style} />
      })}
    </div>
  )
}
