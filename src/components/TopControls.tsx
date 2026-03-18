import { motion } from 'framer-motion'
import type { Language } from '../data/content'

interface TopControlsProps {
  language: Language
  isMusicOn: boolean
  musicLabel: string
  onLanguageChange: (language: Language) => void
  onMusicToggle: () => void
}

const languages: Array<{ value: Language; label: string }> = [
  { value: 'ru', label: 'RU' },
  { value: 'uz', label: 'UZ' },
]

export function TopControls({
  language,
  isMusicOn,
  musicLabel,
  onLanguageChange,
  onMusicToggle,
}: TopControlsProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl justify-end gap-3">
        <motion.div
          className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/45 bg-white/55 px-2 py-2 shadow-soft backdrop-blur-xl"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          aria-label="Language"
        >
          {languages.map((option) => {
            const active = option.value === language
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onLanguageChange(option.value)}
                className={`rounded-full px-3 py-2 text-xs font-semibold tracking-[0.3em] transition ${
                  active
                    ? 'bg-ink text-white shadow-lg'
                    : 'bg-transparent text-ink/70 hover:bg-white/60 hover:text-ink'
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </motion.div>

        <motion.button
          type="button"
          className="pointer-events-auto rounded-full border border-white/45 bg-white/55 px-4 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-ink shadow-soft backdrop-blur-xl transition hover:-translate-y-0.5"
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.5 }}
          onClick={onMusicToggle}
          aria-pressed={isMusicOn}
        >
          {musicLabel}
        </motion.button>
      </div>
    </div>
  )
}
