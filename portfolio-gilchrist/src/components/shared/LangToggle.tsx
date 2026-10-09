
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

/** Langues disponibles dans le toggle */
const LANGUAGES = ['fr', 'en'] as const
type Language = (typeof LANGUAGES)[number]

/**
 * Composant LangToggle — bascule entre français et anglais.
 * La langue est persistée automatiquement par i18n/config.ts.
 */
export const LangToggle = (): React.ReactNode => {
  const { i18n } = useTranslation()

  // Langue actuellement active (fallback 'fr')
  const current = (i18n.language ?? 'fr').startsWith('en') ? 'en' : 'fr'

  /**
   * Bascule vers l'autre langue.
   */
  const toggle = (): void => {
    const next: Language = current === 'fr' ? 'en' : 'fr'
    void i18n.changeLanguage(next)
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label="Changer de langue"
      whileTap={{ scale: 0.9 }}
      className={
        'relative flex items-center rounded-full px-1 py-1 text-xs font-bold ' +
        'bg-gray-100 dark:bg-gray-800'
      }
    >
      {/* Curseur animé sous la langue active */}
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="absolute h-6 w-8 rounded-full bg-accent"
        style={{ left: current === 'fr' ? '0.25rem' : '2.25rem' }}
      />

      {/* Libellés FR / EN */}
      {LANGUAGES.map((lang) => (
        <span
          key={lang}
          className={
            'relative z-10 w-8 py-0.5 text-center uppercase transition-colors ' +
            (current === lang ? 'text-white' : 'text-gray-500')
          }
        >
          {lang}
        </span>
      ))}
    </motion.button>
  )
}
