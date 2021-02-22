/* eslint-disable react/prop-types */
import React from "react";
import { Form, Input, Button, Row, Col, message,Card } from "antd";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import ApiCalls from "../../apis/ApiCalls";
import storage from "../../storage";

const Login = ({ history }) => {
  const Wrapper = styled(Form.Item)`
  
    border-collapse: collapse;
    input {
      height: 30px;
      color: #000000;
      padding: 30px 12px;
      min-width: 300px;
    }
    .card-style {
      border-radius:16px;
      padding:16px 16px
    }
    .ant-row {
      margin-bottom: 0px;
    }
    .input-password {
      padding: 16px 12px;
    }
    .top-left-radius {
      border-top-left-radius: 8px;
    }
    .top-right-radius {
      border-top-right-radius: 8px;
    }
    .bottom-left-radius {
      border-bottom-left-radius: 8px;
    }
    .bottom-right-radius {
      border-bottom-right-radius: 8px;
    }
    .margin-top-12 {
      margin-top: 12px;
    }
    .text-bold {
      font-weight: bold;
    }
  `;

  const [form] = Form.useForm();

  const onFinish = (formValues) => {
    ApiCalls.login(formValues)
      .then((res) => {
        console.log(res);
        storage.authToken.setItem(res.authToken);
        storage.user.setItem(res);
        history.push("/home");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          message.error(error.response.data);
        }
      });
  };

  return (
    <Wrapper>
      <Card className="card-style" hoverable={true}>
        <Row justify="center">
          <Form
            layout="vertical"
            form={form}
            initialValues={{
              layout: "vertical",
            }}
            onFinish={onFinish}
          >
            <Row>
              <Col span={24}>
                <Form.Item
                  name="email"
                  type="email"
                  rules={[
                    {
                      required: true,
                      message: "Email is required",
                    },
                    {
                      type: "email",
                    },
                  ]}
                >
                  <Input
                    type="email"
                    placeholder="Email"
                    className="top-right-radius top-left-radius"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Password is required",
                    },
                    {
                      validator: (_, value) =>
                        value && value.length >= 8 && value.length <= 12
                          ? Promise.resolve()
                          : Promise.reject(
                              "Password should contain minimum 8 letters"
                            ),
                    },
                  ]}
                >
                  <Input.Password
                    type="password"
                    placeholder="Password"
                    className="input-password bottom-right-radius bottom-left-radius"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="center" className="margin-top-12">
              <Col span={24}>
                <Form.Item>
                  <Button
                    type="primary"
                    block={true}
                    htmlType="submit"
                    shape="round"
                    size="middle"
                  >
                    Login
                  </Button>
                </Form.Item>
              </Col>
            </Row>
            <Row justify="center" className="margin-top-12">
              Do not have an Account ?
              <NavLink to="/register/signup" className="text-bold">
                &nbsp;Signup
              </NavLink>
            </Row>
          </Form>
        </Row>
      </Card>
    </Wrapper>
  );
};
export default withRouter(Login);
