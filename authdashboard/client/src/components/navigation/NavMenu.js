import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import { FirebaseContext } from '../Firebase';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class NavMenu extends Component {
  static contextType = FirebaseContext;

  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
    };
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  
  componentDidMount() {
    this.firebase = this.context;
  }

  onMenuClick = val => {
    if(val.key == "4") {
      this.firebase.signOutUser();
    }
  }

  render() {
    return (
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} theme="light">
        <div className="logo" />
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" onClick={this.onMenuClick}>
          <Menu.Item key="1">
          <Icon type="file" />
            <span>OLS stats</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="user" />
            <span>Profile</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="setting" />
            <span>Support</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="logout" />
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
