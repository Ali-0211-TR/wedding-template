import type { CmsThemeKey } from './cms-types'

export interface CmsTheme {
  key: CmsThemeKey
  name: string
  description: string
  pageClassName: string
  panelClassName: string
  accentClassName: string
}

export const cmsThemes: Record<CmsThemeKey, CmsTheme> = {
  'samarkand-dawn': {
    key: 'samarkand-dawn',
    name: 'Samarkand Dawn',
    description: 'Тёплый рассвет: пудра, шампань, мягкий шалфей.',
    pageClassName: 'bg-gradient-to-b from-[#fff7fb] via-[#f7ebe2] to-[#eef6ef] text-ink',
    panelClassName: 'border border-white/55 bg-white/55 backdrop-blur-xl shadow-soft',
    accentClassName: 'text-rose',
  },
  'velvet-night': {
    key: 'velvet-night',
    name: 'Velvet Night',
    description: 'Глубокий вечер: сливовый, графит и золотой акцент.',
    pageClassName: 'bg-gradient-to-b from-[#1f1625] via-[#2a1d34] to-[#1a1a2f] text-[#f8edf2]',
    panelClassName: 'border border-white/15 bg-white/10 backdrop-blur-xl shadow-soft',
    accentClassName: 'text-[#f5c38a]',
  },
  'ivory-garden': {
    key: 'ivory-garden',
    name: 'Ivory Garden',
    description: 'Светлая классика: айвори, жемчуг и листва.',
    pageClassName: 'bg-gradient-to-b from-[#fffdf8] via-[#f5f3ee] to-[#edf4eb] text-[#44343d]',
    panelClassName: 'border border-[#ebe4d7] bg-[#fffdf8]/90 backdrop-blur-xl shadow-soft',
    accentClassName: 'text-[#a67c52]',
  },
  'silk-emerald': {
    key: 'silk-emerald',
    name: 'Silk Emerald',
    description: 'Изумруд и шёлк: контрастный премиальный стиль.',
    pageClassName: 'bg-gradient-to-b from-[#0f211f] via-[#173330] to-[#1d2722] text-[#f2f7f3]',
    panelClassName: 'border border-[#6ea18f]/35 bg-[#20443c]/45 backdrop-blur-xl shadow-soft',
    accentClassName: 'text-[#9cd6b4]',
  },
}

export const cmsThemeOptions = Object.values(cmsThemes).map((theme) => ({
  key: theme.key,
  name: theme.name,
  description: theme.description,
}))
