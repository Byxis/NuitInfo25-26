import { Position, GridPosition } from './position.model';

export enum DefenseType {
  PC_LINUX = 'PC_LINUX',
  PC_RECONDITIONED = 'PC_RECONDITIONED',
  LOCAL_SERVER = 'LOCAL_SERVER',
  ECO_DELEGATE = 'ECO_DELEGATE',
}

export interface DefenseStats {
  damage: number;
  range: number;
  fireRate: number; // Attacks per second
  cost: number;
  areaEffect?: boolean;
}

export interface Defense {
  id: string;
  type: DefenseType;
  position: Position;
  gridPosition: GridPosition;
  stats: DefenseStats;
  lastFireTime: number;
  target: string | null; // Enemy ID
  kills: number;
}

export const DEFENSE_CONFIGS: Record<DefenseType, DefenseStats> = {
  [DefenseType.PC_LINUX]: {
    damage: 15,
    range: 120,
    fireRate: 1.5,
    cost: 50,
  },
  [DefenseType.PC_RECONDITIONED]: {
    damage: 25,
    range: 100,
    fireRate: 1.2,
    cost: 100,
    areaEffect: true,
  },
  [DefenseType.LOCAL_SERVER]: {
    damage: 40,
    range: 150,
    fireRate: 0.8,
    cost: 150,
  },
  [DefenseType.ECO_DELEGATE]: {
    damage: 10,
    range: 80,
    fireRate: 2.0,
    cost: 75,
  },
};
