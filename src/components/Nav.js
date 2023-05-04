import { Link } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import { connect } from "react-redux";

const Nav = (props) => {
  const { user, dispatch } = props;

  const handleClick = () => {
    dispatch(setAuthedUser(null));
  }

  return (
    <div className="topnav" role="navigation">
      <a>
        <Link to="/">Home</Link>
      </a>
      <a>
        <Link to="/add">New Question</Link>
      </a>
      <a>
        <Link to="/leaderboard">Leaderboard</Link>
      </a>
      <div className="topnav-right">
        {user ? (
          <>
            <b>
              <img src={user.avatarURL} alt={`Avatar of ${user.id}`} className="avatar" />
            </b>
            <b>{user.id}</b>
            <b>
              <span onClick={handleClick}>Logout</span>
            </b>
          </>
        ) : (
          <b>
            <Link to="/login">Login</Link>
          </b>
        )}
      </div>
    </div>
  );
};

export default connect()(Nav);