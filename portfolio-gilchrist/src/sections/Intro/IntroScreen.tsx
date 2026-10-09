
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { Rocket } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useIntroController } from '../../controllers/useIntroController'
import { RocketAnimation } from './RocketAnimation'

interface IntroScreenProps {
  readonly onDone: () => void
}

export const IntroScreen = ({ onDone }: IntroScreenProps): React.ReactNode => {
  const { phase, launch, finish } = useIntroController()
  const { t } = useTranslation('hero')

  useEffect(() => {
    if (phase === 'done') onDone()
  }, [onDone, phase])

  return (
    <>
      <AnimatePresence>
        {phase === 'idle' && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black px-6 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-sm uppercase tracking-[0.3em] text-gray-500"
            >
              {t('greeting')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 bg-gradient-to-r from-accent-light to-accent bg-clip-text text-5xl font-extrabold text-transparent md:text-7xl"
            >
              {t('name')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 max-w-md text-lg text-gray-300"
            >
              {t('tagline')}
            </motion.p>

            <motion.button
              type="button"
              onClick={launch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 font-medium text-white shadow-lg shadow-accent/30"
            >
              <Rocket size={18} /> {t('name')}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === 'launching' && (
        <RocketAnimation
          launching={phase === 'launching'}
          onAnimationComplete={finish}
        />
      )}
    </>
  )
}
