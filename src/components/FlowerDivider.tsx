import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

interface FlowerDividerProps {
  side?: 'left' | 'right'
  reducedMotion?: boolean
}

/**
 * Decorative flower badge between sections.
 * Rotates on scroll via GSAP ScrollTrigger.
 * Properly visible on mobile (48×48) and larger screens (64×64).
 */
export function FlowerDivider({ side = 'right', reducedMotion = false }: FlowerDividerProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Scroll-linked rotation
  useEffect(() => {
    if (reducedMotion || !ref.current) return

    const el = ref.current.querySelector<SVGSVGElement>('.flower-svg')
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        rotation: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, ref.current)

    return () => ctx.revert()
  }, [reducedMotion])

  const sideClass = side === 'left'
    ? 'left-3 sm:left-5'
    : 'right-3 sm:right-5'

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute -top-7 z-20 sm:-top-9 ${sideClass}`}
    >
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/45 bg-white/45 shadow-soft backdrop-blur-xl sm:h-20 sm:w-20">
        <svg
          viewBox="0 0 100 100"
          className="flower-svg h-12 w-12 sm:h-[3.75rem] sm:w-[3.75rem]"
        >
          {/* Petals */}
          <g fill="rgba(217, 152, 168, 0.85)">
            <ellipse cx="50" cy="18" rx="11" ry="19" />
            <ellipse cx="79" cy="39" rx="11" ry="19" transform="rotate(72 79 39)" />
            <ellipse cx="68" cy="73" rx="11" ry="19" transform="rotate(144 68 73)" />
            <ellipse cx="32" cy="73" rx="11" ry="19" transform="rotate(216 32 73)" />
            <ellipse cx="21" cy="39" rx="11" ry="19" transform="rotate(288 21 39)" />
          </g>
          {/* Inner petals (lighter) */}
          <g fill="rgba(240, 200, 210, 0.6)">
            <ellipse cx="50" cy="28" rx="7" ry="12" />
            <ellipse cx="71" cy="42" rx="7" ry="12" transform="rotate(72 71 42)" />
            <ellipse cx="63" cy="66" rx="7" ry="12" transform="rotate(144 63 66)" />
            <ellipse cx="37" cy="66" rx="7" ry="12" transform="rotate(216 37 66)" />
            <ellipse cx="29" cy="42" rx="7" ry="12" transform="rotate(288 29 42)" />
          </g>
          {/* Center */}
          <circle cx="50" cy="50" r="11" fill="rgba(245, 238, 230, 0.95)" />
          <circle cx="50" cy="50" r="6" fill="rgba(183, 200, 181, 0.9)" />
          <circle cx="50" cy="50" r="2.5" fill="rgba(217, 152, 168, 0.6)" />
        </svg>
      </div>
    </div>
  )
}
