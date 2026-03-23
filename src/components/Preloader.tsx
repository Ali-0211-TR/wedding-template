import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { BloomLottie } from './ui/BloomLottie'

interface PreloaderProps {
  visible: boolean
  reducedMotion: boolean
  label: string
  sublabel: string
  onComplete: () => void
}

export function Preloader({
  visible,
  reducedMotion,
  label,
  sublabel,
  onComplete,
}: PreloaderProps) {
  useEffect(() => {
    if (!visible) return

    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(onComplete, reducedMotion ? 400 : 1200)

    return () => {
      document.body.style.overflow = ''
      window.clearTimeout(timer)
    }
  }, [onComplete, reducedMotion, visible])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.96),rgba(245,216,222,0.8)_32%,rgba(190,211,189,0.72))] px-5"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reducedMotion ? 0.25 : 0.9, ease: 'easeOut' } }}
        >
          {/* Background blobs */}
          <motion.div
            className="absolute left-[10%] top-[14%] h-36 w-36 rounded-full bg-white/35 blur-3xl sm:h-44 sm:w-44"
            animate={reducedMotion ? undefined : { y: [-6, 12, -6], scale: [1, 1.06, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[8%] right-[8%] h-44 w-44 rounded-full bg-blush/40 blur-3xl sm:h-56 sm:w-56"
            animate={reducedMotion ? undefined : { y: [10, -10, 10], x: [-8, 6, -8] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="cinematic-noise absolute inset-0 opacity-[0.16]" />

          {/* Card */}
          <motion.div
            className="glass-panel relative flex w-full max-w-sm flex-col items-center gap-4 overflow-hidden px-6 py-8 text-center sm:max-w-md sm:gap-5 sm:px-8 sm:py-10"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04, y: -10 }}
            transition={{ duration: reducedMotion ? 0.25 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top line */}
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            {/* Shine sweep */}
            <motion.div
              className="absolute left-[-20%] top-0 h-full w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)]"
              initial={{ x: '-130%' }}
              animate={{ x: '260%' }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Lottie or fallback */}
            {reducedMotion ? (
              <div className="h-20 w-20 rounded-full bg-white/40 blur-sm" aria-hidden="true" />
            ) : (
              <BloomLottie className="h-20 w-20 sm:h-24 sm:w-24" />
            )}

            {/* Text */}
            <div className="space-y-1.5">
              <h1 className="font-display text-4xl text-ink sm:text-5xl">{label}</h1>
              <p className="text-xs text-ink/60 sm:text-sm">{sublabel}</p>
            </div>

            {/* Loading bar */}
            <div className="h-px w-full max-w-[12rem] overflow-hidden rounded-full bg-white/50">
              <motion.div
                className="h-full bg-gradient-to-r from-blush via-white to-sage"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
