import { businessConfig } from '../data/businessConfig'
import { MapPin, ExternalLink } from 'lucide-react'

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Services', href: '#services' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Le salon', href: '#about' },
  { label: 'Avis', href: '#avis' },
  { label: 'Contact', href: '#contact' },
]

const scrollTo = (e, href) => {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative pt-20 pb-8 overflow-hidden"
      style={{
        background: '#090909',
        borderTop: '1px solid rgba(184,132,61,0.12)',
      }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Pied de page</h2>

      {/* Top content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 44,
                  height: 44,
                  background: 'radial-gradient(circle at 40% 40%, #2A201A, #090909)',
                  border: '1px solid rgba(184,132,61,0.35)',
                }}
              >
                <span className="font-display text-champagne font-light" style={{ fontSize: '1.1rem' }}>
                  LB
                </span>
              </div>
              <div>
                <p className="font-display text-ivory font-light" style={{ fontSize: '1.1rem' }}>
                  Le Barber Shop
                </p>
                <p className="font-sans text-ivory/30" style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}>
                  COIFFEUR BARBIER • ÉVREUX
                </p>
              </div>
            </div>
            <p className="font-sans text-ivory/35 leading-relaxed mb-6 max-w-sm" style={{ fontSize: '0.875rem' }}>
              {businessConfig.tagline}
            </p>
            <address className="not-italic">
              <a
                href={businessConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 group mb-2"
              >
                <MapPin
                  size={14}
                  className="flex-shrink-0 mt-0.5 transition-colors group-hover:text-brass"
                  style={{ color: 'rgba(184,132,61,0.5)' }}
                  aria-hidden="true"
                />
                <span
                  className="font-sans transition-colors group-hover:text-brass"
                  style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.4)' }}
                >
                  {businessConfig.address.full}
                </span>
              </a>
              {businessConfig.phone && (
                <a
                  href={`tel:${businessConfig.phone}`}
                  className="font-sans transition-colors hover:text-brass"
                  style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.4)' }}
                >
                  {businessConfig.phone}
                </a>
              )}
            </address>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="font-sans font-medium text-ivory/60 mb-5"
              style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}
            >
              Navigation
            </p>
            <ul className="space-y-3" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="font-sans transition-colors duration-300 hover:text-brass"
                    style={{ fontSize: '0.875rem', color: 'rgba(245,240,232,0.35)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <p
              className="font-sans font-medium text-ivory/60 mb-5"
              style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}
            >
              Horaires
            </p>
            {businessConfig.openingHours ? (
              <ul className="space-y-2" role="list">
                {businessConfig.openingHours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span className="font-sans" style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.35)' }}>
                      {h.day}
                    </span>
                    <span
                      className="font-sans"
                      style={{
                        fontSize: '0.8rem',
                        color: h.hours === 'Fermé' ? 'rgba(245,240,232,0.2)' : 'rgba(239,217,177,0.5)',
                      }}
                    >
                      {h.hours}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="space-y-3">
                <p className="font-sans" style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.3)' }}>
                  Consultez Google Maps pour les horaires actuels.
                </p>
                <a
                  href={businessConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-xs transition-colors hover:text-brass"
                  style={{ color: 'rgba(184,132,61,0.5)', letterSpacing: '0.08em' }}
                >
                  Voir sur Google Maps
                  <ExternalLink size={10} aria-hidden="true" />
                </a>
              </div>
            )}

            {/* Social — only if verified */}
            {(businessConfig.social.instagram || businessConfig.social.facebook) && (
              <div className="mt-8">
                <p
                  className="font-sans font-medium text-ivory/60 mb-4"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}
                >
                  Réseaux sociaux
                </p>
                <div className="flex gap-3">
                  {businessConfig.social.instagram && (
                    <a
                      href={businessConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg transition-all duration-300 hover:border-brass/30"
                      style={{
                        background: 'rgba(184,132,61,0.05)',
                        border: '1px solid rgba(184,132,61,0.12)',
                        color: 'rgba(245,240,232,0.4)',
                      }}
                      aria-label="Instagram de Le Barber Shop"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                  )}
                  {businessConfig.social.facebook && (
                    <a
                      href={businessConfig.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg transition-all duration-300"
                      style={{
                        background: 'rgba(184,132,61,0.05)',
                        border: '1px solid rgba(184,132,61,0.12)',
                        color: 'rgba(245,240,232,0.4)',
                      }}
                      aria-label="Facebook de Le Barber Shop"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Brass divider */}
        <div
          className="h-px mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(184,132,61,0.15), transparent)' }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans" style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.2)' }}>
            {businessConfig.legal.copyright}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-sans transition-colors hover:text-ivory/50"
              style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.2)' }}
            >
              Mentions légales
            </a>
            <a
              href="#"
              className="font-sans transition-colors hover:text-ivory/50"
              style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.2)' }}
            >
              Politique de confidentialité
            </a>
            <button
              className="font-sans transition-colors hover:text-ivory/50"
              style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.2)' }}
              onClick={() => {/* cookie preferences modal */}}
            >
              Cookies
            </button>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-6 z-40 flex items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        style={{
          width: 44,
          height: 44,
          background: 'rgba(184,132,61,0.1)',
          border: '1px solid rgba(184,132,61,0.25)',
          color: 'var(--brass)',
          boxShadow: '0 8px 30px rgba(184,132,61,0.15)',
        }}
        aria-label="Retour en haut de la page"
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M8 12a.5.5 0 01-.5-.5V5.707L5.354 7.854a.5.5 0 11-.708-.708l3-3a.5.5 0 01.708 0l3 3a.5.5 0 11-.708.708L8.5 5.707V11.5A.5.5 0 018 12z" />
        </svg>
      </button>
    </footer>
  )
}
