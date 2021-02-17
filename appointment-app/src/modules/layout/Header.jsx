import React from "react";
import styled from "styled-components";
import { Menu, Dropdown, Typography, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import ProfileAvatar from "../../components/ProfileAvatar";
import storage from "../../storage";

const Header = ({ history, newNotificationCount, userData }) => {
  const { Header } = Layout;
  const Wrapper = styled(Header)`
      width: 100%;
      padding: 0px;
      position: fixed;
      zindex: 1;
      display: flex;
      justify-content: flex-end;
  `;

  const logout = async () => {
    storage.authToken.clear();
    storage.user.clear();
    history.push("/register/login");
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/home/my-account">My Account</Link>
      </Menu.Item>
      <Menu.Item onClick={logout}>Logout</Menu.Item>
    </Menu>
  );
  return (
    // <Wrapper>
      <Header className="header" style={{
        width: "100%",
        padding: "0px",
        position: "fixed",
        zIndex: '1',
        display: "flex",
        justifyContent: "flex-end"
        }}>
        <div className="right-components">
          <Dropdown
            className="dropdown"
            overlay={menu}
            placement="bottomLeft"
            trigger={["click"]}
          >
            <div>
              <ProfileAvatar
                // url={userData.profilePic}
                size="medium"
                style={{ marginRight: "16px" }}
                icon={<UserOutlined />}
              />
              <Typography.Text className="styled-text">
                {userData && userData.hospital}
              </Typography.Text>
            </div>
          </Dropdown>
        </div>
      </Header>
  );
};
export default withRouter(Header);
