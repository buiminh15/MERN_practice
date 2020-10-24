import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

import Card1 from '../Cards/Card1';

class Sample extends Component {
  datas = [
    { img: './logo192.png', description: 'aaaaa', value: 'sample.png' },
    { img: './logo192.png', description: 'aaaaa', value: 'sample.pdf' },
  ];
 

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col col-12">
              <Card1 datas={this.datas[0]} />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sample;
