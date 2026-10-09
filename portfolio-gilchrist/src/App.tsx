
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Layout } from './components/layout/Layout'
import { Hero } from './sections/Hero/Hero'
import { About } from './sections/About/About'
import { Skills } from './sections/Skills/Skills'
import { Projects } from './sections/Projects/Projects'
import { Experience } from './sections/Experience/Experience'
import { Contact } from './sections/Contact/Contact'
import { ProjectDetail } from './sections/Projects/ProjectDetail'
import { PROJECTS } from './core/constants/projects'
import { Preloader } from './components/shared/Preloader'

const App = (): React.ReactNode => {
  const [pathname, setPathname] = useState(window.location.pathname)
  const [isLoading, setIsLoading] = useState<boolean>(
    () => window.sessionStorage.getItem('preloader-shown') !== 'true',
  )

  useEffect(() => {
    const syncPathname = (): void => setPathname(window.location.pathname)
    window.addEventListener('popstate', syncPathname)
    return () => window.removeEventListener('popstate', syncPathname)
  }, [])

  const projectId = pathname.match(/^\/projects\/([^/]+)$/)?.[1]
  const project = PROJECTS.find((item) => item.id === projectId)

  useEffect(() => {
    if (!isLoading) return undefined
    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem('preloader-shown', 'true')
      setIsLoading(false)
    }, 2000)
    return () => window.clearTimeout(timer)
  }, [isLoading])

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Preloader key="preloader" />
      ) : (
        <main key="portfolio">
          <Layout>
            {project !== undefined ? (
              <ProjectDetail project={project} />
            ) : (
              <>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
              </>
            )}
          </Layout>
        </main>
      )}
    </AnimatePresence>
  )
}

export default App
