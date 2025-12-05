import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PlayerShipComponent } from './player-ship/player-ship';
import { MatCardModule } from '@angular/material/card';
import { LaserBeamComponent } from './laser-beam/laser-beam';
import { ExplosionComponent } from './explosion/explosion';

@Component({
  selector: 'app-laser-game',
  imports: [CommonModule, MatButtonModule, MatIconModule, PlayerShipComponent,MatCardModule],
  standalone: true,
  templateUrl: './laser-game.html',
  styleUrl: './laser-game.scss',
})
export class LaserGame implements OnDestroy {
  @HostBinding('class.game-active')
  isGameActive = false;
  score = 0;
  timeLeft = 60;

  private gameInterval: any;
  private targetInterval: any;
  private allTargets: HTMLElement[] = [];
  private currentTarget: HTMLElement | null = null;
  private hiddenTargets: HTMLElement[] = [];
  private shootSound: HTMLAudioElement;
  private explosionSound: HTMLAudioElement;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef
  ) {
    // Initialize the audio object and pre-load the sound file.
    // Make sure you have this sound file in the specified path.
    this.shootSound = new Audio('exf.wav');
    this.shootSound.load();

    // Initialize explosion sound
    this.explosionSound = new Audio('exp.wav'); // Example path
    this.explosionSound.load();
  }

  startGame(): void {
    this.isGameActive = true;
    this.score = 0;
    this.timeLeft = 60;
    this.hiddenTargets = [];
    this.collectTargets();

    // Main game timer
    this.gameInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.endGame();
      }
    }, 1000);

    // Target selection loop
    this.selectNewTarget();
    this.targetInterval = setInterval(() => this.selectNewTarget(), 3000);
  }

  endGame(): void {
    this.isGameActive = false;
    clearInterval(this.gameInterval);
    clearInterval(this.targetInterval);
    if (this.currentTarget) {
      this.renderer.removeClass(this.currentTarget, 'glowing-target');
      this.currentTarget = null;
    }
    // Restore visibility of all hidden targets
    this.hiddenTargets.forEach(target => {
      this.renderer.setStyle(target, 'visibility', 'visible');
    });
    this.hiddenTargets = [];
    alert(`Game Over! Your score: ${this.score}`);
  }

  private collectTargets(): void {
    // Query for potentially interactive/content elements, excluding the game UI.
    const potentialTargets: HTMLElement[] = Array.from(
      document.querySelectorAll(
        'a, button, img, h1, h2, h3, p, li, mat-card-title, mat-card-content, mat-icon:not(.laser-game-ui *)'
      )
    );

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    this.allTargets = potentialTargets.filter(el => {
      // Exclude elements that are part of the game UI.
      if (el.closest('.laser-game-ui')) {
        return false;
      }

      const rect = el.getBoundingClientRect();

      // Element must be visible and have a reasonable size.
      return rect.width > 10 &&
             rect.height > 10 &&
             rect.width < viewportWidth * 0.9 && // Not too wide
             rect.height < viewportHeight * 0.9; // Not too tall
    });
  }

  private selectNewTarget(): void {
    if (this.currentTarget) {
      this.renderer.removeClass(this.currentTarget, 'glowing-target');
    }

    if (this.allTargets.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.allTargets.length);
      this.currentTarget = this.allTargets[randomIndex];
      this.renderer.addClass(this.currentTarget, 'glowing-target');
    }
  }

  onShoot(shipPosition: { x: number; y: number }): void {
    // Play the pre-loaded sound effect
    this.shootSound.currentTime = 0; // Rewind to the start
    this.shootSound.play();

    const beamComponentRef =
      this.viewContainerRef.createComponent(LaserBeamComponent);
    beamComponentRef.instance.startPosition = shipPosition;

    // Check for hit
    const beamInterval = setInterval(() => {
      const beamElement = beamComponentRef.location.nativeElement;
      const beamRect = beamElement.getBoundingClientRect();

      if (this.currentTarget) {
        const targetRect = this.currentTarget.getBoundingClientRect();
        // For more precise hit detection, check if the center of the beam is inside the target.
        const beamCenterX = beamRect.left + beamRect.width / 2;
        const beamCenterY = beamRect.top + beamRect.height / 2;

        if (
          beamCenterX > targetRect.left &&
          beamCenterX < targetRect.right &&
          beamCenterY > targetRect.top &&
          beamCenterY < targetRect.bottom
        ) {
          this.score += 10;

          // Play explosion sound
          this.explosionSound.currentTime = 0;
          this.explosionSound.play();

          // Create explosion animation
          const explosionPos = {
            x: targetRect.left + targetRect.width / 2,
            y: targetRect.top + targetRect.height / 2,
          };
          const explosionRef = this.viewContainerRef.createComponent(ExplosionComponent);
          explosionRef.instance.position = explosionPos;

          // Hide the target
          this.renderer.setStyle(this.currentTarget, 'visibility', 'hidden');
          this.hiddenTargets.push(this.currentTarget);
          this.allTargets = this.allTargets.filter(t => t !== this.currentTarget);
          this.selectNewTarget();

          // Clean up beam and explosion
          beamComponentRef.destroy();
          clearInterval(beamInterval);
          setTimeout(() => explosionRef.destroy(), 400); // Destroy after animation
        } else if (beamRect.top < 0 || beamRect.bottom > window.innerHeight || beamRect.left < 0 || beamRect.right > window.innerWidth) {
          // Beam is off-screen, destroy it to prevent memory leaks
          beamComponentRef.destroy();
          clearInterval(beamInterval);
        }
      }
    }, 16); // ~60fps
  }

  ngOnDestroy(): void {
    this.endGame();
  }
}
