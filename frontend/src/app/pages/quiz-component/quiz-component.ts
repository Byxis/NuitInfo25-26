import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '@users/user.service';

// Mise à jour de l'interface pour inclure les options de réponse
interface QuestionQuizz {
  id: number;
  composant: string;
  enjeu: string;
  question: string;
  reponse: string; // La réponse correcte
  options: string[]; // Le tableau de choix, incluant la bonne réponse
}

@Component({
  selector: 'app-quiz-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-component.html',
  styleUrl: './quiz-component.scss'
})
export class QuizComponent {
  // Mise à jour des données avec les options QCM et les nouvelles questions/réponses
  questions: QuestionQuizz[] = [
    {
      id: 1,
      composant: "Le Boîtier (La Tour)",
      enjeu: "Durabilité et Reconditionnement",
      // Nouvelle question
      question: "Pourquoi réutiliser un boîtier plutôt que d’en acheter un neuf contribue au numérique responsable ?",
      // Nouvelle réponse
      reponse: "Parce que réutiliser évite de fabriquer du matériel inutilement et allonge la durée de vie du PC.",
      options: [
        "Parce que réutiliser évite de fabriquer du matériel inutilement et allonge la durée de vie du PC.", // Bonne réponse
        "Pour des raisons esthétiques et de design",
        "Cela garantit une meilleure compatibilité avec les nouveaux composants",
      ]
    },
    {
      id: 2,
      composant: "L'Alimentation (PSU)",
      enjeu: "Sobriété et Responsabilité Énergétique",
      // Nouvelle question
      question: "Pourquoi est-il important de choisir une alimentation adaptée à la puissance du PC ?",
      // Nouvelle réponse
      reponse: "Pour éviter de gaspiller de l’énergie et limiter les pertes électriques.",
      options: [
        "Pour éviter de gaspiller de l’énergie et limiter les pertes électriques.", // Bonne réponse
        "Pour que le PC s'allume plus rapidement",
        "Cela rend le PC plus silencieux",
      ]
    },
    {
      id: 3,
      composant: "Le Processeur (CPU)",
      enjeu: "Sobriété et Impact Carbone de la Production",
      // Nouvelle question
      question: "Pourquoi vaut-il mieux choisir un processeur suffisant plutôt que très puissant si l’on n’en a pas besoin ?",
      // Nouvelle réponse
      reponse: "Parce que fabriquer un processeur puissant pollue davantage, et un modèle trop puissant consomme plus pour rien.",
      options: [
        "Parce que fabriquer un processeur puissant pollue davantage, et un modèle trop puissant consomme plus pour rien.", // Bonne réponse
        "Un processeur moins puissant est plus rapide pour la bureautique",
        "Un processeur puissant chauffe obligatoirement plus",
      ]
    },
    {
      id: 4,
      composant: "La Carte Graphique (GPU)",
      enjeu: "Frugalité et Choix Technologique",
      // Nouvelle question
      question: "Dans quels cas une carte graphique intégrée est un bon choix ?",
      // Nouvelle réponse
      reponse: "Pour la bureautique ou les usages simples, car elle consomme moins d’énergie et suffit largement.",
      options: [
        "Pour les jeux vidéo haut de gamme",
        "Pour le montage vidéo professionnel",
        "Pour la bureautique ou les usages simples, car elle consomme moins d’énergie et suffit largement.", // Bonne réponse
      ]
    },
    {
      id: 5,
      composant: "La Mémoire Vive (RAM)",
      enjeu: "Inclusivité et Accès Équitable",
      // Nouvelle question
      question: "Comment des logiciels “légers” peuvent-ils aider les vieux ordinateurs à rester utiles ?",
      // Nouvelle réponse
      reponse: "Ils demandent moins de RAM, ce qui permet aux anciens PC de fonctionner correctement.",
      options: [
        "Ils rendent l'interface plus moderne",
        "Ils demandent moins de RAM, ce qui permet aux anciens PC de fonctionner correctement.", // Bonne réponse
        "Ils permettent de se connecter plus rapidement à Internet",
      ]
    },
    {
      id: 6,
      composant: "La Carte Mère",
      enjeu: "Souveraineté Logicielle (OS)",
      // Nouvelle question
      question: "Pourquoi utiliser un système d’exploitation libre renforce-t-il la souveraineté numérique ?",
      // Nouvelle réponse
      reponse: "Parce qu’on dépend moins d’entreprises privées et qu’on peut contrôler ce que fait le logiciel.",
      options: [
        "Cela garantit une meilleure performance du matériel",
        "Parce qu’on dépend moins d’entreprises privées et qu’on peut contrôler ce que fait le logiciel.", // Bonne réponse
        "Parce qu'ils sont toujours gratuits",
      ]
    },
    {
      id: 7,
      composant: "Le Disque Dur / SSD",
      enjeu: "Responsabilité et Sécurité des Données",
      // Nouvelle question
      question: "Pourquoi savoir où sont stockées nos données est-il important ?",
      // Nouvelle réponse
      reponse: "Pour protéger les informations, éviter qu’elles partent à l’étranger et garantir leur sécurité.",
      options: [
        "Pour accélérer l'accès aux données",
        "Pour garantir que le PC ne tombe jamais en panne",
        "Pour protéger les informations, éviter qu’elles partent à l’étranger et garantir leur sécurité.", // Bonne réponse
      ]
    }
  ];

  
  userService = inject(UserService);

  currentQuestion: number = 0;
  userAnswer: string = ''; 
  showResult: boolean = false;
  isCorrect: boolean = false;
  score: number = 0;
  quizFinished: boolean = false;

  get currentQuestionData(): QuestionQuizz {
    return this.questions[this.currentQuestion];
  }

  get progressPercentage(): number {
    return ((this.currentQuestion + 1) / this.questions.length) * 100;
  }

  get resultMessage(): string {
    var hasWon = false
    const percentage = (this.score / this.questions.length);
    if (this.score === this.questions.length) {
      this.win()
      return "Parfait ! Vous maîtrisez le NIRD !";
    }
    if (percentage >= 0.7) {
      this.win()
      return "Excellent travail !";
    }
    if (percentage >= 0.5) {
      this.win()
      return "Bien joué, continuez !";
    }
    return "Révisez les concepts NIRD et réessayez !";
  }
  bolIsFinished: boolean = false;

  win() {
    if (this.bolIsFinished) { return; }
    this.bolIsFinished = true;
    this.userService.markGameAsFinished(3).subscribe({
      error: (err) => {
        console.error('Error marking game as finished:', err);
      }
      
    });
  }

  checkAnswer(): void {
    this.isCorrect = this.userAnswer === this.currentQuestionData.reponse;
    this.showResult = true;
    
    if (this.isCorrect) {
      this.score++;
    }
  }

  nextQuestion(): void {
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
      this.userAnswer = ''; 
      this.showResult = false;
    } else {
      this.quizFinished = true;
    }
  }

  restartQuiz(): void {
    this.currentQuestion = 0;
    this.userAnswer = '';
    this.showResult = false;
    this.score = 0;
    this.quizFinished = false;
  }
}