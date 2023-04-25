import React from 'react';
import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "../components/Dashboard";
import LoadingBar from "react-redux-loading-bar";
import QuestionPage from "../components/QuestionPage";
import NewQuestion from "../components/NewQuestion";
import Leaderboard from "../components/Leaderboard";
import Login from "../components/Login";
import Nav from "../components/Nav";
import NotFound from "../components/NotFound";
import { Routes, Route } from 'react-router-dom';
import RequireAuth from "./RequireAuth";
const App = (props) => {
  const { isAuthenticated, users, user, dispatch } = props;

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <Fragment>
      <Nav user={user}/>
      <LoadingBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth isAuthenticated={isAuthenticated} />} >
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/questions/:qid" element={<QuestionPage />} />
          <Route path="/add" exact element={<NewQuestion />} />
          <Route path="/leaderboard" element={<Leaderboard users={users}/>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  isAuthenticated: authedUser !== null,
  users: users ? users : null,
  user: authedUser && users ? users[authedUser] : null,
});

export default connect(mapStateToProps)(App);
