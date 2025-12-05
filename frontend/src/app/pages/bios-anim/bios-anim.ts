import { Component, OnDestroy, OnInit, signal, computed } from '@angular/core';

@Component({
  selector: 'app-bios-anim',
  imports: [],
  templateUrl: './bios-anim.html',
  styleUrl: './bios-anim.scss'
})


export class BiosAnim implements OnDestroy, OnInit{
  readonly phase = signal<Phase>('bios');

  readonly bootLines = [
    '[    0.000000] Booting Linux kernel ...',
    '[    0.000123] Initializing cgroups...',
    '[    0.001234] Loading Ubuntu modules...',
    '[    0.003452] Detecting hardware...',
    '[    0.010001] Mounting root filesystem...',
    '[    0.023456] Starting systemd...',
    '[    0.045678] Starting Network Manager...',
    '[    1.200000] Reached target Graphical Interface.',
    '[    1.350000] Ubuntu 22.04 LTS NIRD-virtual-machine tty1',
  ];

  readonly visibleBootCount = signal(0);
  readonly visibleBootLines = computed(() =>
    this.bootLines.slice(0, this.visibleBootCount()),
  );

  private biosTimeoutId: any;
  private bootIntervalId: any;
  private ubuntuTimeoutId: any;

  ngOnInit(): void {
    // Stay on BIOS screen for 2 seconds, then start boot animation
    this.biosTimeoutId = setTimeout(() => {
      this.phase.set('boot');
      this.startBootAnimation();
    }, 3000);
  }

  private startBootAnimation() {
    const baseDelay = 500; // base delay in ms
    const jitter = 300;    // ±300ms randomness
    let index = 0;

    const scheduleNext = () => {
      // Calculate randomized delay
      const delay =
        baseDelay + (Math.random() * jitter * 2 - jitter);
      //     500  +  random(-300 → +300)

      this.bootIntervalId = setTimeout(() => {
        if (index < this.bootLines.length) {
          this.visibleBootCount.update((c) => c + 1);
          index++;
          scheduleNext(); // schedule next line
        } else {
          // Fin du boot log → Ubuntu
          this.ubuntuTimeoutId = setTimeout(() => {
            this.phase.set('ubuntu');
          }, 3000);
        }
      }, delay);
    };

    scheduleNext();
  }

  ngOnDestroy(): void {
    clearTimeout(this.biosTimeoutId);
    clearTimeout(this.ubuntuTimeoutId);
    clearInterval(this.bootIntervalId);
  }
}


type Phase = 'bios' | 'boot' | 'ubuntu';
