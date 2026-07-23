import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const pillars = [
  {
    num: '01',
    title: 'Écouter',
    desc: 'Comprendre le style recherché avant de commencer. Chaque client est différent, chaque coupe mérite d\'être personnalisée.',
  },
  {
    num: '02',
    title: 'Travailler',
    desc: 'Porter attention aux lignes, aux proportions et aux finitions. Le soin du détail à chaque étape.',
  },
  {
    num: '03',
    title: 'Révéler',
    desc: 'Créer un résultat qui correspond à la personnalité du client. Une coupe qui dure et qui marque.',
  },
]

export default function ExperienceSection() {
  const [sectionRef, inView] = useInView({ threshold: 0.1 })

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #090909 0%, #2A201A 50%, #151412 100%)' }}
      aria-labelledby="exp-heading"
    >
      {/* Brass haze top right */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: 500, height: 500,
          background: 'radial-gradient(ellipse, rgba(184,132,61,0.06) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Brass divider line top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(184,132,61,0.2), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="section-eyebrow mb-6"
            >
              L'expérience Le Barber Shop
            </motion.div>

            <motion.h2
              id="exp-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-light mb-6"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: 'var(--ivory)',
              }}
            >
              Votre style mérite plus
              <br />
              <em className="text-brass not-italic">qu'un passage rapide.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-ivory/50 leading-relaxed mb-12"
              style={{ fontSize: '0.95rem', maxWidth: 480 }}
            >
              Chez Le Barber Shop, chaque visite est abordée comme une expérience de soin complète.
              L'enjeu : comprendre le look souhaité, travailler avec précision et offrir un résultat
              soigné, confiant et personnel.
            </motion.p>

            {/* Pillars */}
            <div className="space-y-8">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.12 }}
                  className="flex gap-6 group"
                >
                  <div className="flex-shrink-0 pt-1">
                    <span
                      className="font-display font-light"
                      style={{ fontSize: '0.8rem', color: 'rgba(184,132,61,0.5)', letterSpacing: '0.1em' }}
                    >
                      {p.num}
                    </span>
                  </div>
                  <div>
                    <h3
                      className="font-display font-medium mb-2 transition-colors duration-300"
                      style={{
                        fontSize: '1.3rem',
                        color: 'var(--champagne)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {p.title}
                    </h3>
                    <p className="font-sans text-ivory/40 leading-relaxed" style={{ fontSize: '0.875rem' }}>
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative frame */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: '4/5',
                background: 'linear-gradient(145deg, #2A201A 0%, #151412 100%)',
                border: '1px solid rgba(184,132,61,0.15)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(184,132,61,0.1)',
              }}
            >
              {/* Atmospheric interior */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at 50% 30%, rgba(184,132,61,0.08) 0%, transparent 60%)',
                }}
              />

              {/* Barber pole decoration */}
              <div
                className="absolute left-8 top-8 bottom-8 rounded-full overflow-hidden"
                style={{ width: 8 }}
              >
                <div className="barber-pole h-full w-full" />
              </div>

              {/* Central visual */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 gap-8">
                {/* Large brass quote mark */}
                <div
                  className="font-display text-brass/15 leading-none select-none"
                  style={{ fontSize: '8rem', marginTop: '-2rem' }}
                  aria-hidden="true"
                >
                  "
                </div>

                {/* Decorative scissors SVG */}
                <div className="flex flex-col items-center gap-6">
                  <svg
                    viewBox="0 0 80 80"
                    width="80"
                    height="80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    {/* Scissors icon */}
                    <circle cx="20" cy="20" r="10" stroke="#B8843D" strokeWidth="1.5" fill="none" />
                    <circle cx="60" cy="20" r="10" stroke="#B8843D" strokeWidth="1.5" fill="none" />
                    <line x1="28" y1="27" x2="52" y2="60" stroke="#B8843D" strokeWidth="1.5" />
                    <line x1="52" y1="27" x2="28" y2="60" stroke="#B8843D" strokeWidth="1.5" />
                    <circle cx="40" cy="44" r="2.5" fill="#B8843D" />
                  </svg>

                  <div className="text-center">
                    <p
                      className="font-display italic font-light mb-2"
                      style={{ fontSize: '1.1rem', color: 'var(--champagne)', lineHeight: 1.5 }}
                    >
                      "Le soin du détail fait toute la différence."
                    </p>
                    <div className="brass-divider mx-auto" />
                  </div>

                  {/* Three icons row */}
                  <div className="flex items-center gap-8 mt-4">
                    {['Écoute', 'Précision', 'Style'].map((item, i) => (
                      <div key={item} className="flex flex-col items-center gap-2">
                        <div
                          className="rounded-full flex items-center justify-center"
                          style={{
                            width: 42,
                            height: 42,
                            border: '1px solid rgba(184,132,61,0.25)',
                            background: 'rgba(184,132,61,0.06)',
                          }}
                        >
                          <span className="text-brass" style={{ fontSize: '0.7rem' }}>◆</span>
                        </div>
                        <span
                          className="font-sans text-ivory/40"
                          style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Animated brass border */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(184,132,61,0.15) 0%, transparent 40%, rgba(184,132,61,0.08) 100%)',
                }}
              />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="absolute -bottom-6 -right-6 glass-card rounded-xl p-5"
              style={{ maxWidth: 180 }}
            >
              <p
                className="font-display text-brass font-light mb-1"
                style={{ fontSize: '2rem' }}
              >
                3
              </p>
              <p
                className="font-sans text-ivory/50"
                style={{ fontSize: '0.7rem', letterSpacing: '0.1em', lineHeight: 1.4 }}
              >
                Engagements au cœur de chaque visite
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(184,132,61,0.15), transparent)' }}
      />
    </section>
  )
}
