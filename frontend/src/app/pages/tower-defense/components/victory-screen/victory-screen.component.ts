import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameEngineService } from '../../services/game-engine.service';

@Component({
  selector: 'app-victory-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './victory-screen.component.html',
  styleUrls: ['./victory-screen.component.scss'],
})
export class VictoryScreenComponent {
  constructor(private gameEngine: GameEngineService) {}

  get gameState() {
    return this.gameEngine.gameState;
  }

  get accuracyPercent(): number {
    const stats = this.gameState().stats;
    if (stats.totalShots === 0) return 0;
    return Math.round((stats.successfulShots / stats.totalShots) * 100);
  }

  get finalScore(): number {
    const stats = this.gameState().stats;
    return (
      stats.enemiesKilled * 100 +
      stats.budgetSaved +
      stats.pcReconditioned * 50 +
      stats.autonomyGained * 10 +
      (stats.lives * 100)
    );
  }

  get achievements(): string[] {
    const stats = this.gameState().stats;
    const achievements: string[] = [];

    if (stats.enemiesKilled >= 20) achievements.push('🏆 Tueur de BigTech');
    if (this.accuracyPercent >= 80) achievements.push('🎯 Tireur d\'élite');
    if (stats.pcReconditioned >= 30) achievements.push('♻️ Roi du recyclage');
    if (stats.budgetSaved >= 10000) achievements.push('💰 Économe exemplaire');
    if (stats.autonomyGained >= 80) achievements.push('🏛️ Village Autonome');
    if (stats.co2Saved >= 2) achievements.push('🌱 Héros écologique');
    if (stats.lives === 10) achievements.push('❤️ Défense parfaite');

    return achievements;
  }

  getRatingText(): string {
    const score = this.finalScore;
    if (score >= 10000) return '🥇 OR - Résistance Légendaire';
    if (score >= 5000) return '🥈 ARGENT - Résistance Héroïque';
    if (score >= 2000) return '🥉 BRONZE - Résistance Solide';
    return '📜 Résistance Débutante';
  }

  getRatingIcon(): string {
    const score = this.finalScore;
    if (score >= 10000) return '🥇';
    if (score >= 5000) return '🥈';
    if (score >= 2000) return '🥉';
    return '📜';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  restart(): void {
    this.gameEngine.startGame();
  }

  learnMore(): void {
    window.open('https://nird.forge.apps.education.fr/', '_blank');
  }
}
