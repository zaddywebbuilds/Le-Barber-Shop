import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { ExternalLink, Star } from 'lucide-react'
import { businessConfig } from '../data/businessConfig'

// Real Google reviews — Le Barber Shop, Évreux (juin–juillet 2025)
const reviews = [
  {
    id: 1,
    name: 'Christophe ROTH',
    initial: 'CR',
    badge: 'Guide local',
    date: 'Il y a 3 semaines',
    text: "Excellent barbier ! Accueil chaleureux, professionnel très attentionné et travail méticuleux. La coupe est impeccable, réalisée avec précision dans une atmosphère agréable. On se sent immédiatement à l'aise. Je le recommande vivement et reviendrai avec plaisir.",
    featured: true,
    color: '#8B6030',
  },
  {
    id: 2,
    name: 'Yusuf',
    initial: 'Y',
    date: 'Il y a un mois',
    text: "Excellent barbier ! Les coupes sont parfaitement réalisées, l'endroit est propre et accueillant. Très bon rapport qualité-prix, je le recommande vivement !",
    color: '#4A6080',
  },
  {
    id: 3,
    name: 'Ferhan Yildiz',
    initial: 'FY',
    date: 'Il y a un mois',
    text: "J'y suis allé par hasard, et ce n'est certainement pas la dernière fois ! Salon très professionnel, propre et bien entretenu. Une très bonne expérience — allez-y sans hésiter !",
    color: '#5A3A48',
  },
  {
    id: 4,
    name: 'Muhittin Aktar',
    initial: 'MA',
    date: 'Il y a un mois',
    text: "Excellente expérience ! J'y ai emmené mes enfants et tout s'est très bien passé. Personnel accueillant, patient et professionnel. Je recommande vivement.",
    color: '#3A5040',
  },
  {
    id: 5,
    name: 'Ceb Pol',
    initial: 'CP',
    badge: 'Récent',
    date: 'Il y a 2 semaines',
    text: "C'est un bon coiffeur, à 100 %. Je le recommande : méticuleux, très hygiénique, un vrai professionnel.",
    color: '#604830',
  },
  {
    id: 6,
    name: 'Mo Ben',
    initial: 'MB',
    badge: 'Guide local',
    date: 'Il y a un mois',
    text: "Barbier hautement professionnel ! Il est très méticuleux — moi et les enfants sommes très heureux !",
    color: '#405068',
  },
  {
    id: 7,
    name: 'Aurélien Dupont',
    initial: 'AD',
    badge: 'Récent',
    date: 'Il y a 2 semaines',
    text: "Excellent salon. Coiffeur très professionnel. Super accueil. Très propre.",
    color: '#503860',
  },
  {
    id: 8,
    name: 'Pierre-Antoine G.',
    initial: 'PA',
    date: 'Il y a un mois',
    text: "Coiffeur que je recommande vivement ! Très gentil, très professionnel. Prend son temps et est attentif à chaque finition.",
    color: '#384858',
  },
  {
    id: 9,
    name: 'Teroura',
    initial: 'T',
    badge: 'Récent',
    date: 'Il y a 3 semaines',
    text: "Excellent barbier, accueil chaleureux, très sympathique, rien à dire sur la coupe. Je le recommande vivement — vous ne le regretterez pas.",
    color: '#6A3830',
  },
]

// All 5-star rating
function Stars({ size = 13 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 étoiles sur 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={size} style={{ color: '#F5BD00', fill: '#F5BD00' }} aria-hidden="true" />
      ))}
    </div>
  )
}

function ReviewCard({ review, index, inView }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl p-5 flex flex-col gap-4 ${review.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
      style={{
        background: 'linear-gradient(145deg, rgba(30,24,18,0.85) 0%, rgba(18,16,14,0.9) 100%)',
        border: '1px solid rgba(184,132,61,0.1)',
        boxShadow: review.featured
          ? '0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(184,132,61,0.12)'
          : '0 2px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(184,132,61,0.06)',
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="rounded-full flex items-center justify-center flex-shrink-0 font-sans font-semibold"
            style={{
              width: 38, height: 38,
              background: review.color,
              color: 'rgba(245,240,232,0.9)',
              fontSize: '0.7rem',
              letterSpacing: '0.05em',
            }}
            aria-hidden="true"
          >
            {review.initial}
          </div>

          {/* Name + badge */}
          <div>
            <p className="font-sans font-medium" style={{ fontSize: '0.82rem', color: 'rgba(239,217,177,0.85)' }}>
              {review.name}
            </p>
            {review.badge && (
              <span
                className="font-sans"
                style={{ fontSize: '0.65rem', color: 'rgba(184,132,61,0.65)', letterSpacing: '0.06em' }}
              >
                {review.badge}
              </span>
            )}
          </div>
        </div>

        {/* Google logo */}
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-label="Google" className="flex-shrink-0 mt-0.5 opacity-50">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      </div>

      {/* Stars + date */}
      <div className="flex items-center justify-between gap-2">
        <Stars />
        <span className="font-sans" style={{ fontSize: '0.68rem', color: 'rgba(245,240,232,0.28)' }}>
          {review.date}
        </span>
      </div>

      {/* Review text */}
      <p
        className="font-sans leading-relaxed flex-1"
        style={{
          fontSize: review.featured ? '0.875rem' : '0.82rem',
          color: 'rgba(245,240,232,0.6)',
          fontStyle: review.featured ? 'italic' : 'normal',
        }}
      >
        {review.featured ? `"${review.text}"` : review.text}
      </p>
    </motion.article>
  )
}

export default function GoogleReviews() {
  const [sectionRef, inView] = useInView({ threshold: 0.08 })

  return (
    <section
      id="avis"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #151412 0%, #0D0B09 100%)' }}
      aria-labelledby="reviews-heading"
    >
      {/* Divider top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(184,132,61,0.15), transparent)' }}
      />

      {/* Background glow */}
      <div className="absolute pointer-events-none" style={{
        top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 400,
        background: 'radial-gradient(ellipse, rgba(184,132,61,0.06) 0%, transparent 70%)',
        filter: 'blur(70px)',
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-14">
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
            className="font-display font-light mb-8"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', color: 'var(--ivory)', letterSpacing: '-0.02em' }}
          >
            Ce qu'en disent{' '}
            <em className="text-brass not-italic">nos clients</em>
          </motion.h2>

          {/* Rating summary pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-4 rounded-full px-6 py-3"
            style={{
              background: 'rgba(184,132,61,0.07)',
              border: '1px solid rgba(184,132,61,0.2)',
            }}
          >
            <Stars size={15} />
            <span className="font-display text-brass" style={{ fontSize: '1.35rem', fontWeight: 300, letterSpacing: '-0.01em' }}>
              5,0
            </span>
            <div style={{ width: 1, height: 18, background: 'rgba(184,132,61,0.25)' }} />
            <span className="font-sans" style={{ fontSize: '0.8rem', color: 'rgba(239,217,177,0.55)', letterSpacing: '0.04em' }}>
              18 avis Google
            </span>
          </motion.div>
        </div>

        {/* ── Reviews grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {reviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} inView={inView} />
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="flex flex-col items-center gap-4"
        >
          <a
            href={businessConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
            aria-label="Voir tous les avis Le Barber Shop sur Google (ouvre un nouvel onglet)"
          >
            Voir tous les avis sur Google
            <ExternalLink size={14} aria-hidden="true" />
          </a>

          <p className="font-sans" style={{ fontSize: '0.7rem', color: 'rgba(245,240,232,0.2)' }}>
            Avis authentiques publiés sur Google Maps · Le Barber Shop, Évreux
          </p>
        </motion.div>

      </div>

      {/* Divider bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(184,132,61,0.1), transparent)' }}
      />
    </section>
  )
}
