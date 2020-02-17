import React from 'react';
import {Form, Button} from 'react-bootstrap'

export default class SynopsisRegisterDatasetForm extends React.Component {

  handleSubmit = event => {
    event.preventDefault();
    let fe = event.target.elements;
    let requestBody = {
      id: fe.idForm.value,
      temporalBracketLength: fe.temporalBucketLengthForm.value,
      geohashLength: fe.geohashLengthForm.value,
      binConfig: fe.binConfigForm.value
    };

    console.log(requestBody);

    fetch("/api/datasets", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(resp => {
      console.log(resp);
      if (resp.ok) {
        this.props.updateDatasets()
      }
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>

        <Form.Group controlId="idForm">
          <Form.Label>dataset id</Form.Label>
          <Form.Control/>
          <Form.Text className="text-muted">
            unique identifier for your dataset
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="temporalBucketLengthForm">
          <Form.Label>temporal bucket length</Form.Label>
          <Form.Control/>
          <Form.Text className="text-muted">
            how many ms is grouped into a bucket
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="geohashLengthForm">
          <Form.Label>geohash length</Form.Label>
          <Form.Control as='select'>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </Form.Control>
          <Form.Text className="text-muted">
            precision of geohash for sketching
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="binConfigForm">
          <Form.Label>bin config</Form.Label>
          <Form.Control/>
          <Form.Text className="text-muted">
            sketch bin configuration based on analysis of dataset
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register Dataset
        </Button>
      </Form>
    );
  }
  
}