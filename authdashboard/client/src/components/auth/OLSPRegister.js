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
          credits: values.credits,
          olspaccounttype: values.olspaccounttype
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
               this.firebase.createUserFireStore(data, ConstantsList.OLSP_COL, user.uid),
               this.firebase.addToUserList(user.uid, { type: ConstantsList.OLSP_COL })
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
                <Title level={3}>OLS Promotor Registration</Title>
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
                    <Tooltip title="OLS promoter - refferal ?">
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
                    select OLS user  &nbsp;
                    <Tooltip title=" free account ">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('olspaccounttype', {
                  rules: [{ required: true, message: "Please choose an option!", whitespace: true }]
                  })(
                    <Radio.Group onChange={this.onChange} value={this.state.radioValue0}>
                      <Radio style={radioStyle} value="OLS promoter">
                        OLS promoter 
                        <Tooltip title=" (promting OLS services for commission) ">
                      <Icon type="question-circle-o" />
                    </Tooltip> 
                      </Radio>
                      <Radio style={radioStyle} value="using OLS services">
                         Using OLS services
                        <Tooltip title=" (ordering OLS official for pulling Light into my Location, ordering OLSM performance in my location) ">
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
                    Agreement 1&nbsp;
                  </span>
                }
              >
                {getFieldDecorator('agreement1', {
                  valuePropName: 'checked', rules: [{ required: true, message: 'Please check the box'}]
                })(
                  <Checkbox>
                    All the information submitted in this form is true and correct
                  </Checkbox>
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
                    I have read and agreed to the <a href="https://www.ols-med.net/ols-private-privacy-disclosure-updates-06-2019">terms of service</a>
                  </Checkbox>
                )}
              </Form.Item>
              <Form.Item label={
                  <span>
                    Evaluation credits?&nbsp;
                  </span>
                }
              >
                {getFieldDecorator('credits', {
                  rules: [{ type: "array" }], initialValue: [""]}
                )(
                  <Checkbox.Group
                    onChange={(values) => { console.log(values) }} 
                  >
                    <div>
                      <Checkbox value="10 Google Review">(10)Had prior OLS experience?! leave a review on <a href="https://goo.gl/7tsW6L">google</a></Checkbox>
                        <br />
                      <Checkbox value="10 Lessons.com">(10)Had prior OLS experience?! leave a review on our <a href="https://goo.gl/dhbvmX">lessons</a></Checkbox>
                        <br />
                      <Checkbox value="5 Youtube">(5)Subscribed on <a href="https://www.youtube.com/c/ONELIGHTSYSTEMOLSMeditation"> Youtube</a></Checkbox>
                        <br />
                      <Checkbox value="5 CrunchBase">(5)Followed us on <a href="https://www.crunchbase.com/organization/onelightsystem-ols">CrunchBase</a></Checkbox>
                        <br />
                      <Checkbox value="5 LinkedIn">(5)Followed us on <a href="https://www.linkedin.com/company/one-light-system/">LinkedIn</a></Checkbox>
                        <br />
                      <Checkbox value="5 Owler">(5)Followed us on <a href="https://www.owler.com/company/ols-med">Owler and Weight</a></Checkbox>
                        <br />
                      <Checkbox value="Udemy">Took our class on <a href="https://www.udemy.com/onelightsystem-olsm/?instructorPreviewMode=guest">Udemy</a></Checkbox>
                        <br />
                      <Checkbox value="5 Facebook">(5)Liked and share our <a href="https://www.facebook.com/onelightsystem/">Facebook</a> page</Checkbox>
                        <br />
                      <Checkbox value="5 OLS Subscription">(5)Took our OLS subscription <a href="https://docs.google.com/forms/d/e/1FAIpQLSfbLCi3OIfYXxriI1ddYm0ekzfFYpqhpExnheEyNUY2FfnEqw/viewform">survey</a></Checkbox>
                        <br />
                      <Checkbox value="Offter something else">I can offer something else</Checkbox>
                        <br />
                      <Checkbox value="Pay with crypto">(1) will apply valid crypto currencies to pay for OLS service fees</Checkbox>
                        <br />
                      <Checkbox value="Create OLS Video">(10)I will create video on the OLS experience</Checkbox>
                        <br />
                      <Checkbox checked={ true } value={ "Other " + this.state.checkboxOther }>Other: </Checkbox><Input style={{ width: 100, marginLeft: 10 }} onChange={ this.handleCheckboxOther }/>
                    </div>
                  </Checkbox.Group>
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
      </div>
    );
  }
}

const OLSPRegister = Form.create({ name: 'register' })(RegistrationForm);
export default OLSPRegister;
