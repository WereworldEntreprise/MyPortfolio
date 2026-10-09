import { motion } from 'framer-motion'

export const Preloader = (): React.ReactNode => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.35 }}
    className="fixed inset-0 z-[60] flex flex-col justify-center overflow-hidden bg-black px-6"
  >
    <div className="mx-auto flex text-6xl font-extrabold tracking-tight text-white md:text-8xl">
      {['H', '.', 'G'].map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.16 }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
    <div className="absolute right-6 bottom-10 left-6 h-px overflow-hidden bg-white/20 md:right-12 md:left-12">
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
        className="h-full bg-violet-400"
      />
    </div>
  </motion.div>
)
