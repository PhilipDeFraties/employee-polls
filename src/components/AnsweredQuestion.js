import { connect } from "react-redux";
import { useEffect } from "react";
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

const AnsweredQuestion = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.question && !props.userAnswered) {
      navigate(`/question/${props.question.id}`)
    }
  }, [])

  if (props.question === null) {
    return <h1>This Question doesn't exist</h1>;
  }

  const { optionOne, optionTwo } = props.question;
  return (
      <>
        <h1>{optionOne.text}</h1>
        <ul>
          {optionOne.votes.map((vote) => (
            <li>{vote}</li>
          ))}
        </ul>
        <h1>{optionTwo.text}</h1>
        <ul>
          {optionTwo.votes.map((vote) => (
            <li>{vote}</li>
          ))}
        </ul>
      </>
  )
}

const mapStateToProps = ({ users, authedUser, questions }, props) => {
  const { id } = props.router.params;
  const question = questions[id]
  const userAnswered = Object.keys(users[authedUser].answers).includes(id)

  return {
    userAnswered,
    question: question ? question : null
  }
}
export default withRouter(connect(mapStateToProps)(AnsweredQuestion));