/**
 * ============================================================
 *  Le Barber Shop — Configuration centrale du business
 *  Mettez à jour ce fichier pour modifier les informations
 *  affichées sur le site.
 * ============================================================
 *
 *  INSTRUCTIONS :
 *  - Remplacez chaque valeur null ou placeholder par
 *    l'information réelle avant la mise en ligne.
 *  - Les champs null masqueront automatiquement l'élément
 *    concerné dans l'interface.
 * ============================================================
 */

export const businessConfig = {
  // ─── Identité ────────────────────────────────────────────
  name: 'Le Barber Shop',
  tagline: "L'exigence du détail, le style en héritage.",
  subTagline: "Plus qu'une coupe, une expérience.",
  description:
    "Le Barber Shop est un espace de coiffure et de soin masculin situé à Évreux. L'expérience est construite autour d'une idée simple : écouter, travailler avec précision et accorder de l'importance à chaque finition.",
  type: 'Coiffeur Barbier',

  // ─── Adresse ─────────────────────────────────────────────
  address: {
    street: '62 Avenue Aristide Briand',
    city: 'Évreux',
    postalCode: '27000',
    country: 'France',
    full: '62 Avenue Aristide Briand, 27000 Évreux',
  },

  // ─── Coordonnées GPS ─────────────────────────────────────
  coordinates: {
    lat: 49.0173808,
    lng: 1.1237995,
  },

  // ─── Google Maps ─────────────────────────────────────────
  googleMapsUrl:
    'https://www.google.com/maps/place/Le+Barber+Shop/@49.0173808,1.1237995,17z/data=!3m1!4b1!4m6!3m5!1s0x47e14172f7221f1b:0xbec60b606d9bf61d!8m2!3d49.0173808!4d1.1237995!16s%2Fg%2F11nc26bvp1?entry=ttu',

  // ─── Contact ─────────────────────────────────────────────
  // Remplacez null par le numéro de téléphone réel, ex: '+33 2 32 00 00 00'
  phone: null, // [PHONE NUMBER TO BE CONFIRMED]

  // ─── Horaires d'ouverture ─────────────────────────────────
  // Remplacez null par les horaires réels
  // Format: { day: 'Lundi', hours: '09h00 – 19h00' }
  openingHours: null, // [OPENING HOURS TO BE CONFIRMED]
  // Exemple une fois confirmées :
  // openingHours: [
  //   { day: 'Lundi', hours: '09h00 – 19h00' },
  //   { day: 'Mardi', hours: '09h00 – 19h00' },
  //   { day: 'Mercredi', hours: '09h00 – 19h00' },
  //   { day: 'Jeudi', hours: '09h00 – 19h00' },
  //   { day: 'Vendredi', hours: '09h00 – 19h00' },
  //   { day: 'Samedi', hours: '08h30 – 18h00' },
  //   { day: 'Dimanche', hours: 'Fermé' },
  // ],

  // ─── Prise de rendez-vous ─────────────────────────────────
  // Remplacez null par le lien de réservation (Planity, Booksy, etc.)
  bookingUrl: null, // [BOOKING LINK TO BE ADDED]

  // ─── Réseaux sociaux ─────────────────────────────────────
  // Ne pas publier de liens fictifs — vérifier avant d'activer
  social: {
    instagram: null, // ex: 'https://instagram.com/lebarbershop_evreux'
    facebook: null,  // ex: 'https://facebook.com/lebarbershop'
    tiktok: null,
  },

  // ─── Google Places API ───────────────────────────────────
  // Fournissez une clé API Google Places pour afficher les
  // avis vérifiés directement sur le site
  googlePlacesApiKey: null, // [GOOGLE PLACES API KEY TO BE ADDED]
  googlePlaceId: 'ChIJGx8i9yJB4UcR3fbBbWALxr4', // Place ID extrait de l'URL Maps

  // ─── Informations légales ────────────────────────────────
  legal: {
    siret: null, // [SIRET TO BE CONFIRMED]
    rcs: null,
    copyright: `© ${new Date().getFullYear()} Le Barber Shop. Tous droits réservés.`,
  },
}
