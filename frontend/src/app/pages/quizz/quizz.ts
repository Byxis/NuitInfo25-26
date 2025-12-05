import { Component } from '@angular/core';

// Interface pour définir la structure de chaque explication de composant
interface ComposantNIRD {
  nom: string;
  enjeuNird: string;
  explication: string;
  questionQuizz: string;
  reponseQuizz: string;
}

@Component({
  selector: 'app-quizz',
  imports: [],
  templateUrl: './quizz.html',
  styleUrl: './quizz.scss'
})
export class Quizz {

    boxVisible = false
    GPUVisible = false
    CPUVisible = false
    MBVisible = false
    alimVisible = false
    diskVisible = false
    RAMVisible = false

    box: ComposantNIRD = 
    {
      nom: 'Le Boîtier (La Tour)',
      enjeuNird: 'Durabilité et Reconditionnement',
      explication:
        "C'est l'enveloppe du PC. Il symbolise la durabilité physique. La démarche NIRD encourage le reconditionnement et la réutilisation des équipements pour lutter contre l'obsolescence programmée. Un boîtier réutilisable permet de mettre à jour uniquement les pièces internes.",
      questionQuizz: 'Quel terme désigne l\'action de remettre un équipement en état pour lui donner une seconde vie ?',
      reponseQuizz: 'Reconditionnement',
    }
    alim: ComposantNIRD =
    {
      nom: 'L\'Alimentation (PSU)',
      enjeuNird: 'Sobriété et Responsabilité Énergétique',
      explication:
        "Ce bloc gère la consommation énergétique de tout le PC. Choisir un bloc de bonne qualité et correctement dimensionné contribue à la sobriété en limitant les pertes. Le numérique responsable commence par la maîtrise de l'énergie.",
      questionQuizz: 'Outre la performance, quel critère essentiel permet de réduire l\'impact énergétique d\'un composant ?',
      reponseQuizz: 'La Sobriété / L\'Efficacité énergétique',
    }


    CPU: ComposantNIRD =
    {
      nom: 'Le Processeur (CPU)',
      enjeuNird: 'Sobriété et Impact Carbone de la Production',
      explication:
        "C'est le cerveau du PC. Il est très complexe à fabriquer et sa production a un impact carbone important. La sobriété implique de choisir un processeur adapté aux besoins réels (ne pas surdimensionner) et de le conserver le plus longtemps possible.",
      questionQuizz: 'Quel facteur (souvent oublié) des équipements informatiques est le plus impactant pour l\'environnement : la fabrication ou l\'utilisation ?',
      reponseQuizz: 'La Fabrication (ou l\'extraction des matières premières)',
    }

    GPU: ComposantNIRD = 
    {
      nom: 'La Carte Graphique (GPU)',
      enjeuNird: 'Frugalité et Choix Technologique',
      explication:
        "Souvent très puissante et coûteuse en énergie à l'usage, la carte graphique doit être utilisée avec frugalité. Pour les usages éducatifs ou bureautiques, on peut privilégier une solution graphique intégrée au processeur (IGP) pour économiser des ressources et de l'énergie.",
      questionQuizz: 'Pour un usage bureautique, quel type de solution graphique favorise la frugalité ?',
      reponseQuizz: 'Une solution graphique intégrée (IGP)',
    }

    RAM: ComposantNIRD = 
    {
      nom: 'La Mémoire Vive (RAM)',
      enjeuNird: 'Inclusivité et Accès Équitable',
      explication:
        "La RAM affecte la vitesse du PC. Des logiciels et OS frugaux (peu gourmands) permettent de réduire les besoins en RAM. Cela rend les machines plus anciennes utilisables, favorisant l'inclusivité et l'accès équitable à des outils performants pour tous.",
      questionQuizz: 'Utiliser des logiciels "frugaux" permet de réutiliser de vieilles machines. Quel pilier NIRD est directement lié à l\'accès équitable aux outils ?',
      reponseQuizz: 'L\'Inclusivité',
    }

    MotherBoard: ComposantNIRD =
    {
      nom: 'La Carte Mère',
      enjeuNird: 'Souveraineté Logicielle (OS)',
      explication:
        "C'est le socle du système. Elle détermine la compatibilité avec les systèmes d'exploitation (OS). NIRD promeut l'usage des logiciels libres (comme Linux) pour s'affranchir de la dépendance aux éditeurs propriétaires et garantir une meilleure souveraineté numérique sur les outils éducatifs.",
      questionQuizz: 'Quel type de logiciel est favorisé par NIRD pour garantir une meilleure autonomie et souveraineté numérique ?',
      reponseQuizz: 'Logiciel Libre / Open Source',
    }

    Disk: ComposantNIRD = 
    {
      nom: 'Le Disque Dur / SSD',
      enjeuNird: 'Responsabilité et Sécurité des Données',
      explication:
        "Ce composant stocke les données localement. L'enjeu est de choisir où stocker ses données (localement, nationalement, ou sur des plateformes externes). NIRD recommande la maîtrise de l'hébergement pour garantir la sécurité et la souveraineté des données éducatives.",
      questionQuizz: 'Maîtriser où sont stockées et traitées les données (via un hébergement local ou national) contribue principalement à quel enjeu ?',
      reponseQuizz: 'Souveraineté / Sécurité des Données',
    }

  toggleDisplayAlim() {
    this.alimVisible = !this.alimVisible;
  }
  toggleDisplayBox() {
    this.boxVisible = !this.boxVisible
  }
  toggleDisplayCPU() {
    this.CPUVisible = !this.CPUVisible
  }
  toggleDisplayRAM() {
    this.RAMVisible = !this.RAMVisible
  }
  toggleDisplayDisk() {
    this.diskVisible = !this.diskVisible
  }
  toggleDisplayMB() {
    this.MBVisible = !this.MBVisible
  }
  toggleDisplayGPU() {
    this.GPUVisible = !this.GPUVisible
  }
}