const StartScreen = ({num, dispatch}) => {
  return (
    <div className='start'>
      <h2>Welcome to The React Quiz</h2>
      <h3>{num} questions to test your Reat mastery</h3>
      <button className="btn btn-ui" onClick={() => dispatch({type:'start'})}>Lets start</button>
    </div>
  );
};
export default StartScreen;
