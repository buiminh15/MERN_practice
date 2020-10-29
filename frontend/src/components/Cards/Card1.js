import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import Helpers from '../../helpers';

export default class Card1 extends Component {
  constructor(props) {
    super(props);
    this.state = { file: '' };
  }

  handleClick = (fileName) => {
    this.setState(
      {
        file: fileName,
      },
      () => {
        return Helpers.httpRequest(
          // `http://localhost:5001?file=${this.state.file}`,
          `http://localhost:4000/api/v1/sample/download?file=${this.state.file}`,
          'get'
        )
          .then((response) => response.blob())
          .then((blob) => {
            // create blob link
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            // link.download = `${fileName}`
            link.href = url;
            link.setAttribute('download', `${this.state.file}`);

            // append to html
            document.body.appendChild(link);

            // download
            link.click();

            // remove
            link.parentNode.removeChild(link);

            this.setState({
              loading: false,
            });
          })
          .catch((error) => {
            error.json().then((json) => {
              this.setState({
                errors: json,
                loading: false,
              });
            });
          })
      });
  };

  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.props.datas.img} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>{this.props.datas.description}</Card.Text>
          <Button
            value={this.props.datas.value}
            onClick={(e) => this.handleClick(e.target.value)}
            variant="primary"
          >
            Download {this.props.datas.value}
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
