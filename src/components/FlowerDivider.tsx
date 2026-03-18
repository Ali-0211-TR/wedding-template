import { motion } from 'framer-motion'

interface FlowerDividerProps {
  side?: 'left' | 'right'
  reducedMotion?: boolean
}

export function FlowerDivider({ side = 'right', reducedMotion = false }: FlowerDividerProps) {
  const sideClass = side === 'left' ? 'left-2 sm:left-4' : 'right-2 sm:right-4'

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -top-5 sm:-top-7 z-20 ${sideClass}`}
    >
      <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full border border-white/45 bg-white/40 shadow-soft backdrop-blur-xl">
        <motion.svg
          viewBox="0 0 100 100"
          className={`h-full w-full p-2 ${reducedMotion ? '' : 'flower-spin'}`}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.85 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <g fill="rgba(217, 152, 168, 0.9)">
            <ellipse cx="50" cy="18" rx="10" ry="18" />
            <ellipse cx="79" cy="39" rx="10" ry="18" transform="rotate(72 79 39)" />
            <ellipse cx="68" cy="73" rx="10" ry="18" transform="rotate(144 68 73)" />
            <ellipse cx="32" cy="73" rx="10" ry="18" transform="rotate(216 32 73)" />
            <ellipse cx="21" cy="39" rx="10" ry="18" transform="rotate(288 21 39)" />
          </g>
          <circle cx="50" cy="50" r="10" fill="rgba(245, 238, 230, 0.95)" />
          <circle cx="50" cy="50" r="5" fill="rgba(183, 200, 181, 0.92)" />
        </motion.svg>
      </div>
    </div>
  )
}
