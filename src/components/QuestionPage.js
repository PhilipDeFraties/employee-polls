import { connect } from "react-redux";
import { useEffect } from "react";
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
  const navigate = useNavigate();

  useEffect(() => {
    if (props.question && props.userAnswered) {
      navigate(`/answered/${props.question.id}`)
    }
  }, [])
  
  const handleClick = (option) => {
    const { dispatch } = props
    const questionAnswer = {
      qid: id,
      answer: option,
    }
    
    dispatch(handleAddUserAnswer(questionAnswer))
    dispatch(handleSaveQuestionAnswer(questionAnswer))
    navigate(`/answered/${id}`);
  }
  
  if (props.question === null) {
    return <h1>This Question doesn't exist</h1>;
  }

  
  const { question, users, authedUser } = props;
  const { author, optionOne, optionTwo, id } = question;

  return (
    <div>
      <h1>Poll by {author}</h1>
      <img src={users[author].avatarURL} alt={`Avatar of ${author}`} className="avatar" />
      <h3 className="center">Would You Rather:</h3>
      <div className="center">
        <div className="row">
          <div className="column">
            <div className="option-text">
              {optionOne.text}
            </div>
            <button className="btn" onClick={() => handleClick("optionOne")} disabled={false}>
              Click
            </button>
          </div>
          <div className="column">
            <div className="option-text">
              {optionTwo.text}
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

const mapStateToProps = ({questions, users, authedUser}, props) => {
  const {id} = props.router.params;
  const question = questions[id]
  const userAnswered = Object.keys(users[authedUser].answers).includes(id)
  return {
    users,
    userAnswered,
    question: question ? question : null,
  }
}
export default withRouter(connect(mapStateToProps)(QuestionPage));