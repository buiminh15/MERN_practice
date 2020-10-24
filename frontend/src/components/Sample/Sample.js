import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

import Card1 from '../Cards/Card1';

class Sample extends Component {
  datas = [
    { img: './logo192.png', description: 'aaaaa', value: 'sample.png' },
    { img: './logo192.png', description: 'aaaaa', value: 'sample.pdf' },
  ];

  render() {
    const list = this.datas.map((data) => <Card1 datas={data} />);
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col col-4">{list}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sample;
