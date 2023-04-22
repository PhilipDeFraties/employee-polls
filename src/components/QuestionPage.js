import { connect, batch } from "react-redux";
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
  const { authedUser, id, author, users, optionOne, optionTwo, dispatch } = props;
  const navigate = useNavigate();

  const handleClick = (option) => {
    const questionAnswer = {
      qid: id,
      answer: option,
    }

    dispatch(handleAddUserAnswer(questionAnswer))
    dispatch(handleSaveQuestionAnswer(questionAnswer))
    navigate("/")
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
  const {id} = props.router.params;
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
export default withRouter(connect(mapStateToProps)(QuestionPage));