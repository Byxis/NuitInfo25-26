import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  github?: string;
  linkedin?: string;
}

@Component({
  selector: 'app-equipe',
  imports: [CommonModule],
  templateUrl: './equipe.html',
  styleUrl: './equipe.scss',
})
export class Equipe {
  teamMembers: TeamMember[] = [
    {
      name: 'Alexis Serrano',
      github: 'https://github.com/Byxis',
      linkedin: 'https://www.linkedin.com/in/alexis-serrano-538791278/',
    },
    {
      name: 'Yanis Niaussat',
      github: 'https://github.com/yanis-niaussat',
      linkedin: 'https://www.linkedin.com/in/yanis-niaussat/',
    },
    {
      name: 'Alessandra van Rossen Martinez',
      github: 'https://github.com/4lxss',
      linkedin: 'https://www.linkedin.com/in/alessandra-van-rossen-martinez/',
    },
    {
      name: 'Mohamed Zouhair Moudni',
      github: 'https://github.com/dawoldo',
      linkedin: 'https://www.linkedin.com/in/mohamed-zouhair-moudni/',
    },
    {
      name: 'Sébastien Pinta',
      github: 'https://github.com/Askneuh',
      linkedin: 'https://www.linkedin.com/in/s%C3%A9bastien-pinta-2a847a385/',
    },
    {
      name: 'Tom Léardi',
      github: 'https://github.com/SymetTr1x ',
      linkedin: 'https://www.linkedin.com/in/tom-leardi-96067834b/',
    },
    {
      name: 'Andréa Antoniali',
      github: 'https://github.com/AndreaAntoniali',
      linkedin: 'https://www.linkedin.com/in/andrea-antoniali/',
    },
  ];
}
