/**
 * ============================================================
 *  Le Barber Shop — Galerie
 *  Remplacez les placeholders par les vraies photos du salon.
 *
 *  ATTENTION : N'utilisez que des photos autorisées et dont
 *  vous détenez les droits. Ne publiez pas de photos de
 *  clients sans leur consentement explicite.
 * ============================================================
 */

// Palette de couleurs pour les placeholders SVG
const placeholderColors = [
  '#2A201A', '#1A1510', '#3A2C22', '#251C16',
  '#1E1812', '#302418', '#2E2019', '#1C1510',
]

export const galleryData = [
  {
    id: 1,
    src: 'images/gallery/coupe-degrade.jpg',
    placeholder: false,
    alt: 'Coupe dégradé — Le Barber Shop Évreux',
    category: 'coupe',
    aspect: 'portrait',
    published: true,
  },
  {
    id: 2,
    src: 'images/gallery/shopfront.jpg',
    placeholder: false,
    alt: 'Devanture du salon Le Barber Shop, Évreux',
    category: 'salon',
    aspect: 'portrait',
    published: true,
  },
  {
    id: 3,
    src: 'images/gallery/exterior.jpg',
    placeholder: false,
    alt: 'Le Barber Shop — 62 Avenue Aristide Briand, Évreux',
    category: 'salon',
    aspect: 'landscape',
    published: true,
  },
  {
    id: 4,
    // src: 'images/gallery/barbe-01.jpg', // [PHOTO À AJOUTER]
    placeholder: true,
    placeholderColor: placeholderColors[2],
    alt: 'Entretien de barbe — Le Barber Shop',
    category: 'barbe',
    aspect: 'portrait',
    published: false,
  },
  {
    id: 5,
    // src: 'images/gallery/coupe-02.jpg', // [PHOTO À AJOUTER]
    placeholder: true,
    placeholderColor: placeholderColors[4],
    alt: 'Coupe structurée — Le Barber Shop',
    category: 'coupe',
    aspect: 'portrait',
    published: false,
  },
  {
    id: 6,
    // src: 'images/gallery/interieur-02.jpg', // [PHOTO À AJOUTER]
    placeholder: true,
    placeholderColor: placeholderColors[5],
    alt: 'Intérieur du salon Le Barber Shop',
    category: 'salon',
    aspect: 'square',
    published: false,
  },
  {
    id: 7,
    // src: 'images/gallery/coupe-03.jpg', // [PHOTO À AJOUTER]
    placeholder: true,
    placeholderColor: placeholderColors[6],
    alt: 'Coupe classique — Le Barber Shop',
    category: 'coupe',
    aspect: 'portrait',
    published: false,
  },
  {
    id: 8,
    // src: 'images/gallery/finitions-01.jpg', // [PHOTO À AJOUTER]
    placeholder: true,
    placeholderColor: placeholderColors[7],
    alt: 'Finitions et contours précis',
    category: 'finition',
    aspect: 'landscape',
    published: false,
  },
]

export const getPublishedGallery = () =>
  galleryData.filter((item) => item.published)
