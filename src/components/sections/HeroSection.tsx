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
      className="h-16 w-32 sm:h-20 sm:w-40"
    >
      <circle cx="40" cy="30" r="22" stroke="currentColor" strokeWidth="3.5" className="text-rose/70" />
      <circle cx="80" cy="30" r="22" stroke="currentColor" strokeWidth="3.5" className="text-ink/40" />
      <path
        d="M62 30 A22 22 0 0 1 58 41.5"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="text-rose/70"
      />
    </svg>
  )
}

export default function HeroSection({
  content,
  reducedMotion,
  onScrollNext,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const element = sectionRef.current
    if (!element) return

    if (reducedMotion) {
      gsap.set(element.querySelectorAll('[data-hero-item]'), {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
      })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '[data-hero-backdrop]',
        { autoAlpha: 0, scale: 1.04, filter: 'blur(10px)' },
        { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1.5 },
      ).from(
        '[data-hero-item]',
        {
          autoAlpha: 0,
          y: 40,
          filter: 'blur(14px)',
          stagger: 0.15,
          duration: 1.1,
        },
        0.3,
      )

      gsap.to('[data-scroll-pill]', {
        y: 10,
        duration: 1.3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, element)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative mx-auto max-w-6xl px-4 pb-8 pt-20 sm:px-6 sm:pt-28 lg:px-8"
    >
      <div
        className="glass-panel relative flex min-h-[88svh] flex-col items-center justify-center overflow-hidden px-6 py-14 text-center sm:min-h-[90svh] sm:px-10 sm:py-20"
        data-hero-backdrop
      >
        <div className="cinematic-noise absolute inset-0 opacity-[0.12]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.7),transparent_55%)]" />
        <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-blush/40 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-sage/30 blur-3xl" />
        <div className="absolute inset-x-[10%] top-12 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        <div className="absolute inset-x-[10%] bottom-14 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-10">
          <div data-hero-item>
            <RingsIcon />
          </div>

          <div data-hero-item>
            <h1 className="font-display text-6xl leading-none text-ink sm:text-8xl md:text-9xl lg:text-[8.5rem]">
              {content.groomName}
              <span className="mx-3 font-normal text-rose/60 sm:mx-5">&</span>
              {content.brideName}
            </h1>
          </div>

          <div data-hero-item>
            <p className="font-display text-xl italic tracking-widest text-ink/50 sm:text-2xl">
              {content.weddingDay}
            </p>
          </div>

          <div data-hero-item>
            <div className="rounded-full border border-white/55 bg-white/40 px-6 py-3 text-sm uppercase tracking-[0.36em] text-ink/65 shadow-soft backdrop-blur-xl sm:text-base">
              {content.date}
            </div>
          </div>

          <div data-hero-item className="flex items-center gap-3 text-rose/40">
            <span className="block h-px w-16 bg-rose/35" />
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M10 2 L11.8 7.2 H17.6 L12.9 10.4 L14.7 15.6 L10 12.4 L5.3 15.6 L7.1 10.4 L2.4 7.2 H8.2 Z" />
            </svg>
            <span className="block h-px w-16 bg-rose/35" />
          </div>
        </div>

        <motion.button
          type="button"
          onClick={onScrollNext}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-xs uppercase tracking-[0.45em] text-ink/50 transition hover:text-ink/75"
          whileHover={reducedMotion ? undefined : { scale: 1.05 }}
          data-hero-item
          aria-label={content.scrollHint}
        >
          <span>{content.scrollHint}</span>
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/60 bg-white/30 px-1 pt-1 shadow-soft backdrop-blur-xl">
            <span className="h-2.5 w-2.5 rounded-full bg-ink/55" data-scroll-pill />
          </span>
        </motion.button>
      </div>
    </section>
  )
}
