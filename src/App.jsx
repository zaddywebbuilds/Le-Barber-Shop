import { useState, lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { businessConfig } from './data/businessConfig'

// Eager imports (above fold)
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'

// Lazy imports (below fold)
const ExperienceSection = lazy(() => import('./components/ExperienceSection'))
const ServicesSection = lazy(() => import('./components/ServicesSection'))
const StyleExplorer = lazy(() => import('./components/StyleExplorer'))
const GallerySection = lazy(() => import('./components/GallerySection'))
const AboutSection = lazy(() => import('./components/AboutSection'))
const GoogleReviews = lazy(() => import('./components/GoogleReviews'))
const LocationSection = lazy(() => import('./components/LocationSection'))
const FinalCTA = lazy(() => import('./components/FinalCTA'))
const Footer = lazy(() => import('./components/Footer'))

const SectionFallback = () => (
  <div
    className="flex items-center justify-center py-32"
    aria-hidden="true"
  >
    <div
      className="rounded-full animate-spin-slow"
      style={{
        width: 32,
        height: 32,
        border: '1px solid rgba(184,132,61,0.2)',
        borderTopColor: 'rgba(184,132,61,0.6)',
      }}
    />
  </div>
)

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Helmet>
        <html lang="fr" />
        <title>Le Barber Shop | Coiffeur Barbier à Évreux</title>
        <meta
          name="description"
          content="Découvrez Le Barber Shop à Évreux, un espace dédié à la coiffure masculine, au style et au soin du détail. Retrouvez le salon et préparez votre prochaine visite."
        />
        <link rel="canonical" href="https://lebarbershop-evreux.fr" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Loading screen */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Cursor */}
      <CustomCursor />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      <main id="main-content">
        {/* Hero — eager */}
        <Hero />

        {/* Below fold — lazy */}
        <Suspense fallback={<SectionFallback />}>
          <ExperienceSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ServicesSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <StyleExplorer />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <GallerySection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <GoogleReviews />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <LocationSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <FinalCTA />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}
