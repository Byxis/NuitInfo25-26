import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCanvasComponent } from './components/game-canvas/game-canvas.component';
import { GameUiComponent } from './components/game-ui/game-ui.component';
import { DefenseSelectorComponent } from './components/defense-selector/defense-selector.component';
import { VictoryScreenComponent } from './components/victory-screen/victory-screen.component';
import { GameEngineService } from './services/game-engine.service';

@Component({
  selector: 'app-tower-defense',
  standalone: true,
  imports: [
    CommonModule,
    GameCanvasComponent,
    GameUiComponent,
    DefenseSelectorComponent,
    VictoryScreenComponent,
  ],
  templateUrl: './tower-defense.component.html',
  styleUrls: ['./tower-defense.component.scss'],
})
export class TowerDefenseComponent {
  constructor(private gameEngine: GameEngineService) {}

  get gameState() {
    return this.gameEngine.gameState;
  }

  startGame(): void {
    this.gameEngine.startGame();
  }
}
