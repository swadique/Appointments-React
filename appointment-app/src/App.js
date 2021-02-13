import React from "react";
import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { ConfigProvider, Empty } from "antd";
import GlobalStyle from "./globalStyle";
import Register from "./modules/register";

function App() {
  return (
    <>
      <GlobalStyle />
      <ConfigProvider renderEmpty={() => <Empty description={false} />}>
        <Router>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/signup" render={(props) => <></>} />
            <Route path="/home" render={(props) => <></>} />
            <Redirect to="/login" />
          </Switch>
        </Router>
      </ConfigProvider>
    </>
  );
}

export default App;
