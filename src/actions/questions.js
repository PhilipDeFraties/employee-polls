import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_ANSWER = "ADD_ANSWER";

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
    
    dispatch(showLoading());
    
    return saveQuestionAnswer({
      authedUser: questionAnswer.authedUser,
      qid: questionAnswer.id,
      answer: questionAnswer.answer,
    }).then(() => dispatch(addQuestionAnswer(questionAnswer))).then(() => dispatch(hideLoading()))
  }
}


export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}