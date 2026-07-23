import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { ExternalLink, Star } from 'lucide-react'
import { businessConfig } from '../data/businessConfig'

export default function GoogleReviews() {
  const [sectionRef, inView] = useInView({ threshold: 0.1 })
  const hasApiKey = !!businessConfig.googlePlacesApiKey

  return (
    <section
      id="avis"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #151412 0%, #090909 100%)' }}
      aria-labelledby="reviews-heading"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(184,132,61,0.12), transparent)' }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 300,
          background: 'radial-gradient(ellipse, rgba(184,132,61,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-eyebrow justify-center mb-6"
          >
            Avis clients
          </motion.div>
          <motion.h2
            id="reviews-heading"
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-light"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', color: 'var(--ivory)', letterSpacing: '-0.02em' }}
          >
            Ce qu'en pensent{' '}
            <em className="text-brass not-italic">les clients</em>
          </motion.h2>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {hasApiKey ? (
            // This would be replaced with real Google Places API data
            <div className="text-center py-12">
              <p className="font-sans text-ivory/40">Chargement des avis…</p>
            </div>
          ) : (
            /* Elegant CTA card when no API key */
            <div
              className="rounded-2xl p-10 sm:p-14 text-center glass-card"
              style={{
                background: 'linear-gradient(145deg, rgba(42,32,26,0.5) 0%, rgba(21,20,18,0.7) 100%)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(184,132,61,0.08)',
              }}
            >
              {/* Stars decorative */}
              <div className="flex items-center justify-center gap-1.5 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    style={{ color: 'rgba(184,132,61,0.4)', fill: 'rgba(184,132,61,0.15)' }}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Google logo mark */}
              <div className="flex items-center justify-center mb-6">
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 52, height: 52,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(184,132,61,0.2)',
                  }}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </div>
              </div>

              <p
                className="font-display font-light text-ivory/80 mb-3"
                style={{ fontSize: '1.2rem' }}
              >
                Les avis vérifiés de nos clients
              </p>
              <p
                className="font-sans text-ivory/40 mb-8 leading-relaxed"
                style={{ fontSize: '0.875rem', maxWidth: 360, margin: '0 auto 2rem' }}
              >
                Découvrez l'ensemble des avis clients sur Google Maps — authentiques et vérifiés par Google.
              </p>

              <a
                href={businessConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
                aria-label="Voir les avis Le Barber Shop sur Google (ouvre un nouvel onglet)"
              >
                Voir les avis Google
                <ExternalLink size={14} aria-hidden="true" />
              </a>

              {/* Attribution note */}
              <p
                className="mt-8 font-sans"
                style={{ fontSize: '0.7rem', color: 'rgba(245,240,232,0.2)' }}
              >
                Avis fournis par Google. Le Barber Shop n'est pas responsable du contenu des avis externes.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
