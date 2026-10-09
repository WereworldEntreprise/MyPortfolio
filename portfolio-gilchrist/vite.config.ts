
import { defineConfig } from 'vite'        // Utilitaire de configuration Vite
import react from '@vitejs/plugin-react'   // Plugin React pour Vite
import tailwindcss from '@tailwindcss/vite' // Plugin TailwindCSS v4 (nouvelle API)

// Export de la configuration Vite
export default defineConfig({
  // Liste des plugins appliqués lors du build et du dev
  plugins: [
    react(),        // Active le support JSX / Fast Refresh
    tailwindcss(),  // Injecte automatiquement les styles Tailwind
  ],
})
