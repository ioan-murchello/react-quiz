import { useReducer } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import NextButton from './components/NextButton';
import Footer from './components/Footer';
import Timer from './components/Timer';

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [
    {
      question: 'What is React?',
      variants: ['Library', 'Framework', 'Language', 'Book'],
      answer: 0,
      points: 10,
    },
    {
      question: 'Who developed React?',
      variants: ['Google', 'Facebook', 'Microsoft', 'Twitter'],
      answer: 1,
      points: 10,
    },
    {
      question: 'Which of the following is used to create components in React?',
      variants: ['HTML', 'CSS', 'JavaScript', 'Python'],
      answer: 2,
      points: 20,
    },
    {
      question: 'What is a common way to manage component state in React?',
      variants: ['Redux', 'useState', 'Vuex', 'GraphQL'],
      answer: 1,
      points: 10,
    },
    {
      question: 'What does JSX stand for?',
      variants: [
        'JavaScript XML',
        'JavaScript Express',
        'Java Syntax Extension',
        'JavaScript Extension',
      ],
      answer: 0,
      points: 20,
    },
    {
      question: 'What is the purpose of React hooks?',
      variants: [
        'To fetch data',
        'To add styles',
        'To use state and lifecycle features in function components',
        'To manage routes',
      ],
      answer: 2,
      points: 30,
    },
    {
      question:
        'What is the correct way to pass data to a child component in React?',
      variants: ['State', 'Props', 'Context', 'Redux'],
      answer: 1,
      points: 10,
    },
    {
      question:
        'Which hook is used to handle side effects in a React component?',
      variants: ['useEffect', 'useState', 'useContext', 'useRef'],
      answer: 0,
      points: 10,
    },
    {
      question: 'How do you update the state in a React component?',
      variants: [
        'setState()',
        'updateState()',
        'modifyState()',
        'changeState()',
      ],
      answer: 0,
      points: 10,
    },
    {
      question: 'What is the purpose of the `key` prop in React?',
      variants: [
        'To identify elements in a list',
        'To pass values to children',
        'To style components',
        'To update state',
      ],
      answer: 0,
      points: 10,
    },
    {
      question:
        'Which hook would you use to create a reference to a DOM element?',
      variants: ['useRef', 'useEffect', 'useState', 'useMemo'],
      answer: 0,
      points: 10,
    },
    {
      question: 'What does the useContext hook do?',
      variants: [
        'Manages state',
        'Handles side effects',
        'Allows access to context',
        'Connects to Redux store',
      ],
      answer: 2,
      points: 20,
    },
    {
      question:
        'Which of the following is NOT a lifecycle method in React class components?',
      variants: [
        'componentDidMount',
        'componentWillUnmount',
        'componentWillUpdate',
        'componentWillReceiveProps',
      ],
      answer: 3,
      points: 10,
    },
    {
      question: 'Which method is used to render React components to the DOM?',
      variants: [
        'render()',
        'ReactDOM.render()',
        'React.createElement()',
        'document.createElement()',
      ],
      answer: 1,
      points: 10,
    },
    {
      question: 'How can you optimize performance by memoizing components?',
      variants: [
        'React.memo',
        'React.useEffect',
        'React.useMemo',
        'React.lazy',
      ],
      answer: 0,
      points: 10,
    },
  ],
  status: 'ready',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  remainingTime: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'start':
      return {
        ...state,
        status: 'active',
        remainingTime: state.questions.length * SECONDS_PER_QUESTION,
      };
    case 'newAnswer':
      let question = state.questions[state.index];

      const isCorrect = action.payload === question.answer;

      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + question.points : state.points,
      };
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case 'finished':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'active',
        remainingTime: state.questions.length * SECONDS_PER_QUESTION,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case 'tick':
      return {
        ...state,
      remainingTime: state.remainingTime - 1,
      status: state.remainingTime === 0 ? 'finished' : state.status,
      };
    default:
      throw new Error('Action unknown');
  }
};

function App() {
  const [
    { questions, status, index, answer, points, highscore, remainingTime },
    dispatch,
  ] = useReducer(reducer, initialState);
 
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => {
    return acc + cur.points;
  }, 0);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'ready' && (
          <StartScreen num={numQuestions} dispatch={dispatch} />
        )}
        {status === 'error' && <p>Some error with fetch...</p>}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer dispatch={dispatch} seconds={remainingTime}/>
              <NextButton
                index={index}
                numQuestions={numQuestions}
                answer={answer}
                dispatch={dispatch}
              />
            </Footer>
          </>
        )}

        {status === 'finished' && (
          <FinishScreen
            highscore={highscore}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
