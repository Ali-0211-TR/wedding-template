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
      className={`relative w-full ${compact ? 'py-3 sm:py-5' : 'min-h-[100svh] flex items-center justify-center'}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      {children}
    </motion.section>
  )
}
