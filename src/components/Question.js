import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const Question = (props) => {
  const { author, timestamp, id } = props.question 
  const navigate = useNavigate();
  if (props.question === null) {
    return <p>this Question doesn't exist </p>
  }

  const handleClick = () => {
    navigate(`/question/${id}`)
  }

  return (
    <div className="question">
      <div className="question-info">
        <span>{author}</span>
        <div>{formatDate(timestamp)}</div>
        <button className="btn" onClick={handleClick}>Show</button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ authedUser, questions}, {id}) => {
  const question = questions[id]
  return { 
    authedUser,
    question: question,
  }
}

export default connect(mapStateToProps)(Question);