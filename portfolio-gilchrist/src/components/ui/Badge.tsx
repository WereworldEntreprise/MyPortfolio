
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Props du composant Badge */
interface BadgeProps {
  /** Texte du badge (ex : "React Native") */
  readonly children: ReactNode
}

/**
 * Composant Badge — petit label coloré pour une technologie.
 */
export const Badge = ({ children }: BadgeProps): ReactNode => {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ' +
        'bg-accent/10 text-accent border border-accent/20'
      }
    >
      {children}
    </motion.span>
  )
}
