import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Link } from "react-router-dom"; 
import {
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
  TimePicker
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

class RegistrationForm extends React.Component {
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

  radioValidator = (rule, value, callback) => {
    if (!value) {
      callback('Please input your experience!');
    } else {
      callback();
    }
  };

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
      <div style={{position: "absolute", top: "50%" ,left: "50%", "marginTop": "-350px", "marginLeft": "-675px"}}>
      <Card style={{ width: 1350, marginBottom: 60 }}>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
          {getFieldDecorator('Name', {
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
          {getFieldDecorator('Reference', {
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
          {getFieldDecorator('radio-experience', {
            rules: [{ required: true, validator: this.radioValidator, whitespace: true }]
            })(
              <Radio.Group onChange={this.onChange} value={this.state.radioValue0}>
                <Radio style={radioStyle} value={1}>
                  OLS promoter 
                  <Tooltip title=" (promting OLS services for commission) ">
                <Icon type="question-circle-o" />
              </Tooltip> 
                </Radio>
                <Radio style={radioStyle} value={3}>
                   using OLS services
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
             Official OLS Promotion attribution &nbsp;
            </span>
          }
        >
          <div>
            <br />
            <Checkbox>(5)Subscribed on <a href="https://www.youtube.com/c/ONELIGHTSYSTEMOLSMeditation"> Youtube</a></Checkbox>
          <Checkbox>(5)Followed us on <a href="https://www.crunchbase.com/organization/onelightsystem-ols">CrunchBase</a></Checkbox>
            <br />
          <Checkbox>(5)Followed us on <a href="https://www.linkedin.com/company/one-light-system/">LinkedIn</a></Checkbox>
            <br />
          <Checkbox>(5)Followed us on <a href="https://www.owler.com/company/ols-med">Owler and Weight</a></Checkbox>
            <br />
          <Checkbox>(5)Liked and share our <a href="https://www.facebook.com/onelightsystem/">Facebook</a> page</Checkbox>
          <br /> 
          <Checkbox>(5) Followed us on <a href="https://www.instagram.com/onelightsystem_ols/">Instagram</a> page</Checkbox>
            <br />
          <Checkbox>(5)Took our OLS subscription <a href="https://docs.google.com/forms/d/e/1FAIpQLSfbLCi3OIfYXxriI1ddYm0ekzfFYpqhpExnheEyNUY2FfnEqw/viewform">survey</a></Checkbox>
            <br />
          <Checkbox>I can offer something else</Checkbox>
            <br />
          <Checkbox>(10)I will create video on the OLS experience</Checkbox>
            <br />
          <Checkbox>Other: </Checkbox><Input style={{ width: 100, marginLeft: 10 }}/>
          </div>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read and agreed to the <a href="https://www.ols-med.net/ols-private-privacy-disclosure-updates-06-2019">terms of service</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement2', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              All the information submitted in this form is true and correct
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Link to="/home">
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          </Link>
        </Form.Item>
      </Form>
      </Card>
      </div>
    );
  }
}

const OLSPRegister = Form.create({ name: 'register' })(RegistrationForm);
export default OLSPRegister;
