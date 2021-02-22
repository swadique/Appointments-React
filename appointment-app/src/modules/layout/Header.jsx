/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Menu, Dropdown, Typography, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import ProfileAvatar from "../../components/ProfileAvatar";
import storage from "../../storage";
import UserContext from "../../contexts/userContext";
import Logo from "../../icons/js/logo";
// import Logo from "../../icons/images/react.svg";

const Header = ({ history }) => {
  const { Header } = Layout;

  const { userData } = useContext(UserContext);

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
    <Header
      className="header"
      style={{
        width: "100%",
        padding: "0px",
        position: "fixed",
        zIndex: "1",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        border: "1px solid #e4e4e4",
      }}
    >
      <div style={{ marginLeft: 24,display:'flex',alignItems:'center' }}>
        <Logo />
      </div>
      <div className="right-components">
        <Dropdown
          className="dropdown"
          overlay={menu}
          placement="bottomLeft"
          trigger={["click"]}
        >
          <div>
            <ProfileAvatar
              url={userData.profilePic}
              size="large"
              style={{ marginRight: "16px" }}
              icon={<UserOutlined />}
            />
            <Typography.Text
              type="primary"
              strong={true}
              style={{ marginRight: "16px" }}
            >
              {userData && userData.firstName}
            </Typography.Text>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};
export default withRouter(Header);
