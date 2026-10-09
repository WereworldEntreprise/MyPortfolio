
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useProjectsController } from '../../controllers/useProjectsController'
import type { ProjectFilter } from '../../controllers/useProjectsController'
import { SectionTitle } from '../../components/ui/SectionTitle'
import { ProjectCard } from '../../components/shared/ProjectCard'

/** Liste des boutons de filtre (clé i18n + valeur) */
const FILTERS: readonly { key: string; value: ProjectFilter }[] = [
  { key: 'filters.all', value: 'all' },
  { key: 'filters.academic', value: 'academic' },
  { key: 'filters.personal', value: 'personal' },
  { key: 'filters.internship', value: 'internship' },
] as const

/**
 * Composant Projects — galerie filtrable des projets.
 */
export const Projects = (): React.ReactNode => {
  const { t } = useTranslation('projects')
  const { filter, projects, setFilter } = useProjectsController()

  return (
    <section id="projects" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        {/* Filtres */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((f) => (
            <motion.button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={
                'rounded-full px-4 py-2 text-sm font-medium transition-colors ' +
                (filter === f.value
                  ? 'bg-accent text-white shadow-lg shadow-accent/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700')
              }
            >
              {t(f.key)}
            </motion.button>
          ))}
        </div>

        {/* Grille de projets */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Aucun projet */}
        {projects.length === 0 && (
          <p className="mt-12 text-center text-gray-400">—</p>
        )}
      </div>
    </section>
  )
}
