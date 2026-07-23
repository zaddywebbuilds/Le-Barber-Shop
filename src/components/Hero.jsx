import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ChevronDown } from 'lucide-react'
import { businessConfig } from '../data/businessConfig'
import BarberChairScene from './BarberChairScene'
import { useWebGL } from '../hooks/useWebGL'
import { asset } from '../utils/assets'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

const pillars = [
  { label: 'Précision' },
  { label: 'Savoir-faire' },
  { label: 'Expérience' },
]

export default function Hero() {
  const { use3D } = useWebGL()
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) setScrollY(-heroRef.current.getBoundingClientRect().top)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollDown = () => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="accueil"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Accueil Le Barber Shop"
      style={{ background: 'linear-gradient(160deg, #090909 0%, #151412 55%, #1E1610 100%)' }}
    >
      {/* Background hazes */}
      <div className="absolute pointer-events-none" style={{
        top: '5%', right: '0%',
        width: '60vw', height: '70vh', maxWidth: 900,
        background: 'radial-gradient(ellipse at 60% 40%, rgba(184,132,61,0.09) 0%, transparent 65%)',
        filter: 'blur(60px)',
      }} />
      <div className="absolute pointer-events-none" style={{
        bottom: '10%', left: '-5%',
        width: '40vw', height: '40vw', maxWidth: 500,
        background: 'radial-gradient(ellipse, rgba(102,31,43,0.07) 0%, transparent 70%)',
        filter: 'blur(70px)',
      }} />

      {/* Vertical brass accent line */}
      <div className="absolute left-8 top-1/4 bottom-1/4 hidden xl:block pointer-events-none" style={{
        width: 1,
        background: 'linear-gradient(180deg, transparent, rgba(184,132,61,0.3), transparent)',
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-[4fr_8fr] gap-8 lg:gap-2 items-center min-h-screen py-24">

          {/* ── Left: copy ── */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.2} className="section-eyebrow mb-8">
              COIFFEUR • BARBIER • ÉVREUX
            </motion.div>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={0.35}
              className="font-display font-light leading-none mb-4"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', letterSpacing: '-0.02em', color: 'var(--ivory)' }}
            >
              L'exigence<br />du détail.
            </motion.h1>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={0.5}
              className="font-display font-light italic leading-none mb-8"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 5rem)', letterSpacing: '-0.02em', color: 'var(--brass)' }}
            >
              Le style en héritage.
            </motion.h1>

            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={0.65}
              className="font-display text-champagne/80 mb-2"
              style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)', fontStyle: 'italic' }}
            >
              Plus qu'une coupe, une expérience.
            </motion.p>

            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={0.75}
              className="font-sans text-ivory/50 mb-10 max-w-md leading-relaxed"
              style={{ fontSize: '0.9rem' }}
            >
              Un espace pensé pour prendre soin de votre style avec précision,
              attention et caractère, au cœur d'Évreux.
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.85} className="flex flex-wrap gap-4 mb-12">
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
                <MapPin size={14} aria-hidden="true" />
                Voir l'itinéraire
              </a>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.95} className="flex flex-wrap gap-6">
              {pillars.map((p) => (
                <div key={p.label} className="flex items-center gap-2">
                  <span className="text-brass text-xs" aria-hidden="true">◆</span>
                  <span className="font-sans text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(239,217,177,0.55)' }}>
                    {p.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: video globe + rings ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.3 }}
            className="relative order-1 lg:order-2"
            style={{ height: 'clamp(520px, 90vh, 900px)' }}
            aria-hidden="true"
          >
            {/* Pulsing deep aura behind the globe */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.85, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 m-auto rounded-full pointer-events-none"
              style={{
                width: '72%', height: '72%',
                background: 'radial-gradient(circle, rgba(184,132,61,0.18) 0%, rgba(184,132,61,0.05) 45%, transparent 70%)',
                filter: 'blur(65px)',
              }}
            />

            {/* Video globe — sits behind the WebGL canvas */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative" style={{ width: 'clamp(380px, 92%, 820px)', aspectRatio: '1 / 1' }}>

                {/* Outermost slow pulse ring */}
                <motion.div
                  animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.45, 0.2] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute rounded-full pointer-events-none"
                  style={{ inset: '-24px', border: '1px solid rgba(184,132,61,0.14)' }}
                />

                {/* Inner pulse ring */}
                <motion.div
                  animate={{ scale: [1, 1.04, 1], opacity: [0.35, 0.7, 0.35] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute rounded-full pointer-events-none"
                  style={{ inset: '-10px', border: '1px solid rgba(184,132,61,0.28)', boxShadow: '0 0 30px rgba(184,132,61,0.08)' }}
                />

                {/* Orbiting light flare — clockwise */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full"
                >
                  <div style={{
                    position: 'absolute', top: '4%', left: '50%',
                    width: 6, height: 6,
                    transform: 'translateX(-50%)',
                    background: 'radial-gradient(circle, rgba(239,217,177,1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(1px)',
                    boxShadow: '0 0 10px 4px rgba(239,217,177,0.35)',
                  }} />
                </motion.div>

                {/* Counter-orbiting dim flare */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 17, repeat: Infinity, ease: 'linear', delay: 4 }}
                  className="absolute inset-0 rounded-full"
                >
                  <div style={{
                    position: 'absolute', bottom: '6%', left: '50%',
                    width: 4, height: 4,
                    transform: 'translateX(-50%)',
                    background: 'rgba(184,132,61,0.95)',
                    borderRadius: '50%',
                    filter: 'blur(1px)',
                    boxShadow: '0 0 7px 3px rgba(184,132,61,0.25)',
                  }} />
                </motion.div>

                {/* ── The video ── */}
                <div
                  className="relative w-full h-full rounded-full overflow-hidden"
                  style={{
                    border: '1px solid rgba(184,132,61,0.42)',
                    boxShadow: [
                      '0 0 0 1px rgba(184,132,61,0.09)',
                      '0 0 70px rgba(184,132,61,0.18)',
                      '0 0 140px rgba(184,132,61,0.07)',
                      'inset 0 0 90px rgba(0,0,0,0.52)',
                    ].join(', '),
                  }}
                >
                  <video
                    src={asset('heropage.mp4')}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-contain"
                  />

                  {/* Radial vignette — darkens edges for depth */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'radial-gradient(circle, transparent 38%, rgba(9,9,9,0.6) 100%)',
                  }} />

                  {/* Top brass sheen */}
                  <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{
                    height: '42%',
                    background: 'linear-gradient(to bottom, rgba(184,132,61,0.09), transparent)',
                  }} />

                  {/* Bottom shadow */}
                  <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
                    height: '30%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)',
                  }} />

                  {/* Ultra-subtle scan lines */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.022) 2px, rgba(0,0,0,0.022) 3px)',
                  }} />

                  {/* Inset brass ring glint */}
                  <div className="absolute inset-0 rounded-full pointer-events-none" style={{
                    boxShadow: 'inset 0 1px 0 rgba(184,132,61,0.35), inset 0 -1px 0 rgba(0,0,0,0.5)',
                  }} />
                </div>

                {/* Location tag below globe */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.9 }}
                  className="absolute left-0 right-0 flex items-center justify-center gap-3"
                  style={{ bottom: '-36px' }}
                >
                  <div style={{ height: 1, width: 24, background: 'linear-gradient(to right, transparent, rgba(184,132,61,0.4))' }} />
                  <span className="font-sans text-xs tracking-[0.24em] uppercase" style={{ color: 'rgba(184,132,61,0.45)' }}>
                    Évreux · Normandie
                  </span>
                  <div style={{ height: 1, width: 24, background: 'linear-gradient(to left, transparent, rgba(184,132,61,0.4))' }} />
                </motion.div>
              </div>
            </div>

            {/* WebGL brass rings — rendered on top of video, transparent canvas bg */}
            <BarberChairScene scrollY={scrollY} use3D={use3D} />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
        aria-label="Faire défiler vers le bas"
        style={{ zIndex: 20 }}
      >
        <span className="font-sans text-xs tracking-[0.2em] uppercase group-hover:text-brass transition-colors" style={{ color: 'rgba(245,240,232,0.28)' }}>
          Découvrir
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={16} style={{ color: 'rgba(184,132,61,0.55)' }} aria-hidden="true" />
        </motion.div>
      </motion.button>

      {/* Bottom section fade */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
        height: 130,
        background: 'linear-gradient(to bottom, transparent, #090909)',
      }} />
    </section>
  )
}
