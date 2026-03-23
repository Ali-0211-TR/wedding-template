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

function MusicIcon({ playing }: { playing: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      {playing ? (
        <>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" fill="currentColor" />
          <circle cx="18" cy="16" r="3" fill="currentColor" />
        </>
      ) : (
        <>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
          <line x1="1" y1="1" x2="23" y2="23" strokeWidth={2.5} />
        </>
      )}
    </svg>
  )
}

export function TopControls({
  language,
  isMusicOn,
  musicLabel,
  onLanguageChange,
  onMusicToggle,
}: TopControlsProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 py-2.5 sm:px-5 sm:py-3.5">
      <div className="mx-auto flex max-w-2xl justify-end gap-2">
        {/* Language switcher */}
        <motion.div
          className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/40 bg-white/50 px-1 py-1 shadow-soft backdrop-blur-xl"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {languages.map((opt) => {
            const active = opt.value === language
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onLanguageChange(opt.value)}
                className={`rounded-full px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.18em] transition-all duration-300 ${
                  active
                    ? 'bg-ink text-white shadow-md'
                    : 'text-ink/60 hover:bg-white/60 hover:text-ink'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </motion.div>

        {/* Music button */}
        <motion.button
          type="button"
          className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-white/40 bg-white/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink shadow-soft backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 sm:px-3.5 sm:text-[11px]"
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.5 }}
          onClick={onMusicToggle}
          aria-pressed={isMusicOn}
        >
          <MusicIcon playing={isMusicOn} />
          <span className="hidden min-[360px]:inline">{musicLabel}</span>
        </motion.button>
      </div>
    </div>
  )
}
