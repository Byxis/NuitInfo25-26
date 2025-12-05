import { Injectable, ElementRef } from '@angular/core';
import { GameState } from '../models/game-state.model';
import { Defense, DefenseType } from '../models/defense.model';
import { Enemy, EnemyType } from '../models/enemy.model';
import { Projectile } from '../models/game-state.model';
import { GAME_CONFIG, ENEMY_PATH, COLORS } from '../utils/constants';
import { ENEMY_IMAGES, DEFENSE_IMAGES, ImagePreloader } from '../utils/image-loader';

@Injectable({
  providedIn: 'root',
})
export class PixelRendererService {
  private ctx: CanvasRenderingContext2D | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private imagesLoaded = false;

  constructor() {
    // Précharger les images au démarrage
    Promise.all([
      ImagePreloader.preloadEnemyImages(),
      ImagePreloader.preloadDefenseImages()
    ]).then(() => {
      this.imagesLoaded = true;
      console.log('Images ennemis et défenses chargées avec succès');
    }).catch(err => {
      console.error('Erreur chargement images:', err);
      this.imagesLoaded = false;
    });
  }

  initialize(canvasRef: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    if (this.ctx) {
      this.ctx.imageSmoothingEnabled = false; // Pixel-perfect rendering
    }
  }

  render(gameState: GameState): void {
    if (!this.ctx || !this.canvas) return;

    this.clear();
    this.drawBackground();
    this.drawPath();
    this.drawGrid();
    this.drawDefenses(gameState.defenses);
    this.drawEnemies(gameState.enemies);
    this.drawProjectiles(gameState.projectiles);
    this.drawRanges(gameState);
  }

  private clear(): void {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawBackground(): void {
    if (!this.ctx || !this.canvas) return;
    this.ctx.fillStyle = COLORS.BG;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawGrid(): void {
    if (!this.ctx) return;
    const { ROWS, COLS, CELL_SIZE } = GAME_CONFIG.GRID;

    this.ctx.strokeStyle = COLORS.GRAY;
    this.ctx.lineWidth = 1;

    for (let row = 0; row <= ROWS; row++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, row * CELL_SIZE);
      this.ctx.lineTo(COLS * CELL_SIZE, row * CELL_SIZE);
      this.ctx.stroke();
    }

    for (let col = 0; col <= COLS; col++) {
      this.ctx.beginPath();
      this.ctx.moveTo(col * CELL_SIZE, 0);
      this.ctx.lineTo(col * CELL_SIZE, ROWS * CELL_SIZE);
      this.ctx.stroke();
    }
  }

  private drawPath(): void {
    if (!this.ctx) return;

    this.ctx.strokeStyle = COLORS.GRAY;
    this.ctx.lineWidth = 40;
    this.ctx.lineCap = 'square';
    this.ctx.lineJoin = 'miter';

    this.ctx.beginPath();
    this.ctx.moveTo(ENEMY_PATH[0].x, ENEMY_PATH[0].y);
    for (let i = 1; i < ENEMY_PATH.length; i++) {
      this.ctx.lineTo(ENEMY_PATH[i].x, ENEMY_PATH[i].y);
    }
    this.ctx.stroke();
  }

  private drawDefenses(defenses: Defense[]): void {
    if (!this.ctx) return;

    defenses.forEach((defense) => {
      this.drawDefense(defense);
    });
  }

  private drawDefense(defense: Defense): void {
    if (!this.ctx) return;

    const size = 32;
    const x = defense.position.x - size / 2;
    const y = defense.position.y - size / 2;

    // Essayer de charger l'image
    const imagePath = this.getDefenseImagePath(defense.type);
    const img = ImagePreloader.getImage(imagePath);

    if (img && img.complete && img.naturalWidth > 0) {
      // Dessiner l'image si elle est complètement chargée
      this.ctx.drawImage(img, x, y, size, size);
    } else {
      // Fallback : dessiner le carré coloré si l'image n'est pas disponible
      // Draw base
      this.ctx.fillStyle = this.getDefenseColor(defense.type);
      this.ctx.fillRect(x, y, size, size);

      // Draw border
      this.ctx.strokeStyle = COLORS.CYAN;
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(x, y, size, size);

      // Draw icon (simple pixel art)
      this.ctx.fillStyle = COLORS.BG;
      this.drawDefenseIcon(defense.type, x + size / 2, y + size / 2);
    }
  }

  private drawDefenseIcon(type: DefenseType, x: number, y: number): void {
    if (!this.ctx) return;

    const size = 12;
    this.ctx.save();
    this.ctx.translate(x, y);

    switch (type) {
      case DefenseType.PC_LINUX:
        // Simple monitor shape
        this.ctx.fillRect(-size / 2, -size / 2, size, size * 0.7);
        this.ctx.fillRect(-size / 4, size * 0.2, size / 2, size * 0.3);
        break;
      case DefenseType.PC_RECONDITIONED:
        // Recycling symbol
        this.ctx.beginPath();
        this.ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        this.ctx.stroke();
        break;
      case DefenseType.LOCAL_SERVER:
        // Server rack
        this.ctx.fillRect(-size / 2, -size / 2, size, size / 3);
        this.ctx.fillRect(-size / 2, -size / 6, size, size / 3);
        this.ctx.fillRect(-size / 2, size / 6, size, size / 3);
        break;
      case DefenseType.ECO_DELEGATE:
        // Leaf shape
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, size / 3, size / 2, Math.PI / 4, 0, Math.PI * 2);
        this.ctx.fill();
        break;
    }

    this.ctx.restore();
  }

  private getDefenseColor(type: DefenseType): string {
    switch (type) {
      case DefenseType.PC_LINUX:
        return COLORS.FG; // Bleu foncé
      case DefenseType.PC_RECONDITIONED:
        return COLORS.CYAN; // Bleu clair
      case DefenseType.LOCAL_SERVER:
        return COLORS.MAGENTA;
      case DefenseType.ECO_DELEGATE:
        return COLORS.YELLOW;
      default:
        return COLORS.FG;
    }
  }

  private drawEnemies(enemies: Enemy[]): void {
    if (!this.ctx) return;

    enemies.forEach((enemy) => {
      if (!enemy.isDead && enemy.health > 0) {
        this.drawEnemy(enemy);
      }
    });
  }

  private drawEnemy(enemy: Enemy): void {
    if (!this.ctx) return;

    const size = this.getEnemySize(enemy.type);
    const x = enemy.position.x - size / 2;
    const y = enemy.position.y - size / 2;

    // Essayer de charger l'image
    const imagePath = this.getEnemyImagePath(enemy.type);
    const img = ImagePreloader.getImage(imagePath);

    if (img && img.complete && img.naturalWidth > 0) {
      // Dessiner l'image si elle est complètement chargée
      this.ctx.drawImage(img, x, y, size, size);
    } else {
      // Fallback : dessiner le carré coloré si l'image n'est pas disponible
      this.ctx.fillStyle = this.getEnemyColor(enemy.type);
      this.ctx.fillRect(x, y, size, size);

      // Draw border
      this.ctx.strokeStyle = COLORS.WHITE;
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(x, y, size, size);

      // Draw enemy icon
      this.ctx.fillStyle = COLORS.BG;
      this.drawEnemyIcon(enemy.type, enemy.position.x, enemy.position.y, size);
    }

    // Draw health bar (toujours affichée)
    this.drawHealthBar(enemy.position.x, enemy.position.y - size / 2 - 8, size, enemy.health, enemy.maxHealth);
  }

  private getEnemyImagePath(type: EnemyType): string {
    return ENEMY_IMAGES[type];
  }

  private getDefenseImagePath(type: DefenseType): string {
    return DEFENSE_IMAGES[type];
  }

  private drawEnemyIcon(type: EnemyType, x: number, y: number, size: number): void {
    if (!this.ctx) return;

    this.ctx.save();
    this.ctx.translate(x, y);

    const iconSize = size * 0.5;

    switch (type) {
      case EnemyType.BUG:
        // Bug simple
        this.ctx.fillRect(-iconSize / 2, -iconSize / 2, iconSize / 2 - 2, iconSize / 2 - 2);
        this.ctx.fillRect(2, -iconSize / 2, iconSize / 2 - 2, iconSize / 2 - 2);
        break;
      case EnemyType.BLUE_SCREEN:
        // Ecran bleu
        this.ctx.font = `bold ${iconSize}px monospace`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('BSOD', 0, 0);
        break;
      case EnemyType.RANSOMWARE:
        // Boss - Lock
        this.ctx.fillRect(-iconSize / 2, 0, iconSize, iconSize / 3);
        this.ctx.fillRect(-iconSize / 2, -iconSize / 3, iconSize / 5, iconSize / 3);
        break;
      default:
        // Generic warning symbol
        this.ctx.font = `bold ${iconSize}px monospace`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('!', 0, 0);
    }

    this.ctx.restore();
  }

  private getEnemySize(type: EnemyType): number {
    return type === EnemyType.RANSOMWARE ? 48 : 32;
  }

  private getEnemyColor(type: EnemyType): string {
    switch (type) {
      case EnemyType.RANSOMWARE:
        return '#ff00ff'; // Magenta vif (Boss)
      case EnemyType.BLUE_SCREEN:
      case EnemyType.HOURGLASS:
        return '#ffff00'; // Jaune vif
      case EnemyType.VIRUS:
      case EnemyType.ACCESS_DENIED:
        return '#ff0000'; // Rouge vif
      default:
        return COLORS.GRAY;
    }
  }

  private drawHealthBar(x: number, y: number, width: number, health: number, maxHealth: number): void {
    if (!this.ctx) return;

    const healthPercentage = health / maxHealth;
    const barHeight = 4;

    // Background
    this.ctx.fillStyle = COLORS.GRAY;
    this.ctx.fillRect(x - width / 2, y, width, barHeight);

    // Health (bleu clair)
    this.ctx.fillStyle = COLORS.CYAN;
    this.ctx.fillRect(x - width / 2, y, width * healthPercentage, barHeight);
  }

  private drawProjectiles(projectiles: Projectile[]): void {
    if (!this.ctx) return;

    projectiles.forEach((projectile) => {
      // Projectiles en cyan vif
      this.ctx!.fillStyle = COLORS.CYAN;
      this.ctx!.fillRect(
        projectile.position.x - 3, 
        projectile.position.y - 3, 
        projectile.areaEffect ? 6 : 4, 
        projectile.areaEffect ? 6 : 4
      );
    });
  }

  private drawRanges(gameState: GameState): void {
    if (!this.ctx || !gameState.selectedDefenseType) return;

    // Show range preview when hovering
    // This would be triggered by mouse position - simplified for now
  }

  drawPlacementPreview(gridCol: number, gridRow: number, canPlace: boolean): void {
    if (!this.ctx) return;

    const x = gridCol * GAME_CONFIG.GRID.CELL_SIZE;
    const y = gridRow * GAME_CONFIG.GRID.CELL_SIZE;

    // Cyan pour placement valide, gris pour invalide
    this.ctx.fillStyle = canPlace ? 'rgba(0, 255, 255, 0.2)' : 'rgba(128, 128, 128, 0.3)';
    this.ctx.fillRect(x, y, GAME_CONFIG.GRID.CELL_SIZE, GAME_CONFIG.GRID.CELL_SIZE);

    this.ctx.strokeStyle = canPlace ? COLORS.CYAN : COLORS.GRAY;
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(x, y, GAME_CONFIG.GRID.CELL_SIZE, GAME_CONFIG.GRID.CELL_SIZE);
  }
}
