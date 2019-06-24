import React, { Component } from 'react';
import { Card, Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
import '../../styles/css/login.css';
import { FirebaseContext } from '../Firebase';
import { Link, withRouter } from 'react-router-dom';

const { Title } = Typography;

class BaseLogin extends Component {
  static contextType = FirebaseContext;

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        // Now authenticate user
        this.context.signInUser(values.username, values.password)
        .then(() => {
          console.log("Signed in");
        })
        .catch(error => {
          this.setState({ error });
        });
      } else {
        console.log("Authentication Error");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{position: "absolute", top: "50%" ,left: "50%", "marginTop": "-350px", "marginLeft": "-225px"}}>
        <Card>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div style={{"paddingBottom": "10px", "textAlign": "center"}}>
              <Title level={3}> <a href="https://www.ols-med.net/ols-private-privacy-disclosure-updates-06-2019">787.OLS onelightsystem Meditation® </a> </Title>
            </div>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="/passwordreset">
                Forgot password
              </a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="/register">register [Beta]</a>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const WrappedLogin = withRouter(Form.create({ name: 'login' })(BaseLogin));
export default WrappedLogin;