import DOMPurify from 'dompurify';
import { useState } from 'react';
import { QuizQuestion, UserAnswer } from '../types';

interface QuizScreenProps {
  quizData: QuizQuestion[];
  showUserResults: (data: UserAnswer[]) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ quizData, showUserResults }) => {
  const [quizQuestionNumber, setQuizQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const nextQuestion = quizQuestionNumber + 1;
    const userAnswerObj = {
      correct_answer: quizData[quizQuestionNumber].correct_answer,
      question: quizData[quizQuestionNumber].question,
      questionNumber: nextQuestion,
      userAnswer: e.currentTarget.value,
    };
    const temp = [...userAnswers, userAnswerObj];
    setUserAnswers(temp);
    if (nextQuestion === quizData.length) {
      showUserResults(temp);
    } else {
      setQuizQuestionNumber(nextQuestion);
    }
  };

  return (
    <div>
      <h3>
        Question Number: {quizQuestionNumber + 1} / {quizData.length}
      </h3>
      <h4>Category: {quizData[quizQuestionNumber].category}</h4>
      <p>
        Question:{' '}
        <span
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(quizData[quizQuestionNumber].question),
          }}
        />
      </p>
      <div>
        {quizData[quizQuestionNumber].answers?.map((item) => (
          <label key={item}>
            {item}
            <input type='radio' value={item} onChange={onChange} />
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuizScreen;
