import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameEngineService } from '../../services/game-engine.service';
import { GameStatus } from '../../models/game-state.model';

@Component({
  selector: 'app-game-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-ui.component.html',
  styleUrls: ['./game-ui.component.scss'],
})
export class GameUiComponent {
  constructor(private gameEngine: GameEngineService) {}

  get gameState() {
    return this.gameEngine.gameState;
  }

  startGame(): void {
    this.gameEngine.startGame();
  }

  pauseGame(): void {
    this.gameEngine.pauseGame();
  }

  resumeGame(): void {
    this.gameEngine.resumeGame();
  }
}
