/**
 * EXEMPLE D'INTÉGRATION DE LA ROUTE TOWER DEFENSE
 * 
 * Ajoutez cette route dans votre fichier app.routes.ts
 * (Ne pas commit ce fichier si c'est un fichier commun à l'équipe)
 */

import { Routes } from '@angular/router';

export const routes: Routes = [
  // Vos routes existantes...
  
  // Route Tower Defense (lazy loading pour optimisation)
  {
    path: 'tower-defense',
    loadComponent: () =>
      import('./tower-defense.component').then(
        (m) => m.TowerDefenseComponent
      ),
    data: {
      title: 'NIRD Defense - Tower Defense',
      description: 'Défendez votre établissement contre les BigTech',
    },
  },
  
  // Alternative avec alias
  {
    path: 'jeu',
    redirectTo: 'tower-defense',
    pathMatch: 'full',
  },
];
