import React from 'react';
import {Alert, Row, Button} from 'react-bootstrap';

export default class SynopsisNavBar extends React.Component {
  
  render() {
    return (
      <Row>
        <Alert>{this.props.loggedIn ? "Logged in as "+this.props.userEmail : "Logged Out!" }</Alert>
        {/* {this.props.loggedIn && <Button onClick={this.props.logOut}>Log Out</Button>} */}
        <Button onClick={this.props.logOut}>Log Out</Button>
      </Row>
    );
  }
  
}