# Ajustements Microcopy — Éclipse PWA

**Dernière mise à jour** : 2026-01-08 03:15

---

## Philosophie microcopy NOVA ADO
- **Direct** : Pas de blabla, va droit au but
- **Québécois** : Tutoiement, expressions locales
- **Loi 101** : Français correct, pas d'anglicismes

---

## Ajustements proposés

### MC-001 : Tooltip filtres contexte

| Champ | Valeur |
|-------|--------|
| **Page** | / (accueil) |
| **Section** | Sélecteur contexte "Où es-tu ?" |
| **Actuel** | Boutons sans explication |
| **Proposé** | Icône ⓘ avec tooltip au clic/hover |
| **Texte Public** | "Discret et rapide. Faisable en classe ou dans le bus." |
| **Texte Discret** | "Tu as un coin tranquille ? Prends 5 minutes pour toi." |
| **Texte Toutes** | "Toutes les techniques, peu importe où tu es." |
| **Statut** | **À IMPLÉMENTER** |
| **Priorité** | P1 |

---

### MC-002 : Instructions "Répète X fois"

| Champ | Valeur |
|-------|--------|
| **Page** | /technique/[id] |
| **Section** | Instructions |
| **Actuel** | "Répète 2 fois" (ambigu) |
| **Proposé** | "Répète ce cycle 2 fois" ou numérotation |
| **Exemple avant** | "1. Inspire 4 secondes. 2. Retiens 7 secondes. 3. Expire 8 secondes. Répète 2 fois." |
| **Exemple après** | "Fais ce cycle 2 fois : 1. Inspire 4 secondes. 2. Retiens 7 secondes. 3. Expire 8 secondes." |
| **Statut** | **À IMPLÉMENTER** |
| **Priorité** | P1 |

---

### MC-003 : Micro-preuve "Pourquoi ça aide"

| Champ | Valeur |
|-------|--------|
| **Page** | /technique/[id] |
| **Section** | Nouveau bloc repliable |
| **Actuel** | Aucune explication scientifique visible |
| **Proposé** | Section "Pourquoi ça aide" (1 phrase, repliable) |
| **Exemples** | |
| Respiration 4-7-8 | "L'expiration longue active ton nerf vague et calme ton système nerveux." |
| 5-4-3-2-1 | "Se concentrer sur tes sens ramène ton attention au présent et coupe la spirale de pensées." |
| PMR | "Contracter puis relâcher tes muscles aide ton corps à libérer la tension accumulée." |
| **Statut** | **À IMPLÉMENTER** |
| **Priorité** | P2 |

---

### MC-004 : Actions fin de timer

| Champ | Valeur |
|-------|--------|
| **Page** | /technique/[id] |
| **Section** | Après fin du timer |
| **Actuel** | Bouton "Terminer" ramène à l'état initial |
| **Proposé** | Écran "C'est fait !" avec 2 actions |
| **Texte principal** | "C'est fait !" |
| **Action 1** | "Ajouter aux favoris ★" |
| **Action 2** | "Une autre technique" (avec option intensité) |
| **Texte secondaire** | "Comment tu te sens ?" (optionnel, pour feedback) |
| **Statut** | **À IMPLÉMENTER** |
| **Priorité** | P2 |

---

### MC-005 : Countdown timer

| Champ | Valeur |
|-------|--------|
| **Page** | /technique/[id] |
| **Section** | Timer - démarrage |
| **Actuel** | Démarre directement à "Prépare-toi" |
| **Proposé** | Countdown 3-2-1 avant de commencer |
| **Texte** | "3... 2... 1... C'est parti !" |
| **Animation** | Chiffres qui grossissent puis disparaissent |
| **Statut** | **À IMPLÉMENTER** |
| **Priorité** | P1 |

---

### MC-006 : Transitions phases timer

| Champ | Valeur |
|-------|--------|
| **Page** | /technique/[id] |
| **Section** | Timer - changement de phase |
| **Actuel** | Changement de texte simple |
| **Proposé** | Transition visuelle + feedback |
| **Phase Prépare** | "Prépare-toi..." (fond neutre) |
| **Phase Technique** | "C'est parti !" → nom de la technique (fond accent) |
| **Phase Reviens** | "Doucement..." (fond qui s'apaise) |
| **Statut** | **À IMPLÉMENTER** |
| **Priorité** | P1 |

---

### MC-007 : État vide personnalisé

| Champ | Valeur |
|-------|--------|
| **Page** | / (accueil), /favorites |
| **Section** | Quand aucune technique ne correspond |
| **Actuel accueil** | "Aucune technique disponible avec ces filtres." ✅ |
| **Actuel favoris** | "Tu n'as pas encore de favoris." |
| **Proposé favoris** | "Pas encore de favoris. Tire une carte et ajoute tes techniques préférées ★" |
| **Statut** | Accueil OK, Favoris **À VÉRIFIER** |
| **Priorité** | P2 |

---

## Textes validés (Loi 101)

| Original | Corrigé | Statut |
|----------|---------|--------|
| "reset" | "break" | ✅ Appliqué |
| "Soft" | "Douce" | ✅ Appliqué |
| "Normal" | "Normale" | ✅ Appliqué |
| "Nice" | "Super" | ✅ Appliqué |
| "[OFF]" | "[NON]" | ✅ Appliqué |

---

## Prochains ajustements

| ID | Texte | Page | Priorité |
|----|-------|------|----------|
| MC-001 | Tooltips filtres | / | P1 |
| MC-002 | Instructions "Répète" | /technique/* | P1 |
| MC-005 | Countdown 3-2-1 | /technique/* | P1 |
| MC-006 | Transitions phases | /technique/* | P1 |
| MC-003 | Micro-preuves | /technique/* | P2 |
| MC-004 | Actions fin timer | /technique/* | P2 |

---

**Prochain review** : Avec équipe contenu/marketing
