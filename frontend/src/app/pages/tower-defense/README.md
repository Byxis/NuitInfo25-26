# 🎮 NIRD Defense - Tower Defense Game

## 🎯 Description

Mini-jeu Tower Defense éducatif illustrant la démarche NIRD (Numérique Inclusif, Responsable et Durable). 
Défendez votre établissement contre les menaces des BigTech en installant des défenses basées sur Linux et le reconditionnement.

## 🏗️ Architecture

```
tower-defense/
├── models/               # Modèles de données TypeScript
│   ├── position.model.ts
│   ├── defense.model.ts
│   ├── enemy.model.ts
│   └── game-state.model.ts
├── services/             # Services Angular (logique métier)
│   ├── game-engine.service.ts      # Game loop, collision detection, vagues
│   └── pixel-renderer.service.ts   # Rendu pixel-art sur canvas
├── components/           # Composants standalone Angular
│   ├── game-canvas/                # Canvas HTML5 + interactions
│   ├── game-ui/                    # Stats et contrôles du jeu
│   ├── defense-selector/           # Menu de sélection des défenses
│   └── victory-screen/             # Écran de victoire/défaite
├── utils/
│   └── constants.ts                # Config, vagues, couleurs, chemins
└── tower-defense.component.ts      # Composant principal
```

## ✨ Fonctionnalités

### 🛡️ Défenses NIRD (4 types)
- **PC Linux** 🖥️ - Défense de base, tire des paquets .deb
- **PC Reconditionné** ♻️ - Plus puissant avec effet de zone
- **Serveur Local** 🏢 - Stockage local sécurisé, forte défense
- **Éco-délégué** 🌱 - Sensibilise et génère des NIRD Points

### 👾 Ennemis BigTech (8 types + Boss)
- Windows EOL, Driver Incompatible, Update Forcée
- Licence Annuelle, Cloud Subscription
- Closed Ecosystem, Vendor Lock-in
- **Goliath BigTech** (Boss final)

### 🌊 Gameplay
- **3 vagues** progressives (facile → moyenne → boss)
- **Grille 10x6** avec pathfinding pour les ennemis
- **Game loop** optimisé (60 FPS)
- **Combo system** pour les tirs consécutifs
- **Budget dynamique** (NIRD Points)

### 📊 Stats de victoire
- 💰 Budget économisé (€)
- 🌱 CO2 économisé (tonnes)
- ♻️ PC reconditionnés
- 🎯 Précision des tirs (%)
- ⚡ Meilleur combo
- 🏛️ Autonomie numérique (%)
- 🏆 Succès débloqués

## 🎨 Design

- **Style rétro pixel-art** (compatibilité défi "On veut du gros pixel !")
- **Palette de couleurs** cohérente NIRD (vert, bleu, jaune)
- **Animations fluides** (Canvas 2D, image-rendering: pixelated)
- **Responsive** (adaptable mobile/desktop)

## 🚀 Intégration au projet

### 1. Ajouter la route dans `app.routes.ts`

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  // ... vos routes existantes
  {
    path: 'tower-defense',
    loadComponent: () =>
      import('./pages/tower-defense/tower-defense.component').then(
        (m) => m.TowerDefenseComponent
      ),
  },
];
```

### 2. Ajouter un lien de navigation (optionnel)

Dans votre composant de navigation :
```html
<a routerLink="/tower-defense">🎮 Jouer au Tower Defense</a>
```

### 3. Lancer le projet

```bash
cd frontend
npm start
```

Accédez à : `http://localhost:4200/tower-defense`

## 🎯 Défis NdI compatibles

- ✅ **On veut du gros pixel !** - Style rétro 8-bit
- ✅ **La zerguèm de la nuit** - Gamification complète
- ✅ **Green IT** - Code optimisé, pas de memory leaks
- ✅ **Oh les beaux boutons** - UX soignée

## 🔧 Configuration

Modifiez `utils/constants.ts` pour ajuster :
- Taille de la grille
- Difficulté des vagues
- Stats des défenses/ennemis
- Budget initial
- Vitesse du jeu

## 📝 Principes de code appliqués

- **SOLID** : Services séparés (Single Responsibility)
- **Standalone Components** : Pas de modules
- **Signals Angular** : Réactivité moderne
- **TypeScript strict** : Types forts partout
- **Immutabilité** : State updates via `.update()`
- **Performance** : requestAnimationFrame, canvas 2D
- **Clean Code** : Nommage clair, fonctions courtes
- **No Memory Leaks** : Cleanup dans ngOnDestroy

## 🎓 Pédagogie NIRD

Le jeu illustre concrètement :
- La **résistance** face aux BigTech (thème Astérix)
- L'**obsolescence programmée** (Windows EOL)
- Les **coûts cachés** (licences, cloud)
- Les **solutions NIRD** (Linux, reconditionnement, autonomie)
- L'**impact écologique** (CO2, PC sauvés)

## 📚 Resources

- Site NIRD : https://nird.forge.apps.education.fr/
- Démarche NIRD : Numérique Inclusif, Responsable, Durable

---

**Auteur** : Projet Nuit de l'Info 2025  
**Licence** : Libre (à définir selon les règles NdI)
