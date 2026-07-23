import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { businessConfig } from '../data/businessConfig'
import { asset } from '../utils/assets'

export default function AboutSection() {
  const [sectionRef, inView] = useInView({ threshold: 0.1 })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #151412 0%, #2A201A 50%, #151412 100%)' }}
      aria-labelledby="about-heading"
    >
      {/* Hazes */}
      <div
        className="absolute top-1/4 right-0 pointer-events-none"
        style={{
          width: 500, height: 500,
          background: 'radial-gradient(ellipse, rgba(184,132,61,0.06) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(184,132,61,0.15), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="relative order-2 lg:order-1"
          >
            {/* Animated brass frame */}
            <div className="relative">
              <motion.div
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute -inset-3 rounded-2xl pointer-events-none"
                style={{
                  border: '1px solid rgba(184,132,61,0.0)',
                  boxShadow: inView ? '0 0 0 1px rgba(184,132,61,0.2)' : 'none',
                  transition: 'box-shadow 1.5s ease 0.5s',
                }}
              />

              {/* Main visual — shopfront photo */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: '4/5',
                  border: '1px solid rgba(184,132,61,0.12)',
                }}
              >
                <img
                  src={asset('images/gallery/shopfront.jpg')}
                  alt="Devanture du salon Le Barber Shop, 62 Avenue Aristide Briand, Évreux"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Bottom gradient for text legibility */}
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    height: '45%',
                    background: 'linear-gradient(to top, rgba(9,9,9,0.88), transparent)',
                  }}
                />

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p
                    className="font-display italic font-light text-champagne/70"
                    style={{ fontSize: '1rem' }}
                  >
                    "Le détail fait toute la différence."
                  </p>
                </div>
              </div>

              {/* Address card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 -left-4 glass-card rounded-xl p-4"
                style={{ maxWidth: 220 }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      width: 32, height: 32,
                      background: 'rgba(184,132,61,0.1)',
                      border: '1px solid rgba(184,132,61,0.2)',
                    }}
                  >
                    <span className="text-brass" style={{ fontSize: '0.7rem' }}>◆</span>
                  </div>
                  <div>
                    <p className="font-sans font-medium text-ivory/80" style={{ fontSize: '0.75rem' }}>
                      {businessConfig.address.street}
                    </p>
                    <p className="font-sans text-ivory/40" style={{ fontSize: '0.7rem' }}>
                      {businessConfig.address.city}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="section-eyebrow mb-6"
            >
              Le salon
            </motion.div>

            <motion.h2
              id="about-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-light mb-6"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                lineHeight: 1.1,
                color: 'var(--ivory)',
                letterSpacing: '-0.015em',
              }}
            >
              Le détail fait{' '}
              <em className="text-brass not-italic">toute la différence.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-ivory/50 leading-relaxed mb-6"
              style={{ fontSize: '0.95rem', maxWidth: 480 }}
            >
              {businessConfig.description}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-sans text-ivory/40 leading-relaxed mb-10"
              style={{ fontSize: '0.9rem', maxWidth: 460 }}
            >
              À chaque passage, l'objectif est le même : prendre le temps de comprendre ce que vous
              recherchez et apporter un soin rigoureux à chaque finition, des contours à la nuque.
            </motion.p>

            {/* Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-4 mb-10"
            >
              {[
                { label: 'Coiffeur', sub: 'Barbier agréé' },
                { label: 'Évreux', sub: '27000 — Normandie' },
                { label: 'Précision', sub: 'À chaque finition' },
                { label: 'Style', sub: 'Personnel & durable' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl"
                  style={{
                    background: 'rgba(184,132,61,0.04)',
                    border: '1px solid rgba(184,132,61,0.1)',
                  }}
                >
                  <p
                    className="font-display font-light text-champagne mb-1"
                    style={{ fontSize: '1.1rem' }}
                  >
                    {item.label}
                  </p>
                  <p className="font-sans text-ivory/30" style={{ fontSize: '0.75rem' }}>
                    {item.sub}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <a
                href={businessConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Trouver le salon
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
