// /home/yanis/Documents/NuitInfo25-26/frontend/src/app/pages/laser-game/explosion/explosion.ts

import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-explosion',
  standalone: true,
  template: ``,
  styles: [`
    :host {
      position: fixed;
      width: 100px; /* Size of the explosion */
      height: 100px;
      border-radius: 50%;
      /* A simple radial gradient for an explosion look */
      background: radial-gradient(circle, rgba(255,165,0,0.8) 0%, rgba(255,69,0,0) 70%);
      /* Center the explosion on the target's coordinates */
      transform: translate(-50%, -50%);
      /* The animation itself */
      animation: explode 0.4s ease-out forwards;
      pointer-events: none;
      z-index: 10000; /* Ensure it's on top */
    }

    @keyframes explode {
      0% {
        transform: translate(-50%, -50%) scale(0.1);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -50%) scale(1.5);
        opacity: 0;
      }
    }
  `]
})
export class ExplosionComponent {
  @Input() position: { x: number; y: number } = { x: 0, y: 0 };

  @HostBinding('style.left.px')
  get left() { return this.position.x; }

  @HostBinding('style.top.px')
  get top() { return this.position.y; }
}
