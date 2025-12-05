import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotService } from './chatbot-service';

@Component({
  selector: 'app-chatbot-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbot-component.html',
  styleUrl: './chatbot-component.scss'
})
export class ChatbotComponent implements OnInit, OnDestroy {
  
  constructor(public chatbotService: ChatbotService) {}

  ngOnInit() {
    // Démarrer l'affichage automatique
    this.chatbotService.initialize();
  }

  ngOnDestroy() {
    // Arrêter le changement automatique lors de la destruction
    this.chatbotService.stopAutoChange();
  }
}