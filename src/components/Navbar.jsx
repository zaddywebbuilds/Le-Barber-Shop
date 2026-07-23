import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { businessConfig } from '../data/businessConfig'
import MobileMenu from './MobileMenu'

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Services', href: '#services' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Le salon', href: '#about' },
  { label: 'Avis', href: '#avis' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#accueil')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActive(href)
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(9, 9, 9, 0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(184,132,61,0.1)' : 'none',
        }}
      >
        <nav
          className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between"
          style={{ height: scrolled ? 64 : 80, transition: 'height 0.4s ease' }}
          aria-label="Navigation principale"
        >
          {/* Logo / Monogram */}
          <a
            href="#accueil"
            onClick={(e) => scrollTo(e, '#accueil')}
            className="flex items-center gap-3 group"
            aria-label="Le Barber Shop — Accueil"
          >
            <div
              className="flex items-center justify-center rounded-full transition-all duration-300 group-hover:shadow-lg"
              style={{
                width: 42,
                height: 42,
                background: 'radial-gradient(circle at 40% 40%, #2A201A, #090909)',
                border: '1px solid rgba(184,132,61,0.4)',
                boxShadow: '0 0 20px rgba(184,132,61,0.1)',
              }}
            >
              <span
                className="font-display text-champagne font-light"
                style={{ fontSize: '1.1rem', letterSpacing: '0.05em' }}
              >
                LB
              </span>
            </div>
            <span
              className="hidden sm:block font-sans text-xs tracking-[0.2em] uppercase text-ivory opacity-60 transition-opacity group-hover:opacity-90"
            >
              Le Barber Shop
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="relative font-sans text-xs tracking-[0.15em] uppercase transition-colors duration-300"
                  style={{
                    color: active === link.href ? 'var(--brass)' : 'rgba(245,240,232,0.65)',
                  }}
                  onMouseEnter={(e) => {
                    if (active !== link.href) e.target.style.color = 'var(--ivory)'
                  }}
                  onMouseLeave={(e) => {
                    if (active !== link.href) e.target.style.color = 'rgba(245,240,232,0.65)'
                  }}
                  aria-current={active === link.href ? 'page' : undefined}
                >
                  {link.label}
                  {active === link.href && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: 'var(--brass)' }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            {businessConfig.bookingUrl && (
              <a
                href={businessConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex btn-primary text-xs py-2.5 px-5"
              >
                Prendre rendez-vous
              </a>
            )}

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="block w-6 h-px bg-ivory transition-all duration-300" />
              <span className="block w-4 h-px bg-brass transition-all duration-300" />
              <span className="block w-6 h-px bg-ivory transition-all duration-300" />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
        onLinkClick={scrollTo}
      />
    </>
  )
}
