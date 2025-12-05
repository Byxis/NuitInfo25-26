import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-player-ship',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-ship.html',
  styleUrl: './player-ship.scss'
})
export class PlayerShipComponent {
  @Input() score: number = 0;
  @Input() timeLeft: number = 0;
  @Output() shoot = new EventEmitter<{ x: number, y: number }>();

  shipPosition = { x: 0, y: 0 };

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // Position the ship at the bottom of the screen, centered on the mouse's X coordinate
    this.shipPosition.x = event.clientX;
    this.shipPosition.y = window.innerHeight - 50; // 50px from bottom
  }

  @HostListener('document:click')
  onClick() {
    this.shoot.emit(this.shipPosition);
  }
}
