import { Wave } from '../models/game-state.model';
import { EnemyType } from '../models/enemy.model';

export const GAME_CONFIG = {
  GRID: {
    ROWS: 6,
    COLS: 10,
    CELL_SIZE: 64,
  },
  CANVAS: {
    WIDTH: 640,
    HEIGHT: 384,
  },
  INITIAL_NIRD_POINTS: 150,
  INITIAL_LIVES: 10,
  FPS: 60,
  PROJECTILE_SPEED: 200,
};

export const WAVES: Wave[] = [
  {
    number: 1,
    enemies: [
      { type: EnemyType.WINDOWS_EOL, count: 5, delay: 1000 },
      { type: EnemyType.DRIVER_INCOMPATIBLE, count: 3, delay: 1500 },
    ],
  },
  {
    number: 2,
    enemies: [
      { type: EnemyType.WINDOWS_EOL, count: 4, delay: 800 },
      { type: EnemyType.FORCED_UPDATE, count: 3, delay: 1000 },
      { type: EnemyType.ANNUAL_LICENSE, count: 3, delay: 1200 },
      { type: EnemyType.CLOUD_SUBSCRIPTION, count: 2, delay: 1500 },
    ],
  },
  {
    number: 3,
    enemies: [
      { type: EnemyType.CLOSED_ECOSYSTEM, count: 2, delay: 800 },
      { type: EnemyType.VENDOR_LOCKIN, count: 2, delay: 1000 },
      { type: EnemyType.ANNUAL_LICENSE, count: 4, delay: 600 },
      { type: EnemyType.GOLIATH_BIGTECH, count: 1, delay: 2000 },
      { type: EnemyType.FORCED_UPDATE, count: 5, delay: 500 },
    ],
  },
];

// Définition du chemin en coordonnées grille (row, col)
const PATH_WAYPOINTS = [
  { row: 3, col: -1 },    // Hors écran gauche
  { row: 3, col: 0 },
  { row: 3, col: 1 },
  { row: 2, col: 1 },     // Virage
  { row: 1, col: 1 },
  { row: 1, col: 2 },
  { row: 1, col: 3 },
  { row: 1, col: 4 },
  { row: 2, col: 4 },     // Virage
  { row: 3, col: 4 },
  { row: 4, col: 4 },
  { row: 4, col: 5 },
  { row: 4, col: 6 },
  { row: 4, col: 7 },
  { row: 3, col: 7 },     // Virage
  { row: 2, col: 7 },
  { row: 2, col: 8 },
  { row: 2, col: 9 },
  { row: 2, col: 11 },    // Sortie hors écran
];

// Conversion dynamique en coordonnées pixel (centre des tuiles)
export const ENEMY_PATH = PATH_WAYPOINTS.map(wp => ({
  x: wp.col * GAME_CONFIG.GRID.CELL_SIZE + GAME_CONFIG.GRID.CELL_SIZE / 2,
  y: wp.row * GAME_CONFIG.GRID.CELL_SIZE + GAME_CONFIG.GRID.CELL_SIZE / 2,
}));

// Tuiles du chemin (en coordonnées grille row, col) - défenses interdites ici
export const PATH_TILES = [
  { row: 3, col: 0 }, { row: 3, col: 1 }, // Début horizontal
  { row: 2, col: 1 }, { row: 1, col: 1 }, // Vertical vers le haut
  { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }, // Horizontal haut
  { row: 2, col: 4 }, { row: 3, col: 4 }, { row: 4, col: 4 }, // Vertical vers le bas
  { row: 4, col: 5 }, { row: 4, col: 6 }, { row: 4, col: 7 }, // Horizontal bas
  { row: 3, col: 7 }, { row: 2, col: 7 }, // Vertical vers milieu
  { row: 2, col: 8 }, { row: 2, col: 9 }, // Fin horizontal
];

export function isPathTile(row: number, col: number): boolean {
  return PATH_TILES.some(tile => tile.row === row && tile.col === col);
}

export const COLORS = {
  BACKGROUND: '#1a1a2e',
  GRID: '#16213e',
  PATH: '#0f3460',
  UI_BG: '#0f1419',
  UI_BORDER: '#2a4a6a',
  TEXT_PRIMARY: '#eaeaea',
  TEXT_SECONDARY: '#94a3b8',
  NIRD_GREEN: '#10b981',
  DANGER_RED: '#ef4444',
  WARNING_YELLOW: '#fbbf24',
  LINUX_BLUE: '#3b82f6',
};

export const DEFENSE_DESCRIPTIONS = {
  PC_LINUX: 'Défense de base. Tire des paquets .deb pour ralentir l\'obsolescence.',
  PC_RECONDITIONED: 'Plus puissant avec effet de zone. Inspire les PC voisins.',
  LOCAL_SERVER: 'Stockage local sécurisé. Forte défense contre le tracking de données.',
  ECO_DELEGATE: 'Sensibilise et convertit. Génère des NIRD Points supplémentaires.',
};

export const ENEMY_DESCRIPTIONS = {
  WINDOWS_EOL: 'Fin de support Windows. Rend les PC obsolètes.',
  DRIVER_INCOMPATIBLE: 'Pilote incompatible. Bloque les fonctionnalités.',
  FORCED_UPDATE: 'Mise à jour forcée. Force le renouvellement matériel.',
  ANNUAL_LICENSE: 'Licence annuelle. Draine le budget de l\'école.',
  CLOUD_SUBSCRIPTION: 'Abonnement cloud. Coût récurrent hors UE.',
  CLOSED_ECOSYSTEM: 'Écosystème fermé. Empêche l\'interopérabilité.',
  VENDOR_LOCKIN: 'Dépendance totale. Rend la sortie impossible.',
  GOLIATH_BIGTECH: 'Boss final ! Combine toutes les menaces BigTech.',
};
