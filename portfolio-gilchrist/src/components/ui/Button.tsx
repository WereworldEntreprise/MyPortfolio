
import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

/** Variantes visuelles disponibles */
type ButtonVariant = 'primary' | 'secondary' | 'ghost'

/** Props du composant Button */
interface ButtonProps extends HTMLMotionProps<'button'> {
  /** Variante de style */
  readonly variant?: ButtonVariant
  /** Contenu du bouton */
  readonly children: ReactNode
}

/**
 * Mappe une variante vers ses classes Tailwind.
 */
const getVariantClasses = (variant: ButtonVariant): string => {
  switch (variant) {
    case 'primary':
      return 'bg-accent text-white hover:bg-accent-dark shadow-lg shadow-accent/30'
    case 'secondary':
      return 'bg-transparent border border-accent text-accent hover:bg-accent/10'
    case 'ghost':
      return 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
  }
}

/**
 * Composant Button — bouton animé réutilisable.
 * Utilise Framer Motion pour l'effet tap (scale au clic).
 */
export const Button = ({
  variant = 'primary',
  children,
  className = '',
  ...rest
}: ButtonProps): ReactNode => {
  // Classes de base communes à toutes les variantes
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 ' +
    'font-medium transition-colors duration-200 cursor-pointer'

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      className={`${baseClasses} ${getVariantClasses(variant)} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
