import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Phone, Calendar } from 'lucide-react'
import { businessConfig } from '../data/businessConfig'

export default function MobileMenu({ isOpen, onClose, links, onLinkClick }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          className="fixed inset-0 z-[60] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: 'rgba(9,9,9,0.97)' }}
        >
          {/* Backdrop close */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Decorative haze */}
          <div
            className="absolute top-0 right-0 pointer-events-none"
            style={{
              width: 300,
              height: 300,
              background: 'radial-gradient(circle, rgba(184,132,61,0.06) 0%, transparent 70%)',
            }}
          />

          {/* Header */}
          <div className="relative flex items-center justify-between px-6 py-5 border-b border-brass/10">
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 38,
                  height: 38,
                  background: 'radial-gradient(circle, #2A201A, #090909)',
                  border: '1px solid rgba(184,132,61,0.3)',
                }}
              >
                <span className="font-display text-champagne font-light" style={{ fontSize: '1rem' }}>
                  LB
                </span>
              </div>
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-ivory/50">
                Le Barber Shop
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-ivory/60 hover:text-brass transition-colors"
              aria-label="Fermer le menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="relative flex-1 flex flex-col justify-center px-8">
            <ul className="space-y-2" role="list">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.4, ease: 'easeOut' }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => onLinkClick(e, link.href)}
                    className="block py-3 font-display font-light transition-colors duration-200"
                    style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', color: 'rgba(245,240,232,0.5)' }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--brass)')}
                    onMouseLeave={(e) => (e.target.style.color = 'rgba(245,240,232,0.5)')}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Bottom Action Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="relative px-6 pb-safe-bottom pb-8 pt-6 border-t border-brass/10"
          >
            <div className="flex flex-wrap gap-3">
              {businessConfig.phone && (
                <a
                  href={`tel:${businessConfig.phone}`}
                  className="flex items-center gap-2 btn-secondary text-xs py-2.5 px-4 flex-1 justify-center"
                >
                  <Phone size={14} />
                  Appeler
                </a>
              )}
              <a
                href={businessConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 btn-secondary text-xs py-2.5 px-4 flex-1 justify-center"
              >
                <MapPin size={14} />
                Itinéraire
              </a>
              {businessConfig.bookingUrl && (
                <a
                  href={businessConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 btn-primary text-xs py-2.5 px-4 flex-1 justify-center"
                >
                  <Calendar size={14} />
                  Rendez-vous
                </a>
              )}
            </div>

            <p className="text-center font-sans text-xs mt-4" style={{ color: 'rgba(245,240,232,0.2)', letterSpacing: '0.1em' }}>
              62 Avenue Aristide Briand, 27000 Évreux
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
