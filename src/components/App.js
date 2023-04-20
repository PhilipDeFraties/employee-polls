import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [])

  return (
    <div className="App">
      <h1>EMPLOYEE POLLS</h1>
    </div>
  );
}

export default connect()(App);
