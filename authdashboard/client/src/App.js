import React, { Component } from 'react';
import { withRouter, BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Layout } from "antd";
import 'antd/dist/antd.css';

// Custom Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import OLSSRegister from './components/auth/OLSSRegister';
import OLSMERegister from './components/auth/OLSMERegister';
import OLSLMRegister from './components/auth/OLSLMRegister';
import OLSPRegister from './components/auth/OLSPRegister';
import PasswordReset from './components/auth/PasswordReset';
import Home from './components/dashboard/Home';
import Privacy from './components/privacy/Privacy';
import Firebase, { FirebaseContext } from './components/Firebase';
import ProtectedRoute from './components/navigation/ProtectedRoute';

const { Footer } = Layout;

//function App() {
export class App extends Component {
  constructor(props) {
    super(props);
    // Created firebase object as a singleton
    this.firebase = new Firebase();

    this.state = {
      authenticated: false
    }
  }

  componentDidMount() {
    console.log(this.firebase);
    var appThis= this;
    var firebaseThis = this.firebase;
    // Set listener for user authentication status
    this.firebase.auth.onAuthStateChanged(function(user) {
      if(user) {
        console.log(user);
        
        firebaseThis.setUserData(user.uid)
        .then((doc) => {
          if(doc.exists) {
            console.log(doc.data());
            firebaseThis.dbUser = doc.data();

            appThis.setState({ authenticated: true });
            appThis.props.history.push("/home/olsupdates");
          }
        })
        .catch((error) => {
          console.log(error);
        })

      } else {
        appThis.setState({ authenticated: false });
      }
      console.log("authed");
    })
  }

  render() {
    console.log(this.state);
    //this.firebase.signOutUser();
    return (
      <FirebaseContext.Provider value={this.firebase}>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/olssregister" component={OLSSRegister} />
          <Route path="/olsmeregister" component={OLSMERegister} />
          <Route path="/olslmregister" component={OLSLMRegister} />
          <Route path="/olspregister" component={OLSPRegister} />
          <Route path="/passwordreset" component={PasswordReset} />
          <ProtectedRoute path="/home" authenticated={this.state.authenticated} component={Home} />
          <Route path="/privacydisclosure" component={Privacy} />
        </div>
      </FirebaseContext.Provider>
    );
  }
}
export default withRouter(App);
