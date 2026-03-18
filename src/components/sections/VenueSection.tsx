import { useRef } from 'react'
import { mapDirectionsUrl, translations } from '../../data/content'
import { useSectionAnimations } from '../../hooks/useSectionAnimations'
import { SectionPetals } from '../SectionPetals'

type VenueCopy = typeof translations.ru.venue

interface VenueSectionProps {
  content: VenueCopy
  reducedMotion: boolean
}

export default function VenueSection({
  content,
  reducedMotion,
}: VenueSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  useSectionAnimations(sectionRef, reducedMotion, 0.09)

  return (
    <section ref={sectionRef} id="venue" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="section-shell relative overflow-hidden" data-section-shell>
        <SectionPetals seedOffset={250} count={5} reducedMotion={reducedMotion} />
        <div className="absolute -left-10 top-8 h-44 w-44 rounded-full bg-white/40 blur-3xl" data-glow />
        <div className="absolute -right-8 bottom-6 h-36 w-36 rounded-full bg-blush/35 blur-3xl" data-glow />

        <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
          <div className="space-y-6">
            <span className="eyebrow-pill" data-reveal>
              {content.eyebrow}
            </span>

            <div data-reveal>
              <h2 className="section-title">{content.name}</h2>
              <p className="mt-2 text-base text-ink/65 sm:text-lg">{content.address}</p>
            </div>

            <p className="section-copy text-ink/60" data-reveal>
              {content.note}
            </p>

            <div data-reveal>
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ring-button inline-flex items-center gap-2"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
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
      </div>
    </section>
  )
}
