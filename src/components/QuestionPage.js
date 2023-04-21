import { connect } from "react-redux";

const QuestionPage = (props) => {
  const { author, users, optionOne, optionTwo } = props;

  return (
    <div>
      <h1>Poll by {author}</h1>
      <img src={users[author].avatarURL} alt={`Avatar of ${author}`} className="avatar" />
      <div class="row">
        <div class="column">
          <div className="option-text">
            {optionOne}
          </div>
          <button className="answer-button">Click</button>
        </div>
        <div class="column">
          <div className="option-text">
            {optionTwo}
          </div>
          <button className="answer-button">Click</button>
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
    users,
    id,
    author: question.author,
    optionOne: question.optionOne.text,
    optionTwo: question.optionTwo.text,
  }
}
export default connect(mapStateToProps)(QuestionPage);