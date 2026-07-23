import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ChevronDown } from 'lucide-react'
import { businessConfig } from '../data/businessConfig'
import BarberChairScene from './BarberChairScene'
import { useWebGL } from '../hooks/useWebGL'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

const pillars = [
  { label: 'Précision', icon: '◈' },
  { label: 'Savoir-faire', icon: '◈' },
  { label: 'Expérience', icon: '◈' },
]

export default function Hero() {
  const { use3D } = useWebGL()
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setScrollY(-rect.top)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollDown = () => {
    const next = document.querySelector('#services')
    if (next) next.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="accueil"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Accueil Le Barber Shop"
      style={{ background: 'linear-gradient(160deg, #090909 0%, #151412 50%, #2A201A 100%)' }}
    >
      {/* Atmospheric hazes */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '10%', right: '5%',
          width: '50vw', height: '50vw', maxWidth: 700,
          background: 'radial-gradient(ellipse, rgba(184,132,61,0.07) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '5%', left: '0%',
          width: '40vw', height: '40vw', maxWidth: 500,
          background: 'radial-gradient(ellipse, rgba(102,31,43,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Vertical brass line */}
      <div
        className="absolute left-8 top-1/4 bottom-1/4 hidden xl:block pointer-events-none"
        style={{ width: 1, background: 'linear-gradient(180deg, transparent, rgba(184,132,61,0.3), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-screen py-32">

          {/* Left — Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.2}
              className="section-eyebrow mb-8"
            >
              COIFFEUR • BARBIER • ÉVREUX
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.35}
              className="font-display font-light leading-none mb-4"
              style={{
                fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                letterSpacing: '-0.02em',
                color: 'var(--ivory)',
              }}
            >
              L'exigence
              <br />
              du détail.
            </motion.h1>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.5}
              className="font-display font-light italic leading-none mb-8"
              style={{
                fontSize: 'clamp(2rem, 5.5vw, 5rem)',
                letterSpacing: '-0.02em',
                color: 'var(--brass)',
              }}
            >
              Le style en héritage.
            </motion.h1>

            {/* Supporting */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.65}
              className="font-display text-champagne/80 mb-2"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontStyle: 'italic' }}
            >
              Plus qu'une coupe, une expérience.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.75}
              className="font-sans text-ivory/50 mb-10 max-w-md leading-relaxed"
              style={{ fontSize: '0.9rem' }}
            >
              Un espace pensé pour prendre soin de votre style avec précision,
              attention et caractère, au cœur d'Évreux.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.85}
              className="flex flex-wrap gap-4 mb-12"
            >
              {businessConfig.bookingUrl ? (
                <a href={businessConfig.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Prendre rendez-vous
                </a>
              ) : (
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="btn-primary"
                >
                  Nous trouver
                </a>
              )}
              <a
                href={businessConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <MapPin size={14} />
                Voir l'itinéraire
              </a>
            </motion.div>

            {/* Reassurance pillars */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.95}
              className="flex flex-wrap gap-6"
            >
              {pillars.map((p) => (
                <div key={p.label} className="flex items-center gap-2">
                  <span className="text-brass text-xs">◆</span>
                  <span
                    className="font-sans text-xs tracking-[0.18em] uppercase"
                    style={{ color: 'rgba(239,217,177,0.55)' }}
                  >
                    {p.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D Scene */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="relative order-1 lg:order-2"
            style={{ height: 'clamp(340px, 60vh, 680px)' }}
            aria-hidden="true"
          >
            {/* Glow ring behind scene */}
            <div
              className="absolute inset-0 m-auto rounded-full pointer-events-none"
              style={{
                width: '70%', height: '70%',
                background: 'radial-gradient(circle, rgba(184,132,61,0.08) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
            />
            <BarberChairScene scrollY={scrollY} use3D={use3D} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
        aria-label="Faire défiler vers le bas"
        style={{ zIndex: 20 }}
      >
        <span
          className="font-sans text-xs tracking-[0.2em] uppercase group-hover:text-brass transition-colors"
          style={{ color: 'rgba(245,240,232,0.3)' }}
        >
          Découvrir
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} style={{ color: 'rgba(184,132,61,0.6)' }} />
        </motion.div>
      </motion.button>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 120,
          background: 'linear-gradient(to bottom, transparent, #090909)',
        }}
      />
    </section>
  )
}
