import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-laser-beam',
  standalone: true,
  template: '',
  styleUrl: './laser-beam.scss'
})
export class LaserBeamComponent implements OnInit {
  @Input() startPosition!: { x: number, y: number };

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'left', `${this.startPosition.x}px`);
    this.renderer.setStyle(this.el.nativeElement, 'top', `${this.startPosition.y}px`);

    // Self-destruct after animation
    setTimeout(() => {
      this.el.nativeElement.remove();
    }, 1000); // Corresponds to animation duration
  }
}
