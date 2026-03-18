import { useRef } from 'react'
import { translations } from '../../data/content'
import { useSectionAnimations } from '../../hooks/useSectionAnimations'
import { SectionPetals } from '../SectionPetals'

type InvitationCopy = typeof translations.ru.invitation

interface InvitationSectionProps {
  content: InvitationCopy
  reducedMotion: boolean
}

export default function InvitationSection({
  content,
  reducedMotion,
}: InvitationSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  useSectionAnimations(sectionRef, reducedMotion, 0.09)

  return (
    <section ref={sectionRef} id="invitation" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="section-shell relative overflow-hidden" data-section-shell>
        <SectionPetals seedOffset={150} count={6} reducedMotion={reducedMotion} />
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-white/40 blur-3xl" data-parallax="0.18" data-parallax-x="7" data-glow />
        <div className="absolute bottom-4 left-8 h-28 w-28 rounded-full bg-sage/25 blur-3xl" data-parallax="0.1" data-parallax-x="-4" data-glow />

        <div className="relative z-10 mx-auto max-w-2xl space-y-8 py-4 text-center">
          <span className="eyebrow-pill" data-reveal>
            {content.eyebrow}
          </span>

          <h2 className="section-title" data-reveal>
            {content.title}
          </h2>

          <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-rose/40 to-transparent" />

          <div className="space-y-5 text-base leading-8 text-ink/70 sm:text-lg">
            {content.paragraphs.map((paragraph, i) => (
              <p key={i} data-reveal className="text-center">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 pt-2 text-rose/35" data-reveal>
            <span className="block h-px w-12 bg-rose/30" />
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor" aria-hidden="true">
              <path d="M8 1 L9.4 5.6 H14.4 L10.5 8.2 L11.9 12.8 L8 10.2 L4.1 12.8 L5.5 8.2 L1.6 5.6 H6.6 Z" />
            </svg>
            <span className="block h-px w-12 bg-rose/30" />
          </div>
        </div>
      </div>
    </section>
  )
}
