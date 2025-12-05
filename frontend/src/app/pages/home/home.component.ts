import { Component } from '@angular/core';
import { DesktopComponent } from 'src/app/elements/desktop/desktop';
import { ChatbotComponent } from 'src/app/shared/chatbot/chatbot-component/chatbot-component';

@Component({
  selector: 'home-page',
  imports: [DesktopComponent, ChatbotComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomePage {




}
