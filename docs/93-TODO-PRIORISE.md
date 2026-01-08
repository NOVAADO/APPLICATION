# TODO Priorisé — Éclipse PWA

**Dernière mise à jour** : 2026-01-08 03:15

---

## Légende
- **P0** : Bloquant, à faire immédiatement
- **P1** : Important, prochain sprint
- **P2** : Souhaitable, quand possible
- **Estimation** : XS (< 30 min), S (30 min - 2h), M (2h - 1 jour), L (> 1 jour)

---

## P0 — Bloquants

### TODO-001 : Configurer Vercel Root Directory
| Champ | Valeur |
|-------|--------|
| **Description** | Changer Root Directory de `.` à `eclipse-app` |
| **Estimation** | XS (5 min) |
| **Dépendances** | Aucune |
| **Comment** | Vercel Dashboard → Settings → General → Root Directory |
| **Statut** | **À FAIRE** |
| **Assigné** | Marie-Ève |

---

## P1 — Important (Approche Antilope)

### TODO-002 : Clarifier filtres Public/Discret
| Champ | Valeur |
|-------|--------|
| **Description** | Ajouter icône ⓘ avec tooltip explicatif |
| **Texte proposé** | Public: "Discret, faisable en classe" / Discret: "Besoin d'un coin tranquille" |
| **Estimation** | S (1h) |
| **Dépendances** | Aucune |
| **Fichiers** | `ContextFilter.tsx` |
| **Statut** | **À FAIRE** |

### TODO-003 : Timer plus guidant
| Champ | Valeur |
|-------|--------|
| **Description** | Améliorer transitions entre phases du timer |
| **Sous-tâches** | 1) Countdown 3-2-1 avant début, 2) Animation transition phase, 3) Progression visuelle claire |
| **Estimation** | M (3h) |
| **Dépendances** | Aucune |
| **Fichiers** | `Timer.tsx` |
| **Statut** | **À FAIRE** |

### TODO-004 : Préciser "Répète 2 fois"
| Champ | Valeur |
|-------|--------|
| **Description** | Reformuler les instructions ambiguës |
| **Solution** | "Répète ce cycle 2 fois" ou numéroter les étapes |
| **Estimation** | S (30 min) |
| **Dépendances** | Aucune |
| **Fichiers** | `techniques.json` |
| **Statut** | **À FAIRE** |

### TODO-005 : Tester sur mobile réel
| Champ | Valeur |
|-------|--------|
| **Description** | Tests manuels sur iOS Safari et Android Chrome |
| **Checklist** | Scroll, touch, timer, favoris, PWA install, offline |
| **Estimation** | M (2h) |
| **Dépendances** | TODO-001 (Vercel configuré) |
| **Statut** | **EN ATTENTE** |

---

## P2 — Souhaitable

### TODO-006 : Micro-preuve "Pourquoi ça aide"
| Champ | Valeur |
|-------|--------|
| **Description** | Section repliable avec 1 phrase explicative |
| **Exemple** | "La respiration lente active ton système parasympathique et calme ton corps." |
| **Estimation** | S (1h) |
| **Dépendances** | Aucune |
| **Fichiers** | `TechniqueCard.tsx`, `techniques.json` (nouveau champ `whyItHelps`) |
| **Statut** | **À FAIRE** |

### TODO-007 : Actions après "C'est fait"
| Champ | Valeur |
|-------|--------|
| **Description** | Proposer 2 actions après fin du timer |
| **Actions** | "Ajouter aux favoris" / "Une autre technique (plus douce / plus intense)" |
| **Estimation** | S (1h30) |
| **Dépendances** | Aucune |
| **Fichiers** | `Timer.tsx`, `/technique/[id]/page.tsx` |
| **Statut** | **À FAIRE** |

### TODO-008 : Optimiser PNG catégories
| Champ | Valeur |
|-------|--------|
| **Description** | Compresser les PNG avec TinyPNG |
| **Cible** | < 10 kB par image |
| **Estimation** | XS (15 min) |
| **Dépendances** | Aucune |
| **Fichiers** | `public/pictos/*.png` |
| **Statut** | **À FAIRE** |

### TODO-009 : Page Historique
| Champ | Valeur |
|-------|--------|
| **Description** | Afficher les techniques consultées récemment |
| **Estimation** | M (2h) |
| **Dépendances** | Logique déjà en place (`eclipse-history` localStorage) |
| **Fichiers** | Nouveau `app/historique/page.tsx` |
| **Statut** | **À FAIRE** |

---

## Récapitulatif

| Priorité | Total | XS | S | M | L |
|----------|-------|----|----|----|----|
| P0 | 1 | 1 | 0 | 0 | 0 |
| P1 | 4 | 0 | 2 | 2 | 0 |
| P2 | 4 | 1 | 2 | 1 | 0 |
| **Total** | **9** | 2 | 4 | 3 | 0 |

**Temps estimé total** : ~12h de travail

---

## Ordre recommandé

1. **TODO-001** : Vercel Root Directory (P0, XS) — Débloquer le déploiement
2. **TODO-005** : Tests mobile (P1, M) — Identifier d'autres bugs
3. **TODO-002** : Clarifier filtres (P1, S) — Quick win UX
4. **TODO-004** : Préciser instructions (P1, S) — Quick win contenu
5. **TODO-003** : Timer guidant (P1, M) — Amélioration majeure

---

**Prochaine révision** : Après tests mobile
