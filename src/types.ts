export interface UserAnswer {
  userAnswer: string;
  question: string;
  correct_answer: string;
  questionNumber: number;
}
export interface QuizCategory {
  id: number;
  name: string;
}

export interface QuizQuestion {
  category: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers?: string[];
}

export enum Difficulty {
  ANY = 'Any Difficulty',
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}
