
/**
 * Interface décrivant un lien de navigation.
 */
export interface NavLink {
  /** Identifiant de la section (cible d'ancre HTML) */
  readonly id: string
  /** Clé de traduction i18n du libellé */
  readonly labelKey: string
}

/**
 * Liste des liens de navigation principaux (one-page scroll).
 */
export const NAV_LINKS: readonly NavLink[] = [
  { id: 'experience', labelKey: 'common:nav.experience' },
  { id: 'projects',   labelKey: 'common:nav.projects' },
  { id: 'skills',     labelKey: 'common:nav.skills' },
  { id: 'contact',    labelKey: 'common:nav.contact' },
] as const

/**
 * Coordonnées de contact de Gilchrist (extraites du CV).
 */
export const CONTACT_INFO = {
  email: 'houvi.gilchristpro@gmail.com',
  phone: '+33 6 71 85 73 57',
  location: 'Reims, France',
  availability: 'Octobre 2026',
} as const

/**
 * Liens sociaux de Gilchrist.
 */
export const SOCIAL_LINKS = {
  github: 'https://github.com/gilchrist-houvi',
  linkedin: 'https://www.linkedin.com/in/gilchrist-houvi',
} as const
