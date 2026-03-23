import { useRef } from 'react'
import { mapDirectionsUrl, translations } from '../../data/content'
import { useSectionAnimations } from '../../hooks/useSectionAnimations'
import { SectionPetals } from '../SectionPetals'

type VenueCopy = typeof translations.ru.venue

interface VenueSectionProps {
  content: VenueCopy
  reducedMotion: boolean
}

export default function VenueSection({ content, reducedMotion }: VenueSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  useSectionAnimations(sectionRef, reducedMotion, 0.1)

  return (
    <section ref={sectionRef} className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-4">
      <div className="section-shell relative overflow-hidden" data-section-shell>
        <SectionPetals seedOffset={250} count={4} reducedMotion={reducedMotion} />
        <div className="absolute -left-8 top-4 h-36 w-36 rounded-full bg-white/35 blur-3xl" data-glow />
        <div className="absolute -right-6 bottom-4 h-28 w-28 rounded-full bg-blush/30 blur-3xl" data-glow />

        <div className="section-content-frame relative z-10 space-y-5 text-center">
          <span className="eyebrow-pill" data-reveal>{content.eyebrow}</span>

          <div data-reveal>
            <h2 className="section-title">{content.name}</h2>
            <p className="mt-1.5 text-sm text-ink/55 sm:text-base">{content.address}</p>
          </div>

          <p className="section-copy text-ink/55" data-reveal>{content.note}</p>

          <div data-reveal>
            <a
              href={mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ring-button inline-flex items-center gap-1.5"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 2a6 6 0 0 0-6 6c0 3.5 4.5 9.3 5.7 10.7a.4.4 0 0 0 .6 0C11.5 17.3 16 11.5 16 8a6 6 0 0 0-6-6zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                  clipRule="evenodd"
                />
              </svg>
              {content.openMap}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
