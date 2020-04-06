import React from "react";
import { Route } from "react-router-dom";
import Profile from "./profile";
import Login from "./login";
import SignUP from "./signUp";

const Routes = ({ match, ...props }) => {
  return (
    <>
      <Route exact path={match.url + "/profile"} component={Profile} />
      <Route exact path={match.url + "/login"} component={Login} />
      <Route exact path={match.url + "/signup"} component={SignUP} />
    </>
  );
};

export default Routes;
