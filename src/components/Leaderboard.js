import { connect } from 'react-redux';

const Leaderboard = ({ users }) => {
  return (
    <div className="leaderboard">
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Questions Count</th>
            <th>Answers Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(users).map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.questions.length}</td>
              <td>{Object.keys(user.answers).length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users
  }
}
export default connect(mapStateToProps)(Leaderboard);