import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Link } from "react-router-dom"; 
import { FirebaseContext } from '../Firebase';
import {
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
  TimePicker,
  Typography
} from 'antd';
import * as moment from 'moment'

const { Title } = Typography;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

class Profile extends Component {
  static contextType = FirebaseContext;

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    radioValue0: 1,
    checkboxOther: "",
    checkboxOtherChecked: false
  };

  handleCheckboxOther = e => {
    console.log(e.target.value);
    this.setState({ checkboxOther: e.target.value });
 
    if(e.target.value) {
      this.setState({ checkboxOtherChecked: true });
      console.log("target value set");
    } else {
      console.log("target value error");
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        // Prep Data
        var data = null;

        if(this.state.mainAccountType === "uOLSS") {
          data = {
            name: values.name,
            reference: values.reference,
            credits: values.credits,
            health: values.health,
            loc: values.location,
            meditationexperience: values.meditationexperience,
            olsexperience: values.olsexperience,
            teacher: values.teacher,
            start: values.start.format()
          }
        } else if(this.state.mainAccountType === "uOLSME") {
          data = {
            credits: values.credits,
            loc: values.location,
            name: values.name,
            olsexperience: values.olsexperience,
            accounttype: values.accounttype,
            reference: values.reference
          }

        } else if(this.state.mainAccountType === "uOLSLM") {
          data = {
            name: values.name,
            reference: values.reference,
            loc: values.location,
            olslmaccounttype: values.olslmaccounttype
          }
        } else if(this.state.mainAccountType === "uOLSP") {
          data = {
            name: values.name,
            reference: values.reference,
            credits: values.credits,
            olspaccounttype: values.olspaccounttype
          }
        }

        // Update user data
        if(data) {
          this.firebase.updateUserData(data)
          .then(() => {
            Modal.success({ title: "Profile Updated!", content: "Your profile has been updated" });
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
    console.log(e);
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

  validateRadio = (rule, value, callback) => {
    const form = this.props.form;
   
    console.log(rule);
    console.log(value);
  }

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
      value: e.target.value,
    });
  };

  componentDidMount() {
    this.firebase = this.context;
    this.firebase.fetchUserData(this.firebase.auth.currentUser.uid)
    .then((doc) => {
      this.firebase.dbUser = doc.data();
      this.setState({ ...this.firebase.dbUser, mainAccountType: this.firebase.mainAccountType });
    })
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

    console.log(this.state)

    return (
      <div style={{ background: '#fff' }}>
        <Form onSubmit={this.handleSubmit}>
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
              rules: [{ required: false, message: 'Please input your name!', whitespace: true }],
              initialValue: this.state.name
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
              rules: [{ required: false, message: 'Please input a value!', whitespace: true }],
              initialValue: this.state.reference
            })(<Input />)}
          </Form.Item>
          { this.state.mainAccountType === "uOLSS" &&
            <div>
              <Form.Item
                label={
                  <span>
                    Onelightsystem OLS experience&nbsp;
                  </span>
                }
              >
                {getFieldDecorator('olsexperience', {
                  rules: [{ required: false, message: 'Please input your experience!', whitespace: true }],
                  initialValue: this.state.olsexperience
                })(
                    <Radio.Group onChange={this.onChange} value={this.state.radioValue0}>
                      <Radio style={radioStyle} value={"New"}>
                        New 
                      </Radio>
                      <Radio style={radioStyle} value={"PAST Initiated"}>
                        PAST Initiated
                      </Radio>
                    </Radio.Group>
                  )
                }
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    OLS eae | inuo &nbsp;
                    <Tooltip title=" Select your OLS official:  OLS eae (teacher) OLS inuo (instructor) Each has it is own exchange measurement evaluation protocols to determinate proper OLS service fees energy exchange. when becoming OLS student can change to different OLS official by requesting new OLS intro&initi ">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('teacher', {
                  rules: [{ required: false, message: 'Please select OLS official!', whitespace: true }],
                  initialValue: this.state.teacher
                  })(
                    <Radio.Group onChange={this.onChange} value={this.state.radioValue0}>
                      <Radio style={radioStyle} value={"OLS aste. eae | Nazar Asvitlo  CA USA"}>
                        OLS aste. eae | Nazar Asvitlo  CA USA
                      </Radio>
                      <Radio style={radioStyle} value={"OLS inuo | Rei-Wen Ho  教员 CA USA"}>
                        OLS inuo | Rei-Wen Ho  教员 CA USA
                      </Radio>
                    </Radio.Group>
                  )
                }
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Any Health concerns?&nbsp;
                  </span>
                }
              >
                {getFieldDecorator('health', {
                  rules: [{ required: false, message: 'Please input a value!', whitespace: true }],
                  initialValue: this.state.health
                })(<Input />)}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Meditation Experience&nbsp;
                    <Tooltip title=" what you been practicing, how long and be more specific ">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('meditationexperience', {
                  rules: [{ required: false, message: 'Please input a value!', whitespace: true }],
                  initialValue: this.state.meditationexperience
                })(<Input />)}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    How soon can you be ready for OLS intro 30 min. ?&nbsp;
                    <Tooltip title="Please Indicate After assessment ready next step is pre-payment 50% than is scheduling for OLS intro" >
                      <Icon type="question-circle-o" />
                    </Tooltip>&nbsp;
                  </span>
                }
              >
                {getFieldDecorator('start', {
                  rules: [{ required: false, message: 'Please input a value!', whitespace: true, type: 'object' }],
                  initialValue: moment(this.state.start)
                })(
                    <DatePicker onChange={this.setDate} />
                  )
                }
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    What is a convenient time &nbsp;
                    <Tooltip title="Please provide approximate time you prefer, the exact time scheduling will be After assessment ready , pre-payment 50%, than is scheduling for OLS intro" >
                      <Icon type="question-circle-o" />
                    </Tooltip>&nbsp;
                  </span>
                }
              >
                {getFieldDecorator('start', {
                  rules: [{ required: false, message: 'Please input a value!', whitespace: true, type: 'object' }],
                })(
                    <TimePicker use12Hours format="h:mm a"/>
                  )
                }
              </Form.Item>
              <Form.Item 
                label={
                  <span>
                    Application Validity Applied &nbsp;
                    <Tooltip title="The OLS service fees based on assessment current provided Applicant up to date data (valid 9days after to re-evaluate fees will increse 10%) Expect official @mail (intro@ols-med.net) you will receive Assessed OLS servcie Fees to include 50% pre-payment to Scheduling OLS INTRO. check your profile page to track your progess ">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                  }
                  >
                    {getFieldDecorator('start', {
                      rules: [{ required: true, message: 'Please input a value!', whitespace: true, type: 'object' }],
                    })(
                        <DatePicker onChange={this.setDate} />
                      )
                    }
                  </Form.Item>

            </div>
          }
          { this.state.mainAccountType === "uOLSME" &&
            <div>
              <Form.Item
                label={
                  <span>
                    Onelightsystem OLS experience&nbsp;
                  </span>
                }
              >
                {getFieldDecorator('olsexperience', {
                  rules: [{ required: false, message: "Please input your experience!", whitespace: true }],
                  initialValue: this.state.olsexperience
                  })(
                    <Radio.Group onChange={this.onChange} value={this.state.radioValue0}>
                      <Radio style={radioStyle} value="New User">
                        New User
                      </Radio>
                      <Radio style={radioStyle} value="PAST Initiated OLS student">
                        PAST Initiated OLS student
                      </Radio>
                    </Radio.Group>
                  )
                }
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    select OLSME usage account &nbsp;
                    <Tooltip title=" to evalueta OLSME services fees ">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('accounttype', {
                  rules: [{ message: "Please input your OLSME Account Type", whitespace: true }],
                  initialValue: this.state.accounttype
                  })(
                    <Radio.Group onChange={this.onChange} value={this.state.radioValue0}>
                      <Radio style={radioStyle} value="Individual">
                        Individual 
                        <Tooltip title=" (30 days free, after fees based on usage and GDP ) ">
                      <Icon type="question-circle-o" />
                    </Tooltip> 
                      </Radio>
                      <Radio style={radioStyle} value="Corporation">
                        Corporation 
                        <Tooltip title=" (Fees based on size and volume) ">
                      <Icon type="question-circle-o" />
                    </Tooltip> 
                      </Radio>
                      <Radio style={radioStyle} value="Governmental Entity">
                        Govermental Entity 
                        <Tooltip title="  (Fees based on state and contry) ">
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
                    How did you find out about OLS&nbsp;
                    <Tooltip title="OLS promoter - refferal ?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('reference', {
                  rules: [{ message: 'Please input a value!', whitespace: true }],
                  initialValue: this.state.reference
                })(<Input />)}
              </Form.Item>
            </div>
          }
          {(this.state.mainAccountType === "uOLSS" || this.state.mainAccountType === "uOLSME" || this.state.mainAccountType === "uOLSLM") &&
            <Form.Item
              label={
                <span>
                  Your LOCATION (country, city/town)&nbsp;
                  <Tooltip title="Determines OLS service value fee* CA$190, Bay Area CA $240 (USA average $160); the rest of countries (Quality of Life GDP value assessment)">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('location', {
                rules: [{ message: 'Please input a value!', whitespace: true }],
                initialValue: this.state.loc
              })(<Input />)}
            </Form.Item>
          }
          { this.state.mainAccountType === "uOLSLM" &&
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
                rules: [{ required: false, whitespace: true }],
                initialValue: this.state.olslmaccounttype
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
          }
          {this.state.mainAccountType === "uOLSP" &&
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
                rules: [{ required: true, message: "Please choose an option!", whitespace: true }],
                initialValue: this.state.olspaccounttype
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
          }
          {(this.state.mainAccountType === "uOLSS" || this.state.mainAccountType === "uOLSME" || this.state.mainAccountType === "uOLSP") &&
            <Form.Item label={
                <span>
                  Evaluation credits?&nbsp;
                </span>
              }
            >
              {getFieldDecorator('credits', {
                rules: [{ type: "array" }], 
                initialValue: this.state.credits
              })(
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
          }
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>    
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Profile);
export default WrappedRegistrationForm;

