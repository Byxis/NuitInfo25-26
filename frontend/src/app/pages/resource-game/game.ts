export interface GameState {
  os: 'windows' | 'linux';
  maxCpu: number;
  maxRam: number;
  maxStorage: number;
  currentCpu: number;
  currentRam: number;
  currentStorage: number;
  gameOver: boolean;
  gameWon: boolean; // New win state
  gameMessage: string;
}

export interface Building {
  id: number;
  name: string;
  logo: string;
  width: number;
  height: number;
  cpu: number;
  ram: number;
  storage: number;
  os: 'windows' | 'linux' | 'any';
  dependencies?: number[];
  installed?: boolean; // Track if installed for the progress bar
}

export interface GridCell {
  buildingId: number | null;
  isOccupied: boolean;
}
