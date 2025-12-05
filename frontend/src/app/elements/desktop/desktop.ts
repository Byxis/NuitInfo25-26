import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { TaskbarComponent } from '../taskbar/taskbar';
import { FileItem } from '../file-item';
import { App } from '../app-model';
import { AppIconComponent } from '../app-icon/app-icon';
import { Accueil } from 'src/app/pages/accueil/accueil';
import { Window } from '../window/window';
import { Equipe } from 'src/app/pages/equipe/equipe';
import { Credits } from 'src/app/pages/credits/credits';
import { SnakeComponent } from 'src/app/pages/snake/snake';
import { TowerDefenseComponent } from 'src/app/pages/tower-defense/tower-defense.component';
import { TaskManager } from 'src/app/pages/task-manager/task-manager';
import { LaserBeamComponent } from 'src/app/pages/laser-game/laser-beam/laser-beam';

import { QuizComponent } from 'src/app/pages/quiz-component/quiz-component';
import { Quizz } from 'src/app/pages/quizz/quizz';
import { UserService } from '@users/user.service';
import { ResourceGameComponent } from 'src/app/pages/resource-game/resource-game';
import { ChatbotComponent } from 'src/app/shared/chatbot/chatbot-component/chatbot-component';

@Component({
  selector: 'app-desktop',
  imports: [TaskbarComponent, AppIconComponent, Window, NgClass, ChatbotComponent],
  templateUrl: './desktop.html',
  styleUrl: './desktop.scss',
})
export class DesktopComponent {
  apps: App[] = [
    { id: 'accueil', name: 'Accueil.txt', icon: 'happy-file.png', type: 'txt', component: Accueil },
    { id: 'credits', name: 'Crédits.txt', icon: 'happy-file.png', type: 'txt', component: Credits },
    { id: 'equipe', name: "L'Équipe.txt", icon: 'happy-file.png', type: 'txt', component: Equipe },
    { id: 'quiz', name: 'Quiz.exe', icon: 'happy-file.png', type: 'txt', component: Quizz },
    { id: 'tower', name: 'Tower Defense.exe',  icon: 'tower-defense-logo.png', type: 'txt', component: TowerDefenseComponent, },
    { id: 'task', name: 'Task Manager.exe', icon: 'task.png', type: 'txt', component: TaskManager, },
    { id: 'resource', name: 'Resource Game.exe', icon: 'happy-file.png', type: 'txt', component: ResourceGameComponent, windowClass: 'resource-game-window' }
  ];
  //{id: 'jeux', name: 'Jeux', icon: '', type: 'folder', component: FolderWindowComponent}

  snake : App = { id: 'snake', name: 'Snake.exe', icon: 'file.png', type: 'txt', component: SnakeComponent }
  openWindows: any[] = [];
  userService = inject(UserService);

  openApp(app: App) {
    const alreadyOpen = this.openWindows.some((win) => win.id === app.id);

    if (alreadyOpen) return;
    this.openWindows.push({ id: app.id, name: app.name, component: app.component, windowClass: app.windowClass });
  }

  closeApp(win: any) {
    this.openWindows = this.openWindows.filter((w) => w.id !== win.id);
  }
}
