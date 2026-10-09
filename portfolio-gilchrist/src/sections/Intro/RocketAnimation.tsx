import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

interface RocketAnimationProps {
  readonly launching: boolean
  readonly onAnimationComplete: () => void
}

const NOTCH_HALF_WIDTH = 7

const buildCurtainD = (p: number): string => {
  const boundary = 100 - p * 122
  const notchDepth = 9 * Math.sin(Math.PI * Math.min(1, p / 0.82))
  const left = 50 - NOTCH_HALF_WIDTH
  const right = 50 + NOTCH_HALF_WIDTH
  return `M0,${boundary} L${left},${boundary} Q50,${boundary - notchDepth} ${right},${boundary} L100,${boundary} L100,100 L0,100 Z`
}

const SMOKE = [
  { x: -14, delay: 0, scale: 2.4 },
  { x: -6, delay: 0.05, scale: 2.8 },
  { x: 0, delay: 0.02, scale: 3.2 },
  { x: 6, delay: 0.06, scale: 2.8 },
  { x: 14, delay: 0.03, scale: 2.4 },
] as const

const RocketIllustration = (): React.ReactNode => (
  <svg viewBox="0 0 180 250" width="150" height="208" fill="none" aria-hidden="true">
    <g stroke="#101010" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5">
      <path fill="#FCFCFC" d="M90 12C60 45 48 90 48 144v50h84v-50C132 90 120 45 90 12Z" />
      <path d="M58 78c21 9 43 9 64 0" />
      <path d="M63 68h54" />
      <circle cx="90" cy="105" r="24" fill="#DCE7F7" />
      <circle cx="90" cy="105" r="15" />
      <path d="m81 114 18-18M78 106l18-18M84 122l18-18" />
      <path fill="#EAEAEA" d="m48 135-32 31 13 48 31-24" />
      <path fill="#EAEAEA" d="m132 135 32 31-13 48-31-24" />
      <path d="M48 167h14M132 167h-14" />
      <path fill="#FCFCFC" d="M70 181h40v25H70z" />
      <path d="M78 181v-17M102 181v-17M90 55v-10" />
      <path d="M117 115h1M120 131h1M122 147h1" strokeWidth="7" />
      <path fill="#F97316" d="M78 206c-2 15 2 28 12 38 10-10 14-23 12-38l-12 12Z" />
      <path fill="#FDE68A" d="M86 214c-1 8 0 15 4 21 4-6 5-13 4-21l-4 5Z" strokeWidth="3" />
      <path d="M61 223c-15-7-26-4-37 7M48 236c-14-2-23 3-30 12M119 223c15-7 26-4 37 7M132 236c14-2 23 3 30 12" stroke="#D9D9D9" strokeWidth="4" />
    </g>
  </svg>
)

export const RocketAnimation = ({ launching, onAnimationComplete }: RocketAnimationProps): React.ReactNode => {
  const progress = useMotionValue(0)
  const shakeX = useMotionValue(0)

  const rocketY = useTransform(progress, [0, 1], ['0vh', '-150vh'])
  const curtainD = useTransform(progress, (p: number) => buildCurtainD(p))
  const curtainOpacity = useTransform(progress, [0, 0.82, 1], [1, 1, 0])
  const flameScale = useTransform(progress, [0, 0.06, 1], [1, 1.7, 0.8])
  const glowOpacity = useTransform(progress, [0, 0.08, 0.78, 0.9], [0, 0.9, 0.9, 0])
  const apexTop = useTransform(progress, (p: number) => `${100 - p * 122}%`)

  useEffect(() => {
    if (!launching) return
    void animate(shakeX, [0, -3, 3, -2, 2, 0], { duration: 0.35 })
    const timer = window.setTimeout(() => {
      void animate(progress, 1, {
        duration: 1.5,
        ease: [0.5, 0, 0.85, 0.15],
        onComplete: onAnimationComplete,
      })
    }, 260)
    return () => window.clearTimeout(timer)
  }, [launching, onAnimationComplete, progress, shakeX])

  return (
    <motion.div style={{ x: shakeX }} className="fixed inset-0 z-40 overflow-hidden">
      {SMOKE.map((puff, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.2, x: `${puff.x}vw` }}
          animate={{ opacity: [0, 0.55, 0], scale: puff.scale, y: '-6vh' }}
          transition={{ duration: 0.9, delay: puff.delay, ease: 'easeOut' }}
          className="absolute bottom-6 left-1/2 z-20 h-16 w-16 rounded-full bg-white/70 blur-xl"
        />
      ))}

      <motion.div
        style={{ opacity: glowOpacity, top: apexTop }}
        className="absolute left-1/2 z-20 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/60 blur-3xl"
      />

      <motion.svg
        style={{ opacity: curtainOpacity }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 z-10 h-full w-full"
      >
        <motion.path d={curtainD} fill="black" />
      </motion.svg>

      <motion.div style={{ y: rocketY }} className="absolute bottom-[6vh] left-1/2 z-30 -translate-x-1/2">
        <motion.span
          style={{ scale: flameScale }}
          className="absolute inset-x-0 -bottom-2 mx-auto block h-10 w-4 rounded-full bg-orange-400 blur-[3px]"
        />
        <div className="absolute inset-0 translate-y-6 opacity-15 blur-md">
          <RocketIllustration />
        </div>
        <div className="absolute inset-0 translate-y-12 opacity-10 blur-lg">
          <RocketIllustration />
        </div>
        <RocketIllustration />
      </motion.div>
    </motion.div>
  )
}
