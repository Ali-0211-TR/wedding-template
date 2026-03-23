import { useCallback, useEffect, useRef, useState } from 'react'

/* ── env-based config ────────────────────────────────── */
const AUTOPLAY =
  (process.env.NEXT_PUBLIC_MUSIC_AUTOPLAY ?? 'true').toLowerCase() === 'true'
const VOLUME = Math.min(
  1,
  Math.max(0, parseFloat(process.env.NEXT_PUBLIC_MUSIC_VOLUME ?? '0.35')),
)

/**
 * Ambient music hook — plays an actual audio file.
 * Uses HTMLAudioElement for maximum mobile compatibility.
 *
 * When `NEXT_PUBLIC_MUSIC_AUTOPLAY=true` (default), the hook
 * will start playing automatically on the first user interaction
 * (click/tap/scroll) because mobile browsers block autoplay
 * without a gesture.
 */
export function useAmbientMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isPlayingRef = useRef(false)
  const pendingAutoplayRef = useRef(AUTOPLAY)
  const autoplayBoundRef = useRef(false)

  // Keep ref in sync for the event listener closure
  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  // Create audio element lazily
  const getAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current

    const audio = new Audio('/audio/template-music.mp3')
    audio.loop = true
    audio.volume = VOLUME
    audio.preload = 'auto'

    // Handle external interruptions (phone call, etc.)
    audio.addEventListener('pause', () => {
      if (isPlayingRef.current && audio.paused) {
        setIsPlaying(false)
        isPlayingRef.current = false
      }
    })

    audioRef.current = audio
    return audio
  }, [])

  const start = useCallback(async () => {
    const audio = getAudio()

    try {
      await audio.play()
      setIsPlaying(true)
      pendingAutoplayRef.current = false
    } catch {
      // Retry once — some Android browsers need a micro-delay
      setTimeout(async () => {
        try {
          await audio.play()
          setIsPlaying(true)
          pendingAutoplayRef.current = false
        } catch {
          // silently give up
        }
      }, 100)
    }
  }, [getAudio])

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    pendingAutoplayRef.current = false // user explicitly turned off

    // Smooth fade-out via requestAnimationFrame
    const fadeOut = () => {
      if (audio.volume > 0.02) {
        audio.volume = Math.max(0, audio.volume - 0.04)
        requestAnimationFrame(fadeOut)
      } else {
        audio.pause()
        audio.volume = VOLUME
        audio.currentTime = 0
        setIsPlaying(false)
      }
    }
    fadeOut()
  }, [])

  const toggle = useCallback(async () => {
    if (isPlaying) stop()
    else await start()
  }, [isPlaying, start, stop])

  /* ── Autoplay on first user gesture ────────────────── */
  useEffect(() => {
    if (!AUTOPLAY || autoplayBoundRef.current) return
    autoplayBoundRef.current = true

    const handler = () => {
      if (!pendingAutoplayRef.current) return
      // Remove listeners immediately so we don't re-trigger
      cleanup()
      void start()
    }

    const events = ['click', 'touchstart', 'scroll', 'keydown'] as const
    events.forEach((e) => window.addEventListener(e, handler, { once: false, passive: true }))

    function cleanup() {
      events.forEach((e) => window.removeEventListener(e, handler))
    }

    return cleanup
  }, [start])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const audio = audioRef.current
      if (audio) {
        audio.pause()
        audio.src = ''
        audioRef.current = null
      }
    }
  }, [])

  return { isPlaying, toggle }
}
