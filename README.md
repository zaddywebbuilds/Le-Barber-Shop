# Le Barber Shop — Site officiel

> **L'exigence du détail. Le style en héritage.**
> 62 Avenue Aristide Briand, 27000 Évreux

Site web premium pour Le Barber Shop, coiffeur barbier à Évreux.
Construit avec React 18, Vite, Tailwind CSS, Framer Motion et React Three Fiber.

---

## Table des matières

1. [Démarrage rapide](#démarrage-rapide)
2. [Structure du projet](#structure-du-projet)
3. [Configuration du contenu](#configuration-du-contenu)
4. [Déploiement](#déploiement)
5. [Domaine personnalisé](#domaine-personnalisé)
6. [Données Google Business](#données-google-business)
7. [Technologies](#technologies)

---

## Démarrage rapide

### Prérequis

- Node.js 18 ou supérieur
- npm 9 ou supérieur

### Installation

```bash
# Cloner ou télécharger le projet
cd "Le Barber Shop"

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez `http://localhost:5173` dans votre navigateur.

### Commandes disponibles

| Commande | Action |
|---|---|
| `npm run dev` | Démarre le serveur de développement |
| `npm run build` | Crée la version de production dans `/dist` |
| `npm run preview` | Prévisualise la version de production |

---

## Structure du projet

```
Le Barber Shop/
├── public/
│   ├── favicon.svg          # Icône du site
│   ├── robots.txt           # Configuration SEO robots
│   └── sitemap.xml          # Sitemap XML
├── src/
│   ├── components/          # Composants React
│   │   ├── Navbar.jsx
│   │   ├── MobileMenu.jsx
│   │   ├── Hero.jsx
│   │   ├── BarberChairScene.jsx   # Scène WebGL 3D
│   │   ├── ExperienceSection.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── StyleExplorer.jsx
│   │   ├── GallerySection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── GoogleReviews.jsx
│   │   ├── LocationSection.jsx
│   │   ├── FinalCTA.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── ScrollProgress.jsx
│   │   └── CustomCursor.jsx
│   ├── data/                # Contenu éditable
│   │   ├── businessConfig.js     ← MODIFIER ICI
│   │   ├── servicesData.js       ← MODIFIER ICI
│   │   └── galleryData.js        ← MODIFIER ICI
│   ├── hooks/
│   │   ├── useScrollProgress.js
│   │   ├── useInView.js
│   │   └── useWebGL.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Configuration du contenu

Toutes les informations du salon sont centralisées dans trois fichiers.
**Ne modifiez jamais directement les composants** — mettez à jour les fichiers de données uniquement.

### 1. `src/data/businessConfig.js` — Informations du salon

C'est le fichier principal à compléter avant la mise en ligne.

```js
export const businessConfig = {
  // ✅ Déjà configuré
  name: 'Le Barber Shop',
  address: { street: '62 Avenue Aristide Briand', city: 'Évreux', ... },
  coordinates: { lat: 49.0173808, lng: 1.1237995 },
  googleMapsUrl: '...',

  // 🔴 À compléter
  phone: '+33 2 XX XX XX XX',       // Numéro de téléphone
  bookingUrl: 'https://...',         // Lien Planity / Booksy / autre
  openingHours: [                    // Horaires d'ouverture
    { day: 'Lundi', hours: '09h00 – 19h00' },
    { day: 'Mardi', hours: '09h00 – 19h00' },
    // ...
    { day: 'Dimanche', hours: 'Fermé' },
  ],
  social: {
    instagram: 'https://instagram.com/...',  // Si disponible
    facebook: 'https://facebook.com/...',    // Si disponible
  },
  googlePlacesApiKey: 'AIza...',     // Pour afficher les avis Google
}
```

> **Important :** Laissez `null` pour tout champ non confirmé. Le site masquera automatiquement l'élément correspondant.

### 2. `src/data/servicesData.js` — Prestations

Modifiez ou ajoutez des services et passez `published: true` une fois validé.

```js
{
  id: 'coupe-homme',
  name: 'Coupe Homme',
  description: 'Description de la prestation...',
  price: 'XX €',              // Exemple : '22 €'
  duration: 'XX min',         // Exemple : '30 min'
  featured: true,             // Afficher en grand
  published: true,            // ← Passer à true pour afficher
}
```

### 3. `src/data/galleryData.js` — Galerie

Ajoutez vos photos dans `/public/images/gallery/` puis référencez-les :

```js
{
  id: 1,
  src: '/images/gallery/coupe-01.jpg',  // ← Décommentez et ajustez
  alt: 'Description de la photo',
  category: 'coupe',
  aspect: 'portrait',  // 'portrait' | 'landscape' | 'square'
  published: true,     // ← Passer à true pour afficher
}
```

---

## Déploiement

### Option A — GitHub Pages (gratuit)

1. **Créer un repository GitHub** nommé `le-barber-shop` (ou autre nom)

2. **Configurer la base URL** dans `vite.config.js` :
```js
// Si votre URL sera : https://votre-username.github.io/le-barber-shop/
base: '/le-barber-shop/',

// Si vous utilisez un domaine personnalisé (recommandé) :
base: '/',
```

3. **Initialiser git et pousser** :
```bash
git init
git add .
git commit -m "Initial commit — Le Barber Shop website"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/le-barber-shop.git
git push -u origin main
```

4. **Activer GitHub Pages** :
   - Aller dans Settings → Pages
   - Source : `GitHub Actions`

5. **Créer le workflow** `.github/workflows/deploy.yml` :
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
        id: deployment
```

### Option B — Netlify (recommandé pour les domaines personnalisés)

1. Aller sur [netlify.com](https://netlify.com)
2. "Add new site" → "Import an existing project"
3. Connecter votre repository GitHub
4. Build command : `npm run build`
5. Publish directory : `dist`
6. Cliquer "Deploy"

### Option C — Vercel

```bash
npm install -g vercel
vercel --prod
```

---

## Domaine personnalisé

### Sur Netlify

1. Site settings → Domain management → Add custom domain
2. Entrer `lebarbershop-evreux.fr` (ou votre domaine)
3. Suivre les instructions DNS fournies

### Sur GitHub Pages

1. Settings → Pages → Custom domain
2. Entrer votre domaine
3. Chez votre registrar DNS, créer :
   - Enregistrement `A` vers `185.199.108.153` (et les 3 autres IPs GitHub)
   - Ou enregistrement `CNAME` de `www` vers `votre-username.github.io`

### Mettre à jour `sitemap.xml`

Remplacez `https://lebarbershop-evreux.fr` par votre vraie URL dans `public/sitemap.xml`.

---

## Données Google Business

### Afficher les avis Google (Places API)

1. Aller sur [Google Cloud Console](https://console.cloud.google.com)
2. Créer un projet ou utiliser un existant
3. Activer l'API "Places API"
4. Créer des identifiants → Clé API
5. Restreindre la clé à votre domaine
6. Dans `src/data/businessConfig.js` :
```js
googlePlacesApiKey: 'AIzaSy...',  // Votre clé API
googlePlaceId: 'ChIJGx8i9yJB4UcR3fbBbWALxr4',  // Déjà configuré
```

### Ajouter votre numéro de téléphone et horaires

Vérifiez d'abord sur votre fiche Google Business, puis mettez à jour `businessConfig.js`.

---

## Technologies

| Technologie | Version | Usage |
|---|---|---|
| React | 18.3 | Framework UI |
| Vite | 5.2 | Build tool |
| Tailwind CSS | 3.4 | Styling |
| Framer Motion | 11.2 | Animations |
| React Three Fiber | 8.16 | WebGL / 3D |
| Three.js | 0.165 | Moteur 3D |
| React Router | 6.23 | Navigation |
| React Helmet Async | 2.0 | SEO meta tags |
| Lucide React | 0.379 | Icônes |

---

## Accessibilité

Le site respecte les standards WCAG 2.1 :
- Navigation au clavier complète
- Attributs ARIA appropriés
- Contraste suffisant
- Support prefers-reduced-motion
- Textes alternatifs sur toutes les images
- Sémantique HTML correcte

## Performance

- Chargement lazy des sections hors écran
- WebGL désactivé automatiquement si :
  - L'appareil ne supporte pas WebGL
  - L'utilisateur a activé `prefers-reduced-motion`
  - L'utilisateur a activé `Save-Data`
- Images responsive et lazy-loaded
- Code splitting automatique par section

---

*Site développé pour Le Barber Shop, Évreux — 2025*
