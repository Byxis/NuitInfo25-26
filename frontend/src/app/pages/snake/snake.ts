import { Component, HostListener, OnDestroy, inject, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'snake',
  imports: [FormsModule],
  templateUrl: './snake.html',
  styleUrl: './snake.scss',
})
export class SnakeComponent implements OnDestroy {
  private router = inject(Router);
  @ViewChild('terminalInputField') terminalInputField!: ElementRef<HTMLInputElement>;

  // Configuration
  gridSize = 20;
  tileSize = 22;
  speed = 150;

  // Game state
  grid: number[][] = [];
  snake: { x: number; y: number }[] = [];
  food: { x: number; y: number } = { x: 0, y: 0 };
  direction: { x: number; y: number } = { x: 1, y: 0 };
  nextDirection: { x: number; y: number } = { x: 1, y: 0 };
  score = 0;
  gameStarted = false;
  gameInterval: any;

  // Terminal input
  terminalInput = '';
  gameOverMessage = '';

  constructor() {
    this.initGrid();
    this.startGame();
  }

  initGrid() {
    this.grid = [];
    for (let i = 0; i < this.gridSize; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.gridSize; j++) {
        this.grid[i][j] = 0;
      }
    }
  }

  startGame() {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }

    this.score = 0;
    this.gameOverMessage = '';
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };

    const startX = Math.floor(this.gridSize / 2);
    const startY = Math.floor(this.gridSize / 2);
    this.snake = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY },
    ];

    this.placeFood();
    this.gameStarted = true;

    this.gameInterval = setInterval(() => this.gameLoop(), this.speed);
  }

  gameLoop() {
    this.direction = this.nextDirection;

    const head = this.snake[0];
    const newHead = {
      x: head.x + this.direction.x,
      y: head.y + this.direction.y,
    };

    if (
      newHead.x < 0 ||
      newHead.x >= this.gridSize ||
      newHead.y < 0 ||
      newHead.y >= this.gridSize
    ) {
      this.gameOver();
      return;
    }

    if (this.snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
      this.gameOver();

      return;
    }

    this.snake.unshift(newHead);

    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      this.score += 10;
      this.placeFood();
    } else {
      this.snake.pop();
    }
  }

  placeFood() {
    let newFood: { x: number; y: number };
    do {
      newFood = {
        x: Math.floor(Math.random() * this.gridSize),
        y: Math.floor(Math.random() * this.gridSize),
      };
    } while (this.snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));

    this.food = newFood;
  }

  gameOver() {
    clearInterval(this.gameInterval);
    this.gameStarted = false;
    this.gameOverMessage = ` Game Over! Score: ${this.score}`;
    setTimeout(() => {
      this.terminalInputField?.nativeElement.focus();
    }, 0);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    if (!this.gameStarted) return;

    switch (event.key) {
      case 'ArrowUp':
        if (this.direction.y !== 1) {
          this.nextDirection = { x: 0, y: -1 };
        }
        break;
      case 'ArrowDown':
        if (this.direction.y !== -1) {
          this.nextDirection = { x: 0, y: 1 };
        }
        break;
      case 'ArrowLeft':
        if (this.direction.x !== 1) {
          this.nextDirection = { x: -1, y: 0 };
        }
        break;
      case 'ArrowRight':
        if (this.direction.x !== -1) {
          this.nextDirection = { x: 1, y: 0 };
        }
        break;
    }
    event.preventDefault();
  }

  isSnake(row: number, col: number): boolean {
    return this.snake.some((segment) => segment.x === col && segment.y === row);
  }

  isSnakeHead(row: number, col: number): boolean {
    return this.snake.length > 0 && this.snake[0].x === col && this.snake[0].y === row;
  }
  isSnakeBottom(row: number, col: number): boolean {
    return (
      this.snake.length > 1 &&
      this.snake[this.snake.length - 1].x === col &&
      this.snake[this.snake.length - 1].y === row
    );
  }

  isFood(row: number, col: number): boolean {
    return this.food.x === col && this.food.y === row;
  }

  ngOnDestroy() {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }
  }

  handleTerminalCommand(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const command = this.terminalInput.trim().toLowerCase();

      if (command === 'start') {
        this.startGame();
      } else if (command === 'exit') {
        this.router.navigate(['/']);
      }

      this.terminalInput = '';
      event.preventDefault();
    }
  }
}
