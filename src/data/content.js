// ─────────────────────────────────────────────────────────────────────────────
//  Contenu du portfolio — modifie librement ce fichier pour mettre à jour le site.
//  Les projets sont des "placeholders" : ajoute liens, images et détails plus tard.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  firstName: 'Pierre',
  lastName: 'Riss',
  title: 'Étudiant en informatique · Epitech',
  tagline: 'Développement logiciel, IA et systèmes.',
  intro:
    "Étudiant en 3ᵉ année à Epitech, passionné par le développement logiciel, l'intelligence artificielle et les systèmes. J'aime concevoir des produits soignés, de l'algorithme bas niveau jusqu'à l'interface.",
  location: 'Chambéry & Lyon',
  email: 'pierre.riss.pro@gmail.com',
  phone: '07 69 19 20 57',
  phoneHref: '+33769192057',
  github: '', // ← ajoute ton lien GitHub ici
  linkedin: '', // ← ajoute ton lien LinkedIn ici
}

export const availability = {
  badge: 'Disponible · Sept. 2026 → Fév. 2027',
  detail:
    'Recherche un CDD part-time de 6 mois (septembre à février), avec possibilité de poursuivre sur 6 mois de stage.',
}

export const skills = [
  {
    label: 'Langages',
    icon: 'code',
    items: ['C', 'C++', 'Python'],
  },
  {
    label: 'Back-end',
    icon: 'server',
    items: ['FastAPI', 'PostgreSQL'],
  },
  {
    label: 'Front-end',
    icon: 'layout',
    items: ['Vue 3', 'Vite', 'Tailwind CSS'],
  },
  {
    label: 'Data & IA',
    icon: 'brain',
    items: ['PyTorch', 'Machine Learning', 'Heuristiques'],
  },
  {
    label: 'Outils',
    icon: 'tool',
    items: ['Git', 'Linux'],
  },
]

export const experiences = [
  {
    role: 'Stage R&D, développement et intégration',
    company: 'Anav — Pilote Soft',
    period: 'Juil. 2025 — Déc. 2025',
    type: 'Startup SaaS',
    points: [
      'Développement full-stack FastAPI + Vue.js, fonctionnalités déployées en production.',
      'Intégration logicielle pour un SaaS métier utilisé par plus de 2000 utilisateurs.',
      "Conception d'heuristiques pour générer et structurer des données en vue de l'entraînement d'un modèle.",
      "Analyse des contraintes métier et conception d'une solution modulable pour automatiser la planification d'affaires.",
    ],
  },
]

// Projets. Champs disponibles par projet :
//   image      → chemin dans /public (ex: '/projects/guava.png')
//   imageFit   → 'cover' (défaut) ou 'contain' (pour captures mobiles)
//   status     → badge en bas du visuel (ex: 'Publiée sur les stores')
//   link / repo → boutons "Voir / Démo" et "Code" (apparaissent si remplis)
export const projects = [
  {
    name: 'Guava — Révision médecine par IA',
    year: '2025 — 2026',
    blurb:
      "Plateforme de révision pour les étudiants en santé (PASS / LAS) : sessions de QCM construites automatiquement à partir du programme, des échéances et des résultats de l'étudiant.",
    details: [
      'Application full-stack : Vue 3 + TypeScript en front, FastAPI + PostgreSQL en back.',
      "Moteur de révision priorisée et suivi de progression par chapitre.",
      "Projet mené en association avec un étudiant en médecine — actuellement en lancement (bêta ouverte).",
    ],
    tags: ['Vue 3', 'TypeScript', 'FastAPI', 'PostgreSQL', 'IA'],
    accent: 'from-blue-500/30 to-indigo-500/20',
    image: '/projects/guava.png',
    imageFit: 'cover',
    status: 'En bêta · en lancement',
    link: '',
    repo: '',
  },
  {
    name: 'HistoChrono',
    year: '2025 — 2026',
    blurb:
      "Jeu d'histoire mobile : place les événements sur une frise chronologique à travers les époques, de l'Antiquité à l'époque contemporaine.",
    details: [
      'Application mobile publiée sur le Google Play Store et déployée en production.',
      'Front TanStack Start + Vue, packagée en natif avec Capacitor (Android & iOS), back Supabase.',
      'Mission freelance, du développement jusqu’à la publication sur les stores.',
    ],
    tags: ['Mobile', 'Capacitor', 'Supabase', 'Freelance'],
    accent: 'from-amber-500/30 to-yellow-600/20',
    image: '/projects/histochrono.png',
    imageFit: 'contain',
    status: 'Publiée · Google Play',
    link: '',
    repo: '',
  },
  {
    name: 'Zelia — Comptage de puzzle par IA',
    year: '2026',
    blurb:
      "Projet perso : une app qui estime le nombre de pièces d'un puzzle à partir d'une simple photo, grâce à un modèle de vision par ordinateur.",
    details: [
      'Modèle de détection entraîné pour repérer et compter automatiquement les pièces (boîtes englobantes + scores de confiance).',
      'Dataset de 30 000+ images généré par augmentation de données et données synthétiques.',
      'Conception produit et développement menés en solo.',
    ],
    tags: ['Python', 'PyTorch', 'Computer Vision', 'Projet perso'],
    accent: 'from-pink-500/30 to-rose-500/20',
    image: '/projects/zelia.jpg',
    imageFit: 'cover',
    status: 'Projet perso · en cours',
    link: '', // ← tu pourras mettre le lien Zelia ici
    repo: '',
  },
  {
    name: 'Zappy',
    year: 'Juin 2026',
    blurb:
      "Simulation réseau temps réel : serveur multiclient et client graphique 3D d'un monde partagé.",
    details: [
      "Serveur multiclient gérant une carte de joueurs et de ressources.",
      'Synchronisation de l’état du monde entre plusieurs clients en temps réel.',
    ],
    tags: ['C++', 'Réseau', 'Temps réel'],
    accent: 'from-emerald-500/30 to-teal-500/20',
    image: '/projects/zappy.png',
    imageFit: 'cover',
    link: '',
    repo: '',
  },
  {
    name: 'Raytracer',
    year: 'Avril 2026',
    blurb:
      "Moteur de rendu 3D générant des images photoréalistes à partir d'une scène virtuelle décrite par fichier.",
    details: [
      'Primitives géométriques, éclairages, réflexions et calculs d’intersections de rayons.',
      'Rendu d’une scène virtuelle vers une image.',
    ],
    tags: ['C++', 'SFML', 'Rendu 3D'],
    accent: 'from-amber-500/30 to-orange-500/20',
    image: '/projects/raytracer.png',
    imageFit: 'cover',
    link: '',
    repo: '',
  },
  {
    name: 'Lunar Lander — Reinforcement Learning',
    year: 'Avril 2026',
    blurb:
      "Agent entraîné par renforcement pour piloter et faire atterrir un vaisseau dans un environnement physique simulé.",
    details: [
      "Mise en œuvre d'algorithmes d'apprentissage par renforcement.",
      "Optimisation de l'atterrissage dans un environnement physique simulé.",
    ],
    tags: ['Python', 'PyTorch', 'Reinforcement Learning'],
    accent: 'from-sky-500/30 to-blue-500/20',
    image: '/projects/lunarlander.png',
    imageFit: 'cover',
    link: '',
    repo: '',
  },
]

export const education = [
  {
    school: 'Epitech',
    diploma: 'Master en ingénierie logicielle',
    period: 'En cours — 3ᵉ année',
  },
  {
    school: 'Baccalauréat',
    diploma: 'Spécialités NSI (Informatique) & Mathématiques',
    period: 'Obtenu',
  },
]

export const languages = [
  { name: 'Français', level: 'Langue natale', value: 100 },
  { name: 'Anglais', level: 'Courant — 2 ans aux États-Unis', value: 90 },
]

export const hobbies = ['Éloquence', 'Guitare']
