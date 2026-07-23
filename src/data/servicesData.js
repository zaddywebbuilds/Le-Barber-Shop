/**
 * ============================================================
 *  Le Barber Shop — Services
 *  Modifiez ce fichier pour ajouter, modifier ou supprimer
 *  des prestations.
 *
 *  ATTENTION : Toutes les entrées sont en statut
 *  published: false jusqu'à confirmation par le propriétaire.
 *  Passez published: true uniquement après vérification.
 * ============================================================
 */

export const servicesData = [
  {
    id: 'coupe-homme',
    name: 'Coupe Homme',
    description:
      'Une coupe soignée adaptée à votre morphologie et à votre style. Finitions précises à la tondeuse et aux ciseaux.',
    // price: null, // [PRICE TO BE CONFIRMED]
    // duration: null, // [DURATION TO BE CONFIRMED]
    featured: true,
    category: 'coupe',
    icon: 'scissors',
    published: false, // [À CONFIRMER PAR LE PROPRIÉTAIRE]
  },
  {
    id: 'entretien-barbe',
    name: 'Entretien de Barbe',
    description:
      'Taille, contours et soin de la barbe pour un résultat net et structuré.',
    // price: null,
    // duration: null,
    featured: false,
    category: 'barbe',
    icon: 'blade',
    published: false, // [À CONFIRMER PAR LE PROPRIÉTAIRE]
  },
  {
    id: 'coupe-barbe',
    name: 'Coupe + Barbe',
    description:
      'La formule complète : coupe personnalisée associée à un entretien soigné de la barbe.',
    // price: null,
    // duration: null,
    featured: true,
    category: 'formule',
    icon: 'combo',
    published: false, // [À CONFIRMER PAR LE PROPRIÉTAIRE]
  },
  {
    id: 'contours-finitions',
    name: 'Contours & Finitions',
    description:
      'Reprise des contours, dessin de la nuque et retouche des lignes pour un rendu impeccable entre deux coupes.',
    // price: null,
    // duration: null,
    featured: false,
    category: 'finition',
    icon: 'detail',
    published: false, // [À CONFIRMER PAR LE PROPRIÉTAIRE]
  },
  {
    id: 'coupe-jeune',
    name: 'Coupe Enfant / Adolescent',
    description:
      'Coupe adaptée aux plus jeunes, dans un cadre décontracté et rassurant.',
    // price: null,
    // duration: null,
    featured: false,
    category: 'jeune',
    icon: 'junior',
    published: false, // [À CONFIRMER PAR LE PROPRIÉTAIRE]
  },
]

// Retourne uniquement les services publiés et validés
export const getPublishedServices = () =>
  servicesData.filter((s) => s.published)

// Retourne le service mis en avant
export const getFeaturedService = () =>
  servicesData.filter((s) => s.published && s.featured)[0] || null
