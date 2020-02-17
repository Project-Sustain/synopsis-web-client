import React from 'react';
import {Alert, Row, Col, Form, Button, Table} from 'react-bootstrap';

import SynopsisRegisterDatasetForm from './SynopsisRegisterDatasetForm';

export default class SynopsisContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      datasets: []
    };
  }

  updateDatasets = () => {
    fetch('/api/datasets', {
      method: 'GET'
    })
    .then(resp => {
      if (resp.ok) {
        resp.json().then(obj => this.setState({datasets:obj}));
      }
    });
  }

  componentDidMount() {
    this.updateDatasets();
  }

  renderDatasetRow(d) {
    return (
      <tr key={d.id}>
        <td>{d.id}</td>
        <td>{d.temporalBracketLength}</td>
        <td>{d.geohashLength}</td>
        <td>{d.binConfig}</td>
      </tr>
    );
  }

  renderDatasets() {
    console.log(this.state.datasets);
    return(
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Temporal Bracket Length</th>
            <th>Geohash Length</th>
            <th>Bin Config</th>
          </tr>
        </thead>
        <tbody>
          {this.state.datasets.map(dataset => this.renderDatasetRow(dataset))}
        </tbody>
      </Table>
    );
  }

  render() {
    return (
      <Col>
        {this.renderDatasets()}
        <SynopsisRegisterDatasetForm updateDatasets={this.updateDatasets}/>
      </Col>
    );
  }
  
}
