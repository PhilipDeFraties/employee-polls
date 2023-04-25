import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { handleSaveQuestionAnswer } from "../actions/questions";
import { handleAddUserAnswer } from '../actions/users';
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionPage = (props) => {
  const [authedUserVote, setauthedUserVote] = useState("");

  useEffect(() => {
    setauthedUserVote(props.authedUserVote);
  }, [props.authedUserVote]);

  const handleClick = (option) => {
    const { dispatch } = props;
    const questionAnswer = {
      qid: props.router.params.qid,
      answer: option,
    };

    dispatch(handleAddUserAnswer(questionAnswer));
    dispatch(handleSaveQuestionAnswer(questionAnswer));
    setauthedUserVote(questionAnswer.answer);
  };

  if (props.question === null) {
    return <h1>This Question doesn't exist</h1>;
  }

  const { question, users } = props;
  const { author, optionOne, optionTwo } = question;

  const totalVotes = optionOne.votes.length + optionTwo.votes.length;
  const optionOnePercentage = ((optionOne.votes.length / totalVotes) * 100).toFixed(0);;
  const optionTwoPercentage = ((optionTwo.votes.length / totalVotes) * 100).toFixed(0);;

  return (
    <div className="question-page">
      <h1>Poll by {author}</h1>
      <img src={users[author].avatarURL} alt={`Avatar of ${author}`} className="avatar" />
      <h3>Would You Rather:</h3>
      <div className="options-container">
        <div className="option">
          <div className="option-text">
            {optionOne.text}
          </div>
          {authedUserVote ? (
            <div className="votes">
              Votes: {optionOne.votes.length} {`\n`} = {optionOnePercentage}%
            </div>
            
          ) : (
            <button className="btn" onClick={() => handleClick("optionOne")}>
              Click
            </button>
          )}
          {authedUserVote === "optionOne" && (<div>You voted for this option</div>)}
        </div>
        <div className="option">
          <div className="option-text">
            {optionTwo.text}
          </div>
          {authedUserVote ? (
            <div className="votes">
              Votes: {optionTwo.votes.length} {`\n`} = {optionTwoPercentage}%
            </div>
          ) : (
            <button className="btn" onClick={() => handleClick("optionTwo")}>
              Click
            </button>
          )}
          {authedUserVote === "optionTwo" && (<div>You voted for this option</div>)}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { qid } = props.router.params;
  const question = questions[qid];
  let authedUserVote = "";

  if (question) {
    if (question.optionOne.votes.includes(authedUser)) {
      authedUserVote = "optionOne";
    } else if (question.optionTwo.votes.includes(authedUser)) {
      authedUserVote = "optionTwo";
    }
  }
  return {
    users,
    authedUserVote,
    question: question ? question : null,
  };
};
export default withRouter(connect(mapStateToProps)(QuestionPage));