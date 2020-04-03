import React from "react";
import { Route } from "react-router-dom";
import Layout from "components/layout";
import Home from "./home";
import About from "./about";
import AccountRoutes from "./accounts";

const Root = () => {
  return (
    <Layout>
      최상위 컴포넌트
      <Route exact={true} path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route path="/accounts" component={AccountRoutes} />
    </Layout>
  );
};

export default Root;
