// ============================================================
// FICHIER : src/core/types/Project.ts
// RÔLE    : Couche MODEL — Interface TypeScript décrivant
//           la structure d'un projet affiché dans le portfolio.
// RÈGLE   : TypeScript strict, zéro 'any'.
// ============================================================

/**
 * Catégories possibles d'un projet.
 * Utilisées pour le système de filtre dans la section Projects.
 */
export type ProjectCategory = 'academic' | 'personal' | 'internship'

/**
 * Noms d'icônes lucide-react utilisées pour représenter les projets.
 * (Plus d'emoji : on utilise des icônes vectorielles.)
 */
export type ProjectIcon =
  | 'Pill'
  | 'Search'
  | 'Dna'
  | 'Thermometer'
  | 'Cpu'
  | 'Code'
  | 'Rocket'

/**
 * Interface décrivant un projet.
 */
export interface Project {
  /** Identifiant unique (slug) — utilisé comme clé React et pour i18n */
  readonly id: string
  /** Catégorie du projet (filtre Académique / Personnel / Stage) */
  readonly category: ProjectCategory
  /** Technologies utilisées (affichées sous forme de badges) */
  readonly stack: readonly string[]
  /** Lien vers le dépôt GitHub du projet (si public) */
  readonly githubUrl?: string
  /** Lien vers une démo en ligne (optionnel) */
  readonly liveUrl?: string
  /** Année de réalisation */
  readonly year: number
  /** Nom de l'icône lucide-react représentant le projet */
  readonly icon: ProjectIcon
}
