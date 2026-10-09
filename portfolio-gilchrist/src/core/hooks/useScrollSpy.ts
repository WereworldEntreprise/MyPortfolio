
import { useEffect, useState } from 'react'

/** Options du hook */
interface UseScrollSpyOptions {
  /** Identifiants des sections à observer */
  readonly sectionIds: readonly string[]
  /** Décalage (en px) pour considérer une section active */
  readonly offset?: number
}

/**
 * Hook de scroll spy : renvoie l'id de la section active.
 *
 * @param options.sectionIds - liste des ids de sections à surveiller
 * @param options.offset    - marge supérieure (défaut 100px)
 */
export const useScrollSpy = ({
  sectionIds,
  offset = 100,
}: UseScrollSpyOptions): string => {
  // Section active courante
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    // Fonction appelée à chaque scroll
    const handleScroll = (): void => {
      const scrollPosition = window.scrollY + offset

      // Parcourt les sections pour trouver celle qui est visible
      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (element === null) continue

        const top = element.offsetTop
        const bottom = top + element.offsetHeight

        // La section est active si on se trouve entre son haut et son bas
        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSection(id)
          break
        }
      }
    }

    // Initialisation + écouteur
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Nettoyage
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeSection
}

/**
 * Hook qui indique si l'utilisateur a défilé au-delà d'un seuil.
 * Sert à rendre le fond de la navbar transparent → blur.
 *
 * @param threshold - position de scroll en px (défaut 50)
 */
export const useScrolled = (threshold = 50): boolean => {
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > threshold)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
