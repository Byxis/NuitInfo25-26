import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, Process } from './task/task';

@Component({
  selector: 'app-task-manager',
  imports: [CommonModule, Task],
  templateUrl: './task-manager.html',
  styleUrl: './task-manager.scss',
})
export class TaskManager implements OnInit {
  processes = signal<Process[]>([]);
  selectedTab = signal<string>('processus');
  selectedProcess = signal<Process | null>(null);
  statusMessage = signal<string>('');
  statusType = signal<'success' | 'error' | ''>('');

  globalCpu = computed(() => this.processes().reduce((sum, p) => sum + p.cpu, 0));
  globalMemory = computed(() => this.processes().reduce((sum, p) => sum + p.memory, 0));
  globalDisk = computed(() => this.processes().reduce((sum, p) => sum + p.disk, 0));
  globalNetwork = computed(() => this.processes().reduce((sum, p) => sum + p.network, 0));

  ngOnInit() {
    // Vital system processes
    this.addProcess('System', 0.9, 112.4, 0.1, 0, true);
    this.addProcess('Gestionnaire de tâches', 5.3, 5.9, 0.1, 0, true);
    this.addProcess('Explorateur Windows', 1.5, 12.9, 0, 0, true);
    this.addProcess('Gestionnaire de fenêtres du Bureau', 6.5, 14.3, 0.1, 0, true);
    this.addProcess('Runtime Système Critique', 2.1, 8.7, 0.05, 0, true);

    // Bloatware processes
    this.addProcess('Truc Promotionnel du Constructeur', 12.3, 456.2, 2.1, 5.6, false);
    this.addProcess('Assistant Personnel Inutile v2.0', 8.7, 234.5, 0.8, 3.2, false);
    this.addProcess('Mise à Jour Urgente !!!!', 5.4, 123.1, 1.5, 0, false);
    this.addProcess('Service de Télémétrie Bavard', 3.2, 189.4, 0.5, 12.3, false);
    this.addProcess('Cloud Sync Qui Tourne 24/7', 4.1, 167.8, 3.2, 8.9, false);
    this.addProcess('Publicités Déguisées en Service', 2.8, 98.6, 0.2, 4.5, false);
    this.addProcess('Antivirus Bonus Non-Demandé', 6.9, 345.2, 0.3, 0, false);
    this.addProcess('你无聊到必须把它翻译出来', 5.7, 1345.2, 0.2, 27.8, false);
    this.addProcess('Optimiseur Système Qui Ralentit', 3.5, 156.7, 1.1, 2.1, false);
    this.addProcess('VPN Gratuit Évidemment Suspect', 7.2, 234.1, 0.9, 15.3, false);
    this.addProcess('Widget Bureau Absolument Nécessaire', 1.9, 87.3, 0.1, 0.5, false);
    this.addProcess('Synchronisation Fantôme', 2.3, 145.6, 2.3, 6.7, false);
    this.addProcess('Crypto-Mineur super Discret', 45.2, 512.3, 0, 0.1, false);
    this.addProcess('Service Pub', 1.1, 92.4, 0.3, 3.8, false);
    this.addProcess("Traqueur d'Habitudes", 0.8, 78.9, 0.2, 8.1, false);
    this.addProcess('Notificateur de Choses Inutiles', 0.6, 54.2, 0.1, 1.2, false);

    this.processes.update((procs) => [...procs].sort((a, b) => b.cpu - a.cpu));
  }

  addProcess(
    name: string,
    cpu: number,
    memory: number,
    disk: number,
    network: number,
    isVital: boolean
  ) {
    this.processes.update((procs) => [...procs, { name, cpu, memory, disk, network, isVital }]);
  }

  onTaskSelected(process: Process) {
    if (this.isProcessSelected(process)) {
      this.selectedProcess.set(null);
    } else {
      this.selectedProcess.set(process);
    }
  }

  isProcessSelected(process: Process): boolean {
    return this.selectedProcess() === process;
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Delete' || event.key === 'Suppr') {
      this.endTask();
    }
  }

  endTask() {
    if (this.hasWon()) {
      return;
    }
    const selected = this.selectedProcess();
    if (!selected) {
      this.statusMessage.set('Veuillez sélectionner un processus');
      this.statusType.set('error');
      setTimeout(() => {
        if (this.statusMessage() === 'Veuillez sélectionner un processus') {
          this.clearStatus();
        }
      }, 3000);
      return;
    }

    if (selected.isVital) {
      this.statusMessage.set('Erreur: Impossible de terminer ce processus système vital!');
      this.statusType.set('error');
      setTimeout(() => {
        if (this.statusMessage() === 'Erreur: Impossible de terminer ce processus système vital!') {
          this.clearStatus();
        }
      }, 3000);
      return;
    }

    this.processes.update((procs) => procs.filter((p) => p !== selected));
    this.selectedProcess.set(null);
    if (this.hasWon()) {
      this.win();
    } else {
      this.statusMessage.set('Réussi: Le processus a été terminé avec succès');
      this.statusType.set('success');
      setTimeout(() => {
        if (this.statusMessage() === 'Réussi: Le processus a été terminé avec succès') {
          this.clearStatus();
        }
      }, 3000);
    }
  }

  hasWon(): boolean {
    return this.processes().every((p) => p.isVital);
  }

  win() {
    this.statusMessage.set('Réussi: Tous les processus inutiles ont été terminés! Bravo !');
    this.statusType.set('success');
  }

  clearStatus() {
    this.statusMessage.set('');
    this.statusType.set('');
  }

  formatPercentage(value: number): string {
    return Math.round(value) + '%';
  }

  getSaturationClass(value: number): string {
    if (value < 50) return 'stat-value-low';
    if (value < 80) return 'stat-value-medium';
    return 'stat-value-high';
  }
}
