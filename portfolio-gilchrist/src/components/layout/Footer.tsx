
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SOCIAL_LINKS } from '../../core/constants/routes'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

/**
 * Composant Footer — pied de page en bas du portfolio.
 */
export const Footer = (): React.ReactNode => {
  const { t } = useTranslation('common')
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white py-10 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6">
        {/* Nom */}
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            Houvi Gilchrist
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('footer.tagline')}
          </p>
        </div>

        {/* Liens sociaux */}
        <div className="flex items-center gap-4">
          <motion.a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            whileHover={{ scale: 1.15, y: -2 }}
            className="text-gray-500 hover:text-accent dark:text-gray-400"
          >
            <GithubIcon width={22} height={22} />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            whileHover={{ scale: 1.15, y: -2 }}
            className="text-gray-500 hover:text-accent dark:text-gray-400"
          >
            <LinkedinIcon width={22} height={22} />
          </motion.a>
        </div>

        {/* Retour en haut */}
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.9 }}
          aria-label={t('buttons.backToTop')}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-accent hover:text-accent dark:border-gray-700 dark:text-gray-300"
        >
          <ArrowUp size={18} />
        </motion.button>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-400">
          <p>
            © {year} Houvi Gilchrist. {t('footer.rights')}
          </p>
          <p className="mt-1">{t('footer.builtWith')}</p>
        </div>
      </div>
    </footer>
  )
}
