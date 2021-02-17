import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
const API_SERVER = process.env.REACT_APP_SERVER_ADDRESS;

const ProfileAvatar = ({ url, icon, size, style }) => {
  return url ? (
    <Avatar src={`${API_SERVER}/api/public/${url}`} size={size} style={style} />
  ) : (
    <Avatar icon={<UserOutlined />} size={size} style={style} />
  );
};
export default ProfileAvatar;
