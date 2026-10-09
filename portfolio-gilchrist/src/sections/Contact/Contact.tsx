
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useContactController } from '../../controllers/useContactController'
import { CONTACT_INFO, SOCIAL_LINKS } from '../../core/constants/routes'
import { SectionTitle } from '../../components/ui/SectionTitle'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { GithubIcon, LinkedinIcon } from '../../components/ui/BrandIcons'

/** Liste des infos de contact (icône + clé i18n + valeur) */
const CONTACT_ITEMS = [
  { icon: Mail, labelKey: 'info.email', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  { icon: Phone, labelKey: 'info.phone', value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}` },
  { icon: MapPin, labelKey: 'info.location', value: CONTACT_INFO.location, href: undefined },
] as const

/**
 * Composant Contact — formulaire + coordonnées.
 */
export const Contact = (): React.ReactNode => {
  const { t } = useTranslation('contact')
  const { data, errors, status, handleChange, handleSubmit } =
    useContactController()

  return (
    <section id="contact" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        <div className="grid gap-8 lg:grid-cols-5">
          {}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 lg:col-span-2"
          >
            {CONTACT_ITEMS.map((item) => {
              const Icon = item.icon
              const content = (
                <Card className="flex items-center gap-4 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      {t(item.labelKey)}
                    </p>
                    <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">
                      {item.value}
                    </p>
                  </div>
                </Card>
              )
              
              return item.href !== undefined ? (
                <a key={item.labelKey} href={item.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={item.labelKey}>{content}</div>
              )
            })}

            {/* Disponibilité */}
            <Card className="p-4">
              <p className="text-xs uppercase tracking-wide text-gray-400">
                {t('info.availability')}
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm font-medium text-green-500">
                <span className="relative flex h-2 w-2">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                </span>
                {CONTACT_INFO.availability}
              </p>
            </Card>

            {/* Liens sociaux */}
            <div className="flex gap-3 pt-2">
              <motion.a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-accent hover:text-white dark:bg-gray-800 dark:text-gray-300"
              >
                <GithubIcon width={20} height={20} />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-accent hover:text-white dark:bg-gray-800 dark:text-gray-300"
              >
                <LinkedinIcon width={20} height={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="p-6 md:p-8">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Nom */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {t('form.name.label')}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={data.name}
                    onChange={handleChange}
                    placeholder={t('form.name.placeholder')}
                    className={
                      'w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm outline-none transition-colors focus:border-accent dark:bg-gray-800/50 ' +
                      (errors.name !== undefined
                        ? 'border-red-400'
                        : 'border-gray-200 dark:border-gray-700')
                    }
                  />
                  {errors.name !== undefined && (
                    <p className="mt-1 text-xs text-red-400">{t(`form.name.${errors.name}`)}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {t('form.email.label')}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder={t('form.email.placeholder')}
                    className={
                      'w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm outline-none transition-colors focus:border-accent dark:bg-gray-800/50 ' +
                      (errors.email !== undefined
                        ? 'border-red-400'
                        : 'border-gray-200 dark:border-gray-700')
                    }
                  />
                  {errors.email !== undefined && (
                    <p className="mt-1 text-xs text-red-400">{t(`form.email.${errors.email}`)}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {t('form.message.label')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={data.message}
                    onChange={handleChange}
                    placeholder={t('form.message.placeholder')}
                    className={
                      'w-full resize-none rounded-xl border bg-gray-50 px-4 py-3 text-sm outline-none transition-colors focus:border-accent dark:bg-gray-800/50 ' +
                      (errors.message !== undefined
                        ? 'border-red-400'
                        : 'border-gray-200 dark:border-gray-700')
                    }
                  />
                  {errors.message !== undefined && (
                    <p className="mt-1 text-xs text-red-400">{t(`form.message.${errors.message}`)}</p>
                  )}
                </div>

                {/* Envoi */}
                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === 'submitting'}
                  className="w-full"
                >
                  {status === 'submitting' ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Send size={16} /> {t('common:buttons.sendMessage')}
                    </>
                  )}
                </Button>

                <input
                  type="text"
                  name="website"
                  value={data.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                {/* Succès */}
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-2 text-sm text-green-500"
                  >
                    <CheckCircle2 size={16} /> {t('form.success')}
                  </motion.p>
                )}

                {/* Erreur */}
                {status === 'error' && (
                  <p className="text-center text-sm text-red-400">{t('form.error')}</p>
                )}
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
