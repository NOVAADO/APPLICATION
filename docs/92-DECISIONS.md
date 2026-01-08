# Journal des Décisions — Éclipse PWA

**Dernière mise à jour** : 2026-01-08 03:15

---

## Format
Chaque décision suit le format ADR (Architecture Decision Record) simplifié.

---

## D-001 : Mode Public avec Presets A/B

### [2026-01-08 01:00]
| Champ | Valeur |
|-------|--------|
| **Quoi** | Implémenter un sélecteur de contexte "Où es-tu ?" avec 3 options |
| **Options** | Toutes (défaut), Public (Preset A), Discret (Preset B) |
| **Pourquoi** | Les ados ont besoin de techniques adaptées à leur environnement (école vs maison) |
| **Impact** | Filtre automatique des techniques selon durée et discrétion |
| **Règles** | Preset A : ≤120s, public_ok / Preset B : ≤300s, public_ok ou discret |
| **Commit** | dd64695 |

---

## D-002 : Désactivation filtres incompatibles

### [2026-01-08 02:00]
| Champ | Valeur |
|-------|--------|
| **Quoi** | Désactiver le bouton "5 min" quand contexte = Public |
| **Pourquoi** | Preset A n'a aucune technique de 5 min (max 120s) |
| **Impact** | Empêche l'utilisateur de choisir une combinaison impossible |
| **Alternative rejetée** | Laisser le bouton actif et afficher état vide |
| **Raison** | Meilleure UX de prévenir que de guérir |
| **Commit** | dd64695 |

---

## D-003 : Compteurs dans le sélecteur contexte

### [2026-01-08 02:15]
| Champ | Valeur |
|-------|--------|
| **Quoi** | Afficher le nombre de techniques disponibles dans chaque bouton |
| **Format** | "Toutes (15)", "Public (6)", "Discret (3)" |
| **Pourquoi** | L'utilisateur comprend immédiatement ce qui est disponible |
| **Impact** | Transparence, aide au choix |
| **Commit** | dd64695 |

---

## D-004 : État vide avec actions de récupération

### [2026-01-08 02:30]
| Champ | Valeur |
|-------|--------|
| **Quoi** | Afficher message + 2 boutons quand aucune technique ne correspond |
| **Actions** | "Tout afficher" (reset all) / "Retirer le filtre durée" |
| **Pourquoi** | Ne pas bloquer l'utilisateur, proposer des solutions |
| **Impact** | UX fluide même avec filtres restrictifs |
| **Commit** | dd64695 |

---

## D-005 : Pictos blancs sur page catégories

### [2026-01-08 03:00]
| Champ | Valeur |
|-------|--------|
| **Quoi** | Appliquer filtre CSS `brightness-0 invert` aux pictos PNG |
| **Pourquoi** | Pictos noirs invisibles sur fonds colorés |
| **Alternative rejetée** | Créer des versions blanches des PNG |
| **Raison** | CSS plus rapide, pas besoin de nouveaux assets |
| **Impact** | Pictos visibles sur tous les fonds |
| **Commit** | 2e3ac3b |

---

## D-006 : Structure repo GitHub

### [2026-01-08 02:45]
| Champ | Valeur |
|-------|--------|
| **Quoi** | Code dans sous-dossier `eclipse-app/` du repo APPLICATION |
| **Pourquoi** | Permet d'avoir docs et code au même endroit |
| **Impact** | Vercel nécessite configuration Root Directory |
| **Repo** | https://github.com/NOVAADO/APPLICATION |
| **Commit** | 9caa09d (initial) |

---

## D-007 : Validation scientifique niveau A/B

### [2026-01-07 (session précédente)]
| Champ | Valeur |
|-------|--------|
| **Quoi** | Classifier les 25 techniques par niveau de preuve |
| **Niveaux** | A (guideline + source Canada), B (études solides), C (à confirmer) |
| **Résultat** | 14 techniques A, 11 techniques B, 0 niveau C |
| **Pourquoi** | Crédibilité scientifique pour public québécois |
| **Impact** | Toutes les techniques ont une base validée |
| **Doc** | 13-TECHNIQUES-VALIDATION-SCIENTIFIQUE-CA.md |

---

## Décisions en attente

| ID | Sujet | Options | Deadline |
|----|-------|---------|----------|
| D-008 | Icône info (ⓘ) pour filtres | Tooltip / Modal / Inline | Prochain sprint |
| D-009 | Countdown 3-2-1 timer | Visuel seul / Avec son / Vibration | Prochain sprint |
| D-010 | Section "Pourquoi ça aide" | Repliable / Toujours visible | Prochain sprint |

---

**Prochain review** : Après tests utilisateurs
