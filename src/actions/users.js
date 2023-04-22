export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_ANSWER = "ADD_ANSWER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

function addUserAnswer(questionAnswer) {
  return {
    type: ADD_ANSWER,
    questionAnswer
  }
}

export const handleAddUserAnswer = (questionAnswer) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(addUserAnswer({...questionAnswer, authedUser}))
  }
}