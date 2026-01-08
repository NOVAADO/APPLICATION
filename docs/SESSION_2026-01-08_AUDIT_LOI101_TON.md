# Session de travail — 8 janvier 2026

## Audit Conformité Loi 101 + Ton ADO-FIRST

**Branche** : `fix/conformite-loi101`
**PR** : https://github.com/NOVAADO/APPLICATION/pull/1
**Statut** : En attente de merge

---

## Résumé des modifications

### 1. Corrections anglicismes (Loi 101)

| Fichier | Avant | Après |
|---------|-------|-------|
| `src/app/page.tsx:60` | "T'as besoin d'un **break** ?" | "T'as besoin d'une **pause** ?" |
| `src/app/layout.tsx:7` | "T'as besoin d'un **break** ?" | "T'as besoin d'une **pause** ?" |
| `src/data/techniques.json` | "**Jumping jacks** express" | "**Sauts étoiles** express" |
| `src/data/techniques.json` | "T - **Take a breath**" | "T - **Tranquille**" |
| `src/data/techniques.json` | "P - **Proceed**" | "P - **Poursuis**" |

### 2. Corrections discrétion exercices

| Technique | Avant | Après | Raison |
|-----------|-------|-------|--------|
| Le grand soupir (`souffle-soupir`) | `public_ok` / Preset A | `discret` / Preset B | "Soupirer fort" est audible |
| Étirements rapides (`decharge-etirements`) | `discret` / Preset B | `prive` / aucun preset | "Lever les bras au ciel" est visible |

### 3. Corrections ton infantilisant (ADN ado-first)

| Fichier | Avant | Après | Raison |
|---------|-------|-------|--------|
| `src/data/techniques.json` (ancrage-main-coeur) | "Je suis en sécurité" | "Ce moment va passer" | Trop enfantin |
| `src/data/techniques.json` (paroles-ami) | "Avec la même douceur" | "Sans te juger" | Trop maternel |
| `src/data/techniques.json` (paroles-droit) | "Laisse ces mots entrer" | "Prends le temps d'y penser" | Trop poétique |
| `src/components/Timer.tsx:316` | "Bien joué." | "C'est fait." | Félicitation scolaire |
| `src/app/technique/[id]/page.tsx:50` | "Oups. Cette technique..." | "Cette technique..." | Interjection enfantine |
| `src/app/technique/[id]/page.tsx:228` | "parle à un adulte de confiance" | "parles-en. Tel-Aide : 514-935-1101" | Ton scolaire/parental |
| `src/app/favorites/page.tsx:170` | "appuie sur ★" | "c'est ici" | Trop didactique |

### 4. Améliorations UX/ADN

| Modification | Détail |
|--------------|--------|
| Filtre contexte | Labels clarifiés après brainstorm |
| Navigation | Émojis remplacés par pictos SVG |

### 5. Clarification labels contexte (Brainstorm)

Suite au retour utilisateur, brainstorm avec 3 agents :
- Agent UX
- Agent microcopy
- Agent linguistique

**Décision finale** :
| Avant | Après | Signification |
|-------|-------|---------------|
| "Public" | "Discret" | Preset A : en public, techniques invisibles |
| "Tranquille" | "Libre" | Preset B : seul, aucune contrainte |

**Rejeté** : "sans-gêne" (connotation négative = mal élevé)

---

## Fichiers créés

### Pictos SVG navigation
- `public/pictos/nav-accueil.svg`
- `public/pictos/nav-categories.svg`
- `public/pictos/nav-favoris.svg`
- `public/pictos/nav-reglages.svg`

---

## Fichiers modifiés

### Code source
- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/favorites/page.tsx`
- `src/app/technique/[id]/page.tsx`
- `src/components/BottomNav.tsx`
- `src/components/ContextFilter.tsx`
- `src/components/Timer.tsx`
- `src/data/techniques.json`

### Tests
- `src/components/ContextFilter.test.tsx`
- `src/components/Timer.test.tsx`
- `src/lib/techniques.test.ts`

---

## Commits

### Commit 1 : `0aa1cc1`
```
fix: conformité Loi 101 et discrétion des exercices

- Anglicismes corrigés (break, Jumping jacks, STOP)
- Discrétion exercices revue (soupir, étirements)
- Filtre "Discret" → "Tranquille"
- Émojis → pictos SVG
```

### Commit 2 : `3bfd1be`
```
fix: ton ado-first (suppression formulations infantilisantes)

- "Je suis en sécurité" → "Ce moment va passer"
- "Bien joué." → "C'est fait."
- "Oups." supprimé
- "parle à un adulte de confiance" → "parles-en. Tel-Aide"
```

### Commit 3 : `e0472ca`
```
fix: labels contexte "Discret" et "Libre" (clarté UX)

- "Public" → "Discret" (Preset A : en public, personne voit)
- "Tranquille" → "Libre" (Preset B : seul, aucune contrainte)
- Tests mis à jour
```

---

## Agents utilisés

| Agent | Mission | Résultat |
|-------|---------|----------|
| Agent audit techniques.json | Analyser les 25 techniques pour formulations infantilisantes | 4 problèmes identifiés |
| Agent audit composants UI | Analyser Timer, TechniqueCard, etc. | 1 problème identifié |
| Agent audit pages | Analyser toutes les pages | 3 problèmes identifiés |
| Agent création pictos SVG | Créer 4 icônes navigation | 4 fichiers créés |
| Agent correction anglicismes | Corriger page.tsx et ContextFilter.tsx | 2 fichiers modifiés |
| Agent correction techniques.json | Corriger anglicismes et discrétion | 1 fichier modifié |
| Agent brainstorm UX | Évaluer "sans-gêne" vs alternatives | Rejeté "sans-gêne" |
| Agent brainstorm microcopy | Proposer labels clairs | Recommandé "Discret"/"Libre" |
| Agent brainstorm linguistique | Valider connotations québécoises | Confirmé choix final |

---

## Tests

- **Total** : 146 tests
- **Passent** : 146/146
- **Build** : OK

---

## Prochaines étapes

1. **Merger la PR** : https://github.com/NOVAADO/APPLICATION/pull/1
2. **Vérifier le déploiement Vercel** après merge
3. **Tester visuellement** sur https://applicationfjkf.vercel.app/

---

## Référence ADN

Document de référence utilisé : `C:\Users\Marie\.claude\agents\NOVAADO_ADN.md`

### Règles clés appliquées
- Ton ado-first : direct, clair, respectueux, JAMAIS infantilisant
- Français québécois naturel
- Aucun anglicisme (Loi 101)
- Pictos SVG noirs (pas d'émojis)

---

*Documentation générée le 8 janvier 2026*
