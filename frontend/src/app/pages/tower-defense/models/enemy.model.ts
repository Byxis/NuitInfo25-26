import { Position } from './position.model';

export enum EnemyType {
  BUG = 'BUG',
  ERROR_404 = 'ERROR_404',
  DISK_FULL = 'DISK_FULL',
  BLUE_SCREEN = 'BLUE_SCREEN',
  HOURGLASS = 'HOURGLASS',
  ACCESS_DENIED = 'ACCESS_DENIED',
  VIRUS = 'VIRUS',
  RANSOMWARE = 'RANSOMWARE',
}

export interface EnemyStats {
  health: number;
  speed: number;
  reward: number; // NIRD Points
  damage: number; // Lives lost if reaches end
}

export interface Enemy {
  id: string;
  type: EnemyType;
  position: Position;
  health: number;
  maxHealth: number;
  stats: EnemyStats;
  pathIndex: number;
  isDead: boolean;
}

export const ENEMY_CONFIGS: Record<EnemyType, EnemyStats> = {
  [EnemyType.BUG]: {
    health: 50,
    speed: 30,
    reward: 5,
    damage: 1,
  },
  [EnemyType.ERROR_404]: {
    health: 40,
    speed: 40,
    reward: 4,
    damage: 1,
  },
  [EnemyType.DISK_FULL]: {
    health: 60,
    speed: 35,
    reward: 5,
    damage: 1,
  },
  [EnemyType.BLUE_SCREEN]: {
    health: 80,
    speed: 25,
    reward: 6,
    damage: 2,
  },
  [EnemyType.HOURGLASS]: {
    health: 70,
    speed: 30,
    reward: 5,
    damage: 1,
  },
  [EnemyType.ACCESS_DENIED]: {
    health: 100,
    speed: 20,
    reward: 7,
    damage: 2,
  },
  [EnemyType.VIRUS]: {
    health: 120,
    speed: 18,
    reward: 8,
    damage: 2,
  },
  [EnemyType.RANSOMWARE]: {
    health: 500,
    speed: 15,
    reward: 50,
    damage: 5,
  },
};
