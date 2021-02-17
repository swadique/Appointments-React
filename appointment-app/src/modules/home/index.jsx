import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { Layout, message } from "antd";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../dashboard";
import jwt from "jwt-decode";
import storage from "../../storage";
import TimeSlots from "../time-slots";

function Home({ match, history }) {
  const { Content } = Layout;
  useEffect(() => {
    try {
      const decodedToken = jwt(storage.authToken.getItem());
      if (decodedToken.exp * 1000 < Date.now()) {
        message.error("Your session was timed out, please login again");
        history.push("/register/login");
      }
      if (decodedToken.userType !== "seller") {
        message.error(
          "You are not a seller, Please login with a seller account"
        );
        history.push("/register/login");
      }
    } catch (e) {
      message.error(
        "Something went wrong with your session, Please login again"
      );
      history.push("/register/login");
    }
  }, []);

  return (
    <>
      <Layout>
        <Header />
        <Layout
          style={{ minHeight: "calc(100vh - 64px)", marginTop: "64px" }}
          hasSider={true}
        >
          <Sidebar />
          <Content style={{ padding: "24px 16px", margin: "16px auto" }}>
            <Switch>
              <Route exact path={`${match.url}`} component={Dashboard} />
              <Route
                exact
                path={`${match.url}/time-slots`}
                component={TimeSlots}
              />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Home;
