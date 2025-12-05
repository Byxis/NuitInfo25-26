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

  private audio = new Audio('happy-relaxing-loop-275487.mp3');
  private audio1 = new Audio('static-machine-loop-248770.mp3');

  startLoop() {
    // 2. Set the loop property to true
    this.audio.loop = true;
    this.audio1.loop = true;
    this.audio1.volume = 0.1;
    this.audio.volume = 0.8;
    // 3. Play (handle the promise rejection just in case)
    this.audio.play().catch(error => console.error(error));
    this.audio1.play().catch(error => console.error(error));
  }


  constructor(){
    this.startLoop();
  }


}
