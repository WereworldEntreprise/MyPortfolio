// ============================================================
// FICHIER : src/sections/Skills/Skills.tsx
// RÔLE    : Couche VIEW — Section Compétences (refonte).
//           Layout en 2 super-catégories, chacune contenant
//           des sous-sections de SkillCard (logo + lien doc).
// ============================================================

import { motion } from 'framer-motion'
import { Code2, Wrench } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SKILLS } from '../../core/constants/skills'
import type { SkillSuperCategory } from '../../core/types/Skill'
import { SectionTitle } from '../../components/ui/SectionTitle'
import { SkillCard } from '../../components/shared/SkillCard'

/** Icône associée à chaque super-catégorie */
const SUPER_CATEGORY_ICONS: Record<SkillSuperCategory, React.ReactNode> = {
  languages: <Code2 size={22} />,
  'frameworks-tools': <Wrench size={22} />,
}

/** Ordre d'affichage des super-catégories */
const SUPER_CATEGORIES: readonly SkillSuperCategory[] = [
  'languages',
  'frameworks-tools',
]

/**
 * Composant Skills — grille des compétences par super-catégorie.
 */
export const Skills = (): React.ReactNode => {
  const { t } = useTranslation('skills')

  return (
    <section
      id="skills"
      className="bg-gray-50 px-6 py-24 dark:bg-gray-900/30 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        <div className="space-y-16">
          {/* Super-catégories */}
          {SUPER_CATEGORIES.map((superCat, superIndex) => {
            // On ne garde que les groupes de cette super-catégorie
            const groups = SKILLS.filter(
              (group) => group.superCategory === superCat,
            )

            return (
              <motion.div
                key={superCat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: superIndex * 0.1 }}
              >
                {/* En-tête de super-catégorie */}
                <div className="mb-8 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    {SUPER_CATEGORY_ICONS[superCat]}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t(`superCategories.${superCat}`)}
                  </h3>
                </div>

                {/* Sous-sections de cette super-catégorie */}
                <div className="space-y-8">
                  {groups.map((group) => (
                    <div key={group.id}>
                      {/* Libellé de la sous-section */}
                      <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {t(`categories.${group.id}`)}
                      </p>

                      {/* Grille de SkillCard */}
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {group.skills.map((skill) => (
                          <SkillCard key={skill.name} skill={skill} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
