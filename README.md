# Portfolio — Pierre Riss

Portfolio personnel moderne (style Apple), construit avec **Vue 3 + Vite + Tailwind CSS v4**.

## Démarrer

```bash
npm install
npm run dev      # serveur de développement (http://localhost:5173)
npm run build    # build de production dans dist/
npm run preview  # prévisualiser le build
```

## Personnaliser

**Tout le contenu** est centralisé dans un seul fichier :

```
src/data/content.js
```

Tu y trouves :

- `profile` — nom, titre, email, téléphone, localisation, liens GitHub/LinkedIn.
- `availability` — bannière de disponibilité.
- `skills` — compétences groupées par catégorie.
- `experiences` — expériences professionnelles.
- `projects` — **placeholders de projets**. Ajoute `link` (démo) et `repo` (code)
  quand ils sont prêts ; le bouton apparaît automatiquement.
- `education`, `languages`, `hobbies`.

### Ajouter une image à un projet

Les cartes projet affichent un placeholder « Aperçu à venir ».
Pour brancher une vraie image, dépose-la dans `public/` puis adapte
`src/components/ProjectsSection.vue` (la zone `.rounded-3xl` de l'en-tête de carte).

## Structure

```
src/
├── data/content.js        ← édite ton contenu ici
├── components/            ← sections du site
├── directives/reveal.js   ← animation d'apparition au scroll
├── style.css              ← thème Tailwind + styles globaux
└── App.vue
```
