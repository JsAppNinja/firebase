import React, { Component } from 'react';
import { FirebaseContext } from '../Firebase';
import { withRouter } from 'react-router-dom';
import {
  Typography,
  Modal,
  Form,
  InputNumber,
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
const { Title } = Typography;

class BasePasswordReset extends Component {
  static contextType = FirebaseContext;
  
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
    this.backToHomePage = this.backToHomePage.bind(this);
  }
 
  backToHomePage() {
    this.props.history.push("/");
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //Reset Password and redirect back to the login page
        this.firebase.passwordReset(values.email)
        .then(() => {
          Modal.success({ title: "Email Reset", content: "Check your email for instructions on how to reset your password", onOk: this.backToHomePage });
        })
        .catch((error) => {
          Modal.error({ title: "Unable to Reset Password", content: error.message });
        })
      } else {
      
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  componentDidMount() {
    this.firebase = this.context;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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

    return (
      <div style={{position: "absolute", top: "60%" ,left: "65%", "marginTop": "-350px", "marginLeft": "-650px"}}>
        <Card style={{ width: 850, marginBottom: 60. }}>
          <div style={{"textAlign": "center"}}>
            <Title level={3}>Reset Your Password</Title>
          </div>
          <br />
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
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Reset Password
              </Button>
            </Form.Item>    
          </Form>
        </Card>
      </div>
    );
  }
}

const WrappedPasswordReset = Form.create({ name: 'passwordreset' })(BasePasswordReset);
export default withRouter(WrappedPasswordReset);
