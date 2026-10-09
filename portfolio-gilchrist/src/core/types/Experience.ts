
/**
 * Interface décrivant une expérience professionnelle.
 * Affichée dans la section Experience sous forme de timeline.
 */
export interface Experience {
  /** Identifiant unique (slug) */
  readonly id: string
  /** Intitulé du poste occupé (clé i18n) */
  readonly roleKey: string
  /** Nom de l'entreprise */
  readonly company: string
  /** Localisation du poste */
  readonly location: string
  /** Date de début (format libre, ex : "Avril 2026") */
  readonly startDate: string
  /** Date de fin (format libre, ex : "Juin 2026") */
  readonly endDate: string
  /** Technologies utilisées lors de cette expérience */
  readonly stack: readonly string[]
  /** Indique s'il s'agit du poste actuel */
  readonly current?: boolean
}
