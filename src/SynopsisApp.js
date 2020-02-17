import React from 'react';
import Cookies from 'js-cookie';
import {Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import SynopsisNavbar from './SynopsisNavBar';
import SynopsisLoginForm from './SynopsisLoginForm';
import SynopsisContent from './SynopsisContent';

export default class SynopsisApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userEmail: null,
      loggedIn: false
    };
  }

  componentDidMount() {
    if (typeof Cookies.get('synopsis_auth_cookie') !== 'undefined') {
      this.setState({loggedIn: true});
      this.setState({userEmail: Cookies.get('synopsis_user_email')});
    }
  }

  logOut = () => {
    Cookies.remove('synopsis_authtoken');
    Cookies.remove('synopsis_user_email');
    this.setState({loggedIn:false});
  }

  setAuthToken = (token) => {
    Cookies.set('synopsis_authtoken', token)
    this.setState({loggedIn:true});
  }

  setUserEmail = (email) => {
    Cookies.set('synopsis_user_email', email)
    this.setState({userEmail:email});
  }

  renderApp() {
    return (
      <Col>
        <SynopsisNavbar loggedIn={this.state.loggedIn} logOut={this.logOut} userEmail={this.state.userEmail}/>
        <SynopsisContent />
      </Col>
    );
  }

  renderLogin() {
    return (
      <SynopsisLoginForm setAuthToken={this.setAuthToken} setUserEmail={this.setUserEmail}/>
    );
  }
  
  render() {
    if (this.state.loggedIn) {
      return this.renderApp();
    } else {
      return this.renderLogin();
    }
  }

}
