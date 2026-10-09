
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Props du composant SectionTitle */
interface SectionTitleProps {
  /** Titre principal */
  readonly title: string
  /** Sous-titre (optionnel) */
  readonly subtitle?: string
  /** Contenu additionnel à droite (optionnel) */
  readonly action?: ReactNode
}

/**
 * Composant SectionTitle — en-tête de section standardisé.
 * Animation fade + slide au scroll.
 */
export const SectionTitle = ({
  title,
  subtitle,
  action,
}: SectionTitleProps): ReactNode => {
  return (
    <div className="mb-12 flex flex-col items-center text-center md:mb-16">
      {/* Petit accent décoratif au-dessus du titre */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-4 h-1 w-20 rounded-full bg-gradient-to-r from-accent to-accent-light"
      />

      {/* Titre principal */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-900 dark:text-white md:text-5xl"
      >
        {title}
      </motion.h2>

      {/* Sous-titre optionnel */}
      {subtitle !== undefined && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-gray-600 dark:text-gray-400 md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Zone d'action (filtres, bouton, etc.) */}
      {action !== undefined && <div className="mt-6">{action}</div>}
    </div>
  )
}
