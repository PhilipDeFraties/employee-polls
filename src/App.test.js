/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { _saveQuestion, _saveQuestionAnswer } from './utils/_DATA';
import App from './components/App';
import Dashboard from './components/Dashboard';
import NewQuestion from './components/NewQuestion';
import Leaderboard from './components/Leaderboard';
import Nav from './components/Nav';
import NotFound from './components/NotFound';

describe('_saveQuestion', () => {
  it('will return an object containing formatted question', async () => {
    const question = {
      optionOneText: "work remotely?",
      optionTwoText: "work in-office?",
      author: "Bob Belcher",
    }

    const result = await _saveQuestion(question)
    expect(result.id).toBeString()
    expect(new Date(result.timestamp)).toBeDate()
    expect(result.author).toEqual(question.author)
    expect(result.optionOne.votes).toBeArray()
    expect(result.optionOne.text).toEqual(question.optionOneText)
    expect(result.optionTwo.votes).toBeArray()
    expect(result.optionTwo.text).toEqual(question.optionTwoText)
  })

  it('will return an error if incorrect data is passed', async () => {
    const question = {
      optionOneText: "work remotely?",
      optionTwoText: "work in-office?",
    }

    await expect(_saveQuestion(question)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author")
  })
})

describe('_saveQuestionAnswer', () => {
  it('will return true', async () => {
    const answer = {
      authedUser: 'sarahedo',
      qid: 'xj352vofupe1dqz9emx13r',
      answer: 'optionOne',
    }

    const result = await _saveQuestionAnswer(answer)
    expect(result).toEqual(true)
  })

  it('will return an error if incorrect data is passed', async () => {
    const answer = {
      authedUser: 'sarahedo',
      qid: 'xj352vofupe1dqz9emx13r',
    }

    await expect(_saveQuestionAnswer(answer)).rejects.toEqual("Please provide authedUser, qid, and answer")
  })
})

describe('App component', () => {
  const store = createStore(reducer, applyMiddleware(thunk));

  it('renders without errors', () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
  });
});

describe('Dashboard component', () => {
  test('renders dashboard component and toggles between answered and unanswered questions', () => {
    const mockState = {
      questions: {
        '1': { id: '1', timestamp: 1 },
        '2': { id: '2', timestamp: 2 },
      },
      authedUser: 'testuser',
      users: {
        testuser: {
          answers: {
            '1': 'optionOne',
          },
        },
      },
    };

    const store = createStore(reducer, mockState);

    render(
      <Provider store={store}>
        <Router>
          <Dashboard {...mockState} />
        </Router>
      </Provider>
    );

    const headerElement = screen.getByText('New Questions');
    expect(headerElement).toBeInTheDocument();

    const toggleButton = screen.getByText('View Completed Questions');
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);

    const updatedHeaderElement = screen.getByText('Done');
    expect(updatedHeaderElement).toBeInTheDocument();

    const updatedToggleButton = screen.getByText('View New Questions');
    expect(updatedToggleButton).toBeInTheDocument();
  });
});

describe('Leaderboard component', () => {
  afterEach(cleanup);

  it('should render correctly and match snapshot', () => {
    const mockUsers = {
      user1: {
        id: 'user1',
        name: 'User One',
        avatarURL: 'https://example.com/avatar1.png',
        questions: ['q1', 'q2'],
        answers: {
          q3: 'optionOne',
          q4: 'optionTwo',
        },
      },
      user2: {
        id: 'user2',
        name: 'User Two',
        avatarURL: 'https://example.com/avatar2.png',
        questions: ['q3'],
        answers: {
          q1: 'optionOne',
          q2: 'optionTwo',
        },
      },
    };

    const component = render(<Leaderboard users={mockUsers} />);
    expect(component).toMatchSnapshot();
  });
});

describe('NewQuestion component', () => {
  const store = createStore(reducer, {
    authedUser: 'sarahedo',
  }, applyMiddleware(thunk));

  it('should handle input changes and form submission', () => {
    render(
      <Provider store={store}>
        <Router>
          <NewQuestion />
        </Router>
      </Provider>
    );

    const optionOneInput = screen.getByPlaceholderText('Option One');
    const optionTwoInput = screen.getByPlaceholderText('Option Two');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(optionOneInput).toBeInTheDocument();
    expect(optionTwoInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    expect(submitButton).toBeDisabled();

    fireEvent.change(optionOneInput, { target: { value: 'Option 1' } });
    fireEvent.change(optionTwoInput, { target: { value: 'Option 2' } });

    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);

    expect(optionOneInput).toHaveValue('');
    expect(optionTwoInput).toHaveValue('');
  });
});

describe('Nav component', () => {
  const store = createStore(reducer);
  test('renders nav component without a user', () => {
    render(
      <Provider store={store}>
        <Router>
          <Nav user={null} />
        </Router>
      </Provider>
    );

    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();

    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();

    const newQuestionLink = screen.getByText('New Question');
    expect(newQuestionLink).toBeInTheDocument();

    const leaderboardLink = screen.getByText('Leaderboard');
    expect(leaderboardLink).toBeInTheDocument();

    const loginLink = screen.getByText('Login');
    expect(loginLink).toBeInTheDocument();
  });

  test('renders nav component with a user', () => {
    const user = {
      id: 'testuser',
      avatarURL: 'https://example.com/avatar.jpg',
    };

    render(
      <Provider store={store}>
        <Router>
          <Nav user={user} />
        </Router>
      </Provider>
    );

    const userNameElement = screen.getByText(user.id);
    expect(userNameElement).toBeInTheDocument();

    const logoutElement = screen.getByText('Logout');
    expect(logoutElement).toBeInTheDocument();
  });
});

describe('NotFound component', () => {
  test('renders 404 error message', () => {
    render(<NotFound />);

    expect(screen.getByText('404 - Not Found')).toBeInTheDocument();
    expect(screen.getByText('The resource you are looking for does not exist.')).toBeInTheDocument();
  });
});