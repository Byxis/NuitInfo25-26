import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Process {
  name: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  isVital: boolean;
}

@Component({
  selector: 'app-task',
  imports: [CommonModule],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class Task {
  process = input.required<Process>();
  isSelected = input<boolean>(false);
  taskSelected = output<Process>();

  onSelectTask() {
    this.taskSelected.emit(this.process());
  }

  formatPercentage(value: number): string {
    return Math.round(value) + '%';
  }

  formatMemory(value: number): string {
    return value.toFixed(1) + ' Mo';
  }

  formatSpeed(value: number): string {
    return value.toFixed(1) + ' Mo/s';
  }
}
