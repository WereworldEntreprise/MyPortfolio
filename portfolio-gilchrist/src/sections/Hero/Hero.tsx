
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FolderGit2, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/ui/Button'
import { GithubIcon, LinkedinIcon } from '../../components/ui/BrandIcons'
import { CONTACT_INFO, SOCIAL_LINKS } from '../../core/constants/routes'

/**
 * Hook local : effet machine à écrire (typewriter).
 * @param words - liste de mots à faire défiler
 */
const useTypewriter = (words: readonly string[]): string => {
  const [index, setIndex] = useState<number>(0)
  const [subIndex, setSubIndex] = useState<number>(0)
  const [deleting, setDeleting] = useState<boolean>(false)

  useEffect(() => {
    // Si la liste est vide, on ne fait rien
    if (words.length === 0) return

    // Mot courant
    const current = words[index] ?? ''

    // Vitesse de frappe / suppression
    const speed = deleting ? 40 : 90

    const timeout = setTimeout(() => {
      if (!deleting && subIndex === current.length) {
        // Fin de frappe → pause puis suppression
        setTimeout(() => setDeleting(true), 1500)
      } else if (deleting && subIndex === 0) {
        // Fin de suppression → mot suivant
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      } else {
        // Avance / recule d'un caractère
        setSubIndex((s) => s + (deleting ? -1 : 1))
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [subIndex, deleting, index, words])

  return (words[index] ?? '').substring(0, subIndex)
}

/**
 * Composant Hero — section d'accueil du portfolio.
 */
export const Hero = (): React.ReactNode => {
  const { t } = useTranslation('hero')
  const roles = t('roles.typewriter', { returnObjects: true }) as string[]
  const typed = useTypewriter(roles)

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Halo d'arrière-plan */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Salutation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-[0.3em] text-accent"
        >
          {t('greeting')}
        </motion.p>

        {/* Nom en grand (gradient animé) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 bg-gradient-to-r from-violet-700 via-indigo-600 to-purple-700 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent dark:from-violet-400 dark:via-indigo-300 dark:to-purple-400 md:text-8xl"
        >
          {t('name')}
        </motion.h1>

        {/* Titre animé (typewriter) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 h-10 text-2xl font-semibold text-gray-700 dark:text-gray-200 md:text-3xl"
        >
          <span className="border-r-2 border-accent pr-1">{typed}</span>
        </motion.div>

        {/* Tagline / Sous-titre stack */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400"
        >
          {t('subtitle')}
        </motion.p>

        {/* Localisation + disponibilité */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} /> {t('location')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="h-2 w-2 rounded-full bg-green-500" />
            </span>
            {t('available')}
          </span>
        </motion.div>

        {/* Boutons d'action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="/cv_gilchrist.pdf" download>
            <Button variant="primary">
              <Download size={18} /> {t('buttons.downloadCv', { ns: 'common' })}
            </Button>
          </a>
          <a href="#projects">
            <Button variant="secondary">
              <FolderGit2 size={18} /> {t('buttons.viewProjects', { ns: 'common' })}
            </Button>
          </a>
        </motion.div>

        {/* Liens sociaux */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-500 transition-colors hover:text-accent dark:text-gray-400"
          >
            <GithubIcon width={22} height={22} />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-500 transition-colors hover:text-accent dark:text-gray-400"
          >
            <LinkedinIcon width={22} height={22} />
          </a>
        </motion.div>

        {/* Indicateur de contact direct (non affiché mais disponible) */}
        <span className="sr-only">{CONTACT_INFO.email}</span>
      </div>
    </section>
  )
}
