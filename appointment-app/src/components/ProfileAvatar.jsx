import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
// eslint-disable-next-line no-undef
const API_SERVER = process.env.REACT_APP_SERVER_ADDRESS;

// eslint-disable-next-line react/prop-types
const ProfileAvatar = ({ url, size, style }) => {
  return url ? (
    <Avatar src={`${API_SERVER}/public/${url}`} size={size} style={style} />
  ) : (
    <Avatar icon={<UserOutlined />} size={size} style={style} />
  );
};
export default ProfileAvatar;
