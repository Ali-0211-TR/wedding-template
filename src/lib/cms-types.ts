export type CmsSectionKey =
  | 'hero'
  | 'invitation'
  | 'calendar'
  | 'venue'
  | 'timeline'
  | 'dresscode'
  | 'countdown'

export type CmsThemeKey =
  | 'samarkand-dawn'
  | 'velvet-night'
  | 'ivory-garden'
  | 'silk-emerald'

export interface CmsTimelineItem {
  time: string
  title: string
  icon?: CmsIconGlyph
}

export type CmsHeadingFont = 'display' | 'serif' | 'sans'
export type CmsBodyFont = 'sans' | 'serif' | 'display'
export type CmsIconStyle = 'minimal' | 'hearts' | 'floral'
export type CmsIconGlyph = 'dot' | 'heart' | 'flower' | 'ring' | 'sparkle'
export type CmsAnimationPreset = 'soft' | 'cinematic' | 'none'
export type CmsSectionAnimationPreset = 'inherit' | 'none' | 'fade-up' | 'zoom-in' | 'slide-left' | 'slide-right'
export type CmsTimelineStyle = 'classic' | 'steps' | 'glow'
export type CmsLandingStyle = 'classic' | 'cinematic' | 'airy'

export interface CmsSectionIcons {
  hero: CmsIconGlyph
  venue: CmsIconGlyph
  timeline: CmsIconGlyph
  countdown: CmsIconGlyph
}

export type CmsSectionAnimations = Record<CmsSectionKey, CmsSectionAnimationPreset>

export interface CmsDesignSettings {
  headingFont: CmsHeadingFont
  bodyFont: CmsBodyFont
  iconStyle: CmsIconStyle
  sectionIcons: CmsSectionIcons
  animationPreset: CmsAnimationPreset
  sectionAnimations: CmsSectionAnimations
  timelineStyle: CmsTimelineStyle
  landingStyle: CmsLandingStyle
}

export interface CmsPageContent {
  design: CmsDesignSettings
  meta: {
    title: string
    description: string
  }
  hero: {
    groomName: string
    brideName: string
    weddingDay: string
    date: string
    scrollHint: string
  }
  invitation: {
    eyebrow: string
    title: string
    paragraphs: string[]
  }
  calendar: {
    eyebrow: string
    title: string
    monthName: string
    weekdays: [string, string, string, string, string, string, string]
  }
  venue: {
    eyebrow: string
    name: string
    address: string
    openMap: string
    note: string
    mapUrl: string
  }
  timeline: {
    eyebrow: string
    title: string
    items: CmsTimelineItem[]
  }
  dresscode: {
    eyebrow: string
    code: string
    wishes: string
  }
  countdown: {
    groomName: string
    brideName: string
    untilLabel: string
    completedLabel: string
    units: { days: string; hours: string; minutes: string; seconds: string }
  }
  eventDateIso: string
}

export interface CmsPageLayout {
  sectionOrder: CmsSectionKey[]
  hiddenSections: CmsSectionKey[]
}

export interface CmsPage {
  id: number
  name: string
  slug: string
  isDefault: boolean
  themeKey: CmsThemeKey
  content: CmsPageContent
  layout: CmsPageLayout
  createdAt: string
  updatedAt: string
}

export interface CmsPageSummary {
  id: number
  name: string
  slug: string
  isDefault: boolean
  themeKey: CmsThemeKey
  updatedAt: string
}

export interface CreateCmsPageInput {
  name: string
  slug: string
  themeKey: CmsThemeKey
  content: CmsPageContent
  layout: CmsPageLayout
  isDefault?: boolean
}

export interface UpdateCmsPageInput {
  name?: string
  slug?: string
  themeKey?: CmsThemeKey
  content?: CmsPageContent
  layout?: CmsPageLayout
}
