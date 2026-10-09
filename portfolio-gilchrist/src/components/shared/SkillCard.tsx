// ============================================================
// FICHIER : src/components/shared/SkillCard.tsx
// RÔLE    : Couche VIEW — Carte d'une compétence.
//           - Logo officiel (cdn.simpleicons.org)
//           - Nom de la technologie
//           - Au hover : légère élévation + border glow
//           - Clic → ouvre la documentation dans un nouvel onglet
//           Plus de barre de progression ni de pourcentage.
// ============================================================

import { motion } from 'framer-motion'
import type { Skill } from '../../core/types/Skill'

/** Props du composant SkillCard */
interface SkillCardProps {
  /** Données de la compétence à afficher */
  readonly skill: Skill
}

/**
 * Composant SkillCard — carte cliquable d'une compétence.
 * Le clic ouvre la documentation officielle.
 */
export const SkillCard = ({ skill }: SkillCardProps): React.ReactNode => {
  return (
    <motion.a
      href={skill.docUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${skill.name} — documentation`}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={
        'group flex flex-col items-center gap-2 rounded-xl border p-4 ' +
        'border-gray-200 bg-white hover:border-accent/50 hover:shadow-lg ' +
        'hover:shadow-accent/10 cursor-pointer transition-colors ' +
        'dark:border-white/10 dark:bg-gray-900 dark:hover:border-accent/50'
      }
    >
      {/* Logo officiel de la technologie */}
      <img
        src={skill.logo}
        alt={`Logo ${skill.name}`}
        width={40}
        height={40}
        loading="lazy"
        className="h-10 w-10 rounded-lg bg-white p-1 object-contain transition-transform group-hover:scale-110"
      />

      {/* Nom de la compétence */}
      <span className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
        {skill.name}
      </span>
    </motion.a>
  )
}
