import React from "react";
import { Route } from "react-router-dom";
import Layout from "components/layout";
import Home from "./home";
import About from "./about";
import AccountRoutes from "./accounts";
import LoginRequiredRoute from "utils/loginRequiredRoute";

const Root = () => {
  return (
    <Layout>
      {/* Route를 통해 해당 URL 경로를 가지는 페이지화 할 수 있다. */}
      <LoginRequiredRoute exact={true} path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route path="/accounts" component={AccountRoutes} />
    </Layout>
  );
};

export default Root;
