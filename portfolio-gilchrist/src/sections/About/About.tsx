
import { motion } from 'framer-motion'
import { GraduationCap, Target, Heart, Languages as LangIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../../components/ui/SectionTitle'
import { Card } from '../../components/ui/Card'

// Données statiques des formations (clés i18n)
const EDUCATION_KEYS = ['cesi', 'supmti', 'bac'] as const

/**
 * Composant About — présentation détaillée du parcours.
 */
export const About = (): React.ReactNode => {
  const { t } = useTranslation('about')

  // Récupération des ambitions et intérêts (tableaux / objets via returnObjects)
  const ambitions = t('ambitions.items', { returnObjects: true }) as string[]
  const interests = ['science', 'sport', 'curiosity'] as const

  return (
    <section id="about" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Colonne gauche */}
          <div className="space-y-6">
            {/* Carte profil */}
            <Card className="p-6">
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                {t('profile')}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {t('description')}
              </p>
            </Card>

            {/* Carte ambitions */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Target className="text-accent" size={20} />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {t('ambitions.title')}
                </h3>
              </div>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {ambitions.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Colonne droite */}
          <div className="space-y-6">
            {/* Carte formation */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <GraduationCap className="text-accent" size={20} />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {t('education.title')}
                </h3>
              </div>
              <div className="space-y-4 border-l-2 border-gray-200 pl-4 dark:border-gray-800">
                {EDUCATION_KEYS.map((key) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {/* Point sur la timeline */}
                    <span className="absolute -left-[21px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-white dark:bg-gray-950" />
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {t(`education.items.${key}.degree`)}
                    </p>
                    <p className="text-sm text-accent">
                      {t(`education.items.${key}.school`)}
                      {t(`education.items.${key}.location`) !== '' &&
                        ` · ${t(`education.items.${key}.location`)}`}
                    </p>
                    <p className="text-xs text-gray-400">
                      {t(`education.items.${key}.period`)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Carte centres d'intérêt */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Heart className="text-accent" size={20} />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {t('interests.title')}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {interests.map((key) => (
                  <div
                    key={key}
                    className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800/50"
                  >
                    <p className="text-sm font-semibold text-accent">
                      {t(`interests.${key}.label`)}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {t(`interests.${key}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Carte langues */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <LangIcon className="text-accent" size={20} />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {t('languages.title')}
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-accent/10 px-4 py-1.5 text-sm text-accent">
                  {t('languages.french')}
                </span>
                <span className="rounded-full bg-accent/10 px-4 py-1.5 text-sm text-accent">
                  {t('languages.english')}
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
