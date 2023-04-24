import { useNavigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";

const RequireAuth = ({authedUser}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authedUser) {
      navigate("/login");
    }
  }, [authedUser, navigate]);

  return authedUser !== null ? <Outlet /> : null;
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser: authedUser ? authedUser : null
  }
}

export default connect(mapStateToProps)(RequireAuth);