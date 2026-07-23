import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { asset } from '../utils/assets'

const styles = [
  {
    id: 'classique',
    label: 'Classique',
    description:
      "Un style intemporel : raie nette, côtés courts, dessus travaillé au peigne. La référence du barbier traditionnel, toujours d'actualité.",
    color: '#B8843D',
    bgAccent: 'rgba(184,132,61,0.08)',
  },
  {
    id: 'degrade',
    label: 'Dégradé',
    description:
      "Transition fluide entre les longueurs, du plus court à la nuque jusqu'au sommet du crâne. Net, moderne et très demandé.",
    color: '#EFD9B1',
    bgAccent: 'rgba(239,217,177,0.05)',
  },
  {
    id: 'structure',
    label: 'Structuré',
    description:
      "Lignes définies, contours tracés au rasoir, silhouette affirmée. Idéal pour les hommes qui souhaitent un rendu marqué et professionnel.",
    color: '#B8843D',
    bgAccent: 'rgba(184,132,61,0.08)',
  },
  {
    id: 'naturel',
    label: 'Naturel',
    description:
      "Volume respecté, texture conservée, longueurs maîtrisées. Un look authentique, sans artifice, qui met en valeur le cheveu naturel.",
    color: '#EFD9B1',
    bgAccent: 'rgba(239,217,177,0.05)',
  },
  {
    id: 'barbe',
    label: 'Barbe soignée',
    description:
      "Contours précis, lignes dessinées, longueur harmonisée avec la coupe. La barbe comme élément central du style masculin.",
    color: '#B8843D',
    bgAccent: 'rgba(184,132,61,0.08)',
  },
]

const MEDIA = {
  classique: { path: 'videos/style-classic.mp4',   type: 'video' },
  degrade:   { path: 'videos/style-gradient.mp4',  type: 'video' },
  structure: { path: 'videos/style-structure.mp4', type: 'video' },
  naturel:   { path: 'images/style-natural.jpg',   type: 'image' },
  barbe:     { path: 'videos/style-beard.mp4',     type: 'video' },
}

export default function StyleExplorer() {
  const [active, setActive] = useState(styles[0])
  const [sectionRef, inView] = useInView({ threshold: 0.1 })

  const currentStyle = styles.find((s) => s.id === active.id) || styles[0]
  const currentMedia = MEDIA[active.id]

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
          {/* Left — Media display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                width: '100%',
                maxWidth: 400,
                aspectRatio: '4/5',
                background: '#151412',
                border: '1px solid rgba(184,132,61,0.12)',
                boxShadow: `0 40px 80px rgba(0,0,0,0.55), 0 0 80px ${currentStyle.bgAccent}`,
                transition: 'box-shadow 0.5s ease',
                margin: '0 auto',
              }}
            >
              {/* Media layer — fades between styles */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.38 }}
                  className="absolute inset-0"
                >
                  {currentMedia.type === 'video' ? (
                    <video
                      key={currentMedia.path}
                      src={asset(currentMedia.path)}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={asset(currentMedia.path)}
                      alt={active.label}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Bottom gradient for label legibility */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(9,9,9,0.82) 0%, rgba(9,9,9,0.15) 40%, transparent 65%)',
                }}
              />

              {/* Inset brass ring glint */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ boxShadow: 'inset 0 1px 0 rgba(184,132,61,0.32), inset 0 -1px 0 rgba(0,0,0,0.5)' }}
              />

              {/* Style label */}
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${active.id}-label`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="font-display font-light"
                    style={{ fontSize: '1.35rem', color: currentStyle.color }}
                  >
                    {active.label}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right — Style selector */}
          <div className="flex flex-col gap-6">
            {/* Buttons */}
            <div className="flex flex-wrap gap-2.5 mb-2">
              {styles.map((s, i) => (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  onClick={() => setActive(s)}
                  className="px-4 py-2 rounded-sm font-sans text-xs tracking-[0.1em] uppercase transition-all duration-300"
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

            <p className="font-sans mt-2" style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.2)' }}>
              Ces inspirations sont indicatives. Votre barbier adaptera le style à votre morphologie et à vos cheveux.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
