import { useEffect, useState } from 'react';
import { fetchQuizCategories, fetchQuizQuestions } from '../API';
import { Difficulty, QuizCategory, QuizQuestion } from '../types';

const difficultiesArr = Object.values(Difficulty);

const StartScreen: React.FC<{ startGame: (data: QuizQuestion[]) => void }> = ({ startGame }) => {
  const [loading, setLoading] = useState(false);
  const [questionsAmount, setQuestionsAmount] = useState('3');
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.ANY);
  const [quizCategories, setQuizCategories] = useState<QuizCategory[]>([]);
  const [category, setCategory] = useState('0');
  useEffect(() => {
    setLoading(true);
    fetchQuizCategories().then((data) => {
      setQuizCategories(data);
      setLoading(false);
    });
  }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data = await fetchQuizQuestions(questionsAmount, category, difficulty);
    startGame(data);
  };

  if (loading) {
    return <h1>Laoding ....</h1>;
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          Number of Questions
          <input
            type='number'
            min='1'
            max='50'
            value={questionsAmount}
            onChange={(e) => setQuestionsAmount(e.target.value)}
          />
        </label>
        <select onChange={(e) => setDifficulty(e.target.value as Difficulty)} value={difficulty}>
          {difficultiesArr.map((item) => (
            <option key={item} value={item.toLowerCase()}>
              {item}
            </option>
          ))}
        </select>
        <select onChange={(e) => setCategory(e.target.value)}>
          {quizCategories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <button type='submit'>Start</button>
      </form>
    </div>
  );
};

export default StartScreen;
