import { useRef } from 'react'
import { translations } from '../../data/content'
import { useSectionAnimations } from '../../hooks/useSectionAnimations'
import { SectionPetals } from '../SectionPetals'

type CalendarCopy = typeof translations.ru.calendar

interface CalendarSectionProps {
  content: CalendarCopy
  reducedMotion: boolean
}

// April 2026: April 1 = Wednesday (index 2 in Mon-first week), 30 days
const DAYS_IN_APRIL = 30
const APRIL_FIRST_OFFSET = 2 // Mon=0, Tue=1, Wed=2
const WEDDING_DAY = 3

export default function CalendarSection({
  content,
  reducedMotion,
}: CalendarSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  useSectionAnimations(sectionRef, reducedMotion, 0.08)

  const totalCells = APRIL_FIRST_OFFSET + DAYS_IN_APRIL
  const paddedCells = Math.ceil(totalCells / 7) * 7

  return (
    <section ref={sectionRef} id="calendar" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="section-shell relative overflow-hidden" data-section-shell>
        <SectionPetals seedOffset={200} count={4} reducedMotion={reducedMotion} />
        <div className="absolute -right-8 top-6 h-40 w-40 rounded-full bg-blush/35 blur-3xl" data-glow />
        <div className="absolute -left-6 bottom-8 h-32 w-32 rounded-full bg-sage/30 blur-3xl" data-glow />

        <div className="relative z-10 space-y-8">
          <div className="text-center">
            <span className="eyebrow-pill" data-reveal>
              {content.eyebrow}
            </span>
            <h2 className="section-title mt-4" data-reveal>
              {content.title}
            </h2>
          </div>

          <div className="mx-auto max-w-sm" data-reveal>
            <div className="glass-panel overflow-hidden px-5 py-6 sm:px-7 sm:py-8">
              <p className="mb-5 text-center font-display text-2xl text-ink sm:text-3xl">
                {content.monthName} 2026
              </p>

              {/* Weekday headers */}
              <div className="mb-2 grid grid-cols-7 gap-1 text-center">
                {content.weekdays.map((day) => (
                  <div
                    key={day}
                    className="py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-ink/40 sm:text-xs"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: paddedCells }, (_, i) => {
                  const day = i - APRIL_FIRST_OFFSET + 1
                  const isEmpty = i < APRIL_FIRST_OFFSET || day > DAYS_IN_APRIL
                  const isWedding = day === WEDDING_DAY

                  if (isEmpty) {
                    return <div key={i} className="aspect-square" />
                  }

                  return (
                    <div
                      key={i}
                      className={`relative flex aspect-square items-center justify-center rounded-full text-sm font-medium transition-all
                        ${isWedding
                          ? 'bg-rose text-white shadow-lg shadow-rose/30 ring-2 ring-rose/40 ring-offset-1'
                          : 'text-ink/70 hover:bg-white/60'
                        }`}
                    >
                      {day}
                      {isWedding && (
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[0.5rem] uppercase tracking-[0.25em] text-rose/70">
                          ♥
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
