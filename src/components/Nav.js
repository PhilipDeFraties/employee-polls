import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const Nav = (props) => {
  if (props.user === null) {
    return (
      <div class="topnav">
        <h3 className="center">Please Log In</h3>
      </div>
    )
  }

  const { user } = props;

  const handleClick = () => {
    props.dispatch(setAuthedUser(null));
  }

  return (
    <div class="topnav">
      <a>
        <Link to="/">Home</Link>
      </a>
      <a>
        <Link to="/new">New Question</Link>
      </a>
      <a>
        <Link to="/leaderboard">Leaderboard</Link>
      </a>
      <div class="topnav-right">
        <b>
          <img src={user.avatarURL} alt={`Avatar of ${user.id}`} className="avatar" />
        </b>
        <b>{user.id}</b>
        <b>
          <span onClick={handleClick}>Logout</span>
        </b>
      </div>
    </div>
  )
}

const mapStateToProps = ({ authedUser, users }) => {
  const user = users[authedUser]

  return {
    user: user ? user : null
  }
}
export default connect(mapStateToProps)(Nav);