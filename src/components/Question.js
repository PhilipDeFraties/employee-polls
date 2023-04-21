import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";

const Question = (props) => {
  if (props.question === null) {
    return <p>this Question doesn't exist </p>
  }

  const { author, timestamp } = props.question 
  return (
    <div className="question">
      <div className="question-info">
        <span>{author}</span>
        <div>{formatDate(timestamp)}</div>
        <button>Show</button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ authedUser, users, questions}, {id}) => {
  // todo: create formatQuestion function in utils/helpers.js???
  const question = questions[id]

  // is this passing too much data? dont need question options:
  // const questionData = {
  //   id: question.id,
  //   author: question.author,
  //   timestamp: question.timestamp
  // }
  return { 
    authedUser,
    question: question,
  }
}

export default connect(mapStateToProps)(Question);