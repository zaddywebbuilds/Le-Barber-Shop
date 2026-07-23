import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { businessConfig } from '../data/businessConfig'
import { MapPin } from 'lucide-react'

// Animated brass halo rings
function BrassHalo({ size, delay, duration, opacity }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        border: `1px solid rgba(184,132,61,${opacity})`,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        scale: [1, 1.06, 1],
        opacity: [opacity, opacity * 0.5, opacity],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export default function FinalCTA() {
  const [sectionRef, inView] = useInView({ threshold: 0.2 })
  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    containerRef.current.style.setProperty('--mx', x.toFixed(3))
    containerRef.current.style.setProperty('--my', y.toFixed(3))
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #2A201A 0%, #090909 100%)' }}
      aria-labelledby="cta-heading"
      onMouseMove={handleMouseMove}
    >
      {/* Background radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(184,132,61,0.07) 0%, transparent 65%)',
        }}
      />

      {/* Animated rings */}
      <div
        className="absolute"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 1, height: 1 }}
      >
        <BrassHalo size={200} delay={0} duration={4} opacity={0.15} />
        <BrassHalo size={340} delay={0.5} duration={5} opacity={0.1} />
        <BrassHalo size={480} delay={1} duration={6} opacity={0.07} />
        <BrassHalo size={620} delay={1.5} duration={7} opacity={0.04} />
        <BrassHalo size={760} delay={2} duration={8} opacity={0.025} />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10" ref={containerRef}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="section-eyebrow justify-center mb-8"
        >
          Votre prochaine visite
        </motion.div>

        {/* Headline */}
        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display font-light mb-4"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: 'var(--ivory)',
          }}
        >
          Prêt pour votre
          <br />
          <em
            className="not-italic"
            style={{ color: 'var(--brass)' }}
          >
            prochain style ?
          </em>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-display italic font-light text-champagne/60 mb-12"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)' }}
        >
          Passez de l'inspiration au fauteuil.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {businessConfig.bookingUrl ? (
            <a
              href={businessConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-4 px-8"
            >
              Prendre rendez-vous
            </a>
          ) : (
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="btn-primary text-sm py-4 px-8"
            >
              Trouver le salon
            </a>
          )}
          <a
            href={businessConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm py-4 px-8 flex items-center gap-2"
          >
            <MapPin size={14} aria-hidden="true" />
            Trouver le salon
          </a>
        </motion.div>

        {/* Address */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 font-sans"
          style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.25)', letterSpacing: '0.1em' }}
        >
          {businessConfig.address.full}
        </motion.p>
      </div>

      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(184,132,61,0.2), transparent)' }}
      />
    </section>
  )
}
