import React from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Signup = () => {
  const [form] = Form.useForm();
  const Wrapper = styled(Form.Item)`
    border-collapse: collapse;
    input {
      height: 30px;
      color: #000000;
      padding: 30px 12px;
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

  const onFinish = (values) => {};

  return (
    <Wrapper>
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
            <Col span={12}>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "First Name required",
                  },
                ]}
              >
                <Input placeholder="First Name" className="top-left-radius" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="lastName">
                <Input placeholder="Last Name" className="top-right-radius" />
              </Form.Item>
            </Col>
          </Row>

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
                <Input type="email" placeholder="Email" />
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
                      value !== undefined
                        ? value.length !== 0
                          ? value.length >= 8
                            ? Promise.resolve()
                            : Promise.reject(
                                "Password should contain minimum 8 letters"
                              )
                          : Promise.resolve()
                        : Promise.resolve(),
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder="Password"
                  className="input-password"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                dependencies={["password"]}
                name="confirm"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Confirm Password is required",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder="Confirm Password"
                  className="input-password bottom-left-radius bottom-right-radius"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center" align="center">
            <Col span={24}>
              <Form.Item
                name="acceptCheckbox"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject("Should accept agreement"),
                  },
                ]}
              >
                <Checkbox style={{ fontSize: "12px", marginTop: "12px" }}>
                  By checking this box,you agree Services & License Agreement
                </Checkbox>
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
                  Sign Up
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center" className="margin-top-12">
            Have an Account ?
            <NavLink to="/register/login" className="text-bold">
              &nbsp;Login
            </NavLink>
          </Row>
        </Form>
      </Row>
    </Wrapper>
  );
};
export default Signup;
