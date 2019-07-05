import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Typography } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import NavMenu from "../navigation/NavMenu";
import OLSStats from "./OLSStats";
import OLSUpdates from "./OLSUpdates";
import Profile from "./Profile";
//import Settings from "./Settings";
import { FirebaseContext } from '../Firebase';
import Manual from "./Manual";
import ols from "./OLS";

const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Home extends Component {
  static contextType = FirebaseContext;

  state = {
    collapsed: true,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  componentDidMount() {
    this.firebase = this.context;
    console.log(this.firebase.dbUser);
    console.log(this.firebase.auth.currentUser.uid);
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <NavMenu />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div style={{ textAlign: "center", alignSelf: "center" }}>
              <Title level={3}> 802.OLS onelightsystem Meditation®©</Title>
            </div>          
         </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>OLS student</Breadcrumb.Item>
              <Breadcrumb.Item> <a href='https://www.olsme.com/home/olsupdates'>OLS updates</a></Breadcrumb.Item>
              <Breadcrumb.Item>Enter OLSLM OLSM OLSME</Breadcrumb.Item>
              <Breadcrumb.Item>OLS student Support</Breadcrumb.Item>
              <Breadcrumb.Item> <a href='https://www.olsme.com/home/ols'> OLS </a> </Breadcrumb.Item>

            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: "100%" }}>
              <Route path="/home/olsupdates" component={ OLSUpdates } />
              <Route path="/home/olsstats" component={ OLSStats } />
              <Route path="/home/profile" component={ Profile } />
              <Route path="/home/Manual" component={ Manual } />
              <Route path="/home/ols" component={ ols } />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}> <a href="https://www.ols-med.net/ols-private-privacy-disclosure-updates-06-2019">onelightsystem OLS ®© 2017-2019 CA USA privacy disclosure </a> </Footer>
        </Layout>
      </Layout>
    );
  }
}
