# Journal de Tests — Éclipse PWA

**Dernière mise à jour** : 2026-01-08 03:15

---

## Légende statuts
- **OK** : Test passé, comportement conforme
- **BUG** : Problème identifié, à corriger
- **À vérifier** : Nécessite validation sur appareil réel

---

## Tests Session 2026-01-08

### [2026-01-08 02:30] (/categories)
- **Contexte** : Page catégories avec grille de 5 catégories
- **Action testée** : Affichage des pictos PNG sur fond coloré
- **Résultat** : Pictos sombres, peu visibles sur fonds colorés
- **Attendu** : Pictos bien contrastés, lisibles
- **Statut** : BUG → CORRIGÉ
- **Notes** : Ajout filtre CSS `brightness-0 invert` pour rendre les pictos blancs
- **Référence** : commit 2e3ac3b

### [2026-01-08 02:45] (/)
- **Contexte** : Page accueil avec sélecteur contexte et filtres durée
- **Action testée** : Sélection contexte "Public" puis durée "5 min"
- **Résultat** : Bouton "5 min" désactivé quand contexte = Public
- **Attendu** : Comportement correct (Public = max 2 min)
- **Statut** : OK
- **Notes** : UX claire avec tooltip explicatif
- **Référence** : commit dd64695

### [2026-01-08 02:45] (/)
- **Contexte** : Compteurs de techniques dans sélecteur contexte
- **Action testée** : Vérification affichage "Toutes (15)", "Public (6)", "Discret (3)"
- **Résultat** : Compteurs affichés correctement
- **Attendu** : Compteurs dynamiques selon techniques disponibles
- **Statut** : OK
- **Notes** : Aide l'utilisateur à comprendre le nombre de techniques disponibles
- **Référence** : commit dd64695

### [2026-01-08 02:50] (/)
- **Contexte** : État vide quand aucune technique ne correspond aux filtres
- **Action testée** : Combinaison de filtres impossible (si applicable)
- **Résultat** : Message "Aucune technique disponible" + 2 boutons actions
- **Attendu** : Message clair avec options de récupération
- **Statut** : OK
- **Notes** : "Tout afficher" et "Retirer le filtre durée" fonctionnent
- **Référence** : commit dd64695

### [2026-01-08 03:00] (Vercel Deploy)
- **Contexte** : Déploiement initial sur Vercel
- **Action testée** : Push GitHub + auto-deploy Vercel
- **Résultat** : Erreur 404 - Root Directory mal configuré
- **Attendu** : App accessible
- **Statut** : À vérifier
- **Notes** : Nécessite configuration Root Directory = `eclipse-app` dans Vercel Settings
- **Référence** : Repo https://github.com/NOVAADO/APPLICATION

---

## Tests à effectuer (Mobile réel)

### iOS Safari
- [ ] Page accueil - scroll, touch feedback
- [ ] Tirage aléatoire - navigation vers technique
- [ ] Timer - démarrage, pause, reprise, fin
- [ ] Favoris - ajout, retrait, persistance
- [ ] PWA - installation, icône, offline
- [ ] Safe area - bottom nav sur iPhone X+

### Android Chrome
- [ ] Page accueil - scroll, touch feedback
- [ ] Tirage aléatoire - navigation vers technique
- [ ] Timer - démarrage, pause, reprise, fin
- [ ] Favoris - ajout, retrait, persistance
- [ ] PWA - installation, icône, offline

---

## FIN DE SESSION — 2026-01-08 03:15

### Ce qui est validé (OK)
1. **Mode Public UI** : Sélecteur contexte fonctionnel (Toutes/Public/Discret)
2. **Compteurs techniques** : Affichage correct dans les boutons
3. **Incompatibilité durée/contexte** : 5 min désactivé quand Public sélectionné
4. **État vide** : Message + 2 actions de récupération
5. **Pictos catégories** : Blancs sur fond coloré (fix appliqué)
6. **Build production** : 0 erreurs, 146 tests passent
7. **GitHub push** : Code poussé sur NOVAADO/APPLICATION

### Ce qui bloque (P0)
1. **Vercel 404** : Root Directory doit être configuré à `eclipse-app`
   - Action : Settings → General → Root Directory → `eclipse-app` → Save → Redeploy

### Ce qui est à améliorer (P1/P2)
1. **P1** : Clarifier filtres Public/Discret avec icône info (ⓘ)
2. **P1** : Timer plus guidant (countdown 3-2-1, transitions visuelles)
3. **P1** : Ambiguïté "Répète 2 fois" → préciser quoi répéter
4. **P2** : Micro-preuve "Pourquoi ça aide" (1 phrase repliable)
5. **P2** : Après fin timer, proposer Favori / Une autre technique

### Prochaines 3 actions recommandées
1. **Configurer Vercel Root Directory** → `eclipse-app` (5 min)
2. **Tester sur mobile réel** (iOS Safari, Android Chrome)
3. **Implémenter clarification filtres** avec icône ⓘ et tooltip

---

**Prochain test prévu** : Après configuration Vercel, tester URL live sur mobile
