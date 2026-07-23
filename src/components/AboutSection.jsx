import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { businessConfig } from '../data/businessConfig'

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

              {/* Main visual */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: '4/5',
                  background: 'linear-gradient(145deg, #2A201A 0%, #1A1510 100%)',
                  border: '1px solid rgba(184,132,61,0.12)',
                }}
              >
                {/* Atmospheric interior */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse at 60% 30%, rgba(184,132,61,0.07) 0%, transparent 60%)',
                  }}
                />

                {/* SVG Tool arrangement */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    viewBox="0 0 280 350"
                    width="80%"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Outils de barbier arrangés sur surface en noyer"
                  >
                    {/* Dark walnut surface */}
                    <rect x="20" y="200" width="240" height="6" rx="3" fill="#3A2820" />
                    <rect x="30" y="206" width="220" height="2" rx="1" fill="#2A1E18" opacity="0.6" />

                    {/* Straight razor */}
                    <rect x="40" y="110" width="80" height="18" rx="4" fill="#C0A060" />
                    <rect x="38" y="113" width="20" height="12" rx="3" fill="#2A201A" stroke="#B8843D" strokeWidth="0.8" />
                    <line x1="58" y1="119" x2="120" y2="119" stroke="#D4AF70" strokeWidth="1.5" />
                    <path d="M118 111 L125 119 L118 127Z" fill="#C0A060" />

                    {/* Comb */}
                    <rect x="155" y="80" width="85" height="14" rx="3" fill="#B8843D" />
                    {Array.from({ length: 20 }).map((_, i) => (
                      <rect
                        key={i}
                        x={158 + i * 4}
                        y="94"
                        width="2.5"
                        height="18"
                        rx="1"
                        fill="#A07030"
                      />
                    ))}

                    {/* Scissors */}
                    <g transform="translate(100, 140) rotate(-30)">
                      <line x1="0" y1="-40" x2="0" y2="40" stroke="#C0A060" strokeWidth="3" strokeLinecap="round" />
                      <line x1="-15" y1="-40" x2="15" y2="40" stroke="#C0A060" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="-10" cy="35" r="7" stroke="#B8843D" strokeWidth="2" fill="none" />
                      <circle cx="10" cy="35" r="7" stroke="#B8843D" strokeWidth="2" fill="none" />
                    </g>

                    {/* Clipper */}
                    <rect x="170" y="145" width="55" height="90" rx="8" fill="#1A1510" />
                    <rect x="165" y="140" width="65" height="18" rx="5" fill="#B8843D" opacity="0.8" />
                    <rect x="175" y="160" width="45" height="3" rx="1" fill="#B8843D" opacity="0.3" />
                    <rect x="175" y="168" width="45" height="3" rx="1" fill="#B8843D" opacity="0.3" />
                    <rect x="175" y="176" width="45" height="3" rx="1" fill="#B8843D" opacity="0.3" />

                    {/* Small detail elements */}
                    <circle cx="60" cy="175" r="12" stroke="#B8843D" strokeWidth="1" fill="rgba(184,132,61,0.06)" />
                    <circle cx="60" cy="175" r="6" stroke="#B8843D" strokeWidth="0.8" fill="none" opacity="0.5" />

                    {/* Surface shadows */}
                    <ellipse cx="100" cy="203" rx="60" ry="5" fill="rgba(0,0,0,0.3)" />
                    <ellipse cx="197" cy="203" rx="50" ry="4" fill="rgba(0,0,0,0.25)" />
                  </svg>
                </div>

                {/* Bottom gradient */}
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    height: '40%',
                    background: 'linear-gradient(to top, rgba(26,21,16,0.9), transparent)',
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
