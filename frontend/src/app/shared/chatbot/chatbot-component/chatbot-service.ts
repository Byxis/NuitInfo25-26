import { Injectable, signal, computed } from '@angular/core';
import data from '../../../../assets/chatbot-actions.json';

interface myText {
  id: number;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private texts = signal<myText[]>(data as myText[]);
  private currentId = signal<number>(1);
  animate = signal(false);
  private intervalId?: number;

  readonly currentText = computed(() =>
    this.texts().find(t => t.id === this.currentId())
  );

  // Obtenir un texte aléatoire
  getRandomText(): void {
    const randomId = Math.floor(Math.random() * this.texts().length) + 1;
    this.currentId.set(randomId);
    this.triggerAnimation();
  }

  // Obtenir un texte par ID spécifique
  getTextById(id: number): void {
    const text = this.texts().find(t => t.id === id);
    if (text) {
      this.currentId.set(id);
      this.triggerAnimation();
    }
  }

  private triggerAnimation() {
    this.animate.set(true);
    setTimeout(() => this.animate.set(false), 500);
  }

  // Démarrer le changement automatique
  startAutoChange(): void {
    this.scheduleNextChange();
  }

  private scheduleNextChange(): void {
    // Intervalle aléatoire entre 5 et 15 secondes
    const randomDelay = Math.floor(Math.random() * 10000) + 5000;
    
    this.intervalId = window.setTimeout(() => {
      this.getRandomText();
      this.scheduleNextChange(); // Programmer le prochain changement
    }, randomDelay);
  }

  // Arrêter le changement automatique
  stopAutoChange(): void {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = undefined;
    }
  }

  // Initialiser avec un texte aléatoire au démarrage
  initialize(): void {
    this.getRandomText();
    this.startAutoChange();
  }
}