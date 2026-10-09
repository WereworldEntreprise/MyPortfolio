
import type { Experience } from '../types/Experience'

/**
 * Liste des expériences professionnelles (timeline).
 * Triées de la plus récente à la plus ancienne.
 */
export const EXPERIENCES: readonly Experience[] = [
  // Stage développeur Web chez Hiji
  {
    id: 'hiji',
    roleKey: 'experience:hiji.role',
    company: 'Hiji',
    location: 'Paris, France',
    startDate: 'Avril 2026',
    endDate: 'Juin 2026',
    stack: ['Java', 'Angular', 'TypeScript', 'SQL', 'Docker'],
    current: false,
  },
] as const
