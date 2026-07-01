#!/usr/bin/env bash
# Build le site et le pousse sur la branche gh-pages (GitHub Pages).
set -e

REPO="git@github.com:pierreRISS/my-portfolio.git"

echo "==> Build de production..."
npm run build

echo "==> Deploiement sur gh-pages..."
cd dist
touch .nojekyll
rm -rf .git
git init -q
git checkout -q -b gh-pages
git add -A
git -c user.name="Pierre Riss" -c user.email="pierre.riss.73@gmail.com" \
    commit -q -m "Deploy static site to GitHub Pages"
git push -f "$REPO" gh-pages
rm -rf .git
cd ..

echo "==> Termine ! Site en ligne : https://pierreriss.github.io/my-portfolio/"
