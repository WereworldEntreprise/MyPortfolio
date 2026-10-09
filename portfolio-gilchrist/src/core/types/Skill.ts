// ============================================================
// FICHIER : src/core/types/Skill.ts
// RÔLE    : Couche MODEL — Interface TypeScript décrivant
//           une compétence technique (logo + lien documentation).
// ============================================================

/**
 * Sous-catégories techniques d'une compétence.
 * Utilisées pour le regroupement visuel dans la section Skills.
 */
export type SkillCategory =
  | 'web'        // Langages web (HTML, CSS, JS, TS, PHP)
  | 'data-it'    // Langages data & système (Python, Java, C, C++, SQL)
  | 'framework'  // Frameworks frontend/backend
  | 'data-bi'    // Data & Business Intelligence
  | 'devops'     // DevOps & outils

/**
 * Grande catégorie de niveau 1 (super-catégorie).
 * Chaque SkillCategory est rattachée à une super-catégorie.
 */
export type SkillSuperCategory = 'languages' | 'frameworks-tools'

/**
 * Interface décrivant une compétence individuelle.
 * Plus de barre de niveau ni de pourcentage : logo + lien doc.
 */
export interface Skill {
  /** Nom affiché (ex : "React") */
  readonly name: string
  /** URL du logo officiel (cdn.simpleicons.org) */
  readonly logo: string
  /** Lien vers la documentation officielle */
  readonly docUrl: string
  /** Sous-catégorie technique */
  readonly category: SkillCategory
}

/**
 * Interface décrivant un groupe de compétences (une sous-catégorie).
 */
export interface SkillGroup {
  /** Identifiant de la sous-catégorie (clé i18n) */
  readonly id: SkillCategory
  /** Super-catégorie de rattachement */
  readonly superCategory: SkillSuperCategory
  /** Liste des compétences de cette sous-catégorie */
  readonly skills: readonly Skill[]
}
