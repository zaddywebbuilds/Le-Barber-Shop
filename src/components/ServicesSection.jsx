import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { getPublishedServices } from '../data/servicesData'
import { businessConfig } from '../data/businessConfig'
import { Scissors, Clock, ExternalLink } from 'lucide-react'

// Icon map
const serviceIcons = {
  scissors: Scissors,
  blade: Scissors,
  combo: Scissors,
  detail: Scissors,
  junior: Scissors,
}

function ServiceCard({ service, featured = false, delay = 0, inView }) {
  const Icon = serviceIcons[service.icon] || Scissors

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="group relative rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
      style={{
        background: featured
          ? 'linear-gradient(145deg, #2A201A 0%, #1A1510 100%)'
          : 'rgba(21, 20, 18, 0.8)',
        border: '1px solid rgba(184,132,61,0.12)',
        boxShadow: featured ? '0 20px 60px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      {/* Hover brass border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(184,132,61,0.3)' }}
      />

      {/* Featured badge */}
      {featured && (
        <div
          className="absolute top-4 right-4 font-sans text-xs tracking-[0.15em] uppercase px-3 py-1 rounded-sm"
          style={{ background: 'rgba(184,132,61,0.15)', color: 'var(--brass)', border: '1px solid rgba(184,132,61,0.25)' }}
        >
          Populaire
        </div>
      )}

      <div className={`p-8 ${featured ? 'p-10' : ''}`}>
        {/* Icon */}
        <div
          className="flex items-center justify-center rounded-full mb-6"
          style={{
            width: 52,
            height: 52,
            background: 'rgba(184,132,61,0.08)',
            border: '1px solid rgba(184,132,61,0.2)',
          }}
        >
          <Icon size={22} style={{ color: 'var(--brass)' }} aria-hidden="true" />
        </div>

        {/* Name */}
        <h3
          className="font-display font-light mb-3 transition-colors duration-300 group-hover:text-brass"
          style={{
            fontSize: featured ? '1.6rem' : '1.3rem',
            color: 'var(--champagne)',
            letterSpacing: '-0.01em',
          }}
        >
          {service.name}
        </h3>

        {/* Desc */}
        <p className="font-sans text-ivory/40 leading-relaxed mb-6" style={{ fontSize: '0.875rem' }}>
          {service.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-8">
          {service.duration && (
            <span className="flex items-center gap-1.5 font-sans text-xs text-ivory/30">
              <Clock size={12} aria-hidden="true" />
              {service.duration}
            </span>
          )}
          {service.price && (
            <span
              className="font-display font-light text-brass"
              style={{ fontSize: '1.2rem' }}
            >
              {service.price}
            </span>
          )}
        </div>

        {/* CTA */}
        {businessConfig.bookingUrl ? (
          <a
            href={businessConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase text-brass hover:text-champagne transition-colors duration-300"
          >
            Réserver <ExternalLink size={11} aria-hidden="true" />
          </a>
        ) : (
          <span
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase"
            style={{ color: 'rgba(184,132,61,0.5)' }}
          >
            Découvrir
          </span>
        )}
      </div>

      {/* Bottom brass line on hover */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: 'linear-gradient(90deg, transparent, var(--brass), transparent)' }}
      />
    </motion.article>
  )
}

// Placeholder shown when no services are published yet
function ServicesPlaceholder({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="col-span-full flex flex-col items-center py-20 text-center"
    >
      <div
        className="rounded-full flex items-center justify-center mb-6"
        style={{
          width: 72,
          height: 72,
          border: '1px solid rgba(184,132,61,0.2)',
          background: 'rgba(184,132,61,0.05)',
        }}
      >
        <Scissors size={28} style={{ color: 'rgba(184,132,61,0.5)' }} />
      </div>
      <p className="font-display font-light text-champagne/60 mb-2" style={{ fontSize: '1.4rem' }}>
        Services à venir
      </p>
      <p className="font-sans text-ivory/30 mb-6" style={{ fontSize: '0.875rem', maxWidth: 400 }}>
        Les prestations seront affichées ici dès confirmation par le salon.
        Retrouvez Le Barber Shop sur Google Maps pour plus d'informations.
      </p>
      <a
        href={businessConfig.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary text-xs"
      >
        Voir sur Google Maps
      </a>
    </motion.div>
  )
}

export default function ServicesSection() {
  const [sectionRef, inView] = useInView({ threshold: 0.05 })
  const published = getPublishedServices()
  const hasServices = published.length > 0
  const featured = hasServices ? published.find((s) => s.featured) || published[0] : null
  const rest = hasServices ? published.filter((s) => s.id !== featured?.id) : []

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-16 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #151412 0%, #090909 100%)' }}
      aria-labelledby="services-heading"
    >
      <div
        className="absolute bottom-0 left-1/4 pointer-events-none"
        style={{
          width: 600, height: 400,
          background: 'radial-gradient(ellipse, rgba(184,132,61,0.04) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-eyebrow justify-center mb-6"
          >
            Nos prestations
          </motion.div>
          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-light"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              color: 'var(--ivory)',
              letterSpacing: '-0.02em',
            }}
          >
            Un service adapté à{' '}
            <em className="text-brass not-italic">votre style</em>
          </motion.h2>
        </div>

        {/* Grid */}
        {!hasServices ? (
          <div className="grid">
            <ServicesPlaceholder inView={inView} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Featured card — spans 2 cols on xl */}
            {featured && (
              <div className="md:col-span-2 xl:col-span-2">
                <ServiceCard service={featured} featured delay={0.1} inView={inView} />
              </div>
            )}
            {/* Supporting cards */}
            {rest.map((s, i) => (
              <ServiceCard key={s.id} service={s} delay={0.2 + i * 0.1} inView={inView} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
