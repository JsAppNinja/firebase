import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'antd/dist/antd.css';

// Custom Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import OLSSRegister from './components/auth/OLSSRegister';
import OLSMERegister from './components/auth/OLSMERegister';
import OLSLMRegister from './components/auth/OLSLMRegister';
import OLSPRegister from './components/auth/OLSPRegister';
import Home from './components/dashboard/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/olssregister" component={OLSSRegister} />
        <Route exact path="/olsmeregister" component={OLSMERegister} />
        <Route exact path="/olslmregister" component={OLSLMRegister} />
        <Route exact path="/olspregister" component={OLSPRegister} />
        <Route exact path="/home" component={Home} />
      </div>
    </Router>
  );
}

export default App;
