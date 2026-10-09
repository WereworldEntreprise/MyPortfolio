
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../core/hooks/useTheme'

/**
 * Composant ThemeToggle — bascule entre sombre et clair.
 */
export const ThemeToggle = (): React.ReactNode => {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation('common')

  // Label accessible selon le thème courant
  const label = theme === 'dark' ? t('theme.light') : t('theme.dark')

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1, rotate: 15 }}
      className={
        'flex h-10 w-10 items-center justify-center rounded-full ' +
        'bg-gray-100 text-gray-700 hover:bg-accent hover:text-white ' +
        'dark:bg-gray-800 dark:text-gray-300 transition-colors'
      }
    >
      {/* Affichage animé de l'icône selon le thème */}
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={20} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={20} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
