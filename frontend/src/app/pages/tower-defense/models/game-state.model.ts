import { Defense } from './defense.model';
import { Enemy } from './enemy.model';

export enum GameStatus {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  VICTORY = 'VICTORY',
  DEFEAT = 'DEFEAT',
}

export interface Wave {
  number: number;
  enemies: { type: string; count: number; delay: number }[];
}

export interface GameStats {
  nirdPoints: number;
  lives: number;
  currentWave: number;
  totalWaves: number;
  enemiesKilled: number;
  totalShots: number;
  successfulShots: number;
  budgetSaved: number; // Euros
  co2Saved: number; // Tons
  pcReconditioned: number;
  autonomyGained: number; // Percentage
}

export interface GameState {
  status: GameStatus;
  defenses: Defense[];
  enemies: Enemy[];
  projectiles: Projectile[];
  stats: GameStats;
  selectedDefenseType: string | null;
  canPlaceDefense: boolean;
}

export interface Projectile {
  id: string;
  position: { x: number; y: number };
  target: { x: number; y: number };
  damage: number;
  speed: number;
  areaEffect?: boolean;
}

export interface VictoryStats {
  finalScore: number;
  rating: 'bronze' | 'silver' | 'gold';
  stats: GameStats;
  achievements: string[];
}
