// ============================================================
// FICHIER : src/core/constants/projects.ts
// RÔLE    : Couche MODEL — Données réelles des projets de
//           HOUVI Gilchrist. Source unique de vérité pour
//           la section Projects.
// ============================================================

import type { Project } from '../types/Project'

/**
 * Liste exhaustive des projets affichés dans le portfolio.
 * Les descriptions (texte) sont gérées par i18n (clés projects.*).
 *
 * Règle pour les liens GitHub :
 *   - Le bouton GitHub ne s'affiche QUE si githubUrl est défini.
 *   - Pharmacie & Station Météo : pas (encore) de repo public.
 */
export const PROJECTS: readonly Project[] = [
  // Application Mobile de Gestion de Pharmacie
  {
    id: 'pharmacie',
    category: 'academic',
    stack: ['React Native', 'Laravel', 'MySQL'],
    year: 2025,
    icon: 'Pill',
  },

  // Plateforme de Recherche de Stage
  {
    id: 'stage-platform',
    category: 'academic',
    stack: ['PHP', 'Slim', 'Twig', 'Bootstrap', 'MySQL'],
    githubUrl: 'https://github.com/MrTyxxx/Projet-WEB',
    year: 2024,
    icon: 'Search',
  },

  // Simulation "Jeu de la Vie" de Conway
  {
    id: 'game-of-life',
    category: 'academic',
    stack: ['C++'],
    githubUrl: 'https://github.com/WereworldEntreprise/Jeu',
    year: 2024,
    icon: 'Dna',
  },

  // Station Météo Connectée
  {
    id: 'station-meteo',
    category: 'academic',
    stack: ['Arduino', 'C/C++'],
    year: 2023,
    icon: 'Thermometer',
  },
] as const
