
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NAV_LINKS } from '../../core/constants/routes'
import { useScrollSpy, useScrolled } from '../../core/hooks/useScrollSpy'
import { ThemeToggle } from '../shared/ThemeToggle'
import { LangToggle } from '../shared/LangToggle'

/**
 * Composant Navbar — fixe en haut de l'écran.
 */
export const Navbar = (): React.ReactNode => {
  const { t } = useTranslation('common')
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)

  // Détection de la section active pour le surlignage
  const activeSection = useScrollSpy({
    sectionIds: NAV_LINKS.map((link) => link.id),
  })

  // Détection du scroll pour activer le fond blur
  const scrolled = useScrolled(50)

  /**
   * Ferme le menu mobile lors d'un clic sur un lien.
   */
  const closeMobile = (): void => setMobileOpen(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={
        'fixed top-0 left-0 z-50 w-full transition-all duration-300 ' +
        (scrolled
          ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800'
          : 'bg-transparent')
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="#hero"
          className="text-lg font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Houvi<span className="text-accent">.</span>
        </a>

        {/* Navigation desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={
                'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ' +
                (activeSection === link.id
                  ? 'text-accent'
                  : 'text-gray-600 hover:text-accent dark:text-gray-300')
              }
            >
              {t(link.labelKey)}
              {/* Soulignement animé de la section active */}
              {activeSection === link.id && (
                <motion.span
                  layoutId="active-nav"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                />
              )}
            </a>
          ))}
        </div>

        {/* Contrôles desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <LangToggle />
          <ThemeToggle />
        </div>

        {/* Menu mobile */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={t('nav.menu')}
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 dark:text-gray-300 md:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Navigation mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={closeMobile}
                  className={
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors ' +
                    (activeSection === link.id
                      ? 'bg-accent/10 text-accent'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800')
                  }
                >
                  {t(link.labelKey)}
                </a>
              ))}
              <div className="mt-3 flex items-center gap-3">
                <LangToggle />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
