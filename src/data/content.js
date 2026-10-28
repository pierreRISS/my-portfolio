// ─────────────────────────────────────────────────────────────────────────────
//  Contenu du portfolio — modifie librement ce fichier pour mettre à jour le site.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Pierre Riss',
  title: 'Développeur full-stack & cloud',
  school: 'Étudiant en 3ᵉ année à Epitech',
  pitch:
    'Je conçois, déploie et maintiens des produits en production : des apps mobiles publiées sur les stores et un SaaS hébergé sur le cloud, de la CI/CD jusqu’au monitoring.',
  aside:
    'À côté, je fais de l’impro et j’anime des ateliers d’éloquence. Expliquer clairement un choix technique, ça s’entraîne aussi.',
  photo: '', // ← ex: '/photo.jpg' (fichier à déposer dans /public)
  location: 'Lyon · Chambéry',
  email: 'pierre.riss.pro@gmail.com',
  phone: '07 69 19 20 57',
  phoneHref: '+33769192057',
  github: 'https://github.com/pierreRISS',
  linkedin: 'https://www.linkedin.com/in/pierre-riss-b90bb227a',
}

export const availability = {
  label: 'Recherche un stage',
  period: 'Entre le 29 mars et le 23 août 2027',
  detail: '5 à 6 mois · full-stack / cloud · startup de préférence',
}

export const highlights = [
  { value: '5', label: 'apps publiées sur les stores' },
  { value: '5 000+', label: 'installations cumulées' },
  { value: '200+', label: 'inscrits sur Guava' },
]

export const experiences = [
  {
    role: 'Co-fondateur & développeur',
    company: 'Guava',
    link: 'https://app.guava.study/',
    period: 'Juin 2026 — aujourd’hui',
    summary:
      'SaaS de révision pour les étudiants en santé (PASS / LAS), co-construit avec un étudiant en médecine. Je porte le produit et la technique.',
    points: [
      'CI/CD montée seul sur Codemagic : build de l’image Docker, push sur un registre, déploiement sur Scaleway.',
      'Hébergement Scaleway avec autoscaling et Edge Services. HTTPS, secrets côté back-end, contrôle d’accès par rôles.',
      'Conception produit : le chapitre comme unité de base, planning de révision fixé par l’étudiant (méthode des J).',
      'Évaluation coût / qualité de plusieurs LLM pour la génération de QCM.',
    ],
    metric: '200+ inscrits',
    tags: ['Docker', 'Scaleway', 'Codemagic', 'CI/CD', 'LLM'],
  },
  {
    role: 'Développeur mobile — mise en production',
    company: 'ET Edutainment',
    link: 'https://www.et-edutainment.com/en',
    period: 'Sept. 2026 — Fév. 2027',
    summary:
      'Stage à temps partiel, complété par du freelance. Seul développeur : je transforme des apps web React / TypeScript en apps natives et je gère toute leur mise en production.',
    points: [
      'Packaging iOS et Android avec Capacitor et Firebase.',
      'Publication App Store et Play Store : signature, profils de provisionnement, fiches des stores.',
      'Déploiement automatisé avec Codemagic : un push sur main déclenche un build TestFlight.',
      'Monitoring avec Crashlytics et Analytics, achats in-app avec RevenueCat.',
      'Retouche du site qui présente les apps, pour améliorer la conversion vers les stores.',
    ],
    metric: '5 apps · 5 000+ installations',
    press: 'Artlea, l’une des apps publiées, a fait l’objet d’un article dans Le Progrès.',
    tags: ['Capacitor', 'Firebase', 'Codemagic', 'RevenueCat', 'iOS', 'Android'],
  },
  {
    role: 'Régie vidéo live & sous-titrage temps réel',
    company: 'Captivea',
    period: 'Sept. 2026 · mission',
    summary: 'Captation et diffusion en direct d’un événement dans un cinéma.',
    points: [
      'Régie deux caméras et live streaming de l’événement.',
      'Sous-titrage FR → EN en direct, après comparaison de solutions speech-to-text (Gladia, Kyutai) et arbitrage stabilité / latence.',
      'Rédaction des spécifications techniques et coordination avec le lieu.',
    ],
    tags: ['Speech-to-text', 'Live', 'Gestion de projet'],
  },
  {
    role: 'Stage développeur R&D et intégration',
    company: 'Anav — Pilote Soft',
    period: 'Juil. 2025 — Déc. 2025',
    summary: 'Startup SaaS.',
    points: [
      'Développement full-stack FastAPI + Vue.js, fonctionnalités conçues et déployées en production.',
      'Conception d’heuristiques pour structurer des données.',
    ],
    tags: ['Python', 'FastAPI', 'Vue.js'],
  },
]

// Projet vitrine, affiché en grand en tête de la section Projets
export const featuredProject = {
  name: 'Guava',
  context: 'Co-fondé · en production',
  blurb:
    'Révision pour les étudiants en santé : l’étudiant choisit ses chapitres et ses échéances, Guava lui propose chaque jour la session qui fait avancer son programme.',
  tags: ['Docker', 'Scaleway', 'Codemagic', 'LLM'],
  image: '/projects/guava.jpg',
  link: 'https://app.guava.study/',
  linkLabel: 'app.guava.study',
}

// Projets avec visuel. Champs :
//   image    → chemin dans /public (ex: '/projects/zappy.png')
//   imageFit → 'cover' (défaut) ou 'contain' (captures mobiles)
//   link / repo → liens "Voir" et "Code" (affichés s'ils sont remplis)
export const projects = [
  {
    name: 'Zelia',
    context: 'Projet Hub Epitech · 1ʳᵉ année',
    blurb:
      'Détection et comptage de pièces de puzzle pour Emmaüs avec YOLO. Dataset généré synthétiquement sous Blender, puis enrichi par data augmentation.',
    tags: ['YOLO', 'Python', 'Blender', 'Vision'],
    image: '/projects/zelia.jpg',
    repo: 'https://github.com/pierreRISS/Zelia-',
  },
  {
    name: 'Zappy',
    context: 'Epitech · Juin 2026',
    blurb:
      'Serveur multi-clients et client graphique pour une simulation réseau en temps réel : une carte partagée, synchronisée entre tous les clients.',
    tags: ['C++', 'Sockets TCP', 'Threads'],
    image: '/projects/zappy.png',
  },
  {
    name: 'Lunar Lander',
    context: 'Epitech · Avril 2026',
    blurb:
      'Agent d’apprentissage par renforcement qui pilote l’atterrissage d’un vaisseau dans un environnement physique simulé.',
    tags: ['Python', 'PyTorch', 'RL'],
    image: '/projects/lunarlander.png',
  },
  {
    name: 'Raytracer',
    context: 'Epitech · Avril 2026',
    blurb:
      'Moteur de rendu 3D : primitives, éclairages, réflexions et intersections de rayons, à partir d’une scène décrite par fichier.',
    tags: ['C++', 'Rendu 3D'],
    image: '/projects/raytracer.png',
  },
  {
    name: 'HistoChrono',
    context: 'ET Edutainment',
    blurb:
      'Jeu d’histoire mobile : placer des événements sur une frise chronologique. Packagé avec Capacitor et publié sur les stores.',
    tags: ['Capacitor', 'iOS', 'Android'],
    image: '/projects/histochrono.png',
    imageFit: 'contain',
    link: 'https://apps.apple.com/us/developer/et-edutainment/id6773749443',
  },
]

// Autres projets, affichés en liste compacte (sans visuel)
export const otherProjects = [
  {
    name: 'Arcade',
    meta: 'C++',
    blurb:
      'Plateforme de jeux où chaque jeu et chaque bibliothèque graphique est une .so chargée à l’exécution. J’ai porté l’architecture.',
  },
  {
    name: 'R-Type',
    meta: 'En cours',
    blurb:
      'Jeu multijoueur client / serveur avec protocole binaire et serveur faisant autorité. Je m’occupe de la partie audio.',
  },
  {
    name: 'CallSens',
    meta: 'Projet Hub',
    blurb: 'Une IA qui coache la prospection téléphonique.',
  },
  {
    name: 'Hackathon Aidant',
    meta: 'Oct. 2026',
    blurb:
      'Produit pour aider les familles d’aidants à se répartir la charge, conçu et pitché en un week-end.',
  },
  {
    name: 'my_radar',
    meta: 'C · CSFML',
    blurb:
      'Simulation 2D de trafic aérien avec tours de contrôle et détection des collisions.',
  },
]

export const skills = [
  {
    label: 'Cloud & DevOps',
    items: ['Docker', 'Docker Compose', 'Scaleway', 'CI/CD Codemagic', 'Linux', 'Bash'],
  },
  {
    label: 'Mobile',
    items: ['Capacitor', 'Firebase', 'RevenueCat', 'App Store Connect', 'Play Console'],
  },
  { label: 'Back-end', items: ['Python', 'FastAPI', 'PostgreSQL', 'Alembic'] },
  { label: 'Front-end', items: ['Vue 3', 'Vite', 'Tailwind CSS', 'React', 'TypeScript'] },
  { label: 'Langages', items: ['Python', 'C', 'C++', 'TypeScript'] },
  {
    label: 'IA / ML',
    items: ['PyTorch', 'YOLO', 'Apprentissage par renforcement', 'Datasets synthétiques', 'LLM', 'Speech-to-text'],
  },
  { label: 'Réseau & systèmes', items: ['Sockets TCP', 'Threads', 'Protocoles binaires', 'Bibliothèques dynamiques'] },
]

export const education = [
  {
    school: 'Epitech',
    detail: 'Programme Grande École, ingénierie logicielle (Bac+5)',
    period: '3ᵉ année · en cours',
  },
  {
    school: 'Baccalauréat',
    detail: 'Spécialités Informatique (NSI) et Mathématiques',
  },
]

export const languages = [
  { name: 'Français', level: 'Langue maternelle' },
  { name: 'Anglais', level: 'Courant · 780 au TEPitech, 2 ans de scolarité aux États-Unis' },
]

export const involvement = [
  {
    name: 'Imp(r)ose-Toi !',
    detail:
      'Association d’éloquence et d’impro. Au bureau, chargé d’ateliers : deux ateliers de 2 h par semaine.',
  },
  {
    name: 'Ambassadeur Epitech',
    detail: 'Salons, journées portes ouvertes et présentations en lycée.',
  },
]

export const interests = ['Théâtre d’impro', 'Stand-up', 'Guitare', 'Aviation', 'Impression 3D']
