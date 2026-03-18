import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import { translations, weddingDateIso } from '../../data/content'
import { useCountdown } from '../../hooks/useCountdown'
import { useSectionAnimations } from '../../hooks/useSectionAnimations'
import { SectionPetals } from '../SectionPetals'

type CountdownCopy = typeof translations.ru.countdown

interface CountdownSectionProps {
  content: CountdownCopy
  reducedMotion: boolean
}

function CountdownCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-panel relative overflow-hidden px-5 py-6 text-center sm:px-6 sm:py-8">
      <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          className="block font-display text-5xl leading-none text-ink sm:text-6xl"
          initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -18, filter: 'blur(10px)' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
      <span className="mt-3 block text-xs uppercase tracking-[0.45em] text-ink/52">{label}</span>
    </div>
  )
}

export default function CountdownSection({
  content,
  reducedMotion,
}: CountdownSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const countdown = useCountdown(weddingDateIso)

  useSectionAnimations(sectionRef, reducedMotion)

  return (
    <section ref={sectionRef} id="countdown" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="section-shell relative overflow-hidden" data-section-shell>
        <SectionPetals seedOffset={400} count={5} reducedMotion={reducedMotion} />
        <div className="absolute -right-12 top-8 h-36 w-36 rounded-full bg-blush/40 blur-3xl" data-glow />
        <div className="absolute -left-8 bottom-6 h-28 w-28 rounded-full bg-sage/35 blur-3xl" data-glow />

        <div className="relative z-10 space-y-10 text-center">
          {/* Names */}
          <div data-reveal>
            <h2 className="font-display text-5xl text-ink sm:text-6xl lg:text-7xl">
              {content.groomName}
              <span className="mx-3 text-rose/55">&</span>
              {content.brideName}
            </h2>
            <p className="mt-4 text-sm uppercase tracking-[0.45em] text-ink/50 sm:text-base">
              {countdown.completed ? content.completedLabel : content.untilLabel}
            </p>
          </div>

          {/* Countdown cards */}
          {!countdown.completed && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4" data-reveal>
              <CountdownCard label={content.units.days} value={countdown.days} />
              <CountdownCard label={content.units.hours} value={countdown.hours} />
              <CountdownCard label={content.units.minutes} value={countdown.minutes} />
              <CountdownCard label={content.units.seconds} value={countdown.seconds} />
            </div>
          )}

          {/* Decorative footer line */}
          <div className="flex items-center justify-center gap-3 text-rose/35" data-reveal>
            <span className="block h-px w-16 bg-rose/30" />
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M10 3.5 C10 3.5 6 0.5 3.5 3.5 C1 6.5 4 9.5 10 14.5 C16 9.5 19 6.5 16.5 3.5 C14 0.5 10 3.5 10 3.5 Z" />
            </svg>
            <span className="block h-px w-16 bg-rose/30" />
          </div>
        </div>
      </div>
    </section>
  )
}
