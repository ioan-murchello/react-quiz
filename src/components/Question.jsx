import { useEffect, useState } from 'react';

const Question = ({ question, answer, dispatch }) => {
  const hasAnswered = answer != null;
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setIsClicked(false)
  },[question])
  return (
    <div>
      <h4>{question.question}</h4>
      <div className='options'>
        {question.variants.map((option, i) => {
          return (
            <button
              onClick={() => {
                dispatch({ type: 'newAnswer', payload: i });
                setIsClicked(true);
              }}
              key={option}
              disabled={isClicked}
              className={`btn btn-option ${
                hasAnswered ? (i === question.answer ? 'correct' : 'wrong') : ''
              } ${
                answer === i && i !== question.answer
                  ? 'answer error'
                  : 'correct'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Question;
