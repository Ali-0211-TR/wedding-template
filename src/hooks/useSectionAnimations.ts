import { useLayoutEffect } from 'react'
import { gsap } from '../lib/gsap'
import type { RefObject } from 'react'

export function useSectionAnimations(
  ref: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
  stagger = 0.12,
) {
  useLayoutEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    if (reducedMotion) {
      const shell = element.querySelector<HTMLElement>('[data-section-shell]')

      if (shell) {
        gsap.set(shell, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          clipPath: 'inset(0% 0% 0% 0% round 2rem)',
          filter: 'blur(0px)',
        })
      }

      gsap.set(element.querySelectorAll('[data-reveal]'), {
        autoAlpha: 1,
        y: 0,
        z: 0,
        rotateX: 0,
        filter: 'blur(0px)',
      })
      return
    }

    const ctx = gsap.context(() => {
      const shell = element.querySelector<HTMLElement>('[data-section-shell]')

      gsap.set(element, { perspective: 1600 })

      if (shell) {
        gsap.fromTo(
          shell,
          {
            autoAlpha: 0,
            y: 68,
            scale: 0.975,
            rotateX: 5,
            transformOrigin: '50% 100%',
            clipPath: 'inset(10% 4% 12% 4% round 2rem)',
            filter: 'blur(14px)',
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            clipPath: 'inset(0% 0% 0% 0% round 2rem)',
            filter: 'blur(0px)',
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: shell,
              start: 'top 82%',
              once: true,
            },
          },
        )
      }

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((target, index) => {
        const x = Number(target.dataset.revealX ?? 0)

        gsap.fromTo(
          target,
          {
            autoAlpha: 0,
            y: 48,
            x,
            z: -90,
            rotateX: 8,
            transformOrigin: '50% 100%',
            filter: 'blur(18px)',
          },
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            z: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            delay: 0.18 + index * stagger,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: shell ?? target,
              start: 'top 82%',
              once: true,
            },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('[data-depth]').forEach((target, index) => {
        const floatY = Number(target.dataset.floatY ?? 12)

        gsap.fromTo(
          target,
          {
            autoAlpha: 0,
            y: floatY * 1.8,
            scale: 0.96,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            delay: 0.24 + index * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: shell ?? target,
              start: 'top 82%',
              once: true,
            },
          },
        )

        gsap.to(target, {
          y: -floatY,
          duration: 4.4 + index * 0.25,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-glow]').forEach((target, index) => {
        gsap.fromTo(
          target,
          { autoAlpha: 0.1, scale: 0.92 },
          {
            autoAlpha: 0.65,
            scale: 1.08,
            duration: 2.8 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((target) => {
        const speed = Number(target.dataset.parallax ?? 0.16)
        const x = Number(target.dataset.parallaxX ?? 0)

        gsap.to(target, {
          yPercent: speed * -100,
          xPercent: x,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-sheen]').forEach((target, index) => {
        gsap.fromTo(
          target,
          { xPercent: -140, autoAlpha: 0 },
          {
            xPercent: 160,
            autoAlpha: 0.75,
            duration: 2.8,
            delay: index * 0.35,
            ease: 'power2.inOut',
            repeat: -1,
            repeatDelay: 2.4,
          },
        )
      })
    }, element)

    return () => ctx.revert()
  }, [reducedMotion, ref, stagger])
}
