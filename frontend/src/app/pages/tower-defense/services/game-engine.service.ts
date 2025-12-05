import { Injectable, signal } from '@angular/core';
import { GameState, GameStatus, GameStats, Projectile } from '../models/game-state.model';
import { Defense, DefenseType, DEFENSE_CONFIGS } from '../models/defense.model';
import { Enemy, EnemyType, ENEMY_CONFIGS } from '../models/enemy.model';
import { GridPosition, Position } from '../models/position.model';
import { GAME_CONFIG, WAVES, ENEMY_PATH, isPathTile } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class GameEngineService {
  gameState = signal<GameState>(this.getInitialState());

  private animationFrameId: number | null = null;
  private lastTime = 0;
  private enemySpawnQueue: { type: EnemyType; spawnTime: number }[] = [];
  private waveStartTime = 0;

  getInitialState(): GameState {
    return {
      status: GameStatus.MENU,
      defenses: [],
      enemies: [],
      projectiles: [],
      stats: {
        nirdPoints: GAME_CONFIG.INITIAL_NIRD_POINTS,
        lives: GAME_CONFIG.INITIAL_LIVES,
        currentWave: 0,
        totalWaves: WAVES.length,
        enemiesKilled: 0,
        totalShots: 0,
        successfulShots: 0,
        budgetSaved: 0,
        co2Saved: 0,
        pcReconditioned: 0,
        autonomyGained: 0,
      },
      selectedDefenseType: null,
      canPlaceDefense: false,
    };
  }

  startGame(): void {
    this.gameState.update((state) => ({
      ...this.getInitialState(),
      status: GameStatus.PLAYING,
    }));
    setTimeout(() => this.startWave(1), 8000); // 8 secondes avant la vague 1
    this.startGameLoop();
  }

  pauseGame(): void {
    this.gameState.update((state) => ({ ...state, status: GameStatus.PAUSED }));
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  resumeGame(): void {
    this.gameState.update((state) => ({ ...state, status: GameStatus.PLAYING }));
    this.startGameLoop();
  }

  selectDefense(type: DefenseType | null): void {
    this.gameState.update((state) => ({
      ...state,
      selectedDefenseType: type,
      canPlaceDefense: type !== null && state.stats.nirdPoints >= DEFENSE_CONFIGS[type].cost,
    }));
  }

  isOnPath(row: number, col: number): boolean {
    return isPathTile(row, col);
  }

  placeDefense(gridPosition: GridPosition): boolean {
    const state = this.gameState();
    if (!state.selectedDefenseType || !state.canPlaceDefense) return false;

    const defenseType = state.selectedDefenseType as DefenseType;
    const config = DEFENSE_CONFIGS[defenseType];

    // Check if position is on the path (not allowed)
    if (isPathTile(gridPosition.row, gridPosition.col)) return false;

    // Check if position is already occupied
    const occupied = state.defenses.some(
      (d) => d.gridPosition.row === gridPosition.row && d.gridPosition.col === gridPosition.col
    );
    if (occupied) return false;

    // Check if can afford
    if (state.stats.nirdPoints < config.cost) return false;

    const position: Position = {
      x: gridPosition.col * GAME_CONFIG.GRID.CELL_SIZE + GAME_CONFIG.GRID.CELL_SIZE / 2,
      y: gridPosition.row * GAME_CONFIG.GRID.CELL_SIZE + GAME_CONFIG.GRID.CELL_SIZE / 2,
    };

    const newDefense: Defense = {
      id: `defense-${Date.now()}-${Math.random()}`,
      type: defenseType,
      position,
      gridPosition,
      stats: { ...config },
      lastFireTime: 0,
      target: null,
      kills: 0,
    };

    this.gameState.update((state) => ({
      ...state,
      defenses: [...state.defenses, newDefense],
      stats: {
        ...state.stats,
        nirdPoints: state.stats.nirdPoints - config.cost,
      },
      selectedDefenseType: null,
      canPlaceDefense: false,
    }));

    return true;
  }

  private startWave(waveNumber: number): void {
    const wave = WAVES[waveNumber - 1];
    if (!wave) return;

    this.waveStartTime = Date.now();
    this.enemySpawnQueue = [];

    let cumulativeDelay = 0;
    wave.enemies.forEach((enemyGroup) => {
      for (let i = 0; i < enemyGroup.count; i++) {
        this.enemySpawnQueue.push({
          type: enemyGroup.type as EnemyType,
          spawnTime: cumulativeDelay,
        });
        cumulativeDelay += enemyGroup.delay;
      }
    });

    this.gameState.update((state) => ({
      ...state,
      stats: { ...state.stats, currentWave: waveNumber },
    }));
  }

  private startGameLoop(): void {
    this.lastTime = performance.now();
    const loop = (currentTime: number) => {
      if (this.gameState().status !== GameStatus.PLAYING) return;

      const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
      this.lastTime = currentTime;

      this.update(deltaTime);
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }

  private update(deltaTime: number): void {
    this.spawnEnemies();
    this.updateEnemies(deltaTime);
    this.updateDefenses(deltaTime);
    this.updateProjectiles(deltaTime);
    this.checkWaveCompletion();
    this.checkGameOver();
  }

  private spawnEnemies(): void {
    const currentTime = Date.now() - this.waveStartTime;
    const toSpawn = this.enemySpawnQueue.filter((e) => e.spawnTime <= currentTime);

    if (toSpawn.length > 0) {
      const newEnemies = toSpawn.map((enemyToSpawn) => this.createEnemy(enemyToSpawn.type));
      this.gameState.update((state) => ({
        ...state,
        enemies: [...state.enemies, ...newEnemies],
      }));
      this.enemySpawnQueue = this.enemySpawnQueue.filter((e) => e.spawnTime > currentTime);
    }
  }

  private createEnemy(type: EnemyType): Enemy {
    const config = ENEMY_CONFIGS[type];
    return {
      id: `enemy-${Date.now()}-${Math.random()}`,
      type,
      position: { ...ENEMY_PATH[0] },
      health: config.health,
      maxHealth: config.health,
      stats: { ...config },
      pathIndex: 0,
      isDead: false,
    };
  }

  private updateEnemies(deltaTime: number): void {
    const state = this.gameState();
    const updatedEnemies = state.enemies
      .map((enemy) => {
        if (enemy.isDead) return enemy;

        const nextPoint = ENEMY_PATH[enemy.pathIndex + 1];
        if (!nextPoint) {
          // Enemy reached the end - lose a life and mark as dead
          this.gameState.update((s) => ({
            ...s,
            stats: {
              ...s.stats,
              lives: Math.max(0, s.stats.lives - enemy.stats.damage),
            },
          }));
          return { ...enemy, isDead: true, health: 0 };
        }

        const dx = nextPoint.x - enemy.position.x;
        const dy = nextPoint.y - enemy.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 5) {
          return { ...enemy, pathIndex: enemy.pathIndex + 1, position: { ...nextPoint } };
        }

        const moveDistance = enemy.stats.speed * deltaTime;
        const ratio = moveDistance / distance;

        return {
          ...enemy,
          position: {
            x: enemy.position.x + dx * ratio,
            y: enemy.position.y + dy * ratio,
          },
        };
      })
      .filter((enemy) => !enemy.isDead && enemy.health > 0);

    this.gameState.update((state) => ({ ...state, enemies: updatedEnemies }));
  }

  private updateDefenses(deltaTime: number): void {
    const state = this.gameState();
    const currentTime = Date.now();

    state.defenses.forEach((defense) => {
      const timeSinceLastFire = (currentTime - defense.lastFireTime) / 1000;
      if (timeSinceLastFire < 1 / defense.stats.fireRate) return;

      // Find target
      const target = this.findTarget(defense);
      if (!target) return;

      // Fire projectile
      this.fireProjectile(defense, target);
      defense.lastFireTime = currentTime;

      this.gameState.update((s) => ({
        ...s,
        stats: { ...s.stats, totalShots: s.stats.totalShots + 1 },
      }));
    });
  }

  private findTarget(defense: Defense): Enemy | null {
    const enemies = this.gameState().enemies.filter((e) => !e.isDead && e.health > 0);
    return (
      enemies.find((enemy) => {
        const distance = this.getDistance(defense.position, enemy.position);
        return distance <= defense.stats.range;
      }) || null
    );
  }

  private fireProjectile(defense: Defense, target: Enemy): void {
    const projectile: Projectile = {
      id: `projectile-${Date.now()}-${Math.random()}`,
      position: { ...defense.position },
      target: { ...target.position },
      damage: defense.stats.damage,
      speed: GAME_CONFIG.PROJECTILE_SPEED,
      areaEffect: defense.stats.areaEffect,
    };

    this.gameState.update((state) => ({
      ...state,
      projectiles: [...state.projectiles, projectile],
    }));
  }

  private updateProjectiles(deltaTime: number): void {
    const state = this.gameState();
    const projectilesToRemove: string[] = [];

    state.projectiles.forEach((projectile) => {
      const dx = projectile.target.x - projectile.position.x;
      const dy = projectile.target.y - projectile.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 5) {
        // Hit target
        this.damageEnemies(projectile);
        projectilesToRemove.push(projectile.id);
      } else {
        const moveDistance = projectile.speed * deltaTime;
        const ratio = moveDistance / distance;
        projectile.position.x += dx * ratio;
        projectile.position.y += dy * ratio;
      }
    });

    this.gameState.update((state) => ({
      ...state,
      projectiles: state.projectiles.filter((p) => !projectilesToRemove.includes(p.id)),
    }));
  }

  private damageEnemies(projectile: Projectile): void {
    const state = this.gameState();
    let enemiesHit = 0;

    const updatedEnemies = state.enemies.map((enemy) => {
      if (enemy.isDead || enemy.health <= 0) return enemy;

      const distance = this.getDistance(projectile.target, enemy.position);
      const isHit = projectile.areaEffect ? distance < 50 : distance < 20;

      if (isHit) {
        enemiesHit++;
        const newHealth = enemy.health - projectile.damage;
        if (newHealth <= 0) {
          this.onEnemyKilled(enemy);
          return { ...enemy, health: 0, isDead: true };
        }
        return { ...enemy, health: newHealth };
      }
      return enemy;
    });

    this.gameState.update((state) => ({
      ...state,
      enemies: updatedEnemies,
      stats: {
        ...state.stats,
        successfulShots: enemiesHit > 0 ? state.stats.successfulShots + 1 : state.stats.successfulShots,
      },
    }));
  }

  private onEnemyKilled(enemy: Enemy): void {
    this.gameState.update((state) => {
      const newStats = {
        ...state.stats,
        enemiesKilled: state.stats.enemiesKilled + 1,
        nirdPoints: state.stats.nirdPoints + enemy.stats.reward,
        budgetSaved: state.stats.budgetSaved + enemy.stats.reward * 50,
        co2Saved: state.stats.co2Saved + 0.05,
        pcReconditioned: state.stats.pcReconditioned + 1,
        autonomyGained: Math.min(100, state.stats.autonomyGained + 2),
      };
      return { ...state, stats: newStats };
    });
  }



  private checkWaveCompletion(): void {
    const state = this.gameState();
    if (state.enemies.length === 0 && this.enemySpawnQueue.length === 0) {
      if (state.stats.currentWave < state.stats.totalWaves) {
        setTimeout(() => this.startWave(state.stats.currentWave + 1), 1500); // 1.5 secondes entre vagues
      } else {
        this.onVictory();
      }
    }
  }

  private checkGameOver(): void {
    const state = this.gameState();
    if (state.stats.lives <= 0) {
      this.gameState.update((state) => ({ ...state, status: GameStatus.DEFEAT }));
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }
  }

  private onVictory(): void {
    this.gameState.update((state) => ({ ...state, status: GameStatus.VICTORY }));
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private getDistance(pos1: Position, pos2: Position): number {
    const dx = pos2.x - pos1.x;
    const dy = pos2.y - pos1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
