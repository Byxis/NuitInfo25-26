import { Component, input, output } from '@angular/core';
import { App } from '../app-model';

@Component({
  selector: 'app-app-icon',
  imports: [],
  templateUrl: './app-icon.html',
  styleUrl: './app-icon.scss'
})
export class AppIconComponent {
  app = input.required<App>();
  open = output<App>();

  onDoubleClick() {
    this.open.emit(this.app());
  }
}
