import { Component, signal } from '@angular/core';
import { LaserGame } from '../laser-game/laser-game';
import { BiosAnimWindows } from '../bios-anim-windows/bios-anim-windows';
import { HomePage } from '../home/home.component';

@Component({
  selector: 'app-windows',
  imports: [HomePage, BiosAnimWindows],
  templateUrl: './windows.html',
  styleUrl: './windows.scss'
})
export class Windows {

  readonly bootDone = signal(false);

  onBootFinished(done: boolean) {
    this.bootDone.set(done);
  }

}
