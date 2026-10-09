
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/config'         // Initialisation d'i18next (effet de bord)
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext'

// Sélection du point de montage
const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error("L'élément #root est introuvable dans index.html")
}

createRoot(rootElement).render(
  <StrictMode>
    {/* Fournisseur de thème (dark/light) */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
