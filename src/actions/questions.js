import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion(question) {
  return (dispatch, getState) => {
    const {authedUser} = getState();

    dispatch(showLoading());

    return saveQuestion({
      optionOneText: question.optionOne,
      optionTwoText: question.optionTwo,
      author: authedUser,
    }).then((question) => dispatch(addQuestion(question))).then(() => dispatch(hideLoading()))
  }
}

function addQuestionAnswer(questionAnswer) {
  return {
    type: ADD_QUESTION_ANSWER,
    questionAnswer,
  }
}

export function handleSaveQuestionAnswer(questionAnswer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const questionData = {
      ...questionAnswer,
      authedUser,
    }
    dispatch(showLoading());
    
    return saveQuestionAnswer(
      questionData
    ).then(() => dispatch(addQuestionAnswer(questionData))).then(() => dispatch(hideLoading()))
  }
}


export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}