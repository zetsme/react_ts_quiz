import { useState } from 'react';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import StartScreen from './components/StartScreen';
import { QuizQuestion, UserAnswer } from './types';

const App: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [userResults, setUserResults] = useState<UserAnswer[]>([]);
  const startGame = (data: QuizQuestion[]): void => {
    setIsGameOver(false);
    setQuizData(data);
    setIsGameStarted(true);
  };
  const showUserResults = (data: UserAnswer[]): void => {
    setIsGameStarted(false);
    setUserResults(data);
    setIsGameOver(true);
  };
  const refresh = () => {
    setIsGameOver(false);
    setQuizData([]);
    setUserResults([]);
  };
  return (
    <div>
      {!isGameStarted && !isGameOver && <StartScreen startGame={startGame} />}
      {isGameStarted && !isGameOver && (
        <QuizScreen quizData={quizData} showUserResults={showUserResults} />
      )}
      {!isGameStarted && isGameOver && <ResultScreen userResults={userResults} refresh={refresh} />}
    </div>
  );
};

export default App;
