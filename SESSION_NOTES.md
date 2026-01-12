# SESSION NOTES - 11 janvier 2026

## 1. TRAVAUX COMPLÉTÉS AUJOURD'HUI

### PRs Mergées (10 total)

| PR | Titre | Branche |
|----|-------|---------|
| #10 | fix: afficher 2 cartes par catégorie sur la page Catégories | fix/categories-count-12-cards |
| #9 | fix: exactement 12 cartes DEMO (2 par catégorie) | fix/exact-12-cards-demo |
| #8 | fix: 7 catégories gratuites + retrait "Dans le jeu complet" | feat/techniques-janvier-11 |
| #7 | fix: phrases d'ouverture sans numéro + DÉMO 14 cartes + Carte blanche verrouillée | feat/techniques-janvier-11 |
| #6 | feat: phrases d'ouverture ADN + mode DÉMO + Carte blanche | feat/techniques-janvier-11 |
| #5 | feat: ajout techniques + corrections ADN (11 janvier) | feat/techniques-janvier-11 |

### Modifications appliquées

1. **Phrases d'ouverture** : Première instruction affichée sans numéro (catégories souffle, decharge, ancrage, faire-le-point, combinaison)
2. **12 cartes DEMO gratuites** : 2 par catégorie (1 Furtif + 1 Libre)
3. **7 catégories gratuites** : Retrait de "Dans le jeu complet" sur toutes sauf Carte blanche
4. **Carte blanche verrouillée** : Affiche cadenas + "Dans le jeu complet"
5. **Page catégories corrigée** : Utilise `getFreeTechniques()` pour afficher le bon compte

---

## 2. TRAVAUX EN COURS / NON TERMINÉS

### Tout est terminé et mergé sur main

- Aucune PR ouverte
- Aucun travail en cours
- Tous les tests passent (145/145)
- Build réussi

---

## 3. ÉTAT ACTUEL DE LA DÉMO

### Cartes par catégorie

| Catégorie | Cartes gratuites | IDs |
|-----------|------------------|-----|
| Souffle | 2 | souffle-478, souffle-soupir |
| Décharge | 2 | decharge-croises, decharge-secoue |
| Ancrage | 2 | ancrage-54321, ancrage-glacons |
| Faire le point | 2 | faire-le-point-echelle, faire-le-point-ecrire |
| Paroles fortes | 2 | paroles-encore-la, paroles-ami |
| Chaos | 2 | chaos-mode-pnj, chaos-ninja-silencieux |
| Combinaison | 0 | (pas de techniques dans cette catégorie) |
| Carte blanche | 0 | Verrouillée (jeu physique) |

**Total : 12 cartes gratuites**

### Vérifications

- [x] Phrase d'ouverture sans numéro (première instruction)
- [x] 7 catégories gratuites (pas de "Dans le jeu complet")
- [x] Carte blanche verrouillée avec cadenas
- [x] Page catégories affiche 2 cartes par catégorie
- [x] 12 techniques avec `premium: false`

---

## 4. PROCHAINES ÉTAPES

### Déploiement
1. Vérifier que le déploiement Vercel est à jour sur eclipse.novaado.ca
2. Configurer le domaine personnalisé dans Vercel (DNS déjà configuré)

### Site novaado.ca
- PR #68 sur Site-NOVA-ADO : Intégration du lien vers eclipse.novaado.ca
- Vérifier si elle a été mergée

### Tests manuels à faire
- [ ] Vérifier l'affichage sur mobile
- [ ] Tester le tirage aléatoire (ne tire que les 12 cartes gratuites)
- [ ] Tester les filtres durée/contexte
- [ ] Vérifier le timer sur les techniques avec timer

---

## 5. INFORMATIONS TECHNIQUES

### Structure des fichiers modifiés
```
src/
├── app/
│   └── categories/
│       └── page.tsx          # Utilise getFreeTechniques()
├── components/
│   └── TechniqueCard.tsx     # Phrase d'ouverture sans numéro
├── data/
│   ├── categories.json       # 7 catégories premium: false
│   └── techniques.json       # 12 techniques premium: false
└── lib/
    ├── demo.ts               # DEMO_CARD_IDS (12 cartes)
    └── techniques.ts         # getFreeTechniques()
```

### Commandes utiles
```bash
npm run test:run   # 145 tests
npm run build      # Build production
npm run dev        # Dev server
```

---

## 6. DNS / HÉBERGEMENT

### Configuration actuelle
- **CNAME** : eclipse.novaado.ca → cname.vercel-dns.com
- **TTL** : 300

### À faire dans Vercel
1. Aller dans Settings → Domains
2. Ajouter `eclipse.novaado.ca`
3. Vercel génère le certificat SSL automatiquement

---

*Dernière mise à jour : 11 janvier 2026, 19h45*
