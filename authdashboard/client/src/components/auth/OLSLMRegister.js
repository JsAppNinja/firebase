import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Link } from "react-router-dom"; 
import { FirebaseContext } from '../Firebase';
import ConstantsList from '../../constants/ConstantsList';
import {
  Modal,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Card,
  Radio,
  DatePicker,
  TimePicker,
  Typography
} from 'antd';

const { Title } = Typography;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

class RegistrationForm extends React.Component {
  static contextType = FirebaseContext;

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    radioValue0: 1
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        // Prep Data
        var data = {
          name: values.name,
          reference: values.reference,
          loc: values.location,
          olslmaccounttype: values.olslmaccounttype
        }
 
        // Create user account
        // Ensure user agreed with ToS
        if(values.agreement1 && values.agreement2) {
          this.firebase.createUser(values.email, values.password)
          .then((promRes) => {
            var user = promRes.user;
             // Send email verification and add user data to database
             return Promise.all([
               this.firebase.sendEmailVerification(),
               this.firebase.createUserFireStore(data, ConstantsList.OLSLM_COL, user.uid),
               this.firebase.addToUserList(user.uid, { type: ConstantsList.OLSLM_COL })
             ]);
           })
          .then(() => {
              Modal.success({ title: "Account Created!", content: "Your account has been successfully created. Please check your email to verify your account" });
              this.props.history.push("/");
              this.firebase.auth2.signOut();
          })
          .catch(error => {
            Modal.error({ title: "Unable to Create Account", content: error.message });
            console.log(error); 
          });
        }
      } else {
        console.log('Account creation error');
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  setDate = e => {
    console.log("TODO");
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      radioValue0: e.target.value
    });
    this.props.form.setFieldsValue({radio:e.target.value})
  };

  componentDidMount() {
    this.firebase = this.context;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    console.log(this.state);
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    const test = this;

    return (
      <div style={{display: "table", position: "absolute", height: "100%", width: "100%"}}>
        <div style={{marginLeft: "auto", marginRight: "auto", marginTop: "50px", marginBottom: "10px", textAlign: "center"}}>
          <Card style={{display:"inline-block", textAlign: "initial"}}>
            <Form onSubmit={this.handleSubmit}>
              <div style={{"textAlign": "center"}}>
                <Title level={3}>OLSLM Registration</Title>
              </div>
              <br />
              <Form.Item label="E-mail">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(<Input.Password />)}
              </Form.Item>
              <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Name&nbsp;
                    <Tooltip title="First and Last Name?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
                })(<Input />)}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    How did you find out about OLS&nbsp;
                    <Tooltip title="OLS promoter - ref. ?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('reference', {
                  rules: [{ required: true, message: 'Please input a value!', whitespace: true }],
                })(<Input />)}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    select OLSLM options &nbsp;
                    <Tooltip title=" OLSLM LIGHT MINUTES OLS equity ">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('olslmaccounttype', {
                  rules: [{ required: true, whitespace: true }]
                  })(
                    <Radio.Group onChange={this.onChange} value={this.state.radioValue0}>
                      <Radio style={radioStyle} value="OLSLM Investor">
                        OLSLM Investor
                        <Tooltip title=" (90, 180, 360 days Investing benefits) ">
                      <Icon type="question-circle-o" />
                    </Tooltip> 
                      </Radio>
                      <Radio style={radioStyle} value="OLSLM buyer">
                        OLSLM buyer 
                        <Tooltip title=" (min. 1LM category 9 or 10LM category 3) ">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                        {this.state.radioValue0 === 6 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                      </Radio>
                    </Radio.Group>
                  )
                }
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Your LOCATION (country, city/town)&nbsp;
                  </span>
                }
              >
                {getFieldDecorator('location', {
                  rules: [{ required: true, message: 'Please input a value!', whitespace: true }],
                })(<Input />)}
              </Form.Item>
              <Form.Item
                    label={
                      <span>
                        Agreement 1&nbsp;
                      </span>
                    }
              >
                {getFieldDecorator('agreement1', {
                  valuePropName: 'checked', rules: [{ required: true, message: 'Please check the box'}]
                })(
                  <Checkbox>
                    I have read and agreed to the <a href="https://www.ols-med.net/ols-private-privacy-disclosure-updates-06-2019">terms of service</a>
                  </Checkbox>,
                )}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Agreement 2&nbsp;
                  </span>
                }
              >
                {getFieldDecorator('agreement2', {
                  valuePropName: 'checked', rules: [{ required: true, message: 'Please check the box'}]
                })(
                  <Checkbox>
                    All the information submitted in this form is true and correct
                    <Tooltip title=" after registration you will receive confirmation your account created ">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </Checkbox>,
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
        <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=3cf19ffd-9b04-47f7-af18-5c57fe7ef82b"> </script>
      </div>
    );
  }
}

const OLSLMRegister = Form.create({ name: 'register' })(RegistrationForm);
export default OLSLMRegister;
