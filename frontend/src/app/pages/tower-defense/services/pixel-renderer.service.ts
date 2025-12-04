import { Injectable, ElementRef } from '@angular/core';
import { GameState } from '../models/game-state.model';
import { Defense, DefenseType } from '../models/defense.model';
import { Enemy, EnemyType } from '../models/enemy.model';
import { Projectile } from '../models/game-state.model';
import { GAME_CONFIG, ENEMY_PATH, COLORS } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class PixelRendererService {
  private ctx: CanvasRenderingContext2D | null = null;
  private canvas: HTMLCanvasElement | null = null;

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
    this.ctx.fillStyle = COLORS.BACKGROUND;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawGrid(): void {
    if (!this.ctx) return;
    const { ROWS, COLS, CELL_SIZE } = GAME_CONFIG.GRID;

    this.ctx.strokeStyle = COLORS.GRID;
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

    this.ctx.strokeStyle = COLORS.PATH;
    this.ctx.lineWidth = 40;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

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

    // Draw base
    this.ctx.fillStyle = this.getDefenseColor(defense.type);
    this.ctx.fillRect(x, y, size, size);

    // Draw border
    this.ctx.strokeStyle = COLORS.TEXT_PRIMARY;
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, size, size);

    // Draw icon (simple pixel art)
    this.ctx.fillStyle = COLORS.TEXT_PRIMARY;
    this.drawDefenseIcon(defense.type, x + size / 2, y + size / 2);
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
        return COLORS.LINUX_BLUE;
      case DefenseType.PC_RECONDITIONED:
        return COLORS.NIRD_GREEN;
      case DefenseType.LOCAL_SERVER:
        return '#8b5cf6';
      case DefenseType.ECO_DELEGATE:
        return '#10b981';
      default:
        return COLORS.UI_BORDER;
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

    // Draw enemy body
    this.ctx.fillStyle = this.getEnemyColor(enemy.type);
    this.ctx.fillRect(x, y, size, size);

    // Draw border
    this.ctx.strokeStyle = COLORS.DANGER_RED;
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, size, size);

    // Draw health bar
    this.drawHealthBar(enemy.position.x, enemy.position.y - size / 2 - 8, size, enemy.health, enemy.maxHealth);

    // Draw enemy icon
    this.ctx.fillStyle = COLORS.TEXT_PRIMARY;
    this.drawEnemyIcon(enemy.type, enemy.position.x, enemy.position.y, size);
  }

  private drawEnemyIcon(type: EnemyType, x: number, y: number, size: number): void {
    if (!this.ctx) return;

    this.ctx.save();
    this.ctx.translate(x, y);

    const iconSize = size * 0.5;

    switch (type) {
      case EnemyType.WINDOWS_EOL:
        // Windows logo
        this.ctx.fillRect(-iconSize / 2, -iconSize / 2, iconSize / 2 - 2, iconSize / 2 - 2);
        this.ctx.fillRect(2, -iconSize / 2, iconSize / 2 - 2, iconSize / 2 - 2);
        this.ctx.fillRect(-iconSize / 2, 2, iconSize / 2 - 2, iconSize / 2 - 2);
        this.ctx.fillRect(2, 2, iconSize / 2 - 2, iconSize / 2 - 2);
        break;
      case EnemyType.ANNUAL_LICENSE:
        // Dollar sign
        this.ctx.font = `bold ${iconSize}px monospace`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('$', 0, 0);
        break;
      case EnemyType.GOLIATH_BIGTECH:
        // Crown
        this.ctx.fillRect(-iconSize / 2, 0, iconSize, iconSize / 3);
        this.ctx.fillRect(-iconSize / 2, -iconSize / 3, iconSize / 5, iconSize / 3);
        this.ctx.fillRect(-iconSize / 6, -iconSize / 3, iconSize / 5, iconSize / 3);
        this.ctx.fillRect(iconSize / 6, -iconSize / 3, iconSize / 5, iconSize / 3);
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
    return type === EnemyType.GOLIATH_BIGTECH ? 48 : 32;
  }

  private getEnemyColor(type: EnemyType): string {
    switch (type) {
      case EnemyType.GOLIATH_BIGTECH:
        return '#7c3aed';
      case EnemyType.ANNUAL_LICENSE:
      case EnemyType.CLOUD_SUBSCRIPTION:
        return '#f59e0b';
      case EnemyType.CLOSED_ECOSYSTEM:
      case EnemyType.VENDOR_LOCKIN:
        return '#dc2626';
      default:
        return '#6b7280';
    }
  }

  private drawHealthBar(x: number, y: number, width: number, health: number, maxHealth: number): void {
    if (!this.ctx) return;

    const healthPercentage = health / maxHealth;
    const barHeight = 4;

    // Background
    this.ctx.fillStyle = COLORS.UI_BG;
    this.ctx.fillRect(x - width / 2, y, width, barHeight);

    // Health
    const healthColor = healthPercentage > 0.5 ? COLORS.NIRD_GREEN : healthPercentage > 0.25 ? COLORS.WARNING_YELLOW : COLORS.DANGER_RED;
    this.ctx.fillStyle = healthColor;
    this.ctx.fillRect(x - width / 2, y, width * healthPercentage, barHeight);
  }

  private drawProjectiles(projectiles: Projectile[]): void {
    if (!this.ctx) return;

    projectiles.forEach((projectile) => {
      this.ctx!.fillStyle = projectile.areaEffect ? COLORS.WARNING_YELLOW : COLORS.LINUX_BLUE;
      this.ctx!.beginPath();
      this.ctx!.arc(projectile.position.x, projectile.position.y, projectile.areaEffect ? 6 : 4, 0, Math.PI * 2);
      this.ctx!.fill();
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

    this.ctx.fillStyle = canPlace ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)';
    this.ctx.fillRect(x, y, GAME_CONFIG.GRID.CELL_SIZE, GAME_CONFIG.GRID.CELL_SIZE);

    this.ctx.strokeStyle = canPlace ? COLORS.NIRD_GREEN : COLORS.DANGER_RED;
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, GAME_CONFIG.GRID.CELL_SIZE, GAME_CONFIG.GRID.CELL_SIZE);
  }
}
