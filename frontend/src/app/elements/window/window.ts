import { Component, input, output } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-window',
  imports: [NgComponentOutlet, CdkDrag, CdkDragHandle],
  templateUrl: './window.html',
  styleUrl: './window.scss'
})
export class Window {
  title = input.required<string>()
  close = output()
  component = input.required<any>()
  x = input.required<number>()
  y = input.required<number>()

  onClose() {
    this.close.emit();
  }
}
