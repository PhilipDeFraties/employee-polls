import { useEffect } from "react"
import { connect } from "react-redux"; 
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

const Login = ({ userIds, dispatch, authedUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // intended to redirect user if already logged in
    // will not work when manually entering /login uri
    // because it resets the redux store
    if (authedUser !== null) {
      navigate(`/`)
    }
  }, [])

  const handleSelect = (e) => {
    const userId = e.target.value
    dispatch(setAuthedUser(userId))
    navigate(`/`)
  }

  return (
    <div className="login">
      <label htmlFor="userSelect">Select User ID:</label>
      <select id="userSelect" name="userSelect" onChange={(e) => handleSelect(e)} value={"empty"}>
        <option value="">
          --Choose an option--
        </option>
        {userIds.map((id, index) => (
          <option key={index} value={id}>
            {id}
          </option>
        ))}
      </select>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }) => {
  const userIds = Object.values(users).map((user) => user.id)
  return {
    userIds,
    authedUser: authedUser ? authedUser : null
  }
}

export default connect(mapStateToProps)(Login);