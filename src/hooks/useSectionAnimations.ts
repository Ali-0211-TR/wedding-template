import { useLayoutEffect } from 'react'
import { gsap } from '../lib/gsap'
import type { RefObject } from 'react'

/**
 * Animates section shells, reveal elements, depth floaters, glows, parallax, etc.
 * Works on mobile with lighter animations.
 */
export function useSectionAnimations(
  ref: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
  stagger = 0.1,
) {
  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    if (reducedMotion) {
      const shell = element.querySelector<HTMLElement>('[data-section-shell]')
      if (shell) {
        gsap.set(shell, { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, clipPath: 'inset(0% 0% 0% 0% round 1.5rem)', filter: 'blur(0px)' })
      }
      gsap.set(element.querySelectorAll('[data-reveal]'), { autoAlpha: 1, y: 0, z: 0, rotateX: 0, filter: 'blur(0px)' })
      return
    }

    const ctx = gsap.context(() => {
      const shell = element.querySelector<HTMLElement>('[data-section-shell]')

      gsap.set(element, { perspective: 1200 })

      // Shell entrance
      if (shell) {
        gsap.fromTo(
          shell,
          {
            autoAlpha: 0,
            y: 50,
            scale: 0.98,
            rotateX: 3,
            transformOrigin: '50% 100%',
            clipPath: 'inset(8% 3% 10% 3% round 1.5rem)',
            filter: 'blur(10px)',
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: shell,
              start: 'top 85%',
              once: true,
            },
          },
        )
      }

      // Reveal elements
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((target, index) => {
        gsap.fromTo(
          target,
          {
            autoAlpha: 0,
            y: 36,
            filter: 'blur(12px)',
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            delay: 0.15 + index * stagger,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: shell ?? target,
              start: 'top 85%',
              once: true,
            },
          },
        )
      })

      // Glow pulsing
      gsap.utils.toArray<HTMLElement>('[data-glow]').forEach((target, index) => {
        gsap.fromTo(
          target,
          { autoAlpha: 0.1, scale: 0.92 },
          {
            autoAlpha: 0.55,
            scale: 1.06,
            duration: 2.5 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          },
        )
      })

      // Parallax
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((target) => {
        const speed = Number(target.dataset.parallax ?? 0.12)
        gsap.to(target, {
          yPercent: speed * -100,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })
    }, element)

    return () => ctx.revert()
  }, [reducedMotion, ref, stagger])
}
