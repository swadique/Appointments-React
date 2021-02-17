import React from "react";
import { Layout, Col } from "antd";

const Content = (props) => {
  const { Content } = Layout;
  return <Content>{props.children}</Content>;
};
export default Content;
