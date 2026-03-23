import { useRef } from 'react'
import { translations } from '../../data/content'
import { useSectionAnimations } from '../../hooks/useSectionAnimations'
import { SectionPetals } from '../SectionPetals'

type InvitationCopy = typeof translations.ru.invitation

interface InvitationSectionProps {
  content: InvitationCopy
  reducedMotion: boolean
}

export default function InvitationSection({ content, reducedMotion }: InvitationSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  useSectionAnimations(sectionRef, reducedMotion, 0.1)

  return (
    <section ref={sectionRef} className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-4">
      <div className="section-shell relative overflow-hidden" data-section-shell>
        <SectionPetals seedOffset={150} count={4} reducedMotion={reducedMotion} />
        <div className="absolute -right-8 -top-4 h-36 w-36 rounded-full bg-white/35 blur-3xl" data-glow />
        <div className="absolute -left-6 bottom-2 h-24 w-24 rounded-full bg-sage/20 blur-3xl" data-glow />

        <div className="section-content-frame relative z-10 space-y-5 py-1 text-center">
          <span className="eyebrow-pill" data-reveal>{content.eyebrow}</span>

          <h2 className="section-title" data-reveal>{content.title}</h2>

          <div className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-rose/35 to-transparent" />

          <div className="space-y-4">
            {content.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                data-reveal
                className="section-copy text-center"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2.5 pt-1 text-rose/30" data-reveal>
            <span className="block h-px w-10 bg-rose/25" />
            <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="currentColor" aria-hidden="true">
              <path d="M8 1 L9.4 5.6 H14.4 L10.5 8.2 L11.9 12.8 L8 10.2 L4.1 12.8 L5.5 8.2 L1.6 5.6 H6.6 Z" />
            </svg>
            <span className="block h-px w-10 bg-rose/25" />
          </div>
        </div>
      </div>
    </section>
  )
}
