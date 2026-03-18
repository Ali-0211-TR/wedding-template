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
    if (!visible) {
      return
    }

    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(onComplete, reducedMotion ? 350 : 900)

    return () => {
      document.body.style.overflow = ''
      window.clearTimeout(timer)
    }
  }, [onComplete, reducedMotion, visible])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.96),rgba(245,216,222,0.82)_32%,rgba(190,211,189,0.76))] px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reducedMotion ? 0.25 : 0.8, ease: 'easeOut' } }}
        >
          <motion.div
            className="absolute left-[12%] top-[16%] h-44 w-44 rounded-full bg-white/40 blur-3xl"
            animate={reducedMotion ? undefined : { y: [-8, 14, -8], scale: [1, 1.08, 1] }}
            transition={{ duration: 6.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[10%] right-[10%] h-56 w-56 rounded-full bg-blush/45 blur-3xl"
            animate={reducedMotion ? undefined : { y: [12, -12, 12], x: [-10, 8, -10] }}
            transition={{ duration: 7.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          />
          <div className="cinematic-noise absolute inset-0 opacity-[0.18]" />

          <motion.div
            className="glass-panel relative flex w-full max-w-lg flex-col items-center gap-5 overflow-hidden px-8 py-10 text-center"
            initial={{ opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04, y: -12 }}
            transition={{ duration: reducedMotion ? 0.25 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/85 to-transparent" />
            <motion.div
              className="absolute left-[-20%] top-0 h-full w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]"
              initial={{ x: '-130%' }}
              animate={{ x: '260%' }}
              transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            />
            {reducedMotion ? (
              <div className="h-24 w-24 rounded-full bg-white/45 blur-sm" aria-hidden="true" />
            ) : (
              <BloomLottie className="h-24 w-24" />
            )}
            <div className="space-y-2">
              <h1 className="font-display text-5xl text-ink sm:text-6xl">{label}</h1>
              <p className="text-sm text-ink/70 sm:text-base">{sublabel}</p>
            </div>
            <div className="h-px w-full max-w-[14rem] overflow-hidden rounded-full bg-white/50">
              <motion.div
                className="h-full bg-gradient-to-r from-blush via-white to-sage"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.6, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
