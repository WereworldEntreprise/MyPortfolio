import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Project } from '../../core/types/Project'
import { Badge } from '../../components/ui/Badge'

interface ProjectDetailProps {
  readonly project: Project
}

export const ProjectDetail = ({ project }: ProjectDetailProps): React.ReactNode => {
  const { t } = useTranslation('projects')
  const highlights = t(`items.${project.id}.highlights`, { returnObjects: true }) as string[]

  return (
    <section className="min-h-screen px-6 pb-24 pt-32 md:pb-32">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => {
            window.history.pushState({}, '', '/')
            window.dispatchEvent(new PopStateEvent('popstate'))
          }}
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-accent dark:text-gray-300"
        >
          <ArrowLeft size={18} /> {t('back')}
        </button>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {t(`items.${project.id}.type`)}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-6xl">
          {t(`items.${project.id}.title`)}
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          {t(`items.${project.id}.description`)}
        </p>
        <ul className="mt-10 space-y-3">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-gray-700 dark:text-gray-200">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              {highlight}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-2">
          {project.stack.map((technology) => <Badge key={technology}>{technology}</Badge>)}
        </div>
        {project.githubUrl === undefined && (
          <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">{t('repositoryUnavailable')}</p>
        )}
      </div>
    </section>
  )
}
