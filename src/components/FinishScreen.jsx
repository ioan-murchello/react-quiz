const FinishScreen = ({ points, maxPossiblePoints, highscore, dispatch }) => {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;

  if (percentage === 100) emoji = '🎖️';
  if (percentage >= 80 && percentage < 100) emoji = '🎉';
  if (percentage >= 50 && percentage < 80) emoji = '🙃';
  if (percentage >= 0 && percentage < 50) emoji = '🥺';

  return (
    <div>
      <div className='result'>
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of {maxPossiblePoints} points.
        <p>({Math.ceil(percentage)}%)</p>
      </div>
      <p className='highscore'>current highscore: {points} points</p>
      <div className='highscore'>biggest highscore: {highscore} points</div>
      <button
        onClick={() => dispatch({ type: 'restart' })}
        className='btn btn-ui'
      >
        Restart
      </button>
    </div>
  );
};
export default FinishScreen;
