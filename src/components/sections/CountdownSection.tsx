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
    <div className="glass-panel relative overflow-hidden px-2 py-4 text-center sm:px-4 sm:py-5">
      <div className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          className="block font-display text-3xl leading-none text-ink sm:text-4xl"
          initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -14, filter: 'blur(8px)' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
      <span className="mt-2 block text-[0.55rem] uppercase tracking-[0.35em] text-ink/45 sm:text-[0.6rem]">
        {label}
      </span>
    </div>
  )
}

export default function CountdownSection({ content, reducedMotion }: CountdownSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const countdown = useCountdown(weddingDateIso)
  useSectionAnimations(sectionRef, reducedMotion)

  return (
    <section ref={sectionRef} className="mx-auto max-w-2xl px-4 py-3 pb-8 sm:px-6 sm:py-4 sm:pb-12">
      <div className="section-shell relative overflow-hidden" data-section-shell>
        <SectionPetals seedOffset={400} count={4} reducedMotion={reducedMotion} />
        <div className="absolute -right-8 top-4 h-32 w-32 rounded-full bg-blush/35 blur-3xl" data-glow />
        <div className="absolute -left-6 bottom-4 h-24 w-24 rounded-full bg-sage/30 blur-3xl" data-glow />

        <div className="section-content-frame relative z-10 space-y-6 text-center">
          {/* Names */}
          <div data-reveal>
            <h2 className="font-display text-ink leading-tight" style={{ fontSize: 'clamp(1.5rem, 8vw, 3.5rem)' }}>
              <span className="block">{content.groomName}</span>
              <span className="mx-1.5 inline-block align-middle text-rose/50 sm:mx-2">&</span>
              <span className="block sm:inline">{content.brideName}</span>
            </h2>
            <p className="mt-3 text-[0.6rem] uppercase tracking-[0.2em] text-ink/45 sm:text-xs sm:tracking-[0.4em]">
              {countdown.completed ? content.completedLabel : content.untilLabel}
            </p>
          </div>

          {/* Countdown cards */}
          {!countdown.completed && (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3" data-reveal>
              <CountdownCard label={content.units.days} value={countdown.days} />
              <CountdownCard label={content.units.hours} value={countdown.hours} />
              <CountdownCard label={content.units.minutes} value={countdown.minutes} />
              <CountdownCard label={content.units.seconds} value={countdown.seconds} />
            </div>
          )}

          {/* Decorative footer */}
          <div className="flex items-center justify-center gap-2 text-rose/30" data-reveal>
            <span className="block h-px w-8 bg-rose/25 sm:w-14" />
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M10 3.5 C10 3.5 6 0.5 3.5 3.5 C1 6.5 4 9.5 10 14.5 C16 9.5 19 6.5 16.5 3.5 C14 0.5 10 3.5 10 3.5 Z" />
            </svg>
            <span className="block h-px w-8 bg-rose/25 sm:w-14" />
          </div>
        </div>
      </div>
    </section>
  )
}
