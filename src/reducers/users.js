import { RECEIVE_USERS, ADD_ANSWER } from "../actions/users";
import { ADD_QUESTION } from "../actions/questions";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      }
    case ADD_ANSWER:
      const {authedUser, qid, answer} = action.questionAnswer
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          }
        }
      }
    case ADD_QUESTION:
      const { id, author } = action.question;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: [
            ...state[author].questions,
            id,
          ]
        }
      }
    default:
      return state;
  };
}