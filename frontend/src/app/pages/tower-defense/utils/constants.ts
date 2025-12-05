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
      { type: EnemyType.BUG, count: 5, delay: 1000 },
      { type: EnemyType.ERROR_404, count: 3, delay: 1500 },
    ],
  },
  {
    number: 2,
    enemies: [
      { type: EnemyType.BUG, count: 3, delay: 800 },
      { type: EnemyType.DISK_FULL, count: 2, delay: 1000 },
      { type: EnemyType.BLUE_SCREEN, count: 2, delay: 1200 },
      { type: EnemyType.HOURGLASS, count: 1, delay: 1500 },
    ],
  },
  {
    number: 3,
    enemies: [
      { type: EnemyType.ACCESS_DENIED, count: 1, delay: 800 },
      { type: EnemyType.VIRUS, count: 1, delay: 1000 },
      { type: EnemyType.BLUE_SCREEN, count: 2, delay: 600 },
      { type: EnemyType.RANSOMWARE, count: 1, delay: 2000 },
      { type: EnemyType.DISK_FULL, count: 2, delay: 500 },
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

// Palette rétro terminal ASCII / CRT
export const COLORS = {
  BG: '#000000',           // Noir fond
  FG: '#1e3a8a',           // Bleu foncé rétro
  CYAN: '#60a5fa',         // Bleu clair rétro
  MAGENTA: '#ff00ff',      // Magenta
  YELLOW: '#ffff00',       // Jaune
  WHITE: '#ffffff',        // Blanc
  GRAY: '#4b5563',         // Gris
};

export const DEFENSE_DESCRIPTIONS = {
  PC_LINUX: 'Défense de base. Tire des paquets .deb pour ralentir l\'obsolescence.',
  PC_RECONDITIONED: 'Plus puissant avec effet de zone. Inspire les PC voisins.',
  LOCAL_SERVER: 'Stockage local sécurisé. Forte défense contre le tracking de données.',
  ECO_DELEGATE: 'Sensibilise et convertit. Génère des NIRD Points supplémentaires.',
};

export const ENEMY_DESCRIPTIONS = {
  BUG: 'Petit bug agaçant. Ralentit tout le système.',
  ERROR_404: 'Page introuvable. Se perd dans le code.',
  DISK_FULL: 'Disque plein. Bloque toutes les installations.',
  BLUE_SCREEN: 'Écran bleu de la mort. Fait planter le PC.',
  HOURGLASS: 'Application gelée. Curseur qui tourne à l\'infini.',
  ACCESS_DENIED: 'Accès refusé. Bloque les permissions.',
  VIRUS: 'Virus méchant. Infecte tout sur son passage.',
  RANSOMWARE: 'Boss final ! Crypte toutes tes données.',
};
