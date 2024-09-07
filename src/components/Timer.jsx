import { useEffect } from 'react';

const Timer = ({ dispatch, seconds }) => {
  let mins = Math.floor(seconds / 60);
  let sec = seconds % 60;
  if (mins < 10) {
    mins = `0${mins}`;
  }
  if (sec < 10) {
    sec = `0${sec}`;
  }

  useEffect(() => {
    let timer = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);
  return (
    <div className='timer'>
      {mins}:{sec}
    </div>
  );
};
export default Timer;
