import React from "react";
import { Route } from "react-router-dom";
import Profile from "./profile";
import Login from "./login";
import SignUP from "./signUp";
import LoginRequiredRoute from "utils/loginRequiredRoute";

const Routes = ({ match, ...props }) => {
  return (
    <>
      <LoginRequiredRoute
        exact
        path={match.url + "/profile"}
        component={Profile}
      ></LoginRequiredRoute>
      <Route exact path={match.url + "/login"} component={Login} />
      <Route exact path={match.url + "/signup"} component={SignUP} />
    </>
  );
};

export default Routes;
