import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { Layout, message } from "antd";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard";
import jwt from "jwt-decode";
import storage from "../../storage";
import TimeSlots from "../time-slots";
import Content from "../layout/Content";
import MyAccount from "../my-account/Index";
import UserContext from "../../contexts/userContext";
import Appointments from "../appointments";

function Home({ match, history }) {
  // const { Content } = Layout;
  const [userData, setUserData] = useState(storage.user.getItem() || {});
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

  function updateUserData(data) {
    storage.user.setItem(data);
    setUserData(data);
  }

  return (
    <>
      <UserContext.Provider
        value={{
          userData: userData,
          setUserData: updateUserData,
        }}
      >
        <Layout color="#000">
          <Header />
          <Layout
            style={{ minHeight: "calc(100vh - 64px)", marginTop: "64px" }}
            hasSider={true}
          >
            <Sidebar />
            <Content>
              <Switch>
                <Route exact path={`${match.url}`} component={Dashboard} />
                <Route
                  exact
                  path={`${match.url}/my-account`}
                  component={MyAccount}
                />
                <Route
                exact
                path={`${match.url}/time-slots`}
                component={TimeSlots}
              />
               <Route
                exact
                path={`${match.url}/schedules`}
                component={Appointments}
              />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </UserContext.Provider>
    </>
  );
}

export default Home;
