
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Props du composant Card */
interface CardProps {
  /** Contenu de la carte */
  readonly children: ReactNode
  /** Classes supplémentaires (optionnel) */
  readonly className?: string
}

/**
 * Composant Card — conteneur avec bordure, fond et animation au survol.
 */
export const Card = ({ children, className = '' }: CardProps): ReactNode => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={
        'rounded-2xl border border-gray-200 dark:border-gray-800 ' +
        'bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl ' +
        'hover:border-accent/40 transition-colors ' +
        className
      }
    >
      {children}
    </motion.div>
  )
}
