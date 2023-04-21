import { connect } from "react-redux";
import Question from "./Question"; 

const Dashboard = (props) => {
  const { questionIds, authedUser, users } = props;
  const answeredQuestionIds = users[authedUser].questions;
  const unansweredQuestionIds = questionIds.filter((id) => !answeredQuestionIds.includes(id));

  return <div>
    <h3 className="center">New Questions</h3>
    <ul className="dashboard-list">
      {
        unansweredQuestionIds.map((id) => (
          <li key={id}>
            <Question id={id} />
          </li>
        ))
      }
    </ul>

    <h3 className="center">Done</h3>
    <ul className="dashboard-list">
      {
        answeredQuestionIds.map((id) => (
          <li key={id}>
            <Question id={id} />
          </li>
        ))
      }
    </ul>
  </div>
};

const mapStateToProps = ({ questions, authedUser, users }) => {
  const questionIds = Object.keys(questions).sort((a, b) =>
    questions[b].timestamp - questions[a].timestamp
  )
  return {
    questionIds,
    authedUser,
    users
  }
}
export default connect(mapStateToProps)(Dashboard);