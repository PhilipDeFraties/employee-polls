import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "../components/Dashboard";
import LoadingBar from "react-redux-loading-bar";
import QuestionPage from "../components/QuestionPage"
import NewQuestion from "../components/NewQuestion";
import Nav from "../components/Nav";
import { Routes, Route } from "react-router-dom";
import AnsweredQuestion from "./AnsweredQuestion";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [])

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        <Nav />
        {
          props.loading === true ? null : (
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/question/:id" element={<QuestionPage />} />
              <Route path="/new" element={<NewQuestion />} />
              <Route path="/answered/:id" element={<AnsweredQuestion />} /> 
            </Routes>
          )
        }
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({authedUser}) => ({
  loading: authedUser === null,
})

export default connect(mapStateToProps)(App);
