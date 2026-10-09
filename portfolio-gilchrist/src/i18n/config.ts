
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Imports des traductions FR
import frCommon from './locales/fr/common.json'
import frHero from './locales/fr/hero.json'
import frAbout from './locales/fr/about.json'
import frSkills from './locales/fr/skills.json'
import frProjects from './locales/fr/projects.json'
import frExperience from './locales/fr/experience.json'
import frContact from './locales/fr/contact.json'

// Imports des traductions EN
import enCommon from './locales/en/common.json'
import enHero from './locales/en/hero.json'
import enAbout from './locales/en/about.json'
import enSkills from './locales/en/skills.json'
import enProjects from './locales/en/projects.json'
import enExperience from './locales/en/experience.json'
import enContact from './locales/en/contact.json'

/**
 * Clé localStorage utilisée pour mémoriser la langue choisie.
 */
const LANG_STORAGE_KEY = 'lang'

/**
 * Récupère la langue initiale : localStorage > français par défaut.
 */
const getInitialLanguage = (): string => {
  if (typeof window === 'undefined') return 'fr'
  const stored = window.localStorage.getItem(LANG_STORAGE_KEY)
  return stored ?? 'fr'
}

// Initialisation d'i18next avec le plugin React
void i18n.use(initReactI18next).init({
  // Langue au démarrage
  lng: getInitialLanguage(),
  // Langue de repli si une clé est introuvable
  fallbackLng: 'fr',
  // Autorise les clés imbriquées (tableaux inclus)
  returnObjects: true,

  // Ressources : deux langues (fr, en) avec 7 namespaces chacune
  resources: {
    fr: {
      common: frCommon,
      hero: frHero,
      about: frAbout,
      skills: frSkills,
      projects: frProjects,
      experience: frExperience,
      contact: frContact,
    },
    en: {
      common: enCommon,
      hero: enHero,
      about: enAbout,
      skills: enSkills,
      projects: enProjects,
      experience: enExperience,
      contact: enContact,
    },
  },

  // Réagit aux changements de langue
  interpolation: {
    escapeValue: false, // React échappe déjà les valeurs
  },
})

// Persistance de la langue
i18n.on('languageChanged', (lng: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(LANG_STORAGE_KEY, lng)
  }
})

export default i18n
