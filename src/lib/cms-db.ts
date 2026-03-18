import os from 'node:os'
import path from 'node:path'
import Database from 'better-sqlite3'
import { mapDirectionsUrl, translations, weddingDateIso } from '../data/content'
import type {
  CmsAnimationPreset,
  CmsBodyFont,
  CmsDesignSettings,
  CmsHeadingFont,
  CmsIconGlyph,
  CmsIconStyle,
  CmsTimelineStyle,
  CmsPage,
  CmsPageContent,
  CmsPageLayout,
  CmsPageSummary,
  CmsThemeKey,
  CreateCmsPageInput,
  UpdateCmsPageInput,
} from './cms-types'

const DB_PATH = process.env.WEDDING_DB_PATH ?? path.join(os.tmpdir(), 'wedding-invite-admin.db')

type DbInstance = Database.Database

type PageRow = {
  id: number
  name: string
  slug: string
  is_default: number
  theme_key: CmsThemeKey
  content_json: string
  layout_json: string
  created_at: string
  updated_at: string
}

declare global {
  var __weddingDb__: DbInstance | undefined
}

function defaultDesign(): CmsDesignSettings {
  return {
    headingFont: 'display',
    bodyFont: 'sans',
    iconStyle: 'minimal',
    sectionIcons: {
      hero: 'dot',
      venue: 'sparkle',
      timeline: 'ring',
      countdown: 'heart',
    },
    animationPreset: 'soft',
    timelineStyle: 'classic',
  }
}

function iconGlyphByStyle(style: CmsIconStyle): CmsIconGlyph {
  if (style === 'hearts') {
    return 'heart'
  }

  if (style === 'floral') {
    return 'flower'
  }

  return 'dot'
}

function isHeadingFont(value: unknown): value is CmsHeadingFont {
  return value === 'display' || value === 'serif' || value === 'sans'
}

function isBodyFont(value: unknown): value is CmsBodyFont {
  return value === 'sans' || value === 'serif' || value === 'display'
}

function isIconStyle(value: unknown): value is CmsIconStyle {
  return value === 'minimal' || value === 'hearts' || value === 'floral'
}

function isIconGlyph(value: unknown): value is CmsIconGlyph {
  return value === 'dot' || value === 'heart' || value === 'flower' || value === 'ring' || value === 'sparkle'
}

function normalizeTimelineItems(
  items: unknown,
  fallbackIcon: CmsIconGlyph,
  fallbackItems: CmsPageContent['timeline']['items'],
): CmsPageContent['timeline']['items'] {
  if (!Array.isArray(items)) {
    return fallbackItems.map((item) => ({
      ...item,
      icon: fallbackIcon,
    }))
  }

  return items.map((item, index) => {
    const source = (item ?? {}) as Partial<CmsPageContent['timeline']['items'][number]>
    const fallback = fallbackItems[index] ?? fallbackItems[fallbackItems.length - 1]

    return {
      time: typeof source.time === 'string' ? source.time : fallback.time,
      title: typeof source.title === 'string' ? source.title : fallback.title,
      icon: isIconGlyph(source.icon) ? source.icon : fallbackIcon,
    }
  })
}

function isAnimationPreset(value: unknown): value is CmsAnimationPreset {
  return value === 'soft' || value === 'cinematic' || value === 'none'
}

function isTimelineStyle(value: unknown): value is CmsTimelineStyle {
  return value === 'classic' || value === 'steps' || value === 'glow'
}

function normalizeContent(content: unknown): CmsPageContent {
  const fallback = defaultContent()
  const source = (content ?? {}) as Partial<CmsPageContent>
  const sourceDesign = (source.design ?? {}) as Partial<CmsDesignSettings>
  const defaultGlyph = isIconStyle(sourceDesign.iconStyle)
    ? iconGlyphByStyle(sourceDesign.iconStyle)
    : fallback.design.sectionIcons.hero
  const sourceSectionIcons = (sourceDesign.sectionIcons ?? {}) as Partial<CmsDesignSettings['sectionIcons']>

  return {
    ...fallback,
    ...source,
    design: {
      headingFont: isHeadingFont(sourceDesign.headingFont)
        ? sourceDesign.headingFont
        : fallback.design.headingFont,
      bodyFont: isBodyFont(sourceDesign.bodyFont)
        ? sourceDesign.bodyFont
        : fallback.design.bodyFont,
      iconStyle: isIconStyle(sourceDesign.iconStyle)
        ? sourceDesign.iconStyle
        : fallback.design.iconStyle,
      sectionIcons: {
        hero: isIconGlyph(sourceSectionIcons.hero)
          ? sourceSectionIcons.hero
          : defaultGlyph,
        venue: isIconGlyph(sourceSectionIcons.venue)
          ? sourceSectionIcons.venue
          : fallback.design.sectionIcons.venue,
        timeline: isIconGlyph(sourceSectionIcons.timeline)
          ? sourceSectionIcons.timeline
          : fallback.design.sectionIcons.timeline,
        countdown: isIconGlyph(sourceSectionIcons.countdown)
          ? sourceSectionIcons.countdown
          : defaultGlyph,
      },
      animationPreset: isAnimationPreset(sourceDesign.animationPreset)
        ? sourceDesign.animationPreset
        : fallback.design.animationPreset,
      timelineStyle: isTimelineStyle(sourceDesign.timelineStyle)
        ? sourceDesign.timelineStyle
        : fallback.design.timelineStyle,
    },
    hero: {
      ...fallback.hero,
      ...source.hero,
    },
    invitation: {
      ...fallback.invitation,
      ...source.invitation,
      paragraphs: source.invitation?.paragraphs ?? fallback.invitation.paragraphs,
    },
    calendar: {
      ...fallback.calendar,
      ...source.calendar,
      weekdays: source.calendar?.weekdays ?? fallback.calendar.weekdays,
    },
    venue: {
      ...fallback.venue,
      ...source.venue,
    },
    timeline: {
      ...fallback.timeline,
      ...source.timeline,
      items: normalizeTimelineItems(
        source.timeline?.items,
        isIconGlyph(sourceSectionIcons.timeline)
          ? sourceSectionIcons.timeline
          : fallback.design.sectionIcons.timeline,
        fallback.timeline.items,
      ),
    },
    dresscode: {
      ...fallback.dresscode,
      ...source.dresscode,
    },
    countdown: {
      ...fallback.countdown,
      ...source.countdown,
      units: {
        ...fallback.countdown.units,
        ...source.countdown?.units,
      },
    },
    eventDateIso: source.eventDateIso ?? fallback.eventDateIso,
  }
}

function defaultContent(): CmsPageContent {
  const ru = translations.ru

  return {
    design: defaultDesign(),
    meta: ru.meta,
    hero: ru.hero,
    invitation: ru.invitation,
    calendar: ru.calendar,
    venue: {
      ...ru.venue,
      mapUrl: mapDirectionsUrl,
    },
    timeline: ru.timeline,
    dresscode: ru.dresscode,
    countdown: ru.countdown,
    eventDateIso: weddingDateIso,
  }
}

function defaultLayout(): CmsPageLayout {
  return {
    sectionOrder: ['hero', 'invitation', 'calendar', 'venue', 'timeline', 'dresscode', 'countdown'],
    hiddenSections: [],
  }
}

function fromRow(row: PageRow): CmsPage {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    isDefault: row.is_default === 1,
    themeKey: row.theme_key,
    content: normalizeContent(JSON.parse(row.content_json)),
    layout: JSON.parse(row.layout_json),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function getDb() {
  if (!global.__weddingDb__) {
    const db = new Database(DB_PATH)
    db.pragma('journal_mode = WAL')
    db.exec(`
      CREATE TABLE IF NOT EXISTS pages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        is_default INTEGER NOT NULL DEFAULT 0,
        theme_key TEXT NOT NULL,
        content_json TEXT NOT NULL,
        layout_json TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `)

    const count = db.prepare('SELECT COUNT(*) as count FROM pages').get() as { count: number }

    if (count.count === 0) {
      const now = new Date().toISOString()
      db.prepare(
        `INSERT INTO pages (name, slug, is_default, theme_key, content_json, layout_json, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      ).run(
        'Основное приглашение',
        'default',
        1,
        'samarkand-dawn',
        JSON.stringify(defaultContent()),
        JSON.stringify(defaultLayout()),
        now,
        now,
      )
    }

    global.__weddingDb__ = db
  }

  return global.__weddingDb__
}

function normalizeSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '')
}

export function listPages(): CmsPageSummary[] {
  const db = getDb()
  const rows = db
    .prepare(
      'SELECT id, name, slug, is_default, theme_key, updated_at FROM pages ORDER BY updated_at DESC',
    )
    .all() as Array<Pick<PageRow, 'id' | 'name' | 'slug' | 'is_default' | 'theme_key' | 'updated_at'>>

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    isDefault: row.is_default === 1,
    themeKey: row.theme_key,
    updatedAt: row.updated_at,
  }))
}

export function getPageById(id: number) {
  const db = getDb()
  const row = db.prepare('SELECT * FROM pages WHERE id = ?').get(id) as PageRow | undefined
  return row ? fromRow(row) : null
}

export function getPageBySlug(slug: string) {
  const db = getDb()
  const row = db.prepare('SELECT * FROM pages WHERE slug = ?').get(slug) as PageRow | undefined
  return row ? fromRow(row) : null
}

export function getDefaultPage() {
  const db = getDb()
  const row = db.prepare('SELECT * FROM pages WHERE is_default = 1 LIMIT 1').get() as PageRow | undefined
  return row ? fromRow(row) : null
}

export function createPage(input: CreateCmsPageInput) {
  const db = getDb()
  const now = new Date().toISOString()
  const slug = normalizeSlug(input.slug)

  if (!slug) {
    throw new Error('Slug пустой или содержит недопустимые символы')
  }

  const tx = db.transaction(() => {
    if (input.isDefault) {
      db.prepare('UPDATE pages SET is_default = 0').run()
    }

    const result = db
      .prepare(
        `INSERT INTO pages (name, slug, is_default, theme_key, content_json, layout_json, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        input.name,
        slug,
        input.isDefault ? 1 : 0,
        input.themeKey,
        JSON.stringify(input.content),
        JSON.stringify(input.layout),
        now,
        now,
      )

    return Number(result.lastInsertRowid)
  })

  const id = tx()
  const page = getPageById(id)

  if (!page) {
    throw new Error('Страница не создана')
  }

  return page
}

export function updatePage(id: number, patch: UpdateCmsPageInput) {
  const db = getDb()
  const current = getPageById(id)

  if (!current) {
    throw new Error('Страница не найдена')
  }

  const slug = patch.slug ? normalizeSlug(patch.slug) : current.slug

  if (!slug) {
    throw new Error('Slug пустой или содержит недопустимые символы')
  }

  const now = new Date().toISOString()

  db.prepare(
    `UPDATE pages
     SET name = ?, slug = ?, theme_key = ?, content_json = ?, layout_json = ?, updated_at = ?
     WHERE id = ?`,
  ).run(
    patch.name ?? current.name,
    slug,
    patch.themeKey ?? current.themeKey,
    JSON.stringify(patch.content ?? current.content),
    JSON.stringify(patch.layout ?? current.layout),
    now,
    id,
  )

  const updated = getPageById(id)

  if (!updated) {
    throw new Error('Не удалось обновить страницу')
  }

  return updated
}

export function setDefaultPage(id: number) {
  const db = getDb()

  const tx = db.transaction(() => {
    db.prepare('UPDATE pages SET is_default = 0').run()
    db.prepare('UPDATE pages SET is_default = 1 WHERE id = ?').run(id)
  })

  tx()

  const page = getPageById(id)

  if (!page) {
    throw new Error('Страница не найдена')
  }

  return page
}

export function getDefaultCmsBlueprint() {
  return {
    content: defaultContent(),
    layout: defaultLayout(),
    themeKey: 'samarkand-dawn' as CmsThemeKey,
  }
}

export { DB_PATH }
