# Bugs et Frictions — Éclipse PWA

**Dernière mise à jour** : 2026-01-08 03:15

---

## Légende gravité
- **P0** : Bloquant, empêche l'utilisation
- **P1** : Important, dégrade l'expérience
- **P2** : Mineur, amélioration souhaitée
- **P3** : Cosmétique, nice-to-have

---

## Bugs actifs

### BUG-001 : Vercel 404 - Root Directory
| Champ | Valeur |
|-------|--------|
| **Gravité** | P0 |
| **Date** | 2026-01-08 |
| **Page/Route** | Toutes (déploiement) |
| **Reproduction** | Accéder à l'URL Vercel après déploiement |
| **Attendu** | App Éclipse accessible |
| **Obtenu** | Erreur 404 NOT_FOUND |
| **Piste** | Root Directory par défaut = `.`, doit être `eclipse-app` |
| **Statut** | **OUVERT** |
| **Action** | Vercel Settings → General → Root Directory → `eclipse-app` |

---

## Bugs corrigés

### BUG-002 : Pictos catégories invisibles
| Champ | Valeur |
|-------|--------|
| **Gravité** | P1 |
| **Date** | 2026-01-08 |
| **Page/Route** | /categories |
| **Reproduction** | Afficher la page catégories |
| **Attendu** | Pictos visibles sur fond coloré |
| **Obtenu** | Pictos sombres, peu contrastés |
| **Piste** | PNG noirs sur fonds colorés |
| **Statut** | **CORRIGÉ** |
| **Fix** | Ajout `brightness-0 invert` sur les images |
| **Commit** | 2e3ac3b |

---

## Frictions UX identifiées

### FRICTION-001 : Filtres Public/Discret peu clairs
| Champ | Valeur |
|-------|--------|
| **Gravité** | P1 |
| **Page/Route** | / (accueil) |
| **Description** | L'utilisateur ne comprend pas immédiatement la différence entre "Public" et "Discret" |
| **Impact** | Confusion, mauvais choix de contexte |
| **Solution proposée** | Ajouter icône ⓘ avec tooltip explicatif |
| **Statut** | **À IMPLÉMENTER** |

### FRICTION-002 : Timer pas assez guidant
| Champ | Valeur |
|-------|--------|
| **Gravité** | P1 |
| **Page/Route** | /technique/[id] |
| **Description** | Transitions entre phases pas assez marquées, pas de countdown 3-2-1 |
| **Impact** | L'utilisateur ne sait pas quand agir |
| **Solution proposée** | Countdown visuel, transitions animées, mode discret sans son |
| **Statut** | **À IMPLÉMENTER** |

### FRICTION-003 : "Répète 2 fois" ambigu
| Champ | Valeur |
|-------|--------|
| **Gravité** | P1 |
| **Page/Route** | /technique/[id] (instructions) |
| **Description** | "Répète 2 fois" ne précise pas quoi répéter exactement |
| **Impact** | Confusion sur l'exercice à faire |
| **Solution proposée** | Reformuler : "Répète ce cycle 2 fois" ou numéroter les étapes |
| **Statut** | **À IMPLÉMENTER** |

### FRICTION-004 : Pas de micro-preuve scientifique
| Champ | Valeur |
|-------|--------|
| **Gravité** | P2 |
| **Page/Route** | /technique/[id] |
| **Description** | L'utilisateur ne sait pas pourquoi cette technique aide |
| **Impact** | Moins de confiance, moins d'engagement |
| **Solution proposée** | Section repliable "Pourquoi ça aide" (1 phrase) |
| **Statut** | **À IMPLÉMENTER** |

### FRICTION-005 : Pas d'action après "C'est fait"
| Champ | Valeur |
|-------|--------|
| **Gravité** | P2 |
| **Page/Route** | /technique/[id] (fin timer) |
| **Description** | Après fin du timer, l'utilisateur n'a pas de suggestion |
| **Impact** | Fin abrupte, pas de continuité |
| **Solution proposée** | Proposer 2 actions : "Ajouter aux favoris" / "Une autre technique" |
| **Statut** | **À IMPLÉMENTER** |

---

## Statistiques

| Catégorie | P0 | P1 | P2 | P3 | Total |
|-----------|----|----|----|----|-------|
| Bugs ouverts | 1 | 0 | 0 | 0 | 1 |
| Bugs corrigés | 0 | 1 | 0 | 0 | 1 |
| Frictions | 0 | 3 | 2 | 0 | 5 |

---

**Prochaine révision** : Après tests mobile réel
