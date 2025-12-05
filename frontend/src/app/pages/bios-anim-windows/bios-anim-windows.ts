import { Component, signal, computed,  } from '@angular/core';

@Component({
  selector: 'app-bios-anim-windows',
  imports: [],
  templateUrl: './bios-anim-windows.html',
  styleUrl: './bios-anim-windows.scss'
})
export class BiosAnimWindows {
  readonly phase = signal<Phase>('bios');

  // Fake Windows boot log lines
  private bootLines = [
    'Initializing system RAM...',
    'Detecting USB devices...',
    'Loading Winload.efi...',
    'Starting Windows Boot Manager...',
    'Checking integrity of system files...',
    'Preparing Windows...',
    'Applying settings...',
    'Starting services...',
  ];

  readonly visibleBootCount = signal(0);
  readonly visibleBootLines = computed(() =>
    this.bootLines.slice(0, this.visibleBootCount())
  );

  readonly bootLinesLength = this.bootLines.length;

  private biosTimeout: any;
  private bootTimeout: any;
  private finishTimeout: any;

  ngOnInit(): void {
    // Simulate BIOS for a moment
    this.biosTimeout = setTimeout(() => {
      this.phase.set('windows');
      this.startBootAnimation();
    }, 1500);
  }

  private startBootAnimation() {
    const baseDelay = 500; // 0.5s per line
    const jitter = 300;    // ±300ms variation
    let index = 0;

    const next = () => {
      const delay = baseDelay + (Math.random() * jitter * 2 - jitter);

      this.bootTimeout = setTimeout(() => {
        if (index < this.bootLines.length) {
          this.visibleBootCount.update(c => c + 1);
          index++;
          next();
        } else {
          // Randomized Windows loading duration
          const finalDelay = 1500 + (Math.random() * jitter * 2 - jitter);

          this.finishTimeout = setTimeout(() => {
            this.phase.set('desktop');
          }, finalDelay);
        }
      }, delay);
    };

    next();
  }

  ngOnDestroy(): void {
    clearTimeout(this.biosTimeout);
    clearTimeout(this.finishTimeout);
    clearTimeout(this.bootTimeout);
  }
}

type Phase = 'bios' | 'bootmgr' | 'windows' | 'desktop';