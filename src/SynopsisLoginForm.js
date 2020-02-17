import React from 'react';
import {Form, Button} from 'react-bootstrap'

export default class LoginForm extends React.Component {


  registerUser = event => {
    event.preventDefault();
    let form = event.target;
    let requestBody = {
      email: form.elements.emailForm.value,
      password: form.elements.passwordForm.value,
    };

    fetch("/api/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(resp => {
      if (resp.ok) {
        resp.text().then( jwt => this.props.setAuthToken(jwt));
        this.props.setUserEmail(form.elements.emailForm.value);
      }
    });
  }

  loginUser = event => {
    event.preventDefault();
    let form = event.target;
    let requestBody = {
      email: form.elements.emailForm.value,
      password: form.elements.passwordForm.value,
    };

    fetch("/api/authenticate", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(resp => {
      if (resp.ok) {
        resp.text().then( jwt => this.props.setAuthToken(jwt));
        this.props.setUserEmail(form.elements.emailForm.value);
      }
    });
  }

  render() {
    return (
      <Form onSubmit={this.loginUser}>
        <Form.Group controlId="emailForm">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="passwordForm">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    );
  }
  
}