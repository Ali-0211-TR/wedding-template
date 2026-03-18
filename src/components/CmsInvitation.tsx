"use client"

import { useMemo } from 'react'
import { useCountdown } from '../hooks/useCountdown'
import { cmsThemes } from '../lib/cms-themes'
import type { CmsPage } from '../lib/cms-types'

interface CmsInvitationProps {
  page: CmsPage
}

const sectionTitles = {
  hero: 'hero',
  invitation: 'invitation',
  calendar: 'calendar',
  venue: 'venue',
  timeline: 'timeline',
  dresscode: 'dresscode',
  countdown: 'countdown',
} as const

function iconChar(glyph: 'dot' | 'heart' | 'flower' | 'ring' | 'sparkle') {
  if (glyph === 'heart') {
    return '♥'
  }

  if (glyph === 'flower') {
    return '✿'
  }

  if (glyph === 'ring') {
    return '◌'
  }

  if (glyph === 'sparkle') {
    return '✦'
  }

  return '•'
}

function CountdownCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/35 bg-white/35 px-5 py-6 text-center backdrop-blur-xl">
      <p className="font-display text-5xl leading-none">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.35em] opacity-70">{label}</p>
    </div>
  )
}

export function CmsInvitation({ page }: CmsInvitationProps) {
  const countdown = useCountdown(page.content.eventDateIso)
  const theme = cmsThemes[page.themeKey]
  const design = page.content.design

  const headingFontClass =
    design.headingFont === 'display'
      ? 'font-display'
      : design.headingFont === 'serif'
        ? 'font-serif'
        : 'font-sans'

  const bodyFontClass =
    design.bodyFont === 'sans'
      ? 'font-sans'
      : design.bodyFont === 'serif'
        ? 'font-serif'
        : 'font-display'

  const heroIcon = iconChar(design.sectionIcons.hero)
  const venueIcon = iconChar(design.sectionIcons.venue)
  const timelineIcon = iconChar(design.sectionIcons.timeline)
  const countdownIcon = iconChar(design.sectionIcons.countdown)

  const sectionAnimationClass =
    design.animationPreset === 'none'
      ? ''
      : design.animationPreset === 'cinematic'
        ? 'cms-reveal-cinematic transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl'
        : 'cms-reveal-soft transition-all duration-300 hover:-translate-y-0.5'

  const sectionAnimationByKey = (section: keyof typeof sectionTitles) => {
    const preset = design.sectionAnimations[section]

    if (preset === 'none') {
      return ''
    }

    if (preset === 'fade-up') {
      return 'cms-reveal-soft transition-all duration-300 hover:-translate-y-0.5'
    }

    if (preset === 'zoom-in') {
      return 'cms-reveal-zoom transition-all duration-500 hover:scale-[1.01]'
    }

    if (preset === 'slide-left') {
      return 'cms-reveal-left transition-all duration-500'
    }

    if (preset === 'slide-right') {
      return 'cms-reveal-right transition-all duration-500'
    }

    return sectionAnimationClass
  }

  const landingContainerClass =
    design.landingStyle === 'cinematic'
      ? 'relative'
      : design.landingStyle === 'airy'
        ? 'relative'
        : 'relative'

  const landingPanelClass =
    design.landingStyle === 'cinematic'
      ? `${theme.panelClassName} relative overflow-hidden border-white/40 bg-white/28`
      : design.landingStyle === 'airy'
        ? `${theme.panelClassName} border-white/70 bg-white/75`
        : theme.panelClassName

  const landingOrnamentClass =
    design.landingStyle === 'cinematic'
      ? 'cinematic-noise'
      : design.landingStyle === 'airy'
        ? 'cms-ornament-airy'
        : ''

  const visibleSections = useMemo(
    () => page.layout.sectionOrder.filter((section) => !page.layout.hiddenSections.includes(section)),
    [page.layout.hiddenSections, page.layout.sectionOrder],
  )

  const calendarCells = useMemo(() => {
    const daysInMonth = 30
    const firstOffset = 2
    const weddingDay = 3
    const total = firstOffset + daysInMonth
    const padded = Math.ceil(total / 7) * 7

    return Array.from({ length: padded }, (_, i) => {
      const day = i - firstOffset + 1

      if (i < firstOffset || day > daysInMonth) {
        return { type: 'empty' as const }
      }

      return {
        type: 'day' as const,
        day,
        isWedding: day === weddingDay,
      }
    })
  }, [])

  return (
    <div className={`min-h-screen ${theme.pageClassName} ${bodyFontClass} ${landingContainerClass}`}>
      {landingOrnamentClass ? <div className={`pointer-events-none fixed inset-0 z-0 ${landingOrnamentClass}`} /> : null}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {visibleSections.map((section, index) => {
          const animationDelay = design.animationPreset === 'none' ? undefined : `${index * 110}ms`

          const resolvedAnimationClass = sectionAnimationByKey(section)

          if (section === sectionTitles.hero) {
            return (
              <section
                key={section}
                className={`mb-6 rounded-[2rem] px-6 py-12 text-center sm:px-10 sm:py-16 ${landingPanelClass} ${resolvedAnimationClass}`}
                style={animationDelay ? { animationDelay } : undefined}
              >
                <p className="text-xs uppercase tracking-[0.45em] opacity-65">{page.content.hero.weddingDay}</p>
                <h1 className={`mt-5 text-[clamp(2.2rem,12vw,4.5rem)] leading-[1.05] sm:text-8xl ${headingFontClass}`}>
                  <span className="block break-words">{page.content.hero.groomName}</span>
                  <span className={`mx-2 inline-block align-middle text-[0.7em] sm:mx-4 ${theme.accentClassName}`}>{heroIcon}</span>
                  <span className="block break-words sm:inline">{page.content.hero.brideName}</span>
                </h1>
                <p className="mt-6 text-sm uppercase tracking-[0.35em] opacity-75 sm:text-base">{page.content.hero.date}</p>
              </section>
            )
          }

          if (section === sectionTitles.invitation) {
            return (
              <section
                key={section}
                className={`mb-6 rounded-[2rem] px-6 py-10 sm:px-10 ${landingPanelClass} ${resolvedAnimationClass}`}
                style={animationDelay ? { animationDelay } : undefined}
              >
                <p className="text-center text-xs uppercase tracking-[0.45em] opacity-65">{page.content.invitation.eyebrow}</p>
                <h2 className={`mt-4 text-center text-4xl sm:text-5xl ${headingFontClass}`}>{page.content.invitation.title}</h2>
                <div className="mx-auto mt-6 max-w-3xl space-y-4 text-center text-base leading-8 opacity-85 sm:text-lg">
                  {page.content.invitation.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            )
          }

          if (section === sectionTitles.calendar) {
            return (
              <section
                key={section}
                className={`mb-6 rounded-[2rem] px-6 py-10 sm:px-10 ${landingPanelClass} ${resolvedAnimationClass}`}
                style={animationDelay ? { animationDelay } : undefined}
              >
                <p className="text-center text-xs uppercase tracking-[0.45em] opacity-65">{page.content.calendar.eyebrow}</p>
                <h2 className={`mt-4 text-center text-4xl sm:text-5xl ${headingFontClass}`}>{page.content.calendar.title}</h2>
                <div className="mx-auto mt-8 max-w-sm">
                  <p className={`mb-3 text-center text-2xl ${headingFontClass}`}>{page.content.calendar.monthName} 2026</p>
                  <div className="grid grid-cols-7 gap-1">
                    {page.content.calendar.weekdays.map((day) => (
                      <div key={day} className="py-1 text-center text-xs uppercase tracking-[0.2em] opacity-60">
                        {day}
                      </div>
                    ))}
                    {calendarCells.map((cell, index) => {
                      if (cell.type === 'empty') {
                        return <div key={`empty-${index}`} className="aspect-square" />
                      }

                      return (
                        <div
                          key={`day-${cell.day}`}
                          className={`flex aspect-square items-center justify-center rounded-full text-sm ${
                            cell.isWedding
                              ? 'bg-rose text-white shadow-lg shadow-rose/35'
                              : 'border border-white/30 bg-white/25'
                          }`}
                        >
                          {cell.day}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </section>
            )
          }

          if (section === sectionTitles.venue) {
            return (
              <section
                key={section}
                className={`mb-6 rounded-[2rem] px-6 py-10 sm:px-10 ${landingPanelClass} ${resolvedAnimationClass}`}
                style={animationDelay ? { animationDelay } : undefined}
              >
                <p className="text-center text-xs uppercase tracking-[0.45em] opacity-65">{page.content.venue.eyebrow}</p>
                <h2 className={`mt-4 text-center text-4xl sm:text-5xl ${headingFontClass}`}>
                  <span className={`mr-3 ${theme.accentClassName}`}>{venueIcon}</span>
                  {page.content.venue.name}
                </h2>
                <p className="mt-3 text-center text-base opacity-80">{page.content.venue.address}</p>
                <p className="mx-auto mt-4 max-w-2xl text-center opacity-75">{page.content.venue.note}</p>
                <div className="mt-6 text-center">
                  <a
                    href={page.content.venue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-white/45 bg-white/35 px-6 py-3 text-sm uppercase tracking-[0.24em] backdrop-blur-xl"
                  >
                    {page.content.venue.openMap}
                  </a>
                </div>
              </section>
            )
          }

          if (section === sectionTitles.timeline) {
            return (
              <section
                key={section}
                className={`mb-6 rounded-[2rem] px-6 py-10 sm:px-10 ${landingPanelClass} ${resolvedAnimationClass}`}
                style={animationDelay ? { animationDelay } : undefined}
              >
                <p className="text-center text-xs uppercase tracking-[0.45em] opacity-65">{page.content.timeline.eyebrow}</p>
                <h2 className={`mt-4 text-center text-4xl sm:text-5xl ${headingFontClass}`}>
                  <span className={`mr-3 ${theme.accentClassName}`}>{timelineIcon}</span>
                  {page.content.timeline.title}
                </h2>
                <div className="mx-auto mt-8 max-w-2xl space-y-4">
                  {design.timelineStyle === 'classic' ? (
                    <div className="space-y-4">
                      {page.content.timeline.items.map((item, index) => (
                        <div key={`${item.time}-${item.title}-${index}`} className="rounded-2xl border border-white/25 bg-white/20 px-4 py-3">
                          <div className="grid items-center gap-3 sm:grid-cols-[130px_40px_1fr]">
                            <span className={`text-2xl ${headingFontClass}`}>{item.time}</span>
                            <span className={`mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-white/35 text-base ${theme.accentClassName}`}>
                              {iconChar(item.icon ?? design.sectionIcons.timeline)}
                            </span>
                            <span className="text-base opacity-85">{item.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {design.timelineStyle === 'steps' ? (
                    <div className="relative space-y-3">
                      <span className="pointer-events-none absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-white/45" />
                      {page.content.timeline.items.map((item, index) => (
                        <div
                          key={`${item.time}-${item.title}-${index}`}
                          className={`relative rounded-2xl border border-white/35 bg-white/25 px-4 py-4 sm:max-w-[88%] ${
                            index % 2 === 0 ? 'sm:ml-8' : 'sm:ml-16'
                          }`}
                        >
                          <span className={`absolute -left-4 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/40 text-sm ${theme.accentClassName}`}>
                            {iconChar(item.icon ?? design.sectionIcons.timeline)}
                          </span>
                          <p className={`text-lg ${headingFontClass}`}>{item.time}</p>
                          <p className="mt-1 text-base opacity-85">{item.title}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {design.timelineStyle === 'glow' ? (
                    <div className="space-y-4">
                      {page.content.timeline.items.map((item, index) => (
                        <div
                          key={`${item.time}-${item.title}-${index}`}
                          className="rounded-2xl border border-white/30 bg-white/15 px-4 py-4 shadow-[0_0_28px_rgba(255,255,255,0.18)]"
                        >
                          <div className="grid items-center gap-3 sm:grid-cols-[120px_44px_1fr]">
                            <span className={`text-xl ${headingFontClass}`}>{item.time}</span>
                            <span className={`mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/45 text-base shadow-[0_0_20px_rgba(255,255,255,0.35)] ${theme.accentClassName}`}>
                              {iconChar(item.icon ?? design.sectionIcons.timeline)}
                            </span>
                            <span className="text-base opacity-90">{item.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </section>
            )
          }

          if (section === sectionTitles.dresscode) {
            return (
              <section
                key={section}
                className={`mb-6 rounded-[2rem] px-6 py-10 sm:px-10 ${landingPanelClass} ${resolvedAnimationClass}`}
                style={animationDelay ? { animationDelay } : undefined}
              >
                <p className="text-center text-xs uppercase tracking-[0.45em] opacity-65">{page.content.dresscode.eyebrow}</p>
                <h2 className={`mt-4 text-center text-4xl sm:text-5xl ${headingFontClass}`}>{page.content.dresscode.code}</h2>
                <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-8 opacity-85 sm:text-lg">
                  {page.content.dresscode.wishes}
                </p>
              </section>
            )
          }

          return (
            <section
              key={section}
              className={`mb-6 rounded-[2rem] px-6 py-10 text-center sm:px-10 ${landingPanelClass} ${resolvedAnimationClass}`}
              style={animationDelay ? { animationDelay } : undefined}
            >
              <h2 className={`text-[clamp(2rem,10vw,3.5rem)] leading-tight sm:text-5xl ${headingFontClass}`}>
                <span className="block break-words">{page.content.countdown.groomName}</span>
                <span className={`mx-2 inline-block align-middle text-[0.7em] sm:mx-4 ${theme.accentClassName}`}>{countdownIcon}</span>
                <span className="block break-words sm:inline">{page.content.countdown.brideName}</span>
              </h2>
              <p className="mt-4 text-xs uppercase tracking-[0.45em] opacity-70">
                {countdown.completed
                  ? page.content.countdown.completedLabel
                  : page.content.countdown.untilLabel}
              </p>
              {!countdown.completed ? (
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <CountdownCard label={page.content.countdown.units.days} value={countdown.days} />
                  <CountdownCard label={page.content.countdown.units.hours} value={countdown.hours} />
                  <CountdownCard label={page.content.countdown.units.minutes} value={countdown.minutes} />
                  <CountdownCard label={page.content.countdown.units.seconds} value={countdown.seconds} />
                </div>
              ) : null}
            </section>
          )
        })}
      </div>
    </div>
  )
}
