
import type { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

/** Props du composant Layout */
interface LayoutProps {
  /** Contenu central du portfolio (les sections) */
  readonly children: ReactNode
}

/**
 * Composant Layout — structure de page standard.
 */
export const Layout = ({ children }: LayoutProps): ReactNode => {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Barre de navigation fixe */}
      <Navbar />

      {/* Contenu principal (les sections) */}
      <main className="flex-1">{children}</main>

      {/* Pied de page */}
      <Footer />
    </div>
  )
}
