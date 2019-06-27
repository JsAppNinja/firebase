import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Typography } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import NavMenu from "../navigation/NavMenu";
import OLSStats from "./OLSStats";
import OLSUpdates from "./OLSUpdates";
import Profile from "./Profile";
import Support from "./Support";

const { Title } = Typography;
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
          <Header style={{ background: '#fff', padding: 0 }}>
            <div style={{ textAlign: "center", alignSelf: "center" }}>
              <Title level={3}> OLS onelightsystem Meditation</Title>
            </div>          
         </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>OLS student</Breadcrumb.Item>
              <Breadcrumb.Item> <a href='https://www.olsme.com/home/olsupdates'>OLS updates</a></Breadcrumb.Item>
              <Breadcrumb.Item>Enter OLSLM OLSM OLSME</Breadcrumb.Item>
              <Breadcrumb.Item>Manual</Breadcrumb.Item>
              <Breadcrumb.Item> <a href='https://www.olsme.com/home/support'></a> Support and initi </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: "100%" }}>
              <Route path="/home/olsupdates" component={ OLSUpdates } />
              <Route path="/home/olsstats" component={ OLSStats } />
              <Route path="/home/profile" component={ Profile } />
              <Route path="/home/Support" component={ Support } />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}> <a href="https://www.ols-med.net/ols-private-privacy-disclosure-updates-06-2019">onelightsystem OLS ©2017-2019 </a> </Footer>
        </Layout>
      </Layout>
    );
  }
}
