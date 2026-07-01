// Prefixe un chemin d'asset public avec la base Vite (ex: '/my-portfolio/'),
// pour que les images fonctionnent aussi quand le site n'est pas a la racine
// du domaine (cas GitHub Pages).
export function assetUrl(path) {
  if (!path) return path
  return import.meta.env.BASE_URL + String(path).replace(/^\//, '')
}
