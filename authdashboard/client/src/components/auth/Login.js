import React, { Component } from 'react';
import { message, Modal, Card, Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
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
        this.firebase.signInUser(values.username, values.password)
        .then(() => {
          if(this.firebase.auth.currentUser.emailVerified){
            this.firebase.fetchUserData(this.firebase.auth.currentUser.uid)
            .then((doc) => {
              this.firebase.dbUser = doc.data();
              console.log("Signed in");
            })
          } else {
            var tmpThis = this;
            Modal.confirm({
              title: "Account not Verified", 
              content: "To log in first verify your account",
              cancelText: "Resend Verification Email",
              okText: "Ok",
              onCancel() {
                console.log('Cancel');
                tmpThis.firebase.auth.currentUser.sendEmailVerification().then(() => {
                  message.success('The email has been resent, please check your email');

                  // Needed to redirect to /home otherwise App auth listener will not get retriggered
                  tmpThis.firebase.signOutUser();
                });
              },
              onOk() {
                console.log('OK');
                tmpThis.firebase.signOutUser();
              }
            });

          }
        })
        .catch(error => {
          Modal.error({title: "Error on Login", content: error.message})
          console.log(error);
          this.setState({ error });
        });
      } else {
        console.log("Authentication Error");
      }
    });
  };

  componentDidMount() {
    this.firebase = this.context;
    console.log(this.firebase);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{display: "table", position: "absolute", height: "100%", width: "100%"}}>
        <div style={{marginLeft: "auto", marginRight: "auto", marginTop: "100px", textAlign: "center"}}>
          <Card style={{display:"inline-block", textAlign: "initial"}}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <div style={{"paddingBottom": "10px", "textAlign": "center"}}>
                <Title level={3}> <a href="https://www.ols-med.net/ols-private-privacy-disclosure-updates-06-2019">840.OLS onelightsystem meditation®© </a> </Title>
              </div>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your @mail!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="username"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Passcode!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Passcode"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <a className="login-form-forgot" href="/passwordreset">
                  Forgot passcode
                </a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                Or <a href="/register">Apply to register [Beta]</a>
              </Form.Item>
            </Form>
          </Card>

        </div>
      </div>
    );
  }
}

const WrappedLogin = withRouter(Form.create({ name: 'login' })(BaseLogin));
export default WrappedLogin;
