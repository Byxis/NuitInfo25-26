import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Building, GameState, GridCell } from './game';
import { UserService } from '@users/user.service';
import { BiosAnim } from '../bios-anim/bios-anim';

@Component({
  selector: 'app-resource-game',
  standalone: true,
  imports: [CommonModule,BiosAnim],
  templateUrl: './resource-game.html',
  styleUrl: './resource-game.scss',
})
export class ResourceGameComponent implements OnInit {
  gameState!: GameState;

  // Grille
  grid: GridCell[][] = [];
  gridSize = { rows: 10, cols: 10 };

  playBiosAnim = signal<boolean>(false);

  // Items
  availableBuildings: Building[] = [];
  placedBuildings: (Building & { top: number; left: number })[] = [];
  selectedBuilding: Building | null = null;

  // Events
  showUpdateModal = false;

  // Progress Logic
  totalAppsToInstall = 0;
  installedAppsCount = 0;

  ngOnInit(): void {
    this.startWindowsGame();
  }

  initializeGrid(): void {
    this.grid = Array.from({ length: this.gridSize.rows }, () =>
      Array.from({ length: this.gridSize.cols }, () => ({
        buildingId: null,
        isOccupied: false,
      }))
    );
    this.placedBuildings = [];
    this.installedAppsCount = 0;
  }

  // --- WINDOWS (Impossible Mode) ---
  startWindowsGame(): void {
    this.initializeGrid();
    this.showUpdateModal = false;

    this.gameState = {
      os: 'windows',
      maxCpu: 100,
      maxRam: 8192,
      maxStorage: 100000,
      currentCpu: 15, // Idle high
      currentRam: 3500, // High RAM usage
      currentStorage: 45000, // Almost half full already
      gameOver: false,
      gameWon: false,
      gameMessage: 'Windows démarré. Tâches de fond actives...',
    };
    this.loadBuildings('windows');
  }

  // --- LINUX (Winnable Mode) ---
  startLinuxGame(): void {
    this.initializeGrid();
    this.showUpdateModal = false;

    this.playBiosAnim.set(true);

    this.gameState = {
      os: 'linux',
      maxCpu: 100,
      maxRam: 8192,
      maxStorage: 100000,
      currentCpu: 2, // Very low
      currentRam: 450, // Very low
      currentStorage: 8000, // Very low
      gameOver: false,
      gameWon: false,
      gameMessage: 'Linux Ready. Système stable.',
    };
    this.loadBuildings('linux');
  }

  loadBuildings(os: 'windows' | 'linux'): void {
    // Reset installed status
    const allBuildings: Building[] = [
      { id: 1, name: 'VCRedist', logo: 'assets/logos/cpp.png', width: 1, height: 1, cpu: 1, ram: 50, storage: 200, os: 'windows' },
      { id: 2, name: 'DirectX', logo: 'assets/logos/dx.png', width: 1, height: 1, cpu: 2, ram: 100, storage: 500, os: 'windows' },
      { id: 3, name: 'Jeu AAA', logo: 'assets/logos/game.png', width: 3, height: 2, cpu: 30, ram: 3000, storage: 40000, dependencies: [1, 2], os: 'windows' },
      { id: 4, name: 'Browser', logo: 'assets/logos/browser.png', width: 2, height: 2, cpu: 10, ram: 1500, storage: 1000, os: 'any' },
      { id: 5, name: 'Antivirus', logo: 'assets/logos/antivirus.png', width: 1, height: 2, cpu: 20, ram: 1000, storage: 2000, os: 'windows' },
      { id: 6, name: 'Wine', logo: 'assets/logos/wine.png', width: 1, height: 1, cpu: 5, ram: 200, storage: 300, os: 'linux' },
      { id: 7, name: 'Terminal', logo: 'assets/logos/terminal.png', width: 2, height: 1, cpu: 1, ram: 50, storage: 10, os: 'linux' },
      { id: 8, name: 'Docker', logo: 'assets/logos/docker.png', width: 2, height: 2, cpu: 8, ram: 500, storage: 2000, os: 'any' },
      { id: 9, name: 'IDE', logo: 'assets/logos/ide.png', width: 2, height: 2, cpu: 15, ram: 200, storage: 500, os: 'any' },
    ];

    if (os === 'windows') {
      this.availableBuildings = allBuildings.filter(b => b.os !== 'linux');
    } else {
      this.availableBuildings = allBuildings;
    }

    // Calculate Goal
    this.totalAppsToInstall = this.availableBuildings.length;
  }

  selectBuilding(building: Building): void {
    if (this.gameState.gameOver || this.gameState.gameWon || this.showUpdateModal) return;
    this.selectedBuilding = building;
  }

  placeBuilding(row: number, col: number): void {
    if (!this.selectedBuilding || this.gameState.gameOver || this.showUpdateModal) return;

    const building = this.selectedBuilding;

    // --- Dependency Checks (Existing logic) ---
    if (building.dependencies) {
      for (const depId of building.dependencies) {
        if (!this.placedBuildings.some(b => b.id === depId)) {
          this.gameState.gameMessage = `ERREUR: Dépendance manquante !`;
          return;
        }
      }
    }
    if (this.gameState.os === 'linux' && building.os === 'windows' && !this.placedBuildings.some(b => b.id === 6)) {
        this.gameState.gameMessage = `Besoin de Wine pour les apps Windows.`;
        return;
    }

    // --- Placement Check ---
    if (!this.canPlace(building, row, col)) {
      this.gameState.gameMessage = 'Zone invalide ou occupée.';
      return;
    }

    // --- RESOURCE CALCULATION ---
    let newStorage = this.gameState.currentStorage + building.storage;
    let newCpu = this.gameState.currentCpu + building.cpu;
    let newRam = this.gameState.currentRam + building.ram;

    // *** WINDOWS SABOTAGE LOGIC ***
    if (this.gameState.os === 'windows') {
      // 1. Bloatware Effect: Each app adds hidden extra CPU/RAM
      newCpu += 5;
      newRam += 200;

      // 2. The "Impossible" Curve: If progress > 50%, spike resources massively
      const progress = (this.installedAppsCount + 1) / this.totalAppsToInstall;
      if (progress > 0.5) {
         newCpu += 20; // Sudden lag spike
         newStorage += 15000; // "System Restore Points" created silently
         this.gameState.gameMessage = "Windows installe des services télémétrie...";
      }
    }

    // --- Game Over Check ---
    if (newStorage > this.gameState.maxStorage) {
      this.handleGameOver("STOCKAGE SATURÉ");
      return;
    }
    if (newCpu >= 100) {
       // Windows crashes at 100%, Linux might just throttle (but here we crash for game logic)
       this.handleGameOver("SURCHAUFFE CPU");
       return;
    }
    if (newRam > this.gameState.maxRam) {
      this.handleGameOver("MÉMOIRE INSUFFISANTE");
      return;
    }

    // --- Apply Placement ---
    this.gameState.currentCpu = newCpu;
    this.gameState.currentRam = newRam;
    this.gameState.currentStorage = newStorage;

    for (let r = row; r < row + building.height; r++) {
      for (let c = col; c < col + building.width; c++) {
        this.grid[r][c] = { isOccupied: true, buildingId: building.id };
      }
    }

    this.placedBuildings.push({ ...building, top: row, left: col });

    // Update Progress
    if (!building.installed) {
        building.installed = true; // Mark as installed in the deck
        this.installedAppsCount++;
    }

    this.selectedBuilding = null;
    this.gameState.gameMessage = `${building.name} installé.`;

    // --- Check Win Condition (Only for Linux) ---
    if (this.gameState.os === 'linux') {
        if (this.installedAppsCount === this.totalAppsToInstall) {
            this.handleGameWin();
        }
    } else {
        // Windows Logic: Trigger update modal if storage gets high
        if (this.gameState.currentStorage > 80000) {
            this.showUpdateModal = true;
        }
    }
  }

  canPlace(building: Building, startRow: number, startCol: number): boolean {
    if (startRow + building.height > this.gridSize.rows || startCol + building.width > this.gridSize.cols) return false;
    for (let r = startRow; r < startRow + building.height; r++) {
      for (let c = startCol; c < startCol + building.width; c++) {
        if (this.grid[r][c].isOccupied) return false;
      }
    }
    return true;
  }

  closeUpdateModal(): void {
    this.showUpdateModal = false;
    // Punishment for Windows Update
    this.gameState.currentStorage += 20000; // Massive spike
    if (this.gameState.currentStorage > this.gameState.maxStorage) {
        this.handleGameOver("MIS À JOUR FATALE");
    }
  }

  handleGameOver(reason: string): void {
    this.gameState.gameOver = true;
    this.gameState.gameMessage = reason;
  }

  handleGameWin(): void {
      this.gameState.gameWon = true;
      this.win()
  }

  statusType = signal<'success' | 'error' | ''>('');
  statusMessage = signal<string>('');
  userService = inject(UserService);

  win() {
    this.statusMessage.set('Réussi: Tous les processus inutiles ont été terminés! Bravo !');
    this.statusType.set('success');
    this.userService.markGameAsFinished(4).subscribe({
      next: () => {
        console.log('Game 4 marked as finished for the user.');
      },
    });
  }
}
