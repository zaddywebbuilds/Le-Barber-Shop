import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const styles = [
  {
    id: 'classique',
    label: 'Classique',
    description:
      'Un style intemporel : raie nette, côtés courts, dessus travaillé au peigne. La référence du barbier traditionnel, toujours d\'actualité.',
    color: '#B8843D',
    bgAccent: 'rgba(184,132,61,0.06)',
    icon: '◈',
  },
  {
    id: 'degrade',
    label: 'Dégradé',
    description:
      'Transition fluide entre les longueurs, du plus court à la nuque jusqu\'au sommet du crâne. Net, moderne et très demandé.',
    color: '#EFD9B1',
    bgAccent: 'rgba(239,217,177,0.05)',
    icon: '◈',
  },
  {
    id: 'structure',
    label: 'Structuré',
    description:
      'Lignes définies, contours tracés au rasoir, silhouette affirmée. Idéal pour les hommes qui souhaitent un rendu marqué et professionnel.',
    color: '#B8843D',
    bgAccent: 'rgba(184,132,61,0.06)',
    icon: '◈',
  },
  {
    id: 'naturel',
    label: 'Naturel',
    description:
      'Volume respecté, texture conservée, longueurs maîtrisées. Un look authentique, sans artifice, qui met en valeur le cheveu naturel.',
    color: '#EFD9B1',
    bgAccent: 'rgba(239,217,177,0.05)',
    icon: '◈',
  },
  {
    id: 'barbe',
    label: 'Barbe soignée',
    description:
      'Contours précis, lignes dessinées, longueur harmonisée avec la coupe. La barbe comme élément central du style masculin.',
    color: '#B8843D',
    bgAccent: 'rgba(184,132,61,0.06)',
    icon: '◈',
  },
]

// SVG silhouettes for each style
const silhouettes = {
  classique: (
    <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="80" cy="90" rx="52" ry="58" fill="#2A201A" />
      <path d="M30 70 Q30 30 80 28 Q130 30 130 70 L132 90 Q130 50 80 48 Q30 50 28 90Z" fill="#B8843D" opacity="0.7" />
      <ellipse cx="80" cy="155" rx="35" ry="18" fill="#1A1510" opacity="0.6" />
      <path d="M50 140 Q80 165 110 140" stroke="#2A201A" strokeWidth="2" fill="none" />
      <circle cx="65" cy="100" r="5" fill="#090909" opacity="0.5" />
      <circle cx="95" cy="100" r="5" fill="#090909" opacity="0.5" />
      <path d="M65 120 Q80 130 95 120" stroke="#090909" strokeWidth="2" fill="none" opacity="0.4" />
    </svg>
  ),
  degrade: (
    <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="80" cy="90" rx="52" ry="58" fill="#2A201A" />
      <path d="M28 90 Q28 50 80 45 Q132 50 132 90" fill="none" stroke="#B8843D" strokeWidth="1.5" />
      <path d="M32 100 Q32 60 80 55 Q128 60 128 100" fill="url(#fadeGrad)" opacity="0.5" />
      <defs>
        <linearGradient id="fadeGrad" x1="80" y1="55" x2="80" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#B8843D" stopOpacity="0.8" />
          <stop offset="1" stopColor="#B8843D" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <ellipse cx="80" cy="155" rx="35" ry="18" fill="#1A1510" opacity="0.6" />
    </svg>
  ),
  structure: (
    <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="80" cy="90" rx="52" ry="58" fill="#2A201A" />
      <path d="M28 78 L32 68 Q80 40 128 68 L132 78" fill="#B8843D" opacity="0.8" />
      <line x1="28" y1="88" x2="132" y2="88" stroke="#B8843D" strokeWidth="1" opacity="0.4" />
      <ellipse cx="80" cy="155" rx="35" ry="18" fill="#1A1510" opacity="0.6" />
    </svg>
  ),
  naturel: (
    <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="80" cy="90" rx="52" ry="58" fill="#2A201A" />
      <path d="M34 70 Q50 35 80 30 Q110 35 126 70 Q135 55 80 42 Q25 55 34 70Z" fill="#EFD9B1" opacity="0.5" />
      <path d="M30 80 Q26 60 40 45" stroke="#EFD9B1" strokeWidth="1.5" fill="none" opacity="0.3" />
      <path d="M130 80 Q134 60 120 45" stroke="#EFD9B1" strokeWidth="1.5" fill="none" opacity="0.3" />
      <ellipse cx="80" cy="155" rx="35" ry="18" fill="#1A1510" opacity="0.6" />
    </svg>
  ),
  barbe: (
    <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="80" cy="90" rx="52" ry="58" fill="#2A201A" />
      <path d="M40 115 Q50 145 80 152 Q110 145 120 115 Q100 130 80 132 Q60 130 40 115Z" fill="#B8843D" opacity="0.6" />
      <path d="M42 108 L40 115" stroke="#B8843D" strokeWidth="1.5" opacity="0.5" />
      <path d="M118 108 L120 115" stroke="#B8843D" strokeWidth="1.5" opacity="0.5" />
      <path d="M28 70 Q30 40 80 35 Q130 40 132 70" stroke="#EFD9B1" strokeWidth="1" fill="none" opacity="0.3" />
      <ellipse cx="80" cy="165" rx="35" ry="15" fill="#1A1510" opacity="0.4" />
    </svg>
  ),
}

export default function StyleExplorer() {
  const [active, setActive] = useState(styles[0])
  const [sectionRef, inView] = useInView({ threshold: 0.1 })

  const currentStyle = styles.find((s) => s.id === active.id) || styles[0]

  return (
    <section
      id="style-explorer"
      ref={sectionRef}
      className="relative py-16 overflow-hidden"
      style={{ background: '#090909' }}
      aria-labelledby="explorer-heading"
    >
      {/* Brass halos */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%', left: '-10%',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(184,132,61,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(184,132,61,0.15), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-eyebrow justify-center mb-6"
          >
            Inspiration & Style
          </motion.div>
          <motion.h2
            id="explorer-heading"
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-light"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', color: 'var(--ivory)', letterSpacing: '-0.02em' }}
          >
            Quel style vous{' '}
            <em className="text-brass not-italic">ressemble ?</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-sans text-ivory/40 mt-4 max-w-lg mx-auto"
            style={{ fontSize: '0.9rem' }}
          >
            Explorez ces inspirations et montrez-les directement à votre barbier.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Silhouette Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div
              className="relative rounded-3xl flex items-center justify-center"
              style={{
                width: '100%',
                maxWidth: 400,
                aspectRatio: '4/5',
                background: `radial-gradient(ellipse at 50% 40%, ${currentStyle.bgAccent}, transparent 70%), #151412`,
                border: '1px solid rgba(184,132,61,0.12)',
                boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 80px ${currentStyle.bgAccent}`,
                transition: 'box-shadow 0.5s ease, background 0.5s ease',
                margin: '0 auto',
              }}
            >
              {/* Decorative rings */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: '10%',
                  border: `1px solid ${currentStyle.color}20`,
                  borderRadius: '50%',
                }}
              />

              {/* Style silhouette */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.35 }}
                  className="w-1/2"
                >
                  {silhouettes[active.id]}
                </motion.div>
              </AnimatePresence>

              {/* Style label overlay */}
              <div
                className="absolute bottom-6 left-6 right-6 text-center"
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${active.id}-label`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="font-display font-light"
                    style={{ fontSize: '1.4rem', color: currentStyle.color }}
                  >
                    {active.label}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right — Style Selector */}
          <div className="flex flex-col gap-6">
            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mb-2">
              {styles.map((s, i) => (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  onClick={() => setActive(s)}
                  className="px-5 py-2.5 rounded-sm font-sans text-sm tracking-[0.1em] uppercase transition-all duration-300"
                  style={{
                    background: active.id === s.id ? 'rgba(184,132,61,0.15)' : 'rgba(21,20,18,0.8)',
                    border: `1px solid ${active.id === s.id ? 'rgba(184,132,61,0.5)' : 'rgba(184,132,61,0.12)'}`,
                    color: active.id === s.id ? 'var(--brass)' : 'rgba(245,240,232,0.5)',
                  }}
                  aria-pressed={active.id === s.id}
                >
                  {s.label}
                </motion.button>
              ))}
            </div>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active.id}-desc`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="brass-divider mb-5" />
                <p
                  className="font-sans text-ivory/55 leading-relaxed mb-8"
                  style={{ fontSize: '0.95rem' }}
                >
                  {currentStyle.description}
                </p>

                {/* Action */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => {
                      const text = `Style inspiration : ${currentStyle.label}\n${currentStyle.description}`
                      if (navigator.share) {
                        navigator.share({ title: `Style ${currentStyle.label} — Le Barber Shop`, text })
                      } else if (navigator.clipboard) {
                        navigator.clipboard.writeText(text)
                        alert('Inspiration copiée dans le presse-papier !')
                      }
                    }}
                    className="btn-primary text-xs py-3"
                  >
                    Montrer cette inspiration au barbier
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Note */}
            <p className="font-sans mt-2" style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.2)' }}>
              Ces inspirations sont indicatives. Votre barbier adaptera le style à votre morphologie et à vos cheveux.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
