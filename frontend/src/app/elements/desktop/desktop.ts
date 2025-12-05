import { Component } from '@angular/core';
import { TaskbarComponent } from '../taskbar/taskbar';
import { FileItem } from '../file-item';
import { App } from '../app-model';
import { FolderWindowComponent } from '../folder-window/folder-window';
import { AppIconComponent } from '../app-icon/app-icon';
import { Accueil } from 'src/app/pages/accueil/accueil';
import { Window } from '../window/window';

@Component({
  selector: 'app-desktop',
  imports: [TaskbarComponent, AppIconComponent, Window],
  templateUrl: './desktop.html',
  styleUrl: './desktop.scss'
})
export class DesktopComponent {
  apps: App[] = [
    {id: 'accueil', name: 'Accueil', icon: 'file.png', type: 'txt', component: Accueil},
  ]
    //{id: 'jeux', name: 'Jeux', icon: '', type: 'folder', component: FolderWindowComponent}

  openWindows: any[] = [];

  openApp(app: App) {
    const alreadyOpen = this.openWindows.some(win => win.id === app.id);

    if(alreadyOpen)
      return
    this.openWindows.push({id: app.id, name: app.name, component: app.component});

  }

  closeApp(win: any) {
    this.openWindows = this.openWindows.filter(w => w.id !== win.id);
  }
}
