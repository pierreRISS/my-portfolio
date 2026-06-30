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
  {
    role: 'E-commerce & création de sites web',
    company: 'Freelance',
    period: 'Juin 2024 — Sept. 2024',
    type: 'Indépendant',
    points: [
      'Lancement et optimisation de 3 sites e-commerce Shopify : création, UX/UI et mise en ligne.',
      'Gestion et analyse de campagnes Facebook Ads pour générer du trafic et maximiser la visibilité.',
    ],
  },
  {
    role: 'Créateur de contenu — “@PierreHalo”',
    company: 'YouTube',
    period: 'Févr. 2024 — Juin 2024',
    type: 'Pédagogie',
    points: [
      'Vidéos pédagogiques sur la programmation, 100 000 vues cumulées.',
      'Conception, tournage, montage et publication.',
    ],
  },
]

// Projets — placeholders. Ajoute `link`, `repo`, `image`, etc. quand tu veux.
export const projects = [
  {
    name: 'Comptage de pièces de puzzle par IA',
    year: '2026',
    blurb:
      "Modèle de vision par ordinateur estimant le nombre de pièces d'un puzzle à partir d'une simple image.",
    details: [
      'Dataset de 30 000+ images généré par augmentation de données et données synthétiques.',
      'Pipeline de vision par ordinateur pour le comptage automatique.',
    ],
    tags: ['Python', 'PyTorch', 'Computer Vision'],
    accent: 'from-indigo-500/30 to-purple-500/20',
    link: '',
    repo: '',
  },
  {
    name: 'Zappy',
    year: 'Juin 2026',
    blurb:
      "Simulation réseau temps réel : serveur multiclient et client graphique d'un monde partagé.",
    details: [
      "Serveur multiclient gérant une carte de joueurs et de ressources.",
      'Synchronisation de l’état du monde entre plusieurs clients en temps réel.',
    ],
    tags: ['C++', 'Réseau', 'Temps réel'],
    accent: 'from-emerald-500/30 to-teal-500/20',
    link: '',
    repo: '',
  },
  {
    name: 'Raytracer',
    year: 'Avril 2026',
    blurb:
      "Moteur de rendu 3D générant des images à partir d'une scène virtuelle décrite par fichier.",
    details: [
      'Primitives géométriques, éclairages et calculs d’intersections de rayons.',
      'Rendu d’une scène virtuelle vers une image.',
    ],
    tags: ['C++', 'SFML', 'Rendu 3D'],
    accent: 'from-amber-500/30 to-orange-500/20',
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
