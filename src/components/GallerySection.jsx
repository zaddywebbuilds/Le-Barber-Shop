import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { getPublishedGallery, galleryData } from '../data/galleryData'
import { businessConfig } from '../data/businessConfig'
import { asset } from '../utils/assets'

// Gallery card — handles both real images and placeholders
function GalleryCard({ item, onClick }) {
  const aspectRatio = item.aspect === 'portrait' ? '3/4' : item.aspect === 'landscape' ? '16/9' : '1'
  const borderRadius = item.aspect === 'portrait' ? '1.5rem 1.5rem 3rem 1.5rem' : '1.5rem'

  return (
    <motion.button
      onClick={() => onClick(item)}
      className="relative overflow-hidden group focus-visible:ring-2 focus-visible:ring-brass w-full"
      style={{
        borderRadius,
        aspectRatio,
        background: item.placeholder ? item.placeholderColor : '#151412',
        border: '1px solid rgba(184,132,61,0.08)',
      }}
      aria-label={`Voir : ${item.alt}`}
    >
      {item.src ? (
        <>
          <img
            src={asset(item.src)}
            alt={item.alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 pointer-events-none" />
          {/* Brass border flash on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-[inherit]"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(184,132,61,0.4)' }}
          />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(184,132,61,0.06) 0%, transparent 50%, rgba(184,132,61,0.04) 100%)' }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div
              className="rounded-full flex items-center justify-center"
              style={{ width: 48, height: 48, border: '1px solid rgba(184,132,61,0.2)', background: 'rgba(184,132,61,0.05)' }}
            >
              <span style={{ color: 'rgba(184,132,61,0.4)', fontSize: '1.2rem' }}>◈</span>
            </div>
            <p className="font-sans text-center px-4" style={{ fontSize: '0.7rem', color: 'rgba(239,217,177,0.25)', letterSpacing: '0.1em' }}>
              Photo à ajouter
            </p>
          </div>
          <span className="sr-only">{item.alt}</span>
        </>
      )}
    </motion.button>
  )
}

// Lightbox
function Lightbox({ item, items, onClose, onPrev, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(9,9,9,0.95)', backdropFilter: 'blur(10px)' }}
      role="dialog"
      aria-modal="true"
      aria-label={`Galerie : ${item.alt}`}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full text-ivory/60 hover:text-brass transition-colors"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(184,132,61,0.15)' }}
        aria-label="Fermer"
      >
        <X size={20} />
      </button>

      {/* Prev */}
      <button
        onClick={onPrev}
        className="absolute left-4 sm:left-8 p-3 rounded-full text-ivory/60 hover:text-brass transition-colors"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(184,132,61,0.15)' }}
        aria-label="Image précédente"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Content */}
      <div className="max-w-3xl w-full px-16 sm:px-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: item.placeholderColor || '#151412',
              aspectRatio: item.aspect === 'portrait' ? '3/4' : item.aspect === 'landscape' ? '16/9' : '1',
              border: '1px solid rgba(184,132,61,0.15)',
            }}
          >
            {item.src ? (
              <img
                src={asset(item.src)}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="font-sans text-ivory/30 text-sm">{item.alt}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <p className="text-center font-sans text-ivory/40 text-xs mt-4 tracking-wider">{item.alt}</p>
      </div>

      {/* Next */}
      <button
        onClick={onNext}
        className="absolute right-4 sm:right-8 p-3 rounded-full text-ivory/60 hover:text-brass transition-colors"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(184,132,61,0.15)' }}
        aria-label="Image suivante"
      >
        <ChevronRight size={20} />
      </button>
    </motion.div>
  )
}

export default function GallerySection() {
  const [sectionRef, inView] = useInView({ threshold: 0.05 })
  const [lightboxItem, setLightboxItem] = useState(null)

  // Use published or show all as dev placeholders
  const published = getPublishedGallery()
  const items = published.length > 0 ? published : galleryData

  const openLightbox = useCallback((item) => setLightboxItem(item), [])
  const closeLightbox = useCallback(() => setLightboxItem(null), [])

  const prevItem = useCallback(() => {
    if (!lightboxItem) return
    const idx = items.findIndex((i) => i.id === lightboxItem.id)
    setLightboxItem(items[(idx - 1 + items.length) % items.length])
  }, [lightboxItem, items])

  const nextItem = useCallback(() => {
    if (!lightboxItem) return
    const idx = items.findIndex((i) => i.id === lightboxItem.id)
    setLightboxItem(items[(idx + 1) % items.length])
  }, [lightboxItem, items])

  // Keyboard nav
  const handleKeyDown = useCallback((e) => {
    if (!lightboxItem) return
    if (e.key === 'ArrowLeft') prevItem()
    if (e.key === 'ArrowRight') nextItem()
    if (e.key === 'Escape') closeLightbox()
  }, [lightboxItem, prevItem, nextItem, closeLightbox])

  return (
    <section
      id="galerie"
      ref={sectionRef}
      className="relative py-16 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #090909 0%, #151412 100%)' }}
      aria-labelledby="gallery-heading"
      onKeyDown={handleKeyDown}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(184,132,61,0.12), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-eyebrow justify-center mb-6"
          >
            Galerie
          </motion.div>
          <motion.h2
            id="gallery-heading"
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-light"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: 'var(--ivory)', letterSpacing: '-0.02em' }}
          >
            Le travail{' '}
            <em className="text-brass not-italic">parle de lui-même</em>
          </motion.h2>
        </div>

        {/* Dev mode notice */}
        {published.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-center mb-10 px-4 py-3 rounded-lg mx-auto max-w-lg"
            style={{ background: 'rgba(184,132,61,0.06)', border: '1px solid rgba(184,132,61,0.15)' }}
          >
            <p className="font-sans text-xs text-brass/60" style={{ letterSpacing: '0.05em' }}>
              Mode développement — Ajoutez vos photos dans{' '}
              <code className="text-brass">src/data/galleryData.js</code>
            </p>
          </motion.div>
        )}

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className={`${
                item.aspect === 'landscape' && i % 5 === 0 ? 'col-span-2' : ''
              } ${
                item.aspect === 'portrait' && i % 7 === 0 ? 'row-span-2' : ''
              }`}
            >
              <GalleryCard item={item} onClick={openLightbox} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href={businessConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Voir les photos sur Google Maps
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            item={lightboxItem}
            items={items}
            onClose={closeLightbox}
            onPrev={prevItem}
            onNext={nextItem}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
