import { connect } from "react-redux";
import Question from "./Question";
import { useState } from "react"; 

const Dashboard = ({questions, users, authedUser}) => {
  const answeredQuestionIds = Object.keys(users[authedUser].answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );

  const unansweredQuestionIds = Object.keys(questions)
    .filter((id) => !answeredQuestionIds.includes(id))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

  const [showAnsweredQuestions, setShowAnsweredQuestions] = useState(false);

  const toggleQuestions = () => {
    setShowAnsweredQuestions(!showAnsweredQuestions);
  };

  const questionsToDisplay = showAnsweredQuestions
    ? answeredQuestionIds
    : unansweredQuestionIds;

  const buttonText = showAnsweredQuestions
    ? "View New Questions"
    : "View Completed Questions";

  const header = showAnsweredQuestions
    ? "Done"
    : "New Questions";

  return(
    <div>
      <div>
        <h3 className="center">{header}</h3>
        <button className="toggle-btn" onClick={toggleQuestions}>
          {buttonText}
        </button>
        <ul className="dashboard-list">
          {questionsToDisplay.map((id) => (
            <li key={id} className="dashboard-item">
              <Question id={id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  ); 
};

const mapStateToProps = ({ questions, authedUser, users }) => {
  return {
    questions,
    authedUser,
    users
  }
}
export default connect(mapStateToProps)(Dashboard);