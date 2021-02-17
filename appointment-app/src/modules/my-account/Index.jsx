import React, { useState, useContext } from "react";
import styled from "styled-components";
import {
  message,
  Card,
  Row,
  Col,
  Form,
  Input,
  Divider,
  Button,
  Upload,
  Typography,
} from "antd";
import ApiCalls from "../../apis/ApiCalls";
import UserContext from "../../contexts/userContext";
import ProfileAvatar from "../../components/ProfileAvatar";
import { UploadOutlined } from "@ant-design/icons";

const MyAccount = (props) => {
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { userData, setUserData } = useContext(UserContext);

  const Wrapper = styled.div`
    padding: 24px;
    .title {
      line-height: 29px;
      color: #aeaeae;
      h1 {
        color: #aeaeae;
        font-size: 24px;
      }
    }
  `;
  function updateProfilePicture(file) {
    const formData = new FormData();
    formData.append("profilePic", file);
    setUploadLoading(true);
    ApiCalls.updateProfilePicture(formData)
      .then((res) => {
        message.success("Profile picture updated");
        setUploadLoading(false);
        getProfile();
      })
      .catch((error) => {
        if (error.response) {
          console.log(1);
          message.error(error.response.message);
        } else {
          message.error("Server not responding");
        }
      });
    return false;
  }
  function getProfile() {
    setLoading(true);
    ApiCalls.getUserProfile()
      .then((res) => {
        setLoading(false);
        setUserData(res);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          message.error(error.response.message);
        } else {
          console.log(error);
          message.error("Server not responding");
        }
      });
  }
  function updateProfile(userData) {
    setSubmitLoading(true);
    ApiCalls.updateProfile(userData)
      .then((res) => {
        getProfile();
        setSubmitLoading(false);
        setLoading(false);
        setUserData(res);
      })
      .catch((error) => {
        setSubmitLoading(false);
        if (error.response) {
          message.error(error.response.data);
        } else {
          console.log(error);
          message.error("Server not responding");
        }
      });
  }

  return (
    <Wrapper>
      <Card title={<Typography.Title level={3} type="secondary">My Account</Typography.Title>}>
        <Row gutter={16} align="middle" className="title" justify="center">
          <Col>
            <ProfileAvatar
              style={{ border: "3px solid lightgrey" }}
              size={200}
              url={userData.profilePic}
            />
          </Col>
          <Col>
            <div>
                <Typography.Title level={5} strong={true}>{`${
                  userData.firstName
                } ${
                  userData.lastName ? userData.lastName : ""
                }`}</Typography.Title>
         
                <Typography.Text level={5}>{userData.email}</Typography.Text>
            </div>

            <Upload
              name="proPic"
              showUploadList={false}
              beforeUpload={updateProfilePicture}
            >
              <Button type="default" shape="round" icon={<UploadOutlined />}>
                Upload
              </Button>
            </Upload>
          </Col>
        </Row>
        <Divider />
        <Form initialValues={userData} onFinish={updateProfile}>
          <Row justify="center" align="middle" gutter={24}>
            <Col>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: "First name is required" }]}
              >
                <Input placeholder="First Name" size="large"></Input>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="lastName" label="Second Name">
                <Input placeholder="Last Name" size="large" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { type: "email", message: "Email is not valid" },
                  { required: true, message: "Email is required" },
                ]}
              >
                <Input placeholder="Email" size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row justify="end">
            <Col>
              <Form.Item>
                <Button
                  type="primary"
                  block={true}
                  shape="round"
                  htmlType="submit"
                  size="large"
                  loading={submitLoading}
                >
                  Save
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Wrapper>
  );
};

export default MyAccount;
