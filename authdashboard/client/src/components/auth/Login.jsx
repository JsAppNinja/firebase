import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

// Custom components
import BaseLogin from './BaseLogin';

export default class Login extends Component {
  render() {
    const WrappedLogin = Form.create({ name: 'login' })(BaseLogin);

    return (
      <div style={{position: "absolute", top: "50%" ,left: "50%", "marginTop": "-350px", "marginLeft": "-225px"}}>
        <WrappedLogin /> 
      </div>
    );
  }
}
