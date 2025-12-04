import { Position } from './position.model';

export enum EnemyType {
  WINDOWS_EOL = 'WINDOWS_EOL',
  DRIVER_INCOMPATIBLE = 'DRIVER_INCOMPATIBLE',
  FORCED_UPDATE = 'FORCED_UPDATE',
  ANNUAL_LICENSE = 'ANNUAL_LICENSE',
  CLOUD_SUBSCRIPTION = 'CLOUD_SUBSCRIPTION',
  CLOSED_ECOSYSTEM = 'CLOSED_ECOSYSTEM',
  VENDOR_LOCKIN = 'VENDOR_LOCKIN',
  GOLIATH_BIGTECH = 'GOLIATH_BIGTECH',
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
  [EnemyType.WINDOWS_EOL]: {
    health: 50,
    speed: 30,
    reward: 5,
    damage: 1,
  },
  [EnemyType.DRIVER_INCOMPATIBLE]: {
    health: 40,
    speed: 40,
    reward: 4,
    damage: 1,
  },
  [EnemyType.FORCED_UPDATE]: {
    health: 60,
    speed: 35,
    reward: 5,
    damage: 1,
  },
  [EnemyType.ANNUAL_LICENSE]: {
    health: 80,
    speed: 25,
    reward: 6,
    damage: 2,
  },
  [EnemyType.CLOUD_SUBSCRIPTION]: {
    health: 70,
    speed: 30,
    reward: 5,
    damage: 1,
  },
  [EnemyType.CLOSED_ECOSYSTEM]: {
    health: 100,
    speed: 20,
    reward: 7,
    damage: 2,
  },
  [EnemyType.VENDOR_LOCKIN]: {
    health: 120,
    speed: 18,
    reward: 8,
    damage: 2,
  },
  [EnemyType.GOLIATH_BIGTECH]: {
    health: 500,
    speed: 15,
    reward: 50,
    damage: 5,
  },
};
