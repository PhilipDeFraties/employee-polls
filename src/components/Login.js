import React from 'react';
import './Login.css';

const Login = ({ users }) => {
  return (
    <div className="login">
      <label htmlFor="userSelect">Select User ID:</label>
      <select id="userSelect" name="userSelect">
        {Object.values(users).map((user, index) => (
          <option key={index} value={user.id}>
            {user.id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Login;