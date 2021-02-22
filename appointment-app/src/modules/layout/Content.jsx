/* eslint-disable react/prop-types */
import React from "react";
import { Layout } from "antd";
import styled from "styled-components";

const Content = ({children}) => {
  const { Content } = Layout;

  const WrappedContent = styled(Content)`
    padding: 24;
    textalign: center;
    @media (min-width: 700px) {
      margin-left: 200px;
    }
  `;

  return <WrappedContent>{children}</WrappedContent>;
};
export default Content;
