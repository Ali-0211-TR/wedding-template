import { useRef } from 'react'
import { translations } from '../../data/content'
import { useSectionAnimations } from '../../hooks/useSectionAnimations'
import { SectionPetals } from '../SectionPetals'

type TimelineCopy = typeof translations.ru.timeline

interface TimelineSectionProps {
  content: TimelineCopy
  reducedMotion: boolean
}

export default function TimelineSection({ content, reducedMotion }: TimelineSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  useSectionAnimations(sectionRef, reducedMotion, 0.1)

  return (
    <section ref={sectionRef} className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-4">
      <div className="section-shell relative overflow-hidden" data-section-shell>
        <SectionPetals seedOffset={300} count={3} reducedMotion={reducedMotion} />
        <div className="absolute -right-4 top-4 h-32 w-32 rounded-full bg-sage/25 blur-3xl" data-glow />
        <div className="absolute -left-4 bottom-4 h-28 w-28 rounded-full bg-blush/25 blur-3xl" data-glow />

        <div className="relative z-10 space-y-5">
          {/* Header */}
          <div className="text-center sm:text-left">
            <span className="eyebrow-pill" data-reveal>{content.eyebrow}</span>
            <h2 className="section-title mt-3" data-reveal>{content.title}</h2>
          </div>

          {/* Timeline items */}
          <div className="relative space-y-2.5">
            {/* Vertical line */}
            <div className="absolute bottom-4 left-[1.625rem] top-4 w-px bg-gradient-to-b from-rose/25 via-rose/15 to-transparent sm:left-[2.1rem]" />

            {content.items.map((item, index) => (
              <div
                key={item.time}
                className="relative flex items-center gap-3 rounded-2xl border border-white/30 bg-white/20 px-2.5 py-2.5 sm:gap-4 sm:px-3.5 sm:py-3"
                data-reveal
              >
                {/* Time bubble */}
                <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/55 bg-white/50 shadow-soft backdrop-blur-xl sm:h-[4.2rem] sm:w-[4.2rem]">
                  <span className="font-display text-xs leading-none text-ink sm:text-sm">
                    {item.time}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-[0.55rem] uppercase tracking-[0.2em] text-ink/40 sm:text-[0.6rem]">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-ink sm:text-base">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
