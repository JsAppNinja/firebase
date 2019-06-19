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
              <Breadcrumb.Item>OLS student</Breadcrumb.Item>
              <Breadcrumb.Item>OLS updates</Breadcrumb.Item>
              <Breadcrumb.Item>Subbmit OLS LM OLSM OLSME</Breadcrumb.Item>
              <Breadcrumb.Item>Request OLS initi</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>OLS updates 785
</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}> <a href="https://www.ols-med.net/ols-private-privacy-disclosure-updates-06-2019">onelightsystem OLS ©2017-2019 </a> </Footer>
        </Layout>
      </Layout>
    );
  }
}
