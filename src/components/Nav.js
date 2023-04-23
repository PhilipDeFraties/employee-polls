import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Nav = (props) => {
  const { avatarURL, id } = props;
  return (
    <div class="topnav">
      <a>
        <Link to="/">Home</Link>
      </a>
      <a>
        <Link to="/new">New Question</Link>
      </a>
      <div class="topnav-right">
        <b>
          <img src={avatarURL} alt={`Avatar of ${id}`} className="avatar" />
        </b>
        <a>
          <Link to="/logout">Logout</Link>
        </a>
      </div>
    </div>
  )
}

const mapStateToProps = ({ authedUser, users }) => {
  const { avatarURL, id } = users[authedUser]

  return {
    avatarURL,
    id,
  }
}
export default connect(mapStateToProps)(Nav);