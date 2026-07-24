export const galleryData = [
  {
    id: 1,
    src: 'images/gallery/coupe-design-feuille.jpg',
    type: 'image',
    alt: 'Coupe avec dessin en feuille — Le Barber Shop Évreux',
    category: 'coupe',
    aspect: 'portrait',
    published: true,
  },
  {
    id: 2,
    src: 'images/gallery/coupe-design-geometrique.jpg',
    type: 'image',
    alt: 'Coupe avec motif géométrique — Le Barber Shop Évreux',
    category: 'coupe',
    aspect: 'portrait',
    published: true,
  },
  {
    id: 3,
    src: 'images/gallery/coupe-arabesque.jpg',
    type: 'image',
    alt: 'Coupe avec arabesques — Le Barber Shop Évreux',
    category: 'coupe',
    aspect: 'portrait',
    published: true,
  },
  {
    id: 4,
    src: 'images/gallery/coupe-classique-enfant.jpg',
    type: 'image',
    alt: 'Coupe classique enfant — Le Barber Shop Évreux',
    category: 'coupe',
    aspect: 'portrait',
    published: true,
  },
  {
    id: 5,
    src: 'images/gallery/couleur-platine.jpg',
    type: 'image',
    alt: 'Coloration platine cheveux et barbe — Le Barber Shop Évreux',
    category: 'couleur',
    aspect: 'portrait',
    published: true,
  },
]

export const getPublishedGallery = () =>
  galleryData.filter((item) => item.published)
