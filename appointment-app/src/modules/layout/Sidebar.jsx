import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { withRouter } from "react-router-dom";
import sidebarLinks from "./sidebarLinks";
import styled from "styled-components";


const { Sider } = Layout;
const Sidebar = ({ history }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState('1');

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const onChange = (param) => {
    setActiveKey(param.key);
    history.push(`${sidebarLinks[param.key - 1].path}`);
  };
  const WrappedSider = styled(Sider)`
    .menu-item {
      display: flex;
      align-items: center;
    }
    .menu-icon {
      margin-right: 8px;
    }
    .sider {
      height: 100%;
    }
  `;

  return (
    <WrappedSider
      collapsed={collapsed}
      onCollapse={onCollapse}
      collapsedWidth="0"
      breakpoint="md"
      theme="light"
      className="sider"
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        onSelect={onChange}
        selectedKeys={[activeKey]}
      >
        {sidebarLinks.map((link) => (
          <Menu.Item
            key={link.key}
            className="menu-item"
            icon={
              <link.icon
                className="menu-icon"
                width="20px"
                height="20px"
                active={link.key === activeKey}
              />
            }
          >
            {link.name}
          </Menu.Item>
        ))}
      </Menu>
    </WrappedSider>
  );
};

export default withRouter(Sidebar);
