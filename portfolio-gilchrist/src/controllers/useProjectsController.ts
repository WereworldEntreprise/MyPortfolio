

import { useMemo, useState } from 'react'
import { PROJECTS } from '../core/constants/projects'
import type { Project, ProjectCategory } from '../core/types/Project'

/** Type du filtre : 'all' ou une catégorie spécifique */
export type ProjectFilter = 'all' | ProjectCategory
export const useProjectsController = () => {
  // Filtre actif ('all' par défaut = tous les projets)
  const [filter, setFilter] = useState<ProjectFilter>('all')

  const filteredProjects = useMemo<readonly Project[]>(() => {
    if (filter === 'all') return PROJECTS
    return PROJECTS.filter((project) => project.category === filter)
  }, [filter])

  return {
    /** Filtre actuellement sélectionné */
    filter,
    /** Liste filtrée des projets */
    projects: filteredProjects,
    /** Change le filtre actif */
    setFilter,
  } as const
}
