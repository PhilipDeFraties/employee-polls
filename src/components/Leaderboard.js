import React from 'react';
const Leaderboard = ({ users }) => {
  return (
    <div className="leaderboard">
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(users).map((user, index) => (
            <tr key={index}>
              <td>
                <img src={user.avatarURL} alt={`Avatar of ${user.id}`} className="avatar" />
                {user.name}
              </td>
              <td>{Object.keys(user.answers).length}</td>
              <td>{user.questions.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;