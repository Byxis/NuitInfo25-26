import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameEngineService } from '../../services/game-engine.service';
import { DefenseType, DEFENSE_CONFIGS } from '../../models/defense.model';
import { DEFENSE_DESCRIPTIONS } from '../../utils/constants';

@Component({
  selector: 'app-defense-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './defense-selector.component.html',
  styleUrls: ['./defense-selector.component.scss'],
})
export class DefenseSelectorComponent {
  defenseTypes = [
    {
      type: DefenseType.PC_LINUX,
      name: 'PC Linux',
      icon: '🖥️',
      cost: DEFENSE_CONFIGS[DefenseType.PC_LINUX].cost,
      damage: DEFENSE_CONFIGS[DefenseType.PC_LINUX].damage,
      range: DEFENSE_CONFIGS[DefenseType.PC_LINUX].range,
      description: DEFENSE_DESCRIPTIONS.PC_LINUX,
    },
    {
      type: DefenseType.PC_RECONDITIONED,
      name: 'PC Reconditionné',
      icon: '♻️',
      cost: DEFENSE_CONFIGS[DefenseType.PC_RECONDITIONED].cost,
      damage: DEFENSE_CONFIGS[DefenseType.PC_RECONDITIONED].damage,
      range: DEFENSE_CONFIGS[DefenseType.PC_RECONDITIONED].range,
      description: DEFENSE_DESCRIPTIONS.PC_RECONDITIONED,
    },
    {
      type: DefenseType.LOCAL_SERVER,
      name: 'Serveur Local',
      icon: '🏢',
      cost: DEFENSE_CONFIGS[DefenseType.LOCAL_SERVER].cost,
      damage: DEFENSE_CONFIGS[DefenseType.LOCAL_SERVER].damage,
      range: DEFENSE_CONFIGS[DefenseType.LOCAL_SERVER].range,
      description: DEFENSE_DESCRIPTIONS.LOCAL_SERVER,
    },
    {
      type: DefenseType.ECO_DELEGATE,
      name: 'Éco-délégué',
      icon: '🌱',
      cost: DEFENSE_CONFIGS[DefenseType.ECO_DELEGATE].cost,
      damage: DEFENSE_CONFIGS[DefenseType.ECO_DELEGATE].damage,
      range: DEFENSE_CONFIGS[DefenseType.ECO_DELEGATE].range,
      description: DEFENSE_DESCRIPTIONS.ECO_DELEGATE,
    },
  ];

  constructor(private gameEngine: GameEngineService) {}

  get gameState() {
    return this.gameEngine.gameState;
  }

  selectDefense(type: DefenseType): void {
    if (this.canAfford(type)) {
      const currentSelection = this.gameState().selectedDefenseType;
      this.gameEngine.selectDefense(currentSelection === type ? null : type);
    }
  }

  isSelected(type: DefenseType): boolean {
    return this.gameState().selectedDefenseType === type;
  }

  canAfford(type: DefenseType): boolean {
    return this.gameState().stats.nirdPoints >= DEFENSE_CONFIGS[type].cost;
  }
}
