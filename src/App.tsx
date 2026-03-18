"use client"

import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
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
import { SectionWrapper } from './components/SectionWrapper'
import { FlowerDivider } from './components/FlowerDivider'

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
    if (typeof window === 'undefined') return 'ru'
    const stored = window.localStorage.getItem('wedding-language')
    return stored === 'ru' || stored === 'uz' ? stored : 'ru'
  })

  const [introVisible, setIntroVisible] = useState(() => {
    if (typeof window === 'undefined') return false
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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
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
        <BackgroundDecor />
        <PetalField reducedMotion={liteMode} />

        <TopControls
          language={language}
          isMusicOn={isPlaying}
          musicLabel={isPlaying ? content.controls.musicOn : content.controls.musicOff}
          onLanguageChange={setLanguage}
          onMusicToggle={() => void toggle()}
        />

        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <SectionWrapper key="hero" id="hero">
              <HeroSection
                content={content.hero}
                reducedMotion={liteMode}
                onScrollNext={() => scrollToSection('invitation')}
              />
            </SectionWrapper>

            <SectionWrapper key="invitation" id="invitation" compact>
              <FlowerDivider side="right" reducedMotion={liteMode} />
              <Suspense fallback={<SectionFallback />}>
                <InvitationSection
                  content={content.invitation}
                  reducedMotion={liteMode}
                />
              </Suspense>
            </SectionWrapper>

            <SectionWrapper key="calendar" id="calendar" compact>
              <FlowerDivider side="left" reducedMotion={liteMode} />
              <Suspense fallback={<SectionFallback />}>
                <CalendarSection
                  content={content.calendar}
                  reducedMotion={liteMode}
                />
              </Suspense>
            </SectionWrapper>

            <SectionWrapper key="venue" id="venue" compact>
              <FlowerDivider side="right" reducedMotion={liteMode} />
              <Suspense fallback={<SectionFallback />}>
                <VenueSection
                  content={content.venue}
                  reducedMotion={liteMode}
                />
              </Suspense>
            </SectionWrapper>

            <SectionWrapper key="timeline" id="timeline" compact>
              <FlowerDivider side="left" reducedMotion={liteMode} />
              <Suspense fallback={<SectionFallback />}>
                <TimelineSection
                  content={content.timeline}
                  reducedMotion={liteMode}
                />
              </Suspense>
            </SectionWrapper>

            <SectionWrapper key="countdown" id="countdown" compact>
              <FlowerDivider side="right" reducedMotion={liteMode} />
              <Suspense fallback={<SectionFallback />}>
                <CountdownSection
                  content={content.countdown}
                  reducedMotion={liteMode}
                />
              </Suspense>
            </SectionWrapper>
          </AnimatePresence>
        </main>
      </div>
    </>
  )
}

export default App