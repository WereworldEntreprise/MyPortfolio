import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/** Thèmes disponibles */
export type Theme = 'light' | 'dark'

/** Clé localStorage pour la persistance du thème */
const THEME_STORAGE_KEY = 'theme'

/** Valeur exposée par le contexte de thème */
interface ThemeContextValue {
  /** Thème courant */
  readonly theme: Theme
  /** Bascule entre clair et sombre */
  readonly toggleTheme: () => void
}

// Création du contexte (valeur fournie plus tard par le provider)
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)
const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  return stored === 'light' ? 'light' : 'dark'
}

interface ThemeProviderProps {
  /** Arbre React à envelopper */
  readonly children: ReactNode
}

/**
 * Fournisseur de thème à placer en racine de l'application.
 */
export const ThemeProvider = ({ children }: ThemeProviderProps): ReactNode => {
  // État du thème courant
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // Effet : applique la classe 'dark' sur <html> + persiste
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  // Mémorisation de la valeur pour éviter des re-renders inutiles
  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useThemeContext = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext)
  if (ctx === undefined) {
    throw new Error('useThemeContext doit être utilisé dans un <ThemeProvider>')
  }
  return ctx
}
