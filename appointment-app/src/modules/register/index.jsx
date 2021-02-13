import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./login.jsx";
import Signup from "./signup.jsx";

const Register = ({ match }) => {
  const Wrapper = styled.div`
    background: #f8fafb;
    background-image: url();
    background-position: right;
    background-repeat: no-repeat;
    background-position: 100%;
    overflow-x: hidden;
    background-size: 60%;
    font-family: "Montserrat", sans-serif;
    height: 100vh;
    .max-height {
      height: 100vh;
    }
  `;

  return (
    <Wrapper>
      <Row justify="center" className="max-height" align="middle">
        <Col span={{ sm: 24, md: 24, lg: 12, xl: 12 }}>
          <Switch>
            <Route path={`${match.url}/login`} render={() => <Login />} />
            <Route path={`${match.url}/signup`} render={() => <Signup />} />
            <Redirect to={`${match.url}/login`} />
          </Switch>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Register;
