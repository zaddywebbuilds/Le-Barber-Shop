import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { asset } from '../utils/assets'

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

          {/* Right — Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: '4/5',
                border: '1px solid rgba(184,132,61,0.15)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
              }}
            >
              {/* Real haircut photo */}
              <img
                src={asset('images/gallery/coupe-degrade.jpg')}
                alt="Résultat de coupe dégradé réalisé au Le Barber Shop, Évreux"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />

              {/* Subtle dark gradient at bottom for text legibility */}
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{ height: '45%', background: 'linear-gradient(to top, rgba(9,9,9,0.85), transparent)' }}
              />

              {/* Barber pole accent */}
              <div
                className="absolute left-5 top-5 bottom-5 rounded-full overflow-hidden"
                style={{ width: 6 }}
              >
                <div className="barber-pole h-full w-full" />
              </div>

              {/* Quote overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p
                  className="font-display italic font-light mb-3"
                  style={{ fontSize: '1rem', color: 'var(--champagne)', lineHeight: 1.5 }}
                >
                  "Le soin du détail fait toute la différence."
                </p>
                <div className="flex items-center gap-6">
                  {['Écoute', 'Précision', 'Style'].map((label) => (
                    <span
                      key={label}
                      className="font-sans text-ivory/50"
                      style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Brass corner accent */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: 'inset 0 1px 0 rgba(184,132,61,0.2)' }}
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
