import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { MapPin, Clock, Phone, ExternalLink, Copy, Check } from 'lucide-react'
import { businessConfig } from '../data/businessConfig'

export default function LocationSection() {
  const [sectionRef, inView] = useInView({ threshold: 0.1 })
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(businessConfig.address.full).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #090909 0%, #2A201A 100%)' }}
      aria-labelledby="location-heading"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(184,132,61,0.12), transparent)' }}
      />
      <div
        className="absolute bottom-1/4 right-0 pointer-events-none"
        style={{
          width: 400, height: 400,
          background: 'radial-gradient(ellipse, rgba(184,132,61,0.06) 0%, transparent 70%)',
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
            Nous trouver
          </motion.div>
          <motion.h2
            id="location-heading"
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-light"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', color: 'var(--ivory)', letterSpacing: '-0.02em' }}
          >
            Au cœur{' '}
            <em className="text-brass not-italic">d'Évreux</em>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Address */}
            <div
              className="glass-card rounded-2xl p-6"
              style={{ border: '1px solid rgba(184,132,61,0.12)' }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 40, height: 40,
                    background: 'rgba(184,132,61,0.1)',
                    border: '1px solid rgba(184,132,61,0.2)',
                  }}
                >
                  <MapPin size={16} style={{ color: 'var(--brass)' }} aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="font-sans font-medium text-ivory/80 mb-1" style={{ fontSize: '0.875rem' }}>
                    {businessConfig.address.street}
                  </p>
                  <p className="font-sans text-ivory/40" style={{ fontSize: '0.85rem' }}>
                    {businessConfig.address.postalCode} {businessConfig.address.city}, {businessConfig.address.country}
                  </p>
                </div>
              </div>
              <button
                onClick={copyAddress}
                className="flex items-center gap-2 font-sans text-xs transition-colors duration-300"
                style={{ color: copied ? 'var(--brass)' : 'rgba(245,240,232,0.3)' }}
                aria-label="Copier l'adresse"
              >
                {copied ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
                {copied ? 'Adresse copiée !' : "Copier l'adresse"}
              </button>
            </div>

            {/* Phone — only if verified */}
            {businessConfig.phone && (
              <div
                className="glass-card rounded-2xl p-6"
                style={{ border: '1px solid rgba(184,132,61,0.12)' }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 40, height: 40,
                      background: 'rgba(184,132,61,0.1)',
                      border: '1px solid rgba(184,132,61,0.2)',
                    }}
                  >
                    <Phone size={16} style={{ color: 'var(--brass)' }} aria-hidden="true" />
                  </div>
                  <a
                    href={`tel:${businessConfig.phone}`}
                    className="font-sans font-medium text-ivory/80 hover:text-brass transition-colors"
                    style={{ fontSize: '0.875rem' }}
                  >
                    {businessConfig.phone}
                  </a>
                </div>
              </div>
            )}

            {/* Opening hours — only if verified */}
            {businessConfig.openingHours && (
              <div
                className="glass-card rounded-2xl p-6"
                style={{ border: '1px solid rgba(184,132,61,0.12)' }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 40, height: 40,
                      background: 'rgba(184,132,61,0.1)',
                      border: '1px solid rgba(184,132,61,0.2)',
                    }}
                  >
                    <Clock size={16} style={{ color: 'var(--brass)' }} aria-hidden="true" />
                  </div>
                  <div className="space-y-2 flex-1">
                    {businessConfig.openingHours.map((h) => (
                      <div key={h.day} className="flex justify-between items-center">
                        <span className="font-sans text-ivory/50" style={{ fontSize: '0.8rem' }}>
                          {h.day}
                        </span>
                        <span
                          className="font-sans"
                          style={{
                            fontSize: '0.8rem',
                            color: h.hours === 'Fermé' ? 'rgba(245,240,232,0.25)' : 'var(--champagne)',
                          }}
                        >
                          {h.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <a
                href={businessConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
              >
                <MapPin size={14} aria-hidden="true" />
                Obtenir l'itinéraire
              </a>
              {businessConfig.bookingUrl && (
                <a
                  href={businessConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  Prendre rendez-vous
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Right — Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: '4/3', minHeight: 300 }}
          >
            {/* Dark map overlay for style */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(9,9,9,0.2) 0%, transparent 50%)',
              }}
            />
            {/* Border */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none z-10"
              style={{ border: '1px solid rgba(184,132,61,0.15)' }}
            />

            <iframe
              title="Localisation de Le Barber Shop sur Google Maps"
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2609.6!2d${businessConfig.coordinates.lng}!3d${businessConfig.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e14172f7221f1b%3A0xbec60b606d9bf61d!2sLe%20Barber%20Shop!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'saturate(0.3) contrast(1.1) brightness(0.8)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
