import { useRef } from 'react'
import { translations } from '../../data/content'
import { useSectionAnimations } from '../../hooks/useSectionAnimations'
import { SectionPetals } from '../SectionPetals'

type TimelineCopy = typeof translations.ru.timeline

interface TimelineSectionProps {
  content: TimelineCopy
  reducedMotion: boolean
}

export default function TimelineSection({
  content,
  reducedMotion,
}: TimelineSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  useSectionAnimations(sectionRef, reducedMotion, 0.09)

  return (
    <section ref={sectionRef} id="timeline" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="section-shell relative overflow-hidden" data-section-shell>
        <SectionPetals seedOffset={300} count={4} reducedMotion={reducedMotion} />
        <div className="absolute right-6 top-6 h-40 w-40 rounded-full bg-sage/30 blur-3xl" data-glow />
        <div className="absolute bottom-4 left-6 h-36 w-36 rounded-full bg-blush/30 blur-3xl" data-glow />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="space-y-5">
            <span className="eyebrow-pill" data-reveal>
              {content.eyebrow}
            </span>
            <h2 className="section-title" data-reveal>
              {content.title}
            </h2>
          </div>

          <div className="relative space-y-0">
            {/* Vertical line */}
            <div className="absolute left-[2.35rem] top-4 bottom-4 w-px bg-gradient-to-b from-rose/30 via-rose/20 to-transparent sm:left-[2.6rem]" />

            {content.items.map((item, index) => (
              <div
                key={item.time}
                className="relative flex items-start gap-5 pb-8 last:pb-0 sm:gap-7"
                data-reveal
              >
                {/* Time bubble */}
                <div className="relative z-10 flex h-[4.7rem] w-[4.7rem] flex-shrink-0 flex-col items-center justify-center rounded-full border border-white/60 bg-white/55 shadow-soft backdrop-blur-xl">
                  <span className="font-display text-base leading-none text-ink sm:text-lg">
                    {item.time}
                  </span>
                </div>

                {/* Content */}
                <div className="flex min-h-[4.7rem] flex-col justify-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-ink/45">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-1 text-lg font-medium text-ink sm:text-xl">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
