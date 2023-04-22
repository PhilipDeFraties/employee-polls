import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/questions";

const QuestionPage = (props) => {
  const { authedUser, id, author, users, optionOne, optionTwo, dispatch } = props;

  const handleClick = (option) => {
    const questionAnswer = {
      id: id,
      answer: option,
      authedUser,
    }
    dispatch(handleSaveQuestionAnswer(questionAnswer))
    // todo: add dispatch to add question to authedUser's questions
  }

  return (
    <div>
      <h1>Poll by {author}</h1>
      <img src={users[author].avatarURL} alt={`Avatar of ${author}`} className="avatar" />
      <h3 className="center">Would You Rather:</h3>
      <div className="center">
        <div className="row">
          <div className="column">
            <div className="option-text">
              {optionOne}
            </div>
            <button className="btn" onClick={() => handleClick("optionOne")} disabled={false}>
              Click
            </button>
          </div>
          <div className="column">
            <div className="option-text">
              {optionTwo}
            </div>
            <button className="btn" onClick={() => handleClick("optionTwo")} disabled={false}>
              Click
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({authedUser, questions, users}, props) => {
  const {id} = props.match.params;
  const question = questions[id]
  return {
    authedUser,
    id,
    users,
    author: question.author,
    optionOne: question.optionOne.text,
    optionTwo: question.optionTwo.text,
  }
}
export default connect(mapStateToProps)(QuestionPage);