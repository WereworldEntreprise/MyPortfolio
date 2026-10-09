
import { motion } from 'framer-motion'
import { Code, Cpu, Dna, ExternalLink, Pill, Rocket, Search, Thermometer } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Project } from '../../core/types/Project'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { GithubIcon } from '../ui/BrandIcons'

interface ProjectCardProps {
  readonly project: Project
}

const PROJECT_ICONS = { Pill, Search, Dna, Thermometer, Cpu, Code, Rocket } as const

export const ProjectCard = ({ project }: ProjectCardProps): React.ReactNode => {
  const { t } = useTranslation('projects')

  // Récupère les textes traduits du projet (returnObjects pour le tableau highlights)
  const title = t(`items.${project.id}.title`)
  const type = t(`items.${project.id}.type`)
  const description = t(`items.${project.id}.description`)
  const highlights = t(`items.${project.id}.highlights`, { returnObjects: true }) as string[]
  const Icon = PROJECT_ICONS[project.icon]

  const openProject = (): void => {
    window.history.pushState({}, '', `/projects/${project.id}`)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <Card className="flex h-full flex-col overflow-hidden p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Icon size={24} />
        </span>
        <span className="text-sm text-gray-400">{project.year}</span>
      </div>

      <button
        type="button"
        onClick={openProject}
        className="w-fit text-left text-xl font-bold text-gray-900 transition-colors hover:text-accent dark:text-white"
      >
        {title}
      </button>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-accent">{type}</p>

      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{description}</p>

      <ul className="mt-4 space-y-1.5">
        {highlights.map((highlight, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
          >
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {highlight}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
        <button
          type="button"
          onClick={openProject}
          className="text-sm font-medium text-accent transition-colors hover:text-accent-dark"
        >
          {t('details')}
        </button>
        {project.githubUrl === undefined && (
          <span className="text-xs text-gray-400 dark:text-gray-500">{t('repositoryUnavailable')}</span>
        )}
        {(project.githubUrl !== undefined || project.liveUrl !== undefined) && (
          <div className="flex gap-3">
            {project.githubUrl !== undefined && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-accent dark:text-gray-400"
            >
              <GithubIcon width={16} height={16} /> GitHub
            </motion.a>
            )}
            {project.liveUrl !== undefined && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-accent dark:text-gray-400"
            >
              <ExternalLink size={16} /> Démo
            </motion.a>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
