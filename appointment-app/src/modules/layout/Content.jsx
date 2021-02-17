import React from "react";
import { Layout, Col } from "antd";
import styled from "styled-components";

const Content = (props) => {
  const { Content } = Layout;

  const WrappedContent = styled(Content)`
    padding: 24;
    textalign: center;
    @media (min-width: 700px) {
      margin-left: 200px;
    }
  `;

  return <WrappedContent>{props.children}</WrappedContent>;
};
export default Content;
