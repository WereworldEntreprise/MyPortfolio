import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Badge } from '../../components/ui/Badge'
import { SectionTitle } from '../../components/ui/SectionTitle'
import { EXPERIENCES } from '../../core/constants/experiences'
import type { Experience as ExperienceItem } from '../../core/types/Experience'

interface ExperienceDetailsProps {
  readonly experience: ExperienceItem
}

const ExperienceDetails = ({ experience }: ExperienceDetailsProps): React.ReactNode => {
  const { t } = useTranslation('experience')
  const missions = t(`${experience.id}.missions`, { returnObjects: true }) as string[]

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-accent">{experience.company}</p>
          <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            {t(`${experience.id}.role`)}
          </h3>
        </div>
        <Briefcase size={22} className="text-accent" />
      </div>
      <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="inline-flex items-center gap-1.5"><MapPin size={15} />{experience.location}</span>
        <span className="inline-flex items-center gap-1.5"><Calendar size={15} />{experience.startDate} - {experience.endDate}</span>
      </div>
      <p className="mt-6 text-gray-600 dark:text-gray-300">{t(`${experience.id}.description`)}</p>
      <ul className="mt-6 space-y-3">
        {missions.map((mission) => (
          <li key={mission} className="flex gap-3 text-sm text-gray-700 dark:text-gray-200">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {mission}
          </li>
        ))}
      </ul>
      <div className="mt-7 flex flex-wrap gap-2">
        {experience.stack.map((technology) => <Badge key={technology}>{technology}</Badge>)}
      </div>
    </motion.div>
  )
}

export const Experience = (): React.ReactNode => {
  const { t } = useTranslation('experience')
  const [selectedId, setSelectedId] = useState<string>(EXPERIENCES[0]?.id ?? '')
  const selected = EXPERIENCES.find((experience) => experience.id === selectedId) ?? EXPERIENCES[0]

  if (selected === undefined) return null

  return (
    <section id="experience" className="bg-gray-50 px-6 py-24 dark:bg-gray-900/30 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />
        <div className="grid gap-8 md:grid-cols-[minmax(15rem,0.75fr)_minmax(0,1.5fr)] md:gap-14">
          <div className="space-y-2">
            {EXPERIENCES.map((experience) => {
              const isSelected = experience.id === selectedId
              return (
                <div key={experience.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setSelectedId(experience.id)}
                    onFocus={() => setSelectedId(experience.id)}
                    onClick={() => setSelectedId(experience.id)}
                    className={`w-full rounded-xl px-4 py-4 text-left transition-colors ${isSelected ? 'bg-accent text-white' : 'text-gray-700 hover:bg-white dark:text-gray-200 dark:hover:bg-gray-800'}`}
                  >
                    <span className="block text-sm font-semibold">{experience.company}</span>
                    <span className={`mt-1 block text-sm ${isSelected ? 'text-white/75' : 'text-gray-500 dark:text-gray-400'}`}>
                      {t(`${experience.id}.role`)}
                    </span>
                  </button>
                  <div className="pt-3 md:hidden">
                    <AnimatePresence initial={false}>
                      {isSelected && <ExperienceDetails experience={experience} />}
                    </AnimatePresence>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="hidden md:block">
            <AnimatePresence mode="wait">
              <ExperienceDetails key={selected.id} experience={selected} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
