"use client"

import { useMemo, useState } from 'react'
import { CmsInvitation } from '../CmsInvitation'
import { cmsThemeOptions } from '../../lib/cms-themes'
import type {
  CmsAnimationPreset,
  CmsBodyFont,
  CmsHeadingFont,
  CmsIconGlyph,
  CmsIconStyle,
  CmsPage,
  CmsPageSummary,
  CmsSectionKey,
  CmsTimelineStyle,
  CmsThemeKey,
} from '../../lib/cms-types'

interface AdminDashboardProps {
  initialPages: CmsPageSummary[]
}

const sectionLabels: Record<CmsSectionKey, string> = {
  hero: 'Hero',
  invitation: 'Invitation',
  calendar: 'Calendar',
  venue: 'Venue',
  timeline: 'Timeline',
  dresscode: 'Dress code',
  countdown: 'Countdown',
}

const sectionKeys = Object.keys(sectionLabels) as CmsSectionKey[]

const sectionIconLabels: Array<{ key: 'hero' | 'venue' | 'timeline' | 'countdown'; label: string }> = [
  { key: 'hero', label: 'Hero' },
  { key: 'venue', label: 'Venue' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'countdown', label: 'Countdown' },
]

const iconGlyphOptions: Array<{ value: CmsIconGlyph; label: string }> = [
  { value: 'dot', label: '• Dot' },
  { value: 'heart', label: '♥ Heart' },
  { value: 'flower', label: '✿ Flower' },
  { value: 'ring', label: '◌ Ring' },
  { value: 'sparkle', label: '✦ Sparkle' },
]

function iconGlyphByStyle(style: CmsIconStyle): CmsIconGlyph {
  if (style === 'hearts') {
    return 'heart'
  }

  if (style === 'floral') {
    return 'flower'
  }

  return 'dot'
}

function isoToDateTimeLocal(value: string) {
  const match = value.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})/)
  return match ? match[1] : ''
}

function dateTimeLocalToIso(value: string) {
  if (!value) {
    return ''
  }

  return `${value}:00+05:00`
}

function isoToDateOnly(value: string) {
  const match = value.match(/^(\d{4}-\d{2}-\d{2})/)
  return match ? match[1] : ''
}

function updateIsoDateOnly(iso: string, dateOnly: string) {
  if (!dateOnly) {
    return iso
  }

  const timeMatch = iso.match(/T(\d{2}:\d{2})(?::\d{2})?/)
  const time = timeMatch ? timeMatch[1] : '17:00'
  return `${dateOnly}T${time}:00+05:00`
}

function formatHeroDate(dateOnly: string) {
  if (!dateOnly) {
    return ''
  }

  const date = new Date(`${dateOnly}T00:00:00+05:00`)

  if (Number.isNaN(date.getTime())) {
    return dateOnly
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
    .format(date)
    .replace(' г.', '')
}

export function AdminDashboard({ initialPages }: AdminDashboardProps) {
  const [pages, setPages] = useState(initialPages)
  const [selectedId, setSelectedId] = useState<number | null>(initialPages[0]?.id ?? null)
  const [selectedPage, setSelectedPage] = useState<CmsPage | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [newName, setNewName] = useState('Новая страница')
  const [newSlug, setNewSlug] = useState('new-page')
  const [newGroom, setNewGroom] = useState('Азиз')
  const [newBride, setNewBride] = useState('Лайло')
  const [newTheme, setNewTheme] = useState<CmsThemeKey>('samarkand-dawn')
  const [newDateIso, setNewDateIso] = useState('2026-04-03T17:00:00+05:00')
  const [newVenue, setNewVenue] = useState('Hilton Tashkent City')
  const [newMapUrl, setNewMapUrl] = useState('https://www.google.com/maps/search/?api=1&query=Hilton%20Tashkent%20City')
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [contentJson, setContentJson] = useState('')
  const [layoutJson, setLayoutJson] = useState('')
  const [draggedSection, setDraggedSection] = useState<CmsSectionKey | null>(null)
  const [isPreviewEnabled, setIsPreviewEnabled] = useState(false)

  const selectedSummary = useMemo(
    () => pages.find((page) => page.id === selectedId) ?? null,
    [pages, selectedId],
  )

  const refreshList = async () => {
    const response = await fetch('/api/admin/pages', { cache: 'no-store' })

    if (!response.ok) {
      throw new Error('Не удалось загрузить список страниц')
    }

    const body = (await response.json()) as { pages: CmsPageSummary[] }
    setPages(body.pages)
  }

  const loadPage = async (id: number) => {
    setStatus('Загрузка страницы...')
    setError(null)

    try {
      const response = await fetch(`/api/admin/pages/${id}`, { cache: 'no-store' })

      if (!response.ok) {
        const body = (await response.json()) as { error?: string }
        throw new Error(body.error ?? 'Ошибка загрузки страницы')
      }

      const body = (await response.json()) as { page: CmsPage }
      setSelectedPage(body.page)
      setContentJson(JSON.stringify(body.page.content, null, 2))
      setLayoutJson(JSON.stringify(body.page.layout, null, 2))
      setStatus('Страница загружена')
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Ошибка загрузки')
      setStatus(null)
    }
  }

  const createPage = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus('Создание страницы...')
    setError(null)

    try {
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          slug: newSlug,
          groomName: newGroom,
          brideName: newBride,
          themeKey: newTheme,
          eventDateIso: newDateIso,
          venueName: newVenue,
          mapUrl: newMapUrl,
        }),
      })

      if (!response.ok) {
        const body = (await response.json()) as { error?: string }
        throw new Error(body.error ?? 'Не удалось создать страницу')
      }

      const body = (await response.json()) as { page: CmsPage }
      await refreshList()
      setSelectedId(body.page.id)
      await loadPage(body.page.id)
      setStatus('Страница создана')
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Ошибка создания')
      setStatus(null)
    }
  }

  const savePage = async () => {
    if (!selectedPage) {
      return
    }

    setStatus('Сохранение...')
    setError(null)

    try {
      const response = await fetch(`/api/admin/pages/${selectedPage.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: selectedPage.name,
          slug: selectedPage.slug,
          themeKey: selectedPage.themeKey,
          content: selectedPage.content,
          layout: selectedPage.layout,
        }),
      })

      if (!response.ok) {
        const body = (await response.json()) as { error?: string }
        throw new Error(body.error ?? 'Не удалось сохранить страницу')
      }

      const body = (await response.json()) as { page: CmsPage }
      setSelectedPage(body.page)
      setContentJson(JSON.stringify(body.page.content, null, 2))
      setLayoutJson(JSON.stringify(body.page.layout, null, 2))
      await refreshList()
      setStatus('Сохранено')
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Ошибка сохранения')
      setStatus(null)
    }
  }

  const makeDefault = async () => {
    if (!selectedPage) {
      return
    }

    setStatus('Обновляю дефолтную страницу...')
    setError(null)

    try {
      const response = await fetch(`/api/admin/pages/${selectedPage.id}/default`, {
        method: 'POST',
      })

      if (!response.ok) {
        const body = (await response.json()) as { error?: string }
        throw new Error(body.error ?? 'Не удалось назначить дефолтную страницу')
      }

      await refreshList()
      setStatus('Дефолтная страница обновлена')
    } catch (defaultError) {
      setError(defaultError instanceof Error ? defaultError.message : 'Ошибка')
      setStatus(null)
    }
  }

  const logout = async () => {
    await fetch('/admin/logout', { method: 'POST' })
    window.location.reload()
  }

  const updateSelectedContent = (mutate: (content: CmsPage['content']) => CmsPage['content']) => {
    if (!selectedPage) {
      return
    }

    const nextContent = mutate(selectedPage.content)
    setSelectedPage({ ...selectedPage, content: nextContent })
    setContentJson(JSON.stringify(nextContent, null, 2))
  }

  const updateSelectedLayout = (mutate: (layout: CmsPage['layout']) => CmsPage['layout']) => {
    if (!selectedPage) {
      return
    }

    const nextLayout = mutate(selectedPage.layout)
    setSelectedPage({ ...selectedPage, layout: nextLayout })
    setLayoutJson(JSON.stringify(nextLayout, null, 2))
  }

  const applyAdvancedJson = () => {
    if (!selectedPage) {
      return
    }

    try {
      const parsedContent = JSON.parse(contentJson) as CmsPage['content']
      const parsedLayout = JSON.parse(layoutJson) as CmsPage['layout']

      setSelectedPage({
        ...selectedPage,
        content: parsedContent,
        layout: parsedLayout,
      })
      setStatus('JSON применён к визуальному редактору')
      setError(null)
    } catch (jsonError) {
      setError(jsonError instanceof Error ? jsonError.message : 'Некорректный JSON')
    }
  }

  const moveSection = (dragged: CmsSectionKey, target: CmsSectionKey) => {
    if (dragged === target) {
      return
    }

    updateSelectedLayout((layout) => {
      const order = [...layout.sectionOrder]
      const fromIndex = order.indexOf(dragged)
      const toIndex = order.indexOf(target)

      if (fromIndex === -1 || toIndex === -1) {
        return layout
      }

      order.splice(fromIndex, 1)
      order.splice(toIndex, 0, dragged)

      return {
        ...layout,
        sectionOrder: order,
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7fb] via-[#f7ebe2] to-[#eef6ef] px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between rounded-3xl border border-white/60 bg-white/70 px-6 py-5 shadow-soft backdrop-blur-xl">
          <div>
            <h1 className="font-display text-4xl text-ink">Admin CMS</h1>
            <p className="text-sm text-ink/70">Полное управление приглашениями: визуальный редактор + расширенный JSON режим</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-white/50 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.24em]"
          >
            Выйти
          </button>
        </div>

        {status ? <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{status}</p> : null}
        {error ? <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur-xl">
              <h2 className="font-display text-2xl text-ink">Создать страницу</h2>
              <form className="mt-4 space-y-3" onSubmit={createPage}>
                <label className="block space-y-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Название (ввод)</span>
                  <input value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full rounded-xl border border-white/60 bg-white px-3 py-2" placeholder="Введите название" />
                </label>
                <label className="block space-y-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Slug (ввод)</span>
                  <input value={newSlug} onChange={(e) => setNewSlug(e.target.value)} className="w-full rounded-xl border border-white/60 bg-white px-3 py-2" placeholder="Введите slug" />
                </label>
                <label className="block space-y-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Имя жениха (ввод)</span>
                  <input value={newGroom} onChange={(e) => setNewGroom(e.target.value)} className="w-full rounded-xl border border-white/60 bg-white px-3 py-2" placeholder="Введите имя" />
                </label>
                <label className="block space-y-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Имя невесты (ввод)</span>
                  <input value={newBride} onChange={(e) => setNewBride(e.target.value)} className="w-full rounded-xl border border-white/60 bg-white px-3 py-2" placeholder="Введите имя" />
                </label>
                <label className="block space-y-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Дата и время (выбор)</span>
                  <input
                    type="datetime-local"
                    value={isoToDateTimeLocal(newDateIso)}
                    onChange={(e) => setNewDateIso(dateTimeLocalToIso(e.target.value))}
                    className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                  />
                </label>
                <label className="block space-y-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Ресторан (ввод)</span>
                  <input value={newVenue} onChange={(e) => setNewVenue(e.target.value)} className="w-full rounded-xl border border-white/60 bg-white px-3 py-2" placeholder="Введите площадку" />
                </label>
                <label className="block space-y-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Ссылка карты (ввод)</span>
                  <input value={newMapUrl} onChange={(e) => setNewMapUrl(e.target.value)} className="w-full rounded-xl border border-white/60 bg-white px-3 py-2" placeholder="Вставьте ссылку" />
                </label>
                <label className="block space-y-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Тема (выбор)</span>
                  <select value={newTheme} onChange={(e) => setNewTheme(e.target.value as CmsThemeKey)} className="w-full rounded-xl border border-ink/25 bg-white px-3 py-2">
                    {cmsThemeOptions.map((theme) => (
                      <option key={theme.key} value={theme.key}>
                        {theme.name}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="submit" className="w-full rounded-full bg-ink px-4 py-3 text-xs uppercase tracking-[0.24em] text-white">
                  Создать
                </button>
              </form>
            </section>

            <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur-xl">
              <h2 className="font-display text-2xl text-ink">Страницы</h2>
              <div className="mt-4 space-y-2">
                {pages.map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(page.id)
                      void loadPage(page.id)
                    }}
                    className={`w-full rounded-xl border px-3 py-2 text-left ${
                      selectedId === page.id
                        ? 'border-ink/40 bg-ink/5'
                        : 'border-white/60 bg-white/70'
                    }`}
                  >
                    <p className="text-sm font-semibold text-ink">{page.name}</p>
                    <p className="text-xs text-ink/65">/{page.slug}</p>
                    <p className="mt-1 text-[11px] text-ink/50">
                      {page.isDefault ? 'Default' : 'Secondary'} · {page.themeKey}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl text-ink">Редактор страницы</h2>
              <button
                type="button"
                onClick={() => setIsPreviewEnabled((prev) => !prev)}
                className="rounded-full border border-ink/30 bg-white px-4 py-2 text-xs uppercase tracking-[0.24em] text-ink"
              >
                {isPreviewEnabled ? 'Режим: preview вкл' : 'Режим: preview выкл'}
              </button>
            </div>

            {!selectedSummary ? (
              <p className="mt-4 text-sm text-ink/70">Создайте или выберите страницу</p>
            ) : (
              <div className="mt-4 space-y-4">
                {!selectedPage ? (
                  <button
                    type="button"
                    onClick={() => void loadPage(selectedSummary.id)}
                    className="rounded-full bg-ink px-4 py-2 text-xs uppercase tracking-[0.24em] text-white"
                  >
                    Загрузить данные
                  </button>
                ) : (
                  <div className={isPreviewEnabled ? 'grid gap-4 xl:grid-cols-[1fr_520px]' : 'space-y-4'}>
                    <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="space-y-1">
                        <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Название (ввод)</span>
                        <input
                          value={selectedPage.name}
                          onChange={(event) => setSelectedPage({ ...selectedPage, name: event.target.value })}
                          className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                        />
                      </label>
                      <label className="space-y-1">
                        <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Slug (ввод)</span>
                        <input
                          value={selectedPage.slug}
                          onChange={(event) => setSelectedPage({ ...selectedPage, slug: event.target.value })}
                          className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                        />
                      </label>
                    </div>

                    <label className="space-y-1 block">
                      <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Тема (выбор)</span>
                      <select
                        value={selectedPage.themeKey}
                        onChange={(event) =>
                          setSelectedPage({ ...selectedPage, themeKey: event.target.value as CmsThemeKey })
                        }
                        className="w-full rounded-xl border border-ink/25 bg-white px-3 py-2"
                      >
                        {cmsThemeOptions.map((theme) => (
                          <option key={theme.key} value={theme.key}>
                            {theme.name} — {theme.description}
                          </option>
                        ))}
                      </select>
                    </label>

                    <section className="space-y-3 rounded-2xl border border-white/60 bg-white/70 p-4">
                      <h3 className="font-display text-xl text-ink">Дизайн: шрифты, иконки, анимации</h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="space-y-1">
                          <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Заголовочный шрифт (выбор)</span>
                          <select
                            value={selectedPage.content.design.headingFont}
                            onChange={(event) =>
                              updateSelectedContent((content) => ({
                                ...content,
                                design: {
                                  ...content.design,
                                  headingFont: event.target.value as CmsHeadingFont,
                                },
                              }))
                            }
                            className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                          >
                            <option value="display">Display (праздничный)</option>
                            <option value="serif">Serif (классический)</option>
                            <option value="sans">Sans (современный)</option>
                          </select>
                        </label>
                        <label className="space-y-1">
                          <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Основной шрифт (выбор)</span>
                          <select
                            value={selectedPage.content.design.bodyFont}
                            onChange={(event) =>
                              updateSelectedContent((content) => ({
                                ...content,
                                design: {
                                  ...content.design,
                                  bodyFont: event.target.value as CmsBodyFont,
                                },
                              }))
                            }
                            className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                          >
                            <option value="sans">Sans</option>
                            <option value="serif">Serif</option>
                            <option value="display">Display</option>
                          </select>
                        </label>
                        <label className="space-y-1">
                          <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Стиль иконок (выбор)</span>
                          <select
                            value={selectedPage.content.design.iconStyle}
                            onChange={(event) =>
                              updateSelectedContent((content) => ({
                                ...content,
                                design: {
                                  ...content.design,
                                  iconStyle: event.target.value as CmsIconStyle,
                                  sectionIcons: {
                                    hero: iconGlyphByStyle(event.target.value as CmsIconStyle),
                                    venue: content.design.sectionIcons.venue,
                                    timeline: content.design.sectionIcons.timeline,
                                    countdown: iconGlyphByStyle(event.target.value as CmsIconStyle),
                                  },
                                },
                              }))
                            }
                            className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                          >
                            <option value="minimal">Minimal</option>
                            <option value="hearts">Hearts</option>
                            <option value="floral">Floral</option>
                          </select>
                        </label>
                        <div className="space-y-2 rounded-xl border border-white/60 bg-white p-3 sm:col-span-2">
                          <p className="text-xs uppercase tracking-[0.2em] text-ink/65">Иконки по секциям (выбор)</p>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {sectionIconLabels.map((sectionIcon) => (
                              <label key={sectionIcon.key} className="space-y-1">
                                <span className="text-xs text-ink/70">{sectionIcon.label}</span>
                                <select
                                  value={selectedPage.content.design.sectionIcons[sectionIcon.key]}
                                  onChange={(event) =>
                                    updateSelectedContent((content) => ({
                                      ...content,
                                      design: {
                                        ...content.design,
                                        sectionIcons: {
                                          ...content.design.sectionIcons,
                                          [sectionIcon.key]: event.target.value as CmsIconGlyph,
                                        },
                                      },
                                    }))
                                  }
                                  className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                                >
                                  {iconGlyphOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </label>
                            ))}
                          </div>
                        </div>
                        <label className="space-y-1">
                          <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Пресет анимации (выбор)</span>
                          <select
                            value={selectedPage.content.design.animationPreset}
                            onChange={(event) =>
                              updateSelectedContent((content) => ({
                                ...content,
                                design: {
                                  ...content.design,
                                  animationPreset: event.target.value as CmsAnimationPreset,
                                },
                              }))
                            }
                            className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                          >
                            <option value="soft">Soft</option>
                            <option value="cinematic">Cinematic</option>
                            <option value="none">No animation</option>
                          </select>
                        </label>
                        <label className="space-y-1">
                          <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Стиль таймлайна (выбор)</span>
                          <select
                            value={selectedPage.content.design.timelineStyle}
                            onChange={(event) =>
                              updateSelectedContent((content) => ({
                                ...content,
                                design: {
                                  ...content.design,
                                  timelineStyle: event.target.value as CmsTimelineStyle,
                                },
                              }))
                            }
                            className="w-full rounded-xl border border-ink/25 bg-white px-3 py-2"
                          >
                            <option value="classic">Classic — аккуратные карточки</option>
                            <option value="steps">Steps — ступенчатый список</option>
                            <option value="glow">Glow — светящийся стиль</option>
                          </select>
                        </label>
                      </div>
                    </section>

                    <section className="space-y-3 rounded-2xl border border-white/60 bg-white/70 p-4">
                      <h3 className="font-display text-xl text-ink">Главный блок</h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input
                          value={selectedPage.content.hero.groomName}
                          onChange={(event) =>
                            updateSelectedContent((content) => ({
                              ...content,
                              hero: { ...content.hero, groomName: event.target.value },
                              countdown: { ...content.countdown, groomName: event.target.value },
                            }))
                          }
                          className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                          placeholder="Имя жениха"
                        />
                        <input
                          value={selectedPage.content.hero.brideName}
                          onChange={(event) =>
                            updateSelectedContent((content) => ({
                              ...content,
                              hero: { ...content.hero, brideName: event.target.value },
                              countdown: { ...content.countdown, brideName: event.target.value },
                            }))
                          }
                          className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                          placeholder="Имя невесты"
                        />
                        <input
                          value={selectedPage.content.hero.weddingDay}
                          onChange={(event) =>
                            updateSelectedContent((content) => ({
                              ...content,
                              hero: { ...content.hero, weddingDay: event.target.value },
                            }))
                          }
                          className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                          placeholder="Wedding Day текст"
                        />
                        <label className="space-y-1">
                          <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Дата в Hero (выбор)</span>
                          <input
                            type="date"
                            value={isoToDateOnly(selectedPage.content.eventDateIso)}
                            onChange={(event) =>
                              updateSelectedContent((content) => ({
                                ...content,
                                eventDateIso: updateIsoDateOnly(content.eventDateIso, event.target.value),
                                hero: { ...content.hero, date: formatHeroDate(event.target.value) },
                              }))
                            }
                            className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                          />
                        </label>
                      </div>
                    </section>

                    <section className="space-y-3 rounded-2xl border border-white/60 bg-white/70 p-4">
                      <h3 className="font-display text-xl text-ink">Тексты приглашения</h3>
                      <input
                        value={selectedPage.content.invitation.eyebrow}
                        onChange={(event) =>
                          updateSelectedContent((content) => ({
                            ...content,
                            invitation: { ...content.invitation, eyebrow: event.target.value },
                          }))
                        }
                        className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                        placeholder="Eyebrow"
                      />
                      <input
                        value={selectedPage.content.invitation.title}
                        onChange={(event) =>
                          updateSelectedContent((content) => ({
                            ...content,
                            invitation: { ...content.invitation, title: event.target.value },
                          }))
                        }
                        className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                        placeholder="Заголовок"
                      />
                      {selectedPage.content.invitation.paragraphs.map((paragraph, index) => (
                        <textarea
                          key={`paragraph-${index}`}
                          value={paragraph}
                          onChange={(event) =>
                            updateSelectedContent((content) => {
                              const next = [...content.invitation.paragraphs]
                              next[index] = event.target.value

                              return {
                                ...content,
                                invitation: { ...content.invitation, paragraphs: next },
                              }
                            })
                          }
                          rows={3}
                          className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                          placeholder={`Параграф ${index + 1}`}
                        />
                      ))}
                    </section>

                    <section className="space-y-3 rounded-2xl border border-white/60 bg-white/70 p-4">
                      <h3 className="font-display text-xl text-ink">Событие и локация</h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="space-y-1">
                          <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Дата и время (выбор)</span>
                          <input
                            type="datetime-local"
                            value={isoToDateTimeLocal(selectedPage.content.eventDateIso)}
                            onChange={(event) =>
                              updateSelectedContent((content) => ({
                                ...content,
                                eventDateIso: dateTimeLocalToIso(event.target.value),
                              }))
                            }
                            className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                          />
                        </label>
                        <label className="space-y-1">
                          <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Ресторан (ввод)</span>
                          <input
                            value={selectedPage.content.venue.name}
                            onChange={(event) =>
                              updateSelectedContent((content) => ({
                                ...content,
                                venue: { ...content.venue, name: event.target.value },
                              }))
                            }
                            className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                            placeholder="Введите площадку"
                          />
                        </label>
                        <label className="space-y-1 sm:col-span-2">
                          <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Адрес (ввод)</span>
                          <input
                            value={selectedPage.content.venue.address}
                            onChange={(event) =>
                              updateSelectedContent((content) => ({
                                ...content,
                                venue: { ...content.venue, address: event.target.value },
                              }))
                            }
                            className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                            placeholder="Введите адрес"
                          />
                        </label>
                        <label className="space-y-1 sm:col-span-2">
                          <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Ссылка карты (ввод)</span>
                          <input
                            value={selectedPage.content.venue.mapUrl}
                            onChange={(event) =>
                              updateSelectedContent((content) => ({
                                ...content,
                                venue: { ...content.venue, mapUrl: event.target.value },
                              }))
                            }
                            className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                            placeholder="Вставьте ссылку"
                          />
                        </label>
                      </div>
                    </section>

                    <section className="space-y-3 rounded-2xl border border-white/60 bg-white/70 p-4">
                      <h3 className="font-display text-xl text-ink">Таймлайн</h3>
                      {selectedPage.content.timeline.items.map((item, index) => (
                        <div key={`timeline-${index}`} className="grid gap-2 sm:grid-cols-[120px_1fr_170px_auto]">
                          <label className="space-y-1">
                            <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Время (выбор)</span>
                            <input
                              type="time"
                              value={item.time}
                              onChange={(event) =>
                                updateSelectedContent((content) => {
                                  const items = [...content.timeline.items]
                                  items[index] = { ...items[index], time: event.target.value }

                                  return {
                                    ...content,
                                    timeline: { ...content.timeline, items },
                                  }
                                })
                              }
                              className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                            />
                          </label>
                          <label className="space-y-1">
                            <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Событие (ввод)</span>
                            <input
                              value={item.title}
                              onChange={(event) =>
                                updateSelectedContent((content) => {
                                  const items = [...content.timeline.items]
                                  items[index] = { ...items[index], title: event.target.value }

                                  return {
                                    ...content,
                                    timeline: { ...content.timeline, items },
                                  }
                                })
                              }
                              className="w-full rounded-xl border border-white/60 bg-white px-3 py-2"
                              placeholder="Название этапа"
                            />
                          </label>
                          <label className="space-y-1">
                            <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Иконка (выбор)</span>
                            <select
                              value={item.icon ?? selectedPage.content.design.sectionIcons.timeline}
                              onChange={(event) =>
                                updateSelectedContent((content) => {
                                  const items = [...content.timeline.items]
                                  items[index] = { ...items[index], icon: event.target.value as CmsIconGlyph }

                                  return {
                                    ...content,
                                    timeline: { ...content.timeline, items },
                                  }
                                })
                              }
                              className="w-full rounded-xl border border-ink/25 bg-white px-3 py-2"
                            >
                              {iconGlyphOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              updateSelectedContent((content) => {
                                if (content.timeline.items.length <= 1) {
                                  return content
                                }

                                return {
                                  ...content,
                                  timeline: {
                                    ...content.timeline,
                                    items: content.timeline.items.filter((_, itemIndex) => itemIndex !== index),
                                  },
                                }
                              })
                            }
                            className="self-end rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs uppercase tracking-[0.2em] text-red-700"
                          >
                            Удалить
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          updateSelectedContent((content) => ({
                            ...content,
                            timeline: {
                              ...content.timeline,
                              items: [
                                ...content.timeline.items,
                                {
                                  time: '00:00',
                                  title: 'Новый этап',
                                  icon: content.design.sectionIcons.timeline,
                                },
                              ],
                            },
                          }))
                        }
                        className="rounded-full border border-ink/30 bg-white px-4 py-2 text-xs uppercase tracking-[0.24em] text-ink"
                      >
                        Добавить этап
                      </button>
                    </section>

                    <section className="space-y-3 rounded-2xl border border-white/60 bg-white/70 p-4">
                      <h3 className="font-display text-xl text-ink">Layout: порядок и видимость секций</h3>
                      <p className="text-xs uppercase tracking-[0.2em] text-ink/65">Перетащите секции для сортировки</p>
                      <div className="space-y-2">
                        {selectedPage.layout.sectionOrder.map((key) => (
                          <div
                            key={key}
                            draggable
                            onDragStart={() => setDraggedSection(key)}
                            onDragOver={(event) => event.preventDefault()}
                            onDrop={(event) => {
                              event.preventDefault()
                              if (draggedSection) {
                                moveSection(draggedSection, key)
                              }
                              setDraggedSection(null)
                            }}
                            onDragEnd={() => setDraggedSection(null)}
                            className={`flex cursor-move items-center justify-between rounded-xl border px-3 py-2 text-sm ${
                              draggedSection === key
                                ? 'border-ink/35 bg-ink/10'
                                : 'border-white/60 bg-white'
                            }`}
                          >
                            <span className="text-ink/80">{sectionLabels[key]}</span>
                            <span className="text-xs uppercase tracking-[0.2em] text-ink/45">drag</span>
                          </div>
                        ))}
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {sectionKeys.map((key) => {
                          const hidden = selectedPage.layout.hiddenSections.includes(key)

                          return (
                            <label key={key} className="flex items-center gap-2 rounded-xl border border-white/60 bg-white px-3 py-2 text-sm text-ink/80">
                              <input
                                type="checkbox"
                                checked={!hidden}
                                onChange={(event) =>
                                  updateSelectedLayout((layout) => {
                                    if (event.target.checked) {
                                      return {
                                        ...layout,
                                        hiddenSections: layout.hiddenSections.filter((section) => section !== key),
                                      }
                                    }

                                    return {
                                      ...layout,
                                      hiddenSections: [...new Set([...layout.hiddenSections, key])],
                                    }
                                  })
                                }
                              />
                              <span>{sectionLabels[key]}</span>
                            </label>
                          )
                        })}
                      </div>
                    </section>

                    <section className="space-y-3 rounded-2xl border border-white/60 bg-white/70 p-4">
                      <button
                        type="button"
                        onClick={() => setIsAdvancedOpen((prev) => !prev)}
                        className="rounded-full border border-ink/25 bg-white px-4 py-2 text-xs uppercase tracking-[0.24em] text-ink"
                      >
                        {isAdvancedOpen ? 'Скрыть расширенный JSON' : 'Показать расширенный JSON'}
                      </button>

                      {isAdvancedOpen ? (
                        <>
                          <label className="block space-y-1">
                            <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Content JSON (полный контроль)</span>
                            <textarea
                              value={contentJson}
                              onChange={(event) => setContentJson(event.target.value)}
                              rows={18}
                              className="w-full rounded-2xl border border-white/60 bg-white px-3 py-3 font-mono text-xs"
                            />
                          </label>
                          <label className="block space-y-1">
                            <span className="text-xs uppercase tracking-[0.2em] text-ink/65">Layout JSON</span>
                            <textarea
                              value={layoutJson}
                              onChange={(event) => setLayoutJson(event.target.value)}
                              rows={8}
                              className="w-full rounded-2xl border border-white/60 bg-white px-3 py-3 font-mono text-xs"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={applyAdvancedJson}
                            className="rounded-full border border-ink/25 bg-white px-5 py-2 text-xs uppercase tracking-[0.24em] text-ink"
                          >
                            Применить JSON в форму
                          </button>
                        </>
                      ) : null}
                    </section>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={savePage}
                        className="rounded-full bg-ink px-5 py-2 text-xs uppercase tracking-[0.24em] text-white"
                      >
                        Сохранить
                      </button>
                      <button
                        type="button"
                        onClick={makeDefault}
                        className="rounded-full border border-ink/30 bg-white px-5 py-2 text-xs uppercase tracking-[0.24em] text-ink"
                      >
                        Сделать дефолтной
                      </button>
                      <a
                        href={`/${selectedPage.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-ink/30 bg-white px-5 py-2 text-xs uppercase tracking-[0.24em] text-ink"
                      >
                        Открыть страницу
                      </a>
                    </div>
                    </div>

                    {isPreviewEnabled ? (
                      <aside className="rounded-2xl border border-white/60 bg-white/65 p-3 xl:sticky xl:top-4 xl:max-h-[calc(100vh-8rem)] xl:overflow-auto">
                        <p className="mb-3 text-xs uppercase tracking-[0.24em] text-ink/60">Live preview</p>
                        <div className="overflow-hidden rounded-2xl border border-white/70 bg-white shadow-soft">
                          <CmsInvitation page={selectedPage} />
                        </div>
                      </aside>
                    ) : null}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
