import { Component } from '@angular/core';
import { TaskbarComponent } from '../taskbar/taskbar';
import { FileItem } from '../file-item';
import { App } from '../app-model';
import { FolderWindowComponent } from '../folder-window/folder-window';
import { AppIconComponent } from '../app-icon/app-icon';
import { Accueil } from 'src/app/pages/accueil/accueil';
import { Window } from '../window/window';
import { Equipe } from 'src/app/pages/equipe/equipe';
import { Credits } from 'src/app/pages/credits/credits';
import { SnakeComponent } from 'src/app/pages/snake/snake';
import { TowerDefenseComponent } from 'src/app/pages/tower-defense/tower-defense.component';
import { TaskManager } from 'src/app/pages/task-manager/task-manager';
import { LaserBeamComponent } from 'src/app/pages/laser-game/laser-beam/laser-beam';
import { Quizz } from 'src/app/pages/quizz/quizz';

@Component({
  selector: 'app-desktop',
  imports: [TaskbarComponent, AppIconComponent, Window],
  templateUrl: './desktop.html',
  styleUrl: './desktop.scss',
})
export class DesktopComponent {
  apps: App[] = [
    { id: 'accueil', name: 'Accueil', icon: 'file.png', type: 'txt', component: Accueil },
    { id: 'credits', name: 'Crédits', icon: 'file.png', type: 'txt', component: Credits },
    { id: 'equipe', name: "L'Équipe", icon: 'file.png', type: 'txt', component: Equipe },
    { id: 'snake', name: 'Snake.exe', icon: 'file.png', type: 'txt', component: SnakeComponent },
    { id: 'quizz', name: 'Quizz.exe', icon: 'file.png', type: 'txt', component: Quizz },
    {
      id: 'tower',
      name: 'Tower Defense.exe',
      icon: 'file.png',
      type: 'txt',
      component: TowerDefenseComponent,
    },
    { id: 'task', name: 'Task manager.exe', icon: 'file.png', type: 'txt', component: TaskManager },
  ];
  //{id: 'jeux', name: 'Jeux', icon: '', type: 'folder', component: FolderWindowComponent}

  openWindows: any[] = [];

  openApp(app: App) {
    const alreadyOpen = this.openWindows.some((win) => win.id === app.id);

    if (alreadyOpen) return;
    this.openWindows.push({ id: app.id, name: app.name, component: app.component });
  }

  closeApp(win: any) {
    this.openWindows = this.openWindows.filter((w) => w.id !== win.id);
  }
}
