# Portfolio — Pierre Riss

Portfolio personnel sobre (colonne de présentation fixe + contenu qui défile), construit avec **Vue 3 + Vite + Tailwind CSS v4**.

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

- `profile` — nom, titre, accroche, email, téléphone, liens GitHub/LinkedIn.
- `availability` — encart « Recherche un stage ».
- `highlights` — chiffres clés sous la présentation.
- `experiences` — expériences professionnelles.
- `projects` — projets avec visuel (`image` dans `public/projects/`, `link`, `repo`).
- `otherProjects` — projets secondaires, affichés en liste compacte.
- `skills`, `education`, `languages`, `involvement`, `interests`.

## Structure

```
src/
├── data/content.js        ← édite ton contenu ici
├── components/            ← sections du site
├── style.css              ← thème Tailwind + styles globaux
└── App.vue
```
