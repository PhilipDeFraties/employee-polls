import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_QUESTION_ANSWER } from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.id]: action.question,
      }
    case ADD_QUESTION_ANSWER:
      const { questionAnswer } = action;
      return {
        ...state,
        [questionAnswer.id]: {
          ...state[questionAnswer.id],
          [questionAnswer.answer]: {
            votes: state[questionAnswer.id][questionAnswer.answer].votes.concat([questionAnswer.authedUser]),
            text: state[questionAnswer.id][questionAnswer.answer].text,
          }
        }
      }
    default:
      return state;
  }
}