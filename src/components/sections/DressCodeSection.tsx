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

export default function DressCodeSection({ content, reducedMotion }: DressCodeSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  useSectionAnimations(sectionRef, reducedMotion, 0.1)

  return (
    <section ref={sectionRef} className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-4">
      <div className="section-shell relative overflow-hidden" data-section-shell>
        <SectionPetals seedOffset={350} count={4} reducedMotion={reducedMotion} />
        <div className="absolute -right-8 top-4 h-36 w-36 rounded-full bg-blush/35 blur-3xl" data-glow />
        <div className="absolute -left-4 bottom-4 h-28 w-28 rounded-full bg-sage/25 blur-3xl" data-glow />

        <div className="relative z-10 mx-auto max-w-md space-y-5 text-center">
          <span className="eyebrow-pill" data-reveal>{content.eyebrow}</span>

          <h2 className="section-title" data-reveal>{content.code}</h2>

          {/* Colour swatches */}
          <div className="flex justify-center gap-3" data-reveal>
            {PALETTE.map((swatch) => (
              <div key={swatch.label} className="flex flex-col items-center gap-1.5">
                <div
                  className="h-10 w-10 rounded-full border border-white/60 shadow-soft sm:h-12 sm:w-12"
                  style={{ background: swatch.bg }}
                />
                <span className="text-[0.5rem] uppercase tracking-[0.25em] text-ink/40 sm:text-[0.55rem]">
                  {swatch.label}
                </span>
              </div>
            ))}
          </div>

          <p className="section-copy text-center text-ink/55" data-reveal>{content.wishes}</p>
        </div>
      </div>
    </section>
  )
}
