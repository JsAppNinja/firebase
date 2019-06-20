import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Layout } from 'antd';

// Custom components
import BaseLogin from './BaseLogin';

const { Footer } = Layout;

export default class Login extends Component {
  render() {
    const WrappedLogin = Form.create({ name: 'login' })(BaseLogin);

    return (
      <div>
        <div style={{position: "absolute", top: "10%" ,left: "50%", "marginabsolute": "-350px", "marginLeft": "-225px"}}>
          <WrappedLogin /> 
        </div>
        
      </div>
    );
  }
}
