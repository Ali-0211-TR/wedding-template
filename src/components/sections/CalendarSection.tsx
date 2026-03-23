import { useRef } from 'react'
import { translations } from '../../data/content'
import { useSectionAnimations } from '../../hooks/useSectionAnimations'
import { SectionPetals } from '../SectionPetals'

type CalendarCopy = typeof translations.ru.calendar

interface CalendarSectionProps {
  content: CalendarCopy
  reducedMotion: boolean
}

const DAYS_IN_APRIL = 30
const APRIL_FIRST_OFFSET = 2 // Wed (Mon=0)
const WEDDING_DAY = 3

export default function CalendarSection({ content, reducedMotion }: CalendarSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  useSectionAnimations(sectionRef, reducedMotion, 0.08)

  const totalCells = APRIL_FIRST_OFFSET + DAYS_IN_APRIL
  const paddedCells = Math.ceil(totalCells / 7) * 7

  return (
    <section ref={sectionRef} className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-4">
      <div className="section-shell relative overflow-hidden" data-section-shell>
        <SectionPetals seedOffset={200} count={3} reducedMotion={reducedMotion} />
        <div className="absolute -right-6 top-4 h-32 w-32 rounded-full bg-blush/30 blur-3xl" data-glow />
        <div className="absolute -left-4 bottom-4 h-28 w-28 rounded-full bg-sage/25 blur-3xl" data-glow />

        <div className="section-content-frame relative z-10 space-y-5">
          <div className="text-center">
            <span className="eyebrow-pill" data-reveal>{content.eyebrow}</span>
            <h2 className="section-title mt-3" data-reveal>{content.title}</h2>
          </div>

          <div data-reveal>
            <div className="glass-panel overflow-hidden px-3 py-4 sm:px-5 sm:py-5">
              <p className="mb-4 text-center font-display text-xl text-ink sm:text-2xl">
                {content.monthName} 2026
              </p>

              {/* Weekday headers */}
              <div className="mb-1.5 grid grid-cols-7 gap-1 text-center">
                {content.weekdays.map((day) => (
                  <div
                    key={day}
                    className="py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ink/35 sm:text-[0.65rem]"
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

                  if (isEmpty) return <div key={i} className="aspect-square" />

                  return (
                    <div
                      key={i}
                      className={`relative flex aspect-square items-center justify-center rounded-full text-xs font-medium transition-all sm:text-sm ${
                        isWedding
                          ? 'bg-rose text-white shadow-md shadow-rose/25 ring-2 ring-rose/35 ring-offset-1'
                          : 'text-ink/65 hover:bg-white/50'
                      }`}
                    >
                      {day}
                      {isWedding && (
                        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[0.45rem] text-rose/60">♥</span>
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
