import type { Config } from 'tailwindcss'

export default {
  content: ['./src/app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#f5d8de',
        rose: '#d998a8',
        beige: '#f5eee6',
        sage: '#b7c8b5',
        pine: '#52645d',
        ink: '#3f2f38',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
      },
      boxShadow: {
        soft: '0 18px 70px -30px rgba(101, 68, 82, 0.35)',
        bloom: '0 0 0 1px rgba(255,255,255,0.2), 0 30px 60px -24px rgba(151, 111, 123, 0.4)',
      },
      backgroundImage: {
        mesh:
          'radial-gradient(circle at top, rgba(255,255,255,0.6), transparent 42%), linear-gradient(135deg, rgba(245,216,222,0.95), rgba(245,238,230,0.82) 42%, rgba(183,200,181,0.68))',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(0, -18px, 0) scale(1.05)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.65', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
      },
      animation: {
        drift: 'drift 9s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
