import React, { Component } from 'react';
import { Card, Radio, Input, Button, Typography } from 'antd';
import { Link } from "react-router-dom"; 

const { Title } = Typography;

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

const getFormType = ["/olssregister", "/olsmeregister", "/olslmregister", "/olspregister"]

export default class Register extends Component {
  state = {
    value: 0,
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  getAccountType() {

  }

  render() {
    console.log(this.state);
    return (
      <div style={{position: "absolute", top: "50%" ,left: "50%", "marginTop": "-350px", "marginLeft": "-225px"}}>
        <Card style={{ display: "inline-flex" }}>
          <div>
            <div style={{"textAlign": "center"}}>
              <Title level={3}>Select an account type</Title>
            </div>
            <br />
            <Radio.Group onChange={this.onChange} value={this.state.value}>
              <Radio style={radioStyle} value={0}>
                OLS Student (Intro + INITI)
              </Radio>
              <Radio style={radioStyle} value={1}>
                OLSME (Public 30 days free , corporates or government fees)
              </Radio>
              <Radio style={radioStyle} value={2}>
                OLS LM (Investor or buyer)
              </Radio>
            </Radio.Group>
          </div>
          <br />
          <div style={{ "textAlign": "center" }}>
            <Link to={getFormType[this.state.value]}>
              <Button type="primary" size="large" style={{"marginRight": 20}}>Next</Button>
            </Link>
            <Link to="/">
              <Button size="large">Back</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }
}
