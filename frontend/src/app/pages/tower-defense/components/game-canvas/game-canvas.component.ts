import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameEngineService } from '../../services/game-engine.service';
import { PixelRendererService } from '../../services/pixel-renderer.service';
import { GAME_CONFIG } from '../../utils/constants';
import { Defense } from '../../models/defense.model';

@Component({
  selector: 'app-game-canvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.scss'],
})
export class GameCanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gameCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  canvasWidth = GAME_CONFIG.CANVAS.WIDTH;
  canvasHeight = GAME_CONFIG.CANVAS.HEIGHT;

  private animationFrameId: number | null = null;
  private hoveredCell: { row: number; col: number } | null = null;

  constructor(
    private gameEngine: GameEngineService,
    private renderer: PixelRendererService
  ) {
    // Re-render when game state changes
    effect(() => {
      const state = this.gameEngine.gameState();
      if (this.canvasRef) {
        this.render();
      }
    });
  }

  ngAfterViewInit(): void {
    this.renderer.initialize(this.canvasRef);
    this.startRenderLoop();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private startRenderLoop(): void {
    const loop = () => {
      this.render();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }

  private render(): void {
    const gameState = this.gameEngine.gameState();
    this.renderer.render(gameState);

    // Draw placement preview if hovering
    if (this.hoveredCell && gameState.selectedDefenseType) {
      const canPlace = this.canPlaceDefense(this.hoveredCell.col, this.hoveredCell.row);
      this.renderer.drawPlacementPreview(this.hoveredCell.col, this.hoveredCell.row, canPlace);
    }
  }

  onCanvasClick(event: MouseEvent): void {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / GAME_CONFIG.GRID.CELL_SIZE);
    const row = Math.floor(y / GAME_CONFIG.GRID.CELL_SIZE);

    if (col >= 0 && col < GAME_CONFIG.GRID.COLS && row >= 0 && row < GAME_CONFIG.GRID.ROWS) {
      this.gameEngine.placeDefense({ row, col });
    }
  }

  onCanvasHover(event: MouseEvent): void {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / GAME_CONFIG.GRID.CELL_SIZE);
    const row = Math.floor(y / GAME_CONFIG.GRID.CELL_SIZE);

    if (col >= 0 && col < GAME_CONFIG.GRID.COLS && row >= 0 && row < GAME_CONFIG.GRID.ROWS) {
      this.hoveredCell = { row, col };
    } else {
      this.hoveredCell = null;
    }
  }

  private canPlaceDefense(col: number, row: number): boolean {
    const state = this.gameEngine.gameState();
    return !state.defenses.some((d: Defense) => d.gridPosition.col === col && d.gridPosition.row === row);
  }
}
