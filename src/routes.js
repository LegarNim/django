import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import CreateLesson from "./containers/CreateLesson";
import Home from "./containers/Home";
import CreateTest from "./containers/CreateTest";
import Tests from "./containers/Tests";
import Profile from "./containers/Profile";
import TestDetail from "./containers/TestDetail";
import Lesson from "./containers/Lesson";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Home} />
    <Route exact path="/profile/:id" component={Profile} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
    <Route exact path="/tests/:id" component={TestDetail} />
    <Route exact path="/tests/" component={Tests} />
    <Route exact path="/lesson/:id" component={Lesson} />
    <Route exact path="/create_lesson/" component={CreateLesson} />
    <Route exact path="/create_test/" component={CreateTest} />
  </Hoc>
);

export default BaseRouter;
