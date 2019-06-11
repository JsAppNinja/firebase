import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import NavMenu from "../navigation/NavMenu";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Home extends Component {
  state = {
    collapsed: true,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <NavMenu />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Test</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>OLS Test</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>OLS ©2018</Footer>
        </Layout>
      </Layout>
    );
  }
}
