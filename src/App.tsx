"use client"

import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { BackgroundDecor } from './components/BackgroundDecor'
import { PetalField } from './components/PetalField'
import { Preloader } from './components/Preloader'
import { SectionFallback } from './components/SectionFallback'
import { TopControls } from './components/TopControls'
import HeroSection from './components/sections/HeroSection'
import { translations } from './data/content'
import { useAmbientMusic } from './hooks/useAmbientMusic'
import { useIsCompactDevice } from './hooks/useIsCompactDevice'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { setupGSAP } from './lib/gsap'
import type { Language } from './data/content'

const InvitationSection = lazy(
  () => import('./components/sections/InvitationSection'),
)
const CalendarSection = lazy(
  () => import('./components/sections/CalendarSection'),
)
const VenueSection = lazy(
  () => import('./components/sections/VenueSection'),
)
const TimelineSection = lazy(
  () => import('./components/sections/TimelineSection'),
)
const CountdownSection = lazy(
  () => import('./components/sections/CountdownSection'),
)

function App() {
  const reducedMotion = usePrefersReducedMotion()
  const compactDevice = useIsCompactDevice()
  const liteMode = reducedMotion || compactDevice
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return 'ru'
    }

    const stored = window.localStorage.getItem('wedding-language')
    return stored === 'ru' || stored === 'uz' ? stored : 'ru'
  })
  const [introVisible, setIntroVisible] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.localStorage.getItem('wedding-intro-seen') !== '1'
  })
  const { isPlaying, toggle } = useAmbientMusic()

  const content = useMemo(() => translations[language], [language])

  useEffect(() => {
    setupGSAP()
  }, [])

  useEffect(() => {
    window.localStorage.setItem('wedding-language', language)
  }, [language])

  useEffect(() => {
    document.documentElement.lang = language
    document.title = content.meta.title

    let description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )

    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.appendChild(description)
    }

    description.content = content.meta.description
  }, [content.meta.description, content.meta.title, language])

  const scrollToContent = () => {
    document.getElementById('invitation')?.scrollIntoView({
      behavior: liteMode ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  const handlePreloaderComplete = () => {
    setIntroVisible(false)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('wedding-intro-seen', '1')
    }
  }

  return (
    <>
      <Preloader
        visible={introVisible}
        reducedMotion={liteMode}
        label={content.preloader.label}
        sublabel={content.preloader.sublabel}
        onComplete={handlePreloaderComplete}
      />

      <div className="relative min-h-screen overflow-hidden">
        <BackgroundDecor liteMode={liteMode} />
        <PetalField reducedMotion={liteMode} />

        <TopControls
          language={language}
          isMusicOn={isPlaying}
          musicLabel={isPlaying ? content.controls.musicOn : content.controls.musicOff}
          onLanguageChange={setLanguage}
          onMusicToggle={() => void toggle()}
        />

        <main className="relative z-10">
          <HeroSection
            content={content.hero}
            reducedMotion={liteMode}
            onScrollNext={scrollToContent}
          />

          <Suspense fallback={<SectionFallback />}>
            <InvitationSection
              content={content.invitation}
              reducedMotion={liteMode}
            />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <CalendarSection
              content={content.calendar}
              reducedMotion={liteMode}
            />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <VenueSection
              content={content.venue}
              reducedMotion={liteMode}
            />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <TimelineSection
              content={content.timeline}
              reducedMotion={liteMode}
            />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <CountdownSection
              content={content.countdown}
              reducedMotion={liteMode}
            />
          </Suspense>
        </main>
      </div>
    </>
  )
}

export default App
