import { Component, input, signal } from '@angular/core';
import { FileItem } from '../file-item';

@Component({
  selector: 'app-folder-window',
  imports: [],
  templateUrl: './folder-window.html',
  styleUrl: './folder-window.scss'
})
export class FolderWindowComponent {
  folderName = input<string>('Nouveau dossier')
  currentItems=signal<FileItem[]>([]);
  currentOrder=[]

  files: FileItem[] = [
    {id: 'towerdefensefolder', name: 'Tower Defense', type: 'folder', children: [
      {id: 'towerdefense', name: 'Tower Defense', type: 'exe', component: '', children: []}
    ]}
  ]


  constructor() {
    this.currentItems.set(this.files);
  }


  openItem(item: FileItem) {

    if(item.type === 'folder') {
      this.currentItems.set(item.children!)
    }
    else if (item.component) {
      console.log('ouverture de', item.name);
    }
  }
}
