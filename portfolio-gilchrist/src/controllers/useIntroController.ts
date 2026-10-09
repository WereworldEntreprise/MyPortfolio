

import { useCallback, useState } from 'react'

/** Phase courante de l'animation d'intro */
export type IntroPhase = 'idle' | 'launching' | 'done'


export const useIntroController = () => {
  // Phase initiale (l'intro se joue toujours au premier chargement)
  const [phase, setPhase] = useState<IntroPhase>('idle')

  
  const launch = useCallback((): void => {
    setPhase('launching')
  }, [])

  const finish = useCallback((): void => {
    setPhase('done')
  }, [])


  const skip = useCallback((): void => {
    setPhase('done')
  }, [])

  return {
    /** Phase courante */
    phase,
    /** Indique si l'intro est entièrement terminée */
    isDone: phase === 'done',
    /** Lance l'animation de décollage */
    launch,
    /** Marque l'animation comme terminée */
    finish,
    /** Passe l'animation */
    skip,
  } as const
}
