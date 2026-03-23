import { motion } from 'framer-motion'
import { useLayoutEffect, useRef } from 'react'
import { translations } from '../../data/content'
import { gsap } from '../../lib/gsap'

type HeroCopy = typeof translations.ru.hero

interface HeroSectionProps {
  content: HeroCopy
  reducedMotion: boolean
  onScrollNext: () => void
}

function RingsIcon() {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-12 w-28 sm:h-16 sm:w-36"
    >
      <circle cx="40" cy="30" r="20" stroke="currentColor" strokeWidth="2.5" className="text-rose/60" />
      <circle cx="80" cy="30" r="20" stroke="currentColor" strokeWidth="2.5" className="text-ink/35" />
      <path d="M62 30 A20 20 0 0 1 58.5 39" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-rose/60" />
    </svg>
  )
}

export default function HeroSection({ content, reducedMotion, onScrollNext }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const el = sectionRef.current
    if (!el) return

    if (reducedMotion) {
      gsap.set(el.querySelectorAll('[data-hero-item]'), { autoAlpha: 1, y: 0, filter: 'blur(0px)' })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '[data-hero-backdrop]',
        { autoAlpha: 0, scale: 1.03, filter: 'blur(8px)' },
        { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1.4 },
      ).from(
        '[data-hero-item]',
        { autoAlpha: 0, y: 32, filter: 'blur(12px)', stagger: 0.12, duration: 1 },
        0.3,
      )

      gsap.to('[data-scroll-pill]', {
        y: 8,
        duration: 1.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, el)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative mx-auto max-w-2xl px-4 pb-4 pt-16 sm:px-6 sm:pt-24"
    >
      <div
        className="glass-panel relative flex min-h-[85svh] flex-col items-center justify-center overflow-hidden px-5 py-12 text-center sm:min-h-[88svh] sm:px-8 sm:py-16"
        data-hero-backdrop
      >
        {/* Background effects */}
        <div className="cinematic-noise absolute inset-0 opacity-[0.1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.65),transparent_55%)]" />
        <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-blush/35 blur-3xl sm:h-64 sm:w-64" />
        <div className="absolute -bottom-8 -right-8 h-52 w-52 rounded-full bg-sage/25 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute inset-x-[8%] top-6 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        <div className="absolute inset-x-[8%] bottom-10 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
          <div data-hero-item>
            <RingsIcon />
          </div>

          <div data-hero-item className="w-full max-w-[85vw] sm:max-w-md">
            <h1 className="font-display text-ink text-center flex flex-col items-center gap-1.5 sm:gap-3">
              <span className="block text-[clamp(2rem,9vw,4rem)] leading-[1.1]">
                {content.groomName}
              </span>
              <span className="text-rose/55 text-lg sm:text-xl tracking-[0.3em]">&</span>
              <span className="block text-[clamp(2rem,9vw,4rem)] leading-[1.1]">
                {content.brideName}
              </span>
            </h1>
          </div>

          <div data-hero-item>
            <p className="font-display text-base italic tracking-widest text-ink/45 sm:text-lg">
              {content.weddingDay}
            </p>
          </div>

          <div data-hero-item>
            <div className="rounded-full border border-white/50 bg-white/35 px-4 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-ink/60 shadow-soft backdrop-blur-xl sm:px-5 sm:py-2.5 sm:text-xs">
              {content.date}
            </div>
          </div>

          <div data-hero-item className="flex items-center gap-2.5 text-rose/35">
            <span className="block h-px w-10 bg-rose/30 sm:w-14" />
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M10 2 L11.8 7.2 H17.6 L12.9 10.4 L14.7 15.6 L10 12.4 L5.3 15.6 L7.1 10.4 L2.4 7.2 H8.2 Z" />
            </svg>
            <span className="block h-px w-10 bg-rose/30 sm:w-14" />
          </div>
        </div>

        {/* Scroll button */}
        <motion.button
          type="button"
          onClick={onScrollNext}
          className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.6rem] uppercase tracking-[0.4em] text-ink/45 transition hover:text-ink/65 sm:bottom-6 sm:text-[0.65rem]"
          whileHover={reducedMotion ? undefined : { scale: 1.05 }}
          data-hero-item
          aria-label={content.scrollHint}
        >
          <span>{content.scrollHint}</span>
          <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/55 bg-white/25 px-1 pt-1 shadow-soft backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-ink/50" data-scroll-pill />
          </span>
        </motion.button>
      </div>
    </section>
  )
}
