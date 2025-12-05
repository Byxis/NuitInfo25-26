import { Component, input } from '@angular/core';
import { FileItem } from '../file-item';

@Component({
  selector: 'app-folder-window',
  imports: [],
  templateUrl: './folder-window.html',
  styleUrl: './folder-window.scss'
})
export class FolderWindowComponent {
  folderName = input<string>('Nouveau dossier')
  items = input<FileItem[]>([])

  openItem(item: FileItem) {
    if(item.type === 'folder') {
      console.log('ouvre dossier', item.name);
    }
    else if (item.component) {
      console.log('ouverture de', item.name);
    }
  }
}
