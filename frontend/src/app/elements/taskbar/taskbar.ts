import { Component } from '@angular/core';

@Component({
  selector: 'app-taskbar',
  imports: [],
  templateUrl: './taskbar.html',
  styleUrl: './taskbar.scss'
})
export class TaskbarComponent {
  time: string = '';
  date: string = '';

  constructor() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    const now = new Date();
    this.time = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    this.date = now.toLocaleDateString([],  {day: '2-digit', month: 'numeric', year: 'numeric'})
  }
}
