import { Component, inject, signal} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ComponentKey } from '../../shared/types/nird-composant.enum';

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
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './quizz.html',
  styleUrl: './quizz.scss'
})
export class Quizz {
    readonly router = inject(Router);
    selectedComponent = signal<ComponentKey>(ComponentKey.NONE);
    readonly ComponentKey = ComponentKey;
    
    selectComponent(key: ComponentKey) {
    // Si la clé cliquée est déjà la clé sélectionnée, on désélectionne (NONE)
    // Sinon, on met à jour le signal avec la nouvelle clé
    this.selectedComponent.update(currentKey => 
      currentKey === key ? ComponentKey.NONE : key
    );
  }

    box: ComposantNIRD = 
  {
    nom: 'Le Boîtier (La Tour)',
    enjeuNird: 'Durabilité et Reconditionnement',
    explication:
      "C'est l'enveloppe du PC. Il symbolise la durabilité physique. La démarche NIRD encourage le reconditionnement et la réutilisation des équipements pour lutter contre l'obsolescence programmée. Un boîtier réutilisable permet de mettre à jour uniquement les pièces internes.",
    // Nouvelle Q/R pour le Boîtier
    questionQuizz: 'Pourquoi réutiliser un boîtier plutôt que d’en acheter un neuf contribue au numérique responsable ?',
    reponseQuizz: 'Parce que réutiliser évite de fabriquer du matériel inutilement et allonge la durée de vie du PC.',
  }
  
  alim: ComposantNIRD =
  {
    nom: 'L\'Alimentation (PSU)',
    enjeuNird: 'Sobriété et Responsabilité Énergétique',
    explication:
      "Ce bloc gère la consommation énergétique de tout le PC. Choisir un bloc de bonne qualité et correctement dimensionné contribue à la sobriété en limitant les pertes. Le numérique responsable commence par la maîtrise de l'énergie.",
    // Nouvelle Q/R pour l'Alimentation
    questionQuizz: 'Pourquoi est-il important de choisir une alimentation adaptée à la puissance du PC ?',
    reponseQuizz: 'Pour éviter de gaspiller de l’énergie et limiter les pertes électriques.',
  }


  CPU: ComposantNIRD =
  {
    nom: 'Le Processeur (CPU)',
    enjeuNird: 'Sobriété et Impact Carbone de la Production',
    explication:
      "C'est le cerveau du PC. Il est très complexe à fabriquer et sa production a un impact carbone important. La sobriété implique de choisir un processeur adapté aux besoins réels (ne pas surdimensionner) et de le conserver le plus longtemps possible.",
    // Nouvelle Q/R pour le CPU
    questionQuizz: 'Pourquoi vaut-il mieux choisir un processeur suffisant plutôt que très puissant si l’on n’en a pas besoin ?',
    reponseQuizz: 'Parce que fabriquer un processeur puissant pollue davantage, et un modèle trop puissant consomme plus pour rien.',
  }

  GPU: ComposantNIRD = 
  {
    nom: 'La Carte Graphique (GPU)',
    enjeuNird: 'Frugalité et Choix Technologique',
    explication:
      "Souvent très puissante et coûteuse en énergie à l'usage, la carte graphique doit être utilisée avec frugalité. Pour les usages éducatifs ou bureautiques, on peut privilégier une solution graphique intégrée au processeur (IGP) pour économiser des ressources et de l'énergie.",
    // Nouvelle Q/R pour le GPU
    questionQuizz: 'Dans quels cas une carte graphique intégrée est un bon choix ?',
    reponseQuizz: 'Pour la bureautique ou les usages simples, car elle consomme moins d’énergie et suffit largement.',
  }

  RAM: ComposantNIRD = 
  {
    nom: 'La Mémoire Vive (RAM)',
    enjeuNird: 'Inclusivité et Accès Équitable',
    explication:
      "La RAM affecte la vitesse du PC. Des logiciels et OS frugaux (peu gourmands) permettent de réduire les besoins en RAM. Cela rend les machines plus anciennes utilisables, favorisant l'inclusivité et l'accès équitable à des outils performants pour tous.",
    // Nouvelle Q/R pour la RAM
    questionQuizz: 'Comment des logiciels “légers” peuvent-ils aider les vieux ordinateurs à rester utiles ?',
    reponseQuizz: 'Ils demandent moins de RAM, ce qui permet aux anciens PC de fonctionner correctement.',
  }

  MotherBoard: ComposantNIRD =
  {
    nom: 'La Carte Mère',
    enjeuNird: 'Souveraineté Logicielle (OS)',
    explication:
      "C'est le socle du système. Elle détermine la compatibilité avec les systèmes d'exploitation (OS). NIRD promeut l'usage des logiciels libres (comme Linux) pour s'affranchir de la dépendance aux éditeurs propriétaires et garantir une meilleure souveraineté numérique sur les outils éducatifs.",
    // Nouvelle Q/R pour la Carte Mère
    questionQuizz: 'Pourquoi utiliser un système d’exploitation libre renforce-t-il la souveraineté numérique ?',
    reponseQuizz: 'Parce qu’on dépend moins d’entreprises privées et qu’on peut contrôler ce que fait le logiciel.',
  }

  Disk: ComposantNIRD = 
  {
    nom: 'Le Disque Dur / SSD',
    enjeuNird: 'Responsabilité et Sécurité des Données',
    explication:
      "Ce composant stocke les données localement. L'enjeu est de choisir où stocker ses données (localement, nationalement, ou sur des plateformes externes). NIRD recommande la maîtrise de l'hébergement pour garantir la sécurité et la souveraineté des données éducatives.",
    // Nouvelle Q/R pour le Disque
    questionQuizz: 'Pourquoi savoir où sont stockées nos données est-il important ?',
    reponseQuizz: 'Pour protéger les informations, éviter qu’elles partent à l’étranger et garantir leur sécurité.',
  }
  goToQuiz() {
    this.router.navigate(['quizComponent']);
  }
}
