import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { DesktopComponent } from './elements/desktop/desktop';
import { LaserGame } from "./pages/laser-game/laser-game";
import { BiosAnimWindows } from "./pages/bios-anim-windows/bios-anim-windows";
import { Windows } from "./pages/windows/windows";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LaserGame,
    BiosAnimWindows,
    Windows
],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('frontend');
}
