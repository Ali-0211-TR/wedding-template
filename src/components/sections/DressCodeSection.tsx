import { useRef } from 'react'
import { translations } from '../../data/content'
import { useSectionAnimations } from '../../hooks/useSectionAnimations'
import { SectionPetals } from '../SectionPetals'

type DressCodeCopy = typeof translations.ru.dresscode

interface DressCodeSectionProps {
  content: DressCodeCopy
  reducedMotion: boolean
}

const PALETTE = [
  { label: 'Пудра', bg: '#f5d8de' },
  { label: 'Шампань', bg: '#f5e8d0' },
  { label: 'Шалфей', bg: '#b7c8b5' },
  { label: 'Белый', bg: '#f8f4f0' },
]

export default function DressCodeSection({
  content,
  reducedMotion,
}: DressCodeSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  useSectionAnimations(sectionRef, reducedMotion, 0.09)

  return (
    <section ref={sectionRef} id="dresscode" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="section-shell relative overflow-hidden" data-section-shell>
        <SectionPetals seedOffset={350} count={5} reducedMotion={reducedMotion} />
        <div className="absolute -right-10 top-6 h-44 w-44 rounded-full bg-blush/40 blur-3xl" data-glow />
        <div className="absolute bottom-4 left-4 h-36 w-36 rounded-full bg-sage/30 blur-3xl" data-glow />

        <div className="relative z-10 mx-auto max-w-2xl space-y-8 py-2 text-center">
          <span className="eyebrow-pill" data-reveal>
            {content.eyebrow}
          </span>

          <div data-reveal>
            <h2 className="section-title">{content.code}</h2>
          </div>

          {/* Colour swatches */}
          <div className="flex justify-center gap-3" data-reveal>
            {PALETTE.map((swatch) => (
              <div
                key={swatch.label}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="h-12 w-12 rounded-full border border-white/70 shadow-soft sm:h-14 sm:w-14"
                  style={{ background: swatch.bg }}
                />
                <span className="text-[0.55rem] uppercase tracking-[0.3em] text-ink/45">
                  {swatch.label}
                </span>
              </div>
            ))}
          </div>

          <p className="section-copy text-center text-ink/65" data-reveal>
            {content.wishes}
          </p>
        </div>
      </div>
    </section>
  )
}
