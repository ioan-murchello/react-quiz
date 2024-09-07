const NextButton = ({ answer, dispatch, numQuestions, index }) => {
  // If no answer is selected, don't render the button
  if (answer === null) return null;

  // Render the "Next" button or finish button based on the current index
  return (
    <button
      className='btn btn-ui'
      onClick={() => {
        // If it's the last question, finish the quiz
        if (index === numQuestions - 1) {
          dispatch({ type: 'finished' });
        } else {
          // Otherwise, move to the next question
          dispatch({ type: 'nextQuestion' });
        }
      }}
    >
      {index === numQuestions - 1 ? 'Finish' : 'Next'}
    </button>
  );
};

export default NextButton;
