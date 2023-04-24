import { Outlet } from "react-router-dom"
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Layout = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.question && !props.userAnswered) {
      navigate(`/question/${props.question.id}`)
    }
  }, [])

  return (
    <main className="App">
      <Outlet />
    </main>
  );
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser: authedUser ? authedUser : null
  }
}

export default connect(mapStateToProps)(Layout);