import { Difficulty, QuizCategory, QuizQuestion } from './types';
import { shuffleArray } from './utils';

export const fetchQuizCategories = async (): Promise<QuizCategory[]> => {
  const response = await fetch('https://opentdb.com/api_category.php');
  const { trivia_categories }: { trivia_categories: QuizCategory[] } = await response.json();
  return [{ id: 0, name: 'Any Category' }, ...trivia_categories];
};

export const fetchQuizQuestions = async (
  amount = '10',
  category = '0',
  difficulty: Difficulty
): Promise<QuizQuestion[]> => {
  let query = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
  if (category !== '0') {
    query += `&category=${category}`;
  }
  if (difficulty !== 'Any Difficulty') {
    query += `&difficulty=${difficulty}`;
  }
  const response = await fetch(query);
  const { results }: { results: QuizQuestion[] } = await response.json();
  const temp = results.map((question) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
  }));
  return temp;
};
