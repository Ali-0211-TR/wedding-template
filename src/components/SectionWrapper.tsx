import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionWrapperProps {
  children: ReactNode
  id?: string
  compact?: boolean
}

export function SectionWrapper({ children, id, compact = false }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={`relative w-full flex items-center justify-center ${compact ? 'py-10 sm:py-14' : 'min-h-screen'}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {children}
    </motion.section>
  )
}