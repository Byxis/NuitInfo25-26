import { Component, input, output } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-window',
  imports: [NgComponentOutlet],
  templateUrl: './window.html',
  styleUrl: './window.scss'
})
export class Window {
  title = input.required<string>()
  close = output()
  component = input.required<any>()

  onClose() {
    this.close.emit();
  }
}
