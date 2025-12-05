// import { Component, computed, inject, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { toSignal } from '@angular/core/rxjs-interop';

// import data from '../../../../assets/chatbot-actions.json';

// interface myText{
//   id : number;
//   text : string;
// }

// @Component({
//   selector: 'app-chatbot-component',
//   imports: [],
//   templateUrl: './chatbot-component.html',
//   styleUrl: './chatbot-component.scss',
//   standalone: true,
// })
// export class ChatbotComponent {
//   //CHAD FIFI TIME 

//   http = inject(HttpClient);

//   texts = signal<myText[]>(data as myText[]);
//   private count = signal(1);

//   changeState(): void {
//     // exemple : incrémente l'état
//     this.count.update(n => n + 1);
//     // affiche l'entrée trouvée après incrément
//   }



// }




import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import data from '../../../../assets/chatbot-actions.json';

interface myText {
  id: number;
  text: string;
}

@Component({
  selector: 'app-chatbot-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbot-component.html',
  styleUrl: './chatbot-component.scss',

  
})
export class ChatbotComponent {
  texts = signal<myText[]>(data as myText[]);
  private count = signal(1);
  animate = signal(false);

  readonly current = computed(() =>
    this.texts().find(t => t.id === this.count())
  );

  changeState(): void {
    const maxId = Math.max(...this.texts().map(t => t.id));
    if (this.count() < maxId) {
      this.count.update(n => n + 1);
      this.triggerAnimation();
    } else {
      // Revenir au début
      this.count.set(1);
      this.triggerAnimation();
    }
  }

  private triggerAnimation() {
    this.animate.set(true);
    setTimeout(() => this.animate.set(false), 500);
  }
}