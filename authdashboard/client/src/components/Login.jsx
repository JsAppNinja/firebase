import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

// Custom components
import BaseLogin from './BaseLogin';

export default class Login extends Component {
  render() {
    const WrappedLogin = Form.create({ name: 'login' })(BaseLogin);

    return (
      <WrappedLogin /> 
    );
  }
}
