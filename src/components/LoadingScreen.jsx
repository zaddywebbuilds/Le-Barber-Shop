import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setDone(true)
            onComplete?.()
          }, 400)
          return 100
        }
        return p + Math.random() * 18
      })
    }, 80)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        >
          {/* Background haze */}
          <div
            className="haze"
            style={{
              width: 400,
              height: 400,
              background: 'radial-gradient(circle, rgba(184,132,61,0.08) 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          <div className="flex flex-col items-center gap-8">
            {/* LB Monogram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative"
            >
              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0deg, rgba(184,132,61,0.6) 60deg, transparent 120deg)',
                  margin: -8,
                }}
              />
              <div
                className="relative flex items-center justify-center rounded-full"
                style={{
                  width: 96,
                  height: 96,
                  background: 'radial-gradient(circle at 40% 40%, #2A201A, #090909)',
                  border: '1px solid rgba(184,132,61,0.3)',
                  boxShadow: '0 0 40px rgba(184,132,61,0.15)',
                }}
              >
                <span
                  className="font-display font-light text-champagne tracking-widest"
                  style={{ fontSize: '2rem', letterSpacing: '0.1em' }}
                >
                  LB
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <p className="font-sans text-xs tracking-[0.25em] uppercase text-brass opacity-80">
                Le Barber Shop
              </p>
              <p className="font-sans text-xs tracking-[0.15em] uppercase text-ivory opacity-30 mt-1">
                Évreux
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-48 relative"
            >
              <div className="h-px bg-espresso overflow-hidden rounded">
                <motion.div
                  className="h-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #B8843D, #EFD9B1)',
                    boxShadow: '0 0 8px rgba(184,132,61,0.5)',
                    transition: 'width 0.1s ease',
                  }}
                />
              </div>
              <p
                className="text-center mt-3 font-sans text-xs"
                style={{ color: 'rgba(239,217,177,0.4)', letterSpacing: '0.15em' }}
              >
                {Math.round(Math.min(progress, 100))}%
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
