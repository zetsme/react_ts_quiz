import { UserAnswer } from '../types';
import DOMPurify from 'dompurify';

interface ResultScreenProps {
  userResults: UserAnswer[];
  refresh: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ userResults, refresh }) => {
  const scoreResult = userResults.reduce(
    (acc, cur) => (cur.correct_answer === cur.userAnswer ? (acc += 1) : acc),
    0
  );
  return (
    <div>
      <h1>Results</h1>
      <h2>Score : {scoreResult}</h2>
      {userResults.map((item) => (
        <div key={item.correct_answer}>
          <h4>
            Question:
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item.question),
              }}
            />
          </h4>
          <p>Your answer - {item.userAnswer}</p>
          <p>Correct Answer - {item.correct_answer}</p>
        </div>
      ))}
      <button onClick={refresh}>Play again</button>
    </div>
  );
};

export default ResultScreen;
